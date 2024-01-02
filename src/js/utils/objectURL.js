import {base64ToBytes} from "./b64";

function createLocalBlob(base64) {
    var pre = (base64.match(/(data\:([a-z]+\/[a-z\+]+)\;base64\,)([a-zA-Z0-9\/\+]+\(\=+)?/) || new Array(2))[1];
    if(!Boolean(pre)){ return "";}
    var data_type = pre.match(/data\:([a-z]+\/[a-z\+]+)\;base64\,/)[1];
    var extension = data_type.match(/[a-z]+\/([a-z\+]+)/)[1];
        base64 = base64.replace(pre, ""); // data:image/png;base64,
    var bytes = base64ToBytes(base64);

    var file = new File([bytes], "name."+extension, {
        type: data_type
    });

    var dataURL = URL.createObjectURL(file);
    return dataURL;
}


module.exports = {
  createLocalBlob
};