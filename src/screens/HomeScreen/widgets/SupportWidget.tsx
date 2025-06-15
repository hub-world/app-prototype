import { MessageCircleQuestionIcon } from "lucide-react";

import { BaseWidget } from "./BaseWidget";

export function SupportWidget() {
  return (
    <BaseWidget className="flex aspect-square flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <MessageCircleQuestionIcon className="h-8 w-8" />
        <span>Support</span>
      </div>
    </BaseWidget>
  );
}
