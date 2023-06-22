import React from "react";
import { withStyles } from "@material-ui/core/styles"
import {TextField, Divider, DialogActions, DialogContent, Button, Dialog, Typography, MenuItem} from "@material-ui/core";

import {t} from "../utils/t";

const styles = theme => ({

});


class PixelDialogText extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            keepMounted: props.keepMounted || false,
            open: props.open,
            _text: "",
            _size: 12,
        };
    };

    componentWillReceiveProps(new_props) {

        this.setState(new_props, () => {

            this.forceUpdate();
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        return false;
    }

    _handle_text_change = (event) => {

       this.setState({_text: event.target.value.toString()}, () => {

           this.forceUpdate();
       });
    };

    _handle_size_change = (event) => {

       this.setState({_size: parseInt(event.target.value)}, () => {

           this.forceUpdate();
       });
    };

    render() {

        const {
            classes,
            _text,
            _size,
            open,
            keepMounted,
        } = this.state;

        const sizes = [
            {
                value: 6,
                label: 'xs',
            },
            {
                value: 8,
                label: 's',
            },
            {
                value: 12,
                label: 'm',
            },
            {
                value: 16,
                label: 'l',
            },
            {
                value: 24,
                label: 'xl',
            },
            {
                value: 36,
                label: 'xxl',
            },
        ];

        return (
            <Dialog open={open}
                    fullWidth={true}
                    disablePortal={false}
                    onClose={this.props.onClose}
                    keepMounted={keepMounted}>
                <DialogContent>
                    <Typography component={"h2"} variant={"h6"}>Write text to a new layer</Typography>
                    <Divider />
                    <form noValidate autoComplete="off">
                        <TextField
                            fullWidth={true}
                            label={"Text"}
                            value={_text}
                            placeholder={"Text to draw"}
                            onChange={this._handle_text_change}
                        />
                        <TextField
                            select
                            fullWidth={true}
                            label="Size"
                            value={_size}
                            onChange={this._handle_size_change}
                            helperText="Please select your currency"
                        >
                            {sizes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </form>
                    <Button onClick={() => {this.props.onSuccess(_size, _text)}}>Draw it</Button>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="primary" autoFocus onClick={this.props.onClose}>{t( "words.close" )}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(PixelDialogText);
