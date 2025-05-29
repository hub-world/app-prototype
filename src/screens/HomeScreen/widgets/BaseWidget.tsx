import classNames from "classnames";

type BaseWidgetProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function BaseWidget({ children, className, onClick }: BaseWidgetProps) {
  return (
    <div
      className={classNames(
        "rounded-lg bg-base-200 shadow-md select-none",
        onClick !== undefined &&
          "cursor-pointer transition-all duration-200 hover:bg-base-200/80 hover:shadow-lg active:scale-[0.98] active:shadow-md",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
