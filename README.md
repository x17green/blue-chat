# 💬 BlueChat – Web Bluetooth Chat Application

Blue Chat is a modern browser-based Bluetooth messaging app that enables users to **scan**, **connect**, and **exchange messages** with nearby Bluetooth Low Energy (BLE) devices using the Web Bluetooth API. Built with TypeScript and served via a lightweight Express server, the app offers a clean, responsive chat UI, full Bluetooth integration, and a modular, extensible architecture.

---

## 🚀 Features

- 🔍 **Scan for nearby Bluetooth devices**
- 🔗 **Connect securely** to BLE-compatible devices
- 💬 **Send and receive messages** over Bluetooth
- 📊 **Status indicators**, system messages, and timestamped chat
- 🧪 **Simulated echo messaging** for quick testing
- 🖥️ Works directly in Chrome or Edge with **no installation required**

---

## 🧠 Architecture Overview

### 🧩 Frontend

- **Vanilla HTML/CSS + TypeScript (ES Modules)**
- Modular structure with:
  - `WebBluetoothService` for all Bluetooth communication logic
  - Type-safe interfaces in `types/bluetooth.ts`
  - Fully responsive and animated chat UI
- Built-in Bluetooth support using `navigator.bluetooth`
- Rich UX: user feedback, connection status, and input handling

### 🌐 Backend

- Minimal **Express.js** server
  - Serves static files from `/public`
  - Hot-reload dev setup via `nodemon`
- Compiles with `tsc` into `/dist`
- Ready for future upgrades (e.g., WebSockets, message history)

---

## ⚙️ Development Setup

### 📦 Requirements

- Node.js ≥ v18
- Chrome/Edge browser (Web Bluetooth supported)
- BLE-enabled computer or device

### 🛠 Install Dependencies

```bash
npm install
````

### 🔧 Run Dev Mode

```bash
npm run dev
```

* Runs `tsc --watch` and `nodemon` in parallel
* Serves on `http://localhost:3000`

### 🏗 Build Production Bundle

```bash
npm run build
npm start
```

---

## 💻 File Structure

```
blue-chat/
├── public/
│   └── index.html             # Main chat UI
├── src/
│   ├── client/
│   │   ├── app.ts                # Main app
│   │   └── bluetooth-service.ts  # WebBluetoothService logic
│   ├── types/
│   │   └── bluetooth.ts          # Typed interfaces (device, service, message)
│   └── server.ts              # Express server config
├── dist/                      # Compiled JS output
├── tsconfig.json
├── package.json
└── README.md
```

---

## 📦 Key Features Implemented

| Feature                | Status                                      |
| ---------------------- | ------------------------------------------- |
| Scan for devices       | ✅ `getAvailableDevices()` with UX prompt    |
| Connect to device      | ✅ `connect()` via `requestDevice()`         |
| Send/receive messages  | ✅ Simulated echo responses                  |
| BLE UUIDs              | ✅ Standard & custom GATT UUIDs used         |
| Type safety            | ✅ Defined in `types/bluetooth.ts`           |
| UI feedback            | ✅ Status bar, error messages, timestamps    |
| Live development       | ✅ `tsc --watch` + `nodemon`                 |
| Testing BLE in browser | ⚠️ Only in secure contexts (Chrome + HTTPS) |

---

## 🔒 Browser Compatibility

✅ Works best in:

* **Google Chrome** (Windows/Linux/macOS)
* **Microsoft Edge**

⚠️ Not supported in:

* Firefox
* Safari

> Ensure you access the app via `localhost` or HTTPS. Web Bluetooth **will not work** over `file://`.

---

## 🌟 Potential Use Cases

1. **Bluetooth-based peer chat**
2. **IoT device controller**
3. **BLE device logger / presence scanner**
4. **P2P file/message transfer system**
5. **Offline communication in local areas**

---

## 🛣 Future Roadmap

* [ ] Display multiple devices in scan results
* [ ] Store chat history in localStorage or DB
* [ ] Full support for incoming BLE messages
* [ ] Build Electron or PWA wrapper for native integration
* [ ] Support multi-device pairing
* [ ] Add push notifications / vibration feedback

---

## 📢 Contributing

If you'd like to contribute, submit a pull request or open an issue to:

* Add new BLE features
* Improve UI/UX
* Add test coverage or service mocking
* Extend it into a PWA or hybrid app

---

## 📄 License

[MIT](./LICENSE)

---

## 🙌 Acknowledgements

Built by [Okoyen Precious](https://github.com/x17green), inspired by the emerging power of Bluetooth-enabled web applications and the Web Bluetooth API.

---
