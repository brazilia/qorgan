import { useState } from "react";

const ReportFraud = () => {
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); // Reset message

        const token = localStorage.getItem("token"); // Get auth token

        if (!token) {
            setMessage("You must be logged in to report fraud.");
            return;
        }
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1])); // Decode token
            console.log("Decoded Token:", payload);
        }

        try {
            const res = await fetch("https://qorgan.onrender.com/cases", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ description }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Fraud case submitted successfully!");
                setDescription(""); // Clear input
            } else {
                setMessage(data.error || "Something went wrong.");
            }
        } catch (err) {
            setMessage("Error submitting fraud case.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Report a Fraud Case</h2>
                {message && <p className="text-center text-red-500 mb-2">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <textarea
                        className="w-full p-2 border rounded mb-4"
                        rows="4"
                        placeholder="Describe the fraud case..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReportFraud;
