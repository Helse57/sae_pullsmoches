let secCarte = document.querySelector("#carte");

let champRecherche = document.querySelector("#code");

getRegionsAndDepartements().then((data) => {
  data.forEach((regionAndDept) => {
    const card = `
      <div class="card my-3" data-code="${regionAndDept.region.code}">
        <div class="card-body">
            <h5 class="card-title">${regionAndDept.region.nom}</h5>
            <p class="card-text">Code: ${regionAndDept.region.code}</p>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-${
              regionAndDept.region.code
            }">Voir les détails</button>
        </div>
      </div>

      <div class="modal fade" id="modal-${
        regionAndDept.region.code
      }" tabindex="-1" aria-labelledby="modalLabel-${
      regionAndDept.region.code
    }" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel-${
              regionAndDept.region.code
            }">${regionAndDept.region.nom}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
          </div>
          <div class="modal-body">
              <p><strong>Code:</strong> ${regionAndDept.region.code}</p>
              <p><strong>Départements:</strong></p>
              <ul>
                  ${regionAndDept.departement
                    .map(
                      (departement) =>
                        `<li class="mt-3">${departement.nom} (${departement.code})</li>`
                    )
                    .join("")}
              </ul>
          </div>
        </div>
      </div>
    </div>
`;
    secCarte.innerHTML += card;
  });
});

champRecherche.addEventListener("input", () => {
  const code = champRecherche.value.trim();

  const cards = document.querySelectorAll("#carte .card");
  cards.forEach((card) => {
    const codeRegion = card.getAttribute("data-code");
    if (codeRegion.startsWith(code)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

function getRegionsAndDepartements() {
  return fetch("https://geo.api.gouv.fr/regions")
    .then((response) => response.json())
    .then((data) => {
      const departements = [];
      data.forEach((region) => {
        departements.push(
          fetch(`https://geo.api.gouv.fr/regions/${region.code}/departements`)
            .then((response) => response.json())
            .then((departement) => ({
              departement: [...departement],
              region: region,
            }))
        );
      });
      return Promise.all(departements);
    });
}
