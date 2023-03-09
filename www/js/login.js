const email = "hugothiebaut22@gmail.com";
const password = "test";

fetch(
  "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/login.php",
  {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
  }
)
  .then((response) => response.json())
  .then((data) => {
    if (data.length === 1) {
      console.log("Connexion réussie");
      document.cookie = `username=${data[0].login}`;
      document.cookie = `user_id=${data[0].id_cl}`;
    } else {
      console.log("Connexion échouée");
    }
  })
  .catch((error) => console.error(error));
