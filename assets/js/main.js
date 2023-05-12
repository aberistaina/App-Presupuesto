let botonAgregar = document.getElementById("botonAgregar");
let botonCalcular = document.getElementById("botonCalcular");
let PresupuestoTotal = [];
let listaGastos = [];
botonCalcular.addEventListener("click", agregarPresupuesto);
botonAgregar.addEventListener("click", agregarGastos);

// Constructor Objeto que contiene gastos y montos de estos
class ListaGastos {
    constructor(nombre, valor, imagen) {
        this.nombre = nombre;
        this.valor = valor;
        this.imagen = imagen;
    }
}

const limpiar = () => {
    document.getElementById("ingresoPresupuesto").value = "";
    document.getElementById("ingresoGasto").value = "";
    document.getElementById("ingresoMontoGasto").value = "";
};

function agregarPresupuesto() {
    let presupuesto = document.getElementById("ingresoPresupuesto").value;

    total = 0;

    if (presupuesto != "" && !isNaN(presupuesto)) {
        PresupuestoTotal.push(presupuesto);
        for (let i = 0; i < PresupuestoTotal.length; i++) {
            let num = Number(PresupuestoTotal[i]);
            total += num;
        }
        let formattedPrice =
            "$" +
            total.toLocaleString("es-CL", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
        document.getElementById("textoPresupuesto").innerText = formattedPrice;
        saldo();
        limpiar();
    }
}

function agregarGastos() {
    let detalleGasto = document.getElementById("ingresoGasto").value;
    let precioGasto = document.getElementById("ingresoMontoGasto").value;
    let imagen = "./assets/img/basurero.png";
    if (
        detalleGasto != "" &&
        precioGasto != "" &&
        !isNaN(precioGasto) &&
        precioGasto > 0
    ) {
        objeto = new ListaGastos(detalleGasto, precioGasto, imagen); 
        //antes de crear la Clase, lo había hecho directamente creando un objeto.
        //{nombre: detalleGasto,  valor: precioGasto, imagen: "./assets/img/basurero.png"}
        listaGastos.push(objeto);
        limpiar();
    }
    agregarTablaGastos();
}

function agregarTablaGastos() {
    document.getElementById("tabla").innerHTML = "";
    for (let i = 0; i < listaGastos.length; i++) {
        let valor = listaGastos[i].valor;
        let nombre = listaGastos[i].nombre;
        let imagen = listaGastos[i].imagen;

        let valorCambiado =
            "$" +
            Number(valor).toLocaleString("es-CL", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });

        document.getElementById("botonEliminarTodo").innerHTML = `
            <button type="button" onclick ="eliminarTodaLaListaDeGastos()" class="btn btn-outline-danger mt-2" id="botonBorrar" style="width: 100px; height: 35px; font-size: 10px">Borrar Todo</button>
            `;

            //No es lo optipo usar onclick pero no pude hacerlo de otra forma
            document.getElementById("tabla").innerHTML += `
    
            <tr>
                <td>${nombre}</td>
                <td>${valorCambiado}</td>
                <td><img src="${imagen}" alt="eliminar" onclick ="eliminarGasto(${i})" style="cursor:pointer;"></td>
                   
            </tr>
            `
            //No es lo optipo usar onclick pero no pude hacerlo de otra forma     
            ;
            }
     saldo();
}

function saldo() {
    totalGastos = 0;
    totalPresupuesto = 0;

    for (let i = 0; i < PresupuestoTotal.length; i++) {
        let num = Number(PresupuestoTotal[i]);
        totalPresupuesto += num;
    }

    for (let i = 0; i < listaGastos.length; i++) {
        let valor = Number(listaGastos[i].valor);
        totalGastos += valor;
    }

    let saldo = totalPresupuesto - totalGastos;

    let totalGastosCambiado =
        "$" +
        Number(totalGastos).toLocaleString("es-CL", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });

    let saldoCambiado =
        "$" +
        Number(saldo).toLocaleString("es-CL", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });

    document.getElementById("gastosTotales").innerText = totalGastosCambiado;
    document.getElementById("saldo").innerText = saldoCambiado;
}

function eliminarGasto(indice) {
    listaGastos.splice(indice, 1);
    saldo();
    agregarTablaGastos();
}

function eliminarTodaLaListaDeGastos() {
    listaGastos = [];
    saldo();
    agregarTablaGastos();
    document.getElementById("botonEliminarTodo").innerHTML = ``;
}
