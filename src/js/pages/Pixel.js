import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CanvasPixels from "../components/CanvasPixels";

import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import Slider from "@material-ui/core/Slider";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "@material-ui/core/Menu";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";

import { HISTORY } from "../utils/constants";
import RESSOURCE_PIXELS from "../utils/ressource-pixel";

import actions from "../actions/utils";

import PaletteIcon from "../icons/Palette";
import ImageIcon from "@material-ui/icons/Image";
import AllLayersIcon from "../icons/AllLayers";
import ToolsIcon from "../icons/Tools";
import SelectIcon from "../icons/Select";
import ImageEffectIcon from "../icons/ImageEffect";
import ImageFilterIcon from "../icons/ImageFilter";
import ImageEditIcon from "../icons/ImageEdit";
import SquareIcon from "../icons/Square";

import Fab from "@material-ui/core/Fab";
import Grow from "@material-ui/core/Grow";
import DialogCloseButton from "../components/DialogCloseButton";
import lightGreen from "@material-ui/core/colors/lightGreen";
import red from "@material-ui/core/colors/red";
import PixelToolboxSwipeableViews from "../components/PixelToolboxSwipeableViews";
import PixelDialogCreate from "../components/PixelDialogCreate";
import api from "../utils/api";
import ListItem from "@material-ui/core/ListItem";
import FileImportIcon from "../icons/FileImport";
import ContrastCircleIcon from "../icons/ContrastCircle";
import LessColorIcon from "../icons/LessColor";
import ImageSmoothIcon from "../icons/ImageSmooth";
import SelectInImageIcon from "../icons/SelectInImage";
import BorderBottomIcon from "../icons/BorderBottom";
import BucketIcon from "../icons/Bucket";
import SelectInvertIcon from "../icons/SelectInvert";
import CopyIcon from "@material-ui/icons/FileCopy";
import CutIcon from "../icons/Cut";
import EraserIcon from "../icons/Eraser";
import MirrorIcon from "../icons/Mirror";
import PencilIcon from "../icons/Pencil";
import PencilPerfectIcon from "../icons/PencilPerfect";
import ChangeHistoryIcon from "@material-ui/icons/ChangeHistory";
import SelectColorIcon from "../icons/SelectColor";
import SelectRemoveDifferenceIcon from "../icons/SelectRemoveDifference";
import UFOTwemoji from "../twemoji/react/1F6F8";
import LABTwemoji from "../twemoji/react/1F9Ea";

import ShufflingSpanText from "../components/ShufflingSpanText";
import ImageFileDialog from "../components/ImageFileDialog";

import {base64png_to_xbrz_svg} from "../utils/png-xbrz-svg";

const styles = theme => ({
    green: {
        color: lightGreen[700],
    },
    red: {
        color: red[500],
    },
    root: {
        height: "100%",
        width: "100%",
        position: "relative",
    },
    content: {
        position: "absolute",
        margin: "auto",
        height: "100%",
        width: "100%",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    contentInner: {
        height: "100%",
        display: "flex",
        flexGrow: 1,
        position: "relative",
        backgroundSize: "32px 32px !important"
    },
    contentCanvas: {
        width: "100%",
        height: "100%",
        display: "flex",
        overflow: "hidden",
    },
    contentDrawer: {
        overscrollBehavior: "none",
        display: "flex",
        zIndex: 1400,
        [theme.breakpoints.up("lg")]: {
            display: "none",
        },
    },
    drawerHeader: {
        [theme.breakpoints.down("md")]: {
            padding: "16px 24px 8px 24px",
        },
        padding: "36px 24px 8px 24px",
        position: "relative",
        zIndex: -1,
        background: "#fff",
    },
    coordinate: {
        padding: "6px 8px 6px 8px",
        display: "block",
        position: "absolute",
        color: "#696969",
        top: 0,
        left: "50%",
        transform: "translate(-50%, 0%)",
        borderRadius: "0px 0px 4px 4px",
        backgroundColor: "#f5f5f5",
        whiteSpace: "nowrap",
    },
    drawerModalBackdropRoot: {
        transform: "translateY(-96px)"
    },
    drawerModal: {
        transform: "translateY(96px)"
    },
    contentDrawerFixed: {
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
        width: 480,
        overscrollBehavior: "none",
        display: "flex",
    },
    drawerPaper: {
        boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        border: "none",
        width: 480,
        overflowX: "overlay",
        background: "#fafafa",
    },
    swipeableDrawerPaper: {
        maxWidth: "100%",
        overscrollBehavior: "none",
        touchAction: "none",
        overflow: "hidden",
        paddingBottom: "96px",
    },
    drawerContainer: {
        overflow: "overlay",
        [theme.breakpoints.up("lg")]: {
            overflowX: "hidden",
        },
        "& > div": {
            overflowX: "auto !important",
            overflowY: "visible !important",
            display: "inline-table !important",
            width: "100% !important",
        },
        '& div .react-swipeable-view-container > div': {
            overflow: "visible !important",
            alignItems: "normal",
        },
        '& div .react-swipeable-view-container > div[aria-hidden=true]': {
            overflow: "hidden !important",
        },
        '& div .react-swipeable-view-container > div[aria-hidden=false] > ul': {
            [theme.breakpoints.down("md")]: {
                paddingBottom: 96 + 16,
            }
        },
        '& > div > .react-swipeable-view-container': {
            display: "flex !important",
            width: 480,
            [theme.breakpoints.down("md")]: {
                width: "100vw",
                height: "calc(100vh - 136px) !important"
            },
        },
    },
    tabs: {
        "& .MuiTab-root": {
            minWidth: "auto",
            flex: "auto",
        },
        "& .MuiTabs-indicator": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    tab: {
        color: theme.palette.secondary.main,
        backgroundColor: "#fff",
        "&.Mui-selected": {
            color: theme.palette.secondary.dark,
            backgroundColor: "#e5e5e5",
        },
    },
    backdrop: {
        zIndex: 2000,
        color: "#fff",
    },
    backdropTextContent: {
        display: "block",
        textAlign: "center",
    },
    fabs: {
        [theme.breakpoints.up("lg")]: {
            display: "none",
        },
        boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
        zIndex: 100,
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fab: {
        boxShadow: "none !important",
        background: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText,
        "&:hover": {
            background: theme.palette.primary.actionLighter,
        },
        "& svg": {
            marginRight: 4
        }
    },
    listOfTools: {
        paddingTop: 0,
        [theme.breakpoints.down("md")]: {
            width: "100vw",
        },
        width: 360,
    },
    contextMenuSubheader: {
        lineHeight: "24px",
        backgroundColor: "#eee",
        color: theme.palette.secondary.light,
    },
    contextMenu: {
        "& .MuiList-padding": {
            padding: 0,
        },
    },
    ripple: {
        "& > .MuiTouchRipple-rippleVisible": {
            animation: "MuiTouchRipple-keyframes-enter 200ms cubic-bezier(0.4, 0, 0.2, 1)"
        }
    },
    infoIcon: {
        position: "absolute",
    },
    blueCenter: {
        color: theme.palette.secondary.lighter,
        textAlign: "center",
        minWidth: "100%",
    }
});


class Pixel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            _history: HISTORY,
            _library_dialog_open: false,
            _library: RESSOURCE_PIXELS,
            _library_type: "open",
            _view_name_index: 1,
            _previous_view_name_index: 1,
            _view_names: ["palette", "image", "layers", "tools", "selection", "effects", "filters"],
            _canvas: null,
            _canvas_elevation: 8,
            _loading: false,
            _loading_process: "",
            _can_undo: false,
            _can_redo: false,
            _current_color: "#ffffffff",
            _second_color: "#000000ff",
            _pxl_current_opacity: 1,
            _width: 32,
            _height: 32,
            _import_size: "96",
            _hue: 360,
            _slider_value: 8/32,
            _game_ended: false,
            _tool: "PENCIL",
            _memory_tool: "PENCIL",
            _previous_tool_timestamp: 1/0,
            _select_mode: "REPLACE",
            _pencil_mirror_mode: "NONE",
            _filters: [],
            _x: -1, _y: -1,
            _is_something_selected: false,
            _hide_canvas_content: false,
            _show_original_image_in_background: false,
            _show_transparent_image_in_background: true,
            _is_image_import_mode: false,
            _layers: [{name: "Layer 0", hidden: false}],
            _layer_index: 0,
            _previous_layer_index: 0,
            _mine_player_direction: "UP",
            _is_edit_drawer_open: false,
            _kb: 0,
            _fps: 0,
            _prev_fps: 0,
            _sfx_enabled: false,
            _menu_mouse_y: null,
            _menu_mouse_x: null,
            _menu_data: {},
            _menu_event: null,
            _ripple_color: "#ffffffff",
            _ripple_opacity: 1,
            _is_pixel_dialog_post_edit_open: false,
            _is_dialog_info_open: false,
            _base64_url: "",
            _logged_account: {},
            _less_than_1280w: false,
            _pixel_dialog_create_open: true,
            _pixel_arts: [],
        };
    };

    componentDidMount() {

        this._update_settings();
        actions.trigger_snackbar(`This is PIXAAAAAA! Enjoy ;)`, 5000);
        window.addEventListener("resize", this._updated_dimensions);
        this._updated_dimensions();
        document.addEventListener("keydown", this._handle_keydown);
        document.addEventListener("keyup", this._handle_keyup);
        actions.trigger_loading_update(0);

        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 350);

        setInterval(() => {

            this._maybe_save_unsaved_pixel_art();
        }, 10 * 1000);
    }

    _maybe_save_unsaved_pixel_art = () => {

        if(this.state._canvas) {

            this.state._canvas.export_JSON_state((state) => {

                let states = this.state._pixel_arts;
                states[JSON.parse(state).id] = state;
                let new_states = {};
                let new_states_id_and_ts = [];

                Object.entries(states).forEach((e, i) => {

                    const [k, s] = e;
                    if(s){

                        const {timestamp, id, _json_state_history} = JSON.parse(s);
                        const {state_history} = JSON.parse(_json_state_history);

                        if(state_history.length > 1) {

                            new_states[k] = s;
                            new_states_id_and_ts.push({
                                id,
                                timestamp,
                            });
                        }
                    }
                });
                new_states_id_and_ts.sort((a, b) => a.timestamp < b.timestamp);
                let new_states_filtered = {};
                new_states_id_and_ts.forEach((s, i) => {

                    if(i < 10) {

                        new_states_filtered[s.id] = new_states[s.id];
                    }
                });

                api.set_settings({pixel_arts: {...new_states_filtered}}, () => {

                    this.setState({_pixel_arts: {...new_states_filtered}}, () => {

                        this.forceUpdate();
                    });
                });
            });
        }

    };

    _delete_unsaved_pixel_art = (id) => {

        let { _pixel_arts } = this.state;
        delete _pixel_arts[id];

        api.set_settings({pixel_arts: {..._pixel_arts}}, () => {

            this.setState({_pixel_arts: {..._pixel_arts}}, () => {

                this.forceUpdate();
            });
        });
    };

    _updated_dimensions = () => {

        let w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            _window_width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            _window_height = w.innerHeight|| documentElement.clientHeight || body.clientHeight;

        this.setState({_less_than_1280w: _window_width < 1280})
    }

    componentWillUnmount() {

        window.removeEventListener("resize", this._updated_dimensions);
        document.removeEventListener("keydown", this._handle_keydown);
        document.removeEventListener("keyup", this._handle_keyup);
    }

    _handle_menu_close = () => {

        this.setState({_menu_mouse_x: null, _menu_mouse_y: null});
    };

    _handle_right_click = (event, data) => {

        const { _canvas } = this.state;

        this.setState({
            _menu_mouse_x: event.clientX - 2,
            _menu_mouse_y: event.clientY - 4,
            _menu_data: data,
            _menu_event: event,
        });

        setTimeout(() => {

            data.pxl_color = _canvas.get_pixel_color_from_pos(data.pos_x, data.pos_y);
            this.setState({_menu_data: data});

        }, 1000);

    };

    _process_settings_query_result = (error, settings) => {

        // Set new settings from query result
        const _sfx_enabled = typeof settings.sfx_enabled !== "undefined" ? settings.sfx_enabled: false;
        const _pixel_arts = typeof settings.pixel_arts !== "undefined" ? settings.pixel_arts: [];

        this.setState({ _sfx_enabled, _pixel_arts }, () => {

            this.forceUpdate();
        });
    };

    _update_settings() {

        // Call the api to get results of current settings and send it to a callback function
        api.get_settings(this._process_settings_query_result);
    }

    _handle_view_name_change = (view_name_index, previous_name_index = null) => {

        const { _view_names } = this.state;
        previous_name_index = previous_name_index === null ? this.state._view_name_index: previous_name_index;

        const _view_name = _view_names[view_name_index] || _view_names[0];
        const _view_name_index = _view_names.indexOf(_view_name) === -1 ? 0: _view_names.indexOf(_view_name);

        if(previous_name_index > _view_name_index) {

            actions.trigger_sfx("navigation_transition-left");
        }else {

            actions.trigger_sfx("navigation_transition-right");
        }

        this.setState({_previous_view_name_index: previous_name_index || this.state._view_name_index, _view_name_index});
    };

    _handle_keydown = (event) => {

        const { _tool, _view_name_index, _view_names, _is_pixel_dialog_post_edit_open } = this.state;

        if (event && !_is_pixel_dialog_post_edit_open) {

            event.preventDefault();
            event.stopPropagation();

            if(_tool === "MINE"){

                event.preventDefault();

                switch (event.keyCode) {

                    case 38:
                        this.setState({_mine_player_direction: "UP"});
                        break;
                    case 40:
                        this.setState({_mine_player_direction: "DOWN"});
                        break;
                    case 37:
                        this.setState({_mine_player_direction: "LEFT"});
                        break;
                    case 39:
                        this.setState({_mine_player_direction: "RIGHT"});
                        break;
                }
            }else {

                switch (event.keyCode) {

                    case 37:

                        this._handle_view_name_change(_view_name_index-1 < 0 ? _view_names.length-1: _view_name_index-1);
                        break;
                    case 39:

                        this._handle_view_name_change( _view_name_index+1 > _view_names.length-1 ? 0: _view_name_index+1);
                        break;
                }
            }

            if(event.key === "1") {

                this._handle_view_name_change(0);
            }else if(event.key === "2") {

                this._handle_view_name_change(1);
            }else if(event.key === "3") {

                this._handle_view_name_change(2);
            }else if(event.key === "4") {

                this._handle_view_name_change(3);
            }else if(event.key === "5") {

                this._handle_view_name_change(4);
            }else if(event.key === "6") {

                this._handle_view_name_change(5);
            }else if(event.key === "7") {

                this._handle_view_name_change(6);
            }else if(event.ctrlKey && event.key === "z") {

                const { _canvas } = this.state;

                _canvas.undo();
            }else if(event.ctrlKey && event.key === "y") {

                const { _canvas } = this.state;

                _canvas.redo();
            }else if(event.ctrlKey && event.key === "m") {

                this._set_tool("MINE");
            }else if(event.ctrlKey && event.key === "o") {

                this._upload_image();
            }else if(event.ctrlKey && event.key === "i") {

                this._import_image();
            }else if(!event.ctrlKey && event.key === "o") {

                this._set_tool("PICKER");
            }else if(!event.ctrlKey && event.key === "b") {

                this._set_tool("BUCKET");
            }else if(!event.ctrlKey && event.key === "h") {

                this._set_tool("HUE BUCKET");
            }else if(!event.ctrlKey && event.key === "x") {

                this._set_tool("EXCHANGE");
            }else if(!event.ctrlKey && event.key === "u") {

                this._set_tool("BORDER");
            }else if(!event.ctrlKey && event.key === "r") {

                this._set_tool("RECTANGLE");
            }else if(event.ctrlKey && event.key === "r") {

                this._set_tool("SELECT RECTANGLE");
            }else if(!event.ctrlKey && event.key === "e") {

                this._set_tool("ELLIPSE");
            }else if(event.ctrlKey && event.key === "e") {

                this._set_tool("SELECT ELLIPSE");
            }else if(!event.ctrlKey && event.key === "l") {

                this._set_tool("LINE");
            }else if(event.ctrlKey && event.key === "l") {

                this._set_tool("SELECT LINE");
            }else if(!event.ctrlKey && event.key === "p") {

                this._set_tool("PENCIL");
            }else if(!event.ctrlKey && event.key === "n") {

                this._set_tool("PENCIL PERFECT");
            }else if(event.ctrlKey && event.key === "p") {

                this._set_tool("SELECT PIXEL");
            }else if(event.ctrlKey && event.key === "n") {

                this._set_tool("SELECT PENCIL PERFECT");
            }else if(!event.ctrlKey && event.key === "m") {

                this._set_tool("SET PENCIL MIRROR");
            }else if(!event.ctrlKey && event.key === "f") {

                this._set_tool("CONTOUR");
            }else if(event.ctrlKey && event.key === "f") {

                this._set_tool("SELECT PATH");
            }else if(event.ctrlKey && event.key === "k") {

                this._set_tool("SELECT COLOR THRESHOLD");
            }else if(event.ctrlKey && event.key === "g") {

                this._set_tool("SELECT COLOR");
            }else if(event.ctrlKey && event.key === "q") {

                this._download_image(1);

            }else if(event.ctrlKey && event.key === "s") {

                this._download_image(32);

            }else if(event.key === "Enter") {

                const { _canvas } = this.state;
                _canvas.confirm_import();
            }else if(event.ctrlKey) {

                if(_tool.includes("SELECT")) {

                    this.setState({_previous_tool_timestamp: Date.now()});
                    this._set_select_mode("REMOVE");
                }else {

                    this.setState({_previous_tool_timestamp: Date.now()});
                    this._set_tool("PICKER", false);
                }
            }else if(event.key === "Shift") {

                if(_tool.includes("SELECT")) {

                    this.setState({_previous_tool_timestamp: Date.now()});
                    this._set_select_mode("ADD");
                }else {

                    this.setState({_previous_tool_timestamp: Date.now()});
                    this._set_tool("MOVE", false);
                }
            }else {

            }

        }
    };

    _download_image = (size) => {

        const { _canvas } = this.state;
        if(_canvas === null) {return}

        let a = document.createElement("a"); //Create <a>
        a.download = `Pixel art n°${Date.now()} from PIXAPICS (x${size}).png`; //File name Here


        _canvas.get_base64_png_data_url(size, (href) => {

            a.href = "" + href;
            a.click();

            actions.trigger_sfx("hero_decorative-celebration-02");
            setTimeout(() => {
                actions.trigger_snackbar("Do You Want To Share? Yes or No", 7000);
                actions.jamy_update("happy");
            }, 2000);

        }); //Image Base64 Goes here
    };

    _download_svg = () => {

        const { _canvas } = this.state;
        if(_canvas === null) {return}

        actions.trigger_snackbar("Please wait... Files will download in a few seconds.", 14000);
        actions.jamy_update("happy");

        let a = document.createElement("a"); //Create <a>

        _canvas.get_base64_png_data_url(1, ([href, palette]) => {

            a.download = `Painting SRC n°${Date.now()} from PIXAPICS.png`; //File name Here
            a.href = "" + href;
            a.click();

            base64png_to_xbrz_svg(href, (jpeg_base64, webp_base64, png_base64) => {

                a.download = `Painting IMG n°${Date.now()} from PIXAPICS.jpeg`; //File name Here
                a.href = "" + jpeg_base64;
                a.click();

            }, (svg_base64, width, height) => {

                a.download = `Painting VECT n°${Date.now()} from PIXAPICS.svg`; //File name Here
                a.href = "" + svg_base64;
                a.click();

                actions.trigger_sfx("hero_decorative-celebration-02");
                setTimeout(() => {
                    actions.trigger_snackbar("Do You Want To Share? Yes or No", 7000);
                    actions.jamy_update("happy");
                }, 2000);

            }, palette);

        }, true); //Image Base64 Goes here
    };

    _handle_keyup = (event) => {

        const { _is_pixel_dialog_post_edit_open } = this.state;

        if (event && !_is_pixel_dialog_post_edit_open) {

            event.preventDefault();
            event.stopPropagation();

            const { _tool, _memory_tool, _previous_tool_timestamp } = this.state;

            if(_memory_tool && _memory_tool !== _tool && Date.now() - 10 * 1000 < _previous_tool_timestamp) {

                this.setState({_previous_tool_timestamp: 1/0});
                this._set_tool(_memory_tool);

            }else if(_previous_tool_timestamp < Date.now() && _tool.includes("SELECT")) {

                this.setState({_previous_tool_timestamp: 1/0});
                this._set_select_mode("REPLACE");
            }
        }
    }

    _upload_image = () => {

        let input = document.createElement("input");
        input.setAttribute("style", "pointer-events: none; touch-actions: none; position: absolute; opacity: 0;");
        input.setAttribute("type", "file");
        document.body.appendChild(input);
        input.addEventListener("change", (event) => {this._handle_file_upload(event, input)});
        input.click();
    };

    _upload_image_library = () => {

        this.setState({_library_dialog_open: true, _library_type: "open"});
    };

    _close_library = () => {

        this.setState({_library_dialog_open: false});
    };

    _from_library = (base64) => {


        const { _canvas, _library_type } = this.state;
        let img = new Image;
        img.src = base64;

        img.onload = () => {

            if(_library_type === "open") {

                _canvas.set_canvas_from_image(img);
            }else if(_library_type === "import"){

                _canvas.import_image_on_canvas(img, base64);
            }

            this._close_library();
        };
    };

    get_base64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => resolve(reader.result));
            reader.addEventListener("error", () => reject(error));
            reader.readAsDataURL(file);
        });
    };

    _handle_file_upload = (event, input) => {

        const { _canvas } = this.state;
        let img = new Image;
        let file = event.target.files[0] || event.path[0].files[0];

        this.get_base64(file).then((data) => {

            img.addEventListener("load", () => {

                _canvas.set_canvas_from_image(img);
                document.body.removeChild(input);
                this._handle_menu_close();
            });
            img.addEventListener("error", () => {

                document.body.removeChild(input);
                this._handle_menu_close();
            });
            img.src = data;
        });
    };

    _handle_import_json_state = (data) => {

        const { _canvas } = this.state;
        _canvas.import_JSON_state(data);

    };

    _handle_file_import = (event) => {

        const { _canvas } = this.state;
        let img = new Image;
        let file = event.target.files[0] || event.path[0].files[0];

        this.get_base64(file).then((data) => {

            img.src = data;
            img.onload = () => {

                _canvas.import_image_on_canvas(img, data);
                this._handle_menu_close();
            };
        });
    };

    _import_image = () => {

        let input = document.createElement("input");
        input.setAttribute("style", "pointer-events: none; touch-actions: none; position: absolute; opacity: 0;");
        document.body.appendChild(input);
        input.addEventListener("change", (event) => {this._handle_file_import(event)});
        document.body.removeChild(input);
        input.setAttribute("type", "file");
        input.click();
    };

    _import_image_library = () => {

        this.setState({_library_dialog_open: true, _library_type: "import"});
    };

    _handle_load = (process) => {

        this.setState({_loading: true, _loading_process: process});

        if(process === "image_load"){

            actions.trigger_sfx("FullHorizonThrow");
        }
    };

    _handle_load_complete = (process, data) => {

        this.setState({_loading: false, _loading_process: process});

        if(process === "less_color" || process === "less_color_auto") {

            if(data.colors_removed !== 0) {

                actions.trigger_snackbar(`I am a magician! And ${data.colors_removed} colors are now gone, only ${data.colors_remaining} remaining.`);
                actions.trigger_sfx("navigation_selection-complete-celebration");
                actions.jamy_update("happy");
            }
        }else if(process === "image_load"){

            actions.trigger_snackbar(`DONE! We've imported an image with my now ${data.number_of_colors} colors.`);
            actions.trigger_sfx("PrometheusVertical2");
            actions.jamy_update("happy");
            this._handle_edit_drawer_close();

            this._maybe_save_unsaved_pixel_art();
        }
    };

    _set_ripple_ref = (element) => {

        if(element === null) {return}
        this.setState({_ripple: element});
    };

    _set_canvas_ref = (element) => {

        if(element === null) {return}
        this.setState({_canvas: element, _filters: element.get_filter_names()});
    };

    _handle_position_change = (position) => {

        this.setState({_x: position.x, _y: position.y});
    }

    _handle_can_undo_redo_change = (_can_undo, _can_redo) => {

        this.setState({_can_undo, _can_redo})
    }

    _handle_kb_change = (kb) => {

        this.setState({_kb: kb});
    };

    _handle_fps_change = (fps) => {

        this.setState({_fps: fps, _prev_fps: this.state._fps});
    };

    _handle_size_change = (_width, _height) => {

        this.setState({_width, _height})
    }

    _handle_current_color_change = (color, event) => {

        const { _canvas, _ripple } = this.state;

        if(typeof color.rgb !== "undefined") {

            color = _canvas._get_hex_color_from_rgba_values(color.rgb.r, color.rgb.g, color.rgb.b, color.rgb.a * 255);
        }

        const [r, g, b, a] = _canvas.get_rgba_from_hex(color);
        const [h, s, l] = _canvas.rgb_to_hsl(r, g, b);

        this.setState({_current_color: color, _hue: h});
    };

    _handle_relevant_action_event = (event, color, opacity) => {

        const { _ripple } = this.state;

        if(event && _ripple) {

            actions.trigger_sfx("navigation_selection-complete-celebration");

            this.setState({_ripple_color: color, _ripple_opacity: 1}, () => {
                _ripple.start(event);

                setTimeout(() => {

                    _ripple.stop(event);
                }, 250);
            });
        }
    };

    _handle_something_selected_change = (is_something_selected) => {

        this.setState({_is_something_selected: is_something_selected});
    };

    _set_value_from_slider = (event, value) => {

        this.setState({_slider_value: value});
    };

    _set_width_from_slider = (event, value) => {

        this.setState({_width: value});
    };

    _set_height_from_slider = (event, value) => {

        this.setState({_height: value});
    };

    _set_import_size = (event, value) => {

        this.setState({_import_size: value || event.target.value});
    };

    _set_tool = (name, remember = true) => {

        this.setState({_tool: name.toUpperCase()});

        if(remember) {

            this.setState({_memory_tool: name.toUpperCase()});
        }
    }

    _set_select_mode = (mode) => {

        this.setState({_select_mode: mode.toUpperCase()});
    }

    _set_pencil_mirror_mode = (mode) => {

        this.setState({_pencil_mirror_mode: mode.toUpperCase()});
    }

    _switch_with_second_color = () => {

        const {_current_color, _second_color } = this.state;
        this.setState({_current_color: _second_color, _second_color: _current_color});
    };

    _show_hide_canvas_content = () => {

        this.setState({_hide_canvas_content: !this.state._hide_canvas_content});
    }

    _show_hide_background_image = () => {

        this.setState({_show_original_image_in_background: !this.state._show_original_image_in_background});
    }

    _show_hide_transparent_image = () => {

        this.setState({_show_transparent_image_in_background: !this.state._show_transparent_image_in_background});
    }

    _handle_image_import_mode_change = (is_image_import_mode) => {

        this.setState({_is_image_import_mode: is_image_import_mode});
    };

    _handle_layers_change = (layer_index, layers) => {

        const { _layer_index } = this.state;

        this.setState({_previous_layer_index: _layer_index, _layer_index: layer_index, _layers: JSON.parse(layers)});
    };

    _handle_game_end = () => {

        this.setState({_game_ended: true}, () => {

            if(this.state._sfx_enabled) {

                const sound = "data:audio/ogg;base64,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sGF1hJOiscBCQ1YCAHkAAJBSSjHGGGNMKaUYY4wxppRSjDHGmFNKKcYYY8w5pxRjjDHmnGOMMcYYc84xxhhjjDnnGGOMMcacc84xxhhjzjnnGGOMMeecc4wxxpgAAKACBwCAABtFNicYCSo0ZCUAEA4AABjDlHPOQSgllQohxiB0UEpKrVUIMQYhhFJSai1qzjkIIZSSUmvRc85BCKGUlFqLqoVQSiklpdZadC10UkpJqbUYo5QihJBSSq21GJ0TIYSSUmotxuacjKWk1FqMMTbnZCwlpdZijLE555xrrbUWY63NOedcaym2GGttzjmne2wx1lhrc845n1uLrcZaCwAweXAAgEqwcYaVpLPC0eBCQ1YCALkBAIxSjDHmnHPOOeecc85JpRhzzjkIIYQQQgghlEox5pxzEEIIIYQQQigZc845ByGEEEIIIYRQSumccxBCCCGEEEIIoZTSOecghBBCCCGEEEIppXPOQQghhBBCCCGEUkoIIYQQQgghhBBCCKWUUkIIIYQQQgghhBBKKaWEEEIIIYQQQgghlFJKCSGEEEIIIYQQQiillBJCCCGEEEIIJYRQSimllBBCCKGEEEIIoZRSSikhhFJKKSGEEEIppZRSQiihhBBCCCGUUkoppZQSQikhhBBCCKWUUkoppZRSQgghhBBKKaWUUkoppYRQQgghlFJKKaWUUkIoJYQSQiillFJKKaWEUEIIIYRQSimllFJKCSGEEkIIoQAAoAMHAIAAIyotxE4zrjwCRxQyTECFhqwEANICAABDrLXWWmuttdZaaw1S1lprrbXWWmuttUYpa6211lprrbXWWmuptdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lpLKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFIB2AUbDoDRE0YSUmcZVhpx4wkYIpBCQ1YCAGkBAIAxjDHmGHQQSkkppQoh5yCETkIqrcUWY4SQcxBCKCWl1mKLMXgOQgghlNJSbDHGWDwHIYQQUmotxhhj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";
                let snd = new Audio(sound);
                snd.play();
            }

            setTimeout(() => {

                this.setState({_game_ended: false});

            }, 5000);
        });
    };

    _handle_edit_drawer_open = (event, _view_name_index) => {

        _view_name_index = typeof _view_name_index !== "undefined" ? _view_name_index: this.state._view_name_index;

        this.setState({_is_edit_drawer_open: true, _view_name_index});
    };

    _handle_edit_drawer_close = () => {

        this.setState({_is_edit_drawer_open: false});
    };

    _set_current_color = (_current_color) => {

        this._handle_menu_close();
        this.setState({_current_color});
    };

    _exchange_pixel_colors = (old_pixel_color, new_pixel_color) => {

        const { _canvas } = this.state;
        let { _menu_data } = this.state;

        _canvas.exchange_pixel_color(old_pixel_color, new_pixel_color);
        _menu_data.pxl_color = new_pixel_color;

        this._handle_menu_close();
        this.setState({_menu_data});
    };

    _to_auto_medium_more_contrast = () => {

        const { _canvas } = this.state;
        _canvas.auto_adjust_contrast(1/3);
    };

    _less_colors_stepped = (increase = 1) => {

        const { _canvas } = this.state;

        let colors_removed = 0;
        let less_color_step = increase;
        const try_another = () => {

            _canvas.to_less_color(less_color_step / 64, (result) => {

                colors_removed = result.colors_removed;
                less_color_step += increase;
                increase -= colors_removed > 0 ? 1: 0;
                if(colors_removed < 1) {
                    try_another();
                }
            });
        };

        try_another();
    };

    _less_colors_auto = ( ) => {

        const { _canvas } = this.state;
        _canvas.to_less_color("auto");
    };

    _get_average_color_of_selection = () => {

        const { _canvas } = this.state;
        const color = _canvas.get_average_color_of_selection();

        this._handle_current_color_change(color);
    };

    _handle_pixel_dialog_post_edit_close = () => {

        this.setState({_is_pixel_dialog_post_edit_open: false});
    };

    _handle_elevation_change = (elevation) => {

        this.setState({_canvas_elevation: elevation});
    };

    _handle_dialog_info_close = () => {

        this.setState({_is_dialog_info_open: false});
    };

    _handle_dialog_info_open = () => {

        this.setState({_is_dialog_info_open: true});
    };

    _set_pixel_dialog_create_closed = () => {

        this.setState({_pixel_dialog_create_open: false});
    }

    render() {

        const {
            classes,
            _canvas,
            _view_name_index,
            _previous_view_name_index,
            _loading,
            _loading_process,
            _view_names,
            _layers,
            _layer_index,
            _is_image_import_mode,
            _hide_canvas_content,
            _show_original_image_in_background,
            _show_transparent_image_in_background,
            _can_undo,
            _can_redo,
            _current_color,
            _second_color,
            _slider_value,
            _tool,
            _width,
            _height,
            _import_size,
            _hue,
            _filters,
            _select_mode,
            _pencil_mirror_mode,
            _x, _y, _kb, _fps, _prev_fps,
            _is_something_selected,
            _mine_player_direction,
            _is_edit_drawer_open,
            _menu_mouse_y,
            _menu_mouse_x,
            _menu_data,
            _ripple_color,
            _ripple_opacity,
            _menu_event,
            _is_pixel_dialog_post_edit_open,
            _base64_url,
            _library_dialog_open,
            _library,
            _library_type,
            _less_than_1280w,
            _pixel_dialog_create_open,
            _pixel_arts,
            _post_img
        } = this.state;

        let { _logged_account } = this.state;
        _logged_account = _logged_account || {};

        let x = _x === -1 ? "out": _x + 1;
        let y = _y === -1 ? "out": _y + 1;

        _menu_data.pos_x = _menu_data.pos_x === -1 ? "out": _menu_data.pos_x;
        _menu_data.pos_y = _menu_data.pos_y === -1 ? "out": _menu_data.pos_y;

        const rgb = 245 // - Math.floor(Math.abs(_canvas_elevation) / 2);

        const drawer = _less_than_1280w ?
            (
                <SwipeableDrawer
                    className={classes.contentDrawer}
                    disableBackdropTransition={true}
                    keepMounted={false}
                    open={_is_edit_drawer_open}
                    onOpen={this._handle_edit_drawer_open}
                    onClose={this._handle_edit_drawer_close}
                    classes={{
                        paper: classes.swipeableDrawerPaper,
                        modal: classes.drawerModal,
                    }}
                    ModalProps={{BackdropProps:{classes: {root: classes.drawerModalBackdropRoot}}}}
                    variant="temporary"
                    anchor="bottom"
                >
                    <DialogCloseButton onClick={this._handle_edit_drawer_close} />
                    <div style={{display: "grid"}}>
                        <div style={{boxShadow: "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px", zIndex: 1}}>
                            <div className={classes.drawerHeader}>
                                <Typography id="strength-slider" gutterBottom>
                                    Effect strength:
                                </Typography>
                                <Slider
                                    defaultValue={_slider_value}
                                    step={1/32}
                                    min={0}
                                    max={1}
                                    onChangeCommitted={this._set_value_from_slider}
                                    aria-labelledby="strength-slider"
                                />
                            </div>
                            <Tabs className={classes.tabs}
                                  indicatorColor="primary"
                                  textColor="primary"
                                  variant="fullWidth"
                                  selectionFollowsFocus={false}
                                  value={_view_name_index}
                                  onChange={(event, index) => {this._handle_view_name_change(index)}}>
                                <Tab className={classes.tab} icon={<PaletteIcon />} />
                                <Tab className={classes.tab} icon={<ImageIcon />} />
                                <Tab className={classes.tab} icon={<AllLayersIcon />} />
                                <Tab className={classes.tab} icon={<ToolsIcon />} />
                                <Tab className={classes.tab} icon={<SelectIcon />} />
                                <Tab className={classes.tab} icon={<ImageEffectIcon />} />
                                <Tab className={classes.tab} icon={<ImageFilterIcon />} />
                            </Tabs>
                        </div>
                        <div className={classes.drawerContainer} onGotPointerCapture={(event) => {event.stopPropagation(); event.preventDefault();}}>
                            <PixelToolboxSwipeableViews
                                should_update={true}
                                is_connected_to_hive={false}
                                onActionClose={this._handle_edit_drawer_close}
                                canvas={_canvas}
                                view_class={classes.listOfTools}
                                view_name_index={_view_name_index}
                                previous_view_name_index={_previous_view_name_index}
                                view_names={_view_names}
                                layers={_layers}
                                layer_index={_layer_index}
                                is_image_import_mode={_is_image_import_mode}
                                hide_canvas_content={_hide_canvas_content}
                                show_original_image_in_background={_show_original_image_in_background}
                                show_transparent_image_in_background={_show_transparent_image_in_background}
                                can_undo={_can_undo}
                                can_redo={_can_redo}
                                hue={_hue}
                                current_color={_current_color}
                                second_color={_second_color}
                                slider_value={_slider_value}
                                tool={_tool}
                                width={_width}
                                height={_height}
                                filters={_filters}
                                select_mode={_select_mode}
                                pencil_mirror_mode={_pencil_mirror_mode}
                                is_something_selected={_is_something_selected}
                                import_size={_import_size}

                                set_tool={this._set_tool}
                                set_select_mode={this._set_select_mode}
                                set_pencil_mirror_mode={this._set_pencil_mirror_mode}
                                set_width_from_slider={this._set_width_from_slider}
                                set_height_from_slider={this._set_height_from_slider}
                                set_import_size={this._set_import_size}
                                switch_with_second_color={this._switch_with_second_color}
                                show_hide_canvas_content={this._show_hide_canvas_content}
                                show_hide_background_image={this._show_hide_background_image}
                                show_hide_transparent_image={this._show_hide_transparent_image}
                                on_current_color_change={this._handle_current_color_change}
                                on_view_name_change={this._handle_view_name_change}
                                on_upload_image={this._upload_image}
                                on_upload_image_library={this._upload_image_library}
                                on_import_image={this._import_image}
                                on_import_image_library={this._import_image_library}
                                on_download_image={this._download_image}
                                on_download_svg={this._download_svg}
                            />
                        </div>
                    </div>
                </SwipeableDrawer>
            ):
            (
                <Drawer
                    className={classes.contentDrawerFixed}
                    variant="permanent"
                    anchor="right"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <div style={{display: "contents"}}>
                        <div style={{boxShadow: "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px", zIndex: 1}}>
                            <div className={classes.drawerHeader}>
                                            <span className={classes.coordinate}>
                                                <span>{`FPS: ${Math.round((_fps + _prev_fps) / 2)}`}</span>
                                                <span>{` | X: ${x}, Y: ${y} | `}</span>
                                                <span className={_kb < 64 ? classes.green: classes.red}>{`[~${Math.round(_kb * 100) / 100} kB]`}</span>
                                            </span>
                                <Typography id="strength-slider" gutterBottom>
                                    Effect strength:
                                </Typography>
                                <Slider
                                    defaultValue={_slider_value}
                                    step={1/32}
                                    min={0}
                                    max={1}
                                    onChangeCommitted={this._set_value_from_slider}
                                    aria-labelledby="strength-slider"
                                />
                            </div>
                            <Tabs className={classes.tabs}
                                  indicatorColor="primary"
                                  textColor="primary"
                                  variant="fullWidth"
                                  selectionFollowsFocus={false}
                                  value={_view_name_index}
                                  onChange={(event, index) => {this._handle_view_name_change(index)}}>
                                <Tab className={classes.tab} icon={<PaletteIcon />} />
                                <Tab className={classes.tab} icon={<ImageIcon />} />
                                <Tab className={classes.tab} icon={<AllLayersIcon />} />
                                <Tab className={classes.tab} icon={<ToolsIcon />} />
                                <Tab className={classes.tab} icon={<SelectIcon />} />
                                <Tab className={classes.tab} icon={<ImageEffectIcon />} />
                                <Tab className={classes.tab} icon={<ImageFilterIcon />} />
                            </Tabs>
                        </div>
                        <div className={classes.drawerContainer}>
                            <PixelToolboxSwipeableViews
                                should_update={true}
                                is_connected_to_hive={false}
                                canvas={_canvas}
                                view_class={classes.listOfTools}
                                view_name_index={_view_name_index}
                                previous_view_name_index={_previous_view_name_index}
                                view_names={_view_names}
                                layers={_layers}
                                layer_index={_layer_index}
                                is_image_import_mode={_is_image_import_mode}
                                hide_canvas_content={_hide_canvas_content}
                                show_original_image_in_background={_show_original_image_in_background}
                                show_transparent_image_in_background={_show_transparent_image_in_background}
                                can_undo={_can_undo}
                                can_redo={_can_redo}
                                hue={_hue}
                                current_color={_current_color}
                                second_color={_second_color}
                                slider_value={_slider_value}
                                tool={_tool}
                                width={_width}
                                height={_height}
                                filters={_filters}
                                select_mode={_select_mode}
                                pencil_mirror_mode={_pencil_mirror_mode}
                                is_something_selected={_is_something_selected}
                                import_size={_import_size}

                                set_tool={this._set_tool}
                                set_select_mode={this._set_select_mode}
                                set_pencil_mirror_mode={this._set_pencil_mirror_mode}
                                set_width_from_slider={this._set_width_from_slider}
                                set_height_from_slider={this._set_height_from_slider}
                                set_import_size={this._set_import_size}
                                switch_with_second_color={this._switch_with_second_color}
                                show_hide_canvas_content={this._show_hide_canvas_content}
                                show_hide_background_image={this._show_hide_background_image}
                                show_hide_transparent_image={this._show_hide_transparent_image}
                                on_current_color_change={this._handle_current_color_change}
                                on_view_name_change={this._handle_view_name_change}
                                on_upload_image={this._upload_image}
                                on_upload_image_library={this._upload_image_library}
                                on_import_image={this._import_image}
                                on_import_image_library={this._import_image_library}
                                on_download_image={this._download_image}
                                on_download_svg={this._download_svg}
                            />
                        </div>
                    </div>
                </Drawer>
            );


        return (
            <div style={{height: "100%"}}>
                <div className={classes.root}>
                    <div className={classes.content}>
                        <div className={classes.contentInner} style={{background: `linear-gradient(90deg, rgb(${rgb}, ${rgb}, ${rgb}) 30px, transparent 1%) center, linear-gradient(rgb(${rgb}, ${rgb}, ${rgb}) 30px, transparent 1%) center, rgb(${rgb-70}, ${rgb-70}, ${rgb-70})`}}>
                            <div className={classes.contentCanvas}>
                                <CanvasPixels
                                    onContextMenu={(e) => {e.preventDefault()}}
                                    key={"canvas"}
                                    className={classes.contentCanvas}
                                    ref={this._set_canvas_ref}
                                    no_actions={_is_pixel_dialog_post_edit_open}
                                    dont_show_canvas_until_img_set={_is_pixel_dialog_post_edit_open}
                                    dont_show_canvas={_is_pixel_dialog_post_edit_open}
                                    tool={_tool}
                                    canvas_wrapper_padding={32}
                                    hide_canvas_content={_hide_canvas_content}
                                    show_original_image_in_background={_show_original_image_in_background}
                                    show_transparent_image_in_background={_show_transparent_image_in_background}
                                    select_mode={_select_mode}
                                    pencil_mirror_mode={_pencil_mirror_mode}
                                    hue={_hue}
                                    bucket_threshold={_slider_value}
                                    color_loss={_slider_value}
                                    pxl_current_opacity={1}
                                    onLoadComplete={this._handle_load_complete}
                                    onLoad={this._handle_load}
                                    onCanUndoRedoChange={this._handle_can_undo_redo_change}
                                    onSizeChange={this._handle_size_change}
                                    onCurrentColorChange={this._handle_current_color_change}
                                    onSomethingSelectedChange={this._handle_something_selected_change}
                                    onImageImportModeChange={this._handle_image_import_mode_change}
                                    on_kb_change={this._handle_kb_change}
                                    on_fps_change={this._handle_fps_change}
                                    on_elevation_change={this._handle_elevation_change}
                                    onPositionChange={this._handle_position_change}
                                    onLayersChange={this._handle_layers_change}
                                    onGameEnd={this._handle_game_end}
                                    onRelevantActionEvent={this._handle_relevant_action_event}
                                    onRightClick={this._handle_right_click}
                                    mine_player_direction={_mine_player_direction}
                                    pxl_width={_width}
                                    pxl_height={_height}
                                    pxl_current_color={_current_color}
                                    convert_scale={1}
                                    default_size={_import_size}
                                    ideal_size={_import_size}
                                    max_size={_import_size}
                                    fast_drawing={true}
                                    px_per_px={1}/>
                                <TouchRipple
                                    className={classes.ripple}
                                    ref={this._set_ripple_ref}
                                    center={false}
                                    style={{color: _ripple_color, opacity: _ripple_opacity, position: "fixed", width: "100vw", height: "100vh", zIndex: 2000}}
                                />
                            </div>
                            {drawer}
                        </div>
                    </div>
                </div>
                <Menu
                    className={classes.contextMenu}
                    PaperProps={{
                        style: {
                            maxHeight: 350,
                            width: 250,
                            overflowY: "overlay"
                        },
                    }}
                    onContextMenu={(e) => {e.preventDefault()}}
                    dense={true}
                    keepMounted
                    open={_menu_mouse_y !== null}
                    onClose={this._handle_menu_close}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        _menu_mouse_y !== null && _menu_mouse_x !== null
                            ? { top: _menu_mouse_y, left: _menu_mouse_x }
                            : undefined
                    }
                >
                    <span style={{textAlign: "left", padding: "12px 8px", color: "#666"}}>X: {_menu_data.pos_x}, Y: {_menu_data.pos_y}</span>
                    {
                        _tool === "SET PENCIL MIRROR" || _pencil_mirror_mode !== "NONE" ?
                            <div>
                                <ListSubheader className={classes.contextMenuSubheader}>Tools</ListSubheader>
                                <ListItem button divider disabled={_tool === "PENCIL"} onClick={() => {this._set_tool("PENCIL")}}>
                                    <ListItemIcon>
                                        <PencilIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Pencil" />
                                </ListItem>
                                <ListItem button divider disabled={_tool === "PENCIL PERFECT"} onClick={() => {this._set_tool("PENCIL PERFECT")}}>
                                    <ListItemIcon>
                                        <PencilPerfectIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Pencil perfect" />
                                </ListItem>

                                <ListSubheader className={classes.contextMenuSubheader}>Mirror mode</ListSubheader>
                                {
                                    [
                                        {icon: <MirrorIcon />, disabled: _pencil_mirror_mode === "NONE",text: "None", on_click: () => {this._set_pencil_mirror_mode("NONE")}},
                                        {icon: <MirrorIcon />, disabled: _pencil_mirror_mode === "VERTICAL", text: "Vertical", on_click: () => {this._set_pencil_mirror_mode("VERTICAL")}},
                                        {icon: <MirrorIcon />, disabled: _pencil_mirror_mode === "HORIZONTAL", text: "Horizontal", on_click: () => {this._set_pencil_mirror_mode("HORIZONTAL")}},
                                        {icon: <MirrorIcon />, disabled: _pencil_mirror_mode === "BOTH", text: "Both", on_click: () => {this._set_pencil_mirror_mode("BOTH")}},
                                    ].map((item) => {

                                        return (
                                            <ListItem key={item.text} button divider disabled={item.disabled} onClick={item.on_click}>
                                                <ListItemIcon>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={item.text} />
                                            </ListItem>
                                        );

                                    })
                                }
                            </div>
                            : null
                    }
                    {
                        _is_something_selected ?
                            <div>
                                <ListSubheader className={classes.contextMenuSubheader}>Apply to selection</ListSubheader>
                                {
                                    [
                                        {icon: <SelectRemoveDifferenceIcon />, text: "Unselect", on_click: () => {_canvas.to_selection_none()}},
                                        {icon: <BucketIcon />, text: "Colorize dynamical", on_click: () => {_canvas.to_selection_changes(_current_color, false)}},
                                        {icon: <SelectColorIcon />, text: "Get average color", on_click: () => {this._get_average_color_of_selection()}},
                                        {icon: <SelectInImageIcon />, text: "Shrink", on_click: () => {_canvas.to_selection_size(-1)}},
                                        {icon: <SelectInImageIcon />, text: "Grow", on_click: () => {_canvas.to_selection_size(1)}},
                                        {icon: <BorderBottomIcon />, text: "Border", on_click: () => {_canvas.to_selection_border()}},
                                        {icon: <BucketIcon />, text: "Bucket", on_click: () => {_canvas.to_selection_bucket()}},
                                        {icon: <SelectInImageIcon />, text: "Crop", on_click: () => {_canvas.to_selection_crop()}},
                                        {icon: <SelectInvertIcon />, text: "Invert", on_click: () => {_canvas.to_selection_invert()}},
                                        {icon: <CopyIcon />, text: "Copy", on_click: () => {_canvas.copy_selection()}},
                                        {icon: <CutIcon />, text: "Cut", on_click: () => {_canvas.cut_selection()}},
                                        {icon: <EraserIcon />, text: "Erase", on_click: () => {_canvas.erase_selection()}},
                                    ].map((item) => {

                                        return (
                                            <ListItem key={item.text} button divider onClick={item.on_click}>
                                                <ListItemIcon>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={item.text} />
                                            </ListItem>
                                        );
                                    })
                                }
                            </div>
                            : null
                    }
                    <ListSubheader style={_menu_data.pxl_color === null ? {display: "none"}: {}} className={classes.contextMenuSubheader}>Color</ListSubheader>
                    <ListItem button divider style={_menu_data.pxl_color === null ? {display: "none"}: {}} disabled={_menu_data.pxl_color === _current_color || _menu_data.pxl_color === null} onClick={(event) => {this._set_current_color(_menu_data.pxl_color); this._handle_relevant_action_event(_menu_event, _menu_data.pxl_color, 1);}}>
                        <ListItemIcon>
                            <SquareIcon style={{ color: _menu_data.pxl_color, background: `repeating-conic-gradient(#80808055 0% 25%, #00000000 0% 50%) 50% / calc(200% / ${_width}) calc(200% / ${_height})`}} />
                        </ListItemIcon>
                        <ListItemText primary="Pick color" />
                    </ListItem>
                    <ListItem button divider style={_menu_data.pxl_color === null ? {display: "none"}: {}} disabled={_menu_data.pxl_color === _current_color || _menu_data.pxl_color === null} onClick={(event) => {this._exchange_pixel_colors(_menu_data.pxl_color, _current_color); this._handle_relevant_action_event(_menu_event, _current_color, 1);}}>
                        <ListItemIcon>
                            <SquareIcon style={{ color: _current_color, background: `repeating-conic-gradient(#80808055 0% 25%, #00000000 0% 50%) 50% / calc(200% / ${_width}) calc(200% / ${_height})`}} />
                        </ListItemIcon>
                        <ListItemText primary="Replace color" />
                    </ListItem>
                    <ListSubheader className={classes.contextMenuSubheader}>Undo / Redo</ListSubheader>
                    <ListItem button divider onClick={(event) => {_canvas.undo()}}>
                        <ListItemIcon>
                            <ChangeHistoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Undo" />
                    </ListItem>
                    <ListItem button divider onClick={(event) => {_canvas.redo()}}>
                        <ListItemIcon>
                            <ChangeHistoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Redo" />
                    </ListItem>
                    <ListSubheader className={classes.contextMenuSubheader}>Effect</ListSubheader>
                    <ListItem button divider onClick={(event) => this._to_auto_medium_more_contrast()}>
                        <ListItemIcon>
                            <ContrastCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Increase contrast" />
                    </ListItem>
                    <ListItem button divider onClick={(event) => this._handle_edit_drawer_open(null,6)}>
                        <ListItemIcon>
                            <ImageFilterIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add a filter" />
                    </ListItem>
                    <ListItem button divider onClick={(event) => this._less_colors_stepped(2)}>
                        <ListItemIcon>
                            <LessColorIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reduce color number" />
                    </ListItem>
                    <ListItem button divider onClick={this._less_colors_auto}>
                        <ListItemIcon>
                            <LessColorIcon />
                        </ListItemIcon>
                        <ListItemText primary="To auto colors number" />
                    </ListItem>
                    <ListItem button divider onClick={(event) => _canvas.smooth_adjust(1)}>
                        <ListItemIcon>
                            <ImageSmoothIcon />
                        </ListItemIcon>
                        <ListItemText primary="Smooth a bit" />
                    </ListItem>
                    <ListSubheader className={classes.contextMenuSubheader}>Load</ListSubheader>
                    <ListItem button divider onClick={this._upload_image}>
                        <ListItemIcon>
                            <FileImportIcon />
                        </ListItemIcon>
                        <ListItemText primary="Open image" />
                    </ListItem>
                </Menu>
                <Grow in>
                    <div className={classes.fabs}>
                        <Fab className={classes.fab} variant="extended" onClick={() => {this._handle_edit_drawer_open(null, 1)}}>
                            <ImageEditIcon /> Modify
                        </Fab>
                    </div>
                </Grow>
                <Backdrop className={classes.backdrop} open={_loading} keepMounted={false}>
                    <div className={classes.backdropTextContent} style={{fontFamily: `"Share Tech Mono"`}}>
                        {_loading && <h1><ShufflingSpanText text={"Laboratory processing..."} animation_delay_ms={0} animation_duration_ms={250}/></h1>}
                        {_loading && _loading_process === "image_load" && <h4><ShufflingSpanText text={"Abducting your image..."} animation_delay_ms={300} animation_duration_ms={500}/></h4>}
                        {_loading && _loading_process === "image_load" && <div><UFOTwemoji style={{width: 72}}/></div>}
                        {_loading && _loading_process === "less_color" && <h4><ShufflingSpanText text={"Coupling few color matrices..."} animation_delay_ms={300} animation_duration_ms={500}/></h4>}
                        {_loading && _loading_process === "less_color" && <div><LABTwemoji style={{width: 72}}/></div>}
                        {_loading && _loading_process === "less_color_auto" && <h4><ShufflingSpanText text={"Coupling many color matrices..."} animation_delay_ms={500} animation_duration_ms={500}/></h4>}
                        {_loading && _loading_process === "less_color_auto" && <div><LABTwemoji style={{width: 72}}/></div>}
                        {_loading && <h5><ShufflingSpanText text={"It can take a while, please wait ~15sec."} animation_delay_ms={5000} animation_duration_ms={500}/></h5>}
                    </div>
                </Backdrop>

                <ImageFileDialog
                    open={_library_dialog_open}
                    object={_library_type === "open" ? _library["backgrounds"]: _library_type === "import" ? _library["items"]: _library}
                    onClose={this._close_library}
                    onSelectImage={this._from_library}
                />


              <PixelDialogCreate open={_pixel_dialog_create_open}
                                 pixel_arts={_pixel_arts}
                                 size={_import_size}
                                 on_import_size_change={this._set_import_size}
                                 on_pixel_art_delete={(id) => {this._delete_unsaved_pixel_art(id)}}
                                 import_JSON_state={(s) => {this._handle_import_json_state(s)}}
                                 on_upload={() => {this._upload_image()}}
                                 onClose={this._set_pixel_dialog_create_closed}/>
            </div>
        );
    }
}

export default withStyles(styles)(Pixel);
