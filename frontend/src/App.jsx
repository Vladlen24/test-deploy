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
    question6: '',
    question7: '',
    question8: '',
    question9: '',
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [resultData, setResultData] = useState(null);

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
    {
      id: 'question8',
      text: 'Какой у Вас тон кожи?',
      options: ['Светлый', 'Средний', 'Темный'],
    },
    {
      id: 'question9',
      text: 'Какой цвет волос у вас сейчас?',
      options: ['Блонд', 'Рыжий', 'Каштановый(шатенка)', 'Темный(брюнетка)'],
    },
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

    // Check if all questions have been answered
    const allQuestionsAnswered = questions.every(
      (question) => answers[question.id] !== ''
    );

    if (!allQuestionsAnswered) {
      alert('Пожалуйста, ответьте на все вопросы перед отправкой.');
      return;
    }

    // Send answers to the backend
    axios.post('http://46.148.229.184/api/items', answers)
      .then(response => {
        setResultData(response.data);
      })
      .catch(error => {
        console.error('Ошибка при расчете результата:', error);
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
      <h1>Ответьте на следующие вопросы</h1>
      <form onSubmit={handleSubmit}>
        {/* Display only the current question */}
        <div className="question-block">
          <label>{questions[currentQuestionIndex].text}</label>
          <div className="options-container">
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


        {/* Display the image when on the first question */}
        {currentQuestionIndex === 0 && (
          <div className="image-container">
            <img src="/img/question1.jpg" alt="Question1" className="question-image" />
          </div>
        )}
        {currentQuestionIndex === 1 && (
          <div className="image-container">
            <img src="../img/question2.jpg" alt="Question1" className="question-image" />
          </div>
        )}
        {currentQuestionIndex === 2 && (
          <div className="image-container">
            <img src="../img/question3.jpg" alt="Question1" className="question-image" />
          </div>
        )}
        {currentQuestionIndex === 3 && (
          <div className="image-container">
            <img src="../img/question4.jpg" alt="Question1" className="question-image" />
          </div>
        )}
        {currentQuestionIndex === 4 && (
          <div className="image-container">
            <img src="../img/question5.jpg" alt="Question1" className="question-image" />
          </div>
        )}
        {currentQuestionIndex === 5 && (
          <div className="image-container">
            <img src="../img/question6.jpg" alt="Question1" className="question-image" />
          </div>
        )}
        {currentQuestionIndex === 6 && (
          <div className="image-container">
            <img src="../img/question7.jpg" alt="Question1" className="question-image" />
          </div>
        )}
        {currentQuestionIndex === 7 && (
          <div className="image-container">
            <img src="../img/question8.jpg" alt="Question1" className="question-image" />
          </div>
        )}

        {/* Navigation buttons */}
        <div className="navigation-buttons">
          <button
            type="button"
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            ⬅️
          </button>
          {currentQuestionIndex < questions.length - 1 ? (
            <button type="button" onClick={goToNextQuestion}>
              ➡️
            </button>
          ) : (
            <div className="submit-button-container">
              <button type="submit" className="submit-button">Отправить</button>
            </div>
          )}
        </div>
      </form>

      {/* Display the result image if available */}
      {resultData && (
        <div className="result">
          <h2>Ваш результат:</h2>
          <p>{resultData.text}</p>
          <img src={`data:image/jpg;base64,${resultData.image_base64}`} alt="Result" />
        </div>
      )}
    </div>
  );
}

export default App;
