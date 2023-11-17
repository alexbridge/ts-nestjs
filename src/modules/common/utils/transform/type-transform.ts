export const stringToBoolean = (value: string): boolean => {
  const val = value?.trim();
  if (val === 'true') return true;
  if (val === 'false') return false;
  return !!val;
};
