// src/components/SubmissionsList.tsx
import React, { useEffect, useState } from "react";
interface Submission {
    id: number;
    assignment_id: number;
    user_id: number;
    submitted_at: string;
    grade: number | null;
}
export default function SubmissionsList() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [assignmentId, setAssignmentId] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/submissions", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => setSubmissions(data))
            .catch(() => setMessage("Error al obtener entregas"));
    }, []);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/submissions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                user_id: 2, // Esto debe cambiarse para tomar el ID del usuario autenticado
                assignment_id: parseInt(assignmentId),
                submitted_at: new Date().toISOString(),
                grade: null,
            }),
        })
            .then((res) => res.json())
            .then(() => setMessage("Tarea entregada con éxito"))
            .catch(() => setMessage("Error al entregar tarea"));
    };
    return (
        <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-4xl font-extrabold mb-6 text-center text-yellow-500">Entregas de Tareas</h2>
            {message && <p className="text-green-600 text-center font-medium bg-green-100 p-2 rounded-lg">{message}</p>}

            <form onSubmit={handleSubmit} className="mb-6 flex space-x-4">
                <input
                    type="number"
                    placeholder="ID de la Tarea"
                    className="border p-3 rounded-lg shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={assignmentId}
                    onChange={(e) => setAssignmentId(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                    Entregar Tarea
                </button>
            </form>

            <ul className="space-y-5">
                {submissions.map((submission) => (
                    <li key={submission.id} className="p-5 border rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 shadow-lg hover:shadow-2xl transition duration-300">
                        <div className="flex justify-between items-center">
                            <strong className="text-lg text-gray-800">ID Tarea: {submission.assignment_id}</strong>
                            <span className="text-sm font-medium text-gray-600 bg-gray-200 px-3 py-1 rounded-full">{new Date(submission.submitted_at).toLocaleDateString()}</span>
                        </div>
                        <p className="mt-2 text-gray-700">{submission.grade !== null ? `Nota: ${submission.grade}` : "Sin nota"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
