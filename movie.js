//--------------Good example of how to get result from api and display it------------------------
//const APILINK ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a983340ce925cbebcf4513837750e2bc&page=1';
const url = new URL(location.href);                                                  //Obtain the URL object of the current endpoint before being used to search different parameters
const movieId = url.searchParams.get("id")
const movieTitle = url.searchParams.get("title")
const APILINK = "http://127.0.0.1:8000/api/v1/reviews/";
const APILINK2 = "https://n38zdff0-8000.aue.devtunnels.ms/api/v1/reviews/";         //Backend Link from Port Forwarding

const main = document.getElementById("section");                                    //Section where movies are displayed
const title = document.getElementById("title");
title.innerText = movieTitle;
returnReviews(APILINK)

//fetching data from the review backend we created, and access them using fetch and data.forEach
function returnReviews(url){
    console.log(url + "movie/" + movieId)
    fetch(url + "movie/" + movieId).then(res => res.json()).then(function(data){
            console.log(data);
            data.forEach(review =>                                         //Element in the api link
            {
                //this whole section create a new movie template just like the one we create manually in the html file 
                //include: row, column, card, image, title, center element
                const div_card = document.createElement('div');                     //Create new div tag
                div_card.innerHTML = `
                    <div class="row">
                        <div class="column">
                            <div class="card" id="${review._id}">
                                <p><strong>Review: </strong>${review.review}</p>
                                <p><strong>User: </strong>${review.user}</p>
                                <p><a href="#"onclick="editReview('${review._id}','${review.review}', '${review.user}')">✏️</a> <a href="#" onclick="deleteReview('${review._id}')">🗑</a></p>
                            </div>
                        </div>
                    </div>
                    `
                
                //Adding this whole movie template to section
                main.appendChild(div_card);
                
            }
        )
    }
)
}

function editReview(id, review, user) {

  const element = document.getElementById(id);
  const reviewInputId = "review" + id
  const userInputId = "user" + id
  
  element.innerHTML = `
              <p><strong>Review: </strong>
                <input type="text" id="${reviewInputId}" value="${review}">
              </p>
              <p><strong>User: </strong>
                <input type="text" id="${userInputId}" value="${user}">
              </p>
              <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}',)">💾</a>
              </p>
  `
}

function saveReview(reviewInputId, userInputId, id="") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    if (id) {
        //setting up request with the headers and body using fetch(){method: , headers:, and body: ,}
        fetch(APILINK + id, 
        {
            method: 'PUT',
            headers: 
                {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({"user": user, "review": review})
        }).then(res => res.json())
        .then(res => 
        {
            console.log(res)
            location.reload();
        });        
    } else {
        fetch(APILINK + "new", {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            location.reload();
        });
    }
}

function deleteReview(id) {
  fetch(APILINK + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });    
}
