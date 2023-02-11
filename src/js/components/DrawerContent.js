import React from "react";
import {Fade, withStyles} from "@material-ui/core";

import {List, ListItem, ListItemIcon, ListItemText, Badge} from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
import CodeIcon from "@material-ui/icons/Code";
import ForumIcon from "@material-ui/icons/Forum";
import PaletteIcon from "@material-ui/icons/Palette";

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
        }
    },
    iconColor: {
        color: theme.palette.secondary.contrastText
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
                    <Fade in={true} timeout={200}>
                        <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://opencollective.com/pixapics")}>
                            <ListItemIcon><PersonIcon className={classes.iconColor} /></ListItemIcon>
                            <ListItemText primary="Donate" />
                        </ListItem>
                    </Fade>
                    <Fade in={true} timeout={300}>
                        <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io")}>
                            <ListItemIcon><CodeIcon className={classes.iconColor} /></ListItemIcon>
                            <ListItemText primary="Source code" />
                        </ListItem>
                    </Fade>
                    <Fade in={true} timeout={400}>
                        <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://www.facebook.com/groups/504155481777261")}>
                            <Badge className={classes.styledBadgeConnected} overlap="circular" badgeContent=" " variant="dot">
                                <ListItemIcon><ForumIcon className={classes.iconColor} /></ListItemIcon>
                            </Badge>
                            <ListItemText primary="Facebook's group" />
                        </ListItem>
                    </Fade>
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(DrawerContent);
