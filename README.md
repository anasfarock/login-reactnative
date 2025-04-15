## 📱 React Native Login & Register with Node.js Backend

This project is a full-stack login and registration system built using:

- **React Native (Expo)** on the frontend
- **Node.js**, **Express**, **Sequelize**, and **SQLite** on the backend

---

## 📂 Project Structure

```
/LoginApp      → React Native frontend (Expo)
/Backend       → Node.js backend with SQLite DB
```

---

## ⚙️ Backend Setup (Node.js + SQLite)

### 🔧 1. Navigate to the backend folder

```bash
cd Backend
```

### 📦 2. Install dependencies

```bash
npm install express sequelize sqlite3 cors bcryptjs
```

### ▶️ 3. Start the backend server

```bash
node server.js
```

> Optionally use `nodemon` for auto-reloading:

```bash
npm install --save-dev nodemon
npx nodemon server.js
```

The backend will run on:

```
http://localhost:8080
```

---

## 📱 Frontend Setup (React Native + Expo)

### 🔧 1. Navigate to the frontend folder

```bash
cd LoginApp
```

### 📦 2. Install dependencies

```bash
npm install
```

Or if using Expo:

```bash
npm install -g expo-cli
expo install
```

### ▶️ 3. Start the frontend

```bash
npm start
# or
expo start
```

Then scan the QR code using **Expo Go** on your phone.

---

## 🌐 API URL Configuration (`axios.js`)

The app uses a custom `axios.js` file to handle different environments:

- Automatically switches between:
  - Android Emulator: `http://10.0.2.2:8080`
  - iOS Simulator: `http://localhost:8080`
  - Physical Devices: `http://<YOUR_PC_IP>:8080`

Update the IP in `axios.js` for physical device testing:

```js
const getBaseURL = () => {
  if (__DEV__) {
    return 'http://192.168.x.x:8080/v1/api'; // Your PC's IP address
  }
  return 'https://your-production-url.com/v1/api';
};
```

---

## 📋 Features

- ✅ User registration
- ✅ Login with validation (Formik + Yup)
- ✅ SQLite DB with Sequelize ORM
- ✅ Password hashing with bcryptjs
- ✅ React Navigation integration

---

## ✅ Requirements

- Node.js (v16+ recommended)
- Expo CLI (`npm install -g expo-cli`)
- SQLite (comes bundled)
- Same Wi-Fi network for PC and phone

---

## 💡 Troubleshooting

- Expo Go app must be on the same Wi-Fi as your PC.
- Use your **PC’s IP** (not localhost) in API calls when testing on a real phone.
- If the server isn't reachable from the phone, check:
  - Windows Firewall
  - Port 8080 open
  - Your IP is correct
