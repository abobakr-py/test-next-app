import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { useGlobal } from "@/zustand/useGlobal";
import useLanguage from "@/context/useLanguage";

const RightDrawer = ({ children }) => {
  const { openDrawer, setOpenDrawer } = useGlobal();
  const { language } = useLanguage();
  return (
    <div className="w-full">
      <SwipeableDrawer
        anchor={language === "en" ? "right" : "left"}
        open={openDrawer}
        onClose={() => {
          setOpenDrawer();
        }}
        onOpen={() => {
          setOpenDrawer();
        }}
        PaperProps={{
          sx: {
            width: "35%", // This sets the actual width of the drawer
          },
        }}
      >
        {children}
      </SwipeableDrawer>
    </div>
  );
};

export default RightDrawer;
