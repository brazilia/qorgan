import { useEffect, useState } from "react";

const AdminApproval = () => {
    const [pendingAdmins, setPendingAdmins] = useState([]);

    useEffect(() => {
        fetchPendingAdmins();
    }, []);

    const fetchPendingAdmins = async () => {
        const response = await fetch("http://localhost:5000/admin/pending");
        const data = await response.json();
        setPendingAdmins(data);
    };

    const handleApproval = async (id, approve) => {
        await fetch(`http://localhost:5000/admin/approve/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ approve }),
        });
        fetchPendingAdmins();
    };

    return (
        <div>
            <h2>Pending Admin Approvals</h2>
            {pendingAdmins.map((admin) => (
                <div key={admin.id}>
                    <p>{admin.name} ({admin.email})</p>
                    <button onClick={() => handleApproval(admin.id, true)}>Approve</button>
                    <button onClick={() => handleApproval(admin.id, false)}>Reject</button>
                </div>
            ))}
        </div>
    );
};

export default AdminApproval;
