import React from "react";
import { withStyles } from "@material-ui/core/styles"

import { t } from "../utils/t";

import {Dialog, DialogContent, DialogContentText, DialogTitle, InputLabel, Input, InputAdornment, IconButton, FormControl, Tooltip} from "@material-ui/core";

import DialogCloseButton from "../components/DialogCloseButton";

import FileCopyIcon from "@material-ui/icons/FileCopy";
import EmailIcon from "@material-ui/icons/Email"
import WhatsAppIcon from "../icons/WhatsApp";
import PinterestIcon from "../icons/Pinterest";
import LinkedInIcon from "../icons/LinkedIn";
import FacebookIcon from "../icons/Facebook";
import BloggerIcon from "../icons/Blogger";
import TwitterIcon from "../icons/Twitter";
import RedditIcon from "../icons/Reddit";

import BeerCheckEmojiSvg from "../twemoji/react/1F37B";
import get_svg_in_b64 from "../utils/svgToBase64";

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
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    dialogContent: {
        display: "inline-block",
        backgroundImage: "radial-gradient(farthest-corner at 0px 0px, #ffffffaa 25%, #43e0 75%), radial-gradient(farthest-corner at 0% 100%, #ffffffaa 25%, #43e0 75%)",
    },
    dialogInner: {
        display: "inherit",
        backgroundSize: "calc(100% - 64px)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
});


class ShareDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            open: props.open,
        };
    };

    componentWillReceiveProps(new_props) {

        const just_being_open = new_props.open && !this.state.open;

        this.setState(new_props, () => {

            if(just_being_open) {

                if (navigator.share) {
                    navigator.share({
                        url: window.location.href,
                    })
                        .then(() => {this.props.onClose(null)})
                        .catch((error) => {});
                }

            }
        });
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

    render() {

        const { classes, open } = this.state;

        const url = window.location.href;

        return (
            <div>
                <Dialog
                    open={open}
                    onClose={(event) => {this.props.onClose(event)}}
                >
                    <div className={classes.dialogInner} style={{backgroundImage: `url(/src/images/office.svg)`}}>
                        <div className={classes.dialogContent}>
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
                                    <InputLabel htmlFor="share-dialog-url-input">{t( "components.share_dialog.url")}</InputLabel>
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
                        <div className={classes.dialogImage}/>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(ShareDialog);
