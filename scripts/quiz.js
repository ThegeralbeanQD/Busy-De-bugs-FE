const findTopic = localStorage.getItem("topic")

const fetchQuiz = async (topic) => {
  const quizes = (await fetch(`http://localhost:3000/quiz/${topic}`)).json()
  return quizes

}

const displayTopicQuizes = async (topic) => {
  const topicQuizes = await fetchQuiz(topic)

  const quizList = document.querySelector('#quiz')

  const h1 = document.createElement('h1')
  h1.append(topic)
  h1.setAttribute('id', 'topic')
  quizList.appendChild(h1)

  topicQuizes.forEach((index) => {

    const h2 = document.createElement('h2')
    const ol = document.createElement('ol')

    let question = index.question
    h2.append(question)
    h2.setAttribute('id', 'question')
    quizList.appendChild(h2)

    let answers = index.answers

    answers.forEach((ans, index) => {
      const li = document.createElement('li')
      li.append(ans.answer)

      li.setAttribute('class', 'answers')
      ol.appendChild(li)
      quizList.appendChild(ol)
      li.addEventListener('click', function() {
        let answer = ans.is_correct
        if (answer === true) {
          alert('You got it!')
        } else {
          alert('Try again!')
        }
      })
    })
  })
}

displayTopicQuizes(findTopic)
