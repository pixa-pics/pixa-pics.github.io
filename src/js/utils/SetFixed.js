var SetFixed = function(size){
    "use strict";
    if (!(this instanceof SetFixed)) {
        return new SetFixed(size);
    }
    if(typeof size == "object") {
        this.set_ = new Set(Array.from(size));
        this.size_ = this.set_.size;
        this.indexes_ = Array.from(this.set_);
        this.max_ = 0;
        for(var i = 0, l = this.indexes_.length|0; (i|0) < (l|0); i = i + 1 | 0){if((this.max_|0) < (this.indexes_[i|0]|0)){ this.max_ = this.indexes_[i|0]|0; }}
        this.storage_uint8_ = new Uint8Array(this.max_);
        for(var i = 0, l = this.indexes_.length|0; (i|0) < (l|0); i = i + 1 | 0){this.storage_uint8_[this.indexes_[i|0]|0] = 255; }

        delete this.set_;
        delete this.indexes_;
        delete this.max_;
    }else {

        this.storage_uint8_ = new Uint8Array(size);
        this.size_ = 0;
    }
};

Object.defineProperty(SetFixed.prototype, 'size', {
    get: function() {
        "use strict";
        return this.size_ | 0;
    }
});
Object.defineProperty(SetFixed.prototype, 'length', {
    get: function() {
        "use strict";
        this.storage_uint8_.length | 0;
    }
});

Object.defineProperty(SetFixed.prototype, 'has', {
    get: function() {  "use strict"; return function(index) {
        "use strict";
        return ((this.storage_uint8_[index | 0]|0) > 128);
    }}
});

Object.defineProperty(SetFixed.prototype, 'add', {
    get: function() {  "use strict"; return function(index) {
        "use strict";

        if((this.storage_uint8_.length|0) < (index|0)){
            var indexes = [];
            this.storage_uint8_.forEach(function (n, i){
                if((n|0)>128){indexes.push(i);}
            });
            this.storage_uint8_ = new Uint8Array(index*2);
            indexes.forEach((i) => {
                this.storage_uint8_[i|0] = 255;
            });
            this.size_ = indexes.length;
        }

        if((this.storage_uint8_[index | 0]|0) <= 128){
            this.size_ = this.size_ + 1 | 0;
        }

        this.storage_uint8_[index | 0] = 255;
    }}
});

Object.defineProperty(SetFixed.prototype, 'delete', {
    get: function() {  "use strict"; return function(index) {
        "use strict";
        if((this.storage_uint8_[index | 0]|0) > 128){
            this.size_ = this.size_ - 1 | 0;
            this.storage_uint8_[index | 0] = 0;
        }

    }}
});

Object.defineProperty(SetFixed.prototype, 'clear', {
    get: function() {  "use strict"; return function() {
        "use strict";
        this.storage_uint8_.fill(0, 0, this.storage_uint8_.length );
        this.size_ = 0;
    }}
});

Object.defineProperty(SetFixed.prototype, 'forEach', {
    get: function() {
        "use strict"; return function(func) {

            "use strict";
            var indexes = [];
            this.storage_uint8_.forEach(function (n, i){
                if((n|0)>128){indexes.push(i);}
            });
            indexes.forEach(func);
        }
    }
});

Object.defineProperty(SetFixed.prototype, 'map', {
    get: function() {
        "use strict";
        return function(func) {
            "use strict";
            var indexes = [];
            this.storage_uint8_.forEach(function (n, i){
                if((n|0)>128){indexes.push(i);}
            });
            return indexes.map(func);
    }}
});

module.exports = SetFixed;