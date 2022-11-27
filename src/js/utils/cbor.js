import { decode, encode } from 'cbor-x';

const cbor = (object_or_uint8a, no_async = false) => {

  if(no_async) {

    if(object_or_uint8a instanceof ArrayBuffer || object_or_uint8a instanceof Uint8Array || object_or_uint8a instanceof Uint8ClampedArray) {

      if(object_or_uint8a instanceof ArrayBuffer){object_or_uint8a = new Uint8Array(object_or_uint8a);}
      return decode(object_or_uint8a);
    }else if(typeof object_or_uint8a === "string"){

      return JSON.parse(object_or_uint8a);
    }else {

      return encode(object_or_uint8a);
    }
  }else {

    return new Promise(function(resolve, reject){

      if(object_or_uint8a instanceof ArrayBuffer || object_or_uint8a instanceof Uint8Array || object_or_uint8a instanceof Uint8ClampedArray) {

        if(object_or_uint8a instanceof ArrayBuffer){object_or_uint8a = new Uint8Array(object_or_uint8a);}
        resolve(decode(object_or_uint8a));
      }else if(typeof object_or_uint8a === "string"){

        resolve(JSON.parse(object_or_uint8a));
      }else {

        resolve(encode(object_or_uint8a));
      }

    });
  }

};

module.exports = {cbor}