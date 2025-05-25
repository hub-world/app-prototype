import classNames from "classnames";
import type { LucideIcon } from "lucide-react";
import { Calendar1, Home, User } from "lucide-react";
import { NavLink } from "react-router";

type ScreenProps = {
  children: React.ReactNode;
  className?: string;
  withTabs?: boolean;
};

export function Screen({ children, className, withTabs = false }: ScreenProps) {
  return (
    <div className={classNames("flex h-full w-full flex-col", className)}>
      <div className="flex-1 overflow-hidden relative">{children}</div>

      {withTabs && (
        <div className="dock dock-lg static">
          <Tab to="/booking" icon={Calendar1} />
          <Tab to="/home" icon={Home} />
          <Tab to="/profile" icon={User} />
        </div>
      )}
    </div>
  );
}

type TabProps = {
  to: string;
  icon: LucideIcon;
};

function Tab({ to, icon: Icon }: TabProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? "dock-active" : "")}
    >
      <Icon />
    </NavLink>
  );
}
