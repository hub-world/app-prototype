import { UsersIcon } from "lucide-react";

import { BaseWidget } from "./BaseWidget";

export function CommunityWidget() {
  return (
    <BaseWidget className="flex aspect-square flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <UsersIcon className="h-8 w-8" />
        <span>Community</span>
      </div>
    </BaseWidget>
  );
}
