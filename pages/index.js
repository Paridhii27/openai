import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import generatePrompt from "./api/generate.js"

export default function MarvSarcasticRobot() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResponse(data.result.trim());
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(event);
    setInput("");
  }
  
  return (
    <div>
      <h2>Marv, the sarcastic robot</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your message:
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        </label>
        <button type="submit">Send</button>
      </form>
      <p>{response}</p>
    </div>
  );
}