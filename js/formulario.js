const formulario = document.getElementById('formulario');
const inputs = formulario.querySelectorAll('.formulario__input'); //Una lista de nodos devuelve.

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, // Requiere al menos 8 caracteres con al menos 1 dígito, 1 minúscula, 1 mayúscula y 1 caracter especial
    correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false,
}

const validarFormulario = (event) =>{

}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario); // Comprueba los campos cada vez que el usuario deja de escribir
    input.addEventListener('blur', validarFormulario); // comprueba los campos cuando el usuario presiona fuera del INPUT.
});

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

});