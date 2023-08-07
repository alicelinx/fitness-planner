import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

const CreateWorkout = () => {
  const [inputText, setInputText] = useState('');
  const [generatedResponse, setGeneratedResponse] = useState('');
  
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await chapGPT(inputText);
      setGeneratedResponse(response); // Set the generated response in state
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <label>insert chatgpt search</label>
      <input
        placeholder="type your search"
        value={inputText}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      
      <div>
        <h2>Generated Response:</h2>
        <p>{generatedResponse}</p>
      </div>
    </div>
  );
};

export default CreateWorkout;

const configuration = new Configuration({
  apiKey: "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"
});

const openai = new OpenAIApi(configuration);

const chapGPT = async (prompt) => {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  return response['data']['choices'][0]['message']['content'];
};
