import React from "react";
import { withStyles } from "@material-ui/core";

import { HISTORY } from "../utils/constants";

import {Button} from "@material-ui/core";
import actions from "../actions/utils";

import AngelEmojiSvg from "../twemoji/react/1F607";
const ANGELEMOJI = get_svg_in_b64(<AngelEmojiSvg />);
import HearthEmojiSvg from "../twemoji/react/2665";
const HEARTHEMOJI = get_svg_in_b64(<HearthEmojiSvg />);
import EarthEmojiSvg from "../twemoji/react/1F30D";
const EARTHEMOJI = get_svg_in_b64(<EarthEmojiSvg />);

import get_svg_in_b64 from "../utils/svgToBase64";

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

    _handle_speed_dial_action = (event, action) => {

        switch (action) {

            case "share":
                actions.trigger_share();
                break;
        }
    };

    _open_link = (event, url) =>{

        window.open(url);
    };

    render() {

        const { classes, _quote } = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.backgroundImage}>
                    <div className={classes.headerContainer}>
                        <h1 className={classes.title}>
                            <span><span className={classes.blue}>PIXA.PICS</span> - to pixel art, then draw.</span><br />
                            <span>Make potential (un)limited</span><br />
                            <span><img src={ANGELEMOJI} className="emoji"/> everywhere.</span>
                        </h1>
                        <h2 className={classes.subtitle}>
                            At the horizon of <span className={classes.blue}>matrix</span> and <span className={classes.blue}>vectorial</span>, <br/>
                            discover an unprecedented industrial and educative purpose.<br />
                            Made with <img className={"emoji pulse"} src={HEARTHEMOJI}/>, it is designed to be - forever open-source & for everyone. <img src={EARTHEMOJI} className={"emoji"}/>.<br />
                        </h2>
                        <Button variant={"contained"} color="primary" onClick={(event) => this._go_to_url(event, "/pixel")}>
                            Start using it
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
