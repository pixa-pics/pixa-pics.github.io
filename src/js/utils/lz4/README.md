<div align="center">

  <h1><code>lz4-wasm</code></h1>

  <strong>Extremely fast compression(200MB/s Firefox, 350Mb/s Chrome) and decompression(600MB/s Firefox, 1400Mb/s Chrome) in the browser or nodejs using wasm.</strong>

  <sub>Built with Rust</a></sub>
</div>


## 🚴 Usage


The wasm module exposes two function compress and decompress.
Both accept and return UInt8Array. 
Internally the lz4 block api is used, the length of the original input is prepended in 32-bit little endian.


```

import * as wasm from "lz4-wasm";

// use TextEncoder to get bytes (UInt8Array) from string
var enc = new TextEncoder();
const compressed = wasm.compress(enc.encode("compress this text, compress this text pls. thx. thx. thx. thx. thx"));
const original = wasm.decompress(compressed);

var dec = new TextDecoder("utf-8");
alert(dec.decode(original))

```


See https://github.com/PSeitz/lz4_flex/tree/master/lz4-wasm/example_project for usage and benchmark.


## Making New Releases

### Release for bundler

Build. This will optimize usage for inside a bundler like webpack.
```
RUST_LOG=info wasm-pack build --release
```

Due to a long standing bug in wasm-pack 0.9.1, _manually_ add these files to pkg/package.json.

```
    "lz4_wasm_bg.wasm.d.ts",
    "lz4_wasm_bg.js",
```

```
RUST_LOG=info wasm-pack publish
```


### Release for nodejs

set name in Cargo toml to
```
name = "lz4-wasm-nodejs"
```

Build for nodejs
```
RUST_LOG=info wasm-pack build --release -t nodejs
```

```
RUST_LOG=info wasm-pack publish
```
