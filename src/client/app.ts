// src/client/app.ts
import { WebBluetoothService } from './bluetooth-service.js';
import { BluetoothMessage } from '../types/bluetooth.js';

class BluetoothChatApp {
  private bluetoothService: WebBluetoothService;
  private messagesContainer!: HTMLElement;
  private messageInput!: HTMLInputElement;
  private sendButton!: HTMLButtonElement;
  private connectButton!: HTMLButtonElement;
  private statusElement!: HTMLElement;

  constructor() {
    this.bluetoothService = new WebBluetoothService();
    this.initializeUI();
    this.setupEventListeners();
  }

  private initializeUI(): void {
    this.messagesContainer = document.getElementById('messages')!;
    this.messageInput = document.getElementById('messageInput') as HTMLInputElement;
    this.sendButton = document.getElementById('sendButton') as HTMLButtonElement;
    this.connectButton = document.getElementById('connectButton') as HTMLButtonElement;
    this.statusElement = document.getElementById('status')!;
  }

  private setupEventListeners(): void {
    this.connectButton.addEventListener('click', this.handleConnect.bind(this));
    this.sendButton.addEventListener('click', this.handleSendMessage.bind(this));
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleSendMessage();
      }
    });

    this.bluetoothService.onMessage(this.handleIncomingMessage.bind(this));
  }

  private async handleConnect(): Promise<void> {
    try {
      this.updateStatus('Connecting...');
      await this.bluetoothService.connect();
      this.updateStatus('Connected');
      this.connectButton.textContent = 'Disconnect';
      this.sendButton.disabled = false;
    } catch (error) {
      this.updateStatus('Connection failed');
      console.error('Connection error:', error);
    }
  }

  private async handleSendMessage(): Promise<void> {
    const message = this.messageInput.value.trim();
    if (!message) return;

    try {
      await this.bluetoothService.sendMessage(message);
      this.addMessageToUI({
        id: Date.now().toString(),
        content: message,
        timestamp: Date.now(),
        sender: 'You',
        type: 'text'
      });
      this.messageInput.value = '';
    } catch (error) {
      console.error('Send message error:', error);
      this.updateStatus('Failed to send message');
    }
  }

  private handleIncomingMessage(message: BluetoothMessage): void {
    this.addMessageToUI(message);
  }

  private addMessageToUI(message: BluetoothMessage): void {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${message.sender === 'You' ? 'sent' : 'received'}`;
    messageElement.innerHTML = `
      <div class="message-header">
        <span class="sender">${message.sender}</span>
        <span class="timestamp">${new Date(message.timestamp).toLocaleTimeString()}</span>
      </div>
      <div class="message-content">${message.content}</div>
    `;
    
    this.messagesContainer.appendChild(messageElement);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  private updateStatus(status: string): void {
    this.statusElement.textContent = status;
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BluetoothChatApp();
});

