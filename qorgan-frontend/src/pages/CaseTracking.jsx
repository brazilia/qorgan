import { useEffect, useState } from "react";

const CaseTracking = () => {
  const [cases, setCases] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await fetch("http://localhost:5000/cases", {
          headers: {
            "Authorization": `Bearer ${token}`,  // 👈 ADD Bearer
            "Content-Type": "application/json"
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch cases");
        }

        const data = await res.json();
        setCases(data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      }
    };

    fetchCases();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Сіз жіберген өтініштер</h1>
      {cases.length === 0 ? (
        <p>Әлі өтініш жібермедіңіз.</p>
      ) : (
        <ul>
          {cases.map((fraudCase) => (
            <li key={fraudCase.id} className="border p-4 mb-2 rounded">
              <p><strong>Сипаттама:</strong> {fraudCase.description}</p>
              <p><strong>Күйі:</strong> {fraudCase.status}</p>
              <p><strong>Жіберілген күні:</strong> {new Date(fraudCase.createdate).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CaseTracking;
