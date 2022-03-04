import React from "react";
import { withStyles } from "@material-ui/core/styles"

import {Dialog, Button, DialogContent, DialogActions, Typography, Slider, ImageList, ImageListItem, ImageListItemBar, IconButton} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import TimeAgo from "javascript-time-ago";
import {t} from "../utils/t";

const styles = theme => ({

});


class PixelDialogCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            keepMounted: props.keepMounted || false,
            open: props.open,
            size: props.size,
            pixel_arts: props.pixel_arts,
        };
    };

    componentDidMount() {


    }

    componentWillReceiveProps(new_props) {

        if(
            this.state.open !== new_props.open ||
            this.state.size !== new_props.size ||
            Object.keys(this.state.pixel_arts).length !== Object.keys(new_props.pixel_arts).length
        ) {



            this.setState({...new_props}, () => {

                this.forceUpdate();
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        return false;
    }

    _set_size_from_slider = (event, value) => {

        if(this.props.on_import_size_change) {

            this.props.on_import_size_change(event, value);
        }
    };

    render() {

        const {
            classes,
            size,
            open,
            keepMounted,
            pixel_arts,
        } = this.state;

        return (
            <Dialog open={open}
                    onClose={this.props.onClose}
                    keepMounted={keepMounted}>
                <DialogContent>
                    <Typography component={"h2"} variant={"h6"}>Upload an image</Typography>
                    <div style={{padding: "8px 24px", position: "relative", overflow: "hidden", boxSizing: "border-box", width: "100%"}}>
                        <Typography id="size-slider" gutterBottom>Reduce size to</Typography>
                        <Slider value={size} step={8} valueLabelDisplay="auto" min={16} max={size > 192 ? size: 192} onChangeCommitted={this._set_size_from_slider} aria-labelledby="size-slider"/>
                    </div>
                    <Button fullWidth variant="contained" color="primary" autoFocus onClick={this.props.on_upload}>UPLOAD</Button>
                    <Typography component={"h2"} variant={"h6"} style={{marginTop: 16}}>Unsaved work</Typography>
                    <div style={{padding: "8px 24px", position: "relative", display: "flex", flexWrap: "wrap", justifyContent: "space-around", overflow: "hidden",}}>
                        <ImageList rowHeight={200} cols={2.5} style={{minWidth: 508, flexWrap: "nowrap", transform: "translateZ(0)", contains: "strict"}}>
                            {
                                Object.values(pixel_arts).sort((a, b) => b.timestamp - a.timestamp).map((v) => {

                                    const {id, kb, preview, timestamp} = v;
                                    return (
                                        <ImageListItem className={"pixelated"} key={id}>
                                            <img src={preview} alt={id} style={{cursor: "pointer"}} onClick={() => {this.props.import_JSON_state(id)}}/>
                                            <ImageListItemBar
                                                title={new TimeAgo(document.documentElement.lang).format(timestamp)}
                                                subtitle={<span>{kb.toFixed(2)} Kb</span>}
                                                actionIcon={
                                                    <IconButton style={{color: "#fff"}} onClick={() => {this.props.on_pixel_art_delete(id)}} aria-label={`Delete`}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                }
                                            />
                                        </ImageListItem>);
                                })
                            }
                        </ImageList>
                    </div>
                 </DialogContent>
                <DialogActions>
                    <Button variant="text" color="primary" autoFocus onClick={this.props.onClose}>{t( "words.close" )}</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(styles)(PixelDialogCreate);
