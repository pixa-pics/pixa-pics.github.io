import React from "react";
import {Fade, withStyles} from "@material-ui/core";

import {List, ListItem, ListItemIcon, ListItemText, Badge} from "@material-ui/core";

import DonateIcon from "../icons/Donate";
import CodeIcon from "@material-ui/icons/Code";
import PaletteIcon from "@material-ui/icons/Palette";
import InfoIcon from "@material-ui/icons/Info";

import { HISTORY } from "../utils/constants";
import actions from "../actions/utils";

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
        "& > div > span": {
            opacity: .75,
        },
        "& .MuiListItemText-secondary": {
            color: "#8e93b7 !important"
        }
    },
    iconColor: {
        color: theme.palette.secondary.contrastText
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
        webkitFilter: "drop-shadow(0px 0px 15px #011562)",
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
            marginRight: -8,
            backgroundColor: "#44b700",
            color: "#44b700",
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
        "& > div:first-child": {
            filter: "brightness(1) contrast(1)",
            webkitFilter: "brightness(1) contrast(1)",
            transition: "filter ease-in 750ms !important",
        },
        "&:hover > div:first-child": {
            filter: "brightness(1.5) contrast(1.1) !important",
            webkitFilter: "brightness(1.5) contrast(1.1) !important",
            transition: "filter ease-out 500ms !important",
        }
    }
});

class DrawerContent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.st4te = {
            classes: props.classes,
            language: props.language,
            _history: HISTORY,
        };
    };

    setSt4te(st4te, callback) {

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

        window.dispatchEvent(new Event("menu-action-tryeditor"));
        actions.load_with("", true);
        this.props.onClose();
    };

    _open_link = (event, url) =>{

        window.open(url);
    };

    _on_settings_changed = () => {

        actions.trigger_settings_update();
    };

    render() {

        const { classes, language } = this.st4te;

        return (
            <div>
                <List style={{paddingTop: 0}} className={classes.labList}>
                    <Fade in={true} timeout={100}>
                        <ListItem button className={classes.listItemGrey} onClick={this._open_pixel_page}>
                            <ListItemIcon><PaletteIcon className={classes.iconColor} /></ListItemIcon>
                            <ListItemText primary="Draw" />
                        </ListItem>
                    </Fade>
                    <Fade in={true} timeout={300}>
                        <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://opencollective.com/pixapics")}>
                            <ListItemIcon><DonateIcon className={classes.iconColorGold} /></ListItemIcon>
                            <ListItemText primary="Donate" />
                        </ListItem>
                    </Fade>
                    <Fade in={true} timeout={500}>
                        <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://www.ebook-nft-pixel.art/")}>
                            <ListItemIcon><InfoIcon className={classes.iconColor} /></ListItemIcon>
                            <ListItemText primary="Free Guide" />
                        </ListItem>
                    </Fade>
                    <Fade in={true} timeout={700}>
                        <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io")}>
                            <Badge className={classes.styledBadgeConnected} overlap="circular" badgeContent=" " variant="dot"><ListItemIcon><CodeIcon className={classes.iconColor} /></ListItemIcon></Badge>
                            <ListItemText primary="Source code" />
                        </ListItem>
                    </Fade>
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(DrawerContent);
