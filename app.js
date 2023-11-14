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

import {
  splitNumberToArray,
  processNumericSegmentLessTehnThousand,
  processNumericSegment,
} from "./utilityFunctions.js";

function numberToLithuanianWords(number, allowNegative = false) {

  if (typeof number !== 'number' || (!allowNegative && number < 0)) {
    throw new Error("Invalid input: 'number' must be a valid number.");
  }
  let isNegative = false;

  if (number < 0) {
    if (!allowNegative) {
      throw new Error("Negative numbers are not allowed.");
    }
    isNegative = true;
    number = Math.abs(number);
  }

  let myNumber = "";
  const splitNumberArray = splitNumberToArray(number);
  const hundreds = processNumericSegmentLessTehnThousand(splitNumberArray);
  const thousands = processNumericSegment(splitNumberArray, "tūkstantis", 2);
  const millions = processNumericSegment(splitNumberArray, "milijonas", 3);
  const billions = processNumericSegment(splitNumberArray, "milijardas", 4);
  const trillions = processNumericSegment(splitNumberArray, "trilijonas", 5);
  const quadrillions = processNumericSegment(splitNumberArray, "kvadrilijonas", 6);

  myNumber += quadrillions + " " + trillions + " " + billions + " " + millions + " " + thousands + " " + hundreds;

  if (isNegative) {
    myNumber = "minus " + myNumber;
  }
  return myNumber.replace(/\s+/g, ' ').trim();
}