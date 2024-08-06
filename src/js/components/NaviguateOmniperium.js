import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Dialog from "@material-ui/core/Dialog";
import OmniperiumMenu from "../icons/OmniperiumMenu";
import actions from "../actions/utils";
import InfoIcon from "@material-ui/icons/Info";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
    dialogMobileFullscreen: {
        "& .MuiPaper-root": {
            background: "transparent",
            backgroundSize: "contain",
            contentVisibility: "auto",
            contain: "paint style layout",
            boxShadow: "none",
            overflow: "hidden"
        },
        "& .MuiBackdrop-root": {
            background: "rgba(1,3,15,0.57)",
        },
        "& svg:first-child": {
            //filter: "drop-shadow(0px 0px 24px #0c00ffaa) drop-shadow(0px 0px 12px #0a00db55) drop-shadow(0px 0px 6px #0900bb66) drop-shadow(0px 0px 3px #07008f77)"
        }
    },
    "@keyframes glitch": {
        "0%": { opacity: ".10"},
        "25%": { opacity: "0"},
        "50%": { opacity: ".80"},
        "75%": { opacity: "0"},
        "100%": { opacity: ".90"},
    },
    activateSVG: {
        cursor: "pointer",
        animationFillMode: "both",
        animationName: "$glitch",
        animationDuration: "750ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "750ms",
    },
    restrictedSVG: {
        animationFillMode: "both",
        animationName: "$glitch",
        animationDuration: "250ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "50ms",
    },
    dialogContentContainer: {
        marginTop: 16,
        height: 666,
        [theme.breakpoints.up("lg")]: {
            display: "inline-flex",
        },
        display: "grid",
    }
});


class NavigateOmniperium extends React.PureComponent {

    constructor(props) {
        super(props);
        this.st4te = {
            classes: props.classes,
            hover: "welcome",
            video: {pause: function (){}},
            open: props.open
        };
    };

    setSt4te(st4te, callback) {
        "use strict";
        let keys = Object.keys(st4te);
        let keys_length = keys.length | 0;
        let key = "";

        for (let i = 0; (i|0) < (keys_length|0); i = (i+1|0)>>>0) {

            key = keys[i]+"";
            this.st4te[key] = st4te[key];
        }

        if(typeof callback === "function") {

            callback();
        }
    }

    omniperium_naviguate = (path) => {

        actions.trigger_omniperium_menu(path);
    }

    omniperium_hover = (path) => {
        if(path !== this.st4te.hover) {
            //this.st4te.video.pause();
            this.setSt4te({hover: path}, () => {
                this.forceUpdate(( ) => {
                    document.getElementById("explanation-video").play();
                });
            });
        }

    }

    componentDidMount() {

        actions.trigger_loading_update(100);

    }

    componentWillReceiveProps(new_props) {

        const open_changed = this.st4te.open !== new_props.open;
        if(
            open_changed
        ) {

            this.setSt4te(new_props, () => {

                this.forceUpdate(() => {
                    if(open_changed) {
                        if(this.st4te.open) {
                            try {
                                document.getElementById("particles-video").play();
                                document.getElementById("explanation-video").play();
                                document.getElementById("particles-background-video").play();
                            } catch(e){}
                        }else {
                        }
                    }
                });
            });
        }
    }

    _resume_video = () => {

        try {
            var video = document.getElementById("explanation-video");
            video.play();
        }catch(e){}
    };

    render() {

        const {
            classes,
            open,
            hover
        } = this.st4te;

        return (
            <React.Fragment>
                <Dialog open={open}
                        className={classes.dialogMobileFullscreen}
                        maxWidth={"xl"}
                        onClose={this.props.onClose}
                        disablePortal={true}
                        keepMounted={true}>
                    <OmniperiumMenu onHoverPathChange={(path) => {this.omniperium_hover(path)}} onPathChange={(path) => {this.omniperium_naviguate(path)}} className={classes.activateSVG} style={{height: "min(75vh, 75vw)", width: "min(75vh, 75vw)", margin: "auto"}}/>
                </Dialog>
                <img src="/src/videos/omniperium/poster.jpg" width="720" height="720" style={{display: open ? "inherit": "none",  pointerEvents: "none", zIndex: "1500", cursor: "pointer", aspectRatio: "1 / 1", width: "min(300px, 19vw)", height: "min(300px, 19vw)", position: "fixed", left: "0%", bottom: "0%", mixBlendMode: "color-dodge"}}/>
                <video width="720" height="720" style={{display: open ? "inherit": "none",  pointerEvents: "none", zIndex: "1500", cursor: "pointer", aspectRatio: "1 / 1", width: "min(300px, 19vw)", height: "min(300px, 19vw)", position: "fixed", left: "0%", bottom: "0%", mixBlendMode: "screen"}}  key={hover} autoPlay={open} id="explanation-video">
                    <source src={"/src/videos/omniperium/"+hover+".mp4"} type="video/mp4"/>
                </video>
                <video width="1920" height="1080" style={{display: open ? "inherit": "none", zIndex: "1401", pointerEvents: "none", minWidth: "100vw", aspectRatio: "16 / 9", position: "fixed", left: "0", bottom: "0", mixBlendMode: "screen"}} id="particles-video" loop={false}>
                    <source src="/src/videos/particles3.mp4" type="video/mp4"/>
                </video>
                <video width="1920" height="1080" style={{display: open ? "inherit": "none", zIndex: "1400", pointerEvents: "none", minWidth: "100vw", aspectRatio: "16 / 9", position: "fixed", left: "0", bottom: "0", mixBlendMode: "color-dodge"}} id="particles-background-video" key={open} autoPlay={open} loop={open}>
                    <source src="/src/videos/particles.mp4" type="video/mp4"/>
                </video>
                <IconButton style={{position: "absolute", top: 16, right: 16, color: "white", zIndex: "1402",}} onClick={() => {this.omniperium_hover("explanation")}}>
                    <InfoIcon style={{color: "currentColor"}}/>
                </IconButton>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(NavigateOmniperium);
