// src/types/bluetooth.ts
export interface BluetoothMessage {
  id: string;
  content: string;
  timestamp: number;
  sender: string;
  type: 'text' | 'file' | 'status';
}

export interface BluetoothDevice {
  id: string;
  name: string;
  connected: boolean;
  lastSeen: number;
}

export interface BluetoothService {
  connect(deviceId?: string): Promise<BluetoothRemoteGATTServer>;
  disconnect(): Promise<void>;
  sendMessage(message: string): Promise<void>;
  onMessage(callback: (message: BluetoothMessage) => void): void;
  getAvailableDevices(): Promise<BluetoothDevice[]>;
}

