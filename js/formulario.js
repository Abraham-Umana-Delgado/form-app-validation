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
    password2: false,
    correo: false,
    telefono: false
}

const validarFormulario = (event) => {
    switch (event.target.name) {
        case 'usuario':
            validarCampos(expresiones.usuario, event.target, 'usuario');
            break;

        case 'nombre':
            validarCampos(expresiones.nombre, event.target, 'nombre');
            break;

        case 'password':
            validarCampos(expresiones.password, event.target, 'password');
            validarConfirmarPassword();
            break;

        case 'password2':
            validarConfirmarPassword();
            break;

        case 'correo':
            validarCampos(expresiones.correo, event.target, 'correo');
            break;

        case 'telefono':
            validarCampos(expresiones.telefono, event.target, 'telefono');
            break;
    }
}

const validarCampos = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true; //Que si los campos del formulario estan bien redactados, yo los quiero poner en TRUE.
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false; //Caso contrario en False.
    }
}

const validarConfirmarPassword = () => {
    const inputPassword = document.getElementById('password');
    const inputConfirmPassword = document.getElementById('password2');

    if (inputPassword.value !== inputConfirmPassword.value) {
        document.getElementById('grupo__password2').classList.add('formulario__grupo-incorrecto');
        document.getElementById('grupo__password2').classList.remove('formulario__grupo-correcto');
        document.querySelector('#grupo__password2 i').classList.add('fa-times-circle');
        document.querySelector('#grupo__password2 i').classList.remove('fa-check-circle');
        document.querySelector('#grupo__password2 .formulario__input-error').classList.add('formulario__input-error-activo');
        campos['password'] = false;
    } else {
        document.getElementById('grupo__password2').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo__password2').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo__password2 i').classList.remove('fa-times-circle');
        document.querySelector('#grupo__password2 i').classList.add('fa-check-circle');
        document.querySelector('#grupo__password2 .formulario__input-error').classList.remove('formulario__input-error-activo');
        campos['password'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario); // Comprueba los campos cada vez que el usuario deja de escribir
    input.addEventListener('blur', validarFormulario); // comprueba los campos cuando el usuario presiona fuera del INPUT.
});

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const terminos = formulario.querySelector('#terminos');

    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
        }, 4000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });

    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');

        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 4000);
    }
});