export const genUniqueId = (): string => {
  const date = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);

  return `${date}-${rand}`;
};
