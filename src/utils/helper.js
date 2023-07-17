export function isEmpty(value) {
    if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0) ||
        // (typeof value === "object" && Object.keys(value).length === 0) ||
        value === false
    ) {
      return true;
    }
  
    if (typeof value === "object") {
      for (const key in value) {
        if (!isEmpty(value[key])) {
          return false;
        }
      }
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
    return str
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }