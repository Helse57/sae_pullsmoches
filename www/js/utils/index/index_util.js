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