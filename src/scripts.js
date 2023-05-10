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

menu.forEach(prod => {
  if(!rubrosMenu.find(rubro => rubro.nombre === prod.rubro)) {
    rubrosMenu.push({ nombre: prod.rubro, img: prod.img });
  }
});

console.log(rubrosMenu);

// muestraCategoriasDom
const contRubros = document.querySelector(".rubros");

rubrosMenu.forEach( prod => {
    contRubros.innerHTML += `<div class="card-rubro"> 
                                <h2> ${prod.nombre}</h2>
                            </div>`
})

// muestraMenuDom
const rubros = document.querySelector(".contenedor-menu");
let url = "assets//img//productos//"

menu.forEach( prod => {
    rubros.innerHTML += `<div class="card-menu"> 
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