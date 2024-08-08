import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import { getResponse } from "./GetResponses";
import {
  CHAT_USER_MORE_OPTIONS,
  CHAT_USER_OPTIONS,
  WELCOME_MSG,
} from "../../../Data/Data";
import { useAppContext } from "../../../Services/AppContext";
import { AboutMessage } from "../../../Services/Interfaces";
import { useMsgAppContext } from "../../../Services/MessagesContextAndInterfaces/MessagesContext";

// const TypeItText = ({ text, speed = 50 }) => {
//   const textRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (textRef.current) {
//       new TypeIt(textRef.current, {
//         strings: [text],
//         speed,
//         waitUntilVisible: true,
//         loop: false,
//       }).go();
//     }
//   }, [text, speed]);

//   return <div ref={textRef} />;
// };

const ChatComponent = ({
  showChat,
  setShowChat,
}: {
  showChat: boolean;
  setShowChat: Dispatch<SetStateAction<boolean>>;
}) => {
  const { state, showToast } = useAppContext();

  const { messageState, setMessages, setShowOptions, setShowMoreOptions } =
    useMsgAppContext();

  const lastPairRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scrollToLastPair();
    setTimeout(() => {
      scrollToLastPair();
    }, 1000);
  }, []);

  useEffect(() => {
    if (messageState.messages?.length > 0) {
      // setTimeout(() => {
      scrollToLastPair();
      // }, 1000);
    }
  }, [messageState.messages]);

  const handleOptionClick = (query: string) => {
    scrollToLastPair();
    // setShowOptions(false);

    // if(query.includes("more options") || query.includes("previous options"))
    // Add user's selected option as a message
    const userMessage: AboutMessage = {
      content: query,
      id: Date.now().toString(),
      role: "user",
    };

    const response =
      getResponse(query, setShowOptions, setShowMoreOptions) ||
      "Sorry, I don't have information on that.";

    // Add bot's response as a message
    const botMessage: AboutMessage = {
      content: response,
      id: (Date.now() + 1).toString(), // Ensure unique ID
      role: "bot",
    };

    // Update the messages state with both messages
    setMessages([...messageState.messages, userMessage, botMessage]);
  };

  const groupMessages = (messages: AboutMessage[]) => {
    const grouped: AboutMessage[][] = [];
    for (let i = 0; i < messages?.length; i += 2) {
      grouped?.push(messages?.slice(i, i + 2));
    }
    return grouped;
  };

  const groupedMessages = Array.isArray(messageState.messages)
    ? groupMessages(messageState.messages)
    : [];

  const scrollToLastPair = () => {
    lastPairRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Dialog
      visible={showChat}
      onHide={() => {
        setShowChat(!setShowChat);
      }}
      dismissableMask={true}
      draggable={false}
      header={
        <>
          <div className="text-color1 lg:text-3xl font-heading font-normal">
            About me...
          </div>
        </>
      }
      className={`aboutDialog ${
        state.easyMode
          ? "w-full md:w-1/2"
          : "w-full md:w-[85%] mdl:w-[75%] lg:w-[65%]"
      } h-full md:h-[80%] absolute bottom-0 md:bottom-auto`}
      position={
        window.innerWidth < 768 ? "bottom" : state.easyMode ? "right" : "center"
      }
    >
      <div className="w-full h-full m-auto p-2 overflow-y-auto  bg-color2 shadow-md rounded-md contentBody">
        {groupedMessages?.length > 0 ? (
          groupedMessages?.map((value, key) => (
            <div
              key={key}
              className={`
        ${key === groupedMessages?.length - 1 ? "h-[99%] mb-0" : "mb-4"}
          flex flex-col gap-y-5`}
              ref={key === groupedMessages?.length - 1 ? lastPairRef : null}
            >
              {value?.map((message, subKey) => (
                <div
                  className={`flex flex-col gap-y-2 ${
                    message.role === "user" ? "items-end" : "items-start"
                  }`}
                  key={subKey}
                >
                  <div
                    className={`flex ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    } items-center gap-x-2  text-sm md:text-base`}
                  >
                    <span className="pi pi-user bg-color4 text-color1 rounded-full p-2 mdl:p-3"></span>
                    <span className="font-subheading">
                      {message?.role === "user" ? "User" : "Yash"}
                    </span>
                  </div>
                  <div
                    className={`max-w-full sm:max-w-[90%] md:max-w-[80%] mdl:max-w-[70%] lg:max-w-[70%] w-fit  text-sm md:text-base ${
                      message.role === "user"
                        ? "m4-3 mdl:mr-3 bg-color3 text-color1"
                        : "ml-3 mdl:ml-4 bg-color4 text-color1"
                    } p-3 rounded-md font-content`}
                  >
                    {/* <TypeItText text={WELCOME_MSG} /> */}
                    {/* {message?.content} */}
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                      {message?.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {groupedMessages.length - 1 === key && (
                <div className="flex flex-col gap-y-2 items-end">
                  <div className="flex flex-row-reverse items-center gap-x-2  text-xs sm:text-sm md:text-base">
                    <span className="pi pi-user bg-color4 text-color1 rounded-full p-2 mdl:p-3"></span>
                    <span className="font-subheading">User</span>
                  </div>
                  <div className="w-[97%] mr-3 mdl:mr-4 flex flex-wrap gap-2 justify-end font-content text-color5">
                    {messageState.showOptions
                      ? CHAT_USER_OPTIONS?.map((value, key) => {
                          if (value.visible)
                            return (
                              <Button
                                key={key}
                                label={value.title}
                                className={`px-3 py-2 capitalize text-xs sm:text-sm md:text-base border border-color5 ${
                                  state?.selectedAboutSectionBtn?.toLowerCase() ===
                                  value?.title?.toLowerCase()
                                    ? "block"
                                    : "block"
                                }`}
                                onClick={() => {
                                  if (
                                    value.title
                                      .toLowerCase()
                                      .includes("more options") ||
                                    value.title
                                      .toLowerCase()
                                      .includes("previous options")
                                  ) {
                                    getResponse(
                                      value.title,
                                      setShowOptions,
                                      setShowMoreOptions
                                    );
                                  } else {
                                    handleOptionClick(value.title);
                                  }
                                }}
                              />
                            );
                        })
                      : messageState.showMoreOptions
                      ? CHAT_USER_MORE_OPTIONS?.map((value, key) => {
                          if (value.visible)
                            return (
                              <Button
                                key={key}
                                label={value.title}
                                className={`px-3 py-2 capitalize text-xs sm:text-sm md:text-base border border-color5 ${
                                  state?.selectedAboutSectionBtn?.toLowerCase() ===
                                  value?.title?.toLowerCase()
                                    ? "block"
                                    : "block"
                                }`}
                                onClick={() => {
                                  if (
                                    value.title
                                      .toLowerCase()
                                      .includes("more options") ||
                                    value.title
                                      .toLowerCase()
                                      .includes("previous options")
                                  ) {
                                    getResponse(
                                      value.title,
                                      setShowOptions,
                                      setShowMoreOptions
                                    );
                                  } else {
                                    handleOptionClick(value.title);
                                  }
                                }}
                              />
                            );
                        })
                      : ""}
                    <Button
                      disabled={messageState.messages?.length === 0}
                      icon={"pi pi-refresh"}
                      onClick={() => {
                        setMessages([]);
                        setShowMoreOptions(false);
                        setShowOptions(true);
                        showToast("success", "Success", "Messages reset");
                      }}
                      className="px-3 py-2 border border-color5"
                    />
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-2  text-sm md:text-base">
                <span className="pi pi-user bg-color3 text-color1 rounded-full p-2 mdl:p-3"></span>
                <span className="font-subheading">Yash</span>
              </div>
              <div className="max-w-full sm:max-w-[90%] md:max-w-[80%] mdl:max-w-[70%] lg:max-w-[70%] w-fit ml-3 mdl:ml-4 bg-color4 p-3 rounded-md font-content text-color1 text-sm md:text-base">
                {/* <TypeItText text={WELCOME_MSG} /> */}
                {WELCOME_MSG}
              </div>
            </div>
            <div className="flex flex-col gap-y-2 items-end">
              <div className="flex flex-row-reverse items-center gap-x-2  text-xs sm:text-sm md:text-base">
                <span className="pi pi-user bg-color3 text-color1 rounded-full p-2 mdl:p-3"></span>
                <span className="font-subheading">User</span>
              </div>
              <div className="w-full mdl:w-[90%] mr-3 mdl:mr-4 flex flex-wrap gap-2 justify-end font-content">
                {/* {WELCOME_MSG} */}
                {messageState.showOptions
                  ? CHAT_USER_OPTIONS?.map((value, key) => {
                      if (value?.visible)
                        return (
                          <Button
                            key={key}
                            label={value?.title}
                            className={`px-3 py-2 capitalize text-xs sm:text-sm md:text-base border border-color5 ${
                              state?.selectedAboutSectionBtn?.toLowerCase() ===
                              value?.title?.toLowerCase()
                                ? "block"
                                : "block"
                            }`}
                            onClick={() => {
                              if (
                                value.title
                                  .toLowerCase()
                                  .includes("more options") ||
                                value.title
                                  .toLowerCase()
                                  .includes("previous options")
                              ) {
                                getResponse(
                                  value.title,
                                  setShowOptions,
                                  setShowMoreOptions
                                );
                              } else {
                                handleOptionClick(value.title);
                              }
                            }}
                          />
                        );
                    })
                  : messageState.moreOptions
                  ? CHAT_USER_MORE_OPTIONS?.map((value, key) => {
                      if (value?.visible)
                        return (
                          <Button
                            key={key}
                            label={value?.title}
                            className={`px-3 py-2 capitalize text-xs sm:text-sm md:text-base border border-color5 ${
                              state?.selectedAboutSectionBtn?.toLowerCase() ===
                              value?.title?.toLowerCase()
                                ? "block"
                                : "block"
                            }`}
                            onClick={() => {
                              if (
                                value.title
                                  .toLowerCase()
                                  .includes("more options") ||
                                value.title
                                  .toLowerCase()
                                  .includes("previous options")
                              ) {
                                getResponse(
                                  value.title,
                                  setShowOptions,
                                  setShowMoreOptions
                                );
                              } else {
                                handleOptionClick(value.title);
                              }
                            }}
                          />
                        );
                    })
                  : ""}
              </div>
            </div>
          </div>
        )}{" "}
      </div>
    </Dialog>
  );
};

export default ChatComponent;
