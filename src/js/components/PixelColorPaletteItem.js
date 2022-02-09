import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Fade from "@material-ui/core/Fade";
import CheckBoldIcon from "../icons/CheckBold";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
    colorPaletteItem: {
        padding: 0,
        borderRadius: 0,
        height: 32,
        width: 32
    },
});


class PixelColorPaletteItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            selected: props.selected || false,
            color: props.color || "#00000000",
            size: props.size || "inherit",
            full_width: props.full_width || false,
            icon: props.icon || null,
            style: props.style || {}
        };
    };

    componentWillReceiveProps(new_props) {

        this.setState(new_props);
    }

    _get_rgba_from_hex = (color) => {

        color = color || "#00000000";

        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const a = parseInt(color.slice(7, 9), 16);

        return [r, g, b, a];
    };

    shouldComponentUpdate(new_props) {

        const { selected, color, size, icon } = this.state;

        if(selected !== new_props.selected || color !== new_props.color || size !== new_props.size || icon !== new_props.icon) {

            return true;
        }else {

            return false;
        }
    }

    render() {

        const { classes, full_width, selected, size, color, icon, style } = this.state;

        let [r, g, b, a] = this._get_rgba_from_hex(color);

        const is_color_dark = a > 96 && (r + g + b) * (255 - a) / 255 < 192 * 3;

        return (
            <Tooltip title={color}>
                <ButtonBase
                    fulllWidth={full_width}
                    onClick={this.props.onClick ? this.props.onClick: null}
                    style={{
                        background: color,
                        /*boxShadow: `inset 0px 2px 4px -1px rgb(${0} ${0} ${0} / 20%), inset 0px 4px 5px 0px rgb(${0} ${0} ${0} / 14%), inset 0px 1px 10px 0px rgb(${0} ${0} ${0} / 12%)`,*/
                        width: full_width ? "100%": size,
                        height: size,
                        ...style
                    }}
                    className={!full_width ? classes.colorPaletteItem: null}>
                    {selected ? <Fade in><CheckBoldIcon style={{color: is_color_dark ? "white": "black"}} /></Fade>: icon}
                </ButtonBase>
            </Tooltip>
        );
    }
}

export default withStyles(styles)(PixelColorPaletteItem);
