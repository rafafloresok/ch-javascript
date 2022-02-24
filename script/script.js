let addButtons = document.querySelectorAll(".agregar");
let pedido = [];
let costoTotal = 0;

for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener("click", function() {
        let item = this.parentElement.childNodes[1].textContent;
        let precio = this.parentElement.childNodes[3].textContent;
        pedido.push([item,precio]);
        costoTotal += Number(precio.slice(1,(precio.length)-2));
        console.clear();
        console.log("PEDIDO ACTUALIZADO:");
        for (let j = 0; j < pedido.length; j++) {
            console.log(`Item: ${pedido[j][0]} - Precio: ${pedido[j][1]}`);
        }
        console.log(`COSTO TOTAL: $${costoTotal}.-`);
    })
}