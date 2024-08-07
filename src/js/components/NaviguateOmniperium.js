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
            background: "rgba(1,3,15,0.75)",
        },
        "& svg:first-child": {
            //filter: "drop-shadow(0px 0px 24px #0c00ffaa) drop-shadow(0px 0px 12px #0a00db55) drop-shadow(0px 0px 6px #0900bb66) drop-shadow(0px 0px 3px #07008f77)"
        }
    },
    "@keyframes glitchmenu": {
        "0%": { opacity: "0.15"},
        "25%": { opacity: "0"},
        "50%": { opacity: "0.7"},
        "75%": { opacity: "0"},
        "100%": { opacity: "1"},
    },
    activateSVG: {
        cursor: "pointer",
        animationFillMode: "both",
        animationName: "$glitchmenu",
        animationDuration: "750ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "750ms",
    },
    "@keyframes glitched": {
        "0%": { opacity: "1"},
        "60%": { opacity: "1"},
        "64%": { opacity: "0.72"},
        "68%": { opacity: "0.94"},
        "72%": { opacity: "1"},
        "76%": { opacity: "0.82"},
        "80%": { opacity: "1"},
        "84%": { opacity: "0.92"},
        "88%": { opacity: "0.84"},
        "92%": { opacity: "1"},
        "96%": { opacity: "0.90"},
        "100%": { opacity: "1"},
    },
    glitch: {
        animationFillMode: "both",
        animationName: "$glitched",
        animationDuration: "1250ms",
        animationTimingFunction: "linear",
        animationDirection: "alternate",
        animationIterationCount: "infinite",
        animationDelay: "0ms",
    },
    restrictedSVG: {
        animationFillMode: "both",
        animationName: "$glitchmenu",
        animationDuration: "750ms",
        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        animationDirection: "alternate",
        animationIterationCount: "1",
        animationDelay: "1050ms",
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
            open: props.open,
            _menu_pos: {},
            _menu_ref: {},
            _root_ref: {},
            _transform_rotate: "",
            _background_image: "",
            _filter: ""
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
                    try {
                        document.getElementById("explanation-video").play();
                    }catch(e){}
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

    setWrapperRef = (element) => {

        if(typeof element === "undefined") {return}
        if(element === null) {return}
        this.setSt4te({_root_ref: element}, () => {
            this.st4te._root_ref.addEventListener("pointermove",  this.computeRotation);
        });

    }

    setMenuRef = (element) => {

        if(typeof element === "undefined") {return}
        if(element === null) {return}
        console.log(element)
        const rect = element.getBoundingClientRect();
        this.setSt4te({_menu_ref: element, _menu_pos: rect});

    }

    computeRotation = (event) => {
            "use strict";
            console.log(event)
            const pageX = parseInt(event.pageX);
            const pageY = parseInt(event.pageY);
            const rect = this.st4te._menu_pos;
            console.log(rect)
            const perspective = 1;
            const currentScale = 1.0;
            const pos_x_in_canvas_container = pageX - rect.left | 0;
            const pos_y_in_canvas_container = pageY - rect.top | 0;

            const x = perspective * (pos_x_in_canvas_container - rect.width / 2) / (rect.width / 2);
            const y = -perspective * (pos_y_in_canvas_container - rect.height / 2) / (rect.height / 2);
            const p_x = x > perspective ? x : x * 2;
            const p_y = y < 0 ? y : 2 * y;
            const p_x_things = 255 - p_x / 2 * 255;
            const p_y_things = p_y / 2 * 255;

            const rotate_y = (p_x * 1.25 / currentScale * 1000 | 0) / 1000;
            const rotate_x = (p_y * 1.25 / currentScale * 1000 | 0) / 1000;
            const any_rotation = Boolean(rotate_x || rotate_y);

            const transform_rotate = any_rotation ? `rotateX(${rotate_x}deg) rotateY(${rotate_y}deg)`: ``
            const background_image = any_rotation ? `linear-gradient(to right, rgba(
                            ${p_x_things.toFixed(3)},
                            ${p_x_things.toFixed(3)},
                            ${p_x_things.toFixed(3)}, 
                            ${(Math.abs(p_x * 0.1) / (perspective*2)).toFixed(2)}
                            ), rgba(
                            ${p_x_things.toFixed(3)},
                            ${p_x_things.toFixed(3)},
                            ${p_x_things.toFixed(3)}, 
                            ${(Math.abs(p_x * 0.6) / (perspective*2)).toFixed(2)}
                            )), linear-gradient(to top, rgba(
                            ${p_y_things.toFixed(3)},
                            ${p_y_things.toFixed(3)},
                            ${p_y_things.toFixed(3)}, 
                            ${(Math.abs(p_y * 0.75) / (perspective*2)).toFixed(2)}
                            ), rgba(
                            ${p_y_things.toFixed(3)},
                            ${p_y_things.toFixed(3)},
                            ${p_y_things.toFixed(3)}, 
                            ${(Math.abs(p_y  * 0.25) / (perspective*2)).toFixed(2)}
                            ))`: ``;
            const filter_force = (1 + (-rotate_y + rotate_x) / 80).toFixed(2);
            const filter = any_rotation ? `brightness(${filter_force}) contrast(${filter_force})`: "";

            console.log(transform_rotate)
            this.setSt4te({
                _transform_rotate: transform_rotate,
                _background_image: background_image,
                _filter: filter
            }, () => {
                this.forceUpdate();
            });
    }

    render() {

        const {
            classes,
            open,
            hover,
            _transform_rotate,
            _background_image,
            _filter
        } = this.st4te;

        return (
            <React.Fragment>
                <Dialog open={open}
                        className={classes.dialogMobileFullscreen}
                        maxWidth={"xl"}
                        onClose={this.props.onClose}
                        disablePortal={true}
                        keepMounted={true}
                        ref={this.setWrapperRef}>
                    <div style={{perspective: 200}} ref={this.setMenuRef} className={classes.glitch}>
                        <OmniperiumMenu onHoverPathChange={(path) => {this.omniperium_hover(path)}} onPathChange={(path) => {this.omniperium_naviguate(path)}} className={classes.activateSVG} style={{height: "min(75vh, 75vw)", width: "min(75vh, 75vw)", margin: "auto", transform: _transform_rotate, filter: _filter}}/>
                    </div>
                </Dialog>
                {
                    open &&
                    <React.Fragment>
                        <img src="/src/videos/omniperium/poster.png" width="720" height="720" style={{display: open ? "inherit": "none", userSelect: "none",  pointerEvents: "none", zIndex: "1400", cursor: "pointer", aspectRatio: "1 / 1", width: "min(360px, 30vh)", height: "min(360px, 30vh)", position: "fixed", left: "0%", bottom: "0%", mixBlendMode: "inherit"}}/>
                        <img src="/src/videos/omniperium/poster.png" width="720" height="720" style={{display: open ? "inherit": "none", userSelect: "none",  pointerEvents: "none", zIndex: "1401", cursor: "pointer", aspectRatio: "1 / 1", width: "min(360px, 30vh)", height: "min(360px, 30vh)", position: "fixed", left: "0%", bottom: "0%", mixBlendMode: "saturation"}}/>
                        <video width="720" height="720" style={{display: open ? "inherit": "none",  pointerEvents: "none", userSelect: "none",  zIndex: "1500", cursor: "pointer", aspectRatio: "1 / 1", width: "min(360px, 30vh)", height: "min(360px, 30vh)", position: "fixed", left: "0%", bottom: "0%", mixBlendMode: "lighten"}}  key={hover} autoPlay={open} id="explanation-video">
                            <source src={"/src/videos/omniperium/"+hover+".mp4"} type="video/mp4"/>
                        </video>
                        <video width="1920" height="1080" style={{display: open ? "inherit": "none", zIndex: "1401", userSelect: "none",  pointerEvents: "none", minWidth: "100vw", aspectRatio: "16 / 9", position: "fixed", left: "0", bottom: "0", mixBlendMode: "lighten"}} id="particles-video" loop={false}>
                            <source src="/src/videos/particles3.mp4" type="video/mp4"/>
                        </video>
                        <video width="1920" height="1080" style={{display: open ? "inherit": "none", zIndex: "1250", userSelect: "none",  pointerEvents: "none", minWidth: "100vw", aspectRatio: "16 / 9", position: "fixed", left: "0", bottom: "0", mixBlendMode: "lighten"}} id="particles-background-video" key={open} autoPlay={open} loop={open}>
                            <source src="/src/videos/particles.mp4" type="video/mp4"/>
                        </video>
                        <img src="/src/images/omniperium/caution.svg" className={classes.restrictedSVG} style={{display: open ? "inherit": "none",  userSelect: "none", pointerEvents: "none", zIndex: "1501", cursor: "pointer", aspectRatio: "340 / 23", width: "95vw", position: "fixed", left: "2.5vw", bottom: "5vh"}}/>
                        <IconButton style={{position: "fixed", left: 16, right: 16, color: "white", zIndex: "1402",}} onClick={() => {this.omniperium_hover("explanation")}}>
                            <InfoIcon style={{color: "currentColor"}}/>
                        </IconButton>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(NavigateOmniperium);
