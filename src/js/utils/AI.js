class HuggingFaceAPI {
    constructor(baseUrl, msgCallback) {
        this.baseUrl = baseUrl;
        this.msgCallback = msgCallback || function(){};
    }

    generateRandomSeed() {
        try {
            return crypto.getRandomValues(new Uint32Array(1))[0];
        } catch (e) {
            return Math.round(Math.random() * 0xFFFFFFFF);
        }
    }

    message(line) {
        try {
            const data = JSON.parse(line.slice(5)) || {};
            const message = data.msg;
            const previous_date = this.date_message || Date.now() - 3000;

            if(previous_date + 3000 <= Date.now()) {
                this.date_message = Date.now();
                switch (message) {
                    case "estimation":
                        const rank_eta = data.rank_eta || 0;
                        const queue_size = data.queue_size || 0;
                        const queue_length = queue_size - 1;
                        const rank = data.rank || 0;
                        const string1 = `Estimated waiting duration: ${parseInt(rank_eta)} seconds. ${queue_length > rank ? `Process will start after ${queue_length} remaining job${queue_length ? "s": ""}`: "Process will start immediately"}`;
                        this.msgCallback(string1);
                        break;
                    case "progress":
                        const progress_data = data.progress_data || [];
                        const progress_data_inside = progress_data[0] || {};
                        const index = progress_data_inside.index;
                        const length = progress_data_inside.length;
                        const unit = progress_data_inside.unit;
                        const string2 = `Processing: ${index}/${length} ${unit}.`
                        this.msgCallback(string2);
                        break;
                }
            }

        } catch (e) {

        }
    }

    generateRandomId(count = 6) {
        var str = "";
        while (count >= 6) {
            str += Math.round(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0");
            count -= 6;
        }
        if(count > 0) {
            str += Math.round(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0").slice(0, count);
        }
        return str;
    }

    getHeadersJson() {
        return { "Content-Type": "application/json" };
    }

    getHeadersStream() {
        return { "accept": "text/event-stream" };
    }
    getHeadersAll() {
        return { "accept": "*/*" };
    }
    getUploadUrl(uploadId) {
        return `${this.baseUrl}/upload?upload_id=${uploadId}`;
    }

    getCreateImagePathUrl(path) {
        return `${this.baseUrl}/file=${path}`;
    }

    async handleLoadComplete(url, output, finalWidth, finalHeight) {
        output = typeof output === "undefined" ? "blob": output;
        let splittedUrl = (url || "/unknown.webp").split("/");
        let fileName = splittedUrl[splittedUrl.length-1] || "unknown.png";
        let extension = fileName.split(".")[1] || "png";
        let mimeType = "image/"+extension;
            extension = (extension === "jpeg") ? "jpg": extension;

        try {
            // Fetch the image data from the URL

            const response = await new Promise(function (resolve){

                const image = new Image();

                image.setAttribute('crossorigin', 'anonymous');
                image.onload = () => {
                    const height = image.naturalHeight || image.height;
                    const width = image.naturalWidth || image.width;
                    finalHeight = finalHeight || height;
                    finalWidth = finalWidth || width;

                   function baser() {
                       const canvas = document.createElement("canvas")
                       canvas.width = finalWidth;
                       canvas.height = finalHeight;
                       const context = canvas.getContext("2d");
                       context.drawImage(image, 0, 0, finalWidth, finalHeight);
                        try {
                            resolve(canvas.toDataURL("image/webp", .75));
                        } catch (e) {
                            resolve(canvas.toDataURL("image/jpeg", .75));
                        }
                    }

                   function blober() {
                       const canvas = document.createElement("canvas")
                       canvas.width = finalWidth;
                       canvas.height = finalHeight;
                       const context = canvas.getContext("2d");
                       context.drawImage(image, 0, 0, finalWidth, finalHeight);
                        try {
                            canvas.toBlob(resolve, "image/webp", .75);
                        } catch (e) {
                            canvas.toBlob(resolve, "image/jpeg", .75);
                        }
                    }

                    function imagedater () {
                        const canvas = document.createElement("canvas")
                        canvas.width = finalWidth;
                        canvas.height = finalHeight;
                        const context = canvas.getContext("2d");
                        context.drawImage(image, 0, 0, finalWidth, finalHeight);
                        resolve(context.getImageData(0, 0, finalWidth, finalHeight, {colorSpace: "srgb"}));
                    }

                    try {

                        switch (output.toLowerCase()) {
                            case "base64":
                                baser();
                                break;
                            case "blob":
                                blober();
                                break;
                            case "imagedata":
                                imagedater();
                                break;
                        }
                    } catch (e) {

                    }
                };
                image.setAttribute('src', url);
            });

            switch (output) {
                case "blob":
                    const file = new File([response], fileName, { type: mimeType });
                    return Promise.resolve(file);
                case "base64":
                    return Promise.resolve(response);
                case "imagedata":
                    return Promise.resolve(response);
            }

        } catch (error) {
            console.error('Error creating file from URL:', error);
            return Promise.reject();
        }
    }

    async uploadFile(file, id) {
        const formData = new FormData();
        formData.append('files', file);
        const response = await fetch(this.getUploadUrl(id), {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return Promise.resolve(data[0] || data);
    }

    async fetchEventSource(url) {
        const response = await fetch(url, {
            headers: this.getHeadersAll(),
            method: "GET"
        });
        return Promise.resolve(response.body.getReader());
    }

    async fetchEventSourceJSON(url) {
        const response = await fetch(url, {
            headers: this.getHeadersJson(),
            method: "GET"
        });
        const text = await response.clone().text();
        const json_text = text.replaceAll("event: complete\ndata: ", "")
        try {
            return Promise.resolve(JSON.parse(json_text));
        }catch (e) {
            return Promise.reject();
        }
    }
    async readResponse(reader) {
        const decoder = new TextDecoder("utf-8");
        let result = "";
        let done = false;
        let finalData = null;

        while (!done) {
            const { value, done: streamDone } = await reader.read();
            done = done || streamDone;
            result += decoder.decode(value || new Uint8Array(), { stream: true });

            // Split the result into lines and process each line
            let lines = (result || "\n").split("\n");

            for (let line of lines) {
                line = line.trim();
                this.message(line);
                console.log(line)
                if (line.includes("complete")) {
                    // The event is complete, so we can mark done as true
                    done = true;
                    finalData = line;
                }
            }

            // Reset result to handle potential partial lines correctly
            result = lines[lines.length - 1];
        }

        return Promise.resolve(finalData);
    }
}
class LongCaptionerAPI extends HuggingFaceAPI {
    constructor(msgCallback) {
        super("https://gokaygokay-sd3-long-captioner-v2.hf.space", msgCallback);
    }

    getCreateCaptionsUrl() {
        return `${this.baseUrl}/call/create_captions_rich`;
    }

    getReadCaptions(line) {
        try {
            return JSON.parse(line.slice(5));
        }catch (e) {
            return "";
        }
    }

    async readResponse(reader) {
        const decoder = new TextDecoder("utf-8");
        let result = "";
        let done = false;
        let finalData = null;

        while (!done) {
            const { value, done: streamDone } = await reader.read();
            done = done || streamDone;
            result += decoder.decode(value || new Uint8Array(), { stream: true });

            // Split the result into lines and process each line
            let lines = (result || "\n").split("\n");

            for (let line of lines) {
                line = line.trim();
                this.message(line);
                if (line.includes("complete")) {
                    // The event is complete, so we can mark done as true
                    done = true;
                    finalData = line;
                }
            }

            // Reset result to handle potential partial lines correctly
            result = lines[lines.length - 1];
        }

        return done ? Promise.resolve(finalData): Promise.reject("Error");
    }

    async createCaptions(imagePath) {
        const response = await fetch(this.getCreateCaptionsUrl(), {
            method: "POST",
            headers: this.getHeadersJson(),
            body: JSON.stringify({
                data: [{ path: imagePath }]
            })
        });
        try {
            const data = await response.json();
            return Promise.resolve(data.event_id);
        } catch (e) {
            return Promise.reject("Error");
        }
    }

    async run(input) {

        let file;
        if(typeof input === "string"){
            file = await this.handleLoadComplete(input);
        }else if(input instanceof Blob) {
            file = input;
        }else {
            return Promise.reject();
        }

        const id = this.generateRandomId();
        const path = await this.uploadFile(file, id);
        const url = this.getCreateCaptionsUrl();
        const eventId = await this.createCaptions(path);
        return this.fetchEventSourceJSON(`${url}/${eventId}`).then(function (r){
            return r[0];
        }).catch(function (){
            return "";
        });
    }
}

class FloranceCaptionerAPI extends HuggingFaceAPI {
    constructor(msgCallback) {
        super("https://gokaygokay-florence-2.hf.space", msgCallback);
    }

    getPredictHeader(path, url, size, type, hash, detail) {
        detail = detail || 1;
        return {
            headers: this.getHeadersJson(),
            body: JSON.stringify(
                {
                    data:[
                        {
                            path: path,
                            url: url,
                            orig_name: "image."+type.replaceAll("image/", ""),
                            size: size,
                            mime_type: type,
                            meta: { _type: "gradio.FileData" }
                        },
                        detail === 1 ? "Caption": detail === 2 ? "Detailed Caption": "More Detailed Caption",
                        "",
                        "microsoft/Florence-2-large"
                    ],
                    event_data:null,
                    fn_index:4,
                    trigger_id: 10,
                    session_hash:hash
                }
            ),
            method: "POST"
        };
    }

    getQueueJoinUrl() {
        return `${this.baseUrl}/queue/join`;
    }

    getResultUrl(hash) {
        return `${this.baseUrl}/queue/data?session_hash=${hash}`;
    }



    readLine(line, detail) {
        console.log(line)
        line = line.slice(5);
        try {
            const json = JSON.parse(line);
            if(json.success){
                const output = json.output || {};
                const data = output.data || [];
                const response = data[0];
                const responseSliced = detail === 1 ? response.slice(15, response.length-2): detail === 2 ? response.slice(24, response.length-2): response.slice(29, response.length-2);
                return Promise.resolve(responseSliced.replaceAll("\\n", "").replaceAll("\n", ""));
            } else {
                return Promise.reject("");
            }
        } catch (e) {
            return Promise.reject();
        }
    }

    async run(input, detail) {

        let file;
        if(typeof input === "string"){
            file = await this.handleLoadComplete(input);
        }else if(input instanceof Blob) {
            file = input;
        }else {
            return Promise.reject();
        }

        const hash = this.generateRandomId();
        const path = await this.uploadFile(file, hash);
        const url = this.getCreateImagePathUrl(path);
        const header = this.getPredictHeader(path, url, file.size, file.type, hash, detail)
        const responseQueue = await fetch(this.getQueueJoinUrl(), header);
        const responseQueueJSON = await responseQueue.json();
        const event_id = responseQueueJSON.event_id;
        if(event_id) {

            const response = await this.fetchEventSource(this.getResultUrl(hash));
            return this.readResponse(response).then((line) => {
                return this.readLine(line, detail);
            }).catch(function (){
                return Promise.reject();
            });
        }else {

            return Promise.reject();
        }
    }

}

class RemoveBackgroundAPI extends HuggingFaceAPI {
    constructor(msgCallback) {
        super("https://kenjiedec-rembg.hf.space", msgCallback);
    }

    getQueuePushUrl() {
        return `${this.baseUrl}/api/queue/push/`
    }

    getPredictHeader(base64, hash) {
        return {
            headers: this.getHeadersJson(),
            body: JSON.stringify(
                {
                    action: "predict",
                    data:[
                        base64,
                        "Mask only",
                        "isnet-general-use"
                    ],
                    fn_index:0,
                    session_hash:hash
                }
            ),
            method: "POST"
        };
    }

    getQueueStatusUrl() {
        return `${this.baseUrl}/api/queue/status/`;
    }

    getResultHeader(hash) {
        return {
            headers: this.getHeadersJson(),
            body: JSON.stringify(
                {
                    hash: hash
                }
            ),
            method: "POST"
        };
    }

    async run(input, w, h) {

        return new Promise(async(resolve, reject) => {

            let file;
            if(typeof input !== "string"){
                file = await this.handleLoadComplete(input, "base64");
            }else if(input.startsWith("blob:")){
                file = await this.handleLoadComplete(input, "base64");
            }else {
                file = input;
            }

            const hash = this.generateRandomId();

            const json = await (await fetch(this.getQueuePushUrl(), this.getPredictHeader(file, hash))).json();
            const id = json.hash;

            const timeout = setTimeout(() => {

                clearInterval(interval);
                reject();
            }, 10000);

            const interval = setInterval(async() => {

                const data = await (await fetch(this.getQueueStatusUrl(), this.getResultHeader(id))).json();
                const data2 = data.data || {};
                const data3 = data2.data || [];
                if(data3.length) {
                    const imgd = await this.handleLoadComplete(data3[0], "imagedata", w, h);
                    const uint8ca = imgd.data;
                    var average = 0;
                    var indexes = [];
                    for(var i = 0, l = uint8ca.length; (i|0) < (l|0); i = i + 4 | 0) {
                        average = (uint8ca[i|0]+uint8ca[i+1|0]+uint8ca[i+2|0]|0) / 3 | 0;
                        if((average | 0) < 32){
                            indexes.push(i/4|0);
                        }
                    }
                    resolve(indexes);
                    clearInterval(interval);
                    clearTimeout(timeout);
                }
            }, 1000);
        });
    }
}

// https://huggingface.co/spaces/artificialguybr/Pixart-Sigma
class ImageCreatorAPI extends HuggingFaceAPI {
    constructor(msgCallback) {
        super("https://pixart-alpha-pixart-sigma.hf.space", msgCallback);
    }
    getPredictHeader(prompt, hash, width = 512, height = 512, number = 1, style = "(No style)", negative_prompt="bad shape, disformed, photography, photo, realistic, photo-realistic.", solver = "DPM-Solver") {
        const seed = this.generateRandomSeed();
        style = typeof style === "string" ? style: ["(No style)", "Pixel Art", "Digital Art", "Anime", "Manga"][style]
        return {
            headers: this.getHeadersJson(),
            body: JSON.stringify(
                {
                    data:[
                        "A pixel art (retro style video game palette artwork) of : "+prompt,
                        negative_prompt,
                        style,
                        true,
                        number,
                        seed,
                        width,
                        height,
                        solver,
                        4.5,
                        3.5,
                        17,
                        25,
                        true
                    ],
                    event_data:null,
                    fn_index:3,
                    trigger_id:7,
                    session_hash:hash
                }
            ),
            method: "POST"
        };
    }

    getQueueJoinUrl() {
        return `${this.baseUrl}/queue/join?__theme=light`;
    }

    getResultUrl(hash) {
       return `${this.baseUrl}/queue/data?session_hash=${hash}`;
    }

    async readResponse(reader) {
        const decoder = new TextDecoder("utf-8");
        let result = "";
        let done = false;
        let finalData = null;

        while (!done) {
            const { value, done: streamDone } = await reader.read();
            done = done || streamDone;
            result += decoder.decode(value || new Uint8Array(), { stream: true });

            // Split the result into lines and process each line
            let lines = (result || "\n").split("\n");

            for (let line of lines) {
                line = line.trim();
                this.message(line);
                if (line.includes("complete")) {
                    // The event is complete, so we can mark done as true
                    done = true;
                    finalData = line;
                }
            }

            // Reset result to handle potential partial lines correctly
            result = lines[lines.length - 1];
        }

        return Promise.resolve(finalData);
    }


    extractLastImageUrl(jsonStr, number) {
        try {
            console.log(jsonStr)
            const dataObject = JSON.parse(jsonStr.slice(5).trim());
            const imageUrls = [];

            // Navigate to the array that contains the image objects
            const data = dataObject.output.data || [];

            // Extract URLs from the image objects
            for(let i = 0; i < data.length;i++) {
                const dataItem = data[i];
                for (let y = 0; y < dataItem.length;y++) {
                    const item = dataItem[y];
                    if (item.image) {
                        if(item.image.url){
                            imageUrls.push(item.image.url);
                        }
                    }
                }
            }
            return imageUrls;
        } catch (error) {
            console.error("Failed to parse JSON or extract image URLs:", error);
            return [];
        }
    }

    async run(prompt, width = 512, height = 512, number = 1, output = "imagedata") {

        const hash = this.generateRandomId();
        const header = this.getPredictHeader(prompt, hash, width, height, number, 1);
        const url = this.getQueueJoinUrl();
        const responseQueue = await fetch(url, header);
        const responseQueueJSON = await responseQueue.json();
        const event_id = responseQueueJSON.event_id;
        if(event_id) {

            const response = await this.fetchEventSource(this.getResultUrl(hash));
            const line = await this.readResponse(response);
            const urls = this.extractLastImageUrl(line);

            if(urls.length === 1) {
                const url = urls[0];
                const file = await this.handleLoadComplete(url, output);
                return Promise.resolve(file);
            }else {
                return Promise.allSettled([urls.map(() => {return this.handleLoadComplete(url, output)})]);
            }
        }

        return Promise.reject();
    }
}

const pixelart_style = {
    lucasArt: {
        url: "https://civitai.com/models/247890/lucasarts-adventure-game-style-xl",
        weight: 1.0,
        face: 0.90,
        image: 0.12,
        scale: 7.75,
        strength: 0.80,
        prompt: "A 2D illustration in retro game style pixel art of '${prompt}' in lucasarts style. Video game, low color number, high quality.",
        negative: "Realistic, photography, real."
    },
    thimbled: {
        url: "https://civitai.com/models/174301/pixelartthimbledweed",
        weight: 1.2,
        face: 0.90,
        image: 0.15,
        scale: 9.0,
        strength: 0.80,
        prompt: "A 2D illustration in retro game style pixel art of '${prompt}'. Video game, low color number, high quality.",
        negative: "Realistic, photography, real."
    },
    arsMJ: {
        url: "https://civitai.com/models/547343/pixel-art-pony-sdxl",
        weight: 0.8,
        face: 0.90,
        image: 0.20,
        scale: 9.0,
        strength: 0.80,
        prompt: "A 2D illustration in retro game style Pixel Art of '${prompt}'. Video game, low color number, high quality.",
        negative: "Realistic, photography, real."
    }
};

class FaceToAllAPI extends HuggingFaceAPI {
    constructor(msgCallback) {
        super("https://abidlabs-face-to-all.hf.space", msgCallback);
        this.styles = pixelart_style;
    }

    getPredictUrl() {
        return `${this.baseUrl}/run/predict`;
    }

    getPredictHeader(lora_url, hash) {
        return {
            headers: this.getHeadersJson(),
            body: JSON.stringify({ data: [lora_url], event_data: null, fn_index: 0, trigger_id: 11, session_hash: hash }),
            method: "POST"
        };
    }

    getQueueJoinUrl() {
        return `${this.baseUrl}/queue/join?__theme=light`;
    }

    extractSecondImageUrl(jsonStr) {
        const urlRegex = /"url":"(https:\/\/[^"]+)"/g;
        const matches = jsonStr.match(urlRegex);
        if (matches && matches.length > 1) {
            const secondMatch = matches[1];
            return secondMatch.match(/"url":"(https:\/\/[^"]+)"/)[1];
        }
        return null;
    }

    getQueueJoinHeader(path, url, size, type, prompt, style, hash) {
        const styleConfig = this.styles[style];
        const finalPrompt = styleConfig.prompt.replace('${prompt}', prompt.replaceAll("\\n", "").replaceAll("\\", ""));

        return {
            headers: this.getHeadersJson(),
            body: JSON.stringify({
                data: [{
                    path: path, url: url, orig_name: "image."+type.replaceAll("image/", ""), size: size, mime_type: type, meta: { _type: "gradio.FileData" }
                },
                    finalPrompt,
                    styleConfig.negative,
                    styleConfig.face,
                    null,
                    styleConfig.weight,
                    styleConfig.image,
                    styleConfig.scale,
                    styleConfig.strength,
                    null,
                    null
                ],
                event_data: null,
                fn_index: 6,
                trigger_id: 18,
                session_hash: hash
            }),
            method: "POST"
        };
    }

    getQueueDataUrl(hash) {
        return `${this.baseUrl}/queue/data?session_hash=${hash}`;
    }

    async readResponse(reader) {
        const decoder = new TextDecoder("utf-8");
        let result = "", finalLine = "";
        let done = false;

        while (!done) {
            const { value, done: streamDone } = await reader.read();
            done = done || streamDone;
            result += "".concat(decoder.decode(value || new Uint8Array(), { stream: true }));

            let lines = (result || "\n").split("\n");

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                this.message(line);
                if (line.includes("complete")) {
                    done = true;
                    finalLine = line;
                }
            }

            result = lines[lines.length - 1];
        }

        return Promise.resolve(finalLine);
    }

    async run(input, prompt, style = "lucasArt") {
        let file;
        if (typeof input === "string") {
            file = await this.handleLoadComplete(input);
        } else if (input instanceof Blob) {
            file = input;
        } else {
            return Promise.reject();
        }

        const id = this.generateRandomId();
        const hash = this.generateRandomId();

        const header = this.getPredictHeader(this.styles[style].url, hash);
        const predict_url = this.getPredictUrl();
        const responseStyle = await fetch(predict_url, header);
        const ok = responseStyle.ok;
        const path = await this.uploadFile(file, id);
        const imagePath = this.getCreateImagePathUrl(path);
        if (ok && imagePath) {
            const headerQueue = this.getQueueJoinHeader(path, imagePath, file.size, file.type, prompt, style, hash);
            const urlQueue = this.getQueueJoinUrl();
            const responseQueue = await fetch(urlQueue, headerQueue);
            const responseQueueJSON = await responseQueue.json();
            const event_id = responseQueueJSON.event_id;
            if (typeof event_id !== "undefined") {
                const request_url = this.getQueueDataUrl(hash);
                const event = await this.fetchEventSource(request_url);
                const line = await this.readResponse(event);
                const url = this.extractSecondImageUrl(line);
                const file = await this.handleLoadComplete(url);
                return Promise.resolve(file);
            }
        }

        return Promise.reject();
    }
}

class FaceToAllAPI2 extends HuggingFaceAPI {
    constructor(msgCallback) {
        super("https://multimodalart-face-to-all.hf.space", msgCallback);
        this.styles = pixelart_style;
    }

    getPredictUrl() {
        return `${this.baseUrl}/queue/join`;
    }

    getPredictHeader(lora_url, hash) {
        return {
            headers: this.getHeadersJson(),
            body: JSON.stringify({ data: [lora_url], event_data: null, fn_index: 0, trigger_id: 11, session_hash: hash }),
            method: "POST"
        };
    }

    extractSecondImageUrl(jsonStr) {
        const urlRegex = /"url":"(https:\/\/[^"]+)"/g;
        const matches = jsonStr.match(urlRegex);
        if (matches && matches.length > 1) {
            const secondMatch = matches[1];
            return secondMatch.match(/"url":"(https:\/\/[^"]+)"/)[1];
        }
        return null;
    }

    getQueueJoinHeader(path, url, size, type, prompt, style, hash) {
        const styleConfig = this.styles[style];
        const finalPrompt = styleConfig.prompt.replace('${prompt}', prompt.replaceAll("\\n", "").replaceAll("\\", ""));

        return {
            headers: this.getHeadersJson(),
            body: JSON.stringify({
                data: [{
                    path: path, url: url, orig_name: "image."+type.replaceAll("image/", ""), size: size, mime_type: type, meta: { _type: "gradio.FileData" }
                },
                    finalPrompt,
                    styleConfig.negative,
                    styleConfig.face,
                    null,
                    styleConfig.weight,
                    styleConfig.image,
                    styleConfig.scale,
                    styleConfig.strength,
                    null,
                    null
                ],
                event_data: null,
                fn_index: 6,
                trigger_id: 18,
                session_hash: hash
            }),
            method: "POST"
        };
    }

    async readResponse(reader) {
        const decoder = new TextDecoder("utf-8");
        let result = "", finalLine = "";
        let done = false;

        while (!done) {
            const { value, done: streamDone } = await reader.read();
            done = done || streamDone;
            result += "".concat(decoder.decode(value || new Uint8Array(), { stream: true }));

            let lines = (result || "\n").split("\n");

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                this.message(line);
                if (line.includes("complete") && line.includes("success\":true") && !line.includes("custom_lora_card") && !line.includes("data\":[]")) {
                    done = true;
                    finalLine = line;
                }
            }

            result = lines[lines.length - 1];
        }

        return Promise.resolve(finalLine);
    }

    async run(input, prompt, style = "lucasArt") {
        let file;
        if (typeof input === "string") {
            file = await this.handleLoadComplete(input);
        } else if (input instanceof Blob) {
            file = input;
        } else {
            return Promise.reject();
        }

        const id = this.generateRandomId(8);
        const hash = this.generateRandomId(11);

        const header = this.getPredictHeader(this.styles[style].url, hash);
        const predict_url = this.getPredictUrl();
        const responseStyle = await fetch(predict_url, header);
        const ok = responseStyle.ok;
        const path = await this.uploadFile(file, id);
        const imagePath = this.getCreateImagePathUrl(path);
        if (ok && imagePath) {
            const headerQueue = this.getQueueJoinHeader(path, imagePath, file.size, file.type, prompt, style, hash);
            const urlQueue = this.getQueueJoinUrl();
            const responseQueue = await fetch(urlQueue, headerQueue);
            const ok2 = responseQueue.ok;
            if(ok2) {
                const responseQueueJSON = await responseQueue.json();
                const event_id = responseQueueJSON.event_id;
                if (typeof event_id !== "undefined") {
                    const request_url = this.getQueueDataUrl(hash);
                    const bullshitResponse = await fetch(request_url, this.getUselessBullshit(hash));

                    if(bullshitResponse.ok){
                        const bullshitResponseJSON = await bullshitResponse.json();
                        if(bullshitResponseJSON.event_id) {
                            const event = await this.fetchEventSource(request_url);
                            const line = await this.readResponse(event);
                            const url = this.extractSecondImageUrl(line);
                            const file = await this.handleLoadComplete(url);
                            return Promise.resolve(file);
                        }
                    }
                }
            }
        }

        return Promise.reject();
    }
}

class FaceToAllAPI3 extends HuggingFaceAPI {
    constructor(msgCallback) {
        super("https://neil-ni-face-to-all.hf.space", msgCallback);
        this.styles = pixelart_style;
    }

    getPredictUrl() {
        return `${this.baseUrl}/run/predict`;
    }

    getPredictHeader(lora_url, hash) {
        return {
            headers: this.getHeadersJson(),
            body: JSON.stringify({ data: [lora_url], event_data: null, fn_index: 0, trigger_id: 11, session_hash: hash }),
            method: "POST"
        };
    }

    extractSecondImageUrl(jsonStr) {
        const urlRegex = /"url":"(https:\/\/[^"]+)"/g;
        const matches = jsonStr.match(urlRegex);
        if (matches && matches.length > 1) {
            const secondMatch = matches[1];
            return secondMatch.match(/"url":"(https:\/\/[^"]+)"/)[1];
        }
        return null;
    }

    getQueueJoinHeader(path, url, size, type, prompt, style, hash) {
        const styleConfig = this.styles[style];
        const finalPrompt = styleConfig.prompt.replace('${prompt}', prompt.replaceAll("\\n", "").replaceAll("\\", ""));

        return {
            headers: this.getHeadersJson(),
            body: JSON.stringify({
                data: [{
                    path: path, url: url, orig_name: "image."+type.replaceAll("image/", ""), size: size, mime_type: type, meta: { _type: "gradio.FileData" }
                },
                    finalPrompt,
                    styleConfig.negative,
                    styleConfig.face,
                    null,
                    styleConfig.weight,
                    styleConfig.image,
                    styleConfig.scale,
                    styleConfig.strength,
                    null,
                    null
                ],
                event_data: null,
                fn_index: 6,
                trigger_id: 18,
                session_hash: hash
            }),
            method: "POST"
        };
    }

    async readResponse(reader) {
        const decoder = new TextDecoder("utf-8");
        let result = "", finalLine = "";
        let done = false;

        while (!done) {
            const { value, done: streamDone } = await reader.read();
            done = done || streamDone;
            result += "".concat(decoder.decode(value || new Uint8Array(), { stream: true }));

            let lines = (result || "\n").split("\n");

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                this.message(line);
                if (line.includes("complete")) {
                    done = true;
                    finalLine = line;
                }
            }

            result = lines[lines.length - 1];
        }

        return Promise.resolve(finalLine);
    }

    async run(input, prompt, style = "lucasArt") {
        let file;
        if (typeof input === "string") {
            file = await this.handleLoadComplete(input);
        } else if (input instanceof Blob) {
            file = input;
        } else {
            return Promise.reject();
        }

        const id = this.generateRandomId();
        const hash = this.generateRandomId();

        const header = this.getPredictHeader(this.styles[style].url, hash);
        const predict_url = this.getPredictUrl();
        const responseStyle = await fetch(predict_url, header);
        const responseStyleJson = await responseStyle.json();
        const path = await this.uploadFile(file, id);
        const imagePath = this.getCreateImagePathUrl(path);
        if (responseStyleJson && imagePath) {
            const headerQueue = this.getQueueJoinHeader(path, imagePath, file.size, file.type, prompt, style, hash);
            const urlQueue = this.getQueueJoinUrl();
            const responseQueue = await fetch(urlQueue, headerQueue);
            const responseQueueJSON = await responseQueue.json();
            const event_id = responseQueueJSON.event_id;
            if (typeof event_id !== "undefined") {
                const request_url = this.getQueueDataUrl(hash);
                const event = await this.fetchEventSource(request_url);
                const line = await this.readResponse(event);
                const url = this.extractSecondImageUrl(line);
                const file = await this.handleLoadComplete(url);
                return Promise.resolve(file);
            }
        }

        return Promise.reject();
    }
}

module.exports = {
    HuggingFaceAPI,
    FaceToAllAPI,
    FaceToAllAPI2,
    FaceToAllAPI3,
    FloranceCaptionerAPI,
    LongCaptionerAPI,
    RemoveBackgroundAPI,
    ImageCreatorAPI
}