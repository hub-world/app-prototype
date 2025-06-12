import { useAtomValue } from "jotai";

import { WhatSection } from "./WhatSection";
import { WhenSection } from "./WhenSection";
import { WhereSection } from "./WhereSection";
import { isFormCompleteAtom } from "./store";
import { StickyLogo } from "~/components/StickyLogo";

export function BookingFormScreen() {
  const isFormComplete = useAtomValue(isFormCompleteAtom);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <StickyLogo />

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto bg-base-200 p-4">
        <WhereSection />
        <WhatSection />
        <WhenSection />

        <button
          disabled={!isFormComplete}
          className="btn w-full btn-lg btn-primary"
        >
          Check availability
        </button>
      </div>
    </div>
  );
}
