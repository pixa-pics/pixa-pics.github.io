const SHUFFLING_VALUES = [
    '!', '§', '$', '%',
    '&', '/', '(', ')',
    '=', '?', '_', '<',
    '>', '^', '°', '*',
    '#', '-', ':', ';', '~',
];

import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    
});


class ShufflingSpanText extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            style: props.style,
            pre: props.pre || "",
            text: props.text,
            app: props.app || "",
            animation_delay_ms: typeof props.animation_delay_ms !== "undefined" ? props.animation_delay_ms : 500,
            animation_duration_ms: typeof props.animation_duration_ms !== "undefined" ? props.animation_duration_ms : 3500,
            animation_fps: typeof props.animation_fps !== "undefined" ? props.animation_fps : 20,
            _text_proceed: "",
        };
    };

    shouldComponentUpdate() {

        return false;
    }

    componentDidMount() {
        
        this._run_animation();
    }

    _run_animation = () => {

        const { animation_delay_ms, animation_duration_ms, animation_fps, text } = this.state;

        const delay_timeout = setTimeout(() => {

            const animation_interval = setInterval(() => {

                let _text_proceed = "";

                for (let i = 0; i < text.length; i++) {

                    _text_proceed += SHUFFLING_VALUES[
                        Math.round(Math.random() * (SHUFFLING_VALUES.length-1))
                    ];
                }

                this.setState({_text_proceed}, () => {

                    this.forceUpdate();
                });
            }, 1000 / 100);

            const animation_timeout = setTimeout(() => {

                clearInterval(animation_interval);
                this.setState({_text_proceed: text}, () => {

                    this.forceUpdate();
                });

            }, animation_duration_ms);

        }, animation_delay_ms);
    };

    render() {

        const { classes, style } = this.state;
        const { _text_proceed, pre, app } = this.state;

        return (
            <span style={{willChange: "contents", ...style}}>{pre}{_text_proceed}{app}</span>
        );
    }
}

export default withStyles(styles)(ShufflingSpanText);
