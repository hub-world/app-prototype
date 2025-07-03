import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router";

import { PhoneFrame } from "./components/PhoneFrame";
import { Screen } from "./components/Screen";
import { BookingFormScreen } from "./screens/BookingFormScreen";
import { BookingScreen } from "./screens/BookingScreen";
import { ContractScreen } from "./screens/ContractScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { KeysScreen } from "./screens/KeysScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { SandboxScreen } from "./screens/SandboxScreen";
import { SubleaseScreen } from "./screens/SubleaseScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(() => {
    return document.fonts.check("1em Inter");
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (!fontsLoaded) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, [fontsLoaded]);

  return (
    <div
      className="grid h-dvh w-dvw place-items-center font-inter"
      data-theme="uh-light"
    >
      <PhoneFrame>
        <Screen withTabs>
          {fontsLoaded && (
            <AnimatePresence>
              <motion.div
                key={location.pathname}
                className="absolute inset-0 h-full w-full overflow-auto"
                initial={isInitialLoad ? { opacity: 0 } : { x: "100%" }}
                animate={isInitialLoad ? { opacity: 1 } : { x: 0 }}
                exit={isInitialLoad ? { opacity: 1 } : { x: "-100%" }}
                onAnimationComplete={() => setIsInitialLoad(false)}
                transition={{
                  duration: 0.25,
                  ease: [0.2, 0.0, 0.0, 1.0],
                }}
              >
                <Routes location={location}>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<HomeScreen />} />
                  <Route path="/booking/tbd" element={<BookingScreen />} />
                  <Route path="/booking" element={<BookingFormScreen />} />
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path="/contract" element={<ContractScreen />} />
                  <Route path="/keys" element={<KeysScreen />} />
                  <Route path="/welcome" element={<WelcomeScreen />} />
                  <Route path="/sublease" element={<SubleaseScreen />} />
                  <Route path="/sandbox" element={<SandboxScreen />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          )}
        </Screen>
      </PhoneFrame>
    </div>
  );
}

export default App;
