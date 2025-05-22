/**
 * @description used for ParaglideJS i18n resulted from types/common.ts
 * @returns {T} The result of the function call or the fallback value.
 */
const getValueFromFunctionOrFallback = <T>(
    obj:any, 
    funcName:string, 
    fallbackValue:T
):T => {
    if(obj && typeof obj[funcName] === 'function' {
        try {
            // call the paraglide m function
            return obj[funcName]();
        } catch (error) {
            console.error(`Error calling function ${funcName} on object ${obj}:`, error);
            // return the fallback value
            return fallbackValue;
        }
    }
    // return the fallback value
    return fallbackValue;
}

export { getValueFromFunctionOrFallback };
