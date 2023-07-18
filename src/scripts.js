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
        
        const cardMenu = document.createElement("div");

        cardMenu.classList.add("card-menu");

        function calcularOpciones (p) {

          if (p.rubro === "pizza") {
            
            let opcion = `<div> 
                            <p>Entera</p>
                            <input type="checkbox" id="precioUnidad" value="first_checkbox">
                            <p class="precio"> $${p.precioUnidad}</p> 
                          </div>
                          <div> 
                            <p>Media</p>
                            <input type="checkbox" id="precioMedia" value="first_checkbox">
                            <p class="precio"> $${p.precioMedia}</p> 
                          </div>
                          `

            return opcion;
          } else if (p.rubro === "empanadas") {

            let opcion = `<div> 
                            <p>Docena</p>
                            <input type="checkbox" id="precioUnidad" value="first_checkbox">
                            <p class="precio"> $${p.precioUnidad}</p> 
                          </div>
                          <div> 
                            <p>Media</p>
                            <input type="checkbox" id="precioMedia" value="first_checkbox">
                            <p class="precio"> $${p.precioMedia}</p> 
                          </div>
                          `

            return opcion;

          } else if (p.rubro === "tartas y calzone"){

            let opcion = `<div> 
                            <p>Tarta</p>
                            <input type="checkbox" id="precioUnidad" value="first_checkbox">
                            <p class="precio"> $${p.precioUnidad}</p> 
                          </div>
                        
            `  
          //   <div> 
          //   <p>Calzone</p>
          //   <input type="checkbox" id="precioMedia" value="first_checkbox">
          //   <p class="precio"> $${p.precioMedia}</p> 
          // </div>

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
        

        const checkboxUnidad = cardMenu.querySelector('#precioUnidad');
        const checkboxMedia = cardMenu.querySelector('#precioMedia');
        
        let nombre;
        let precio;
        
        if(checkboxMedia) {

          checkboxMedia.addEventListener('click', () => {
            
              if (prod.rubro === "empanadas") {
                nombre = `${prod.rubro} ${prod.nombre} media docena`;
                precio = `${prod.precioMedia}`;
              }
  
              if (prod.rubro === "pizza") {
                nombre = `Media ${prod.rubro} ${prod.nombre}`;
                precio = `${prod.precioMedia}`;
              }

              if (prod.rubro === "tartas y calzone") {
                nombre = `calzone ${prod.rubro} ${prod.nombre}`;
                precio = `${prod.precioMedia}`;
              }

              console.log("checkboxMedia")
            
          })
          
        }
      
        if(checkboxUnidad) {

          checkboxUnidad.addEventListener('click', () => { 
            if (prod.rubro === "empanadas") {
              nombre = `${prod.rubro} ${prod.nombre} una docena`;
              precio = `${prod.precioUnidad}`;
            }
  
            if (prod.rubro === "pizza") {
              nombre = `${prod.rubro} ${prod.nombre}`;
              precio = `${prod.precioUnidad}`;
            }

            if (prod.rubro === "tartas y calzone") {
              nombre = `${prod.rubro} ${prod.nombre}`;
              precio = `${prod.precioUnidad}`;
            }

            console.log("checkboxMedia")

          })
  
        }

        // Agrega el producto al carrito
        btnCarrito.addEventListener("click", function() {
          let cantidad = 1;

          // Verifica si checkboxUnidad está marcado
          if (checkboxUnidad && checkboxUnidad.checked) {
            pedido.push({ nombre: nombre, precio: precio, cantidad: cantidad });
          }

          // Verifica si checkboxMedia está marcado
          if (checkboxMedia && checkboxMedia.checked) {
            pedido.push({ nombre: nombre, precio: precio, cantidad: cantidad });
          }

          // Verifica si ni checkboxUnidad ni checkboxMedia están marcados
          if (!checkboxUnidad && !checkboxMedia) {
            nombre = `${prod.rubro} ${prod.nombre}`;
            precio = `${prod.precioUnidad}`;
            pedido.push({ nombre: nombre, precio: precio, cantidad: cantidad });
          }

          // Desmarca los checkboxes
          if (checkboxUnidad) checkboxUnidad.checked = false;
          if (checkboxMedia) checkboxMedia.checked = false;

          const contador = document.querySelector("#contador");
          contador.textContent = "✓";
          contador.style.display = "inline";

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: `¡Se agregó al carrito!\n${prod.nombre}`,
            showConfirmButton: false,
            timer: 1500
          });
        });


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

// mostrarPedidoEnDom
const contPedido = document.querySelector(".logo-pedido");
const contenedorPedido = document.querySelector(".contenedor-pedido");
  

contPedido.addEventListener("click", function(){
  contenedorPedido.style.display = "block";

  headerCarrito();

  cerrarCarrito();

   // Mostrar pedido en carrito
  if(pedido.length === 0) {

    carritoVacio()

  } else {
    
  pedido.forEach(prod => {

    const cardPedido = document.createElement("div");
    cardPedido.classList.add("card-pedido", prod.id);
  
    cardPedido.innerHTML = `
      <div class="detalle-pedido">
        <h2>${prod.nombre}</h2>
        <strong>$${prod.precio}</strong>
      </div>
      <input id=${prod.id} type="submit" value="X" class="btnXPedido">
    `;
  
    const btnSacarPedido = cardPedido.querySelector(`#${prod.id}`);
  
    // btnSacarPedido
    btnSacarPedido.addEventListener('click', function() {
      const indice = pedido.findIndex(elemento => elemento.id === prod.id);
      if (indice !== -1) {
        pedido.splice(indice, 1);
  
        // Eliminar el elemento del DOM
        const elementoEliminar = document.querySelector(`.${prod.id}`);
        if (elementoEliminar) {
          elementoEliminar.remove();
  
          // Recalcular el precio total
          let precioTotalCarrito = calcularTotalCarrito();
  
          // Actualizar el elemento del DOM que muestra el total
          totalCarrito.innerHTML = `Total: $${precioTotalCarrito}`;
        }
      }
      
      if(pedido.length === 0) {
        
        contenedorPedido.innerHTML = ""

        headerCarrito();
        carritoVacio();
        cerrarCarrito();
      }
    });
    
    contenedorPedido.appendChild(cardPedido);

  });
  
  // calcular totalCarrito;
  let precioTotalCarrito = calcularTotalCarrito();
  
  const totalCarrito = document.createElement("strong");
  totalCarrito.classList.add("totalPedido")
  
  totalCarrito.innerHTML = `Total: $${precioTotalCarrito}`;
  contenedorPedido.appendChild(totalCarrito);

  const infoPedido = document.createElement("div");
  infoPedido.classList.add("informacion-pedido")

  infoPedido.innerHTML = `

                          <p class="alerta"></p>

                          <div class="cont-checkbox">
                            <div class="checkDelivery"> 
                              <input type="checkbox" id="delivery" value="delivery"> 
                              <label class="opcion-pedido" for="delivery">Delivery</label>
                            </div>

                            <div class="checkRetira"> 
                              <input type="checkbox" id="retiro_local" value="retiro_local">
                              <label class="opcion-pedido" for="retiro_local">Retiro en Local</label>
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
            
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Complete todos los campos',
              showConfirmButton: false,
              timer: 1500
            })

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

      let observacion;

      if(textarea.trim() === "") {
        observacion = "";
      } else {
        observacion = `Observaciones: ${textarea}`
      }

      let textoDomicilio = `%0APedido de:%0A- ${nombre}%0ADireccion:%0A- ${direccion}%0AEntre:%0A- ${calles}%0ATelefono:%0A- ${telefono}%0A- ${observacion}%0A`

      mensajePedido(textoDomicilio,pedidoAprobado);
    } 


    if(checkboxRetiroLocal.checked) {
      pedidoAprobado = true;

      let textoDomicilio = '' 
      
      mensajePedido(textoDomicilio,pedidoAprobado)
    }
  })

  }

  

})

function mensajePedido (txtDomicilio,pedAprobado) {
  if(pedAprobado) {
    // generarMensajePedido
    let textoPedido = "Mi pedido:%0A";
  
    pedido.forEach( prod =>  {
      textoPedido += `${prod.cantidad} - ${prod.nombre} $${prod.precio}%0A`
    })
  
    textoPedido+= txtDomicilio;

    let totalCarrito = calcularTotalCarrito();

    textoPedido+= `%0ATotal del pedido: %0A$${totalCarrito}`
    
    const phoneNumber = "5493794748471";

    const apiUrl = `https://wa.me/${phoneNumber}?text=${textoPedido}`

    window.location.href = apiUrl;
  
  }
  
  
}

// https://faq.whatsapp.com/425247423114725/?locale=es_LA&cms_platform=iphone



















