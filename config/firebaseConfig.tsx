import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCu0_dspI_HVAtRrYf9N3B0BRO922bU1mk",
  authDomain: "floreamie-8ca80.firebaseapp.com",
  projectId: "floreamie-8ca80",
  storageBucket: "floreamie-8ca80.firebasestorage.app",
  messagingSenderId: "677275461658",
  appId: "1:677275461658:ios:31cd0f43b268947c0049a3",
};

// Initialisation sécurisée
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exportez les services Firebase nécessaires
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export { auth };
export default app;
