export function computeBinProbabilities(rowCount) {
  const p = 0.5; // probability of success on a single trial
  const probabilities = [];

  for (let k = 0; k <= rowCount; k++) {
    const binomialCoefficient =
      factorial(rowCount) / (factorial(k) * factorial(rowCount - k));
    const probability =
      binomialCoefficient * Math.pow(p, k) * Math.pow(1 - p, rowCount - k);
    probabilities.push(probability);
  }

  return probabilities;
}

export function convertScale(valueA, scaleA, scaleB) {
  const [minA, maxA] = scaleA;
  const [minB, maxB] = scaleB;

  const percentage = (valueA - minA) / (maxA - minA);
  const valueB = percentage * (maxB - minB) + minB;

  return valueB;
}

export function countValueOccurrences(values) {
  const result = {};
  for (const value of values) {
    result[value] = (result[value] || 0) + 1;
  }
  return result;
}

export function dotProduct(a, b) {
  return a.reduce((acc, value, index) => acc + value * b[index], 0);
}

export function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export function formatCurrency(value) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    currency: "USD",
  });
}

export function getRandomBetween(min, max) {
  return min + Math.random() * (max - min);
}
