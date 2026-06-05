

export const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatMoney = (amount) =>
  `MAD ${Number(amount ?? 0).toLocaleString()}`;
