export const isToday = (isoDate: string) => {
  const today = new Date();
  const target = new Date(isoDate);
  return (
    target.getDate() === today.getDate() &&
    target.getMonth() === today.getMonth() &&
    target.getFullYear() === today.getFullYear()
  );
};
