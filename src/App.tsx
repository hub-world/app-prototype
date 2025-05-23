import classNames from "classnames";
import { useEffect, useState } from "react";

import { PhoneFrame } from "./components/PhoneFrame";
import { PricingChart } from "./components/PricingChart";
import { Screen } from "./components/Screen";

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  return (
    <div
      className={classNames(
        "font-inter grid h-screen w-screen place-items-center",
        "transition-opacity duration-300",
        fontsLoaded ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <PhoneFrame>
        <Screen withLogo withTabs>
          <div className="m-4">
            <PricingChart />
          </div>
        </Screen>
      </PhoneFrame>
    </div>
  );
}

export default App;
