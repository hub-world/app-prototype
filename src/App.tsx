import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";

import { PhoneFrame } from "./components/PhoneFrame";
import { Screen } from "./components/Screen";
import { BookingScreen } from "./screens/BookingScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { ContractScreen } from "./screens/HomeScreen/ContractScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  return (
    <div
      className={classNames(
        "grid h-dvh w-dvw place-items-center font-inter",
        "transition-opacity duration-300",
        fontsLoaded ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <PhoneFrame>
        <Screen withTabs>
          <AnimatePresence>
            <motion.div
              key={location.pathname}
              className="absolute inset-0 h-full w-full"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.25,
                ease: [0.2, 0.0, 0.0, 1.0],
              }}
            >
              <Routes location={location}>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/booking" element={<BookingScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/contract" element={<ContractScreen />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Screen>
      </PhoneFrame>
    </div>
  );
}

export default App;
