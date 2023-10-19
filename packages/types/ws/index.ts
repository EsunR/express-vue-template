export interface WsResponseData {
  success: boolean;
  msg?: string;
}

export interface MessageClientToServerEvents {
  'chat message': (
    msg: string,
    callback: (res: WsResponseData) => void
  ) => void;
  'broadcast message': (
    msg: string,
    callback: (res: WsResponseData) => void
  ) => void;
}

export interface MessageServerToClientEvents {
  'chat message': (msg: string) => void;
  'broadcast message': (msg: string) => void;
}
