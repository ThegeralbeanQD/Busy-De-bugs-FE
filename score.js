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
    
        let ul = document.getElementById('scoreList');
        
        // make it only top 3 by looping
        for (let i = 0; i < 5 && i < users.length; i++) {
            let user = users[i];
            // get sum score for the current user
            let totalScore = sumOfScores(user.score);
    
            let li = document.createElement('li');
            li.innerHTML = `${user.username}: ${totalScore}`;
            ul.appendChild(li);
        }
    });
    
    // find total score of a user
function sumOfScores(user) {
  let totalScore = 0;

  for (let topic in user) {
    totalScore += user[topic];
  }

  return totalScore;
}


let stringScores = localStorage.getItem("score");
let allScores = JSON.parse(stringScores)

let musicScore = allScores["music"]
let geoScore = allScores["geography"]
let litScore = allScores["literature"]
let historyScore = allScores["history"]


const form = document.querySelector("#log-user-form");
form.addEventListener("submit", logUserScore);

async function logUserScore(e) {
    e.preventDefault();
    console.log(e.target.elements.username.value);

    const data = {
        username: e.target.elements.username.value,
        score: {
            music: musicScore,
            geography: geoScore,
            literature: litScore,
            history: historyScore
        }
    }

    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data, null, 2)
    }
    const response = await fetch(url, options);

    if (response.status == 201) {
      e.target.username.value = ''
      alert("Score added.")
      window.location.reload();
    }
}