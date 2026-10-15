export const VOIVODESHIPS = [
  'dolnośląskie',
  'kujawsko-pomorskie',
  'lubelskie',
  'lubuskie',
  'łódzkie',
  'małopolskie',
  'mazowieckie',
  'opolskie',
  'podkarpackie',
  'podlaskie',
  'pomorskie',
  'śląskie',
  'świętokrzyskie',
  'warmińsko-mazurskie',
  'wielkopolskie',
  'zachodniopomorskie',
] as const;

export const VOIVODESHIP_OPTIONS = [
  { value: 'all', label: 'Cała Polska' },
  ...VOIVODESHIPS.map((name) => ({
    value: name,
    label: name,
    className: 'capitalize',
  })),
];

export const MONTHS = [
  'Sty',
  'Lut',
  'Mar',
  'Kwi',
  'Maj',
  'Cze',
  'Lip',
  'Sie',
  'Wrz',
  'Paź',
  'Lis',
  'Gru',
];

export const WORKSHOP_TYPES = [
  { value: 'gregorian', label: 'Chorał gregoriański', count: 42 },
  { value: 'polyphony', label: 'Polifonia sakralna', count: 28 },
  { value: 'choral', label: 'Śpiew chóralny', count: 57 },
  { value: 'divine-office', label: 'Śpiew brewiarzowy', count: 11 },
  { value: 'contemporary', label: 'Muzyka współczesna', count: 19 },
];

export const LEVELS = [
  { value: 'beginner', label: 'Początkujący', count: 36 },
  { value: 'intermediate', label: 'Średniozaawansowany', count: 48 },
  { value: 'advanced', label: 'Zaawansowany', count: 21 },
];

export const AMENITIES = [
  { value: 'accommodation', label: 'Zakwaterowanie w cenie' },
  { value: 'meals', label: 'Wyżywienie w cenie' },
  { value: 'free', label: 'Warsztaty bezpłatne' },
];

export const RESULT_COUNT = 132;
