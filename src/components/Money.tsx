import classNames from "classnames";

type MoneyProps = {
  amount: number;
  className?: string;
};

export function Money({ amount, className }: MoneyProps) {
  return (
    <span className={classNames("whitespace-nowrap", className)}>
      {new Intl.NumberFormat("sv-SE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)}
    </span>
  );
}
