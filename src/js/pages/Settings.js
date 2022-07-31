import React from "react";
import {Slider, Typography, withStyles} from "@material-ui/core";

import { t } from "../utils/t";

import {Divider, CardHeader, Container, Card, CardContent, FormControlLabel, Switch, TextField, Fade} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";

import { LANGUAGES, CURRENCY_COUNTRIES } from "../utils/constants";
import LOCALES from "../utils/constant_locales";

import SwissTweemoji from "../twemoji/react/1F1E81F1Ed";
import DangerTweemoji from "../twemoji/react/26A0";
import ShieldTweemoji from "../twemoji/react/1F6E1";
import get_svg_in_b64 from "../utils/svgToBase64";

import api from "../utils/api";
import actions from "../actions/utils";

import fuzzy from "fuzzy";

const styles = theme => ({
    container: {
        overflow: "overlay",
        padding: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2, 0)
        }
    },
    pixaLogo: {
        margin: "-12.5% 0%",
        [theme.breakpoints.down("sm")]: {
            margin: ""
        }
    },
    marginTop: {
        marginTop: theme.spacing(2)
    },
    marginTopSponsors: {
        marginTop: theme.spacing(2),
        position: "relative",
        zIndex: 1,
        minHeight: "500px",
        textShadow: "0px 0px 6px black",
        color: "white",
        background: `url("/src/images/illustrations/Camo.svg")`,
        backgroundRepeat: "repeat",
        backgroundColor: `#03020d`,
        backgroundSize: "50%",
        backgroundPosition: "center",
        contain: "style paint layout",
        overflow: "hidden",
    },
    sliderContainer: {
        display: "flex",
        overflow: "visible",
    },
    sliderLabel: {
        marginRight: theme.spacing(2),
    }
});


class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            _locales: LOCALES,
            _currency_countries: CURRENCY_COUNTRIES,
            _language: document.documentElement.lang,
            ...JSON.parse(props.settings)
        };
    };

    componentWillMount() {

        actions.trigger_loading_update(0);
        actions.trigger_page_render_complete();
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 300);
    }

    _on_settings_changed = () => {

        actions.trigger_voice("rewriting_deep_layer_protocols");
        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 250);

        actions.trigger_settings_update();
        actions.trigger_snackbar(t( "pages.settings.settings_changed"));
    }

    _handle_locales_changed = (event, value) => {

        if(value) {

            const settings = { locales: value.original.code };
            this.setState({_selected_locales_code: value.original.code || "en-US", _language: value.original.code.split("-")[0] || "en-US"});
            api.set_settings(settings, this._on_settings_changed);
            actions.trigger_sfx("ui_lock");
            actions.jamy_update("happy");
        }
    }

    _handle_sfx_enabled_switch_change = (event) => {

        const checked = Boolean(this.state._sfx_enabled);

        if(checked){

            actions.trigger_sfx("ui_lock");
            actions.jamy_update("happy");
        }else {

            actions.trigger_sfx("ui_unlock");
            actions.jamy_update("happy");
        }

        const settings = { sfx_enabled: !checked };
        this.setState({_sfx_enabled: !checked});
        api.set_settings(settings,  this._on_settings_changed);
    };

    _handle_music_enabled_switch_change = (event) => {

        const checked = Boolean(this.state._music_enabled);

        if(checked){

            actions.trigger_sfx("ui_lock");
            actions.jamy_update("happy");
            actions.stop_sound();
        }else {

            actions.trigger_sfx("ui_unlock");
            actions.jamy_update("happy");
        }

        const settings = { music_enabled: !checked };
        this.setState({_music_enabled: !checked});
        api.set_settings(settings,  this._on_settings_changed);
    };

    _handle_voice_enabled_switch_change = (event) => {

        const checked = Boolean(this.state._voice_enabled);

        if(checked){

            actions.trigger_sfx("ui_lock");
            actions.jamy_update("happy");
            actions.stop_sound();
        }else {

            actions.trigger_sfx("ui_unlock");
            actions.jamy_update("happy");
        }

        const settings = { voice_enabled: !checked };
        this.setState({_voice_enabled: !checked});
        api.set_settings(settings,  this._on_settings_changed);
    };

    _handle_jamy_enabled_switch_change = (event) => {

        const checked = Boolean(this.state._jamy_enabled);

        if(checked){

            actions.trigger_sfx("ui_lock");
            actions.jamy_update("sad");
        }else {

            actions.trigger_sfx("ui_unlock");
            actions.jamy_update("happy");

            setTimeout(async () => {

                actions.trigger_snackbar("I am Jamy, a kind Emoji, developed on IntelliJ, life in vectors, sometimes not working on tor,\n\n you can click my face, I am perfect like an Ace, in imagination only is default of my perfections...", 20000)
            }, 3000);
        }

        const settings = { jamy_enabled: !checked };
        this.setState({_jamy_enabled: !checked});
        api.set_settings(settings,  this._on_settings_changed);
    };

    _fuzzy_filter_locales = (list, input_value) => {

        const options = {
            pre: "<b style=\"color: #000244;\">"
            , post: "</b>"
            , extract: function(element) { return element.name; }
        };

        return fuzzy.filter(input_value.inputValue, list, options);
    };

    _set_camo_from_slider = (event, value) => {

        const index = parseInt(value);
        this.setState({_camo: index}, () => {

            api.set_settings({camo: index},  this._on_settings_changed);
        });
    };

    _set_ret_from_slider = (event, value) => {

        const index = parseInt(value);
        this.setState({_ret: index}, () => {

            api.set_settings({ret: index},  this._on_settings_changed);
        });
    };

    render() {

        const { _voice_enabled, _locales,  _sfx_enabled, _music_enabled, _jamy_enabled, _currency_countries, _selected_locales_code, classes, _camo, _ret } = this.state;

        let locales = _locales[0];

        for (let i = 0; i < _locales.length; i++) {
            if(_locales[i].code == _selected_locales_code) {
                locales = _locales[i];
            }
        }

        let currencies = [];
        Object.entries(_currency_countries).forEach(entry => {
            const [key, value] = entry;
            currencies.push(key);
        });

        return (
            <div style={{overflow: "overlay", maxHeight: "100%"}}>
                <Container maxWidth="sm" className={classes.container}>
                    <Fade in timeout={225*1}>
                        <Card>
                            <CardHeader title={t( "pages.settings.language")} />
                            <CardContent>
                                <Autocomplete
                                    fullWidth
                                    value={locales}
                                    filterOptions={this._fuzzy_filter_locales}
                                    onChange={this._handle_locales_changed}
                                    id="locales-autocomplete"
                                    options={_locales}
                                    getOptionLabel={(option) => option.name || option.original.name}
                                    renderOption={(option) =>
                                        <div>
                                            <img src={get_svg_in_b64(option.original.svg, !LANGUAGES.includes(option.original.code.split("-")[0]))} style={{marginRight: 8, verticalAlign: "middle", height: 24}}/>
                                            <span
                                                style={{color: LANGUAGES.includes(option.original.code.split("-")[0]) ? "#1c1882": "inherit"}}
                                                dangerouslySetInnerHTML={{ __html: option.string }}>
                                            </span>
                                        </div>
                                    }
                                    renderInput={(params) => <TextField {...params} label={t( "words.locales", {FLC: true})} margin="normal" />}
                                />
                            </CardContent>
                        </Card>
                    </Fade>
                    <Fade in timeout={225*2}>
                        <Card className={classes.marginTopSponsors}>
                            <CardHeader style={{textAlign: "center", marginTop: "36px"}} title={
                                <span>
                                    <span style={{fontWeight: "bold", fontSize: "36px"}}>∞ WISE SUPPORTERS</span>
                                </span>
                            }/>
                            <CardContent>
                                <div style={{textAlign: "right", display: "flex"}}>
                                    <p style={{float: "left", padding: 16, margin: 0, width: "50%", height: "100%"}}>All those friends just help us moving forward rightly only faster while being free and open-source.</p>
                                    <img src="/src/images/logo-transparent.png" className={classes.pixaLogo} style={{float: "right", padding: 16, width: "50%", height: "100%"}}></img>
                                </div>
                            </CardContent>
                            <CardContent>
                                <h2><img src={"/src/images/league/Gold.png"} style={{verticalAlign: "middle", height: "2em"}}/> 1) Gold Supporters</h2>
                            </CardContent>
                            <CardContent>
                                <h2><img src={"/src/images/league/Silver.png"} style={{verticalAlign: "middle", height: "2em"}}/> 2) Silver Supporters</h2>
                            </CardContent>
                            <CardContent>
                                <h2><img src={"/src/images/league/Bronze.png"} style={{verticalAlign: "middle", height: "2em"}}/> 3) Bronze Supporters</h2>
                            </CardContent>
                            <Divider />
                            <CardContent>
                                <h2><img src={"/src/images/league/Diamond.png"} style={{verticalAlign: "middle", height: "2em"}}/> ∞) Diamond Supporters* <sub style={{fontSize: "0.5em"}}>*Businesses involving ours.</sub></h2>
                                <p>Coming soon!</p>
                            </CardContent>
                            <CardContent>
                                <h2>How it works</h2>
                                <p>Gold ($ 6K/Month), Silver ($ 4K/Month), and Bronze ($ 2K/Month) supporters enable Pixa.Pics to have a great team while being wider very soon. Benefiting a positive cashflow to pay everything that is related to our activities is vital for production.</p>
                            </CardContent>
                            <CardContent>
                                <div style={{textAlign: "left", display: "flex", alignItems: "center"}}>
                                    <img src="/src/images/infographics/Rambo.svg" style={{float: "left", padding: 16, margin: 0, width: "50%", height: "100%"}}></img>
                                    <p style={{float: "right", padding: 16, margin: 0, width: "50%", height: "100%"}}> Thank you, we do not have allies very often, but when we do, we ally worthy of reasons with greatness instead of good.<br/>— The Pixelables</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Fade>
                    <Fade in timeout={225*3}>
                        <Card className={classes.marginTop}>
                            <CardHeader title={"Visuals"} />
                            <CardContent>
                                <div className={classes.sliderContainer}>
                                    <Typography className={classes.sliderLabel} id="ret-slider"
                                                gutterBottom>Symbol</Typography>
                                    <Slider defaultValue={_ret} step={1}
                                            valueLabelFormat={(value) => { return Array.of("no", "hnd", "sly", "sun", "bhz", "evl", "ptn", "skl", "ncl", "ufo", "msc", "tgr", "rvn")[value]}}
                                            valueLabelDisplay="auto" min={0} max={12}
                                            onChangeCommitted={this._set_ret_from_slider}
                                            aria-labelledby="ret-slider"/>
                                </div>
                                <div className={classes.sliderContainer}>
                                    <Typography className={classes.sliderLabel} id="camo-slider"
                                                gutterBottom>Toolbar</Typography>
                                    <Slider defaultValue={_camo} step={1}
                                            valueLabelFormat={(value) => { return Array.of("no", "dgt", "jgl", "snd", "cns", "mny", "rpt", "mgk", "npn", "lf", "dth", "fr", "blt")[value]}}
                                            valueLabelDisplay="auto" min={0} max={12}
                                            onChangeCommitted={this._set_camo_from_slider}
                                            aria-labelledby="camo-slider"/>
                                </div>
                            </CardContent>
                        </Card>
                    </Fade>
                    <Fade in timeout={225*4}>
                        <Card className={classes.marginTop}>
                            <CardHeader title={t( "pages.settings.sound")} />
                            <CardContent>
                                <FormControlLabel
                                    value={t( "pages.settings.enable_sound_effects")}
                                    control={<Switch checked={_sfx_enabled} onChange={this._handle_sfx_enabled_switch_change} color="primary" />}
                                    label={t( "pages.settings.enable_sound_effects")}
                                    labelPlacement="end"
                                /> <br />
                                <FormControlLabel
                                    value={"Enable music effects"}
                                    control={<Switch checked={_music_enabled} onChange={this._handle_music_enabled_switch_change} color="primary" />}
                                    label={ "Enable music effects"}
                                    labelPlacement="end"
                                /> <br />
                                <FormControlLabel
                                    value={"Enable voice effects"}
                                    control={<Switch checked={_voice_enabled} onChange={this._handle_voice_enabled_switch_change} color="primary" />}
                                    label={ "Enable voice effects"}
                                    labelPlacement="end"
                                />
                            </CardContent>
                        </Card>
                    </Fade>
                    <Fade in timeout={225*5}>
                        <Card style={{position: "relative", zIndex: 1}} className={classes.marginTop}>
                            <CardHeader title={t( "pages.settings.superintendent")} />
                            <CardContent>
                                <FormControlLabel
                                    value={t( "pages.settings.enable_the_superintendent")}
                                    control={<Switch checked={_jamy_enabled} onChange={this._handle_jamy_enabled_switch_change} color="primary" />}
                                    label={t( "pages.settings.make_jamy_active")}
                                    labelPlacement="end"
                                />
                                <p>{t( "pages.settings.description_of_jamy")}</p>
                                <Divider />
                                <p>
                                    <div style={{position: "relative"}}>
                                        <h2>The following semi-annual report, warns : <img style={{verticalAlign: "sub", width: "1.25em"}} src={get_svg_in_b64(<DangerTweemoji/>)}/></h2>
                                        <p><b>Social networks are often thought of as a sort of parallel world yet they offer the possibility of creating one's own profile with relatively little effort and presenting oneself on the Internet, they can serve cybercriminals as a welcome supplier of information. This perceived "community" may however be deceiving.</b></p>
                                        <blockquote style={{color: "navy"}}>
                                            "The use of social networking sites should be governed by the same principles as use of the Internet in general. As little personal information as possible should be divulged. The information should be well protected and only made accessible to clearly defined persons. Ultimately, the responsibility lies with each individual Internet user. Prior to publication, everyone should think and decide for themselves which personal data to publish on the Internet, thereby making it available to the public for an indeterminate time period."
                                        </blockquote><br/>
                                    </div>
                                    <br/>
                                    <b style={{color: "midnightblue"}}>— Federal Strategy Unit for IT & Federal Office of Police fedpol  <img style={{verticalAlign: "sub", width: "1.25em"}} src={get_svg_in_b64(<ShieldTweemoji/>)}/> | Swiss Confederation <img style={{verticalAlign: "sub", width: "1.25em"}} src={get_svg_in_b64(<SwissTweemoji/>)}/> around 2008. <i style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => {window.open("https://www.ncsc.admin.ch/ncsc/en/home/dokumentation/berichte/lageberichte/semi-annual-report-2008-1.html")}}>See ncsc.admin.ch...</i></b>
                                </p>
                            </CardContent>
                        </Card>
                    </Fade>
                    <Fade in timeout={225*6}>
                        <Card style={{position: "relative", zIndex: 1, minHeight: "250px"}} className={classes.marginTop}>
                            <CardHeader title={"Issues / Feedback / sugg."} />
                            <CardContent>
                                <div style={{textAlign: "left", display: "flex", alignItems: "center"}}>
                                    <img src="/src/images/infographics/TestBag.svg" style={{float: "left", padding: 16, margin: 0, width: "50%", height: "100%"}}></img>
                                    <div style={{float: "right", padding: 16, margin: 0, width: "50%", height: "100%"}}>
                                        <h4>Please email-us at: <a href={"mailto:pixa.pics@protonmail.com"}>pixa.pics@protonmail.com</a>.</h4>
                                        <h3>Thanks for support!</h3>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Fade>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Settings);
