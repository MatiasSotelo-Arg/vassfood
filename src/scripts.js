function bannerPromocion () {
    const contPromo = document.querySelector(".contenedor-promociones");
    const promo = document.createElement("img");
    promo.alt = "promociones vassfood";
    promo.classList.add("promo-img");

    let contador = 1;

    promo.src = `assets/promos/promo${contador}.jpg`;

    function incrementarContador() {
    if (contador === 3) {
        contador = 1;
    } else {
        contador++;
    }

    promo.src = `assets/promos/promo${contador}.jpg`;

    }

    setInterval(incrementarContador, 2500);

    contPromo.appendChild(promo);
    
}
  
bannerPromocion();
  
// capturarRubros
const rubrosMenu = [];

let id = 0; 

menu.forEach(prod => {
  if(!rubrosMenu.find(rubro => rubro.nombre === prod.rubro)) {
    rubrosMenu.push({ nombre: prod.rubro, img: prod.img, id: id });
    id++;
  }
});

console.log(rubrosMenu);

// muestraCategoriasDom
const contProducto = document.querySelector("#cont-categorias");

rubrosMenu.forEach(prod => {

  const contRubros = document.createElement("div");
  contRubros.classList.add("card-rubro");

  contRubros.innerHTML = `                 
                      <img src="assets/img/productos/${prod.img}.jpg" alt="${prod.nombre}">
                      <input id="cat-${prod.id}" type="submit" value="${prod.nombre}"> 
                    `

  const submitBtn = contRubros.querySelector(`#cat-${prod.id}`);
  
  // Click rubro
  submitBtn.addEventListener('click', function() {

      console.log(`click ${prod.nombre}`);

      // muestraMenuDom
      const contenedorCategorias = document.querySelector(".contenedor-menu");

      contenedorCategorias.style.display = "block"

      // agregaProductosCategoria
      function agregarProductosCategoria () {

        let codificarCategoria = rubrosMenu[prod.id].nombre;

        const mostrarProductos = menu.filter(prod => prod.rubro ===  codificarCategoria)

        console.log(`click ${prod.id}`)

        return mostrarProductos;
      }

      const producto = agregarProductosCategoria();

      // crea cabecera categoria 
      const headerCategoDom = document.createElement("div");
      headerCategoDom.classList.add("cont-categoria");
      headerCategoDom.innerHTML = `
        <h2>${prod.nombre}</h2>
        <button class="btn-cerrar-categoria" type="button">X</button>
      `
      contenedorCategorias.appendChild(headerCategoDom);
       
      

      let url = "assets//img//productos//"

      producto.forEach( prod => {
        contenedorCategorias.innerHTML += `<div class="card-menu"> 
                                    <div class="card-img"> 
                                      <img class="menu-img" src="${url}${prod.img}.jpg"> 
                                    </div>
                                    <div class="card-info"> 
                                      <h2> ${prod.nombre}</h2>
                                      <p class="descripcion">${prod.descripcion}<p>
                                      <p> $${prod.precioUnidad}<p>
                                    </div>
                                </div>`
      })


      // cerrar cabecera categoria
      const btnCerrarCatego = document.querySelector(".btn-cerrar-categoria");
      btnCerrarCatego.addEventListener("click", function() {
        contenedorCategorias.innerHTML = '';
        contenedorCategorias.style.display = 'none';
      })
    })
  contProducto.appendChild(contRubros);	
});
	


