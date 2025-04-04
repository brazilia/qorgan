import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [iin, setIIN] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://qorgan.onrender.com/auth/register", { name, email, password, iin });
            setMessage("Registration successful! You can now log in.");
        } catch (err) {
            setMessage("Error registering. Try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Тіркелу</h2>
            <form onSubmit={handleRegister} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Аты жөніңіз"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Құпиясөз"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="ЖСН"
                    value={iin}
                    onChange={(e) => setIIN(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-all duration-200">
                    Тіркелу
                </button>
                {message && <p>{message}</p>}
            </form>
            <p className="mt-4">
                Already have an account? <Link to="/auth" className="text-blue-600 hover:underline">Login</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
