const SHUFFLING_VALUES = [
    '!', '§', '$', '%',
    '&', '/', '(', ')',
    '=', '?', '_', '<',
    '>', '^', '°', '*',
    '#', '-', ':', ';', '~',
];

import React from "react";
import { withStyles } from "@material-ui/core";

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
            placeholder: props.placeholder || "",
            app: props.app || "",
            animation_delay_ms: typeof props.animation_delay_ms !== "undefined" ? props.animation_delay_ms : 500,
            animation_duration_ms: typeof props.animation_duration_ms !== "undefined" ? props.animation_duration_ms : 3500,
            animation_fps: typeof props.animation_fps !== "undefined" ? props.animation_fps : 30,
            _text_proceed: "",
            _text_proceed_started: false,
            _text_proceed_finished: false,
            _delay_timeout: null,
            _animation_timeout: null,
            _animation_interval: null,
        };
    };

    componentWillReceiveProps(new_props, ) {

        if(new_props.text !== this.state.text) {

            this.setState(new_props, () => {

                this._run_animation();
            });
        }
    }

    shouldComponentUpdate() {

        return false;
    }

    componentDidMount() {
        
        this._run_animation();
    }

    componentWillUnmount() {

        const {_delay_timeout, _animation_timeout,_animation_interval} = this.state;

        if(_delay_timeout !== null){ clearTimeout(_delay_timeout) }
        if(_animation_timeout !== null){ clearTimeout(_animation_timeout) }
        if(_animation_interval !== null){ clearInterval(_animation_interval) }
    }

    _run_animation = () => {

        const { animation_delay_ms, animation_duration_ms, animation_fps, text } = this.state;

        const _delay_timeout = setTimeout(() => {

            const _animation_interval = setInterval(() => {

                let _text_proceed = "";

                for (let i = 0; i < text.length; i++) {

                    _text_proceed += SHUFFLING_VALUES[
                        Math.round(Math.random() * (SHUFFLING_VALUES.length-1))
                    ];
                }

                this.setState({_text_proceed}, () => {

                    this.forceUpdate();
                });
            }, 1000 / animation_fps);

            const _animation_timeout = setTimeout(() => {

                clearInterval(_animation_interval);
                this.setState({_text_proceed: text, _text_proceed_finished: true}, () => {

                    this.forceUpdate();
                });

            }, animation_duration_ms);

            this.setState({_animation_timeout, _animation_interval, _text_proceed_started: true});

        }, animation_delay_ms);

        this.setState({_delay_timeout})
    };

    render() {

        const { classes, style } = this.state;
        const { _text_proceed, _text_proceed_started, _text_proceed_finished, pre, app, placeholder } = this.state;

        return (
            <span style={{willChange: Boolean(_text_proceed_started && !_text_proceed_finished) ? "contents": "auto", ...style}}>{pre}{_text_proceed || placeholder}{app}</span>
        );
    }
}

export default withStyles(styles)(ShufflingSpanText);
