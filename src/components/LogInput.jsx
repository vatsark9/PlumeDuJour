import { useState } from 'react';
import { PenLine } from 'lucide-react';

const LogInput = ({ onLogSaved }) => {
  const [logText, setLogText] = useState('');

  // Save log entry to localStorage
  const handleSaveLog = () => {
    if (!logText.trim()) {
      alert('Please write something before saving!');
      return;
    }

    // Create log object with unique ID and timestamp
    const newLog = {
      id: Date.now().toString(),
      text: logText.trim(),
      timestamp: Date.now()
    };

    // Get existing logs from localStorage
    const existingLogs = JSON.parse(localStorage.getItem('dailyLogs') || '[]');

    // Add new log and save back to localStorage
    const updatedLogs = [...existingLogs, newLog];
    localStorage.setItem('dailyLogs', JSON.stringify(updatedLogs));

    // Clear textarea after saving
    setLogText('');

    // Notify parent component
    if (onLogSaved) {
      onLogSaved(newLog);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <PenLine className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Write a Log Entry</h2>
      </div>

      <textarea
        value={logText}
        onChange={(e) => setLogText(e.target.value)}
        placeholder="What's on your mind? Write your thoughts here..."
        className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          {logText.trim() ? `${logText.trim().split(/\s+/).length} words` : '0 words'}
        </span>
        <button
          onClick={handleSaveLog}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          Save Log
        </button>
      </div>
    </div>
  );
};

export default LogInput;