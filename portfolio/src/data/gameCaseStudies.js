// Lightweight case studies for shipped mobile games.
// These complement the deeper AI/ML case studies in aiProjectDetails.js.

export const gameCaseStudies = [
  {
    slug: 'ultimate-motorcycle-dealer-simulator',
    name: 'Ultimate Motorcycle Dealer Simulator',
    tagline:
      'A mobile motorcycle-dealership tycoon built from scratch, from the economy loop to the save system.',
    platform: 'Android (Google Play)',
    store: 'Google Play',
    genre: 'Simulation / Tycoon / Business',
    role: 'Solo Developer',
    team: 'Solo developer; graphic designer (UI, SFX); QA tester',
    scale: '100K+ downloads',
    rating: '4.3★',
    storeUrl:
      'https://play.google.com/store/apps/details?id=com.bfg.bike.dealer.job.tycoon',
    image: '/images/projects/ultimate-motorcycle-dealer.webp',
    imageFallback: '/nadeemsaleem3/images/projects/ultimate-motorcycle-dealer.webp',
    accent: 'from-blue-700 to-cyan-700',
    accentText: 'text-blue-700 dark:text-blue-300',
    accentSoft: 'bg-blue-500/10 text-blue-800 dark:text-blue-200',
    context:
      'A mobile tycoon game where players build a motorcycle dealership: buy, repair, customize, and sell bikes.',
    challenge:
      'The core loop tied together economy, inventory, customization, and persistent player progress. The save system had to keep all of that consistent across sessions, and the shop had to stay responsive on mid-range Android devices.',
    actions: [
      'Built the complete game from scratch in Unity and C#.',
      'Implemented the buy → repair → customize → sell loop and the economy and progression rules behind it.',
      'Designed the save system for player progression, inventory, and customization state.',
      'Integrated the UI and SFX produced by the graphic designer.',
      'Worked with QA to reproduce, prioritise, and close pre-release defects.',
      'Owned the Google Play release process.',
    ],
    results: [
      '100K+ downloads and a 4.3★ rating on Google Play.',
      'Progression, inventory, and customization state persisted correctly across sessions through the save system.',
      'Shipped as a complete, self-contained tycoon title with UI, audio, and QA handled by a three-person team.',
    ],
    stack: ['Unity', 'C#', 'Mobile save systems', 'Google Play publishing'],
  },
  {
    slug: 'car-dealer-job-car-games',
    name: 'Car Dealer Job: Car Games',
    tagline:
      'A car-dealership tycoon that combines a business loop with test-drive and vehicle-upgrade systems.',
    platform: 'Android (Google Play)',
    store: 'Google Play',
    genre: 'Simulation / Tycoon / Racing',
    role: 'Solo Developer',
    team: 'Solo developer; graphic designer (UI, SFX); QA tester',
    scale: '100K+ downloads',
    rating: '4.0★',
    storeUrl:
      'https://play.google.com/store/apps/details?id=com.bfg.car.dealer.job.car.game',
    image: '/images/projects/car-dealer-job.webp',
    imageFallback: '/nadeemsaleem3/images/projects/car-dealer-job.webp',
    accent: 'from-orange-600 to-red-700',
    accentText: 'text-orange-700 dark:text-orange-300',
    accentSoft: 'bg-orange-500/10 text-orange-800 dark:text-orange-200',
    context:
      'A car-dealership tycoon game where players test drive, repair, upgrade, and sell vehicles.',
    challenge:
      'The game combined a dealership economy with vehicle test-drive sections, so the save system had to cover money, inventory, vehicle state, and progression while the driving sections stayed playable on mobile hardware.',
    actions: [
      'Built the complete game from scratch in Unity and C#.',
      'Implemented the dealership loop: test drive, repair, upgrade, and sell.',
      'Designed the save system for player progress, vehicles, and inventory.',
      'Integrated the UI and SFX produced by the graphic designer.',
      'Worked with QA through the test-and-fix cycle before release.',
      'Owned the Google Play release process.',
    ],
    results: [
      '100K+ downloads and a 4.0★ rating on Google Play.',
      'Money, vehicle state, inventory, and progression persisted across sessions.',
      'Shipped as a complete tycoon and driving title with a small collaborative team.',
    ],
    stack: ['Unity', 'C#', 'Mobile save systems', 'Vehicle systems', 'Google Play publishing'],
  },
  {
    slug: 'triple-tile-match-mahjong',
    name: 'Triple Tile Match Mahjong',
    tagline:
      'A content-driven triple-match puzzle game with a clear level curve and a 4.8★ App Store rating.',
    platform: 'iOS (App Store)',
    store: 'App Store',
    genre: 'Puzzle / Match-3 / Casual',
    role: 'Solo Developer',
    team: 'Solo developer; graphic designer (UI, SFX); QA tester',
    scale: '4.8★ rating',
    rating: '4.8★',
    storeUrl:
      'https://apps.apple.com/us/app/triple-tile-match-mahjong-game/id1616614400',
    image: '/images/projects/triple-tile-mahjong.webp',
    imageFallback: '/nadeemsaleem3/images/projects/triple-tile-mahjong.webp',
    accent: 'from-emerald-600 to-teal-700',
    accentText: 'text-emerald-700 dark:text-emerald-300',
    accentSoft: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-200',
    context:
      'A relaxing triple-match mahjong puzzle game with multiple tile sets and increasingly challenging levels.',
    challenge:
      'The core match logic, level progression, and difficulty curve had to stay clear and readable on a small screen, with a UI that made large tile sets easy to scan.',
    actions: [
      'Built the core triple-match logic and level system in Unity and C#.',
      'Implemented the progression and difficulty structure behind the level sequence.',
      'Integrated the UI and SFX produced by the graphic designer.',
      'Worked with QA to close pre-release issues.',
      'Owned the App Store release process.',
    ],
    results: [
      '4.8★ rating on the App Store.',
      'Delivered a polished, content-driven puzzle title with a readable UI and a clear level curve.',
      'Shipped through the App Store review process as a complete game.',
    ],
    stack: ['Unity', 'C#', 'Puzzle systems', 'App Store publishing'],
  },
  {
    slug: 'long-road-trip-car-driving-sim',
    name: 'Long Road Trip Car Driving Sim',
    tagline:
      'A long-distance driving simulator built for scale, with 500K+ downloads and a focus on mobile performance.',
    platform: 'Android (Google Play)',
    store: 'Google Play',
    genre: 'Simulation / Driving / Racing',
    role: 'Solo Developer',
    team: 'Solo developer; graphic designer (UI, SFX); QA tester',
    scale: '500K+ downloads',
    rating: '3.7★',
    storeUrl:
      'https://play.google.com/store/apps/details?id=com.gt.longtrip.road.drive',
    image: '/images/projects/long-road-trip.webp',
    imageFallback: '/nadeemsaleem3/images/projects/long-road-trip.webp',
    accent: 'from-slate-600 to-blue-700',
    accentText: 'text-slate-700 dark:text-slate-300',
    accentSoft: 'bg-slate-500/10 text-slate-800 dark:text-slate-200',
    context:
      'A long-distance driving simulator focused on highways and scenic routes.',
    challenge:
      'Large, continuous driving routes put the focus on vehicle feel, environment performance, and scope control on lower-end Android devices.',
    actions: [
      'Built the complete game from scratch in Unity and C#.',
      'Implemented the driving and route/environment systems.',
      'Focused on mobile performance and scope control for long routes.',
      'Integrated the UI and SFX produced by the graphic designer.',
      'Worked with QA through the test-and-fix cycle.',
      'Owned the Google Play release process.',
    ],
    results: [
      '500K+ downloads on Google Play.',
      '3.7★ rating — the scale of the project made performance and scope control the central engineering challenge.',
      'Shipped as a complete driving title with a small collaborative team.',
    ],
    stack: ['Unity', 'C#', 'Mobile performance', 'Driving systems', 'Google Play publishing'],
  },
];

export const getGameCaseStudy = (slug) =>
  gameCaseStudies.find((project) => project.slug === slug);

export const hasGameCaseStudy = (slug) => Boolean(getGameCaseStudy(slug));
