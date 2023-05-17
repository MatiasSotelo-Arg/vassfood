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

const pedido = [];

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

        // const mostrarProductos = menu.filter(prod => prod.rubro ===  codificarCategoria)

        const mostrarProductos = menu.filter(prod => prod.rubro === codificarCategoria).map((producto, index) => {
          producto.id = index + 1; // Asignar un ID único a cada producto
          return producto;
        });

        console.log(`click ${prod.id}`);

        return mostrarProductos;
      }

      const producto = agregarProductosCategoria();

      console.log(producto)

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
        
        const cardMenu = document.createElement("div");

        cardMenu.classList.add("card-menu");

        function calcularOpciones (p) {

          if (p.rubro === "pizza") {
            
            let opcion = `<div> 
                            <p>Entera</p>
                            <input type="checkbox" id="precioUnidad" value="first_checkbox">
                            <p>$${p.precioUnidad}</p> 
                          </div>
                          <div> 
                            <p>Media</p>
                            <input type="checkbox" id="precioMedia" value="first_checkbox">
                            <p>$${p.precioMedia}</p> 
                          </div>
                          `

            return opcion;
          } else if (p.rubro === "empanadas") {

            let opcion = `<div> 
                            <p>Docena</p>
                            <input type="checkbox" id="precioUnidad" value="first_checkbox">
                            <p>$${p.precioUnidad}</p> 
                          </div>
                          <div> 
                            <p>Media</p>
                            <input type="checkbox" id="precioMedia" value="first_checkbox">
                            <p>$${p.precioMedia}</p> 
                          </div>
                          `

            return opcion;

          } else {
            let opcion = `<p>$${p.precioUnidad} </p>`
            return opcion;  
          }
                   
        }

        let opciones = calcularOpciones(prod);
        

        cardMenu.innerHTML = `
                                    <div class="card-img"> 
                                      <img class="menu-img" src="${url}${prod.img}.jpg"> 
                                    </div>
                                    <div class="card-info"> 
                                      <h2> ${prod.nombre}</h2>
                                      <p class="descripcion">${prod.descripcion}<p>
                                      <div class="cont-btn"> 
                                        <p> ${opciones}</p>
                                        <input id="carrito-${prod.id}" type="submit" value="Agregar">
                                      </div>
                                    </div>
                                `   
                              
                                contenedorCategorias.appendChild(cardMenu)

                           
                                // const btnCarrito = cardMenu.querySelector(`#carrito-${prod.id}`);
                                // const checkboxUnidad = document.getElementById('precioUnidad');
                                // const checkboxMedia = document.getElementById('precioMedia');
                                
                                // let nombre;
                                // let precio;
                                
                                // // Agrega un event listener para detectar el clic en el checkbox de la unidad
                                // checkboxUnidad.addEventListener('click', function() {
                                //   if (checkboxUnidad.checked) {
                                //     console.log('Se hizo clic en el checkbox de la unidad');
                                //     // Asigna el nombre y precio correspondientes
                                //     nombre = `${prod.rubro} ${prod.nombre} (Unidad)`;
                                //     precio = `${prod.precioUnidad}`;
                                //     checkboxMedia.checked = false; // Desmarca el checkbox de la media
                                //   }
                                // });
                                
                                // // Agrega un event listener para detectar el clic en el checkbox de la media
                                // checkboxMedia.addEventListener('click', function() {
                                //   if (checkboxMedia.checked) {
                                //     console.log('Se hizo clic en el checkbox de la media');
                                //     // Asigna el nombre y precio correspondientes
                                //     nombre = `${prod.rubro} ${prod.nombre} (Media)`;
                                //     precio = `${prod.precioMedia}`;
                                //     checkboxUnidad.checked = false; // Desmarca el checkbox de la unidad
                                //   }
                                // });
                                
                                // btnCarrito.addEventListener("click", function() {
                                //   if (nombre !== undefined && precio !== undefined) {
                                //     let cantidad = 1;
                                //     pedido.push({ nombre: nombre, precio: precio, cantidad: cantidad });
                                //     console.log(pedido);
                                //     nombre = undefined; // Reinicia el valor de nombre
                                //     precio = undefined; // Reinicia el valor de precio
                                //     checkboxUnidad.checked = false; // Desmarca el checkbox de la unidad
                                //     checkboxMedia.checked = false; // Desmarca el checkbox de la media
                                //   } else {
                                //     console.log('No se ha seleccionado ninguna opción');
                                //   }
                                // });

                                const btnCarrito = cardMenu.querySelector(`#carrito-${prod.id}`);
        
        // const checkboxUnidad = document.getElementById('precioUnidad');
        // const checkboxMedia = document.getElementById('precioMedia');

        // let nombre;
        // let precio;

        // // Agrega un event listener para detectar el clic en el checkbox de la unidad
        // checkboxUnidad.addEventListener('click', function() {
        //   if (checkboxUnidad.checked) {
        //     console.log('Se hizo clic en el checkbox de la unidad');
        //     // Asigna el nombre y precio correspondientes
        //     nombre = `${prod.rubro} ${prod.nombre} (Unidad)`;
        //     precio = `${prod.precioUnidad}`;
        //     checkboxMedia.checked = false; // Desmarca el checkbox de la media
        //   }
        // });

        // // Agrega un event listener para detectar el clic en el checkbox de la media
        // checkboxMedia.addEventListener('click', function() {
        //   if (checkboxMedia.checked) {
        //     console.log('Se hizo clic en el checkbox de la media');
        //     // Asigna el nombre y precio correspondientes
        //     nombre = `${prod.rubro} ${prod.nombre} (Media)`;
        //     precio = `${prod.precioMedia}`;
        //     checkboxUnidad.checked = false; // Desmarca el checkbox de la unidad
        //   }
        // });

        // btnCarrito.addEventListener("click", function() {
        //   let cantidad = 1;
        //   if (nombre && precio) {
        //     pedido.push({ nombre: nombre, precio: precio, cantidad: cantidad });
        //     console.log(pedido);
        //     nombre = undefined; // Reinicia el valor de nombre
        //     precio = undefined; // Reinicia el valor de precio
        //     checkboxUnidad.checked = false; // Desmarca el checkbox de la unidad
        //     checkboxMedia.checked = false; // Desmarca el checkbox de la media
        //   } else {
        //     nombre = `${prod.rubro} ${prod.nombre}`;
        //     precio = `${prod.precioUnidad}`;
        //     pedido.push({ nombre: nombre, precio: precio, cantidad: cantidad });
        //     console.log(pedido);
        //     nombre = undefined; // Reinicia el valor de nombre
        //     precio = undefined; // Reinicia el valor de precio
        //   }
        // });

        const checkboxUnidad = document.getElementById('precioUnidad');
        const checkboxMedia = document.getElementById('precioMedia');
        
        let nombre;
        let precio;
        
        // Verifica si checkboxUnidad existe antes de agregar el event listener
        if (checkboxUnidad) {
          checkboxUnidad.addEventListener('click', function() {
            if (checkboxUnidad.checked) {
              console.log('Se hizo clic en el checkbox de la unidad');
              // Asigna el nombre y precio correspondientes
              nombre = `${prod.rubro} ${prod.nombre} (Unidad)`;
              precio = `${prod.precioUnidad}`;
              checkboxMedia.checked = false; // Desmarca el checkbox de la media
            }
          });
        }
        
        // Agrega el event listener solo si checkboxMedia existe
        if (checkboxMedia) {
          checkboxMedia.addEventListener('click', function() {
            if (checkboxMedia.checked) {
              console.log('Se hizo clic en el checkbox de la media');
              // Asigna el nombre y precio correspondientes
              nombre = `${prod.rubro} ${prod.nombre} (Media)`;
              precio = `${prod.precioMedia}`;
              checkboxUnidad.checked = false; // Desmarca el checkbox de la unidad
            }
          });
        }
        
        btnCarrito.addEventListener("click", function() {
          let cantidad = 1;
          if (nombre && precio) {
            pedido.push({ nombre: nombre, precio: precio, cantidad: cantidad });
            console.log(pedido);
            nombre = undefined; // Reinicia el valor de nombre
            precio = undefined; // Reinicia el valor de precio
            if (checkboxUnidad) checkboxUnidad.checked = false; // Desmarca el checkbox de la unidad si existe
            if (checkboxMedia) checkboxMedia.checked = false; // Desmarca el checkbox de la media si existe
          } else {
            nombre = `${prod.rubro} ${prod.nombre}`;
            precio = `${prod.precioUnidad}`;
            pedido.push({ nombre: nombre, precio: precio, cantidad: cantidad });
            console.log(pedido);
            nombre = undefined; // Reinicia el valor de nombre
            precio = undefined; // Reinicia el valor de precio
          }
        });
                        


                                
      })   

      

      
      // contenedorCategorias.addEventListener('click', function(event) {
      //   const target = event.target;
        
      //   if (target.matches('input[type="submit"]')) {
      //     // El evento corresponde a un botón de agregar
      //     const id = target.id.split('-')[1]; // Obtener el ID del producto

      //     pedido.push(producto[(id-1)])

      //     // console.log(pedido)
      //     const contador = document.querySelector("#contador");
      //     contador.textContent = "✓";
      //     contador.style.display = "inline";

      //     console.log(pedido);

      //   }
      // });
             
      

      // cerrar cabecera categoria
      const btnCerrarCatego = document.querySelector(".btn-cerrar-categoria");
      btnCerrarCatego.addEventListener("click", function() {
        contenedorCategorias.innerHTML = '';
        contenedorCategorias.style.display = 'none';
      })
    })
  contProducto.appendChild(contRubros);	

});

// mostrarPedidoEnDom
const contPedido = document.querySelector(".logo-pedido");
const contenedorPedido = document.querySelector(".contenedor-pedido");
  

contPedido.addEventListener("click", function(){
  contenedorPedido.style.display = "block";

  // crea cabecera categoria 
  const headerCategoDom = document.createElement("div");
  headerCategoDom.classList.add("cont-pedido");
  headerCategoDom.innerHTML = `
    <h2>Pedido</h2>
    <button class="btn-cerrar-menu" type="button">X</button>
  `
  
  contenedorPedido.appendChild(headerCategoDom);

  // Mostrar pedido en carrito
  pedido.forEach( prod => {

    const cardPedido = document.createElement("div");
    cardPedido.classList.add("card-pedido");

    // img:
    // rubro: 
    // nombre: 
    // descripcion: 
    // precioUnidad:
    // precioMedia:

    // if(prod.precioU === undefined ) {
    //   let precios = `
    //   <input type="checkbox" value="figazzas lomo"> <p>$${prod.precioM}</>
    //   <p>$${prod.precioU}</>
    //   `
    // } 
    
    cardPedido.innerHTML = `
                          
                            <h2>${prod.nombre}</h2>
                            
                            <p>$${prod.precio}</>
                            

      
      `
    
    contenedorPedido.appendChild(cardPedido);
    console.log("hola?")
  })

  const btnCerrar = document.querySelector(".btn-cerrar-menu");

  btnCerrar.addEventListener("click", function(){
    contenedorPedido.innerHTML = '';
    contenedorPedido.style.display = "none"
  })

})

  










