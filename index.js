const musicButton = document.querySelector('#music-button')
const literatureButton = document.querySelector('#literature-button')
const historyButton = document.querySelector('#history-button')
const geographyButton = document.querySelector('#geography-button')
const randomButton = document.querySelector('#random-button')

musicButton.addEventListener("click", function() {
  let topic = musicButton.innerText
  sessionStorage.setItem('topic', topic)
})

literatureButton.addEventListener("click", function() {
  let topic = literatureButton.innerText
  sessionStorage.setItem('topic', topic)
})

historyButton.addEventListener("click", function() {
  let topic = historyButton.innerText
  sessionStorage.setItem('topic', topic)
})

geographyButton.addEventListener("click", function() {
  let topic = geographyButton.innerText
  sessionStorage.setItem('topic', topic)
})

randomButton.addEventListener("click", function() {
  let topic = randomButton.innerText
  sessionStorage.setItem('topic', topic)
})
