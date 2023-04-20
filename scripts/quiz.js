const findTopic = localStorage.getItem("topic");

const fetchQuiz = async (topic) => {
  const quizes = (
    await fetch(`https://brain-debug.onrender.com/quiz/${topic}`)
  ).json();
  return quizes;
};

const displayTopicQuizes = async (topic) => {
  const topicQuizes = await fetchQuiz(topic);

  let questionIndex = -1;

  const nextQuestion = () => {
    // remove previous question
    document.body.innerHTML = "";

    // recreate elements
    const div = document.createElement("div");
    div.setAttribute("id", "quiz");
    document.body.appendChild(div);
    const h2 = document.createElement("h2");
    const ol = document.createElement("ol");

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
    h2.append(question);
    h2.setAttribute("id", "question");
    quizList.appendChild(h2);

    // create next button till last question - 1
    if (questionIndex < topicQuizes.length - 1) {
      let nextButton = document.createElement("input");
      nextButton.type = "button";
      nextButton.value = "Next";
      nextButton.addEventListener("click", nextQuestion);
      document.body.appendChild(nextButton);
    }

    // create submit button for the last question
    if (questionIndex === topicQuizes.length - 1) {
      let submitButton = document.createElement("input");
      submitButton.type = "button";
      submitButton.value = "Submit";
      submitButton.addEventListener("click", submitAnswer);
      document.body.appendChild(submitButton);
    }

    // answers
    let answers = topicQuizes[questionIndex].answers;

    answers.forEach((ans, index) => {
      const li = document.createElement("li");
      li.append(ans.answer);

      li.setAttribute("class", "answers");
      ol.appendChild(li);
      quizList.appendChild(ol);
      li.addEventListener("click", function () {
        let answer = ans.is_correct;
        if (answer === true) {
          alert("You got it!");
        } else {
          alert("Try again!");
        }
      });
    });
  };

  nextQuestion();

  // TODO - this should direct the user to the score page together with the data
  const submitAnswer = () => {
    console.log("questions over");
  };
};

displayTopicQuizes(findTopic);
