import type { Product } from '../types/product';

export const products: Product[] = [
  // COLARES
    {
  id: '1',
  slug: 'colar-ponto-de-luz-lilas-prata-925',
  name: 'COLAR LAVANDA PRATA 925',
  price: 75.49,
  originalPrice: 143.93,
  discountBadge: '48% OFF',
  category: 'colares',
  shortDescription:
    'Colar delicado em Prata 925 com ponto de luz lilás, perfeito para iluminar o visual com elegância.',
  description:
    'O Colar Ponto de Luz Lilás em Prata 925 combina delicadeza e um toque de cor em uma peça versátil. Seu pingente redondo realça o brilho da pedra lilás, enquanto a corrente fina proporciona um acabamento leve e elegante. Ideal para usar sozinho ou em composições com outros colares.',
  isFeatured: true,
  material: 'Prata 925 legítima',
  warranty: '2 anos',
  image: '/colar-ponto-de-luz-lilas-02.png',
  images: [
    '/colar-ponto-de-luz-lilas-02.png',
  ],
},
  {
  id: '2',
  slug: 'colar-infinito-prata-925',
  name: 'COLAR INFINITY PRATA 925',
  price: 105.99,
  originalPrice: 204.89,
  discountBadge: '48% OFF',
  category: 'colares',
  shortDescription:
    'Colar em Prata 925 com delicado pingente no formato infinito.',
  description:
    'O Colar Infinito em Prata 925 apresenta um pingente delicado com detalhes brilhantes, simbolizando conexões e sentimentos que permanecem. Uma joia elegante e versátil para usar diariamente ou presentear alguém especial.',
  isFeatured: true,
  material: 'Prata 925 legítima',
  warranty: '2 anos',
  image: '/colar-infinito-prata-925.png',
  images: [
    '/colar-infinito-prata-925.png',
    '/colar-infinito-prata-925.png',
  ],
},
    {
    id: '3',
    slug: 'colar-diamante-prata-925',
    name: 'COLAR DIAMANTE PRATA 925',
    price: 95.70,
    originalPrice: 191.87,
    discountBadge: '50% OFF',
    category: 'colares',
    shortDescription:
      'Colar antialérgico em Prata 925 com pedra central lapidada e brilho marcante.',
    description:
      'O Colar Diamante é produzido em Prata 925 legítima com acabamento antialérgico. Sua pedra central lapidada se destaca pelo brilho intenso, enquanto a corrente delicada proporciona um acabamento elegante. Uma joia clássica para iluminar o visual em qualquer ocasião.',
    isFeatured: true,
    material: 'Prata 925 legítima e antialérgica',
    warranty: '2 anos',
    image: '/colar-diamante.jpeg',
    images: ['/colar-diamante.jpeg'],
  },
    {
    id: '4',
    slug: 'colar-filhinhos-prata-925',
    name: 'COLAR FILHINHOS PRATA 925',
    price: 78.90,
    originalPrice: 175.33,
    discountBadge: '55% OFF',
    category: 'colares',
    shortDescription:
      'Colar personalizado e antialérgico em Prata 925 com opções de 1 a 4 filhos.',
    description:
      'O Colar Filhinhos é produzido em Prata 925 legítima com acabamento antialérgico. Escolha de 1 a 4 pingentes e personalize cada filho como menino ou menina. Uma joia afetiva criada para representar sua família e manter esse vínculo sempre por perto.',
    isFeatured: true,
    material: 'Prata 925 legítima e antialérgica',
    warranty: '2 anos',
    image: '/colar-filho-1-menino.jpeg',
    images: [
      '/colar-filho-1-menino.jpeg',
      '/colar-filho-1-menina.jpeg',
      '/colar-filho-2-meninos.jpeg',
      '/colar-3-meninas.jpeg',
    ],
    allowsChildSelection: true,
    variants: [
      {
        id: '1-filho',
        label: '1 filho',
        childrenCount: 1,
        price: 78.90,
        originalPrice: 175.33,
      },
      {
        id: '2-filhos',
        label: '2 filhos',
        childrenCount: 2,
        price: 138.52,
        originalPrice: 307.82,
      },
      {
        id: '3-filhos',
        label: '3 filhos',
        childrenCount: 3,
        price: 189.90,
        originalPrice: 422.00,
      },
      {
        id: '4-filhos',
        label: '4 filhos',
        childrenCount: 4,
        price: 218.15,
        originalPrice: 484.78,
      },
    ],
  },

    // PULSEIRAS
  {
    id: '5',
    slug: 'pulseira-caracol-prata-925',
    name: 'PULSEIRA CARACOL PRATA 925',
    price: 58.75,
    originalPrice: 98.93,
    discountBadge: '41% OFF',
    category: 'pulseiras',
    shortDescription:
      'Pulseira antialérgica em Prata 925 com corrente torcida no estilo caracol.',
    description:
      'A Pulseira Caracol é produzida em Prata 925 legítima com acabamento antialérgico. Sua corrente delicadamente torcida reflete a luz e valoriza o brilho da prata. Um modelo versátil e elegante para usar sozinho ou combinar com outras pulseiras.',
    isFeatured: true,
    material: 'Prata 925 legítima e antialérgica',
    warranty: '2 anos',
    image: '/pulseira-caracol-prata-925.jpeg',
    images: ['/pulseira-caracol-prata-925.jpeg'],
  },
  {
    id: '6',
    slug: 'pulseira-ponto-de-luz-coracao-prata-925',
    name: 'PULSEIRA CORAÇÕES PRATA 925',
    price: 73.37,
    originalPrice: 132.49,
    discountBadge: '45% OFF',
    category: 'pulseiras',
    shortDescription:
      'Pulseira antialérgica em Prata 925 com pontos de luz em formato de coração.',
    description:
      'A Pulseira Corações é produzida em Prata 925 legítima com acabamento antialérgico. Sua corrente delicada recebe detalhes brilhantes em formato de coração, criando uma joia romântica e versátil para usar sozinha ou combinar com outras pulseiras.',
    isFeatured: true,
    material: 'Prata 925 legítima e antialérgica',
    warranty: '2 anos',
    image: '/pulseira-ponto-de-luz-corações-prata-925.jpeg',
    images: ['/pulseira-ponto-de-luz-corações-prata-925.jpeg'],
  },
  {
    id: '12',
    slug: 'pulseira-harmonia-prata-925',
    name: 'PULSEIRA HARMONIA PRATA 925',
    price: 78.59,
    originalPrice: 189.99,
    discountBadge: '59% OFF',
    category: 'pulseiras',
    shortDescription:
      'Pulseira antialérgica em Prata 925 com corrente fina e estilo minimalista.',
    description:
      'A Pulseira Harmonia é produzida em Prata 925 legítima com acabamento antialérgico. Sua corrente fina e seu estilo minimalista formam uma joia leve e versátil, perfeita para usar sozinha ou combinar com outras pulseiras em qualquer ocasião.',
    isFeatured: true,
    material: 'Prata 925 legítima e antialérgica',
    warranty: '2 anos',
    image: '/pulseira-harmonia.jpeg',
    images: ['/pulseira-harmonia.jpeg'],
  },

    {
    id: '13',
    slug: 'pulseira-gota-de-luz-prata-925',
    name: 'PULSEIRA GOTA DE LUZ PRATA 925',
    price: 88.67,
    originalPrice: 170.84,
    discountBadge: '48% OFF',
    category: 'pulseiras',
    shortDescription:
      'Pulseira antialérgica em Prata 925 com delicados pontos de luz em formato de gota.',
    description:
      'A Pulseira Gota de Luz é produzida em Prata 925 legítima com acabamento antialérgico. Seus delicados pingentes em formato de gota refletem a luz com suavidade, criando um visual elegante e feminino. Uma joia versátil para destacar o pulso em ocasiões especiais ou trazer brilho ao dia a dia.',
    isFeatured: true,
    material: 'Prata 925 legítima e antialérgica',
    warranty: '2 anos',
    image: '/pulseira-gota.jpeg',
    images: ['/pulseira-gota.jpeg'],
  },

  // BRINCOS

  // BRINCOS
    {
    id: '7',
    slug: 'brinco-ponto-de-luz-prata-925',
    name: 'BRINCO PONTO DE LUZ PRATA 925',
    price: 48.73,
    originalPrice: 89.57,
    discountBadge: '46% OFF',
    category: 'brincos',
    shortDescription:
      'Brinco antialérgico em Prata 925 com pontos de luz delicados e brilhantes.',
    description:
      'O Brinco Ponto de Luz é produzido em Prata 925 legítima com acabamento antialérgico. Suas pedras delicadas refletem a luz com elegância, formando uma joia clássica e versátil para usar diariamente ou complementar produções especiais.',
    isFeatured: true,
    material: 'Prata 925 legítima e antialérgica',
    warranty: '2 anos',
    image: '/brinco-ponto-de-luz.jpeg',
    images: ['/brinco-ponto-de-luz.jpeg'],
  },
    {
    id: '8',
    slug: 'argolinhas-cravejadas-prata-925',
    name: 'ARGOLINHAS CRAVEJADAS PRATA 925',
    price: 81.37,
    originalPrice: 148.23,
    discountBadge: '45% OFF',
    category: 'brincos',
    shortDescription:
      'Argolinhas antialérgicas em Prata 925 com delicados detalhes cravejados.',
    description:
      'As Argolinhas Cravejadas são produzidas em Prata 925 legítima com acabamento antialérgico. Seu design delicado recebe detalhes brilhantes que valorizam a joia com elegância. Um modelo leve e versátil para usar diariamente ou combinar com outros brincos.',
    isFeatured: true,
    material: 'Prata 925 legítima e antialérgica',
    warranty: '2 anos',
    image: '/argolinha-cravejada.jpeg',
images: ['/argolinha-cravejada.jpeg'],
  },
  
    {
    id: '9',
    slug: 'argolinhas-pontos-de-luz-prata-925',
    name: 'ARGOLINHAS PONTOS DE LUZ PRATA 925',
    price: 68.79,
    originalPrice: 147.16,
    discountBadge: '53% OFF',
    category: 'brincos',
    shortDescription:
      'Argolinhas antialérgicas em Prata 925 com delicados pontos de luz cravejados.',
    description:
      'As Argolinhas Pontos de Luz são produzidas em Prata 925 legítima com acabamento antialérgico. Seus detalhes cravejados refletem a luz com delicadeza e proporcionam um brilho elegante. Uma joia moderna e versátil para usar diariamente ou criar combinações com outros brincos.',
    isFeatured: true,
    material: 'Prata 925 legítima e antialérgica',
    warranty: '2 anos',
    image: '/brinco-argola-ponto-de-luz.jpeg',
    images: ['/brinco-argola-ponto-de-luz.jpeg'],
  },

  // CONJUNTOS
    {
  id: '10',
  slug: 'conjunto-bolinhas-prata-925',
  name: 'CONJUNTO PEROLA PRATA 925',
  price: 165.87,
  originalPrice: 220.35,
  discountBadge: '25% OFF',
  category: 'conjuntos',
  shortDescription:
    'Design delicado com pequenas bolinhas distribuídas pela corrente, criando pontos de brilho sutis e elegantes.',
  description:
    'O Conjunto Perola em Prata 925 combina delicadeza e versatilidade em peças que valorizam o visual com brilho discreto. As pequenas bolinhas distribuídas pelas correntes criam um acabamento elegante, ideal para usar no dia a dia ou complementar produções especiais.',
  isFeatured: true,
  material: 'Prata 925 legítima',
  warranty: '2 anos',
  image: '/conjunto-bolinhas-prata-925.png',
  images: ['/conjunto-bolinhas-prata-925.png'],
},
    {
    id: '11',
    slug: 'conjunto-aura-dourada',
    name: 'CONJUNTO AURA DOURADA',
    price: 117.98,
    originalPrice: 208.60,
    discountBadge: '43% OFF',
    category: 'conjuntos',
    shortDescription:
      'Conjunto banhado a ouro composto por colar e pulseira com design delicado e minimalista.',
    description:
      'O Conjunto Aura Dourada é composto por colar e pulseira banhados a ouro. Seu design delicado valoriza o brilho dourado com elegância e versatilidade, criando uma combinação perfeita para acompanhar produções do dia a dia ou ocasiões especiais.',
    isFeatured: true,
    material: 'Banhado a ouro',
    warranty: '1 ano',
    image: '/conjunto-aura-dourada.jpeg',
    images: ['/conjunto-aura-dourada.jpeg'],
  },


  // ANÉIS
  {
    id: '14',
    slug: 'anel-trilogia-prata-925',
    name: 'ANEL TRILOGIA PRATA 925',
    price: 53.77,
    originalPrice: 75.26,
    discountBadge: '29% OFF',
    category: 'aneis',
    shortDescription:
      'Anel antialérgico em Prata 925 com três delicados pontos de luz.',
    description:
      'O Anel Trilogia é produzido em Prata 925 legítima com acabamento antialérgico. Seus três pontos de luz criam um brilho delicado e elegante, formando uma joia versátil para usar diariamente ou combinar com outros anéis.',
    isFeatured: true,
    material: 'Prata 925 legítima e antialérgica',
    warranty: '2 anos',
    image: '/anel.webp',
    images: ['/anel.webp'],
    ringSizes: [14, 16, 18, 20, 22],
  },

    {
    id: '15',
    slug: 'anel-riviera-prata-925',
    name: 'ANEL RIVIERA PRATA 925',
    price: 77.58,
    originalPrice: 137.25,
    discountBadge: '43% OFF',
    category: 'aneis',
    shortDescription:
      'Anel antialérgico em Prata 925 com uma delicada sequência de pontos de luz.',
    description:
      'O Anel Riviera é produzido em Prata 925 legítima com acabamento antialérgico. Sua sequência de pontos de luz cria um brilho delicado e elegante, formando uma joia versátil para usar sozinha ou combinar com outros anéis.',
    isFeatured: true,
    material: 'Prata 925 legítima e antialérgica',
    warranty: '2 anos',
    image: '/anel-riviera.webp',
    images: ['/anel-riviera.webp'],
    ringSizes: [14, 16, 18, 20, 22],
  },
];