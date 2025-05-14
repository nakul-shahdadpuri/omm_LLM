import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ResumeQAApp() {
  // State for user input question and AI answer
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);

  // State to manage list of documents and selected document
  const [documents, setDocuments] = useState([
    "Resume_Nakul.pdf",
    "Company_Roles.md",
    "Skills_Matrix.xlsx",
    "Internal_Job_Descriptions.docx",
    "Performance_Reviews.json",
  ]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Theme mode toggle
  const [darkMode, setDarkMode] = useState(false);

  // 🔗 MAIN PLACE TO CONNECT TO YOUR BACKEND API
  const askQuestion = async () => {
    // Display temporary loading message
    setAnswer({ text: "Loading...", sourceSnippet: "" });

    try {
      // 🔽 Replace this endpoint with your actual backend API URL
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        // You can also pass selectedDoc here if needed by the backend
        body: JSON.stringify({ question }),
      });

      // Await API response
      const data = await res.json();

      // Set response in UI
      setAnswer(data);
    } catch (error) {
      // Handle and display error if the API call fails
      console.error("API error:", error);
      setAnswer({ text: "An error occurred. Please try again.", sourceSnippet: "" });
    }
  };

  // Prompt user to add a new document to the list
  const handleAddDocument = () => {
    const newDoc = prompt("Enter document name:");
    if (newDoc) setDocuments(prev => [...prev, newDoc]);
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
            <Button
              size="sm"
              onClick={handleAddDocument}
              className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : ''}`}
            >
              ＋
            </Button>
          </div>
          <div className="overflow-y-auto flex-grow pr-2">
            <ul className="space-y-2">
              {documents.map((doc, index) => (
                <li
                  key={index}
                  className={`p-2 rounded cursor-pointer ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => setSelectedDoc(doc)}
                >
                  {doc}
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
              <h2 className="font-medium">📄 {selectedDoc}</h2>
              <Button size="sm" variant="ghost" onClick={() => setSelectedDoc(null)}>✖</Button>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Preview of the document content would go here (e.g. fetched summary, snippet, or inline text viewer).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
