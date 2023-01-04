import { TableToJsonOptions, Tabletojson } from "./Tabletojson";

const tableToJSON = (data: string, options?: TableToJsonOptions) => {
    return Tabletojson.convert(data, options)
}

const isURL = (str: string) => {
    return !!new RegExp('^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$', 'i').test(str);
}

const getRawHtmlUrl = (workbookId: string, sheetId?: string) => {
    return `https://docs.google.com/spreadsheets/d/${workbookId}/gviz/tq?tqx=out:html&tq&gid=${sheetId}`
}

const getHtmlUrl = (workbookId: string, sheetId?: string) => {
    return `https://docs.google.com/spreadsheets/d/${workbookId}/htmlview?gid=${sheetId}`
}

//https://stackoverflow.com/questions/11557526/deserialize-query-string-to-json-object
const queryStringToObject = (queryString: string) => {
    if (queryString.indexOf('?') > -1) {
        queryString = queryString.split('?')[1];
    }
    var pairs = queryString.split('&');
    var result = {} as any;
    pairs.forEach(function (pair) {
        const found_pair = pair.split('=');
        result[found_pair[0]] = decodeURIComponent(found_pair[1] || '');
    });
    return result;
}


export { tableToJSON, getRawHtmlUrl, getHtmlUrl, queryStringToObject }