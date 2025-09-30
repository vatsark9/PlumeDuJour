// Check if a timestamp belongs to today
export const isToday = (timestamp) => {
  const today = new Date();
  const date = new Date(timestamp);

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Format timestamp to readable time (HH:MM AM/PM)
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${displayHours}:${displayMinutes} ${ampm}`;
};

// Format timestamp to full date and time
export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const timeStr = formatTime(timestamp);

  return `${dateStr} at ${timeStr}`;
};

// Get today's date string for display
export const getTodayString = () => {
  const today = new Date();
  return today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

// Count words in a text string
export const countWords = (text) => {
  if (!text || text.trim().length === 0) return 0;
  return text.trim().split(/\s+/).length;
};