// All points use the existing 320 x 200 rendered geometry coordinate space.
export type Point=[number,number];
export type Annotation={source:string;corners:{number:number;anchor:Point;label:Point}[];start?:{point:Point;angle:number};direction?:{point:Point;angle:number};pit?:{points:Point[];entry:Point;exit:Point}};
// No verified annotation coordinates are present in the supplied F1DB assets.
export const annotations:Record<string,Annotation>={};
