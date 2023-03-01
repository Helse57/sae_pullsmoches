
async function test(){
   try{
     const res = await fetch("https://devweb.iutmetz.univ-lorraine.fr/~thieba218u/sae_pullsmoches/scripts/getArticle.php", {mode: "no-cors"});
     console.log(res);
     const json = await res.json();

     console.log(json)
   }
   catch(error){
     console.error(error);
   }
 }

 test();