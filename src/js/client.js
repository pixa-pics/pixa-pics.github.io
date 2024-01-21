"use strict";
import "regenerator-runtime/runtime";
import api from "./utils/api";
import {l} from "./utils/t";

import React from "react";
import ReactDOM from "react-dom";
import { HISTORY } from "./utils/constants";
// Theme
import { ThemeProvider } from "@material-ui/core"
import CssBaseline from '@material-ui/core/CssBaseline';
import { lightTheme } from "./theme/index";

// Pages
import Index from "../js/pages/Index";

api.init().then(function (response){

    const _selected_locales_code = (typeof response.locales !== "undefined" ? response.locales : "en-US").toString();
    const _language = _selected_locales_code.split("-")[0].toString();

    l(_language, function(){
        document.body.setAttribute("datainitiated", "true");
    });
});

let element = document.getElementById("app");
if(!Boolean(element)) {

    element = document.createElement("div");
    element.setAttribute("id", "app");
    document.body.innerHTML = "";
    document.body.appendChild(element);
}else {
    element.innerHTML = "";
}

ReactDOM.render(
    <ThemeProvider theme={lightTheme}>
        <CssBaseline>
            <Index history={HISTORY}/>
        </CssBaseline>
    </ThemeProvider>,
element);