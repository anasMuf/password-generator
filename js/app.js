import { passwordEl,generatePassword } from './passwordGenerator.js';
import { loadHistory }                 from "./storage.js";



const lengthEl = document.getElementById('length');
const urlEl = document.getElementById('url');
const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');

document.addEventListener('DOMContentLoaded', loadHistory());

generateBtn.addEventListener('click', function () {  
    generatePassword(lengthEl.value,urlEl.value)
});

copyBtn.addEventListener('click', function () {  
    navigator.clipboard.writeText(passwordEl.value);
    alert("Copied the text: " + passwordEl.value);
})