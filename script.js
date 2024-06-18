document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const questionsContainer = document.getElementById('questions-container');
    const resultsContainer = document.getElementById('results');
    const scoreContainer = document.getElementById('score');
    const detailedResultsContainer = document.getElementById('detailed-results');
    
    let questionsFile = 'questions.json';
    if (window.location.pathname.includes('trump-legal-issues.html')) {
        questionsFile = 'questions-trump-legal-issues.json';
    } else if (window.location.pathname.includes('hunter-biden-legal-issues.html')) {
        questionsFile = 'questions-hunter-biden-legal-issues.json';
    } else if (window.location.pathname.includes('june-18-2024.html')) {
        questionsFile = 'questions-june-18-2024.json';
    }

    fetch(questionsFile)
        .then(response => response.json())
        .then(questions => {
            questions.forEach((question, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question';
                
                const questionTitle = document.createElement('h2');
                questionTitle.textContent = question.question;
                questionDiv.appendChild(questionTitle);
                
                const optionsList = document.createElement('ul');
                optionsList.className = 'options';
                
                question.options.forEach(option => {
                    const optionItem = document.createElement('li');
                    
                    const optionLabel = document.createElement('label');
                    optionLabel.textContent = option;
                    
                    const optionInput = document.createElement('input');
                    optionInput.type = 'radio';
                    optionInput.name = `question-${index}`;
                    optionInput.value = option;
                    
                    optionLabel.prepend(optionInput);
                    optionItem.appendChild(optionLabel);
                    optionsList.appendChild(optionItem);
                });
                
                questionDiv.appendChild(optionsList);
                questionsContainer.appendChild(questionDiv);
            });

            quizForm.addEventListener('submit', (event) => {
                event.preventDefault();
                
                let score = 0;
                const userAnswers = new FormData(quizForm);
                detailedResultsContainer.innerHTML = '';
                
                questions.forEach((question, index) => {
                    const userAnswer = userAnswers.get(`question-${index}`);
                    if (userAnswer === question.answer) {
                        score += 1;
                    }
                    
                    const resultDiv = document.createElement('div');
                    resultDiv.innerHTML = `
                        <p>${question.question}</p>
                        <p>Your answer: ${userAnswer || 'No answer selected'}</p>
                        <p>Correct answer: ${question.answer}</p>
                    `;
                    detailedResultsContainer.appendChild(resultDiv);
                });
                
                scoreContainer.textContent = `Your score: ${score} out of ${questions.length}`;
                resultsContainer.style.display = 'block';
            });
        })
        .catch(error => console.error('Error fetching questions:', error));
});
