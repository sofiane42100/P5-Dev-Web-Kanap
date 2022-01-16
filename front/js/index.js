fetch('http://localhost:3000/api/products')
.then(res => res.json()) //  promise  pour traiter la reponse avec la methode js          
.then(data => {
    console.log(data)
afficheCanape(data)
})
 
function afficheCanape(canapes) //fonction recuperer tableau des canapés
{
   const section = document.getElementById("items")// element html qui contient les cartes
  // boucle qui va créer le html pour chaque canapé
   canapes.forEach(canap => {
  
   section.innerHTML += "<a href=\"./product.html?id="+canap["_id"]+"\"> <article><img src="+canap["imageUrl"]+" alt="+canap["altTxt"]+"> <h3 class=\"productName\">"+canap["name"]+"</h3> <p class=\"productDescription\">"+canap["description"]+"</p></article>" 
})
}
