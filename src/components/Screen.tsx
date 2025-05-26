import classNames from "classnames";
import type { LucideIcon } from "lucide-react";
import { Calendar1Icon, HomeIcon, UserIcon } from "lucide-react";
import { NavLink } from "react-router";

type ScreenProps = {
  children: React.ReactNode;
  className?: string;
  withTabs?: boolean;
};

export function Screen({ children, className, withTabs = false }: ScreenProps) {
  return (
    <div className={classNames("flex h-full w-full flex-col", className)}>
      <div className="flex-1 overflow-auto relative">{children}</div>

      {withTabs && (
        <div className="dock dock-lg static">
          <Tab to="/booking" icon={Calendar1Icon} />
          <Tab to="/home" icon={HomeIcon} />
          <Tab to="/profile" icon={UserIcon} />
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
