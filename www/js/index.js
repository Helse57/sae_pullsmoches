async function getDetails(num_art) {
  try {
    const res = await fetch(
      "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/getDetailArticle.php?num_art=" +
        num_art
    );
    const json = await res.json();
    return json;
  } catch (e) {
    console.error(e);
  }
}

getDetails(1);
