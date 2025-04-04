import { useEffect, useState } from "react";
import axios from "axios";

const CasesPage = () => {
    const [cases, setCases] = useState([]);

    useEffect(() => {
        fetchCases();
    }, []);

    const fetchCases = async () => {
        const res = await axios.get("https://qorgan.onrender.com/admin/cases", {
            headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        setCases(res.data);
    };

    const updateStatus = async (id, newStatus) => {
        await axios.put(`https://qorgan.onrender.com/admin/cases/${id}`, { status: newStatus }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });
        fetchCases(); // Refresh cases after update
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Fraud Cases</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Case ID</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cases.map((c) => (
                        <tr key={c.id}>
                            <td className="border p-2">{c.id}</td>
                            <td className="border p-2">{c.description}</td>
                            <td className="border p-2">{c.status}</td>
                            <td className="border p-2">
                                <button 
                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                    onClick={() => updateStatus(c.id, "Accepted")}
                                >
                                    Accept
                                </button>
                                <button 
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                    onClick={() => updateStatus(c.id, "Solved")}
                                >
                                    Mark Solved
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CasesPage;
