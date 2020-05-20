//POLYFILLS for IE
import '@babel/polyfill'; //https://babeljs.io/docs/en/babel-polyfill
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import 'formdata-polyfill';
import "regenerator-runtime/runtime.js";
import 'element-remove';
import 'url-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import 'whatwg-fetch';
import 'scroll-behavior-polyfill';
import 'computed-style';



//Importing scripts from modules
import movePopUp from './modules/popup';
import sendData from './modules/sendData';
import moveAccordion from './modules/accordion';
import calcul from './modules/calcul';
import showMore from './modules/showMore';
import postForma from './modules/postForma';
import putInStorage from './modules/putInStorage';


//ЗАПУСК ФУНКЦИЙ
//POPUP (все 4)
movePopUp();
//работа формы
sendData();
// //отправвк формы
// postData();
postForma();
// аккордеон
moveAccordion();
//калькулятор
calcul();
//"больше!"
showMore();
//хранение ввода
putInStorage();



