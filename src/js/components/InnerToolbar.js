import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import JSLoader from "../utils/JSLoader";
import { t } from "../utils/t";
import { HISTORY } from "../utils/constants";

import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import Fade from "@material-ui/core/Fade";

import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import api from "../utils/api";
import actions from "../actions/utils";
import Created from "@material-ui/icons/Timer";
import Hot from "../icons/Hot";
import Trending from "@material-ui/icons/TrendingUp";
import SendSharp from "@material-ui/icons/SendSharp";

const styles = theme => ({
    "@keyframes innerToolbarCyberPunkAnimation": {
        "0%": { transform: "translateX(-25%)"},
        "25%": { transform: "translateX(0%)"},
        "50%": { transform: "translateX(25%)"},
        "75%": { transform: "translateX(50%)"},
        "100%": { transform: "translateX(75%)"}
    },
    glow: {
        animationFillMode: "both",
        animationName: "$glow",
        animationDuration: "1000ms",
        animationTimingFunction: "linear",
        animationDirection: "alternate",
        animationIterationCount: "infinite",
        animationDelay: "75ms",
        willChange: "filter"
    },
    "@keyframes glow": {
        "0%": { filter: "drop-shadow(0px 0px 2px #0f0f2f) drop-shadow(0px 0px 5px #0f0f2f)"},
        "25%": { filter: "drop-shadow(0px 0px 1px #0f0f2f) drop-shadow(0px 0px 4px #0f0f2f)"},
        "50%": { filter: "drop-shadow(0px 0px 3px #0f0f2f) drop-shadow(0px 0px 5px #0f0f2f)"},
        "75%": { filter: "drop-shadow(0px 0px 6px #0f0f2f) drop-shadow(0px 0px 8px #0f0f2f)"},
        "100%": { filter: "drop-shadow(0px 0px 4px #0f0f2f) drop-shadow(0px 0px 6px #0f0f2f)"}
    },
    root: {
        display: "flex",
        position: "relative",
        width: "100%",
        contain: "style layout paint"
    },
    innerToolbar: {
        contain: "size style layout paint",
        overflow: "hidden",
        cursor: "pointer",
        height: 40,
        lineHeight: "40px",
        borderRadius: 4,
        display: "flex",
        position: "relative",
        width: "100%",
        textTransform: "none",
        textAlign: "inherit",
        padding: 0,
        boxShadow: "inset 0px 0px 12px #00185dba, inset 0px 0px 24px #1a43bb61",
        backgroundColor: theme.palette.secondary.main, // #030435
        backgroundPosition: `${parseInt(Math.random() * 100)}% ${parseInt(Math.random() * 100)}%`,
        backgroundSize: "auto 175%",
        transition: "background-color cubic-bezier(0.4, 0, 0.2, 1) 125ms",
        "&:hover": {
            backgroundColor: "#0f0f2f",
            transition: "background-color cubic-bezier(0.4, 0, 0.2, 1) 175ms",
        },
        color: "#d7dbff",
        "&::before": {
            display: "inline-block",
            top: 0,
            left: 0,
            "content": "\"\"",
            position: "absolute",
            contain: "paint layout",
            height: 40,
            width: "60%",
            mixBlendMode: "plus-lighter",
            background: "linear-gradient(to right, transparent, rgb(155 163 220 / 22%), transparent)",
            animationFillMode: "both",
            animationName: "$innerToolbarCyberPunkAnimation",
            animationDuration: "7770ms",
            animationTimingFunction: "linear",
            animationDirection: "alternate",
            animationIterationCount: "infinite",
            animationDelay: "75ms",
            willChange: "transform"
        },
        backColor: "rgba(108,114,183,0.18)",
        //boxShadow: "inset 0px 0px 6px #475db3ab, inset 0px 0px 24px #838fdc61, inset 0px 0px 48px #cbd4ff40",
        "&::-webkit-scrollbar": {
            display: "none"
        }
    },
    link: {
        color: "#d7dbff",
        textDecoration: "none",
        height: "100%",
        lineHeight: "100%",
        display: "inline-block",
        fontSize: "15px"
    },
    linkDone: {
        color: "#7479b4",
        textDecoration: "line-through",
        height: "100%",
        lineHeight: "100%",
        display: "inline-block",
        fontSize: "15px",
        "&::after": {
            content: "&nbsp;&#10004;&nbsp;",
            color: "#96ff96"
        }
    },
    linkIcon: {
        color: "#7479b4",
        marginLeft: 8,
        textDecoration: "none",
        height: "100%",
        lineHeight: "100%",
        display: "inline-block",
        fontSize: "12px"
    },
    innerToolbarTextWrapperContainer: {
        position: "absolute",
        width: "100%",
        top: 0,
    },
    innerToolbarTextWrapper: {
        position: "absolute",
        width: "100%"
    },
    innerToolbarInput: {
        position: "relative",
        width: "100%",
        display: "block",
    },
    innerToolbarText: {
        position: "absolute",
        width: "100%",
        display: "block",
        overflow: "auto",
    },
    innerToolbarTextInner: {
        whiteSpace: "nowrap",
        position: "relative",
        width: "100%",
        display: "block",
        textShadow: `0px 0px ${theme.spacing(1)}px ${theme.palette.secondary.light}`,
        "& > *:first-child": {
            marginLeft: theme.spacing(1),
        },
        "& > *:last-child": {
            marginRight: theme.spacing(1),
        },
    },
    innerToolbarProgress: {
        position: "inherit",
        display: "flex",
        width: "100%",
    },
    linearProgressVisible: {
        "& .MuiLinearProgress-barColorPrimary": {
            background: "linear-gradient(to right, #3947a3 0%, #444b7d 50%, #3750b7 100%)",
            zIndex: -1,
        },
        zIndex: 1,
        marginBottom: -2,
        height: 2,
        backgroundColor: "transparent",
        width: "50%",
        display: "flex",
    },
    linearProgressVisibleOffline: {
        "& .MuiLinearProgress-barColorPrimary": {
            background: "linear-gradient(90deg, #B51234 0%, #5a0505 100%)",
            zIndex: -1,
        },
        zIndex: 1,
        marginBottom: -3,
        height: 3,
        backgroundColor: "transparent",
        width: "50%",
        display: "flex",
    },
    infoIcon: {
        right: 0,
        top: 0,
        height: "100%",
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.primary.contrastText,
        zIndex: 2,
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 0, 1, 1),
        paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%',
        "input&::placeholder": {
            color: "#d7dbff",
            opacity: .666,
            fontSize: "15px"
        }
    },
    ret: {
        maxHeight: "1em",
        marginLeft: "1em",
        marginRight: "1em",
        verticalAlign: "middle",
        transform: "scale(2)"
    }
});

class InnerToolbar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.st4te = {
            pathname: props.pathname,
            camo: props.camo,
            ret: props.ret,
            logged_account: props.logged_account,
            know_if_logged: props.know_if_logged,
            loaded_progress_percent: props.loaded_progress_percent,
            music_enabled: props.music_enabled,
            classes: props.classes,
            _is_info_bar_active: false,
            _actions_triggered: new Set(new Array(0)),
            _history: HISTORY,
            _cams: [""],
            _rets: [
                "",
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABKBAMAAAA4WwUnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAHlBMVEVHcEz////////////////////////////////////JATChAAAACnRSTlMAEiP8N+BWwXeeHdhKNgAABI1JREFUSMftVk1z4kYQ9fwDzZQrtXuLJhMWH1NTg9AtmTQSe1YE6BiQQJxlvm7ZNSvw1QIb/m16JLC31gZzT6ZwFbafWq9fv+6eq6v/3KGUXAollFLrMqhFKaP0wrBMiAsDE8pvZv3LsBbjmby1rYvY8hu5bdjvEyaEMPvOHbnvxiVGA/4hmPvuO3ERh8fmibP03T+scyENkHHOQfYAsfRsXQ1QiOFEbWDQPMcXoYyL9TaQch7DXe80X0Iw6k+riZSyu1sCZLdnaoHQdoHARR77U0jV15McUFR2E8hZrpFx0qgHkT6dGtYqUzmUyflRoTan6SKDTMWIRCmEL2VP25Z1xgKPnNuoMK9nah7jV0LeNiHjd03Njb8JW6k5aPNLibZeM6jJDTf2xjcUKC8I2zYvMX/5MTEYuLrKhl7LqQDNBa8oIfx7NoR+DOWUV+LTupR5usu9odGPGyqUvORJ2ECquNKe0NoEq2yOch7/LoWh9kujEvYhcTWtHsa2XMnZLJChMuXeDUsyz0UkjA96nB7SFOBlsZf0vOF9aMJHX1Kh+dEdhNWChwqLtdYgiltIGgCQ7hezUDoYH45lpLyl9JGu2AmRdAA/5fHSp1CFMuLP2MLQrZxZd7T2G9B+hMOpJb10G/Tt43uz5pEub7lc+y5AHwSvwEkTM3iwD8GE7Bzo4it6WowiqLm11cSZfvW84XgOabDkFUlqB53yFeiLevDIIXuEzzIrNQ6CUHXDUIZ9XmFrEqcMKX2xivoasg1iZTe9P5ZFhkGT/3zAIgdKyimyWwooNsI3vhTeaLdOx/t1PlwFDyWW1STmhgSYSNyVC7rYaJSOay2SxQZAt2PwikZVirp00VOMX69UhHME4wK2EoJhEBqdR/hA8VtVVr/rGE95T6j6Il8PkQNgXTFuq8R+60Ca/V7F/XXuYlcKMxwWyy0mnyNUY2BvNOl56X3mTGTjWLbbYXu9n2G6u7htUlfRUq/367HRIay0+Oegf7YEo6azizX4sptJJdWshChEqnC+3y0PdhBOH8b5GhsHs2nJTTqZmke7s6d9rof50PzDOsw80UVyvBoOiI3yQTQZZ9KZAhib4w+3n91rVKCmbxn6BjsiCMPYe5JyqhFqs5fFSK5XiDUti6/g6ROqoVSESt0HRnWzQsmx3ch1oPrcxr62CPuIGeHHzY0ZPzllE5LvZ7SP46n0DmF/yhAbc6JKbOL8OABxoRZmkFjm6y9qh0ltAjVfati+2ltmo+IkMbPOYi25WKG4SMOZr4O/Xi1wbPk7Jy4HDPOl2nbmZa/LmXw92zFwXfbi0mkCizDpwH3ZFE6fvjFS7UQuzEzn+rN0R+jK9jcVdnP7LSxDj81xGuGAvFMZ1gtaaHn21ipCFrWBdPb50INaIOeILZpmpJ5YF2JvGC7W+bhQu2U9m/ITNxPTazrdm/y7ixE6fiu/nLzEELPeOcT78NDkkX16b+KgMqvbhvV+koXh4uu5GxqOPbO8Ea4Ftjl/52pED1cNY/CTq/CwEK8sq7rFGXdfcDU7XmSuLrlPXnzn/P9ccv4FtHphMJbWtkkAAAAASUVORK5CYII=",
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAABKCAYAAADKdRgUAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5gUVExIracbuWAAAA59JREFUeNrtXE1u7CAMdqJ3nqibqIfIZi4xh3jqGvUQvUQ2OcRTNygHGrphXiklhB+bv2Cp6mg0MebzD8QYA3TqVAMNuQUQQszy4w0AFvl58mSzy/8bAKzDMHxeDlQJ5BPEyQEsE7k8d88B8JAJzL8WMLb/wg3DmwOvJ1l52nhVSUKIWQjBhRAPwx8XQjAlDMSMMUte/GicVsBkB2BGAxmoSE45bgpAk4PpAS6rDVCWG0xHcOuw2tIFP1D4XLK78xpc7CA0sdKFLH6lLdoITIBWHv9ZCULxWgG1ADt3QFsB1hCPZqicsgJriKP1v/59zy39+tAyoAe7Apba7Tk0SEnDgMFKZ2iUYqx18B0IvpPD7yE5Si1B/SSUjL0y+UXhCyG8pZz/lK9e0RPeupUiZ66i8gQn+dpgr9LCACvKHRwBDQLWEdAgYMnDHYKVuk7cS2mWJLhRYcVYayxjDyv1slZPK8WwVie5Rkfe6qKyBujl5vn7iei33rLIxWn3GWt00ZTCbM99pp6J7j5KGT2Zb3Bd2g1eGwzqLdL1Q55z8gjNNalkAV2Ws7jqAuoS6/oBk9+IfhsTvrbAGG7dCrFIPq4rNY+Q8YH9AnCwC4i2VBSSFnI/sdhdWxR8FpIzvpivmdbF6g/BlsUKrBDirgi1YLz7y+deDHmF4Hd/h5D4FuO2dZfK0KQEOYr7X3R/GkRjh6CD2kHtoHbqoDYBat9SuSVTfECdwD8n2toedQasfCr4Z4GuQFuPqfi0YoG6XBxI5/A3epj6dPHFasEEdQ3RlhLgeQnFbNqJsHdtgbrGROdB9CPaiGezARt7I4Xk7F+zNozqkdSX06JOF0LnT6YpjEkhGkSoYdDIHVP2c+B+PIGFRl+fJC1SQyhQSwosEqDkBWozUZEa6kU229X0lGEv6SCW42SGcITMEI+901SNYw1kmzxiaMFUPu02UN9EI+8df1muSXFaF4oHAaBp71NhXvlxrFrhhr8HRZk79vxyA8s8C3fRrfNgXmmvNFFco7Ss3C6WyUqZ0xArBPwsCH7B8gQlgbNYsmcrAE6hh1SK2obpNVsBSaNX01lugeaaWxQZAOWlCNbbfVxWSHvmjNWk/RpaKLEa41Rv9kXoYsljrS2vWuVBpuVtiVNOSskNNN+dkrTVpzZOVjBzNKX9gOOapB9NacFyAUID6Kxj8HvKprSlt09+Aq3SJL9zaZ+cpcNvSY2+PzTgXGmnygd06tQ2fQGGQQOV52XiYwAAAABJRU5ErkJggg==",
                "data:image/png;base64,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",
                "data:image/png;base64,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",
                "data:image/png;base64,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",
                "data:image/png;base64,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",
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABkBAMAAAD9HZqWAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAHlBMVEVHcEz////////////////////////////////////JATChAAAACXRSTlMA9OMkzJSySXF4lJYKAAAD1klEQVRYw+1YTW/bRhBdUiLlvZFNkGZvqlEU4E2BEbi6qUYMQzcGzYU3uQlc6KbAqgHdXOSk264kSnr/NrNLCrbTHVI5NMghhMSP1ePufLyZ2ZEQP47//ZgrAFfHoj+iPn4+Bt1RMBN7E9PNoB0OjA73XaD1BaweP2VogS++AGDXCA9x/3TgBP0mfKa/HJGrBrj0iAvdoGzy37GAV9m/dsYu4Nct5BYIjX9cMSZaJv7xYM+Iw8rJMIfFe1kUrjn80KuAZO3m/2XIMsW/8pjlemfjNTPPE/NV5mR++t7wX6tvwduz9Hpx1PO+0Zl1vf6VSeAldJAEfrxmxhM/fwLtl7MYSP+62m8iI/x40orxixz5xmMtvYG61HLiNXMpc3f99zDw0p0jXTBej+vAqcUN6jCZMExRrhSRYHV4jGk5V5QMF6aBrVpnQjn9usbCgYQLbGkkJgLpbeD8UCRnVF5iaMXhQZJ25urF7NI+vutlGytRDHb+Z3vRu06p8p4LcSvukF4NxPIVO79Za/FPmgIzEl31YNLnMyGHHJ4WLsVdmiqUZKFxQfj0kyisUkwC1SsxT+0C2moDuv1TZJItwlhDzE9p/hVVyZMMqUn/Fhjyefg59q9/ofmdY4dWnvdL/MHhp+ZMYX9B8+vKvCTPW6zO1NYLPyE5C+DyRlEd++s3qlvmzYcUJel1z/BfRCtScwtLBPpOSfEsFwz/XRboibGWuwq/0HIjZoLDR9uHIh8YlTyU9mnuVaCmcda3rrZODev6Pfbb56dHOcGoR7nitDWrKqNMayZ+lE1gFFrSrSuDQ1MzqSxq1qg1WzhDWIuT7WZikUc7sq3d8W3BbrFCMmCG/LC+EhHt/mTTjgyWxgdFjLDEbtwhZgNpE0KVH2y60J2m/RupJqH7jgQkfkgPUrfinSr9ihpH4PPB5losduLFuBO14buEj9clpNQaxXBC+FEzPkSkB1ddqUfzjszRb8NLbH8/T/JJHAW3n6bt88vStQpGuUvRgg90z8FQlHAvzmTSbB+bwrWC1KBsTb5us6dNEQYrqTOQSGULPrsnH9EbWOzoVJLvThr5AMt982vVHl0oGwONfNu4vGlwCvpUeXTchKcgj3ckz1LqPcmzoExetMhDp5splMH2RrVsu2wJpdQ0jfvvjLoMJ5TAomjT6K/S5hpKiGTGhbXkadHoL6EwqxxR9V1Uw5r7tW4VLkbqtAqYUUuD57qVyISJytmO5iklaFMztfVua7cyRzS01ISd2+ttU+v1pAwPDvV1clR/fWjbMi2OO8ZENiLz5uh+3wWj+fG/xzc4PgNRLUuXYCDJMQAAAABJRU5ErkJggg==",
                "data:image/png;base64,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",
                "data:image/png;base64,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",
                "data:image/png;base64,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",
                "data:image/png;base64,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",
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOkAAACiAQMAAACeZngPAAAABlBMVEVHcEz///+flKJDAAAAAXRSTlMAQObYZgAAA29JREFUWMPtVz1u2zAUJsGBSxGtHQLzEF00GFaP0t7A3VwkMNkpSwEfIRcpGmXymCOUnTqWQRcFEcTyX6REcmsnEwEi+KPI9733vR8BcFmXdVn/b3VVFEpeg7Eca3AjJavARMqhZlmPZM0ytaNsHFaG4fLpRENTEab64K5ou2HVlC5HxieodHljgZLjHKdSWGhvD2FFpxj2eduwY4xEzTIA8qZ3/q3bvFN697DNOiWEclOzTBlRDJfdyErhstf0OafYH0mfhb1l4gAgzwtJH8KvARyKluHTOTg/E02y/cSgFBmJW4/tW66SZc3LkIVCjvuYZBps9DjSbRS8VIYAkefXU0bsLjmQvHs587XYG2ssPOPhUawFRazh8K4b3ou1oKg7TcFPfH25Z/qre7nvwZIa9Lu7B7kz/8cMLwBu7qeDuUxmeAHw8fR1by4jcdCJt3R/fsvNZYntnd/bfnjX2+iPGV5gu/2jH6kAuwgONDfk7JRF2Npw0LzZOFp4tg0HO/D9qIujIoJmx8zlBv0QunSyJFFnknDULmFpokbh3YeEmE0/5jxIwi+J/z2jUIKStNCixFJOc6Im/lUkVVOQkodMTJSlWOh35RgysYmD1zGbJJKJ2RgemWmF1PB9aG7NfPvgigwaWk87yknIvTSOvoDJRs5e7X3sybVnGjU/9MU/N98DPFuGQnDRFOA5JDiw9DUExo0Vb1aZ49RgTsXfXDcVgPo3+lmP9kbtdd6loaPcZ5u+jsrA0Hfv5x7A3/oHvScYvIsJnpl6YEbsLO0OWPtWGeIKk2tcs2S1SxCH7jVfUEI8tPTh0IwJoTkfzEbp4+PUFGWTvoZOIXiJcp3gO5GbhBBzj3RREY+ms5kzVLjQsn+P5s+wUZJeDgcqR9RAgN1k0NBlKRe6MFkBJroKvlAHO7LroQnrQcm3j27VZhqm4hd8sZqZiAo+mm4jt6deIXLqRJt6MoLlWQnjUILphJS53iK4bN6qDsg5g9ESnnTxgEVY2NC7Bo7zwxijNRg/SQtfFebbYVceWvTUcl0Z5pQct74i51dbnRTBoTKsGf5t3DaWmnrROipPqUZmDajCmzKs8hzVhv/2CteG+3ZDqvCuq8KUihosX2ufLZ/lzxp8Ix/7Ckwfat80gJLqB9VxU4XH+seaqMP88jl7Wf9w/QW1eZn6K4Jn1QAAAABJRU5ErkJggg==",
            ]
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

        this._load_accessories();
    }

    _load_accessories = () => {

        if(this.st4te.camo >= 1) {

            if(this.st4te._cams.length <= 1) {
                JSLoader( () => import("../utils/custom_toolbar")).then(({CAMS}) => {

                    this.setSt4te({_cams: Array.from(CAMS)}, ( )=> {

                        this.forceUpdate();
                    });
                });
            }
        }
    }

    componentWillReceiveProps(new_props) {

        const state = {
            ...new_props,
            _actions_triggered: this.st4te._actions_triggered,
            _is_info_bar_active: new_props.pathname.includes("pixel") ? this.st4te._is_info_bar_active: false
        };

        const update_info_bar = this.st4te._is_info_bar_active !== state._is_info_bar_active || this.st4te.pathname !== state.pathname;
        const update = Boolean(
            update_info_bar ||
            this.st4te.camo !== state.camo ||
            this.st4te.ret !== state.ret ||
            this.st4te.logged_account !== state.logged_account ||
            this.st4te.know_if_logged !== state.know_if_logged ||
            this.st4te.loaded_progress_percent !== state.loaded_progress_percent ||
            this.st4te.music_enabled !== state.music_enabled
        );

        if(update_info_bar) {
            state._actions_triggered.clear();
        }

        this.setSt4te(state, () => {

            if(update) {

                this.forceUpdate();
                this._load_accessories();
            }
        });
    }

    _toggle_info_bar_activation = () => {

        let { _is_info_bar_active } = this.st4te;
        this.setSt4te({_is_info_bar_active: !_is_info_bar_active}, () => {
            this.forceUpdate();
        });
    };

    _trigger_canvas_action = (name) => {

        let _actions_triggered = this.st4te._actions_triggered;
            _actions_triggered.add(name);

        this.setSt4te({_actions_triggered}, () => {

            this.forceUpdate(() => {

                actions.trigger_canvas_action(name);

                if(_actions_triggered.size === 6) {

                    setTimeout(() => {

                        _actions_triggered.clear();
                        this.setSt4te({_actions_triggered, _is_info_bar_active: false}, () => {

                            setTimeout(() => {

                                actions.trigger_snackbar("All laboratory's processes done! You learn pretty quick...");
                                setTimeout(() => {
                                    actions.jamy_update("happy");
                                }, 750);

                                setTimeout(() => {

                                    actions.trigger_snackbar("Your creation is much better now, such greater!")
                                    setTimeout(() => {
                                        actions.jamy_update("flirty");
                                    }, 750);

                                    setTimeout(() => {

                                        actions.trigger_snackbar("Laboratory's swag is yield strong, ready for rendering!", 4500)
                                        setTimeout(() => {
                                            actions.jamy_update("angry", 1250);
                                        }, 750);
                                    }, 4000);

                                }, 4000);
                            }, 1000);
                        });
                    }, 1000);
                }
            });
        });
    };

    _go_to = (url) => {

        const { _history } = this.st4te;
        _history.push(url);
    };

    _on_settings_changed = () => {

        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 250);

        actions.trigger_settings_update();
    }

    _handle_music_enabled_switch_change = () => {

        const checked = Boolean(this.st4te.music_enabled);

        if(checked){

            actions.trigger_sfx("ui_lock");
            actions.stop_sound();
        }else {

            actions.trigger_sfx("ui_unlock");
        }

        const settings = { music_enabled: !checked };
        this.setSt4te(settings, () => {

            api.set_settings(settings,  this._on_settings_changed);
        });

    };

    _change_sorting = (sorting) => {
        const { pathname } = this.st4te;
        let pathname_splitted = pathname.split("/");
        pathname_splitted.shift();
        var tag = pathname_splitted[0];
        this._go_to("/marketplace/"+tag+"/"+sorting)
    };

    render() {

        const { classes, pathname, logged_account, know_if_logged, loaded_progress_percent, _is_info_bar_active, music_enabled, _actions_triggered } = this.st4te;

        let { _cams, camo, _rets, ret } = this.st4te;
        _cams = _cams.length > 0 ? _cams: [""];
        _rets = _rets.length > 0 ? _rets: [""];
        camo = camo || 0;
        ret = ret || 0;

        const ret_e = Boolean(parseInt(ret) > 0 && parseInt(ret) < _rets.length) ? <img className={classes.ret} src={_rets[parseInt(ret)]}/>: null;


        let pathname_splitted = pathname.split("/");
        pathname_splitted.shift();

        let pathame_items = !_is_info_bar_active ? pathname_splitted.map((element, index, array) => {

            let link_to = "/";
            for (let i = 0; i <= index; i++) {

                link_to += array[i] + (i === index ? "": "/");
            }


            return element === "" ? null: <Fade key={index} in={true} timeout={index*125}><a onClick={() => {this._go_to(link_to)}} className={classes.link} >&nbsp;►&nbsp;{element}</a></Fade>;
        }): null;

        const usrnm = (know_if_logged ? logged_account ? logged_account.name: "https://pixa.pics/": "https://pixa.pics/");

        var tip_items = pathname.includes("pixe") ? _is_info_bar_active ?  [
            <a key="tip-contrast"
               onClick={() => {this._trigger_canvas_action("contrast")}}
               className={_actions_triggered.has("contrast") ?  classes.linkDone:  classes.link}>
                &nbsp;1a)&nbsp;Contrast&nbsp;→&nbsp;
            </a>,
            <a key="tip-contrast"
               onClick={() => {this._trigger_canvas_action("saturation")}}
               className={_actions_triggered.has("saturation") ?  classes.linkDone:  classes.link}>
                &nbsp;1b)&nbsp;Saturation&nbsp;→&nbsp;
            </a>,
            <a key="tip-colors"
               onClick={() => {this._trigger_canvas_action("palette")}}
               className={_actions_triggered.has("palette") ?  classes.linkDone:  classes.link}>
                &nbsp;2)&nbsp;Palette*&nbsp;→&nbsp;
            </a>,
            <a key="tip-smooth"
               onClick={() => {this._trigger_canvas_action("smooth")}}
               className={_actions_triggered.has("smooth") ?  classes.linkDone:  classes.link}>
                &nbsp;3)&nbsp;Smooth&nbsp;→&nbsp;
            </a>,
            <a key="tip-filters"
               onClick={() => {this._trigger_canvas_action("filter")}}
               className={_actions_triggered.has("filter") ?  classes.linkDone:  classes.link}>
                &nbsp;4)&nbsp;Filters&nbsp;→&nbsp;
            </a>,
            <a key="tip-export"
               onClick={() => {this._trigger_canvas_action("render")}}
               className={_actions_triggered.has("render") ?  classes.linkDone:  classes.link}>
                &nbsp;5)&nbsp;Render*&nbsp;
            </a>,
    ]: []: [];

        if(pathname.includes("marketplace") && _is_info_bar_active) {

            pathame_items = null;
            tip_items = [
                <a key="created"
                   onClick={() => {this._change_sorting("created")}}
                   className={classes.link}>
                    &nbsp;created&nbsp;
                </a>,
                <a key="hot"
                   onClick={() => {this._change_sorting("hot")}}
                   className={classes.link}>
                    &nbsp;hot&nbsp;
                </a>,
                <a key="trending"
                   onClick={() => {this._change_sorting("trending")}}
                   className={classes.link}>
                    &nbsp;trending&nbsp;
                </a>
            ]
        }

        var marketplace_icon = <CloseIcon />;
        if(pathname.includes("marketplace")) {

            if(!_is_info_bar_active) {

                if (pathname_splitted[0] === "profile") {
                    marketplace_icon = <SendSharp/>
                } else {
                    var sorting = pathname_splitted[1] || "hot";
                    switch (sorting) {
                        case "created":
                            marketplace_icon = <Created onClick={this._toggle_info_bar_activation}/>;
                            break;
                        case "hot":
                            marketplace_icon = <Hot onClick={this._toggle_info_bar_activation}/>;
                            break;
                        case "trending":
                            marketplace_icon = <Trending onClick={this._toggle_info_bar_activation}/>;
                            break;
                        default:
                            marketplace_icon = <Hot onClick={this._toggle_info_bar_activation}/>;

                    }
                }
                var tag = pathname_splitted[0] || "feed";
                pathame_items = [
                    <Fade key={"1"} in={true} timeout={125}><a className={classes.link}>{tag}</a></Fade>
                ]
           }else {
                pathame_items = [];
            }
        }
        return (
            <div className={classes.root}>
                <Button className={classes.innerToolbar} style={Boolean(parseInt(camo) > 0 && parseInt(camo) < _cams.length) ? {backgroundImage: `url("${_cams[parseInt(camo)]}")`}: {}} disableFocusRipple>
                    <span className={classes.innerToolbarTextWrapperContainer}>
                        <span className={classes.innerToolbarTextWrapper}>
                            <div className={classes.innerToolbarProgress}>
                                <LinearProgress
                                    color="primary"
                                    variant="determinate"
                                    role="progressbar" aria-valuenow={loaded_progress_percent} aria-valuemin="0" aria-valuemax="100"
                                    aria-label={"main-progressbar-left"}
                                    className={navigator.onLine ? classes.linearProgressVisible: classes.linearProgressVisibleOffline}
                                    value={100 - loaded_progress_percent}
                                    style={{transform: "rotate(-180deg)", WebkitTransform: "rotate(-180deg)"}}/>
                                <LinearProgress
                                    color="primary"
                                    variant="determinate"
                                    role="progressbar" aria-valuenow={loaded_progress_percent} aria-valuemin="0" aria-valuemax="100"
                                    aria-label={"main-progressbar-right"}
                                    className={navigator.onLine ? classes.linearProgressVisible: classes.linearProgressVisibleOffline}
                                    value={100 - loaded_progress_percent} />
                            </div>
                            <span className={classes.innerToolbarText}>
                                <span className={classes.innerToolbarTextInner} style={pathname.includes("gallery") ? {width: "calc(100% - 36px)", overflow: "overlay"}: {}}>
                                    {!_is_info_bar_active && <a className={classes.link} onClick={() => {this._go_to(logged_account ? "/": "/")}}>{(usrnm ? ret_e: null)}{usrnm}</a>}
                                    {pathame_items}
                                    {tip_items}
                                </span>
                            </span>
                        </span>
                    </span>
                </Button>
                <IconButton aria-label="main-account-button" style={pathname.includes("/pixe") ? {}: {display: "none"}} className={classes.infoIcon} onClick={this._toggle_info_bar_activation}>
                    {_is_info_bar_active ? <CloseIcon />: <InfoIcon className={classes.glow} />}
                </IconButton>
                <IconButton aria-label="marketplace-button" style={pathname.includes("/marketplace") ? {}: {display: "none"}} className={classes.infoIcon} onClick={this._toggle_info_bar_activation}>
                    {marketplace_icon}
                </IconButton>
                <IconButton aria-label="current-page-options-button" style={pathname === "/" ? {}: {display: "none"}} className={classes.infoIcon} onClick={this._handle_music_enabled_switch_change}>
                    {music_enabled ? <VolumeOffIcon />: <VolumeUpIcon />}
                </IconButton>
            </div>
        );
    }
}

export default withStyles(styles)(InnerToolbar);
