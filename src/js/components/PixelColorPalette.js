import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import PixelColorPaletteItem from "../components/PixelColorPaletteItem";
import EraserIcon from "../icons/Eraser";

const styles = theme => ({
    colorPalette: {
        contain: "contents",
        padding: 24,
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        alignContent: "stretch",
        "& > *:not(:last-child)": {
            marginRight: 8,
            marginBottom: 8,
        },
        flexWrap: "wrap"
    },
    eraseButton: {
        marginBottom: 8,
    },
});


class PixelColorPalette extends React.PureComponent {

    constructor(props) {
        super(props);
        this.st4te = {
            classes: props.classes,
            colors: props.colors || [],
            selected_colors:  props.selected_colors || ["#"],
            padding: props.padding || 24,
            gap: props.gap || 0,
            size: props.size || 32,
            transparent: props.transparent || false,
            align: props.align || "center",
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

        const { colors, selected_colors } = this.st4te;
        const update = Boolean(new_props.colors[0] !== colors[0].length || new_props.colors.length !== colors.length || new_props.selected_colors.length !== selected_colors.length || (new_props.selected_colors || ["#"])[0] !== (selected_colors || ["#"])[0]);

        if(update){
            this.setSt4te(new_props, () => {
                this.forceUpdate();
            });
        }
    }

    _handle_color_item_click = (event, color) => {

        if(typeof this.props.onColorClick === "function") {

            this.props.onColorClick(event, color);
        }
    };

    render() {

        let { classes, colors, padding, gap, size, transparent, align, selected_colors } = this.st4te;

        return (
            <div className={classes.colorPalette} style={align === "center" ? {padding, gap}: align === "left" ? {justifyContent: "start", padding, gap}: {justifyContent: "start", padding, gap}}>
                <PixelColorPaletteItem style={transparent ? {}: {display: "none"}}
                                       size={40}
                                       className={classes.eraseButton}
                                       icon={<EraserIcon />}
                                       full_width={true}
                                       color={"#00000000"}
                                       selected={Boolean((selected_colors.indexOf("#00000000")|0) >= 0)}
                                       onClick={(event) => {this._handle_color_item_click(event, "#00000000")}}/>
                {colors.map((color, index) => {

                    var selected = Boolean((selected_colors.indexOf(color)|0) >= 0);
                    return (<PixelColorPaletteItem key={"c-"+color+"-i-"+index+"-s-"+(selected ? "1": "0")}
                                                  color={color}
                                                  size={size}
                                                  selected={selected}
                                                  onClick={this._handle_color_item_click} />);
                })}
            </div>
        );
    }
}

export default withStyles(styles)(PixelColorPalette);
