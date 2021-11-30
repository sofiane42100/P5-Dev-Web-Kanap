const product = window.location.search.split("?id=").join("");//spliter pour avoir le tableau, join pour envoyer un seul element id
console.log(product);

let productData = [];//variable pour stocker les elements

const fetchProduct = async() =>//fonction asynchrone
 {
     await fetch(`http://localhost:3000/api/products/${product}`)// recupere l`url de la route `entre apostrophe` pour injecter une variable
     .then((res) => res.json())//transforme en json
     .then((promise) => { //traite la promesse
         productData = promise;  //prendre la variable pour l`acrementer 
         console.log(productData);})
 };

 const pruductDisplay = async () =>{  // fonction
     await fetchProduct();
       
    
     document.getElementById("title").innerHTML = `<h1 id="title">${productData.name}</h1>`
     document.getElementById("price").innerHTML = `<span id="price">${productData.price}</span>€</p>`
     document.getElementById("description").innerHTML = `<p id="description">${productData.description}</p>` 
     document.getElementById("colors").innerHTML = `  <select name="color-select" id="colors">
     <option value="">--SVP, choisissez une couleur --</option>
<!--                       <option value="vert">vert</option>
     <option value="blanc">blanc</option> -->
 </select>`
     
     
     
     let select = document.getElementById("colors"); //creer une variable, pour aller chercher id colors
     console.log(select);

     console.log(productData.colors); //logué pour voir le tableau (toujours faire des log pour voir ce qui ce passe)

      productData.colors.forEach((couleur) => { //methode pour faire des boucle du tableau
         console.log(couleur);  // permet de créer un element par exemple option (pour liste deroulante en html)
         let tagOption = document.createElement("option"); //permet de creer un element dans html

         tagOption.innerHTML= `${couleur}`
         tagOption.value = `${couleur}`

         select.appendChild(tagOption); //permet de placer option dans element
         console.log(tagOption);
        });
    
    };

 pruductDisplay();
