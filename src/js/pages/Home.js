import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { t } from "../utils/t";

import FlashInfo from "../components/FlashInfo";
import { HISTORY } from "../utils/constants";

import ShareIcon from "@material-ui/icons/Share";

import ShareDialog from "../components/ShareDialog";
import Fab from "@material-ui/core/Fab";
import Grow from "@material-ui/core/Grow";

import actions from "../actions/utils";

import DollarEmojiSvg from "../twemoji/react/1F911";
import AngelEmojiSvg from "../twemoji/react/1F607";
import HearthEmojiSvg from "../twemoji/react/2665";
import EarthEmojiSvg from "../twemoji/react/1F30D";

import get_svg_in_b64 from "../utils/svgToBase64";
import Button from "@material-ui/core/Button";

const quotes = t( "pages.home.quotes");
const random_quote_index = Math.floor(Math.random() * quotes.length);

const styles = theme => ({
    root: {
        maxHeight: "calc(100% - 64px)",
        height: "100%",
        overflow: "hidden",
        position: "relative",
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundImage: "radial-gradient(ellipse farthest-corner, #ffffff, #ffffff00 66%), url(/src/images/designer.svg)",
        position: "relative",
        backgroundSize: "75%",
        backgroundPosition: "100% 25%",
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "border-box",
        padding: 64,
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(4)
        },
    },
    card: {
        margin: theme.spacing(1, 2)
    },
    quoteContainer: {
        width: "calc(100% - 64px)",
        position: "absolute",
        left: 32,
        bottom: 32,
        backgroundColor: "rgba(192, 192, 192, .5)",
        borderRadius: 4,
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    fab: {
        position: "fixed",
        backgroundColor: theme.palette.primary.action,
        color: theme.palette.primary.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.primary.actionLighter,
        },
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        "& svg": {
            marginRight: 4
        },
    },
    headerContainer: {
        fontFamily: `"Jura"`,
        position: "absolute",
        marginTop: theme.spacing(-2),
        color: "#000000",
        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(-4)
        },
    },
    title: {
        fontSize: 56,
        fontWeight: "normal",
        [theme.breakpoints.down("sm")]: {
            fontSize: 36,
        },
    },
    subtitle: {
        fontSize: 32,
        fontWeight: "normal",
        [theme.breakpoints.down("sm")]: {
            fontSize: 24,
            display: "none",
        },
    },
    blue: {
        //color: theme.palette.primary.actionLighter,
        color: "#0f177f",
        fontWeight: 600,
    },
});


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            _history: HISTORY,
            _is_share_dialog_open: false,
            _quote: t( "pages.home.quotes")[random_quote_index]
        };
    };

    componentDidMount() {

        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 250);
    }

    _go_to_url = (event, url) => {

        const { _history } = this.state;
        _history.push(url);
    };


    _handle_share_dialog_close = () => {

        this.setState({_is_share_dialog_open: false});
        actions.trigger_sfx("state-change_confirm-down");
        actions.jamy_update("suspicious");
    };

    _handle_share_dialog_open = () => {

        this.setState({_is_share_dialog_open: true});
        actions.trigger_sfx("hero_decorative-celebration-02");
        actions.jamy_update("happy");
    };

    _handle_speed_dial_close = () => {

        this.setState({_is_speed_dial_open: false});
    };

    _handle_speed_dial_open = () => {

        this.setState({_is_speed_dial_open: true});
    };

    _handle_speed_dial_action = (event, action) => {

        switch (action) {

            case "share":
                this._handle_share_dialog_open();
                break;
        }
    };

    render() {

        const { classes, _is_share_dialog_open, _quote } = this.state;


        return (
            <div className={classes.root}>
                <div className={classes.backgroundImage}>
                    <div className={classes.headerContainer}>
                        <h1 className={classes.title}>
                            <span><span className={classes.blue}>PIXA.PICS</span> - to pixel art, then draw.</span><br />
                            <span>Make potential (un)limited</span><br />
                            <span><img src={get_svg_in_b64(<AngelEmojiSvg />)} className="emoji"/> everywhere.</span>
                        </h1>
                        <h2 className={classes.subtitle}>
                            At the horizon of <span className={classes.blue}>matrix</span> and <span className={classes.blue}>vectorial</span>, <br/>
                            discover an unprecedented industrial and educative purpose.<br />
                            Made with <img className={"emoji pulse"} src={get_svg_in_b64(<HearthEmojiSvg />)}/>, it is designed to be - forever open-source & for everyone. <img src={get_svg_in_b64(<EarthEmojiSvg />)} className={"emoji"}/>.<br />
                        </h2>
                        <Button variant={"contained"} color="primary" onClick={(event) => this._go_to_url(event, "/pixel")}>
                            Start using it
                        </Button>
                    </div>
                    <div className={classes.quoteContainer}>
                        <blockquote>
                            “{_quote.text}”<br />
                            ― {_quote.author}
                        </blockquote>
                    </div>
                </div>
                <Grow in>
                    <Fab className={classes.fab} variant="extended" onClick={this._handle_share_dialog_open}>
                        <ShareIcon /> {t("words.share")}
                    </Fab>
                </Grow>
                <ShareDialog
                    open={_is_share_dialog_open}
                    onClose={this._handle_share_dialog_close}/>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
