import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import LogInput from './components/LogInput';
import TodaySummary from './components/TodaySummary';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Callback when a new log is saved
  const handleLogSaved = () => {
    // Increment refresh key to trigger TodaySummary to reload
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Daily Log Writer</h1>
          </div>
          <p className="text-gray-600">Capture your thoughts and track your daily progress</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Log Input Section */}
          <LogInput onLogSaved={handleLogSaved} />

          {/* Today's Summary Section */}
          <TodaySummary refresh={refreshKey} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>All logs are saved locally in your browser</p>
        </div>
      </div>
    </div>
  );
}

export default App;