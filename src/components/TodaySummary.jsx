import { useState, useEffect } from 'react';
import { isToday, getTodayString, countWords } from '../utils/dateHelpers';
import { Calendar, Hash, Type, Sparkles, Loader2 } from 'lucide-react';
import LogList from './LogList';
import { generateLogsSummary } from '../services/openaiService';

const TodaySummary = ({ refresh }) => {
  const [todaysLogs, setTodaysLogs] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState('');

  // Load today's logs from localStorage
  const loadTodaysLogs = () => {
    const allLogs = JSON.parse(localStorage.getItem('dailyLogs') || '[]');

    // Filter logs for today only
    const logsForToday = allLogs.filter((log) => isToday(log.timestamp));

    // Sort by timestamp (chronological order)
    logsForToday.sort((a, b) => a.timestamp - b.timestamp);

    setTodaysLogs(logsForToday);
  };

  // Reload logs when refresh prop changes
  useEffect(() => {
    if (showSummary) {
      loadTodaysLogs();
    }
  }, [refresh, showSummary]);

  // Calculate total word count
  const totalWords = todaysLogs.reduce((sum, log) => {
    return sum + countWords(log.text);
  }, 0);

  const handleToggleSummary = () => {
    if (!showSummary) {
      loadTodaysLogs();
    }
    setShowSummary(!showSummary);
  };

  // Generate AI summary
  const handleGenerateAISummary = async () => {
    if (todaysLogs.length === 0) {
      setSummaryError('No logs to summarize');
      return;
    }

    setIsLoadingSummary(true);
    setSummaryError('');
    setAiSummary('');

    try {
      const summary = await generateLogsSummary(todaysLogs);
      setAiSummary(summary);
    } catch (error) {
      setSummaryError(error.message || 'Failed to generate AI summary');
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-800">Today's Summary</h2>
        </div>
        <button
          onClick={handleToggleSummary}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
        >
          {showSummary ? 'Hide Summary' : "Show Today's Summary"}
        </button>
      </div>

      {showSummary && (
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-gray-600 mb-3">{getTodayString()}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{todaysLogs.length}</p>
                  <p className="text-xs text-gray-600">Total Logs</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">{totalWords}</p>
                  <p className="text-xs text-gray-600">Total Words</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">AI Summary</h3>
              <button
                onClick={handleGenerateAISummary}
                disabled={isLoadingSummary || todaysLogs.length === 0}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingSummary ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate AI Summary
                  </>
                )}
              </button>
            </div>

            {aiSummary && (
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 mb-4">
                <p className="text-gray-800 leading-relaxed">{aiSummary}</p>
              </div>
            )}

            {summaryError && (
              <div className="bg-red-50 rounded-lg p-4 border border-red-200 mb-4">
                <p className="text-red-800 text-sm">{summaryError}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Log Entries</h3>
            <LogList logs={todaysLogs} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaySummary;