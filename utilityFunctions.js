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
