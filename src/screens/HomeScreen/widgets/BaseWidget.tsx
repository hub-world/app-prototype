import classNames from "classnames";

type BaseWidgetProps = {
  children: React.ReactNode;
  className?: string;
};

export function BaseWidget({ children, className }: BaseWidgetProps) {
  return (
    <div
      className={classNames(
        "bg-base-200 hover:bg-base-200/80 hover:shadow-lg rounded-lg shadow-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
