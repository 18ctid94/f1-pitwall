export const circuitData:Record<string,[string,number,number]>={Australia:['Albert Park',-37.8497,144.968],China:['Shanghai International Circuit',31.3389,121.22],Japan:['Suzuka',34.843,136.54],Bahrain:['Bahrain International Circuit',26.0325,50.51],'Saudi Arabia':['Jeddah Corniche Circuit',21.6319,39.1044],Miami:['Miami International Autodrome',25.958, -80.239],'Emilia Romagna':['Imola',44.3439,11.7167],Monaco:['Circuit de Monaco',43.7347,7.4206],Spain:['Barcelona-Catalunya',41.57,2.261],Barcelona:['Barcelona-Catalunya',41.57,2.261],Canada:['Gilles Villeneuve',45.5,-73.522],Austria:['Red Bull Ring',47.2197,14.7647],'Great Britain':['Silverstone',52.0786,-1.0169],Belgium:['Spa-Francorchamps',50.4372,5.9714],Hungary:['Hungaroring',47.5789,19.2486],Netherlands:['Zandvoort',52.3888,4.5409],Italy:['Monza',45.6156,9.2811],Madrid:['Madring',40.466,-3.616],Azerbaijan:['Baku City Circuit',40.3725,49.8533],Singapore:['Marina Bay',1.2914,103.864],'United States':['Circuit of the Americas',30.1328,-97.6411],Mexico:['Hermanos Rodríguez',19.4042,-99.0907],Brazil:['Interlagos',-23.7036,-46.6997],'Las Vegas':['Las Vegas Strip Circuit',36.1147,-115.173],Qatar:['Lusail',25.49,51.4542],'Abu Dhabi':['Yas Marina',24.4672,54.6031]};
export const circuitSpecs:Record<string,[string,number]>={Australia:['5.278',58],China:['5.451',56],Japan:['5.807',53],Bahrain:['5.412',57],'Saudi Arabia':['6.174',50],Miami:['5.412',57],'Emilia Romagna':['4.909',63],Monaco:['3.337',78],Spain:['4.657',66],Barcelona:['4.657',66],Canada:['4.361',70],Austria:['4.326',71],'Great Britain':['5.891',52],Belgium:['7.004',44],Hungary:['4.381',70],Netherlands:['4.259',72],Italy:['5.793',53],Azerbaijan:['6.003',51],Singapore:['4.927',62],'United States':['5.513',56],Mexico:['4.304',71],Brazil:['4.309',71],'Las Vegas':['6.201',50],Madrid:['5.416',57],Qatar:['5.419',57],'Abu Dhabi':['5.281',58]};
export const circuitMeta: Record<string,{type:string;direction:string;turns:number;placeName:string;sourceId:string}> = {
  "Australia": {
    "type": "STREET",
    "direction": "CLOCKWISE",
    "turns": 14,
    "placeName": "Melbourne",
    "sourceId": "melbourne"
  },
  "China": {
    "type": "RACE",
    "direction": "CLOCKWISE",
    "turns": 16,
    "placeName": "Shanghai",
    "sourceId": "shanghai"
  },
  "Japan": {
    "type": "RACE",
    "direction": "CLOCKWISE",
    "turns": 18,
    "placeName": "Suzuka",
    "sourceId": "suzuka"
  },
  "Bahrain": {
    "type": "RACE",
    "direction": "CLOCKWISE",
    "turns": 15,
    "placeName": "Sakhir",
    "sourceId": "bahrain"
  },
  "Saudi Arabia": {
    "type": "STREET",
    "direction": "ANTI_CLOCKWISE",
    "turns": 27,
    "placeName": "Jeddah",
    "sourceId": "jeddah"
  },
  "Miami": {
    "type": "STREET",
    "direction": "ANTI_CLOCKWISE",
    "turns": 19,
    "placeName": "Miami Gardens",
    "sourceId": "miami"
  },
  "Emilia Romagna": {
    "type": "RACE",
    "direction": "ANTI_CLOCKWISE",
    "turns": 19,
    "placeName": "Imola",
    "sourceId": "imola"
  },
  "Monaco": {
    "type": "STREET",
    "direction": "CLOCKWISE",
    "turns": 19,
    "placeName": "Monte Carlo",
    "sourceId": "monaco"
  },
  "Spain": {
    "type": "RACE",
    "direction": "CLOCKWISE",
    "turns": 14,
    "placeName": "Montmeló",
    "sourceId": "catalunya"
  },
  "Barcelona": {
    "type": "RACE",
    "direction": "CLOCKWISE",
    "turns": 14,
    "placeName": "Montmeló",
    "sourceId": "catalunya"
  },
  "Canada": {
    "type": "STREET",
    "direction": "CLOCKWISE",
    "turns": 14,
    "placeName": "Montreal",
    "sourceId": "montreal"
  },
  "Austria": {
    "type": "RACE",
    "direction": "CLOCKWISE",
    "turns": 10,
    "placeName": "Spielberg",
    "sourceId": "spielberg"
  },
  "Great Britain": {
    "type": "RACE",
    "direction": "CLOCKWISE",
    "turns": 18,
    "placeName": "Silverstone",
    "sourceId": "silverstone"
  },
  "Belgium": {
    "type": "RACE",
    "direction": "CLOCKWISE",
    "turns": 19,
    "placeName": "Spa",
    "sourceId": "spa-francorchamps"
  },
  "Hungary": {
    "type": "RACE",
    "direction": "CLOCKWISE",
    "turns": 14,
    "placeName": "Budapest",
    "sourceId": "hungaroring"
  },
  "Netherlands": {
    "type": "RACE",
    "direction": "CLOCKWISE",
    "turns": 14,
    "placeName": "Zandvoort",
    "sourceId": "zandvoort"
  },
  "Italy": {
    "type": "RACE",
    "direction": "CLOCKWISE",
    "turns": 11,
    "placeName": "Monza",
    "sourceId": "monza"
  },
  "Madrid": {
    "type": "STREET",
    "direction": "CLOCKWISE",
    "turns": 22,
    "placeName": "Madrid",
    "sourceId": "madring"
  },
  "Azerbaijan": {
    "type": "STREET",
    "direction": "ANTI_CLOCKWISE",
    "turns": 20,
    "placeName": "Baku",
    "sourceId": "baku"
  },
  "Singapore": {
    "type": "STREET",
    "direction": "ANTI_CLOCKWISE",
    "turns": 19,
    "placeName": "Singapore",
    "sourceId": "marina-bay"
  },
  "United States": {
    "type": "RACE",
    "direction": "ANTI_CLOCKWISE",
    "turns": 20,
    "placeName": "Austin",
    "sourceId": "austin"
  },
  "Mexico": {
    "type": "RACE",
    "direction": "CLOCKWISE",
    "turns": 17,
    "placeName": "Mexico City",
    "sourceId": "mexico-city"
  },
  "Brazil": {
    "type": "RACE",
    "direction": "ANTI_CLOCKWISE",
    "turns": 15,
    "placeName": "São Paulo",
    "sourceId": "interlagos"
  },
  "Las Vegas": {
    "type": "STREET",
    "direction": "ANTI_CLOCKWISE",
    "turns": 17,
    "placeName": "Las Vegas",
    "sourceId": "las-vegas"
  },
  "Qatar": {
    "type": "RACE",
    "direction": "CLOCKWISE",
    "turns": 16,
    "placeName": "Lusail",
    "sourceId": "lusail"
  },
  "Abu Dhabi": {
    "type": "RACE",
    "direction": "ANTI_CLOCKWISE",
    "turns": 16,
    "placeName": "Abu Dhabi",
    "sourceId": "yas-marina"
  }
};
