
import {QuantiMatGlobal} from "./QuantiMat";

const quanti_mat = (imagedata, limit, callback_function = () => {}) => {
    QuantiMatGlobal(imagedata, limit).then(callback_function)
};

module.exports = { quanti_mat }