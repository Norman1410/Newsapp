// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Agregado: Importar autenticación
// import { getAnalytics } from "firebase/analytics"; // ❌ Opcional: Si no lo usas, puedes comentarlo

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyClxo9RmYaeuLOwcXEqvnRCGcJAj8JNkzc",
  authDomain: "testlogin-6d62a.firebaseapp.com",
  projectId: "testlogin-6d62a",
  storageBucket: "testlogin-6d62a.firebasestorage.app",
  messagingSenderId: "849767952483",
  appId: "1:849767952483:web:78306bc6a002e35d304856",
  measurementId: "G-K98HNX4GTR"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Corrección: Definir `auth` correctamente

// const analytics = getAnalytics(app); // ❌ Opcional: Comentar si no lo usas

export { auth }; // ✅ Exportar autenticación para usar en otros archivos
