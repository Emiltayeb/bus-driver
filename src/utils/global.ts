export const setCustomCssProperty = function (
  propertyName: string,
  value: string
) {
  const root = document.documentElement;
  root.style.setProperty(propertyName, value);
};
