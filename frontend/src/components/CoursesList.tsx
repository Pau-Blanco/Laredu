// src/components/CoursesList.tsx
import { useEffect, useState } from "react";
interface Course {
    id: number;
    name: string;
    description: string;
}
export default function CoursesList() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found. Please log in.");
            return;
        }
        fetch("http://127.0.0.1:8000/api/courses", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch courses");
                }
                return res.json();
            })
            .then((data: Course[]) => {
                setCourses(data);
            })
            .catch((err) => setError(err.message));
    }, []);
    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-4xl font-extrabold mb-6 text-center text-blue-500">Cursos Disponibles</h2>
            <ul className="space-y-4">
                {courses.map((course) => (
                    <li key={course.id} className="p-4 border rounded-lg bg-gray-100 shadow-md hover:bg-gray-200 transition duration-200">
                        <h3 className="text-xl font-semibold text-gray-800">{course.name}</h3>
                        <p className="text-gray-600">{course.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}