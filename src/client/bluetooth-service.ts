// src/client/bluetooth-service.ts
import { BluetoothDevice as CustomBluetoothDevice } from '../types/bluetooth'; // Adjust path
import type { 
  BluetoothService,
  BluetoothMessage
} from '../types/bluetooth'

export class WebBluetoothService implements BluetoothService {
  private device: BluetoothDevice | null = null;
  private server: BluetoothRemoteGATTServer | null = null;
  private characteristic: BluetoothRemoteGATTCharacteristic | null = null;
  private messageCallbacks: ((message: BluetoothMessage) => void)[] = [];
  
  // Standard Bluetooth Serial Service UUID
  private readonly SERVICE_UUID = '00001101-0000-1000-8000-00805f9b34fb';
  private readonly CHARACTERISTIC_UUID = '00001101-0000-1000-8000-00805f9b34fb';
  
  async connect(deviceId?: string): Promise<BluetoothRemoteGATTServer> {
    try {
      // Request device with serial service
      this.device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: [this.SERVICE_UUID] }
        ],
        optionalServices: [this.SERVICE_UUID]
      });
      
      console.log('Connecting to GATT Server...');
      this.server = await this.device.gatt!.connect();
      
      console.log('Getting Service...');
      const service = await this.server.getPrimaryService(this.SERVICE_UUID);
      
      console.log('Getting Characteristic...');
      this.characteristic = await service.getCharacteristic(this.CHARACTERISTIC_UUID);
      
      // Set up notifications for incoming messages
      await this.characteristic.startNotifications();
      this.characteristic.addEventListener('characteristicvaluechanged', 
        this.handleIncomingMessage.bind(this));
        
        console.log('Bluetooth connected successfully!');
        return this.server;
      } catch (error) {
        console.error('Bluetooth connection failed:', error);
        throw error;
      }
    }
    
    async disconnect(): Promise<void> {
      if (this.characteristic) {
        await this.characteristic.stopNotifications();
        this.characteristic = null;
      }
      if (this.server) {
        this.server.disconnect();
        this.server = null;
      }
      this.device = null;
    }
    
    async sendMessage(message: string): Promise<void> {
      if (!this.characteristic) {
        throw new Error('Not connected to Bluetooth device');
      }
      
      const encoder = new TextEncoder();
      const data = encoder.encode(message);
      
      await this.characteristic.writeValue(data);
      console.log('Message sent:', message);
    }
    
    onMessage(callback: (message: BluetoothMessage) => void): void {
      this.messageCallbacks.push(callback);
    }
    
    private handleIncomingMessage(event: Event): void {
      const characteristic = event.target as BluetoothRemoteGATTCharacteristic;
      const decoder = new TextDecoder();
      const message = decoder.decode(characteristic.value!);
      
      const bluetoothMessage: BluetoothMessage = {
        id: Date.now().toString(),
        content: message,
        timestamp: Date.now(),
        sender: this.device?.name || 'Unknown Device',
        type: 'text'
      };
      
      this.messageCallbacks.forEach(callback => callback(bluetoothMessage));
    }
    
    async getAvailableDevices(): Promise<CustomBluetoothDevice[]> {
      const available = await navigator.bluetooth.getAvailability();
      if (!available) {
        alert("Please enable Bluetooth on your device before scanning.");
        return [];
      }
      try {
        const device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['battery_service', 'generic_access', 'generic_attribute']
        });
        
        const customDevice: CustomBluetoothDevice = {
          id: device.id,
          name: device.name || 'Unnamed Device',
          connected: device.gatt?.connected ?? false,
          lastSeen: Date.now(), // Capture the scan time
        };
        
        return [customDevice];
      } catch (error) {
        console.error('Device discovery failed:', error);
        return [];
      }
    }
    
  }
  