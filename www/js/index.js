function createLastCard() {
  const secLastArt = document.querySelector("#lastArt .row");
  getItem().then((articles) => {
    for (let i = 0; i < 3; i++) {
      const card = `
  <div class="card col-sm-12 col-md-5 col-lg-3 mx-auto my-4" data-num="${articles[i].article.num_art}">
        <img class="card-img-top w-50 mx-auto mt-3" src="${articles[i].article.url}" alt="image-${articles[i].article.num_art}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${articles[i].article.nom_art}</h5>
          <p class="card-text">${articles[i].article.desc_art}</p>
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

function getItem(color, size) {
  return fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/getArticle.php"
  )
    .then((response) => response.json())
    .then((data) => {
      const test = [];
      data.forEach((article) => {
        test.push(
          fetch(
            `https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/getDetailArticle.php?num_art=${article.num_art}`
          )
            .then((response) => response.json())
            .then((detail) => ({
              detail: [...detail],
              article: article,
            }))
        );
      });

      return Promise.all(test).then((articles) => {
        if (!color && !size) {
          return articles; // aucun tri
        } else if (!color && size) {
          return articles.filter((article) => {
            return article.detail.some((detail) => {
              return detail.taille && detail.taille.taille === size;
            });
          });
        } else if (color && !size) {
          return articles.filter((article) => {
            return article.detail.some((detail) => {
              return detail.couleur && detail.couleur.couleur === color;
            });
          });
        } else {
          return articles.filter((article) => {
            return article.detail.some((detail) => {
              return (
                detail.couleur &&
                detail.couleur.couleur === color &&
                detail.taille &&
                detail.taille.taille === size
              );
            });
          });
        }
      });
    });
}
createLastCard();
