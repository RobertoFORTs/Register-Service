export const Frequency: {
  WEEKLY: 'WEEKLY';
  BIWEEKLY: 'BIWEEKLY';
  MONTHLY: 'MONTHLY';
  SEMESTERLY: 'SEMESTERLY';
} = {
  WEEKLY: 'WEEKLY',
  BIWEEKLY: 'BIWEEKLY',
  MONTHLY: 'MONTHLY',
  SEMESTERLY: 'SEMESTERLY',
};

export type Frequency = (typeof Frequency)[keyof typeof Frequency];