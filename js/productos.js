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
          <p class="card-text precio fw-bold">${producto.precio.toLocaleString(
            "es-ar",
            {
              style: "currency",
              currency: "ARS",
              minumumFractionDigits: 2,
            }
          )}</p>
          <button id ="botoncito-${
            producto.id
          }" class="btn btn-primary">Añadir al carrito</button>
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
        carrito.agregarCarrito(producto);
      });
    });
  }
}

const teclado = new Producto(
  1,
  "HyperX Alloy Origins 65",
  "Teclado inalambrico 65%",
  10000.0,
  "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS02LKM-jgih2P2Ix53G7XwSmbt3pusqwqrRYnwnKgJnE2xckI-Jwyfz-O_vggQhcz6A16vw2bRLXV6rhQs4PFb7w8Ru8bBjg"
);
const mouse = new Producto(
  2,
  "Razer Mamba",
  "Mouse optico inalambrico",
  50000.0,
  " https://http2.mlstatic.com/D_NQ_NP_982428-MLA27804531612_072018-O.webp"
);

const auriculares = new Producto(
  3,
  "Razer Hammerhead True",
  "Auriculares in-ear inalambricos",
  43337.0,
  "https://http2.mlstatic.com/D_NQ_NP_660742-MLA52221291776_102022-O.webp"
);
const cascos = new Producto(
  4,
  "Sony WH-CH510",
  "Cascos Bluetooth",
  36999.1,
  "https://arsonyb2c.vtexassets.com/arquivos/ids/362133-1600-auto?v=638170780089400000&width=1600&height=auto&aspect=true"
);
const silla = new Producto(
  5,
  "Corsair T3 Rush Fabric Carbon",
  "Silla Gamer",
  238700.0,
  "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_36811_Silla_Gamer_Corsair_T3_Rush_Fabric_Carbon_88bef6b4-grn.jpg"
);
const monitor = new Producto(
  6,
  'Samsung Odyssey CRG5 24"',
  "Monitor gamer full HD 144Hz",
  182128.0,
  "https://www.maximus.com.ar/Temp/App_WebSite/App_PictureFiles/Items/LC24RG50FZLCZB_800.jpg"
);
const carrito = new Carrito();
const control = new GestionProducto();
control.agregar(teclado);
control.agregar(mouse);
control.agregar(auriculares);
control.agregar(cascos);
control.agregar(silla);
control.agregar(monitor);
control.mostrarProductos();
