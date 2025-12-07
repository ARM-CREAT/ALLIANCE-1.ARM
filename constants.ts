
import { Member, ProgramPoint, NewsItem, MediaItem, Poll } from './types';

export const APP_NAME = "A.R.M.";
export const APP_FULL_NAME = "Alliance pour le Rassemblement Malien";
export const MOTTO = "Fraternité - Liberté - Égalité";
export const ADDRESS = "Sebenikoro, Rue 530, Porte 245, Bamako, Mali";
export const EMAIL = "bouadiakite@gmail.com";

// Logo SVG encodé en Base64 pour garantir l'affichage permanent sans dépendance externe
export const LOGO_URL = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNTAwIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzAwOTczOSIvPjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iMTcwIiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMjUwIiBjeT0iMjUwIiByPSIxNjAiIGZpbGw9IiNGQ0QxMTYiLz48dGV4dCB4PSI1MCUiIHk9IjQyJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI5MDAiIGZvbnQtc2l6ZT0iMTQwIiBmaWxsPSIjMDAwIj5BLlIuTTwvdGV4dD48dGV4dCB4PSI1MCUiIHk9IjY1JSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMwMDAiPkFMTElBTkNFIFBPVVIgTEU8L3RleHQ+PHRleHQgeD0iNTAlIiB5PSI3MiUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNjAwIiBmb250LXNpemU9IjI0IiBmaWxsPSIjMDAwIj5SQVNTRU1CTEVNRU5UIE1BTElFTjwvdGV4dD48L3N2Zz4=";

export const LEADERSHIP: Member[] = [
  {
    id: '1',
    name: "Lassine Diakité",
    role: "Président",
    location: "Yuncos, Toledo, Espagne / Bamako",
    phone: "0034 632 60 71 01",
    image: LOGO_URL 
  },
  {
    id: '2',
    name: "Dadou Sangare",
    role: "1er Vice-Président",
    location: "Milan, Italie",
    image: LOGO_URL
  },
  {
    id: '3',
    name: "Oumar Keita",
    role: "2ème Vice-Président",
    location: "Koutiala, Mali",
    phone: "00223 76 30 48 69",
    image: LOGO_URL
  },
  {
    id: '4',
    name: "Karifa Keita",
    role: "Secrétaire Général",
    location: "Bamako, Mali (Fonctionnaire d'État)",
    image: LOGO_URL
  },
  {
    id: '5',
    name: "Modibo Keita",
    role: "Secrétaire Administratif",
    location: "Sebenikoro, Bamako (Gestionnaire)",
    image: LOGO_URL
  },
  {
    id: '6',
    name: "Sokona Keita",
    role: "Trésorière",
    location: "Sebenikoro, Bamako (Sage-femme)",
    phone: "00223 75 17 99 20",
    image: LOGO_URL
  }
];

export const PROGRAM: ProgramPoint[] = [
  {
    title: "Sécurité & Défense",
    description: "Restauration de l'autorité de l'État sur tout le territoire.",
    iconName: "Shield",
    details: [
      "Augmentation du budget de la Défense et professionnalisation des FAMa.",
      "Mise en place de brigades de sécurité communautaire.",
      "Lutte contre le terrorisme et la criminalité transfrontalière."
    ]
  },
  {
    title: "Éducation",
    description: "Socle du renouveau national.",
    iconName: "BookOpen",
    details: [
      "Généralisation de l'éducation de base gratuite et obligatoire jusqu'à 16 ans.",
      "Construction de lycées techniques et centres de formation dans chaque cercle.",
      "Revalorisation salariale du personnel enseignant."
    ]
  },
  {
    title: "Santé Publique",
    description: "Une couverture sanitaire universelle.",
    iconName: "HeartPulse",
    details: [
      "Construction d'hôpitaux régionaux et CSCOM bien équipés.",
      "Gratuité des soins maternels et infantiles.",
      "Carte sanitaire nationale informatisée."
    ]
  },
  {
    title: "Agriculture & Élevage",
    description: "L'autosuffisance alimentaire comme priorité.",
    iconName: "Sprout",
    details: [
      "Plan National pour l'Agriculture Durable (PNAD).",
      "Subvention équitable des intrants agricoles.",
      "Création de banques de céréales et unités de transformation locales."
    ]
  },
  {
    title: "Emploi & Jeunesse",
    description: "L'avenir de la nation.",
    iconName: "Users",
    details: [
      "Programme National de l'Emploi des Jeunes (PRONEJ).",
      "Appui financier aux PME et startups.",
      "Incitations fiscales pour les entreprises qui embauchent localement."
    ]
  },
  {
    title: "Infrastructures",
    description: "Désenclaver le Mali.",
    iconName: "Truck",
    details: [
      "Réhabilitation du réseau routier et ferroviaire (Corridor Nord-Sud / Est-Ouest).",
      "Accès à l'électricité et à l'eau potable pour tous.",
      "Construction de logements sociaux."
    ]
  }
];

export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: '1',
    title: "Lancement officiel du parti A.R.M",
    date: "2023-11-28",
    category: "Politique",
    content: "Le président Lassine Diakité a officiellement lancé les activités du parti à Bamako. Une journée historique marquée par une forte mobilisation de la jeunesse.",
    image: LOGO_URL
  },
  {
    id: '2',
    title: "Visite à Sebenikoro",
    date: "2023-12-05",
    category: "Social",
    content: "Rencontre avec les habitants de la commune IV pour discuter des problèmes d'eau et présenter les solutions concrètes du programme A.R.M.",
    image: LOGO_URL
  },
  {
    id: '3',
    title: "Conférence sur la Paix",
    date: "2024-01-15",
    category: "Événement",
    content: "L'A.R.M organise une grande visioconférence avec la diaspora malienne pour consolider l'unité nationale et l'intégrité du territoire.",
    image: LOGO_URL
  }
];

export const DEFAULT_MEDIA: MediaItem[] = [
  {
    id: '1',
    title: "Rassemblement Bamako",
    url: LOGO_URL,
    date: "2024-02-10"
  },
  {
    id: '2',
    title: "Tournée Régionale",
    url: LOGO_URL,
    date: "2024-03-15"
  },
  {
    id: '3',
    title: "Rencontre Jeunesse",
    url: LOGO_URL,
    date: "2024-04-05"
  }
];

export const DEFAULT_POLLS: Poll[] = [
  {
    id: 'poll-1',
    question: "Quelle doit être la priorité du prochain gouvernement ?",
    isActive: true,
    totalVotes: 142,
    options: [
      { id: 'opt-1', text: "Sécurité & Défense", votes: 85 },
      { id: 'opt-2', text: "Éducation & Jeunesse", votes: 35 },
      { id: 'opt-3', text: "Santé Publique", votes: 22 }
    ]
  }
];
