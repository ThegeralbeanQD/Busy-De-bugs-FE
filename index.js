const musicButton = document.querySelector('#music-button')
const literatureButton = document.querySelector('#literature-button')
const historyButton = document.querySelector('#history-button')
const geographyButton = document.querySelector('#geography-button')
const randomButton = document.querySelector('#random-button')

musicButton.addEventListener("click", function() {
  let topic = musicButton.innerText
  localStorage.setItem('topic', topic)
})

literatureButton.addEventListener("click", function() {
  let topic = literatureButton.innerText
  localStorage.setItem('topic', topic)
})

historyButton.addEventListener("click", function() {
  let topic = historyButton.innerText
  localStorage.setItem('topic', topic)
})

geographyButton.addEventListener("click", function() {
  let topic = geographyButton.innerText
  localStorage.setItem('topic', topic)
})

randomButton.addEventListener("click", function() {
  let topic = randomButton.innerText
  localStorage.setItem('topic', topic)
})

const url = "https://brain-debug.onrender.com/users";
const localURL = "http://localhost:3000/users";
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let users = data;

    // sort users by their total score
    users.sort((userA, userB) => {
      let totalScoreA = sumOfScores(userA.score);
      let totalScoreB = sumOfScores(userB.score);

      return totalScoreB - totalScoreA;
    });

    let ul = document.getElementById("scoreList");

    // make it only top 3 by looping
    for (let i = 0; i < 10 && i < users.length; i++) {
      let user = users[i];
      // get sum score for the current user
      let totalScore = sumOfScores(user.score);

      let li = document.createElement("li");
      li.innerHTML = `${user.username}: ${totalScore}`;
      ul.appendChild(li);
    }
  });

  function sumOfScores(user) {
    let totalScore = 0;
  
    for (let topic in user) {
      totalScore += user[topic];
    }
  
    return totalScore;
  }