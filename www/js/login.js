fetch(
  "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/login.php",
  {
    method: "POST",
    body: JSON.stringify({ username: "Mydao", password: "test" }),
    headers: { "Content-Type": "application/json" },
  }
)
  .then((response) => {
    response.json();
  })
  .then((data) => {
    console.log(data);
  });
