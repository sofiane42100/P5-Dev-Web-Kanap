//recuperation de l'id
const orderTag = document.querySelector("#orderId")
orderTag.textContent = localStorage.getItem("responseId");

//efface tous le local storage sauf le formulaire
function enleverCleLocalStorage(key){
    localStorage.removeItem(key);
}

enleverCleLocalStorage("responseId");
enleverCleLocalStorage("produit");

