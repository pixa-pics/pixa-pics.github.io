import React from "react";
import {withStyles} from "@material-ui/core";

import { t } from "../utils/t";

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
            filter: "opacity(0.5)",
            webkitFilter: "opacity(0.5)",
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
            filter: "brightness(1.4) contrast(1.4)",
            webkitFilter: "brightness(1.4) contrast(1.4)",
            transition: "filter ease-in 750ms !important",
        },
        "&:hover > div:first-child": {
            filter: "brightness(1.6) contrast(1.2) !important",
            webkitFilter: "brightness(1.6) contrast(1.2) !important",
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
        const { _history } = this.state;
        _history.push("/pixel");
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
                        background: `linear-gradient(to left, #01031099, #ffffff00), linear-gradient(to bottom, #5a7fd27a, #080b25dd), url(data:image/png;base64,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)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        textShadow: "0px 0px 6px #8888ff"
                    }} button onClick={this._open_pixel_page}>
                        <ListItemText className={classes.boldListItemText} primary={"PIXEL ART EDITOR! MINIMA'S LABORATORY..."} />
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
