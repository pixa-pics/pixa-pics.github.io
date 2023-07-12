import React from "react";
import { withStyles } from "@material-ui/core/styles"

import { t } from "../utils/t";

import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    FormControl,
    Tooltip,
    Button
} from "@material-ui/core";

import DialogCloseButton from "../components/DialogCloseButton";

import FileCopyIcon from "@material-ui/icons/FileCopy";
import EmailIcon from "@material-ui/icons/Email"
import WhatsAppIcon from "../icons/WhatsApp";
import PinterestIcon from "../icons/Pinterest";
import LinkedInIcon from "../icons/LinkedIn";
import FacebookIcon from "../icons/Facebook";
import BloggerIcon from "../icons/Blogger";
import TwitterIcon from "../icons/Twitter";
import RedditIcon from "../icons/Reddit";;

import clipboard from "clipboard-polyfill";
import actions from "../actions/utils";

const styles = theme => ({
    shareIconButtonContainer: {
        maxWidth: 300,
        margin: theme.spacing(2, 0),
    },
    shareIconButtonWhatsApp: {
        color: "#3fd366",
        backgroundImage: "radial-gradient(#3fd36633 100%, transparent), radial-gradient(white 100%, transparent)",
        "&:hover": {
            backgroundImage: "radial-gradient(#3fd3664d 100%, transparent), radial-gradient(white 100%, transparent)",
        },
        margin: theme.spacing(1),
    },
    shareIconButtonFacebook: {
        color: "#3b5998",
        backgroundImage: "radial-gradient(#3b599833 100%, transparent), radial-gradient(white 100%, transparent)",
        "&:hover": {
            backgroundImage: "radial-gradient(#3b59984d 100%, transparent), radial-gradient(white 100%, transparent)",
        },
        margin: theme.spacing(1),
    },
    shareIconButtonTwitter: {
        color: "#49a1f2",
        backgroundImage: "radial-gradient(#49a1f233 100%, transparent), radial-gradient(white 100%, transparent)",
        "&:hover": {
            backgroundImage: "radial-gradient(#49a1f24d 100%, transparent), radial-gradient(white 100%, transparent)",
        },
        margin: theme.spacing(1),
    },
    shareIconButtonEmail: {
        color: "#888888",
        backgroundImage: "radial-gradient(#88888833 100%, transparent), radial-gradient(white 100%, transparent)",
        "&:hover": {
            backgroundImage: "radial-gradient(#8888884d 100%, transparent), radial-gradient(white 100%, transparent)",
        },
        margin: theme.spacing(1),
    },
    shareIconButtonReddit: {
        color: "#f24401",
        backgroundImage: "radial-gradient(#f2440133 100%, transparent), radial-gradient(white 100%, transparent)",
        "&:hover": {
            backgroundImage: "radial-gradient(#f244014d 100%, transparent), radial-gradient(white 100%, transparent)",
        },
        margin: theme.spacing(1),
    },
    shareIconButtonPinterest: {
        color: "#bd161c",
        backgroundImage: "radial-gradient(#bd161c33 100%, transparent), radial-gradient(white 100%, transparent)",
        "&:hover": {
            backgroundImage: "radial-gradient(#bd161c4d 100%, transparent), radial-gradient(white 100%, transparent)",
        },
        margin: theme.spacing(1),
    },
    shareIconButtonBlogger: {
        color: "#f37d00",
        backgroundImage: "radial-gradient(#f37d0033 100%, transparent), radial-gradient(white 100%, transparent)",
        "&:hover": {
            backgroundImage: "radial-gradient(#f37d004d 100%, transparent), radial-gradient(white 100%, transparent)",
        },
        margin: theme.spacing(1),
    },
    shareIconButtonLinkedIn: {
        color: "#3478b5",
        backgroundImage: "radial-gradient(#3478b533 100%, transparent), radial-gradient(white 100%, transparent)",
        "&:hover": {
            backgroundImage: "radial-gradient(#3478b54d 100%, transparent), radial-gradient(white 100%, transparent)",
        },
        margin: theme.spacing(1),
    },
    fontWeightBold: {
        fontWeight: "bold",
        color: "#000",
    },
    dialogImage: {
        display: "inline-block",
        padding: theme.spacing(2),
        width: 320,
        marginLeft: 48,
        backgroundSize: "cover",
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
            display: "none",
            width: 0,
            padding: 0,
            marginLeft: 0
        }
    },
    dialogContent: {
        display: "inline-block",
        backgroundImage: "radial-gradient(farthest-corner at 0px 0px, #ffffffaa 25%, #43e0 75%), radial-gradient(farthest-corner at 0% 100%, #ffffffaa 25%, #43e0 75%)",
        marginRight: 48,
        [theme.breakpoints.down("xs")]: {
            marginRight: "auto",
            marginLeft: "auto"
        }
    },
    dialogImageWebShare: {
        display: "inline-block",
        padding: theme.spacing(2),
        width: 320,
        marginLeft: 48,
        backgroundSize: "cover",
        textAlign: "center"
    },
    dialogContentWebShare: {
        display: "inline-block",
        backgroundImage: "radial-gradient(farthest-corner at 0px 0px, #ffffffaa 25%, #43e0 75%), radial-gradient(farthest-corner at 0% 100%, #ffffffaa 25%, #43e0 75%)",
        marginRight: 48,
        [theme.breakpoints.down("xs")]: {
            display: "none",
            width: 0,
            padding: 0,
            marginLeft: 0
        }
    },
    dialogInner: {
        display: "inherit",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        "& > div" : {
            borderRadius: 4,
            boxShadow: "0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
            backgroundColor: "#ffffffff",
        }
    },
    buttonClose:{
        textTransform: "initial",
        margin: "12px 24px",
        position: "absolute",
        right: 0,
        width: 259,
        bottom: 0,
        zIndex: 1,
        "@media only screen and (max-width: 600px)": {
            width: 196,
        },
        "@media only screen and (max-width: 760px)": {
            width: 196,
        }
    },
    desktopintrovideowrapper: {
        cursor: "pointer",
        margin: "12px 24px",
        position: "absolute",
        right: 0,
        bottom: -14,
        height: 259,
        width: 259,
        "&::after": {
            content: "''",
            background: `#fff !important`,
            position: "absolute",
            right: 0,
            top: 0,
            width: "10%",
            height: "15%"
        },
        "@media only screen and (max-width: 600px)": {
            height: 196,
            width: 196,
        },
        "@media only screen and (max-width: 760px)": {
            height: 196,
            width: 196,
        }
    },
    desktopintrovideo: {
        position: "absolute",
        right: 0,
        bottom: 0,
        height: "100%",
        width: "100%"
    },
});


class ShareDialog extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            open: props.open,
            keep_open: props.keep_open,
            _countdown: 0,
            _keep_open: 0,
            _web_share: false,
            _video_n: 1,
        };
    };

    componentWillReceiveProps(new_props) {

        const just_being_open = new_props.open && !this.state.open;

        if(just_being_open) {
            if (navigator.share) {
                this.setState({_web_share: true});
                navigator.share({
                    url: window.location.href,
                }).then(() => {this.props.onClose(null)}).catch((e) => {});
            }
        }

        this.setState({...new_props, _keep_open: just_being_open ? (new_props.keep_open || 0): this.state._keep_open, _video_n: navigator.onLine ? Math.round(1+Math.random()*6): 1}, () => {

            if(just_being_open) {

                const _countdown = setInterval(() => {
                    let _keep_open = this.state._keep_open;
                    if(_keep_open > 0){
                        _keep_open--;
                        this.setState({_keep_open}, () => {
                            this.forceUpdate();
                        })
                    }else{
                        clearInterval(_countdown);
                    }
                }, 1000);

                this.setState({_countdown});
            }
        });
    }

    componentWillUnmount() {

        clearInterval(this.state._countdown)
    }

    _copy_url = (event, url) => {

        if(url !== null) {

            clipboard.writeText(url).then(
                function () {

                    actions.trigger_snackbar(t( "sentences.url successfully copied"));
                },
                function () {

                    actions.trigger_snackbar(t( "sentences.cannot copy this url"));
                }
            );
        }else {

            actions.trigger_snackbar(t( "sentences.cannot copy non-existent url"));
        }
    }

    _open_url = (event, url) => {

        window.open(url);
    }

    _resume_video = () => {

        try {
            var video = document.getElementById("share-video");
            video.play();
        }catch(e){}
    };

    render() {

        const { classes, open, _keep_open, _web_share, _video_n } = this.state;

        const url = window.location.href;

        return (
            <div>
                <Dialog
                    disablePortal={false}
                    keepMounted={false}
                    open={open || _keep_open > 0}
                    onClose={(event) => {this.props.onClose(event)}}
                    PaperProps={{style: {background: "none", boxShadow: "none"}}}
                >
                    <div className={classes.dialogInner}>
                        <div className={_web_share ? classes.dialogContentWebShare: classes.dialogContent}>
                            <DialogTitle>
                                {t( "components.share_dialog.title")}
                                <DialogCloseButton onClick={(event) => {this.props.onClose(event)}} />
                            </DialogTitle>
                            <DialogContent>
                                <div className={classes.shareIconButtonContainer}>
                                    <Tooltip title="WhatsApp" aria-label="WhatsApp">
                                        <IconButton className={classes.shareIconButtonWhatsApp} onClick={(event) => {this._open_url(event, `https://api.whatsapp.com/send/?phone&text=${url}&app_absent=0`)}}>
                                            <WhatsAppIcon fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Facebook" aria-label="Facebook">
                                        <IconButton className={classes.shareIconButtonFacebook} onClick={(event) => {this._open_url(event, `https://www.facebook.com/sharer/sharer.php?u=${url}`)}}>
                                            <FacebookIcon fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Twitter" aria-label="Twitter">
                                        <IconButton className={classes.shareIconButtonTwitter} onClick={(event) => {this._open_url(event, `https://twitter.com/intent/tweet?url=${url}`)}}>
                                            <TwitterIcon fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Email" aria-label="Email">
                                        <IconButton className={classes.shareIconButtonEmail} onClick={(event) => {this._open_url(event, `mailto:?body=${url}`)}}>
                                            <EmailIcon fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Reddit" aria-label="Reddit">
                                        <IconButton className={classes.shareIconButtonReddit} onClick={(event) => {this._open_url(event, `https://www.reddit.com/submit?url=${url}`)}}>
                                            <RedditIcon fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Pinterest" aria-label="Pinterest">
                                        <IconButton className={classes.shareIconButtonPinterest} onClick={(event) => {this._open_url(event, `https://www.pinterest.com/pin/create/button/?url=${url}`)}}>
                                            <PinterestIcon fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Blogger" aria-label="Blogger">
                                        <IconButton className={classes.shareIconButtonBlogger} onClick={(event) => {this._open_url(event, `https://www.blogger.com/blog-this.g?u=${url}`)}}>
                                            <BloggerIcon fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="LinkedIn" aria-label="LinkedIn" onClick={(event) => {this._open_url(event, `https://www.linkedin.com/sharing/share-offsite/?url=${url}`)}}>
                                        <IconButton className={classes.shareIconButtonLinkedIn}>
                                            <LinkedInIcon fontSize="large" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <FormControl fullWidth>
                                    <InputLabel for="share-dialog-url-input">{t( "components.share_dialog.url")}</InputLabel>
                                    <Input
                                        value={url}
                                        id="share-dialog-url-input"
                                        type="text"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={t( "sentences.copy address")}
                                                    onClick={(event) => this._copy_url(event, url)}
                                                    edge="end"
                                                >
                                                    <FileCopyIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <DialogContentText className={classes.fontWeightBold}>
                                    <p>{t( "components.share_dialog.thanks_for_sharing")}</p>
                                </DialogContentText>
                            </DialogContent>
                        </div>
                        <div className={_web_share ? classes.dialogImageWebShare: classes.dialogImage}>
                            <p>Why did the pixel art go viral? Because it was too good to keep to yourself!</p>
                            <p>Yes Or No... Share our editor with your friends and make your mark in the NFT world.</p>
                            <Button variant={"contained"} color={"secondary"} fullWidth={true} className={classes.buttonClose} disabled={_keep_open > 0} onClick={this.props.onClose}>DISMISS ({_keep_open > 0 ? `${_keep_open} sec.}`: `ok`})</Button>
                            <div className={classes.desktopintrovideowrapper}>
                                <video className={classes.desktopintrovideo} id="share-video" width="259" height="259" autoPlay={_keep_open > 0} onClick={this._resume_video} style={{aspectRatio: "1", transform: "translateZ(10px)"}}>
                                    <source src={"/src/videos/share"+_video_n+".mp4"} type="video/mp4"/>
                                </video>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(ShareDialog);
