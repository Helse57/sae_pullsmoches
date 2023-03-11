verifyJWT();

function createLastCard() {
  const secLastArt = document.querySelector("#lastArt .row");
  getLastArt().then((articles) => {
    console.log(articles.length);
    for (let i = articles.length - 1; i > articles.length - 4; i--) {
      console.log(articles[i]);
      const card = `
  <div class="card col-sm-12 col-md-5 col-lg-3 mx-auto my-4" data-num="${articles[i].num_art}">
        <img class="card-img-top w-50 mx-auto mt-3" src="${articles[i].url}" alt="image-${articles[i].num_art}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${articles[i].nom_art}</h5>
          <p class="card-text">${articles[i].desc_art}</p>
          <div class="mt-auto">
            <a href="#" class="btn btn-primary justify-content-center">Voir les details</a>
          </div>
        </div>
      </div>
      `;
      secLastArt.innerHTML += card;
    }
  });
}

function getLastArt() {
  return fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/getArticle.php"
  ).then((response) =>
    response.json().then((data) => {
      const articles = [];
      data.forEach((article) => {
        articles.push(article);
      });
      return Promise.all(articles);
    })
  );
}

createLastCard();

function verifyJWT() {
  return fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/JWT.php?jwt=" +
      window.sessionStorage.getItem("JWT_TOKEN")
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if(data.error !== null) {
        sessionStorage.clear();
      }
    });
}
