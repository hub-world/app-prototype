import classNames from "classnames";
import {
  CastIcon,
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
  ReceiptEuroIcon,
  ReceiptTextIcon,
  WifiIcon,
} from "lucide-react";
import { NavLink } from "react-router";
import blueprint from "~/assets/blueprint.jpg";

import { AmenityWidget } from "./widgets/AmenityWidget";
import { BaseWidget } from "./widgets/BaseWidget";
import { CleaningWidget } from "./widgets/CleaningWidget";
import { MoodWidget } from "./widgets/MoodWidget";
import { WelcomeWidget } from "./widgets/WelcomeWidget";

export function HomeScreen() {
  return (
    <div>
      <img src={blueprint} alt="Blueprint" className="w-full" />

      <div className="mx-8 flex justify-between text-primary">
        <QuickAction>
          <label className="swap">
            <input type="checkbox" defaultChecked />
            <div className="swap-on">
              <LockIcon />
            </div>
            <div className="swap-off">
              <LockOpenIcon className="fill-red-200 stroke-red-900" />
            </div>
          </label>
        </QuickAction>

        <QuickAction>
          <CircleDotIcon />
        </QuickAction>
        <QuickAction>
          <CastIcon />
        </QuickAction>
        <QuickAction>
          <WifiIcon />
        </QuickAction>
        <QuickAction>
          <MessageCircleQuestionIcon />
        </QuickAction>
      </div>

      <div className="m-4 flex flex-col gap-2">
        <div className="card cursor-pointer bg-accent text-accent-content transition-all duration-200 select-none hover:bg-accent/80 active:scale-[0.98]">
          <div className="card-body">
            <h2 className="card-title">Your apartment is in high demand!</h2>
            <p>
              Get money back by subleasing your unit for{" "}
              <strong>€120 per day</strong> between{" "}
              <strong>15th to 19th October</strong>.{" "}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <AmenityWidget level="low" name="Gym" icon={DumbbellIcon} />
          <AmenityWidget level="mid" name="Spa" icon={LeafIcon} />
          <MoodWidget />
          <CleaningWidget />
          <AmenityWidget
            level="high"
            name="Coworking"
            icon={LayoutPanelTopIcon}
          />
          <WelcomeWidget />
          <DummyWidget title="9" className="aspect-square" />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <LinkButton title="Find here" icon={MapPinIcon} />
          <LinkButton title="Good to know" icon={InfoIcon} />
          <NavLink to="/contract">
            <LinkButton title="My contract" icon={ReceiptTextIcon} />
          </NavLink>
          <LinkButton title="Sublease" icon={ReceiptEuroIcon} />
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

type QuickActionProps = {
  children: React.ReactNode;
  className?: string;
};

function QuickAction({ children, className }: QuickActionProps) {
  return (
    <div
      className={classNames(
        "cursor-pointer transition-all duration-200 active:scale-[0.85]",
        className,
      )}
    >
      {children}
    </div>
  );
}
