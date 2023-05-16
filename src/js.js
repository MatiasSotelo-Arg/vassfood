const contProducto = document.getElementById("cont-categorias");

const contRubros = document.createElement("div");
    contRubros.classList.add("card-rubro");
	
            contRubros.innerHTML = `<div class="card-rubro">                 
                                        <input id="cat-${prod.id}" type="submit" value="${prod.nombre}"> 
                                    </div>`


			const submitBtn = contRubros.querySelector(`#cat-${prod.id}`);
			submitBtn.addEventListener('click', function() {
   
                console.log("click")

			});
	
			contProducto.appendChild(contRubros);	