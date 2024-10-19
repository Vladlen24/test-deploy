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

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [resultImage, setResultImage] = useState(null);

  // Different options for each question
  const questions = [
    {
      id: 'question1',
      text: 'Какова форма Вашего лица?',
      options: ['Овальная', 'Круглая', 'Квадратная', 'Продолговатая', 'Сердцевидная'],
    },
    {
      id: 'question2',
      text: 'Какой у вас естественный изгиб бровей?',
      options: ['Полумесяц', 'Почти прямые', 'С изломом', 'Вздернутые'],
    },
    {
      id: 'question3',
      text: 'Какова густота ваших бровей?',
      options: ['Очень густые', 'Средние', 'Тонкие'],
    },
    {
      id: 'question4',
      text: 'Какой длины вы хотите, чтобы были ваши брови?',
      options: ['Короткие', 'Средние', 'Длинные'],
    },
    {
      id: 'question5',
      text: 'Какие недостатки лица вы хотите скрыть с помощью формы бровей?',
      options: ['Широкий лоб', 'Неровные черты', 'Нет недостатков'],
    },
    {
      id: 'question6',
      text: 'Какие у вас черты лица?',
      options: ['Мягкие и округлые', 'Угловатые и резкие', 'Широкие скулы', 'Узкий подбородок и широкий лоб', 'Высокие скулы и узкая нижняя часть лица'],
    },
{
      id: 'question7',
      text: 'Как вы хотите, чтобы выглядели ваши брови?',
      options: ['Естественно и аккуратно', 'Четко и выразительно', 'Мягко и нежно', 'Ярко и драматично', 'Стильно и современно'],
    },
// {
//       id: 'question8',
//       text: 'Какой цвет волос у вас сейчас?',
//       options: ['Блонд', 'Рыжий', 'Каштановый(шатенка)', 'Темный(брюнетка)'],
//     },
// {
//       id: 'question9',
//       text: 'Какой у Вас тон кожи?',
//       options: ['Светлый', 'Средний', 'Темный'],
//     },
  ];

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

  // Handle navigation
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="container">
      <h1>Answer the following questions</h1>
      <form onSubmit={handleSubmit}>
        {/* Display only the current question */}
        <div className="question-block">
          <label>{questions[currentQuestionIndex].text}</label>
          <div>
            {questions[currentQuestionIndex].options.map(option => (
              <div key={option}>
                <input
                  type="radio"
                  name={questions[currentQuestionIndex].id}
                  value={option}
                  checked={answers[questions[currentQuestionIndex].id] === option}
                  onChange={handleChange}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="navigation-buttons">
          <button
            type="button"
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          {currentQuestionIndex < questions.length - 1 ? (
            <button type="button" onClick={goToNextQuestion}>
              Next
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
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
