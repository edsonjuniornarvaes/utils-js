
/**
 * Util Page
 *
 * @author Edson Junior <edsonjunior.narvaes@gmail.com>
 */

/* -----------------------------------------------------------------------------
- Validation "CNPJ/CPF Forms - Valida CNPJ/CPF no mesmo campo em formulários.
- ---------------------------------------------------------------------------- */

let cnpj_cpf = document.getElementById('validate_cnpj');

cnpj.addEventListener('change', () => {
    if(verifyCNPJCPF(this.value) === false) {
        alert('Registro inválido.');
        cnpj_cpf.value = "";
        cnpj_cpf.focus();
    }

    console.log('Registro válido');
});

let verifyCNPJCPF = (str) => {

    let value = str.toString();
    value = value.replace(/[^0-9]/g, '');

    if(value.length == 11) return verifyCPF(value);
    if(value.length == 14) return verifyCNPJ(value);

    return false;

}

let verifyCPF = (str) => {
    return validateCPF(str);
}

let verifyCNPJ = (str) => {
    return validateCnpj(str);
}

let validateCPF = (strCPF) => {

    let sum = 0;
    let rest;

    if ( (strCPF == '00000000000') || (strCPF == '11111111111') || (strCPF == '22222222222') || (strCPF == '33333333333') || 
         (strCPF == '44444444444') || (strCPF == '55555555555') || (strCPF == '66666666666') || (strCPF == '77777777777') || 
         (strCPF == '88888888888') || (strCPF == '99999999999')
    ) return false;

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if ( (rest == 10) || (rest == 11) ) rest = 0;
    if ( rest != parseInt( strCPF.substring( 9, 10 )) ) return false;

    sum = 0;
    for ( i = 1; i <= 10; i++ ) sum = sum + parseInt( strCPF.substring(i - 1, i) ) * ( 12 - i );
    rest = (sum * 10) % 11;

    if ( (rest == 10) || (rest == 11) ) rest = 0;
    if ( rest != parseInt(strCPF.substring( 10, 11 ) )) return false;

    return true;
}

function valida_cnpj(cnpj) {

    if ( (cnpj == "00000000000000") || (cnpj == "11111111111111") || (cnpj == "22222222222222") || (cnpj == "33333333333333") || 
         (cnpj == "44444444444444") || (cnpj == "55555555555555") || (cnpj == "66666666666666") || (cnpj == "77777777777777") || 
         (cnpj == "88888888888888") || (cnpj == "99999999999999") 
    ) return false;

    let width = cnpj.length - 2
    let numbers = cnpj.substring(0, width);
    let digts = cnpj.substring(width);
    let sum = 0;
    let pos = width - 7;

    for ( let i = width; i >= 1; i-- ) {
        sum += numbers.charAt( width - i ) * pos--;
        if ( pos < 2 ) pos = 9;
    }

    let resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if ( resultado != digts.charAt(0) ) return false;

    width = width + 1;
    numbers = cnpj.substring(0, width);
    sum = 0;
    pos = width - 7;

    for (i = width; i >= 1; i--) {
        sum += numbers.charAt(width - i) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (resultado != digts.charAt(1))
        return false;

    return true;
}
