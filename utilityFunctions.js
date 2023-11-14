"use strict";

import { lessThanHundreds, hundreds, numberNaming } from "./numberFunctions.js";

export function splitNumberToArray(number) {
  if (number > 9_007_199_254_740_991) {
    throw new Error("Provided number is too big for JavaScript to work properly!!!");
  }

  const numberString = number.toString();
  const segments = [];

  let lastSegmentLength = numberString.length % 3;
  if (lastSegmentLength === 0) {
    lastSegmentLength = 3;
  }

  let i = 0;

  while (i < numberString.length) {
    const segmentLength = i === 0 ? lastSegmentLength : 3;
    const segmentValue = parseInt(
      numberString.substring(i, i + segmentLength), 10);
    segments.push(segmentValue);
    i += segmentLength;
  }

  return segments;
}

export function processNumericSegmentLessTehnThousand(number) {
  let num = "";
  if (number.length > 0) {
    const lastDigit = number[number.length - 1];
    if (lastDigit < 100 && lastDigit !== 0) {
      return (num += lessThanHundreds(lastDigit));
    } else if (lastDigit >= 100) {
      return (num += hundreds(lastDigit));
    } else {
      return (num += "nulis");
    }
  }
}

export function processNumericSegment(number, units, length) {
  let num = "";

  if (number.length > length - 1) {
    const digitToProcess = number[number.length - length];
    const arrayIndex = number.length - length;

    if (digitToProcess < 100 && digitToProcess !== 0) {
      return (num += numberNaming(parseInt(number[arrayIndex], 10), units));
    } else if (digitToProcess >= 100) {
      return (num += numberNaming(
        parseInt(number[arrayIndex], 10), units, 100));
    } else {
      return (num += "");
    }
  } else {
    return (num += "");
  }
}
