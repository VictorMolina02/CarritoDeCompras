class PaginaCarrito {
  constructor() {
    this.carrito = [];
  }
  extraerStorage() {
    let listaJSON = localStorage.getItem("listaStorage");
    this.carrito = JSON.parse(listaJSON);
  }
  guardarStorage() {
    let listaCarritoJSON = JSON.stringify(this.carrito);
    localStorage.setItem("listaStorage", listaCarritoJSON);
  }
  eliminarProductos() {
    const cardsProductos = document.querySelectorAll(".cardCarrito");
    cardsProductos.forEach((card) => {
      const btnEliminar = card.querySelector(".btnEliminar");
      const nombreProducto = card.querySelector("h5").textContent;
      const producto = this.carrito.find((p) => p.nombre === nombreProducto);
      btnEliminar.addEventListener("click", () => {
        let i = this.carrito.indexOf(producto);
        if (i !== -1) {
          this.carrito.splice(i, 1);
          card.remove();
          this.cantidadTotal();
          this.mostrarTotal();
          this.guardarStorage();
          Toastify({
            text: `Producto eliminado`,
            duration: 2000,
            style: {
              background: "#8B0000",
            },
            offset: {
              y: 70,
            },
          }).showToast();
        }
        if (this.carrito.length == 0) {
          let cardsContainer = document.querySelector("#cardsContainer");
          cardsContainer.innerHTML = "<h2>Carrito Vacio</h2>";
        }
      });
    });
  }
  renderizarCarrito() {
    this.carrito.forEach((producto) => {
      let contenedorCards = document.getElementById("cards");
      contenedorCards.innerHTML += `<div id='carrito ' class="card mb-3 cardCarrito" style="width: 700px">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${producto.imagen}" class="img-fluid rounded-start" alt="">
        </div>
        <div class="col-md-8">
        <div class="btnEliminar">
        <button id="btnEliminar-${producto.id}" class="btn btn-danger">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
          <div class="card-body">
            <h5 class="card-title fw-bold">${producto.nombre}</h5>
            <p class="card-text">${producto.detalle}</p>
            <p class="card-text precio fw-bold">${Number(
              producto.precio
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minumumFractionDigits: 2,
            })}</p>
            <div class="cantidadContainer">
              <button id="btnmenos-${
                producto.id
              }" class="btn btn-light btnmenos">-</button><p class="cantidadContainers fw-bold">${
        producto.cantidad
      }</p><button id="btnmas-${
        producto.id
      }" class="btn btn-light btnmas">+</button>
        </div>
      </div>
    </div>
          </div>
        </div>
      </div>
      
    </div>`;
    });
    this.mostrarTotal();
    this.aumentar_y_disminuir_cantidad();
    this.cantidadTotal();
    this.eliminarProductos();
    this.finalizarCompra();
  }
  aumentar_y_disminuir_cantidad() {
    const cardsProductos = document.querySelectorAll(".cardCarrito");
    cardsProductos.forEach((card) => {
      const cantidad = card.querySelector(".cantidadContainers");
      const precio = card.querySelector(".precio");
      const aumentarBtn = card.querySelector(".btnmas");
      const disminuirBtn = card.querySelector(".btnmenos");
      const nombreProducto = card.querySelector("h5").textContent;
      const producto = this.carrito.find((p) => p.nombre === nombreProducto);
      aumentarBtn.addEventListener("click", () => {
        producto.cantidad++;
        cantidad.textContent = producto.cantidad;
        let precioUSD = producto.cantidad * producto.precio;
        precio.textContent = precioUSD.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minumumFractionDigits: 2,
        });
        this.cantidadTotal();
        this.mostrarTotal();
        this.guardarStorage();
      });
      disminuirBtn.addEventListener("click", () => {
        if (producto.cantidad > 1) {
          producto.cantidad--;
          cantidad.textContent = producto.cantidad;
          let precioUSD = producto.cantidad * producto.precio;
          precio.textContent = precioUSD.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minumumFractionDigits: 2,
          });
          this.cantidadTotal();
          this.mostrarTotal();
          this.guardarStorage();
        }
      });
    });
  }
  cantidadTotal() {
    let cantidadTotal = this.carrito.reduce((acumulador, producto) => {
      let cantidadProductos = Number(producto.cantidad);
      return acumulador + cantidadProductos;
    }, 0);
    let mostrarCantidad = document.getElementById("cantidad");
    mostrarCantidad.innerHTML = `<p>productos: ${cantidadTotal}</p>`;
  }
  mostrarTotal() {
    let preciototal = this.carrito.reduce((acumulador, producto) => {
      let precioProducto = Number(producto.precio);
      let cantidadProducto = Number(producto.cantidad);
      return acumulador + precioProducto * cantidadProducto;
    }, 0);
    let mostrarPrecio = document.getElementById("cosas");
    mostrarPrecio.innerHTML = `<h3 class="fw-bold precio">${preciototal.toLocaleString(
      "en-US",
      {
        style: "currency",
        currency: "USD",
        minumumFractionDigits: 2,
      }
    )}</h3>`;
  }
  finalizarCompra() {
    let btnf = document.getElementById("btnf");
    btnf.addEventListener("click", () => {
      let timerInterval;
      Swal.fire({
        title: "Finalizando compra",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
          this.carrito = [];
          localStorage.removeItem("listaStorage");
          let cardd = document.querySelectorAll(".cardCarrito");
          cardd.forEach((card) => {
            card.remove();
          });
          Swal.fire({
            title: "Compra realizada con exito!",
            icon: "success",
          });
          this.mostrarTotal();
          this.cantidadTotal();
          let cardsContainer = document.querySelector("#cardsContainer");
          cardsContainer.innerHTML = `
          <div class="carritoVacio">
            <h2>Carrito Vacio</h2>
          </div>`;
        },
      });
    });
  }
}

let carritoFinal = new PaginaCarrito();
carritoFinal.extraerStorage();
carritoFinal.renderizarCarrito();
