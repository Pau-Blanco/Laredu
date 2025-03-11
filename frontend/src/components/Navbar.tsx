import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

interface NavbarProps {
    onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
            <div className="text-3xl font-bold tracking-wide animate-fade-in">📚Laredu</div>
            <div className="flex-1 flex justify-center space-x-6">
                <Link to="/dashboard" className="px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-200 transform hover:scale-105">Dashboard</Link>
                <Link to="/courses" className="px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-200 transform hover:scale-105">Cursos</Link>
                <Link to="/subjects" className="px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-200 transform hover:scale-105">Asignaturas</Link>
                <Link to="/assignments" className="px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-200 transform hover:scale-105">Tareas</Link>
                <Link to="/submissions" className="px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-200 transform hover:scale-105">Entregas</Link>
                <Link to="/messages" className="px-3 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-200 transform hover:scale-105">Mensajes</Link>
            </div>
            <div className="flex items-center">
                <LogoutButton onLogout={onLogout} />
            </div>
        </nav>
    );
}
