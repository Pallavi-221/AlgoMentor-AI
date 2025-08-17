import React, { useState } from 'react';
import './App.css';
import questions from './questions';
import Editor from '@monaco-editor/react';
import { ClipboardCopy, Check } from 'lucide-react';
import Chatbot from './components/Chatbot';
import MockInterview from "./components/MockInterview";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [userCode, setUserCode] = useState({});
  const [output, setOutput] = useState({});

  const runCode = (id) => {
    try {
      const result = eval(userCode[id]);
      setOutput((prev) => ({ ...prev, [id]: String(result) }));
    } catch (err) {
      setOutput((prev) => ({ ...prev, [id]: String(err) }));
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const matchTopic = selectedTopic ? q.topic === selectedTopic : true;
    const matchSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTopic && matchSearch;
  });

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  return (
    <Router>
      <Routes>
        {/* Home / Problem List */}
        <Route
          path="/"
          element={
            <div className="app-container">
              <header className="header">
                <h1>AlgoMentor AI</h1>
                <p>Your personalized DSA & Interview mentor powered by AI.</p>
              </header>

              <main>
                {/* Search Bar */}
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Start Mock Interview Button */}
                <div style={{ marginTop: "10px" }}>
                  <Link to="/mock-interview">
                    <button style={{
                      padding: "10px 15px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}>
                      🎤 Start Mock Interview
                    </button>
                  </Link>
                </div>

                {/* Filter Dropdown */}
                <div className="filters" style={{ marginTop: "20px" }}>
                  <select onChange={(e) => setSelectedTopic(e.target.value)}>
                    <option value="">Filter by Topic</option>
                    <option value="Arrays">Arrays</option>
                    <option value="Strings">Strings</option>
                    <option value="Recursion">Recursion</option>
                    <option value="Hashing">Hashing</option>
                    <option value="Sorting">Sorting</option>
                    <option value="Binary Search">Binary Search</option>
                    <option value="Two Pointers">Two Pointers</option>
                    <option value="Greedy">Greedy</option>
                    <option value="Backtracking">Backtracking</option>
                    <option value="Sliding Window">Sliding Window</option>
                    <option value="Graphs">Graphs</option>
                    <option value="Trees">Trees</option>
                    <option value="Tries">Tries</option>
                    <option value="Dynamic Programming">Dynamic Programming</option>
                    <option value="Bit Manipulation">Bit Manipulation</option>
                    <option value="Stacks & Queues">Stacks & Queues</option>
                    <option value="Linked List">Linked List</option>
                    <option value="Maths">Maths</option>
                  </select>
                </div>

                {/* Questions Display */}
                <div className="problem-list">
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((q) => (
                      <div key={q.id} className="problem-card">
                        <h3>{q.title}</h3>
                        <p><strong>Topic:</strong> {q.topic}</p>
                        <p><strong>Difficulty:</strong> {q.difficulty}</p>
                        <p>{q.description}</p>

                        <div className="ai-explanation">
                          <strong>AI Explanation:</strong>
                          <p>{q.aiExplanation}</p>
                        </div>

                        <div className="code-editor">
                          {/* Copy Button */}
                          <div className="copy-button" onClick={() => handleCopy(q.codeSnippet, q.id)}>
                            {copiedId === q.id ? <Check size={18} /> : <ClipboardCopy size={18} />}
                          </div>

                          {/* ReadOnly Answer View */}
                          <h4 style={{ marginTop: '10px' }}>✅ Solution:</h4>
                          <Editor
                            height="160px"
                            language="javascript"
                            value={q.codeSnippet}
                            theme="vs-light"
                            options={{
                              readOnly: true,
                              fontSize: 15,
                              minimap: { enabled: false },
                            }}
                          />

                          {/* Editable Code Editor */}
                          <h4 style={{ marginTop: '15px' }}>✏️ Try it Yourself:</h4>
                          <Editor
                            height="200px"
                            language="javascript"
                            value={userCode[q.id] || "// Write your code here"}
                            onChange={(newCode) =>
                              setUserCode((prev) => ({ ...prev, [q.id]: newCode }))
                            }
                            theme="vs-light"
                            options={{
                              fontSize: 16,
                              minimap: { enabled: false },
                            }}
                          />

                          <button onClick={() => runCode(q.id)}>Run Code</button>

                          {/* Show Output */}
                          {output[q.id] && (
                            <div style={{
                              marginTop: '10px',
                              backgroundColor: '#f0f0f0',
                              padding: '10px',
                              borderRadius: '6px'
                            }}>
                              <strong>Output:</strong>
                              <pre style={{ fontSize: '15px' }}>{output[q.id]}</pre>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No questions found.</p>
                  )}
                </div>
              </main>

              {/* Floating Chatbot */}
              <Chatbot />
            </div>
          }
        />

        {/* Mock Interview Page */}
        <Route path="/mock-interview" element={<MockInterview />} />
      </Routes>
    </Router>
  );
}

export default App;
