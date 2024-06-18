class HuggingFaceAPI {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    generateRandomId() {
        return Math.round(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0");
    }

    getHeadersJson() {
        return { "Content-Type": "application/json" };
    }

    getHeadersStream() {
        return { "accept": "text/event-stream" };
    }

    getUploadUrl(uploadId) {
        return `${this.baseUrl}/upload?upload_id=${uploadId}`;
    }

    getCreateImagePathUrl(path) {
        return `${this.baseUrl}/file=${path}`;
    }

    async handleLoadComplete(url) {
        const splittedUrl = url.split("/");
        const fileName = splittedUrl[splittedUrl.length-1];
        const extension = fileName.split(".")[1];
        const mimeType = "image/"+extension;

        try {
            // Fetch the image data from the URL

            const blob = await new Promise(function (resolve){

                const image = new Image();

                image.setAttribute('crossorigin', 'anonymous');
                image.onload = async () => {
                    const height = image.naturalHeight || image.height;
                    const width = image.naturalWidth || image.width;

                    try {
                        const canvas = new OffscreenCanvas(width, height);
                        const context = canvas.getContext("bitmaprenderer");
                        const bitmap = createImageBitmap(image);
                        context.transferFromImageBitmap(bitmap);
                        canvas.toBlob(resolve, "image/webp", .75);
                    } catch (e) {
                        const canvas = document.createElement("canvas")
                        canvas.width = width;
                        canvas.height = height;
                        const context = canvas.getContext("2d");
                        context.drawImage(image, 0, 0);
                        canvas.toBlob(resolve, "image/jpeg", .75);
                    }
                };
                image.setAttribute('src', url);
            });

            const file = new File([blob], fileName, { type: mimeType });
            return Promise.resolve(file);
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
            headers: this.getHeadersStream()
        });
        return Promise.resolve(response.body.getReader());
    }
}
class LongCaptionerAPI extends HuggingFaceAPI {
    constructor() {
        super("https://gokaygokay-sd3-long-captioner-v2.hf.space");
    }

    getCreateCaptionsUrl() {
        return `${this.baseUrl}/call/create_captions_rich`;
    }

    getReadCaptions(line) {

        console.log(line)
        return line;
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
            let lines = result.split("\n");

            for (let line of lines) {
                line = line.trim();

                if (line.startsWith("event: complete")) {
                    // The event is complete, so we can mark done as true
                    done = true;
                }

                if (line.startsWith("data:") && done) {
                    // Extract the data part of the final complete event
                    try {
                        let jsonData = JSON.parse(line.slice(5)); // Remove 'data: ' and parse JSON
                        finalData = jsonData;
                    } catch (error) {
                        console.error("Failed to parse data as JSON", error);
                    }
                }
            }

            // Reset result to handle potential partial lines correctly
            result = lines[lines.length - 1];
        }

        return Promise.resolve(finalData);
    }

    async createCaptions(imagePath) {
        const response = await fetch(this.getCreateCaptionsUrl(), {
            method: "POST",
            headers: this.getHeadersJson(),
            body: JSON.stringify({
                data: [{ path: imagePath }]
            })
        });
        const data = await response.json();
        return Promise.resolve(data.event_id);
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
        const response = await this.fetchEventSource(`${url}/${eventId}`);

        try {

            const line = await this.readResponse(response);
            const caption = this.getReadCaptions(line);
            return Promise.resolve(caption);
        }catch (e) {
            const json = await response();
            return Promise.resolve(json[0])
        }
    }
}
class FaceToAllAPI extends HuggingFaceAPI {
    constructor() {
        super("https://abidlabs-face-to-all.hf.space");
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
        return `${this.baseUrl}/queue/join`;
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

    getQueueJoinHeader(path, url, size, type, prompt, hash) {
        const finalPrompt = `A palette based, low color number pixel art (pixelart:1.25) in lucasarts style of : ${prompt}... Truthful facial traits, highly detailed face for a pixel art, retro video game art, masterpiece retro game art, beautiful pixel art only.`;

        return {
            headers: this.getHeadersJson(),
            body: JSON.stringify({
                data: [{
                    path: path, url: url, orig_name: "image."+type.replaceAll("image/", ""), size: size, mime_type: type, meta: { _type: "gradio.FileData" }
                },
                    finalPrompt,
                    "Photography, realistic, strange skin, untruthful, wrong, ugly, bad light, wrong colors, mismatched, missing fingers, poor quality, bad result, unsatisfiying, photo, picture, photo-realistic, 4K, 8K, 35mm, real.",
                    0.9,
                    null,
                    0.9,
                    0.25,
                    10,
                    0.80,
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
            result += decoder.decode(value || new Uint8Array(), { stream: true });

            let lines = result.split("\n");

            // Process each line
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line.includes("complete")) {
                    done = true;
                    finalLine = line;
                }
            }

            // Keep any partial line for the next iteration
            result = lines[lines.length - 1];
        }

        // Process the finalLine to extract the data
        return Promise.resolve(finalLine);
    }

    async run(input, prompt, style = "https://civitai.com/models/247890/lucasarts-adventure-game-style-xl") {

        let file;
        if(typeof input === "string"){
            file = await this.handleLoadComplete(input);
        }else if(input instanceof Blob) {
            file = input;
        }else {
            return Promise.reject();
        }

        const id = this.generateRandomId();
        const hash = this.generateRandomId();
        const path = await this.uploadFile(file, id);
        const imagePath = this.getCreateImagePathUrl(path);
        const header = this.getPredictHeader(style, hash);
        const predict_url = this.getPredictUrl();
        const responseStyle = await fetch(predict_url, header);
        const responseStyleJson = await responseStyle.json();
        if (responseStyleJson) {
            const headerQueue = this.getQueueJoinHeader(path, imagePath, file.size, file.type, prompt, hash);
            const urlQueue = this.getQueueJoinUrl();
            const responseQueue = await fetch(urlQueue, headerQueue);
            const responseQueueJSON = await responseQueue.json();
            if (typeof responseQueueJSON.event_id !== "undefined") {
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
    LongCaptionerAPI
}
