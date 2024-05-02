function base64ToImageData(base64) {
    return new Promise((resolve, reject) => {
        // Create an Image element
        const img = new Image();
        img.onload = () => {
            // Create a canvas element
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0);

            // Get image data
            const imageData = ctx.getImageData(0, 0, img.width, img.height);

            // Convert to Uint32Array
            const uint32Array = new Uint32Array(imageData.data.buffer);

            resolve(uint32Array);
        };
        img.onerror = (e) => {
            reject(e);
        };

        // Set the source of the image to the base64 string
        img.src = `data:image/png;base64,${base64}`;
    });
}

class PixelArtCompressor {
    constructor() {
        this.colorTable = [];
        this.recentColors = new Array(16).fill(null);
    }

    createColorTable() {
        // Initialize recent colors to null
        this.recentColors.fill(null);
    }

    compress(data) {
        this.analyzeFrequency(data);
        this.createColorTable();
        const encodedData = [];
        // Encoding the length of the color table on 8 bits
        encodedData.push(this.colorTable.length);
        // Encoding each color in the color table on 4 bytes
        this.colorTable.forEach(color => {
            encodedData.push((color >> 24) & 0xFF, (color >> 16) & 0xFF, (color >> 8) & 0xFF, color & 0xFF);
        });
        // Encoding the actual pixel data
        encodedData.push(...this.encodeData(data));
        return new Uint8Array(encodedData);
    }

    analyzeFrequency(data) {
        const frequency = new Map();
        for (let color of data) {
            frequency.set(color, (frequency.get(color) || 0) + 1);
        }
        this.colorTable = Array.from(frequency.entries())
            .sort((a, b) => b[1] - a[1])
            .map(entry => entry[0])
            .slice(0, 128); // Ensure only top 128 colors are in the color table
    }

    updateLRUCache(color) {
        const index = this.recentColors.indexOf(color);
        if (index !== -1) {
            this.recentColors.splice(index, 1);
        }
        this.recentColors.unshift(color);
        if (this.recentColors.length > 16) {
            this.recentColors.pop();
        }
    }

    encodeData(data) {
        const encoded = [];
        data.forEach(color => {
            let index = this.recentColors.indexOf(color);
            if (index !== -1) {
                // Encode as recent color
                encoded.push(128 | (index << 3)); // 1 followed by 4 bits index (recent colors)
            } else {
                index = this.colorTable.indexOf(color);
                if (index === -1) {
                    index = 127; // Use a default or error color index
                }
                // Encode as new color
                encoded.push(index); // 7 bits index (color table)
            }
            this.updateLRUCache(color);
        });
        return encoded;
    }
}

class DeltaDataEncoder {
    constructor(arrayType) {
        this.arrayType = arrayType;
        this.bitMask = this.calculateBitMask();
    }

    // Calculate the bitmask for masking operations based on the array type
    calculateBitMask() {
        const maskMap = {
            Uint8Array: 0xFF,
            Uint16Array: 0xFFFF,
            Uint32Array: 0xFFFFFFFF
        };

        if (!(this.arrayType.name in maskMap)) {
            throw new Error(`Unsupported array type: ${this.arrayType.name}`);
        }

        return maskMap[this.arrayType.name];
    }

    // Encode the provided data using delta encoding
    encode(dataArray) {
        this.validateInputType(dataArray, 'performDeltaEncoding');

        var encodedArray = new this.arrayType(dataArray.length);
        var length = dataArray.length|0;
        var index = 0;
        var delta = 0;

        encodedArray[0] = dataArray[0] | 0;

        for (index = 1; (index | 0) < (length | 0); index = (index + 1) | 0) {
            delta = (dataArray[index] - dataArray[index - 1]) & this.bitMask;
            encodedArray[index] = delta | 0;
        }

        return encodedArray;
    }

    // Decode the provided data using delta decoding
    decode(encodedArray) {
        this.validateInputType(encodedArray, 'performDeltaDecoding');

        var decodedArray = new this.arrayType(encodedArray.length);
        var length = encodedArray.length|0;
        var index = 0;
        var sum = 0;

        decodedArray[0] = encodedArray[0] | 0;

        for (index = 1; (index | 0) < (length | 0); index = (index + 1) | 0) {
            sum = (decodedArray[index - 1] + encodedArray[index]) & this.bitMask;
            decodedArray[index] = sum | 0;
        }

        return decodedArray;
    }

    // Validate if the provided data type matches the specified array type
    validateInputType(dataArray, methodName) {
        if (!(dataArray instanceof this.arrayType)) {
            throw new Error(`Input data type does not match for method ${methodName}. Expected: ${this.arrayType.name}`);
        }
    }
}

class ZeroCompressor {
    constructor() {}

    compress(data) {
        let result = [];
        let zeroCount = 0;
        let zeroCounts = [];

        data.forEach(value => {
            if (value === 0) {
                if(zeroCount === 0){
                    result.push(value);
                }
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    // Adjusting zero count to be in range 1-256, where 256 represents 255 zeros
                    zeroCounts.push(zeroCount-1);
                    zeroCount = 0;
                }
                result.push(value);
            }
        });

        if (zeroCount > 0) {
            zeroCounts.push(zeroCount-1);
        }

        // Reverse and append zero counts to the end of result
        return new Uint8Array([...result, ...zeroCounts.reverse()]);
    }

    decompress(data) {
        let i = data.length - 1;
        let output = [];

        // Handle actual data values until we hit the zero counts section
        for (let j = 0; j <= i; j++) {
            if (data[j] !== 0) {
                output.push(data[j]);
            } else {
                let zeroCount = data[i--]+1;
                // If the value is 256, we decode it as 255 zeros
                output.push(...new Uint8Array(zeroCount));
            }
        }

        return Uint8Array.from(output);
    }
}

class PixelArtDecompressor {
    constructor() {
        this.colorTable = [];
        this.recentColors = new Array(16).fill(null);
    }

    decompress(encodedData) {
        const colorTableLength = encodedData[0];
        let index = 1;
        for (let i = 0; i < colorTableLength; i++) {
            const color = (encodedData[index] << 24) | (encodedData[index + 1] << 16) |
                (encodedData[index + 2] << 8) | encodedData[index + 3];
            this.colorTable.push(color);
            index += 4;
        }
        const data = new Uint32Array(encodedData.length - index); // Allocate enough space
        for (let dataIndex = 0; index < encodedData.length; index++, dataIndex++) {
            const byte = encodedData[index];
            if (byte & 128) { // First bit is 1
                const recentIndex = (byte >> 3) & 15; // Extract 4 bits index
                data[dataIndex] = this.recentColors[recentIndex];
            } else { // First bit is 0
                const colorIndex = byte & 127; // Extract 7 bits index
                data[dataIndex] = this.colorTable[colorIndex];
            }
            this.updateLRUCache(data[dataIndex]);
        }
        return data;
    }

    updateLRUCache(color) {
        const index = this.recentColors.indexOf(color);
        if (index !== -1) {
            this.recentColors.splice(index, 1);
        }
        this.recentColors.unshift(color);
        if (this.recentColors.length > 16) {
            this.recentColors.pop();
        }
    }
}

// Usage example (make sure this code runs in a browser environment)
const base64String = "";
base64ToImageData(base64String).then((uint32Array) => {
    // Example usage:
    const compressor = new PixelArtCompressor();
    const compressed = compressor.compress(uint32Array);
    const decompressor = new PixelArtDecompressor();
    const decompressed = decompressor.decompress(compressed);
    console.log(Array.from(compressed), uint32Array, decompressed);

}).catch((error) => {console.error('Error processing image:', error)});
