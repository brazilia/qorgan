import { useState, useEffect } from "react";

const AdminDashboard = () => {
    const [cases, setCases] = useState([]);
    const [error, setError] = useState("");
    const adminToken = localStorage.getItem("adminToken");

    useEffect(() => {
        fetchCases();
    }, []);

    const fetchCases = async () => {
        try {
            const res = await fetch("https://qorgan.onrender.com/admin/cases", {
                headers: { Authorization: `Bearer ${adminToken}` },
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to fetch cases");
            setCases(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const updateStatus = async (caseId, newStatus) => {
        try {
            const res = await fetch(`https://qorgan.onrender.com/admin/cases/${caseId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${adminToken}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error("Failed to update status");
            fetchCases(); // Refresh cases after update
        } catch (err) {
            setError(err.message);
        }
    };

    const assignSpecialist = async (caseId, specialistId) => {
        try {
            const res = await fetch(`http://localhost:5000/admin/cases/${caseId}/assign`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${adminToken}`,
                },
                body: JSON.stringify({ specialistId }),
            });

            if (!res.ok) throw new Error("Failed to assign specialist");
            fetchCases();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            
            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-300">
                        <tr>
                            <th className="p-3">Case ID</th>
                            <th className="p-3">User ID</th>
                            <th className="p-3">Description</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Assign Specialist</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases.map((caseItem) => (
                            <tr key={caseItem.id} className="border-b">
                                <td className="p-3 text-center">{caseItem.id}</td>
                                <td className="p-3 text-center">{caseItem.userid}</td>
                                <td className="p-3">{caseItem.description}</td>
                                <td className="p-3 text-center">
                                    <select
                                        value={caseItem.status}
                                        onChange={(e) => updateStatus(caseItem.id, e.target.value)}
                                        className="p-1 border rounded-md"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Solved">Solved</option>
                                    </select>
                                </td>
                                <td className="p-3 text-center">
                                    <input
                                        type="number"
                                        placeholder="Specialist ID"
                                        className="p-1 border rounded-md w-24"
                                        onBlur={(e) => assignSpecialist(caseItem.id, e.target.value)}
                                    />
                                </td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => updateStatus(caseItem.id, "Solved")}
                                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                    >
                                        Mark Solved
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
