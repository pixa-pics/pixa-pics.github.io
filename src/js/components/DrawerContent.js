import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { t } from "../utils/t";

import Fade from "@material-ui/core/Fade";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from "@material-ui/core/Badge";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import CodeIcon from "@material-ui/icons/Code";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ForumIcon from "@material-ui/icons/Forum";

import { HISTORY, COINS } from "../utils/constants";
import api from "../utils/api";
import actions from "../actions/utils";

const styles = theme => ({
    nested: {
        paddingLeft: theme.spacing(4),
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
    flipExpandMoreIcon: {
        transform: "rotate(180deg)",
        transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
    },
    expandMoreIcon: {
        transform: "rotate(0deg)",
        transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
    },
    dialogInner: {
        display: "inherit",
        "&:hover div:first-child": {
            backgroundSize: "90% auto"
        }
    },
    dialogImage: {
        display: "inline-block",
        padding: theme.spacing(2),
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "300% auto",
        width: 320,
        transition: "background-size 300ms ease-in-out 0ms",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    dialogContent: {
        display: "inline-block"
    },
    whiteLinks: {
        margin: theme.spacing(2),
        textAlign: "center",
        color: "#ffffff",
        "& a": {
            color: "inherit"
        }
    },
    coinAvatar: {
        "& .MuiAvatar-img": {
            objectFit: "initial",
        },
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
            _menu_expanded: "coins", // coins, trade, about
        };
    };

    componentDidMount() {

        this._update_settings();
    }

    componentWillReceiveProps(new_props) {

        this.setState({...new_props, _help_dialogs_data: t( "components.drawer_content.help_dialogs_data")});
    }

    _process_settings_query_result = (error, settings) => {

        // Set new settings from query result
        const _should_open_help_dialogs = settings.help || {
            topup: true,
            mixer: true,
            swap: true
        };

        this.setState({ _should_open_help_dialogs });
    };

    _update_settings() {

        // Call the api to get results of current settings and send it to a callback function
        api.get_settings(this._process_settings_query_result);
    }

    _handle_menu_expanded_change = (event, _new_menu_expanded) => {

        const { _menu_expanded } = this.state;

        if(_menu_expanded === _new_menu_expanded) {

            this.setState({_menu_expanded: ""})
        }else {

            this.setState({_menu_expanded: _new_menu_expanded})
        }
    };

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

        const { classes, _menu_expanded } = this.state;

        return (
            <div>
                <Fade in timeout={500}>
                    <div>
                        <List>
                            <ListItem button onClick={this._open_pixel_page}>
                                <ListItemText primary={"START USING IT"} secondary={<span style={{color:"#bbb"}}>OPEN A NEW IMAGE.</span>} />
                            </ListItem>
                            <ListItem button onClick={(event) => this._handle_menu_expanded_change(event, "more")}>
                                <ListItemText primary={t( "components.drawer_content.menu.more.more")} />
                                <ExpandMoreIcon  className={_menu_expanded === "more"  ? classes.flipExpandMoreIcon: classes.expandMoreIcon}/>
                            </ListItem>
                            <Collapse in={_menu_expanded === "more"} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button className={classes.nested} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io/graphs/contributors")}>
                                        <ListItemIcon><PersonIcon className={classes.iconColor} /></ListItemIcon>
                                        <ListItemText primary={t( "components.drawer_content.menu.more.contributors")} />
                                    </ListItem>
                                    <ListItem button className={classes.nested} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io")}>
                                        <ListItemIcon><CodeIcon className={classes.iconColor} /></ListItemIcon>
                                        <ListItemText primary={t( "components.drawer_content.menu.more.source_code")} />
                                    </ListItem>
                                    <ListItem button className={classes.nested} onClick={(event) => this._open_link(event, "https://github.com/pixa-pics/pixa-pics.github.io/releases")}>
                                        <ListItemIcon><CloudDownloadIcon className={classes.iconColor} /></ListItemIcon>
                                        <ListItemText primary={t( "components.drawer_content.menu.more.download")} />
                                    </ListItem>
                                    <ListItem button className={classes.nested} onClick={(event) => this._open_link(event, "https://t.me/walletcryptored")}>
                                        <Badge className={classes.styledBadgeConnected} overlap="circular" badgeContent=" " variant="dot">
                                            <ListItemIcon><ForumIcon className={classes.iconColor} /></ListItemIcon>
                                        </Badge>
                                        <ListItemText primary="Telegram" />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </List>
                    </div>
                </Fade>
            </div>
        );
    }
}

export default withStyles(styles)(DrawerContent);
