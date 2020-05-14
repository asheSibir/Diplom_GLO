//POLYFILLS for IE
import '@babel/polyfill'; //https://babeljs.io/docs/en/babel-polyfill
import 'nodelist-foreach-polyfill'; //https://www.npmjs.com/package/nodelist-foreach-polyfill
import elementClosest from 'element-closest'; //https://www.npmjs.com/ С НИМ ВОТ ТАК!!!
elementClosest(window);
import 'formdata-polyfill';
import "regenerator-runtime/runtime.js";
import 'element-remove';
import 'url-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import 'whatwg-fetch';
import 'scroll-behavior-polyfill';

//Importing scripts from modules