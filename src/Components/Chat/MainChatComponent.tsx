import { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { ScrollTop } from "primereact/scrolltop";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import TypeIt from "typeit-react";

import { CHAT_USER_MORE_OPTIONS, CHAT_USER_OPTIONS } from "../../Data/Data";
import { useAppContext } from "../../Services/AppContext";
import {
  getResponse,
  WELCOME_MSG,
} from "../../Services/GetResponses/GetResponses";
import { AboutMessage } from "../../Services/Interfaces";
import { useMsgAppContext } from "../../Services/MessagesContextAndInterfaces/MessagesContext";

const MainChatComponent = () => {
  const { state, showToast } = useAppContext();

  const { messageState, setMessages, setShowOptions, setShowMoreOptions } =
    useMsgAppContext();

  const [msgContainerHeight, setMsgContainerHeight] = useState<number>(0);
  const [startNewMessageAnimation, setStartNewMessageAnimation] =
    useState<boolean>(false);
  const [showContent, setShowContent] = useState(false);

  const lastPairRef = useRef<HTMLDivElement>(null);
  const userOptionsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowContent(true);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (userOptionsContainerRef.current) {
        setMsgContainerHeight(userOptionsContainerRef.current.clientHeight);
      }
    };

    const resizeObserver = new ResizeObserver(updateHeight);
    if (userOptionsContainerRef.current) {
      resizeObserver.observe(userOptionsContainerRef.current);
    }

    // Cleanup on component unmount
    return () => {
      if (userOptionsContainerRef.current) {
        resizeObserver.unobserve(userOptionsContainerRef.current);
      }
    };
  }, []);

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
    // Add user's selected option as a message
    const userMessage: AboutMessage = {
      content: query,
      id: Date.now().toString(),
      role: "user",
    };

    const response = ReactDOMServer.renderToStaticMarkup(
      getResponse({
        query: query,
        setShowOptions,
        setShowMoreOptions,
      }) || "Sorry, I don't have information on that."
    );

    // Add bot's response as a message
    const botMessage: AboutMessage = {
      content: response,
      id: (Date.now() + 1).toString(), // Ensure unique ID
      role: "bot",
    };

    // Update the messages state with both messages
    setMessages([...messageState.messages, userMessage, botMessage]);
    setStartNewMessageAnimation(true);

    const TIMEOUT =
      response?.length < 1500 ? 20 * response.length : response.length;

    // Stop the animation after a short delay
    setTimeout(() => {
      setStartNewMessageAnimation(false);
    }, TIMEOUT * 1000);
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

  const resetChatHandeler = () => {
    setMessages([]);
    setShowMoreOptions(false);
    setShowOptions(true);
    showToast("success", "Success", "Messages reset");
  };

  return (
    // <div className="w-full h-full flex flex-col items-center">
    <div
      className={`w-full h-full flex flex-col items-center transition-transform duration-500 ${
        showContent ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className="w-full m-auto px-2 py-2 sm:pr-3 sm:py-3 mdl:pr-4 mdl:py-4 overflow-y-auto contentBody"
        style={{ height: `calc(100% - ${msgContainerHeight}px)` }}
      >
        {groupedMessages?.length > 0 ? (
          groupedMessages?.map((value, key) => (
            <div
              key={key}
              className={`
        ${key === groupedMessages?.length - 1 ? "h-full mb-0" : "mb-4"}
          flex flex-col gap-y-5`}
              ref={key === groupedMessages?.length - 1 ? lastPairRef : null}
            >
              {value?.map((message, subKey) => (
                <div
                  className={`flex flex-col gap-y-2 sm:gap-y-3 mdl:gap-y-4 ${
                    message.role === "user" &&
                    messageState.selectedChatAppearance !== "compact"
                      ? "items-end"
                      : "items-start"
                  }`}
                  key={subKey}
                >
                  <div
                    className={`flex ${
                      message.role === "user" &&
                      messageState.selectedChatAppearance !== "compact"
                        ? "flex-row-reverse"
                        : "flex-row"
                    } items-center gap-x-2 sm:gap-x-3 mdl:gap-x-4 text-sm md:text-base lg:text-lg 2xl:text-xl`}
                  >
                    <span className="material-symbols-rounded bg-color3 text-color4 rounded-full p-2 mdl:p-3">
                      person
                    </span>
                    <span className="font-subheading text-color4">
                      {message?.role === "user" ? "You" : "Yash Agarwal"}
                    </span>
                  </div>
                  <div
                    className={`max-w-full sm:max-w-[90%] md:max-w-[80%] mdl:max-w-[70%] lg:max-w-[70%] w-fit  text-base lg:text-lg 2xl:text-xl ${
                      message.role === "user"
                        ? "bg-color2 text-color4"
                        : "bg-color4 text-color1"
                    } ${
                      messageState.selectedChatAppearance === "compact"
                        ? "ml-3 mdl:ml-4"
                        : message.role === "user"
                        ? "mr-3 mdl:mr-4"
                        : "ml-3 mdl:ml-4"
                    } p-3 rounded-md font-content *:mb-1`}
                  >
                    {startNewMessageAnimation &&
                    message.role === "bot" &&
                    key === groupedMessages?.length - 1 &&
                    !messageState.disableTypingAnimation ? (
                      <TypeIt
                        options={{
                          speed: 10,
                          waitUntilVisible: true,
                          cursor: false,
                        }}
                      >
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                          {message?.content}
                        </ReactMarkdown>
                      </TypeIt>
                    ) : (
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {message?.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center gap-x-2 text-sm lg:text-base 2xl:text-lg">
                <span className="material-symbols-rounded bg-color3 text-color4 rounded-full p-2 mdl:p-3">
                  person
                </span>
                <span className="font-subheading text-color4">
                  Yash Agarwal
                </span>
              </div>
              <div className="max-w-full sm:max-w-[90%] md:max-w-[80%] mdl:max-w-[70%] lg:max-w-[70%] w-fit ml-3 mdl:ml-4 bg-color4 p-3 rounded-md font-content text-color1 text-base lg:text-lg 2xl:text-xl">
                {!messageState.disableTypingAnimation ? (
                  <TypeIt
                    options={{
                      speed: 10,
                      waitUntilVisible: true,
                      cursor: false,
                    }}
                  >
                    {WELCOME_MSG}
                  </TypeIt>
                ) : (
                  WELCOME_MSG
                )}
              </div>
            </div>
          </div>
        )}
        <ScrollTop
          target="parent"
          threshold={200}
          className="h-0 right-0 left-full"
          icon={
            <span className="h-10 w-10 rounded-full bg-color4 text-color1 flex justify-center items-center material-symbols-rounded">
              keyboard_arrow_up
            </span>
          }
        />
      </div>

      {/* user options */}
      <div
        className="w-full h-fit flex flex-col gap-y-2 items-end"
        ref={userOptionsContainerRef}
      >
        <div className="w-full h-full p-3 flex flex-row-reverse items-end gap-x-2  text-xs sm:text-sm md:text-base">
          <span className="material-symbols-rounded bg-color3 text-color4 rounded-full p-2 mdl:p-3">
            person
          </span>
          <div className="w-full mr-3 mdl:mr-4 overflow-auto scrollbar-none flex flex-row mdl:flex-row-reverse gap-2 font-content">
            {messageState.showOptions
              ? CHAT_USER_OPTIONS?.filter(
                  (value) => value.visible === true
                )?.map((value, key) => {
                  return (
                    <Button
                      key={key}
                      label={value?.title}
                      className={`px-3 py-2 flex-shrink-0 flex-grow-0 capitalize text-sm sm:text-base 2xl:text-lg border border-color5 ${
                        state?.selectedAboutSectionBtn?.toLowerCase() ===
                        value?.title?.toLowerCase()
                          ? "block"
                          : "block"
                      }`}
                      onClick={() => {
                        if (
                          value.title.toLowerCase().includes("more options") ||
                          value.title.toLowerCase().includes("previous options")
                        ) {
                          getResponse({
                            query: value.title,
                            setShowOptions,
                            setShowMoreOptions,
                          });
                        } else {
                          handleOptionClick(value.title);
                        }
                      }}
                    />
                  );
                })
              : messageState.moreOptions
              ? CHAT_USER_MORE_OPTIONS?.filter(
                  (value) => value.visible === true
                )?.map((value, key) => {
                  return (
                    <Button
                      key={key}
                      label={value?.title}
                      className={`px-3 py-2 capitalize text-sm sm:text-base 2xl:text-lg border border-color5 ${
                        state?.selectedAboutSectionBtn?.toLowerCase() ===
                        value?.title?.toLowerCase()
                          ? "block"
                          : "block"
                      }`}
                      onClick={() => {
                        if (
                          value.title
                            ?.toLowerCase()
                            ?.includes("more options") ||
                          value.title
                            ?.toLowerCase()
                            ?.includes("previous options")
                        ) {
                          getResponse({
                            query: value.title,
                            setShowOptions,
                            setShowMoreOptions,
                          });
                        } else {
                          handleOptionClick(value.title);
                        }
                      }}
                    />
                  );
                })
              : ""}
            <Button
              title="reset chat"
              disabled={messageState.messages?.length === 0}
              icon={"pi pi-refresh"}
              onClick={() => resetChatHandeler()}
              className="px-3 py-2  flex-shrink-0 flex-grow-0 border border-color5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChatComponent;
