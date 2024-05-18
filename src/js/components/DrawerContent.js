import React from "react";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import Fade from "@material-ui/core/Fade";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from "@material-ui/core/Badge";
import AppInfoDialog from "../components/AppInfoDialog";
import CodeIcon from "@material-ui/icons/Code";
import StoreIcon from "@material-ui/icons/Store";
import PaletteIcon from "@material-ui/icons/Palette";
import InfoIcon from "@material-ui/icons/Info";

import { HISTORY } from "../utils/constants";
import actions from "../actions/utils";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
    boldListItemText: {
        "& > span": {
            fontWeight: "bold",
            fontSize: "1.25em",
        },
        "& .MuiTypography-colorTextSecondary": {
            color: "#ffffffa8",
        }
    },
    listItemGrey: {
        userSelect: "none",
        "& > div > span": {
            opacity: .75,
        },
        "& .MuiListItemText-secondary": {
            color: "#8e93b7 !important"
        },
        "& .MuiTouchRipple-root": {
            backgroundColor: "#0057FF00",
            color: "#77A7FF77",
            transition: "all ease-out 500ms !important"
        },
        "&:hover .MuiTouchRipple-root": {
            backgroundColor: "rgba(0,87,255,0.12)"
        }
    },
    listItemGreyPadding1: {
        userSelect: "none",
        "& > div > span": {
            opacity: .75,
        },
        "& .MuiListItemText-primary": {
            color: "#8e93b7 !important",
            paddingLeft: 56
        },
        "& .MuiTouchRipple-root": {
            backgroundColor: "#0057FF00",
            color: "#77A7FF77",
            transition: "all ease-out 500ms !important"
        },
        "&:hover .MuiTouchRipple-root": {
            backgroundColor: "rgba(0,87,255,0.12)"
        }
    },
    iconColor: {
        color: theme.palette.secondary.contrastText,
        transition: "transform ease-in-out 500ms !important"
    },
    "@global": {
        "@keyframes glow": {
            "0%": {
                color: "#ffffff",
                filter: "drop-shadow(1px 2px 3px white)"
            },
            "20%": {
                color: "#b7d1ff",
                filter: "drop-shadow(2px 4px 6px #b7d1ff)"
            },
            "40%": {
                color: "#80a8ff",
                filter: "drop-shadow(2px 4px 6px #80a8ff)"
            },
            "100%": {
                color: "#ffffff",
                filter: "drop-shadow(1px 2px 3px white)"
            },
        }
    },
    iconColorGold: {
        color: "#ffffff",
        filter: "drop-shadow(1px 2px 3px white)",
        animation: "$glow 14s infinite ease-in-out",
    },
    iconLeft: {
        filter: "drop-shadow(0px 0px 15px #011562)",
        WebkitFilter: "drop-shadow(0px 0px 15px #011562)",
        color: theme.palette.secondary.contrastText,
        margin: "-12px 16px -12px -16px",
        width: "96px",
        height: "96px",
    },
    iconRight: {
        color: theme.palette.secondary.contrastText,
        margin: "0px 12px",
        width: "48px",
        height: "48px",
    },
    whiteLinks: {
        margin: theme.spacing(2),
        textAlign: "center",
        color: "#ffffff",
        "& a": {
            color: "inherit"
        }
    },
    styledBadgeConnected: {
        "& .MuiBadge-badge": {
            color: "#73a9ff",
            marginRight: 16,
            backgroundColor: "#73a9ff",
            boxShadow: `0 0 0 2px ${theme.palette.secondary.dark}`,
            "&::after": {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                animation: "$ripple 1.2s infinite ease-in-out",
                border: "1px solid currentColor",
                content: "\"\"",
            },
        },
        "@global": {
            "@keyframes ripple": {
                "0%": {
                    transform: "scale(.8)",
                    opacity: 1,
                },
                "100%": {
                    transform: "scale(2.4)",
                    opacity: 0,
                },
            }
        }
    },
    labList: {
        contain: "paint style layout",
        "& > div:first-child": {
            filter: "brightness(1) contrast(1)",
            WebkitFilter: "brightness(1) contrast(1)",
            transition: "filter ease-in 750ms !important",
        },
        "&:hover > div:first-child": {
            filter: "brightness(1.5) contrast(1.1) !important",
            WebkitFilter: "brightness(1.5) contrast(1.1) !important",
            transition: "filter ease-out 500ms !important",
        }
    },
    rippleBlue: {
        color: "#5c5fd1",
        contain: "layout paint size style",
        pointerEvents: "none",
        contentVisibility: "auto",
        mixBlendMode: "dodge"
    }
});

class DrawerContent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.st4te = {
            classes: props.classes,
            language: props.language,
            _history: HISTORY,
            _info_dialog_open: 0,
            _has_info_dialog_opened: 0,
            _menu_opened: "pixagram"
        };
    };

    setSt4te(st4te, callback) {
        "use strict";
        let keys = Object.keys(st4te);
        let keys_length = keys.length | 0;
        let key = "";

        for (let i = 0; (i|0) < (keys_length|0); i = (i+1|0)>>>0) {

            key = keys[i].toString();
            this.st4te[key] = st4te[key];
        }

        if(typeof callback === "function") {

            callback();
        }
    }

    componentWillReceiveProps(new_props) {

        if(this.st4te.language !== new_props.language) {

            this.setSt4te({language: new_props.language}, () => {

                this.forceUpdate();
            });
        }
    }

    _open_pixel_page = () => {

        if(this.props){
            if(typeof this.props.onClose !== "undefined"){
                this.props.onClose();
            }
        }
        window.dispatchEvent(new Event("menu-action-tryeditor"));
        actions.load_with("", true);
    };

    _open_link = (event, url) =>{

        window.open(url);
    };

    _go_to = (url) => {

        const { _history } = this.st4te;
        _history.push(url);
    };

    _on_settings_changed = () => {

        actions.trigger_settings_update();
    };

    _open_info_dialog = () => {

        this.setSt4te({_info_dialog_open: 1, _has_info_dialog_opened: 1}, () => {

            this.forceUpdate();
        });
    };

    _close_info_dialog = () => {

        this.setSt4te({_info_dialog_open: 0}, () => {

            this.forceUpdate();
        });
    };

    _pixagram_toggle_menu = () => {

        this.setSt4te({_menu_opened: this.st4te._menu_opened === "" ? "pixagram": ""}, () => {

            this.forceUpdate();
        });
    };

    render() {

        const { classes, _info_dialog_open, _menu_opened, _has_info_dialog_opened } = this.st4te;

        return (
            <React.Fragment>
                {Boolean(_info_dialog_open || _has_info_dialog_opened) && <AppInfoDialog open={_info_dialog_open} onClose={this._close_info_dialog}/>}
                <List style={{paddingTop: 0}} className={classes.labList}>
                    <Fade in={true} timeout={0}>
                        <ListItem button className={classes.listItemGrey} TouchRippleProps={{className: classes.rippleBlue}} onClick={this._open_pixel_page}>
                            <ListItemIcon><PaletteIcon className={classes.iconColor} /></ListItemIcon>
                            <ListItemText primary="Draw" />
                        </ListItem>
                    </Fade>
                    <Fade in={true} timeout={300}>
                        <ListItem button className={classes.listItemGrey} TouchRippleProps={{className: classes.rippleBlue}} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io")}>
                            <ListItemIcon><CodeIcon className={classes.iconColor} /></ListItemIcon>
                            <ListItemText primary="Source code" />
                        </ListItem>
                    </Fade>
                    <Fade in={true} timeout={600}>
                        <ListItem button className={classes.listItemGrey} TouchRippleProps={{className: classes.rippleBlue}} onClick={this._open_info_dialog}>
                            <ListItemIcon><InfoIcon className={classes.iconColor} /></ListItemIcon>
                            <ListItemText primary="About" />
                        </ListItem>
                    </Fade>
                    <Fade in={true} timeout={900}>
                        <ListItem button className={classes.listItemGrey} TouchRippleProps={{className: classes.rippleBlue}} onClick={() => {this._pixagram_toggle_menu()}}>

                            <Badge className={classes.styledBadgeConnected} overlap="circular" badgeContent=" " variant="dot">
                                <ListItemIcon><StoreIcon className={classes.iconColor} /></ListItemIcon>
                            </Badge>
                            <ListItemText primary="PIXAGRAM" />
                            <ListItemIcon><ArrowDropDown className={classes.iconColor} style={_menu_opened !== "pixagram" ? {transform: "rotate(-180deg)"}: {transform: "rotate(0deg)"}}/></ListItemIcon>
                        </ListItem>
                    </Fade>
                    <Collapse in={_menu_opened !== "pixagram"} timeout={300}>
                        <Divider/>
                        <Fade in={_menu_opened !== "pixagram"} timeout={300+200}>
                            <ListItem button className={classes.listItemGreyPadding1} TouchRippleProps={{className: classes.rippleBlue}} onClick={(event) => this._go_to("ico")}>
                                <ListItemText primary="ICO" />
                            </ListItem>
                        </Fade>
                        <Fade in={_menu_opened !== "pixagram"} timeout={300+400}>
                            <ListItem button className={classes.listItemGreyPadding1} TouchRippleProps={{className: classes.rippleBlue}} onClick={() => {this._go_to("marketplace")}}>
                                <ListItemText primary="DEMO" />
                            </ListItem>
                        </Fade>
                        <Fade in={_menu_opened !== "pixagram"} timeout={300+600}>
                            <ListItem button className={classes.listItemGreyPadding1} TouchRippleProps={{className: classes.rippleBlue}} onClick={(event) => this._open_link(event, "https://t.me/pixagramio")}>
                                <ListItemText primary="CHAT" />
                            </ListItem>
                        </Fade>
                    </Collapse>
                    <Fade in={true} timeout={2000}>
                        <div style={{textAlign: "center"}} onClick={(event) => {this._open_link(event, "https://play.google.com/store/apps/details?id=pics.pixa.app.twa")}}>
                            <svg
                                className={"playstorebadge"}
                                xmlns="http://www.w3.org/2000/svg"
                                xmlSpace="preserve"
                                width={206.667}
                                height={80}
                            >
                                <path
                                    d="M0 0h1550v600H0z"
                                    style={{
                                        fill: "transparent",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                                <path
                                    d="M1400 100H150c-27.5 0-50 22.5-50 50v300c0 27.5 22.5 50 50 50h1250c27.5 0 50-22.5 50-50V150c0-27.5-22.5-50-50-50"
                                    style={{
                                        fill: "#100f0d",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                                <path
                                    d="M1400 500H150c-27.5 0-50-22.5-50-50V150c0-27.5 22.5-50 50-50h1250c27.5 0 50 22.5 50 50v300c0 27.5-22.5 50-50 50zm0-8c23.16 0 42-18.84 42-42V150c0-23.16-18.84-42.004-42-42.004H150c-23.16 0-42 18.844-42 42.004v300c0 23.16 18.84 42 42 42h1250"
                                    style={{
                                        fill: "#a3a2a1",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                                <path
                                    d="m307.172 305.758-106.465-113 .02-.067c3.265-12.269 14.468-21.304 27.769-21.304a28.641 28.641 0 0 1 14.59 3.961l.34.203 119.84 69.144-56.094 61.063"
                                    style={{
                                        fill: "#d8402b",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                                <path
                                    d="m414.883 325-.102.066-51.738 30-58.285-51.875 58.492-58.48 51.465 29.695c9.019 4.871 15.144 14.383 15.144 25.348 0 10.898-6.043 20.355-14.976 25.246"
                                    style={{
                                        fill: "#fbc81e",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                                <path
                                    d="M200.699 407.23a28.413 28.413 0 0 1-.972-7.402V200.152c0-2.562.332-5.043.98-7.39l110.129 110.105L200.699 407.23"
                                    style={{
                                        fill: "#3271c1",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                                <path
                                    d="m307.961 299.988 55.098 55.094-119.7 69.402a28.823 28.823 0 0 1-14.863 4.11c-13.301 0-24.523-9.051-27.789-21.336l-.008-.031 107.262-107.239"
                                    style={{
                                        fill: "#29a46f",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                                <path
                                    d="M574.184 397.566c0-8.378-2.481-15.05-7.45-20.027-5.644-5.918-13-8.879-22.043-8.879-8.66 0-16.023 3-22.078 9.008-6.066 6.004-9.093 13.449-9.093 22.332 0 8.887 3.027 16.328 9.093 22.336 6.055 6.004 13.418 9.008 22.078 9.008 4.297 0 8.411-.84 12.317-2.516 3.906-1.68 7.039-3.91 9.383-6.703l-5.274-5.277c-3.972 4.746-9.441 7.117-16.426 7.117-6.316 0-11.777-2.219-16.386-6.66-4.61-4.446-6.914-10.211-6.914-17.305 0-7.094 2.304-12.859 6.914-17.305 4.609-4.441 10.07-6.66 16.386-6.66 6.7 0 12.286 2.231 16.758 6.699 2.903 2.911 4.582 6.957 5.031 12.153h-21.789v7.207h29.075c.281-1.567.418-3.071.418-4.528"
                                    style={{
                                        fill: "#fff",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                                <path
                                    d="M574.184 397.566h-1c-.008-8.187-2.399-14.546-7.157-19.32l-.007-.008-.012-.008c-5.461-5.714-12.488-8.558-21.317-8.57-8.429.012-15.484 2.887-21.375 8.715-5.878 5.84-8.785 12.969-8.796 21.625.011 8.66 2.918 15.785 8.796 21.625 5.891 5.828 12.946 8.707 21.375 8.719 4.168 0 8.137-.813 11.922-2.434 3.789-1.633 6.782-3.773 9.012-6.43l.766.645-.707.707-5.274-5.277.707-.707.77.64c-4.157 4.985-9.992 7.492-17.196 7.477-6.55.008-12.312-2.332-17.078-6.942-4.812-4.625-7.23-10.714-7.222-18.023-.008-7.309 2.41-13.398 7.222-18.023 4.766-4.61 10.528-6.95 17.078-6.942 6.922-.012 12.821 2.34 17.465 6.992 3.102 3.11 4.86 7.418 5.321 12.774l.093 1.086h-21.879v5.207h28.075v1l-.985-.176c.274-1.516.403-2.957.403-4.352h2c0 1.52-.141 3.082-.434 4.707l-.148.821h-30.911v-9.207h22.789v1l-.996.086c-.441-5.032-2.039-8.817-4.742-11.532-4.297-4.281-9.57-6.394-16.051-6.406-6.082.008-11.242 2.102-15.691 6.379-4.406 4.262-6.598 9.703-6.609 16.586.011 6.883 2.203 12.324 6.609 16.586 4.449 4.277 9.609 6.371 15.691 6.379 6.762-.016 11.868-2.25 15.661-6.762l.703-.836 6.043 6.051.648.648-.59.7c-2.457 2.929-5.73 5.254-9.754 6.98-4.031 1.731-8.285 2.598-12.711 2.598-8.89.008-16.562-3.117-22.785-9.301-6.246-6.172-9.394-13.93-9.386-23.043-.008-9.109 3.14-16.871 9.386-23.043 6.223-6.184 13.895-9.305 22.785-9.297 9.258-.008 16.942 3.067 22.766 9.188l-.723.691.707-.707c5.18 5.176 7.754 12.168 7.743 20.734h-1m46.093 25.063h-27.324v-19.024h24.641v-7.21h-24.641v-19.024h27.324V370H585.25v60h35.027v-7.371"
                                    style={{
                                        fill: "#fff",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                                <path
                                    d="M620.277 422.629v1h-28.324v-21.024h24.641v-5.21h-24.641v-21.024h27.324V371H586.25v58h33.027v-6.371h1v1-1h1V431H584.25v-62h37.027v9.371h-27.324v17.024h24.641v9.21h-24.641v17.024h27.324v1h-1M652.789 370h-7.715v52.629h-16.758V430h41.231v-7.371h-16.758V370"
                                    style={{
                                        fill: "#fff",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                                <path
                                    d="M652.789 370v1h-6.715v52.629h-16.758V429h39.231v-5.371h-16.758V370h1v1-1h1v51.629h16.758V431h-43.231v-9.371h16.758V369h9.715v1h-1m46.59 0v60h7.707v-60h-7.707"
                                    style={{
                                        fill: "#fff",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                                <path
                                    d="M699.379 370h1v59h5.707v-58h-6.707v-1h1-1v-1h8.707v62h-9.707v-62h1v1m41.906 0h-7.715v52.629h-16.757V430h41.23v-7.371h-16.758V370"
                                    style={{
                                        fill: "#fff",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                                <path
                                    d="M741.285 370v1h-6.715v52.629h-16.757V429h39.23v-5.371h-16.758V370h1v1-1h1v51.629h16.758V431h-43.23v-9.371h16.757V369h9.715v1h-1m56.508 12.777c4.441-4.496 9.875-6.742 16.301-6.742 6.426 0 11.863 2.246 16.297 6.742 4.445 4.496 6.672 10.243 6.672 17.223 0 6.98-2.227 12.727-6.672 17.223-4.434 4.496-9.871 6.742-16.297 6.742s-11.86-2.246-16.301-6.742c-4.434-4.496-6.66-10.243-6.66-17.223 0-6.98 2.226-12.727 6.66-17.223zm38.301-5.023c-5.899-6.066-13.235-9.094-22-9.094-8.774 0-16.106 3.028-21.992 9.094-5.903 6.059-8.84 13.476-8.84 22.246 0 8.77 2.937 16.188 8.84 22.246 5.886 6.067 13.218 9.098 21.992 9.098 8.719 0 16.035-3.047 21.961-9.137 5.918-6.09 8.879-13.492 8.879-22.207 0-8.77-2.954-16.187-8.84-22.246"
                                    style={{
                                        fill: "#fff",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                                <path
                                    d="m797.793 382.777-.711-.703c4.606-4.676 10.352-7.051 17.012-7.039 6.656-.012 12.41 2.363 17.008 7.039 4.636 4.68 6.968 10.735 6.961 17.926.007 7.191-2.325 13.246-6.961 17.926-4.598 4.676-10.352 7.051-17.008 7.039-6.66.012-12.406-2.363-17.012-7.039-4.625-4.68-6.957-10.735-6.949-17.926-.008-7.191 2.324-13.246 6.949-17.926l.711.703.711.703c-4.242 4.317-6.363 9.747-6.371 16.52.008 6.773 2.129 12.203 6.371 16.52 4.281 4.316 9.394 6.433 15.59 6.445 6.191-.012 11.316-2.129 15.586-6.445 4.25-4.317 6.371-9.747 6.383-16.52-.012-6.773-2.133-12.203-6.383-16.52-4.27-4.316-9.395-6.433-15.586-6.445-6.196.012-11.309 2.129-15.59 6.445zm38.301-5.023-.715.695c-5.734-5.875-12.746-8.777-21.285-8.789-8.543.012-15.555 2.914-21.278 8.789v.004c-5.722 5.891-8.546 13-8.554 21.547.008 8.547 2.832 15.656 8.554 21.547v.004c5.723 5.875 12.735 8.781 21.278 8.793 8.484-.012 15.48-2.93 21.246-8.836 5.742-5.922 8.582-13.02 8.594-21.508-.012-8.547-2.844-15.656-8.555-21.551l.715-.695.719-.695c6.062 6.226 9.128 13.949 9.121 22.941.007 8.941-3.071 16.648-9.161 22.902-6.093 6.278-13.726 9.453-22.679 9.442-9 .011-16.656-3.149-22.711-9.403v.004c-6.074-6.23-9.129-13.953-9.121-22.945-.008-8.992 3.047-16.715 9.121-22.945l.023-.024-.023.028c6.055-6.254 13.711-9.407 22.711-9.399 8.996-.008 16.648 3.145 22.719 9.399l-.719.695m19.66-7.754v60h9.383l29.16-46.676h.332l-.332 11.563V430h7.715v-60h-8.047l-30.508 48.938h-.332l.332-11.567V370h-7.703"
                                    style={{
                                        fill: "#fff",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                                <path
                                    d="M855.754 370h1v59h7.828l29.16-46.676h1.914l-.359 12.578V429h5.715v-58h-6.492l-30.508 48.938h-1.914l.359-12.579V371h-6.703v-1h1-1v-1h8.703v38.387l-.332 11.578-1-.027v-1h.332v1l-.848-.532L893.41 369h9.602v62h-9.715v-36.125l.332-11.578 1 .027v1h-.332v-1l.848.531L865.691 431h-10.937v-62h1v1m313.606-170h18.66v125.012h-18.66zm168.07 79.98-21.39-54.199h-.64l-22.2 54.199h-20.1l33.29-75.753-18.97-42.137h19.46l51.3 117.89zm-105.82-65.781c-6.12 0-14.64 3.055-14.64 10.617 0 9.649 10.61 13.348 19.78 13.348 8.2 0 12.07-1.769 17.05-4.184-1.45-11.578-11.42-19.781-22.19-19.781zm2.25 68.516c-13.51 0-27.51-5.953-33.3-19.141l16.57-6.914c3.54 6.914 10.13 9.168 17.05 9.168 9.65 0 19.46-5.793 19.62-16.086v-1.285c-3.38 1.93-10.61 4.824-19.46 4.824-17.85 0-36.03-9.808-36.03-28.144 0-16.727 14.64-27.504 31.04-27.504 12.55 0 19.47 5.629 23.81 12.222h.64v-9.648h18.01v47.93c0 22.191-16.56 34.578-37.95 34.578zm-115.32-17.953H1092v42.851h26.54c13.95 0 21.87-11.55 21.87-21.425 0-9.688-7.92-21.426-21.87-21.426zm-.48 60.25h-44.71V200H1092v47.363h26.06c20.68 0 41.01 14.973 41.01 38.825 0 23.851-20.33 38.824-41.01 38.824zM874.25 214.176c-12.891 0-23.684 10.793-23.684 25.617 0 14.98 10.793 25.937 23.684 25.937 12.727 0 22.715-10.957 22.715-25.937 0-14.824-9.988-25.617-22.715-25.617zm21.426 58.804h-.645c-4.187 4.993-12.246 9.504-22.394 9.504-21.266 0-40.758-18.687-40.758-42.691 0-23.844 19.492-42.371 40.758-42.371 10.148 0 18.207 4.512 22.394 9.664h.645v-6.121c0-16.274-8.699-24.973-22.715-24.973-11.438 0-18.527 8.219-21.43 15.145l-16.269-6.766c4.672-11.277 17.078-25.133 37.699-25.133 21.91 0 40.437 12.891 40.437 44.305v76.363h-17.722zM926.285 200h18.688v125.016h-18.688zm46.238 41.242c-.484 16.434 12.727 24.809 22.231 24.809 7.416 0 13.696-3.703 15.786-9.024zm57.997 14.176c-3.54 9.508-14.34 27.066-36.411 27.066-21.91 0-40.113-17.238-40.113-42.531 0-23.844 18.043-42.531 42.207-42.531 19.497 0 30.777 11.922 35.447 18.848l-14.5 9.668c-4.84-7.09-11.44-11.762-20.947-11.762-9.504 0-16.269 4.351-20.621 12.887l56.868 23.523zm-453.082 14.016v-18.043h43.175c-1.289-10.149-4.672-17.559-9.828-22.715-6.281-6.285-16.109-13.211-33.347-13.211-26.583 0-47.364 21.426-47.364 48.008 0 26.582 20.781 48.011 47.364 48.011 14.339 0 24.808-5.64 32.542-12.89l12.727 12.726c-10.793 10.313-25.133 18.207-45.269 18.207-36.411 0-67.02-29.644-67.02-66.054 0-36.41 30.609-66.051 67.02-66.051 19.656 0 34.476 6.441 46.074 18.527 11.922 11.922 15.629 28.676 15.629 42.207 0 4.192-.321 8.055-.969 11.278zm110.789-55.258c-12.891 0-24.008 10.633-24.008 25.777 0 15.305 11.117 25.777 24.008 25.777 12.886 0 24.003-10.472 24.003-25.777 0-15.144-11.117-25.777-24.003-25.777zm0 68.308c-23.524 0-42.696-17.882-42.696-42.531 0-24.488 19.172-42.531 42.696-42.531 23.519 0 42.691 18.043 42.691 42.531 0 24.649-19.172 42.531-42.691 42.531zm93.132-68.308c-12.886 0-24.004 10.633-24.004 25.777 0 15.305 11.118 25.777 24.004 25.777 12.887 0 24.004-10.472 24.004-25.777 0-15.144-11.117-25.777-24.004-25.777zm0 68.308c-23.523 0-42.691-17.882-42.691-42.531 0-24.488 19.168-42.531 42.691-42.531 23.52 0 42.692 18.043 42.692 42.531 0 24.649-19.172 42.531-42.692 42.531"
                                    style={{
                                        fill: "#fff",
                                        fillOpacity: 1,
                                        fillRule: "nonzero",
                                        stroke: "none",
                                    }}
                                    transform="matrix(.13333 0 0 -.13333 0 80)"
                                />
                            </svg>
                        </div>
                    </Fade>
                </List>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(DrawerContent);
