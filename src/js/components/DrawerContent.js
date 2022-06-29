import React from "react";
import {Tooltip, withStyles} from "@material-ui/core";

import { t } from "../utils/t";

import {Fade, Divider, List, ListItem, ListItemIcon, ListItemText, Badge} from "@material-ui/core";

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
            background: `linear-gradient(45deg, #01031088 33%, #033aff44 ), url("/src/images/illustrations/ITLab.png")`,
            backgroundSize: "auto 120%",
            backgroundPosition: "right",
            textShadow: "0 0px 6px white",
            filter: "brightness(1) contrast(1)",
            transition: "filter, background-size cubic-bezier(0.4, 0, 0.2, 1) 275ms",
        },
        "&:hover > div:first-child": {
            filter: "brightness(1.2) contrast(1.2)",
            backgroundSize: "auto 100%",
        }
    }
});

class DrawerContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            pathname: props.pathname,
            _history: HISTORY,
        };
    };

    componentDidMount() {

    }

    componentWillReceiveProps(new_props) {

        this.setState({...new_props});
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

        const { classes } = this.state;

        return (
            <div>
                <div>
                    <List style={{paddingTop: 0}} className={classes.labList}>
                        <ListItem style={{borderBottom: "2px solid #0056ce"}} button onClick={this._open_pixel_page}>
                            <ListItemText className={classes.boldListItemText} primary={"MINIMA'S LABORATORY! CREATE A PIXELART..."} />
                        </ListItem>
                        <Fade in timeout={100}>
                            <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io/graphs/contributors")}>
                                <ListItemIcon><PersonIcon className={classes.iconColor} /></ListItemIcon>
                                <ListItemText primary={t( "components.drawer_content.menu.more.contributors")} />
                            </ListItem>
                        </Fade>
                        <Fade in timeout={150}>
                            <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io")}>
                                <ListItemIcon><CodeIcon className={classes.iconColor} /></ListItemIcon>
                                <ListItemText primary={t( "components.drawer_content.menu.more.source_code")} />
                            </ListItem>
                        </Fade>
                        <Fade in timeout={200}>
                            <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://t.me/pixapics")}>
                                <Badge className={classes.styledBadgeConnected} overlap="circular" badgeContent=" " variant="dot">
                                    <ListItemIcon><ForumIcon className={classes.iconColor} /></ListItemIcon>
                                </Badge>
                                <ListItemText primary="Telegram" />
                            </ListItem>
                        </Fade>
                    </List>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(DrawerContent);
