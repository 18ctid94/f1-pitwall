"""Diagnostic similarity fit with cyclic ordered correspondence; no data persistence."""
import numpy as np
from scipy.spatial import cKDTree
from scipy.optimize import minimize

def match(x,p,starts=12):
    best=(np.inf,None)
    for direction in (1,-1):
        track=p[::direction]; n=len(track)
        cost=((x[:,None]-track[None])**2).sum(2)
        for start in np.argsort(cost[0])[:starts]:
            c=np.roll(cost,-int(start),axis=1); dp=np.full(n,np.inf); dp[0]=c[0,0]; parents=[]
            for row in c[1:]:
                prefix=np.minimum.accumulate(dp); ids=np.maximum.accumulate(np.where(dp==prefix,np.arange(n),0)); parents.append(ids)
                dp=row+np.r_[np.inf,prefix[:-1]]
            end=int(np.argmin(dp)); score=dp[end]
            if score<best[0]:
                idx=[end]
                for par in reversed(parents): idx.append(int(par[idx[-1]-1]))
                idx=(np.array(idx[::-1])+start)%n
                best=(score,track[idx])
    return best

def similarity(q,y,sign):
    z=q*np.array([1,sign]); a=z-z.mean(0); b=y-y.mean(0)
    u,s,v=np.linalg.svd(a.T@b); d=np.diag([1,np.linalg.det(u@v)]); r=u@d@v
    scale=np.sum(s*np.diag(d))/np.sum(a*a)
    return a@r*scale+y.mean(0)

def fit(q,p, details=False):
    tree=cKDTree(p); center=p.mean(0); q=q-q.mean(0); q=q/max(np.linalg.norm(q,axis=1).max(),1e-9); scale=np.linalg.norm(p-center,axis=1).max(); seeds=[]
    for sign in (1,-1):
        def transform(v):
            a,s,x,y=v; c,d=np.cos(a),np.sin(a); return (q*np.array([1,sign]))@np.array([[c,-d],[d,c]])*s+[x,y]
        def loss(v): return np.mean(tree.query(transform(v))[0]**2)
        for a in np.linspace(0,2*np.pi,16,endpoint=False):
            r=minimize(loss,[a,scale,*center],method='Powell',bounds=[(-7,13),(scale*.5,scale*2),(center[0]-scale,center[0]+scale),(center[1]-scale,center[1]+scale)],options={'maxiter':100}); seeds.append((r.fun,sign,transform(r.x)))
    ranked=sorted(seeds,key=lambda s:s[0]); best=None
    for _,sign,x in ranked[:12]:
        for iteration in range(8):
            score,y=match(x,p)
            if y is None: break
            dist=np.linalg.norm(x-y,axis=1); item=(float(np.sqrt(np.mean(dist**2))),float(max(dist)))
            if best is None or item<best: best=item; best_x=x.copy(); best_y=y.copy()
            nxt=similarity(q,y,sign)
            if np.max(np.abs(nxt-x))<1e-5: break
            x=nxt
    if best is None: raise ValueError('no ordered correspondence')
    rmse,maximum=best
    result={'rmse_svg_units':round(rmse,3),'max_svg_units':round(maximum,3),'cyclic_order':True,'ordered_rmse_svg_units':round(rmse,3),'nearest_seed_rmse_svg_units':round(float(np.sqrt(ranked[0][0])),3),'status':'CANDIDATE' if rmse<=3 and maximum<=8 else 'REVIEW'}

    if details: result.update(transformed=best_x.tolist(), anchors=best_y.tolist())
    return result
