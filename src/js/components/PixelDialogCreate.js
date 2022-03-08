import React from "react";
import { withStyles } from "@material-ui/core/styles"

import {Dialog, Button, DialogContent, DialogActions, Typography, Slider, ImageList, ImageListItem, ImageListItemBar, IconButton} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import TimeAgo from "javascript-time-ago";
import {t} from "../utils/t";

const styles = theme => ({
    leftImage: {
        display: "none",
        [theme.breakpoints.up("lg")]: {
            display: "inherit",
            cursor: "pointer",
            float: "left",
            width: "384px",
            backgroundImage: "url(/src/images/selfie.svg)",
            backgroundSize: "95%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        },
    },
    rightImagesContainer: {
        float: "right",
    }
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
                    maxWidth={"xl"}
                    onClose={this.props.onClose}
                    keepMounted={keepMounted}>
                <DialogContent>
                    <Typography component={"h2"} variant={"h6"}>Upload an image</Typography>
                    <div style={{display: "inline-flex"}}>
                        <div className={classes.leftImage} onClick={this.props.on_upload}></div>
                        <div className={classes.rightImagesContainer}>
                            <div className={classes.rightImagesContainer} style={{padding: "8px 24px", position: "relative", overflow: "hidden", boxSizing: "border-box", width: "100%"}}>
                                <Typography id="size-slider" gutterBottom>Reduce size to</Typography>
                                <Slider value={size} step={8} valueLabelDisplay="auto" min={16} max={size > 512 ? size: 512} onChangeCommitted={this._set_size_from_slider} aria-labelledby="size-slider"/>
                            </div>
                            <Button fullWidth variant="contained" color="primary" autoFocus onClick={this.props.on_upload}>UPLOAD</Button>
                            <Typography component={"h2"} variant={"h6"} style={{marginTop: 16}}>Unsaved work</Typography>
                            <div style={{padding: "8px 24px", position: "relative", display: "flex", flexWrap: "wrap", justifyContent: "space-around", overflow: "hidden", boxSizing: "border-box", width: "100%"}}>
                                <ImageList rowHeight={288} cols={2.0} style={{flexWrap: "nowrap", transform: "translateZ(0)", contains: "strict", maxWidth: "576px"}}>
                                    <ImageListItem style={{display: "inline-block", width: "auto", userSelect: "none"}} className={"pixelated"} key={"new"}>
                                        <img src={"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MzYuMjcgNjc0LjIwNSIgd2lkdGg9IjExMTUuMDI3IiBoZWlnaHQ9Ijg5OC45NCIgeG1sbnM6dj0iaHR0cHM6Ly92ZWN0YS5pby9uYW5vIj48ZGVmcz48Y2xpcFBhdGggaWQ9IkEiPjxwYXRoIGQ9Ik0wIDBoODM2LjI3djY3NC4yMDVIMHoiLz48L2NsaXBQYXRoPjwvZGVmcz48ZyBjbGlwLXBhdGg9InVybCgjQSkiPjxwYXRoIGQ9Ik0yNDQuMzM1IDE4MS4zOTR2MTMwLjYzOGgtMzUuMjA2bC01Ni44My05OC44MjdoLS44MDQgMHExLjY5OCAyNi4xODEgMS42OTggMzcuMzVoMHY2MS40NzdoLTI0Ljc1MlYxODEuMzk0aDM0LjkzOGw1Ni43NDEgOTcuODQ0aC42MjYgMHEtMS4zNDEtMjUuNDY2LTEuMzQxLTM2LjAxaDB2LTYxLjgzNGgyNC45MyAwem0xMDguMTIxIDEwNy43NjN2MjIuODc1aC03NS4yMzhWMTgxLjM5NGg3NS4yMzh2MjIuNjk2aC00Ny41Mzh2MjguNjg0aDQ0LjIzMXYyMi42OTZoLTQ0LjIzMXYzMy42ODdoNDcuNTM4IDB6bTE4Ny43MzUtMTA3Ljc2M2wtMzMuMjQgMTMwLjYzOGgtMzEuNTQybC0xNy42OTMtNjguNjI1aDBxLS45ODMtMy42NjQtMy4zNTEtMTUuMTQ2aDAgMHEtMi4zNjctMTEuNDgyLTIuNzI1LTE1LjQxNGgwIDBxLS41MzYgNC44MjUtMi42ODEgMTUuNTAzaDAgMHEtMi4xNDQgMTAuNjc4LTMuMzA2IDE1LjIzNmgwbC0xNy42MDMgNjguNDQ2aC0zMS40NTNsLTMzLjMyOS0xMzAuNjM4aDI3LjI1M0w0MDcuMjMgMjUyLjdoMHE0LjM3OSAxOS43NDcgNi4zNDUgMzQuMjIzaDAgMHEuNTM2LTUuMDkzIDIuNDU3LTE1Ljc3MWgwIDBxMS45MjEtMTAuNjc4IDMuNjE5LTE2LjU3NmgwbDE5LjAzMy03My4xODJoMjYuMTgxbDE5LjAzMiA3My4xODJoMHExLjI1MSA0LjkxNSAzLjEyOCAxNS4wMTJoMCAwcTEuODc2IDEwLjA5NyAyLjg1OSAxNy4zMzVoMCAwcS44OTQtNi45NyAyLjg2LTE3LjM4aDAgMHExLjk2NS0xMC40MSAzLjU3NC0xNi44NDNoMGwxNi42Mi03MS4zMDZoMjcuMjUzIDB6IiBmaWxsPSIjNTYwNTYyIi8+PGNpcmNsZSB2ZWN0b3ItZWZmZWN0PSJub24tc2NhbGluZy1zdHJva2UiIGN4PSIxMjMiIGN5PSI0MjgiIHI9IjEyMyIgZmlsbD0iI2YyZjJmMiIvPjxwYXRoIGQ9Ik0yMCA0MTBjMC02Ny44ODYgNTUuMTE0LTEyMyAxMjMtMTIzczEyMyA1NS4xMTQgMTIzIDEyMy01NS4xMTQgMTIzLTEyMyAxMjNTMjAgNDc3Ljg4NiAyMCA0MTB6bTQ3LTExLjI2N2gxNDQuMTM1djIyLjUzNEg2N3YtMjIuNTM0aDB6bTgzLjMzNS02MC44MDF2MTQ0LjEzNkgxMjcuOFYzMzcuOTMyaDIyLjUzNSAwek0xMjcuOCAzOTguNzMzaDIyLjUzNXYyMi41MzRIMTI3Ljh2LTIyLjUzNHoiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2M4MmQyZCIvPjxwYXRoIGQ9Ik01OCA3MmgxMDh2MTA4SDU4VjcyeiIgZmlsbD0iI2YyZjJmMiIvPjxwYXRoIGQ9Ik03MyA1NmgxMDh2MTA4SDczVjU2eiIgZmlsbD0iIzI3MDU2MiIvPjxwYXRoIGQ9Ik0xNzEuODU4IDY2NC42NzZIMzMwLjI3djEuODc1SDE3MS44NTh2LTEuODc1ek0yMzQgMTQySDkyVjBoMTQydjE0MnptLTE0MC0yaDEzOFYySDk0djEzOHoiIGZpbGw9IiMzZjNkNTYiLz48cGF0aCBkPSJNMzAxIDI3NWgyOHYyOGgtMjh2LTI4eiIgZmlsbD0iI2YyZjJmMiIvPjxwYXRoIGQ9Ik0zMDcgMjY4aDI4djI4aC0yOHYtMjh6IiBmaWxsPSIjNTU4OGNmIi8+PHBhdGggZD0iTTM2MiAyODZoLTQ2di00Nmg0NnY0NnptLTQ0LTJoNDJ2LTQyaC00MnY0MnptLTY3IDM4M2MtODQuMzY0IDAtMTUzLTY4LjYzNi0xNTMtMTUzczY4LjYzNi0xNTMgMTUzLTE1MyAxNTMgNjguNjM2IDE1MyAxNTMtNjguNjM2IDE1My0xNTMgMTUzem0wLTMwNGMtODMuMjYyIDAtMTUxIDY3LjczOC0xNTEgMTUxczY3LjczOCAxNTEgMTUxIDE1MSAxNTEtNjcuNzM4IDE1MS0xNTEtNjcuNzM4LTE1MS0xNTEtMTUxem0yNzcuODU3IDMwNi42NzZINjg3LjI3djEuODc1SDUyOC44NTd2LTEuODc1em0xNDktMTcwSDgzNi4yN3YxLjg3NUg2NzcuODU3di0xLjg3NXoiIGZpbGw9IiMzZjNkNTYiLz48cmFkaWFsR3JhZGllbnQgaWQ9IkIiIGZ4PSIuNyIgZnk9Ii4xMTEiIGN4PSIuNSIgY3k9Ii41IiByPSIuNSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxOTEuODQ2LDM0LDI2LjgyMSwxMjAuNjY3LDUzOC40MSwyOC42NjcpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIxLjI1JSIgc3RvcC1jb2xvcj0iIzE3MGI5OSIvPjxzdG9wIG9mZnNldD0iNDMuNzUlIiBzdG9wLWNvbG9yPSIjMjcwMTYwIi8+PHN0b3Agb2Zmc2V0PSI5Ny45MTY2NjY2NjY2NjY2NiUiIHN0b3AtY29sb3I9IiMyZGM4YzMiLz48L3JhZGlhbEdyYWRpZW50PjxwYXRoIGQ9Ik02MjcuMzE0IDU4LjQ2M2gwYy0zMC4xODEgOC4xNzYtNDcuMjkzIDQxLjk1Ny0zOC4yMTkgNzUuNDUxbDExLjUyOCA0Mi41NTUgMTMuMDg4LTMuNTQ1IDMuMzA2LTE3LjgyIDIuMzc3IDE2LjI4IDg0LjEyNS0yMi43ODkgMy4wMDUtMTYuMiAyLjE2MSAxNC44IDkuNDcyLTIuNTY2LTkuMDUyLTMzLjQxM2MtMTAuNDQxLTM4LjU0My00Ny4wNi02Mi4xNjItODEuNzkxLTUyLjc1NHYuMDAxeiIgZmlsbD0idXJsKCNCKSIvPjxnIGZpbGw9IiNmZmI4YjgiPjxwYXRoIGQ9Ik01NjUuNSA1NzkuNWwxMyA0Ni0yIDE3IDM4LThzLTE2LTI3LTE0LTQxbC0zNS0xNHptMTcyLTE2NWwtMTAgNTQgMzMtNUw3NjIgNDA3bC0yNC41IDcuNWgweiIvPjxjaXJjbGUgdmVjdG9yLWVmZmVjdD0ibm9uLXNjYWxpbmctc3Ryb2tlIiBjeD0iNjM4LjUiIGN5PSIxMTguNSIgcj0iMzYiLz48cGF0aCBkPSJNNjI3IDE0NWwtMiAyMC0xNiA5IDQyIDkzIDMyLTc3LTIxLTE2LTItMzgtMzMgOWgweiIvPjwvZz48cGF0aCBkPSJNNjU2LjUgMjQ0LjVsLTQwLjk1NS03NC4xODFTNTgyLjUgMTcyLjUgNTc0LjUgMTc5LjVsMTYgMTAyLTUgMTNzLTQxIDQyLTMzIDEzM2w4IDE2MnMyOSAzNCA4OSAwdi0xODFsODUtN3YyMnM4OC0yMiA5MC01NWwtMjIuNjM4LTM5LjMxOWMtOS4wMDUtMTUuNjM3LTI3LjU3My0yMy4wMzktNDQuODY2LTE3Ljg4Nkw2ODIuNSAzMzMuNWwtOC0zMCA4LTIyczIxLTE2IDIxLTM3bDYtNDYtMzguODk5LTE3Ljk0N0w2NTYuNSAyNDQuNXoiIGZpbGw9IiMwZTBkMWMiLz48cGF0aCBkPSJNNzI3LjUgMjM2LjVsMTYgMzlzMTcgMjAgMjAgNDJsNSAyNnMxMiA0Ni03IDQ0bC0xNC00Ni0zLTEzLTE3LTI4LTI1LjA4NS00Ny42OEw3MjcuNSAyMzYuNXoiIGZpbGw9IiNmZmI4YjgiLz48ZyBmaWxsPSIjMGUwZDFjIj48cGF0aCBkPSJNNzMwLjUgNDU5LjVzMjguNjE1IDIuODA3IDM0LjMwNy0xMC4wOTdMNzkzLjUgNDcyLjVzNTEuOTY1IDEzLjkxNyAyMyAyNmMtMjcgMTEuMjYzLTU0LS43NjItNTQgMiAwIDAtOC03LTE3LTJzLTM2IDAtMzUtOCA1LTM3IDIwLTMxem0tMTUzIDE3MXMyOC42MTUgMi44MDcgMzQuMzA3LTEwLjA5N0w2NDAuNSA2NDMuNXM1Mi4xNjYgMTQuNDA5IDIzIDI2Yy0yNi45NzIgMTAuNzE5LTUzLjk4Ni0uNTk3LTU0IDIgMCAwLTgtNy0xNy0ycy0zNiAwLTM1LTggNS0zNyAyMC0zMXoiLz48L2c+PHBhdGggZD0iTTY5Ni41IDE5NC41bDEzIDQgMjggNDItNTEgMzQgMTAtODB6IiBmaWxsPSIjMjAwNjdhIi8+PGxpbmVhckdyYWRpZW50IGlkPSJDIiB4MT0iNjE0LjUiIHkxPSIxMzEuNSIgeDI9IjY1NS41IiB5Mj0iNzQuNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM4NmU1ZmYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxNTBmOTEiLz48L2xpbmVhckdyYWRpZW50PjxwYXRoIGQ9Ik02NDcuMzc1IDcwLjk2MWMtNy40MDEtNS41NzktMTYuNzA2LTcuODYxLTI1Ljc0LTUuNDE0bC0xLjA3My4yOTFjLTIwLjY4NiA1LjYwNC0zMi4zODUgMjguODY1LTI2LjEzIDUxLjk1NmgwbDYuOTMxLTEuODc4LTEuMTg5LTguODI0IDMuOTQ5IDguMDc2IDQxLjExLTExLjEzNiAxLjQ5MS04LjE0MiAxLjA5MiA3LjQ0MiA4LjA4OC0yLjE5MXExMy4yNzcgMjYuNTgtMS4wMzYgNjAuNjMzbDEzLjc3Ny0zLjczMiAyLjk4My0xNi4yODMgMi4xODMgMTQuODg0IDI2LjI2Mi03LjExNC0zLjgxNi0zNC41NTljLTYuNzI3LTI0LjgzMy0yNi44NjEtNDEuOTgzLTQ4Ljg4My00NC4wMDloLjAwMXoiIGZpbGw9InVybCgjQykiLz48bGluZWFyR3JhZGllbnQgaWQ9IkQiIHgxPSI2NjEuNTA4IiB5MT0iNjEuMTAzIiB4Mj0iNjY3LjMzMyIgeTI9IjI4LjMzMyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMS4yNDk5OTk5OTk5OTk5OTU2JSIgc3RvcC1jb2xvcj0iIzE2MGE5MSIvPjxzdG9wIG9mZnNldD0iOTYuNjY2NjY2NjY2NjY2NjclIiBzdG9wLWNvbG9yPSIjMGNmZmVmIi8+PC9saW5lYXJHcmFkaWVudD48Y2lyY2xlIHZlY3Rvci1lZmZlY3Q9Im5vbi1zY2FsaW5nLXN0cm9rZSIgY3g9IjY1NiIgY3k9IjQ5IiByPSIxOCIgZmlsbD0idXJsKCNEKSIvPjxwYXRoIGQ9Ik02NTUgNTlhMTcuOTkgMTcuOTkgMCAwIDEtNi4zMzMtMzQuODMyIDE3Ljk5IDE3Ljk5IDAgMCAwLTEwLjE0MyAzMC44NDQgMTcuOTkgMTcuOTkgMCAwIDAgMTguODEgMy44MmMtLjc3NC4xMDYtMS41NTMuMTYyLTIuMzM0LjE2OGgweiIgZmlsbD0iIzE3MTI5MyIvPjxlbGxpcHNlIHZlY3Rvci1lZmZlY3Q9Im5vbi1zY2FsaW5nLXN0cm9rZSIgY3g9IjY2MS41IiBjeT0iMTIwLjc1IiByeD0iNC41IiByeT0iNC4yNSIgZmlsbD0iI2ZmYjhiOCIvPjxwYXRoIGQ9Ik01NzUgNDY5Yy0yNC43NTUtMy42ODUtNTQuNzQyLTIuODI4LTg3IDBxMjAuMTczLTM2Ljk5IDAtNjVhMzYwLjkyIDM2MC45MiAwIDAgMCA4NyAwYy0xMi4zODkgMjAuNjI2LTExLjI5NiA0Mi4zODQgMCA2NXoiIGZpbGw9IiMxNTBmOTEiLz48cGF0aCBkPSJNNTYzLjUgMjM5LjVsLTMgNDBzLTE0IDIyLTE3IDY5bC0xIDI5cy0yMSA0MS00IDQwbDE2LTM5IDMwLTg3di00MmwtMjEtMTB6IiBmaWxsPSIjZmZiOGI4Ii8+PHBhdGggZD0iTTU4MS41IDE4MC41aC03cy0xMSA3LTIwIDM3bC0xMCAzMSA0NyAxMS0xMC03OXoiIGZpbGw9IiMyNzA1NjIiLz48cGF0aCBkPSJNNTE4IDQyNGgyOHYyOGgtMjh2LTI4eiIgZmlsbD0iI2QwY2RlMSIvPjwvZz48L3N2Zz4="}
                                             alt={"Create new"} style={{width: "auto", height: "100%", cursor: "pointer"}} onClick={this.props.onClose}/>
                                        <ImageListItemBar
                                            title={"Create new blank drawing"}
                                            subtitle={<span>0 Kb</span>}
                                        />
                                    </ImageListItem>
                                    {
                                        Object.values(pixel_arts).sort((a, b) => b.timestamp - a.timestamp).map((v, i) => {

                                            const {id, kb, preview, timestamp} = v;
                                            return (
                                                <ImageListItem style={{display: "inline-block", width: "auto", userSelect: "none"}} className={"pixelated"} key={id}>
                                                    <img src={preview} alt={id} style={{width: "auto", height: "100%", cursor: "pointer"}} onClick={() => {this.props.import_JSON_state(id)}}/>
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
