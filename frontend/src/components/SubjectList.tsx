// src/components/SubjectsList.tsx
import React, { useEffect, useState } from "react";
interface Subject {
    id: number;
    name: string;
    course_id: number;
    teacher_id: number;
}
export default function SubjectsList() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [error, setError] = useState("");
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/subjects", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => setSubjects(data))
            .catch(() => setError("Error al obtener las asignaturas"));
    }, []);
    return (
        <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-4xl font-extrabold mb-6 text-center text-green-500">Asignaturas</h2>
            {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
            <ul className="space-y-4">
                {subjects.map((subject) => (
                    <li key={subject.id} className="p-4 border rounded-lg bg-gray-100 shadow-md hover:bg-gray-200 transition duration-200">
                        <h3 className="text-xl font-semibold text-gray-800">{subject.name}</h3>
                        <p className="text-gray-600">ID Curso: {subject.course_id}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}