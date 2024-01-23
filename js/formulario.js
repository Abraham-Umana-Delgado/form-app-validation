const form = document.getElementById('formulario');
const formInputs = [...form.querySelectorAll('.formulario__input')];
const terms = form.querySelector('#terminos');

const regularExpressions = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
    correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    telefono: /^\d{7,14}$/,
}

const fields = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false
}

const inputValidation = (event) => {
    switch (event.target.name) {
        case "usuario":
            formValidation(regularExpressions.usuario, event.target, "usuario");
            break;

        case "nombre":
            formValidation(regularExpressions.nombre, event.target, "nombre");
            break;

        case "password":
            formValidation(regularExpressions.password, event.target, "password");
            confirmationPasswordValidation();
            break;

        case "confirmationPassword":
            confirmationPasswordValidation();
            break;

        case "correo":
            formValidation(regularExpressions.correo, event.target, "correo");
            break;

        case "telefono":
            formValidation(regularExpressions.telefono, event.target, "telefono");
            break;
    }
}

const formValidation = (regularExpression, input, field) => {

    if (regularExpression.test(input.value)) {
        document.getElementById(`grupo__${field}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${field}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${field} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${field} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${field} p`).classList.remove('formulario__input-error-activo');
        fields[field] = true;
    } else {
        document.getElementById(`grupo__${field}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${field}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${field} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${field} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${field} p`).classList.add('formulario__input-error-activo');
        fields[field] = false;
    }
}

const confirmationPasswordValidation = () => {
    const inputPassword = form.querySelector('#password');
    const inputConfirmationPassword = form.querySelector('#confirmationPassword');

    if (inputPassword.value !== inputConfirmationPassword.value) {
        document.getElementById('grupo__password2').classList.add('formulario__grupo-incorrecto');
        document.getElementById('grupo__password2').classList.remove('formulario__grupo-correcto');
        document.querySelector('#grupo__password2 i').classList.add('fa-times-circle');
        document.querySelector('#grupo__password2 i').classList.remove('fa-check-circle');
        document.querySelector('#grupo__password2 p').classList.add('formulario__input-error-activo');
        fields['password'] = false;
    } else {
        document.getElementById('grupo__password2').classList.remove('formulario__grupo-incorrecto');
        document.getElementById('grupo__password2').classList.add('formulario__grupo-correcto');
        document.querySelector('#grupo__password2 i').classList.add('fa-check-circle');
        document.querySelector('#grupo__password2 i').classList.remove('fa-times-circle');
        document.querySelector('#grupo__password2 p').classList.remove('formulario__input-error-activo');
        fields['password'] = true;
    }
}


formInputs.forEach((input) => {
    input.addEventListener('keyup', inputValidation);
    input.addEventListener('blur', inputValidation);
});


form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (fields.usuario && fields.nombre && fields.password && fields.correo && fields.telefono && terms.checked) {
        form.reset();

    	document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 4000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((iconCheck) => {
            iconCheck.classList.remove('formulario__grupo-correcto');
        });


    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        }, 4000)
    }

})