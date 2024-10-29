import React, { useEffect, useRef, useState } from "react";

import "./Content.scss";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import TypeIt from "typeit-react";

import MainChatComponent from "../../Components/Chat/MainChatComponent";
import FeedbackFormDialog from "../../Components/FeedbackFormDialog/FeedbackFormDialog";
import MenuDialog from "../../Components/Menu/MenuDialog";
import ProfileComponent from "../../Components/Profile/ProfileComponent";
import { ABOUT_ME } from "../../Data/Data";
import { useAppContext } from "../../Services/AppContext";
import MyImg from "./../../assets/logoo.jpg";
import Header from "./../../Components/Header/Header";

type KeyMapProp = {
  [key: string]: string;
};

const Content: React.FC = () => {
  const {
    state,
    setSelectedContent,
    setShowFeedbackDialog,
    setNeverShowLandingScreen,
    // setShowLandingScreen,
  } = useAppContext();

  const [showMenuDialog, setShowMenuDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [showLandingScreen, setShowLandingScreen] = useState(true);
  // const [showContent, setShowContent] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [openMenuPanel, setOpenMenuPanel] = useState(-1);
  const [isSlidingUp, setIsSlidingUp] = useState(false);

  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const sectionRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
    home: homeRef,
    about: aboutRef,
    feedback: feedbackRef,
  };

  const handleButtonClick = (section: string) => {
    setSelectedContent(section);
    const targetRef = sectionRefs[section];
    targetRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const keyMap: KeyMapProp = {
      A: "appearance",
      H: "home",
      C: "contact",
      W: "work",
      O: "other projects",
      F: "feedback",
      K: "keyboardShortcuts",
      M: "menu",
      E: "education",
      T: "theme",
      P: "profileView",
      Z: "easyMode",
    };

    const key = event.key?.toUpperCase();
    const section = keyMap[key];

    if (section && event.shiftKey) {
      if (section === "menu") {
        setShowMenuDialog(!showMenuDialog);
        setOpenMenuPanel(-1);
      } else if (section === "appearance") {
        setShowMenuDialog(true);
        setOpenMenuPanel(4);
      } else if (section == "theme") {
        setShowMenuDialog(true);
        setOpenMenuPanel(0);
      } else if (section === "easyMode") {
        setShowMenuDialog(true);
        setOpenMenuPanel(1);
      } else if (section === "profileView") {
        setSelectedContent("profile");
      } else if (
        section === "work" ||
        section === "other projects" ||
        section === "contact" ||
        section === "education"
      ) {
        setSelectedTab(
          ABOUT_ME?.findIndex((val) =>
            val.header?.toLowerCase()?.includes(section)
          )
        );
        setSelectedContent("profile");
      } else if (section === "home") {
        setSelectedContent("default");
      } else if (section === "feedback") {
        setShowFeedbackDialog(true);
      } else if (section === "keyboardShortcuts") {
        setShowMenuDialog(true);
        setOpenMenuPanel(2);
      } else {
        handleButtonClick(section);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleProceedClick = () => {
    setIsSlidingUp(true); // Trigger slide-up animation
    setTimeout(() => {
      if (checked) {
        setNeverShowLandingScreen(true);
      }
      setShowLandingScreen(false);
    }, 500); // Adjust timeout to match CSS animation duration
  };

  return state.landingScreen.neverShowLandingScreen || !showLandingScreen ? (
    <div
      className={`w-full h-[100dvh] flex flex-col lg:flex-row items-center bg-color1`}
    >
      <Header
        showMenuDialog={showMenuDialog}
        setShowMenuDialog={setShowMenuDialog}
      />

      <div
        className={`contentBody h-full w-full text-color5 overflow-y-auto snap-y snap-mandatory`}
      >
        {state.selectedContentBtn !== "profile" ? (
          <MainChatComponent />
        ) : (
          <ProfileComponent
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        )}
      </div>

      <FeedbackFormDialog />

      <MenuDialog
        showMenuDialog={showMenuDialog}
        openMenuPanel={openMenuPanel}
        setOpenMenuPanel={setOpenMenuPanel}
        setShowMenuDialog={setShowMenuDialog}
      />
    </div>
  ) : (
    // <div className="w-full h-full flex flex-col bg-color1">
    <div
      className={`w-full h-full flex flex-col bg-color1 ${
        isSlidingUp ? "slide-up" : ""
      }`}
    >
      <div className="w-full h-[85%] flex flex-col items-center justify-center gap-10">
        <div className="w-[200px] aspect-square">
          <img
            className="w-full aspect-square object-cover rounded-md"
            src={MyImg}
            alt="yash agarwal"
          ></img>
        </div>
        <h1 className="font-content h-12 text-2xl sm:text-3xl mdl:text-4xl text-color4 text-center px-2 sm:px-4 md:px-5">
          <TypeIt
            options={{
              speed: 30,
              waitUntilVisible: true,
              cursor: false,
            }}
          >
            Hey, myself{" "}
            <span className="font-heading text-color5 font-semibold">
              Yash Agarwal
            </span>
            , and this is my{" "}
            <span className="font-heading text-color5 font-semibold">
              Portfolio
            </span>{" "}
            project
          </TypeIt>
        </h1>

        <div className="animate-bounce">
          <Button
            title="click to proceed"
            icon={
              <span className="material-symbols-rounded">chevron_right</span>
            }
            rounded
            className="mt-20 moving-gradient-bg animate-bounce text-color1"
            size="large"
            onClick={handleProceedClick}
          />
        </div>
      </div>

      <div className="w-full h-[15%] flex justify-center items-center gap-x-2">
        <Checkbox
          onChange={(e) => setChecked(e.checked as boolean)}
          checked={checked}
          // className="bg-color3 rounded-none"
        ></Checkbox>
        <span className="font-content text-color4">
          Don't show this to me again
        </span>
      </div>
    </div>
  );
};

export default Content;
