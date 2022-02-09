import svg64 from "svg64";

import svg from "../locales/svg";
import en from "../locales/en";
import fr from "../locales/fr";
import id from "../locales/id";
import pt from "../locales/pt";
import it from "../locales/it";
import de from "../locales/de";
import ja from "../locales/ja";
import zh from "../locales/zh";
import ko from "../locales/ko";
import ru from "../locales/ru";
import hi from "../locales/hi";
import es from "../locales/es";

const PARAM_PROPS_NAME = ["faw", "fluc", "flc", "fllc", "tuc", "tlc", "aed", "ated"];
const T = (name) => {

    switch(name) {
        case "svg":
            return svg;
        case "en":
            return en;
        case "fr":
            return fr;
        case "id":
            return id;
        case "pt":
            return pt;
        case "it":
            return it;
        case "de":
            return de;
        case "ja":
            return ja;
        case "zh":
            return zh;
        case "ko":
            return ko;
        case "ru":
            return ru;
        case "hi":
            return hi;
        case "es":
            return es;
        default:
            return en;

    }
};


let t = (path = "", variables = {}, parameters = {}) => {

    window.LANG = "en";
    window.LANG_DIR = T(LANG);

    if(window.LANG !== document.documentElement.lang) {

        window.LANG = document.documentElement.lang;
        window.LANG_DIR = T(LANG) || T("en");
    }

    const t_prime = (path = "", variables = {}, parameters = {}, LANG, LANG_DIR) => {

        // Detect if variables has been used as parameters for shorter syntax
        let variables_is_in_fact_parameters = false;
        Object.entries(variables).forEach(([key, value] ) => {

            variables_is_in_fact_parameters = PARAM_PROPS_NAME.includes(key.toLowerCase());
        });

        if(variables_is_in_fact_parameters) {

            parameters = variables;
            variables = {};
        }

        // Split path every dot
        const paths_array = path.split(".");

        // Goes to the first dir, (it is the language)
        let dir = window.LANG_DIR;

        // Goes to all other dir except pre-first (lang) and last (value :Object or :String)
        for(let i = 0; i < paths_array.length-1; i++) {

            dir = dir[paths_array[i]];
        }

        // Get the object in the last dir
        let end_dir_name = "";

        // Needs to remove '"', "'", ",", and so on so it can look for the right sentence... "My computer's mouse" -> "my computers mouse"
        if(parameters.faw || parameters.FAW) { // Format All Words

            end_dir_name = paths_array[paths_array.length-1]
                .replaceAll("'", "")
                .replaceAll('"', "")
                .replaceAll(",", "")
                .toLowerCase();

        }else {

            end_dir_name = paths_array[paths_array.length-1];
        }

        // It select the array property by its name so it is important to format it eventually if specified by FAW parameters...
        const end_path_value = dir[end_dir_name];

        // Stringify so it supports objects
        let value_with_variables = JSON.stringify(end_path_value);

        // Replace variables with real value(s) in the translate object value chosen
        Object.entries(variables).forEach(variable => {

            const [
                variable_name_to_replace, // dog
                variable_value_to_replace // "dog" or {dog: 2}
            ] = variable;

            if(variable_name_to_replace.length || variable_value_to_replace.toString()){

                const is_value_a_plural = typeof variable_value_to_replace === "object" && variable_value_to_replace !== null && variable_value_to_replace !== 0;

                if(is_value_a_plural) { // {dog: 2}

                    const [
                        variable_value_to_replace_props_pair, // dog: 2 in array mode
                        variable_number_to_replace_props_pair // _n: {few: 20, plenty: 100} in array mode
                    ] = Object.entries(variable_value_to_replace); // {dog: 2, _n: {few: 20, plenty: 100} } in array mode

                    const [
                        start_plural_key, // dog
                        plural_number_value // 2
                    ] = variable_value_to_replace_props_pair;

                    if(start_plural_key === variable_name_to_replace) {

                        let few_how_much = null;
                        let plenty_how_much = null;

                        const [
                            variable_value_to_replace_props_pair_name_id, // _n
                            variable_number_to_replace_props_pair_value_pair // {few: 20, plenty: 100}
                        ] = Object.entries(variable_value_to_replace_props_pair);

                        if (variable_value_to_replace_props_pair_name_id === "_n"){

                            few_how_much = variable_number_to_replace_props_pair_value_pair["few"] || null;
                            plenty_how_much = variable_number_to_replace_props_pair_value_pair["plenty"] || null;
                        }

                        const need_to_find_string = "%n {{{_plurals." + start_plural_key + "}}}";

                        let numbered_plural_var_text = plural_number_value <= 1 ? // Either one or many
                            LANG_DIR["_plurals"][start_plural_key]["one"]:
                            LANG_DIR["_plurals"][start_plural_key]["many"];


                        // From one up to few
                        numbered_plural_var_text = (few_how_much && plural_number_value > 1 && plural_number_value < few_how_much) ?
                            LANG_DIR["_plurals"][start_plural_key]["few"]: numbered_plural_var_text;


                        // From plenty up to infinity
                        numbered_plural_var_text = (plenty_how_much && plural_number_value >= plenty_how_much) ?
                            LANG_DIR["_plurals"][start_plural_key]["plenty"]: numbered_plural_var_text;


                        const need_to_replace_string = plural_number_value + " " + numbered_plural_var_text;

                        value_with_variables = value_with_variables.replace(need_to_find_string, need_to_replace_string);
                    }
                }else { // "dog"

                    const need_to_find_string = "{{" + variable_name_to_replace + "}}";
                    const need_to_replace_string = variable_value_to_replace === null ? "": variable_value_to_replace.toString();

                    value_with_variables = value_with_variables.replaceAll(need_to_find_string, need_to_replace_string);

                }
            }

        });

        const svg_image_regex = /\{\{\{_svg\.(.*?)\}\}\}/gm;

        let svg_image_regex_match;
        while((svg_image_regex_match = svg_image_regex.exec(value_with_variables)) !== null) {

            const svg_image_key = svg_image_regex_match[1];

            if(typeof svg_image_key !== "undefined") {

                let svg_image = "";

                if(typeof T("svg")[svg_image_key] !== "undefined") {

                    svg_image = T("svg")[svg_image_key];

                    const svg_image_params = LANG_DIR["_svg"][svg_image_key] || {};

                    Object.entries(svg_image_params).forEach(svg_image_params_entry => {

                        const [
                            svg_image_params_variable_name_to_replace,
                            svg_image_params_variable_value_to_replace
                        ] = svg_image_params_entry;

                        if(svg_image_params_variable_name_to_replace.length || svg_image_params_variable_value_to_replace.toString()){

                            svg_image = svg_image.replaceAll("{{"+svg_image_params_variable_name_to_replace+"}}", svg_image_params_variable_value_to_replace);
                        }

                    });

                    let svg_image_for_replace_regex = /\!\[(.*?)?(\]\(data\:image\/svg\+xml\;utf8\,(.+)\))/gm;

                    let svg_image_for_replace_regex_match;
                    while((svg_image_for_replace_regex_match = svg_image_for_replace_regex.exec(svg_image)) !== null) {

                        if(typeof svg_image_for_replace_regex_match[3] !== "undefined") {

                            let svg_image_string = svg_image_for_replace_regex_match[3]
                                .replaceAll(/\\\"/g, `"`)
                                .replaceAll(/\\\'/g, `'`);

                            svg_image = svg_image
                                .replace(
                                    svg_image_for_replace_regex_match[0],
                                    svg_image_for_replace_regex_match[0]
                                        .replace("data:image/svg+xml;utf8,", "")
                                        .replace(svg_image_for_replace_regex_match[3], svg64(svg_image_string))
                                );

                        }
                    }

                }

                const need_to_find_string = "{{{_svg." + svg_image_key + "}}}";
                const need_to_replace_string = svg_image;

                value_with_variables = value_with_variables.replaceAll(need_to_find_string, need_to_replace_string);

            }
        }

        value_with_variables = JSON.parse(value_with_variables);
        parameters = Object.assign(variables, parameters);

        if(parameters.fluc || parameters.FLUC || parameters.flc || parameters.FLC) { // First Letter Upper Case

            value_with_variables = value_with_variables.charAt(0).toUpperCase() + value_with_variables.slice(1);
        }

        if(parameters.fllc || parameters.FLLC) { // First letter Lower Case

            value_with_variables = value_with_variables.charAt(0).toLowerCase() + value_with_variables.slice(1);
        }

        if(parameters.tuc || parameters.TUC) { // To Upper Case

            value_with_variables = value_with_variables.toUpperCase();
        }

        if(parameters.tlc || parameters.TLC) { // To Lower Case

            value_with_variables = value_with_variables.toLowerCase();
        }

        if(parameters.aed || parameters.AED) { // Add End Dot

            value_with_variables = value_with_variables + ".";
        }

        if(parameters.ated || parameters.ATED) { // Add End Dot

            value_with_variables = value_with_variables + "...";
        }

        return value_with_variables;
    };

    return t_prime(path, variables, parameters, LANG, LANG_DIR);
};



module.exports = {
    t
};