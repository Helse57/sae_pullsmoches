async function getArticles() {
  return fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/getArticle.php"
  )
    .then((response) => response.json())
    .then((data) => {
      return Promise.all(data);
    });
}

function getDetails(num_art) {
  return fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/getDetailArticle.php?num_art=" +
      num_art
  )
    .then((response) => response.json())
    .then((data) => {
      return Promise.all(data);
    });
}

getDetails(1).then((data) => console.log(data));
