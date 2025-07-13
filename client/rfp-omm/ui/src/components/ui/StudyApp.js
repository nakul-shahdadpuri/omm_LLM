var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
export default function ResumeQAApp() {
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [conversationHistory, setConversationHistory] = useState([]); // New state for conversation history
    const [expandedHistoryIndex, setExpandedHistoryIndex] = useState(null); // Track which conversation is expanded

    useEffect(() => {
        // Fetch documents from the new API endpoint
        fetch("http://localhost:5000/get_document_list")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => setDocuments(data.documents || []))
            .catch((err) => console.error("Failed to fetch documents", err));

        // Fetch historical conversations from the new API endpoint
        fetch("http://localhost:5000/gethistorical")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((data) => setConversationHistory(data.history || []))
            .catch((err) => console.error("Failed to fetch conversation history", err));
    }, []);

    const fetchDocumentContent = (doc) => {
        fetch(`http://localhost:5000/api/documents/${doc.name}`)
            .then((res) => res.json())
            .then((data) => setSelectedDoc(Object.assign(Object.assign({}, doc), { content: data.content })))
            .catch((err) => console.error("Failed to fetch document content", err));
    };

    const askQuestion = () => __awaiter(this, void 0, void 0, function* () {
        const pendingAnswer = { question, text: "Loading...", sourceSnippet: "" };
        setAnswers((prev) => [...prev, pendingAnswer]);
        setConversationHistory((prev) => [...prev, { question, answer: "Loading..." }]); // Add to history
        try {
            const res = yield fetch("http://localhost:5000/api/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question }),
            });
            const data = yield res.json();
            setAnswers((prev) => [...prev.slice(0, -1), Object.assign(Object.assign({}, data), { question })]);
            setConversationHistory((prev) => [...prev.slice(0, -1), { question, answer: data.text }]); // Update history
        }
        catch (error) {
            setAnswers((prev) => [
                ...prev.slice(0, -1),
                { question, text: "Error fetching response.", sourceSnippet: "" },
            ]);
            setConversationHistory((prev) => [
                ...prev.slice(0, -1),
                { question, answer: "Error fetching response." },
            ]); // Update history
        }
        setQuestion(""); // Clear the text box
    });

    const handleAddDocument = () => __awaiter(this, void 0, void 0, function* () {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".txt,.pdf,.docx,.md";
        input.onchange = (e) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const target = e.target;
            const file = (_a = target.files) === null || _a === void 0 ? void 0 : _a[0];
            if (!file)
                return;
            const formData = new FormData();
            formData.append("file", file);
            const res = yield fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
            });
            const result = yield res.json();
            setDocuments((prev) => [...prev, { name: result.file_name, file_id: result.file_id }]);
        });
        input.click();
    });

    const formatAnswer = (text, source) => {
        const parts = text.split(/(\d+\.\s+\*\*[^*]+\*\*|\*\*[^*]+\*\*|\[.*?\]\((.*?)\))/g);
        return parts
            .map((part, idx) => {
                if (/^\d+\.\s+\*\*[^*]+\*\*$/.test(part)) {
                    return (_jsx("h4", { className: "text-md font-semibold mt-4", children: part.replace(/\*\*/g, "") }, idx));
                }
                else if (/^\*\*[^*]+\*\*$/.test(part)) {
                    return (_jsx("strong", { className: "block font-medium mt-2", children: part.replace(/\*\*/g, "") }, idx));
                }
                else if (/\[.*?\]\((.*?)\)/.test(part)) {
                    const match = part.match(/\[(.*?)\]\((.*?)\)/);
                    return (_jsx("a", { href: match === null || match === void 0 ? void 0 : match[2], className: "text-blue-400 underline", target: "_blank", rel: "noopener noreferrer", children: match === null || match === void 0 ? void 0 : match[1] }, idx));
                }
                else {
                    return (_jsx("p", { className: "mb-2", children: part }, idx));
                }
            })
            .concat(source
                ? [
                    _jsxs("p", { className: "text-xs text-gray-400 border-t pt-2", children: ["\uD83D\uDCC4 Source: ", _jsx("em", { children: source })] }, "source"),
                ]
                : []);
    };

    return (_jsxs("div", { className: `flex flex-col h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`, children: [
            _jsxs("header", { className: `p-4 border-b shadow text-xl sticky top-0 z-10 flex items-center justify-between ${darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-gray-200 text-gray-800"}`, children: [
                    _jsx("h1", { className: "text-2xl font-semibold", children: "Omm IT Solutions" }),
                    _jsx(Button, { size: "sm", variant: darkMode ? "ghost" : "outline", onClick: () => setDarkMode(!darkMode), children: darkMode ? "🌞 Light Mode" : "🌙 Dark Mode" })
                ] }),
            _jsxs("div", { className: "flex flex-1", children: [
                    _jsxs("div", { className: `w-1/4 min-w-[240px] p-4 border-r overflow-hidden flex flex-col ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-100"}`, children: [
                            _jsx("h2", { className: "text-xl font-bold mb-4", children: "\uD83D\uDDE8\uFE0F Conversation History" }),
                            _jsx("div", { className: "overflow-y-auto flex-grow pr-2", children: _jsx("ul", { className: "space-y-2", children: conversationHistory.map((entry, index) => (_jsxs("li", { className: `p-2 rounded cursor-pointer ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`, onClick: () => setExpandedHistoryIndex(expandedHistoryIndex === index ? null : index), children: [
                                        _jsxs("p", { className: "font-bold", children: ["Q", index + 1, ": ", entry.question] }),
                                        expandedHistoryIndex === index && (_jsxs("div", { className: "mt-2", children: [
                                                _jsxs("p", { className: "text-sm", children: ["A", index + 1, ": ", entry.answer] })
                                            ] }))
                                    ] }, index))) }) })
                        ] }),
                    _jsxs("div", { className: `w-1/4 min-w-[240px] p-4 border-r overflow-hidden flex flex-col ${darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-100"}`, children: [
                            _jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                                    _jsx("h2", { className: "text-xl font-bold", children: "\uD83D\uDCC1 Documents" }),
                                    _jsx(Button, { size: "sm", onClick: handleAddDocument, className: `${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}`, children: "\uFF0B" })
                                ] }),
                            _jsx("div", { className: "overflow-y-auto flex-grow pr-2", children: _jsx("ul", { className: "space-y-2", children: documents.map((doc, index) => (_jsx("li", { className: `p-2 rounded cursor-pointer ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`, onClick: () => fetchDocumentContent(doc), children: doc.name }, index))) }) })
                        ] }),
                    _jsxs("div", { className: "flex-1 p-6 flex flex-col", children: [
                            _jsxs("div", { className: `flex-grow border rounded-xl p-5 mb-4 overflow-auto leading-relaxed ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-800"}`, children: [
                                    _jsx("h3", { className: "text-xl font-semibold mb-3", children: "Ask about any document" }),
                                    answers.length > 0 ? (answers.map((ans, i) => (_jsxs("div", { className: "space-y-2 mb-6", children: [
                                            _jsxs("p", { className: "font-bold", children: ["Q", i + 1, ": ", ans.question] }),
                                            _jsxs("p", { className: "font-bold", children: ["Answer ", i + 1, ":"] }),
                                            _jsx("div", { children: formatAnswer(ans.text, ans.sourceSnippet) })
                                        ] }, i)))) : (_jsx("p", { className: "text-gray-400 italic", children: "No question asked yet." }))
                                ] }),
                            _jsxs("div", { children: [
                                    _jsx(Textarea, { value: question, onChange: (e) => setQuestion(e.target.value), placeholder: "What do you want to know?", rows: 2, className: `mb-2 ${darkMode ? "bg-gray-800 text-white" : ""}` }),
                                    _jsx(Button, { onClick: askQuestion, className: `w-full ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : ""}`, children: "Ask" })
                                ] })
                        ] }),
                    selectedDoc && (_jsxs("div", { className: `w-1/3 p-4 border-l overflow-auto ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`, children: [
                            _jsxs("div", { className: "flex justify-between items-center mb-2", children: [
                                    _jsxs("h2", { className: "font-medium", children: ["\uD83D\uDCC4 ", selectedDoc.name] }),
                                    _jsx(Button, { size: "sm", variant: "ghost", onClick: () => setSelectedDoc(null), children: "\u2716" })
                                ] }),
                            _jsx("div", { className: `text-sm whitespace-pre-wrap px-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`, children: selectedDoc.content })
                        ] }))
                ] })
        ] }));
}
