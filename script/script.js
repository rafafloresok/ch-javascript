/* ------------------ */
/* LISTA DE PRODUCTOS */
/* ------------------ */
let menuItems = [
    {
        type: "Entradas",
        description: "Rabas",
        price: 1590,
        available: false,
        source: "images/rabas.jpg"
    },
    {
        type: "Entradas",
        description: "Langostinos empanados",
        price: 1600,
        available: true,
        source: "images/langostinos.jpg"
    },
    {
        type: "Entradas",
        description: "Berenjena Parmesana",
        price: 990,
        available: true,
        source: "images/berenjena.jpg"
    },
    {
        type: "Entradas",
        description: "Bruschetta",
        price: 1200,
        available: true,
        source: "images/bruschetta.jpg"
    },
    {
        type: "Entradas",
        description: "Mollejas crocantes",
        price: 1650,
        available: true,
        source: "images/mollejas.jpg"
    },
    {
        type: "Principales",
        description: "Ojo de bife con papas asadas",
        price: 1750,
        available: true,
        source: "images/ojo_de_bife.jpg"
    },
    {
        type: "Principales",
        description: "Pollo a la mostaza con vegetales asados",
        price: 1350,
        available: true,
        source: "images/pollo.jpg"
    },
    {
        type: "Principales",
        description: "Trucha con arroz cremoso",
        price: 1650,
        available: false,
        source: "images/trucha.jpg"
    },
    {
        type: "Principales",
        description: "Entraña con puré rústico",
        price: 1400,
        available: true,
        source: "images/entrania.jpg"
    },
    {
        type: "Principales",
        description: "Ravioles de salmón con salsa de tomates",
        price: 1650,
        available: true,
        source: "images/ravioles.jpg"
    },
    {
        type: "Postres",
        description: "Volcán de chocolate",
        price: 790,
        available: true,
        source: "images/volcan.jpg"
    },
    {
        type: "Postres",
        description: "Creme brulee",
        price: 500,
        available: true,
        source: "images/creme_brulee.jpg"
    },
    {
        type: "Postres",
        description: "Flan casero",
        price: 520,
        available: true,
        source: "images/flan.jpg"
    },
    {
        type: "Postres",
        description: "Ensalada de frutas",
        price: 590,
        available: true,
        source: "images/ensalada_frutas.jpg"
    },
    {
        type: "Postres",
        description: "Cheesecake con frutos del bosque",
        price: 560,
        available: false,
        source: "images/cheseecake.jpg"
    },
    {
        type: "Bebidas",
        description: "Agua sin gas",
        price: 210,
        available: true,
        source: "images/agua.jpg"
    },
    {
        type: "Bebidas",
        description: "Jugo exprimido de naranja",
        price: 400,
        available: true,
        source: "images/exprimido.jpg"
    },
    {
        type: "Bebidas",
        description: "Cerveza Cape Horn",
        price: 560,
        available: false,
        source: "images/cerveza.jpg"
    },
    {
        type: "Bebidas",
        description: "Vino Tinto Amalaya Corte Único",
        price: 1100,
        available: true,
        source: "images/vino_tinto.jpg"
    },
    {
        type: "Bebidas",
        description: "Vino Blanco Norton Cosecha Tardía",
        price: 900,
        available: true,
        source: "images/vino_blanco.jpg"
    },
];

/* --------- */
/* VARIABLES */
/* --------- */
let rowEntradas = document.querySelector("#row-entradas"),
    rowPrincipales = document.querySelector("#row-principales"),
    rowPostres = document.querySelector("#row-postres"),
    rowBebidas = document.querySelector("#row-bebidas"),
    settingsList = document.querySelector("#settings-list"),
    orderList = document.querySelector("#pedido"),
    showOrderBtn = document.querySelector("#mostrar"),
    orderContainer = document.querySelector("#container-pedido"),
    counter = document.querySelector("#contador"),
    sendOrder = document.querySelector("#enviar"),
    showTotalCost = document.querySelector("#show-total-cost"),
    front = document.querySelector("#front"),
    showMenuBtn = document.querySelector("#show-menu"),
    alert = document.querySelector("#alert"),
    settingsBtn = document.querySelector("#settings-btn"),
    logInContainer = document.querySelector("#container-log-in"),
    logInCancelBtn = document.querySelector("#cancel-log-in"),
    logInBtn = document.querySelector("#log-in-button"),
    settingsContainer = document.querySelector("#container-settings"),
    saveSettingsBtn = document.querySelector("#save-settings"),
    cancelSettingsBtn = document.querySelector("#cancel-settings"),
    cart = [],
    addButtons,
    homeBtns = document.querySelectorAll(".home-btn");
;

//CLASE PARA CREAR ITEMS DEL CARRITO
class CartItem {
    constructor(description,price) {
        this.description = description;
        this.price = price;
    }
}

/* --------- */
/* FUNCIONES */
/* --------- */
//FUNCION PARA ACTUALIZAR CARRITO EN SESSION STORAGE
function updateCart() {
    cart = []; 
    let listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(el => cart.push(new CartItem(el.description,el.price)));
    sessionStorage.setItem("cart",JSON.stringify(cart));
}

//FUNCION PARA LEVANTAR CARRITO DE SESSION STORAGE
function takeCart() {
    cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.forEach(el => createOrderItem(el.description,el.price));
    if (cart.length > 0) {
        showOrderBtn.classList.remove("disabled");
        calcCost();
    }
}

//FUNCION PARA CONSTRUIR ITEMS DEL MENU
function createMenuCard(type, description, price, available, source) {
    //CREAR DIV COL. INSERTAR EN DIV ROW (VER TYPE)
    let divCol = document.createElement("div");
    divCol.classList.add("col-12","col-sm6","col-md-4","col-lg-3");
    switch (type) {
        case "Entradas":
            rowEntradas.appendChild(divCol);
            break;
        case "Principales":
            rowPrincipales.appendChild(divCol);
            break;
        case "Postres":
            rowPostres.appendChild(divCol);
            break;
        case "Bebidas":
            rowBebidas.appendChild(divCol);
            break;
    }

    //CREAR DIV CARD. INSERTAR EN COL
    let divCard = document.createElement("div");
    divCard.classList.add("card","mx-auto");
    divCol.appendChild(divCard);

    //CREAR IMG. INSERTAR EN CARD
    let cardImg = document.createElement("img");
    cardImg.classList.add("card-img-top");
    cardImg.src = source;
    cardImg.alt = description;
    divCard.appendChild(cardImg); 

    //CREAR DIV CARD-BODY. INSERTAR EN CARD
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    divCard.appendChild(cardBody);

    //CREAR H5 CARD-TITLE. INSERTAR EN CARD-BODY
    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = description;
    cardBody.appendChild(cardTitle);

    //CREAR P CARD-TEXT. INSERTAR EN CARD-BODY
    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = `$${price}.-`;
    cardBody.appendChild(cardText);

    //CREAR A AGREGAR (VER DISABLE). INSERTAR EN CARD-BODY
    let buttonAdd = document.createElement("a");
    buttonAdd["description"] = description;
    buttonAdd["price"] = price;
    if (!available) {
        buttonAdd.classList.add("agregar", "btn", "btn-secondary","disabled");
        buttonAdd.textContent = "No disponible";
    } else {
        buttonAdd.classList.add("agregar", "btn", "btn-primary");
        buttonAdd.textContent = "Agregar al pedido";
    }
    cardBody.appendChild(buttonAdd);
}

//FUNCION PARA CONSTRUIR ITEMS DE LA LISTA DE CONFIGURACION
function createSettingsRow(type, description, price, available, source) {
    //CREAR DIV ROW. INSERTAR EN DIV SETTINGS-LIST
    let divRow = document.createElement("div");
    divRow.classList.add("row");
    settingsList.appendChild(divRow);

    //CREAR DIV COL TYPE. INSERTAR EN ROW
    let divColType = document.createElement("div");
    divColType.classList.add("col-1","p-1");
    divRow.appendChild(divColType);
    let inputType = document.createElement("select");
    inputType.classList.add("form-select","type");
    inputType.disabled = true;
    divColType.appendChild(inputType);
    let option1 = document.createElement("option");
    option1.value = "Entradas";
    option1.textContent = "Entradas";
    inputType.appendChild(option1);
    let option2 = document.createElement("option");
    option2.value = "Principales";
    option2.textContent = "Principales";
    inputType.appendChild(option2);
    let option3 = document.createElement("option");
    option3.value = "Postres";
    option3.textContent = "Postres";
    inputType.appendChild(option3);
    let option4 = document.createElement("option");
    option4.value = "Bebidas";
    option4.textContent = "Bebidas";
    inputType.appendChild(option4);
    inputType.value = type;
    
    //CREAR DIV COL DESCRIPTION. INSERTAR EN ROW
    let divColDesc = document.createElement("div");
    divColDesc.classList.add("col-4","p-1");
    divRow.appendChild(divColDesc);
    let inputDesc = document.createElement("input");
    inputDesc.classList.add("form-control","description");
    inputDesc.type = "text";
    inputDesc.value = description;
    inputDesc.disabled = true;
    divColDesc.appendChild(inputDesc);

    //CREAR DIV COL PRICE. INSERTAR EN ROW
    let divColPrice = document.createElement("div");
    divColPrice.classList.add("col-1","p-1");
    divRow.appendChild(divColPrice);
    let inputPrice = document.createElement("input");
    inputPrice.classList.add("form-control","price");
    inputPrice.type = "text";
    inputPrice.value = price;
    inputPrice.disabled = true;
    divColPrice.appendChild(inputPrice);

    //CREAR DIV COL AVAILABLE. INSERTAR EN ROW
    let divColAvailable = document.createElement("div");
    divColAvailable.classList.add("col-1","p-1");
    divRow.appendChild(divColAvailable);
    let inputAvailable = document.createElement("select");
    inputAvailable.classList.add("form-select","available");
    let optionA = document.createElement("option");
    optionA.value = "Si";
    optionA.textContent = "Si";
    inputAvailable.appendChild(optionA);
    let optionB = document.createElement("option");
    optionB.value = "No";
    optionB.textContent = "No";
    inputAvailable.appendChild(optionB);
    available ? inputAvailable.value = "Si" : inputAvailable.value = "No" ;
    inputAvailable.disabled = true;
    divColAvailable.appendChild(inputAvailable);

    //CREAR DIV COL IMG. INSERTAR EN ROW
    let divColImg = document.createElement("div");
    divColImg.classList.add("col-3","p-1");
    divRow.appendChild(divColImg);
    let inputImg = document.createElement("input");
    inputImg.classList.add("form-control","source");
    inputImg.type = "text";
    inputImg.value = source;
    inputImg.disabled = true;
    divColImg.appendChild(inputImg);

    //CREAR DIV COL MODIFY. INSERTAR EN ROW
    let divColModify = document.createElement("div");
    divColModify.classList.add("col-2","p-1");
    divRow.appendChild(divColModify);
    let btnModify = document.createElement("button");
    btnModify.type = "button";
    btnModify.classList.add("btn","btn-secondary");
    btnModify.innerHTML = `<i class="bi bi-pencil"></i>`;
    btnModify.addEventListener("click", () => {
        inputType.toggleAttribute("disabled");
        inputDesc.toggleAttribute("disabled");
        inputPrice.toggleAttribute("disabled");
        inputAvailable.toggleAttribute("disabled");
        inputImg.toggleAttribute("disabled");
    });
    divColModify.appendChild(btnModify);
    let btnRemove = document.createElement("button");
    btnRemove.type = "button";
    btnRemove.classList.add("btn","btn-danger");
    btnRemove.innerHTML = `<i class="bi bi-trash"></i>`;
    btnRemove.addEventListener("click", () => divRow.remove());
    divColModify.appendChild(btnRemove);
}

//FUNCION PARA CREAR MENU Y LISTA DE CONFIGURACION
function createMenuAndSettings(products) {
    //LIMPIAR SECCIONES DEL MENU Y LISTA DE CONFIGURACION
    rowEntradas.innerHTML = "";
    rowPrincipales.innerHTML = "";
    rowPostres.innerHTML = "";
    rowBebidas.innerHTML = "";
    settingsList.innerHTML = "";
    //VOLVER A  LLENAR SECCIONES DEL MENU Y LISTA DE CONFIGURACION
    for (const menuItem of products) {
        createMenuCard(menuItem.type, menuItem.description, menuItem.price, menuItem.available, menuItem.source);
        createSettingsRow(menuItem.type, menuItem.description, menuItem.price, menuItem.available, menuItem.source);
    }
    //AGREGAR FUNCIONALIDAD A TODOS LOS BOTONES PARA AGREGAR AL PEDIDO
    addButtons = document.querySelectorAll(".agregar");
    for (let i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener("click", function() {
            let item = this.description,
                precio = this.price
            ;
            createOrderItem (item,precio);
            updateCart();
            showOrderBtn.classList.remove("disabled");
            showAlert(item);
        })
    }
}

//FUNCION PARA CONSTRUIR ITEMS DEL PEDIDO
function createOrderItem(item, precio) {
    //CREAR EL DIV CON LA INFO DEL PRODUCTO
    let itemContent = document.createElement("div");
    itemContent.innerHTML = `<div class="fw-bold">${item}</div>$${precio}.-`;
    itemContent.classList.add("info-prod","ms-2","me-auto");

    //CREAR EL BOTON PARA REMOVER EL ITEM
    let removeBtn = document.createElement("span");
    removeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon-fill" viewBox="0 0 16 16"><path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/></svg>`;
    removeBtn.classList.add("eliminar","badge","bg-danger");

    //CREAR EL ITEM PARA EL PEDIDO
    let listItem = document.createElement("li");
    listItem.description = item;
    listItem.price = precio;
    listItem.classList.add("list-group-item","d-flex","justify-content-between","align-items-start");
    
    //AGREGAR AL ITEM LA INFO DEL PRODUCTO Y EL BOTON REMOVER
    listItem.appendChild(itemContent);
    listItem.appendChild(removeBtn);
    
    //AGREGAR AL PEDIDO EL ITEM COMPLETO
    orderList.appendChild(listItem);
    
    //AGREGAR FUNCIONALIDAD AL BOTON PARA REMOVER EL ITEM
    removeBtn.addEventListener("click", () => {
        listItem.classList.add("out-item");
        setTimeout(() => {
            listItem.remove();
            updateCart();
            calcCost();
        },800);
    })
}

//FUNCION PARA MOSTRAR-OCULTAR PEDIDO
function toggleOrder() {
    if (showOrderBtn.textContent == "Ver pedido") {
        showSection(orderContainer);
        showOrderBtn.classList.add("disabled");
        setTimeout( () => {
            showOrderBtn.classList.remove("disabled");
            showOrderBtn.textContent = "Ocultar pedido";
        },1000);
    } else {
        hideSection(orderContainer);
        showOrderBtn.classList.add("disabled");
        setTimeout( () => {
            if (showTotalCost.textContent > 0) {
                showOrderBtn.classList.remove("disabled");
            };
            showOrderBtn.textContent = "Ver pedido";
        },1000);
    };
}

//FUNCION PARA ACTUALIZAR COSTO TOTAL Y CONTADOR DE ITEMS
function calcCost() {
    let infoProducts = document.querySelectorAll(".info-prod"),
        prices = [];
    infoProducts.forEach(el => prices.push(parseFloat(el.innerHTML.split("$").pop().slice(0,-2))));
    counter.textContent = prices.length;
    if (prices.length == 0) {
        toggleOrder();
        showTotalCost.textContent = 0;
        showOrderBtn.classList.add("disabled");
    } else {
        showTotalCost.textContent = prices.reduce((acc,curr) => acc+curr);
    }
}

//FUNCION PARA MOSTRAR ALERTA DE ITEM AGREGADO
function showAlert(item) {
    alert.textContent = `Agregado: ${item}`;
    alert.classList.remove("display-none");
    setTimeout(() => {
        alert.classList.add("display-none");
        calcCost();
    },1200);
}

//FUNCION PARA MOSTRAR SECCION
function showSection(section) {
    section.classList.remove("display-none");
    section.classList.add("from-up");
    section.classList.remove("to-up");
}

//FUNCION PARA OCULTAR SECCION
function hideSection(section) {
    section.classList.add("to-up");
    section.classList.remove("from-up");
    setTimeout( () => {
        section.classList.add("display-none");
    },1000);
}

/* --------- */
/* EJECUCION */
/* --------- */
//LEVANTAR CARRITO DE SESSION STORAGE
takeCart();

//CREAR MENU Y LISTA DE CONFIGURACION
createMenuAndSettings(menuItems);

//AGREGAR FUNCIONALIDAD AL BOTON DE VER MENÚ
showMenuBtn.addEventListener("click", () => hideSection(front));

//AGREGAR FUNCIONALIDAD A BOTONES HOME
homeBtns.forEach(el => el.addEventListener("click", () => showSection(front)));

//AGREGAR FUNCIONALIDAD AL BOTON MOSTRAR PEDIDO
showOrderBtn.addEventListener("click", () => toggleOrder());

//AGREGAR FUNCIONALIDAD AL BOTON SETTINGS
settingsBtn.addEventListener("click", () => showSection(logInContainer));

//AGREGAR FUNCIONALIDAD AL BOTON CANCELAR LOG IN
logInCancelBtn.addEventListener("click", () => hideSection(logInContainer));

//AGREGAR FUNCIONALIDAD AL BOTON LOG IN
logInBtn.addEventListener("click", () => {
    hideSection(logInContainer);
    showSection(settingsContainer);
});

//AGREGAR FUNCIONALIDAD AL BOTON GUARDAR CAMBIOS
saveSettingsBtn.addEventListener("click", () => {
    let newMenuItems = [];
    let types = document.querySelectorAll(".type");
    let descriptions = document.querySelectorAll(".description");
    let prices = document.querySelectorAll(".price");
    let availables = document.querySelectorAll(".available");
    let sources = document.querySelectorAll(".source");
    for (let i = 0; i < types.length; i++) {
        let obj = {};
        obj.type = types[i].value;
        obj.description = descriptions[i].value;
        obj.price = parseFloat(prices[i].value);
        availables[i].value === "Si" ? obj.available = true : obj.available = false ;
        obj.source = sources[i].value;
        newMenuItems.push(obj);
    }
    hideSection(settingsContainer);
    createMenuAndSettings(newMenuItems);
    orderList.innerHTML = "";
    updateCart();
})

//AGREGAR FUNCIONALIDAD AL BOTON CANCELAR CAMBIOS
cancelSettingsBtn.addEventListener("click", () => {
    hideSection(settingsContainer);
    createMenuAndSettings(menuItems);
})