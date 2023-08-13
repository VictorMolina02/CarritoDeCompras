class Producto {
  constructor(id, nombre, detalle, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.detalle = detalle;
    this.precio = precio;
    this.imagen = imagen;
    this.cantidad = 1;
  }
}

class Carrito {
  constructor() {
    this.carrito = [];
  }
  agregarCarrito(producto) {
    this.carrito.push(producto);
    const car = this.carrito.length;
    const num = document.getElementById("contenedorItemContador");
    num.innerHTML = `<p id="itemContador">${car}</p>`;
    this.guardarStorage();
  }
  guardarStorage() {
    let listaCarritoJSON = JSON.stringify(this.carrito);
    localStorage.setItem("listaStorage", listaCarritoJSON);
  }
}

class GestionProducto {
  constructor() {
    this.productos = [];
  }
  agregar(producto) {
    this.productos.push(producto);
  }
  mostrarProductos() {
    this.productos.forEach((producto) => {
      const listaDeProductor = document.getElementById("articulos");
      listaDeProductor.innerHTML += `<div id='tienda' class="card cardEcommerce" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">${producto.detalle}</p>
          <p class="card-text fw-bold">$${producto.precio}</p>
          <button id ="botoncito-${producto.id}" class="btn btn-primary">Añadir al carrito</button>
        </div>  
        </div> `;
    });
    this.productos.forEach((producto) => {
      const botun = document.getElementById(`botoncito-${producto.id}`);
      botun.addEventListener("click", () => {
        botun.classList.remove("btn-primary");
        botun.classList.add("btn-success");
        botun.innerText = "En carrito";
        botun.disabled = true;
        carrito.agregarCarrito(producto);
      });
    });
  }
}

const teclado = new Producto(
  1,
  "HyperX Alloy Origins 65",
  "Teclado inalambrico 65%",
  10000,
  "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS02LKM-jgih2P2Ix53G7XwSmbt3pusqwqrRYnwnKgJnE2xckI-Jwyfz-O_vggQhcz6A16vw2bRLXV6rhQs4PFb7w8Ru8bBjg"
);
const mouse = new Producto(
  2,
  "Razer Mamba",
  "Mouse optico inalambrico",
  50000,
  " https://http2.mlstatic.com/D_NQ_NP_982428-MLA27804531612_072018-O.webp"
);

const auriculares = new Producto(
  3,
  "Razer Hammerhead True Wireless",
  "Auriculares in-ear inalambricos",
  43337,
  "https://http2.mlstatic.com/D_NQ_NP_660742-MLA52221291776_102022-O.webp"
);
const cascos = new Producto(
  4,
  "Sony WH-CH510",
  "Cascos Bluetooth",
  36999,
  "https://arsonyb2c.vtexassets.com/arquivos/ids/362133-1600-auto?v=638170780089400000&width=1600&height=auto&aspect=true"
);
const carrito = new Carrito();
const control = new GestionProducto();
control.agregar(teclado);
control.agregar(mouse);
control.agregar(auriculares);
control.agregar(cascos);
control.mostrarProductos();
