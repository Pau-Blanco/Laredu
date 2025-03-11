// src/components/MessageList.tsx
import React, { useEffect, useState } from "react";
interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    is_read: boolean;
    created_at: string;
}
export default function MessageList() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [receiverId, setReceiverId] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/messages", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => setMessages(data))
            .catch(() => setMessage("Error al obtener mensajes"));
    }, []);
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                receiver_id: parseInt(receiverId),
                content,
            }),
        })
            .then((res) => res.json())
            .then(() => setMessage("Mensaje enviado con éxito"))
            .catch(() => setMessage("Error al enviar mensaje"));
    };
    return (
        <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-4xl font-extrabold mb-6 text-center text-red-500">Mensajería</h2>
            {message && <p className="text-green-500 text-center font-semibold">{message}</p>}
            <form onSubmit={handleSendMessage} className="mb-4 flex space-x-2">
                <input
                    type="number"
                    placeholder="ID Destinatario"
                    className="border p-2 rounded w-1/3 focus:ring-2 focus:ring-blue-300"
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Mensaje"
                    className="border p-2 rounded flex-1 focus:ring-2 focus:ring-blue-300"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-200">
                    Enviar
                </button>
            </form>
            <ul className="space-y-4">
                {messages.map((msg) => (
                    <li key={msg.id} className={`p-4 rounded-lg shadow-md transition duration-200 ${msg.sender_id === 2 ? 'bg-blue-100 text-right' : 'bg-gray-100'}`}>
                        <strong>{msg.sender_id === 2 ? "Yo" : `Usuario ${msg.sender_id}`}</strong>: {msg.content}
                        <p className="text-sm text-gray-500">{new Date(msg.created_at).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
} 