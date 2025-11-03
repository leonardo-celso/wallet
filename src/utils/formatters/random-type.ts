export function CardType(value: string): string {
  const types = [
    "Green Card",
    "Black Card",
    "Platinum Card",
    "Gold Card",
    "Infinite Card",
  ];
  return types[Math.floor(Math.random() * types.length)];
}
