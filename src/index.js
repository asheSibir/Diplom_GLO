//POLYFILLS for IE
import '@babel/polyfill'; //https://babeljs.io/docs/en/babel-polyfill


//Importing scripts from modules
import movePopUp from './modules/popup';
import sendData from './modules/sendData';

//ЗАПУСК ФУНКЦИЙ
//POPUP
movePopUp();
//Маска для формы
sendData();

