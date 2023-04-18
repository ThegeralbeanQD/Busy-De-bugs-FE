const findTopic = localStorage.getItem("topic")
// console.log(topic, 'line2')

const fetchQuiz = async (topic) => {
  const quizes = (await fetch(`http://localhost:3000/${topic}`)).json()
  return quizes

}

const displayTopicQuizes = async (topic) => {
  const topicQuizes = await fetchQuiz(topic)
  console.log(topicQuizes)

  const quizList = document.querySelector('#quiz ol')
  const quizTopic = document.querySelector('#quiz h1')

  quizTopic.append(topic)

  topicQuizes.map((index) => {
    const li = document.createElement('li')
    console.log(index.question)
    li.append(index.question)
    quizList.append(li)
  })
}

displayTopicQuizes(findTopic)
