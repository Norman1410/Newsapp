import { useState } from "react";
import { registerUser, loginUser } from "../authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const user = await registerUser(email, password);
    if (user) alert("Usuario registrado con éxito");
  };

  const handleLogin = async () => {
    const user = await loginUser(email, password);
    if (user) alert("Inicio de sesión exitoso");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Autenticación en Firebase</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      />
      <button onClick={handleRegister} className="bg-blue-500 text-white p-2 rounded w-full mb-2">
        Registrarse
      </button>
      <button onClick={handleLogin} className="bg-green-500 text-white p-2 rounded w-full mb-2">
        Iniciar Sesión
      </button>
    </div>
  );
};

export default Login;
