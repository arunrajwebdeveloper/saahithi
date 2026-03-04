export const RangeType = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
} as const;

export type RangeType = (typeof RangeType)[keyof typeof RangeType];
