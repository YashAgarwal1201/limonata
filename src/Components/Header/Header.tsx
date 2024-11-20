import { Button } from "primereact/button";

import { useAppContext } from "../../Services/AppContext";

type HeaderProps = {
  showMenuDialog: boolean;
  setShowMenuDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ showMenuDialog, setShowMenuDialog }: HeaderProps) => {
  const { state, setShowFeedbackDialog, showToast, setSelectedContent } =
    useAppContext();

  const selectedButtonStyles =
    "text-color1 bg-color4 border-2 border-solid border-color4 shadow-md";
  const normalButtonStyles =
    "text-color5 bg-transparent border-2 border-transparent";

  return (
    <div className="w-full lg:w-[75px] h-12 lg:h-full flex flex-row lg:flex-col justify-between items-center">
      <div className="w-auto lg:w-[75px] h-12 lg:h-auto flex flex-row lg:flex-col items-center justify-center gap-y-0 md:gap-y-1 gap-x-1 lg:gap-x-0">
        <Button
          title={
            state.selectedContentBtn === "profile" ? "Go back" : "Profile view"
          }
          icon={
            <span className="material-symbols-rounded">
              {state.selectedContentBtn === "profile"
                ? "forum"
                : "account_circle"}
            </span>
          }
          className={`${normalButtonStyles} w-12 lg:w-16 h-full lg:h-16`}
          onClick={() => {
            if (state.selectedContentBtn === "profile") {
              setSelectedContent("default");
            } else {
              setSelectedContent("profile");
            }
          }}
        />
        <Button
          disabled={true}
          title="Download Resume"
          icon={<span className="material-symbols-rounded">download</span>}
          className={`${
            state.selectedContentBtn === "resume"
              ? selectedButtonStyles
              : normalButtonStyles
          } hidden md:flex w-12 lg:w-16 h-full lg:h-16`}
          onClick={() => {
            // setSelectedButton("resume");
            showToast("info", "Info", "Under development");
          }}
        />
        <Button
          title="Give feedback"
          icon={<span className="material-symbols-rounded">mail</span>}
          className={`${normalButtonStyles}  hidden md:flex w-12 lg:w-16 h-full lg:h-16`}
          onClick={() => {
            setShowFeedbackDialog(true);
          }}
        />
      </div>
      <div className="w-auto lg:w-[75px] h-12 lg:h-auto">
        <Button
          title="Settings & others"
          icon={<span className="material-symbols-rounded">more_vert</span>}
          className={`${normalButtonStyles} flex  w-12 lg:w-16 h-full lg:h-16`}
          onClick={() => setShowMenuDialog(!showMenuDialog)}
        />
      </div>
    </div>
  );
};

export default Header;
