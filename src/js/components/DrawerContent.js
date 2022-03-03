import React from "react";
import { withStyles } from "@material-ui/core";

import { t } from "../utils/t";

import {Fade, List, ListItem, ListItemIcon, ListItemText, Badge} from "@material-ui/core";

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
        margin: "0px 12px",
        opacity: ".33",
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
                <Fade in timeout={500}>
                    <div>
                        <List>
                            <ListItem style={{backgroundColor: "#ffffff11"}} button onClick={this._open_pixel_page}>
                                <ListItemText className={classes.boldItalicListItemText} primary={"PIXEL ART LABORATORY..."} />
                                <ListItemIcon>
                                    <img src={"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDgwIDEwODAiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTQzNC43NSAxNTguMzJjLTEzLjExIDAtMTUuNTQgMTEuMTctMTUuOTkgMTQuNTYtLjI1IDIuMzQtMS4xNiAxNC4xOCAxMC4xMiAxNy4wN2wxNC4yNyAzLjZ2MTg1LjQ0YzAgNjUuMTMtMTYuNjUgMTI5LjY1LTQ4LjIzIDE4Ni42M0wyMjYuMTUgODcwLjM3Yy02LjAyIDEwLjc4LTUuODIgMjMuNjQuNDYgMzQuMjYgNi4yMiAxMC42MyAxNy4zNSAxNyAyOS43IDE3aDU2Ny4zYzEyLjQ0IDAgMjMuNTMtNi4zOCAyOS44LTE3LjExIDYuMjgtMTAuNjMgNi40My0yMy40OC4zNi0zNC4yNmwtMTY3LjU2LTI5OS44Yy0zMi4wOS01Ny4zMy00OC45OS0xMjIuMzEtNDguOTktMTg3Ljk1VjE5My4wN2wxNS43NC0yLjcyYzEyLjg1LTIuMjYgMTIuMDUtMTYuMDQgMTEuOS0xNy42Mi0uNDEtNS4zNy0zLjA5LTE0LjQtMTUuNzQtMTQuNGwtMjE0LjM3LS4wMWgwem0zODguODYgODAxLjIySDI1Ni4zNmMtMjUuOTEgMC00OS4yOS0xMy4zNi02Mi40LTM1LjczLTEzLjE2LTIyLjMxLTEzLjUxLTQ5LjE0LS45Ni03MS44MWwxNjguODMtMzA0LjhjMjguNDQtNTEuMjcgNDMuNDItMTA5LjQ3IDQzLjQyLTE2OC4yMmwuMDUtMTU4LjI1Yy0xNy4zMS0xMC40Ny0yNi45Mi0zMC4zNC0yNC4xNC01Mi41NiAzLjU0LTI4LjExIDI1LjYxLTQ3LjcyIDUzLjU5LTQ3LjcyaDIxNC4zNmMyOS4wNSAwIDUxLjA2IDIwLjE2IDUzLjU0IDQ5LjAzIDEuNzIgMjAuMi03LjM0IDQyLjQ2LTI3LjU3IDUyLjk4bC4wNCAxNjAuMDdjMCA1OS4xNiAxNS4yMyAxMTcuODEgNDQuMTMgMTY5LjQ4TDg4Ni44NiA4NTEuOGMxMi42NSAyMi42MiAxMi4zOSA0OS41NS0uNzYgNzEuOTYtMTMuMTYgMjIuMzctMzYuNTMgMzUuNzgtNjIuNDkgMzUuNzhoMHpNNzg5LjYgODIzLjFMNjY3LjU5IDU5Ny40SDQxMS4yMWMtMS45NyAzLjM0LTEyMC45IDIyNS44Ni0xMjAuOSAyMjUuODYtMTYuNDQgMjUuMjYtMjAuOCA1Ni4yMiAxMy4xNiA1Ni4yMmg0NzMuMDJjMzQuMDYgMCAyOS43LTMxLjEyIDEzLjExLTU2LjM4aDB6Ii8+PC9zdmc+Cg=="}
                                         className={classes.iconRight}
                                    />
                                </ListItemIcon>
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
