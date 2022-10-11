# PIXA.PICS

## A) LET US SAY 

**You can easily convert selfies and other pictures into pixel art going back then to an HD image (but as a painting) very easily!**
> Yet many drawing tools and selection mode enables you to be creative (and decentralize everything)!
> 
 * **Copyleft** and copyright can get shifted!
 * **Anonymize selfies** (keep details masked, reduce entropy of data).
 * **Compress 100x-1000x** a visual scene into less than 12 Kb PNGs that scales in HD.
 * **Do more, without less**... This is pixaaaaa! (pics)
 
![](https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/src/images/screenshots/SCREENSHOTS_GRID_pngquant.png)

### 1) What does it cost?

**Permission is hereby granted, free of charge, to any person to use this software.**

Nevertheless, the aforementioned project (i.e. https://pixa.pics/) whose source code is said to be "open" (visible on: https://github.com/pixa-pics/pixa-pics .github.io) needs for the coming year an amount of 75000 US dollar to operate as drawing software in the field of pixelart and digital-painting (art) among others NFTs ( so-called digital cryptographic tokens) being free and open-source.

### 2) Anonymization of visual subjects
This project allows anonymization of the target visual subject directly on import by reducing the number of colors and the number of pixels present in the raster image (which is just a pixel grid with a few bonus colors) and allowing retouching of it in an interface made in Switzerland, which offers tools for drawing and retouching tints and colors as well as shapes via functions and algorithms on clicking certain buttons inside this software, available under simply "MIT" license via the WEB...

### 3) Lighten the online-self up
A person can preserve details of their private life and still publish digital paintings of their portrait without risking leaving pejorative details, or deliberately harming the online-self of the person, since the output files only contain 1:100 to 1:1000 of the weight of the source data for an HD image also which more-is will be a form of artwork disregarded from the eventual copyright that protected the base image.

### 4) Preserving yourself as your own hero
It is useful in the field of the protection of the private sphere and the online-self, in the field of drawing and image editing, also in the creation of so-called "intelligent" NFTs as well as in the artistic field quite simply. Meanwhile, also between the search and identification of missing persons and the anonymization and copyleft (un-copyright) of visual subjects... A real tool for the creation of "artistic situations being safer than safe".

## B) Tomorrow is knocking!

Pixa.Pics stands in favor of the freedom of expression, communication, education; **respect for the privacy of citizens and civil rights in general**. We defend the free flow of ideas, knowledge and culture as the software is completely free and open-source. 

> IT CLAIMS TO BE THE UNBREAKABLE, UNCHANGABLE, UNSTOPPABLE Ace of Automatic Information; Blockchain is a list of transactions grouped into multiple blocks that constitute a state in a machine that changes according to a cryptography-based agreement AND between its participating terminals through a data network. This technology allows you to save and keep a structured data set for centuries flawlessly.

We strongly believe bold the following recklessly for a while. The Internet has become an oligopoly Disneyland with little innovation. The central banks have corrupted money - the operating system of society. We see blockchain as a new computing platform with novel features, that could both, bring a new phase of innovation, and redefine the existing monetary systems. We want to contribute to bringing a better future sooner. Hence, ten months ago, we founded pixa pics.

> And so, when we talk about privacy and anonymity or pecuniary freedom, it wouldn't occur to some that non-fungible tokens are a good reason to think that.

## C) What does it perform?

 > This is PIXAAAAA! An awesome pixel art editor made with material design guideline trends and awesome web technologies! 100% visionary in privacy concerns/critics and against detractors with its development that has enabled to show an online-self (image) within a minimalistic version of an high definition image (minima-art), to which, looks like pixel art throughout an automatic resize and color quantization, and then to up-scale it way beyond Full HD through an algorithm that makes it happens to make it looking like a painting, while it will generate an infinite SVG and 6x bigger PNG version of the minima-art.

 * **Protect images.**
 * **Sanitizing private data before processing it remotely.**
 * **Staying on the front line of dropping cost as it is a FOSS.**
 * **Getting to openly fight what misses being just great, while boring good exists.** 
 * **Staying modern without paying anything for useless and toxic ultra-simplification tools.**

**Does https://pixa.pics/pixel get?**

![](https://img.shields.io/badge/Maintained%3F-yes-green.svg)
![](https://img.shields.io/website-up-down-green-red/http/pixa.pics)

As a team we have a commitment to work collaboratively, and participate with maximum transparency and thus lastly, we also supports free speech, anti-corruption and net neutrality facing it with **the swords of code we are forging to improve the third web’s major update.**


## D) Special features

Screenshot of the minima's laboratory of pixa.pics (which is a pixel art editor).

 * Create pixel art from your pictures and draw, cut, select, do anything.
 * Have fun with NFTs weighting as low as ~10-100Kb.
 * Restore and colorize B/W while scaling up to 12x images.

## E) Technology

* Low-Level-JavaScript just like [asm.js](http://asmjs.org/) or SIMD.js for blazing efficient color operation
* Multi-threading (Web [Worker](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/worker-pool.js))
* GPU's optimisation (CSS3 Transform+will-change)
* Fast Compression ([LZP3](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/lzp3_json.js))
* Offline Cache & Auto Save ([PouchDB](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/api.js))
* AI Processing (Deepai.org, !remote!)
* 4 algorithm up-Scaling artwork up to 4-8x as painting ([xBRZ](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/xBRZ.js), Omniscale, hqNx, EPX)*
* Vectorized (output an infinitely high definition SVG file) ([ImageTracerJS](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/image_tracer.js))
* Color Quantization ([RGBQuant](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/rgb_quant.js) + [Custom](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/components/canvaspixels/utils/ReducePalette.js))
* Always encode well Portable Network Graphics in type of palette (we save 70% of size) ([PNGQuant](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/png_quant.js))
* Chunk ("norris") [webpack system](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/webpack.config.js) for dropping script evaluation cost within CPU
* WASM Hashing function for detecting change in history of editing (XXHash)

Demo Ultra HD rendering : https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/doc/screenshots/yakuza.png

Look! On the STEEM blockchain you can post base64 text, transactions are rigged to 73Kb at maxima but STEEM is now kinda old for a blockchain.

# F) How can it work thanks to sponsorship?

> **Thanks for support!**

## F') Getting further with sponsorship and development

**Great is this king, the king kills that is good, you can't kill what is good, but you can kill the king!**
The king is the newest being an amount of funds along with some specifications to create a new feature that kill one.

**SO :**

Always while a new checkpoint is set the king, once it lived only then, it can be redefined, and kills that you want that isn't great once finished yet good as it was; Example 1000$ for performance improvement development next set a new king as a checkpoint to kills the good rendering system not enabling to run it well in Africa and Europe (But that is done, it is running well even on an old smartphone, yeah!).

**NOW:**

> The king is empty and is not set to achieve anything, currently when it catch a new one, let it hit that is good and will be replaced by a motiated idea accepted and pushed with funds important enough for achievement of the task.

**Current ideas seeking funds:**

- Undefined

**Queued ideas seeking funds:**

* Translate the app in : [EN, FR, DE, IT, ID, PT, JA, ZH, RU, KO, HI, ES]
* Make code clear and well documented.
* Rebuild some functionalities again.
* Audit what users need and list the ideas found.

## F") Get started and fund a king functionality now

**INTERESTED INTO SPONSORING a good cause? **

Please email-us at: [pixa.pics@protonmail.com](mailto:pixa.pics@protonmail.com)

---

## Z) Legal concerns and acknowledgment

* All splendid emoji named Notoemoji from Google (Android) and Tweemoji by Twitter (free and open-source yet with mention).
* Illustrations magically found on Undraw and ManyPixels to shine in those passionate forms and functions.
* Most awesome sound effects by Google, simply not evil.
* Great music on home page arrival by Red Eclipse (video game) and piano melody in the editor by long time dead Tesla Nikola (inventor).

> Please, just read the [privacy policy](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/privacypolicy.md) while our [licence](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/COPYING) follows similar lines of intentions about what ideal we must being trying to understand legally and morally nevertheless.
