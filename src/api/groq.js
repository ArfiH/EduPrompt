import Groq from "groq-sdk";

const apiKeys = [
  import.meta.env.VITE_GROQ_API_KEY,
  import.meta.env.VITE_GROQ_API_KEY2,
];

if (!apiKeys) {
  throw new Error("Groq API key is not defined");
}

let currKey = 0;
const groq = new Groq({
  apiKey: apiKeys[currKey++ % apiKeys.length],
  dangerouslyAllowBrowser: true,
});

/**
 * Queries the Groq API to generate a quiz based on a video title and description.
 *
 * @param {string} videoTitle The title of the video.
 * @param {string} videoDescription The description of the video.
 */
export async function getQuizByTitle(videoTitle, videoDescription) {
  const chatCompletion = await getGroqChatCompletion(
    videoTitle,
    videoDescription
  );
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content);
  return chatCompletion.choices[0]?.message?.content;
}

export async function getQuizBySummary(videoTitle, videoDescription, caption) {
  const chatCompletion = await getGroqChatCompletion(
    videoTitle,
    videoDescription,
    caption
  );
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content);
  return chatCompletion.choices[0]?.message?.content;
}

/**
 * Gets the Groq chat completion for a given video title and description.
 *
 * @param {string} videoTitle The title of the video.
 * @param {string} videoDescription The description of the video.
 * @returns {Promise} A promise resolving to the chat completion response.
 */
export async function getGroqChatCompletion(
  videoTitle,
  videoDescription,
  caption
) {
  try {
    const prompt = `
      You are an AI that generates a quiz based on video content. Create 5 Hard level multiple-choice questions about the following video:
      Title: ${videoTitle}
      Description: ${videoDescription}
      ${caption ? "Details: " + caption : ""}

      Format the response as:
      [
        {
        "question": "Question 1",
		"questionType": "text",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "answer": "Correct Option"
        },
        ...
      ]
    `;
    console.info(prompt);
    return await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      // model: "llama-guard-3-8b",
    });
  } catch (error) {
    console.error("Error occurred during Groq chat completion:", error);
    throw error;
  }
}
