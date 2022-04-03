//FUNCION PARA ACTUALIZAR COSTO TOTAL Y CONTADOR DE ITEMS
//SE DISPARA CON: takeCart, si no esta vacio - removeBtn - showAlert(addButtons)
function calcCost() {
    let infoProducts = document.querySelectorAll(".info-prod"),
        prices = [];
    infoProducts.forEach(el => prices.push(parseFloat(el.innerHTML.split("$").pop().slice(0,-2))));
    //counter.textContent = prices.length;
    //if (prices.length == 0) {
        //toggleOrder();
        //totalCost.textContent = 0;
        //showOrderBtn.classList.add("disabled");
    //} else {
        //totalCost.textContent = prices.reduce((acc,curr) => acc+curr);
    //}
}

//FUNCION PARA ACTUALIZAR CARRITO EN SESSION STORAGE
//SE DISPARA CON: addButtons - removeBtn - saveSettingsBtn
function updateCart() {
    cart = []; 
    let listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(el => cart.push(new CartItem(el.description,el.price)));
    sessionStorage.setItem("cart",JSON.stringify(cart));
    //se agrega:
    counter.textContent = cart.length;
    if (!cart.length) {
        toggleOrder();
        showOrderBtn.classList.add("disabled");
    }
    totalCost.textContent = cart.reduce((acc,curr) => acc.price + curr.price) || 0;
}

//FUNCION PARA LEVANTAR CARRITO DE SESSION STORAGE
//SE DISPARA CON: init - 
function takeCart() {
    cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.forEach(el => createOrderItem(el.description,el.price));
    if (cart.length) {
        showOrderBtn.classList.remove("disabled");
        calcCost();
    }
}