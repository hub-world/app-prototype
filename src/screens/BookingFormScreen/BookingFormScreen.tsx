import { useAtomValue } from "jotai";

import { WhatSection } from "./WhatSection";
import { WhenSection } from "./WhenSection";
import { WhereSection } from "./WhereSection";
import { isFormCompleteAtom, useResetForm } from "./store";
import { StickyLogo } from "~/components/StickyLogo";

export function BookingFormScreen() {
  const isFormComplete = useAtomValue(isFormCompleteAtom);
  const resetForm = useResetForm();

  return (
    <div className="flex h-full min-h-0 flex-col">
      <StickyLogo />

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto bg-base-200 p-4">
        <WhereSection />
        <WhatSection />
        <WhenSection />

        <div className="flex justify-between">
          <button className="btn underline btn-ghost" onClick={resetForm}>
            Clear
          </button>
          <button disabled={!isFormComplete} className="btn btn-primary">
            Check availability
          </button>
        </div>
      </div>
    </div>
  );
}
