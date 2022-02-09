

export default function sumArrayEqualTo(numbers, num) {
  for (let i = 0; i < numbers.length; i++) {
    let nroCompl = numbers.slice(i + 1).find((elem) => elem === num - numbers[i]);
    if (nroCompl) return [numbers[i], nroCompl];
  }
  return false;
}
