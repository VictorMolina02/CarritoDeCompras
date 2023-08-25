class GestionProducto {
  constructor() {
    this.productos = [];
    this.carrito = this.cargarLocalStorage();
    this.extraerDatosAPI();
    this.agregarAlCarrito();
    this.filtrarProductos();
    this.buscarProductos();
  }
  async extraerDatosAPI() {
    try {
      const resp = await fetch("./apiSimulada.JSON");
      const data = await resp.json();
      this.productos.push(...data);
      this.renderizarProductos();
      this.agregarAlCarrito();
    } catch (error) {
      console.error("Error: ", error);
    }
  }
  renderizarProductos() {
    this.productos.forEach((producto) => {
      let listaDeProductos = document.getElementById("articulos");
      listaDeProductos.innerHTML += `<div id='tienda' class="card cardEcommerce" style="width: 370px;height: 600px">
      <img src="${
        producto.imagen
      }" class="card-img-top style="height = 300rem"" alt="${producto.nombre}">
      <div class="card-body">
        <p class="card-title fw-bold fs-5">${producto.nombre}</p>
        <p class="card-text"><small class="text-body-secondary">${
          producto.detalle
        }</small></p>
        <p class="card-text precio fw-bold">${Number(
          producto.precio
        ).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minumumFractionDigits: 2,
        })}</p>
        <button id ="${
          producto.id
        }" class="btn btn-primary">Añadir al carrito</button>
      </div>  
      </div> `;
    });
  }
  agregarAlCarrito() {
    this.productos.forEach((producto) => {
      const botonAgregar = document.getElementById(`${producto.id}`);
      botonAgregar.addEventListener("click", () => {
        let verificarProducto = this.carrito.some(
          (itemCart) => itemCart.id == producto.id
        );
        if (verificarProducto) {
          Swal.fire({
            title: "El producto ya esta en el carrito",
            icon: "info",
          });
        } else {
          this.carrito.push(producto);
          Toastify({
            text: "Producto añadido con exito!",
            duration: 2000,
            style: {
              background: "#2ECC71",
            },
            offset: {
              y: 70,
            },
          }).showToast();
        }
        this.guardarStorage();
      });
    });
  }
  guardarStorage() {
    let listaCarritoJSON = JSON.stringify(this.carrito);
    localStorage.setItem("listaStorage", listaCarritoJSON);
  }
  cargarLocalStorage() {
    const listaJSON = localStorage.getItem("listaStorage");
    return listaJSON ? JSON.parse(listaJSON) : [];
  }
  filtrarProductos() {
    let btnTeclados = document.getElementById("Teclado");
    btnTeclados.addEventListener("click", () => {
      let arrayTeclados = this.productos.filter(
        (producto) => producto.tipo == "Teclado"
      );
      let listaDeProductos = document.getElementById("articulos");
      listaDeProductos.innerHTML = "";
      arrayTeclados.forEach((producto) => {
        listaDeProductos.innerHTML += `<div id='tienda' class="card cardEcommerce" style="width: 370px;height: 600px">
        <img src="${
          producto.imagen
        }" class="card-img-top style="height = 300rem"" alt="${
          producto.nombre
        }">
        <div class="card-body">
          <p class="card-title fw-bold fs-5">${producto.nombre}</p>
          <p class="card-text"><small class="text-body-secondary">${
            producto.detalle
          }</small></p>
          <p class="card-text precio fw-bold">${Number(
            producto.precio
          ).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minumumFractionDigits: 2,
          })}</p>
          <button id ="${
            producto.id
          }" class="btn btn-primary">Añadir al carrito</button>
        </div>  
        </div> `;
      });
      this.agregarAlCarrito();
    });
    let btnMouse = document.getElementById("Mouse");
    btnMouse.addEventListener("click", () => {
      let arrayTeclados = this.productos.filter(
        (producto) => producto.tipo == "Mouse"
      );
      let listaDeProductos = document.getElementById("articulos");
      listaDeProductos.innerHTML = "";
      arrayTeclados.forEach((producto) => {
        listaDeProductos.innerHTML += `<div id='tienda' class="card cardEcommerce" style="width: 370px;height: 600px">
        <img src="${
          producto.imagen
        }" class="card-img-top style="height = 300rem"" alt="${
          producto.nombre
        }">
        <div class="card-body">
          <p class="card-title fw-bold fs-5">${producto.nombre}</p>
          <p class="card-text"><small class="text-body-secondary">${
            producto.detalle
          }</small></p>
          <p class="card-text precio fw-bold">${Number(
            producto.precio
          ).toLocaleString("es-ar", {
            style: "currency",
            currency: "ARS",
            minumumFractionDigits: 2,
          })}</p>
          <button id ="${
            producto.id
          }" class="btn btn-primary">Añadir al carrito</button>
        </div>  
        </div> `;
      });
      this.agregarAlCarrito();
    });
    let btnAuriculares = document.getElementById("Auriculares");
    btnAuriculares.addEventListener("click", () => {
      let arrayTeclados = this.productos.filter(
        (producto) => producto.tipo == "Auriculares"
      );
      let listaDeProductos = document.getElementById("articulos");
      listaDeProductos.innerHTML = "";
      arrayTeclados.forEach((producto) => {
        listaDeProductos.innerHTML += `<div id='tienda' class="card cardEcommerce" style="width: 370px;height: 600px">
        <img src="${
          producto.imagen
        }" class="card-img-top style="height = 300rem"" alt="${
          producto.nombre
        }">
        <div class="card-body">
          <p class="card-title fw-bold fs-5">${producto.nombre}</p>
          <p class="card-text"><small class="text-body-secondary">${
            producto.detalle
          }</small></p>
          <p class="card-text precio fw-bold">${Number(
            producto.precio
          ).toLocaleString("es-ar", {
            style: "currency",
            currency: "ARS",
            minumumFractionDigits: 2,
          })}</p>
          <button id ="${
            producto.id
          }" class="btn btn-primary">Añadir al carrito</button>
        </div>  
        </div> `;
      });
      this.agregarAlCarrito();
    });
    let btnMonitores = document.getElementById("Monitores");
    btnMonitores.addEventListener("click", () => {
      let arrayTeclados = this.productos.filter(
        (producto) => producto.tipo == "Monitor"
      );
      let listaDeProductos = document.getElementById("articulos");
      listaDeProductos.innerHTML = "";
      arrayTeclados.forEach((producto) => {
        listaDeProductos.innerHTML += `<div id='tienda' class="card cardEcommerce" style="width: 370px;height: 600px">
        <img src="${
          producto.imagen
        }" class="card-img-top style="height = 300rem"" alt="${
          producto.nombre
        }">
        <div class="card-body">
          <p class="card-title fw-bold fs-5">${producto.nombre}</p>
          <p class="card-text"><small class="text-body-secondary">${
            producto.detalle
          }</small></p>
          <p class="card-text precio fw-bold">${Number(
            producto.precio
          ).toLocaleString("es-ar", {
            style: "currency",
            currency: "ARS",
            minumumFractionDigits: 2,
          })}</p>
          <button id ="${
            producto.id
          }" class="btn btn-primary">Añadir al carrito</button>
        </div>  
        </div> `;
      });
      this.agregarAlCarrito();
    });
    let btnMotherboards = document.getElementById("Motherboards");
    btnMotherboards.addEventListener("click", () => {
      let arrayTeclados = this.productos.filter(
        (producto) => producto.tipo == "MotherBoard"
      );
      let listaDeProductos = document.getElementById("articulos");
      listaDeProductos.innerHTML = "";
      arrayTeclados.forEach((producto) => {
        listaDeProductos.innerHTML += `<div id='tienda' class="card cardEcommerce" style="width: 370px;height: 600px">
        <img src="${
          producto.imagen
        }" class="card-img-top style="height = 300rem"" alt="${
          producto.nombre
        }">
        <div class="card-body">
          <p class="card-title fw-bold fs-5">${producto.nombre}</p>
          <p class="card-text"><small class="text-body-secondary">${
            producto.detalle
          }</small></p>
          <p class="card-text precio fw-bold">${Number(
            producto.precio
          ).toLocaleString("es-ar", {
            style: "currency",
            currency: "ARS",
            minumumFractionDigits: 2,
          })}</p>
          <button id ="${
            producto.id
          }" class="btn btn-primary">Añadir al carrito</button>
        </div>  
        </div> `;
      });
      this.agregarAlCarrito();
    });
  }
  buscarProductos() {
    let inputBuscar = document.getElementById("buscadorProductos");
    inputBuscar.addEventListener("input", () => {
      let valueInput = inputBuscar.value.toLowerCase();
      let arrayResultados = this.productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(valueInput)
      );
      let listaDeProductos = document.getElementById("articulos");
      listaDeProductos.innerHTML = "";
      arrayResultados.forEach((producto) => {
        listaDeProductos.innerHTML += `<div id='tienda' class="card cardEcommerce" style="width: 370px;height: 600px">
        <img src="${
          producto.imagen
        }" class="card-img-top style="height = 300rem"" alt="${
          producto.nombre
        }">
        <div class="card-body">
          <p class="card-title fw-bold fs-5">${producto.nombre}</p>
          <p class="card-text"><small class="text-body-secondary">${
            producto.detalle
          }</small></p>
          <p class="card-text precio fw-bold">${Number(
            producto.precio
          ).toLocaleString("es-ar", {
            style: "currency",
            currency: "ARS",
            minumumFractionDigits: 2,
          })}</p>
          <button id ="${
            producto.id
          }" class="btn btn-primary">Añadir al carrito</button>
        </div>  
        </div> `;
      });
      this.agregarAlCarrito();
    });
  }
}
const control = new GestionProducto();
