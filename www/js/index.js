let secCarte = document.querySelector("#carte");

let champRecherche = document.querySelector("#code");

fetch("https://geo.api.gouv.fr/regions")
  .then((response) => response.json())
  .then((data) =>
    data.forEach((region) => {
      const card = `
        <div class="card my-3" data-code="${region.code}">
            <div class="card-body">
                <h5 class="card-title">${region.nom}</h5>
                <p class="card-text">Code: ${region.code}</p>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-${region.code}">Voir les détails</button>
            </div>
        </div>

        <div class="modal fade" id="modal-${region.code}" tabindex="-1" aria-labelledby="modalLabel-${region.code}" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel-${region.code}">${region.nom}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
            </div>
            <div class="modal-body">
              <p><strong>Code:</strong> ${region.code}</p>
            </div>
          </div>
        </div>
      </div>

      `;
      secCarte.innerHTML += card;
    })
  );

  champRecherche.addEventListener("input", () => {
    const code = champRecherche.value.trim();
    
    const cards = document.querySelectorAll("#carte .card");
    cards.forEach((card) => {
        const codeRegion = card.getAttribute("data-code");
        if(codeRegion.startsWith(code)) {
            card.style.display ="block";
        } else {
            card.style.display = "none";
        }
    })
  });