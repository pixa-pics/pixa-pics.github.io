import React from "react";
import JSLoader from "../utils/JSLoader";
import { withStyles } from "@material-ui/core";
const styles = theme => ({
    player: {
        display: "inline-flex",
        verticalAlign: "inherit",
    }
});

class Lottie extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            classNames: props.classNames || "",
            style: props.style,
            loop: props.loop || false,
            hover: props.hover || false,
            autoplay: props.autoplay || false,
            path: props.path  || props.src || "",
            initialSegment: props.initialSegment,
            id: props.id || Date.now().toString(16),
        };
    };

    _set_ref = (comp) => {

        const {loop, autoplay, path, hover, initialSegment, id} = this.state;

        JSLoader( () => import("../utils/lottie_light_svg")).then((lottie) => {
            lottie.loadAnimation({
                container: comp,
                loop: loop,
                autoplay: autoplay,
                quality: "medium",
                path: path,
                hover: hover,
                initialSegment: initialSegment
            });
        });
    }

    componentWillUnmount() {

        JSLoader( () => import("../utils/lottie_light_svg")).then((lottie) => {

            lottie.destroy(this.state.id);
        });
    }

    render() {

        const { classes, className, style } = this.state;
        const { id } = this.state;

        return (
            <div className={classes.player + " " + className} style={style} ref={this._set_ref} id={id}></div>
        );
    }
}

export default withStyles(styles)(Lottie);
