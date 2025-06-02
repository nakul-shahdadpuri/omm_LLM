import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "password") {
            localStorage.setItem("authenticated", "true");
            navigate("/app");
        }
        else {
            alert("Invalid credentials");
        }
    };
    return (_jsxs("div", { className: "flex flex-col items-center justify-center h-screen bg-gray-100 space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-800", children: "Omm IT Solutions" }), _jsxs("form", { onSubmit: handleLogin, className: "bg-white p-8 rounded shadow-md w-80 space-y-4", children: [_jsx("h2", { className: "text-xl font-bold text-center", children: "Login" }), _jsx(Input, { type: "text", placeholder: "Username", value: username, onChange: (e) => setUsername(e.target.value), required: true }), _jsx(Input, { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsx(Button, { type: "submit", className: "w-full", children: "Login" })] })] }));
}
