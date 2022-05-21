import React from "react";
import {withStyles} from "@material-ui/core";

import { t } from "../utils/t";

import {Divider, CardHeader, Container, Card, CardContent, FormControlLabel, Switch, TextField, Fade} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";

import { LANGUAGES, LOCALES, CURRENCY_COUNTRIES } from "../utils/constants";

import BlingBling from "../icons/BlingBling";
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
    marginTop: {
        marginTop: theme.spacing(2)
    }
});


class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            _locales: LOCALES,
            _currency_countries: CURRENCY_COUNTRIES,
            _selected_locales_code: null,
            _language: document.documentElement.lang,
            _selected_currency: null,
            _fees: 1,
            _sfx_enabled: true,
            _music_enabled: false,
            _jamy_enabled: true,
            _panic_mode: false
        };
    };

    componentDidMount() {

        this._update_settings();

        actions.trigger_loading_update(0);
        setTimeout(() => {

            actions.trigger_loading_update(100);
        }, 250);
    }

    _process_settings_query_result = (error, settings) => {

        // Set new settings from query result
        const _fees = typeof settings.fees !== "undefined" ? settings.fees: 1;
        const _sfx_enabled = typeof settings.sfx_enabled !== "undefined" ? settings.sfx_enabled: true;
        const _music_enabled = typeof settings.music_enabled !== "undefined" ? settings.music_enabled: false;
        const _jamy_enabled = typeof settings.jamy_enabled !== "undefined" ? settings.jamy_enabled: true;
        const _selected_locales_code =  typeof settings.locales !== "undefined" ? settings.locales: "en-US";
        const _language = _selected_locales_code.split("-")[0];
        const _selected_currency = typeof settings.currency !== "undefined" ? settings.currency: "USD";
        const _panic_mode = typeof settings.panic !== "undefined" ? settings.panic: false;

        actions.trigger_loading_update(0);
        actions.trigger_loading_update(100);

        this.setState({ _fees, _sfx_enabled, _jamy_enabled, _selected_locales_code, _language, _selected_currency, _panic_mode, _music_enabled });
    };

    _update_settings() {

        // Call the api to get results of current settings and send it to a callback function
        api.get_settings(this._process_settings_query_result);
    }

    _on_settings_changed = () => {

        const { _language } = this.state;

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
            this.setState({_selected_locales_code: value.original.code, _language: value.original.code.split("-")[0]});
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

    render() {

        const { _locales,  _sfx_enabled, _music_enabled, _jamy_enabled, _currency_countries, _selected_locales_code, classes } = this.state;

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
                        <Card style={{position: "relative", zIndex: 1, minHeight: "500px",
                            textShadow: "0px 0px 6px black",
                            color: "white",
                            filter: "brightness(1.3) contrast(1.15) drop-shadow(0px 0px 6px #00000099)",
                            background: `linear-gradient(21deg, rgba(1, 0, 62, 0.16), rgba(0, 0, 0, 0.675)) center bottom, linear-gradient(21deg, rgb(0, 0, 0), rgba(5, 5, 60, 0.76), rgba(255, 255, 255, 0.67) 35%, rgba(95, 100, 134, 0.37) 50%, rgba(0, 23, 97, 0.2) 65%, rgba(0, 0, 0, 0.54), rgba(0, 0, 0, 0.59)), url("data:image/png;base64,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") 100% 100%, linear-gradient(20deg, rgb(97, 0, 253), rgb(93, 191, 243), rgb(123, 226, 241), rgb(152, 236, 255), rgb(50, 196, 255), rgb(109, 91, 255), rgb(2, 5, 98))`,
                            backgroundSize: "cover",
                            backgroundPosition: "bottom"}} className={classes.marginTop}>
                            <CardHeader style={{textAlign: "center"}} title={
                                <span>
                                    <BlingBling className="emoji-150" style={{verticalAlign: "middle", transformOrigin: "right", transform: "translate(50%, 0px) scale(2)"}} />
                                    <span style={{fontWeight: "bold"}}>GREAT <sup style={{fontSize: "0.5em"}}>& BLING-BLING</sup> FRIENDS!</span>
                                    <BlingBling className="emoji-150" style={{verticalAlign: "middle", transformOrigin: "right", transform: "translate(50%, 0px) scale(2)"}} />
                                </span>
                            }/>
                            <CardContent>
                                <h2><img src={"/src/images/league/Gold.svg"} style={{verticalAlign: "middle", height: "2em"}}/> 1) Gold Supporters</h2>
                            </CardContent>
                            <CardContent>
                                <h2><img src={"/src/images/league/Silver.svg"} style={{verticalAlign: "middle", height: "2em"}}/> 2) Silver Supporters</h2>
                            </CardContent>
                            <CardContent>
                                <h2><img src={"/src/images/league/Bronze.svg"} style={{verticalAlign: "middle", height: "2em"}}/> 3) Bronze Supporters</h2>
                            </CardContent>
                            <Divider />
                            <CardContent>
                                <h2><img src={"/src/images/league/Diamond.svg"} style={{verticalAlign: "middle", height: "2em"}}/> 0) Diamond Supporters <sup style={{fontSize: "0.5em"}}>(Businesses that involve our own)</sup></h2>
                                <p>Coming soon!</p>
                            </CardContent>
                        </Card>
                    </Fade>
                    <Fade in timeout={225*3}>
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
                                />
                            </CardContent>
                        </Card>
                    </Fade>
                    <Fade in timeout={225*4}>
                        <Card style={{position: "relative", zIndex: 1}} className={classes.marginTop}>
                            <div style={{backgroundImage: "url(/src/images/Team.svg)", backgroundSize: "cover", backgroundPosition:"center", backgroundRepeat: "no-repeat", padding: 0, margin: 0, position: "absolute", width: "100%", height: "100%", filter: "contrast(0.777) saturate(1.314) opacity(0.369)", zIndex: "-1"}}></div>
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
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Settings);
