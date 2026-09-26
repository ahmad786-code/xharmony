export type SpaceType =
  | 'Apartament 1-2 Camere'
  | 'Apartament 3-4 Camere'
  | 'Casă / Vilă'
  | 'Spațiu Comercial / Birou';

export type ServiceType =
  | 'Curățenie Generală'
  | 'Curățenie de Întreținere'
  | 'Curățenie După Șantier';

export type FrequencyType = 'once' | 'biweekly' | 'weekly';

export interface SpaceOption {
  id: SpaceType;
  label: SpaceType;
  typicalArea: string;
  baseMin: number;
  baseMax: number;
  baseHours: string;
  teamSize: string;
}

export interface ServiceOption {
  id: ServiceType;
  label: ServiceType;
  shortDesc: string;
  multiplier: number;
  includedTasks: string[];
}

export interface ExtraOption {
  id: string;
  label: string;
  priceMin: number;
  priceMax: number;
}

export const PHONE_DISPLAY = '+40 740 191 693';
export const PHONE_TEL = '+40740191693';
export const WHATSAPP_NUMBER = '40740191693';
export const BUSINESS_ADDRESS = 'Strada Bogdan Petriceicu Hasdeu, Cluj-Napoca, Romania';

export const SPACE_OPTIONS: SpaceOption[] = [
  {
    id: 'Apartament 1-2 Camere',
    label: 'Apartament 1-2 Camere',
    typicalArea: '35 – 60 mp',
    baseMin: 250,
    baseMax: 350,
    baseHours: '3 – 4 ore',
    teamSize: '1 – 2 specialiști',
  },
  {
    id: 'Apartament 3-4 Camere',
    label: 'Apartament 3-4 Camere',
    typicalArea: '65 – 95 mp',
    baseMin: 360,
    baseMax: 490,
    baseHours: '4 – 6 ore',
    teamSize: '2 specialiști',
  },
  {
    id: 'Casă / Vilă',
    label: 'Casă / Vilă',
    typicalArea: '110 – 220+ mp',
    baseMin: 550,
    baseMax: 850,
    baseHours: '6 – 8 ore',
    teamSize: '2 – 3 specialiști',
  },
  {
    id: 'Spațiu Comercial / Birou',
    label: 'Spațiu Comercial / Birou',
    typicalArea: '50 – 300+ mp',
    baseMin: 320,
    baseMax: 650,
    baseHours: '3 – 6 ore',
    teamSize: '2 – 4 specialiști',
  },
];

export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: 'Curățenie de Întreținere',
    label: 'Curățenie de Întreținere',
    shortDesc: 'Menținerea prospețimii săptămânale sau bilunare pentru locuințe și birouri.',
    multiplier: 1.0,
    includedTasks: [
      'Aspirarea și spălarea tuturor pardoselilor (parchet, gresie, marmură)',
      'Ștergerea prafului de pe mobilier, electrocasnice și pervazuri',
      'Igienizarea și detartrarea suprafețelor din baie și bucătărie',
      'Curățarea oglinzilor și a suprafețelor vitrate interioare',
      'Colectarea reziduurilor, înlocuirea sacilor menajeri și aerisire',
    ],
  },
  {
    id: 'Curățenie Generală',
    label: 'Curățenie Generală',
    shortDesc: 'Igienizare în profunzime a fiecărui colț, recomandată sezonier sau la mutare.',
    multiplier: 1.4,
    includedTasks: [
      'Spălarea geamurilor (interior/exterior accesibil), ramelor și pervazurilor',
      'Degresarea completă a bucătăriei: faianță, hotă, fronturi dulapuri și cuptor',
      'Detartrarea și dezinfectarea integrală a băilor și obiectelor sanitare',
      'Curățarea corpurilor de iluminat, prizelor, ușilor și plintelor',
      'Aspirarea în profunzime a canapelelor, fotoliilor și saltelelor',
    ],
  },
  {
    id: 'Curățenie După Șantier',
    label: 'Curățenie După Șantier',
    shortDesc: 'Eliminarea prafului fin de construcții, urmelor de vopsea, ciment și adezivi.',
    multiplier: 1.85,
    includedTasks: [
      'Aspirare industrială profesională a prafului fin de pe pereți, tavane și pardoseli',
      'Îndepărtarea foliilor protectoare, etichetelor, urmelor de var, silicon și vopsea',
      'Curățarea în detaliu a tâmplăriei PVC/aluminiu și a suprafețelor vitrate',
      'Igienizarea și lustruirea gresiei, faianței și instalațiilor sanitare noi',
      'Evacuarea resturilor ușoare post-amenajare și ozonizare / parfumare',
    ],
  },
];

export const FREQUENCY_OPTIONS: {
  id: FrequencyType;
  label: string;
  discountLabel: string;
  factor: number;
}[] = [
  {
    id: 'once',
    label: 'O singură dată',
    discountLabel: 'Tarif standard',
    factor: 1.0,
  },
  {
    id: 'biweekly',
    label: 'Bilunar (2x / lună)',
    discountLabel: '-10% reducere abonament',
    factor: 0.9,
  },
  {
    id: 'weekly',
    label: 'Săptămânal (4x / lună)',
    discountLabel: '-15% reducere abonament',
    factor: 0.85,
  },
];

export const EXTRA_OPTIONS: ExtraOption[] = [
  {
    id: 'windows',
    label: 'Geamuri & tâmplărie (spălare detaliată)',
    priceMin: 60,
    priceMax: 100,
  },
  {
    id: 'upholstery',
    label: 'Injecție-extracție canapea / saltea',
    priceMin: 120,
    priceMax: 180,
  },
  {
    id: 'appliances',
    label: 'Degresare interior cuptor & frigider',
    priceMin: 80,
    priceMax: 120,
  },
];

export interface ClientReview {
  id: string;
  author: string;
  initials: string;
  rating: number;
  ratingText: string;
  quote: string;
  context: string;
  location: string;
  verifiedSource: string;
}

export const GOOGLE_REVIEWS: ClientReview[] = [
  {
    id: 'kaptalan-orsolya',
    author: 'Kaptalan Orsolya',
    initials: 'KO',
    rating: 5,
    ratingText: '⭐ 5/5',
    quote: 'We are satisfied, the services are of good quality and precise.',
    context: 'Curățenie Generală & Întreținere',
    location: 'Cluj-Napoca',
    verifiedSource: 'Recenzie Verificată Google Maps',
  },
  {
    id: 'gabriela-cindea',
    author: 'Gabriela Cindea',
    initials: 'GC',
    rating: 5,
    ratingText: '⭐ 5/5',
    quote:
      'Apreciez atenția la detalii și calitatea muncii. Am apelat la serviciile lor în mai multe locații.',
    context: 'Colaborare Multi-Locație Rezidențial & Birou',
    location: 'Cluj-Napoca',
    verifiedSource: 'Recenzie Verificată Google Maps',
  },
  {
    id: 'paula-oprea',
    author: 'Paula Oprea',
    initials: 'PO',
    rating: 5,
    ratingText: '⭐ 5/5',
    quote: 'Seriozitate și servicii de calitate! Recomand cu încredere!',
    context: 'Curățenie Profesională Apartament',
    location: 'Cluj-Napoca',
    verifiedSource: 'Recenzie Verificată Google Maps',
  },
];

export interface RoomStandard {
  id: string;
  title: string;
  subtitle: string;
  durationNote: string;
  items: string[];
}

export const ROOM_STANDARDS: RoomStandard[] = [
  {
    id: 'kitchen',
    title: 'Bucătărie & Zona de Dining',
    subtitle: 'Degresare termică și igienizare alimentară sigură',
    durationNote: '45 – 75 min alocate',
    items: [
      'Degresarea plitei, hotei, cuptorului la exterior și a faianței din zona de gătit',
      'Igienizarea chiuvetei, bateriei inox și lustruirea fără urme de calcar',
      'Ștergerea fronturilor de mobilier, mânerelor și electrocasnicelor mici',
      'Spălarea și dezinfectarea pardoselii cu soluții ecologice neutre',
    ],
  },
  {
    id: 'bathroom',
    title: 'Baie & Grupuri Sanitare',
    subtitle: 'Detartrare anticalcar și dezinfectare la standard hotelier',
    durationNote: '40 – 60 min alocate',
    items: [
      'Îndepărtarea depunerilor de calcar și săpun de pe cabina de duș și cadă',
      'Dezinfectarea vasului de toaletă, bideului și a chiuvetei cu soluții certificate',
      'Lustruirea oglinzilor, bateriilor cromate și a faianței până la luciu',
      'Igienizarea sifoanelor de pardoseală, ventilatoarelor și caloriferelor port-prosop',
    ],
  },
  {
    id: 'living',
    title: 'Living, Dormitoare & Holuri',
    subtitle: 'Eliminarea alergenilor și împrospătarea suprafețelor textile și lemnoase',
    durationNote: '60 – 90 min alocate',
    items: [
      'Aspirarea cu filtre HEPA a covoarelor, canapelelor, saltelelor și plintelor',
      'Îndepărtarea prafului de pe biblioteci, corpuri de iluminat, tablouri și electronice',
      'Curățarea geamurilor, pervazurilor, ușilor interioare și a întrerupătoarelor',
      'Tratarea și spălarea parchetului cu soluții dedicate care protejează fibra lemnului',
    ],
  },
  {
    id: 'commercial',
    title: 'Spații Comerciale & Birouri',
    subtitle: 'Productivitate și imagine impecabilă pentru echipă și clienți',
    durationNote: 'Program flexibil (06:00 – 22:00)',
    items: [
      'Igienizarea birourilor, monitoarelor, perifericelor și sălilor de ședință',
      'Curățarea pereților despărțitori din sticlă, recepției și vitrinelor stradale',
      'Dezinfectarea chicinetei, aparatului de cafea și a grupurilor sanitare cu trafic intens',
      'Aprovizionare consumabile și intervenții programate în afara orelor de birou',
    ],
  },
];

export const CLUJ_NEIGHBORHOODS = [
  'Hasdeu & Centru',
  'Zorilor & Europa',
  'Gheorgheni & Borhanci',
  'Mărăști & Între Lacuri',
  'Bună Ziua & Andrei Mureșanu',
  'Grigorescu & Plopilor',
  'Mănăștur & Făget',
  'Florești, Baciu & Apahida',
];
