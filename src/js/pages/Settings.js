import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { t } from "../utils/t";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Fade from "@material-ui/core/Fade";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { LANGUAGES, LOCALES, CURRENCY_COUNTRIES } from "../utils/constants";
import get_svg_in_b64 from "../utils/svgToBase64";
import api from "../utils/api";
import actions from "../actions/utils";
import CardHeader from "@material-ui/core/CardHeader";

import fuzzy from "fuzzy";

const styles = theme => ({
    container: {
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
            _sfx_enabled: false,
            _jamy_enabled: false,
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
        const _sfx_enabled = typeof settings.sfx_enabled !== "undefined" ? settings.sfx_enabled: false;
        const _jamy_enabled = typeof settings.jamy_enabled !== "undefined" ? settings.jamy_enabled: false;
        const _selected_locales_code =  typeof settings.locales !== "undefined" ? settings.locales: "en-US";
        const _language = _selected_locales_code.split("-")[0];
        const _selected_currency = typeof settings.currency !== "undefined" ? settings.currency: "USD";
        const _panic_mode = typeof settings.panic !== "undefined" ? settings.panic: false;

        actions.trigger_loading_update(0);
        actions.trigger_loading_update(100);

        this.setState({ _fees, _sfx_enabled, _jamy_enabled, _selected_locales_code, _language, _selected_currency, _panic_mode });
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

    _handle_currency_changed = (event, value) => {

        if(value.original) {

            const settings = { currency: value.original.toUpperCase() };
            this.setState({_selected_currency: value.original.toUpperCase()});
            api.set_settings(settings, this._on_settings_changed);
            actions.trigger_sfx("ui_lock");
            actions.jamy_update("happy");
        }
    }

    _handle_panic_switch_change = (event) => {

        const checked = Boolean(this.state._panic_mode);

        if(checked){

            actions.trigger_sfx("ui_lock");
            actions.jamy_update("shocked");
        }else {

            actions.trigger_sfx("ui_unlock");
            actions.jamy_update("suspicious");
        }

        const settings = { panic: !checked };
        this.setState({_panic_mode: !checked});
        api.set_settings(settings, this._on_settings_changed);
    };

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
        api.set_settings(settings, this._on_settings_changed);
    };

    _handle_jamy_enabled_switch_change = (event) => {

        const checked = Boolean(this.state._jamy_enabled);

        if(checked){

            actions.trigger_sfx("ui_lock");
            actions.jamy_update("sad");
        }else {

            actions.trigger_sfx("ui_unlock");
            actions.jamy_update("happy");
        }

        const settings = { jamy_enabled: !checked };
        this.setState({_jamy_enabled: !checked});
        api.set_settings(settings, this._on_settings_changed);
    };

    _handle_input_fees_change = (event, _fees) => {

        this.setState({_fees});
    };

    _handle_fees_change_committing = (event) => {

        actions.trigger_sfx("ui_lock");
    };

    _handle_fees_change_committed = (event, _fees) => {

        actions.trigger_sfx("ui_unlock");
        actions.jamy_update("happy");

        const settings = { fees: _fees };
        this.setState({_fees});
        api.set_settings(settings, this._on_settings_changed);
    };

    _fuzzy_filter_locales = (list, input_value) => {

        const options = {
            pre: "<b style=\"color: #000244;\">"
            , post: "</b>"
            , extract: function(element) { return element.name; }
        };

        return fuzzy.filter(input_value.inputValue, list, options);
    };

    _fuzzy_filter_currency = (list, input_value) => {

        const options = {
            pre: "<b style=\"color: #000244;\">"
            , post: "</b>"
            , extract: function(element) { return element; }
        };

        return fuzzy.filter(input_value.inputValue, list, options);
    };

    render() {

        const { _locales, _language, _fees, _sfx_enabled, _jamy_enabled, _selected_currency, _currency_countries, _selected_locales_code, _panic_mode, classes } = this.state;

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
            <div>
                <Container maxWidth="sm" className={classes.container}>
                    <Fade in timeout={300*1}>
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
                    <Fade in timeout={300*3}>
                        <Card className={classes.marginTop}>
                            <CardHeader title={t( "pages.settings.sound")} />
                            <CardContent>
                                <FormControlLabel
                                    value={t( "pages.settings.enable_sound_effects")}
                                    control={<Switch checked={_sfx_enabled} onChange={this._handle_sfx_enabled_switch_change} color="primary" />}
                                    label={t( "pages.settings.enable_sound_effects")}
                                    labelPlacement="end"
                                />
                            </CardContent>
                        </Card>
                    </Fade>
                    <Fade in timeout={300*4}>
                        <Card className={classes.marginTop}>
                            <CardHeader title={t( "pages.settings.superintendent")} />
                            <CardContent>
                                <FormControlLabel
                                    value={t( "pages.settings.enable_the_superintendent")}
                                    control={<Switch checked={_jamy_enabled} onChange={this._handle_jamy_enabled_switch_change} color="primary" />}
                                    label={t( "pages.settings.make_jamy_active")}
                                    labelPlacement="end"
                                />
                                <p>{t( "pages.settings.description_of_jamy")}</p>
                            </CardContent>
                        </Card>
                    </Fade>
                </Container>
            </div>
        );
    }
}

export default withStyles(styles)(Settings);
