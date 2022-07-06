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
            fontSize: "1.25em"
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
            backgroundColor: "transparent",
            background: `linear-gradient(45deg, #01031088 33%, #033aff44 ), url("data:image/png;base64,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")`,
            backgroundSize: "auto 100%",
            textShadow: "0 0px 6px white",
            filter: "brightness(1.2) contrast(1.2)",
            transition: "filter, background-size cubic-bezier(0.4, 0, 0.2, 1) 275ms",
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

    componentDidMount() {

        this.forceUpdate();
    }

    componentWillReceiveProps(new_props) {

        if(this.state.language !== new_props.language) {

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
                <List key={language} style={{paddingTop: 0}} className={classes.labList}>
                    <ListItem style={{borderBottom: "2px solid #0056ce"}} button onClick={this._open_pixel_page}>
                        <ListItemText className={classes.boldListItemText} primary={"PIXEL ART EDITOR! MINIMA'S LAB..."} />
                    </ListItem>
                    <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io/graphs/contributors")}>
                        <ListItemIcon><PersonIcon className={classes.iconColor} /></ListItemIcon>
                        <ListItemText primary={t( "components.drawer_content.menu.more.contributors")} />
                    </ListItem>
                    <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io")}>
                        <ListItemIcon><CodeIcon className={classes.iconColor} /></ListItemIcon>
                        <ListItemText primary={t( "components.drawer_content.menu.more.source_code")} />
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
