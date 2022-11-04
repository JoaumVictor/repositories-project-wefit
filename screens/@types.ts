export interface GetInfo {
  details: Details | null;
  isConnected: boolean | null;
  isInternetReachable: boolean;
  isWifiEnabled?: boolean;
  type: string;
}

export interface Details {
  bssid: string;
  frequency: number;
  ipAddress: string;
  isConnectionExpensive: boolean;
  linkSpeed: number;
  rxLinkSpeed: number;
  ssid: string;
  strength: number;
  subnet: string;
  txLinkSpeed: number;
}
