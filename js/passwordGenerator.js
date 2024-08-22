import { dataPassword,localStorageAction } from "./storage.js";

export const passwordEl = document.getElementById('password');
const strengthIndicatorEl = document.getElementById('strength_indicator');
const errorEl = document.getElementById('error');
const charsetEl = document.querySelectorAll('.charsets');

const lowercase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const uppercase = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
const number = ['0','1','2','3','4','5','6','7','8','9'];
const symbols = ["&","<",">","*","@","\\","{","}","[","]","!","?","$","%","+","-","=","\"","'",":",";","#","_"];

export function generatePassword(length,url) {
    strengthIndicatorEl.innerHTML = '';

    let error = 'at least length of character is 5';
    if(parseInt(length) < 5){
        errorEl.innerHTML = error;
        errorEl.style.display = 'block';
        return console.error(error);
    }

    errorEl.innerHTML = '';
    errorEl.style.display = 'none';

    let resultPassword = '';
    passwordEl.value = ''

    // return console.log(charsetEl);
    const charSetsPassword = [];
    const allChar = [];

    charsetEl.forEach(element => { 
        if(element.checked && element.value === 'lowercase'){
             charSetsPassword.push(lowercase[Math.floor(Math.random() * lowercase.length)]);
             allChar.push(...lowercase);
        }
        if(element.checked && element.value === 'uppercase'){
             charSetsPassword.push(uppercase[Math.floor(Math.random() * uppercase.length)]);
             allChar.push(...uppercase);
        }
        if(element.checked && element.value === 'number'){
             charSetsPassword.push(number[Math.floor(Math.random() * number.length)]);
             allChar.push(...number);
        }
        if(element.checked && element.value === 'symbols'){
             charSetsPassword.push(symbols[Math.floor(Math.random() * symbols.length)]);
             allChar.push(...symbols);
        }
    });

    for (let i = charSetsPassword.length; i <= parseInt(length); i++) {
        const j = Math.floor(Math.random() * allChar.length);
        charSetsPassword.push(allChar[j]);
    }

    for (let i = charSetsPassword.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [charSetsPassword[i], charSetsPassword[j]] = [charSetsPassword[j], charSetsPassword[i]];
    }

    resultPassword = charSetsPassword.join('')

    passwordEl.value = resultPassword

    strengthIndicatorEl.innerHTML = strengthIndicator(resultPassword)

    localStorageAction(resultPassword,url)
}

export function strengthIndicator(password) {
    let strength = 0;

    // Panjang password
    if (password.length >= 5) {
        strength += 1;
    }
    if (password.length >= 8) {
        strength += 1;
    }
    if (password.length >= 12) {
        strength += 1;
    }

    // Variasi karakter
    if (/[a-z]/.test(password)) {
        strength += 1; // Mengandung huruf kecil
    }
    if (/[A-Z]/.test(password)) {
        strength += 1; // Mengandung huruf besar
    }
    if (/\d/.test(password)) {
        strength += 1; // Mengandung angka
    }
    if (/[\W_]/.test(password)) {
        strength += 1; // Mengandung simbol
    }

    // Indikator kekuatan
    if (strength <= 2) {
        return "Weak";
    } else if (strength <= 4) {
        return "Medium";
    } else {
        return "Strong";
    }
}