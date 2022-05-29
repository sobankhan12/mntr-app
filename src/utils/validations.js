
import store from "../store"
import { profanityCheck } from "../services/common.service"
const walletFormat = /^(0x){1}[0-9a-fA-F]{40}$/i
const floatPatten = /^\d{1,14}(\.\d{1,4})?$/;

export function hasValue(value) {
    return value && value.trim()
}

function getValue(value) {
    return value !== null && value !== undefined ? value : ''
}

export function maxLength(value, length, message) {
    value = getValue(value)
    return value.length <= length || message
}

export function minLength(value, length, message) {
    value = getValue(value)
    return value.length >= length || message
}

export function mail(value, message) {
    value = getValue(value)
    return !value || /\S+@\S+\.\S+/gi.test(value) || message
}

export function ip(value, message = 'Invalid IP address') {
    value = getValue(value)
    return (
        /^(25[0-5\x2A]|2[0-4\x2A][0-9\x2A]|[01\x2A]?[0-9\x2A][0-9\x2A]?)\.(25[0-5\x2A]|2[0-4\x2A][0-9\x2A]|[01\x2A]?[0-9\x2A][0-9\x2A]?)\.(25[0-5\x2A]|2[0-4\x2A][0-9\x2A]|[01\x2A]?[0-9\x2A][0-9\x2A]?)\.(25[0-5\x2A]|2[0-4\x2A][0-9\x2A]|[01\x2A]?[0-9\x2A][0-9\x2A]?)$/.test(
            value
        ) || message
    )
}

export function ipWithStars(value, message = 'Invalid IP address') {
    value = getValue(value)
    return (
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            value
        ) || message
    )
}

export function url(value, message = 'This Url is not valid!') {
    value = getValue(value)
    //https?:\/\/(www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)
    return value /* eslint-disable-next-line */
        ? /^(ftp|http|https):\/\/[^ "]+$/.test(
            value
        ) || message
        : true
}

export function domain(value, message) {
    value = getValue(value)
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/gi.test(value) || message
}

export function phone(value, message) {
    //e.164
    value = getValue(value)
    return /^\+[1-9]\d{10,14}$/gi.test(value) || message
}

export function email(value, message = 'This email address is not valid!') {
    value = getValue(value)
    return value
        ? /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi.test(
            value
        ) || message
        : true
}

export function controlEmailLength(value, message = '') {
    value = getValue(value)
    const [leftSide = '', rightSide = ''] = value.split('@')
    if (leftSide.length > 64 || rightSide.length > 256) {
        return message && message
    }
    return true
}
export function extension(value, message) {
    value = getValue(value)
    return !value.startsWith('.') || message
}

export function required(value, message = 'Required') {
    return !!hasValue(value) || message
}

// export function trim(value, message) {
//     value = getValue(value).trim()
//     return value.length > 0 || message
// }

export function startsWith(value = '', message = 'Cannot start with', startedValue = '') {
    value = getValue(value).toString()
    startedValue = startedValue.toString()
    return !value.startsWith(startedValue) || message
}

export function startsWithSpace(value, message = 'Cannot start with space') {
    value = getValue(value)
    return !value.startsWith(' ') || message
}

export function isNumber(value, message = 'Invalid File Size') {
    value = getValue(value)
    return /^\d+$/gi.test(value) || message
}
export function alphaNumeric(value, message = 'Only alpha numeric value') {
    value = getValue(value)
    return /[a-zA-Z0-9]{2,}/gi.test(value) || message
}
export function between(value, min, max, message = 'It should be between 1-18') {
    const parsedValue = parseInt(value);
    return parsedValue && (parsedValue >= min && parsedValue <= max) || message
    // return /^([1-9]|1[0-8])$/gi.test(value) || message
}

export function isValidHttpUrl(string) {
    try {
        if (string && string.length > 2083) return false
        const url = new URL(string.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `http://${nonSchemmaUrl}`));
        return url && url.host?.includes('.') && !url.host?.includes(' ')
    } catch (_) {
        return false;
    }
}

export function isValidPercentage(value, message = 'Value is out of range') {
    var x = parseFloat(value);
    if (isNaN(x) || x < 0.0001 || x > 100 || !floatPatten.test(x)) {
        return message
    }
    return ''
}

export async function profanity(value) {
    try {
        if (!value) return false
        const response = await profanityCheck(value)
        // console.log(response, 'response');
        const { data: { bad_words_total } } = response;
        if (bad_words_total == 0) return true
        return `Please Remove the profanity words`

    } catch (error) {
        console.log(error, 'error error is the');
        return true
    }
}

export function walletAddress(value, message = 'Please enter correct wallet address') {
    return (walletFormat.test(value)) || message
}


export const walletAddressRules = [
    value => !!value || 'Please enter wallet address',
    value => (walletFormat.test(value)) || 'Please enter correct wallet address',
    value => store.state.auth.ethAddress?.toUpperCase() !== value?.toUpperCase() || 'Your own wallet address is not allowed'
]
