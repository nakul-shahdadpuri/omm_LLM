import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ResumeQAApp() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/documents")
      .then(res => res.json())
      .then(data => setDocuments(data.documents || []))
      .catch(err => console.error("Failed to fetch documents", err));
  }, []);

  const fetchDocumentContent = (doc) => {
    fetch(`http://localhost:5000/api/documents/${doc.name}`)
      .then(res => res.json())
      .then(data => setSelectedDoc({ ...doc, content: data.content }))
      .catch(err => console.error("Failed to fetch document content", err));
  };

  const askQuestion = async () => {
    const pendingAnswer = { question, text: "Loading...", sourceSnippet: "" };
    setAnswers(prev => [...prev, pendingAnswer]);
    try {
      const res = await fetch("http://localhost:5000/api/ask", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswers(prev => [...prev.slice(0, -1), { ...data, question }]);
    } catch (error) {
      setAnswers(prev => [...prev.slice(0, -1), { question, text: "Error fetching response.", sourceSnippet: "" }]);
    }
  };

  const handleAddDocument = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".txt,.pdf,.docx,.md";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData
      });
      const result = await res.json();
      setDocuments(prev => [...prev, { name: result.file_name, file_id: result.file_id }]);
    };
    input.click();
  };

  const formatAnswer = (text, source) => {
    const parts = text.split(/(\d+\.\s+\*\*[^*]+\*\*|\*\*[^*]+\*\*|\[.*?\]\((.*?)\))/g);
    return parts.map((part, idx) => {
      if (/^\d+\.\s+\*\*[^*]+\*\*$/.test(part)) {
        return <h4 key={idx} className="text-md font-semibold mt-4">{part.replace(/\*\*/g, '')}</h4>;
      } else if (/^\*\*[^*]+\*\*$/.test(part)) {
        return <strong key={idx} className="block font-medium mt-2">{part.replace(/\*\*/g, '')}</strong>;
      } else if (/\[.*?\]\((.*?)\)/.test(part)) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        return <a key={idx} href={match[2]} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">{match[1]}</a>;
      } else {
        return <p key={idx} className="mb-2">{part}</p>;
      }
    }).concat(
      source ? <p key="source" className="text-xs text-gray-400 border-t pt-2">📄 Source: <em>{source}</em></p> : null
    );
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <header className={`p-4 border-b shadow text-xl sticky top-0 z-10 flex items-center justify-between ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'}`}>
        <h1 className="text-2xl font-semibold">Omm IT Solutions</h1>
        <Button size="sm" variant={darkMode ? 'secondary' : 'outline'} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </Button>
      </header>

      <div className="flex flex-1">
        <div className={`w-1/4 min-w-[240px] p-4 border-r overflow-hidden flex flex-col ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-gray-100'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">📁 Documents</h2>
            <Button size="sm" onClick={handleAddDocument} className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : ''}`}>＋</Button>
          </div>
          <div className="overflow-y-auto flex-grow pr-2">
            <ul className="space-y-2">
              {documents.map((doc, index) => (
                <li
                  key={index}
                  className={`p-2 rounded cursor-pointer ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => fetchDocumentContent(doc)}
                >
                  {doc.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1 p-6 flex flex-col">
          <div className={`flex-grow border rounded-xl p-5 mb-4 overflow-auto leading-relaxed ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'}`}>
            <h3 className="text-xl font-semibold mb-3">Ask about any document</h3>
            {answers.length > 0 ? (
              answers.map((ans, i) => (
                <div key={i} className="space-y-2 mb-6">
                  <p className="font-bold">Q{i + 1}: {ans.question}</p>
                  <p className="font-bold">Answer {i + 1}:</p>
                  <div>{formatAnswer(ans.text, ans.sourceSnippet)}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No question asked yet.</p>
            )}
          </div>
          <div>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What do you want to know?"
              rows={2}
              className={`mb-2 ${darkMode ? 'bg-gray-800 text-white' : ''}`}
            />
            <Button
              onClick={askQuestion}
              className={`w-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : ''}`}
            >
              Ask
            </Button>
          </div>
        </div>

        {selectedDoc && (
          <div className={`w-1/3 p-4 border-l overflow-auto ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-medium">📄 {selectedDoc.name}</h2>
              <Button size="sm" variant="ghost" onClick={() => setSelectedDoc(null)}>✖</Button>
            </div>
            <div className={`text-sm whitespace-pre-wrap px-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {selectedDoc.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
