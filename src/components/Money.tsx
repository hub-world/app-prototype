export function Money({ amount }: { amount: number }) {
  return (
    <span>
      {new Intl.NumberFormat("sv-SE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)}
    </span>
  );
}
