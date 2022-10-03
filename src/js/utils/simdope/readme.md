# Simdope.js

```js
import SIMDope from "simdope";

var some_white = SIMDope.SIMDopeColor.new_hsla(0, 0, 100, 50);
var number  = SIMDope.SIMDopeColor.new_hex("cyan").blend_with(some_white).uint32;
var color_a = SIMDope.SIMDopeColor.new_uint32(number).hex;
console.log(color_a)

var numbers = Uint32Array.of(number, number, number, number, some_white.uint32, 0)
var colors = SIMDope.SIMDopeColors(numbers);
    colors.set_element(3, SIMDope.SIMDopeColor.new_hex("cyan"))
var color = colors.get_element(3) // will return cyan
var does_it_match = color.match_with(SIMDope.SIMDopeColor.new_of(255, 255, 255, 128));
    
var isok = colors.get_element(4).r + colors.get_element(4).g + colors.get_element(4).b === colors.get_element(4).sum_rgb();
console.log(isok)
```

... Look at the code it is FASTER THAN YOU MAY THINK