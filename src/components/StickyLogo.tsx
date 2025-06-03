import { Logo } from "./Logo";

export function StickyLogo() {
  return (
    <div className="sticky top-0 z-10 bg-base-100 p-4 pt-0">
      <Logo />
    </div>
  );
}
