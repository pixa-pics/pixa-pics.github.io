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
    },
    {
        page_regex: /\/(gallery)(\/created|\/active|\/hot|\/trending)?(\/\@[a-z0-9\-\.]+)?(\/[a-zA-Z0-9\-]+)?(\/search\/.{0,64})?$/,
        page_name: "gallery",
        tabs: ""
    },
    {
        page_regex: /\/(accounts)$/,
        page_name: "accounts",
        tabs: ""
    },
    {
        page_regex: /\/(dashboard)$/,
        page_name: "dashboard",
        tabs: ""
    },
    {
        page_regex: /\/(coins)$/,
        page_name: "coins",
        tabs: ""
    },
    {
        page_regex: /\/(coins)(\/bitcoin|\/dash|\/dogecoin|\/litecoin|\/v-systems|\/hive|\/hive_dollar)(\/balance|\/transactions|\/charts|\/send(\/[a-zA-Z0-9]+)?|\/receive)?$/,
        page_name: "coin",
        tabs: "coin"
    },
    {
        page_regex: /\/(about)((\/info(\/intellectual|\/terms)?)|(\/wiki(\/topup|\/mixer|\/swap|\/crypt|\/contribute)?)|(\/faq(\/organization|\/security|\/privacy|\/fees|\/usage|\/myths)?))?$/,
        page_name: "about",
        tabs: ""
    }
];

const COINS_IMAGES = {
    "bitcoin": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPCEtLSBDcmVhdG9yOiBDb3JlbERSQVcgMjAxOSAoNjQtQml0KSAtLT4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZlcnNpb249IjEuMSIgc2hhcGUtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIHRleHQtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIKdmlld0JveD0iMCAwIDQwOTEuMjcgNDA5MS43MyIKIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogeG1sbnM6eG9kbT0iaHR0cDovL3d3dy5jb3JlbC5jb20vY29yZWxkcmF3L29kbS8yMDAzIj4KIDxnIGlkPSJMYXllcl94MDAyMF8xIj4KICA8bWV0YWRhdGEgaWQ9IkNvcmVsQ29ycElEXzBDb3JlbC1MYXllciIvPgogIDxnIGlkPSJfMTQyMTM0NDAyMzMyOCI+CiAgIDxwYXRoIGZpbGw9IiNGNzkzMUEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTQwMzAuMDYgMjU0MC43N2MtMjczLjI0LDEwOTYuMDEgLTEzODMuMzIsMTc2My4wMiAtMjQ3OS40NiwxNDg5LjcxIC0xMDk1LjY4LC0yNzMuMjQgLTE3NjIuNjksLTEzODMuMzkgLTE0ODkuMzMsLTI0NzkuMzEgMjczLjEyLC0xMDk2LjEzIDEzODMuMiwtMTc2My4xOSAyNDc5LC0xNDg5Ljk1IDEwOTYuMDYsMjczLjI0IDE3NjMuMDMsMTM4My41MSAxNDg5Ljc2LDI0NzkuNTdsMC4wMiAtMC4wMnoiLz4KICAgPHBhdGggZmlsbD0id2hpdGUiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTI5NDcuNzcgMTc1NC4zOGM0MC43MiwtMjcyLjI2IC0xNjYuNTYsLTQxOC42MSAtNDUwLC01MTYuMjRsOTEuOTUgLTM2OC44IC0yMjQuNSAtNTUuOTQgLTg5LjUxIDM1OS4wOWMtNTkuMDIsLTE0LjcyIC0xMTkuNjMsLTI4LjU5IC0xNzkuODcsLTQyLjM0bDkwLjE2IC0zNjEuNDYgLTIyNC4zNiAtNTUuOTQgLTkyIDM2OC42OGMtNDguODQsLTExLjEyIC05Ni44MSwtMjIuMTEgLTE0My4zNSwtMzMuNjlsMC4yNiAtMS4xNiAtMzA5LjU5IC03Ny4zMSAtNTkuNzIgMjM5Ljc4YzAsMCAxNjYuNTYsMzguMTggMTYzLjA1LDQwLjUzIDkwLjkxLDIyLjY5IDEwNy4zNSw4Mi44NyAxMDQuNjIsMTMwLjU3bC0xMDQuNzQgNDIwLjE1YzYuMjYsMS41OSAxNC4zOCwzLjg5IDIzLjM0LDcuNDkgLTcuNDksLTEuODYgLTE1LjQ2LC0zLjg5IC0yMy43MywtNS44N2wtMTQ2LjgxIDU4OC41N2MtMTEuMTEsMjcuNjIgLTM5LjMxLDY5LjA3IC0xMDIuODcsNTMuMzMgMi4yNSwzLjI2IC0xNjMuMTcsLTQwLjcyIC0xNjMuMTcsLTQwLjcybC0xMTEuNDYgMjU2Ljk4IDI5Mi4xNSA3Mi44M2M1NC4zNSwxMy42MyAxMDcuNjEsMjcuODkgMTYwLjA2LDQxLjNsLTkyLjkgMzczLjAzIDIyNC4yNCA1NS45NCA5MiAtMzY5LjA3YzYxLjI2LDE2LjYzIDEyMC43MSwzMS45NyAxNzguOTEsNDYuNDNsLTkxLjY5IDM2Ny4zMyAyMjQuNTEgNTUuOTQgOTIuODkgLTM3Mi4zM2MzODIuODIsNzIuNDUgNjcwLjY3LDQzLjI0IDc5MS44MywtMzAzLjAyIDk3LjYzLC0yNzguNzggLTQuODYsLTQzOS41OCAtMjA2LjI2LC01NDQuNDQgMTQ2LjY5LC0zMy44MyAyNTcuMTgsLTEzMC4zMSAyODYuNjQsLTMyOS42MWwtMC4wNyAtMC4wNXptLTUxMi45MyA3MTkuMjZjLTY5LjM4LDI3OC43OCAtNTM4Ljc2LDEyOC4wOCAtNjkwLjk0LDkwLjI5bDEyMy4yOCAtNDk0LjJjMTUyLjE3LDM3Ljk5IDY0MC4xNywxMTMuMTcgNTY3LjY3LDQwMy45MXptNjkuNDMgLTcyMy4zYy02My4yOSwyNTMuNTggLTQ1My45NiwxMjQuNzUgLTU4MC42OSw5My4xNmwxMTEuNzcgLTQ0OC4yMWMxMjYuNzMsMzEuNTkgNTM0Ljg1LDkwLjU1IDQ2OC45NCwzNTUuMDVsLTAuMDIgMHoiLz4KICA8L2c+CiA8L2c+Cjwvc3ZnPgo=",
    "dash": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzAwOENFNyIvPjxnIGZpbGw9IiNGRkYiPjxwYXRoIGQ9Ik0xOS4wODYgOC4wMDRIMTEuODFsLS42MDIgMy4zNjcgNi41NjIuMDFjMy4yMzEgMCA0LjE5IDEuMTczIDQuMTU5IDMuMTItLjAxNC45OTgtLjQ0OSAyLjY4Ni0uNjMzIDMuMjMtLjQ5NyAxLjQ2LTEuNTIxIDMuMTIyLTUuMzU5IDMuMTE3bC02LjM3OC0uMDA0LS42MDIgMy4zNzFoNy4yNTdjMi41NTkgMCAzLjY0OS0uMjk5IDQuOC0uODMgMi41NTQtMS4xNzggNC4wNzUtMy43MDEgNC42ODYtNi45OTQuOTA2LTQuOS0uMjI0LTguMzg3LTYuNjE1LTguMzg3eiIvPjxwYXRoIGQ9Ik0xNS44MDcgMTUuNzk4Yy4yMzctLjk4NS4zMTItMS4zOC4zMTItMS4zOEg4LjY3M2MtMS45MDQgMC0yLjE3NiAxLjI0LTIuMzU3IDEuOTktLjIzNy45ODEtLjMxMiAxLjM4MS0uMzEyIDEuMzgxaDcuNDQ3YzEuOTAzIDAgMi4xNzUtMS4yNCAyLjM1Ni0xLjk5MXoiLz48L2c+PC9nPjwvc3ZnPg==",
    "dogecoin": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAwIDIwMDAiIHdpZHRoPSIyNTAwIiBoZWlnaHQ9IjI1MDAiPjxnIGZpbGw9IiNjMmE2MzMiPjxwYXRoIGQ9Ik0xMDI0IDY1OUg4ODEuMTJ2MjgxLjY5aDIyNC43OXYxMTcuOTRIODgxLjEydjI4MS42N0gxMDMxYzM4LjUxIDAgMzE2LjE2IDQuMzUgMzE1LjczLTMyNy43MlMxMDc3LjQ0IDY1OSAxMDI0IDY1OXoiLz48cGF0aCBkPSJNMTAwMCAwQzQ0Ny43MSAwIDAgNDQ3LjcxIDAgMTAwMHM0NDcuNzEgMTAwMCAxMDAwIDEwMDAgMTAwMC00NDcuNzEgMTAwMC0xMDAwUzE1NTIuMjkgMCAxMDAwIDB6bTM5LjI5IDE1NDAuMUg2NzcuMTR2LTQ4MS40Nkg1NDkuNDhWOTQwLjdoMTI3LjY1VjQ1OS4yMWgzMTAuODJjNzMuNTMgMCA1NjAuNTYtMTUuMjcgNTYwLjU2IDU0OS40OCAwIDU3NC4wOS01MDkuMjEgNTMxLjQxLTUwOS4yMSA1MzEuNDF6Ii8+PC9nPjwvc3ZnPg==",
    "litecoin": "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4Mi42IDgyLjYiPjx0aXRsZT5saXRlY29pbi1sdGMtbG9nbzwvdGl0bGU+PGNpcmNsZSBjeD0iNDEuMyIgY3k9IjQxLjMiIHI9IjM2LjgzIiBzdHlsZT0iZmlsbDojZmZmIi8+PHBhdGggZD0iTTQxLjMsMEE0MS4zLDQxLjMsMCwxLDAsODIuNiw0MS4zaDBBNDEuMTgsNDEuMTgsMCwwLDAsNDEuNTQsMFpNNDIsNDIuNywzNy43LDU3LjJoMjNhMS4xNiwxLjE2LDAsMCwxLDEuMiwxLjEydi4zOGwtMiw2LjlhMS40OSwxLjQ5LDAsMCwxLTEuNSwxLjFIMjMuMmw1LjktMjAuMS02LjYsMkwyNCw0NGw2LjYtMiw4LjMtMjguMmExLjUxLDEuNTEsMCwwLDEsMS41LTEuMWg4LjlhMS4xNiwxLjE2LDAsMCwxLDEuMiwxLjEydi4zOEw0My41LDM4bDYuNi0yLTEuNCw0LjhaIiBzdHlsZT0iZmlsbDojMzQ1ZDlkIi8+PC9zdmc+",
    "v-systems": "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1Ny4wOSA0NS43NCI+PHRpdGxlPnYtc3lzdGVtcy12c3lzLWxvZ288L3RpdGxlPjxwYXRoIGQ9Ik0wLjUxLDBIMTYuODNhMC41MSwwLjUxLDAsMCwxLC4yNS4wNiwwLjUsMC41LDAsMCwxLC4xOC4xN2gwTDM3LjEzLDMyYTAuNDksMC40OSwwLDAsMSwwLC41NGgwTDI5LDQ1LjUxaDBhMC41LDAuNSwwLDAsMS0uMTguMTcsMC41MSwwLjUxLDAsMCwxLS40OSwwLDAuNSwwLjUsMCwwLDEtLjE4LTAuMTdoMEwwLjA4LDAuNzdBMC41LDAuNSwwLDAsMSwwLC41MkgwQTAuNSwwLjUsMCwwLDEsLjA2LjI2LDAuNSwwLjUsMCwwLDEsLjI1LjA3aDBBMC41LDAuNSwwLDAsMSwuNTEsMGgwWk0zNC43MiwwSDU2LjU4YTAuNSwwLjUsMCwwLDEsLjI2LjA3aDBBMC41LDAuNSwwLDAsMSw1NywuMjZhMC41MSwwLjUxLDAsMCwxLC4wNi4yNmgwQTAuNSwwLjUsMCwwLDEsNTcsLjc3TDQ2LjA4LDE4LjIxaDBhMC41LDAuNSwwLDAsMS0uMTguMTcsMC41MSwwLjUxLDAsMCwxLS40OSwwLDAuNSwwLjUsMCwwLDEtLjE4LTAuMTdoMEwzNC4zLDAuNzdBMC41LDAuNSwwLDAsMSwzNC4yMi41MmgwQTAuNSwwLjUsMCwwLDEsMzQuMjguMjYsMC41LDAuNSwwLDAsMSwzNC40Ny4wN2gwQTAuNSwwLjUsMCwwLDEsMzQuNzIsMGgwWiIgc3R5bGU9ImZpbGw6I2ZmODgzNjtmaWxsLXJ1bGU6ZXZlbm9kZCIvPjwvc3ZnPg==",
    "hive": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjAgMTkwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2UzMTMzNzt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmhpdmUtaGl2ZS1sb2dvPC90aXRsZT48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE1Ny4yNywxMDcuMjZhMSwxLDAsMCwxLC44MiwxLjQybC00Ni43NSw4MC44NWExLDEsMCwwLDEtLjgyLjQ3SDgxLjk0YS45NC45NCwwLDAsMS0uODEtMS40Mmw0Ni43NS04MC44NWEuOTQuOTQsMCwwLDEsLjgxLS40N1pNMTI5LjQ4LDg0LjA5YTEsMSwwLDAsMS0uODItLjQ3TDgxLjEzLDEuNDJBLjk0Ljk0LDAsMCwxLDgxLjk0LDBoMjguNThhMSwxLDAsMCwxLC44Mi40N2w0Ny41Myw4Mi4yYS45NC45NCwwLDAsMS0uODEsMS40MloiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMzUuMTMsMS40MkEuOTQuOTQsMCwwLDEsMTM2LDBoMjguNjJhLjkzLjkzLDAsMCwxLC44MS40N2w1NC40OSw5NC4wNmEuOTMuOTMsMCwwLDEsMCwuOTRsLTU0LjQ5LDk0LjA2YS45My45MywwLDAsMS0uODEuNDdIMTM2YS45NC45NCwwLDAsMS0uODItMS40MkwxODkuMzQsOTVabS0yMy4yNiw5My4xYTEsMSwwLDAsMSwwLDFMNTcuMTMsMTg5LjUzYTEsMSwwLDAsMS0xLjY1LDBMLjEzLDk1LjQ4YTEsMSwwLDAsMSwwLTFMNTQuODcuNDdhMSwxLDAsMCwxLDEuNjUsMFoiLz48L2c+PC9nPjwvc3ZnPg==",
    "hive_dollar": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCEtLSBHZW5lcmF0b3I6IEdyYXZpdC5pbyAtLT48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHN0eWxlPSJpc29sYXRpb246aXNvbGF0ZSIgdmlld0JveD0iMCAwIDIyMCAxOTAiIHdpZHRoPSIyMjBwdCIgaGVpZ2h0PSIxOTBwdCI+PGRlZnM+PGNsaXBQYXRoIGlkPSJfY2xpcFBhdGhfcjlOWG4wdmlFcklYbUk1eXBPNGNlWER2aWZwVFRQZEMiPjxyZWN0IHdpZHRoPSIyMjAiIGhlaWdodD0iMTkwIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI19jbGlwUGF0aF9yOU5YbjB2aUVySVhtSTV5cE80Y2VYRHZpZnBUVFBkQykiPjxnPjxwYXRoIGQ9IiBNIDE1Ny4yNyAxMDcuMjYgQyAxNTcuNTk2IDEwNy4yODggMTU3Ljg4NyAxMDcuNDczIDE1OC4wNSAxMDcuNzU2IEMgMTU4LjIxNCAxMDguMDM5IDE1OC4yMjggMTA4LjM4NCAxNTguMDkgMTA4LjY4IEwgMTExLjM0IDE4OS41MyBDIDExMS4xNjMgMTg5LjgxNCAxMTAuODU1IDE4OS45OTEgMTEwLjUyIDE5MCBMIDgxLjk0IDE5MCBDIDgxLjYwMiAxOTAuMDAxIDgxLjI4OSAxODkuODIgODEuMTIyIDE4OS41MjYgQyA4MC45NTQgMTg5LjIzMiA4MC45NTcgMTg4Ljg3MSA4MS4xMyAxODguNTggTCAxMjcuODggMTA3LjczIEMgMTI4LjA0NyAxMDcuNDQgMTI4LjM1NiAxMDcuMjYxIDEyOC42OSAxMDcuMjYgTCAxNTcuMjcgMTA3LjI2IFogIE0gMTI5LjQ4IDg0LjA5IEMgMTI5LjE0NSA4NC4wODEgMTI4LjgzNyA4My45MDQgMTI4LjY2IDgzLjYyIEwgODEuMTMgMS40MiBDIDgwLjk1NyAxLjEyOSA4MC45NTQgMC43NjggODEuMTIyIDAuNDc0IEMgODEuMjg5IDAuMTggODEuNjAyIC0wLjAwMSA4MS45NCAwIEwgMTEwLjUyIDAgQyAxMTAuODU1IDAuMDA5IDExMS4xNjMgMC4xODYgMTExLjM0IDAuNDcgTCAxNTguODcgODIuNjcgQyAxNTkuMDQzIDgyLjk2MSAxNTkuMDQ2IDgzLjMyMiAxNTguODc4IDgzLjYxNiBDIDE1OC43MTEgODMuOTEgMTU4LjM5OCA4NC4wOTEgMTU4LjA2IDg0LjA5IEwgMTI5LjQ4IDg0LjA5IFogIiBmaWxsPSJyZ2IoMjI3LDE5LDU1KSIvPjxwYXRoIGQ9IiBNIDEzNS4xMyAxLjQyIEMgMTM0Ljk1MSAxLjEyIDEzNC45NTMgMC43NDUgMTM1LjEzNSAwLjQ0NyBDIDEzNS4zMTggMC4xNDkgMTM1LjY1MSAtMC4wMjMgMTM2IDAgTCAxNjQuNjIgMCBDIDE2NC45NTUgLTAuMDAxIDE2NS4yNjQgMC4xNzkgMTY1LjQzIDAuNDcgTCAyMTkuOTIgOTQuNTMgQyAyMjAuMDkgOTQuODIgMjIwLjA5IDk1LjE4IDIxOS45MiA5NS40NyBMIDE2NS40MyAxODkuNTMgQyAxNjUuMjY0IDE4OS44MjEgMTY0Ljk1NSAxOTAuMDAxIDE2NC42MiAxOTAgTCAxMzYgMTkwIEMgMTM1LjY2IDE5MC4wMDQgMTM1LjM0NCAxODkuODI1IDEzNS4xNzQgMTg5LjUzIEMgMTM1LjAwNCAxODkuMjM2IDEzNS4wMDYgMTg4Ljg3MiAxMzUuMTggMTg4LjU4IEwgMTg5LjM0IDk1IEwgMTM1LjEzIDEuNDIgTCAxMzUuMTMgMS40MiBaICBNIDExMS44NyA5NC41MiBDIDExMi4wNDkgOTQuODI5IDExMi4wNDkgOTUuMjExIDExMS44NyA5NS41MiBMIDU3LjEzIDE4OS41MyBDIDU2Ljk0NCAxODkuODAyIDU2LjYzNSAxODkuOTY1IDU2LjMwNSAxODkuOTY1IEMgNTUuOTc1IDE4OS45NjUgNTUuNjY2IDE4OS44MDIgNTUuNDggMTg5LjUzIEwgMC4xMyA5NS40OCBDIC0wLjA0OSA5NS4xNzEgLTAuMDQ5IDk0Ljc4OSAwLjEzIDk0LjQ4IEwgNTQuODcgMC40NyBDIDU1LjA1NiAwLjE5OCA1NS4zNjUgMC4wMzUgNTUuNjk1IDAuMDM1IEMgNTYuMDI1IDAuMDM1IDU2LjMzNCAwLjE5OCA1Ni41MiAwLjQ3IEwgMTExLjg3IDk0LjUyIEwgMTExLjg3IDk0LjUyIFogIE0gNTUuMDY3IDg5Ljg2NiBDIDQ0LjQ3NCA4Ny4xMTIgNDEuMDY3IDg0LjI2NiA0MS4wNjcgNzkuODMyIEMgNDEuMDY3IDc0Ljc0NSA0NS43OCA3MS4xOTkgNTMuNjY3IDcxLjE5OSBDIDYxLjk3NCA3MS4xOTkgNjUuMDU0IDc1LjE2NSA2NS4zMzQgODAuOTk5IEwgNzUuNjQ3IDgwLjk5OSBDIDc1LjMyMSA3Mi45NzIgNzAuNDIxIDY1LjU5OSA2MC42NjcgNjMuMjE5IEwgNjAuNjY3IDUyLjk5OSBMIDQ2LjY2NyA1Mi45OTkgTCA0Ni42NjcgNjMuMDc5IEMgMzcuNjE0IDY1LjAzOSAzMC4zMzQgNzAuOTE5IDMwLjMzNCA3OS45MjYgQyAzMC4zMzQgOTAuNzA2IDM5LjI0NyA5Ni4wNzIgNTIuMjY3IDk5LjE5OSBDIDYzLjkzNCAxMDEuOTk5IDY2LjI2NyAxMDYuMTA2IDY2LjI2NyAxMTAuNDQ2IEMgNjYuMjY3IDExMy42NjYgNjMuOTgxIDExOC43OTkgNTMuNjY3IDExOC43OTkgQyA0NC4wNTQgMTE4Ljc5OSA0MC4yNzQgMTE0LjUwNiAzOS43NiAxMDguOTk5IEwgMjkuNDk0IDEwOC45OTkgQyAzMC4wNTQgMTE5LjIxOSAzNy43MDcgMTI0Ljk1OSA0Ni42NjcgMTI2Ljg3MyBMIDQ2LjY2NyAxMzYuOTk5IEwgNjAuNjY3IDEzNi45OTkgTCA2MC42NjcgMTI2Ljk2NiBDIDY5Ljc2NyAxMjUuMjM5IDc3LjAwMSAxMTkuOTY2IDc3LjAwMSAxMTAuMzk5IEMgNzcuMDAxIDk3LjE0NiA2NS42NjEgOTIuNjE5IDU1LjA2NyA4OS44NjYgWiAiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0icmdiKDIyNywxOSw1NSkiLz48L2c+PC9nPjwvc3ZnPg==",
};

const COINS = [
    {
        id: "bitcoin",
        name: "Bitcoin",
        short_name: "BTC",
        image_url: COINS_IMAGES["bitcoin"],
    },
    {
        id: "dash",
        name: "Dash",
        short_name: "DASH",
        image_url: COINS_IMAGES["dash"],
    },
    {
        id: "dogecoin",
        name: "Dogecoin",
        short_name: "DOGE",
        image_url: COINS_IMAGES["dogecoin"],
    },
    {
        id: "litecoin",
        name: "Litecoin",
        short_name: "LTC",
        image_url: COINS_IMAGES["litecoin"],
    },
    {
        id: "v-systems",
        name: "Vsystems",
        short_name: "VSYS",
        image_url: COINS_IMAGES["v-systems"],
    },
    {
        id: "hive",
        name: "Hive",
        short_name: "HIVE",
        image_url: COINS_IMAGES["hive"],
    },
    {
        id: "hive_dollar",
        name: "Hive HBD",
        short_name: "HBD",
        image_url: COINS_IMAGES["hive_dollar"],
    },/*
    {
        id: "zcash",
        name: "Zcash",
        short_name: "ZEC",
        image_url: COINS_IMAGES["zcash"],
    }*/
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

const IMAGE_PROXY_URL = "https://steemitimages.com/0x0/";
const CORS_PROXY_URL = "https://cors-anywhere.crypto-red.workers.dev/?";

module.exports = {
    LANGUAGES: LANGUAGES,
    DATE_FNS_LOCALE_MAP: DATE_FNS_LOCALE_MAP,
    HISTORY: HISTORY,
    PAGE_ROUTES: PAGE_ROUTES,
    COINS_IMAGES: COINS_IMAGES,
    COINS: COINS,
    LOCALES: LOCALES,
    CURRENCY_COUNTRIES: CURRENCY_COUNTRIES,
    FIRST_WEEK_DAY_BY_COUNTRY: FIRST_WEEK_DAY_BY_COUNTRY,
    IMAGE_PROXY_URL: IMAGE_PROXY_URL,
    CORS_PROXY_URL: CORS_PROXY_URL,
};
