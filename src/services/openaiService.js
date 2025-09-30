// Service to interact with OpenAI API
export const generateLogsSummary = async (logs) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey || apiKey === 'your-openai-api-key-here') {
    throw new Error('OpenAI API key is not configured. Please add your API key to the .env file.');
  }

  // Combine all logs into formatted text
  const combinedLogs = logs
    .map((log, index) => `Entry ${index + 1}: ${log.text}`)
    .join('\n\n');

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that summarizes daily log entries. Provide a concise 100-word summary that captures the key themes, activities, and insights from the logs.',
          },
          {
            role: 'user',
            content: `Please provide a 100-word summary of these daily log entries:\n\n${combinedLogs}`,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate summary');
    }

    const data = await response.json();
    const summary = data.choices[0]?.message?.content || 'Unable to generate summary';

    return summary;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
};