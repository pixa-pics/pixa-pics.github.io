import React from "react";
import { withStyles } from "@material-ui/core/styles"

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {t} from "../utils/t";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import HistoryRoundedIcon from "@material-ui/icons/HistoryRounded";
import DeleteIcon from "@material-ui/icons/Delete";

import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import TimeAgo from "javascript-time-ago";

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

        if(this.state.open !== new_props.open || this.state.size !== new_props.size || Object.entries(this.state.pixel_arts).length !== Object.entries(new_props.pixel_arts).length) {

            this.setState(new_props, () => {

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
                                Object.entries(pixel_arts).reverse().map((e) => {

                                    const [k, v] = e;

                                    if(!v){return}

                                    const {id, kb, preview, timestamp} = JSON.parse(v);
                                    return (
                                        <ImageListItem className={"pixelated"} key={id}>
                                            <img src={preview} alt={id} style={{cursor: "pointer"}} onClick={() => {this.props.import_JSON_state(v)}}/>
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
