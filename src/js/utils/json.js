// This function is required because JSON is weird with some char
function clean_json_text(json_text) {

    json_text = json_text.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");

    // remove non-printable and other non-valid JSON chars
    json_text = json_text.replace(/[\u0000-\u0019]+/g,"");

    return json_text;
}

module.exports = {
    clean_json_text: clean_json_text
};
