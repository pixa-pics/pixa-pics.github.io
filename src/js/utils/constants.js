import {createBrowserHistory} from "history";
const HISTORY = createBrowserHistory();

import en_locale from "date-fns/locale/en-US";
import fr_locale from "date-fns/locale/fr";
import id_locale from "date-fns/locale/id";
import pt_locale from "date-fns/locale/pt";
import it_locale from "date-fns/locale/it";
import de_locale from "date-fns/locale/de";
import ja_locale from "date-fns/locale/ja";
import zh_locale from "date-fns/locale/zh-CN";
import ko_locale from "date-fns/locale/ko";
import ru_locale from "date-fns/locale/ru";
import hi_locale from "date-fns/locale/hi";
import es_locale from "date-fns/locale/es";

const LANGUAGES = ["en", "fr", "id", "pt", "it", "de", "ja", "zh", "ko", "ru", "hi", "es"];

const DATE_FNS_LOCALE_MAP = {
    en: en_locale,
    fr: fr_locale,
    id: id_locale,
    pt: pt_locale,
    it: it_locale,
    de: de_locale,
    ja: ja_locale,
    zh: zh_locale,
    ko: ko_locale,
    ru: ru_locale,
    hi: hi_locale,
    es: es_locale,
}

/*
 * The page routes system is working with regex, tabs system (weird) isn't great but it will change
 */
const PAGE_ROUTES = [
    {
        page_regex: /\/*/,
        page_name: "unknown",
        tabs: ""
    },
    {
        page_regex: /\/$/,
        page_name: "home",
        tabs: ""
    },
    {
        page_regex: /\/(settings)$/,
        page_name: "settings",
        tabs: ""
    },
    {
        page_regex: /\/(pixel)$/,
        page_name: "pixel",
        tabs: ""
    }
];

import React from 'react';

import SaudiArabia from "../twemoji/react/1F1F81F1E6";
import Bangladesh from "../twemoji/react/1F1E71F1E9";
import India from "../twemoji/react/1F1Ee1F1F3";
import CzechRepublic from "../twemoji/react/1F1E81F1Ff";
import Denmark from "../twemoji/react/1F1E91F1F0";
import Austria from "../twemoji/react/1F1E61F1F9";
import Switzerland from "../twemoji/react/1F1E81F1Ed";
import Germany from "../twemoji/react/1F1E91F1Ea";
import Greece from "../twemoji/react/1F1Ec1F1F7";
import Australia from "../twemoji/react/1F1E61F1Fa";
import Canada from "../twemoji/react/1F1E81F1E6";
import UnitedKingdom from "../twemoji/react/1F1Ec1F1E7";
import Ireland from "../twemoji/react/1F1Ee1F1Ea";
import BritishOceanTerritory from "../twemoji/react/1F1Ee1F1F4";
import NewZealand from "../twemoji/react/1F1F31F1Ff";
import UnitedStates from "../twemoji/react/1F1Fa1F1F8";
import SouthAfrica from "../twemoji/react/1F1Ff1F1E6";
import Argentina from "../twemoji/react/1F1E61F1F7";
import Chile from "../twemoji/react/1F1E81F1F1";
import Colombia from "../twemoji/react/1F1E81F1F4";
import Spain from "../twemoji/react/1F1Ea1F1F8";
import Mexico from "../twemoji/react/1F1F21F1Fd";
import Finland from "../twemoji/react/1F1Eb1F1Ee";
import Belgium from "../twemoji/react/1F1E71F1Ea";
import France from "../twemoji/react/1F1Eb1F1F7";
import Israel from "../twemoji/react/1F1Ee1F1F1";
import Hungary from "../twemoji/react/1F1Ed1F1Fa";
import Indonesia from "../twemoji/react/1F1Ee1F1E9";
import Italy from "../twemoji/react/1F1Ee1F1F9";
import Japan from "../twemoji/react/1F1Ef1F1F5";
import Korean from "../twemoji/react/1F1F01F1F7";
import Netherland from "../twemoji/react/1F1F31F1F1";
import Norway from "../twemoji/react/1F1F31F1F4";
import Poland from "../twemoji/react/1F1F51F1F1";
import Brazil from "../twemoji/react/1F1E71F1F7";
import Europe from "../twemoji/react/1F1Ea1F1Fa";
import Romania from "../twemoji/react/1F1F71F1F4";
import Russian from "../twemoji/react/1F1F71F1Fa";
import Slovakia from "../twemoji/react/1F1F81F1F0";
import Sweden from "../twemoji/react/1F1F81F1Ea";
import SriLanka from "../twemoji/react/1F1F11F1F0";
import Thailand from "../twemoji/react/1F1F91F1Ed";
import Turkey from "../twemoji/react/1F1F91F1F7";
import China from "../twemoji/react/1F1E81F1F3";
import HongKong from "../twemoji/react/1F1Ed1F1F0";
import Taiwan from "../twemoji/react/1F1F91F1Fc";

const LOCALES = [
    {code: "ar-SA", name: "Arabic (Saudi Arabia)", svg: <SaudiArabia />},
    {code: "bn-BD", name: "Bangla (Bangladesh)", svg: <Bangladesh />},
    {code: "bn-IN", name: "Bangla (India)", svg: <India />},
    {code: "cs-CZ", name:  "Czech (Czech Republic)", svg: <CzechRepublic />},
    {code: "da-DK", name:  "Danish (Denmark)", svg: <Denmark />},
    {code: "de-AT", name:  "Austrian German", svg: <Austria />},
    {code: "de-CH", name: "\"Swiss\" German", svg: <Switzerland />},
    {code: "de-DE", name: "Standard German (as spoken in Germany)", svg: <Germany />},
    {code: "el-GR", name: "Modern Greek", svg: <Greece />},
    {code: "en-AU", name: "Australian English", svg: <Australia />},
    {code: "en-CA", name: "Canadian English", svg: <Canada />},
    {code: "en-GB", name: "British English", svg: <UnitedKingdom />},
    {code: "en-IE", name: "Irish English", svg: <Ireland />},
    {code: "en-IN", name: "Indian English", svg: <BritishOceanTerritory />},
    {code: "en-NZ", name: "New Zealand English", svg: <NewZealand />},
    {code: "en-US", name: "US English", svg: <UnitedStates />},
    {code: "en-ZA", name: "English (South Africa)", svg: <SouthAfrica />},
    {code: "es-AR", name: "Argentine Spanish", svg: <Argentina />},
    {code: "es-CL", name: "Chilean Spanish", svg: <Chile />},
    {code: "es-CO", name: "Colombian Spanish", svg: <Colombia />},
    {code: "es-ES", name: "Castilian Spanish (as spoken in Central-Northern Spain)", svg: <Spain />},
    {code: "es-MX", name: "Mexican Spanish", svg: <Mexico />},
    {code: "es-US", name: "American Spanish", svg: <UnitedStates />},
    {code: "fi-FI", name: "Finnish (Finland)", svg: <Finland />},
    {code: "fr-BE", name: "Belgian French", svg: <Belgium />},
    {code: "fr-CA", name: "Canadian French", svg: <Canada />},
    {code: "fr-CH", name: "\"Swiss\" French", svg: <Switzerland />},
    {code: "fr-FR", name: "Standard French (especially in France)", svg: <France />},
    {code: "he-IL", name: "Hebrew (Israel)", svg: <Israel />},
    {code: "hi-IN", name: "Hindi (India)", svg: <India />},
    {code: "hu-HU", name: "Hungarian (Hungary)", svg: <Hungary />},
    {code: "id-ID", name: "Indonesian (Indonesia)", svg: <Indonesia />},
    {code: "it-CH", name: "\"Swiss\" Italian", svg: <Switzerland />},
    {code: "it-IT", name: "Standard Italian (as spoken in Italy)", svg: <Italy />},
    {code: "ja-JP", name: "Japanese (Japan)", svg: <Japan />},
    {code: "ko-KR", name: "Korean (Republic of Korea)", svg: <Korean />},
    {code: "nl-BE", name: "Belgian Dutch", svg: <Belgium />},
    {code: "nl-NL", name: "Standard Dutch (as spoken in The Netherlands)", svg: <Netherland />},
    {code: "no-NO", name: "Norwegian (Norway)", svg: <Norway />},
    {code: "pl-PL", name: "Polish (Poland)", svg: <Poland />},
    {code: "pt-BR", name: "Brazilian Portuguese", svg: <Brazil />},
    {code: "pt-PT", name: "European Portuguese (as written and spoken in Portugal)", svg: <Europe />},
    {code: "ro-RO", name: "Romanian (Romania)", svg: <Romania />},
    {code: "ru-RU", name: "Russian (Russian Federation)", svg: <Russian />},
    {code: "sk-SK", name: "Slovak (Slovakia)", svg: <Slovakia />},
    {code: "sv-SE", name: "Swedish (Sweden)", svg: <Sweden />},
    {code: "ta-IN", name: "Indian Tamil", svg: <India />},
    {code: "ta-LK", name: "Sri Lankan Tamil", svg: <SriLanka />},
    {code: "th-TH", name: "Thai (Thailand)", svg: <Thailand />},
    {code: "tr-TR", name: "Turkish (Turkey)", svg: <Turkey />},
    {code: "zh-CN", name: "Mainland China, simplified characters", svg: <China />},
    {code: "zh-HK", name: "Hong Kong, traditional characters", svg: <HongKong />},
    {code: "zh-TW", name: "Taiwan, traditional characters", svg: <Taiwan />},
];

// We use this to know which currency to select when we have the country code known
const CURRENCY_COUNTRIES = {
    ARS: ["AR"],
    AUD: ["AU", "CC", "CX", "HM", "KI", "NF", "NR", "TV"],
    BDT: ["BD"],
    BRL: ["BR"],
    CAD: ["CA"],
    CHF: ["CH", "LI"],
    CLP: ["CL"],
    CNY: ["CN"],
    COP: ["CO"],
    CZK: ["CZ"],
    DKK: ["DK", "FO", "GL"],
    EUR: ["AD", "AT", "AX", "BE", "BL", "CY", "DE", "EE", "ES", "FI", "FR", "GF", "GP", "GR", "IE", "IT", "LU", "MC", "ME", "MF", "MQ", "MT", "NL", "PM", "PT", "RE", "SI", "SK", "SM", "TF", "VA", "YT"],
    GBP: ["GB", "GG", "GS", "IM", "JE"],
    HKD: ["HK"],
    HUF: ["HU"],
    IDR: ["ID"],
    ILS: ["IL", "PS"],
    INR: ["IN"],
    JPY: ["JP"],
    KRW: ["KR"],
    LKR: ["LK"],
    MXN: ["MX"],
    NOK: ["BV", "NO", "SJ"],
    NZD: ["CK", "NU", "NZ", "PN", "TK"],
    PLN: ["PL"],
    RON: ["RO"],
    RUB: ["RU"],
    SAR: ["SA"],
    SEK: ["SE"],
    THB: ["TH"],
    TRY: ["TR"],
    TWD: ["TW"],
    USD: ["AS", "BQ", "EC", "FM", "GU", "IO", "MH", "MP", "PR", "PW", "TC", "TL", "UM", "US", "VG", "VI"],
    ZAR: ["ZA"],
};

const FIRST_WEEK_DAY_BY_COUNTRY = {
    "001": "mon",
    "AD": "mon",
    "AE": "sat",
    "AF": "sat",
    "AG": "sun",
    "AI": "mon",
    "AL": "mon",
    "AM": "mon",
    "AN": "mon",
    "AR": "mon",
    "AS": "sun",
    "AT": "mon",
    "AU": "sun",
    "AX": "mon",
    "AZ": "mon",
    "BA": "mon",
    "BD": "sun",
    "BE": "mon",
    "BG": "mon",
    "BH": "sat",
    "BM": "mon",
    "BN": "mon",
    "BR": "sun",
    "BS": "sun",
    "BT": "sun",
    "BW": "sun",
    "BY": "mon",
    "BZ": "sun",
    "CA": "sun",
    "CH": "mon",
    "CL": "mon",
    "CM": "mon",
    "CN": "sun",
    "CO": "sun",
    "CR": "mon",
    "CY": "mon",
    "CZ": "mon",
    "DE": "mon",
    "DJ": "sat",
    "DK": "mon",
    "DM": "sun",
    "DO": "sun",
    "DZ": "sat",
    "EC": "mon",
    "EE": "mon",
    "EG": "sat",
    "ES": "mon",
    "ET": "sun",
    "FI": "mon",
    "FJ": "mon",
    "FO": "mon",
    "FR": "mon",
    "GB": "mon",
    "GB-alt-variant": "sun",
    "GE": "mon",
    "GF": "mon",
    "GP": "mon",
    "GR": "mon",
    "GT": "sun",
    "GU": "sun",
    "HK": "sun",
    "HN": "sun",
    "HR": "mon",
    "HU": "mon",
    "ID": "sun",
    "IE": "mon",
    "IL": "sun",
    "IN": "sun",
    "IQ": "sat",
    "IR": "sat",
    "IS": "mon",
    "IT": "mon",
    "JM": "sun",
    "JO": "sat",
    "JP": "sun",
    "KE": "sun",
    "KG": "mon",
    "KH": "sun",
    "KR": "sun",
    "KW": "sat",
    "KZ": "mon",
    "LA": "sun",
    "LB": "mon",
    "LI": "mon",
    "LK": "mon",
    "LT": "mon",
    "LU": "mon",
    "LV": "mon",
    "LY": "sat",
    "MC": "mon",
    "MD": "mon",
    "ME": "mon",
    "MH": "sun",
    "MK": "mon",
    "MM": "sun",
    "MN": "mon",
    "MO": "sun",
    "MQ": "mon",
    "MT": "sun",
    "MV": "fri",
    "MX": "sun",
    "MY": "mon",
    "MZ": "sun",
    "NI": "sun",
    "NL": "mon",
    "NO": "mon",
    "NP": "sun",
    "NZ": "mon",
    "OM": "sat",
    "PA": "sun",
    "PE": "sun",
    "PH": "sun",
    "PK": "sun",
    "PL": "mon",
    "PR": "sun",
    "PT": "sun",
    "PY": "sun",
    "QA": "sat",
    "RE": "mon",
    "RO": "mon",
    "RS": "mon",
    "RU": "mon",
    "SA": "sun",
    "SD": "sat",
    "SE": "mon",
    "SG": "sun",
    "SI": "mon",
    "SK": "mon",
    "SM": "mon",
    "SV": "sun",
    "SY": "sat",
    "TH": "sun",
    "TJ": "mon",
    "TM": "mon",
    "TR": "mon",
    "TT": "sun",
    "TW": "sun",
    "UA": "mon",
    "UM": "sun",
    "US": "sun",
    "UY": "mon",
    "UZ": "mon",
    "VA": "mon",
    "VE": "sun",
    "VI": "sun",
    "VN": "mon",
    "WS": "sun",
    "XK": "mon",
    "YE": "sun",
    "ZA": "sun",
    "ZW": "sun"
};

module.exports = {
    LANGUAGES: LANGUAGES,
    DATE_FNS_LOCALE_MAP: DATE_FNS_LOCALE_MAP,
    HISTORY: HISTORY,
    PAGE_ROUTES: PAGE_ROUTES,
    LOCALES: LOCALES,
    CURRENCY_COUNTRIES: CURRENCY_COUNTRIES,
    FIRST_WEEK_DAY_BY_COUNTRY: FIRST_WEEK_DAY_BY_COUNTRY,
};
