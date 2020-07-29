
/**
 * Validation Page
 *
 * @author Edson Junior <edsonjunior.narvaes@gmail.com>
 */

 
/* -----------------------------------------------------------------------------
- Validation "CNPJ/CPF Forms - Valida CNPJ/CPF no mesmo campo em formulários.
- ---------------------------------------------------------------------------- */

let cnpj_cpf = document.getElementById( 'validate_cnpj_cpf' );

cnpj_cpf.addEventListener( 'change', (  ) => {
    if( verifyCNPJCPF( cnpj_cpf.value ) == false ) {

        console.log( 'Invalid record.' );
        cnpj_cpf.value = "";
        cnpj_cpf.focus(  );
        return;

    }
    console.log( 'Valid recordo.' );
} );

let verifyCNPJCPF = ( str ) => {

    let value = str.toString(  );
    value = value.replace( /[^0-9]/g, '' );

    if( value.length == 11 ) return validateCPF( value );
    if( value.length == 14 ) return validateCNPJ( value );

    return false;
}