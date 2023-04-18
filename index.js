const musicButton = document.querySelector('#music-button')
const literatureButton = document.querySelector('#literature-button')
const historyButton = document.querySelector('#history-button')
const geographyButton = document.querySelector('#geography-button')


musicButton.addEventListener("click", async function() {
  let topic = musicButton.innerText
  console.log(topic, 'why')
  localStorage.setItem('topic', topic)
})

literatureButton.addEventListener("click", function() {
  let topic = literatureButton.innerText
  console.log(topic, 'why')
  localStorage.setItem('topic', topic)
})

historyButton.addEventListener("click", function() {
  let topic = historyButton.innerText
  console.log(topic, 'why')
  localStorage.setItem('topic', topic)
})

geographyButton.addEventListener("click", function() {
  let topic = geographyButton.innerText
  console.log(topic, 'why')
  localStorage.setItem('topic', topic)
})
