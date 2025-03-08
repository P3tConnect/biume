const adjectives = [
  "sweet",
  "crazy",
  "tiny",
  "late",
  "bold",
  "wise",
  "holy",
  "brave",
  "sunny",
  "quick",
  "rapid",
  "quiet",
  "wild",
  "broad",
  "eager",
  "calm",
  "happy",
  "fancy",
  "dark",
  "light",
  "cold",
  "warm",
  "shiny",
  "misty",
  "proud",
  "loud",
  "soft",
  "cool",
  "neat",
  "rare",
]

const subjects = [
  // Nature
  "rainbow",
  "forest",
  "river",
  "mountain",
  "ocean",
  "sunset",
  "flower",
  "cloud",
  "storm",
  "star",

  // Animaux
  "dolphin",
  "penguin",
  "tiger",
  "eagle",
  "panda",
  "koala",
  "lion",
  "wolf",
  "fox",
  "owl",

  // Pierres précieuses
  "diamond",
  "ruby",
  "sapphire",
  "emerald",
  "crystal",
  "jade",
  "pearl",
  "opal",
  "topaz",
  "amethyst",

  // Éléments
  "fire",
  "water",
  "earth",
  "wind",
  "thunder",
  "frost",
  "flame",
  "spark",
  "wave",
  "leaf",
]

export function generateMigrationName(): string {
  const randomNumber = getRandomNumber()
  const paddedIndex = randomNumber.toString().padStart(4, "0")
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomSubject = subjects[Math.floor(Math.random() * subjects.length)]

  return `${paddedIndex}_${randomAdjective}_${randomSubject}`
}

function getRandomNumber(min: number = 0, max: number = 9): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
