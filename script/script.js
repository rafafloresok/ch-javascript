/* VARIABLES */
let addButtons = document.querySelectorAll(".agregar");
let orderList = document.querySelector("ol");
let showOrderBtn = document.querySelector(".btn-info");
let orderContainer = document.querySelector(".container--pedido");

/* CLASE PARA CONSTRUIR ITEMS DEL PEDIDO */
class orderItem {
    constructor(item, precio) {
        this.crearDiv(item, precio);
    }
    crearDiv(item, precio) {
        /* CREAR EL DIV CON LA INFO DEL PRODUCTO */
        let itemContent = document.createElement("div");
        itemContent.innerHTML = `<div class="fw-bold">${item}</div>${precio}`;
        itemContent.classList.add("ms-2","me-auto");

        /* CREAR EL BOTON PARA REMOVER DEL PEDIDO */
        let removeBtn = document.createElement("span");
        removeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-octagon-fill" viewBox="0 0 16 16"><path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/></svg>`;
        removeBtn.classList.add("badge","bg-primary");

        /* CREAR EL ITEM PARA EL PEDIDO */
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item","d-flex","justify-content-between","align-items-start");
        
        /* AGREGAR AL ITEM LA INFO DEL PRODUCTO Y EL BOTON REMOVER */
        listItem.appendChild(itemContent);
        listItem.appendChild(removeBtn);
        
        /* AGREGAR AL PEDIDO EL ITEM COMPLETO */
        orderList.appendChild(listItem);
        
        /* AGREGAR FUNCIONALIDAD AL BOTON PARA REMOVER DEL PEDIDO */
        removeBtn.addEventListener("click", function () {
            listItem.remove();
        })
        
    }
}

/* AGREGAR FUNCIONALIDAD A TODOS LOS BOTONES PARA AGREGAR AL PEDIDO */
for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function() {
        let item = this.parentElement.childNodes[1].textContent;
        let precio = this.parentElement.childNodes[3].textContent;
        new orderItem (item,precio);
    })
}

/* AGREGAR FUNCIONALIDAD AL BOTON MOSTRAR PEDIDO */
showOrderBtn.addEventListener("click", function () {
    orderContainer.classList.toggle("display-none")
})