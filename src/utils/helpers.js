// import Moralis from 'moralis'
import { ethers } from "ethers"
import { CAPABILITIES_NAMES } from "../constants/common"
const { BLACKLIST,
    BURN,
    MINT,
    TX_FEE,
    WHITELIST,
    SNAPSHOT } = CAPABILITIES_NAMES

export function reArangeFilters(filters = {}) {
    let queryString = "?";
    for (const [key, value] of Object.entries(filters)) {
        // console.log(key, '=> ', value);
        queryString = `${queryString}${key}=${value}&`;
    }
    return queryString;
}

export async function authHeader() {
    const token = await localStorage.getItem("accessToken");
    return `Bearer ${token}`;
}

export function dateTimeFormat(date) {
    const dateTime = new Date(date).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
    return dateTime;
}

export function scrollToTop() {
    window.scrollTo(0, 0);
}

export function csvExport(
    arrData,
    notDeleteAbleFields = [],
    fileName = "download"
) {
    let csvContent = "data:text/csv;charset=utf-8,";
    let modifiedData = arrData;
    for (let obj of modifiedData) {
        if (obj) {
            obj.dateTime = obj.createdAt;
            for (let key of Object.keys(obj)) {
                if (!notDeleteAbleFields.includes(key))
                    delete obj[key];
            }
        }
    }
    csvContent += [
        Object.keys(modifiedData[0]).join(",").replaceAll("_", " "),
        ...modifiedData.map((item) => Object.values(item).join(",")),
    ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

    const data = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", data);
    link.setAttribute("download", `${fileName}.csv`);
    link.click();
}

export function getTemplateForCapability(capabilites) {
    let templateName = "BaseTemplate";

    // if no capability selected ..
    if (capabilites?.length === 0) return templateName;

    const sortedArray = [
        BLACKLIST,
        BURN,
        MINT,
        SNAPSHOT,
        TX_FEE,
        WHITELIST,
    ];

    capabilites.sort(function (left, right) {
        return sortedArray.indexOf(left) - sortedArray.indexOf(right);
    });
    templateName = capabilites.join("") + "Template";
    return templateName;
    // BlacklistBurnMintSnapshotTxFeeWhiteListTemplate
}

export function formatUnits(value, unit = 18) {
    if (!value) return 0;

    const bigValue = ethers.BigNumber.from(String(value));
    return ethers.utils.formatUnits(bigValue, unit);
}


export function getShorterText(text, lettersLength = 6) {
    return text?.slice(0, lettersLength) + '...' + text?.slice(text.length - lettersLength);
}

export function getShorterNumber(text, lettersLength = 9) {
    if (text?.toString().length <= lettersLength) return text
    return text?.toString()?.slice(0, lettersLength) + '...';
}

export function numberWithCommas(x) {
    if (!x) return 0
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getValidUrl(x) {
    return x.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) => schemma ? match : `http://${nonSchemmaUrl}`)
}

export function debounce(fn, delay) {
    var timeoutID = null
    return function () {
        clearTimeout(timeoutID)
        var args = arguments
        var that = this
        timeoutID = setTimeout(function () {
            fn.apply(that, args)
        }, delay)
    }
}

export function calculateAge(dateFuture) {
    const dateNow = new Date();
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    if (days > 0) {
        difference += (days === 1) ? `${days} day ` : `${days} days `;
    }

    difference += (hours === 0 || hours === 1) ? `${hours} hr ` : `${hours} hrs `;

    difference += (minutes === 0 || hours === 1) ? `${minutes} min` : `${minutes} mins`;

    return difference + " ago";
}

export function getPercentage(total, value) {
    return ((parseInt(value) / parseInt(total)) * 100).toFixed(4)
}