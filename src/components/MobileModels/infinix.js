// infinix.js

const infinixModels = [
  // Models with stock
  {
    code: "0170",
    name: "INFINIX HOT 8",
    quantity: 50,
    purchasePrice: 10000,
    salePrice: 13000,
  },
  {
    code: "0171",
    name: "INFINIX HOT 8 LITE",
    quantity: 40,
    purchasePrice: 11000,
    salePrice: 14000,
  },
  {
    code: "0172",
    name: "INFINIX HOT 10i",
    quantity: 35,
    purchasePrice: 12000,
    salePrice: 15000,
  },
  {
    code: "0173",
    name: "INFINIX HOT 11",
    quantity: 45,
    purchasePrice: 13000,
    salePrice: 16000,
  },
  {
    code: "0174",
    name: "INFINIX HOT 12i",
    quantity: 30,
    purchasePrice: 14000,
    salePrice: 17000,
  },
  {
    code: "0175",
    name: "INFINIX HOT 20i",
    quantity: 25,
    purchasePrice: 15000,
    salePrice: 18000,
  },
  {
    code: "0176",
    name: "INFINIX HOT 20 5G",
    quantity: 20,
    purchasePrice: 16000,
    salePrice: 19000,
  },
  {
    code: "0177",
    name: "INFINIX HOT 30i",
    quantity: 15,
    purchasePrice: 17000,
    salePrice: 20000,
  },
  {
    code: "0178",
    name: "INFINIX SMART 6",
    quantity: 55,
    purchasePrice: 18000,
    salePrice: 21000,
  },
  {
    code: "0179",
    name: "INFINIX SMART 6 HD",
    quantity: 50,
    purchasePrice: 19000,
    salePrice: 22000,
  },
  {
    code: "0180",
    name: "INFINIX SMART 7 HD (SAM A70)",
    quantity: 40,
    purchasePrice: 20000,
    salePrice: 23000,
  },
  // Models with no hole and no stock
  {
    code: "0181",
    name: "INFINIX HOT 40i",
    quantity: 0,
    purchasePrice: 21000,
    salePrice: 24000,
    noHole: true,
  },
  {
    code: "0182",
    name: "TECNO SPARK 20",
    quantity: 0,
    purchasePrice: 22000,
    salePrice: 25000,
    noHole: true,
  },
  {
    code: "0183",
    name: "TECNO SPARK 20C",
    quantity: 0,
    purchasePrice: 23000,
    salePrice: 26000,
    noHole: true,
  },
  {
    code: "0184",
    name: "TECNO SPARK GO 2024",
    quantity: 0,
    purchasePrice: 24000,
    salePrice: 27000,
    noHole: true,
  },
  {
    code: "0185",
    name: "TECNO POP 8",
    quantity: 0,
    purchasePrice: 25000,
    salePrice: 28000,
    noHole: true,
  },
  {
    code: "0186",
    name: "TECNO SMART 8",
    quantity: 0,
    purchasePrice: 26000,
    salePrice: 29000,
    noHole: true,
  },
  {
    code: "0187",
    name: "TECNO SMART 8 PRO (OPPO A71)",
    quantity: 0,
    purchasePrice: 27000,
    salePrice: 30000,
    noHole: true,
  },
  // Models with no hole and no stock
  {
    code: "0188",
    name: "INFINIX HOT 10",
    quantity: 0,
    purchasePrice: 28000,
    salePrice: 31000,
    noHole: true,
  },
  {
    code: "0189",
    name: "INFINIX HOT 11S",
    quantity: 0,
    purchasePrice: 29000,
    salePrice: 32000,
    noHole: true,
  },
  {
    code: "0190",
    name: "INFINIX HOT 20S",
    quantity: 0,
    purchasePrice: 30000,
    salePrice: 33000,
    noHole: true,
  },
  {
    code: "0191",
    name: "INFINIX HOT 30",
    quantity: 0,
    purchasePrice: 31000,
    salePrice: 34000,
    noHole: true,
  },
  {
    code: "0192",
    name: "INFINIX HOT 30 5G",
    quantity: 0,
    purchasePrice: 32000,
    salePrice: 35000,
    noHole: true,
  },
  {
    code: "0193",
    name: "INFINIX HOT 40",
    quantity: 0,
    purchasePrice: 33000,
    salePrice: 36000,
    noHole: true,
  },
  {
    code: "0194",
    name: "INFINIX HOT 40 PRO",
    quantity: 0,
    purchasePrice: 34000,
    salePrice: 37000,
    noHole: true,
  },
  {
    code: "0195",
    name: "INFINIX NOTE 30 4G",
    quantity: 0,
    purchasePrice: 35000,
    salePrice: 38000,
    noHole: true,
  },
  {
    code: "0196",
    name: "INFINIX NOTE 30 5G",
    quantity: 0,
    purchasePrice: 36000,
    salePrice: 39000,
    noHole: true,
  },
  {
    code: "0197",
    name: "INFINIX ZERO 5G",
    quantity: 0,
    purchasePrice: 37000,
    salePrice: 40000,
    noHole: true,
  },
  {
    code: "0198",
    name: "INFINIX ZERO 5G 2023 (MOTO G60)",
    quantity: 0,
    purchasePrice: 38000,
    salePrice: 41000,
    noHole: true,
  },
  // Remaining models with stock
  {
    code: "0199",
    name: "INFINIX NOTE 12",
    quantity: 30,
    purchasePrice: 39000,
    salePrice: 42000,
  },
  {
    code: "0200",
    name: "INFINIX NOTE 12 (2023)",
    quantity: 25,
    purchasePrice: 40000,
    salePrice: 43000,
  },
  {
    code: "0201",
    name: "INFINIX NOTE 12 G96",
    quantity: 20,
    purchasePrice: 41000,
    salePrice: 44000,
  },
  {
    code: "0202",
    name: "INFINIX NOTE 12 PRO",
    quantity: 15,
    purchasePrice: 42000,
    salePrice: 45000,
  },
  {
    code: "0203",
    name: "INFINIX NOTE 12i 2022",
    quantity: 10,
    purchasePrice: 43000,
    salePrice: 46000,
  },
  {
    code: "0204",
    name: "INFINIX ZERO 20 (SAM A70)",
    quantity: 5,
    purchasePrice: 44000,
    salePrice: 47000,
  },
];

export default infinixModels;
