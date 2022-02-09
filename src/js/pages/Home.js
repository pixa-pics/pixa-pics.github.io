import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { t } from "../utils/t";

import FlashInfo from "../components/FlashInfo";
import { HISTORY } from "../utils/constants";

import ShareIcon from "@material-ui/icons/Share";

import ShareDialog from "../components/ShareDialog";
import Fab from "@material-ui/core/Fab";
import Grow from "@material-ui/core/Grow";

import actions from "../actions/utils";

import DollarEmojiSvg from "../twemoji/react/1F911";
import AngelEmojiSvg from "../twemoji/react/1F607";
import HearthEmojiSvg from "../twemoji/react/2665";
import EarthEmojiSvg from "../twemoji/react/1F30D";

import get_svg_in_b64 from "../utils/svgToBase64";
import Button from "@material-ui/core/Button";

const quotes = t( "pages.home.quotes");
const random_quote_index = Math.floor(Math.random() * quotes.length);

const styles = theme => ({
    root: {
        maxHeight: "100%",
        overflow: "hidden",
        position: "relative",
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundImage: "radial-gradient(ellipse farthest-corner, #ffffff, #ffffff00 66%), url(/src/images/designer.svg)",
        position: "fixed",
        backgroundSize: "min(75vh, 75vw)",
        backgroundPosition: "min(75vh, 75vw) 0%",
        backgroundRepeat: "no-repeat",
        backgroundOrigin: "border-box",
        boxSizing: "border-box",
        padding: theme.spacing(8),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(4)
        },
    },
    flashInfoContainer: {
        padding: theme.spacing(2, 2, 0, 2),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(0)
        },
    },
    card: {
        margin: theme.spacing(1, 2)
    },
    quoteContainer: {
        margin: theme.spacing(2, 2),
        position: "absolute",
        left: 0,
        bottom: 0,
        backgroundColor: "rgba(192, 192, 192, .5)",
        borderRadius: 4,
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    fab: {
        position: "fixed",
        backgroundColor: theme.palette.primary.action,
        color: theme.palette.primary.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.primary.actionLighter,
        },
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        "& svg": {
            marginRight: 4
        },
    },
    headerContainer: {
        fontFamily: "'Saira'",
        position: "absolute",
        marginTop: theme.spacing(-2),
        color: "#000000",
        [theme.breakpoints.down("sm")]: {
            marginTop: theme.spacing(-4)
        },
    },
    title: {
        fontSize: 56,
        backgroundColor: "rgb(240 248 255 / 50%)",
        [theme.breakpoints.down("sm")]: {
            fontSize: 36,
        },
    },
    subtitle: {
        fontSize: 32,
        backgroundColor: "rgb(240 248 255 / 50%)",
        [theme.breakpoints.down("sm")]: {
            fontSize: 24,
            display: "none",
        },
    },
    blue: {
        //color: theme.palette.primary.actionLighter,
        color: "#0f177f",
        fontWeight: 600,
    },
});


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            _history: HISTORY,
            _is_share_dialog_open: false,
            _quote: t( "pages.home.quotes")[random_quote_index]
        };
    };

    componentDidMount() {

        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 250);
    }

    _go_to_url = (event, url) => {

        const { _history } = this.state;
        _history.push(url);
    };


    _handle_share_dialog_close = () => {

        this.setState({_is_share_dialog_open: false});
        actions.trigger_sfx("state-change_confirm-down");
        actions.jamy_update("suspicious");
    };

    _handle_share_dialog_open = () => {

        this.setState({_is_share_dialog_open: true});
        actions.trigger_sfx("hero_decorative-celebration-02");
        actions.jamy_update("happy");
    };

    _handle_speed_dial_close = () => {

        this.setState({_is_speed_dial_open: false});
    };

    _handle_speed_dial_open = () => {

        this.setState({_is_speed_dial_open: true});
    };

    _handle_speed_dial_action = (event, action) => {

        switch (action) {

            case "share":
                this._handle_share_dialog_open();
                break;
        }
    };

    render() {

        const { classes, _is_share_dialog_open, _quote } = this.state;


        return (
            <div className={classes.root}>
                <div className={classes.flashInfoContainer}>
                    <FlashInfo image="data:image/png;base64,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+buAxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloy5+AxvzreALaboCAtvzrdAIab4CAxgto4wloyz9Pf/UPf39WfsTrH71Uxl+1AD58dJPOL7wlUPevnf66CGC8AQIYL2A7noBu73/+AlsLAAHdfoB1/2r6BDTeAAGNF7AdT0C3909Av36QNoCApvjzcAL6c7qD+0+epvl5OAHNV7D8AQR0efvXRUAJ6PgLaMcnoAQ0bSABTfGvhxPQ8Qb4HVAX0PEnkI5PQAloWkACmuJfDyeg4w0goAR0/Amk4xNQApoWkICm+NfDCeh4AwgoAR1/Aun4BJSApgUkoCn+9XACOt4AAkpAx59AOj4BJaBpAQloin89nICON4CAEtDxJ5COT0AJaFpAApriXw8noOMNIKAEdPwJpOMTUAKaFpCApvjXwwnoeAMIKAEdfwLp+ASUgKYFJKAp/vVwAjreAAJKQMefQDo+ASWgaQEJaIp/PZyAjjeAgBLQ8SeQjk9ACWhaQAKa4l8PJ6DjDSCgBHT8CaTjE1ACmhaQgKb418MJ6HgDCCgBHX8C6fgElICmBSSgKf71cAI63gACSkDHn0A6PgEloGkBCWiKfz2cgI43gIAS0PEnkI5PQAloWkACmuJfDyeg4w0goAR0/Amk4xNQApoWkICm+NfDCeh4AwgoAR1/Aun4BJSApgUkoCn+9XACOt4AAkpAx59AOj4BJaBpAQloin89nICON4CAEtDxJ5COT0AJaFpAApriXw8noOMNIKAEdPwJpOMTUAKaFpCApvjXwwnoeAMIKAEdfwLp+ASUgKYFJKAp/vVwAjreAAJKQMefQDo+ASWgaQEJaIp/PZyAjjeAgBLQ8SeQjk9ACWhaQAKa4l8PJ6DjDSCgBHT8CaTjE1ACmhaQgKb418MJ6HgDCCgBHX8C6fgElICmBSSgKf71cAI63gACSkDHn0A6PgEloGkBCWiKfz2cgI43gIAS0PEnkI5PQAloWkACmuJfDyeg4w0goAR0/Amk4xNQApoWkICm+NfDCeh4AwgoAR1/Aun4BJSApgUkoCn+9XACOt4AAkpAx59AOj4BJaBpAQloin89nICuNyCevxbgP/3l5ZTAF5+m8fPhP33VCtD6Au4/ebqNgABu7398egI6XoB6fAJab2A7n4C2+yeg36QLePrdBxwg3cB2uPJt7z+fnoDmK5j+AALarp+AEtC2gdJLAgS0pC/7IqBKUBIgoCX96yKgBLRtoPSSAAEt6csmoH4HNH0FBDTFT0D9DmhbQOkpAQKa4hfuAqoDJQECWtJ3Ab0IaFtA6SkBApriF05AdaAkQEBL+gSUgLb9k94SIKAt//l0AjpfgRQAAU3x+yd4F9C2gNJTAgQ0xS+cgOpASYCAlvRdQF1A2/5JbwkQ0Jb/fDoBna9ACoCApvhdQF1A2wJKTwkQ0BS/cAKqAyUBAlrSdwF1AW37J70lQEBb/vPpBHS+AikAApridwF1AW0LKD0lQEBT/MIJqA6UBAhoSd8F1AW07Z/0lgABbfnPpxPQ+QqkAAhoit8F1AW0LaD0lAABTfELJ6A6UBIgoCV9F1AX0LZ/0lsCBLTlP59OQOcrkAIgoCl+F1AX0LaA0lMCBDTFL5yA6kBJgICW9F1AXUDb/klvCRDQlv98OgGdr0AKgICm+F1AXUDbAkpPCRDQFL9wAqoDJQECWtJ3AXUBbfsnvSVAQFv+8+kEdL4CKQACmuJ3AXUBbQsoPSVAQFP8wgmoDpQECGhJ3wXUBbTtn/SWAAFt+c+nE9D5CqQACGiK3wXUBbQtoPSUAAFN8QsnoDpQEiCgJX0XUBfQtn/SWwIEtOU/n05A5yuQAiCgKX4XUBfQtoDSUwIENMUvnIDqQEmAgJb0XUBdQNv+SW8JENCW/3w6AZ2vQAqAgKb4XUBdQNsCSk8JENAUv3ACqgMlAQJa0ncBdQFt+ye9JUBAW/7z6QR0vgIpAAKa4ncBdQFtCyg9JUBAU/zCCagOlAQIaEnfBdQFtO2f9JYAAW35z6cT0PkKpAAIaIrfBdQFtC2g9JQAAU3xCyegOlASIKAlfRdQF9C2f9JbAgS05T+fTkDnK5ACIKApfhdQF9C2gNJTAgQ0xS+8JkCA6w1s568L8P0nT9sCEMCWv/RpAgR0ev2GJ6A6UBIgoAS07J9sBEoCBLSkLzsnQEDzFUx/AAEloNMPwPDTBAjo9PoNT0B1oCRAQAlo2T/ZCJQECGhJX3ZOgIDmK5j+AAJKQKcfgOGnCRDQ6fUbnoDqQEmAgBLQsn+yESgJENCSvuycAAHNVzD9AQSUgE4/AMNPEyCg0+s3PAHVgZIAASWgZf9kI1ASIKAlfdk5AQKar2D6AwgoAZ1+AIafJkBAp9dveAKqAyUBAkpAy/7JRqAkQEBL+rJzAgQ0X8H0BxBQAjr9AAw/TYCATq/f8ARUB0oCBJSAlv2TjUBJgICW9GXnBAhovoLpDyCgBHT6ARh+mgABnV6/4QmoDpQECCgBLfsnG4GSAAEt6cvOCRDQfAXTH0BACej0AzD8NAECOr1+wxNQHSgJEFACWvZPNgIlAQJa0pedEyCg+QqmP4CAEtDpB2D4aQIEdHr9hiegOlASIKAEtOyfbARKAgS0pC87J0BA8xVMfwABJaDTD8Dw0wQI6PT6DU9AdaAkQEAJaNk/2QiUBAhoSV92ToCA5iuY/gACSkCnH4DhpwkQ0On1G56A6kBJgIAS0LJ/shEoCRDQkr7snAABzVcw/QEElIBOPwDDTxMgoNPrNzwB1YGSAAEloGX/ZCNQEiCgJX3ZOQECmq9g+gMIKAGdfgCGnyZAQKfXb3gCqgMlAQJKQMv+yUagJEBAS/qycwIENF/B9AcQUAI6/QAMP02AgE6v3/AEVAdKAgSUgJb9k41ASYCAlvRl5wQIaL6C6Q8goAR0+gEYfpoAAZ1ev+EJqA6UBAgoAS37JxuBkgABLenLzgkQ0HwF0x9AQAno9AMw/DQBAjq9fsMTUB0oCRBQAlr2TzYCJQECWtKXPU+gFuDXP3op3cGPXz9I8+vwWkDvPyGAdQfkI7BKgICubt7cRxAgoAS0LCIB/cDPwLKAsqcJeHzT6zd8TYCAEtCygwSUgJb9k71NgIBu79/0MQECSkDLChJQAlr2T/Y2AQK6vX/TxwQIKAEtK0hACWjZP9nbBAjo9v5NHxMgoAS0rCABJaBl/2RvEyCg2/s3fUyAgBLQsoIElICW/ZO9TYCAbu/f9DEBAkpAywoSUAJa9k/2NgECur1/08cECCgBLStIQAlo2T/Z2wQI6Pb+TR8TIKAEtKwgASWgZf9kbxMgoNv7N31MgIAS0LKCBJSAlv2TvU2AgG7v3/QxAQJKQMsKElACWvZP9jYBArq9f9PHBAgoAS0rSEAJaNk/2dsECOj2/k0fEyCgBLSsIAEloGX/ZG8TIKDb+zd9TICAEtCyggSUgJb9k71NgIBu79/0MQECSkDLChJQAlr2T/Y2AQK6vX/TxwQIKAEtK0hACWjZP9nbBAjo9v5NHxMgoAS0rCABJaBl/2RvEyCg2/s3fUyAgBLQsoIElICW/ZO9TYCAbu/f9DEBAkpAywoSUAJa9k/2NgECur1/08cECCgBLStIQAlo2T/Z2wQI6Pb+TR8TIKAEtKwgASWgZf9kbxMgoNv7N31MgIAS0LKCBJSAlv2TvU2AgG7v3/QxAQJKQMsKElACWvZP9jYBArq9f9PHBAgoAS0rSEAJaNk/2dsECOj2/k0fEyCgBLSsIAEloGX/ZG8TIKDb+zd9TICAEtCyggSUgJb9k71NgIBu79/0MQECSkDLChJQAlr2T/Y2AQK6vX/TxwQIKAEtK0hACWjZP9nbBAjo9v5NHxMgoAS0rCABJaBl/2RvEyCg2/s3fUyAgBLQsoIElICW/ZO9TYCAbu/f9DEBAkpAywoSUAJa9k/2NgECur1/048TIMCtAP/01c9pA+//91/S/KffEcB0AcIRCAkQ0BC+aARqAgSUgJYdJKAlfdkItAQIaMtfOgIpAQJKQMsCEtCSvmwEWgIEtOUvHYGUAAEloGUBCWhJXzYCLQEC2vKXjkBKgIAS0LKABLSkLxuBlgABbflLRyAlQEAJaFlAAlrSl41AS4CAtvylI5ASIKAEtCwgAS3py0agJUBAW/7SEUgJEFACWhaQgJb0ZSPQEiCgLX/pCKQECCgBLQtIQEv6shFoCRDQlr90BFICBJSAlgUkoCV92Qi0BAhoy186AikBAkpAywIS0JK+bARaAgS05S8dgZQAASWgZQEJaElfNgItAQLa8peOQEqAgBLQsoAEtKQvG4GWAAFt+UtHICVAQAloWUACWtKXjUBLgIC2/KUjkBIgoAS0LCABLenLRqAlQEBb/tIRSAkQUAJaFpCAlvRlI9ASIKAtf+kIpAQIKAEtC0hAS/qyEWgJENCWv3QEUgIElICWBSSgJX3ZCLQECGjLXzoCKQECSkDLAhLQkr5sBFoCBLTlLx2BlAABJaBlAQloSV82Ai0BAtryl45ASoCAEtCygAS0pC8bgZYAAW35S0cgJUBACWhZQAJa0peNQEuAgLb8pSOQEiCgBLQsIAEt6ctGoCVAQFv+0hFICRBQAloWkICW9GUj0BIgoC1/6QikBAgoAS0LSEBL+rIRaAkQ0Ja/dARSAgSUgJYFJKAlfdkItAQIaMtfOgIpAQJKQMsCEtCSvmwEWgIEtOUvHYGUAAEloGUBCWhJXzYCLQEC2vKXjkBKgIAS0LKABLSkLxuBlgABbflLRyAlQEAJaFlAAlrSl41AS4CAtvylI5ASIKAEtCwgAS3py0agJUBAW/7SEUgJEFACWhaQgJb0ZSPQEiCgLX/pCEwTqAX4N398OeV/8+//meYTwBS/cASmCRDQ6fUbHoGWAAEloG0DpSOAQEWAgFbk5SKAwEVACahngAACmwQI6ObeTY3AEQQIKAE9oog+AgEE7pwAAb1z5AIRQOAFAQJKQL0GBBDYJEBAN/duagSOIEBACegRRfQRCCBw5wQI6J0jF4gAAi6gtwT8Fby3gAACqwQI6OrmzY3AAQRcQF1AD6ihT0AAgYAAAQ2gi0QAgVsCBJSAegsIILBJgIBu7t3UCBxBgIAS0COK6CMQQODOCRDQO0cuEAEEXhAgoATUa0AAgU0CBHRz76ZG4AgCBJSAHlFEH4EAAndOgIDeOXKBCCDgAnpLwF/BewsIILBKgICubt7cCBxAwAXUBfSAGvoEBBAICBDQALpIBBC4JUBACai3gAACmwQI6ObeTY3AEQQIKAE9oog+AgEE7pwAAb1z5AIRQOAFAQJKQL0GBBDYJEBAN/duagSOIEBACegRRfQRCCBw5wQI6J0jF4gAAi6gtwT8Fby3gAACqwQI6OrmzY3AAQRcQF1AD6ihT0AAgYAAAQ2gi0QAgVsCBJSAegsIILBJgIBu7t3UCBxBgIAS0COK6CMQQODOCRDQO0cuEAEEXhAgoATUa0AAgU0CBHRz76ZG4AgCBJSAHlFEH4EAAndOgIDeOXKBCCDgAnpLwF/BewsIILBKgICubt7cCBxAwAXUBfSAGvoEBBAICBDQALpIBBC4JUBACai3gAACmwQI6ObeTY3AEQQIKAE9oog+AgEE7pwAAb1z5AIRQOAFAQJKQL0GBBDYJEBAN/duagSOIEBACegRRfQRCCBw5wQI6J0jF4gAAi6gtwT8Fby3gAACqwQI6OrmzY3AAQRcQF1AD6ihT0AAgYAAAQ2gi0QAgTMIvPYv//Gs/JKn333gv8HlAmQjgEBGwH/8MvSCEUCgJkBA6w3IRwCBVQIEdHXz5kYAgYuAKgECCCDQECCgDXepCCBwAAECesASfAICCEwSIKCTazc0Agg8J0BA9QABBBBoCBDQhrtUBBA4gAABPWAJPgEBBCYJENDJtRsaAQRcQHUAAQQQ6AgQ0I69ZAQQiAm4gMYLEI8AArMECOjs6g2OAAIEVAcQQACBhgABbbhLRQCBAwgQ0AOW4BMQQGCSAAGdXLuhEUDgOQECqgcIIIBAQ4CANtylIoDAAQQI6AFL8AkIIDBJgIBOrt3QCCDgAqoDCCCAQEeAgHbsJSOAQEzABTRegHgEEJglQEBnV29wBBAgoDqAAAIINAQIaMNdKgIIHECAgB6wBJ+AAAKTBAjo5NoNjQACzwkQUD1AAAEEGgIEtOEuFQEEDiBAQA9Ygk9AAIFJAgR0cu2GRgABF1AdQAABBDoCBLRjLxkBBGICLqDxAsQjgMAsAQI6u3qDI4AAAdUBBBBAoCFAQBvuUhFA4AACBPSAJfgEBBCYJEBAJ9duaAQQeE6AgOoBAggg0BAgoA13qQggcAABAnrAEnwCAghMEiCgk2s3NAIIuIDqAAIIINARIKAde8kIIBATcAGNFyAeAQRmCRDQ2dUbHAEECKgOIIAAAg0BAtpwl4oAAgcQIKAHLMEnIIDAJAECOrl2QyOAwHMCBFQPEEAAgYYAAW24S0UAgQMIENADluATEEBgkgABnVy7oRFAwAVUBxBAAIGOAAHt2EtGAIGYgAtovADxCCAwS+B/AcoFP7Iv6XsnAAAAAElFTkSuQmCC"
                               text={"Ready to start now? Change language in settings..."} button={"SETTINGS"} onClick={(event) => this._go_to_url(event, "/settings")}/>
                </div>
                <div className={classes.backgroundImage}>
                    <div className={classes.headerContainer}>
                        <h1 className={classes.title}>
                            <span><span className={classes.blue}>PIXA.PICS</span> - Pixel art editor.</span><br />
                            <span>Make potential (un)limited</span><br />
                            <span><img src={get_svg_in_b64(<AngelEmojiSvg />)} className="emoji"/> everywhere.</span>
                        </h1>
                        <h2 className={classes.subtitle}>
                            At the horizon of <span className={classes.blue}>matricidal</span> and <span className={classes.blue}>vectorial</span>, <br/>
                            discover an unprecedented industrial and educative purpose.<br />
                            Made with <img className={"emoji pulse"} src={get_svg_in_b64(<HearthEmojiSvg />)}/>, our software is designed for everyone and forever open-source. <img src={get_svg_in_b64(<EarthEmojiSvg />)} className={"emoji"}/>.<br />
                        </h2>
                        <Button variant={"outlined"} onClick={(event) => this._go_to_url(event, "/pixel")}>
                            Start using it
                        </Button>
                    </div>
                    <div className={classes.quoteContainer}>
                        <blockquote>
                            “{_quote.text}”<br />
                            ― {_quote.author}
                        </blockquote>
                    </div>
                </div>
                <Grow in>
                    <Fab className={classes.fab} variant="extended" onClick={this._handle_share_dialog_open}>
                        <ShareIcon /> {t("words.share")}
                    </Fab>
                </Grow>
                <ShareDialog
                    open={_is_share_dialog_open}
                    onClose={this._handle_share_dialog_close}/>
            </div>
        );
    }
}

export default withStyles(styles)(Home);
