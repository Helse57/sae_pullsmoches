function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function verifyJWT() {
  return fetch(
    "https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae/sae_pullsmoches/scripts/JWT.php?jwt=" +
      window.sessionStorage.getItem("JWT_TOKEN")
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.error !== null) {
        window.location = "./index.html";
        sessionStorage.clear();
      }
    });
}
