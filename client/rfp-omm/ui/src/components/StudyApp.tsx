import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ResumeQAApp() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch document list on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/documents")
      .then(res => res.json())
      .then(data => setDocuments(data.documents || []))
      .catch(err => console.error("Failed to fetch documents", err));
  }, []);

  // Fetch content of selected document
  const fetchDocumentContent = (doc) => {
    fetch(`http://localhost:5000/api/documents/${doc.name}`)
      .then(res => res.json())
      .then(data => setSelectedDoc({ ...doc, content: data.content }))
      .catch(err => console.error("Failed to fetch document content", err));
  };

  const askQuestion = async () => {
    setAnswer({ text: "Loading...", sourceSnippet: "" });
    try {
      const res = await fetch("http://localhost:5000/api/ask", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data);
    } catch (error) {
      setAnswer({ text: "Error fetching response.", sourceSnippet: "" });
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

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <header className={`p-4 border-b shadow text-xl font-bold sticky top-0 z-10 flex justify-between items-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <span>Omm IT Solutions</span>
        <Button size="sm" variant={darkMode ? 'secondary' : 'outline'} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </Button>
      </header>
      <div className="flex flex-1">
        {/* Left: Document List */}
        <div className={`w-1/4 p-4 border-r overflow-hidden flex flex-col ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">📁 Documents</h2>
            <Button size="sm" onClick={handleAddDocument} className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : ''}`}>
              ＋
            </Button>
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

        {/* Center: Chat Interface */}
        <div className="flex-1 p-6 flex flex-col">
          <div className={`flex-grow border rounded-xl p-4 mb-4 overflow-auto ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <h3 className="text-lg font-semibold mb-2">Ask about any document</h3>
            {answer ? (
              <div>
                <p><strong>Answer:</strong> {answer.text}</p>
                {answer.sourceSnippet && (
                  <p className="text-xs text-gray-500 mt-1">📄 <em>{answer.sourceSnippet}</em></p>
                )}
              </div>
            ) : (
              <p className="text-gray-400">No question asked yet.</p>
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

        {/* Right: Document Preview */}
        {selectedDoc && (
          <div className={`w-1/3 p-4 border-l overflow-auto ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-medium">📄 {selectedDoc.name}</h2>
              <Button size="sm" variant="ghost" onClick={() => setSelectedDoc(null)}>✖</Button>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {selectedDoc.content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
