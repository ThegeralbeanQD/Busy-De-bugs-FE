const findTopic = sessionStorage.getItem("topic");

const fetchQuiz = async (topic) => {
  const quizes = (
    await fetch(`https://brain-debug.onrender.com/quiz/${topic}`)
  ).json();
  return quizes;
};

const displayTopicQuizes = async (topic) => {

    let score = {
      music: 0,
      history: 0,
      literature: 0,
      geography: 0
    }

  if (sessionStorage.getItem("score")) {
    let userScore = JSON.parse((sessionStorage.getItem("score")))
    console.log(typeof userScore)
    score = {...score, ...userScore}
  }

  const topicQuizes = await fetchQuiz(topic)
  const quizDiv = document.querySelector('#quiz')

  let questionIndex = -1;

  const nextQuestion = () => {
    // remove previous question
    quizDiv.innerHTML = "";

    // recreate elements
    const h3 = document.createElement("h3");
    const ol = document.createElement("ol");
    ol.setAttribute("id", "list");

    // get quiz div
    const quizList = document.querySelector("#quiz");

    // generate topic text and inject h1
    const h1 = document.createElement("h1");
    h1.append(topic);
    h1.setAttribute("id", "topic");
    quizList.appendChild(h1);

    ++questionIndex;

    // question
    let question = topicQuizes[questionIndex].question;
    h3.append(question);
    h3.setAttribute("id", "question");
    quizList.appendChild(h3);

    // answers
    let answers = topicQuizes[questionIndex].answers;

    answers.forEach((ans, index) => {
      const li = document.createElement('li')
      li.append(ans.answer)

      li.setAttribute('class', 'answers')
      ol.appendChild(li)
      quizList.appendChild(ol)
      let clicked = false
      li.addEventListener('click', function() {
        if (!clicked) {
          let answer = ans.is_correct
          if (answer === true) {

            // boostrap correct question alert button
            // remove wrong answer alert if it exists
            const removeWrongDiv = document.querySelector(".wrong")
              if (removeWrongDiv) {
                removeWrongDiv.remove()
              }
            let alertDiv = document.createElement("div")
            alertDiv.setAttribute("class","position relative")
            let correctDiv = document.createElement("div")
            correctDiv.setAttribute("class", "alert alert-success alert-dismissible fade show correct w-50 position-absolute top-50 start-50 translate-middle text-center")
            correctDiv.setAttribute("role", "alert")
            correctDiv.innerText = "Congratz! You got it right! Click Next :)"

            let correctButton = document.createElement("button")
            correctButton.setAttribute("type", "button")
            correctButton.setAttribute("class", "btn-close")
            correctButton.setAttribute("data-bs-dismiss", "alert")
            correctButton.setAttribute("aria-label", "Close")

            alertDiv.appendChild(correctDiv)
            correctDiv.appendChild(correctButton)
            document.body.appendChild(alertDiv)

            if (topic.toLowerCase() !== 'random') {
              score[topic.toLowerCase()] += 1
              sessionStorage.setItem("score", JSON.stringify(score))
              clicked = true
            }
            if (topic.toLowerCase() === 'random') {
              score[topicQuizes[questionIndex].topic.toLowerCase()] += 1
              sessionStorage.setItem("score", JSON.stringify(score))
              clicked = true
            }
          } else {
              // wrong question alert
              // remove another alert if it exits
              const removeWrongDiv = document.querySelector(".wrong")
              if (removeWrongDiv) {
                removeWrongDiv.remove()
              }
              let alertDiv = document.createElement("div")
              alertDiv.setAttribute("class","position relative")
              let wrongDiv = document.createElement("div")
              wrongDiv.setAttribute("class", "alert alert-danger alert-dismissible fade show wrong w-50 position-absolute top-50 start-50 translate-middle text-center")
              wrongDiv.setAttribute("role", "alert")
              wrongDiv.innerText = "Sorry, wrong answer!"

              let wrongButton = document.createElement("button")
              wrongButton.setAttribute("type", "button")
              wrongButton.setAttribute("class", "btn-close")
              wrongButton.setAttribute("data-bs-dismiss", "alert")
              wrongButton.setAttribute("aria-label", "Close")

              alertDiv.appendChild(wrongDiv)
              wrongDiv.appendChild(wrongButton)
              document.body.appendChild(alertDiv)
              clicked = true
          }
        }
      })
    })
        // create next button till last question - 1
        if (questionIndex < topicQuizes.length - 1) {
          let nextButton = document.createElement("input");
          nextButton.type = "button";
          nextButton.value = "Next";
          nextButton.setAttribute("id", "next-button");
          nextButton.addEventListener("click", nextQuestion);
          nextButton.addEventListener("click", removeAlert);
          quizDiv.appendChild(nextButton);
        }

        // create submit button for the last question
        if (questionIndex === topicQuizes.length - 1) {
          let submitButton = document.createElement("input");
          submitButton.type = "button";
          submitButton.value = "Submit";
          submitButton.setAttribute("id", "submit-button");
          submitButton.addEventListener("click", submitAnswer);
          quizDiv.appendChild(submitButton);
        }
  }

  nextQuestion();

  const submitAnswer = () => {
    console.log('questions over')
    window.location.href = "../score.html";
  }
}

  const removeAlert = () => {
    const removeDiv = document.querySelector(".correct")
    removeDiv.remove()
  }
displayTopicQuizes(findTopic);
