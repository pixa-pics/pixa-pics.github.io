"use strict";
import "regenerator-runtime/runtime";
import api from "../js/utils/api";
import {l} from "../js/utils/t";

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

    const _selected_locales_code = String(typeof response.locales !== "undefined" ? response.locales : "en-US");
    const _language = String(_selected_locales_code.split("-")[0]);

    l(_language, function(){
        document.body.setAttribute("datainitiated", "true");
    });
});

let element = document.getElementById("app");
if(element === null) {

    element = document.createElement("div");
    element.setAttribute("id", "app");
    document.body.appendChild(element);
    element = document.getElementById("app");
}

ReactDOM.render(
    <ThemeProvider theme={lightTheme}>
        <CssBaseline>
            <Index history={HISTORY}/>
        </CssBaseline>
    </ThemeProvider>,
element);
