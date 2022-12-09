# QuantiMat

```javascript

import { QuantiMatGlobal, QuantiMat } from "./QuantiMat";

var result = QuantiMat({
    pxls: pxls,
    pxl_colors: pxl_colors,
    bucket_threshold: bucket_threshold,
    threshold_steps: threshold_steps,
    color_number_bonus: color_number_bonus,
    best_color_number: best_color_number,
    this_state_bucket_threshold: this_state_bucket_threshold
}).init().run();

var res_pxls = result[0];
var res_pxl_colors = result[1];

// OR

var image_data = QuantiMatGlobal(image_data, 4/256, 256);

```

![](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/quantimat/QuantiMat.png?raw=true)