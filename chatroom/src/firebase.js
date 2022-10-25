import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAwF6mV0ToBGdw4Mk-S5LkPp7ERCyXpj7A",
  authDomain: "chatroom-a11de.firebaseapp.com",
  projectId: "chatroom-a11de",
  storageBucket: "chatroom-a11de.appspot.com",
  messagingSenderId: "422673025099",
  appId: "1:422673025099:web:464dec08c37bbcc8f0a5ce"
};

export const app = initializeApp(firebaseConfig);