createCard();

function getAllData() {
  let categorieData = fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/getCategorie.php"
  );
  let couleurData = fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/getCouleur.php"
  );
  let tailleData = fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/getTaille.php"
  );

  return Promise.all([categorieData, couleurData, tailleData])
    .then((responses) => {
      return Promise.all(
        responses.map((response) => {
          return response.json();
        })
      );
    })
    .then((data) => {
      let combinedData = {
        categories: data[0],
        colors: data[1],
        sizes: data[2],
      };
      return combinedData;
    })
    .catch((error) => {
      console.log(error);
    });
}

const couleur = document.querySelector("#filter-colors");
const taille = document.querySelector("#filter-sizes");
const categorie = document.querySelector("#filter-categories");

getAllData().then((data) => {
  data.colors.forEach(
    (color) => {
      const option = document.createElement("option");
      option.value = color.couleur;
      option.textContent = color.couleur;
      couleur.appendChild(option);
    },
    data.sizes.forEach(
      (size) => {
        const option = document.createElement("option");
        option.value = size.taille;
        option.textContent = size.taille;
        taille.appendChild(option);
      },
      getAllData().then((data) =>
        data.categories.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.nom_categ;
          option.textContent = category.nom_categ;
          categorie.appendChild(option);
        })
      )
    )
  );
});

function filterItem(color, size) {
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
const btnFiltre = document.querySelector("#filtre");

btnFiltre.addEventListener("click", () => {
  const color = couleur.value;
  const size = taille.value;
  const category = categorie.value;
  resetCard();
  createCard(color, size, category);
});

function createCard(color, size, category) {
  const cards = document.querySelector("#cardAdd");
  document.querySelector("#errRech").innerHTML = "";
  filterItem(color, size).then((data) => {
    if (data.length === 0)
      document.querySelector("#errRech").innerHTML =
        "<p class='text-center mb-5'>Aucun article ne correspond à votre recherche</p>";
    data.forEach((article) => {
      const card = `<div class="card col-sm-12 col-md-5 col-lg-3 mx-auto my-4" data-num="${article.article.num_art}">
        <img class="card-img-top w-50 mx-auto mt-3" src="${article.article.url}" alt="image-${article.article.num_art}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${article.article.nom_art}</h5>
          <p class="card-text">${article.article.desc_art}</p>
          <div class="mt-auto">
            <a href="#" class="btn btn-primary justify-content-center">Voir les details</a>
          </div>
        </div>
      </div>
      `;
      cards.innerHTML += card;
    });
  });
}

function resetCard() {
  const cards = document.querySelector("#cardAdd");
  cards.innerHTML = "";
}
