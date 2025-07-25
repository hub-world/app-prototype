import classNames from "classnames";
import {
  BlindsIcon,
  CastIcon,
  ChartNoAxesCombinedIcon,
  ChevronRightIcon,
  DoorClosedIcon,
  DoorOpenIcon,
  DumbbellIcon,
  ImagesIcon,
  InfoIcon,
  KeyRoundIcon,
  LayoutPanelTopIcon,
  LeafIcon,
  LightbulbIcon,
  type LucideIcon,
  MapPinIcon,
  MessageCircleQuestionIcon,
  ReceiptEuroIcon,
  ReceiptTextIcon,
  UserRoundCheckIcon,
  WifiIcon,
} from "lucide-react";
import { Link } from "react-router";

import { AmenityWidget } from "./widgets/AmenityWidget";
import { CleaningWidget } from "./widgets/CleaningWidget";
import { CommunityWidget } from "./widgets/CommunityWidget";
import { MoodWidget } from "./widgets/MoodWidget";
import { WelcomeWidget } from "./widgets/WelcomeWidget";
import blueprint from "~/assets/blueprint.jpg";
import { Money } from "~/components/Money";
import { serviceSpecs } from "~/config";

export function HomeScreen() {
  return (
    <div>
      <img
        src={blueprint}
        alt="Blueprint"
        className="mx-4 my-2 aspect-[1613/1117] w-[calc(100%-2rem)] rounded-box"
      />

      <div className="mx-8 flex justify-between">
        <QuickAction>
          <label className="swap">
            <input type="checkbox" defaultChecked />
            <div className="swap-on">
              <DoorClosedIcon />
            </div>
            <div className="swap-off">
              <DoorOpenIcon className="fill-red-200 stroke-red-900" />
            </div>
          </label>
        </QuickAction>
        <QuickAction icon={LightbulbIcon} />
        <QuickAction icon={BlindsIcon} />
        <QuickAction icon={CastIcon} />
        <QuickAction icon={WifiIcon} />
        <Link to="/support">
          <QuickAction icon={MessageCircleQuestionIcon} />
        </Link>
      </div>

      <div className="m-4 flex flex-col gap-2">
        <Link to="/sublease">
          <div className="card cursor-pointer bg-primary text-primary-content transition-all duration-200 select-none hover:bg-primary/80 active:scale-98">
            <div className="card-body">
              <button
                className="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm"
                onClick={(e) => {
                  e.preventDefault();
                  const card = e.currentTarget.closest(".card");
                  if (card) card.classList.add("hidden");
                }}
              >
                ✕
              </button>
              <h2 className="card-title">Your apartment is in high demand!</h2>
              <p>
                Earn <Money amount={250} className="font-bold" /> back on your
                rent by subleasing your unit from{" "}
                <strong>October 15th to 19th</strong>.
              </p>
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-3 gap-3">
          <AmenityWidget
            name={serviceSpecs.gym.name}
            icon={DumbbellIcon}
            occupancy="low"
            monthlyPrice={serviceSpecs.gym.monthlyPrice}
            dailyPrice={serviceSpecs.gym.dailyPrice}
          />
          <AmenityWidget
            name={serviceSpecs.spa.name}
            icon={LeafIcon}
            occupancy="mid"
            monthlyPrice={serviceSpecs.spa.monthlyPrice}
            dailyPrice={serviceSpecs.spa.dailyPrice}
          />
          <MoodWidget />
          <CleaningWidget />
          <AmenityWidget
            name={serviceSpecs.coworking.name}
            icon={LayoutPanelTopIcon}
            occupancy="high"
            monthlyPrice={serviceSpecs.coworking.monthlyPrice}
            dailyPrice={serviceSpecs.coworking.dailyPrice}
          />
          <WelcomeWidget />
          <CommunityWidget />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Link to="/checkin">
            <LinkButton title="Check In" icon={UserRoundCheckIcon} />
          </Link>
          <Link to="/support">
            <LinkButton title="Support" icon={MessageCircleQuestionIcon} />
          </Link>
          <Link to="/keys">
            <LinkButton title="Keys" icon={KeyRoundIcon} />
          </Link>
          <LinkButton title="Find here" icon={MapPinIcon} />
          <LinkButton title="Gallery" icon={ImagesIcon} />
          <Link to="/contract">
            <LinkButton title="My contract" icon={ReceiptTextIcon} />
          </Link>
          <Link to="/sublease">
            <LinkButton title="Sublease" icon={ReceiptEuroIcon} />
          </Link>
          <LinkButton title="Statistics" icon={ChartNoAxesCombinedIcon} />
          <LinkButton title="Good to know" icon={InfoIcon} />
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
  className?: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
};

function QuickAction({ children, icon: Icon, className }: QuickActionProps) {
  return (
    <button
      className={classNames(
        "btn btn-circle border-base-content/20 bg-base-100 text-base-content",
        className,
      )}
    >
      {Icon && <Icon className="h-5 w-5" />}
      {children}
    </button>
  );
}
