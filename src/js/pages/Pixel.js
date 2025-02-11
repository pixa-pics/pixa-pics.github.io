import FileImportIcon from "../icons/FileImport";
import {UJS} from "../utils/ujs";
import JSLoader from "../utils/JSLoader";
import React, { Suspense } from "react";
import JOYSON from "joyson";
import dispatcher from "../dispatcher";
const CanvasPixels = React.lazy(() =>  import("../components/canvaspixels/CanvasPixels.js"));
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import pool from "../utils/worker-pool";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import Slider from "@material-ui/core/Slider";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Drawer from "@material-ui/core/Drawer";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Menu from "@material-ui/core/Menu";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
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
import {file_to_imagedata_resized, file_to_base64, base64_sanitize, base64_to_bitmap, bitmap_to_imagedata, imagedata_to_base64} from "../utils/img_manipulation";

import {postJSON} from "../utils/load-json";

import PaletteIcon from "../icons/Palette";
import FolderImageIcon from "../icons/FolderImage";
import FolderIcon from "@material-ui/icons/Folder";
import DrawIcon from "../icons/Draw";
import SelectDragIcon from "../icons/SelectDrag";
import TuneIcon from "../icons/Tune";
import ImageAutoAdjustIcon from "../icons/ImageAutoAdjust";

import { createLocalBlob } from "../utils/objectURL";
import HexGrid from "../icons/HexGrid";
import get_svg_in_b64 from "../utils/svgToBase64";
import { l, t } from "../utils/t";

import ZoomIn from "@material-ui/icons/ZoomIn";
import ZoomOut from "@material-ui/icons/ZoomOut";
import PixelDialogText from "../components/PixelDialogText";
import {SIMDopeCreate} from "simdope";
const {Color} = SIMDopeCreate({
    "create": {
        "new_of": true,
        "new_hex": true
    },
    "properties": {
        "hsla": true,
        "hex": true,
        "rgb": true
    }
});
import SmartRequestAnimationFrame from "../components/canvaspixels/utils/SmartRequestAnimationFrame";
import {FaceToAllAPI, FloranceCaptionerAPI, LongCaptionerAPI, FaceToAllAPI2, FaceToAllAPI3} from "../utils/AI";
const styles = theme => ({
    green: {
        color: lightGreen[700],
    },
    red: {
        color: red[500],
    },
    root: {
        contain: "layout size style paint",
        contentVisibility: "auto",
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
        display: "inline-block",
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
    desktopintrovideowrapper: {
        cursor: "pointer",
        margin: "12px 24px",
        position: "absolute",
        right: 0,
        top: 0,
        "&:active, &:hover, &:active > video, &:hover > video": {
            height: 96,
            width: 96,
            transform: "scale(2)",
            zIndex: 1,
        },
        height: 56,
        width: 56,
        "&::after": {
            content: "''",
            background: `#fff !important`,
            position: "absolute",
            right: 0,
            top: 0,
            width: "10%",
            height: "15%"
        }
    },
    desktopintrovideo: {
        position: "absolute",
        right: 0,
        top: 0,
        height: 56,
        width: 56
    },
    mobileintrovideowrapper: {
        zIndex: 1,
        cursor: "pointer",
        margin: "16px 56px",
        position: "absolute",
        right: 0,
        top: 0,
        height: 32,
        width: 32,
        "&::after": {
            content: "''",
            background: `#fff !important`,
            position: "absolute",
            right: 0,
            top: 0,
            width: "10%",
            height: "15%"
        }
    },
    mobileintrovideo: {
        position: "absolute",
        right: 0,
        top: 0,
        height: 32,
        width: 32
    },
    effectSliderText:{
        color: "#050c4c",
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    effectSlider: {
        color: "#3729c1",
        padding: "16px 0px",
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
        whiteSpace: "nowrap"
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
        zIndex: 20,
        contain: "style size paint layout",
        boxShadow: "-2px 0px 4px 0px rgb(0 0 0 / 20%), -4px 0px 5px 0px rgb(0 0 0 / 14%), -6px 0px 10px 0px rgb(0 0 0 / 12%)",
        maxHeight: "100%",
        height: "100%",
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
        width: 480,
        overscrollBehavior: "none",
        display: "inline-block",
        animationFillMode: "both",
        animationName: "$drawer",
        animationDuration: "250ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "0ms",
        "& > div": {
            animationFillMode: "both",
            animationName: "$opacity",
            animationDuration: "125ms",
            animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            animationDirection: "alternate",
            animationIterationCount: "1",
            animationDelay: "150ms",
        }
    },
    "@keyframes drawer": {
        "0%": { transform: "translateX(100%)"},
        "190%": { transform: "translateX(0%)"},
    },
    "@keyframes opacity": {
        "0%": { filter: "opacity(0)"},
        "190%": { filter: "opacity(1)"},
    },
    "@keyframes menu": {
        "0%": { transform: "translateY(100%)"},
        "190%": { transform: "translateY(0%)"},
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
        transform: "translateZ(10px)",
        scrollBehavior: "smooth",
        contain: "size style paint layout",
        height: "100% !important",
        overflow: "overlay",
        [theme.breakpoints.down("md")]: {
            height: "calc(100vh - 180px) !important"
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
            filter: "inherit !important",
            WebkitFilter: "inherit",
            willChange: "none !important",
            height: "100% !important",
            [theme.breakpoints.up("lg")]: {
                width: 480,
            },
            [theme.breakpoints.down("md")]: {
                width: "100%",
            },
        },
    },
    tabs: {
        contain: "paint size style layout",
        animationFillMode: "both",
        animationName: "$menu",
        animationDuration: "175ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "0ms",
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
    "@keyframes bounce": {
        "0%": {transform: "translate3d(0, 0px, 0) scaleY(1.00)"},
        "20%": {transform: "translate3d(0, 2px, 0) scaleY(0.95)"},
        "40%": {transform: "translate3d(0, 0px, 0) scaleY(1.00)"},
        "70%": {transform: "translate3d(0, -2px, 0) scaleY(1.10)"},
        "80%": {transform: "translate3d(0, 1px, 0) scaleY(0.95)"},
        "90%": {transform: "translate3d(0, 0px, 0) scaleY(1.00)"}
    },
    tab: {
        backgroundColor: "#fafafa",
        color: "#050c4c",
        transition: "color, background-color cubic-bezier(0.4, 0, 0.2, 1) .275s",
        "&.Mui-selected": {
            fontWeight: "bold",
            backgroundColor: "#dfddf2",
            color: "#050c4c",
            transition: "color, background-color cubic-bezier(0.4, 0, 0.2, 1) .175s",
            borderRadius: "4px 4px 0px 0px",
            "& .MuiTab-wrapper": {
                animationDuration: "375ms",
                animationTimingFunction: "linear",
                animationName: "$bounce",
                transformOrigin: "center bottom"
            }
        },
        "&:hover": {
            fontWeight: "bold",
            backgroundColor: "#e8e6f5",
            color: "#050c4c",
            transition: "color, background-color cubic-bezier(0.4, 0, 0.2, 1) .175s",
            borderRadius: "4px 4px 0px 0px",
            "& .MuiTab-wrapper": {
                animationDuration: "375ms",
                animationTimingFunction: "linear",
                animationName: "$bounce",
                transformOrigin: "center bottom"
            }
        },
        "&:first-child": {
            borderRadius: "0px 4px 0px 0px",
        },
        "&:last-child": {
            borderRadius: "4px 0px 0px 0px",
        },
        "& .MuiTab-wrapper": {
            fontSize: "11px",
        },
        "& .MuiTab-wrapper svg": {
            width: 32,
            height: 32,
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
            color: "#181063",
        }
    },
    "@keyframes backdropanim": {
        "0%": {filter: "drop-shadow(0px, 0px, 20px, 20px, #131c955c)"}
    },
    backdrop: {
        zIndex: 2000,
        color: "#fff",
        filter: "brightness(1.1) contrast(1.2) drop-shadow(0 0 12px #070b32)",
        background: "radial-gradient(farthest-corner, #001856d1 20%, #636eff52 80%, #474e9b2b)",
        contain: "layout paint size style",
        userSelect: "none",
        animation: "$backdropanim 16s linear infinite both",
    },
    backdropTextContent: {
        display: "block",
        textAlign: "center",
    },
    fatabs: {
        transition: "transform 45ms cubic-bezier(0.4, 0, 0.2, 1) 5ms",
        backgroundColor: "#fafafa",
        boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
        contain: "paint size style layout",
        [theme.breakpoints.up("lg")]: {
            display: "none",
        },
        [theme.breakpoints.up("md")]: {
            width: "100%",
        },
        zIndex: 1300,
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "100%",
        height: 72,
    },
    listOfTools: {
        paddingTop: 0,
        [theme.breakpoints.down("md")]: {
            width: "100%",
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
        contain: "layout paint size style",
        pointerEvents: "none",
        contentVisibility: "auto",
        mixBlendMode: "dodge"
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
        animationFillMode: "both",
        animationName: "$fadein",
        animationDuration: "225ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "175ms",
    },
    saveButton: {
        backgroundColor: "#0037ff14 !important",
        position: "absolute",
        right: 496,
        top: 16,
        [theme.breakpoints.down("md")]: {
            right: 16,
        },
        animationFillMode: "both",
        animationName: "$fadein",
        animationDuration: "225ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "175ms",
    },
    confirmImportButton: {
        position: "absolute",
        left: 16,
        bottom: 16,
        [theme.breakpoints.down("md")]: {
            bottom: 88,
        },
        animationFillMode: "both",
        animationName: "$fadein",
        animationDuration: "225ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "175ms",
    },
    zoomInButton: {
        position: "absolute",
        left: 16,
        bottom: 104,
        [theme.breakpoints.down("md")]: {
            bottom: 176,
        },
        animationFillMode: "both",
        animationName: "$fadein",
        animationDuration: "225ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "175ms",
    },
    zoomOutButton: {
        position: "absolute",
        left: 16,
        bottom: 60,
        [theme.breakpoints.down("md")]: {
            bottom: 132,
        },
        animationFillMode: "both",
        animationName: "$fadein",
        animationDuration: "225ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "175ms",
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
        animationFillMode: "both",
        animationName: "$fadein",
        animationDuration: "225ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "175ms",
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
        animationFillMode: "both",
        animationName: "$fadein",
        animationDuration: "225ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "175ms",
    },
    "@keyframes fadein": {
        "0%": { filter: "opacity(0)"},
        "190%": { filter: "opacity(1)"},
    },
    imageBackdrop: {
        filter: "brightness(1.5) contrast(0.75) drop-shadow(2px 4px 6px black)",
        width: "min(75vw, 75vh)"
    }
});


class Pixel extends React.PureComponent {

    constructor(props) {
        super(props);
        this.st4te = {
            is_mobile_or_tablet: Boolean((/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent||navigator.vendor||window.opera.substr(0,4)))),
            classes: props.classes,
            load_with: props.load_with + "",
            _history: HISTORY,
            _perspective: false,
            _library_dialog_open: false,
            _library: {},
            _library_type: "open",
            _view_name_index: 1,
            _handle_wheel_timestamp: Date.now(),
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
            _import_size: "192",
            _import_colorize: "0",
            _hue: 360,
            _slider_value: 8/32,
            _slider_value_width: 192,
            _slider_value_height: 96,
            _game_ended: false,
            _previous_tool_timestamp: 1/0,
            _select_mode: "REPLACE",
            _pencil_mirror_mode: "NONE",
            _filters: [],
            _x: -1, _y: -1,
            _drag_file: false,
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
            _swipeable_drawer_handle_filters_thumbnail_change: function(){},
            _swipeable_drawer_set_props: function(){},
            _toolbox_container_ref: {},
            _files_waiting_download: [],
            _time_ago_initiated: false,
            _fps_el: {},
            _xy_el: {},
            _settings: JOYSON.unpack(props.settings),
            _tool: "MOVE",
            _memory_tool: "MOVE"
        };

        this.st4te._tool = this.st4te.is_mobile_or_tablet ? "MOVE": "PENCIL";
        this.st4te._memory_tool = this.st4te.is_mobile_or_tablet ? "MOVE": "PENCIL";
        this.sraf = Object.create(SmartRequestAnimationFrame).init();
    };

    setSt4te(st4te, callback) {
        "use strict";
        let keys = Object.keys(st4te);
        let keys_length = keys.length | 0;
        let key = "";

        for (let i = 0; (i|0) < (keys_length|0); i = (i+1|0)>>>0) {

            key = keys[i];
            this.st4te[key] = st4te[key];
        }

        if(typeof callback === "function") {
            callback();
        }
    }

    componentWillMount() {

        actions.trigger_loading_update(0);
        actions.trigger_page_render_complete();
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 300);
    }

    componentDidMount() {


        actions.trigger_snackbar(`Awesome buddy! Welcome back to the laboratory.`, 3500);

        l(null, () => {

            this._compute_menu_drawer();
            this.setSt4te({_time_ago_initiated: true});
        }, true);

        setTimeout(() => {

            if(this.st4te._is_pixel_dialog_create_open){

                actions.trigger_snackbar("Right here! Let's upload a picture now to create a new artwork.", 6000);

                setTimeout(() => {

                    if(this.st4te._is_pixel_dialog_create_open){

                        actions.trigger_snackbar("By the way, ...", 1000);

                        setTimeout(() => {

                            if(this.st4te._is_pixel_dialog_create_open){

                                actions.trigger_snackbar("Huh, let me take my breath! ...", 1500);
                                setTimeout(() => {

                                    if(this.st4te._is_pixel_dialog_create_open){

                                        actions.trigger_snackbar("You can set the size of your artwork before uploading your picture.", 10000);
                                    }
                                }, 3000);
                            }
                        }, 1500);
                    }
                }, 8500);
            }
        }, 9000);
        actions.jamy_update("happy");
        window.addEventListener("resize", this._updated_dimensions);
        window.addEventListener('wheel', this._prevent_ctrl_zoom, { passive: false });

        document.addEventListener("keydown", this._handle_keydown);
        document.addEventListener("keyup", this._handle_keyup);
        try {
            document.getElementById("tabs-desktop").addEventListener("wheel", this._handle_wheel, {passive: false});
        } catch (e){}
        dispatcher.register(this._handle_events.bind(this));
        this.setSt4te({_h_svg: createLocalBlob(get_svg_in_b64(<HexGrid color={"#e5e5e5"}/>)),_h_svg_size: `${Math.ceil(.5*200)}px ${Math.ceil(.5*229.3)}px`});
        JSLoader( () => import("../utils/ressource_pixel")).then((RESSOURCE_PIXELS) => {

            this.setSt4te({_library: RESSOURCE_PIXELS});
        });

        this._set_saved_at_element();
        this._try_load_with_payload(this.st4te.load_with);

        setTimeout(() => {
            this._request_force_update(false, true).then(() => {
                this._updated_dimensions();
            });
        }, 1000);
    }

    _request_force_update = (can_be_cancelable, especially_dont_force) => {

        "use strict";

        can_be_cancelable = typeof can_be_cancelable == "undefined" ? true: can_be_cancelable;
        especially_dont_force = typeof especially_dont_force == "undefined" ? false: especially_dont_force;

        return this.sraf.run_frame(  () => {
            "use strict";
            return new Promise((resolve, reject) => {
                "use strict";
                this.forceUpdate(resolve);
            });
        }, !Boolean(can_be_cancelable), !Boolean(especially_dont_force), Date.now(),"page_pixel").catch(() => {return this._request_force_update(can_be_cancelable, especially_dont_force)});
    };


    _set_fps_and_xy_elements = () => {
        "use strict";
        setTimeout(() => {
            if(!this.st4te._less_than_1280w){
                this.setSt4te({_fps_el: document.getElementById("fps_el") || {}, _xy_el: document.getElementById("xy_el") || {}});
            }else {
                this.setSt4te({_fps_el: {}, _xy_el: {}});
            }
        }, 1000);
    };

    _prevent_ctrl_zoom = (e) => {
        "use strict";
        if (e.ctrlKey) {
            e.preventDefault();
        }
    }

    _set_saved_at_element = () => {

        if(!Boolean(this.st4te._saved_at_el)) {

            this.setSt4te({_saved_at_el: document.getElementById("saved_at")}, () => {

                let _saved_at_interval = setInterval(() => {

                    this.st4te._saved_at_el.innerText = t(this.st4te._saved_at||Date.now(), {mini: true});
                }, 1000);

                this.setSt4te({_saved_at_interval});
            });
        }
    };

    componentWillReceiveProps(new_props) {

        if(new_props.load_with !== this.st4te.load_with) {

            this.setSt4te({_settings: JOYSON.unpack(new_props.settings), ...new_props}, ()  => {

                this._compute_menu_drawer();
                this._request_force_update().then(() => {

                    this._try_load_with_payload(this.st4te.load_with);
                });
            });
        }else {
            this.setSt4te({_settings: JOYSON.unpack(new_props.settings), ...new_props});
        }
    }

    _try_load_with_payload = (load_with) => {

            if(load_with.length === 0) {
                api.get_settings(this._process_settings_info_result);
                setTimeout(() => {
                    this.setSt4te({_is_pixel_dialog_create_open: Boolean(load_with.length === 0)}, () => { this._compute_menu_drawer(); this._request_force_update(); });
                }, 725);
            }else {

                const is_type_png = Boolean(load_with.startsWith("data:image/png;base64,")); //image/png
                const mimetype = is_type_png ? "image/png": "image/jpeg";

                const { _import_size } = this.st4te;

                this._handle_load("image_preload");
                base64_to_bitmap(load_with, (bitmap_input) => {

                    actions.trigger_voice("data_upload");

                    const max_original_size = this.st4te.is_mobile_or_tablet ? Math.sqrt(1280 * 720): Math.sqrt(1920 * 1080);
                    const max_size = this.st4te.is_mobile_or_tablet ? Math.sqrt(512 * 512): Math.sqrt(512 * 512);
                    let min_size = this.st4te.is_mobile_or_tablet ? 512: 1024;
                    const resize_original_to = parseInt(max_original_size * max_original_size);
                    const resize_to_before = Math.min(parseInt(max_size * max_size), Math.max(parseInt(_import_size * _import_size), parseInt(min_size * min_size)));
                    const resize_to_finally = Math.min(parseInt(max_size * max_size), parseInt(_import_size * _import_size));

                    bitmap_to_imagedata(bitmap_input, resize_original_to, (imagedata) => {

                        JSLoader( () => import("../utils/quantimat/QuantiMat")).then(({QuantiMatGlobal}) => {

                                imagedata_to_base64(imagedata, mimetype, (base64_resized) => {

                                    base64_to_bitmap(base64_resized, (bitmap) => {

                                        bitmap_to_imagedata(bitmap, resize_to_before, (imagedata_received) => {

                                            QuantiMatGlobal(imagedata_received, 256, 3).then(([imagedata2, a, b, color_removed_n, resulting_color_n, time_ms]) => {

                                                if(imagedata2 === null) {

                                                    window.dispatchEvent(new Event("art-upload-browsererror"));
                                                    this._handle_load_complete("image_preload", {});
                                                    this._handle_load("browser");
                                                    actions.trigger_sfx("alert_high-intensity", 0.6);
                                                    actions.jamy_update("flirty");
                                                    actions.trigger_snackbar("That's our end my little buddy! My instinctive dwelling require a browser I am supporting.", 6000);

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

                                                    setTimeout(function (){
                                                        actions.trigger_snackbar(`I am really awesome, within ${parseFloat(time_ms/1000).toFixed(3)}sec. I've made disappears ${color_removed_n} colors, now there are ${resulting_color_n} colors!`, 5700);
                                                        setTimeout(function (){actions.jamy_update("happy");}, 2000);
                                                    }, 15000);

                                                    imagedata_to_base64(imagedata2, "image/png", (base64) => {

                                                        base64_to_bitmap(base64, (bitmap_received) => {

                                                            bitmap_to_imagedata(bitmap_received, resize_to_finally, (imagedata_received_2) => {

                                                                imagedata_to_base64(imagedata_received_2, "image/png",(base64_final) => {

                                                                    let img = new Image();
                                                                    img.addEventListener("load", () => {

                                                                        this._handle_load_complete("image_preload", {});
                                                                        this.setSt4te({_kb: 0, _saved_at: 1/0});
                                                                        this.st4te._canvas.set_canvas_from_image(img, base64_resized, {}, false);
                                                                    }, {once: true, capture: true});
                                                                    img.src = base64_final;
                                                                });
                                                            });
                                                        });
                                                    }, pool);
                                                }
                                            }, pool);
                                        });
                                    }, pool);
                                }, pool);


                        }).catch((e) => {

                            this._handle_load_complete("image_preload", {});
                            actions.trigger_snackbar("Be sure to have a recent browser or install Google Chrome for using it.", 5700);
                            actions.jamy_update("angry");

                        });

                    });

                }, pool);
            }

    };

    _handle_events(event) {

        // Make different actions send from a dispatcher bounded to this function
        if(event.type === "TRIGGER_CANVAS_ACTION") {
            switch(event.data.name.toUpperCase()) {

                case "CONTRAST":
                    this._to_auto_medium_more_contrast();
                    break;
                case "SATURATION":
                    this._to_auto_medium_more_saturation();
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

    _handle_canvas_state_will_export = () => {

        actions.trigger_loading_update(0);
        actions.jamy_update("suspicious");
        actions.trigger_snackbar("Ok buddy! Saving yours.", 1500);

        window.onbeforeunload = function(e) {
            return 'Your content that was being saved will be lost.';
        };
    };

    _handle_canvas_state_exported = (current_state) => {

        actions.trigger_loading_update(75);
        actions.jamy_update("flirty");
        actions.trigger_snackbar("Hold on! Compressing...", 1000);
        if(current_state.kb > 0.5) {

            let attachment_array = {};
            attachment_array["json_state-ID" + current_state.id + ".json.lz"] = current_state;

            this.setSt4te({_kb: current_state.kb, _saved_at: Date.now()}, () => {
                this._compute_menu_drawer();
                this._request_force_update();
                api.set_settings({}, (err, res) => {

                    if(err) {
                        actions.trigger_loading_update(100);
                        actions.trigger_snackbar("Looks like I can't save your file as our compression module can't load.", 5700);
                        actions.jamy_update("angry");
                    }
                }, attachment_array, UJS, pool, (err, res) => {

                    actions.trigger_loading_update(100);
                    if(!err) {

                        window.onbeforeunload = function(e) {};
                        setTimeout(() => {
                            setTimeout(() => {
                                actions.jamy_update("happy");
                            }, 500);
                            actions.trigger_snackbar("Success! Laboratory's artwork saved!", 2000);
                        }, 1000);

                    }else {

                        window.onbeforeunload = function(e) {};
                        actions.trigger_snackbar("Laboratory artwork failed to save.", 2000);
                        actions.jamy_update("sad");
                    }
                });
            });
        }else {

            actions.trigger_loading_update(100);
            window.onbeforeunload = function(e) {};
            setTimeout(() => {
                actions.trigger_snackbar("Huh, we don't store nearly empty file up here, buddy.", 2000);
            }, 2000);
        }
    };

    _handle_import_json_state_id = (id) => {

        JSLoader( () => import("../utils/ujs")).then(({UJS}) => {

            this._handle_load("image_preload");
            actions.trigger_voice("accessing_memory");
            api.get_settings(() => {}, ["json_state-ID" + id + ".json.lz"], this._process_settings_attachment_result, UJS, pool);
        }).catch(() => {

            actions.trigger_snackbar("Looks like I can't get your file as our compression module can't load.", 5700);
            actions.jamy_update("angry");
        });
    };

    _delete_unsaved_pixel_art = (id) => {

        const attachments = {};
        attachments["json_state-ID" + id + ".json.lz"] = "delete";

        api.set_settings({}, this._process_settings_info_result, attachments, null, null, (err, res) => {

            if(!err) {

                actions.trigger_snackbar("DELETION, Successful!", 2000);
                actions.trigger_sfx("alert_high-intensity");
                let ap = Object.assign({}, this.st4te._attachment_previews);
                delete ap["json_state-ID" + id + ".json.lz"];
                this.setSt4te({_attachment_previews: ap}, () => {
                    this._request_force_update();
                });
            }else {

                actions.trigger_snackbar("DELETION, Failed!", 2000);
            }

        });
    };

    _updated_dimensions = () => {
        "use strict";
        let documentElement = document.documentElement,
            body = document.body || document.getElementsByTagName('body')[0],
            _window_width = window.innerWidth || documentElement.clientWidth || body.clientWidth,
            _window_height = window.innerHeight|| documentElement.clientHeight || body.clientHeight;

        const _less_than_1280w = Boolean(_window_width < 1280);
        this.setSt4te({_less_than_1280w}, () => {
            this._compute_menu_drawer();
            this._compute_menu_drawer();
            this._request_force_update(false, false).then(() => {
                this._set_fps_and_xy_elements();
            });
        })
    }

    componentWillUnmount() {

        this._backup_state();
        actions.stop_sound();
        window.removeEventListener("resize", this._updated_dimensions);
        window.removeEventListener('wheel', this._prevent_ctrl_zoom);
        try {
            document.getElementById("tabs-desktop").removeEventListener("wheel", this._handle_wheel, {passive: false});
        } catch (e){}
        document.removeEventListener("keydown", this._handle_keydown);
        document.removeEventListener("keyup", this._handle_keyup);
        clearInterval(this.st4te._saved_at_interval);
    }

    _handle_wheel = (params) => {
        "use strict";
        const deltaY = params.deltaY;
        if((this.st4te._handle_wheel_timestamp + 150) < Date.now()) {
            let switch_of = deltaY === 0 ? 0: deltaY > 0 ? 1: -1;
            let vni = this.st4te._view_name_index+switch_of|0;
            if(vni < 0){
                vni = this.st4te._view_name_index = this.st4te._view_names.length-1|0;
            }else {
                vni = vni % (this.st4te._view_names.length + 1 | 0);
            }
            this._handle_view_name_change(vni, this.st4te._view_name_index, () => {
                this.setSt4te({
                    _handle_wheel_timestamp: Date.now()
                });
            });
        }
    };

    _handle_menu_close = () => {

        this.setSt4te({_menu_mouse_x: null, _menu_mouse_y: null}, () => {

            this._compute_menu_right_click();
            this._request_force_update();
        });
    };

    _handle_right_click = (event, data) => {

        data.pxl_color = this.st4te._canvas.get_pixel_color_from_pos(data.pos_x, data.pos_y);

        this.setSt4te({
            _menu_mouse_x: event.clientX - 2,
            _menu_mouse_y: event.clientY - 4,
            _menu_data: data,
            _menu_event: event,
        }, () => {

            this._compute_menu_right_click();
            this._request_force_update();
        });
    };

    _set_cursor_fuck_you = (is_active) => {

        /*this.setSt4te({_is_cursor_fuck_you_active: is_active}, () => {

            this.forceUpdate();
        });*/
        actions.jamy_update("happy", 2500);
    }


    _process_settings_info_result = (error, settings) => {

        if(!error && typeof settings !== "undefined") {

            // Set new settings from query result
            const _attachment_previews = typeof settings.attachment_previews !== "undefined" ? settings.attachment_previews: {};

            this.setSt4te({_attachment_previews}, () => {

                this._request_force_update();
            });
        }
    };

    _process_settings_attachment_result = (error, data) => {

        const { import_JS_state } = this.st4te._canvas;
        this._handle_load_complete("image_preload", {});

        if(Boolean(error)) {

            actions.trigger_snackbar("Looks like I can't get your file as something was erroneous.", 5700);
            actions.jamy_update("angry");
            this._handle_pixel_dialog_create_open();

        }else {

            this.setSt4te({_kb: data.kb, _saved_at: Date.now()}, () => {

                this._request_force_update();
            });

            import_JS_state(data, () => {

                this.setSt4te({ _is_pixel_dialog_create_open: false, _attachment_previews: {}}, () => {

                    this._request_force_update();
                });
            });
        }
    };

    _handle_view_name_change = (view_name_index, previous_name_index = null, callback = function(){}) => {

        const { _view_names, _toolbox_container_ref } = this.st4te;
        previous_name_index = previous_name_index === null ? this.st4te._view_name_index: previous_name_index;

        const _view_name = _view_names[view_name_index] || _view_names[0];
        const _view_name_index = _view_names.indexOf(_view_name) === -1 ? 0: _view_names.indexOf(_view_name);

        if(previous_name_index > _view_name_index) {

            actions.trigger_sfx("navigation_transition-left");
        }else if(previous_name_index < _view_name_index){

            actions.trigger_sfx("navigation_transition-right");
        }

        let props = {};
        props._view_name_sub_index = 0;
        _toolbox_container_ref.scrollTop = 0;

        this.setSt4te({...props, _previous_view_name_index: previous_name_index || this.st4te._view_name_index, _view_name_index}, () => {

            this._set_props_bypass_this();
            this._compute_menu_drawer();
            this._request_force_update();
            callback();
        });
    }

    _handle_view_name_switch = (event, view_name_index,  previous_name_index = null) => {

        if(event.pointerType === "mouse" && event.button === 0 || event.pointerType !== "mouse") {

            const { _view_names, _toolbox_container_ref } = this.st4te;
            previous_name_index = previous_name_index === null ? this.st4te._view_name_index: previous_name_index;

            const _view_name = _view_names[view_name_index] || _view_names[0];
            const _view_name_index = _view_names.indexOf(_view_name) === -1 ? 0: _view_names.indexOf(_view_name);

            if(previous_name_index > _view_name_index) {

                actions.trigger_sfx("navigation_transition-left");
            }else {

                actions.trigger_sfx("navigation_transition-right");
            }

            let props = {};
            if(previous_name_index !== _view_name_index) {

                props._view_name_sub_index = 0;
                _toolbox_container_ref.scrollTop = 0;
            }

            this.setSt4te({...props, _previous_view_name_index: previous_name_index || this.st4te._view_name_index, _view_name_index}, () => {
                this._set_props_bypass_this();
                this._compute_menu_drawer();
                this._request_force_update();
            });
        }
    };

    _handle_keydown = (event) => {
        if(event.ctrlKey){
            if(!document.getElementsByClassName("MuiInput-root Mui-focused").length) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }else if(!event.key === "c" && !event.key === "v"){
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }

        const { _tool, _view_name_index, _view_names, _is_pixel_dialog_post_edit_open,  } = this.st4te;

        if (event && !_is_pixel_dialog_post_edit_open) {

            if(_tool === "MINE"){

                switch (event.keyCode) {

                    case 38:
                        this.setSt4te({_mine_player_direction: "UP"});
                        break;
                    case 40:
                        this.setSt4te({_mine_player_direction: "DOWN"});
                        break;
                    case 37:
                        this.setSt4te({_mine_player_direction: "LEFT"});
                        break;
                    case 39:
                        this.setSt4te({_mine_player_direction: "RIGHT"});
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
                    case 38:
                        this._scroll_to_drawer(-1);
                        break;
                    case 40:
                        this._scroll_to_drawer(1);
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

                this._undo();
            }else if(event.ctrlKey && event.key === "y") {

                this._redo();
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

                const { confirm_import } = this.st4te._canvas;
                confirm_import();
            }else if(event.ctrlKey) {

                if(_tool.includes("SELECT")) {

                    this.setSt4te({_previous_tool_timestamp: Date.now()});
                    this._set_select_mode("REMOVE");
                }else {

                    this.setSt4te({_previous_tool_timestamp: Date.now()});
                    this._set_tool("PICKER", false);
                }
            }else if(event.key === "Shift") {

                if(_tool.includes("SELECT")) {

                    this.setSt4te({_previous_tool_timestamp: Date.now()});
                    this._set_select_mode("ADD");
                }else {

                    this.setSt4te({_previous_tool_timestamp: Date.now()});
                    this._set_tool("MOVE", false);
                }
            }else {

            }

        }
    };

    _undo = () => {

        if((Math.random()*100|0) > 90) {

            actions.trigger_snackbar("That was a nice undo!")
        }

        this.st4te._canvas.undo()
    }
    _redo = () => {

        if((Math.random()*100|0) > 95) {

            actions.jamy_update("suspicious");
            actions.trigger_snackbar("Even nicer redo! Doo,doo,doo...", 2500);

            setTimeout(() =>  {

                actions.jamy_update("annoyed");
                actions.trigger_snackbar("Did I already said that today? I won't feel much smarter today.", 3500);

                setTimeout(() =>  {

                    actions.jamy_update("shocked");
                    actions.trigger_snackbar("No, huh!? I have feelings.", 2500);

                    setTimeout(() =>  {

                        actions.jamy_update("flirty");
                        actions.trigger_snackbar("I am a real booooy! Yuhhh!");

                    }, 3000);

                }, 4000);

            }, 3000);
        }

        this.st4te._canvas.redo()
    }

    _set_png_compressors = () => {
        const { set_png_compressors } = this.st4te._canvas;
        return new Promise((resolve, reject) => {
            JSLoader( () => import("../utils/png_quant")).then(({png_quant}) => {
                set_png_compressors(png_quant);
                resolve();
            });
        });
    };

    _backup_state = () => {
        const { export_state, set_png_compressors } = this.st4te._canvas;
        JSLoader( () => import("../utils/png_quant")).then(({png_quant}) => {
            set_png_compressors(png_quant);
            export_state();
        });
    };

    _download_image = (size) => {

        window.dispatchEvent(new Event(`art-download-raster${size}`));
        JSLoader( () => import("../utils/png_quant")).then(({png_quant}) => {
            const { get_base64_png_data_url, set_png_compressors } = this.st4te._canvas;
            if(typeof get_base64_png_data_url != "undefined" && typeof set_png_compressors != "undefined"){
                set_png_compressors(png_quant);
                get_base64_png_data_url(size, false, 1, 100, 100).then(({hash, url}) => {
                    let a = document.createElement("a"); //Create <a>
                    a.download = `PIXA-${hash}-PIXELATED-${size}x_RAS.png`; //File name Here
                    a.href = url;
                    a.click();
                    a.remove();
                    this._propose_selling_nft();
                });
            }
        });
    };

    _download_svg = (using = "xbrz", optimize_render_size = false, download_svg = false, download_crt = false, photo = false) => {

        const { get_base64_png_data_url, set_png_compressors, xxhashthat } = this.st4te._canvas;

        window.dispatchEvent(new Event(`art-download-vector${using.toLowerCase()}`));

        actions.trigger_voice("please_wait");
        actions.trigger_snackbar("Please wait... Files will download in a few seconds.", 5700);
        actions.jamy_update("happy");

        this.setSt4te({_loading: true, _loading_process: "image_render"}, () => {
            JSLoader( () => import("../utils/png_quant")).then(({png_quant}) => {
                JSLoader( () => import("../utils/oxi_png")).then(({oxi_png}) => {
                    set_png_compressors(png_quant, oxi_png);
                    get_base64_png_data_url(1, true, 1, 100, 100).then(({url, colors}) => {

                        const hash = xxhashthat(url);

                        let { _files_waiting_download } = this.st4te;
                        _files_waiting_download.push({
                            name: `PIXA-${hash}-PIXELATED-1x_RAS.png`,
                            url: url
                        });
                        this.setSt4te({_files_waiting_download}, () => {

                            this._request_force_update();
                        });

                        actions.trigger_voice("processing");
                        base64png_to_xbrz_svg(url, (image_base64, size, width, height) => {

                            let {_files_waiting_download} = this.st4te;
                            _files_waiting_download.push({
                                name: `PIXA-${hash}-${using.toUpperCase()}-${size}x_RAS.png`,
                                url: "" + image_base64
                            });
                            this.setSt4te({_files_waiting_download}, () => {

                                this._request_force_update();

                                if (photo) {

                                    postJSON("https://real-life-image.pixa-pics.workers.dev/init", "" + image_base64, (err, rr1) => {

                                        if (rr1) {
                                            postJSON("https://real-life-image.pixa-pics.workers.dev/get", ""+rr1, (err, rr2) => {

                                                if (rr2) {

                                                    rr2.split(" ").forEach((res) => {
                                                        fetch(res).then((resp) => {

                                                            resp.blob().then((blob, num) => {

                                                                new Promise(function (resolve, _) {
                                                                    var reader = new FileReader();
                                                                    reader.onload = function () {
                                                                        resolve(reader.result)
                                                                    };
                                                                    reader.onerror = function () {
                                                                        var u = URL.createObjectURL(blob);
                                                                        resolve(u);
                                                                    };
                                                                    reader.readAsDataURL(blob);
                                                                }).then((base64) => {

                                                                    _files_waiting_download.push({
                                                                        name: `PIXA-${hash}-${"PHOTO-REAL"}-${"BIG"}+AI_RAS-#${num}.jpg`,
                                                                        url: "" + base64
                                                                    });

                                                                    this.setSt4te({_files_waiting_download}, this._request_force_update);
                                                                });
                                                            });
                                                        });
                                                    });
                                                }
                                            }, "application/text")
                                        }
                                    }, "application/text")
                                } else {

                                    actions.trigger_snackbar("Looks like we had an unexpected issue", 5700);
                                    actions.jamy_update("angry");
                                }
                            });
                        }, (svg_base64, size) => {

                            if(svg_base64.length > 0) {

                                let { _files_waiting_download } = this.st4te;
                                _files_waiting_download.push({
                                    name: `PIXA-${hash}-${using.toUpperCase()}-${size}x_VEC.svg`,
                                    url: svg_base64
                                });
                                this.setSt4te({_files_waiting_download}, () => {

                                    this._request_force_update();
                                });
                            }

                            this.setSt4te({_loading: false, _loading_process: ""}, () => {

                                this._propose_selling_nft();

                            });

                        }, (crt_base64, size) => {

                            if(crt_base64.length > 0) {

                                let { _files_waiting_download } = this.st4te;
                                _files_waiting_download.push({
                                    name: `PIXA-${hash}-${using.toUpperCase()}-${size}+CRT.png`,
                                    url: crt_base64
                                });
                                this.setSt4te({_files_waiting_download}, () => {

                                    this._request_force_update();
                                });
                            }

                        }, Array.from(colors), using, Boolean(optimize_render_size), Boolean(download_svg), Boolean(download_crt));
                    })
                })
            });
        });
    };

    _propose_selling_nft = () => {

        actions.trigger_voice("complete");
        actions.trigger_sfx("hero_decorative-celebration-02");
        actions.trigger_snackbar("Fantastic!", 1500);

        setTimeout(() => {

            actions.trigger_share();
            window.dispatchEvent(new Event("home-action-tryshare"));

            setTimeout(() => {

                actions.trigger_sfx("alert_high-intensity");
                actions.trigger_snackbar("Your unique and stunning pixel art can now be turned into a valuable digital asset through the power of blockchain technology.", 7000);
                setTimeout(() => {

                    actions.trigger_sfx("hero_decorative-celebration-02");
                    actions.trigger_snackbar("Sell your pixel art as an NFT on your favourite platform and become a part of the growing NFT community.", 9000);
                }, 8000);

            }, 2000);

        }, 2000);
    };

    _continue_download = () => {

        let { _files_waiting_download } = this.st4te;

        if(_files_waiting_download.length > 0) {

            let file = _files_waiting_download.shift();

            let a = document.createElement("a"); //Create <a>
            a.download = ""+file.name; //File name Here
            a.href = ""+file.url;
            a.click();
            delete file.url;
            delete file.name;
            a.remove();

            this.setSt4te({_files_waiting_download}, () => {

                this._request_force_update();
            });
        }
    };

    _handle_keyup = (event) => {

        if(event.ctrlKey){
            if(!document.getElementsByClassName("MuiInput-root Mui-focused").length) {
                event.preventDefault();
                event.stopImmediatePropagation();
            }else if(!event.key === "c" && !event.key === "v"){
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }

        const { _is_pixel_dialog_post_edit_open } = this.st4te;

        if (event && !_is_pixel_dialog_post_edit_open) {

            const { _tool, _memory_tool, _previous_tool_timestamp } = this.st4te;

            if(_memory_tool && _memory_tool !== _tool && Date.now() - 10 * 1000 < _previous_tool_timestamp) {

                this.setSt4te({_previous_tool_timestamp: 1/0});
                this._set_tool(_memory_tool);

            }else if(_previous_tool_timestamp < Date.now() && _tool.includes("SELECT")) {

                this.setSt4te({_previous_tool_timestamp: 1/0});
                this._set_select_mode("REPLACE");
            }
        }
    }

    _upload_image = (event) => {
        this._handle_file_upload(event);
    };

    _upload_image_library = () => {

        this.setSt4te({_library_dialog_open: true, _library_type: "open"}, () => {

            this._request_force_update();
        });
    };

    _close_library = () => {

        this.setSt4te({_library_dialog_open: false}, () => {

            this._request_force_update();
        });
    };

    _from_library = (base64) => {

        const { _library_type } = this.st4te;
        const { set_canvas_from_image, import_image_on_canvas } = this.st4te._canvas;
        let img = new Image;
        img.src = base64;

        img.onload = () => {

            if(_library_type === "open") {

                this.setSt4te({_kb: 0, _saved_at: 1/0}, () => {

                    this._request_force_update();
                });
                set_canvas_from_image(img);
            }else if(_library_type === "import"){

                import_image_on_canvas(img, base64);
            }

            this._close_library();
        };
    };
    _handle_file_upload = async(event) => {

        if("dataTransfer" in event) {
            if(event.dataTransfer.files.length > 0) {
                event.preventDefault();
                event.stopPropagation();
            }
        }

        if(this.st4te._drag_file) {
            this.setSt4te({_drag_file: 0}, () => {
                this._request_force_update();
            });
        }

        const files = (event.target || {}).files || (event.srcElement || {}).files || (event.currentTarget || {}).files || ((event.path || [])[0] || {}).files || (event.dataTransfer || {}).files || [];
        const dumb_file = files[0] || null;
        let smart_file = null;
        for (let i = 0; i < files.length; i++) {
            smart_file = files[i];
            if(smart_file.type.startsWith('image/')) {
                i = files.length;
            }
        }

        const floranceCaptionerAPI = new FloranceCaptionerAPI(actions.trigger_snackbar);
        const longCaptionerAPI = new LongCaptionerAPI(actions.trigger_snackbar);
        const faceToAllAPI = new FaceToAllAPI(actions.trigger_snackbar);
        const faceToAllAPI2 = new FaceToAllAPI2(actions.trigger_snackbar);
        const faceToAllAPI3 = new FaceToAllAPI3(actions.trigger_snackbar);

        if (smart_file === null && dumb_file === null) {
            actions.trigger_snackbar("Looks like I can't get your file as something is erroneous.", 5700);
            actions.jamy_update("angry");
        } else if (smart_file !== null) {
            const is_type_png = Boolean(smart_file.type === "image/png"); //image/png
            const mimetype = is_type_png ? "image/png" : smart_file.type;

            const { _import_colorize, _import_size } = this.st4te;
            const { set_canvas_from_image } = this.st4te._canvas;

            const max_original_size = this.st4te.is_mobile_or_tablet ? Math.sqrt(540 * 720) : Math.sqrt(720 * 1080);
            const max_size = this.st4te.is_mobile_or_tablet ? Math.sqrt(512 * 512) : Math.sqrt(512 * 512);
            let min_size = this.st4te.is_mobile_or_tablet ? 512 : 1024;
            const resize_original_to = parseInt(max_original_size * max_original_size);
            const resize_to_before = Math.min(parseInt(max_size * max_size), Math.max(parseInt(_import_size * _import_size), parseInt(min_size * min_size)));
            const resize_to_finally = Math.min(parseInt(max_size * max_size), parseInt(_import_size * _import_size));
            let scale = 1.0;

             const loadImage = async(file) => {
                this._handle_load("image_preload");
                actions.trigger_voice("data_upload");
                file_to_imagedata_resized(file, resize_original_to, (imagedata) => {
                    imagedata_to_base64(imagedata, mimetype, (base64_resized) => {
                        while ((Math.round(imagedata.width * scale) * Math.round(imagedata.height * scale)) > resize_to_finally) { scale -= 0.01; }
                        base64_sanitize(base64_resized, (b64b) => {
                            base64_to_bitmap(b64b, (imgbmp) => {
                                bitmap_to_imagedata(imgbmp, imgbmp.width * imgbmp.height | 0, (imagedata2) => {
                                    imagedata_to_base64(imagedata2, "image/png", (base64) => {
                                        let img = new Image();
                                        img.addEventListener("load", () => {
                                            this._handle_load_complete("image_preload", {});
                                            this.setSt4te({ _kb: 0, _saved_at: 1 / 0 });
                                            set_canvas_from_image(img, base64_resized, {}, false);
                                            setTimeout(function () {
                                                actions.trigger_snackbar(`I am really awesome, here is your pixel art!`, 5700);
                                                setTimeout(function () {
                                                    actions.jamy_update("happy");
                                                }, 2000);
                                            }, 1000);
                                        }, { once: true, capture: true });
                                        img.src = base64;
                                    }, pool);
                                }, pool);
                            }, pool);
                        }, null, scale, "pixelize");
                    }, pool);
                }, pool);
            }

            if (parseInt(_import_colorize) === 0) {

                loadImage(smart_file).then(() => {

                });
            } else {
                const that = this;
                async function processImage(file) {
                    actions.jamy_update("angry");
                    actions.trigger_voice("processing");
                    actions.trigger_loading_update(10);

                    actions.jamy_update("annoyed", 8000);
                    actions.trigger_loading_update(20);
                    setTimeout(() => {
                        actions.jamy_update("annoyed", 8000);
                        actions.trigger_loading_update(20);
                    }, 5000);


                    const prompt = await floranceCaptionerAPI.run(file, 1).catch(() => {
                        return longCaptionerAPI.run(file);
                    });

                    actions.trigger_snackbar("IMAGE: " + prompt, 5000);

                    const success = (blob) => {
                        actions.jamy_update("flirty", 666);
                        actions.trigger_loading_update(100);
                        actions.trigger_snackbar("Receiving results (3 sec)");

                        actions.jamy_update("happy", 666);
                        actions.trigger_sfx("alert_high-intensity", 1, "md");
                        actions.trigger_loading_update(0);
                        actions.trigger_snackbar("AI Processing [OK]");
                        that._handle_load_complete("image_ai", {});
                        that._handle_load("image_preload");
                        return Promise.resolve(blob);
                    };

                    const failed = (file) => {
                        actions.trigger_loading_update(0);
                        actions.trigger_snackbar("AI PROCESSING FAILED! Fallback to normal mode.");
                        that._handle_load_complete("image_ai", {});
                        that._handle_load("image_preload");
                        return Promise.resolve(file);
                    };

                    return faceToAllAPI.run(file, prompt).then((blob) => {
                        success(blob);
                    }).catch(() => {
                        return faceToAllAPI2.run(file, prompt).then((blob) => {
                            success(blob);
                        }).catch(() => {
                            return faceToAllAPI3.run(file, prompt).then((blob) => {
                                success(blob);
                            }).catch(() => {
                                failed(file);
                            });
                        });
                    });

                }

                this._handle_load("image_ai");
                processImage(smart_file).then((blob) => {
                    loadImage(blob);
                })

            }
        }
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
        }

        if(smart_file !== null) {

            let img = new Image();
            const { import_image_on_canvas } = this.st4te._canvas;

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

        this.setSt4te({_library_dialog_open: true, _library_type: "import"}, () => {

            this._request_force_update();
        });
    };

    _handle_load = (process) => {

        actions.trigger_loading_update(0);
        this.setSt4te({_loading: true, _loading_process: process}, () => {

            this._request_force_update();
        });

        if(process === "image_preload"){

            this._handle_edit_drawer_close();
            this._handle_menu_close();
            this._handle_pixel_dialog_create_close();
        }
    };

    _handle_load_complete = (process, data) => {

        actions.trigger_loading_update(100);
        this.setSt4te({_loading: false, _loading_process: process}, () => {
            this._request_force_update().then(() => {
                if(this.st4te._saved_at > Date.now()-60){
                    this._backup_state();
                }
                this._updated_dimensions();
            });
        });

        if(process === "less_color" || process === "less_color_auto") {

            if(data.colors_removed !== 0) {

                actions.trigger_snackbar(`I am a magician! And ${data.colors_removed} colors are now gone, only ${data.colors_remaining} remaining.`);
                actions.trigger_sfx("navigation_selection-complete-celebration");
                actions.jamy_update("happy");
            }
        }else if(process === "image_load"){

            if(data.only_scan) {

                actions.trigger_sfx("ui_scan");
            }else {
                actions.trigger_sfx("ui_scan");
                actions.trigger_snackbar(`DONE! We've imported an image with my now ${data.number_of_colors} colors.`);
                setTimeout(() => {

                    actions.trigger_voice("complete");
                }, 1000);
                actions.jamy_update("happy");
                this._handle_edit_drawer_close();
                this._handle_menu_close();
                this._handle_pixel_dialog_create_close();
            }
        }
    };

    _set_ripple_ref = (element) => {

        if(typeof element === "undefined") {return}
        if(element === null) {return}
        this.setSt4te({_ripple: element});
    };

    _set_canvas_ref = (element) => {

        if(typeof element === "undefined") {return}
        if(element === null) {return}
        this.setSt4te({_canvas: element, _filters: element.get_filter_names()}, ( )=> {

            this._request_force_update();
        });
    };

    _handle_position_change = (position) => {
        "use strict";
        if(typeof this.st4te._xy_el != "undefined"){
            let x = position.x === -1 ? "out": position.x + 1;
            let y = position.y === -1 ? "out": position.y + 1;
            this.st4te._xy_el.textContent = ` | X: ${x}, Y: ${y} `;
        }
    };

    _handle_fps_change = (fps) => {
        "use strict";
        if(typeof this.st4te._fps_el != "undefined"){
            this.st4te._fps_el.textContent = `FPS: ${fps}`;
        }
    };

    _handle_can_undo_redo_change = (_can_undo, _can_redo) => {
        "use strict";
        _can_undo = parseInt(_can_undo);
        _can_redo = parseInt(_can_redo);
        const update = Boolean(this.st4te._can_undo !== _can_undo || this.st4te._can_redo !== _can_redo);
        this.setSt4te({_can_undo, _can_redo}, () => {

            if(update){this._request_force_update();}
        })
    }

    _handle_size_change = (_width, _height) => {

        const update = Boolean(this.st4te._width !== _width || this.st4te._height !== _height);
        this.setSt4te({_width, _height}, () => {

            if(update){this._compute_menu_drawer(); this._request_force_update();}
        });
    }

    _handle_current_color_change = (color, event) => {
        "use strict";
        if(typeof color.rgb !== "undefined") {

            color = Color.new_of(color.rgb.r, color.rgb.g, color.rgb.b, Math.round(parseInt(color.rgb.a * 255))).hex;
        }else {

            color = Color.new_hex(color).hex;
        }

        const h = Color.new_hex(color).hsla[0];

        this.setSt4te({_current_color: color, _hue: h});
    };

    _handle_relevant_action_event = (event, color = "#ffffff", opacity = 0) => {

        const _ripple = this.st4te._ripple;

        if(Boolean(event) && Boolean(_ripple)) {

            actions.trigger_sfx("navigation_selection-complete-celebration");

            if(opacity !== 0) {

                this.setSt4te({_ripple_color: color, _ripple_opacity: opacity}, function () {
                    setTimeout(function(){
                        _ripple.start(event);
                    }, 25);
                    setTimeout(function(){
                        _ripple.stop(event);
                    }, 175+25);
                });
            }
        }
    };

    _handle_something_selected_change = (_is_something_selected) => {

        const update = Boolean(this.st4te._is_something_selected !== _is_something_selected);
        this.setSt4te({_is_something_selected}, () => {

            if(update){this._compute_menu_right_click(); this._request_force_update();}
        });
    };

    _set_value_from_slider_with_update = (event, value) => {

        this.setSt4te({_slider_value: value || event.target.value}, () => {

            this._set_props_bypass_this();
        });
    };

    _set_width_from_slider = (event, value) => {

        this.setSt4te({_slider_value_width: value || event.target.value}, () => {

            this._set_props_bypass_this();
        });
    };

    _set_height_from_slider = (event, value) => {

        this.setSt4te({_slider_value_height: value || event.target.value}, () => {

            this._set_props_bypass_this();
        });
    };

    _set_import_size = (event, value) => {

        this.setSt4te({_import_size: value || event.target.value});
    };

    _set_import_colorize = (event, value) => {

        this.setSt4te({_import_colorize: value || event.target.value});
    };

    _revert_tool = () => {

        this.setSt4te({_tool: this.st4te._memory_tool});
    };

    _set_tool = (name, remember = true) => {

        this.setSt4te({_tool: name.toUpperCase()}, () => {

            this._set_props_bypass_this();
        });

        if(remember) {

            this.setSt4te({_memory_tool: name.toUpperCase()});
        }
    }

    _set_select_mode = (mode) => {

        this.setSt4te({_select_mode: mode.toUpperCase()}, () => {

            this._set_props_bypass_this();
        });
    }

    _set_pencil_mirror_mode = (mode) => {

        this.setSt4te({_pencil_mirror_mode: mode.toUpperCase()}, () => {

            this._set_props_bypass_this();
        });
    }

    _switch_with_second_color = () => {

        const {_current_color, _second_color } = this.st4te;
        this.setSt4te({_current_color: _second_color, _second_color: _current_color}, () => {

            this._set_props_bypass_this();
        });
    };

    _show_hide_canvas_content = () => {

        this.setSt4te({_hide_canvas_content: !this.st4te._hide_canvas_content}, () => {

            this._set_props_bypass_this();
            this.forceUpdate();
        });
    }

    _show_hide_background_image = () => {

        this.setSt4te({_show_original_image_in_background: !this.st4te._show_original_image_in_background}, () => {

            this._set_props_bypass_this();
        });
    }

    _show_hide_transparent_image = () => {

        this.setSt4te({_show_transparent_image_in_background: !this.st4te._show_transparent_image_in_background}, () => {

            this._set_props_bypass_this();
        });
    }

    _handle_image_import_mode_change = (is_image_import_mode) => {

        this.setSt4te({_is_image_import_mode: is_image_import_mode}, () => {

            this._set_props_bypass_this();
            this._request_force_update();
        });
    };

    _handle_layers_change = (_layer_index, _layers) => {

        this.setSt4te({_previous_layer_index: parseInt(this.st4te._layer_index), _layer_index: parseInt(_layer_index), _layers: _layers}, () => {

            this._set_props_bypass_this();
        });
    };

    _handle_filters_thumbnail_change = (filters_thumbnail, last_filters_hash, filters_preview_progression) => {

        this.st4te._swipeable_drawer_handle_filters_thumbnail_change(filters_thumbnail, last_filters_hash, filters_preview_progression);
    };

    _set_filters_callback = (callback) => {

        this.setSt4te({_swipeable_drawer_handle_filters_thumbnail_change: callback});
    };

    _set_props_callback = (callback) => {

        this.setSt4te({_swipeable_drawer_set_props: callback}, () => {
            this._set_props_bypass_this();
            this._request_force_update();
        });
    };

    _set_props_bypass_this = () => {
        "use strict";
        const {
            _view_name_index,
            _previous_view_name_index,
            _layers,
            _layer_index,
            _hide_canvas_content,
            _show_original_image_in_background,
            _show_transparent_image_in_background,
            _hue,
            _current_color,
            _second_color,
            _slider_value,
            _tool,
            _width,
            _height,
            _filters,
            _select_mode,
            _pencil_mirror_mode,
            _is_something_selected,
            _is_image_import_mode,
            _import_size,
            _import_colorize,
            _slider_value_width,
            _slider_value_height
        } = this.st4te;

        if(this.st4te._canvas) {
            this.st4te._canvas._set_props({
                tool: _tool,
                hide_canvas_content: _hide_canvas_content,
                show_original_image_in_background: _show_original_image_in_background && true,
                show_transparent_image_in_background: _show_transparent_image_in_background,
                select_mode: _select_mode,
                pencil_mirror_mode: _pencil_mirror_mode,
                hue: _hue,
                bucket_threshold: _slider_value,
                color_loss: _slider_value,
                pxl_current_color: _current_color,
                default_size: _import_size,
                ideal_size: _import_size,
                max_size: _import_size * 1.5,
            });
        }
        this.st4te._swipeable_drawer_set_props({
            view_name_index: _view_name_index % 7,
            previous_view_name_index: _previous_view_name_index % 7,
            layers: _layers,
            layer_index: _layer_index,
            hide_canvas_content: _hide_canvas_content,
            show_original_image_in_background: _show_original_image_in_background,
            show_transparent_image_in_background: _show_transparent_image_in_background,
            hue: _hue,
            current_color: _current_color,
            second_color: _second_color,
            slider_value: parseFloat(_slider_value),
            slider_value_width: _slider_value_width,
            slider_value_height: _slider_value_height,
            tool: _tool,
            width: parseInt(_width),
            height: parseInt(_height),
            filters: _filters,
            select_mode: _select_mode,
            pencil_mirror_mode: _pencil_mirror_mode,
            is_something_selected: _is_something_selected,
            is_image_import_mode: _is_image_import_mode,
            import_size: _import_size,
            import_colorize: _import_colorize
        });
    };

    _handle_game_end = () => {

        this.setSt4te({_game_ended: true}, () => {

            setTimeout(() => {

                this.setSt4te({_game_ended: false});

            }, 5000);
        });
    };

    _handle_edit_drawer_open = (event, _view_name_index) => {

        _view_name_index = typeof _view_name_index !== "undefined" ? _view_name_index: this.st4te._view_name_index;
        const do_inner_view_next = Boolean(this.st4te._view_name_index === _view_name_index) && this.st4te._is_edit_drawer_open;
        const { _toolbox_container_ref } = this.st4te;

        let _is_edit_drawer_open = true;
        let _view_name_sub_index;
        if(do_inner_view_next && _toolbox_container_ref !== null) {

            _view_name_sub_index = this.st4te._view_name_sub_index || 0;

            const classname_of_panel = `swipetoolbox_i_${_view_name_index}_${_view_name_sub_index}`;
            const panel_element = (document.getElementsByClassName(classname_of_panel) || [])[0] || null;
            _view_name_sub_index++;

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

        const update = Boolean(this.st4te._is_edit_drawer_open !== _is_edit_drawer_open || this.st4te._view_name_index !== _view_name_index);
        this.setSt4te({_is_edit_drawer_open, _view_name_index, _view_name_sub_index}, () => {

            if(update){this._compute_menu_drawer(); this._request_force_update();}
        });
    };

    _handle_edit_drawer_close = () => {

        const update = Boolean(this.st4te._is_edit_drawer_open);
        this.setSt4te({_is_edit_drawer_open: false}, () => {

            if(update){this._compute_menu_drawer(); this._request_force_update();}
        });
    };

    _set_current_color = (_current_color) => {

        this._handle_menu_close();
        this.setSt4te({_current_color}, () => {

            this._set_props_bypass_this();
        });
    };

    _exchange_pixel_colors = (x, y, new_pixel_color) => {

        const { exchange_pixel_color } = this.st4te._canvas;
        let { _menu_data } = this.st4te;

        exchange_pixel_color(x, y, new_pixel_color);
        _menu_data.pxl_color = new_pixel_color;

        this._handle_menu_close();
        this.setSt4te({_menu_data});
    };

    _to_auto_medium_more_contrast = () => {

        const { auto_adjust_contrast } = this.st4te._canvas;
        auto_adjust_contrast(1/5);
        actions.trigger_voice("enhanced");
    };

    _to_auto_medium_more_saturation = () => {

        const { auto_adjust_saturation } = this.st4te._canvas;
        auto_adjust_saturation(1/5);
        actions.trigger_voice("enhanced");
    };

    _less_colors_auto = ( ) => {

        const { _layers, _layer_index } = this.st4te;
        const { to_less_color } = this.st4te._canvas;
        actions.trigger_voice("please_wait");

        if(parseInt((_layers[_layer_index] || {}).number_of_colors || 0) > 256) {
            to_less_color("auto");
        }else {

            to_less_color("auto");
        }
    };

    _get_average_color_of_selection = () => {

        const { get_average_color_of_selection } = this.st4te._canvas;
        const color = get_average_color_of_selection();

        this._handle_current_color_change(color);
    };

    _handle_pixel_dialog_create_close = () => {

        this.setSt4te({_is_pixel_dialog_create_open: false, _attachment_previews: {}}, () => {

            this._request_force_update();
        });
    };

    _handle_pixel_dialog_create_open = () => {

        if(this.st4te._is_pixel_dialog_create_open === false) {
            actions.trigger_sfx("hero_decorative-celebration-02");
        }

        api.get_settings(this._process_settings_info_result);
        setTimeout(() => {
            this.setSt4te({_is_pixel_dialog_create_open: true}, () => { this._request_force_update(); });
        }, 725);

    };

    _set_toolbox_container_ref = (element) => {

        if(typeof element === "undefined") {return}
        if(element === null) {return}
        this.setSt4te({_toolbox_container_ref: element});
    };

    _set_root_ref = (element) => {

        if(typeof element === "undefined") {return}
        if(element === null) {return}
        this.setSt4te({_root_ref: element}, () => {
            this.st4te._root_ref.addEventListener("drop",  this._handle_file_upload, {capture: true});
            this.st4te._root_ref.addEventListener("dragenter", this._drop_start);
            this.st4te._root_ref.addEventListener("dragover", this._drop_start);
            this.st4te._root_ref.addEventListener("dragleave", this._drop_end);
        });

    };

    _drop_start = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setSt4te({_drag_file: Date.now()}, () => {
            this._request_force_update();
        });
    };
    _drop_end = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(this.st4te._drag_file) {
            this.setSt4te({_drag_file: 0}, () => {
                this._request_force_update();
            });
        }
    };

    _scroll_to_drawer = (classname) => {

        if((""+classname).startsWith(`swipetoolbox_i_`)) {

            const panel_element = (document.getElementsByClassName(classname) || [])[0] || null;
            if (panel_element !== null) {

                this.st4te._toolbox_container_ref.scrollTop = panel_element.offsetTop;
            } else {

                this.st4te._toolbox_container_ref.scrollTop = 0;
            }
        }else {

            const offset = this.st4te._toolbox_container_ref.scrollTop;
            let panel = (document.getElementsByClassName(`swipetoolbox_i_${this.st4te._view_name_index}_${0}`) || [])[0] || {}, i = 1;
            while(Boolean(panel)) {
                if(offset > panel.offsetTop){
                    panel = (document.getElementsByClassName(`swipetoolbox_i_${this.st4te._view_name_index}_${i++}`) || [])[0] || {};
                }else {
                    panel = (document.getElementsByClassName(`swipetoolbox_i_${this.st4te._view_name_index}_${i-1+classname}`) || [])[0] || {};
                    break;
                }
            }

            this.st4te._toolbox_container_ref.scrollTop = panel.offsetTop || 0;

        }
    };

    _toggle_perspective = () => {

        const new_perspective = Boolean(!this.st4te._perspective);

        if(new_perspective) {

            actions.trigger_voice("vision_activated");
            this._set_tool("MOVE", false);
        }else {

            actions.trigger_voice("vision_deactivated");
            this._revert_tool();
        }

        this.setSt4te({_perspective: new_perspective}, () => {

            this._request_force_update();
        });
    };

    _smooth_adjust = (run = 1) => {
        const { smooth_adjust } = this.st4te._canvas;
        smooth_adjust(run);
    }

    _close_text = () => {

        this.setSt4te({_text_dialog_open: false}, () => {

            this._request_force_update();
        });
    };

    _open_text = () => {

        this.setSt4te({_text_dialog_open: true}, () => {

            this._request_force_update();
        });
    };

    _draw_text = (size, text) => {

        this._close_text();
        const { write_text } = this.st4te._canvas;
        write_text(size, text);
    }

    _resume_video = () => {

        try {
            var video = document.getElementById("labintro-video");
            video.play();
        }catch(e){}
    };

    _compute_menu_right_click = () => {

        const {
            classes,
            _canvas,
            _current_color,
            _tool,
            _width,
            _height,
            _pencil_mirror_mode,
            _is_something_selected,
            _menu_mouse_y,
            _menu_mouse_x,
            _menu_data,
            _menu_event,
        } = this.st4te;

        _menu_data.pos_x = _menu_data.pos_x === -1 ? "out": _menu_data.pos_x;
        _menu_data.pos_y = _menu_data.pos_y === -1 ? "out": _menu_data.pos_y;

        this.menu = <Menu
            className={classes.contextMenuFuckYouDisable}
            PaperProps={{
                style: {
                    maxHeight: 380,
                    width: 240,
                    overflowY: "overlay",
                    contain: "paint style layout",
                    scrollBehavior: "smooth",
                    userSelect: "none",
                    pointerEvents: !Boolean(_menu_mouse_y) && !Boolean(_menu_mouse_x) ? "none": "all"
                },
            }}
            onContextMenu={function (e){e.preventDefault();}}
            MenuListProps={{dense: true}}
            transitionDuration={{enter: 125, exit: 250}}
            open={Boolean(_menu_mouse_y) || Boolean(_menu_mouse_x)}
            onClose={this._handle_menu_close}
            disablePortal={false}
            keepMounted={true}
            anchorReference="anchorPosition"
            anchorPosition={{ top: _menu_mouse_y|0, left: _menu_mouse_x|0 }}
        >
            <span style={{textAlign: "left", padding: "12px 8px", color: "#666"}}>X: {_menu_data.pos_x}, Y: {_menu_data.pos_y}</span>
            <div style={(_tool === "SET PENCIL MIRROR" || _pencil_mirror_mode !== "NONE") ? {}: {display: "none"}}>
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

            <div style={_is_something_selected ? {}: {display: "none"}}>
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
            <ListSubheader style={_menu_data.pxl_color === null ? {display: "none"}: {}} className={classes.contextMenuSubheader}>Color</ListSubheader>
            <ListItem button divider style={_menu_data.pxl_color === null ? {display: "none"}: {}} disabled={_menu_data.pxl_color === _current_color || _menu_data.pxl_color === null} onClick={(event) => {this._set_current_color(_menu_data.pxl_color); this._handle_relevant_action_event(_menu_event, _menu_data.pxl_color, 1, true);}}>
                <ListItemIcon>
                    <SquareIcon style={{ color: _menu_data.pxl_color, background: `repeating-conic-gradient(#80808055 0% 25%, #00000000 0% 50%) 50% / calc(200% / ${_width}) calc(200% / ${_height})`}} />
                </ListItemIcon>
                <ListItemText primary="Pick color" />
            </ListItem>
            <ListItem button divider style={_menu_data.pxl_color === null ? {display: "none"}: {}} disabled={_menu_data.pxl_color === _current_color || _menu_data.pxl_color === null} onClick={(event) => {this._exchange_pixel_colors(_menu_data.pos_x, _menu_data.pos_y, _current_color+""); this._handle_relevant_action_event(_menu_event, _current_color, 1, true);}}>
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
            <ListItem button divider onClick={(event) => {_canvas._to_less_color("0.9")}}>
                <ListItemIcon>
                    <LessColorIcon />
                </ListItemIcon>
                <ListItemText primary="Remove 10% of all colors" />
            </ListItem>
            <ListItem button divider onClick={this._less_colors_auto}>
                <ListItemIcon>
                    <LessColorIcon />
                </ListItemIcon>
                <ListItemText primary="Remove automatically some colors" />
            </ListItem>
            <ListItem button divider onClick={(event) => this._smooth_adjust(1)}>
                <ListItemIcon>
                    <ImageSmoothIcon />
                </ListItemIcon>
                <ListItemText primary="Smooth a bit" />
            </ListItem>
        </Menu>
    };

    _compute_menu_drawer = () => {

        const {
            classes,
            _canvas,
            _view_name_index,
            _previous_view_name_index,
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
            _is_something_selected,
            _is_edit_drawer_open,
            _menu_data,
            _less_than_1280w,
            _slider_value_width,
            _slider_value_height,
            is_mobile_or_tablet
        } = this.st4te;

        _menu_data.pos_x = _menu_data.pos_x === -1 ? "out": _menu_data.pos_x;
        _menu_data.pos_y = _menu_data.pos_y === -1 ? "out": _menu_data.pos_y;

        if(!_less_than_1280w){
            this.drawer_desktop = <Drawer
                    className={classes.contentDrawerFixed}
                    variant="permanent"
                    anchor="right"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div style={{display: "contents", pointerEvents: "all"}}>
                        <div style={{boxShadow: "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px", zIndex: 1}}>
                            <div className={classes.drawerHeader}>
                                <div className={classes.desktopintrovideowrapper}>
                                    <video className={classes.desktopintrovideo} id="labintro-video" width="56" height="56" onClick={this._resume_video} style={{aspectRatio: "1", transform: "translateZ(10px)"}}>
                                        <source src={"/src/videos/labintro.mp4"} type="video/mp4"/>
                                    </video>
                                </div>
                                <span className={classes.coordinate}>
                                <span id={"fps_el"}>{`FPS: 0`}</span>
                                <span id={"xy_el"}>{` | X: out, Y: out `}</span>
                            </span>
                                <Typography className={classes.effectSliderText} id="strength-slider" gutterBottom>
                                    Effect strength :
                                </Typography>
                                <Slider
                                    key={"slider-"+(_slider_value*255 | 0)}
                                    defaultValue={parseFloat(_slider_value)}
                                    className={classes.effectSlider}
                                    step={1/255}
                                    min={0}
                                    max={1}
                                    onChangeCommitted={this._set_value_from_slider_with_update}
                                    aria-labelledby="strength-slider"
                                />
                            </div>
                            <Tabs id="tabs-desktop"
                                  className={classes.tabs}
                                  variant="fullWidth"
                                  indicatorColor="primary"
                                  textColor="primary"
                                  selectionFollowsFocus={false}
                                  value={_view_name_index}
                                  onChange={(event, index) => {this._handle_view_name_change(index)}}>
                                <Tab className={classes.tab} label={"colors"} icon={<PaletteIcon />} />
                                <Tab className={classes.tab} label={"image"} icon={<FolderImageIcon />} />
                                <Tab className={classes.tab} label={"layers"} icon={<FolderIcon />} />
                                <Tab className={classes.tab} label={"tools"} icon={<DrawIcon />} />
                                <Tab className={classes.tab} label={"select"} icon={<SelectDragIcon />} />
                                <Tab className={classes.tab} label={"effects"} icon={<TuneIcon />} />
                                <Tab className={classes.tab} label={"filters"} icon={<ImageAutoAdjustIcon />} />
                            </Tabs>
                        </div>
                        <div className={classes.drawerContainer} ref={this._set_toolbox_container_ref}>
                            <PixelToolboxSwipeableViews
                                should_update={!is_mobile_or_tablet}
                                slider_value_width={_slider_value_width}
                                slider_value_height={_slider_value_height}
                                canvas={_canvas}
                                view_class={classes.listOfTools}
                                is_mobile={is_mobile_or_tablet}
                                view_names={_view_names}
                                is_image_import_mode={_is_image_import_mode}
                                can_undo={_can_undo}
                                can_redo={_can_redo}

                                view_name_index={_view_name_index}
                                previous_view_name_index={_previous_view_name_index}
                                layers={_layers}
                                layer_index={_layer_index}
                                hide_canvas_content={_hide_canvas_content}
                                show_original_image_in_background={_show_original_image_in_background}
                                show_transparent_image_in_background={_show_transparent_image_in_background}
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

                                set_filters_callback={this._set_filters_callback}
                                set_props_callback={this._set_props_callback}
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
                                on_request_draw_text={this._open_text}
                                on_download_image={this._download_image}
                                on_download_svg={this._download_svg}
                                on_scroll_to={this._scroll_to_drawer}
                            />
                        </div>
                    </div>
                </Drawer>
        }else {
            this.drawer_mobile = <React.Fragment>
                        <SwipeableDrawer
                            className={classes.contentDrawer}
                            disableBackdropTransition={false}
                            disableSwipeToOpen={false}
                            disableDiscovery={false}
                            disablePortal={true}
                            keepMounted={true}
                            hysteresis={0.314}
                            minFlingVelocity={314}
                            swipeAreaWidth={128}
                            open={Boolean(_is_edit_drawer_open)}
                            onOpen={this._handle_edit_drawer_open}
                            onClose={this._handle_edit_drawer_close}
                            classes={{
                                paper: classes.swipeableDrawerPaper,
                                modal: classes.drawerModal,
                            }}
                            transitionDuration={{appear: 5, enter: 50, exit: 75}}
                            ModalProps={{disablePortal: true, BackdropProps:{classes: {root: classes.drawerModalBackdropRoot}}}}
                            variant="temporary"
                            anchor="bottom"
                            style={{pointerEvents: "all"}}
                        >
                            <div className={classes.mobileintrovideowrapper}>
                                <video className={classes.mobileintrovideo} id="labintro-video" width="56" height="56" onClick={this._resume_video} style={{aspectRatio: "1", transform: "translateZ(10px)"}}>
                                    <source src={"/src/videos/labintro.mp4"} type="video/mp4"/>
                                </video>
                            </div>
                            <DialogCloseButton onClick={this._handle_edit_drawer_close} />
                            <div style={{display: "grid", contain: "layout paint style"}}>
                                <div style={{boxShadow: "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px", zIndex: 1}}>
                                    <div className={classes.drawerHeader}>
                                        <Typography className={classes.effectSliderText} id="strength-slider" gutterBottom>
                                            Effect strength :
                                        </Typography>
                                        <Slider
                                            key={"slider-"+(_slider_value*255 | 0)}
                                            className={classes.effectSlider}
                                            defaultValue={parseFloat(_slider_value)}
                                            step={1/255}
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
                                        slider_value_width={_slider_value_width}
                                        slider_value_height={_slider_value_height}
                                        onActionClose={this._handle_edit_drawer_close}
                                        canvas={_canvas}
                                        is_mobile={is_mobile_or_tablet}
                                        view_class={classes.listOfTools}
                                        view_names={_view_names}
                                        is_image_import_mode={_is_image_import_mode}
                                        can_undo={_can_undo}
                                        can_redo={_can_redo}

                                        view_name_index={_view_name_index}
                                        previous_view_name_index={_previous_view_name_index}
                                        layers={_layers}
                                        layer_index={_layer_index}
                                        hide_canvas_content={_hide_canvas_content}
                                        show_original_image_in_background={_show_original_image_in_background}
                                        show_transparent_image_in_background={_show_transparent_image_in_background}
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

                                        set_filters_callback={this._set_filters_callback}
                                        set_props_callback={this._set_props_callback}
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
                                        on_request_draw_text={this._open_text}
                                        on_download_image={this._download_image}
                                        on_download_svg={this._download_svg}
                                        on_scroll_to={this._scroll_to_drawer}
                                    />
                                </div>
                            </div>
                        </SwipeableDrawer>
                        <div className={classes.fatabs} style={_is_edit_drawer_open && _less_than_1280w ? {transform: "translateY(24px)", backgroundColor: "#fff"}: {}}>
                            <Tabs className={classes.tabs} style={{pointerEvents: "all"}}
                                  variant="fullWidth"
                                  scrollButtons="off"
                                  indicatorColor="primary"
                                  textColor="primary"
                                  selectionFollowsFocus={true}
                                  value={_view_name_index}
                                  onChange={this._handle_edit_drawer_open}>
                                <Tab className={classes.tab} label={"colors"} icon={<PaletteIcon />} />
                                <Tab className={classes.tab} label={"image"} icon={<FolderImageIcon />} />
                                <Tab className={classes.tab} label={"layers"} icon={<FolderIcon />} />
                                <Tab className={classes.tab} label={"tools"} icon={<DrawIcon />} />
                                <Tab className={classes.tab} label={"select"} icon={<SelectDragIcon />} />
                                <Tab className={classes.tab} label={"effects"} icon={<TuneIcon />} />
                                <Tab className={classes.tab} label={"filters"} icon={<ImageAutoAdjustIcon />} />
                            </Tabs>
                        </div>
                    </React.Fragment>
        }
    };

    render() {
        "use strict";
        const {
            classes,
            _canvas,
            _loading,
            _loading_process,
            _is_image_import_mode,
            _hide_canvas_content,
            _show_original_image_in_background,
            _show_transparent_image_in_background,
            _can_undo,
            _can_redo,
            _current_color,
            _slider_value,
            _tool,
            _import_size,
            _hue,
            _select_mode,
            _pencil_mirror_mode,
            _kb,
            _mine_player_direction,
            _menu_data,
            _ripple_color,
            _ripple_opacity,
            _library_dialog_open,
            _library,
            _is_pixel_dialog_create_open,
            _h_svg,
            _h_svg_size,
            _attachment_previews,
            _perspective,
            _files_waiting_download,
            _time_ago_initiated,
            _settings,
            _text_dialog_open,
            _drag_file,
            is_mobile_or_tablet
        } = this.st4te;

        _menu_data.pos_x = _menu_data.pos_x === -1 ? "out": _menu_data.pos_x;
        _menu_data.pos_y = _menu_data.pos_y === -1 ? "out": _menu_data.pos_y;

        return (
            <div style={{height: "100%", position: "relative", pointerEvents: "none",  userSelect: "none"}} ref={this._set_root_ref}>
                <div className={classes.root}>
                    <div className={classes.contentInner} style={{
                        backgroundColor: "#f7f7f7",
                        backgroundImage: `url("${_h_svg}")`,
                        backgroundRepeat: "repeat",
                        backgroundSize: _h_svg_size,
                        textRendering: "optimizespeed",
                        imageRendering: "optimizespeed",
                    }}>
                        <Suspense fallback={<div className={classes.contentCanvas}/>}>
                            <CanvasPixels
                                set_compressor={this._set_png_compressors}
                                perspective={_perspective ? 2: 0}
                                on_state_export={this._handle_canvas_state_will_export}
                                on_state_exported={this._handle_canvas_state_exported}
                                on_fps_change={this._handle_fps_change}
                                export_state_every_ms={is_mobile_or_tablet ? 5 * 60 * 1000: 3.5 * 60 * 1000}
                                shadow_size={is_mobile_or_tablet ? 0: 1.5}
                                key={"canvas"}
                                className={classes.contentCanvas}
                                ref={this._set_canvas_ref}
                                tool={_tool}
                                canvas_wrapper_padding={8}
                                hide_canvas_content={_hide_canvas_content}
                                show_original_image_in_background={_show_original_image_in_background && true}
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
                        {this.drawer_desktop}
                        {this.menu}
                    </div>
                </div>

                <div style={{pointerEvents: "all"}}>
                    <IconButton className={classes.perspectiveButton} color={"primary"} size={"small"} onClick={this._toggle_perspective}>
                        {_perspective ? <PerspectiveOff />: <PerspectiveOn />}
                    </IconButton>

                    <Button className={classes.saveButton} variant={"text"} color={"primary"} onClick={this._backup_state}>
                        <span id={"saved_at"}>?</span> <SaveIcon/> {_kb < 0.5 ? "?": Math.round(_kb * 10) / 10} kB
                    </Button>

                    <Button disabled={!_is_image_import_mode} className={classes.confirmImportButton} color={"primary"} size={"small"} onClick={() => {_is_image_import_mode ? _canvas.confirm_import(): this._import_image_library()}}>
                        <FileImportIcon/> {_is_image_import_mode ? "OK": "Import"}
                    </Button>

                    <IconButton className={classes.zoomOutButton} color={"primary"} size={"small"} onClick={() => {_canvas.zoom_out()}}>
                        <ZoomOut/>
                    </IconButton>
                    <IconButton className={classes.zoomInButton} color={"primary"} size={"small"} onClick={() => {_canvas.zoom_in()}}>
                        <ZoomIn/>
                    </IconButton>

                    <Button disabled={!_can_redo} variant={"text"} color={"primary"} size={"small"} className={classes.redoButton} onClick={(event) => {this._redo()}}>
                        {`${-_can_redo || ""} Redo`} <ChangeHistoryOutlined style={{transition: "ease-out 225ms transform 25m", transform: `rotate(+${_can_redo*360+90}deg)`}}/>
                    </Button>
                    <Button disabled={!_can_undo} variant={"text"} color={"primary"} size={"small"} className={classes.undoButton} onClick={(event) => {this._undo()}}>
                        <ChangeHistoryOutlined style={{transition: "ease-out 225ms transform 25ms", transform: `rotate(-${_can_undo*360+90}deg)`}}/>{`${+_can_undo || ""} Undo`}
                    </Button>
                </div>

                {this.drawer_mobile}

                <ImageFileDialog
                    keepMounted={false}
                    open={Boolean(_library_dialog_open)}
                    object={_library}
                    onClose={this._close_library}
                    onSelectImage={this._from_library}
                />
                <PixelDialogText
                    keepMounted={false}
                    open={Boolean(_text_dialog_open)}
                    onClose={this._close_text}
                    onSuccess={this._draw_text}
                />
                <PixelDialogCreate keepMounted={false}
                                   theme_day={_settings._theme_day}
                                   open={Boolean(_is_pixel_dialog_create_open)}
                                   pixel_arts={_time_ago_initiated ? _attachment_previews: {}}
                                   size={_import_size}
                                   on_import_size_change={this._set_import_size}
                                   on_pixel_art_delete={this._delete_unsaved_pixel_art}
                                   import_JSON_state={this._handle_import_json_state_id}
                                   on_upload={this._handle_file_upload}
                                   onClose={this._handle_pixel_dialog_create_close}/>

                <div style={{position: "absolute", width: "100%", height: "100%", top: 0, left: 0, contain: "paint size style layout", visibility: "auto"}}>
                    <TouchRipple
                        className={classes.ripple}
                        ref={this._set_ripple_ref}
                        center={false}
                        style={{color: _ripple_color, opacity: _ripple_opacity, position: "fixed", width: "100%", height: "100%"}}/>

                    <Backdrop style={{pointerEvents: "all", cursor: "pointer"}} onDrag={this._handle_file_upload} className={classes.backdrop} open={Boolean(_loading || _files_waiting_download.length > 0 || (_drag_file + 1000 > Date.now()))}>
                        <div className={classes.backdropTextContent} style={{ fontFamily: `"Industry Book"`, textTransform: "uppercase"}} onClick={this._continue_download}>
                            {!_drag_file && Boolean(_loading || _files_waiting_download.length > 0) && <h1><ShufflingSpanText key={_loading_process || _loading} text={_loading_process === "browser" ? "Laboratory in DANGER!": "LABORATORY PROCESSING"} animation_delay_ms={0} animation_duration_ms={200}/></h1>}
                            {!_drag_file && _files_waiting_download.length > 0 && <h3><ShufflingSpanText key={_files_waiting_download[0].name} text={`ACTION REQUIRED... ${String(_files_waiting_download[0].name)}`} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                            {!_drag_file && _files_waiting_download.length > 0 && <div><img src={"/src/images/labostration/DOWNLOAD.svg"} className={classes.imageBackdrop}/></div>}
                            {!_drag_file && _files_waiting_download.length > 0 && <h4><ShufflingSpanText pre="[... " app=" ...]" style={{textShadow: "0px 0px 16px white"}} text={"CLICK ON THE SCREEN TO CONTINUE DOWNLOAD!"} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading && _loading_process === "browser" && <h3><ShufflingSpanText text={"Doesn't feel like home for our dear code here."} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "browser" && <h4><ShufflingSpanText pre="[... " app=" ...]" text={"It can take a while, please download an advanced browser."} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "image_ai" && <h3><ShufflingSpanText text={"AI processing your image"} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                            { _drag_file && <div><img src="/src/images/labostration/ABDUCTION.svg" className={classes.imageBackdrop}/></div>}
                            { _drag_file && <h4><ShufflingSpanText pre="[... " app=" ...]" text={"Drop the file to the UFO."} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                            { _drag_file && <h3><ShufflingSpanText text={"Ready for a new image abduction?"} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "image_ai" && <div><img src="/src/images/labostration/MOLECULE.svg" className={classes.imageBackdrop}/></div>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "image_ai" && <h4><ShufflingSpanText pre="[... " app=" ...]" text={"It can take a while, please wait ~10sec."} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "image_preload" && <h3><ShufflingSpanText text={"Preparing laboratory"} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "image_preload" && <div><img src="/src/images/labostration/SCIENCE.svg" className={classes.imageBackdrop}/></div>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "image_preload" && <h4><ShufflingSpanText pre="[... " app=" ...]" text={`It can take a while, please wait ~${parseInt(parseFloat(_import_size / 100) * 3) * (is_mobile_or_tablet ? 3: 1)}sec.`} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "image_load" && <h3><ShufflingSpanText text={"Abducting your image"} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "image_load" && <div><img src="/src/images/labostration/ABDUCTION.svg" className={classes.imageBackdrop}/></div>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "image_load" && <h4><ShufflingSpanText pre="[... " app=" ...]" text={`It can take a while, please wait ~${parseInt(parseFloat(_import_size / 100) * 4) * (is_mobile_or_tablet ? 3: 1)}sec.`} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "image_render" && <div><img src="/src/images/labostration/COMPUTING.svg" className={classes.imageBackdrop}/></div>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "image_render" && <h3><ShufflingSpanText text={"Atomic rendering in process"} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "image_render" && <h4><ShufflingSpanText pre="[... " app=" ...]" text={"It can take a while, please wait ~14sec."} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "less_color" && <h3><ShufflingSpanText text={"Coupling few color DNA"} animation_delay_ms={300} animation_duration_ms={500}/></h3>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "less_color" && <div><img src="/src/images/labostration/GENOMA.svg" className={classes.imageBackdrop}/></div>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "less_color" && <h4><ShufflingSpanText pre="[... " app=" ...]" text={"It can take a while, please wait ~4sec."} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "less_color_auto" && <h3><ShufflingSpanText text={"Coupling the DNA of many color"} animation_delay_ms={500} animation_duration_ms={500}/></h3>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "less_color_auto" && <div><img src="/src/images/labostration/GENOMA.svg" className={classes.imageBackdrop}/></div>}
                            {!_drag_file && _files_waiting_download.length === 0 && _loading  && _loading_process === "less_color_auto" && <h4><ShufflingSpanText pre="[... " app=" ...]" text={"It can take a while, please wait ~7sec."} animation_delay_ms={is_mobile_or_tablet ? 5000: 2500} animation_duration_ms={500}/></h4>}
                        </div>
                    </Backdrop>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Pixel);
