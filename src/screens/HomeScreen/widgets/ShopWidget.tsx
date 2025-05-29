import { ShoppingBagIcon } from "lucide-react";

import { BaseWidget } from "./BaseWidget";

export function ShopWidget() {
  return (
    <BaseWidget className="flex aspect-square flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <ShoppingBagIcon className="h-8 w-8" />
        <span>Shop</span>
      </div>
    </BaseWidget>
  );
}
