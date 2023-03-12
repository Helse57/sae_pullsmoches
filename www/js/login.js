const login = document.getElementById("login");

login.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/JWT.php",
    {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.error === null) {
        window.sessionStorage.setItem("JWT_TOKEN", data.jwt);
        window.location.href = "./index.html";
      }
    })
    .catch((error) => console.error(error));
});
