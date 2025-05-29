import classNames from "classnames";
import {
  ChevronRightIcon,
  CircleDotIcon,
  DumbbellIcon,
  InfoIcon,
  LayoutPanelTopIcon,
  LeafIcon,
  LockIcon,
  LockOpenIcon,
  type LucideIcon,
  MapPinIcon,
  MessageCircleQuestionIcon,
  ReceiptTextIcon,
  SunIcon,
  WifiIcon,
} from "lucide-react";
import { NavLink } from "react-router";
import blueprint from "~/assets/blueprint.jpg";

import { BaseWidget } from "./widgets/BaseWidget";
import { MoodWidget } from "./widgets/MoodWidget";
import { OccupancyWidget } from "./widgets/OccupancyWidget";

export function HomeScreen() {
  return (
    <div>
      <img src={blueprint} alt="Blueprint" className="w-full" />

      <div className="mx-8 flex justify-between text-primary">
        <label className="swap">
          <input type="checkbox" defaultChecked />
          <div className="swap-on">
            <LockIcon />
          </div>
          <div className="swap-off">
            <LockOpenIcon className="fill-red-200 stroke-red-900" />
          </div>
        </label>
        <CircleDotIcon />
        <SunIcon />
        <WifiIcon />
        <MessageCircleQuestionIcon />
      </div>

      <div className="m-4">
        <div className="mt-4 grid grid-cols-3 gap-3">
          <OccupancyWidget level="low" name="Gym" icon={DumbbellIcon} />
          <OccupancyWidget level="mid" name="Spa" icon={LeafIcon} />
          <MoodWidget className="row-span-2" />
          <OccupancyWidget
            level="high"
            name="Coworking"
            icon={LayoutPanelTopIcon}
          />
          <DummyWidget title="5" className="aspect-square" />
          <DummyWidget title="7" className="aspect-square" />
          <DummyWidget title="8" className="aspect-square" />
          <DummyWidget title="9" className="aspect-square" />
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <LinkButton title="Location" icon={MapPinIcon} />
          <NavLink to="/contract">
            <LinkButton title="Contract" icon={ReceiptTextIcon} />
          </NavLink>
          <LinkButton title="Good to know" icon={InfoIcon} />
        </div>
      </div>
    </div>
  );
}

type DummyWidgetProps = {
  title: string;
  className?: string;
};

function DummyWidget({ title, className }: DummyWidgetProps) {
  return (
    <BaseWidget className={classNames("p-3", className)}>
      <span className="text-sm">{title}</span>
    </BaseWidget>
  );
}

type LinkButtonProps = {
  title: string;
  icon: LucideIcon;
  className?: string;
};

function LinkButton({ title, icon: Icon, className }: LinkButtonProps) {
  return (
    <div
      className={classNames("flex items-center justify-between p-2", className)}
    >
      <div className="flex items-center gap-2 text-xl">
        <Icon />
        {title}
      </div>
      <ChevronRightIcon />
    </div>
  );
}
