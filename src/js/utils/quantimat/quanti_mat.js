
import {QuantiMatGlobal} from "./QuantiMat";

const quanti_mat = (imagedata, limit, callback_function = () => {}) => {
    QuantiMatGlobal(imagedata, limit, 3).then(callback_function)
};

module.exports = { quanti_mat }