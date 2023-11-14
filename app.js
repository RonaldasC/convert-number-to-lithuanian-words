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