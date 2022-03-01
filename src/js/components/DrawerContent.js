import React from "react";
import { withStyles } from "@material-ui/core";

import { t } from "../utils/t";

import {Fade, List, ListItem, ListItemIcon, ListItemText, Badge} from "@material-ui/core";

import ArrowFRight from "../icons/ArrowFRight";
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
    boldItalicListItemText: {
        "& > span": {
            fontWeight: "bold",
            fontStyle: "italic",
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
        marginRight: theme.spacing(2),
        width: "72px",
        height: "48px",
    },
    iconRight: {
        color: theme.palette.secondary.contrastText,
        marginLeft: theme.spacing(2),
        width: "72px",
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
            boxShadow: `0 0 0 2px ${theme.palette.secondary.main}`,
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
                <Fade in timeout={500}>
                    <div>
                        <List>
                            <ListItem style={{backgroundColor: "#ffffff11"}} button onClick={this._open_pixel_page}>
                                <ListItemText className={classes.boldItalicListItemText} primary={"START DRAWING..."} />
                                <ListItemIcon><ArrowFRight color={"#fff"} className={classes.iconRight}/></ListItemIcon>
                            </ListItem>
                            <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io/graphs/contributors")}>
                                <ListItemIcon><PersonIcon className={classes.iconColor} /></ListItemIcon>
                                <ListItemText primary={t( "components.drawer_content.menu.more.contributors")} />
                            </ListItem>
                            <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io")}>
                                <ListItemIcon><CodeIcon className={classes.iconColor} /></ListItemIcon>
                                <ListItemText primary={t( "components.drawer_content.menu.more.source_code")} />
                            </ListItem>
                            <ListItem button  className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io/releases")}>
                                <ListItemIcon><CloudDownloadIcon className={classes.iconColor} /></ListItemIcon>
                                <ListItemText primary={t( "components.drawer_content.menu.more.download")} />
                            </ListItem>
                            <ListItem button className={classes.listItemGrey} onClick={(event) => this._open_link(event, "https://t.me/pixapics")}>
                                <Badge className={classes.styledBadgeConnected} overlap="circular" badgeContent=" " variant="dot">
                                    <ListItemIcon><ForumIcon className={classes.iconColor} /></ListItemIcon>
                                </Badge>
                                <ListItemText primary="Telegram" />
                            </ListItem>
                        </List>
                    </div>
                </Fade>
            </div>
        );
    }
}

export default withStyles(styles)(DrawerContent);
