// const ul = document.getElementById("scoreList");
// let li = document.createElement("li");

// let x = 0

// while (x < 7) {
//     li.setAttribute('id', 'newListItem');
//     li.innerText = 'New List Item';
//     ul.appendChild(li);
//     x++
// }

// fetch('http://localhost:3000/users')
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         let authors = data;
//         authors.map(function (author) {



//             let li = document.createElement('li');
//             let name = document.createElement('h2');
//             name.innerHTML = author.username;
//             li.appendChild(name);
//             ul.appendChild(li);
//         });
//     })

  const url = 'https://brain-debug.onrender.com/users';

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
        for (let i = 0; i < 3 && i < users.length; i++) {
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
