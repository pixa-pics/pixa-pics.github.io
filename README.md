# PIXA.PICS 

LET'S SAY : You can do selfies to pixel art back to HD image (as a painting) very easily! #NFTs #ARTWORK #ANON #NOCOPYLEFT

 * Shift copyright to left (as it recreate a drawing from an image it removes it).
 * Anonymize selfies (keep details masked).
 * Compress a visual scene into less than 16 Kb PNGs that scales HD.
 * Do more, without less... This is pixaaaaa! (pics)

Demo "AMERICAN DREAM", create NFTs and makes fun : https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/doc/screenshots/AMDR.mp4

![](https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/src/images/screenshots/GRODITNOW.png)
![](https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/src/images/screenshots/COODERFACE.png)

## Tomorrow is knocking!

Pixa.Pics stands in favor of the freedom of expression, communication, education; **respect for the privacy of citizens and civil rights in general**. We defend the free flow of ideas, knowledge and culture as the software is completely free and open-source. 

> IT CLAIMS TO BE THE UNBREAKABLE, UNCHANGABLE, UNSTOPPABLE Ace of Automatic Information; Blockchain is a list of transactions grouped into multiple blocks that constitute a state in a machine that changes according to a cryptography-based agreement AND between its participating terminals through a data network. This technology allows you to save and keep a structured data set for centuries flawlessly.

As a team we have a commitment to work collaboratively, and participate with maximum transparency and thus lastly, we also supports free speech, anti-corruption and net neutrality facing it with **the swords of code we are forging to improve the third web’s major update.**

## What does it performs?

 > This is PIXAAAAA! An awesome pixel art editor made with material design guideline trends and awesome web technologies! 100% visionary in privacy concerns/critics and against detractors with its development that has enabled to show an online-self (image) within a minimalistic version of an high definition image (minima-art), to which, looks like pixel art throughout an automatic resize and color quantization, and then to up-scale it way beyond Full HD through an algorithm that makes it happens to make it looking like a painting, while it will generate an infinite SVG and 6x bigger PNG version of the minima-art.

 * **Protect images.**
 * **Sanitizing private data before processing it remotely.**
 * **Staying on the front line of dropping cost as it is a FOSS.**
 * **Getting to openly fight what misses being just great, while boring good exists.** 
 * **Staying modern without paying anything for useless and toxic ultra-simplification tools.**

![](https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/doc/screenshots/home_page_view_dark.png?v=1)
![](https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/doc/screenshots/editor_view_mobile.png?v=1)

**Does https://pixa.pics/pixel get?**

![](https://img.shields.io/badge/Maintained%3F-yes-green.svg)
![](https://img.shields.io/website-up-down-green-red/http/pixa.pics)


> The use of social networking sites should be governed by the same principles as use of the Internet in general. As little personal information as possible should be divulged. The information should be well protected and only made accessible to clearly defined persons. Ultimately, the responsibility lies with each individual Internet user. Prior to publication, everyone should think and decide for themselves which personal data to publish on the Internet, thereby making it available to the public for an indeterminate time period.  — Semi-annual report of 2008, *Federal Strategic Unit for IT (FSUIT) - Federal Office of Police fedpol (Swiss Confederation). 🇨🇭*

We strongly believe bold the following recklessly for a while. The Internet has become an oligopoly Disneyland with little innovation. The central banks have corrupted money - the operating system of society. We see blockchain as a new computing platform with novel features, that could both, bring a new phase of innovation, and redefine the existing monetary systems. We want to contribute to bringing a better future sooner. Hence, ten months ago, we founded pixa pics.

> And so, when we talk about privacy and anonymity or pecuniary freedom, it wouldn't occur to some that non-fungible tokens are a good reason to think that.

# Special features

![](https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/doc/screenshots/editor_view_start.png?v=1)

Screenshot of the minima's laboratory of pixa.pics (which is a pixel art editor).

 * Create pixel art from your pictures and draw, cut, select, do anything.
 * Have fun with NFTs weighting as low as ~10-100Kb.
 * Restore and colorize B/W while scaling up to 12x images.

![](https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/doc/screenshots/editor_view_filter.png?v=1)


# Technology

* Multi-threading (Web [Worker](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/worker-pool.js))
* GPU's optimisation (CSS3 Transform+will-change)
* Fast Compression ([LZP3](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/lzp3_json.js))
* Offline Cache & Auto Save ([PouchDB](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/api.js))
* AI Processing (Deepai.org, !remote!)
* Up-Scaling 6 times ([xBRZ](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/xBRZ.js))*
* Vectorized ([ImageTracerJS](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/image_tracer.js))
* Color Quantization ([RGBQuant](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/rgb_quant.js) + [Custom](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/components/canvaspixels/utils/ReducePalette.js))
* Always encode well Portable Network Graphics in type of palette ([PNGQuant](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/src/js/utils/png_quant.js))
* Chunk ("norris") [webpack system](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/webpack.config.js) for dropping script evaluation cost within CPU


![](https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/doc/screenshots/RAS_1x.png)
Source file #0 in png : 5.0Kb (Perfectly fits into some blockchains entirely!)

![](https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/doc/screenshots/RAS_6x.png)
Output file #1.1 in png : 1020x576 (6 times bigger compared to the source file, good for social media post)

![](https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/doc/screenshots/XBRZ_RAS_6x.png)
Output file #1.2 in png : 1020x576 (6 times bigger (using xBRZ) compared to the source file, good for social media post)

![](https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/doc/screenshots/XBRZ_VEC_6x.svg)
Output file in svg from #1.2, good for printing

Demo Ultra HD rendering : https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/doc/screenshots/yakuza.png

Look! On the STEEM blockchain you can post base64 text, transactions are rigged to 73Kb at maxima but STEEM is now kinda old for a blockchain.

# 99 / 100 of performance (Lighthouse desktop metrics)

![](https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/doc/screenshots/pagespeed.web.dev.png?v=1)
Lighthouse (google's webpage loading test) metrics of pixa.pics at left while those of instagram at right


# Legal concerns and acknowledgment

 * All splendid emoji named Tweemoji by Twitter.
 * Illustrations magically found on Undraw and ManyPixels to shine in those passionate forms and functions.
 * Most awesome sound effects by Google, simply not evil.
 * Great music on home page arrival by Red Eclipse (video game) and piano melody in the editor by long time dead Tesla Nikola (inventor).

 > Please, just read the [privacy policy](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/privacypolicy.md) while our [licence](https://github.com/pixa-pics/pixa-pics.github.io/blob/main/COPYING) follows similar lines of intentions about what ideal we must being trying to understand legally and morally nevertheless.

# How can it work thanks to sponsorship?

![](https://raw.githubusercontent.com/pixa-pics/pixa-pics.github.io/main/src/images/screenshots/TECTARY.jpeg)

**Regular patrons are fixed to the following thresholds :**

Gold ($ 6K/Month), Silver ($ 4K/Month), and Bronze ($ 2K/Month) supporters (VISIBLE IN SETTINGS) enable Pixa.Pics to have a bigger team soon while benefiting a positive cashflow to pay everything that is related to activities from development to marketing content/analyses and production.</p>

> **Thanks for support!**

## Getting further with development

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

## Get started and fund a king functionality now

**INTERESTED INTO SPONSORING a good cause? Please email-us at: [pixa.pics@protonmail.com](mailto:pixa.pics@protonmail.com) OR :**

### BTC
 * 1JJq8FgmUUZ2kAeM3EEk3mDkRbvTUrc5Ej