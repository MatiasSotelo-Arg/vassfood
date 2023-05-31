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
                            <p> $${p.precioUnidad}</p> 
                          </div>
                          <div> 
                            <p>Media</p>
                            <input type="checkbox" id="precioMedia" value="first_checkbox">
                            <p> $${p.precioMedia}</p> 
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
                                        <input id="carrito-${prod.id}" class="card-btn" type="submit" value="Agregar">
                                      </div>
                                    </div>
                                `   
                              
                                contenedorCategorias.appendChild(cardMenu);

                                const btnCarrito = cardMenu.querySelector(`#carrito-${prod.id}`);
        

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
              if (prod.rubro === "empanadas") {
                nombre = `${prod.rubro} ${prod.nombre} (Docena)`;
              } else {
                nombre = `${prod.rubro} ${prod.nombre} (Entera)`;
              }
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
        
        // Agrega el producto al carrito
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

          const contador = document.querySelector("#contador");
          contador.textContent = "✓";
          contador.style.display = "inline";

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
  pedido.forEach(prod => {

    const cardPedido = document.createElement("div");
    cardPedido.classList.add("card-pedido", prod.id);
  
    cardPedido.innerHTML = `
      <div>
        <h2>${prod.nombre}</h2>
        <strong>$${prod.precio}</strong>
      </div>
      <input id=${prod.id} type="submit" value="X" class="btnXPedido">
    `;
  
    const btnSacarPedido = cardPedido.querySelector(`#${prod.id}`);
  
    // btn cerrar
    btnSacarPedido.addEventListener('click', function() {
      const indice = pedido.findIndex(elemento => elemento.id === prod.id);
      if (indice !== -1) {
        pedido.splice(indice, 1);
        console.log(`Elemento con ID ${prod.id} eliminado del pedido.`);
  
        // Eliminar el elemento del DOM
        const elementoEliminar = document.querySelector(`.${prod.id}`);
        if (elementoEliminar) {
          elementoEliminar.remove();
  
          // Recalcular el precio total
          let precioTotal = pedido.reduce((total, producto) => total + Number(producto.precio), 0);
  
          // Actualizar el elemento del DOM que muestra el total
          totalCarrito.innerHTML = `Total: $${precioTotal}`;
        }
      }
    });
  
    contenedorPedido.appendChild(cardPedido);

  });
  
  // calcular totalCarrito;
  let precioTotal = pedido.reduce((total, producto) => total + Number(producto.precio), 0);
  
  const totalCarrito = document.createElement("strong");
  totalCarrito.classList.add("totalPedido")
  
  totalCarrito.innerHTML = `Total: $${precioTotal}`;
  contenedorPedido.appendChild(totalCarrito);

  const infoPedido = document.createElement("div");
  infoPedido.classList.add("informacion-pedido")

  infoPedido.innerHTML = `

                          <p class="alerta"></p>

                          <div class="cont-checkbox">
                            <div class="checkDelivery"> 
                              <input type="checkbox" id="delivery" value="delivery"> 
                              <p>Delivery</p>
                            </div>

                            <div class="checkRetira"> 
                              <input type="checkbox" id="retiro_local" value="retiro_local">
                              <p>Retiro en Local</p>
                            </div>   
                          </div>

                        `
  
  contenedorPedido.appendChild(infoPedido);

  const checkboxDelivery = document.getElementById("delivery");
  const checkboxRetiroLocal = document.getElementById("retiro_local");
  const contDelivery = document.createElement("div");
  contDelivery.classList.add("cont-delivery");

  const btnConfirmar = document.createElement("input");
  btnConfirmar.type = "submit";
  btnConfirmar.value = "confimar";
  btnConfirmar.id = "btn-confirmar-pedido"
  

  // activar contenedor delivery
  if (checkboxDelivery) {
    checkboxDelivery.addEventListener('change', function() {
      if (checkboxDelivery.checked) {
        contDelivery.innerHTML = `

          <div> 
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" id="nombre"  required="required">
          </div>
          
          <div>   
            <label for="tel">Telefono</label>
            <input type="text" name="tel" id="tel" required="required">
          </div> 

          <div>   
            <label for="direccion">Dirección</label>
            <input type="text" name="direccion" id="direccion" required="required">
          </div> 
          
          <div>   
            <label for="calles">Entre Calles</label>
            <input type="calles" name="calles" id="calles" required="required">
          </div> 

          <div> 
            <p>Algún comentario?</p>
            <textarea name="textarea" id="textarea" cols="30" rows="5" placeholder="Ejemplo: Sin cebolla, abono justo, etc..."></textarea>
          </div>

        `;

        const alerta = document.querySelector(".alerta");

        alerta.innerHTML = ""

        btnConfirmar.remove();
      
        contenedorPedido.appendChild(contDelivery);

        contenedorPedido.appendChild(btnConfirmar);

        
        checkboxRetiroLocal.checked = false; // Desmarcar checkbox de retiro local

      } else {
        contDelivery.remove();
      }

    });

    contenedorPedido.appendChild(btnConfirmar)
  }

  // desactivar contenedor delivery si se selecciona retiro local
  if (checkboxRetiroLocal) {

    checkboxRetiroLocal.addEventListener('change', function() {
      
      if (checkboxRetiroLocal.checked) {
        checkboxDelivery.checked = false; // Desmarcar checkbox de entrega
        contDelivery.remove();

        const alerta = document.querySelector(".alerta");

        alerta.innerHTML = ""
      }

    });

  }


  // btnCerrar
  const btnCerrar = document.querySelector(".btn-cerrar-menu");

  btnCerrar.addEventListener("click", function(){
    contenedorPedido.innerHTML = '';
    contenedorPedido.style.display = "none"
  })

  // valdiar checkbox delivery/retira
  btnConfirmar.addEventListener('click', function() {

    const alerta = document.querySelector(".alerta");

    alerta.innerHTML = ""

    let pedidoAprobado = false;

    if(!checkboxDelivery.checked && !checkboxRetiroLocal.checked) {
      
      alerta.innerHTML = "Seleccione una opción!"

    } 


    if(checkboxDelivery.checked) {
      const campos = [
        { input: document.querySelector("#nombre"), validar: valor => valor.length > 0 },
        { input: document.querySelector("#tel"), validar: valor => valor.length > 0 },
        { input: document.querySelector("#direccion"), validar: valor => valor.length > 0 },
        { input: document.querySelector("#calles"), validar: valor => valor.length > 0 }
      ];
      
      let alertaMostrada = false

      campos.forEach(campo => {
        if (!campo.validar(campo.input.value)) {
          campo.input.classList.add("campo-invalido");
          if (!alertaMostrada) {
            alert("Complete todos los campos");
            alertaMostrada = true; 
          }
        } else {
          campo.input.classList.remove("campo-invalido");
        }
      });

      if(!alertaMostrada) {
        pedidoAprobado  = true;
      }

      const nombreInput = document.querySelector("#nombre");
      const telInput = document.querySelector("#tel");
      const direccionInput = document.querySelector("#direccion");
      const callesInput = document.querySelector("#calles");
      const textareaInput = document.querySelector("#textarea");

      const nombre = nombreInput.value;
      const telefono = telInput.value;
      const direccion = direccionInput.value;
      const calles = callesInput.value; 
      const textarea = textareaInput.value; 

      let textoDomicilio = `Pedido de:%0A- ${nombre}%0ADireccion:%0A- ${direccion}%0AEntre:%0A- ${calles}%0ATelefono:%0A- ${telefono}%0AObservaciones: %0A- ${textarea}`;

      mensajePedido(textoDomicilio,pedidoAprobado,precioTotal);
    } 


    if(checkboxRetiroLocal.checked) {
      pedidoAprobado = true;

      let textoDomicilio = '' 
      
      mensajePedido(textoDomicilio,pedidoAprobado,precioTotal)
    }
  })

})

function mensajePedido (txtDomicilio,pedAprobado,preTotal) {
  if(pedAprobado) {
    // generarMensajePedido
    let textoPedido = "Mi pedido:%0A";
  
    pedido.forEach( prod =>  {
      textoPedido += `- ${prod.cantidad} x ${prod.nombre} $${prod.precio}%0A`
    })
  
    textoPedido+= `Total: $${preTotal}`
  
    textoPedido+= txtDomicilio;
  
    const apiUrl = `https://api.whatsapp.com/send?phone=+5493794801475&text=${textoPedido}`;
    
    window.open(apiUrl);
  
    console.log(textoPedido)
  }
  
}




















