export const capitalizeFirstLetter = (string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateStringId = (subFix) => {
  const dateStrId = new Date().getTime().toString(36);
  const randomStr1 = Math.random().toString(36).substring(7);
  const randomStr2 = Math.random().toString(36).substring(7);

  const randomId = `${dateStrId}_${randomStr1}${randomStr2}`;
  const finalId = subFix != null ? `${subFix}_${randomId}` : randomId;

  // Replace all '-' with nothing
  return finalId.replace(/-/g, "");
};

export const randomValueBetween = (min, max) => Math.random() * (max - min) + min;

export const randomDateBetween = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
