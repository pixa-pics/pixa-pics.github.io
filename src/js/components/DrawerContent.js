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
                        background: `linear-gradient(to left, #01031066, #ffffff00), linear-gradient(to bottom, #5a7fd24a, #080b25aa), url(data:image/png;base64,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)`,
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
