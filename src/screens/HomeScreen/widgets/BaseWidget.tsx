import classNames from "classnames";
import { Link } from "react-router";

type BaseWidgetProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  to?: string;
};

export function BaseWidget({ children, className, ...props }: BaseWidgetProps) {
  const Component = props.to ? Link : "div";
  const clickable = !!props.onClick || !!props.to;

  return (
    <Component
      className={classNames(
        "rounded-lg bg-base-200 shadow-md select-none",
        clickable &&
          "cursor-pointer transition-all duration-200 hover:bg-base-200/80 hover:shadow-lg active:scale-[0.98] active:shadow-md",
        className,
      )}
      onClick={props.onClick}
      to={props.to ?? "/home"}
    >
      {children}
    </Component>
  );
}
