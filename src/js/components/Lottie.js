import React from "react";
import JSLoader from "../utils/JSLoader";
import { withStyles } from "@material-ui/core";
const styles = theme => ({
    player: {
        display: "inline-flex",
        verticalAlign: "inherit",
        "& svg": {
            willChange: "content",
            contain: "paint style size layout",
            pointerEvents: "none",
            transform: "translateZ(10px)",
            contentVisibility: "auto"
        }
    }
});

class Lottie extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            classNames: props.classNames || "",
            style: props.style,
            onClick: props.onClick || null,
            loop: props.loop || false,
            hover: props.hover || false,
            autoplay: props.autoplay || false,
            path: props.path  || props.src || "",
            initialSegment: props.initialSegment,
            id: "n"+props.id || "n"+(Math.random()*10000|0).toString(16),
        };
        this._lottie;
    };

    componentDidMount() {

        JSLoader( () => import("lottie-web/build/player/lottie_svg")).then((lottie) => {
            this._lottie = lottie;
            this._play_lottie();
        });
    }

    _play_lottie() {

        const {loop, autoplay, path, hover, initialSegment, id} = this.state;

        this._lottie.loadAnimation({
            container: document.getElementById(id),
            loop: loop,
            autoplay: autoplay,
            quality: "high",
            path: path,
            name: id,
            hover: hover,
            initialSegment: initialSegment
        });
    };

    componentWillUnmount() {

        this._lottie.destroy(this.state.id);
        delete this._lottie;
    }

    render() {

        const { classes, className, style, onClick, id } = this.state;

        return (
            <div className={classes.player + " " + (Boolean(className) ? "." + className: "").toString() + " .lottie"}
                 onClick={onClick}
                 style={style}
                 id={id}></div>
        );
    }
}

export default withStyles(styles)(Lottie);
