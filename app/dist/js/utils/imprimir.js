export function imprimir(...objetos) {
    objetos.forEach(elm => {
        console.log(elm.paraTexto());
    });
}
