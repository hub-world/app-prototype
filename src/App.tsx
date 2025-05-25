import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";

import { PhoneFrame } from "./components/PhoneFrame";
import { Screen } from "./components/Screen";
import { BookingScreen } from "./screens/BookingScreen";
import { HomeScreen } from "./screens/HomeScreen";
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
        "font-inter grid h-screen w-screen place-items-center",
        "transition-opacity duration-300",
        fontsLoaded ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <PhoneFrame>
        <Screen withTabs>
          <AnimatePresence>
            <motion.div
              key={location.pathname}
              className="h-full w-full absolute inset-0"
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
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Screen>
      </PhoneFrame>
    </div>
  );
}

export default App;
