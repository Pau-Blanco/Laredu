// src/components/AssignmentsList.tsx
import React, { useEffect, useState } from "react";
interface Assignment {
    id: number;
    title: string;
    due_date: string;
    subject_id: number;
}
export default function AssignmentsList() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [error, setError] = useState("");
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/assignments", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => setAssignments(data))
            .catch(() => setError("Error al obtener las tareas"));
    }, []);
    return (
        <div className="max-w-4xl mx-auto mt-8 p-8 bg-white rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-4xl font-extrabold mb-6 text-center text-purple-600">Tareas</h2>
            {error && <p className="text-red-600 text-center font-medium bg-red-100 p-2 rounded-lg">{error}</p>}
            <ul className="space-y-5">
                {assignments.map((assignment) => (
                    <li key={assignment.id} className="p-5 border rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 shadow-lg hover:shadow-2xl transition duration-300">
                        <div className="flex justify-between items-center">
                            <strong className="text-lg text-gray-800">{assignment.title}</strong>
                            <span className="text-sm font-medium text-gray-600 bg-gray-200 px-3 py-1 rounded-full">Fecha: {assignment.due_date}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}