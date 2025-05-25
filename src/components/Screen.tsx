import classNames from "classnames";
import { Calendar1, Home, User } from "lucide-react";
import { NavLink } from "react-router";

import { Logo } from "./Logo";

export function Screen({
  children,
  className,
  withLogo = false,
  withTabs = false,
  fontsLoaded = true,
}: {
  children: React.ReactNode;
  className?: string;
  withLogo?: boolean;
  withTabs?: boolean;
  fontsLoaded?: boolean;
}) {
  return (
    <div
      className={classNames(
        "relative flex h-full w-full flex-col transition-opacity duration-300",
        fontsLoaded ? "opacity-100" : "opacity-0",
        className,
      )}
      style={{ visibility: fontsLoaded ? "visible" : "hidden" }}
    >
      <div className="flex-1 overflow-auto">
        {withLogo && (
          <div className="m-4">
            <Logo />
          </div>
        )}

        {children}
      </div>

      {withTabs && (
        <div className="dock dock-lg absolute right-0 bottom-0 left-0">
          <NavLink
            to="/booking"
            className={({ isActive }) => (isActive ? "dock-active" : "")}
          >
            <Calendar1 />
          </NavLink>

          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "dock-active" : "")}
          >
            <Home />
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "dock-active" : "")}
          >
            <User />
          </NavLink>
        </div>
      )}
    </div>
  );
}
