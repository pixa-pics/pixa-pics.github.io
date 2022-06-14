import React from "react";

import {withStyles, Avatar, List, ListItem, ListItemAvatar, ListItemIcon, LinearProgress, ListItemText, ListSubheader, Typography, Slider, RadioGroup, Radio, FormLabel, Collapse, Divider, FormControlLabel, Button, Menu} from "@material-ui/core";

import {HISTORY} from "../utils/constants";

import AllLayersIcon from "../icons/AllLayers";
import SelectIcon from "../icons/Select";
import ImageEffectIcon from "../icons/ImageEffect";
import ImageFilterMagicIcon from "../icons/ImageFilterMagic";
import SwipeableViews from "react-swipeable-views";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PixelColorPalette from "./PixelColorPalette";
import {ChromePicker} from "react-color";
import ImagePlusIcon from "../icons/ImagePlus";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ImportIcon from "../icons/Import";
import DownloadIcon from "../icons/Download";
import FileDownloadIcon from "../icons/FileDownload";
import LayerSearchIcon from "../icons/LayerSearch";
import LayerOutlineIcon from "../icons/LayerOutline";
import LayerOffOutlineIcon from "../icons/LayerOffOutline";
import ImageOffOutlineIcon from "../icons/ImageOffOutline";
import ImageOutlineIcon from "../icons/ImageOutline";
import LayerEditIcon from "../icons/LayerEdit";
import LayerAddIcon from "../icons/LayerAdd";
import LayerDeleteIcon from "../icons/LayerDelete";
import ContentDuplicateIcon from "../icons/ContentDuplicate";
import MergeIcon from "../icons/Merge";
import FileImportIcon from "../icons/FileImport";
import DrawIcon from "../icons/Draw";
import ColorPickerIcon from "../icons/ColorPicker";
import MoveIcon from "../icons/Move";
import PencilIcon from "../icons/Pencil";
import PencilPerfectIcon from "../icons/PencilPerfect";
import MirrorIcon from "../icons/Mirror";
import ShapesIcon from "../icons/Shapes";
import LineIcon from "../icons/Line";
import RectangleIcon from "../icons/Rectangle";
import EllipseIcon from "../icons/Ellipse";
import ContourIcon from "../icons/Contour";
import PaintIcon from "../icons/Paint";
import BucketIcon from "../icons/Bucket";
import PaletteSwatchIcon from "../icons/PaletteSwatch";
import BorderBottomIcon from "../icons/BorderBottom";
import SelectCompareIcon from "../icons/SelectCompare";
import SelectRemoveDifferenceIcon from "../icons/SelectRemoveDifference";
import SelectAddIcon from "../icons/SelectAdd";
import SelectInImageIcon from "../icons/SelectInImage";
import SelectColorIcon from "../icons/SelectColor";
import MagicIcon from "../icons/Magic";
import SquareSmallIcon from "../icons/SquareSmall";
import SelectionRectangleIcon from "../icons/SelectionRectangle";
import SelectionEllipseIcon from "../icons/SelectionEllipse";
import ImageMoveIcon from "../icons/ImageMove";
import SelectInvertIcon from "../icons/SelectInvert";
import CopyIcon from "@material-ui/icons/FileCopy";
import CutIcon from "../icons/Cut";
import EraserIcon from "../icons/Eraser";

import AlphaIcon from "../icons/Alpha";
import ColorizedIcon from "../icons/Colorized";
import ContrastCircleIcon from "../icons/ContrastCircle";
import DutoneIcon from "../icons/Dutone";
import ImageSmoothIcon from "../icons/ImageSmooth";
import ImageVignetteIcon from "../icons/ImageVignette";
import LessColorIcon from "../icons/LessColor";
import LessColorAutoIcon from "../icons/LessColorAuto";
import RotateLeftIcon from "../icons/RotateLeft";
import RotateRightIcon from "../icons/RotateRight";
import SwapHorizontalIcon from "../icons/SwapHorizontal";
import SwapVerticalIcon from "../icons/SwapVertical";

import NavigationIcon from "../icons/Navigation";

import Jdenticon from "react-jdenticon";

const styles = theme => ({
    listSubHeader: {
        width: "100%",
        alignSelf: "flex-start",
        color: "#3729c1",
        fontWeight: "bold",
        backgroundColor: "#eee",
        textTransform: "uppercase",
        "& span svg": {
            verticalAlign: "middle",
            color: "#050c4c",
            marginRight: theme.spacing(1),
            //display: "none",
        }
    },
    listItemIcon: {
        color: theme.palette.secondary.dark
    },
    
    menu: {
        "& .MuiList-padding": {
            padding: 0,
        },
    },
    layerThumbnail: {
        width: "auto",
        height: theme.spacing(8),
        "& .MuiAvatar-img": {
            width: "auto",
            borderRadius: 2,
            imageRendering: "pixelated",
        },
        marginRight: theme.spacing(2),
    },
    layerSelected: {
        borderRight: `4px solid ${theme.palette.primary.action}`,
        paddingRight: 12,
    },
    listOfTools: {
        paddingTop: 0
    },
    chromePicker: {
        fontFamily: "Open Sans !important",
    },
    flipExpandMoreIcon: {
        transform: "rotate(180deg)",
        transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
    },
    expandMoreIcon: {
        transform: "rotate(0deg)",
        transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
    },
    ListItemText: {
        "& .MuiTypography-colorTextSecondary": {
            color: "rgb(25 25 51 / 54%)"
        }
    },
    listItems: {
        display: "inline-flex",
        flexWrap: "wrap",
        alignContent: "stretch",
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
        maxWidth: "100%",
        overflowX: "scroll",
        contentVisibility: "auto",
        "& .MuiFormGroup-root": {
            flexWrap: "nowrap",
            padding: "16px 0px !important",
            contain: "layout paint style",
            display: "inline-flex",
        },
        "& .MuiListItem-root": {
            display: "block",
            flexGrow: 1,
            flexBasis: "auto",
            width: "100px",
            textAlign: "center",
            "& .MuiListItemIcon-root": {
                minWidth: 0,
            },
            "& .MuiListItemText-root": {
                "& .MuiListItemText-primary": {
                    fontSize: "14px",
                },
                "& .MuiListItemText-secondary": {
                    fontSize: "10px",
                },
            }
        },
        [theme.breakpoints.down("md")]: {
            display: "inline-flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            flexWrap: "wrap",
            overflow: "overlay",
            width: "100%",
            maxWidth: "100%",
            flexFlow: "row",
            "& .MuiListItem-root": {
                display: "block",
                flexGrow: 1,
                flexBasis: "auto",
                width: "100px",
                textAlign: "center",
                "& .MuiListItemIcon-root": {
                    minWidth: 0,
                },
                "& .MuiListItemText-root": {
                    "& .MuiListItemText-primary": {
                        fontSize: "14px",
                    },
                    "& .MuiListItemText-secondary": {
                        display: "none",
                    },
                }
            },
        },
    },
    sliderContainer: {
        display: "flex",
        overflow: "visible",
    },
    sliderLabel: {
        marginRight: theme.spacing(2),
    },
    linearProgress: {
        "& .MuiLinearProgress-barColorPrimary": {
            background: "linear-gradient(90deg, #0056ce 0%, #0056ce 100%)",
            zIndex: -1,
        },
        zIndex: 1,
        marginBottom: -2,
        height: 2,
        backgroundColor: "transparent",
        width: "100%",
        display: "flex",
        left: 0,
        bottom: 0,
        position: "absolute",
    },
});


class PixelToolboxSwipeableViews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            canvas: props.canvas,
            current_color: props.current_color,
            second_color: props.second_color,
            should_update: props.should_update,
            _anchor_el: null,
            _saturation: 60,
            _luminosity: 60,
            _opacity: 100,
            _slo_colors: new Array(0),
        };
    };

    componentDidMount() {

        this._compute_slo_colors(this.state._saturation, this.state._luminosity, this.state._opacity);
    }

    componentWillReceiveProps(new_props) {

        const {
            current_color,
            second_color,
            should_update,
        } = this.state;

        if (Boolean(new_props.should_update || should_update) && (
            current_color !== new_props.current_color ||
            second_color !== new_props.second_color
        )) {

            const computed_color_props = this._get_computed_curr_and_sec_colors(current_color, second_color);

            this.setState({...new_props, ...computed_color_props}, () => {

                this.forceUpdate();
            });
        }
    }

    shouldComponentUpdate(new_props) {

        return false;
    }

    _hsla_to_hex = (h, s, l, a) => {

        const { _hsla_to_hex } = this.state.canvas;
        if(!Boolean(_hsla_to_hex)) { return "#00000000" }
        return _hsla_to_hex(h, s, l, a);
    };

    _rgba_from_hex = (hex) => {

        const { get_rgba_from_hex } = this.state.canvas;
        if(!Boolean(get_rgba_from_hex)) { return [0, 0, 0, 0] }
        return get_rgba_from_hex(hex);
    };

    _hex_from_rgba = (r, g, b, a) => {

        const { get_hex_from_rgba } = this.state.canvas;
        if(!Boolean(get_hex_from_rgba)) { return "#00000000" }
        return get_hex_from_rgba(r, g, b, a);
    };

    _handle_current_color_change = (color) => {

        if(this.props.on_current_color_change) {

            this.props.on_current_color_change(color);
        }
    };

    _handle_color_menu_open = (event) => {

        this.setState({_anchor_el: event.currentTarget}, () => {

            this.forceUpdate();
        });
    };

    _handle_color_menu_close = () => {

        this.setState({_anchor_el: null}, () => {

            this.forceUpdate();
        });
    };

    _set_saturation_from_slider = (event, value) => {

        this._compute_slo_colors(value, this.state._luminosity, this.state._opacity);
    };

    _set_luminosity_from_slider = (event, value) => {

        this._compute_slo_colors(this.state._saturation, value, this.state._opacity);
    };

    _set_opacity_from_slider = (event, value) => {

        this._compute_slo_colors(this.state._saturation, this.state._luminosity, value);
    };

    _switch_with_second_color = () => {

        if(this.props.switch_with_second_color) {

            this.props.switch_with_second_color();
        }
    };

    _get_computed_curr_and_sec_colors = (current_color, second_color) => {

        let [r_1, g_1, b_1, a_1] = this._rgba_from_hex(current_color);
        const _is_current_color_dark = (a_1 / 255) * (r_1 + g_1 + b_1) < 152 * 3;
        const shadow_mult_1 = _is_current_color_dark ? 1.25: 0.75;
        r_1 = Math.min(255, Math.max(0, r_1 * shadow_mult_1));
        g_1 = Math.min(255, Math.max(0, g_1 * shadow_mult_1));
        b_1 = Math.min(255, Math.max(0, b_1 * shadow_mult_1));
        a_1 = Math.min(255, Math.max(128, a_1));

        const _current_color_text_color = _is_current_color_dark ? "#ffffffff": "#000000ff";
        const _current_color_shadow_color = this._hex_from_rgba(r_1, g_1, b_1, a_1);

        let [r_2, g_2, b_2, a_2] = this._rgba_from_hex(second_color);
        const _is_second_color_dark = (a_2 / 255) * (r_2 + g_2 + b_2) < 152 * 3;
        const shadow_mult_2 = _is_second_color_dark ? 1.25: 0.75;
        r_2 = Math.min(255, Math.max(0, r_2 * shadow_mult_2));
        g_2 = Math.min(255, Math.max(0, g_2 * shadow_mult_2));
        b_2 = Math.min(255, Math.max(0, b_2 * shadow_mult_2));
        a_2 = Math.min(255, Math.max(128, a_2));
        const _second_color_text_color = _is_second_color_dark ? "#ffffffff": "#000000ff";
        const _second_color_shadow_color = this._hex_from_rgba(r_2, g_2, b_2, a_2);

        return {_current_color_text_color, _current_color_shadow_color, _second_color_text_color, _second_color_shadow_color};
    };

    _compute_slo_colors = (_saturation, _luminosity, _opacity) => {

        let _slo_colors = new Array(128);
        for (let i = 0; i < 128; i++) {

            _slo_colors[i] = this._hsla_to_hex(((i+1) / 128) * 360, _saturation, _luminosity, _opacity);
        }

        this.setState({_slo_colors, _saturation, _luminosity, _opacity}, () => {

            this.forceUpdate();
        });
    };

    render() {

        const {
            classes,
            should_update,
            current_color,
            second_color,
            _anchor_el,
            _saturation,
            _luminosity,
            _opacity,
            _slo_colors,
        } = this.state;

        return (
            <div key={"palette-palette-main"} className={`swipetoolbox_i_${0}_${0}`}>
                <Menu
                    className={classes.menu}
                    anchorEl={_anchor_el}
                    keepMounted={should_update}
                    open={Boolean(_anchor_el)}
                    onClose={this._handle_color_menu_close}
                    style={{padding: 0}}
                >
                    <ChromePicker className={classes.chromePicker}
                                  color={current_color}
                                  onChange={this._handle_current_color_change}
                                  disableAlpha={false}/>
                </Menu>

                <div style={{textAlign: "center"}}>
                    <Button variant={"contained"}
                            style={{
                                fontWeight: "bold",
                                color: _is_current_color_dark ? "white" : "black",
                                boxShadow: `0px 2px 4px -1px rgb(${r_1} ${g_1} ${b_1} / 20%), 0px 4px 5px 0px rgb(${r_1} ${g_1} ${b_1} / 14%), 0px 1px 10px 0px rgb(${r_1} ${g_1} ${b_1} / 12%)`,
                                margin: 24,
                                boxSizing: "content-box",
                                background: current_color,
                                borderRadius: 4,
                                height: 48,
                                width: 96
                            }}
                            onClick={(event) => {
                                this._handle_color_menu_open(event, current_color)
                            }}>
                        Primary
                    </Button>
                    <Button variant={"contained"}
                            style={{
                                fontWeight: "bold",
                                color: is_second_color_dark ? "white" : "black",
                                boxShadow: `0px 2px 4px -1px rgb(${r_2} ${g_2} ${b_2} / 20%), 0px 4px 5px 0px rgb(${r_2} ${g_2} ${b_2} / 14%), 0px 1px 10px 0px rgb(${r_2} ${g_2} ${b_2} / 12%)`,
                                margin: 24,
                                boxSizing: "content-box",
                                background: second_color,
                                borderRadius: 4,
                                height: 48,
                                width: 96
                            }}
                            onClick={(event) => {
                                this._switch_with_second_color()
                            }}>
                        Secondary
                    </Button>
                </div>

                <PixelColorPalette
                    transparent={true}
                    padding="12px 24px 24px 24px"
                    gap="8px"
                    align="left"
                    colors={_slo_colors}
                    selected_colors={[current_color]}
                    onColorClick={(event, color) => {
                        this._handle_current_color_change(color)
                    }}
                />

                <div style={{
                    padding: "8px 24px",
                    position: "relative",
                    overflow: "visible",
                    boxSizing: "border-box",
                    width: "100%"
                }} key={"palette-palette-secondary"} className={`swipetoolbox_i_${index}_${1}`}>
                    <div className={classes.sliderContainer}>
                        <Typography className={classes.sliderLabel} id="opacity-slider"
                                    gutterBottom>α</Typography>
                        <Slider defaultValue={_opacity} step={10} valueLabelDisplay="auto"
                                min={0} max={100}
                                onChangeCommitted={this._set_opacity_from_slider}
                                aria-labelledby="opacity-slider"/>
                    </div>
                    <div className={classes.sliderContainer}>
                        <Typography className={classes.sliderLabel} id="luminosity-slider"
                                    gutterBottom>L</Typography>
                        <Slider defaultValue={_luminosity} step={10}
                                valueLabelDisplay="auto" min={0} max={100}
                                onChangeCommitted={this._set_luminosity_from_slider}
                                aria-labelledby="luminosity-slider"/>
                    </div>
                    <div className={classes.sliderContainer}>
                        <Typography className={classes.sliderLabel} id="saturation-slider"
                                    gutterBottom>S</Typography>
                        <Slider defaultValue={_saturation} step={10}
                                valueLabelDisplay="auto" min={0} max={100}
                                onChangeCommitted={this._set_saturation_from_slider}
                                aria-labelledby="strength-slider"/>
                    </div>
                </div>

            </div>
        );
    }
}

export default withStyles(styles)(PixelToolboxSwipeableViews);
