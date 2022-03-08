import React from "react";
import { withStyles } from "@material-ui/core";

import { t } from "../utils/t";

import DnaIcon from "../icons/Dna";

import {Fade, Divider, List, ListItem, ListItemIcon, ListItemText, Badge} from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
import CodeIcon from "@material-ui/icons/Code";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
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
        color: theme.palette.secondary.contrastText,
        margin: "0px 12px",
        width: "48px",
        height: "48px",
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
                    <List>
                        <ListItem style={{backgroundColor: "#ffffff33"}} button onClick={this._open_pixel_page}>
                            <ListItemIcon>
                                <DnaIcon className={classes.iconLeft}/>
                            </ListItemIcon>
                            <ListItemText className={classes.boldListItemText} primary={"PIXEL ART LABORATORY"} />
                        </ListItem>
                        <Divider />
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
                            <ListItem button  className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io/releases")}>
                                <ListItemIcon><CloudDownloadIcon className={classes.iconColor} /></ListItemIcon>
                                <ListItemText primary={t( "components.drawer_content.menu.more.download")} />
                            </ListItem>
                        </Fade>
                        <Fade in timeout={250}>
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
