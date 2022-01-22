
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
    <input type="number" onchange="changeQuantite('${produitPanier[k].name}', '${produitPanier[k].option_produit}', this.value)" class="itemQuantity" data-id= "${produitPanier[k].name} data-couleur= '${produitPanier[k].option_produit}"  name="itemQuantity" min="1" max="100" value="${produitPanier[k].quantite}">
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

 
 function changeQuantite(nom,couleur,quantite){

 

  let produitPanier = JSON.parse(localStorage.getItem("produit"));

     
     //boucle for pour verifier si le produit est deja dans le panier et a ou pas la meme couleur
    if(quantite > 0 && quantite <= 100 ){  
       
      produitPanier.forEach((prod) =>{
         
         if (nom == prod.name){ //prod=produit qui est présent dans le panier
           
             if (couleur == prod.option_produit){
             
                 prod.quantite = parseInt(quantite)  
             }
            
         }
     })
    }
    totalPanier(produitPanier)
    localStorage.setItem("produit" , JSON.stringify(produitPanier));
 
 }

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


//********************************* contact*/

//** selection du bouton envoyer */
const btnCommander = document.querySelector("#order")

//---------- addeventlistener
btnCommander.addEventListener("click",(e)=>{
e.preventDefault();

  //recuperation du contactpour le mettre dans le local storage

//mettre les values du contactdans un objet
const contact= {
  firstName : document.querySelector("#firstName").value,
  lastName : document.querySelector("#lastName").value,
  address : document.querySelector("#address").value,
  city : document.querySelector("#city").value,
  email : document.querySelector("#email").value,
}

//******************************* validation du contact*/
const texteAlert = (value) => {
  return `${value}:Chiffre et symbole ne sont pas autorisé \n Maximum 20 caractères et minimum 3 caratcères`
}

const regExPrenomNomVIlle = (value) => {
  return  /[a-zA-Z0-9]{0,15}/g.test(value);
}

const regExAdresse = (value) => {
  return /[a-zA-Z0-9]+/g.test(value);
}

const regExEmail = (value) => {
  return /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/.test(value);
}



  function controlePrenom(){    
  //controle de la validité du prenom  
const lePrenom = contact.firstName;
      if (regExPrenomNomVIlle(lePrenom)) {
        document.querySelector("#firstNameErrorMsg").textContent = "";
            return true;
          }  
      else {
        document.querySelector("#firstNameErrorMsg").textContent = "Veuillez bien remplir ce champ";
            alert (texteAlert("Prenom"));
            return false;
          }
        }

  function controleNom(){   
    //controle de la validité du nom                 
const leNom = contact.lastName;
      if (regExPrenomNomVIlle(leNom)){
        document.querySelector("#lastNameErrorMsg").textContent = "";
            return true;
          }  
      else {
        document.querySelector("#lastNameErrorMsg").textContent = "Veuillez bien remplir ce champ";
            alert (texteAlert("Nom"));
            return false;
          }
        }    

  function controleVille(){   
          //controle de la validité de la ville                 
      const ville = contact.city;
            if (regExPrenomNomVIlle (ville)){
              document.querySelector("#cityErrorMsg").textContent = "";
              return true
                }  
            else {
              document.querySelector("#cityErrorMsg").textContent = "Veuillez bien remplir ce champ";
                  alert (texteAlert("ville"));
                  return false;
                }
        }    
     
  function controleAdresse(){   
                //controle de la validité de l'adresse               
            const adresse= contact.address;
                  if (regExAdresse (adresse)){
                    document.querySelector("#addressErrorMsg").textContent = "";
                    return true
                      }  
                  else {
                    document.querySelector("#addressErrorMsg").textContent = "Veuillez bien remplir ce champ";
                        alert (texteAlert("adresse"));
                        return false;
                      }
        }    

  function controleEmail(){   
                //controle de la validité de l'adresse               
            const email = contact.email;
                 if (regExEmail (email)){  
                   document.querySelector("#emailErrorMsg").textContent = "";
                     return true
                      }  
                else {
                  document.querySelector("#emailErrorMsg").textContent = "Veuillez bien remplir ce champ";
                       alert (texteAlert("email"));
                    return false;
                    }
        }                  

//mettre l'objet "contact" dans le local storage

if(controlePrenom() && controleNom() && controleVille() && controleAdresse() && controleEmail()){
localStorage.setItem("contact" , JSON.stringify(contact));
} else {
  alert("Veuillez bien remplir le contact")
}

const products = [];
produitPanier.forEach(produit => {
  products.push(produit.id_produit)
})
//mettre les value du contact et mettre les produits selectionnées dans un objet a envoyer vers le serveur
const aEnvoyer = {
 products,
  contact
}
console.log("aEnvoyer");
console.log((aEnvoyer));


//envoi de l'objet "aEnvoyer" dans le serveur
const promise01 = fetch("http://127.0.0.1:3000/api/products/order", {
  method: "post",
  body: JSON.stringify(aEnvoyer),
  headers: {
    "Content-type" : "application/json",
  },
});



//pour voir le resultat du serveur dans le console
promise01.then(async(response)=>{
  try{
    console.log("response");
    console.log(response);

    const contenue = await response.json();
    console.log("contenue");
    console.log(contenue);
   if (response.ok){
     console.log(`Resultat de response.ok : ${response.ok}`);

    //recuparation de l'id de la response du serveur
     console.log("id de response");
     console.log(contenue.orderId);

     //mettre l'id dans le local storage
     localStorage.setItem("responseId", contenue.orderId)

   } else{
     console.log(`Response de serveur : ${response.status}`);
   }
    } 
  catch(e){
      console.log(e);
    }
})

window.location = "confirmation.html"
//pour voir ce qu il y a reellement dans le serveur
/* const promise02 = fetch("http://127.0.0.1:3000/api/products/order")
promise02.then(async(response)=>{
try{
  console.log("promise02");
  console.log(promise02);
  const donneDuServeur = await response.json();
  console.log("donneDuServeur");
  console.log(donneDuServeur);
  }
catch(e){
  console.log(e);
  }
})
 */
});

//-----------mettre le contenue du  local sotirage dans le champ contact----
//----prendre la key dans local storage et la mettre dans une variable
const dataLocalStorage = localStorage.getItem("contact")

//-------convertir la chaine de caractere en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage)


//mettre les valeur du local storage dans le contact

document.querySelector("#firstName").setAttribute('value' , dataLocalStorageObjet.firstName)
document.querySelector("#lastName").setAttribute('value' , dataLocalStorageObjet.lastName)
document.querySelector("#address").setAttribute('value' , dataLocalStorageObjet.address)
document.querySelector("#city").setAttribute('value' , dataLocalStorageObjet.city)
document.querySelector("#email").setAttribute('value' , dataLocalStorageObjet.email)

console.log("dataLocalStorageObjet");
console.log((dataLocalStorageObjet));
