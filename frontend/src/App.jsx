import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // State for storing answers
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
  });
  const [resultImage, setResultImage] = useState(null);

  // Handle answer change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send answers to the backend
    axios.post('http://46.148.229.184/api/items', answers)
      .then(response => {
        // Get the result image URL from the backend response
        setResultImage(response.data.imageUrl);
      })
      .catch(error => {
        console.error('Error calculating result:', error);
      });
  };

  return (
    <div className="container">
      <h1>Answer the following questions</h1>
      <form onSubmit={handleSubmit}>
        {['question1', 'question2', 'question3', 'question4', 'question5'].map((question, index) => (
          <div key={question} className="question-block">
            <label>Question {index + 1}:</label>
            <div>
              <input
                type="radio"
                name={question}
                value="option1"
                checked={answers[question] === 'option1'}
                onChange={handleChange}
              />
              <label>Option 1</label>
            </div>
            <div>
              <input
                type="radio"
                name={question}
                value="option2"
                checked={answers[question] === 'option2'}
                onChange={handleChange}
              />
              <label>Option 2</label>
            </div>
            <div>
              <input
                type="radio"
                name={question}
                value="option3"
                checked={answers[question] === 'option3'}
                onChange={handleChange}
              />
              <label>Option 3</label>
            </div>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      {/* Display the result image if available */}
      {resultImage && (
        <div className="result">
          <h2>Your Result:</h2>
          <img src={resultImage} alt="Result" />
        </div>
      )}
    </div>
  );
}

export default App;