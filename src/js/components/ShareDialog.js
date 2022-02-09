import React from "react";
import { withStyles } from "@material-ui/core/styles"

import { t } from "../utils/t";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from "@material-ui/core/Tooltip";

import DialogCloseButton from "../components/DialogCloseButton";

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
        backgroundColor: "#3fd36633",
        "&:hover": {
            backgroundColor: "#3fd3664d",
        },
        margin: theme.spacing(1),
    },
    shareIconButtonFacebook: {
        color: "#3b5998",
        backgroundColor: "#3b599833",
        "&:hover": {
            backgroundColor: "#3b59984d",
        },
        margin: theme.spacing(1),
    },
    shareIconButtonTwitter: {
        color: "#49a1f2",
        backgroundColor: "#49a1f233",
        "&:hover": {
            backgroundColor: "#49a1f24d",
        },
        margin: theme.spacing(1),
    },
    shareIconButtonEmail: {
        color: "#888888",
        backgroundColor: "#88888833",
        "&:hover": {
            backgroundColor: "#8888884d",
        },
        margin: theme.spacing(1),
    },
    shareIconButtonReddit: {
        color: "#f24401",
        backgroundColor: "#f2440133",
        "&:hover": {
            backgroundColor: "#f244014d",
        },
        margin: theme.spacing(1),
    },
    shareIconButtonPinterest: {
        color: "#bd161c",
        backgroundColor: "#bd161c33",
        "&:hover": {
            backgroundColor: "#bd161c4d",
        },
        margin: theme.spacing(1),
    },
    shareIconButtonBlogger: {
        color: "#f37d00",
        backgroundColor: "#f37d0033",
        "&:hover": {
            backgroundColor: "#f37d004d",
        },
        margin: theme.spacing(1),
    },
    shareIconButtonLinkedIn: {
        color: "#3478b5",
        backgroundColor: "#3478b533",
        "&:hover": {
            backgroundColor: "#3478b54d",
        },
        margin: theme.spacing(1),
    },
    fontWeightBold: {
        fontWeight: "bold"
    },
    dialogImage: {
        display: "inline-block",
        padding: theme.spacing(2),
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "300% auto",
        width: 320,
        transition: "background-size 300ms ease-in-out 0ms",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    dialogContent: {
        display: "inline-block"
    },
    dialogInner: {
        display: "inherit",
        "& div:first-child": {
            backgroundSize: "90% auto"
        }
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

        this.setState(new_props);
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
                    <div className={classes.dialogInner}>
                        <div className={classes.dialogImage} style={{backgroundImage: `url(/src/images/share.svg)`}}/>
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
                                    <p>{t( "components.share_dialog.thanks_for_sharing")} <img src={get_svg_in_b64(<BeerCheckEmojiSvg/>)} className="emoji"/></p>
                                </DialogContentText>
                            </DialogContent>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(ShareDialog);
