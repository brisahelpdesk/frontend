import { Client } from "@stomp/stompjs";

interface SocketConfig {
  headers: { [key: string]: string };
  onConnect: (frame: any) => void;
  onMessage: (message: any) => void;
  onError: (error: any) => void;
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export function socketClient(config: SocketConfig) {
  const stompClient = new Client({
    brokerURL: SOCKET_URL,
    connectHeaders: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      ...config.headers,
    },
    onConnect: config.onConnect,
    onStompError: config.onError,
    onWebSocketError: config.onError,
    reconnectDelay: 5000,
  });

  const connect = () => stompClient.activate();
  const disconnect = () => stompClient.deactivate();
  const isConnected = () => stompClient.connected;

  const subscribe = (destination: string) => {
    return stompClient.subscribe(destination, config.onMessage);
  }

  const publish = (destination: string, body: any) => {
    stompClient.publish({ destination, body: JSON.stringify(body) });
  }

  return {
    connect,
    disconnect,
    isConnected,
    subscribe,
    publish,
  };
}
