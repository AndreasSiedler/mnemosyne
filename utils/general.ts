export function isEven(n: number) {
  n = Number(n);
  return n === 0 || !!(n && !(n%2));
}

export function isOdd(n: number) {
  return isEven(Number(n) + 1);
}