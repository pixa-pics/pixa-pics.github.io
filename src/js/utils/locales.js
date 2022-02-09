function get_browser_locales(options = {}) {
    const default_options = {
        language_code_only: false,
    };

    const opt = {
        ...default_options,
        ...options,
    };
    
    const browser_locales =
        navigator.languages === undefined
            ? [navigator.language]
            : navigator.languages;

    if (!browser_locales) {
        return undefined;
    }

    return browser_locales.map(locale => {
        const trimmed_locale = locale.trim();
        
        return opt.language_code_only
            ? trimmed_locale.split(/-|_/)[0]
            : trimmed_locale;
    });
}

module.exports = get_browser_locales;