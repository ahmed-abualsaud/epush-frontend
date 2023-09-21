export function isEmpty(value, falseTolarent = true) {

  if (typeof value === "object") {
    for (const key in value) {
      if (! isEmpty(value[key])) {
        return false;
      }
    }
    return true;
  }

  if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0) ||
      // (typeof value === "object" && Object.keys(value).length === 0) ||
      (value === false && ! falseTolarent)
  ) {
    return true;
  }

  return false;
}

export function arrayContains(needles, haystack) {

    return needles.every(Set.prototype.has, new Set(haystack))
}

export function randomString(length) {

    let result  = "";
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (var i = 0; i < length; ++i) {
        result += alphabet[Math.floor(alphabet.length * Math.random())];
    }

    return result;
}

export function arrayMergeUnique(array1, array2) {

    return Array.from(new Set(array1.concat(array2)))
}

export function arrayIsEmpty(array) {

    if (!Array.isArray(array)) {
        return false;
    }

    if (array.length === 0) {
        return true;
    }

    return false;
}

export function snakeToBeautifulCase(str) {
    
    return str ? str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '): "NULL";
}

export function beautifulToKebabCase(str) {
  return str? str.replace(/\s+/g, '-').toLowerCase() : "null"
}

export function generatePassword(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]|;:"<>,.?/';
  let password = '';
  let hasUpperCase = false;
  let hasDigit = false;
  let hasSpecialChar = false;

  while (password.length < length) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  for (let i = 0; i < password.length; i++) {
    const char = password[i];
    if (char >= 'A' && char <= 'Z') {
      hasUpperCase = true;
    } else if (char >= '0' && char <= '9') {
      hasDigit = true;
    } else if (chars.includes(char)) {
      hasSpecialChar = true;
    }
  }

  if (!hasUpperCase || !hasDigit || !hasSpecialChar) {
    return generatePassword();
  }

  return password;
}

export function getFileNameFromResponseHeaders(headers) {
  const disposition = headers['content-disposition'];
  const match = disposition.match(/filename="(.+)"/i);
  if (match && match[1]) {
    return match[1];
  }
  return 'export.pdf'; // Default filename if unable to extract from headers
}

export function stippize(num1, num2) {
  let dev = num1/num2
  let mod = num1 % num2
  return parseInt(dev) * num2 + (mod > 0 ? num2 : 0)
}

export function splitStringByLength(str, length) {
  const substrings = [];
  let startIndex = 0;

  while (startIndex < str.length) {
    let substring = str.substr(startIndex, length);
    const newlineCount = (substring.match(/\r\n|\r|\n/g) || []).length;
    const adjustedLength = length - newlineCount;
    substrings.push(substring.substr(0, adjustedLength));
    startIndex += adjustedLength;
  }

  return substrings;
}

export const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (! arr2.includes(typeof arr1[i] === 'string' ? arr1[i].toLowerCase() : arr1[i])) {
      return false;
    }
  }

  return true;
}