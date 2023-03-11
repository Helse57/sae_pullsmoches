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
  <a href="#" class="nav-link text-white">Profil</a>
</li>
  <li class="nav-item">
  <a href="#" class="nav-link text-white" onclick="deconnexion()"'>Se déconnecter</a>
</li>`;
} else {
  const navBar = document.querySelector("ul");
  navBar.innerHTML += `<li class="nav-item">
  <a href="./login.html" class="nav-link text-white">Se connecter</a>
</li>
<li class="nav-item">
  <a href="#" class="nav-link text-white">S'inscrire</a>
</li>`;
}

function createLastCard() {
  const secLastArt = document.querySelector("#lastArt .row");
  getLastArt().then((articles) => {
    for (let i = articles.length - 1; i > articles.length - 4; i--) {
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

createLastCard();
