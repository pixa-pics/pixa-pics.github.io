import React from "react";
import { withStyles } from "@material-ui/core";

import { HISTORY } from "../utils/constants";

import {Button} from "@material-ui/core";
import actions from "../actions/utils";

import get_svg_in_b64 from "../utils/svgToBase64";

import AngelEmojiSvg from "../twemoji/react/1F607";
const ANGELEMOJI = get_svg_in_b64(<AngelEmojiSvg />);
import HearthEmojiSvg from "../twemoji/react/2665";
const HEARTHEMOJI = get_svg_in_b64(<HearthEmojiSvg />);
import EarthEmojiSvg from "../twemoji/react/1F30D";
const EARTHEMOJI = get_svg_in_b64(<EarthEmojiSvg />);

const styles = theme => ({
    root: {
        maxHeight: "calc(100% - 64px)",
        backgroundImage: "linear-gradient(to bottom, #4c56e057 60%, #fff28859 90%), radial-gradient(farthest-corner at 75% 75%, rgb(255 234 63) 5%, rgb(73 247 255) 50%, rgb(5 11 60) 90%)",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        "&::after": {
            content: `""`,
            position: "absolute",
            width: "100%;",
            height: "100%",
            right: 0,
            bottom: 0,
            zIndex: 1,
            filter: "opacity(.5)",
            backgroundImage: "radial-gradient(ellipse at max(25%, 25vh) max(75vh, 75%), #ffffff 14%, #ffffff57 75%)",
            animation: "$radial 5s ease-in-out infinite",
            "@global": {
                "@keyframes radial": {
                    "0%": {filter: "opacity(.5)"},
                    "20%": {filter: "opacity(.4)"},
                    "40%": {filter: "opacity(.6)"},
                    "60%": {filter: "opacity(.7)"},
                    "80%": {filter: "opacity(.4)"},
                    "100%": {filter: "opacity(.5)"},
                }
            },
        }
    },
    homeCTAuseit: {
        color: "#000000",
        backgroundImage: "linear-gradient(45deg, goldenrod, blanchedalmond, gold, darkgoldenrod, blanchedalmond, goldenrod, blanchedalmond)",
        fontWeight: "bold",
        filter: "sepia(.75) saturate(1.5) grayscale(0.9)",
        minWidth: "min(320px, calc(100% - 32px))",
        marginTop: "64px",
        "&:hover": {
            color: "#000",
        }
    },
    homeCTAsendit: {
        color: "#000000",
        backgroundImage: "linear-gradient(45deg, goldenrod, blanchedalmond, gold, darkgoldenrod, blanchedalmond, goldenrod, blanchedalmond)",
        filter: "sepia(.75) saturate(1.5) grayscale(0.1)",
        fontWeight: "bold",
        position: "fixed",
        minWidth: 128,
        zIndex: 2,
        bottom: 32,
        right: 32,
        "&:hover": {
            color: "#000",
        }
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundImage: "url(/src/images/background.svg)",
        position: "relative",
        backgroundSize: "150%",
        backgroundPosition: "0% 25vh",
        "&": {
            animation: "$slide 56s linear infinite",
            "@global": {
                "@keyframes slide": {
                    "0%": {backgroundPosition: "-150% 25vh"},
                    "20%": {backgroundPosition: "-50% 25vh"},
                    "40%": {backgroundPosition: "50% 25vh"},
                    "60%": {backgroundPosition: "150% 25vh"},
                    "80%": {backgroundPosition: "225% 25vh"},
                    "100%": {backgroundPosition: "300% 25vh"},
                }
            },
        },
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "border-box",
        padding: 64,
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(4)
        },
    },
    backgroundImageImage: {
        position: "absolute",
        filter: "contrast(0.8) brightness(1.2)",
        width: "max(90vh, 90%)",
        right: "calc(min(-36vh, -36%) + 128px)",
        top: "calc(max(36vh, 36%) + 128px)",
        transform: "translate(calc(min(-45vh, -45%) / 2), calc(min(-45vh, -45%) / 2))",
        zIndex: 1,
        "&": {
            animation: "$slide 14s linear infinite",
            "@global": {
                "@keyframes slide": {
                    "0%": {transform: "translate(calc(25vw - 25vh - 7%), -50%)"},
                    "20%": {transform: "translate(calc(25vw - 25vh - 14%), -50%)"},
                    "40%": {transform: "translate(calc(25vw - 25vh + 7%), -50%)"},
                    "60%": {transform: "translate(calc(25vw - 25vh + 14%), -50%)"},
                    "80%": {transform: "translate(calc(25vw - 25vh + 21%), -50%)"},
                    "100%": {transform: "translate(calc(25vw - 25vh + 7%), -50%)"},
                }
            },
        },
    },
    card: {
        margin: theme.spacing(1, 2)
    },
    headerContainer: {
        fontFamily: `"Jura"`,
        position: "absolute",
        marginTop: theme.spacing(-2),
        color: "#000000dd",
        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(-4)
        },
        zIndex: 2,
    },
    title: {
        fontSize: 48,
        fontWeight: "normal",
        [theme.breakpoints.down("sm")]: {
            fontSize: 32,
            lineHeight: "normal",
        },
    },
    subtitle: {
        fontSize: 24,
        fontWeight: "normal",
        [theme.breakpoints.down("sm")]: {
            fontSize: 16,
            display: "none",
        },
    },
    blue: {
        //color: theme.palette.primary.actionLighter,
        color: "#061482",
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
                    <img src="/src/images/fun.svg" className={classes.backgroundImageImage}/>
                    <div className={classes.headerContainer}>
                        <h1 className={classes.title}>
                            <span style={{fontSize: "1.314em"}}><span style={{color: "white", textShadow: "white 0px 0px 5px, lightblue 0px 0px 3px"}}>PIXA.PICS</span>, to edit a matrix of pixels.<br /> Then, draw & vectorize it.</span><br />
                            <span style={{fontSize: ".618em"}}>Make potential (un)limited everywhere <img src={ANGELEMOJI} className="emoji"/>.</span>
                        </h1>
                        <h2 className={classes.subtitle}>
                            AEON'S of the <span className={classes.blue}>raster/matrix</span> and <span className={classes.blue}>vector</span> regarding the universes of graphics, <br/>
                            You can draw and edit on (size) limited pixel art and use it to generate infinite paintings.<br />
                            Made with <img className={"emoji pulse"} src={HEARTHEMOJI}/>, it has been designed to be : For Everyone - For Free - Forever Open-Source <img src={EARTHEMOJI} className={"emoji"}/>.<br />
                        </h2>
                        <Button className={classes.homeCTAuseit} variant={"contained"} size={"large"} color="primary" onClick={(event) => this._go_to_url(event, "/pixel")}>
                            OPEN EDITOR NOW
                        </Button>
                    </div>
                </div>
                <Button className={classes.homeCTAsendit} variant={"contained"} size={"large"} color="primary"onClick={(event) => {this._handle_speed_dial_action(event, "share")}}>
                    SHARE
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
