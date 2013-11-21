/*
 * This file is part of jsIBAN package.
 *
 * (c) Marcos Gómez Vilches. Gesdinet <marcos@gesdinet.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Get Division module
 *
 * @param aNumStr
 * @param aDiv
 *
 * @returns {number}
 */
function module( aNumStr, aDiv)
{
    var tmp = "";
    var  i, r;
    for ( i=0; i<aNumStr.length ; i++)
    {
        tmp += aNumStr.charAt( i);
        r = tmp % aDiv;
        tmp = r.toString( 10);
    }
    return tmp / 1;
}

/**
 * Generate IBAN Number from Account and Country Code
 *
 * @param String acc         Account Number
 * @param String countrycode (Iso Country Code like Spain=> "ES")
 *
 * @returns {string}
 */
function genIBAN(acc,countrycode) {

    //trim, clean bank account
    acc = acc.toUpperCase();
    acc = trim(acc);
    acc  = acc.replace(/\s/g, "");

    var letter1,letter2,num1,num2;
    var aux;
    var dc, rest, iban;

    aux = countrycode + '00' + acc;

    // Convert Letter to Num
    letter1 = aux.substring(0, 1);
    letter2 = aux.substring(1, 2);

    num1 = getnumIBAN(letter1);
    num2 = getnumIBAN(letter2);

    aux = String(num1) + String(num2) + aux.substring(2, aux.length);

    // Change order, first 6 digits to end of string
    aux = aux.substring(6,aux.length) + aux.substring(0,6);

    //get rest
    rest = module(aux, 97);
    dc = 98 - rest;

    if(dc < 10) dc = '0'+ String(dc);
    iban = countrycode + dc + acc;

    return iban;
}

/**
 * Validate IBAN Number
 *
 * @param String iban IBAN Number
 *
 * @returns {boolean}
 */
function validateIBAN(iban) {

    //trim, clean iban number
    iban = iban.toUpperCase();
    iban = trim(iban);
    iban  = iban.replace(/\s/g, "");

    var letter1,letter2,num1,num2,rest;
    var aux;

    // Convert Letter to Num
    letter1 = iban.substring(0, 1);
    letter2 = iban.substring(1, 2);

    num1 = getnumIBAN(letter1);
    num2 = getnumIBAN(letter2);

    //change letter to numbers
    aux = String(num1) + String(num2) + iban.substring(2, iban.length);

    // Change order, first 6 digits to end of string
    aux = aux.substring(6,aux.length) + aux.substring(0,6);

    //get rest
    rest = module(aux, 97);

    if (rest == 1) {
        return true;
    } else {
        return false;
    }
}

/**
 * Trim string
 *
 * @param myString
 *
 * @returns {XML|string|*}
 */
function trim(myString)
{
    return myString.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

/**
 * Conver letters to digits
 *
 * @param char letter Letter
 *
 * @returns {number}
 */
function getnumIBAN(letter)
{
    ls_letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return ls_letters.search(letter) + 10;
}