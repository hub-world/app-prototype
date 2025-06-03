import { Link } from "react-router";
import { StickyLogo } from "~/components/StickyLogo";

export function BookingScreen() {
  return (
    <>
      <StickyLogo />

      <div className="p-4">
        <div className="mt-[40%] flex flex-col rounded-box border border-base-300 p-6">
          <Link to="/contract">
            <button className="btn w-full btn-accent">Modify booking</button>
          </Link>
          <div className="divider">or</div>
          <Link to="/booking/form">
            <button className="btn w-full btn-primary">New booking</button>
          </Link>
        </div>
      </div>
    </>
  );
}
