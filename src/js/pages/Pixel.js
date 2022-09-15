import FileImportIcon from "../icons/FileImport";

window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

let is_mobile_or_tablet = window.mobileAndTabletCheck();
import React, { Suspense } from "react";
import dispatcher from "../dispatcher";
const CanvasPixels = React.lazy(() => import("../components/canvaspixels/CanvasPixels"));
import {Button, IconButton, withStyles} from "@material-ui/core";
import pool from "../utils/worker-pool";
import {ListItem, Typography, Backdrop, Slider, SwipeableDrawer, Drawer, Tabs, Tab, Menu, ListSubheader, ListItemText, ListItemIcon} from "@material-ui/core";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import { HISTORY } from "../utils/constants";
import actions from "../actions/utils";
import ImageFilterMagicIcon from "../icons/ImageFilterMagic";
import SquareIcon from "../icons/Square";

import DialogCloseButton from "../components/DialogCloseButton";
import lightGreen from "@material-ui/core/colors/lightGreen";
import red from "@material-ui/core/colors/red";
import PixelToolboxSwipeableViews from "../components/PixelToolboxSwipeableViews";
import PixelDialogCreate from "../components/PixelDialogCreate";
import api from "../utils/api";
import ContrastCircleIcon from "../icons/ContrastCircle";
import LessColorIcon from "../icons/LessColor";
import ImageSmoothIcon from "../icons/ImageSmooth";
import SelectInImageIcon from "../icons/SelectInImage";
import BorderBottomIcon from "../icons/BorderBottom";
import BucketIcon from "../icons/Bucket";
import SelectInvertIcon from "../icons/SelectInvert";
import CopyIcon from "@material-ui/icons/FileCopy";
import ChangeHistoryOutlined from "@material-ui/icons/ChangeHistoryOutlined";
import CutIcon from "../icons/Cut";
import EraserIcon from "../icons/Eraser";
import MirrorIcon from "../icons/Mirror";
import PencilIcon from "../icons/Pencil";
import PencilPerfectIcon from "../icons/PencilPerfect";
import SaveIcon from "@material-ui/icons/SaveOutlined";
import SelectColorIcon from "../icons/SelectColor";
import SelectRemoveDifferenceIcon from "../icons/SelectRemoveDifference";
import PerspectiveOn from "../icons/3dOn";
import PerspectiveOff from "../icons/3dOff";

import ShufflingSpanText from "../components/ShufflingSpanText";
import ImageFileDialog from "../components/ImageFileDialog";

import {base64png_to_xbrz_svg} from "../utils/png-xbrz-svg";
import {file_to_base64, base64_sanitize, base64_to_bitmap, bitmap_to_imagedata, imagedata_to_base64} from "../utils/img_manipulation";

import {postJSON} from "../utils/load-json";

import ColorsTweemoji from "../twemoji/react/1F3A8";
import ImageTweemoji from "../twemoji/react/1F5Bc";
import LayersTweemoji from "../twemoji/react/1F5C3";
import ToolsTweemoji from "../twemoji/react/1F58C";
import SelectTweemoji from "../twemoji/react/1Fa84";
import EffectsTweemoji from "../twemoji/react/2B50";
import FiltersTweemoji from "../twemoji/react/1F984";

import HexGrid from "../icons/HexGrid";
import get_svg_in_b64 from "../utils/svgToBase64";
import { l, t } from "../utils/t";

import ColorConversion from "../components/canvaspixels/utils/ColorConversion";
const color_conversion = Object.create(ColorConversion).new();

const styles = theme => ({
    green: {
        color: lightGreen[700],
    },
    red: {
        color: red[500],
    },
    root: {
        contain: "layout size style paint",
        width: "100%",
        height: "100%",
        position: "relative",
        paddingBottom: 72,
        [theme.breakpoints.up("lg")]: {
            paddingBottom: 0,
        },
        background: "border-box",
    },
    contentInner: {
        height: "100%",
        width: "100%",
        maxHeight: "100%",
        position: "relative",
        display: "flex",
        contain: "paint style size layout",
    },
    contentCanvas: {
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        display: "flex",
        contain: "paint style size layout !important",
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
    effectSliderText:{
        color: "#050c4c",
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    effectSlider: {
        color: "#3729c1",
        "& > .MuiSlider-track": {
            height: 4,
        }
    },
    coordinate: {
        padding: "6px 8px 6px 8px",
        display: "block",
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translate(-50%, 0%)",
        borderRadius: "0px 0px 4px 4px",
        backgroundColor: "#ededffff",
        color: "#050c4c",
        boxShadow: "inset 0px 3px 6px #050c4c4d",
        whiteSpace: "nowrap",
    },
    drawerModalBackdropRoot: {
        contain: "layout size style paint",
    },
    drawerModal: {
        transform: "translateY(-32px)",
        marginTop: 32,
        contain: "size layout style",
        overflow: "hidden",
    },
    contentDrawerFixed: {
        contain: "style size paint layout",
        boxShadow: "-2px 0px 4px 0px rgb(0 0 0 / 20%), -4px 0px 5px 0px rgb(0 0 0 / 14%), -6px 0px 10px 0px rgb(0 0 0 / 12%)",
        maxHeight: "100%",
        height: "100%",
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
        width: 480,
        overscrollBehavior: "none",
        display: "flex",
    },
    drawerPaper: {
        width: 480,
        overflowX: "overlay",
        background: "#fafafa",
        contain: "layout paint size style",
    },
    swipeableDrawerPaper: {
        maxWidth: "100%",
        overscrollBehavior: "none",
        overflow: "hidden",
        paddingBottom: "48px",
        borderBox: "content-box",
        height: "100%",
        contain: "layout paint size style",
    },
    drawerContainer: {
        scrollBehavior: "smooth",
        contain: "size style paint layout",
        height: "100% !important",
        overflow: "overlay",
        [theme.breakpoints.down("md")]: {
            height: "calc(100vh - 128px) !important"
        },
        [theme.breakpoints.up("lg")]: {
            overflowX: "hidden",
        },
        "& > div": {
            overflowX: "hidden !important",
            overflowY: "overlay !important",
            display: "inline !important",
            width: "100% !important",
            height: "100% !important",
            contain: "size style paint layout !important",
        },
        '& div .react-swipeable-view-container > div': {
            overflow: "initial !important",
            alignItems: "normal",
            contain: "size style !important",
            height: "100%",
            [theme.breakpoints.down("md")]: {
                height: "100% !important",
                paddingBottom: "24px",
                boxSizing: "border-box"
            },
        },
        '& div .react-swipeable-view-container > div[aria-hidden=true]': {
           // overflow: "hidden !important",
            [theme.breakpoints.up("lg")]: {
                height: "16px",
            },
        },
        '& div .react-swipeable-view-container > div[aria-hidden=false]  > ul': {
            [theme.breakpoints.down("md")]: {
                paddingBottom: 0,
            }
        },
        '& > div > .react-swipeable-view-container': {
            display: "flex !important",
            filter: "opacity(1) !important",
            webkitFilter: "opacity(1) !important",
            willChange: "none !important",
            contain: "size style !important",
            width: 480,
            height: "100% !important",
            [theme.breakpoints.down("md")]: {
                width: "100vw",
            }
        },
    },
    tabs: {
        contain: "paint size style layout",
        height: 72,
        display: "grid",
        "& .MuiTabs-scroller": {

            overflowY: "hidden",
        },
        "& .MuiTab-root": {
            minWidth: "auto",
            flex: "auto",
        },
        "& .MuiTabs-indicator": {
            backgroundColor: "#050c4c",
        }
    },
    tab: {
        backgroundColor: "transparent",
        color: "#050c4c",
        transition: "color, background-color ease-in .175s",
        "&.Mui-selected": {
            fontWeight: "bold",
            backgroundColor: "#dfddf2",
            color: "#050c4c",
            borderRadius: "4px 4px 0px 0px",
        },
        "& .MuiTab-wrapper": {
            fontSize: "11px",
        },
        "& .MuiTab-wrapper svg": {
            width: 32,
            height: 32,
            filter: "sepia(1) hue-rotate(180deg) saturate(2.5) brightness(0.70) contrast(2.75)",
            webkitFilter: "sepia(1) hue-rotate(180deg) saturate(2.5) brightness(0.70) contrast(2.75)",
            contentVisibility: "auto",
        }
    },
    tabNoIcon: {
        backgroundColor: "white",
        color: "#050c4c",
        transition: "color, background-color ease-in .175s",
        "&.Mui-selected": {
            fontWeight: "bold",
            backgroundColor: "#dfddf2",
            color: "#050c4c",
            borderRadius: "4px 4px 0px 0px",
        },
        "&.MuiTab-labelIcon": {
            minHeight: 36,
        },
        "& .MuiTab-wrapper": {
            fontSize: "11px",
        },
        "& .MuiTab-wrapper svg": {
            width: 32,
            height: 32,
            display: "none",
        }
    },
    backdrop: {
        zIndex: 2000,
        color: "#fff",
        background: "radial-gradient(#050c6af2 10%, #03067044)",
        contain: "layout paint size style",
        userSelect: "none",
    },
    backdropTextContent: {
        display: "block",
        textAlign: "center",
    },
    fatabs: {
        backgroundColor: "#fafafa",
        boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        contain: "paint size style layout",
        [theme.breakpoints.up("lg")]: {
            display: "none",
        },
        [theme.breakpoints.up("md")]: {
            width: "calc(100vw - 256px)",
        },
        zIndex: 1300,
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "100vw",
        height: 72,
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
    contextMenuFuckYouActive: {
        cursor: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAApCAYAAAAiT5m3AAABXklEQVRYR+2XSxKCMAyGYSXqCdiJev8TqbjjBCqucMJMnDSk6QOKM0hXzPTxNemfB3n2o5GP4Z4OVYf7r/c66KygxfSSCL3Ut+xcHfupEPgoMEBxAHwFa/pZXe0dXaDqVVzLCyeaIkEMs7wxTZEAhUyVHMyhs4KpdTYwj0VNbF6Za7cpukf7Ms7lruaXcVWsZGC8iM3qHszVyhfHWIxg6qamabLnu+2ZXzC+IbqIFvZYsOb+AZgWdviGW5ZlaYSOLaG73p263wqWlEuBEkS6kC3eVbAG97FOi/fkYO4F7M0MVfMkQd/bNucq4KqrYbOk3NnAoF5edbjKYy2n50CeGGQu3tK4XBk6b7wx3ZwSTPO3aLHN3aHW8fX7YmumTL4gldX/A5YKj1iPaZkcGz62uqw2AlO9tfQLmxQsuRiF7ARjTeY9l09oaT/r0T3XssEgMmiBQgcUHbXLDD1wivUfqwJ8Oe4e4FEAAAAASUVORK5CYII=") 17 28, auto',
        "& .MuiList-padding": {
            padding: 0,
        },
    },
    contextMenuFuckYouDisable: {
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
    },
    perspectiveButton: {
        position: "absolute",
        left: 16,
        top: 16,
    },
    saveButton: {
        backgroundColor: "#0037ff14 !important",
        position: "absolute",
        right: 496,
        top: 16,
        [theme.breakpoints.down("md")]: {
            right: 16,
        },
    },
    confirmImportButton: {
        position: "absolute",
        left: 16,
        bottom: 16,
        [theme.breakpoints.down("md")]: {
            right: 88,
        },
    },
    redoButton: {
        backgroundColor: "#0037ff14 !important",
        position: "absolute",
        right: 496,
        bottom: 60,
        [theme.breakpoints.down("md")]: {
            right: 16,
            bottom: 132,
        },
    },
    undoButton: {
        backgroundColor: "#0037ff14 !important",
        position: "absolute",
        right: 496,
        bottom: 16,
        [theme.breakpoints.down("md")]: {
            right: 16,
            bottom: 88,
        },
    }
});


class Pixel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            load_with: String(props.load_with) || "",
            _history: HISTORY,
            _perspective: false,
            _library_dialog_open: false,
            _library: {},
            _library_type: "open",
            _view_name_index: 1,
            _view_name_sub_index: 0,
            _previous_view_name_index: 1,
            _view_names: ["palette", "image", "layers", "tools", "selection", "effects", "filters"],
            _canvas: null,
            _loading: false,
            _loading_process: "",
            _can_undo: 0,
            _can_redo: 0,
            _current_color: "#ffffffff",
            _second_color: "#000000ff",
            _pxl_current_opacity: 1,
            _width: 32,
            _height: 32,
            _import_size: "160",
            _import_colorize: "0",
            _hue: 360,
            _slider_value: 8/32,
            _game_ended: false,
            _tool: is_mobile_or_tablet ? "MOVE": "PENCIL",
            _memory_tool: is_mobile_or_tablet ? "MOVE": "PENCIL",
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
            _layers: [],
            _layer_index: 0,
            _previous_layer_index: 0,
            _mine_player_direction: "UP",
            _is_edit_drawer_open: false,
            _kb: 0,
            _saved_at: Date.now(),
            _fps: 0,
            _prev_fps: 0,
            _menu_mouse_y: null,
            _menu_mouse_x: null,
            _menu_data: {},
            _menu_event: null,
            _ripple: null,
            _ripple_color: "#ffffffff",
            _ripple_opacity: 1,
            _is_pixel_dialog_post_edit_open: false,
            _is_dialog_info_open: false,
            _base64_url: "",
            _logged_account: {},
            _less_than_1280w: false,
            _is_pixel_dialog_create_open: false,
            _attachment_previews: {},
            _filters_thumbnail: new Map(),
            _last_filters_hash: "",
            _filters_preview_progression: "0",
            _toolbox_container_ref: null,
            settings: props.settings,
            _files_waiting_download: [],
            _time_ago_initiated: false,
            ...JSON.parse(props.settings)
        };
    };

    componentWillMount() {

        actions.trigger_loading_update(0);
        actions.trigger_page_render_complete();
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 300);
        l(null, () => {

            this.setState({_time_ago_initiated: true}, () => {

                this.forceUpdate();
            });
        }, true);
    }

    componentDidMount() {

        //actions.trigger_snackbar(`This is PIXAAAAAA and beyond! Here, ideas easily find a new sunshine!`, 5000);

        actions.trigger_snackbar("Looks like some of the LAB operations can be no more functional, waiting to be reengineered for 'PERFS' within hours...", 777 * 10);
        actions.jamy_update("sad");

        window.addEventListener("resize", this._updated_dimensions);
        this._updated_dimensions();
        document.addEventListener("keydown", this._handle_keydown);
        document.addEventListener("keyup", this._handle_keyup);
        dispatcher.register(this._handle_events.bind(this));
        this._try_load_with_payload(String(this.state.load_with || ""));
        this.setState({_h_svg: get_svg_in_b64(<HexGrid color={"#e5e5e5"}/>)});
        import("../utils/ressource_pixel").then((RESSOURCE_PIXELS) => {

            this.setState({_library: RESSOURCE_PIXELS});
        });
    }

    componentWillReceiveProps(new_props) {

        if(new_props.load_with !== this.state.load_with) {

            this.setState({load_with: String(new_props.load_with)}, ()  => {

                this._try_load_with_payload(String(new_props.load_with));
            });
        }

        if(new_props.settings !== this.state.settings) {

            this.setState({settings: new_props.settings, ...JSON.parse(new_props.settings)}, ()  => {

                this.forceUpdate();
            });
        }
    }

    _try_load_with_payload = (load_with) => {

        if(load_with.length <= 0){

            this.setState({_is_pixel_dialog_create_open: !Boolean(load_with.length > 0)}, () => {

                api.get_settings(this._process_settings_info_result);
            });
        }else {

            actions.trigger_sfx("alert_high-intensity");
            this._handle_load("image_preload");
            base64_sanitize(String(load_with), (base64) => {

                let img = new Image();
                img.addEventListener("load", () => {
                    const try_again = () => {

                        if(!Boolean(this.state._canvas)) {

                            setTimeout(() => {try_again()}, 100);
                        }else {

                            this.setState({_kb: 0, _saved_at: 1/0});
                            this.state._canvas.set_canvas_from_image(img, String(base64), {}, true);
                            this._handle_load_complete("image_preload", {});
                        }
                    };
                    try_again();
                }, {once: true, capture: true});
                img.src = String(base64);

            });
        }
    };

    _handle_events(event) {

        // Make different actions send from a dispatcher bounded to this function
        if(event.type === "TRIGGER_CANVAS_ACTION") {
            switch(event.data.name.toUpperCase()) {

                case "CONTRAST":
                    this._to_auto_medium_more_contrast();
                    break;
                case "PALETTE":
                    this._less_colors_auto();
                    break;
                case "SMOOTH":
                    this._smooth_adjust();
                    break;
                case "FILTER":
                    this._handle_edit_drawer_open(null, 6);
                    break;
                case "RENDER":
                    this._handle_edit_drawer_open(null, 1);
                    setTimeout(() => {
                        this._handle_edit_drawer_open(null, 1);
                        setTimeout(() => {
                            this._handle_edit_drawer_open(null, 1);
                        }, 100);
                    }, 100);
                    break;
            }
        }
    }

    _handle_canvas_state_export = (current_state) => {

        if(current_state.kb > 1) {

            actions.trigger_snackbar("Saving current work...!", 2000);
            let attachment_array = {};
            attachment_array["json_state-ID" + current_state.id + ".json.lzp3"] = current_state;

            this.setState({_kb: current_state.kb, _saved_at: Date.now()}, () => {

                import("../utils/lzp3_json").then(({LZP3}) => {

                    api.set_settings({}, (err, res) => {

                        if(err) {

                            actions.trigger_snackbar("Looks like I can't save your file as our compression module can't load.", 5700);
                            actions.jamy_update("angry");
                        }
                    }, attachment_array, LZP3, pool, (err, res) => {

                        if(!err) {

                            actions.trigger_snackbar("SAVING, Successful!", 2000);
                        }else {

                            actions.trigger_snackbar("SAVING, Failed!", 2000);
                        }
                    });
                }).catch(() => {

                    actions.trigger_snackbar("Looks like I can't save your file as our compression module can't load.", 5700);
                    actions.jamy_update("angry");
                });
            });
        }
    };

    _delete_unsaved_pixel_art = (id) => {

        const attachments = {};
        attachments["json_state-ID" + id + ".json.lzp3"] = "delete";

        api.set_settings({}, this._process_settings_info_result, attachments, null, null, (err, res) => {

            if(!err) {

                actions.trigger_snackbar("DELETION, Successful!", 2000);
                let ap = Object.assign({}, this.state._attachment_previews);
                delete ap[id];
                this.setState({_attachment_previews, ap}, () => {

                    this.forceUpdate();
                });
            }else {

                actions.trigger_snackbar("DELETION, Failed!", 2000);
            }

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

        actions.stop_sound();
        window.removeEventListener("resize", this._updated_dimensions);
        document.removeEventListener("keydown", this._handle_keydown);
        document.removeEventListener("keyup", this._handle_keyup);
    }

    _handle_menu_close = () => {

        this.setState({_menu_mouse_x: null, _menu_mouse_y: null});
    };

    _handle_right_click = (event, data) => {

        const { get_pixel_color_from_pos } = this.state._canvas;

        this.setState({
            _menu_mouse_x: event.clientX - 2,
            _menu_mouse_y: event.clientY - 4,
            _menu_data: data,
            _menu_event: event,
        });

        setTimeout(() => {

            data.pxl_color = get_pixel_color_from_pos(data.pos_x, data.pos_y);
            this.setState({_menu_data: data});

        }, 100);

    };

    _set_cursor_fuck_you = (is_active) => {

        this.setState({_is_cursor_fuck_you_active: is_active});
        actions.jamy_update("happy", 2500);
    }


    _process_settings_info_result = (error, settings) => {

        if(!error && typeof settings !== "undefined") {

            // Set new settings from query result
            const _attachment_previews = typeof settings.attachment_previews !== "undefined" ? settings.attachment_previews: {};

            actions.trigger_sfx("hero_decorative-celebration-02");

            this.setState({_attachment_previews}, () => {

                this.forceUpdate();
            });
        }
    };

    _process_settings_attachment_result = (error, data) => {

        const { import_JS_state } = this.state._canvas;
        this._handle_load_complete("image_preload", {});

        if(Boolean(error)) {

            actions.trigger_snackbar("Looks like I can't get your file as something was erroneous.", 5700);
            actions.jamy_update("angry");
            this._handle_pixel_dialog_create_open();

        }else {

            this.setState({_kb: data.kb, _saved_at: Date.now()});

            import_JS_state(data, () => {

                this.setState({ _is_pixel_dialog_create_open: false, _attachment_previews: {}});
            });
            data = null;
        }
    };

    _handle_view_name_change = (view_name_index, previous_name_index = null) => {

        const { _view_names, _toolbox_container_ref } = this.state;
        previous_name_index = previous_name_index === null ? this.state._view_name_index: previous_name_index;

        const _view_name = _view_names[view_name_index] || _view_names[0];
        const _view_name_index = _view_names.indexOf(_view_name) === -1 ? 0: _view_names.indexOf(_view_name);

        if(previous_name_index > _view_name_index) {

            actions.trigger_sfx("navigation_transition-left");
        }else {

            actions.trigger_sfx("navigation_transition-right");
        }

        _toolbox_container_ref.scrollTop = 0;

        this.setState({_previous_view_name_index: previous_name_index || this.state._view_name_index, _view_name_index});
    };

    _handle_view_name_switch = (event, view_name_index,  previous_name_index = null) => {

        if(event.pointerType === "mouse" && event.button === 0 || event.pointerType !== "mouse") {

            const { _view_names, _toolbox_container_ref } = this.state;
            previous_name_index = previous_name_index === null ? this.state._view_name_index: previous_name_index;

            const _view_name = _view_names[view_name_index] || _view_names[0];
            const _view_name_index = _view_names.indexOf(_view_name) === -1 ? 0: _view_names.indexOf(_view_name);

            if(previous_name_index > _view_name_index) {

                actions.trigger_sfx("navigation_transition-left");
            }else {

                actions.trigger_sfx("navigation_transition-right");
            }

            _toolbox_container_ref.scrollTop = 0;

            this.setState({_previous_view_name_index: previous_name_index || this.state._view_name_index, _view_name_index});
        }
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

                const { undo } = this.state._canvas;

                undo();
            }else if(event.ctrlKey && event.key === "y") {

                const { redo } = this.state._canvas;

                redo();
            }else if(event.ctrlKey && event.key === "m") {

                this._set_tool("MINE");
            }else if(event.ctrlKey && event.key === "o") {

                this._upload_image();
            }else if(event.ctrlKey && event.key === "i") {

                this._handle_file_import();
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

                const { confirm_import } = this.state._canvas;
                confirm_import();
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

    _backup_state = () => {

        const { export_state } = this.state._canvas;
        export_state();
    };

    _download_image = (size) => {

        const { get_base64_png_data_url, xxhashthat } = this.state._canvas;

        window.dispatchEvent(new Event(`art-download-raster${size}`));

        get_base64_png_data_url(size, ([base_64]) => {

            const hash = xxhashthat(base_64);

            let a = document.createElement("a"); //Create <a>
            a.download = `PXPS-${hash}-RAS_${size}x.png`; //File name Here
            a.href = base_64;
            a.click();
            a.remove();
            base_64 = null;

            actions.trigger_sfx("hero_decorative-celebration-02");
            setTimeout(() => {

                actions.trigger_snackbar("SHARING greatly helps PIXA.PICS! Happy means happy.", 7000);
                actions.trigger_sfx("alert_high-intensity");

            }, 2000);
        }, false, 1, 100, 100);
    };

    _download_svg = (using = "xbrz", optimize_render_size = false) => {

        const { get_base64_png_data_url, xxhashthat } = this.state._canvas;

        using === "xbrz" ? window.dispatchEvent(new Event("art-download-vectorxbrz")): window.dispatchEvent(new Event("art-download-vectoromni"));

        actions.trigger_voice("please_wait");
        actions.trigger_snackbar("Please wait... Files will download in a few seconds.", 5700);
        actions.jamy_update("happy");

        this.setState({_loading: true, _loading_process: "image_render"}, () => {

            setTimeout(() => {

                get_base64_png_data_url(1, ([png_base64_in, palette]) => {

                    const hash = xxhashthat(png_base64_in);

                    let { _files_waiting_download } = this.state;
                    _files_waiting_download.push({
                        name: `PXPS-${hash}-RAS_1x.png`,
                        url: String(png_base64_in)
                    });
                    this.setState({_files_waiting_download}, () => {

                        this.forceUpdate();
                    });

                    actions.trigger_voice("processing");
                    base64png_to_xbrz_svg(String(png_base64_in), (image_base64) => {

                        let { _files_waiting_download } = this.state;
                        _files_waiting_download.push({
                            name: `PXPS-${hash}-${using.toUpperCase()}_RAS_6x.png`,
                            url: String(image_base64)
                        });
                        image_base64 = null;
                        this.setState({_files_waiting_download}, () => {

                            this.forceUpdate();
                        });

                    }, (svg_base64) => {

                        let { _files_waiting_download } = this.state;
                        _files_waiting_download.push({
                            name: `PXPS-${hash}-${using.toUpperCase()}_VEC_6x.svg`,
                            url: String(svg_base64)
                        });
                        svg_base64 = null;
                        this.setState({_files_waiting_download}, () => {

                            this.forceUpdate();
                        });

                        this.setState({_loading: false, _loading_process: ""}, () => {

                            actions.trigger_voice("complete");
                            actions.trigger_sfx("hero_decorative-celebration-02");
                            setTimeout(() => {

                                actions.trigger_share();
                                window.dispatchEvent(new Event("home-action-tryshare"));

                                setTimeout(() => {

                                    actions.trigger_snackbar("SHARING IT greatly helps PIXA.PICS! Happy means happy.", 7000);
                                }, 2000);

                            }, 2000);

                        });

                    }, Array.from(palette), String(using), Boolean(optimize_render_size));
                    palette = null;
                    png_base64_in = null;

                }, true, 1, 100, 100);

            }, 750);

        });
    };

    _continue_download = () => {

        let { _files_waiting_download } = this.state;

        if(_files_waiting_download.length > 0) {

            let file = _files_waiting_download.shift();

            let a = document.createElement("a"); //Create <a>
            a.download = String(file.name); //File name Here
            a.href = String(file.url);
            a.click();
            delete file.url;
            delete file.name;
            file = null;
            a.remove();

            if(_files_waiting_download.length === 0) {
                pool.terminate();
            }
            this.setState({_files_waiting_download}, () => {

                this.forceUpdate();
            });
        }
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

    _upload_image = (event) => {

        this._handle_file_upload(event);
    };

    _upload_image_library = () => {

        this.setState({_library_dialog_open: true, _library_type: "open"});
    };

    _close_library = () => {

        this.setState({_library_dialog_open: false});
    };

    _from_library = (base64) => {

        const { _library_type } = this.state;
        const { set_canvas_from_image, import_image_on_canvas } = this.state._canvas;
        let img = new Image;
        img.src = base64;

        img.onload = () => {

            if(_library_type === "open") {

                this.setState({_kb: 0, _saved_at: 1/0});
                set_canvas_from_image(img);
            }else if(_library_type === "import"){

                import_image_on_canvas(img, base64);
            }

            this._close_library();
        };
    };

    _handle_file_upload = (event) => {

        const files = (event.target || {}).files || (event.srcElement || {}).files || (event.currentTarget || {}).files || ((event.path || [])[0] || {}).files || [];
        const dumb_file = files[0] || null;
        let smart_file = null;
        for (let i = 0; i < files.length; i++) {
            const f = files[i];
            if(f.type.startsWith('image/')) {
                smart_file = f;
            }
        };

        if(smart_file === null && dumb_file === null) {

            actions.trigger_snackbar("Looks like I can't get your file as something is erroneous.", 5700);
            actions.jamy_update("angry");
        }else if(smart_file !== null) {

            const is_type_png = Boolean(smart_file.type === "image/png"); //image/png
            const mimetype = is_type_png ? "image/png": "image/jpeg";

            const { _import_colorize, _import_size } = this.state;
            const { set_canvas_from_image } = this.state._canvas;

            this._handle_load("image_preload");
            file_to_base64(smart_file, (base64_input) => {

                base64_sanitize(base64_input, (base64_input) => {

                    actions.trigger_voice("data_upload");

                    const max_original_size = is_mobile_or_tablet ? Math.sqrt(1280 * 720): Math.sqrt(1920 * 1080);
                    const max_size = is_mobile_or_tablet ? Math.sqrt(512 * 512): Math.sqrt(512 * 512);
                    const max_color = is_mobile_or_tablet ? 1024: 2048;

                    let ratio_l_l2 = is_mobile_or_tablet ? 2: 4;
                    let min_size = is_mobile_or_tablet ? 384: 768;
                    let min_color = is_mobile_or_tablet ? 512: 1024;

                    const resize_original_to = parseInt(max_original_size * max_original_size);
                    const limit_color_number = Math.min(max_color, Math.max(parseInt(_import_size * ratio_l_l2), min_color));
                    const resize_to_before = Math.min(parseInt(max_size * max_size), Math.max(parseInt(_import_size * _import_size), parseInt(min_size * min_size)));
                    const resize_to_finally = Math.min(parseInt(max_size * max_size), parseInt(_import_size * _import_size));

                    base64_to_bitmap(base64_input, ( bitmap_input ) => {

                        smart_file = null;
                        base64_input = null;

                        bitmap_to_imagedata(bitmap_input, resize_original_to, (imagedata) => {

                            bitmap_input = null;
                            import("../utils/rgb_quant").then(({rgb_quant}) => {

                                if(_import_colorize === "1") {

                                    this._handle_load_complete("image_preload", {});
                                    this._handle_load("image_ai");
                                    actions.trigger_snackbar("Getting associated with DeepAI.org systems", 5700);
                                    actions.jamy_update("angry");

                                    imagedata_to_base64(imagedata, mimetype,(base64_resized) => {

                                        imagedata = null;
                                        postJSON("https://deepai.pixa-pics.workers.dev/colorizer", base64_resized, (err, res) => {

                                            base64_to_bitmap(res, (bitmap_received) => {

                                                res = null;
                                                bitmap_to_imagedata(bitmap_received, resize_to_before, (imagedata_received) => {

                                                    bitmap_received = null;
                                                    rgb_quant(imagedata_received, limit_color_number,(imagedata2) => {

                                                        imagedata_received = null;
                                                        imagedata_to_base64(imagedata2, "image/png", (base64) => {

                                                            imagedata2 = null;
                                                            base64_to_bitmap(base64, (bitmap_received) => {

                                                                base64 = null;
                                                                bitmap_to_imagedata(bitmap_received, resize_to_finally, (imagedata_received_2) => {

                                                                    bitmap_received = null;
                                                                    imagedata_to_base64(imagedata_received_2, "image/png", (base64_final) => {

                                                                        imagedata_received_2 = null;
                                                                        let img = new Image();
                                                                        img.addEventListener("load", () => {

                                                                            this._handle_load_complete("image_ai", {});
                                                                            this.setState({_kb: 0, _saved_at: 1/0});
                                                                            set_canvas_from_image(img, String(base64_resized), {}, true);
                                                                            base64_resized = null;
                                                                        }, {once: true, capture: true});
                                                                        img.src = String(base64_final);
                                                                        base64_final = null;

                                                                    });
                                                                });
                                                            });
                                                        }, pool);
                                                    }, pool);
                                                });
                                            }, pool);
                                        }, "application/text");
                                    }, pool);

                                }else if(_import_colorize === "2") {

                                    this._handle_load_complete("image_preload", {});
                                    this._handle_load("image_ai");
                                    actions.trigger_snackbar("Getting associated with DeepAI.org systems", 5700);
                                    actions.jamy_update("angry");

                                    imagedata_to_base64(imagedata, mimetype,(base64_resized) => {

                                        imagedata = null;
                                        postJSON("https://deepai.pixa-pics.workers.dev/waifu2x", base64_resized, (err, res) => {

                                            base64_to_bitmap(res, (bitmap_received) => {

                                                res = null;
                                                bitmap_to_imagedata(bitmap_received, resize_to_before, (imagedata_received) => {

                                                    bitmap_received = null;
                                                    rgb_quant(imagedata_received, limit_color_number,(imagedata2) => {

                                                        imagedata_received = null;
                                                        imagedata_to_base64(imagedata2, "image/png", (base64) => {

                                                            imagedata2 = null;
                                                            base64_to_bitmap(base64, (bitmap_received) => {

                                                                base64 = null;
                                                                bitmap_to_imagedata(bitmap_received, resize_to_finally, (imagedata_received_2) => {

                                                                    bitmap_received = null;
                                                                    imagedata_to_base64(imagedata_received_2, "image/png", (base64_final) => {

                                                                        imagedata_received_2 = null;
                                                                        let img = new Image();
                                                                        img.addEventListener("load", () => {

                                                                            this._handle_load_complete("image_ai", {});
                                                                            this.setState({_kb: 0, _saved_at: 1/0});
                                                                            set_canvas_from_image(img, String(base64_resized), {}, true);
                                                                            base64_resized = null;
                                                                        }, {once: true, capture: true});
                                                                        img.src = String(base64_final);
                                                                        base64_final = null;

                                                                    });
                                                                });
                                                            });
                                                        }, pool);
                                                    }, pool);
                                                });
                                            }, pool);
                                        }, "application/text");
                                    }, pool);

                                }else if(_import_colorize === "3") {

                                    this._handle_load_complete("image_preload", {});
                                    this._handle_load("image_ai");
                                    actions.trigger_snackbar("Getting associated with DeepAI.org systems", 5700);
                                    actions.jamy_update("angry");

                                    imagedata_to_base64(imagedata, mimetype, (base64_resized) => {

                                        imagedata = null;
                                        postJSON("https://deepai.pixa-pics.workers.dev/colorizer", base64_resized, (err, res) => {

                                            postJSON("https://deepai.pixa-pics.workers.dev/waifu2x",  res, (err2, res2) => {

                                                res = null;
                                                base64_to_bitmap(res2, (bitmap_received) => {

                                                    res2 = null;
                                                    bitmap_to_imagedata(bitmap_received, resize_to_before, (imagedata_received) => {

                                                        bitmap_received = null;
                                                        rgb_quant(imagedata_received, limit_color_number,(imagedata2) => {

                                                            imagedata_received = null;
                                                            imagedata_to_base64(imagedata2, "image/png", (base64) => {

                                                                imagedata2 = null;
                                                                base64_to_bitmap(base64, (bitmap_received_2) => {

                                                                    base64 = null;
                                                                    bitmap_to_imagedata(bitmap_received_2, resize_to_finally, (imagedata_received_2) => {

                                                                        bitmap_received_2 = null;
                                                                        imagedata_to_base64(imagedata_received_2, "image/png", (base64_final) => {

                                                                            imagedata_received_2 = null;
                                                                            let img = new Image();
                                                                            img.addEventListener("load", () => {

                                                                                this._handle_load_complete("image_ai", {});
                                                                                this.setState({_kb: 0, _saved_at: 1/0});
                                                                                set_canvas_from_image(img, String(base64_resized), {}, true);
                                                                                base64_resized = null;
                                                                            }, {once: true, capture: true});
                                                                            img.src = String(base64_final);
                                                                            base64_final = null;

                                                                        });
                                                                    });
                                                                });
                                                            }, pool);
                                                        }, pool);
                                                    });
                                                }, pool);
                                            }, "application/text");
                                        }, "application/text");
                                    }, pool);

                                }else {

                                    imagedata_to_base64(imagedata, mimetype, (base64_resized) => {

                                        imagedata = null;
                                        base64_to_bitmap(base64_resized, (bitmap) => {

                                            bitmap_to_imagedata(bitmap, resize_to_before, (imagedata_received) => {

                                                bitmap = null;
                                                rgb_quant(imagedata_received, limit_color_number,(imagedata2) => {

                                                    imagedata_received = null;
                                                    if(imagedata2 === null) {

                                                        window.dispatchEvent(new Event("art-upload-browsererror"));
                                                        this._handle_load_complete("image_preload", {});
                                                        this._handle_load("browser");
                                                        actions.trigger_sfx("alert_high-intensity", 0.6);
                                                        actions.jamy_update("flirty");
                                                        actions.trigger_snackbar("That's our end my little diddy! My instinctive dwelling require a browser I am supporting.", 6000);

                                                        setTimeout(() => {

                                                            actions.trigger_sfx("alert_high-intensity", 0.7);
                                                            actions.jamy_update("sad");
                                                            actions.trigger_snackbar("Abandon, misfortune, sadness... I can't live in this strange place.", 7000);

                                                            setTimeout(() => {

                                                                actions.trigger_sfx("alert_high-intensity", 0.8);
                                                                actions.jamy_update("suspicious");
                                                                actions.trigger_snackbar("Ho no! I just can't, but someone needs to give me back my usual laboratory environment!", 7000);

                                                                setTimeout(() => {

                                                                    actions.trigger_sfx("alert_high-intensity", 0.9);
                                                                    actions.jamy_update("shocked");
                                                                    actions.trigger_snackbar("Yes my enjoyable smartness, gladly you hear me now! Everything gonna be alright to look at me!", 9000);

                                                                    setTimeout(() => {

                                                                        actions.jamy_update("happy");
                                                                        actions.trigger_sfx("alert_high-intensity", 1);

                                                                        setTimeout(() => {

                                                                            actions.trigger_sfx("alert_high-intensity", 1);

                                                                        }, 750);

                                                                    }, 4000);

                                                                }, 8000);

                                                            }, 8000);

                                                        }, 7000);

                                                    }else {

                                                        imagedata_to_base64(imagedata2, "image/png", (base64) => {

                                                            imagedata2 = null;
                                                            base64_to_bitmap(base64, (bitmap_received) => {

                                                                base64 = null;
                                                                bitmap_to_imagedata(bitmap_received, resize_to_finally, (imagedata_received_2) => {

                                                                    bitmap_received = null;
                                                                    imagedata_to_base64(imagedata_received_2, "image/png", (base64_final) => {

                                                                        imagedata_received_2 = null;
                                                                        let img = new Image();
                                                                        img.addEventListener("load", () => {

                                                                            this._handle_load_complete("image_preload", {});
                                                                            this.setState({_kb: 0, _saved_at: 1/0});
                                                                            set_canvas_from_image(img, String(base64_resized), {}, false);
                                                                            base64_resized = null;
                                                                        }, {once: true, capture: true});
                                                                        img.src = String(base64_final);
                                                                        base64_final = null;

                                                                    });
                                                                });
                                                            });
                                                        }, pool);
                                                    }
                                                }, pool);
                                            });
                                        }, pool);
                                    }, pool);
                                }

                            }).catch((e) => {

                                this._handle_load_complete("image_preload", {});
                                actions.trigger_snackbar("Be sure to have a recent browser or install Google Chrome for using it.", 5700);
                                actions.jamy_update("angry");

                            });

                        });

                    }, pool);

                });

            }, pool);
        }
    };

    _handle_import_json_state_id = (id) => {

        import("../utils/lzp3_json").then(({LZP3}) => {

            this._handle_load("image_preload");
            actions.trigger_voice("accessing_memory");
            api.get_settings(() => {}, ["json_state-ID" + id + ".json.lzp3"], this._process_settings_attachment_result, LZP3, pool);
        }).catch(() => {

            actions.trigger_snackbar("Looks like I can't get your file as our compression module can't load.", 5700);
            actions.jamy_update("angry");
        });
    };

    _handle_file_import = (event) => {

        const files = (event.target || {}).files || (event.srcElement || {}).files || (event.currentTarget || {}).files || ((event.path || [])[0] || {}).files || [];
        const dumb_file = files[0] || null;
        let smart_file = null;
        for (let i = 0; i < files.length; i++) {
            const f = files[i];
            if(f.type.startsWith('image/')) {
                smart_file = f;
            }
        };

        if(smart_file !== null) {

            let img = new Image();
            const { import_image_on_canvas } = this.state._canvas;

            file_to_base64(smart_file, (base64) => {

                img.onload = () => {

                    import_image_on_canvas(img, base64);
                    this._handle_menu_close();
                };
                img.src = base64;

            }, pool);
        }
    };

    _import_image_library = () => {

        this.setState({_library_dialog_open: true, _library_type: "import"});
    };

    _handle_load = (process) => {

        actions.trigger_loading_update(0);
        this.setState({_loading: true, _loading_process: process});

        if(process === "image_preload"){

            this._handle_edit_drawer_close();
            this._handle_menu_close();
            this._handle_pixel_dialog_create_close();
        }
    };

    _handle_load_complete = (process, data) => {

        actions.trigger_loading_update(100);
        this.setState({_loading: false, _loading_process: process});

        if(process === "less_color" || process === "less_color_auto") {

            if(data.colors_removed !== 0) {

                actions.trigger_snackbar(`I am a magician! And ${data.colors_removed} colors are now gone, only ${data.colors_remaining} remaining.`);
                actions.trigger_sfx("navigation_selection-complete-celebration");
                actions.jamy_update("happy");
            }
        }else if(process === "image_load"){

            actions.trigger_snackbar(`DONE! We've imported an image with my now ${data.number_of_colors} colors.`);
            setTimeout(() => {

                actions.trigger_voice("complete");
            }, 1000);
            actions.jamy_update("happy");
            this._handle_edit_drawer_close();
            this._handle_menu_close();
            this._handle_pixel_dialog_create_close();
        }
    };

    _set_ripple_ref = (element) => {

        if(element === null || this.state._ripple !== null) {return}

        let new_element = {};

        Object.keys(element).forEach((k) => {

            if(typeof element[k] === "function") {

                new_element[k] = element[k];
            }
        });

        this.setState({_ripple: new_element});
    };

    _set_canvas_ref = (element) => {

        if(element === null || this.state._filters.length > 0) {return}

        let new_element = {};

        Object.keys(element).forEach((k) => {

            if(typeof element[k] === "function") {

                new_element[k] = element[k];
            }
        });

        this.setState({_canvas: new_element, _filters: new_element.get_filter_names()});
    };

    _handle_position_change = (position, fps) => {

        this.setState({_x: position.x, _y: position.y, _fps: parseInt(fps)});
    }

    _handle_can_undo_redo_change = (_can_undo, _can_redo) => {

        this.setState({_can_undo, _can_redo})
    }

    _handle_size_change = (_width, _height) => {

        this.setState({_width, _height}, () => {

            this.forceUpdate();
        });
    }

    _handle_current_color_change = (color, event) => {

        if(typeof color.rgb !== "undefined") {

            color = color_conversion.to_hex_from_rgba(Uint8ClampedArray.of(color.rgb.r, color.rgb.g, color.rgb.b, parseInt(color.rgb.a * 255)));
        }else {

            color = color_conversion.format_hex_color(color);
        }

        const h = color_conversion.to_hsla_from_rgba(color_conversion.to_rgba_from_hex(color))[0];

        this.setState({_current_color: color, _hue: h});
    };

    _handle_relevant_action_event = (event, color = "#ffffff", opacity = 0, sound = false) => {

        const { _ripple } = this.state;

        if(event && _ripple) {

            if(sound) {

                actions.trigger_sfx("navigation_selection-complete-celebration");
            }

            if(opacity !== 0) {

                this.setState({_ripple_color: color, _ripple_opacity: opacity}, () => {
                    _ripple.start(event);

                    setTimeout(() => {

                        _ripple.stop(event);
                    }, 250);
                });
            }
        }
    };

    _handle_something_selected_change = (is_something_selected) => {

        this.setState({_is_something_selected: is_something_selected});
    };

    _set_value_from_slider_with_update = (event, value) => {

        this.setState({_slider_value: value}, () => {

            this.forceUpdate();
        });
    };

    _set_width_from_slider = (event, value) => {

        const { _set_size } = this.state._canvas;
        _set_size(value, null);
    };

    _set_height_from_slider = (event, value) => {

        const { _set_size } = this.state._canvas;
        _set_size(null, value);
    };

    _set_import_size = (event, value) => {

        this.setState({_import_size: value || event.target.value});
    };

    _set_import_colorize = (event, value) => {

        this.setState({_import_colorize: value || event.target.value});
    };

    _revert_tool = () => {

        this.setState({_tool: String(this.state._memory_tool)});
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

    _handle_layers_change = (_layer_index, _layers) => {

        this.setState({_previous_layer_index: parseInt(this.state._layer_index), _layer_index, _layers}, () => {

            this.forceUpdate();
        });
    };

    _handle_filters_thumbnail_change = (_filters_thumbnail, _last_filters_hash, _filters_preview_progression) => {

        if(this.state._filters_preview_progression === "0") {
            actions.trigger_voice("filtering");
        }

        this.setState({_filters_thumbnail, _last_filters_hash, _filters_preview_progression: String(_filters_preview_progression)}, () => {

            this.forceUpdate();
        });
    };

    _handle_game_end = () => {

        this.setState({_game_ended: true}, () => {

            setTimeout(() => {

                this.setState({_game_ended: false});

            }, 5000);
        });
    };

    _handle_edit_drawer_open = (event, _view_name_index) => {

        _view_name_index = typeof _view_name_index !== "undefined" ? _view_name_index: this.state._view_name_index;
        const do_inner_view_next = Boolean(this.state._view_name_index === _view_name_index) && this.state._is_edit_drawer_open;
        const { _toolbox_container_ref } = this.state;

        let _is_edit_drawer_open = true;
        let _view_name_sub_index = null;
        if(do_inner_view_next && _toolbox_container_ref !== null) {

            _view_name_sub_index = this.state._view_name_sub_index || 0;
            _view_name_sub_index++;

            const classname_of_panel = `swipetoolbox_i_${_view_name_index}_${_view_name_sub_index}`;
            const panel_element = (document.getElementsByClassName(classname_of_panel) || [])[0] || null;

            if(panel_element !== null) {

                _toolbox_container_ref.scrollTop = panel_element.offsetTop;
            }else {

                _view_name_sub_index = 0;
                _toolbox_container_ref.scrollTop = 0;
            }


        }else {

            _view_name_sub_index = 0;
            _toolbox_container_ref.scrollTop = 0;
        }

        this.setState({_is_edit_drawer_open, _view_name_index, _view_name_sub_index});
    };

    _handle_edit_drawer_close = () => {

        this.setState({_is_edit_drawer_open: false});
    };

    _set_current_color = (_current_color) => {

        this._handle_menu_close();
        this.setState({_current_color});
    };

    _exchange_pixel_colors = (old_pixel_color, new_pixel_color) => {

        const { exchange_pixel_color } = this.state._canvas;
        let { _menu_data } = this.state;

        exchange_pixel_color(old_pixel_color, new_pixel_color);
        _menu_data.pxl_color = new_pixel_color;

        this._handle_menu_close();
        this.setState({_menu_data});
    };

    _to_auto_medium_more_contrast = () => {

        const { auto_adjust_contrast } = this.state._canvas;
        auto_adjust_contrast(1/3);
        actions.trigger_voice("enhanced");
    };

    _to_auto_medium_more_saturation = () => {

        const { auto_adjust_saturation } = this.state._canvas;
        auto_adjust_saturation(1/3);
        actions.trigger_voice("enhanced");
    };

    _less_colors_stepped = (increase = 1, callback_function = () => {}) => {

        const { less_colors_stepped } = this.state._canvas;
        less_colors_stepped(increase, callback_function);
    };

    _less_colors_auto = ( ) => {

        const { _layers, _layer_index } = this.state;
        const { to_less_color } = this.state._canvas;
        actions.trigger_voice("please_wait");

        if(parseInt((_layers[_layer_index] || {}).number_of_colors || 0) >= 384) {

            actions.trigger_snackbar("Ho! There is more than 384 colors, let's scan and remove the closest ones.")
            this._less_colors_stepped(1, () => {

                to_less_color("auto");
            });
        }else {

            to_less_color("auto");
        }
    };

    _get_average_color_of_selection = () => {

        const { get_average_color_of_selection } = this.state._canvas;
        const color = get_average_color_of_selection();

        this._handle_current_color_change(color);
    };

    _handle_pixel_dialog_create_close = () => {

        this.setState({_is_pixel_dialog_create_open: false, _attachment_previews: {}}, () => {

            this.forceUpdate();
        });
    };

    _handle_pixel_dialog_create_open = () => {

        this.setState({_is_pixel_dialog_create_open: true}, () => {

            api.get_settings(this._process_settings_info_result);
        });
    };

    _get_OS = () => {
        let userAgent = window.navigator.userAgent,
            platform = ((window.navigator || {}).userAgentData || {}).platform || window.navigator.platform,
            macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
            windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
            iosPlatforms = ["iPhone", "iPad", "iPod"],
            os = null;

        if (macosPlatforms.indexOf(platform) !== -1) {
            os = "Mac OS";
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = "iOS";
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = "Windows";
        } else if (/Android/.test(userAgent)) {
            os = "Android";
        } else if (!os && /Linux/.test(platform)) {
            os = "Linux";
        }

        return os;
    };

    _get_advanced_browser = () => {



        actions.jamy_update("suspicious");
        actions.trigger_snackbar("Ho great, the lab will be safe there...", 5000)

        setTimeout(() => {

            actions.trigger_sfx("hero_decorative-celebration-02");
            actions.jamy_update("happy");

            setTimeout(() => {

                this._handle_load_complete("browser", {});
                const { _history } = this.state;
                _history.push("/");

                const os = this._get_OS();
                if(["Linux", "Windows"].includes(os)) {

                    window.open("https://www.microsoft.com/edge");
                }else {

                    window.open("https://www.google.com/chrome/");
                }

            }, 1750);

        }, 1250);
    }


    _set_toolbox_container_ref = (element) => {

        if(element !== null) {

            this.setState({_toolbox_container_ref: element});
        }
    };

    _toggle_perspective = () => {

        const new_perspective = Boolean(!this.state._perspective);

        if(new_perspective) {

            actions.trigger_voice("vision_activated");
            this._set_tool("MOVE", false);
        }else {

            actions.trigger_voice("vision_deactivated");
            this._revert_tool();
        }

        this.setState({_perspective: new_perspective}, () => {

            this.forceUpdate();
        });
    };

    _smooth_adjust = (run = 1) => {
        const { smooth_adjust } = this.state._canvas;
        smooth_adjust(run);
    }

    _handle_fps_change = (_fps) => {

        this.setState({_fps}, () => {

            this.forceUpdate();
        });
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
            _import_colorize,
            _hue,
            _filters,
            _select_mode,
            _pencil_mirror_mode,
            _x, _y, _kb, _saved_at, _fps,
            _is_something_selected,
            _mine_player_direction,
            _is_edit_drawer_open,
            _menu_mouse_y,
            _menu_mouse_x,
            _menu_data,
            _ripple_color,
            _ripple_opacity,
            _menu_event,
            _library_dialog_open,
            _library,
            _less_than_1280w,
            _is_pixel_dialog_create_open,
            _h_svg,
            _attachment_previews,
            _is_cursor_fuck_you_active,
            _filters_thumbnail,
            _last_filters_hash,
            _filters_preview_progression,
            _perspective,
            _files_waiting_download,
            _time_ago_initiated,
        } = this.state;

        let x = _x === -1 ? "out": _x + 1;
        let y = _y === -1 ? "out": _y + 1;

        _menu_data.pos_x = _menu_data.pos_x === -1 ? "out": _menu_data.pos_x;
        _menu_data.pos_y = _menu_data.pos_y === -1 ? "out": _menu_data.pos_y;

        const os = this._get_OS();

        const drawer_mobile = _less_than_1280w &&
            (
                <SwipeableDrawer
                    className={classes.contentDrawer}
                    disableBackdropTransition={false}
                    disableSwipeToOpen={true}
                    disableDiscovery={true}
                    disablePortal={true}
                    keepMounted={true}
                    open={_is_edit_drawer_open}
                    onOpen={this._handle_edit_drawer_open}
                    onClose={this._handle_edit_drawer_close}
                    classes={{
                        paper: classes.swipeableDrawerPaper,
                        modal: classes.drawerModal,
                    }}
                    transitionDuration={{enter: 50, exit: 75}}
                    ModalProps={{disablePortal: true, BackdropProps:{classes: {root: classes.drawerModalBackdropRoot}}}}
                    variant="temporary"
                    anchor="bottom"
                >
                    <DialogCloseButton onClick={this._handle_edit_drawer_close} />
                    <div style={{display: "grid", contain: "layout paint style"}}>
                        <div style={{boxShadow: "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px", zIndex: 1}}>
                            <div className={classes.drawerHeader}>
                                <Typography className={classes.effectSliderText} id="strength-slider" gutterBottom>
                                    Effect strength :
                                </Typography>
                                <Slider
                                    className={classes.effectSlider}
                                    defaultValue={_slider_value}
                                    step={1/32}
                                    min={0}
                                    max={1}
                                    onChangeCommitted={this._set_value_from_slider_with_update}
                                    aria-labelledby="strength-slider"
                                />
                            </div>
                        </div>
                        <div className={classes.drawerContainer} ref={this._set_toolbox_container_ref}>
                            <PixelToolboxSwipeableViews
                                should_update={_is_edit_drawer_open}
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
                                import_colorize={_import_colorize}
                                filters_thumbnail={_filters_thumbnail}
                                last_filters_hash={_last_filters_hash}
                                filters_preview_progression={_filters_preview_progression}

                                set_tool={this._set_tool}
                                set_select_mode={this._set_select_mode}
                                set_pencil_mirror_mode={this._set_pencil_mirror_mode}
                                set_width_from_slider={this._set_width_from_slider}
                                set_height_from_slider={this._set_height_from_slider}
                                set_import_size={this._set_import_size}
                                set_import_colorize={this._set_import_colorize}
                                switch_with_second_color={this._switch_with_second_color}
                                show_hide_canvas_content={this._show_hide_canvas_content}
                                show_hide_background_image={this._show_hide_background_image}
                                show_hide_transparent_image={this._show_hide_transparent_image}
                                on_current_color_change={this._handle_current_color_change}
                                on_view_name_change={this._handle_view_name_change}
                                on_upload_image={(e) => {window.dispatchEvent(new Event("art-upload-drawer")); this._upload_image(e);}}
                                on_upload_image_library={this._upload_image_library}
                                on_import_image={(e) => {window.dispatchEvent(new Event("art-import-drawer")); this._handle_file_import(e);}}
                                on_import_image_library={this._import_image_library}
                                on_download_image={this._download_image}
                                on_download_svg={this._download_svg}
                            />
                        </div>
                    </div>
                </SwipeableDrawer>
            );
            const drawer_desktop = !_less_than_1280w && (
                <Drawer
                    className={classes.contentDrawerFixed}
                    variant="permanent"
                    anchor="right"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div style={{display: "contents"}}>
                        <div style={{boxShadow: "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px", zIndex: 1}}>
                            <div className={classes.drawerHeader}>
                                            <span className={classes.coordinate}>
                                                <span>{`FPS: ${_fps}`}</span>
                                                <span>{` | X: ${x}, Y: ${y} | `}</span>
                                                <span onClick={this._backup_state} style={{cursor: "pointer"}} className={_kb < 64 ? classes.green: classes.red}>{`[~${_kb < 1 ? "?": Math.round(_kb * 100) / 100} kB] ${t(_saved_at, {mini: true})}`}</span>
                                            </span>
                                <Typography className={classes.effectSliderText} id="strength-slider" gutterBottom>
                                    Effect strength :
                                </Typography>
                                <Slider
                                    defaultValue={_slider_value}
                                    className={classes.effectSlider}
                                    step={1/32}
                                    min={0}
                                    max={1}
                                    onChangeCommitted={this._set_value_from_slider_with_update}
                                    aria-labelledby="strength-slider"
                                />
                            </div>
                            <Tabs className={classes.tabs}
                                  variant="fullWidth"
                                  indicatorColor="primary"
                                  textColor="primary"
                                  selectionFollowsFocus={false}
                                  value={_view_name_index}
                                  onChange={(event, index) => {this._handle_view_name_change(index)}}>
                                <Tab className={classes.tab} label={"colors"} icon={<ColorsTweemoji />} />
                                <Tab className={classes.tab} label={"image"} icon={<ImageTweemoji />} />
                                <Tab className={classes.tab} label={"layers"} icon={<LayersTweemoji />} />
                                <Tab className={classes.tab} label={"tools"} icon={<ToolsTweemoji />} />
                                <Tab className={classes.tab} label={"select"} icon={<SelectTweemoji />} />
                                <Tab className={classes.tab} label={"effects"} icon={<EffectsTweemoji />} />
                                <Tab className={classes.tab} label={"filters"} icon={<FiltersTweemoji />} />
                            </Tabs>
                        </div>
                        <div className={classes.drawerContainer} ref={this._set_toolbox_container_ref}>
                            <PixelToolboxSwipeableViews
                                should_update={true}
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
                                width={parseInt(_width)}
                                height={parseInt(_height)}
                                filters={_filters}
                                select_mode={_select_mode}
                                pencil_mirror_mode={_pencil_mirror_mode}
                                is_something_selected={_is_something_selected}
                                import_size={_import_size}
                                import_colorize={_import_colorize}
                                filters_thumbnail={_filters_thumbnail}
                                last_filters_hash={_last_filters_hash}
                                filters_preview_progression={_filters_preview_progression}

                                set_tool={this._set_tool}
                                set_select_mode={this._set_select_mode}
                                set_pencil_mirror_mode={this._set_pencil_mirror_mode}
                                set_width_from_slider={this._set_width_from_slider}
                                set_height_from_slider={this._set_height_from_slider}
                                set_import_size={this._set_import_size}
                                set_import_colorize={this._set_import_colorize}
                                switch_with_second_color={this._switch_with_second_color}
                                show_hide_canvas_content={this._show_hide_canvas_content}
                                show_hide_background_image={this._show_hide_background_image}
                                show_hide_transparent_image={this._show_hide_transparent_image}
                                on_current_color_change={this._handle_current_color_change}
                                on_view_name_change={this._handle_view_name_change}
                                on_upload_image={(e) => {window.dispatchEvent(new Event("art-upload-drawer")); this._upload_image(e);}}
                                on_upload_image_library={this._upload_image_library}
                                on_import_image={this._handle_file_import}
                                on_import_image_library={this._import_image_library}
                                on_download_image={this._download_image}
                                on_download_svg={this._download_svg}
                            />
                        </div>
                    </div>
                </Drawer>
            );

        return (
            <div style={{height: "100%", position: "relative"}}>
                <div className={classes.root}>
                    <div className={classes.contentInner} style={{
                        backgroundColor: "#f7f7f7",
                        backgroundImage: `url("${_h_svg}")`,
                        backgroundRepeat: "repeat",
                        backgroundSize: `${Math.ceil(.5*200)}px ${Math.ceil(.5*229.3)}px`,
                        textRendering: "optimizespeed",
                        imageRendering: "optimizespeed",
                    }}>
                        <Suspense fallback={<div className={classes.contentCanvas}/>}>
                            <CanvasPixels
                                perspective={_perspective ? 2: 0}
                                on_export_state={this._handle_canvas_state_export}
                                export_state_every_ms={is_mobile_or_tablet ? 5 * 60 * 1000: 3.5 * 60 * 1000}
                                shadow_size={is_mobile_or_tablet ? 0: 1.5}
                                key={"canvas"}
                                className={classes.contentCanvas}
                                ref={this._set_canvas_ref}
                                tool={_tool}
                                canvas_wrapper_padding={8}
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
                                on_fps_change={this._handle_fps_change}
                                onPositionChange={this._handle_position_change}
                                onLayersChange={this._handle_layers_change}
                                onFiltersThumbnailChange={this._handle_filters_thumbnail_change}
                                onGameEnd={this._handle_game_end}
                                onRelevantActionEvent={this._handle_relevant_action_event}
                                setCursorFuckYou={this._set_cursor_fuck_you}
                                onRightClick={this._handle_right_click}
                                mine_player_direction={_mine_player_direction}
                                pxl_current_color={_current_color}
                                convert_scale={1}
                                default_size={_import_size}
                                ideal_size={_import_size}
                                max_size={_import_size * 1.5}
                                fast_drawing={true}
                                px_per_px={1}/>
                        </Suspense>
                        <Menu
                            className={_is_cursor_fuck_you_active ? classes.contextMenuFuckYouActive: classes.contextMenuFuckYouDisable}
                            PaperProps={{
                                style: {
                                    maxHeight: 350,
                                    width: 250,
                                    overflowY: "overlay"
                                },
                            }}
                            onContextMenu={(e) => {e.preventDefault()}}
                            MenuListProps={{dense: true}}
                            transitionDuration={{enter: 50, exit: 75}}
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
                                (_tool === "SET PENCIL MIRROR" || _pencil_mirror_mode !== "NONE") &&
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
                            }
                            {
                                _is_something_selected &&
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
                            }
                            <ListSubheader style={_menu_data.pxl_color === null ? {display: "none"}: {}} className={classes.contextMenuSubheader}>Color</ListSubheader>
                            <ListItem button divider style={_menu_data.pxl_color === null ? {display: "none"}: {}} disabled={_menu_data.pxl_color === _current_color || _menu_data.pxl_color === null} onClick={(event) => {this._set_current_color(_menu_data.pxl_color); this._handle_relevant_action_event(_menu_event, _menu_data.pxl_color, 1, true);}}>
                                <ListItemIcon>
                                    <SquareIcon style={{ color: _menu_data.pxl_color, background: `repeating-conic-gradient(#80808055 0% 25%, #00000000 0% 50%) 50% / calc(200% / ${_width}) calc(200% / ${_height})`}} />
                                </ListItemIcon>
                                <ListItemText primary="Pick color" />
                            </ListItem>
                            <ListItem button divider style={_menu_data.pxl_color === null ? {display: "none"}: {}} disabled={_menu_data.pxl_color === _current_color || _menu_data.pxl_color === null} onClick={(event) => {this._exchange_pixel_colors(_menu_data.pxl_color, _current_color); this._handle_relevant_action_event(_menu_event, _current_color, 1, true);}}>
                                <ListItemIcon>
                                    <SquareIcon style={{ color: _current_color, background: `repeating-conic-gradient(#80808055 0% 25%, #00000000 0% 50%) 50% / calc(200% / ${_width}) calc(200% / ${_height})`}} />
                                </ListItemIcon>
                                <ListItemText primary="Replace color" />
                            </ListItem>
                            <ListSubheader className={classes.contextMenuSubheader}>Effect</ListSubheader>
                            <ListItem button divider onClick={(event) => this._to_auto_medium_more_contrast()}>
                                <ListItemIcon>
                                    <ContrastCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Increase contrast" />
                            </ListItem>
                            <ListItem button divider onClick={(event) => this._to_auto_medium_more_saturation()}>
                                <ListItemIcon>
                                    <ContrastCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary="Increase saturation" />
                            </ListItem>
                            <ListItem button divider onClick={(event) => this._handle_edit_drawer_open(null,6)}>
                                <ListItemIcon>
                                    <ImageFilterMagicIcon />
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
                            <ListItem button divider onClick={(event) => this._smooth_adjust(1)}>
                                <ListItemIcon>
                                    <ImageSmoothIcon />
                                </ListItemIcon>
                                <ListItemText primary="Smooth a bit" />
                            </ListItem>
                        </Menu>
                        {drawer_desktop}
                    </div>
                </div>

                <IconButton className={classes.perspectiveButton} color={"primary"} size={"small"} onClick={this._toggle_perspective}>
                    {_perspective ? <PerspectiveOff />: <PerspectiveOn />}
                </IconButton>

                <Button className={classes.saveButton} variant={"text"} color={"primary"} onClick={this._backup_state}>
                    {t(_saved_at, {mini: true})} <SaveIcon/> {_kb < 1 ? "?": Math.round(_kb * 10) / 10} kB
                </Button>

                <IconButton disabled={!_is_image_import_mode} className={classes.confirmImportButton} color={"primary"} size={"small"} onClick={() => {_canvas.confirm_import()}}>
                   <FileImportIcon/>
                </IconButton>

                <Button disabled={!_can_redo} variant={"text"} color={"primary"} size={"small"}className={classes.redoButton} onClick={(event) => {_canvas.redo()}}>
                    {`${-_can_redo || ""} Redo`} <ChangeHistoryOutlined style={{transition: "ease-out 225ms transform 25m", transform: `rotate(+${_can_redo*360+90}deg)`}}/>
                </Button>
                <Button disabled={!_can_undo} variant={"text"} color={"primary"} size={"small"} className={classes.undoButton} onClick={(event) => {_canvas.undo()}}>
                    <ChangeHistoryOutlined style={{transition: "ease-out 225ms transform 25ms", transform: `rotate(-${_can_undo*360+90}deg)`}}/>{`${+_can_undo || ""} Undo`}
                </Button>

                {drawer_mobile}

                <div className={classes.fatabs} style={_is_edit_drawer_open && _less_than_1280w ? {minHeight: 48, height: 48, backgroundColor: "#fff"}: {}}>
                    <Tabs className={classes.tabs} style={_is_edit_drawer_open && _less_than_1280w ? {minHeight: 48, height: 48}: {}}
                          variant="fullWidth"
                          scrollButtons="off"
                          indicatorColor="primary"
                          textColor="primary"
                          selectionFollowsFocus={true}
                          value={_view_name_index} onChange={(event, index) => {this._handle_edit_drawer_open(event, index)}}>>
                        <Tab onPointerEnter={(e) => {this._handle_view_name_switch(e, 0)}} className={classes.tab} label={"colors"} icon={<ColorsTweemoji />} />
                        <Tab onPointerEnter={(e) => {this._handle_view_name_switch(e, 1)}} className={classes.tab} label={"image"} icon={<ImageTweemoji />} />
                        <Tab onPointerEnter={(e) => {this._handle_view_name_switch(e, 2)}} className={classes.tab} label={"layers"} icon={<LayersTweemoji />} />
                        <Tab onPointerEnter={(e) => {this._handle_view_name_switch(e, 3)}} className={classes.tab} label={"tools"} icon={<ToolsTweemoji />} />
                        <Tab onPointerEnter={(e) => {this._handle_view_name_switch(e, 4)}} className={classes.tab} label={"select"} icon={<SelectTweemoji />} />
                        <Tab onPointerEnter={(e) => {this._handle_view_name_switch(e, 5)}} className={classes.tab} label={"effects"} icon={<EffectsTweemoji />} />
                        <Tab onPointerEnter={(e) => {this._handle_view_name_switch(e, 6)}}  className={classes.tab} label={"filters"} icon={<FiltersTweemoji />} />
                    </Tabs>
                </div>

                <ImageFileDialog
                    keepMounted={false}
                    open={_library_dialog_open}
                    object={_library}
                    onClose={this._close_library}
                    onSelectImage={this._from_library}
                />


                <PixelDialogCreate keepMounted={true}
                                   open={_is_pixel_dialog_create_open}
                                   pixel_arts={_time_ago_initiated ? _attachment_previews: {}}
                                   size={_import_size}
                                   on_import_size_change={this._set_import_size}
                                   on_pixel_art_delete={this._delete_unsaved_pixel_art}
                                   import_JSON_state={this._handle_import_json_state_id}
                                   on_upload={(e) => {window.dispatchEvent(new Event("art-upload-dialog")); this._upload_image(e);}}
                                   onClose={this._handle_pixel_dialog_create_close}/>

                <TouchRipple
                    className={classes.ripple}
                    ref={this._set_ripple_ref}
                    center={false}
                    style={{color: _ripple_color, opacity: _ripple_opacity, position: "fixed", width: "100vw", height: "100vh", zIndex: 2000}}/>

                <Backdrop className={classes.backdrop} open={_loading || _files_waiting_download.length > 0}>
                    <div className={classes.backdropTextContent} style={{ fontFamily: `"Jura"`, textTransform: "uppercase"}} onClick={this._continue_download}>
                        {Boolean(_loading || _files_waiting_download.length > 0) && <h1><ShufflingSpanText key={_loading_process || String(_loading)} text={_loading_process === "browser" ? "Laboratory in DANGER!": "LABORATORY PROCESSING"} animation_delay_ms={0} animation_duration_ms={200}/></h1>}
                        {_files_waiting_download.length > 0 && <h3><ShufflingSpanText key={String(_files_waiting_download[0].name)} text={`ACTION REQUIRED... ${String(_files_waiting_download[0].name)}`} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                        {_files_waiting_download.length > 0 && <div><img src={"/src/images/labostration/MOLECULE.svg"} style={{width: "min(75vw, 75vh)"}}/></div>}
                        {_files_waiting_download.length > 0 && <h4><ShufflingSpanText pre="[... " app=" ...]" style={{textShadow: "0px 0px 16px white"}} text={"CLICK ON THE SCREEN TO CONTINUE DOWNLOAD!"} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                        {_files_waiting_download.length === 0 && _loading && _loading_process === "browser" && <h3><ShufflingSpanText text={"Doesn't feel like home for our dear code here."} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "browser" && <div onClick={this._get_advanced_browser}><img src={["Linux", "Windows"].includes(os) ? "/src/images/EdgeGreatDownload.svg": "/src/images/ChromeGreatDownload.svg"} style={{width: "min(75vw, 75vh)"}}/></div>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "browser" && <h4><ShufflingSpanText pre="[... " app=" ...]" text={"It can take a while, please download an advanced browser."} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "image_ai" && <h3><ShufflingSpanText text={"AI processing your image"} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "image_ai" && <div><img src="/src/images/labostration/MOLECULE.svg" style={{width: "min(75vw, 75vh)"}}/></div>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "image_ai" && <h4><ShufflingSpanText pre="[... " app=" ...]" text={"It can take a while, please wait ~10sec."} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "image_preload" && <h3><ShufflingSpanText text={"Preparing laboratory"} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "image_preload" && <div><img src="/src/images/labostration/SCIENCE.svg" style={{width: "min(75vw, 75vh)"}}/></div>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "image_preload" && <h4><ShufflingSpanText pre="[... " app=" ...]" text={`It can take a while, please wait ~${parseInt(parseFloat(_import_size / 100) * 3) * (is_mobile_or_tablet ? 3: 1)}sec.`} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "image_load" && <h3><ShufflingSpanText text={"Abducting your image"} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "image_load" && <div><img src="/src/images/labostration/ABDUCTION.svg" style={{width: "min(75vw, 75vh)"}}/></div>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "image_load" && <h4><ShufflingSpanText pre="[... " app=" ...]" text={`It can take a while, please wait ~${parseInt(parseFloat(_import_size / 100) * 4) * (is_mobile_or_tablet ? 3: 1)}sec.`} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "image_render" && <div><img src="/src/images/labostration/COMPUTING.svg" style={{width: "min(75vw, 75vh)"}}/></div>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "image_render" && <h3><ShufflingSpanText text={"Atomic rendering in process"} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "image_render" && <h4><ShufflingSpanText pre="[... " app=" ...]" text={"It can take a while, please wait ~14sec."} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "less_color" && <h3><ShufflingSpanText text={"Coupling few color DNA"} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "less_color" && <div><img src="/src/images/labostration/GENOMA.svg" style={{width: "min(75vw, 75vh)"}}/></div>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "less_color" && <h4><ShufflingSpanText pre="[... " app=" ...]" text={"It can take a while, please wait ~4sec."} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "less_color_auto" && <h3><ShufflingSpanText text={"Coupling the DNA of many color"} animation_delay_ms={500} animation_duration_ms={500}/></h3>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "less_color_auto" && <div><img src="/src/images/labostration/GENOMA.svg" style={{width: "min(75vw, 75vh)"}}/></div>}
                        {_files_waiting_download.length === 0 && _loading  && _loading_process === "less_color_auto" && <h4><ShufflingSpanText pre="[... " app=" ...]" text={"It can take a while, please wait ~7sec."} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                    </div>
                </Backdrop>
            </div>
        );
    }
}

export default withStyles(styles)(Pixel);
