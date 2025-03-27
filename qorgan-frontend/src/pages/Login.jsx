import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const [iin, setIIN] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/auth/login", { iin, password });
            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
            window.location.href = "/"; // Redirect after login
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Кіру</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="IIN"
                    value={iin}
                    onChange={(e) => setIIN(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Login
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
            <p className="mt-4">
                Don't have an account? <Link to="/auth/register" className="text-blue-600 hover:underline">Register</Link>
            </p>
        </div>
    );
};

export default LoginPage;
