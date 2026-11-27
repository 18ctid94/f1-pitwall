// All points use the existing 320 x 200 rendered geometry coordinate space.
export type Point=[number,number];
export type Annotation={source:string;corners:{number:number;anchor:Point;label:Point}[];start?:{point:Point;angle:number};direction?:{point:Point;angle:number};pit?:{points:Point[];entry:Point;exit:Point}};
// Approximate schematic positions on the existing F1DB geometry; not game telemetry.
export const annotations:Record<string,Annotation>={
  "bahrain-1": {
  "source": "FIA 2025 Bahrain Circuit Map V4; schematic alignment to F1DB",
  "corners": [
    {
      "number": 1,
      "anchor": [
        41.029,
        179.924
      ],
      "label": [
        18,
        187
      ]
    },
    {
      "number": 2,
      "anchor": [
        50.179,
        163.635
      ],
      "label": [
        73,
        163
      ]
    },
    {
      "number": 3,
      "anchor": [
        45.644,
        138.979
      ],
      "label": [
        24,
        140
      ]
    },
    {
      "number": 4,
      "anchor": [
        68.686,
        16.251
      ],
      "label": [
        60,
        2
      ]
    },
    {
      "number": 5,
      "anchor": [
        108.493,
        51.671
      ],
      "label": [
        102,
        39
      ]
    },
    {
      "number": 6,
      "anchor": [
        124.11,
        65.945
      ],
      "label": [
        142,
        47
      ]
    },
    {
      "number": 7,
      "anchor": [
        126.11,
        87.652
      ],
      "label": [
        105,
        94
      ]
    },
    {
      "number": 8,
      "anchor": [
        161.265,
        119.65
      ],
      "label": [
        170,
        107
      ]
    },
    {
      "number": 9,
      "anchor": [
        113.858,
        124.915
      ],
      "label": [
        130,
        145
      ]
    },
    {
      "number": 10,
      "anchor": [
        79.861,
        133.495
      ],
      "label": [
        67,
        117
      ]
    },
    {
      "number": 11,
      "anchor": [
        215.345,
        130.163
      ],
      "label": [
        231,
        137
      ]
    },
    {
      "number": 12,
      "anchor": [
        168.401,
        78.049
      ],
      "label": [
        148,
        78
      ]
    },
    {
      "number": 13,
      "anchor": [
        193.177,
        27.816
      ],
      "label": [
        193,
        10
      ]
    },
    {
      "number": 14,
      "anchor": [
        279.509,
        168.563
      ],
      "label": [
        302,
        170
      ]
    },
    {
      "number": 15,
      "anchor": [
        266.027,
        181.108
      ],
      "label": [
        269,
        198
      ]
    }
  ],
  "start": {
    "point": [
      134.11,
      184.0
    ],
    "angle": 0
  },
  "direction": {
    "point": [
      176.002,
      184.0
    ],
    "angle": 180
  }
}
};
