import classNames from "classnames";
import { NavLink } from "react-router";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <NavLink to="/home">
      <h1 className={classNames("text-3xl font-medium", className)}>
        Urban Hub.
      </h1>
    </NavLink>
  );
}
