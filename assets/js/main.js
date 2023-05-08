let botonAgregar = document.getElementById("botonAgregar")
let botonCalcular = document.getElementById("botonCalcular")


let PresupuestoTotal = []
let listaGastos = []
let listaTotales = []

function limpiar(){
    document.getElementById("ingresoPresupuesto").value = ""
    document.getElementById("ingresoGasto").value = ""
    document.getElementById("ingresoMontoGasto").value =""
}

function agregarPresupuesto(){
    let presupuesto = document.getElementById("ingresoPresupuesto").value
    
    total = 0

    if(presupuesto != "" && !isNaN(presupuesto)){
       PresupuestoTotal.push(presupuesto)
       for(let i = 0; i < PresupuestoTotal.length; i++){
        let num = Number(PresupuestoTotal[i])
        total += num
       }
       let formattedPrice = "$" + total.toLocaleString("es-CL", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
       })
        document.getElementById("textoPresupuesto").innerText = formattedPrice
        saldo()
        limpiar()
    }
       
}


botonCalcular.addEventListener("click", agregarPresupuesto)


function agregarGastos(){
    contador = 0;
    let detalleGasto = document.getElementById("ingresoGasto").value
    let precioGasto = document.getElementById("ingresoMontoGasto").value
    if(detalleGasto != "" && precioGasto != "" && !isNaN(precioGasto)){
        objeto = {nombre: detalleGasto,  valor: precioGasto, imagen: "./assets/img/basurero.png"}
        listaGastos.push(objeto)
        limpiar()
    }
    agregarTablaGastos()
}


function agregarTablaGastos(){


    document.getElementById("tabla").innerHTML =""
    for(let i = 0; i < listaGastos.length; i++){
        let valor = listaGastos[i].valor
        let nombre = listaGastos[i].nombre
        let imagen = listaGastos[i].imagen

        let valorCambiado = "$" + Number(valor).toLocaleString("es-CL", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
           })
    
    
    document.getElementById("tabla").innerHTML += `
<tr>
    <td>${nombre}</td>
    <td>${valorCambiado}</td>
    <td><img src="${imagen}" alt="eliminar" onclick ="eliminar(${i})" style="cursor:pointer;"></td>        
  </tr>
    `
    
}
saldo()


}

botonAgregar.addEventListener("click", agregarGastos)

function saldo(){

    totalGastos = 0;
    totalPresupuesto =0;

       for(let i = 0; i < PresupuestoTotal.length; i++){
        let num = Number(PresupuestoTotal[i])
        totalPresupuesto += num
    }
    
    for(let i = 0; i < listaGastos.length; i++){
        let valor = Number(listaGastos[i].valor)
        totalGastos += valor
    }

 let saldo = totalPresupuesto - totalGastos

   let totalGastosCambiado = "$" + Number(totalGastos).toLocaleString("es-CL", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
           })

    let saldoCambiado = "$" + Number(saldo).toLocaleString("es-CL", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
           })

    document.getElementById("gastosTotales").innerText = totalGastosCambiado
    document.getElementById("saldo").innerText = saldoCambiado

}

function eliminar(indice){
        listaGastos.splice(indice,1)
        saldo()
        agregarTablaGastos()
}



