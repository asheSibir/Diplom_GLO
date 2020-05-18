//POLYFILLS for IE
import '@babel/polyfill'; //https://babeljs.io/docs/en/babel-polyfill


//Importing scripts from modules
import movePopUp from './modules/popup';
import sendData from './modules/sendData';
import moveAccordion from './modules/accordion';
import calcul from './modules/calcul';
import showMore from './modules/showMore';

//ЗАПУСК ФУНКЦИЙ
//POPUP (все 4)
movePopUp();
//отправка формы
sendData();
// аккордеон
moveAccordion();
//калькулятор
calcul();
//"больше!"
showMore();



