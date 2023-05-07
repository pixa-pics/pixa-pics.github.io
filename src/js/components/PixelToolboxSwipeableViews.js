import React from "react";
import {
    withStyles,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    LinearProgress,
    ListItemText,
    ListSubheader,
    Typography,
    Slider,
    RadioGroup,
    Radio,
    FormLabel,
    Collapse,
    Divider,
    FormControlLabel,
    Button,
    Menu,
    Fade,
    IconButton
} from "@material-ui/core";

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
import MoveIcon from "../icons/Move";
import SelectInvertIcon from "../icons/SelectInvert";
import CopyIcon from "@material-ui/icons/FileCopy";
import CutIcon from "../icons/Cut";
import EraserIcon from "../icons/Eraser";
import CheckedIcon from "@material-ui/icons/CheckBoxOutlined";
import UncheckedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined";

import TimeIcon from "@material-ui/icons/Timer";
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

import ColorConversion from "../components/canvaspixels/utils/ColorConversion";
import actions from "../actions/utils";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import CloseIcon from "@material-ui/icons/Close";
const color_conversion = Object.create(ColorConversion).new();
const PANEL_NAMES = ["palette", "image", "layers", "tools", "selection", "effects", "filters"];

const styles = theme => ({
    "@global": {
        "@keyframes wiggle": {
            "0%, 7%": {transform: "scale(1.00)"},
            "15%": {transform: "scale(1.08)"},
            "20%": {transform: "scale(1.04)"},
            "25%": {transform: "scale(1.00)"},
            "30%": {transform: "scale(0.96)"},
            "40%, 100%": {transform: "scale(1)"}
        },
        "@keyframes shift": {
            "0%, 7%": {transform: "translateX(0%)"},
            "15%": {transform: "translateX(-25%)"},
            "20%": {transform: "translateX(-10%)"},
            "25%": {transform: "translateX(0%)"},
            "30%": {transform: "translateX(10%)"},
            "40%, 100%": {transform: "translateX(0%)"}
        }
    },
    listSubHeaderDescription: {
        lineHeight: "1em",
        textTransform: "initial",
        fontWeight: "initial",
        color: "#170f70",
        marginTop: 0,
        textAlign: "justify",
        marginRight: 150,
        minHeight: 126,
        marginLeft: 48
    },
    listSubHeaderToggle: {
        position: "absolute",
        right: 0,
        top: 0,
        margin: 0,
        "& .MuiSvgIcon-root": {
            color: "#b3aee8"
        }
    },
    listSubHeaderCollapse: {
        marginTop: "0px"
    },
    listSubHeaderVideo: {
        contain: "layout paint size style",
        contentVisibility: "auto",
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: 0,
        padding: 0,
        height: 164,
        width: 150,
    },
    listSubHeaderVideoOverlay: {
        position: "absolute",
        top: 0,
        right: 0,
        height: 20,
        width: 40,
        backgroundColor: "#ededff"
    },
    listSubHeaderVideoFade: {
        position: "absolute",
        top: 0,
        right: 0,
        height: 150,
        width: 150,
        background: "linear-gradient(to top, #ededfff1 2.5%,  #ededffbf 5%, #ededff78 15%, transparent 30%)"
    },

    listSubHeader: {
        "&:hover": {
            boxShadow: "0px 2px 5px #050c4c4d",
            transition: "box-shadow cubic-bezier(0.4, 0, 0.2, 1) 350ms",
            "& .list-sub-header-main-text svg": {
                animation: "$shift linear 675ms both",
            }
        },
        display: "inline-table",
        cursor: "pointer",
        transition: "all cubic-bezier(0.4, 0, 0.2, 1) 275ms",
        boxShadow: "0px 3px 6px #050c4c4d",
        width: "100%",
        alignSelf: "flex-start",
        color: "#3729c1",
        fontWeight: "bold",
        backgroundColor: "#ededff",
        textTransform: "capitalize",
        "& span svg": {
            verticalAlign: "middle",
            color: "#050c4c",
            marginRight: theme.spacing(1),
        }
    },
    info: {
        backgroundColor: "#f2f2ff",
        color: "#5c5fd1",
        padding: "16px",
        margin: 0,
        borderRadius: "4px",
    },
    relevantTextBlue: {
        color: "#3729c1ff",
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
        width: "128px !important",
        height: "auto",
        borderRadius: 2,
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
    animatedDownload: {

    },
    listItems: {
        textAlignLast: "center",
        display: "inline-flex",
        flexWrap: "wrap",
        alignContent: "stretch",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: "-20px",
        width: "100%",
        maxWidth: "100%",
        overflowX: "scroll",
        contentVisibility: "auto",
        padding: "16px 16px",
        contain: "paint style layout",
        "&.filters": {
            "& .MuiListItem-root": {
                width: 128,
                display: "inline-flex",
                height: "100%",
                contain: "paint style layout",
                margin: "8px !important",
                padding: "0px !important",
            },
            padding: "0px 8px",
            textAlignLast: "left",
        },
        "&.filters > .MuiListItem-root:hover > .MuiListItemText-root": {
            background: "linear-gradient(to top, #00000080 100%, #ffffff00)",
            opacity: "1",
            transition: "opacity, background 375ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
        "&.filters > .MuiListItem-root > .MuiListItemText-root": {
            background: "linear-gradient(to top, #00000040 75%, #ffffff00)",
            opacity: ".75",
            transition: "opacity, background 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
        "& .MuiFormGroup-root": {
            flexWrap: "nowrap",
            padding: "16px 0px !important",
            contain: "layout paint style",
            display: "inline-flex",
        },
        "& .MuiListItem-root": {
            display: "table",
            flexGrow: 1,
            flexBasis: "auto",
            width: "96px",
            padding: "8px !important",
            textAlign: "center",
            boxSizing: "content-box",
            contain: "paint style layout",
            "&:hover": {
                animation: "$wiggle linear 325ms both",
                transition: "all cubic-bezier(0.4, 0, 0.2, 1) 325ms",
                color: "#050c4c",
                background: "#D7D7FD7D",
            },
            "& .MuiListItemIcon-root": {
                minWidth: 0,
                contain: "paint style layout",
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
            marginBottom: "-4px",
            display: "inline-flex",
            justifyContent: "flex-start",
            flexDirection: "row",
            flexWrap: "wrap",
            overflowX: "overlay",
            width: "100%",
            maxWidth: "100%",
            flexFlow: "row",
            "& .MuiListItem-root": {
                display: "block",
                flexGrow: 1,
                flexBasis: "auto",
                width: "96px",
                textAlign: "center",
                "& .MuiListItemIcon-root": {
                    minWidth: 0,
                    contain: "paint style layout",
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
            "&.filters": {
                "& .MuiListItem-root": {
                    display: "inline-flex",
                },
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


class PixelToolboxSwipeableViews extends React.PureComponent {

    constructor(props) {
        super(props);
        this.st4te = {
            classes: props.classes,
            canvas: props.canvas,
            is_mobile: props.is_mobile || false,
            view_names: props.view_names,
            view_name_index: props.view_name_index,
            current_color: props.current_color,
            second_color: props.second_color,
            slider_value: parseFloat(props.slider_value),
            layers: props.layers,
            layer_index: props.layer_index,
            filter_layer_index: 0,
            can_undo: props.can_undo,
            can_redo: props.can_redo,
            width: props.width,
            height: props.height,
            default_width: !this.default_width ? (props.default_width || props.width || 96): 96,
            default_height: !this.default_height ? (props.default_height || props.height || 96): 96,
            is_image_import_mode: props.is_image_import_mode,
            hide_canvas_content: props.hide_canvas_content,
            show_original_image_in_background: props.show_original_image_in_background,
            show_transparent_image_in_background: props.show_transparent_image_in_background,
            tool: props.tool,
            filters: props.filters,
            select_mode: props.select_mode,
            pencil_mirror_mode: props.pencil_mirror_mode,
            is_something_selected: props.is_something_selected,
            previous_view_name_index: props.previous_view_name_index,
            hue: props.hue,
            should_update: props.should_update || false,
            _layer_opened: false,
            _anchor_el: null,
            _saturation: 60,
            _luminosity: 60,
            _opacity: 100,
            _history: HISTORY,
            too_much_colors_no_vector: false,
            import_size: props.import_size,
            import_colorize: props.import_colorize,
            filters_thumbnail: props.filters_thumbnail || new Map(),
            filters_preview_progression: props.filters_preview_progression || "0",
            last_filters_hash: "",
            _filter_aspect_ratio: "1 / 1",
            _filter_thumbnail_changed: true,
            _compressed: false,
            _upscale: false,
            _vectorized: false,
            _list_sub_header_opened: "",
            _slider_value_width: props.slider_value_width,
            _slider_value_height: props.slider_value_height,
        };

        this._cache = {
            "palette": null,
            "image": null,
            "layers": null,
            "tools": null,
            "selection": null,
            "effects": null,
            "filters": null
        };

        Object.keys(this._cache).map((name) => {

            this.update_cache_view(name);
        });
    };

    setSt4te(st4te, callback) {

        let keys = Object.keys(st4te);
        let keys_length = keys.length | 0;
        let key = "";

        for (let i = 0; (i|0) < (keys_length|0); i = (i+1|0)>>>0) {

            key = keys[i]+"";
            this.st4te[key] = st4te[key];
        }

        if(typeof callback === "function") {

            callback();
        }
    }

    _scroll_to_id = (classname) => {

        if(typeof this.props.on_scroll_to === "function"){

            this.props.on_scroll_to(classname);
        }
    };

    _handle_filters_thumbnail_change = (filters_thumbnail, last_filters_hash, filters_preview_progression) => {

        filters_preview_progression = filters_preview_progression+"";
        if(this.st4te.filters_preview_progression === "0") {
            actions.trigger_voice("filtering");
        }

        if (this.st4te._filters_changed) {

            let bmp;
            let ar = "";
            let processed = false;

            for (let i = 0; i < this.st4te.filters.length; i++) {

                bmp = filters_thumbnail[this.st4te.filters[i]] || {};

                if (Boolean(bmp)) {
                    ar = `${bmp.width} / ${bmp.height}`;
                    processed = true;
                }
            }

            if (ar !== this.st4te._filter_aspect_ratio && processed) {

                this.setSt4te({_filters_changed: false, _filter_aspect_ratio: ar}, () => {

                    this.update_cache_view(null, true);
                });
            }
        }

        this.setSt4te({filters_thumbnail, last_filters_hash, filters_preview_progression, filter_layer_index: this.st4te.layer_index}, () => {

            if(filters_preview_progression === "100") {

                this.update_cache_view(null, true);
            }
        });
    };

    componentDidMount() {

        if(this.props.set_filters_callback) {

            this.props.set_filters_callback(this._handle_filters_thumbnail_change);
        }

        if(this.props.set_props_callback) {

            this.props.set_props_callback(this._set_props);
        }
    }

    _set_props = (props) => {

        this.componentWillReceiveProps(Object.assign(Object.assign({}, this.props), props));
    };

    componentWillReceiveProps(new_props) {

        const {
            should_update,
            view_name_index,
            previous_view_name_index,
            layer_index,
            filter_layer_index,
            is_image_import_mode,
            hide_canvas_content,
            show_original_image_in_background,
            show_transparent_image_in_background,
            can_undo,
            can_redo,
            current_color,
            second_color,
            tool,
            width,
            height,
            filters_preview_progression,
            select_mode,
            pencil_mirror_mode,
            is_something_selected,
            import_size,
            import_colorize,
            layers
        } = this.st4te;

        const layer_index_changed = Boolean(filter_layer_index !== new_props.layer_index);
        const _history_changed = Boolean(can_undo !== new_props.can_undo) ||  Boolean(can_redo !== new_props.can_redo);
        const must_compute_filter = Boolean(Boolean(view_name_index !== new_props.view_name_index || _history_changed || layer_index_changed) && Boolean(new_props.view_name_index === 6));

        let props_override = {};
        let layers_colors_max = 0;
        Array.from(new_props.layers).forEach(function(l){ if(layers_colors_max < parseInt(l.number_of_colors)) { layers_colors_max = parseInt(l.number_of_colors);}});
        const too_much_colors_no_vector = Boolean(layers_colors_max > 256);

        const layers_changed = Boolean(layers.map(function(l, i){return i+"_"+l.hidden +"_"+l.opacity+"_"+l.number_of_colors+"_w"+l.thumbnail.width+"-h"+l.thumbnail.height+"-d"+l.thumbnail.drawn}).join("-") !== new_props.layers.map(function(l, i){return i+"_"+l.hidden +"_"+l.opacity+"_"+l.number_of_colors+"_w"+l.thumbnail.width+"-h"+l.thumbnail.height+"-d"+l.thumbnail.drawn}).join("-"));
        const view_name_changed = Boolean(view_name_index !== new_props.view_name_index);
        const something_changed_in_view = Boolean(Boolean(new_props.should_update || should_update) && Boolean(
            layers_changed ||
            select_mode+"" !== new_props.select_mode+"" ||
            Boolean(too_much_colors_no_vector) !== Boolean(this.st4te.too_much_colors_no_vector) ||
            parseInt(previous_view_name_index) !== parseInt(new_props.previous_view_name_index) ||
            parseInt(layer_index) !== parseInt(new_props.layer_index) ||
            Boolean(is_image_import_mode) !==  Boolean(new_props.is_image_import_mode) ||
            Boolean(hide_canvas_content) !==  Boolean(new_props.hide_canvas_content) ||
            Boolean(show_original_image_in_background) !==  Boolean(new_props.show_original_image_in_background) ||
            Boolean(show_transparent_image_in_background) !==  Boolean(new_props.show_transparent_image_in_background) ||
            Boolean(can_undo) !==  Boolean(new_props.can_undo) ||
            Boolean(can_redo) !==  Boolean(new_props.can_redo) ||
            current_color+"" !== new_props.current_color+"" ||
            second_color+"" !== new_props.second_color+"" ||
            tool+"" !== new_props.tool+"" ||
            parseInt(width) !== parseInt(new_props.width) ||
            parseInt(height) !== parseInt(new_props.height) ||
            Boolean(pencil_mirror_mode) !== Boolean(new_props.pencil_mirror_mode) ||
            Boolean(is_something_selected) !== Boolean(new_props.is_something_selected) ||
            parseInt(import_size) !== parseInt(new_props.import_size) ||
            (import_colorize | 0) !== (new_props.import_colorize | 0) ||
            Math.round(filters_preview_progression * 10) !== Math.round(new_props.filters_preview_progression * 10)
        ));

        if(must_compute_filter) {

            this.compute_filters_preview();
        }

        this.setSt4te({...new_props, ...props_override, slider_value: parseFloat(new_props.slider_value), too_much_colors_no_vector}, () => {

            if(something_changed_in_view) {

                this.update_cache_view(null, true);
            }else if(view_name_changed) {

                this.forceUpdate();
            }
        });
    }

    compute_filters_preview = () => {

        try {
            this.setSt4te({_filters_changed: true}, () => {

                this.st4te.canvas.compute_filters_preview();
            });
        } catch (e) {}
    };

    _text_to_new_layer = () => {

        this.props.on_request_draw_text();
    };

    _to_filter = (name) => {

        this.st4te.canvas.to_filter(name, this.st4te.slider_value);
        if(!this.is_mobile) {
            this.compute_filters_preview();
        }
    };

    get_action_panel_names = () => {

        return PANEL_NAMES;
    };

    get_action_panel_cache = (name) => {

        return this._cache[name];
    };

    _set_list_subheader_collapse = (name) => {

        this.setSt4te({_list_sub_header_opened: (this.st4te._list_sub_header_opened && this.st4te._list_sub_header_opened === name) ? "": name}, () => {

            this.update_cache_view(null, true);
        });
    };

    _get_list_sub_header_content_scarlett = (name, tutorial) => {

        const _list_sub_header_opened = this.st4te._list_sub_header_opened;
        const classes = this.st4te.classes;
       return <React.Fragment>
                <Collapse className={classes.listSubHeaderCollapse} in={_list_sub_header_opened === name}>
                    <p className={classes.listSubHeaderDescription}>{tutorial}</p>
                </Collapse>
                {_list_sub_header_opened === name &&
                    <div className={classes.listSubHeaderVideo}>
                        <video id="upload-video" width="150" height="150" style={{aspectRatio: "1", transform: "translateZ(10px)"}} autoPlay>
                            <source src={"/src/videos/"+name+".mp4"} type="video/mp4"/>
                        </video>
                        <div className={classes.listSubHeaderVideoOverlay}></div>
                        <div className={classes.listSubHeaderVideoFade}></div>
                    </div>}
               <IconButton className={classes.listSubHeaderToggle} onClick={() => {this._set_list_subheader_collapse(name)}}>
                   {_list_sub_header_opened === name ? <CloseIcon/>: <InfoOutlined/>}
               </IconButton>
            </React.Fragment>;
    };

    get_before_action_panel = (index) => {

        const {
            classes,
            canvas,
            _anchor_el,
            layers,
            layer_index,
            _previous_layer_index,
            current_color,
            second_color,
            slider_value,
            width,
            height,
            _saturation,
            _luminosity,
            _opacity,
            _layer_opened,
            import_size,
            import_colorize,
            _list_sub_header_opened
        } = this.st4te;

        let colors = [];
        for (let i = 1; i <= 128; i++) {

            colors.push(color_conversion.to_hex_from_rgba(color_conversion.to_rgba_from_hsla(Array.of((i / 128) * 360, _saturation, _luminosity, _opacity))));
        }

        const [r_1, g_1, b_1] = current_color === "#ffffff" ? [196, 196, 196] : color_conversion.to_rgba_from_hex(current_color);
        const is_current_color_dark = r_1 + g_1 + b_1 < 152 * 3;

        const [r_2, g_2, b_2] = second_color === "#ffffff" ? [196, 196, 196] : color_conversion.to_rgba_from_hex(second_color);
        const is_second_color_dark = r_2 + g_2 + b_2 < 152 * 3;

        const panel_names = this.get_action_panel_names();

        switch (panel_names[index]) {
            case "layers":
                return (
                    <div key={"layers-layers-main"} className={`swipetoolbox_i_${index}_${0}`}>
                        <ListSubheader className={classes.listSubHeader} onClick={() => {this._scroll_to_id(`swipetoolbox_i_${index}_${0}`)}}>
                            <span><AllLayersIcon/></span>
                            <span>All layers</span>
                        </ListSubheader>
                        <div key={"layers-wrapper-index-"+index}>
                            {Array.from(layers).reverse().map((layer, index2, array) => {

                                const index_reverse_order = (array.length - 1) - index2;
                                if (typeof layer.colors === "undefined") {
                                    return null;
                                }

                                return (
                                    <div key={"layers-list-item-n-"+index_reverse_order}>
                                        <ListItem
                                            divider
                                            className={layer_index === index_reverse_order ? classes.layerSelected : null}
                                            button
                                            onClick={() => this._change_active_layer(index_reverse_order)}>
                                            <ListItemAvatar>
                                                <canvas
                                                    className={"pixelated " + classes.layerThumbnail + " " + index}
                                                    ref={(el) => {this._set_canvas_ref(el, layer.thumbnail, true)}}
                                                    key={"layer-n-"+index_reverse_order+"-w-"+layer.thumbnail.width+"-h-"+layer.thumbnail.height}
                                                    width={layer.thumbnail.width || 0}
                                                    height={layer.thumbnail.height || 0}
                                                    style={{background: `repeating-conic-gradient(rgb(248 248 248 / 100%) 0% 25%, rgb(224 224 224 / 100%) 0% 50%) left top 50% / calc(200% / ${width}) calc(200% / ${height})`}}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText primary={layer.name}/>
                                            <ExpandMoreIcon
                                                className={_layer_opened && layer_index === index_reverse_order ? classes.flipExpandMoreIcon : classes.expandMoreIcon}/>
                                        </ListItem>
                                        {
                                            (layer_index === index_reverse_order || _previous_layer_index === index_reverse_order) &&
                                            <Collapse timeout={{appear: 250, enter: 250, exit: 250}}
                                                      in={_layer_opened && layer_index === index_reverse_order}
                                                      className={classes.layerSelected}>
                                                <div style={{padding: "12px 0px 12px 32px"}}>
                                                    <span>Colours: ({layer.colors.length}/{layer.number_of_colors})</span>
                                                    <PixelColorPalette
                                                        key={"layer-n-"+index+"-color-palette"}
                                                        transparent={true}
                                                        padding="12px 0px"
                                                        size={32}
                                                        gap="8px"
                                                        colors={layer.colors}
                                                        selected_colors={Array.of(current_color)}
                                                        onColorClick={(event, color) => {
                                                            this._handle_current_color_change(color)
                                                        }}
                                                    />
                                                    {
                                                        layer.colors.length >= 2 ?
                                                            <div style={{padding: "12px 0px"}}>
                                                                <Button color="primary"
                                                                        onClick={() => this._less_colors_stepped(1)}>...Less
                                                                    colors</Button>
                                                            </div>
                                                            : null
                                                    }
                                                </div>
                                                <Divider style={{marginLeft: 24}}/>
                                                <div style={{padding: "12px 0px 12px 32px"}}>
                                                    <span>Actions:</span>
                                                    <div style={{padding: "12px 0px"}}>
                                                        <Button color="primary" onClick={() => {
                                                            canvas.current_layer_up()
                                                        }}>UP</Button>
                                                        <Button color="primary" onClick={() => {
                                                            canvas.current_layer_down()
                                                        }}>DOWN</Button>
                                                        <Button color="primary" onClick={() => {
                                                            canvas.toggle_layer_visibility(layer_index)
                                                        }}>{(layers[layer_index] || {}).hidden ? `SHOW` : `HIDE`}</Button>
                                                        <Button color="primary" onClick={() => {
                                                            canvas.change_layer_opacity(layer_index, slider_value)
                                                        }}>{`OPACITY: ${(layers[layer_index] || {}).opacity} -> ${slider_value}`}</Button>
                                                    </div>
                                                </div>
                                            </Collapse>
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            case "palette":
                return (
                    <div key={"palette-palette-main"} className={`swipetoolbox_i_${index}_${0}`}>
                        <Menu
                            className={classes.menu}
                            anchorEl={_anchor_el}
                            keepMounted
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
                                        color: is_current_color_dark ? "white" : "black",
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
                            padding="12px 16px 24px 24px"
                            gap="0px"
                            align="left"
                            colors={colors}
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
            case "image":
                return (
                    <div key={"image-image-upload"} className={`swipetoolbox_i_${index}_${0}`}>
                        <ListSubheader className={classes.listSubHeader} onClick={() => {this._scroll_to_id(`swipetoolbox_i_${index}_${0}`)}} active={_list_sub_header_opened === "upload"}>
                            <span className={"list-sub-header-main-text"}>
                                <span><ImportIcon/></span>
                                <span>Upload</span>
                            </span>
                            {this._get_list_sub_header_content_scarlett("upload", "Define a size before uploading an image from the library or your device, this size will be the one used in the laboratory, but before! You can optionally define a retouching setting by artificial intelligence of your starting image, you can enlarge, colorize or even do both at the same time! That's how it's done to open an image in the lab, have fun.")}
                        </ListSubheader>
                        <div className={"image " + classes.listItems}>
                            <input
                                accept="image/jpg, image/jpeg, image/png, image/svg, image/webp, image/gif"
                                style={{display: "none"}}
                                id={`button-file-drawer-upload-key-${(layers[layer_index] || {}).hash}`}
                                key={`input-button-file-drawer-upload-key-${(layers[layer_index] || {}).hash}`}
                                type="file"
                                onChange={this._upload_image}
                            />
                            <ListItem component="label" button
                                      key={`list-item-button-file-drawer-upload-key-${(layers[layer_index] || {}).hash}`}
                                      htmlFor={`button-file-drawer-upload-key-${(layers[layer_index] || {}).hash}`}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <ImagePlusIcon/>
                                </ListItemIcon>
                                <ListItemText className={classes.ListItemText}
                                              primary={"Open image"} secondary={"[CTRL + O]"}/>
                            </ListItem>
                            <ListItem button onClick={() => {
                                this._upload_image_from_library()
                            }}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <ImagePlusIcon/>
                                </ListItemIcon>
                                <ListItemText className={classes.ListItemText}
                                              primary={"Library to new"} secondary={""}/>
                            </ListItem>
                        </div>
                        <div className={"image " + classes.listItems}>
                            <div style={{
                                padding: "8px 24px",
                                position: "relative",
                                overflow: "hidden",
                                boxSizing: "border-box",
                                width: "100%"
                            }}>
                                <Typography id="size-slider" gutterBottom>RESIZE NEW IMAGE TO : </Typography>
                                <Slider defaultValue={import_size} step={8} valueLabelDisplay="auto" min={0}
                                        max={import_size > 512 ? import_size : 512}
                                        onChangeCommitted={this._set_import_size}
                                        aria-labelledby="size-slider"/>
                            </div>
                        </div>
                        <FormLabel style={{padding: "24px 0px 12px 24px"}} component="legend">AI TUNING BEFORE
                            IMPORT</FormLabel>
                        <div className={"image " + classes.listItems}>
                            <RadioGroup row name="Colorize" onChange={this._set_import_colorize}
                                        key={"colorize-mode-n-"+import_colorize}
                                        value={import_colorize} style={{padding: "12px 0px", margin: "0px 11px"}}>
                                <FormControlLabel
                                    value={"0"}
                                    control={<Radio color="primary"/>}
                                    label="NONE"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value={"1"}
                                    control={<Radio color="primary"/>}
                                    label="COLOR"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value={"2"}
                                    control={<Radio color="primary"/>}
                                    label="SCALE"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value={"3"}
                                    control={<Radio color="primary"/>}
                                    label="BOTH"
                                    labelPlacement="bottom"
                                />
                            </RadioGroup>
                        </div>
                    </div>
                );
        }
    };

    _set_canvas_ref = (can, bmp, force = false) => {

        if(typeof bmp == "undefined") {return}
        if(typeof bmp.width == "undefined") {return}
        if(force != true && bmp.drawn == true) {return}
        if(typeof can == "undefined") {return}
        if(can == null) {return}
        if(typeof can.width == "undefined") {return}
        if(!can.width) {return}

        let ctx = can.getContext("2d");
        ctx.globalCompositeOperation = "copy"
        ctx.drawImage(bmp, 0, 0);
        bmp.drawn = true;
    };

    get_action_panel = (index) => {

        const {
            canvas,
            classes,
            filters_thumbnail,
            layer_index,
            is_image_import_mode,
            hide_canvas_content,
            show_original_image_in_background,
            show_transparent_image_in_background,
            current_color,
            second_color,
            slider_value,
            tool,
            filters,
            select_mode,
            pencil_mirror_mode,
            is_something_selected,
            _filter_aspect_ratio,
            filters_preview_progression,
            too_much_colors_no_vector,
            _compressed,
            _upscale,
            _vectorized,
        } = this.st4te;

        const _filters_preview_progression_stepped = Math.round(parseFloat(filters_preview_progression / 7) * 7);

        const panel_names = this.get_action_panel_names();

        switch (panel_names[index]) {
            case "palette": return [];
            case "image": return [
                {
                    name: "pixelated",
                    tutorial: "Here are the buttons to download your image in simple size or enlarged so as to have enlarged but still very clear edges!",
                    icon: <DownloadIcon/>,
                    text: "Download pixelated",
                    description: "Simple way to upscale your source file to be sure to have a file that is interpreted correctly with crisp edges.",
                    local_i: 1,
                    label: "matrix",
                    tools: [
                        {
                            icon: <FileDownloadIcon/>,
                            class: classes.animatedDownload,
                            text: "Render (1x size)",
                            sub: "[CTRL + Q]", on_click: () => {
                                this._download_png(1)
                            }
                        },
                        {
                            icon: <FileDownloadIcon/>,
                            class: classes.animatedDownload,
                            text: "Render (2x size)",
                            sub: "Upscale 2x",
                            on_click: () => {
                                this._download_png(2)
                            }
                        },
                        {
                            icon: <FileDownloadIcon/>,
                            class: classes.animatedDownload,
                            text: "Render (4x size)",
                            sub: "Upscale 4x",
                            on_click: () => {
                                this._download_png(4)
                            }
                        },
                        {
                            icon: <FileDownloadIcon/>,
                            class: classes.animatedDownload,
                            text: "Render (6x size)",
                            sub: "Upscale 6x",
                            on_click: () => {
                                this._download_png(6)
                            }
                        },
                        {
                            icon: <FileDownloadIcon/>,
                            class: classes.animatedDownload,
                            text: "Render (8x size)",
                            sub: "Upscale 8x",
                            on_click: () => {
                                this._download_png(8)
                            }
                        },
                        {
                            icon: <FileDownloadIcon/>,
                            class: classes.animatedDownload,
                            text: "Render (12x size)",
                            sub: "[CTRL + S]", on_click: () => {
                                this._download_png(12)
                            }
                        },
                        {
                            icon: <FileDownloadIcon/>,
                            class: classes.animatedDownload,
                            text: "Render (16x size)",
                            sub: "Upscale 16x", on_click: () => {
                                this._download_png(16)
                            }
                        },
                        {
                            icon: <FileDownloadIcon/>,
                            class: classes.animatedDownload,
                            text: "Render (24x size)",
                            sub: "Upscale 24x",
                            on_click: () => {
                                this._download_png(24)
                            }
                        }
                    ]
                },
                {
                    name: "enhanced",
                    tutorial: "Here are the buttons to download your image enlarged, yet having sleek, clean and humanized or rounded edges! It is possible to request a non-raster version of your image, it can be enlarged at will without loss of quality. The other options are provided for the purpose of reducing the size of your incoming file or even enlarging the result by two at most.",
                    icon: <DownloadIcon/>,
                    text: `Download enhanced${too_much_colors_no_vector ? " (Disabled)": ""}`,
                    description: too_much_colors_no_vector ?
                        "It will look like a painting! Yet, we need to have less than 256 colors for each layers because there should be a few shapes to get a beautiful result.":
                        "After 2000's, great minds have found ways to up-scale late 80's pixel art within modern emulators while always being cool and absolutely right. Hey! It can look like a nice painting^^",
                    local_i: 2,
                    label: "vector",
                    tools: [
                        {
                            icon: <FileDownloadIcon/>,
                            class: classes.animatedDownload,
                            text: "Depixelize",
                            sub: "Upscale by 10x using Depixelize",
                            disabled: too_much_colors_no_vector,
                            on_click: () => {
                                this._download_svg("depixelize", _compressed, _vectorized, _upscale)
                            }
                        },
                        {
                            icon: <FileDownloadIcon/>,
                            class: classes.animatedDownload,
                            text: "Omni",
                            sub: "Upscale by 8x using Omniscale",
                            disabled: too_much_colors_no_vector,
                            on_click: () => {
                                this._download_svg("omniscale", _compressed, _vectorized, _upscale)
                            }
                        },
                        {
                            icon: <FileDownloadIcon/>,
                            class: classes.animatedDownload,
                            text: "xBRZ",
                            sub: "Upscale by 6x using xBRZ",
                            disabled: too_much_colors_no_vector,
                            on_click: () => {
                                this._download_svg("xbrz", _compressed, _vectorized, _upscale)
                            }
                        },
                        {
                            icon: <FileDownloadIcon/>,
                            class: classes.animatedDownload,
                            text: "hqNx",
                            sub: "Upscale by 4x using hqNx",
                            disabled: too_much_colors_no_vector,
                            on_click: () => {
                                this._download_svg("hqnx", _compressed, _vectorized, _upscale)
                            }
                        },
                        {
                            icon: <FileDownloadIcon/>,
                            class: classes.animatedDownload,
                            text: "EPX",
                            sub: "Upscale by 4x using EPX",
                            disabled: too_much_colors_no_vector,
                            on_click: () => {
                                this._download_svg("epx", _compressed, _vectorized, _upscale)
                            }
                        },
                        {
                            icon: _compressed ? <CheckedIcon/>: <UncheckedIcon/>,
                            text: "Compressed",
                            sub: "Reduce file weight",
                            disabled: too_much_colors_no_vector,
                            on_click: () => {
                                this._toggle_compressed()
                            }
                        },
                        {
                            icon: _vectorized ? <CheckedIcon/>: <UncheckedIcon/>,
                            text: "Vectorized",
                            sub: "Download an SVG file with it",
                            disabled: too_much_colors_no_vector,
                            on_click: () => {
                                this._toggle_vectorized()
                            }
                        },
                        {
                            icon: _upscale ? <CheckedIcon/>: <UncheckedIcon/>,
                            text: "AI upscale",
                            sub: "Increase resolution by 2x2 for output <= HD",
                            disabled: too_much_colors_no_vector,
                            on_click: () => {
                                this._toggle_upscale()
                            }
                        }
                    ]
                }
            ];
            case "layers": return [
                {
                    icon: <LayerSearchIcon/>,
                    local_i: 1,
                    text: `Layer tools`,
                    label: "tools",
                    tools: [
                        {
                            icon: hide_canvas_content ? <LayerOutlineIcon/> : <LayerOffOutlineIcon/>,
                            text: hide_canvas_content ? "Show canvas content" : "Hide canvas content",
                            on_click: () => {
                                this._show_hide_canvas_content()
                            }
                        },
                        {
                            icon: show_original_image_in_background ? <ImageOffOutlineIcon/> : <ImageOutlineIcon/>,
                            text: show_original_image_in_background ? "Hide bg img" : "Show bg img",
                            on_click: () => {
                                this._show_hide_background_image()
                            }
                        },
                        {
                            icon: show_transparent_image_in_background ? <ImageOffOutlineIcon/> : <ImageOutlineIcon/>,
                            text: show_transparent_image_in_background ? "Hide chessboard" : "Show chessboard",
                            on_click: () => {
                                this._show_hide_transparent_image()
                            }
                        },
                    ]
                },
                {
                    icon: <LayerEditIcon/>,
                    text: `Layer actions`,
                    local_i: 2,
                    label: "actions",
                    tools: [
                        {
                            icon: <LayerAddIcon/>, text: "New layer", on_click: () => {
                                canvas.new_layer(layer_index)
                            }
                        },
                        {
                            icon: <LayerDeleteIcon/>, text: "Delete layer", on_click: () => {
                                canvas.delete_layer(layer_index)
                            }
                        },
                        {
                            icon: <ContentDuplicateIcon/>, text: "Duplicate layer", on_click: () => {
                                canvas.duplicate_layer(layer_index)
                            }
                        },
                        {
                            icon: <MergeIcon/>, text: "Merge down layer", on_click: () => {
                                canvas.merge_down_layer(layer_index)
                            }
                        },
                    ]
                },
                {
                    icon: <ImportIcon/>,
                    text: "Import image",
                    local_i: 3,
                    label: "importing",
                    tools: [
                        /*{
                            icon: <FileImportIcon/>, text: "Text to new layer", sub: "", on_click: () => {
                                this._text_to_new_layer()
                            }
                        },*/
                        {
                            icon: <FileImportIcon/>, text: "Library to import", sub: "", on_click: () => {
                                this._import_image_from_libary()
                            }
                        },
                        {
                            icon: <FileImportIcon/>, text: "Import image", sub: "[CTRL + I]", for: "button-file-dialog-main", on_click: this.props.on_import_image
                        },
                        {
                            icon: <FileImportIcon/>,
                            text: "Confirm import",
                            sub: "[Enter]",
                            disabled: !is_image_import_mode,
                            on_click: () => {
                                canvas.confirm_import()
                            }
                        },
                    ]
                },
            ];
            case "tools": return [
                {
                    icon: <DrawIcon/>,
                    text: "Drawing tools",
                    label: "drawing",
                    local_i: 1,
                    tools: [
                        {
                            icon: <ColorPickerIcon/>,
                            disabled: tool === "PICKER",
                            text: "Picker",
                            sub: "[CTRL (HOLD)]",
                            on_click: () => {
                                this._set_tool("PICKER")
                            }
                        },
                        {
                            icon: <PencilIcon/>,
                            disabled: tool === "PENCIL",
                            text: "Pencil",
                            sub: "[P]",
                            on_click: () => {
                                this._set_tool("PENCIL")
                            }
                        },
                        {
                            icon: <PencilPerfectIcon/>,
                            disabled: tool === "PENCIL PERFECT",
                            text: "Pencil perfect",
                            sub: "[N]",
                            on_click: () => {
                                this._set_tool("PENCIL PERFECT")
                            }
                        },
                        {
                            icon: <MirrorIcon/>,
                            disabled: tool === "SET PENCIL MIRROR",
                            text: "Set pencil mirror",
                            sub: "[M]",
                            on_click: () => {
                                this._set_tool("SET PENCIL MIRROR")
                            }
                        },
                        {
                            icon: <MoveIcon/>,
                            disabled: tool === "MOVE",
                            text: "Move",
                            sub: "Middle mouse click moves it too...",
                            on_click: () => {
                                this._set_tool("MOVE")
                            }
                        },
                    ]
                },
                {
                    icon: <ShapesIcon/>,
                    text: "Shapes tools",
                    label: "shapes",
                    local_i: 2,
                    tools: [
                        {
                            icon: <LineIcon/>, disabled: tool === "LINE", text: "Line", sub: "[L]", on_click: () => {
                                this._set_tool("LINE")
                            }
                        },
                        {
                            icon: <RectangleIcon/>,
                            disabled: tool === "RECTANGLE",
                            text: "Rectangle",
                            sub: "[R]",
                            on_click: () => {
                                this._set_tool("RECTANGLE")
                            }
                        },
                        {
                            icon: <EllipseIcon/>,
                            disabled: tool === "ELLIPSE",
                            text: "Ellipse",
                            sub: "[E]",
                            on_click: () => {
                                this._set_tool("ELLIPSE")
                            }
                        },
                        {
                            icon: <ContourIcon/>,
                            disabled: tool === "CONTOUR",
                            text: "Free path",
                            sub: "[F]",
                            on_click: () => {
                                this._set_tool("CONTOUR")
                            }
                        },
                    ]
                },
                {
                    icon: <PaintIcon/>,
                    text: "Paint tools",
                    label: "basic",
                    local_i: 3,
                    tools: [
                        {
                            icon: <BucketIcon/>,
                            disabled: tool === "BUCKET",
                            text: "Bucket",
                            sub: "[B]",
                            on_click: () => {
                                this._set_tool("BUCKET")
                            }
                        },
                        {
                            icon: <BucketIcon/>,
                            disabled: tool === "HUE BUCKET",
                            text: "Hue bucket",
                            sub: "[H]",
                            on_click: () => {
                                this._set_tool("HUE BUCKET")
                            }
                        },
                        {
                            icon: <PaletteSwatchIcon/>,
                            disabled: tool === "EXCHANGE",
                            text: "Exchange",
                            sub: "[X]",
                            on_click: () => {
                                this._set_tool("EXCHANGE")
                            }
                        },
                        {
                            icon: <BorderBottomIcon/>,
                            disabled: tool === "BORDER",
                            text: "Border",
                            sub: "[U]",
                            on_click: () => {
                                this._set_tool("BORDER")
                            }
                        },
                    ]
                },
                {
                    icon: <MirrorIcon/>,
                    text: "Set pencil mirrors",
                    label: "mirror",
                    local_i: 4,
                    tools: [
                        {
                            icon: <MirrorIcon/>,
                            disabled: pencil_mirror_mode === "NONE",
                            text: "None",
                            on_click: () => {
                                this._set_pencil_mirror_mode("NONE")
                            }
                        },
                        {
                            icon: <MirrorIcon/>,
                            disabled: pencil_mirror_mode === "VERTICAL",
                            text: "Vertical",
                            on_click: () => {
                                this._set_pencil_mirror_mode("VERTICAL")
                            }
                        },
                        {
                            icon: <MirrorIcon/>,
                            disabled: pencil_mirror_mode === "HORIZONTAL",
                            text: "Horizontal",
                            on_click: () => {
                                this._set_pencil_mirror_mode("HORIZONTAL")
                            }
                        },
                        {
                            icon: <MirrorIcon/>,
                            disabled: pencil_mirror_mode === "BOTH",
                            text: "Both",
                            on_click: () => {
                                this._set_pencil_mirror_mode("BOTH")
                            }
                        },
                    ]
                },
            ];
            case "selection": return [
                {
                    icon: <SelectCompareIcon/>,
                    text: "Select mode",
                    local_i: 0,
                    label: "mode",
                    tools: [
                        {
                            icon: <SelectRemoveDifferenceIcon/>,
                            disabled: select_mode === "REMOVE",
                            text: "Select remove",
                            sub: "[CTRL (HOLD)]",
                            on_click: () => {
                                this._set_select_mode("REMOVE")
                            }
                        },
                        {
                            icon: <SelectAddIcon/>,
                            disabled: select_mode === "ADD",
                            text: "Select add",
                            sub: "[SHIFT (HOLD)]",
                            on_click: () => {
                                this._set_select_mode("ADD")
                            }
                        },
                        {
                            icon: <SelectIcon/>,
                            disabled: select_mode === "REPLACE",
                            text: "Select replace",
                            on_click: () => {
                                this._set_select_mode("REPLACE")
                            }
                        },
                    ]
                },
                {
                    icon: <SelectInImageIcon/>,
                    text: "Select tool",
                    label: "selecting",
                    local_i: 1,
                    tools: [
                        {
                            icon: <SelectIcon/>,
                            disabled: tool === "SELECT PATH",
                            text: "Select path",
                            sub: "[CTRL + F]",
                            on_click: () => {
                                this._set_tool("SELECT PATH")
                            }
                        },
                        {
                            icon: <SelectColorIcon/>,
                            disabled: tool === "SELECT COLOR",
                            text: "Select color",
                            sub: "[CTRL + G]",
                            on_click: () => {
                                this._set_tool("SELECT COLOR")
                            }
                        },
                        {
                            icon: <MagicIcon/>,
                            disabled: tool === "SELECT COLOR THRESHOLD",
                            text: "Select color threshold",
                            sub: "[CTRL + K]",
                            on_click: () => {
                                this._set_tool("SELECT COLOR THRESHOLD")
                            }
                        },
                        {
                            icon: <SquareSmallIcon/>,
                            disabled: tool === "SELECT PIXEL",
                            text: "Select pixel",
                            sub: "[CTRL + P]",
                            on_click: () => {
                                this._set_tool("SELECT PIXEL")
                            }
                        },
                        {
                            icon: <SquareSmallIcon/>,
                            disabled: tool === "SELECT PIXEL PERFECT",
                            text: "Select pixel perfect",
                            sub: "[CTRL + N]",
                            on_click: () => {
                                this._set_tool("SELECT PIXEL PERFECT")
                            }
                        },
                        {
                            icon: <SelectIcon/>,
                            disabled: tool === "SELECT LINE",
                            text: "Select line",
                            sub: "[CTRL + L]",
                            on_click: () => {
                                this._set_tool("SELECT LINE")
                            }
                        },
                        {
                            icon: <SelectionRectangleIcon/>,
                            disabled: tool === "SELECT RECTANGLE",
                            text: "Select rectangle",
                            sub: "[CTRL + R]",
                            on_click: () => {
                                this._set_tool("SELECT RECTANGLE")
                            }
                        },
                        {
                            icon: <SelectionEllipseIcon/>,
                            disabled: tool === "SELECT ELLIPSE",
                            text: "Select ellipse",
                            sub: "[CTRL + E]",
                            on_click: () => {
                                this._set_tool("SELECT ELLIPSE")
                            }
                        },
                    ]
                },
                {
                    icon: <ImageMoveIcon/>,
                    text: "Apply to selection",
                    label: "applying",
                    local_i: 2,
                    tools: [
                        {
                            icon: <SelectInImageIcon/>,
                            disabled: !is_something_selected,
                            text: "Shrink",
                            on_click: () => {
                                canvas.to_selection_size(-1)
                            }
                        },
                        {
                            icon: <SelectInImageIcon/>,
                            disabled: !is_something_selected,
                            text: "Grow",
                            on_click: () => {
                                canvas.to_selection_size(1)
                            }
                        },
                        {
                            icon: <BorderBottomIcon/>,
                            disabled: !is_something_selected,
                            text: "Border",
                            on_click: () => {
                                canvas.to_selection_border()
                            }
                        },
                        {
                            icon: <BucketIcon/>, disabled: !is_something_selected, text: "Bucket", on_click: () => {
                                canvas.to_selection_bucket()
                            }
                        },
                        {
                            icon: <SelectInImageIcon/>,
                            disabled: !is_something_selected,
                            text: "Crop",
                            on_click: () => {
                                canvas.to_selection_crop()
                            }
                        },
                        {
                            icon: <SelectInvertIcon/>,
                            disabled: !is_something_selected,
                            text: "Invert",
                            on_click: () => {
                                canvas.to_selection_invert()
                            }
                        },
                        {
                            icon: <SelectRemoveDifferenceIcon/>,
                            disabled: !is_something_selected,
                            text: "Unselect",
                            on_click: () => {
                                canvas.to_selection_none()
                            }
                        },
                        {
                            icon: <CopyIcon/>, disabled: !is_something_selected, text: "Copy", on_click: () => {
                                canvas.copy_selection()
                            }
                        },
                        {
                            icon: <CutIcon/>, disabled: !is_something_selected, text: "Cut", on_click: () => {
                                canvas.cut_selection()
                            }
                        },
                        {
                            icon: <EraserIcon/>, disabled: !is_something_selected, text: "Erase", on_click: () => {
                                canvas.erase_selection()
                            }
                        },
                        {
                            icon: <BucketIcon/>,
                            disabled: !is_something_selected,
                            text: "Colorize dynamical",
                            on_click: () => {
                                canvas.to_selection_changes(current_color, false)
                            }
                        },
                        {
                            icon: <SelectColorIcon/>,
                            disabled: !is_something_selected,
                            text: "Get average color",
                            on_click: () => {
                                this._get_average_color_of_selection()
                            }
                        },
                        {
                            icon: <SelectColorIcon/>,
                            disabled: !is_something_selected,
                            text: "Luminance +10",
                            on_click: () => {
                                canvas._selection_pxl_adjust_sat_lum(0, 10);
                            }
                        },
                        {
                            icon: <SelectColorIcon/>,
                            disabled: !is_something_selected,
                            text: "Luminance -10",
                            on_click: () => {
                                canvas._selection_pxl_adjust_sat_lum(0, -10);
                            }
                        },
                        {
                            icon: <SelectColorIcon/>,
                            disabled: !is_something_selected,
                            text: "Saturation +10",
                            on_click: () => {
                                canvas._selection_pxl_adjust_sat_lum(10, 0);
                            }
                        },
                        {
                            icon: <SelectColorIcon/>,
                            disabled: !is_something_selected,
                            text: "Saturation -10",
                            on_click: () => {
                                canvas._selection_pxl_adjust_sat_lum(-10, 0);
                            }
                        },
                    ]
                },
            ];
            case "effects": return [
                {
                    icon: <ImageEffectIcon/>,
                    text: "Effects",
                    label: "primary",
                    local_i: 0,
                    tools: [
                        {
                            icon: <ImageSmoothIcon/>, text: "Smooth", sub: "Run smooth effect once", on_click: () => {
                                canvas.smooth_adjust(1);
                                this._handle_action_close();
                            }
                        },
                        {
                            icon: <ContrastCircleIcon/>,
                            text: "To auto contrast",
                            sub: "Effect strength have an impact",
                            on_click: () => {
                                canvas.auto_adjust_contrast(slider_value);
                                this._handle_action_close();
                            }
                        },
                        {
                            icon: <ContrastCircleIcon/>,
                            text: "To auto saturation",
                            sub: "Effect strength have an impact",
                            on_click: () => {
                                canvas.auto_adjust_saturation(slider_value);
                                this._handle_action_close();
                            }
                        },
                        {
                            icon: <ImageVignetteIcon/>,
                            text: "To vignette",
                            sub: "Current color and effect strength have an impact",
                            on_click: () => {
                                canvas.to_vignette(current_color, slider_value);
                                this._handle_action_close();
                            }
                        },
                        {
                            icon: <LessColorIcon/>,
                            text: "Less colors by strength",
                            sub: "Effect strength have an impact",
                            on_click: () => {
                                canvas.to_less_color(slider_value / 5);
                                this._handle_action_close();
                            }
                        },
                        {
                            icon: <LessColorIcon/>,
                            text: "Less colors by small steps",
                            sub: "Remove colors slowly",
                            on_click: () => {
                                this._less_colors_stepped();
                                this._handle_action_close();
                            }
                        },
                        {
                            icon: <LessColorAutoIcon/>,
                            text: "Less colors auto",
                            sub: "Apply to current layer",
                            on_click: () => {
                                canvas.to_less_color("auto");
                                this._handle_action_close();
                            }
                        },
                        {
                            icon: <DutoneIcon/>,
                            text: "To dutone",
                            sub: "Current color and effect strength have an impact",
                            on_click: () => {
                                canvas.to_dutone(slider_value, second_color, current_color);
                                this._handle_action_close();
                            }
                        },
                        {
                            icon: <ColorizedIcon/>,
                            text: "To colorized",
                            sub: "Current color and effect strength have an impact",
                            on_click: () => {
                                this._colorize();
                                this._handle_action_close();
                            }
                        },
                        {
                            icon: <AlphaIcon/>,
                            text: "To alpha",
                            sub: "Current color and effect strength have an impact",
                            on_click: () => {
                                canvas.to_alpha(current_color, slider_value);
                                this._handle_action_close();
                            }
                        },
                        {
                            icon: <SwapVerticalIcon/>,
                            text: "Mirror vertical",
                            sub: "Apply to current layer",
                            on_click: () => {
                                canvas.to_mirror(false);
                                this._handle_action_close();
                            }
                        },
                        {
                            icon: <SwapHorizontalIcon/>,
                            text: "Mirror horizontal",
                            sub: "Apply to current layer",
                            on_click: () => {
                                canvas.to_mirror(true);
                                this._handle_action_close();
                            }
                        },
                        {
                            icon: <RotateRightIcon/>, text: "Rotate 90°", sub: "Apply to all layers", on_click: () => {
                                canvas.to_rotation(true);
                                this._handle_action_close();
                            }
                        },
                        {
                            icon: <RotateLeftIcon/>, text: "Rotate - 90°", sub: "Apply to all layers", on_click: () => {
                                canvas.to_rotation(false);
                                this._handle_action_close();
                            }
                        }
                    ]
                }
            ];
            case "filters":
                const {height, width} = filters_thumbnail.get(filters[0]) || {};
                return [
                    {
                        icon: <ImageFilterMagicIcon/>,
                        progression: _filters_preview_progression_stepped,
                        text: `Filters`,
                        style: {position: "relative"},
                        label: "primary",
                        local_i: 0,
                        sub: "The strength selected matters meanwhile preview are only shown at 100% intensity. To cancel any operation, use 'undo'.",
                        tools: filters.map((name, name_index) => {


                            const bmp = filters_thumbnail.get(name) || {};
                            return {
                                style: {position: "relative", width: "100%", height: "100%" },
                                icon: <canvas
                                    className={"pixelated"}
                                    ref={(el) => {this._set_canvas_ref(el, bmp, true)}}
                                    width={width || 1}
                                    height={height || 1}
                                    style={{ zIndex: "-1", aspectRatio: _filter_aspect_ratio, boxSizing: "border-box", height: "100%", minWidth: "100%", width: 128, boxShadow: "0px 1px 2px #3729c1a8", border: "4px solid #020529", borderRadius: 2, contain: "paint style size"}}
                                    key={"name-" + name + "-ratio-" + _filter_aspect_ratio + "-over-" + (bmp.width || 0)+"" + "x" + (bmp.height || 0)+""}
                                />,
                                text: name,
                                text_style: {
                                    flex: "1 1",
                                    bottom: 16,
                                    left: 8,
                                    width: "100%",
                                    right: 24,
                                    color: "white",
                                    padding: 8,
                                    borderBottomLeftRadius: "4px",
                                    borderBottomRightRadius: "4px",
                                    textAlign: "initial",
                                    zIndex: 1,
                                    wordBreak: "break-word",
                                    position: "absolute",
                                    margin: "-16px -12px -12px -8px",
                                    boxSizing: "border-box",
                                },
                                on_click: () => {
                                    this._to_filter(name);
                                    this._handle_action_close();
                                }
                            };
                        })
                    },
                ];
            default: return [];
        }
    };

    canvas_set_size = () => {

        this.st4te.canvas._set_size(this.st4te._slider_value_width, this.st4te._slider_value_height);
    };

    get_after_action_panel = (index) => {

        const {
            classes,
            _slider_value_width,
            _slider_value_height
        } = this.st4te;

        const panel_names = this.get_action_panel_names();

        switch (panel_names[index]) {
            case "image": return (
                <div key={"image-image-create"} className={`swipetoolbox_i_${index}_${3}`}>
                    <ListSubheader className={classes.listSubHeader} onClick={() => {this._scroll_to_id(`swipetoolbox_i_${index}_${3}`)}}>
                        <span className={"list-sub-header-main-text"}>
                            <span><ImagePlusIcon/></span>
                            <span>Create new</span>
                        </span>
                        {this._get_list_sub_header_content_scarlett("create", "This is where you can create a new transparent canvas of any size you want. This is how it's done, have fun!")}
                    </ListSubheader>
                    <div style={{
                        padding: "8px 24px",
                        position: "relative",
                        overflow: "hidden",
                        boxSizing: "border-box",
                        width: "100%"
                    }}>
                        <Typography id="width-slider" gutterBottom>Width</Typography>
                        <Slider defaultValue={_slider_value_width} step={1} valueLabelDisplay="auto" min={0}
                                max={512} key={"slider-width-"+_slider_value_width}
                                onChangeCommitted={this._set_width_from_slider}
                                aria-labelledby="width-slider"/>
                        <Typography id="height-slider" gutterBottom>Height</Typography>
                        <Slider defaultValue={_slider_value_height} step={1} valueLabelDisplay="auto" min={0}
                                max={512} key={"slider-height-"+_slider_value_height}
                                onChangeCommitted={this._set_height_from_slider}
                                aria-labelledby="height-slider"/>
                        <Typography id="confirm-slider" gutterBottom>Confirm</Typography>
                        <Button fullWidth textPrimary onClick={() => {this.canvas_set_size()}} >Create my new canvas</Button>
                    </div>
                </div>
            );
        }
    };

    _rgba_from_hex = (hex) => {

        const { get_rgba_from_hex } = this.st4te.canvas;

        if(!Boolean(get_rgba_from_hex)) { return [0, 0, 0, 0] }

        return get_rgba_from_hex(hex);
    };

    _download_png = (scale) => {

        if(this.props.on_download_image) {

            this.props.on_download_image(scale);
        }
    };

    _toggle_compressed = () => {

        this.setSt4te({_compressed: !this.st4te._compressed}, () => {

            this.update_cache_view(null, true);
        });
    }

    _toggle_upscale = () => {

        this.setSt4te({_upscale: !this.st4te._upscale}, () => {

            this.update_cache_view(null, true);
        });
    }

    _toggle_vectorized = () => {

        this.setSt4te({_vectorized: !this.st4te._vectorized}, () => {

            this.update_cache_view(null, true);
        });
    }

    _download_svg = (using = "xbrz", optimize_render_size = false, download_svg = false, maybe_upscale_with_ai = false) => {

        if(this.props.on_download_svg) {

            this.props.on_download_svg(using, optimize_render_size, download_svg, maybe_upscale_with_ai);
        }
    };

    _less_colors_stepped = (increase = 1) => {

        const { _less_colors_stepped } = this.st4te.canvas;
        _less_colors_stepped(increase)
    };

    _colorize = () => {

        const { current_color, slider_value } = this.st4te;
        const { to_color } = this.st4te.canvas;

        const [h, s, l, o] = color_conversion.to_hsla_from_rgba(color_conversion.to_rgba_from_hex(current_color));

        to_color(h, slider_value, s === 0 ? null: s, l === 0 ? null: l);
    }

    _import_image_from_libary = () => {

        if(this.props.on_import_image_library) {

            this.props.on_import_image_library();
        }
    };

    _upload_image = (event) => {

        if(this.props.on_upload_image) {

            this.props.on_upload_image(event);
        }
    };

    _upload_image_from_library = () => {

        if(this.props.on_upload_image_library) {

            this.props.on_upload_image_library();
        }
    };

    _handle_current_color_change = (color) => {

        if(this.props.on_current_color_change) {

            this.props.on_current_color_change(color);
        }
    };

    _handle_view_name_change = (view_name_index, previous_name_index = null) => {

        if(this.props.on_view_name_change) {

            this.props.on_view_name_change(view_name_index, previous_name_index);
        }
    };

    _handle_color_menu_open = (event) => {

        this.setSt4te({_anchor_el: event.currentTarget}, () => {

            this.update_cache_view(null, true);
        });
    };

    _handle_color_menu_close = () => {

        this.setSt4te({_anchor_el: null}, () => {

            this.update_cache_view(null, true);
        });
    };

    _set_saturation_from_slider = (event, value) => {

        this.setSt4te({_saturation: value}, () => {

            this.update_cache_view(null, true);
        });
    };

    _set_luminosity_from_slider = (event, value) => {

        this.setSt4te({_luminosity: value}, () => {

            this.update_cache_view(null, true);
        });
    };

    _set_opacity_from_slider = (event, value) => {

        this.setSt4te({_opacity: value}, () => {

            this.update_cache_view(null, true);
        });
    };

    _set_tool = (name) => {

        if(this.props.set_tool) {

            this.props.set_tool(name);
        }
    }

    _set_select_mode = (mode) => {

        if(this.props.set_select_mode) {

            this.props.set_select_mode(mode);
        }
    }

    _set_pencil_mirror_mode = (mode) => {

        if(this.props.set_pencil_mirror_mode) {

            this.props.set_pencil_mirror_mode(mode);
        }
    }

    _switch_with_second_color = () => {

        if(this.props.switch_with_second_color) {

            this.props.switch_with_second_color();
        }
    };

    _show_hide_canvas_content = () => {

        if(this.props.show_hide_canvas_content) {

            this.props.show_hide_canvas_content();
        }
    }

    _show_hide_background_image = () => {

        if(this.props.show_hide_background_image) {

            this.props.show_hide_background_image();
        }
    }

    _show_hide_transparent_image = () => {

        if(this.props.show_hide_transparent_image) {

            this.props.show_hide_transparent_image();
        }
    }

    _set_width_from_slider = (event, value) => {

        if(this.props.set_width_from_slider) {

            this.props.set_width_from_slider(event, value);
        }
    };

    _set_height_from_slider = (event, value) => {

        if(this.props.set_height_from_slider) {

            this.props.set_height_from_slider(event, value);
        }
    };

    _set_import_size = (event, value) => {

        if(this.props.set_import_size) {

            this.props.set_import_size(event, value);
        }
    };

    _set_import_colorize = (event) => {

        if(this.props.set_import_colorize) {

            this.props.set_import_colorize(event);
        }
    };

    _get_average_color_of_selection = () => {

        const { get_average_color_of_selection } = this.st4te.canvas;
        const color = get_average_color_of_selection();

        this._handle_current_color_change(color);
    };

    _change_active_layer = (index) => {

        const { layer_index, _layer_opened } = this.st4te;
        const { change_active_layer } = this.st4te.canvas;

        if(layer_index !== index) {

            if(_layer_opened) {

                this.setSt4te({_layer_opened: false}, () => {

                    this.update_cache_view(null, true);
                });
            }

            change_active_layer(index);
        }else {

            this.setSt4te({_layer_opened: !_layer_opened}, () => {

                this.update_cache_view(null, true);
            });
        }
    };

    _handle_action_close = () => {

        if(this.props.onActionClose) {

            this.props.onActionClose();
        }
    };

    update_cache_view = (name, force_update) => {

        const {
            classes,
            canvas,
            view_name_index,
            too_much_colors_no_vector,
            filters_preview_progression
        } = this.st4te;

        const _list_sub_header_opened = this.st4te._list_sub_header_opened;
        const names = this.get_action_panel_names();
        const _filters_preview_progression_stepped = Math.round(parseFloat(filters_preview_progression / 7) * 7);
        const index = name ? names.indexOf(name): view_name_index;
        name = names[index];

        this._cache[name] = (
            <List key={name} style={{willChange: (Boolean(parseInt(_filters_preview_progression_stepped) === 0 || name !== "filters") ? "": "contents")+"", minHeight: "100%", contain: "style layout paint", overflow: "visible", paddingTop: 0}}>

                {this.get_before_action_panel(index)}

                {
                    this.get_action_panel(index).map((action_set) => {
                        return (
                            <div key={name + "-" + action_set.label + "-" + action_set.text.toLowerCase() + "-wrapper"} className={`swipetoolbox_i_${index}_${action_set.local_i}`}>
                                <ListSubheader className={classes.listSubHeader} onClick={() => {this._scroll_to_id(`swipetoolbox_i_${index}_${action_set.local_i}`)}}>
                                    <span className={"list-sub-header-main-text"}>
                                        <span>{action_set.icon}</span>
                                        <span>{action_set.text}</span>
                                    </span>
                                    {action_set.tutorial && this._get_list_sub_header_content_scarlett(action_set.name, action_set.tutorial)}
                                    {Boolean(action_set.progression) &&
                                        <LinearProgress
                                            color="primary"
                                            variant="determinate"
                                            role="progressbar" aria-valuenow={action_set.progression} aria-valuemin="0" aria-valuemax="100"
                                            aria-label={`main-progressbar-${action_set.text}`}
                                            className={classes.linearProgress}
                                            value={parseInt(action_set.progression) % 100} />
                                    }
                                </ListSubheader>
                                {(action_set.description || null) && <p className={classes.info} style={{margin: "24px 32px"}}>{action_set.description}</p>}
                                {
                                    Boolean(Boolean(name === "filters" || action_set.label === "vector") && too_much_colors_no_vector) ?
                                        <ListItem classes={{root: classes.relevantTextBlue}} button={name !== "filters"} onClick={() => {canvas.to_less_color("auto")}}>
                                            <ListItemIcon><LessColorAutoIcon className={classes.listItemIcon} /></ListItemIcon>
                                            <ListItemText primary="Auto reduce color palette" secondary={"May you need less color in your palette?"} />
                                        </ListItem>: Boolean(name === "filters") ?
                                            <blockquote className={classes.info}>DID YOU KNOW? Just double-tap/right-click around the drawing area to open a context menu with shortcuts including some to adjust saturation and contrast like a professional...</blockquote>: null
                                }
                                {
                                    Boolean(name === "filters" ) &&
                                    <ListItem button={true} onClick={this.compute_filters_preview}>
                                        <ListItemIcon><TimeIcon className={classes.listItemIcon} /></ListItemIcon>
                                        <ListItemText primary="Refresh filter previews" />
                                    </ListItem>
                                }
                                <div className={name + " " + classes.listItems}
                                     key={name + "-" + action_set.label + "-" + action_set.text.toLowerCase() + "-inner"}
                                     style={Object.assign({
                                         flexWrap: "wrap",
                                         alignContent: "stretch",
                                         flexDirection: "row",
                                         justifyContent: "flex-start",
                                     }, Boolean(action_set.text.toLowerCase().includes("filter")) ? {padding: "0px !important", margin: "8px !important"}: {})}>
                                    {action_set.tools.map((tool, index) => {
                                        return tool.for ? (
                                                <div key={name + "-" + action_set.label + tool.text.toLowerCase().replaceAll(" ", "-")}>
                                                    <input
                                                        accept="image/jpg, image/jpeg, image/png, image/svg, image/webp, image/gif"
                                                        style={{display: "none"}}
                                                        id={tool.for}
                                                        type="file"
                                                        onChange={tool.on_click}
                                                    />
                                                    <ListItem className={tool.class ? tool.class: null} component="label" key={index + (tool.disabled ? "-0": "-1")+""} htmlFor={tool.for} button disabled={tool.disabled}>
                                                        <ListItemIcon className={classes.listItemIcon} style={tool.style || {}}>
                                                            {tool.icon}
                                                        </ListItemIcon>
                                                        <ListItemText className={classes.ListItemText}
                                                                      primary={tool.text} secondary={tool.sub}/>
                                                    </ListItem>
                                                </div>
                                            ):
                                            (
                                                <ListItem className={tool.class ? tool.class: null} key={name + "-" + action_set.label + (tool.text || "").toLowerCase().replaceAll(" ", "-")} button disabled={tool.disabled || false}
                                                          onClick={tool.on_click}>
                                                    <ListItemIcon className={classes.listItemIcon} style={tool.style || {}}>
                                                        {tool.icon}
                                                    </ListItemIcon>
                                                    <ListItemText className={classes.ListItemText} style={tool.text_style ||{}}
                                                                  primary={tool.text} secondary={tool.sub}/>
                                                </ListItem>
                                            );
                                    })}
                                </div>
                            </div>
                        );
                    })
                }

                {this.get_after_action_panel(index)}

                <ListSubheader className={classes.listSubHeader} onClick={() => {this._set_list_subheader_collapse("sponsors")}}>
                        <span className={"list-sub-header-main-text"}>
                            <span><ImagePlusIcon/></span>
                            <span style={{textTransform: "uppercase"}}>Advantages of a partnership?</span>
                        </span>

                    <Collapse className={classes.listSubHeaderCollapse} in={_list_sub_header_opened === "sponsors"}>
                        <b style={{color: "#060e23", textTransform: "initial"}}>They are the following:</b><br/>
                        <ol className={classes.listSubHeaderDescription} style={{marginLeft: 12, marginRight: 180, minHeight: 75}}>
                            <li>Increased brand recognition.</li>
                            <li>New revenue streams.</li>
                            <li>Opportunities for user acquisition.</li>
                            <li>And of course, a lot of original contents...</li>
                        </ol>
                        <a style={{fontWeight: "initial", color: "#060e23", textTransform: "initial"}} href={"mailto:pixa.pics@protonmail.com"}>pixa.pics@protonmail.com</a>
                    </Collapse>
                    {_list_sub_header_opened === "sponsors" &&
                        <div className={classes.listSubHeaderVideo} style={{width: 180, height: 180}}>
                            <video id="upload-video" width="180" height="180" style={{aspectRatio: "1", transform: "translateZ(10px)"}} autoPlay>
                                <source src={"/src/videos/sponsors.mp4"} type="video/mp4"/>
                            </video>
                            <div className={classes.listSubHeaderVideoOverlay} style={{width: 45, height: 30}}></div>
                            <div className={classes.listSubHeaderVideoFade}  style={{width: 180, height: 180}}></div>
                        </div>}
                    <IconButton className={classes.listSubHeaderToggle}>
                        {_list_sub_header_opened === "sponsors" ? <CloseIcon/>: <InfoOutlined/>}
                    </IconButton>
                   </ListSubheader>
                    <h2 style={{marginLeft: 24, marginTop: 32, textTransform: "initial"}}>Keep on being creative!</h2>
                    <p style={{margin: "24px 32px"}} className={classes.info}>
                        <b>NFTs and pixel art are revolutionizing the way we think about digital ownership and creativity.</b> <br/><br/>
                        By combining the uniqueness and scarcity of traditional collectibles with the limitless potential of digital media, NFTs are opening up new avenues for artists and creators to express themselves and connect with audiences around the world.
                        And pixel art, with its bold lines, bright colors, and playful forms, is the perfect medium to showcase the beauty and versatility of NFTs.
                        <br/>
                        <br/>
                        So if you're an artist, collector, or just someone who loves to play and create, now is the time to dive into the world of NFTs and pixel art! With so many new opportunities for discovery and expression, you never know what amazing creations you might unleash.
                        <br/>
                        <br/>
                        So grab your tools, get inspired, and let's start exploring this exciting new frontier together!
                        <br/>
                        <br/>
                        <span>— Matias A.</span>
                    </p>
            </List>
        );

        if(force_update) {

            this.forceUpdate();
        }
    }

    render() {

        const {view_name_index, previous_view_name_index} = this.st4te;
        const cache = this._cache;

        return (
            <SwipeableViews
                containerStyle={{overflow: "visible", contain: "style paint size layout"}}
                animateHeight={true}
                animateTransitions={true}
                disableLazyLoading={true}
                resistance={true}
                springConfig={{tension: 450, friction: 60, duration: '175ms', easeFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', delay: '5ms'}}
                index={view_name_index}
                onChangeIndex={this._handle_view_name_change}
                disabled={false}
                key={"swipe-able-view"}
            >
                {this.get_action_panel_names().map(function (name, index){

                    if(view_name_index !== index && previous_view_name_index !== index) {
                        return (<List key={name} style={{ willChange: "none", minHeight: "100%", contain: "style layout paint", overflow: "auto", contentVisibility: "visible", paddingTop: 0}} />);
                    }else {
                        return cache[name];
                    }
                })}
            </SwipeableViews>
        );
    }
}

export default withStyles(styles)(PixelToolboxSwipeableViews);
