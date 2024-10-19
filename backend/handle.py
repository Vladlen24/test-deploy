from models import Answers


# Logic for calculating the score based on the answers
def calculate_score(answers: Answers) -> str:
    # Initialize the scores for each result
    scores = {
        'result1': 0,  # Прямые
        'result2': 0,  # Арочные
        'result3': 0,  # Мягко изогнутые
        'result4': 0,  # Высокие и драматичные
        'result5': 0   # Мягко закругленные
    }

    # Question 1: Какова форма вашего лица?
    if answers.question1 == 'Овальная':
        scores['result1'] += 3
        scores['result2'] += 2
        scores['result5'] += 1
    elif answers.question1 == 'Круглая':
        scores['result5'] += 3
        scores['result1'] += 1
        scores['result2'] += 2
    elif answers.question1 == 'Квадратная':
        scores['result2'] += 3
        scores['result1'] += 2
        scores['result4'] += 1
    elif answers.question1 == 'Продолговатая':
        scores['result4'] += 3
        scores['result1'] += 1
        scores['result3'] += 2
    elif answers.question1 == 'Сердцевидная':
        scores['result3'] += 3
        scores['result5'] += 2
        scores['result2'] += 1

    # Question 2: Какой у вас естественный изгиб бровей?
    if answers.question2 == 'Полумесяц':
        scores['result2'] += 3
        scores['result5'] += 2
        scores['result1'] += 1
    elif answers.question2 == 'Почти прямые':
        scores['result1'] += 3
        scores['result3'] += 2
        scores['result2'] += 1
    elif answers.question2 == 'С изломом':
        scores['result5'] += 3
        scores['result1'] += 2
        scores['result2'] += 1
    elif answers.question2 == 'Вздернутые':
        scores['result2'] += 3
        scores['result5'] += 2
        scores['result1'] += 1

    # Question 3: Какова густота ваших бровей?
    if answers.question3 == 'Очень густые':
        scores['result1'] += 3
        scores['result5'] += 2
        scores['result2'] += 1
    elif answers.question3 == 'Средние':
        scores['result5'] += 3
        scores['result1'] += 2
        scores['result2'] += 1
    elif answers.question3 == 'Тонкие':
        scores['result5'] += 3
        scores['result1'] += 2
        scores['result2'] += 1

    # Question 4: Какой длины вы хотите, чтобы были ваши брови?
    if answers.question4 == 'Короткие':
        scores['result1'] += 3
        scores['result2'] += 2
        scores['result3'] += 1
    elif answers.question4 == 'Средние':
        scores['result3'] += 3
        scores['result1'] += 2
        scores['result2'] += 1
    elif answers.question4 == 'Длинные':
        scores['result2'] += 3
        scores['result3'] += 2
        scores['result1'] += 1

    # Question 5: Какие недостатки лица вы хотите скрыть с помощью формы бровей?
    if answers.question5 == 'Широкий лоб':
        scores['result3'] += 3
        scores['result2'] += 2
        scores['result1'] += 1
    elif answers.question5 == 'Неровные черты':
        scores['result5'] += 3
        scores['result2'] += 2
        scores['result1'] += 1
    elif answers.question5 == 'Нет недостатков':
        scores['result1'] += 3
        scores['result5'] += 2
        scores['result2'] += 1

    # Question 6: Какие у вас черты лица?
    if answers.question6 == 'Мягкие и округлые':
        scores['result5'] += 3
        scores['result1'] += 1
        scores['result3'] += 2
    elif answers.question6 == 'Угловатые и резкие':
        scores['result2'] += 3
        scores['result4'] += 2
        scores['result1'] += 1
    elif answers.question6 == 'Широкие скулы':
        scores['result1'] += 2
        scores['result5'] += 1
        scores['result3'] += 3
    elif answers.question6 == 'Узкий подбородок и широкий лоб':
        scores['result4'] += 3
        scores['result3'] += 1
        scores['result2'] += 2
    elif answers.question6 == 'Высокие скулы и узкая нижняя часть лица':
        scores['result2'] += 2
        scores['result5'] += 3
        scores['result1'] += 1

    # Question 7: Как вы хотите, чтобы выглядели ваши брови?
    if answers.question7 == 'Естественно и аккуратно':
        scores['result1'] += 3
        scores['result5'] += 2
        scores['result3'] += 1
    elif answers.question7 == 'Четко и выразительно':
        scores['result4'] += 3
        scores['result2'] += 2
        scores['result1'] += 1
    elif answers.question7 == 'Мягко и нежно':
        scores['result5'] += 3
        scores['result3'] += 2
        scores['result1'] += 1
    elif answers.question7 == 'Ярко и драматично':
        scores['result2'] += 3
        scores['result4'] += 2
        scores['result5'] += 1
    elif answers.question7 == 'Стильно и современно':
        scores['result3'] += 3
        scores['result1'] += 2
        scores['result4'] += 1

    # Find the result with the highest score
    max_result = max(scores, key=scores.get)
    return max_result