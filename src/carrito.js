function carritoVacio() {
    const contCarritoVacio = document.createElement("div");
    contCarritoVacio.classList.add("cont-Carrito-Vacio")

    contCarritoVacio.innerHTML = `
                                  <h2>El carrito está vacio!</h2>
                                  <a href="index.html">Agregar</a>
    `
    contenedorPedido.appendChild(contCarritoVacio);
}

function headerCarrito() {
     // crea cabecera categoria 
     const headerCategoDom = document.createElement("div");
     headerCategoDom.classList.add("cont-pedido");
     headerCategoDom.innerHTML = `
       <h2>Pedido</h2>
       <button class="btn-cerrar-menu" type="button">X</button>
     `
     
     contenedorPedido.appendChild(headerCategoDom);
}

function cerrarCarrito() {
    // btnCerrar
const btnCerrar = document.querySelector(".btn-cerrar-menu");

btnCerrar.addEventListener("click", function(){
  contenedorPedido.innerHTML = '';
  contenedorPedido.style.display = "none"
})
}

