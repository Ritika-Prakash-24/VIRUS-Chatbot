import { faqData } from './faqData.js';

// Handle message sending
window.sendMessage = function () {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("You: " + message);
  input.value = "";

  const response = getBotResponse(message);
  setTimeout(() => addMessage("VIRUS: " + response), 500);
};

// Display message in the chat
function addMessage(text) {
  const messagesDiv = document.getElementById("messages");
  const newMessage = document.createElement("div");

  // Automatically convert URLs in the message into clickable links
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const linkedText = text.replace(urlRegex, url => {
    return `<a href="${url}" target="_blank" style="color: #4CAF50; text-decoration: underline;">${url}</a>`;
  });

  newMessage.innerHTML = linkedText;
  messagesDiv.appendChild(newMessage);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}


// Match user message with FAQ data
function getBotResponse(userMessage) {
  const msg = userMessage.toLowerCase();

  for (const item of faqData) {
    if (item.keywords.some(keyword => msg.includes(keyword))) {
      return item.response;
    }
  }

  return "Sorry, I didn't understand that. You can explore more here: https://sxcran.ac.in/";
}
