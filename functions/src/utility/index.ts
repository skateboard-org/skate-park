export const isStringValid = (str: any) => {
  if (typeof str !== "string") return false;
  if (str === undefined) return false;
  if (str === null) return false;
  if (str.length === 0) return false;
  return true;
};
