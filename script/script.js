/* --------- */
/* VARIABLES */
/* --------- */
let menuItems,
    rowEntradas = document.querySelector("#row-entradas"),
    rowPrincipales = document.querySelector("#row-principales"),
    rowPostres = document.querySelector("#row-postres"),
    rowBebidas = document.querySelector("#row-bebidas"),
    settingsList = document.querySelector("#settings-list"),
    orderList = document.querySelector("#order-list"),
    showOrderBtn = document.querySelector("#show-order-btn"),
    orderContainer = document.querySelector("#order-container"),
    counter = document.querySelector("#counter"),
    sendOrderBtn = document.querySelector("#send-order-btn"),
    totalCost = document.querySelector("#total-cost"),
    front = document.querySelector("#front"),
    showMenuBtn = document.querySelector("#show-menu-btn"),
    alert = document.querySelector("#alert"),
    settingsBtn = document.querySelector("#settings-btn"),
    logInContainer = document.querySelector("#log-in-container"),
    cancelLogInBtn = document.querySelector("#cancel-log-in-btn"),
    logInBtn = document.querySelector("#log-in-btn"),
    settingsContainer = document.querySelector("#settings-container"),
    saveSettingsBtn = document.querySelector("#save-settings-btn"),
    cancelSettingsBtn = document.querySelector("#cancel-settings-btn"),
    order = [],
    addButtons,
    homeBtn = document.querySelector("#home-btn"),
    userInput = document.querySelector("#user-input"),
    passInput = document.querySelector("#pass-input"),
    rememberCheck = document.querySelector("#remember-check"),
    rejectedMessage = document.querySelector("#rejected-message"),
    validUser = {user: "rafafloresok", pass: "rafa1234"},
    getUserData = JSON.parse(localStorage.getItem("userData")),
    totalCostContainer = document.querySelector("#total-cost-container"),
    form = document.querySelector("#form")
;
//CLASE PARA CREAR ITEMS DEL PEDIDO
class OrderItem {
    constructor(description,price) {
        this.description = description;
        this.price = price;
    }
}

/* --------- */
/* FUNCIONES */
/* --------- */
//FUNCIONES PARA LEVANTAR LISTA DE PRODUCTOS
async function getData() {
    const response = await fetch('script/data.json');
    menuItems = await response.json();
    createMenuAndSettings(menuItems);
}
function takeMenuItems() {
    if (!localStorage.getItem("menuItems")) {
        getData();
    } else {
        menuItems = JSON.parse(localStorage.getItem("menuItems"));
        createMenuAndSettings(menuItems);
    }
}

//FUNCION PARA LEVANTAR PEDIDO DE SESSION STORAGE
function takeOrder() {
    order = JSON.parse(sessionStorage.getItem("order")) || [];
    order.forEach(el => {
        createOrderItem(el.description,el.price);
    });
    if (order.length) {
        showOrderBtn.classList.remove("disabled");
        updateOrder();
    }
}

//FUNCION PARA LEVANTAR DATOS DE USUARIO DE LOCAL STORAGE
function takeUserData() {
    if (getUserData != null) {
        userInput.value = getUserData.user;
        passInput.value = getUserData.pass;
    }
}

//FUNCION PARA ACTUALIZAR PEDIDO
function updateOrder(clean) {
    if (clean === "clean") {orderList.innerHTML = ""};
    order = [];
    form.innerHTML = '<input type="hidden" name="_next" value="https://rafafloresok.github.io/ch-javascript/"><input type="hidden" name="_captcha" value="false">'; 
    let listItems = document.querySelectorAll(".list-group-item");
    let prices = [];
    listItems.forEach((el, index) => {
        order.push(new OrderItem(el.description,el.price));
        prices.push(el.price);
        form.innerHTML += `<input class="display-none" type="text" name="${index+1} ${el.description}" value="${el.price}">`;
    });
    sessionStorage.setItem("order",JSON.stringify(order));
    counter.textContent = order.length;
    totalCost.textContent = prices.reduce(((acc,curr) => acc + curr),0);
    if (!order.length) {
        toggleOrder();
        showOrderBtn.classList.add("disabled");
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
    buttonAdd.description = description;
    buttonAdd.price = price;
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
        let {type, description, price, available, source} = menuItem;
        createMenuCard(type, description, price, available, source);
        createSettingsRow(type, description, price, available, source);
    }
    //AGREGAR FUNCIONALIDAD A TODOS LOS BOTONES PARA AGREGAR AL PEDIDO
    addButtons = document.querySelectorAll(".agregar");
    addButtons.forEach(el => {
        el.addEventListener("click", function() {
            let item = this.description,
                precio = this.price
            ;
            createOrderItem (item,precio);
            alert.innerHTML = `Agregado: <span class="fw-bold">${item}</span>`;
            alert.classList.remove("display-none");
            setTimeout(() => {
                updateOrder();
                alert.classList.add("display-none");
                showOrderBtn.classList.remove("disabled");
            },1200);
        })
    });
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
            updateOrder();
        },800);
    })
}

//FUNCION PARA MOSTRAR-OCULTAR PEDIDO
function toggleOrder() {
    if (showOrderBtn.textContent == "Ver pedido" && order.length != 0) {
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
            if (totalCost.textContent > 0) {
                showOrderBtn.classList.remove("disabled");
            };
            showOrderBtn.textContent = "Ver pedido";
            totalCostContainer.classList.remove("send-item");
        },1000);
    };
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
//LEVANTAR PEDIDO DE SESSION STORAGE
takeOrder();

//LEVANTAR DATOS DE USUARIO DE LOCAL STORAGE
takeUserData();

//CREAR MENU Y LISTA DE CONFIGURACION
takeMenuItems();

//AGREGAR FUNCIONALIDAD AL BOTON DE VER MENÚ
showMenuBtn.addEventListener("click", () => hideSection(front));

//AGREGAR FUNCIONALIDAD A BOTON HOME
homeBtn.addEventListener("click", () => showSection(front));

//AGREGAR FUNCIONALIDAD AL BOTON MOSTRAR PEDIDO
showOrderBtn.addEventListener("click", () => toggleOrder());

//AGREGAR FUNCIONALIDAD AL BOTON ENVIAR PEDIDO
sendOrderBtn.addEventListener("click", () => {
    let listItems = document.querySelectorAll(".list-group-item");
    for (let i = 0; i < listItems.length; i++) {
        let factor = 150;
        let time = i*factor;
        setTimeout(() => {
            listItems[i].classList.add("send-item");
            if (i == listItems.length-1) {
                setTimeout(() => {
                    totalCostContainer.classList.add("send-item");
                    setTimeout(() => {
                        Swal.fire({
                            title: 'Pedido enviado',
                            text: 'En caso de requerirlo puede realizar otro pedido.',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                        });
                        console.dir(form);
                        form.submit();
                        updateOrder("clean");
                    }, 300);
                }, factor);
            }
        }, time);
    }
});

//AGREGAR FUNCIONALIDAD AL BOTON SETTINGS
settingsBtn.addEventListener("click", () => showSection(logInContainer));

//AGREGAR FUNCIONALIDAD AL BOTON CANCELAR LOG IN
cancelLogInBtn.addEventListener("click", () => {
    hideSection(logInContainer);
    rejectedMessage.classList.add("display-none");
});

//AGREGAR FUNCIONALIDAD AL BOTON LOG IN
logInBtn.addEventListener("click", () => {
    let userData = {user: userInput.value, pass: passInput.value};
    if (userData.user == validUser.user && userData.pass == validUser.pass) {
        rejectedMessage.classList.add("display-none");
        rememberCheck.checked ? localStorage.setItem("userData", JSON.stringify(userData)) : localStorage.removeItem("userData");
        hideSection(logInContainer);
        showSection(settingsContainer);
    } else {
        rejectedMessage.classList.remove("display-none");
    }
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
    localStorage.setItem("menuItems",JSON.stringify(newMenuItems));
    hideSection(settingsContainer);
    setTimeout(() => {
        createMenuAndSettings(newMenuItems);
        updateOrder("clean");
        
    }, 3500);
    Swal.fire({
        title: 'Cambios guardados',
        text: 'El menú fue actualizado.',
        icon: 'success',
        showConfirmButton: false,
        timer: 3500
    });
});

//AGREGAR FUNCIONALIDAD AL BOTON CANCELAR CAMBIOS
cancelSettingsBtn.addEventListener("click", () => {
    hideSection(settingsContainer);
    Swal.fire({
        title: 'No se han guardado los cambios',
        text: 'En caso de haber hecho cambios, no se verán reflejados en el menú.',
        icon: 'warning',
        showConfirmButton: false,
        timer: 3500
    });
});
