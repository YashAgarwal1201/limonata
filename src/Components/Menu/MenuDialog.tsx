import { Dialog } from "primereact/dialog";
import React from "react";
import { useAppContext } from "../../Services/AppContext";

import { Accordion, AccordionTab } from "primereact/accordion";

const MenuDialog = ({
  showMenuDialog,
  setShowMenuDialog,
}: {
  showMenuDialog: boolean;
  setShowMenuDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { state, dispatch, showToast } = useAppContext();
  return (
    <Dialog
      visible={showMenuDialog}
      onHide={() => setShowMenuDialog(!showMenuDialog)}
      dismissableMask={true}
      draggable={false}
      header={<div className="text-color1">Settings Menu</div>}
      className="aboutDialog w-full md:w-[65%] h-full md:h-[80%] absolute bottom-0 md:bottom-auto"
    >
      <div className="h-full p-2 md:p-4 text-color5 bg-color2 rounded-md overflow-y-auto">
        <Accordion className="flex flex-col gap-y-2">
          <AccordionTab
            header={
              <div className="flex justify-between items-center">
                <span className="text-color3">Theme</span>{" "}
                <div className="flex items-center rounded-md border-2">
                  <div className="w-4 h-4 bg-color1 rounded-l-md"></div>
                  <div className="w-4 h-4 bg-color2"></div>
                  <div className="w-4 h-4 bg-color3"></div>
                  <div className="w-4 h-4 bg-color4"></div>
                  <div className="w-4 h-4 bg-color5 rounded-r-md"></div>
                </div>
              </div>
            }
          >
            <div className="grid grid-flow-row grid-cols-3">
              <div
                className="flex flex-col-reverse justify-between items-center"
                onClick={() => {
                  dispatch({
                    type: "SET_MODE_SELECTED",
                    payload: "google",
                  });
                  showToast("success", "Success", "Theme changed!");
                }}
              >
                <span
                  className={`capitalize ${
                    state.modeSelected === "google"
                      ? "text-blue-800 font-semibold cursor-default"
                      : "text-[#010101] font-normal cursor-pointer"
                  }`}
                >
                  Google
                </span>
                <div className="flex items-center rounded-md border-2">
                  <div className="w-4 h-4 bg-[#FAFAFA] rounded-l-md"></div>
                  <div className="w-4 h-4 bg-[#FBBC05]"></div>
                  <div className="w-4 h-4 bg-[#34A853]"></div>
                  <div className="w-4 h-4 bg-[#4285F4]"></div>
                  <div className="w-4 h-4 bg-[#EA4335] rounded-r-md"></div>
                </div>
              </div>
              <div
                className="flex flex-col-reverse justify-between items-center"
                onClick={() => {
                  dispatch({
                    type: "SET_MODE_SELECTED",
                    payload: "night",
                  });
                  showToast("success", "Success", "Theme changed!");
                }}
              >
                <span
                  className={`capitalize ${
                    state.modeSelected === "night"
                      ? "text-blue-800 font-semibold cursor-default"
                      : "text-[#010101] font-normal cursor-pointer"
                  }`}
                >
                  Classic Night
                </span>
                <div className="flex items-center rounded-md border-2">
                  <div className="w-4 h-4 bg-[#0a0a0a] rounded-l-md"></div>
                  <div className="w-4 h-4 bg-[#171717]"></div>
                  <div className="w-4 h-4 bg-[#404040]"></div>
                  <div className="w-4 h-4 bg-[#a3a3a3]"></div>
                  <div className="w-4 h-4 bg-[#fafafa] rounded-r-md"></div>
                </div>
              </div>
              <div
                className="flex flex-col-reverse justify-between items-center"
                onClick={() => {
                  dispatch({
                    type: "SET_MODE_SELECTED",
                    payload: "light",
                  });
                  showToast("success", "Success", "Theme changed!");
                }}
              >
                <span
                  className={`capitalize ${
                    state.modeSelected === "light"
                      ? "text-blue-800 font-semibold cursor-default"
                      : "text-[#010101] font-normal cursor-pointer"
                  }`}
                >
                  Classic Light
                </span>
                <div className="flex items-center rounded-md border-2">
                  <div className="w-4 h-4 bg-[#fafafa] rounded-l-md"></div>
                  <div className="w-4 h-4 bg-[#a3a3a3]"></div>
                  <div className="w-4 h-4 bg-[#404040]"></div>
                  <div className="w-4 h-4 bg-[#171717]"></div>
                  <div className="w-4 h-4 bg-[#0a0a0a] rounded-r-md"></div>
                </div>
              </div>
            </div>
          </AccordionTab>
          <AccordionTab
            header={
              <div className="flex justify-between items-center">
                <span className="text-color3">Keyboard shortcuts</span>{" "}
              </div>
            }
          >
            <div>
              <ul className="px-3 flex flex-col gap-y-4">
                <li>
                  Press{" "}
                  <kbd className="px-2 py-1 font-semibold text-color4 bg-color1 rounded-md">
                    Shift
                  </kbd>{" "}
                  +{" "}
                  <kbd className="px-2 py-1 font-semibold text-color4 bg-color1 rounded-md">
                    h
                  </kbd>{" "}
                  for "Home" section.
                </li>
                <li>
                  Press{" "}
                  <kbd className="px-2 py-1 font-semibold text-color4 bg-color1 rounded-md">
                    Shift
                  </kbd>{" "}
                  +{" "}
                  <kbd className="px-2 py-1 font-semibold text-color4 bg-color1 rounded-md">
                    a
                  </kbd>{" "}
                  for "About" section.
                </li>
                <li>
                  Press{" "}
                  <kbd className="px-2 py-1 font-semibold text-color4 bg-color1 rounded-md">
                    Shift
                  </kbd>{" "}
                  +{" "}
                  <kbd className="px-2 py-1 font-semibold text-color4 bg-color1 rounded-md">
                    f
                  </kbd>{" "}
                  for "Feedback" section.
                </li>
              </ul>
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </Dialog>
  );
};

export default MenuDialog;