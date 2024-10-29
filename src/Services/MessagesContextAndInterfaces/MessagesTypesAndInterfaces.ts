import { Dispatch } from "react";

import { AboutMessage } from "../Interfaces";

export type Action<T> = { type: string; payload?: T };

export interface MessageState {
  [key: string]: any;
  messages: AboutMessage[];
  showOptions: boolean;
  options: ChatOption[];
  showMoreOptions: boolean;
  moreOptions: ChatOption[];
  selectedChatAppearance: string;
  disableTypingAnimation: boolean;
}

export type ChatOption = {
  title: string;
  visible: boolean;
};

export type ActionType =
  | boolean
  | string
  | null
  | ChatOption
  | ChatOption[]
  | AboutMessage
  | AboutMessage[]
  | { key: string; value: boolean };

export interface AppContextType {
  messageState: MessageState;
  dispatch: Dispatch<Action<ActionType>>;
  setMessages: (payload: AboutMessage[]) => void;
  setShowOptions: (showOptions: boolean) => void;
  setShowMoreOptions: (showMoreOptions: boolean) => void;
  setSelectedChatAppearance: (payload: string) => void;
  setDisableTypingAnimation: (payload: boolean) => void;
}

export type dispatchParamType = {
  type: string;
  contextStateKey: string;
  payload: any;
};
