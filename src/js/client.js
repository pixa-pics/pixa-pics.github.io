"use strict";
import "regenerator-runtime/runtime";

import api from "../js/utils/api";
api.init(); // It will init the DB

import React from "react";
import ReactDOM from "react-dom";
import { HISTORY } from "./utils/constants";

// Theme
import { ThemeProvider } from "@material-ui/core"
import CssBaseline from '@material-ui/core/CssBaseline';
import { lightTheme } from "./theme/index";

// Pages
import Index from "../js/pages/Index";

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
