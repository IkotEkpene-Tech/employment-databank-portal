export interface Ward {
  id: string;
  name: string;
  villages: string[];
}

export const wards: Ward[] = [
  {
    id: "abiakpo",
    name: "Abiakpo",
    villages: ["Ikot Ebo", "Ikot Inyang", "Ikot Akpan", "Ndiya", "Obong Itam"],
  },
  {
    id: "amayam",
    name: "Amayam",
    villages: [
      "Ikot Ekang",
      "Ikot Udofia",
      "Afaha Ubit",
      "Ikot Udo",
      "Obio Ndot",
    ],
  },
  {
    id: "ikot-abia-idem",
    name: "Ikot Abia Idem",
    villages: ["Ikot Okon", "Ikot Nya", "Afaha Ikot", "Mbak Atai", "Nung Udoe"],
  },
  {
    id: "ikot-ekpene-urban-1",
    name: "Ikot Ekpene Urban 1",
    villages: [
      "Ward 1 Central",
      "Aba Road Area",
      "Calabar Road Area",
      "Market Square",
      "Government Station",
    ],
  },
  {
    id: "ikot-ekpene-urban-2",
    name: "Ikot Ekpene Urban 2",
    villages: [
      "Umuahia Road Area",
      "Nung Oku",
      "Ikot Osurua",
      "New Layout",
      "Industrial Area",
    ],
  },
  {
    id: "ikot-obioma",
    name: "Ikot Obioma",
    villages: [
      "Ikot Akpabio",
      "Ikot Ekpaw",
      "Afaha Obong",
      "Ikot Udom",
      "Nung Ikono",
    ],
  },
  {
    id: "ikpe-annang",
    name: "Ikpe Annang",
    villages: [
      "Ikot Ekpene",
      "Ikot Udo Obong",
      "Ikot Eba",
      "Afaha Ikpe",
      "Nung Ndem",
    ],
  },
  {
    id: "nkap",
    name: "Nkap",
    villages: [
      "Ikot Etefia",
      "Ikot Akpan Eda",
      "Afaha Nkap",
      "Ikot Obio",
      "Nung Atai",
    ],
  },
  {
    id: "odoro-ikpe",
    name: "Odoro Ikpe",
    villages: [
      "Ikot Inyang Udo",
      "Ikot Akpan Udo",
      "Afaha Odoro",
      "Ikot Enwang",
      "Mbak Obio",
    ],
  },
  {
    id: "uruk-uso",
    name: "Uruk Uso",
    villages: [
      "Ikot Udo Obobo",
      "Ikot Akpan Essien",
      "Afaha Uruk",
      "Ikot Ekpenyong",
      "Nung Obong",
    ],
  },
];

export const vocationalSkills = [
  "Tailoring / Fashion Design",
  "Carpentry / Woodwork",
  "Welding / Fabrication",
  "ICT / Computer Skills",
  "Hairdressing / Barbing",
  "Catering / Cooking",
  "Farming / Agriculture",
  "Electrical Installation",
  "Plumbing",
  "Auto Mechanic",
  "Bricklaying / Masonry",
  "Painting / Decoration",
  "Phone / Electronics Repair",
  "Photography / Videography",
  "Driving",
  "Beauty / Makeup Artistry",
  "Shoemaking / Leather Works",
  "Soap / Cream Making",
  "Event Planning",
  "Other",
];

export const educationalQualifications = [
  { id: "primary", label: "Primary School" },
  { id: "ssce", label: "SSCE / WAEC / NECO" },
  { id: "ond", label: "OND / NCE" },
  { id: "hnd", label: "HND" },
  { id: "bsc", label: "BSc / BA / B.Ed" },
  { id: "post-bsc", label: "Post-Graduate (MSc, PhD, etc.)" },
];
