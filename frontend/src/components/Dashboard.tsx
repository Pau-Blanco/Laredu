import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Bienvenido a Laredu</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <Link to="/courses" className="p-6 bg-blue-500 text-white rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:bg-blue-400 flex items-center justify-center text-lg font-semibold">
                    📖 Ver Cursos
                </Link>
                <Link to="/subjects" className="p-6 bg-green-500 text-white rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:bg-green-400 flex items-center justify-center text-lg font-semibold">
                    📚 Ver Asignaturas
                </Link>
                <Link to="/assignments" className="p-6 bg-purple-500 text-white rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:bg-purple-400 flex items-center justify-center text-lg font-semibold">
                    📝 Ver Tareas
                </Link>
                <Link to="/submissions" className="p-6 bg-yellow-500 text-white rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:bg-yellow-400 flex items-center justify-center text-lg font-semibold">
                    📤 Ver Entregas
                </Link>
                <Link to="/messages" className="p-6 bg-red-500 text-white rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:bg-red-400 flex items-center justify-center text-lg font-semibold">
                    💬 Ver Mensajes
                </Link>
            </div>
        </div>
    );
}
