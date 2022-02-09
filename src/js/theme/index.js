import {createTheme} from "@material-ui/core/styles";

import lightPalette from "./lightPalette";
import darkPalette from "./darkPalette";
import overrides from "./overrides";
import typography from "./typography";

const darkTheme = createTheme({
    palette: darkPalette,
    overrides,
    typography
});

const lightTheme = createTheme({
    palette: lightPalette,
    overrides,
    typography
});
module.exports = {
    darkTheme: darkTheme,
    lightTheme: lightTheme
};