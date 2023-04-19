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
        let ul = document.getElementById('scoreList');
        
        users.forEach((user) => {

          let totalScore = 0;

          for (let topic in user.score) {
            totalScore += user.score[topic];
          }
          
          let li = document.createElement('li');
        //   let username = document.createElement('h3');
          li.innerHTML = `${user.username}: ${totalScore}`;
        //   li.appendChild(username);
          ul.appendChild(li);
        });
      });






