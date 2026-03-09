export const trimText = (str: string, length = 40, tail = "...") => {
  if (str.length > length) {
    return str.substring(0, length - tail.length) + tail;
  } else {
    return str;
  }
};

export const formatNumber = (num: number): string => {
  if (num < 1000) return num.toString();

  const units = [
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" },
  ];

  const unit = units.find((u) => num >= u.value);

  if (unit) {
    const formatted = (num / unit.value).toFixed(2);
    // Remove trailing zeros like "1.50k" -> "1.5k" or "1.00k" -> "1k"
    return parseFloat(formatted).toString() + unit.symbol;
  }

  return num.toString();
};
