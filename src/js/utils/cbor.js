import { decode, encode } from 'cbor-x';

const cbor = (object_or_uint8a) => {

  return new Promise(function(resolve, reject){

    if(object_or_uint8a instanceof ArrayBuffer || object_or_uint8a instanceof Uint8Array || object_or_uint8a instanceof Uint8ClampedArray) {

      if(object_or_uint8a instanceof ArrayBuffer){object_or_uint8a = new Uint8Array(object_or_uint8a);}
      resolve(decode(object_or_uint8a));
    }else {

      resolve(encode(object_or_uint8a));
    }

  });
};

module.exports = {cbor}