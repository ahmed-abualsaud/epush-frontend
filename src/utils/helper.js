export function isNull(value) {

    return value === undefined || value === null ||  value === ""
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