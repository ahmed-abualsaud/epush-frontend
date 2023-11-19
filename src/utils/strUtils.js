// import {soundex} from 'soundex-code'
import {diceCoefficient} from 'dice-coefficient'
import { Config } from '../config/Config'

// export function findSimilarWords(text, blacklist) {

//     const result = []
//     const minWeight = 0.3
//     const words = text.split(/\s+/)?.map(word => ({word: word, soundex: soundex(word)}))
//     blacklist = blacklist?.map(blacklistedWord => ({word: blacklistedWord, soundex: soundex(blacklistedWord)}))

//     for (const blacklistedWord of blacklist) {
//         for (const word of words) {
//             const wordDistance = levenshteinDistance(word.word, blacklistedWord.word)
//             const soundexDistance = levenshteinDistance(word.soundex, blacklistedWord.soundex)
//             const wordWeight = (1 - (wordDistance / blacklistedWord.word.length))
//             const soundexWeight = (1 - (soundexDistance / blacklistedWord.soundex.length))
//             const weight = ((wordWeight + soundexWeight + diceCoefficient(word.word, blacklistedWord.word)) / 3)

//             if (weight >= minWeight) {
//               result.push({
//                 textWord: word.word, 
//                 blacklistedWord: blacklistedWord.word, 
//                 wordDistance: wordDistance,
//                 soundexDistance: soundexDistance,
//                 weight: weight
//               })
//             }
//         }
//     }

//     result.sort((a, b) => b.weight - a.weight)
//     return result
// } 

export function findSimilarWords(text, blacklist, percentage = 100) {

  const result = []
  const minWeight = (percentage / 100)

  const words = text.split(/\s+/)
  for (const blacklistedWord of blacklist) {
      for (const word of words) {
          const weight = diceCoefficient(word, blacklistedWord)

          if (weight >= minWeight) {
            result.push({
              textWord: word, 
              blacklistedWord: blacklistedWord, 
              weight: weight
            })
          }
      }
  }

  const doubleWords = splitTextIntoChunks(text, 2)
  for (const blacklistedWord of blacklist) {
    for (const word of doubleWords) {
        const weight = diceCoefficient(word, blacklistedWord)

        if (weight >= minWeight) {
          result.push({
            textWord: word, 
            blacklistedWord: blacklistedWord, 
            weight: weight
          })
        }
    }
  }

  const tripleWords = splitTextIntoChunks(text, 3)
  for (const blacklistedWord of blacklist) {
    for (const word of tripleWords) {
        const weight = diceCoefficient(word, blacklistedWord)

        if (weight >= minWeight) {
          result.push({
            textWord: word, 
            blacklistedWord: blacklistedWord, 
            weight: weight
          })
        }
    }
  }

  result.sort((a, b) => b.weight - a.weight)
  return result
} 


export function levenshteinDistance(str1, str2) {
    const m = str1.length
    const n = str2.length
  
    if (m === 0) return n
    if (n === 0) return m
  
    let previousRow = new Array(n + 1)
    let currentRow = new Array(n + 1)
  
    for (let j = 0; j <= n; j++) {
      previousRow[j] = j
    }
  
    for (let i = 1; i <= m; i++) {
      currentRow[0] = i
  
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1] || str1[i - 1] === ' ' || str2[j - 1] === ' ') {
          currentRow[j] = previousRow[j - 1]
        } else {
          currentRow[j] = Math.min(
            previousRow[j] + 1, // Deletion
            currentRow[j - 1] + 1, // Insertion
            previousRow[j - 1] + 1 // Substitution
          )
        }
      }
  
      // Swap rows
      [previousRow, currentRow] = [currentRow, previousRow]
    }
  
    return previousRow[n]
  }
  

  export function fuzzyMatch(needle, heystack) {
    const threshold = Math.floor(needle.length / 3) // Adjust the threshold as needed
  
    for (const heystackWord of heystack) {
      const distance = levenshteinDistance(needle, heystackWord)
      if (distance <= threshold) {
        return true // Fuzzy match found
      }
    }
  
    return false // No fuzzy match found
  }
  
  
  export function fuzzyMatchParagraph(needle, heystack) {
    const paragraphLength = needle.length
  
    for (const heystackWord of heystack) {
      const distance = levenshteinDistance(needle, heystackWord)
      if (distance >= (paragraphLength - heystackWord.length + 2)) {
        return true // Fuzzy match found
      }
    }
  
    return false // No fuzzy match found
  }

  function splitTextIntoChunks(text, n) {
    const words = text.split(/\s+/)
    const chunks = []
  
    for (let i = 0; i < words.length; i += n) {
      const chunk = words.slice(i, i + n).join(' ')
      chunks.push(chunk)
    }
  
    return chunks
  }

  const publicKey = Config.get("REACT_APP_PUBLIC_KEY")
  const secretKey = Config.get("REACT_APP_SECRET_KEY")

  export const encodeString = (string) => {
    return btoa(encodeURIComponent(string))
  }

  export const randomString = (length) => {

    let result  = ""
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (let i = 0; i < length; ++i) {
        result += alphabet[Math.floor(alphabet.length * Math.random())]
    }

    return result
  }

  export const isIPAddress = (ipAddress) => {
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/
    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
  
    if (ipv4Pattern.test(ipAddress) || ipv6Pattern.test(ipAddress)) {
      return true
    } else {
      return false
    }
  }
  
  export async function generateApiKey(userID) {
    const version = "1.0"
    const timestamp = Date.now()
    const randomBytes = new Uint8Array(16)
    crypto.getRandomValues(randomBytes)
    const signature = await hash(userID)
    const apiKey = `epush-v${version}-${timestamp}-${arrayToHex(randomBytes)}-${signature}`
    return apiKey
  }
  
  async function hash(data) {
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data)
    const buffer = await crypto.subtle.digest("SHA-256", dataBuffer)
    return arrayBufferToHex(buffer)
  }
  
  function arrayBufferToHex(buffer) {
    const hexBytes = Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, "0")).join("")
    return hexBytes.substring(0, hexBytes.length / 2)
  }
  
  function arrayToHex(array) {
    const hexBytes = Array.from(array).map(byte => byte.toString(16).padStart(2, "0")).join("")
    return hexBytes.substring(0, hexBytes.length / 2)
  }