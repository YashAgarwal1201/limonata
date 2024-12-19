import React from "react";

import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Panel } from "primereact/panel";
import { Sidebar } from "primereact/sidebar";
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import { themes } from "../../Data/Data";
import { useAppContext } from "../../Services/AppContext";
import { useMsgAppContext } from "../../Services/MessagesContextAndInterfaces/MessagesContext";
import KeyboardShortcuts from "../KeyboardShortcuts/KeyboardShortcuts";
import "./MenuDialog.scss";

type MenuDialogProps = {
  openMenuPanel: number;
  setOpenMenuPanel: React.Dispatch<React.SetStateAction<number>>;
  showMenuDialog: boolean;
  setShowMenuDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuDialog = ({
  showMenuDialog,
  openMenuPanel,
  setOpenMenuPanel,
  setShowMenuDialog,
}: MenuDialogProps) => {
  const { state, showToast, setThemeSelected, setEasyMode } = useAppContext();
  const { messageState, setSelectedChatAppearance, setDisableTypingAnimation } =
    useMsgAppContext();

  const shareUrl = window.location.href;
  const shareText = "Check out this website!";

  const handlePanelToggle = (index: number) => {
    setOpenMenuPanel((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleThemeChange = (themeValue: string) => {
    setThemeSelected(themeValue);
    showToast("success", "Success", "Theme changed!");
  };

  // const handleEasyModeChange = (value: boolean) => {
  //   setEasyMode(value);
  //   // showToast("success", "Success", `Easy mode turned ${value ? "On" : "Off"}`);
  // };

  // const handleDisableTypingAnimation = (value: boolean) => {
  //   setDisableTypingAnimation(value);
  //   // showToast("info", "Info", "Disabled typing animation for chat messages");
  // };

  return (
    <Sidebar
      visible={showMenuDialog}
      onHide={() => {
        setShowMenuDialog(false);
        setOpenMenuPanel(-1); // Reset open panel on close
      }}
      dismissable
      draggable={false}
      header={
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-normal">
          More Options
        </h2>
      }
      className="side-menu aboutDialog min-w-fit w-full lg:w-1/2 h-full"
      position="right"
    >
      <div className="w-full px-4 py-4 text-color5 bg-color2 rounded-3xl overflow-y-auto">
        {/* Theme Change Panel */}
        <Panel
          headerTemplate={(options) => {
            const togglePanel = (event: React.MouseEvent<HTMLElement>) => {
              options.onTogglerClick!(event); // Trigger expand/collapse behavior
            };

            return (
              <div
                className="cursor-pointer custom-panel-header w-full flex justify-between items-center px-2 py-4 rounded-xl"
                onClick={togglePanel}
              >
                <h3 className="font-subheading font-medium text-lg sm:text-xl text-color5 flex items-center">
                  <span className="pi pi-palette mr-4"></span>
                  Change Theme
                </h3>
                {/* <span
                  className={`pi ${
                    options.collapsed ? "pi-chevron-down" : "pi-chevron-up"
                  }`}
                ></span> */}
              </div>
            );
          }}
          className="bg-transparent rounded-2xl"
          toggleable
          collapsed={openMenuPanel !== 0}
          onToggle={() => handlePanelToggle(0)}
        >
          <div className="grid grid-flow-row grid-cols-2 sm:grid-cols-3 gap-y-6">
            {themes?.map((theme) => (
              <div
                key={theme.value}
                className={`capitalize flex flex-col-reverse justify-between items-center ${
                  state.themeSelected === theme.value
                    ? "text-blue-800 font-semibold cursor-default"
                    : "text-[#010101] font-normal cursor-pointer"
                }`}
                onClick={() =>
                  state.themeSelected !== theme.value
                    ? handleThemeChange(theme.value)
                    : ""
                }
              >
                <span className="font-content">{theme.name}</span>
                <div className="flex items-center rounded-md border-2">
                  {theme.colors?.map((color, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 ${
                        index === 0
                          ? "rounded-l-md"
                          : index === 4
                          ? "rounded-r-md"
                          : "rounded-none"
                      }`}
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="mx-2 my-1 p-0 max-w-full h-[1.5px] bg-color4" />

        {/* Easy Mode Panel */}
        <Panel
          headerTemplate={(options) => {
            const togglePanel = (event: React.MouseEvent<HTMLElement>) => {
              options.onTogglerClick!(event); // Trigger expand/collapse behavior
            };

            return (
              <div
                className="cursor-pointer custom-panel-header w-full flex justify-between items-center px-2 py-4 rounded-xl"
                onClick={togglePanel}
              >
                <h3 className="font-subheading font-medium text-lg sm:text-xl text-color5 flex items-center">
                  <span className="pi pi-sliders-h mr-4"></span>
                  Use easy mode?
                </h3>
              </div>
            );
          }}
          className="bg-transparent rounded-2xl"
          toggleable
          collapsed={openMenuPanel !== 1}
          onToggle={() => handlePanelToggle(1)}
        >
          <div className="flex justify-between">
            <span>Enable Easy Mode:</span>
            <InputSwitch
              checked={state.easyMode}
              onChange={(e) => setEasyMode(e.value)}
            />
          </div>
        </Panel>

        <div className="mx-2 my-1 p-0 max-w-full h-[1.5px] bg-color4" />

        {/* Keyboard Shortcuts Panel */}
        <Panel
          headerTemplate={(options) => {
            const togglePanel = (event: React.MouseEvent<HTMLElement>) => {
              options.onTogglerClick!(event); // Trigger expand/collapse behavior
            };

            return (
              <div
                className="cursor-pointer custom-panel-header w-full flex justify-between items-center px-2 py-4 rounded-xl"
                onClick={togglePanel}
              >
                <h3 className="font-subheading font-medium text-lg sm:text-xl text-color5 flex items-center">
                  <span className="pi pi-sliders-v mr-4"></span>
                  Keyboard Shortcuts
                </h3>
              </div>
            );
          }}
          className="bg-transparent rounded-2xl"
          toggleable
          collapsed={openMenuPanel !== 2}
          onToggle={() => handlePanelToggle(2)}
        >
          <KeyboardShortcuts />
        </Panel>

        <div className="mx-2 my-1 p-0 max-w-full h-[1.5px] bg-color4" />

        {/* Resume Download Panel */}
        <Panel
          headerTemplate={(options) => {
            const togglePanel = (event: React.MouseEvent<HTMLElement>) => {
              options.onTogglerClick!(event); // Trigger expand/collapse behavior
            };

            return (
              <div
                className="cursor-pointer custom-panel-header w-full flex justify-between items-center px-2 py-4 rounded-xl"
                onClick={togglePanel}
              >
                <h3 className="font-subheading font-medium text-lg sm:text-xl text-color5 flex items-center">
                  <span className="pi pi-id-card mr-4"></span>
                  View My Resume
                </h3>
              </div>
            );
          }}
          className="bg-transparent rounded-2xl"
          toggleable
          collapsed={openMenuPanel !== 3}
          onToggle={() => handlePanelToggle(3)}
        >
          <div className="flex justify-between">
            <span>Download my resume:</span>
            <Button icon="pi pi-download" label="Download" />
          </div>
        </Panel>

        <div className="mx-2 my-1 p-0 max-w-full h-[1.5px] bg-color4" />

        {/* Share Page Panel */}
        <Panel
          headerTemplate={(options) => {
            const togglePanel = (event: React.MouseEvent<HTMLElement>) => {
              options.onTogglerClick!(event); // Trigger expand/collapse behavior
            };

            return (
              <div
                className="cursor-pointer custom-panel-header w-full flex justify-between items-center px-2 py-4 rounded-xl"
                onClick={togglePanel}
              >
                <h3 className="font-subheading font-medium text-lg sm:text-xl text-color5 flex items-center">
                  <span className="pi pi-share-alt mr-4"></span>
                  Share
                </h3>
              </div>
            );
          }}
          className="bg-transparent rounded-2xl"
          toggleable
          collapsed={openMenuPanel !== 5}
          onToggle={() => handlePanelToggle(5)}
        >
          <div className="flex justify-center items-center gap-4">
            {/* WhatsApp */}
            <WhatsappShareButton url={shareUrl} title={shareText}>
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>

            {/* LinkedIn */}
            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={40} round />
            </LinkedinShareButton>

            {/* Reddit */}
            <RedditShareButton url={shareUrl} title={shareText}>
              <RedditIcon size={40} round />
            </RedditShareButton>

            {/* Telegram */}
            <TelegramShareButton url={shareUrl} title={shareText}>
              <TelegramIcon size={40} round />
            </TelegramShareButton>

            {/* Email */}
            <EmailShareButton
              url={shareUrl}
              subject="Check out this site"
              body={shareText}
            >
              <EmailIcon size={40} round />
            </EmailShareButton>
          </div>
        </Panel>

        <div className="mx-2 my-1 p-0 max-w-full h-[1.5px] bg-color4" />

        {/* Chat Appearance Panel */}
        <Panel
          headerTemplate={(options) => {
            const togglePanel = (event: React.MouseEvent<HTMLElement>) => {
              options.onTogglerClick!(event); // Trigger expand/collapse behavior
            };

            return (
              <div
                className="cursor-pointer custom-panel-header w-full flex justify-between items-center px-2 py-4 rounded-xl"
                onClick={togglePanel}
              >
                <h3 className="font-subheading font-medium text-lg sm:text-xl text-color5 flex items-center">
                  <span className="pi pi-id-card mr-4"></span>
                  Change Chat Appearance
                </h3>
              </div>
            );
          }}
          className="bg-transparent rounded-2xl"
          toggleable
          collapsed={openMenuPanel !== 4}
          onToggle={() => handlePanelToggle(4)}
        >
          <div className="font-content flex flex-col gap-y-10 justify-between">
            <p>Select the chat appearance</p>

            <div className="flex flex-wrap justify-center items-center gap-3">
              {" "}
              <Button
                className={`min-w-[275px] flex flex-col ${
                  messageState.selectedChatAppearance === "default"
                    ? "text-blue-800 font-semibold cursor-default"
                    : "text-[#010101] font-normal cursor-pointer"
                }`}
                onClick={() => setSelectedChatAppearance("default")}
              >
                <div className="w-full flex flex-col gap-y-4 bg-color4 p-3 rounded-md">
                  {[1, 2].map((key) => (
                    <div
                      key={key}
                      className={`flex flex-col ${
                        key === 1 ? "items-start" : "items-end"
                      } gap-y-2 `}
                    >
                      <div
                        className={`flex ${
                          key === 1 ? "flex-row" : "flex-row-reverse"
                        } items-center gap-x-2`}
                      >
                        <span className="pi pi-user p-2 rounded-full bg-color1 text-color5"></span>
                        <span className="block rounded-md w-16 h-5 bg-color3"></span>
                      </div>
                      <div
                        className={`${
                          key === 1 ? "ml-4 mr-0" : "ml-0 mr-4"
                        } rounded-md bg-color2 w-1/2 h-7`}
                      ></div>
                    </div>
                  ))}
                </div>
                <p className="">Default</p>
              </Button>
              <Button
                className={`min-w-[275px] flex flex-col ${
                  messageState.selectedChatAppearance === "compact"
                    ? "text-blue-800 font-semibold cursor-default"
                    : "text-[#010101] font-normal cursor-pointer"
                }`}
                onClick={() => setSelectedChatAppearance("compact")}
              >
                <div className="w-full flex flex-col gap-y-4 bg-color4 p-3 rounded-md">
                  {[1, 2].map((key) => (
                    <div key={key} className={`flex flex-col  gap-y-2 `}>
                      <div className={`flex flex-row items-center gap-x-2`}>
                        <span className="pi pi-user p-2 rounded-full bg-color1 text-color5"></span>
                        <span className="block rounded-md w-16 h-5 bg-color3"></span>
                      </div>
                      <div
                        className={`ml-4 mr-0 rounded-md bg-color2 w-1/2 h-7`}
                      ></div>
                    </div>
                  ))}
                </div>
                <p className="">Compact</p>
              </Button>
            </div>
          </div>
        </Panel>

        <div className="mx-2 my-1 p-0 max-w-full h-[1.5px] bg-color4" />

        {/* Clear Data Panel */}
        <Panel
          headerTemplate={(options) => {
            const togglePanel = (event: React.MouseEvent<HTMLElement>) => {
              options.onTogglerClick!(event); // Trigger expand/collapse behavior
            };

            return (
              <div
                className="cursor-pointer custom-panel-header w-full flex justify-between items-center px-2 py-4 rounded-xl"
                onClick={togglePanel}
              >
                <h3 className="font-subheading font-medium text-lg sm:text-xl text-color5 flex items-center">
                  <span className="pi pi-trash mr-4"></span>
                  Clear Data
                </h3>
              </div>
            );
          }}
          className="bg-transparent rounded-2xl"
          toggleable
          collapsed={openMenuPanel !== 5}
          onToggle={() => handlePanelToggle(5)}
        >
          <Button
            icon="pi pi-trash"
            label="Clear Data"
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              showToast("info", "Info", "All data has been cleared");
            }}
          />
        </Panel>

        <div className="mx-2 my-1 p-0 max-w-full h-[1.5px] bg-color4" />

        {/* Typing Animation Panel */}
        <Panel
          headerTemplate={(options) => {
            const togglePanel = (event: React.MouseEvent<HTMLElement>) => {
              options.onTogglerClick!(event); // Trigger expand/collapse behavior
            };

            return (
              <div
                className="cursor-pointer custom-panel-header w-full flex justify-between items-center px-2 py-4 rounded-xl"
                onClick={togglePanel}
              >
                <h3 className="font-subheading font-medium text-lg sm:text-xl text-color5 flex items-center">
                  <span className="pi pi-ban mr-4"></span>
                  Disable Typing Animation
                </h3>
              </div>
            );
          }}
          className="bg-transparent rounded-2xl"
          toggleable
          collapsed={openMenuPanel !== 6}
          onToggle={() => handlePanelToggle(6)}
        >
          <div className="flex justify-between">
            <span>Disable animation for chat messages:</span>
            <InputSwitch
              checked={messageState.disableTypingAnimation}
              onChange={(e) => setDisableTypingAnimation(e.value)}
            />
          </div>
        </Panel>
      </div>
    </Sidebar>
  );
};

export default MenuDialog;
