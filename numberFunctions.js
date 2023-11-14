/*
Copyright [2023] [Ronaldas Česonis]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

"use strict";

const numbers1to19 = [
  "vienas",
  "du",
  "trys",
  "keturi",
  "penki",
  "šeši",
  "septyni",
  "aštuoni",
  "devyni",
  "dešimt",
  "vienuolika",
  "dvylika",
  "trylika",
  "keturiolika",
  "penkiolika",
  "šešiolika",
  "septyniolika",
  "aštuoniolika",
  "devyniolika",
];

const tensMultiples = [
  "dvidešimt",
  "trisdešimt",
  "keturiasdešimt",
  "penkiasdešimt",
  "šešiasdešimt",
  "septyniasdešimt",
  "aštuoniasdešimt",
  "devyniasdešimt",
];

const unitsMap = {
  tūkstantis: ["tūkstantis", "tūkstančiai", "tūkstančių"],
  milijonas: ["milijonas", "milijonai", "milijonų"],
  milijardas: ["milijardas", "milijardai", "milijardų"],
  trilijonas: ["trilijonas", "trilijonai", "trilijonų"],
  kvadrilijonas: ["kvadrilijonas", "kvadrilijonai", "kvadrilijonų"],
  // Add more units as needed
};

export function lessThanHundreds(num) {
  let myNumber = "";
  if (num < 20) {
    myNumber += numbers1to19[num - 1];
  } else if (num < 100) {
    const tensDigit = Math.floor(num / 10);
    const unitsDigit = num % 10;
    if (unitsDigit === 0) {
      myNumber += tensMultiples[tensDigit - 2];
    } else {
      myNumber +=
        tensMultiples[tensDigit - 2] + " " + numbers1to19[unitsDigit - 1];
    }
  }
  return myNumber;
}

export function hundreds(num) {
  let myNumber = "";
  const hundredsDigit = Math.floor(num / 100);
  const remainderOfhundredsDigit = num % 100;

  if (remainderOfhundredsDigit === 0) {
    myNumber +=
      numbers1to19[hundredsDigit - 1] +
      (hundredsDigit === 1 ? " šimtas" : " šimtai");
  } else {
    myNumber +=
      numbers1to19[hundredsDigit - 1] +
      (hundredsDigit === 1 ? " šimtas " : " šimtai ") +
      lessThanHundreds(remainderOfhundredsDigit);
  }
  return myNumber;
}

export function numberNaming(num, units) {
  let myNumber = "";
  if (num < 100) {
    if (num === 1) {
      return (myNumber += lessThanHundreds(num) + ` ${unitsMap[units][0]}`);
    } else if (num >= 2 && num <= 9) {
      return (myNumber += lessThanHundreds(num) + ` ${unitsMap[units][1]}`);
    } else if (num >= 10 && num <= 19) {
      return (myNumber += lessThanHundreds(num) + ` ${unitsMap[units][2]}`);
    } else if (num % 10 === 0) {
      return (myNumber += lessThanHundreds(num) + ` ${unitsMap[units][2]}`);
    } else if (num % 10 === 1) {
      return (myNumber += lessThanHundreds(num) + ` ${unitsMap[units][0]}`);
    } else if (num < 100) {
      return (myNumber += lessThanHundreds(num) + ` ${unitsMap[units][1]}`);
    }
  } else {
    if (num % 100 === 1) {
      return (myNumber += hundreds(num) + ` ${unitsMap[units][0]}`);
    } else if (num % 100 >= 2 && num % 100 <= 9) {
      return (myNumber += hundreds(num) + ` ${unitsMap[units][1]}`);
    } else if (num % 100 >= 10 && num % 100 <= 19) {
      return (myNumber += hundreds(num) + ` ${unitsMap[units][2]}`);
    } else if (num % 10 === 0) {
      return (myNumber += hundreds(num) + ` ${unitsMap[units][2]}`);
    } else if (num % 10 === 1) {
      return (myNumber += hundreds(num) + ` ${unitsMap[units][0]}`);
    } else if (num % 100 < 100) {
      return (myNumber += hundreds(num) + ` ${unitsMap[units][1]}`);
    }
  }
}
