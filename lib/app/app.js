"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqFunction = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var form = document.querySelector('.header__input-form');
var inputField = document.querySelector('.header__input');
var searchBtn = document.querySelector('.header__icon-container');
var location = document.querySelector('.main__location');
var temperature = document.querySelector('.main__temp');
var detail = document.querySelector('.main__description');
var feelsDisplay = document.querySelector('.main--feels');
var humidityDisplay = document.querySelector('.main--humidity');
var pressureDisplay = document.querySelector('.main--pressure');
var placeCode = document.querySelector('.main__code');
var degree = document.querySelector('.main__temp-deg');
var windSpeed = document.querySelector('.wind--speed');
var windDegree = document.querySelector('.wind--deg');
var latCoord = document.querySelector('.coordinates--lat');
var lonCoord = document.querySelector('.coordinates--lon');
var finalUrl;
var url = 'https://api.openweathermap.org/data/2.5/weather?q=';
var destinationID;
var appId = 'a16a8ef1f58973f765eaeb26936caac3';

var reqFunction = function reqFunction() {
  searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    destinationID = inputField.value;
    finalUrl = "".concat(url).concat(destinationID, "&appid=").concat(appId);
    fetchReq();
  });

  var fetchReq = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var temp, response, jsonResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fetch(finalUrl);

            case 3:
              response = _context.sent;

              if (!response.ok) {
                _context.next = 24;
                break;
              }

              _context.next = 7;
              return response.json();

            case 7:
              jsonResponse = _context.sent;
              console.log(jsonResponse);
              location.innerText = inputField.value;
              location.style.transition = 'all .3s';
              temp = Math.floor(jsonResponse.main.temp - 273.15);
              temperature.innerText = "".concat(temp);
              degree.innerHTML = 'o';
              detail.classList.add('main__description');
              detail.innerText = jsonResponse.weather[0].description;
              feelsDisplay.innerText = Math.floor(jsonResponse.main.feels_like - 273.15);
              humidityDisplay.innerText = jsonResponse.main.humidity;
              pressureDisplay.innerText = jsonResponse.main.pressure;
              placeCode.innerText = jsonResponse.sys.country;
              windSpeed.innerText = jsonResponse.wind.speed;
              windDegree.innerText = jsonResponse.wind.deg;
              latCoord.innerText = jsonResponse.coord.lat;
              lonCoord.innerText = jsonResponse.coord.lon;

            case 24:
              _context.next = 29;
              break;

            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](0);
              alert(_context.t0, 'Please try again!');

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 26]]);
    }));

    return function fetchReq() {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.reqFunction = reqFunction;