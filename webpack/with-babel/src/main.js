import Greeting from './Greeting';
import DateTime from './DateTime';
 
var h1 = document.querySelector('h1');
h1.textContent = new Greeting();
 
var h2 = document.querySelector('h2');
h2.textContent = new DateTime();