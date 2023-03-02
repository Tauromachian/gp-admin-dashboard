export function getRandomString() {
  return `${new Date().getTime()}-${Math.random() * 1000}`;
}
