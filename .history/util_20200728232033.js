
/**
 * Util Page
 *
 * @author Edson Junior <edsonjunior.narvaes@gmail.com>
 */

/* -----------------------------------------------------------------------------
- Validation "CNPJ/CPF Forms - Valida CNPJ/CPF no mesmo campo em formulários.
- ---------------------------------------------------------------------------- */

let cnpj_cpf = document.getElementById('validate_cnpj');

let verifyCnpjCpf = (str) => {
    let value = str.toString();
    value = value.replace(/[^0-9]/g, '');

    if(value.length == 11) return validateCpf(value);
    if(value.length == 14) return validateCnpj(value);

    return false;
}

// $(".cnpj_validator").on("change", function () {
//     alert('')

//     var form = $(this).closest("form");

//     if (verificarCnpj(this.value) === false) {
//         showErrorMsg(form, "danger", "Registro Inválido.");
//         $(".cnpj_validator").val("").focus();
//     } else {
//         form.find(".alert").remove();
//     }
// });

function verificarCNPJ_CPF(str) {
    
    var valor = str.toString();
    valor = valor.replace(/[^0-9]/g, '');

    if (valor.length === 11) {
        return valida_cpf(valor);
    } else if (valor.length === 14) {
        return valida_cnpj(valor);
    } else {
        return false;
    }
}

function verificarCnpj(str) {

    var valor = str.toString();
    valor = valor.replace(/[^0-9]/g, '');

    if (valor.length === 14) {
        return valida_cnpj(valor);
    } else {
        return false;
    }
}

function valida_cpf(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;

    if ((strCPF == '00000000000') || 
        (strCPF == '11111111111') || 
        (strCPF == '22222222222') || 
        (strCPF == '33333333333') || 
        (strCPF == '44444444444') ||
        (strCPF == '55555555555') || 
        (strCPF == '66666666666') || 
        (strCPF == '77777777777') || 
        (strCPF == '88888888888') || 
        (strCPF == '99999999999')) return false;

    for (var i = 1; i <= 9; i++) {
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    }

    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;

    return true;
}

function valida_cnpj(cnpj) {

    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999") return false;

    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;

    for (var i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;

    if (resultado != digitos.charAt(1))
        return false;

    return true;
}
