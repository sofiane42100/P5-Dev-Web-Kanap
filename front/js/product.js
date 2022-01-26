//"window.location.sarch" methode qui permet de récuperer "id" depuis une autre page
const product = window.location.search.split("?id=").join("");
//spliter pour avoir le tableau, join pour envoyer un seul element id
console.log(product);

//variable pour stocker les elements dans un tableau
let productData = [];

//fonction asynchrone
const fetchProduct = async() =>
 {
     // recupere l`url de la route `entre apostrophe` pour injecter une variable
     await fetch(`http://localhost:3000/api/products/${product}`)
     .then((res) => res.json())//transforme en json
     .then((promise) => { //traite la promesse
         productData = promise;  //prendre la variable pour l`acrementer 
         console.log(productData);})
 };

 const pruductDisplay = async () =>{  // fonction
     await fetchProduct();
       
     document.getElementById("image").innerHTML =`
      <img src="${productData.imageUrl}" alt="${productData.altTxt}">`
     document.getElementById("title").textContent = productData.name
     document.getElementById("price").textContent = productData.price
     document.getElementById("description").textContent = productData.description 
   
      
      //creer une variable, pour aller chercher id colors
     let select = document.getElementById("colors");
     
        //logué pour voir le tableau (toujours faire des log pour voir ce qui ce passe)
     console.log(productData.colors); 
         //methode pour faire des boucle du tableau
      productData.colors.forEach((couleur) => { 
         // permet de créer un element par exemple option (pour liste deroulante en html)
        console.log(couleur);  
         //permet de creer un element dans html
        let tagOption = document.createElement("option"); 

         tagOption.innerHTML= `${couleur}`
         tagOption.value = `${couleur}`
         //permet de placer option dans element
         select.appendChild(tagOption); 
         console.log(tagOption);
        });
    
    };

 pruductDisplay();


//------------------------La gestion du panier-------------------------------
//la recupération des données selectionnéeq par l'utilisateur et envoie du panier

//Sélection de l'id du formulaire
 const choixProduit = document.querySelector("#colors")

 //Mettre le choix de l'utilisateur dans une variable
 const boutonId = document.querySelector ("#addToCart");
 
//Ecouter le bouton et fonction d'ajout dans le panier et le stockage du panier
 boutonId.addEventListener("click" , (event)=>{event.preventDefault();
//preventDefault évite que la page se réactualise


  //---Mettre le choix de l'utilisateur dans une variable  
    const choixCouleur = choixProduit.value;

    const quantiteProduit = document.querySelector("#quantity").value

 //---Récupération des valeurs du formulaire   
 let optionsProduit = {
     name : productData.name ,
     id_produit : product,
     option_produit : choixCouleur,
     quantite : quantiteProduit,
     prix : productData.price,
     photo : productData.imageUrl,
 }
 console.log(optionsProduit);


//-------------Le local storage------------------------
//-------------stocker la récupération des valeurs du formulaire dans le local storage------

//Déclaration de la variable "produitPanier" dans laquelle on met les key et les values qui sont dans le local storage
 let produitPanier = JSON.parse(localStorage.getItem("produit"));
//---JSON.parse c'est pour convertir les donnéés au format JSON qui sont dans le local storage en objet JavaScript


//s'il y a deja des produits d'enrengistré dans le local storage
 
//
if (produitPanier){
    let estLa = false
    let memeCouleur = false
    let i = null
    //boucle for pour verifier si le produit est deja dans le panier et a ou pas la meme couleur
    produitPanier.forEach((prod,index) =>{
        //
        if (optionsProduit.id_produit == prod.id_produit){ //prod=produit qui est présent dans le panier
            estLa = true
            if (optionsProduit.option_produit == prod.option_produit){
                memeCouleur = true
                prod.quantite = parseInt(optionsProduit.quantite) + parseInt(prod.quantite)
            }
            else{
                i = index
            }
        }
    })

    if(estLa){
        if(!memeCouleur){
            produitPanier.splice(i, 0, optionsProduit)
        }
    }
    else{
          produitPanier.push(optionsProduit)
    }


  
    console.log(produitPanier);
    localStorage.setItem("produit" , JSON.stringify(produitPanier));

 }
//s'il n'y a pas de produit d'enrengistré dans le local storage
 else{
       produitPanier = [];
       produitPanier.push(optionsProduit)
       console.log(produitPanier);
       localStorage.setItem("produit" , JSON.stringify(produitPanier));

 }
})




 


 

 
