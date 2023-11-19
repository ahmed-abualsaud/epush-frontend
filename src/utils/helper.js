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
      .join(' '): "NULL"
}

export function beautifulToSnakeCase(str) {

  return str ? str
    .replace(/\s+/g, '_')
    .toLowerCase() : "NULL"
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

export const arrayCombine = (keys, values) => {
  return keys.reduce((result, key, index) => {
    result[key] = values[index];
      return result;
  }, {})
}

export const makeArrayUnique = (array, attribute) => {
  const uniqueValues = {};

  const uniqueArray = array.reduce((result, obj) => {
    const value = obj[attribute];

    if (!uniqueValues[value]) {
      uniqueValues[value] = true;
      result.push(obj);
    }

    return result;
  }, []);

  return uniqueArray;
}

export const castVariable = (variable, type) => {
  switch (type) {
    case 'int':
    case 'integer':
      return parseInt(variable);
    case 'float':
      return parseFloat(variable);
    case 'double':
      return Number(variable);
    case 'string':
      return String(variable);
    case 'bool':
    case 'boolean':
      return Boolean(variable);
    case 'array':
      return Array.isArray(variable) ? variable : [variable];
    case 'json':
      return JSON.stringify(variable);
    case 'object':
      return Object(variable);
    case 'binary':
      return new Uint8Array(variable.split('').map(c => c.charCodeAt(0)));
    default:
      return variable;
  }
}

export const startsWithAny = (string, prefixes) => {
  for (let i = 0; i < prefixes.length; i++) {
    if (string.startsWith(prefixes[i])) {
      return true;
    }
  }
  return false;
}

export const getDatetimeString = (timestamp = null) => {
  const userDate = timestamp === null? new Date() : new Date(timestamp)
  const timezoneOffset = userDate.getTimezoneOffset() * 60000
  const localDate = new Date(userDate.getTime() - timezoneOffset)
  return localDate.toISOString().replace("T", " ").slice(0, 19)
}