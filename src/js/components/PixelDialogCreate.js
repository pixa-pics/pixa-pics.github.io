import React from "react";
import { withStyles } from "@material-ui/core/styles"

import {Dialog, Button, DialogContent, DialogActions, Typography, Slider, ImageList, ImageListItem, ImageListItemBar, IconButton} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import {t} from "../utils/t";
import actions from "../actions/utils";

const styles = theme => ({
    dialogMobileFullscreen: {
        "& .MuiPaper-root": {
            maxHeight: "calc(100% - -24px)",
        }
    },
    dialogContentContainer: {
        marginTop: 16,
        [theme.breakpoints.up("lg")]: {
            display: "inline-flex",
        },
        display: "grid",
    },
    leftImage: {
        display: "none",
        [theme.breakpoints.up("lg")]: {
            display: "inherit",
            cursor: "pointer",
            float: "left",
            width: "384px",
            backgroundImage: "url(/src/images/infographics/Leana.svg)",
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            "& > button": {
                maxHeight: 36,
                height: 36,
                marginTop: "calc(100% - 18px)",
            }
        },
        "&:hover": {
            backgroundSize: "100%",
        }
    },
    rightImagesContainer: {
        float: "right",
    },
    uploadButtonDesktop: {
        background: "#928dbf",
        "&:hover": {
            background: "#7872ac",
        },
        boxShadow: "none",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "2.5em",
        "& .MuiSvgIcon-root": {
            marginRight: "1em",
        },
    },
    mainUploadButton: {
        display: "flex",
        [theme.breakpoints.up("lg")]: {
            display: "none",
        }
    }
});


class PixelDialogCreate extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            keepMounted: props.keepMounted || false,
            open: props.open,
            size: props.size,
            pixel_arts: props.pixel_arts,
            _paperplane: null,
        };
    };

    componentDidMount() {

        actions.trigger_loading_update(100);

        import("@lottiefiles/react-lottie-player").then(({Player}) => {

            this.setState({
                _paperplane: <Player
                    id={"paperplane"}
                    renderer={"svg"}
                    speed={0.75}
                    loop={true}
                    hover={true}
                    src="/src/js/lottie/paperplane.json"
                    style={{ height: '100%', width: '100%', position: "absolute", top: 0, left: 0, zIndex: 0}}/>
            }, () => {

                this.forceUpdate();
            })
        });
    }

    componentWillReceiveProps(new_props) {

        if(
            this.state.open !== new_props.open ||
            this.state.size !== new_props.size ||
            Object.keys(this.state.pixel_arts).join("-") !== Object.keys(new_props.pixel_arts).join("-")
        ) {

            this.setState(new_props, () => {

                this.forceUpdate();
            });
        }
    }

    _notify_size_from_slider = (event, value) => {

        if(this.props.on_import_size_change) {

            this.props.on_import_size_change(event, value);
        }
    };

    _handle_pixel_art_delete = (id) => {

        if(this.props.on_pixel_art_delete) {

            this.props.on_pixel_art_delete(id);
        }
    };

    render() {

        const {
            classes,
            size,
            open,
            keepMounted,
            pixel_arts,
            _paperplane,
        } = this.state;

        return (
            <Dialog open={open}
                    className={classes.dialogMobileFullscreen}
                    maxWidth={"xl"}
                    onClose={this.props.onClose}
                    disablePortal={false}
                    keepMounted={keepMounted}>
                <DialogContent>
                    <Typography component={"h2"} variant={"h6"}>New/old pixel art (minima)</Typography>
                    <div className={classes.dialogContentContainer}>
                        <div className={classes.leftImage}>
                            <input
                                onChange={this.props.on_upload}
                                accept="image/jpg, image/svg, image/jpeg, image/png, image/svg, image/webp, image/gif"
                                style={{display: "none"}}
                                id="button-file-dialog-primary"
                                type="file"
                            />
                            <Button
                                component={"label"}
                                htmlFor="button-file-dialog-primary"
                                fullWidth variant="contained"
                                color="secondary"
                                className={classes.uploadButtonDesktop}
                                autoFocus onClick={this.props.on_upload}>{_paperplane} <span style={{zIndex: 1, pointerEvents: "none"}}>Let's upload!</span></Button>
                        </div>
                        <div className={classes.rightImagesContainer}>
                            <div className={classes.rightImagesContainer} style={{padding: "8px 24px", position: "relative", overflow: "hidden", boxSizing: "border-box", width: "100%"}}>
                                <Typography id="size-slider" gutterBottom>Reduce size of minima to :</Typography>
                                <Slider key={size}
                                        defaultValue={parseInt(size)}
                                        step={8}
                                        valueLabelDisplay="auto"
                                        min={16} max={size > 512 ? size: 512}
                                        onChangeCommitted={this._notify_size_from_slider}
                                        aria-labelledby="size-slider"
                                />
                            </div>
                            <input
                                onChange={this.props.on_upload}
                                accept="image/jpg, image/svg, image/jpeg, image/png, image/svg, image/webp, image/gif"
                                style={{display: "none"}}
                                id="button-file-dialog-secondary"
                                type="file"
                            />
                            <Button
                                component={"label"}
                                htmlFor="button-file-dialog-secondary"
                                className={classes.mainUploadButton}
                                fullWidth
                                variant="contained"
                                color="primary"
                                autoFocus>
                                UPLOAD
                            </Button>
                            <Typography component={"h2"} variant={"h6"} style={{marginTop: 16, marginLeft: 24}}>Unsaved minima</Typography>
                            <div style={{padding: "8px 24px", position: "relative", display: "flex", flexWrap: "wrap", justifyContent: "space-around", overflow: "hidden", boxSizing: "border-box", width: "100%"}}>
                                <ImageList rowHeight={288} cols={2.0} style={{flexWrap: "nowrap", contain: "paint style layout", contains: "strict", maxWidth: "min(576px, (100vw - 96px))"}}>
                                    {Boolean(Object.keys(pixel_arts).length === 0) && <ImageListItem style={{maxWidth: "100%", display: "inline-block", width: "auto", userSelect: "none"}}
                                                    className={"pixelated"} key={"new"}>
                                        <img
                                            src={"/src/images/laboratory.svg"}
                                            alt={"Create new"}
                                            style={{width: "100%", height: "auto", cursor: "pointer"}}
                                            onClick={this.props.onClose}/>
                                        <ImageListItemBar
                                            title={"Create new painting"}
                                        />
                                    </ImageListItem>}
                                    {
                                        Object.values(pixel_arts).sort((a, b) => b.timestamp - a.timestamp).map((v, i) => {

                                            const {id, kb, preview, timestamp} = v;
                                            return (
                                                <ImageListItem style={{display: "inline-block", width: "auto", userSelect: "none"}} className={"pixelated"} key={id}>
                                                    <img onClick={() => {this.props.import_JSON_state(id)}} src={v.preview} alt={`preview ${i}`} style={{zIndex: 0, width: "auto", height: "100%", cursor: "pointer"}}/>
                                                    <ImageListItemBar
                                                        title={t(timestamp)}
                                                        subtitle={<span>{kb.toFixed(2)} Kb</span>}
                                                        actionIcon={
                                                            <IconButton style={{color: "#fff"}} onClick={(event) => {this._handle_pixel_art_delete(id)}} aria-label={`Delete`}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        }
                                                    />
                                                </ImageListItem>);
                                        })
                                    }
                                </ImageList>
                            </div>
                        </div>
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
