if (sessionStorage.getItem("JWT_TOKEN")) {
  verifyJWT();
  const navBar = document.querySelector("ul");
  navBar.innerHTML += `<li class="nav-item">
  <a href="#" class="nav-link text-white">Favoris</a>
</li>
  <li class="nav-item">
  <a href="#" class="nav-link text-white">Panier</a>
</li>
  <li class="nav-item">
  <a href="#" class="nav-link text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">Profil</a>
</li>
  <li class="nav-item">
  <a href="#" class="nav-link text-white">Se déconnecter</a>
</li>`;
} else {
  const navBar = document.querySelector("ul");
  navBar.innerHTML += `<li class="nav-item">
  <a href="./login.html" class="nav-link text-white">Se connecter</a>
</li>
<li class="nav-item">
  <a href="./inscription.html" class="nav-link text-white">S'inscrire</a>
</li>`;
}

creerCarte();

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

function mergeData(couleur, taille, categorie) {
  return new Promise((resolve, reject) => {
    // Récupération des données de la première API
    fetch(
      "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/getArticle.php"
    )
      .then((response) => response.json())
      .then((data1) => {
        // Récupération des données de la seconde API
        fetch(
          "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/getDetailArticle.php"
        )
          .then((response) => response.json())
          .then((data2) => {
            // Fusion des données des deux API
            const mergedData = data2.map((detail) => {
              const matchingArticle = data1.find(
                (article) => article.num_art === detail.num_art
              );
              return {
                ...detail,
                num_categ: matchingArticle.num_categ,
                nom_categ: matchingArticle.nom_categ,
              };
            });

            // Filtrage des données en fonction des paramètres
            const filteredData = mergedData.filter((item) => {
              return (
                (!couleur || item.couleur === couleur) &&
                (!taille || item.taille === taille) &&
                (!categorie || item.nom_categ === categorie)
              );
            });

            // Tri des données filtrées en fonction des paramètres
            filteredData.sort((a, b) => {
              if (couleur) {
                return a.couleur.localeCompare(b.couleur);
              } else if (taille) {
                return a.taille.localeCompare(b.taille);
              } else if (categorie) {
                return a.nom_categ.localeCompare(b.nom_categ);
              }
            });

            resolve(filteredData); // Renvoi des données filtrées et triées
          })
          .catch((error) => {
            reject(error); // Gestion des erreurs pour la seconde API
          });
      })
      .catch((error) => {
        reject(error); // Gestion des erreurs pour la première API
      });
  });
}

function creerCarte(couleur, taille, categorie) {
  mergeData(couleur, taille, categorie)
    .then((data) => {
      const cards = document.querySelector("#cardAdd");
      let numDejaAjoutes = [];
      data.forEach((item) => {
        if (!numDejaAjoutes.includes(item.num_art)) {
          numDejaAjoutes.push(item.num_art);
          fetch(
            `https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/getArticle.php?num_art=${item.num_art}`
          )
            .then((response) => response.json())
            .then((article) => {
              const card = `
                <div class="card col-sm-12 col-md-5 col-lg-5 mx-auto my-4 mx-3" data-num="${article[0].num_art}">
                  <img class="card-img-top w-50 mx-auto mt-3" src="${article[0].url}" alt="image-${article[0].num_art}">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${article[0].nom_art}</h5>
                    <p class="card-text">${article[0].desc_art}</p>
                    <div class="mt-auto">
                      <a href="#" class="btn btn-primary justify-content-center">Voir les details</a>
                    </div>
                  </div>
                </div>
              `;
              cards.innerHTML += card;
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
      if (data.length === 0) {
        const err = document.querySelector("#errRech");
        err.innerHTML = "Aucun article ne correspond à votre recherche";
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

const btnFiltre = document.querySelector("#filtre");
const btnReset = document.querySelector("#reset");

btnFiltre.addEventListener("click", () => {
  const color = couleur.value;
  const size = taille.value;
  const category = categorie.value;
  resetCard();
  creerCarte(color, size, category);
});

btnReset.addEventListener("click", () => {
  resetCard();
  creerCarte();
  couleur.value = "";
  taille.value = "";
  categorie.value = "";
});

function resetCard() {
  const cards = document.querySelector("#cardAdd");
  const err = document.querySelector("#errRech");
  err.innerHTML = "";
  cards.innerHTML = "";
}
