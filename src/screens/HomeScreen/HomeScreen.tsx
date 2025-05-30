import classNames from "classnames";
import {
  CastIcon,
  ChartNoAxesCombinedIcon,
  ChevronRightIcon,
  CircleDotIcon,
  DumbbellIcon,
  ImagesIcon,
  InfoIcon,
  KeyRoundIcon,
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
import { CleaningWidget } from "./widgets/CleaningWidget";
import { MoodWidget } from "./widgets/MoodWidget";
import { ShopWidget } from "./widgets/ShopWidget";
import { WelcomeWidget } from "./widgets/WelcomeWidget";

export function HomeScreen() {
  return (
    <div>
      <img
        src={blueprint}
        alt="Blueprint"
        className="aspect-[1047/736] w-full"
      />

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
        <div className="card cursor-pointer bg-accent text-accent-content transition-all duration-200 select-none hover:bg-accent/80 active:scale-98">
          <div className="card-body">
            <button className="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">
              ✕
            </button>
            <h2 className="card-title">Your apartment is in high demand!</h2>
            <p>
              Get money back by subleasing your unit for{" "}
              <strong>€120 per day</strong> between{" "}
              <strong>15th to 19th October</strong>.{" "}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <AmenityWidget
            name="Gym"
            icon={DumbbellIcon}
            occupancy="low"
            monthlyPrice={40}
            dailyPrice={12}
          />
          <AmenityWidget
            name="Spa"
            icon={LeafIcon}
            occupancy="mid"
            monthlyPrice={50}
            dailyPrice={15}
          />
          <MoodWidget />
          <CleaningWidget />
          <AmenityWidget
            name="Coworking"
            icon={LayoutPanelTopIcon}
            occupancy="high"
            monthlyPrice={100}
            dailyPrice={10}
          />
          <WelcomeWidget />
          <ShopWidget />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <LinkButton title="Find here" icon={MapPinIcon} />
          <LinkButton title="Keys" icon={KeyRoundIcon} />
          <LinkButton title="Gallery" icon={ImagesIcon} />
          <NavLink to="/contract">
            <LinkButton title="My contract" icon={ReceiptTextIcon} />
          </NavLink>
          <LinkButton title="Sublease" icon={ReceiptEuroIcon} />
          <LinkButton title="Statistics" icon={ChartNoAxesCombinedIcon} />
          <LinkButton title="Good to know" icon={InfoIcon} />
          <LinkButton title="Support" icon={MessageCircleQuestionIcon} />
        </div>
      </div>
    </div>
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
        "cursor-pointer transition-all duration-200 active:scale-85",
        className,
      )}
    >
      {children}
    </div>
  );
}
