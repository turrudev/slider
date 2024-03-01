const OFFERED_LOCALES = {EN: "en"},
    MESSAGES: Record<string, Record<string, string>> = {
        [OFFERED_LOCALES.EN]: require("../_locales/en.json")
    },
    DEFAULT_LOCALE = OFFERED_LOCALES.EN;


export default class TranslationsManager {
    private static _currentLocale: string;

    static getMessage(messageKey: string): string {
        if (!this._currentLocale) this._currentLocale = getOfferedLocale();

        return MESSAGES[this._currentLocale][messageKey];
    }
}

//TODO deal with the logic of which language to offer
function getOfferedLocale(): string {
    return DEFAULT_LOCALE;
}