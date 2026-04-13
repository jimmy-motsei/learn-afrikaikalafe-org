// ============================================================
// Afrika Ikalafe — Presenter Data
// Programme: Womb as Our First Ecology
// Maintained by: Maru Online · hello@maruonline.com
// Last updated: 27 March 2026
//
// IMAGE PATHS: Place presenter photos in /public/images/presenters/
// Filename convention: [slug].jpg (e.g. mmatshilo-motsei.jpg)
// Source files: /mnt/user-data/uploads/ (individual card images)
// ============================================================

export type Track = 'healing' | 'embodiment' | 'community' | 'convenor'

export interface Presenter {
  id: string                // URL-safe slug — used as image filename base
  name: string              // Full display name
  track: Track              // Programme track (maps to section colour)
  title: string             // Role / credential line
  institution?: string      // Affiliation (if separate from title)
  location: string          // Geographic location for display
  countryCode?: string      // ISO 3166-1 alpha-2 (for flag emoji, optional)
  bio: string               // Short paragraph for landing page card
  gathering?: number        // Assigned gathering number (1–7), null = TBC
  topic?: string            // Confirmed topic title (TBC if pending)
  imagePath: string         // Relative to /public — e.g. /images/presenters/slug.jpg
  isConvenor?: boolean      // Motsei gets special treatment
}

// ── TRACK COLOUR MAPPING ─────────────────────────────────────
// Aligns with design token system (globals.css)
// healing    → --color-clay   (#8B3A1E)
// embodiment → --color-ochre  (#C8873A)
// community  → --color-sage   (#4A5C40)
// convenor   → --color-earth  (#1C1208)

export const TRACK_LABELS: Record<Track, string> = {
  convenor:   'Convenor',
  healing:    'Healing',
  embodiment: 'Embodiment',
  community:  'Community',
}

// ── PRESENTER DATA ───────────────────────────────────────────

export const presenters: Presenter[] = [
  {
    id:          'mmatshilo-motsei',
    name:        'Mmatshilo Motsei',
    track:       'convenor',
    title:       'Nurse, Midwife & Integrative Healer · PhD in Sociology · Indigenous Knowledge Scholar',
    location:    'South Africa',
    countryCode: 'ZA',
    bio:         'Founder of Afrika Ikalafe Pluriversity and pioneer of African healing justice, Mmatshilo holds a PhD in Sociology and brings together decades of practice as a nurse, midwife, and integrative healer with deep grounding in Indigenous knowledge systems. Author of six books, her three decades of transformative activism — from founding ADAPT in Alexandra Township to the UN Scroll of Honour and two Honorary Doctorates — have placed her at the forefront of womb-centred, community-rooted healing.',
    gathering:   1,
    topic:       'Womb as First Ecology — The Concept, The Call, The Gathering',
    imagePath:   '/images/presenters/mmatshilo-motsei.jpg',
    isConvenor:  true,
  },
  {
    id:          'darlene-miller',
    name:        'Darlene Miller',
    track:       'healing',
    title:       'Visiting Professor, Centre for Women and Gender Studies',
    institution: 'Nelson Mandela University',
    location:    'South Africa',
    countryCode: 'ZA',
    bio:         'Professor Darlene Miller brings deep scholarship in gender studies and Indigenous knowledge systems to the programme. Her work centres the body as a site of political and ecological memory, tracing the connections between womb, land, and ancestral knowledge in Southern African contexts.',
    gathering:   2,
    topic:       'TBC',   // Suggested: Umbilical Ontologies — Indigenous Body-Archives and the Matrilineal Womb
    imagePath:   '/images/presenters/darlene-miller.jpg',
  },
  {
    id:          'jessica-horn',
    name:        'Jessica Horn',
    track:       'embodiment',
    title:       'African Feminist & Author',
    institution: 'Author of Feminist Praxis: Cartographies of Liberatory Worldmaking',
    location:    'East Africa',
    bio:         'Jessica Horn is an African feminist writer, strategist and practitioner whose work spans bodily autonomy, healing justice, and feminist movement building across the continent. Her book maps the cartographies of liberation through embodied practice — bringing rigour and lived wisdom to the question of what it means to remember the body.',
    gathering:   3,
    topic:       'TBC',   // Suggested: The Body as Archive — African Feminist Memory, Skin and Sacred Knowledge
    imagePath:   '/images/presenters/jessica-horn.jpg',
  },
  {
    id:          'lyn-ossome',
    name:        'Lyn Ossome',
    track:       'community',
    title:       'Associate Professor, Makerere Institute of Social Research',
    institution: 'Makerere University',
    location:    'Uganda',
    countryCode: 'UG',
    bio:         'Lyn Ossome is a feminist political economist whose scholarship examines land, labour, social reproduction, and the politics of belonging in East Africa. She brings rigorous theoretical grounding to questions of how wombs, bodies, and ecological systems are governed — and how they resist.',
    gathering:   4,
    topic:       'TBC',   // Suggested: Land, Body, Belonging — Social Reproduction and the Womb as Ecological Site
    imagePath:   '/images/presenters/lyn-ossome.jpg',
  },
  {
    id:          'francoise-verges',
    name:        'Françoise Vergès',
    track:       'healing',
    title:       'Author, Decolonial Feminist Activist & Independent Curator',
    institution: 'Senior Fellow Researcher, Sarah Parker Centre, UCL London',
    location:    'Réunion Islands / France',
    bio:         'Françoise Vergès is one of the world\'s foremost decolonial feminist thinkers — an author, activist, and curator whose work interrogates the entanglements of colonialism, race, capitalism, and the body. She brings a sharp global lens to the question of what it has meant, historically and politically, to reclaim the womb.',
    gathering:   5,
    topic:       'TBC',   // Suggested: The Womb Under Colonialism — Racialisation, Capital, and the Politics of Reclamation
    imagePath:   '/images/presenters/francoise-verges.jpg',
  },
  {
    id:          'rochelle-webster-nembhard',
    name:        'Rochelle Webster-Nembhard',
    track:       'embodiment',
    title:       'Interdisciplinary Artist',
    location:    'South Africa / Mexico',
    bio:         'Rochelle Webster-Nembhard works at the intersection of ritual, spatial systems, and embodied performance. Her practice refuses the separation of art, body, and land — creating experiences that hold the womb as a site of re-matriation, myth, and Indigenous feminine technology. She brings the dimension of creative and somatic practice to the programme.',
    gathering:   6,
    topic:       'TBC',   // Suggested: Re-matriation — Earth, Feminine Mythologies and Indigenous Technology
    imagePath:   '/images/presenters/rochelle-webster-nembhard.jpg',
  },
  {
    id:          'liz-hall',
    name:        'Liz Hall',
    track:       'community',
    title:       'Psychodynamic Psychotherapist',
    location:    'Aotearoa, New Zealand',
    bio:         'Liz Hall is a psychodynamic psychotherapist with a specialist interest in women\'s roles and archetypes within Māori storytelling traditions. She brings the southern hemisphere\'s Indigenous feminine frameworks into conversation with African womb-centred healing — holding the community dimension of the programme with warmth and depth.',
    gathering:   7,
    topic:       'TBC',
    imagePath:   '/images/presenters/liz-hall.jpg',
  },
]

// ── CONVENOR (convenience export) ───────────────────────────
export const convenor = presenters.find(p => p.isConvenor)!

// ── GUEST PRESENTERS (gatherings 2–7) ───────────────────────
export const guestPresenters = presenters.filter(p => !p.isConvenor)

// ── BY TRACK ─────────────────────────────────────────────────
export const presentersByTrack = {
  healing:    presenters.filter(p => p.track === 'healing'),
  embodiment: presenters.filter(p => p.track === 'embodiment'),
  community:  presenters.filter(p => p.track === 'community'),
}
