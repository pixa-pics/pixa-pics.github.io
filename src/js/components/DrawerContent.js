import React from "react";
import {withStyles} from "@material-ui/core";

import {List, ListItem, ListItemIcon, ListItemText, Badge} from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
import CodeIcon from "@material-ui/icons/Code";
import ForumIcon from "@material-ui/icons/Forum";

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

class DrawerContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            language: String(props.language),
            _history: HISTORY,
        };
    };

    componentWillReceiveProps(new_props) {

        if(String(this.state.language) !== String(new_props.language)) {

            this.setState({language: String(new_props.language)}, () => {

                this.forceUpdate();
            });
        }
    }

    shouldComponentUpdate() {

        return false;
    }

    _open_pixel_page = () => {

        window.dispatchEvent(new Event("menu-action-tryeditor"));
        actions.load_with();
        this.props.onClose();
    };

    _open_link = (event, url) =>{

        window.open(url);
    };

    _on_settings_changed = () => {

        actions.trigger_settings_update();
    };

    render() {

        const { classes, language } = this.state;

        return (
            <div>
                <List style={{paddingTop: 0}} className={classes.labList}>
                    <ListItem style={{
                        borderBottom: "2px solid #212558",
                        backgroundColor: "transparent",
                        background: `linear-gradient(to left, #01031066, #ffffff00), linear-gradient(to bottom, #5a7fd24a, #080b25aa)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        textShadow: "0px 0px 6px #8888ff"
                    }} button onClick={this._open_pixel_page}>
                        <ListItemText className={classes.boldListItemText} primary={"PIXEL-ART EDITOR! NFTs & MINIMA's LABORATORY..."} />
                    </ListItem>
                    <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io/graphs/contributors")}>
                        <ListItemIcon><PersonIcon className={classes.iconColor} /></ListItemIcon>
                        <ListItemText primary="Contributors" />
                    </ListItem>
                    <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io")}>
                        <ListItemIcon><CodeIcon className={classes.iconColor} /></ListItemIcon>
                        <ListItemText primary="Source Code" />
                    </ListItem>
                    <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://t.me/pixapics")}>
                        <Badge className={classes.styledBadgeConnected} overlap="circular" badgeContent=" " variant="dot">
                            <ListItemIcon><ForumIcon className={classes.iconColor} /></ListItemIcon>
                        </Badge>
                        <ListItemText primary="Telegram" />
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(DrawerContent);
