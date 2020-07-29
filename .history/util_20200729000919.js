
/**
 * Util Page
 *
 * @author Edson Junior <edsonjunior.narvaes@gmail.com>
 */

/* -----------------------------------------------------------------------------
- Validation "CNPJ/CPF Forms - Valida CNPJ/CPF no mesmo campo em formulários.
- ---------------------------------------------------------------------------- */

let cnpj_cpf = document.getElementById('validate_cnpj_cpf');

cnpj_cpf.addEventListener('change', () => {
    if(verifyCNPJCPF(cnpj_cpf.value) == false) {
        console.log('Invalid record.');
        cnpj_cpf.value = "";
        cnpj_cpf.focus();
        return;
    }
    console.log('Valid recordo.');
});

let verifyCNPJCPF = (str) => {

    let value = str.toString();
    value = value.replace(/[^0-9]/g, '');
    if(value.length == 11) return validateCPF(value);
    if(value.length == 14) return validateCNPJ(value);
    return false;
    
}

let validateCPF = (strCPF) => {

    let sum = 0;
    let rest;

    if ( (strCPF == '00000000000') || (strCPF == '11111111111') || (strCPF == '22222222222') || (strCPF == '33333333333') || 
         (strCPF == '44444444444') || (strCPF == '55555555555') || (strCPF == '66666666666') || (strCPF == '77777777777') || 
         (strCPF == '88888888888') || (strCPF == '99999999999') ) return false;

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

function validateCNPJ(strCNPJ) {

    if ( (strCNPJ == "00000000000000") || (strCNPJ == "11111111111111") || (strCNPJ == "22222222222222") || (strCNPJ == "33333333333333") || 
         (strCNPJ == "44444444444444") || (strCNPJ == "55555555555555") || (strCNPJ == "66666666666666") || (strCNPJ == "77777777777777") || 
         (strCNPJ == "88888888888888") || (strCNPJ == "99999999999999") ) return false;

    let width = strCNPJ.length - 2
    let numbers = strCNPJ.substring(0, width);
    let digts = strCNPJ.substring(width);
    let sum = 0;
    let pos = width - 7;

    for ( let i = width; i >= 1; i-- ) {
        sum += numbers.charAt( width - i ) * pos--;
        if ( pos < 2 ) pos = 9;
    }

    let resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if ( resultado != digts.charAt(0) ) return false;

    width = width + 1;
    numbers = strCNPJ.substring(0, width);
    sum = 0;
    pos = width - 7;

    for ( i = width; i >= 1; i-- ) {
        sum += numbers.charAt( width - i ) * pos--;
        if ( pos < 2 ) pos = 9;
    }

    resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (resultado != digts.charAt(1)) return false;

    return true;
}
