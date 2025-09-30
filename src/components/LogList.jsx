import { formatTime, countWords } from '../utils/dateHelpers';
import { Clock, FileText } from 'lucide-react';

const LogList = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p>No logs to display</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div
          key={log.id}
          className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 font-medium">
              {formatTime(log.timestamp)}
            </span>
            <span className="text-xs text-gray-400 ml-auto">
              {countWords(log.text)} words
            </span>
          </div>
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {log.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LogList;