import React from "react";
import { withStyles } from "@material-ui/core";
import {ButtonBase, Tooltip} from "@material-ui/core";

const styles = theme => ({
    colorPaletteItem: {
        padding: 0,
        borderRadius: 0,
        height: 40,
        width: 40
    },
});


class PixelColorPaletteItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this.st4te = {
            classes: props.classes,
            selected: props.selected || false,
            color: props.color || "#00000000",
            size: props.size || "inherit",
            full_width: props.full_width || false,
            icon: props.icon || null,
            style: props.style || {},
            _is_dark: false //SIMDopeColor.new_hex(props.color||"#00000000").is_dark(),
        };
    };

    setSt4te(st4te, callback) {
        "use strict";
        let keys = Object.keys(st4te);
        let keys_length = keys.length | 0;
        let key = "";

        for (let i = 0; (i|0) < (keys_length|0); i = (i+1|0)>>>0) {

            key = keys[i].toString();
            this.st4te[key] = st4te[key];
        }

        if(typeof callback === "function") {

            callback();
        }
    }

    componentDidMount() {

        this.forceUpdate();
    }

    componentWillReceiveProps(new_props) {

        const { selected, color, size, icon, key } = this.st4te;
        const color_changed = Boolean(color !== new_props.color);
        const update = Boolean(key !== new_props.key || selected !== new_props.selected || color_changed || size !== new_props.size || icon !== new_props.icon);

        if(update){
            this.setSt4te(new_props, () => {
                this.forceUpdate();
            });
        }
    }

    render() {

        const { classes, full_width, selected, size, color, style, key } = this.st4te;

        return (
            <Tooltip title={color} key={key}>
                <ButtonBase
                    onClick={(event) => {this.props.onClick(event, color)}}
                    style={{
                        background: color,
                        /*boxShadow: `inset 0px 2px 4px -1px rgb(${0} ${0} ${0} / 20%), inset 0px 4px 5px 0px rgb(${0} ${0} ${0} / 14%), inset 0px 1px 10px 0px rgb(${0} ${0} ${0} / 12%)`,*/
                        width: full_width ? "100%": size,
                        height: size,
                        borderRadius: selected ? "50%": "0%",
                        ...style
                    }}
                    className={!full_width ? classes.colorPaletteItem: null}>
                </ButtonBase>
            </Tooltip>
        );
    }
}

export default withStyles(styles)(PixelColorPaletteItem);
