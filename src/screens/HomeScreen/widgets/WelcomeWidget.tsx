import skyline from "~/assets/skyline.svg";

import { BaseWidget } from "./BaseWidget";

export function WelcomeWidget() {
  return (
    <BaseWidget
      to="/welcome"
      className="relative col-span-2 flex h-full items-center justify-center overflow-hidden"
    >
      <img
        src={skyline}
        alt="City skyline"
        className="absolute inset-0 top-1/2 left-1/2 h-[85%] -translate-1/2 opacity-20"
      />
      <div className="relative z-10 flex flex-col items-center gap-1 opacity-100 transition-all duration-200 hover:opacity-100">
        <span className="bg-base-100/40 px-2 text-lg">Welcome to</span>
        <span className="bg-base-100/40 px-2 text-lg">your new hometown</span>
      </div>
    </BaseWidget>
  );
}
