
//Déclaration de la variable "produitPanier" dans laquelle on met les key et les values qui sont dans le local storage
let produitPanier = JSON.parse(localStorage.getItem("produit"));
//---JSON.parse c'est pour convertir les donnéés au format JSON qui sont dans le local storage en objet JavaScript

totalPanier(produitPanier);

//----------------------l'affichage des produits du panier------------------
//Selection de la classe ou je vais injecter le code HTML
const positionElement = document.querySelector("#cart__items");
console.log(positionElement);


//si le panier est vide: afficher le panier vide
if (produitPanier === null ||  produitPanier == 0) {
}


//si le panier n'est pas vide: afficher les articles du localStorage
else {
     let structurePanier = [];
for (k = 0; k < produitPanier.length; k++){//incrementation a chaque boucle

    
    structurePanier = structurePanier + `
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${produitPanier[k].photo}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${produitPanier[k].name}</h2>
    <p>${produitPanier[k].option_produit}</p>
    <p>${produitPanier[k].prix} €</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" data-id= "${produitPanier[k].name} data-couleur= '${produitPanier[k].option_produit}"  name="itemQuantity" min="1" max="100" value="${produitPanier[k].quantite}">
    </div>
     <div      class="cart__item__content__settings__delete">
     <p class="deleteItem">Supprimer</p>
     </div>
     </div>
     </div>
    </article>
    `;  
} 



   if (k === produitPanier.length){
     //injection html dans la page panier
    positionElement.innerHTML = structurePanier
}}


//------------------------------Gestion du bouton supprimer l'article-----------------

//Selection des references de tous les boutons 
let btn_supprimer = document.querySelectorAll(".deleteItem")


for (let l = 0; l < btn_supprimer.length; l++){
  btn_supprimer[l].addEventListener("click", (event) => {
    event.preventDefault();
   

  //sélection de l'id du produit qui va être supprimer en cliquant sur le bouton
   let selection_suprimer = produitPanier[l].option_produit


    //avec la methode filter je selectionne les éléments a garder et je supprime l'élement qui a été cliqué
    produitPanier = produitPanier.filter(element => element.option_produit !== selection_suprimer);


    //on envoie la variable dans le localStorage 
    //transformation en format JSON et l'envoyer dans la key "produit" du local storage
    localStorage.setItem("produit" , JSON.stringify(produitPanier))

    //crétaion d'une fenêtre alerte pour informer de la supression du produit
    alert("Produit supprimer")
    event.preventDefault();
    window.location.href = "cart.html"
    

})
}
//------------------modifier la quantite du client dans le panier--------

let selectionQuantite = document.querySelector(".itemQuantity")
   selectionQuantite.addEventListener("click", (event)=>{
     event.preventDefault();
     
     for(let n = 0; n < produitPanier.length; n++){
       let selectionProduit = produitPanier[n].quantite

       selectionQuantites =+ selectionProduit
     }

     alert("ÊTES-VOUS SUR?")

    
  })


//------------------total du panier---------


function totalPanier(produitPanier){
      //declaration de la variable pour y mettre les prix qui y a dans le panier
      let prixTotal = 0;

      let quantiteTotal = 0;




//boucle for 
for (let m = 0; m < produitPanier.length; m++){
  
      let prixDuProduit = produitPanier[m].prix;

      let quantiteProduits = produitPanier[m].quantite;

      



      prixTotal += (prixDuProduit * quantiteProduits)
      
      quantiteTotal += parseInt(quantiteProduits)//converti en entier

     
}

document.querySelector("#totalQuantity").textContent = quantiteTotal;
document.querySelector("#totalPrice").textContent = prixTotal;


}




