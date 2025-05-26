import classNames from "classnames";
import {
  ChevronRightIcon,
  CircleDotIcon,
  DumbbellIcon,
  InfoIcon,
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

      <div className="flex justify-between mx-8 text-primary">
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
        <div className="grid grid-cols-3 gap-3 mt-4">
          <OccupancyWidget level="low" name="Gym" icon={DumbbellIcon} />
          <OccupancyWidget level="mid" name="Spa" icon={LeafIcon} />
          <MoodWidget className="row-span-2" />
          <DummyWidget title="4" className="aspect-square" />
          <DummyWidget title="5" className="aspect-square" />
          <DummyWidget title="6" className="aspect-square" />
          <DummyWidget title="7" className="aspect-square" />
          <DummyWidget title="8" className="aspect-square" />
        </div>

        <div className="flex flex-col gap-2 mt-6">
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
      className={classNames("flex justify-between items-center p-2", className)}
    >
      <div className="text-xl flex gap-2 items-center">
        <Icon />
        {title}
      </div>
      <ChevronRightIcon />
    </div>
  );
}
