import { ReactNode, createContext, useState } from "react";
import { setCities } from "../../redux/citySlice";
import { useAppDispatch } from "../../redux/store";
import { httpApi } from "../../utils/api";

export type WsContextPropsType = {
  children: ReactNode;
};

export type IncomingWebsocketMessage = {
  hb?: any;
  cmd: string;
  data?: any;
};

export type WebsocketContextValueType = {
  wsEndpoint: string;
};

const defaultValue: WebsocketContextValueType = {
  wsEndpoint: import.meta.env.VITE_BACKEND_WS_URL,
};

export const WsContextReal = createContext(defaultValue);

export default function WsContext(props: WsContextPropsType) {
  const [websocketConnection, setWebsocketConnection] =
    useState<WebSocket | null>(null);

  const dispatch = useAppDispatch();
  const api = httpApi();

  if (websocketConnection === null) {
    const wsClient = new WebSocket(defaultValue.wsEndpoint);

    wsClient.onopen = (event: Event) => {
      console.log(">> 🚀 event:", event);
      // TODO Handle here.
    };

    wsClient.onclose = (event: CloseEvent) => {
      console.log(">> WS onclose", event);

      setTimeout(() => {
        setWebsocketConnection(null);
      }, 1e3);
    };

    setWebsocketConnection(wsClient);
  } else if (websocketConnection) {
    websocketConnection.onerror = (event: Event) => {
      console.log(">> WS onerror", event);
    };

    websocketConnection.onmessage = async (event: MessageEvent) => {
      const message: IncomingWebsocketMessage = JSON.parse(event.data);

      if (message.hb) {
        websocketConnection.send(JSON.stringify({ hb: new Date().getTime() }));
      } else {
        if (message.cmd === "pinUpdate") {
          const result = await api.get("/ws/getPins");
          console.log(">> 🚀 result:", result);

          dispatch(setCities(result.data));
        } else {
          console.log("Unknown message:", message);
        }
      }
    };
  }

  const providerValue: WebsocketContextValueType = {
    ...defaultValue,
  };

  return (
    <WsContextReal.Provider value={providerValue}>
      {props.children}
    </WsContextReal.Provider>
  );
}
