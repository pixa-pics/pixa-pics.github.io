/*
* Copyright (C) 2003 Maxim Stepin ( maxst@hiend3d.com )
*
* Copyright (C) 2010 Cameron Zemek ( grom@zeminvaders.net )
*
* Copyright (C) 2010 Dominic Szablewski ( mail@phoboslab.org )
*
* This program is free software; you can redistribute it and/or
* modify it under the terms of the GNU Lesser General Public
* License as published by the Free Software Foundation; either
* version 2.1 of the License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
* Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public
* License along with this program; if not, write to the Free Software
* Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*/

import bltf from "../utils/b64_lzstring_to_function";
window.hqnx_process_function = bltf("bHpwMwpdxQBlbkd6SkhbMlFYW8CgN9a/QC+0e5w8J0/ni8hBGaXfYzJh+DI5ygAq03kYANwPi8HQ+2F2PKFdU8HvIBTK//2Z7osr2otctfrVP8PnVP97XL2kARYDT0EL5FIlQjPZNUrqgJxCWPp9JceVgriPMzht22j50D6DZYeDK6xS5kwiYHUsFig6JrBc9ina6ZwtbimBXWmY5XPqq28RbUJv9r3/r1O5sykR/DH7PqS1ghLd4pDOhZqpPOq23mrBPaPfhs7E1B0WmqDUbEYjaNjzv4AU+R+YFtctG2Vl6M3f/soVHCr0pgHvez9UM8dC8vGc4tshFCrxM7AFbZ7cEnkkfr0VsdBcLb4FWwIhsSbrbns4vL8wd80+1uPE8lfxlKIXRDG9mAMsquYXQevVMv/o7Hzxqs0ykJZmiIo3O3k/h5TAe6uKkvteWFg9aTnFHZ4BCfHSNHGAXDfnylbuf2GbH42aPP8XpnRdpGUTUds/MZPRrRQz/aqf2Zd3u71FL1Y6KWQ0rjNKb21s4BIbTG8BMyXphZBTwuuVRWDkIaTpZpodM+eClGJtkatQMybUYbrmPTVaTN4oRicVQo30pZ9bPNCHvPfcyzV1fC5f3LfSUBAljHKVuO80zVQFJG18/aiq8v0EE0obLHhIUInm07SNjQYFLVDHkinVeC4OFoq1D3N9P8+iO/+qbxgd0r1Mb5Ia/ySK8ba5qRF/jHzIwOlPIZXux6PLC+UCOC/Ob9QjoR5gYfHZrfLPvXGv7hS9nHmqdHGOLUULU93zMTcrDHIswTnTDkjswkrXoiNfbg7eIl5/+jtfn7kS6Ehv/aO1GwuurW5ty6dTMxA4h9vz+bTAZ/ez0tTFcXwiOFjcDk01c2Wv2NfGtG7bXF263KheaCWgqsvP5WDrcFbQUkzqSbrXMsumjYBjEIj9Yy3X51DlLUTwJejQ3nxXPL5RAkfFD3wjAjmSnbFtunzGiSnAsFlHI4g3pCuZmYDE0AQLDpj1TX32DfBf7AglJMCe/0kEbEPirMwxZpNCVNoJs0DqFCtd/3J5RBzrYsxgfjMMj5YxcarNBwY0btklJAXPgcW1OkyCPDhf8i0Ig7BYuf9QAVHTwHySJ7VWSWivbb3WX1JPOD3fIab3PokCUs2Q0ub+L1hfuDgbDqTFN6XonjsWgQzTEeusUO7P+qSu3LIgsu3blRuXnYZHelsGQHvZg7Xd7qTkN4XYPtSicOCAyu7BstS9C7QhNN4Rfbq5E9Ns96KBLKCED9HqHMPs5ooHEodBahg4mXbdsWhYJoHyqqpym4+OqOo9yqSJStvam91xpZdHniXEKRORENP/h9DbE3Y4mb+2yKTYGDasA0ZXRuyyiPBWOizq4wznHuYWqzW2TOM52ZLRZBzXE2b459EjRoJITQQhnme3+WX93tenW0wSfQqMPZSD9gRDsw1muvl0oorprDo3PBWV1At8ih2PaektS9JuL7m68IfJpnjaPZo6MjwdQxolwUdhX6RarO7k0nLgG/g4NY9cSij4CvLi0VJ2TdgSkn5ssgsy56UVaEy2uAjwNsrlg4IImiM/cC6t9M41xkcKJr8UtlFMKQNyQnH5uHHRavLbfqQWxOzAjsPinQCM6qvqlK5vsuBMZltpkV/1a0qqfN+H8OZoC8kZCoO4Gqn97P3goSsM2V6vdjfREMxfr4HIhCIC5iwv96wGGTMurF++/G3NfPGNuYOQ7FSO76l1w04HHlj8Pxq2hZ5n5GlAwtv/LdcYdA3q4LXKtfKGGv8kGJl6KNjn25oHva7fqw3INs8x6fHu2rPodTZsSQR+3puk3i5EqVY4cMW0pJathqGsQuETkmmYQV/oTFMjesDQZAuziuCbS8WFHzwbGnu0nIH09nEN7mKim1m8VpwiNPQucMsOxeyHnZ5aDuv3LEmoGdoselp93kB/sJRAmcqvyT/B82IFB4Y9MwvEiwqotj2L3WtFT0J0KhlBb3IPqbk9tHzZhRxDas5RuY65JAmbQVAYcoGXE9Q02uc8wdaFs/Of4rjzXKwuYftgJbNLQzkggCIJfmuNkSb27pmyIhIoZ8++8gs7M0Q9IMBrV/I3bCtemBpNJnJEK3JCMUvRPYRqSaWFUmeMMhQ25eV521EPbUFBwg3pvdVnrb/dY/bMI/vYstuvH642FnZejjM+hApfZDBG64gqU5QBZHw9Zos3z7L7blETew3yPcGiGHsDDewe/W3RfstSm2h04k1tIQT5R8mbkM8widQBBjuBETfbDuiKBUcIJsV0kpJuhj4lile6Dkvkg34IFGBLpoKW/14bjrWG0TH75rMIwZ/gsBrjjS0QOoyCECyrDOcm2bpWMiov3sEMc8XdfSuVf6+nT1cqcQek6t6hHUDku4r5OxfQJWJsUmtBzoDrDZX3sVesEp9fMkZCh0/2exr7ZTKrW6EySqGDx174YC549VGA/5NQsGcKFWLSTeu3QnSmMuuE20sB3EtHxMhZXC2gatovn8dJJsZpT3eioVq9TRbMKKJV/z7+LDVBIsB9D9sIz+F7JaxTz8SjW2jy/q59u8EG6GbLHo51mkqY8boFNFRX/2tRET4MvI58F89Z9C1Wvb0CNmR5rIY4zYb7uL3eG0htZZ4BRGJ5rDdz3dZyzPVUE1R2NhOD+pfqwW6Hz10IjJMk7gAH7TsMDySkFMyaEvKRmAm3DAC17P4GO2O/eHlBwtASqsRJj2ynzKBh+EBi5/8SzQeRIbsRXV3xevy3uvnr+Sg9/Yyokz/kElWgAfUFuOsNsE0Sah0p5CvKTXG8Pt6TGQUG5rA7f/YbpqzwhnVR7JslQwRitI7MfuWWPJhe/BaEpIvFd7+WoguFGOir20Pp2iI83J8kneYDj+O0YDj2iDQ2mPDzBRVkHHks6uQlTIClY2NZk3P7AzL0tjzC5VgPw1VQOtHdLsQRlitPxXBpqVisEE1vTcc20flpBRrJfKhUR07kK8F22tebmLUWKfYa3vfgVUoKguzCPfB3FkJovlmlxGNLYlgyPe5WIM5SxxOV7xCL4zV3XbhzNosrH3C/b8pM24su3z4k5S4pSfLSK33Xh9tGteEkokhClEko2AhNdvFlSYvMhaUAHzBERUGtST25QaEP5h7AlKrFFE18QQx3mEhvqlRSZDuSB/DvjzJAK2cnqzV9mo2wuNWeWyu/I2RtHg2lHExTS6jAMhl/Yr7g0j9juLpuiBpPMnBMkqsGVfOs2RTye5JwGMJtE58M8p5gGuTmcXnP//UTvqqJFxbLJ/0xD4OHMhzG56vCsC5LHkKVYoZgN8HGiWVQE/x9bCC1KpTRfHLx6gy4ivQrWRGlYuvGL8yAcaFoGb5DhoTjsD9FGJI7Hsp/Q4Bldkl/vVL6oS85QM8ZYzVZMLkR9gPo/Xp0IOddc8mzBhDY+wnu7q3cL2wHKiGC/5xWR/OVrbSrzVQPNgFuSGbPRLuOk/Rrrb8bnSHGXUVKQ4fzCKllVXqKBvCfi1zTJBLdupIMUzY4XlvnfleAMSw2qHX/n1ezC6LmvR9mZqd+K855K0c7JvkWXH8DjHCGlw5AiZAPQNLPS8a3CthusVrrhbHSvGt0/B4ht68QBLQ5PS/Qovsroi6+XH/UN0yFpmJd654vKVSlkKARr6Zcvd8vDFSYkpzBJSLduhg3T8hMi0elHqddNyMEDmSfq8vhHIVQWlLnND9dSQ3ISS8GhSJs4tCi8g7LXDRj86tVhUkqWefdhwR9zeghaMm4whB5pAVonn5Anq3+wKsB4e0P9eu3gHbtwqYzEOZ+mXRSZgee8i+F3dvdJ7SdHfzK0juVh9O7trJZdNsS1N8qZqYFCNBgX13IwHRVT+gTlOOAAatrXTyvlGog3M56hDAKQnfjd3MtVwnWuCsGi8Q1fNAnGQFVT21ViXpp6e81WL5copLdN+HROEnLNmMtFYOCbknLv36D/zL07sMic76QxGbGPSg2KU0nwtf662MkH9tWqttrzKuxXOAzEYR3oZmwWBzzW2EQjw8Oz7zLORP59V6KBnGXx3GNGXVnj4uYXR4qNHhtwWzaW7kjKZMBcRhsxgk4ruORW+V7sbbgVbM/u5oK3r4fv3r96Lqw1QDJ2o55ZRI5v/XYGVuArgP+v8nVLYrvXnpDDo242fk917ebBuib8bINaup6plGkzTCFPof3kG6ekcfBfwbfPOawAaoue3rdergn/PkQqr1Vm3Imig5h5gilzBsWFVOPko5S4n62kTnJQOx+0ldjwsFzTlfvPYNzJ4OROhVl1BSmqtuNYr+QnaFlHzFgqmXZ5c0DBYrn+pCNdpFg/vdEjuhCbxY6m5zJuCIQAZYEmtFe5Lq4tqi6Wo3KtcsyWO7SKinEnaiDTOrOKQvEnflQ/aQ70jNxrHbvdtkZlKjHVhA/DUkvcTZADbm7/d20SREPhVu/eopmSOnJnNhm4xj/TfPt+EHSE0JvAx4x6jGGkja/mYuHuQ1i9COVqakxzv7SMBHbcDS5wNxW13xrfRV8mlWxb57gNDp4ZIKZq03e8qh0zUSIT/CV4FcUNse/IZNaHCUPMPEhc2ebr/USAs2gc0BweKZwrzirp4+plNGOzCFHPYty2sG0XQPNaTQc3kYA2gWkSZhmOWf/uEboCLvZPrdNEAr246pzQLm06zBBEp1svaedwlc78GNn2Obrs3M3YCIFqPVQ5jD+7N/YzLv0romrAteWNZ840OUrfgQ1AcIAfxbJqlMktzppZ1eWo88EMhwbdNzWbK+z1NN1q214qsnS6osAI03NBVrOP7KuemKZSNJlgfKd2d+yqf73lvOq594p4R1GZ0lqUhpK5uLc8pfdFA+cBFkmHtmXELEm/Ue1KCgGAqTvSnwzL4fYCYZpBEzG/oBr3rlRTj+BeyJKqG/vzNEiMzneOIfIgkN2A/KUnpIEFMRaGYeu0xTNH6e7HZMZVJbFn5coj93wxgp9RyGSW26kvrxnOdMUG3nwngaArKl6IjecZ8w/BCSxhhPovn97uFKw4K73gJMUwNUuJ4oc3s+ifJaiHQLqOoKvWLg9THP2WPM8qotLOOef13EiMfmc8OKcWe6JMT1SQwti1P1kkj7OWn17gZ7w5FNFqAmz29CLtnKGlGZthNAUV6OZrh9DZYPUG5R2ZQStbhJ0gKWntNVmaTZZA0s14waJ1KFoGlcLVJcF76V+g+pCC/7hmXGwrimHLfIVhQm1Ep9OqHo6nAOBqw/Yen47c/ShREkYvSfHOxgVkx4in5LNh8iY/crEpIc0DXH3hQSV+tWnZNuTEXFLyEXK9KnFjUMtRgBcoldUEnA0YGLvn0JPYEE4Cho3bKOac9zkNATxfyE8zPt7nFRwZwv+7nYgavP4ehRchEtIiw0Wfse45Sc/+ioE2dZGwHjSw3P695F4gceZs6A59Xt42ZE4tV/k3aX0JnlInRpWiIhvU5UH9wAL01zxzxL0MLTnI2us3a2T75zPzxc/ihGPjLMX4dg7sNoz/wP/cKOXPk7qfXnSteDiUUuVO84yahU2UIOVr5U6S2WeyWiiWrYRTDx5yeakQ5+X14KZ09IY6kultbK1JBfxbjoeMh6wpfEPKl7ZT+oCP2dL6AaKNTF5Y+hn11J8zEJrLX4N5KB9SipKVLXPjS7TQss/h7WG60XYLESX2pAeYc+C94meR+aJ86gi/K9dJYT4M6JTGagiv44SK3uGWFLC+bPy2TVFld7jdij7XjQkT0fBKhZWgzkTdwyhh+w1JTdI70uo6PqzCcmO6OWjForwsyY9ynWxE19pkg/BZcEekykXx2Wm4mOreZZa2g8VnRYAav0rBtbB3ykzFWzR9EbVA6hWUdH1O6qFeZ1286LAT8iifiF6nIeg4YMFCoKY7AVmgJMStvyyxQldO7YydHa7P4Q157ugiPMELZhshJdWI46Ld3eGtc2OgzgmZ8duYA4CaTwgHYpNrnlYZMGaF/SfqxfxLlRB6A8fxNyj9pWBMn6hkxfHnvlBnLtzszTYnadT25XBZxVD1wv1doaMj9O8/AX9cx4zMufNAMBhZGlI80b8mcriSQISgFidJWTDdYrCpQWP53GKE1j1bmYYjTBtJfZBJPCOQIhEz6oSK35aG1g2r89ItnYpKVeAEW/bkQAAaZPM3ypXzvJusfsdgDnKpAoYhd6JxBZ4JJZu21KP4IqVl3eqT3JM1lbINF7ZF7CTeSMyq59x3SFuaKCHiSK83tHYox2hcjDkQ0/4y3BMuSRvDUrFgkPZf7WkB8MLiW5VlDP6aBIrVvIcBBEkSeq6kL6xKsSsKqUFiCr5SDez5/I19R+S/OVtPYxQNAWU0RWcpudwoBrz1O6rYKLvtSfDAhB6NP70ROkrmc6XEYJGBdMWDXx5HyoHCmNCUWS0skT4nURG2R7NTeHFGKXX3A8wDLItCjLjyopaWu7WXbe15BkJ1xWbjTgLevb9q1fpXHrzrOf87RwJ2U+q01TLZJeEeQ5AqQ72uVG6wrik8fd0uG550W/X8kUUa052ktMf20mlnBenUexSyZ1qefYwRVMbi0vs+vdnCIJdU/5cMlCka0c0E9tBgZsez+GCH3WgdQt682iWZJEElsLxKlyO2zHdpjdhUzZXc0QYxishJn9xSmzPHXrSjQ7tIrnvC8vfKBe7nDGgENkOAfs9Ovm2H7dKn2TpZVcBVWfKsN5pMNqVTwi+MdAm0BOE5clmkijSgMPt21DkV6JTN8sF96T+9iIrPZbfxMDnwVjrz8VcxKsFlDrDBNpA1bDYeDn5CiZKUF6oyB4eWuXW2tPIIyxIk4ZpC5+BGd/QHw6mFiY9rbkghwytWnqhTN/lopRZYE2LIVvOSP3uulo9rEio6Q3GEP2gb1Xuz8B4t1y4BxIWU2hB0cqJd3ODpIQtaj3VCVMniR23kcJUmMou8ycEmfkUHsqPfOsbN3qIy9DVMG6dqpkWXwcgN0OapqQ+bl2GwGjVK2ENMCsKeW/qpuQABgHNaFdW33bjVR1xTjcmqOu4Bt7BRsN9QTtW8UKSdSo35NVwOw6+vLSFgoXQBfLwwFbtndMyzgC/GIjOAcj0SQZGxak5i7BbMweaYglFNmHxaUtBymszz2aTD/tECuMvYK7w3F4fK5/M9SMyKlhS2YacXzAIUd/48iz4aYjlCfQpIJP1WQHghLziqFM1C3vV2WZrgL80HxFiClF0DUyD4M/2qWumb5rE+Ph8XhPdQPm14tNuNXJ8Syr3ojMeyXZH3aB/Pd8fcgEjF3i7KQmNr8p7+UpYcQ6UeoARxtFDSOMj3J8nNRI8/aaOW6zMi0JutiCjKLAF/nEDsbFIP2Mx/NBObIW7TmHo7bUXwPCzn8ozMESxDni3zmsXyrAnQVuyBaSZgeIBKLFZAVAh2itXjt8Relo5/bwBRIzTIwAUqfOGIToCuOOvMvlItkWH8NSAqcI29PhHgJGWCIRL2gi8xCOlQuQyFudJRvWSDeFNST/SK365nATBU9xtWg1zwJeJiAW/Ll94oh07n8CB5YNsHYN0Ea5d8CrYb8tUXEfXlKOhZbxE46sAzrt5C7elZlNirL6K/a9cC1gxninROCsdr/r2AkqA8kq1VUNGQlGug/ob4lXktm81WDe3pmBjwQmiyW6XbbV2xIOOoqtEvZGRKlW0yyuHup/m1+DsJkoXWm7DysneQ1C8mpCHhvSjUCjZJTjqvH8MmyGIY99/h4u6WYwGPEMb26ED68t9F+1lgHcukL1UyXCq3SbiZpRF+WytOJHTzFO86BgkEoe3x/pqRuJdjlj+lfYk8QudXrzMyB3IUT80sG9NIdp9AqtcNcEa5X7eA6Mi0vt+4K/Kh/l5KuSmkYRUW6CzWvmADuuRidtfZXHodLouT8jFw7IGDIxAbPRO0mnh0CGsAs3CUvq4SaEmiQcvfYtOOFng+B5djsylvkkyPwuOF0BvB0wCJRROioDB2scxW8C22HYJRy8K/oMPdilHda3on1oXXLty9HM0Vs0cP4f63w7Fma+bTDAKDghGD9I9UCQMqwQy/yK/YmoVZdyQ63hID9RjbTiBoYH7OGmsspdLn2ge3sYqZMwt6ccJzTLUIZkWiDBwANi8Fq57J8/roQuv3MU3m2PVhX9L6J+COrnqo8ld4AIPpMDeUSCq5p+hgEHxPaixAFf5QhlDuDQRZo0nM9YmkoISL1LdtbX3+622a+T3lTt1avTt6GBjRnyDj/kB+x6z3lcghJ+qE9c6SJK95gbYGCTN9U8Iom/TYxwod/tcSxvphgdX62tgE3s4UxHq3drK2ob4kYu4du9O6UvZlmGIUP85CLiUhbx6cCoUX+xfpc8KWbHvQj/5kagFtsRxN/wZqU7AeNMGe5Na1HBcUr6We52rt6aBeqhJ+ZfRtP93QrfRgNSsmlJaLqYUrHvcGXNHij4htSsxLYXpllQDbRhyfILSM5IChS+o1VayfypVjsQLOsHsZ3eV6hUY00GEvhgNwl85PGUocOcCEWH2YveXxRwro8CN1oDiQZugf6ERocTC9X/TKAcn39gN1k3+EEeIzEqqN7bDjLTPE+uuKSi6YbN10F05Yf4E8S6sINYc2L8krUUZOfKV6pAwBgrjZ0Dw8FiXzdnY4bSjvakExQjMei8Te9RIiYyc3M//OTUgoZO6MwRppeL7ZGH13NByVJspN1uHqMqKQR/lnno99fzfQzsdS4WyW7jLeR+zVQvVGXhZ57w3b9l5fb25U6/0818NBX8NzzOeG6sOHecthSGHBG536+qrvv0P2JBa3lXaLxlQCRtPnpLwmGo0a0J67mD6JCcsjaek7UZK4HlmrHncEhx0nfjTpLxOsCbUO1xqFegF7iQMVveEyUR72FXjh8ezKsnLKuF7YlS85kH6Ny6VTF/Lul3q4RuCHbvxF4vP8GNAdeCCaW+jfuJ56FjKYM9mJHxCiE5FNMfVN5xSUGvrm8o3SAezNOCbSXjSgdUXgc1HMhB1/fxaN4c4RyCMdaSiciA/qyL5BtIOpDy7Ofq6rL0NLe0wcWXYBglkzgT7bSFXU+jJ3yIYOX3QkoS3E/CIBYtuqm6ejRtgJ+VtjwavnSrdSGLiEmOIpEMDN9mFLcirSN6K9BudagMwv3obFxAuv06DCPslkOxM3rEppNfm0BPS1W74uvr9XHRdQyW4oDcfEePNc1yiQNXoQZ9nwdT8S+gEqnAzInGsKye32JogcHUbXKSNJEVSpYUKx9Ce4ac78X8bfb0KNAvIgrF73BcuyMAyC1/j6v//KlMPRIzbbnbJR1FQ23GSoIjGqZRV9zQZwyHjB8W8ve1fei3y5LInqQ4pghQ70oDJH4P69apmb81wCDj/s6ZwQfrPAN7X1xYiUuVV77VfY51JvmAt5mBwXQQ9cPxfC39eQm5B8EvDkhIYS0fslx1t3X/r218nf9R9/lI/syZhzLI92ZVA4J1XBbtnii7ah+tmyVj2++YlVw0o6fgLlDQpzfhwDDsXlvNabwKGxz4SuNbOyHv7SsAv5OL4vHgm0uC/vkVqw5uUX4RMMXem8bDcfBOGfVc1X6d3D0uOpPew3tx3+7cOa74RUKLGvFjooRFixz8ZG1aLDjXGIPA4iMveRr52I1ne67vKnoUKYptRA2NAO9MG1LNEgGbrmSrxx8kXQzSy1jOQSx6TV/4vlFwryWjcARAfhPe3DRV+bkyv/e+a3Od99Ck/VsM+5+hFamVqAUNBXk65zFlll0I330PpMN+s7bV3UjZ9GZeEdiG53s9XRSAB18lXZgrVYoJCKuHSoYqL6PKjylP+yK6FAf4dQwjIsedQmwilciD3Oj7aNKLicPK8NyA0QPVUDcXxQ0jr7VQTxstv65nasgIjvflABk8BPcXGNaSuH+VQ5LSTBaS1Ryc6CT25/9yAqJS6CledDWSi6rj6mdNh9odUCKJoYG846rTVf3WOTiqixSKnqWT3msG0oPc3iKTqFOOSMV8VVYO7teXDMdstGDfRTw/mVel1zVqifZjnCVDsMLhUZA9LhtQnZrfADnXu7UWU4JRj9TjyWr4w7ujcqUPgdM+bm5FPpuacW88E58iiVDr+eN0IxUzvksnXGX8T7QuV797tNHaAltkyU3TzrCGuI5AqYKmXVYDVf3/sJyLyOhsX0D7ZazqKLwiaVptx+PQR1LqjRQvX6n+75mBi/Zis7RPv5iCa5OUpVT1zjNucdzIzd10D3xqbOi+tSfOW5hftY7SSsyDxBPrU3TMjSfQHYMHCWbk6r5DmsRcTpArosw13ttgLYxeJPzuNDGig8VosH+cGdbCJ/AW+jUyly0jtTSE7X2S5c9h7T7x8R4P5R9fcGXux5QFui1KUvmBzFVThrvo//y+83SL05XOg6hAeLZSuZSe/eiholVHBVG5jhxx360k1DVPartKJuFstFDfkSkFqiVpgY0a4osvnMIeYpZsA0VgGhZmhAHxjqynUSV1eKKZr1RU81dkwzY3Jq1zKKcrvZlEuFi2Z9jnsQ8PKoYVJUDBR7++gSkrmKHgU4rDYNAP3EGmTh1/PXK22OYR2DH0df9kKwEHowK85RxEXtLjYP8NvqddIeeUFrPiOtJiXjePacaS2JRtsTrRtMDqzku0Lt1EEPp6lt2bkjFcgJxzwh/vXXmJU4Oef+9p/UWEUZLIzUY/bBd/A4mngu7M5OijxUvicHmHqrR7bFOtxAjoe77c/hZH2p9z1EpCDQIYdUktXeVFZmScPDsIVwiHnYWac8Zb23egPwh+m8KXR8mcc8CsmeLe95FKLf6Ya9hor4jn2GxWI0BXXZZmuAUlLkge4XiUz/xPQ9jn2DwHtLQnspiOYSTrw5x6uzpvZbx6VyK53L3ERwhHK99sZn7DqEX66UEcev96C2Lj9l7FBzD2CElN1EF46cwuhtGg+Ps2pPC/zSTYgYVuVmkPs81vk6dc5i+0wXivGBZfhxI+8IAJJBJK/MR8I3HdJSSbVvuwh3ePKn7sWbVyDq3kuUOTQaqXMxbr5BLkyJFkl8B8UjkMpdDnXby72GOfpKUfZ8sDQ7lajVkxe5wsAaTq71EA4jb16XuJvP8cnY0c/a4lDEEKbdiAvKzduWuKPD9of6C8mBviTE8BuUpJtv0ugI2CwKyhIouEuHtzQMz6lHk/o4L5YvfiSAxbB+mJc8JiuBjfknye6Ibd5McaW/Njo/eTWSdQw+u6hgXW4LqdjaxQKmL+8jY2ypdeITfGSdnfBSUW65z5WvlZp/HkoEIg1QH8u2eHZsotrRP9Dl3e39k3V/av7iSLAUKao17GHppY/rAahLVUkJds7OXRmKHZseedqLKiZAXa4p1uVZMoGBdD0+daNMl2of2Q7+UalovY5Zg8AjEBl6BzWA9DI0ofz3YsJjks/21DPnmqKRU+haFrLlNaXceYpW6rXABkMqwaVs/6/6VVpfqR27DtPB6bCrXl6RYpi/3dug667s5Hi0WEVIImluXGPY4X7O73k6oAzZ2LhpDRwGTe56dvxOzeMJDqpaIi41FO4XBjzEZhsIca93G/Oq9xHZx3iSYqxnrGe8fLv5NE2+VFsTkMGxUO8egv7P5f2e4FbKimKDZB46C5Sc3lMGKESqEslgGmuKYiHzi4p4f+fKq4Kbn8meW23JwKWTjYXF/NYJ87v5/y5qVgnz+YBMzThACucvjHaWDgWnJ0InOi0wH5hCqg3Ga/QSkW6XMvIvyChxly4PVreSouea6bXmFTFqhbs2whlptB20p4B0FrinW99tCx6b8NqY3oyVIuwX6FRbmPlvIrZSLO4+j+w+Kgc2NyOo7bLphuVv6H71yzoUCjIkO22c4uRy7vNRu0CU4SXZbIWADSGqzk1QBnhX/aaKDilP/DGcP3GijT504JSIefo31msN9IBchanHxJ7nkT8z4RQhFHVvqTiH/BPCnA7f6dUGR0ILik+TkMyImvPxQp8GmmHe/9MjNr/f63rFQmckeNsQ164VxQua9ugrVJ/4TWuaPzFv/hF4CCNQQSHW6T6VSyJPguxg3n/p2yXOrxAfuM/OmJ2O9VQwr0coAhqTBV91gUpHXfzu84YajCPtbM6yRsKmtWbbxWkm5bCsNDIvfhNcTY+x6lbdm/ZbKy7Ab0yn2HgVAeVRXUrjJ7FdAIUmEoVt0wRlqhboYScstr6mmvxD/pf+0E8Gl/A81bzJrtEoxkfyhI6c5wsPNB3qlkhdp5LhpzSE56d24gj8UqeDwin+0DXM7MwB/wWORupuD3NpqmW1rGGrTOsnrauE7mGoJe3Uk/G7RzxNCyCt7xr2sy8/nXaFuC1onRa7iLd5D7J2PSap26TsnzlkEvnY5XvbLRfqPJ4FLQjpY7CxGgL6RvAckjqa6A/0n8EAysxetJMA5Muydm9dNntVc7wMoA/wxOgpOm0/GJomF08512dy9/EcMp0X9vbYVjHQd+1psfdw3P1hBE6BbPL1+66qS/KfwbKcWx35FK9pKUB0ztoKddPERtxVFJ/C7ZA+jrqg7iSMqnYpbmtgDVZLGSevg0Z0MiowGsxIRD6EYQAzpxwBist6RNnhWrirqIGRdfZNz2d1BR9myZ1AQqXVA2acQDO8D67N1bURmx1y6qcdKWeEePkadBYvCMKXcC8h2GStEz6K37017OWxKzdvktiLZkV2ZpZxiw+Wa2keEFDej3O2j7/UcuNuJhUlykKMhq+BLsIn2ZiqWlkcVq1voE3MsBUzQV2ZtmtJT15i30/bl3YA8J+YUGH23kxx6AZBBWfhJTy7A849CLP2v4I9jirUkcqDl8wbx1ESN1nWQ8K2G490akC6ZkJMX3KebPqD5hYjPHhAuCi/YwXWB3qTB+Wz4cqfEUataHoVXT5fv6m5LJBjDEFGEMjg6Wd453dXLmET8CMvcEwS9JcdG43xup0bthKOAo/rxBSH6FcCzTyJrKIoL6BIJ08grHJ+vVQIGGrE8uWEKavwoO6BnW6vkwkY9/ktS3u+IDj34FZmSq+SIfAqavjqokFOz+UdXag8spKUB9VyuTOrKwFrOWBQZEJB+eCmuikXQ5Bupi9dbdWCh4x96BfMhUfs9mw2JBgDGCLcE3XhR8Dnp+ZbZy1cGJDI8ad54w89gXAoYVt/H+RoDXH8g6XOeTp9goZxZhoUrNlW2HyW7zWXHze4UYj0Kg7C0LFJbuPzTejrmJ9HHqlEenI/MvjToXs59XpgSkeHcoXrp7guVDBwElB/KOLuUQJmAS0QEj5cQE1eIrhaMAH6Mn4iMBZl7ojb+oBjHB27XhWjqmKFG5gynjPMY8Log3DWKWhXHNM6qkfPZZpIaSqB1YVpwfy1i/XyYG5LHKmSbw9efa9KUHMoms+Iqx+mT2v/2UQMyhpl4PZSfGZyQ76CpVBhjdAgiwrKSfKihOKH3lo9mTtX71DEsjZ6/0zfq8BjMYSHbO7fIJM2PO3waz3e9CGpO5k8ZrFQByWkFafFht2m6h/HqVnzLnvopF2DEutWkY5zeLgGmwIyGFEHbm7iZB/c+ss2Kt9N6HfE2QNo79/cRVXmU43/RzJAZkUKnV2NIVkpltWSexOlNqDjtzoxgXkhvbfSbllqaj7NvjuwDhybjk39NsdD/8JsFnGh6mZ6iPV0uplf3RKgNy+sjPpS5zwYYRPuUw3njJl+LT1/cIrjPGT9m3+HNNWxAfZ7Kjkc0S894giPXn/BIgEmNKmlrvv0dplqv3ms5rp5OU1CZ1UEkPInFvVrNcGXbkvLWSbQWc/BHaTHmeDHfU6+adjicpJbCVSUcBOm05JWCtgKSAAvy4yDSlnGEHQy64KL7aJXUckGLfFar8nOKu5eYTg5wI3vkNL/BkTxoEb030onXv4QCWyEtsaV0x0gYZBMw3aFKGBYfQRaRfmZ9vY+hjGyTRwIeglgW15TrxA1qj///ILq5BpeQesrrn8dlLZFqNmpk5yMMd1qoavS3PUAiC89kaSpp6TpXMTDvNMWci5X1w/R7CuhUwleLu+uyTN8Xe3rSBGuSM/rkCTgzcLzq+DZsBdd/NF+Yt2hiDMte5nfhhpUD/8lwakpniUdWJUyC/roCt1BW5iRWcrjRX96wwaRqK191BaPYoOeyrFO1unvRfbvHK7v+IL6tKT0buOCFyWfZDS/sTYChIIdqLxf6nthes4/8ZjYAHy+avo8j8D/hW7/NLwZ0K0DFzrkb6cx/ECat3rrSCTtJkRJDFYK5/ANUx0au90f5yLf4KrrgV9Ja+mfhJXyEiztXvsTd1Vsn5aKMsUV9721lP2KvCHAcYDscn4fKpx7rHiMluD4lI3cWccEr9iOHP+YwYR3cn96tUisPupuKb4rglwJJTMNmcXHM2orPXCz+G2BZcGe30WZRJ1SB+blFhJybvDypkJKKM+zHzL8+FGrqFdAzV86GIn5P7Qh5PjDgs90qN2R97+QR0VLV2zYEMzt2S4abW7Kr9G7Yl2PfPY3vRAo8WBet7OkvAZF/h1C2wWRHbUYcBn8/Hx55tBJQPA/FmXVkTUOT3cJ1Jx5CFbK3N+d2avOA1GikP1vruRCe09Qwno01psYoFss9reyAsPMrVX0xiMiJeFau6avIUti3aMChkoIdai2MWKn4h/D5oMKlX44jCBlVDBx+M2n+YJgEZSeunw4s9PEbrAf/pCoxG2sDoOHGSFUPy2zu47ShumUny2H/50J0wqJfUutf6X/zQyFfebj59zqh2KO1zaSthtlkKmTGE0yq+IpfG6pty/n1GN6DlpDH3vWGBCGUJ6Qxl2tdVFOm6+I6kbAFPVgnh0laNbHKM/3YH9SMuG54Hcu3vhhTnCUph40VpLfPLSVqS6AB6HukYSrYbBtZFnXHSuZd5GKB4Oh6XWyHSYDA2Mqh3D/Jd/WnCVMopJR7C/Kpzkt5erefEY3rJPcWjqQAmoKirRhOZlP36NhoOcv5/9FRBBk74gTR4VvBhynMkWyrf27hRFBS6v8ktEgAaZazkXnv6aQABAIPS6FC60Nfse5HWioBLB0ZUTP6h8g/3aZ21ah9ltfkp8jHV4FEahrz43z1nNQ6UdF0nHk1ay0q7RfN3/RT2t8KcOnuAzZ6PVm8q+kRydI0OlEh/ompx7DBNZ0ugH5W5I1GboN1LhYW/Ua7Fk9MF9dDW2N/fQAtfyq2FUravIsabYQWaokTM000o1AEDSbhdmrrXDMA4Leum7FzCy6vvnIvxtnio8piUd37eugJoAya5IMyNw27QhC1YNVK0o2xOBo5oTjOGIyw7a5nBjCBN8f99qnPqfWW/y776mtSnI1LwVK8XIzpd2cg78H/VlmW3K+GgO6OgBMwyzN0zMv2mUpAPZKtTr4AI4Qu3XZZeb7/QvJuW0q4/P7QymoKd9qVUQ8pnAv0/zL0/EIk6w87/+A92tp5KqVeON5eErOdHykalZHwCjHE09yJ5q2NPP83dzdABxwiNSIucJozb0wXDPAhP3uyJAiycLN+7pioMLOxNYIb7y6rf6b2XhgmHpGQ/eg2JwP5bsYwWDR3GOcZtw88pWrAjGkmGXYhYa1hxf4HxODEjxMq94tI1ARES4gWgH3iznLbYCVE/Afwfes8l/oOnS0Q2SWfjRiSnWThK1ny/EsaVIpk7aAaJ0sS2hqgmPIWZU3GWvGQ08+OeW1FalgjkSn1qsFw2BT0C7r6r3DCQ250rjgfsMVQJxDty5KBd5G1jHAHfFGB8u62fX8B/4moJD/pa7d4w7Kl28ypFrafyOPY2j9c8PtckeA7C+HnWb3JI5UaiqtL+6GYkIGTD7jKc50MfsonEZlrebccEYodSOo7FOgxNp+nu91fpYAKta4r7fSvtiSHGXfXVcy1Pa0sUsR8Pm1e44SnIdlyTN1XXAHMf/Y73oeueM9b0CZk40LIV+uIiUCudlumN2hFn/HjiAZVNzoTcrDccRqAhGELHyUajQi5wCmNUnNQgre7A/hwW5ChFBKJOUpjj9smsBhABzqc3cPU5rc8RNAs4QmvLghFLPxvjEOI+MeB+ZSO8Z1Am1b3+s+lXEhi7OHX25J3EzWgksw/NOlLoTuoorkKN+EMgXwU4dz1scyLDiun4RF35PPfEA5D6b078uNz8tlxPGsZHQK5diiC5FTQpCLoVQ0kxibCCrtLsJGWJGsA0museTznD++ywUd7bGdYgC9UMz+xJahND3t2SIk/W39FEF3v7hwjbyLex+tdhcpW8mgc9GuPL0caoKAsLzLE480/+YmFj2geih85DvTeDXEmyWHoErl07REl3i1bLnptIDbtvyFt9KUpTm8gPv6DmDm1hBZSpPXPoho6u/zlxHIqvw3dnbevrdHEGHcB9iBLI17t+z9Y27spylaNfPA2Ad+rXH9PDaNS2u8JN0ErZWy8n8SPXLVCwkQlK0mxkon7/SqhHlUjEhcDdZ6knYYkyVSn/+3l5F/6miEMpVPk9pQ7IMQGNxO95Zg1pESYBj7keugDAK6+8OuFqPtL/69In0sYoDy1wr2G2jg0s8jfUmWaHv8pfapyKQIVLv2QreKNBucb79B8PxkXflDVH0vy+mpiaRgFyppOEJyoKX8z3zGBoDuFhv/YHqS6akcyazUPrH8JXrDfUhUPVgItAv+pkrkP0zgpvXEED25Dxuta3kKnhisPx7qOWa+qYdaEEwPglvVFwTJfs8OHnELCIn+K4SEImVA3z6bgoomxGH6FciP+lay6jtjnZgmYSv37MdaiUNb+yEIWOnIoacL4fpywwH1TSBuwR6wTWPolQQoCCuTdEnxCt0Gc6P1Cpv86rTNasCVIDJiEgQiITPk4zbocFzoqYOChBfvbioesVH6qyzWEW+yYbmHbNpKTpLLmsFP5e28Nx9n4LZcH0dyXbJ62K4KuYMZ9rcb1rsalb5FGGefx1FZu5NWP1enwG8l4AjVjKHP1g/KwcvxAwuw9qCzGIfY082CJqbx5GqbPbyI28666KBY2KkGqdHIy05J/4EANexdg8SpMCoyZ0GC0xasGzshRUS5otHJGnAk0zrxWUFWcYGCBJjkTX2kzzQZMg3tbl7InppVuR5i9oVb5YEWpI5KdavKdzC4uo3eT3ZoJU9FdcXeC1/8Oa9sR/UioTQ4YJVZxS992j1WPV3FmcTbXDd6qb56l4U1ZRuqQ5TfSYasFy36rKD5eeKW1Lc47wE+hjxEcBQYrIjOK/IzwtXCJfNNUqUBomapcvJbc4P9AGgo0VDB85fxxqiTbeb6H7i8+MrMDJfc+hUe+MUWqtEMnR5vk2osFSHnbJNycghNMjxn9uG62b9rJXORz2Y87EEdSYZP5yW+JZm3m2qUmEr2mQkkfJ9iwVVRAo/vK+CTKrmf9iFHEJCPvvacFoAGnvYrayYmcJRD5juuvttWyCtJ1j79XKu2CRKFGtfx3DGe4dzr5ts9JtSK7WB8gl7ny43iGgEALA4BGsMOFeDvnHYcG/ldeuD5OdE47PVY8gG6TqGhCwY5XbEmqWDh+MMuaLQQK3XR92PDOhJgq6Rib6JPkOr0I+7oJvhbHTWZfV8NN4uXbfM3xGpzglmAqL6S7CRt6TmqnoonYpjf7FOv145O72tSmhZZIngS65kvI7sr43FJft8myLMXaWTm9bFHCWoeetUpUTdlD+HJ3FOVP6ELjYSfDo2kKrlHkDFadov569L3sD3SVPdwSxybrXKc+yXPwU++p+VuzcbyjnYGzNDk3+dleAjgYuiPE+bZKwoRuDYT9yg9Vges4cJNjct3b+WjRpuz4Po9QTgfQbGnCcszTwbtSeUpMEwQcCi9tkeXnip5q67jlzZ7ZTsPp5DB2chrd8YqjlCG9HxIuN3wFXMc92XxCrtV+4t4CHyY28nRClq8iVqcqlQs2VHrPMVJ3pXtAvdzPHKgN7RJL9c66Sn/t0q8J0XczwcT5cKdqB+9X5BYeTzVAUXQYPBVnzhQRmslhAJ7JoiJWve+Cd2L4bDkMYAn/uAjexzaPvEg8pfp5mJTvMi5+By6NiCm0iDfrXZq95MiH5Jf4vGIrqpGs9MGIjKZl6cgvKHci0s3VkfpJZBzo+NDgWOnnr20f+8Aq6+sLlOzhdEti8ibfym80C0ql1BoX0KHfKHct4/tvLC25BRUOzyW7UBdHbKZKcWUbP+S/142uHUAOOXNKdiLFFX2OaVAd/i3xCayjQmRjb0Bo1Wrr/aDjRez/OEBaw+SGSUevcW4aCDt5lPYsmXnTy6+z+d3qNrqYtS55VQE2KMIreZttsDTzh1iA1BRkW3Wd1ejy65bVPrdqM/25JiS0djxQX1D8GY4fgx1yd+K5d3AozEEA7lXD0r0L4UsixgEGFxCxDvgAwrcPsnmjBe9PQ/p6ofsLZF7fM85Y1A7I07vVNKP7FOh+Ou2n6PjMSQK2mSdnzXxKeJrrFbPzapgpsRqRaSCfDMQbV+6RH5k5lO9SfGRqPaLn6dYB7OXBjyoGPqNdLN3s+8kh2VTNacXbsVNfCCKmOQkEueOixCslFrqOsbsjNZFxbdeEkFWRZ2LNjtwEmPErHaVNeDsCGjUKZnluzjkk4xb7J6C/s2OEbunLZaGilWeukndLODJe6GaNf2pcC6yMdPku/iwaeap5oweRuu81TM+jGuTBDE6gO6uDPIQmCUHW6gWw+DOYQrzXE+U3dVydZtOu4dkD/lfOLwVAsSVxGFDVlCfd7kNjaVRlhGfCqqxhnrMBfy5Wpn+LojLInar4h2oA/IYiT1Gi405LjeanmQLJauXXRxgIuMBKofYnWmeClGsydnK6zqeLYflQtTC7GAf+nsWc4qr8h/aBrLfBsT2UksmTlIu922Y2cQ1UXMbkKVXz2vB8nK63bi7rD1p3YY5LADkktsT16FN/ZHctf/KHqGQ6um7tnA+/bbA8YtPE1v+H0qrO7slmsE3h9jJyxYhm96V1+DMedgI1ucpGYN01qtlL4JtXkgKy4WD2DROUgYR6uh0GVIJ8PaEfJGxqB70jCToKlCV8RwyTqdkSlgOlbnp592ke4plLGwKpiQmvW1rSAxuY5C9YAezd9flpBzBrS6zvcgf/mR50GzVqF7O7MCmCWOl9jW6UtXRJTl+YWGHy2OyOYvTff1lhldeS7FIt//8hniTV6WGntQMMhp9eq1JuTbARxK742FfaxzcSMoSiR/QZOag2rjpKmii6k5mqwozkxg78/l/5NuM+KbiOLPuHpzX2QYQhryRAMQwy5HL4T6ouEgvVjqB0p2oiNgUczKnI4LxQOtn2f6P5zZtjarbckUZ7lNQOGm3OSD5uLG6NDPKQgch29LC169eu7T3XvXJ5vgeMgBNHKJZRAiKz5ZCPEeW6SGk/RJfQl2uFSkjcNE1EvnjDq/YEtSbOzfmpOxJp7WYxO8k5Cjldb40qtZb0rVyyEASMP4UYA2s84R0Cy0vfLkEJ0OwgiuSmrdPQpPp+3GJyyGwrxPlhcMUlrDvZ6xNwzvRHNvsu81ms7ddNj29uYZF+PfEAXQtpGPjB+yyGJMe8aWm05F4UMeoM6ocTMEoYN3vJoLpeUG9hsvDsLvNzZQ4m07buufWJ/W1e94z2F29PYDOZZIsyH3BQqlnpZZT3uxo1ZJ7fYinoTurKrbDA4doF7fmFl0DmPKlFQd9e/Yiwlyiwv6FDJcPHBaoE9SXJ43SfvFGKYLtRIQ3tDlgyyYy8SOlA5TCCK5dkDQZsMaFgA4O7cpwjMz9KBY6NnpvtuGWrckOOm6i7+B/whPYwA8ZmuwYRlGCf71YCBeyADZjygvjfdg8nUPaw2zfusWXcxMdIDHzRQbFXlPuZcGpK1AO/l8jl1I17gy4zJaf0sJrjP/Hvtwn9OqKMWRmHGifNQVf5w4GbT8925pszNxYnNDRWhue6BQ6X73MrVIAPO8vKJdVUmbuVI6QujysFWISHL5+dbyZm2aNKPbJMRGmRs3u9YgMDG7JQKINRIgGGXZl+BAmzG6kcm4FBYdSyewvdj9fX41H+Nm9BX4A7riTDuCJboe10RBaxoM0etiI0yfzot4RaYeWeXYdZXPJSNjIrE9TDqBTigvQ/eUw05qksBIDu6+9JzHNP8SDgWOdibGTIglBbhYYjwDB3X9XYVJp4fNAOnN5eZz0fdVTWvNFDWRhFb9Wqwismu6h0azL/faGEXZUt1FFq7P/lppH80yBAKh5hJrgMgx+R4LnD3Y6XoXzQFNXpKtl+DWSVeCWvFI1vFE1CncwEfQUZsJm+d6jrH4I44YYicnD/daDL0V9RDI3loGvpoR/b6hA8Z8T8XFbR2YXXr8ZrnEM7ekQHkKvXFz8etO+mFu3zkASP6bmrkbh3LUK2jorHZkKoAikM+oQJZwDFWVVFWoT2fqAUwBg2tgUffoqQztOMVHxhIDt0pXN2E0rMm0KkO76mEcD0ZFJYxgYAlndDFucZ1gYda8QTiIIbbMCR+Yk69ZWbrR8QLSm5r+nzt7QND3bAH8fOBN6BMjfQErXd0Rp1EAKLr7r7uMR/T3XP+moQ2dXIXTyP3abbq/a5jQqrlt0OKixkqPInZjtbBkK0RheaLBGIG5z8KvDZhESAkCq8EyPjMe+0Z+EwoxUmXn396lhJ5gDNYJH9o7ThPtDjgGFItpXjXDH69spyq7KO9wcnOF/4cyVB6CGTcetk6/AGgUFAg5FwLB2jr3kdvZ5JLwamANb0xm4+0g2rTR7yg0Uvl0BwixQpp2PW3rdXt2UYc1CLPBh5RgxRPjS16D2BQXhnAluBFNbvnxE8kgXbVvKQqECvt4xsPu7C09/Zzgxs6bDrR14DgftaIjXV4jUmU1q7/T5srUiRFnqosESgNrvUViLIKUrGA4bBS3AKUlHCsaiFEgZkUtHLl8rb+UoLVmpx9Hv+HhOBDqgjmSnqt9kd9c5a1r8KGPlYMdDM4MhnVNXjgAeN2cnicn4Mi0AmqCXxM0DgQYsVAFEXOQJyh5KB5NiD6x2M2xdeYHbekL29RrX4TK+k9AjqT4hcDujArp1ny8S2iq5za+YwUyOyNWJlKCf/IGm4605NbPM2dzNCADaHI0jkqcswLN++LKpp14xxm2YWQTAFTscJUxmrlth14Z3bRxqbt/66929vT5mbAkenfKkyyJgHkIA8WzfYxMukW4+fK1KYZqNX43zG7IcnlcXRU5j+mcTGUcwJVvgSSYxfrFe6qoDngw5JhqZqhCBvyUPjAM/Mzfu2Vi/+tOGcpXkhljAPz8PvOZGz1V7KuA35X7R0gNZzqxgA3WmlOAG6BJPUbMDx2ii/UUf/QyS9zMKo68y8BRQCtOcRXuVMo4tPck276aNHQlpl3Kq3NUZjAFwHHtHOMF6mLdiYgvapGdO/MZqWwNtFc4cgR6hIdGZF8utiB4u5PKo36xvwK84dY4WhpwEXTaO9KJpXSmB5MII+1lOxNSSsEeh4dF+74z6ZGE0omndw4EaWFoealses4Zdktpc0AiyqFk6IfkuCQQ0yaCwMP1noNPiqcCne49/oq/X6J2tG3Z65415oJ5I3ENd9zOCymKZhuwXzPdjH4BXFTvfFrH/q+ITR+y/V4l28j3jHu5MaZRERPxl7atVu8t3N4gehOd3Bu0dRBpzOaq7rjQHxffwJEUK/CpWgwtXBbXhus9T9CTj9MpgiaYRcvPvdiQ1W7EYAOy5b01Rb3dsbyWWUZtqffp+Oed/ujIqeO4+RYEx3Pgci3urPRbK7C91HMtsUGVyF/Y5+1Vj7JOWNCYxtJ4PGtPotlYCBZG+xvpGoDU7QfMy0xe97bN7VEH0kRviv007Ck7Xy+llylNIKkDD8LD2Qa1g0o1tlzkjhwQJJDVYnLnOYWYaQooIp7ppUBp3mhv2kgz5Y72/yrue39EIPgU8dHRletJ9OCLh2N9t1ppGOZ1soWzH5HA1ALbkFeDjx1KkefpS3ILjXT0dvL3tbI1+cHmn0ENWi5Gmv2KXadcazbZSX8WUKZMqiiZ1Ek/QhspcXDXI4+xLZADwVyGGvJ1XzDNxD9wjQDug/WpPSz0Gwa41LHUDpKU2nmJWTdfO5jyRwY2xuH8NA6kW0sq27nO9Vi4Aswr+14z6dcPzSMpx5wo1lflNwXRGu966cNGhagwfhhxd1d/UAQrUVjnF26Ab4vghfPn8LgzdE5740kr8OwEr8ijpFH+DfetFec9O6O/YHBhIBxaliw2seWcLm1trgZ8iynyznrnZs1XZEYj8b9Ayg7HRpz3xiJL1YJbuyfCfmvI5ou8Y/HCAlIbtAXxU5X0ulOcOcU6ThsoJM8oJgU2t3Cn9AKviOvcQELGI/zGGS2rW9hcbaes4MYSQcwbvvPIvUshf1cMhV8Lw0GtfP8yg606z+8p//kequSkvMgURT7kZGb2MGWZMzsiXgnEaZt29iCdcPhyHeXRdf/M2RtjT0CX+BCYzYAocTq3jK7YxuEhOGrwUf9RewgsPIswSNsYs5Ql18TlTKDbNIdKAlNj9VnZY/u1KGnBBt8x+RzAuZqvzNltQiPjnb2PNmdtwUYv13lRFc7NRXqB1GXndUkcRlWMljq9AnnENlFMYnjrVT1kulpsErKOwSaCHSU6afLWr/azCSOpcfDuaeJN4vKAOCvFQB/JfnZicSI7Koj1SfoRp8gtKGROrt0d+fEYyrNxkHZ9sHYkrwT1ITTqQhDGfWkzfLhKP5YH1n66IBzPyi3HwSuE+ctqzreCrcn47pSKPSUbwOWJMMX35Ps8jpC+JHohBBY61zjWp2iVi29TL5USt9h91Lbm0Ite3iQwB1+OU+YlmSijFKNd6HpahiQnTQ76vTkYNWSBCgvckgSDuz6pvbWzSheTFIu51m+q9RMlRTjA2ikpoAecUXhZvKa098fza7HJMrsc5hTXfY6PKksiHiqfY+hDLWDFf1hQytDLqtm6cf3isNEwpGAIQEhRIy8zZ6Jv3qpkX2alhN4avC1vfOeqHkP2pGqB2K3l7MAuaZYT//WGmxhqg+emkAKJbt8iK1PN2uAG2T52AtI4Hx5XeSJsmf4SoRzdf1g5IXXvchQJVdQwYV2BaRjfU4ksfD6vNfUhVli6gZeOTsbl9rc9G1Crh21gh+q+z7jLu1agBQI3n8/d0ozuLb4LW3uDCsFDHOEk4Sa/gjmVnJF0hdNZrnsdYa9Dhc6EF2ptBdwZuOaETpaQ3zOQuh9yNqpOs8UVFGD4MyYlY7nztitXc+7CrmmKoPnS2ejpKNPopzwIkjL836EyUkIAeQJpkjCTpe3CRxTzKLjVXstCtrYi8tQQKYKeS+gUkyorb2aE0B4u8UBqXZWChBqgGD5+Eag8ojQymHEX9rHw8kBg8y5ps8aRWXQn6GmmoVPhMi/lthIqUvKcqygq8WOSLw1jP/lEu+5fLS+rpuRZq06LWKVqiDJie1TziJwmmN+zs71v+Gr6fZVpEILGjuUessJbQ+MyX5pBcDKnjQseMFtNsR1bzuZUQ2tNWTT9UkvAelaz/7xk8pvZrN4rzFzxgn7gXafhIxNKeCCFKcUHt5MjdQ8zW0eQMc+qOAuuvbMEtPIsnzvouBM2Do0PkGHQCtwPAQW5wOZ7Odlc0aSv7IjFTmYlicXmk2a94+4asJXl3c3ET7fnq2BKoNJVAopUsbj2EqjOczLObmtPhIWgkYT9HaxlyoZKtMWhKx8TBOs0Ku4iFX72CX75a7xDupy0ar3CeyNp3zlTLb3D4Cuoth91ctuwMoAGvCRuSj+HIuyiFUm7d1o9AJsiVGCobIve6x0YM8cYIehjqQ6QuxU8Sej6OP+L/yjD/jZ085wvkeJ08Wql0G0HWXQmsaCHHQ44iqipa3ntwMDptrLBhV3Qvb0dckMe+ZcXRQATiA7z5PsnphNa1d5PlujSBP1X4w6WSaHLigFoNQxVWZWYh6q08HyWOjZChjoPuRoOl3giTPXYKTad2a6+tCqfSS25tPBkl5FjC/EdleOUiM/fav2l7gc1wjmseXGZi5sfIXtcIosgQp1vL2Qs3CEASmp7ymasYiqjpwUmSKKpiCaz9JGNf+xuxzWY4JPs+9C/e8+U0aqFSwKh6AKJ2FKLWi2xy3HEHsgAgxcJE9vHkA+UZM/ata3PkF+XuDHwUUFdZIiiV5JeZU4U4sFFBLWwf43KWSrujirsJ+HInfZ1u8x86/fGJ9dsS/KcdB00ij1vU0OUlhwAa5lNxj/Av4caIaqiuhXNSmhe5UPT5yFY431aqtzr5hhN4T/1/rGEVkdSTQkaXrthcc7bkMoHhKJzx4VOuldOWep4flfoGQk4lFJMLC8fSVwjJ4gpvA4pbF5iliRsj4nL0dFvZm4aMnEUaJtT11fZGn4k98vS40HGyAPrtuon0e5Lmr+V8W/1VYuEpksR506ItkTz1s4yiu1MMOIYYJ2QY9NCfM9/mW6O9yLo4Tzs4V3oLTzvRDw6ZVVO7kBpHs/6TDgAR0c=");

/*
var fu=function(a,e){return new Promise((function(c,s){
"use strict";
var r=null,b=null,k=65280,t=16711935,n=16711680,i=65280,h=255,o=3145728,f=1792,u=Math,_RGBtoYUV=function(a){var e=(16711680&a)>>16,c=(65280&a)>>8,s=255&a;
return((.299*e+.587*c+.114*s|0)<<16)+(
    (-.169*e-.331*c+.5*s+128|0)<<8)+(
    .5*e-.419*c-.081*s+128|0)},_Diff=function(a,e){
    var c=_RGBtoYUV(a),s=_RGBtoYUV(e);return u.abs((c&n)-(s&n))>o||u.abs((c&i)-(s&i))>f||u.abs((c&h)-(s&h))>6},_Interp1=function(a,e,c){
    e!==c?(b[a]=(3*(e&k)+(c&k)>>2&k)+(3*(e&t)+(c&t)>>2&t),b[a]|=4278190080&e):b[a]=e},_Interp2=function(a,e,c,s){
    b[a]=(((e&k)<<1)+(c&k)+(s&k)>>2&k)+(((e&t)<<1)+(c&t)+(s&t)>>2&t),b[a]|=4278190080&e},_Interp3=function(a,e,c){
    e!==c?(b[a]=(7*(e&k)+(c&k)>>3&k)+(7*(e&t)+(c&t)>>3&t),b[a]|=4278190080&e):b[a]=e},_Interp4=function(a,e,c,s){
    b[a]=(((e&k)<<1)+7*(c&k)+7*(s&k)>>4&k)+(((e&t)<<1)+7*(c&t)+7*(s&t)>>4&t),b[a]|=4278190080&e},_Interp5=function(a,e,c){
    e!==c?(b[a]=((e&k)+(c&k)>>1&k)+((e&t)+(c&t)>>1&t),b[a]|=4278190080&e):b[a]=e},_Interp6=function(a,e,c,s){
    b[a]=(5*(e&k)+((c&k)<<1)+(s&k)>>3&k)+(5*(e&t)+((c&t)<<1)+(s&t)>>3&t),b[a]|=4278190080&e},_Interp7=function(a,e,c,s){
    b[a]=(6*(e&k)+(c&k)+(s&k)>>3&k)+(6*(e&t)+(c&t)+(s&t)>>3&t),b[a]|=4278190080&e},_Interp8=function(a,e,c){
    e!==c?(b[a]=(5*(e&k)+3*(c&k)>>3&k)+(5*(e&t)+3*(c&t)>>3&t),b[a]|=4278190080&e):b[a]=e},_Interp9=function(a,e,c,s){
    b[a]=(((e&k)<<1)+3*(c&k)+3*(s&k)>>3&k)+(((e&t)<<1)+3*(c&t)+3*(s&t)>>3&t),b[a]|=4278190080&e},getVendorAttribute=function(a,e){var c=e.charAt(0).toUpperCase()+e.substr(1);return a[e]||a["ms"+c]||a["moz"+c]||a["webkit"+c]||a["o"+c]},hq2x=function(a,e){var c,s,k,t,i,h,o,f=[],
    g=a<<1,d=0,w=0,v=_Diff,l=u,m=_RGBtoYUV,D=_Interp1,I=_Interp2,C=_Interp6,x=_Interp7,y=_Interp9,E=r,H=b,M=n;
    for(s=0;s<e;s++){for(t=s>0?-a:0,i=s<e-1?a:0,c=0;c<a;c++){f[2]=E[w+t],f[5]=E[w],f[8]=E[w+i],c>0?(f[1]=E[w+t-1],f[4]=E[w-1],f[7]=E[w+i-1]):(f[1]=f[2],f[4]=f[5],f[7]=f[8]),c<a-1?(f[3]=E[w+t+1],f[6]=E[w+1],f[9]=E[w+i+1]):(f[3]=f[2],f[6]=f[5],f[9]=f[8]);var O=0,p=1;
    for(h=m(f[5]),k=1;k<10;k++)5!==k&&(f[k]!==f[5]&&(o=m(f[k]),(l.abs((h&M)-(o&M))>3145728||l.abs((65280&h)-(65280&o))>1792||l.abs((255&h)-(255&o))>6)&&(O|=p)),p<<=1);switch(O){case 0:case 1:case 4:case 32:case 128:case 5:case 132:case 160:case 33:case 129:case 36:case 133:case 164:case 161:case 37:case 165:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[6],f[8]);break;case 2:case 34:case 130:case 162:I(d,f[5],f[1],f[4]),I(d+1,f[5],f[3],f[6]),I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[6],f[8]);break;case 16:case 17:case 48:case 49:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[3],f[2]),I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[9],f[8]);break;case 64:case 65:case 68:case 69:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[7],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 8:case 12:case 136:case 140:I(d,f[5],f[1],f[2]),I(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[7],f[8]),I(d+g+1,f[5],f[6],f[8]);break;case 3:case 35:case 131:case 163:D(d,f[5],f[4]),I(d+1,f[5],f[3],f[6]),I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[6],f[8]);break;case 6:case 38:case 134:case 166:I(d,f[5],f[1],f[4]),D(d+1,f[5],f[6]),I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[6],f[8]);break;case 20:case 21:case 52:case 53:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[9],f[8]);break;case 144:case 145:case 176:case 177:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[3],f[2]),I(d+g,f[5],f[8],f[4]),D(d+g+1,f[5],f[8]);break;case 192:case 193:case 196:case 197:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[7],f[4]),D(d+g+1,f[5],f[6]);break;case 96:case 97:case 100:case 101:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 40:case 44:case 168:case 172:I(d,f[5],f[1],f[2]),I(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[8]),I(d+g+1,f[5],f[6],f[8]);break;case 9:case 13:case 137:case 141:D(d,f[5],f[2]),I(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[7],f[8]),I(d+g+1,f[5],f[6],f[8]);break;case 18:case 50:I(d,f[5],f[1],f[4]),v(f[2],f[6])?D(d+1,f[5],f[3]):I(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[9],f[8]);break;case 80:case 81:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[3],f[2]),I(d+g,f[5],f[7],f[4]),v(f[6],f[8])?D(d+g+1,f[5],f[9]):I(d+g+1,f[5],f[6],f[8]);break;case 72:case 76:I(d,f[5],f[1],f[2]),I(d+1,f[5],f[2],f[6]),v(f[8],f[4])?D(d+g,f[5],f[7]):I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 10:case 138:v(f[4],f[2])?D(d,f[5],f[4]):I(d,f[5],f[4],f[2]),I(d+1,f[5],f[3],f[6]),I(d+g,f[5],f[7],f[8]),I(d+g+1,f[5],f[6],f[8]);break;case 66:I(d,f[5],f[1],f[4]),I(d+1,f[5],f[3],f[6]),I(d+g,f[5],f[7],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 24:I(d,f[5],f[1],f[2]),I(d+1,f[5],f[3],f[2]),I(d+g,f[5],f[7],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 7:case 39:case 135:case 167:D(d,f[5],f[4]),D(d+1,f[5],f[6]),I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[6],f[8]);break;case 148:case 149:case 180:case 181:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),I(d+g,f[5],f[8],f[4]),D(d+g+1,f[5],f[8]);break;case 224:case 228:case 225:case 229:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[4]),D(d+g+1,f[5],f[6]);break;case 41:case 169:case 45:case 173:D(d,f[5],f[2]),I(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[8]),I(d+g+1,f[5],f[6],f[8]);break;case 22:case 54:I(d,f[5],f[1],f[4]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[9],f[8]);break;case 208:case 209:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[3],f[2]),I(d+g,f[5],f[7],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 104:case 108:I(d,f[5],f[1],f[2]),I(d+1,f[5],f[2],f[6]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 11:case 139:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[3],f[6]),I(d+g,f[5],f[7],f[8]),I(d+g+1,f[5],f[6],f[8]);break;case 19:case 51:v(f[2],f[6])?(D(d,f[5],f[4]),D(d+1,f[5],f[3])):(C(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[6])),I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[9],f[8]);break;case 146:case 178:I(d,f[5],f[1],f[4]),v(f[2],f[6])?(D(d+1,f[5],f[3]),D(d+g+1,f[5],f[8])):(y(d+1,f[5],f[2],f[6]),C(d+g+1,f[5],f[6],f[8])),I(d+g,f[5],f[8],f[4]);break;case 84:case 85:I(d,f[5],f[4],f[2]),v(f[6],f[8])?(D(d+1,f[5],f[2]),D(d+g+1,f[5],f[9])):(C(d+1,f[5],f[6],f[2]),y(d+g+1,f[5],f[6],f[8])),I(d+g,f[5],f[7],f[4]);break;case 112:case 113:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[3],f[2]),v(f[6],f[8])?(D(d+g,f[5],f[4]),D(d+g+1,f[5],f[9])):(C(d+g,f[5],f[8],f[4]),y(d+g+1,f[5],f[6],f[8]));break;case 200:case 204:I(d,f[5],f[1],f[2]),I(d+1,f[5],f[2],f[6]),v(f[8],f[4])?(D(d+g,f[5],f[7]),D(d+g+1,f[5],f[6])):(y(d+g,f[5],f[8],f[4]),C(d+g+1,f[5],f[8],f[6]));break;case 73:case 77:v(f[8],f[4])?(D(d,f[5],f[2]),D(d+g,f[5],f[7])):(C(d,f[5],f[4],f[2]),y(d+g,f[5],f[8],f[4])),I(d+1,f[5],f[2],f[6]),I(d+g+1,f[5],f[9],f[6]);break;case 42:case 170:v(f[4],f[2])?(D(d,f[5],f[4]),D(d+g,f[5],f[8])):(y(d,f[5],f[4],f[2]),C(d+g,f[5],f[4],f[8])),I(d+1,f[5],f[3],f[6]),I(d+g+1,f[5],f[6],f[8]);break;case 14:case 142:v(f[4],f[2])?(D(d,f[5],f[4]),D(d+1,f[5],f[6])):(y(d,f[5],f[4],f[2]),C(d+1,f[5],f[2],f[6])),I(d+g,f[5],f[7],f[8]),I(d+g+1,f[5],f[6],f[8]);break;case 67:D(d,f[5],f[4]),I(d+1,f[5],f[3],f[6]),I(d+g,f[5],f[7],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 70:I(d,f[5],f[1],f[4]),D(d+1,f[5],f[6]),I(d+g,f[5],f[7],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 28:I(d,f[5],f[1],f[2]),D(d+1,f[5],f[2]),I(d+g,f[5],f[7],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 152:I(d,f[5],f[1],f[2]),I(d+1,f[5],f[3],f[2]),I(d+g,f[5],f[7],f[8]),D(d+g+1,f[5],f[8]);break;case 194:I(d,f[5],f[1],f[4]),I(d+1,f[5],f[3],f[6]),I(d+g,f[5],f[7],f[4]),D(d+g+1,f[5],f[6]);break;case 98:I(d,f[5],f[1],f[4]),I(d+1,f[5],f[3],f[6]),D(d+g,f[5],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 56:I(d,f[5],f[1],f[2]),I(d+1,f[5],f[3],f[2]),D(d+g,f[5],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 25:D(d,f[5],f[2]),I(d+1,f[5],f[3],f[2]),I(d+g,f[5],f[7],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 26:case 31:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[7],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 82:case 214:I(d,f[5],f[1],f[4]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[7],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 88:case 248:I(d,f[5],f[1],f[2]),I(d+1,f[5],f[3],f[2]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 74:case 107:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[3],f[6]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 27:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[3]),I(d+g,f[5],f[7],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 86:I(d,f[5],f[1],f[4]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[7],f[4]),D(d+g+1,f[5],f[9]);break;case 216:I(d,f[5],f[1],f[2]),I(d+1,f[5],f[3],f[2]),D(d+g,f[5],f[7]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 106:D(d,f[5],f[4]),I(d+1,f[5],f[3],f[6]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 30:D(d,f[5],f[4]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[7],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 210:I(d,f[5],f[1],f[4]),D(d+1,f[5],f[3]),I(d+g,f[5],f[7],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 120:I(d,f[5],f[1],f[2]),I(d+1,f[5],f[3],f[2]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),D(d+g+1,f[5],f[9]);break;case 75:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[3],f[6]),D(d+g,f[5],f[7]),I(d+g+1,f[5],f[9],f[6]);break;case 29:D(d,f[5],f[2]),D(d+1,f[5],f[2]),I(d+g,f[5],f[7],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 198:I(d,f[5],f[1],f[4]),D(d+1,f[5],f[6]),I(d+g,f[5],f[7],f[4]),D(d+g+1,f[5],f[6]);break;case 184:I(d,f[5],f[1],f[2]),I(d+1,f[5],f[3],f[2]),D(d+g,f[5],f[8]),D(d+g+1,f[5],f[8]);break;case 99:D(d,f[5],f[4]),I(d+1,f[5],f[3],f[6]),D(d+g,f[5],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 57:D(d,f[5],f[2]),I(d+1,f[5],f[3],f[2]),D(d+g,f[5],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 71:D(d,f[5],f[4]),D(d+1,f[5],f[6]),I(d+g,f[5],f[7],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 156:I(d,f[5],f[1],f[2]),D(d+1,f[5],f[2]),I(d+g,f[5],f[7],f[8]),D(d+g+1,f[5],f[8]);break;case 226:I(d,f[5],f[1],f[4]),I(d+1,f[5],f[3],f[6]),D(d+g,f[5],f[4]),D(d+g+1,f[5],f[6]);break;case 60:I(d,f[5],f[1],f[2]),D(d+1,f[5],f[2]),D(d+g,f[5],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 195:D(d,f[5],f[4]),I(d+1,f[5],f[3],f[6]),I(d+g,f[5],f[7],f[4]),D(d+g+1,f[5],f[6]);break;case 102:I(d,f[5],f[1],f[4]),D(d+1,f[5],f[6]),D(d+g,f[5],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 153:D(d,f[5],f[2]),I(d+1,f[5],f[3],f[2]),I(d+g,f[5],f[7],f[8]),D(d+g+1,f[5],f[8]);break;case 58:v(f[4],f[2])?D(d,f[5],f[4]):x(d,f[5],f[4],f[2]),v(f[2],f[6])?D(d+1,f[5],f[3]):x(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 83:D(d,f[5],f[4]),v(f[2],f[6])?D(d+1,f[5],f[3]):x(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[7],f[4]),v(f[6],f[8])?D(d+g+1,f[5],f[9]):x(d+g+1,f[5],f[6],f[8]);break;case 92:I(d,f[5],f[1],f[2]),D(d+1,f[5],f[2]),v(f[8],f[4])?D(d+g,f[5],f[7]):x(d+g,f[5],f[8],f[4]),v(f[6],f[8])?D(d+g+1,f[5],f[9]):x(d+g+1,f[5],f[6],f[8]);break;case 202:v(f[4],f[2])?D(d,f[5],f[4]):x(d,f[5],f[4],f[2]),I(d+1,f[5],f[3],f[6]),v(f[8],f[4])?D(d+g,f[5],f[7]):x(d+g,f[5],f[8],f[4]),D(d+g+1,f[5],f[6]);break;case 78:v(f[4],f[2])?D(d,f[5],f[4]):x(d,f[5],f[4],f[2]),D(d+1,f[5],f[6]),v(f[8],f[4])?D(d+g,f[5],f[7]):x(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 154:v(f[4],f[2])?D(d,f[5],f[4]):x(d,f[5],f[4],f[2]),v(f[2],f[6])?D(d+1,f[5],f[3]):x(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[7],f[8]),D(d+g+1,f[5],f[8]);break;case 114:I(d,f[5],f[1],f[4]),v(f[2],f[6])?D(d+1,f[5],f[3]):x(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[4]),v(f[6],f[8])?D(d+g+1,f[5],f[9]):x(d+g+1,f[5],f[6],f[8]);break;case 89:D(d,f[5],f[2]),I(d+1,f[5],f[3],f[2]),v(f[8],f[4])?D(d+g,f[5],f[7]):x(d+g,f[5],f[8],f[4]),v(f[6],f[8])?D(d+g+1,f[5],f[9]):x(d+g+1,f[5],f[6],f[8]);break;case 90:v(f[4],f[2])?D(d,f[5],f[4]):x(d,f[5],f[4],f[2]),v(f[2],f[6])?D(d+1,f[5],f[3]):x(d+1,f[5],f[2],f[6]),v(f[8],f[4])?D(d+g,f[5],f[7]):x(d+g,f[5],f[8],f[4]),v(f[6],f[8])?D(d+g+1,f[5],f[9]):x(d+g+1,f[5],f[6],f[8]);break;case 55:case 23:v(f[2],f[6])?(D(d,f[5],f[4]),H[d+1]=f[5]):(C(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[6])),I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[9],f[8]);break;case 182:case 150:I(d,f[5],f[1],f[4]),v(f[2],f[6])?(H[d+1]=f[5],D(d+g+1,f[5],f[8])):(y(d+1,f[5],f[2],f[6]),C(d+g+1,f[5],f[6],f[8])),I(d+g,f[5],f[8],f[4]);break;case 213:case 212:I(d,f[5],f[4],f[2]),v(f[6],f[8])?(D(d+1,f[5],f[2]),H[d+g+1]=f[5]):(C(d+1,f[5],f[6],f[2]),y(d+g+1,f[5],f[6],f[8])),I(d+g,f[5],f[7],f[4]);break;case 241:case 240:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[3],f[2]),v(f[6],f[8])?(D(d+g,f[5],f[4]),H[d+g+1]=f[5]):(C(d+g,f[5],f[8],f[4]),y(d+g+1,f[5],f[6],f[8]));break;case 236:case 232:I(d,f[5],f[1],f[2]),I(d+1,f[5],f[2],f[6]),v(f[8],f[4])?(H[d+g]=f[5],D(d+g+1,f[5],f[6])):(y(d+g,f[5],f[8],f[4]),C(d+g+1,f[5],f[8],f[6]));break;case 109:case 105:v(f[8],f[4])?(D(d,f[5],f[2]),H[d+g]=f[5]):(C(d,f[5],f[4],f[2]),y(d+g,f[5],f[8],f[4])),I(d+1,f[5],f[2],f[6]),I(d+g+1,f[5],f[9],f[6]);break;case 171:case 43:v(f[4],f[2])?(H[d]=f[5],D(d+g,f[5],f[8])):(y(d,f[5],f[4],f[2]),C(d+g,f[5],f[4],f[8])),I(d+1,f[5],f[3],f[6]),I(d+g+1,f[5],f[6],f[8]);break;case 143:case 15:v(f[4],f[2])?(H[d]=f[5],D(d+1,f[5],f[6])):(y(d,f[5],f[4],f[2]),C(d+1,f[5],f[2],f[6])),I(d+g,f[5],f[7],f[8]),I(d+g+1,f[5],f[6],f[8]);break;case 124:I(d,f[5],f[1],f[2]),D(d+1,f[5],f[2]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),D(d+g+1,f[5],f[9]);break;case 203:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[3],f[6]),D(d+g,f[5],f[7]),D(d+g+1,f[5],f[6]);break;case 62:D(d,f[5],f[4]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 211:D(d,f[5],f[4]),D(d+1,f[5],f[3]),I(d+g,f[5],f[7],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 118:I(d,f[5],f[1],f[4]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[4]),D(d+g+1,f[5],f[9]);break;case 217:D(d,f[5],f[2]),I(d+1,f[5],f[3],f[2]),D(d+g,f[5],f[7]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 110:D(d,f[5],f[4]),D(d+1,f[5],f[6]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 155:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[3]),I(d+g,f[5],f[7],f[8]),D(d+g+1,f[5],f[8]);break;case 188:I(d,f[5],f[1],f[2]),D(d+1,f[5],f[2]),D(d+g,f[5],f[8]),D(d+g+1,f[5],f[8]);break;case 185:D(d,f[5],f[2]),I(d+1,f[5],f[3],f[2]),D(d+g,f[5],f[8]),D(d+g+1,f[5],f[8]);break;case 61:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+g,f[5],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 157:D(d,f[5],f[2]),D(d+1,f[5],f[2]),I(d+g,f[5],f[7],f[8]),D(d+g+1,f[5],f[8]);break;case 103:D(d,f[5],f[4]),D(d+1,f[5],f[6]),D(d+g,f[5],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 227:D(d,f[5],f[4]),I(d+1,f[5],f[3],f[6]),D(d+g,f[5],f[4]),D(d+g+1,f[5],f[6]);break;case 230:I(d,f[5],f[1],f[4]),D(d+1,f[5],f[6]),D(d+g,f[5],f[4]),D(d+g+1,f[5],f[6]);break;case 199:D(d,f[5],f[4]),D(d+1,f[5],f[6]),I(d+g,f[5],f[7],f[4]),D(d+g+1,f[5],f[6]);break;case 220:I(d,f[5],f[1],f[2]),D(d+1,f[5],f[2]),v(f[8],f[4])?D(d+g,f[5],f[7]):x(d+g,f[5],f[8],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 158:v(f[4],f[2])?D(d,f[5],f[4]):x(d,f[5],f[4],f[2]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[7],f[8]),D(d+g+1,f[5],f[8]);break;case 234:v(f[4],f[2])?D(d,f[5],f[4]):x(d,f[5],f[4],f[2]),I(d+1,f[5],f[3],f[6]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),D(d+g+1,f[5],f[6]);break;case 242:I(d,f[5],f[1],f[4]),v(f[2],f[6])?D(d+1,f[5],f[3]):x(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 59:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),v(f[2],f[6])?D(d+1,f[5],f[3]):x(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 121:D(d,f[5],f[2]),I(d+1,f[5],f[3],f[2]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),v(f[6],f[8])?D(d+g+1,f[5],f[9]):x(d+g+1,f[5],f[6],f[8]);break;case 87:D(d,f[5],f[4]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[7],f[4]),v(f[6],f[8])?D(d+g+1,f[5],f[9]):x(d+g+1,f[5],f[6],f[8]);break;case 79:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[6]),v(f[8],f[4])?D(d+g,f[5],f[7]):x(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 122:v(f[4],f[2])?D(d,f[5],f[4]):x(d,f[5],f[4],f[2]),v(f[2],f[6])?D(d+1,f[5],f[3]):x(d+1,f[5],f[2],f[6]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),v(f[6],f[8])?D(d+g+1,f[5],f[9]):x(d+g+1,f[5],f[6],f[8]);break;case 94:v(f[4],f[2])?D(d,f[5],f[4]):x(d,f[5],f[4],f[2]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),v(f[8],f[4])?D(d+g,f[5],f[7]):x(d+g,f[5],f[8],f[4]),v(f[6],f[8])?D(d+g+1,f[5],f[9]):x(d+g+1,f[5],f[6],f[8]);break;case 218:v(f[4],f[2])?D(d,f[5],f[4]):x(d,f[5],f[4],f[2]),v(f[2],f[6])?D(d+1,f[5],f[3]):x(d+1,f[5],f[2],f[6]),v(f[8],f[4])?D(d+g,f[5],f[7]):x(d+g,f[5],f[8],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 91:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),v(f[2],f[6])?D(d+1,f[5],f[3]):x(d+1,f[5],f[2],f[6]),v(f[8],f[4])?D(d+g,f[5],f[7]):x(d+g,f[5],f[8],f[4]),v(f[6],f[8])?D(d+g+1,f[5],f[9]):x(d+g+1,f[5],f[6],f[8]);break;case 186:v(f[4],f[2])?D(d,f[5],f[4]):x(d,f[5],f[4],f[2]),v(f[2],f[6])?D(d+1,f[5],f[3]):x(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[8]),D(d+g+1,f[5],f[8]);break;case 115:D(d,f[5],f[4]),v(f[2],f[6])?D(d+1,f[5],f[3]):x(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[4]),v(f[6],f[8])?D(d+g+1,f[5],f[9]):x(d+g+1,f[5],f[6],f[8]);break;case 93:D(d,f[5],f[2]),D(d+1,f[5],f[2]),v(f[8],f[4])?D(d+g,f[5],f[7]):x(d+g,f[5],f[8],f[4]),v(f[6],f[8])?D(d+g+1,f[5],f[9]):x(d+g+1,f[5],f[6],f[8]);break;case 206:v(f[4],f[2])?D(d,f[5],f[4]):x(d,f[5],f[4],f[2]),D(d+1,f[5],f[6]),v(f[8],f[4])?D(d+g,f[5],f[7]):x(d+g,f[5],f[8],f[4]),D(d+g+1,f[5],f[6]);break;case 205:case 201:D(d,f[5],f[2]),I(d+1,f[5],f[2],f[6]),v(f[8],f[4])?D(d+g,f[5],f[7]):x(d+g,f[5],f[8],f[4]),D(d+g+1,f[5],f[6]);break;case 174:case 46:v(f[4],f[2])?D(d,f[5],f[4]):x(d,f[5],f[4],f[2]),D(d+1,f[5],f[6]),D(d+g,f[5],f[8]),I(d+g+1,f[5],f[6],f[8]);break;case 179:case 147:D(d,f[5],f[4]),v(f[2],f[6])?D(d+1,f[5],f[3]):x(d+1,f[5],f[2],f[6]),I(d+g,f[5],f[8],f[4]),D(d+g+1,f[5],f[8]);break;case 117:case 116:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),v(f[6],f[8])?D(d+g+1,f[5],f[9]):x(d+g+1,f[5],f[6],f[8]);break;case 189:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+g,f[5],f[8]),D(d+g+1,f[5],f[8]);break;case 231:D(d,f[5],f[4]),D(d+1,f[5],f[6]),D(d+g,f[5],f[4]),D(d+g+1,f[5],f[6]);break;case 126:D(d,f[5],f[4]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),D(d+g+1,f[5],f[9]);break;case 219:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[3]),D(d+g,f[5],f[7]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 125:v(f[8],f[4])?(D(d,f[5],f[2]),H[d+g]=f[5]):(C(d,f[5],f[4],f[2]),y(d+g,f[5],f[8],f[4])),D(d+1,f[5],f[2]),D(d+g+1,f[5],f[9]);break;case 221:D(d,f[5],f[2]),v(f[6],f[8])?(D(d+1,f[5],f[2]),H[d+g+1]=f[5]):(C(d+1,f[5],f[6],f[2]),y(d+g+1,f[5],f[6],f[8])),D(d+g,f[5],f[7]);break;case 207:v(f[4],f[2])?(H[d]=f[5],D(d+1,f[5],f[6])):(y(d,f[5],f[4],f[2]),C(d+1,f[5],f[2],f[6])),D(d+g,f[5],f[7]),D(d+g+1,f[5],f[6]);break;case 238:D(d,f[5],f[4]),D(d+1,f[5],f[6]),v(f[8],f[4])?(H[d+g]=f[5],D(d+g+1,f[5],f[6])):(y(d+g,f[5],f[8],f[4]),C(d+g+1,f[5],f[8],f[6]));break;case 190:D(d,f[5],f[4]),v(f[2],f[6])?(H[d+1]=f[5],D(d+g+1,f[5],f[8])):(y(d+1,f[5],f[2],f[6]),C(d+g+1,f[5],f[6],f[8])),D(d+g,f[5],f[8]);break;case 187:v(f[4],f[2])?(H[d]=f[5],D(d+g,f[5],f[8])):(y(d,f[5],f[4],f[2]),C(d+g,f[5],f[4],f[8])),D(d+1,f[5],f[3]),D(d+g+1,f[5],f[8]);break;case 243:D(d,f[5],f[4]),D(d+1,f[5],f[3]),v(f[6],f[8])?(D(d+g,f[5],f[4]),H[d+g+1]=f[5]):(C(d+g,f[5],f[8],f[4]),y(d+g+1,f[5],f[6],f[8]));break;case 119:v(f[2],f[6])?(D(d,f[5],f[4]),H[d+1]=f[5]):(C(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[6])),D(d+g,f[5],f[4]),D(d+g+1,f[5],f[9]);break;case 237:case 233:D(d,f[5],f[2]),I(d+1,f[5],f[2],f[6]),v(f[8],f[4])?H[d+g]=f[5]:D(d+g,f[5],f[7]),D(d+g+1,f[5],f[6]);break;case 175:case 47:v(f[4],f[2])?H[d]=f[5]:D(d,f[5],f[4]),D(d+1,f[5],f[6]),D(d+g,f[5],f[8]),I(d+g+1,f[5],f[6],f[8]);break;case 183:case 151:D(d,f[5],f[4]),v(f[2],f[6])?H[d+1]=f[5]:D(d+1,f[5],f[3]),I(d+g,f[5],f[8],f[4]),D(d+g+1,f[5],f[8]);break;case 245:case 244:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:D(d+g+1,f[5],f[9]);break;case 250:D(d,f[5],f[4]),D(d+1,f[5],f[3]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 123:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[3]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),D(d+g+1,f[5],f[9]);break;case 95:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[7]),D(d+g+1,f[5],f[9]);break;case 222:D(d,f[5],f[4]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[7]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 252:I(d,f[5],f[1],f[2]),D(d+1,f[5],f[2]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:D(d+g+1,f[5],f[9]);break;case 249:D(d,f[5],f[2]),I(d+1,f[5],f[3],f[2]),v(f[8],f[4])?H[d+g]=f[5]:D(d+g,f[5],f[7]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 235:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),I(d+1,f[5],f[3],f[6]),v(f[8],f[4])?H[d+g]=f[5]:D(d+g,f[5],f[7]),D(d+g+1,f[5],f[6]);break;case 111:v(f[4],f[2])?H[d]=f[5]:D(d,f[5],f[4]),D(d+1,f[5],f[6]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),I(d+g+1,f[5],f[9],f[6]);break;case 63:v(f[4],f[2])?H[d]=f[5]:D(d,f[5],f[4]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[8]),I(d+g+1,f[5],f[9],f[8]);break;case 159:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),v(f[2],f[6])?H[d+1]=f[5]:D(d+1,f[5],f[3]),I(d+g,f[5],f[7],f[8]),D(d+g+1,f[5],f[8]);break;case 215:D(d,f[5],f[4]),v(f[2],f[6])?H[d+1]=f[5]:D(d+1,f[5],f[3]),I(d+g,f[5],f[7],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 246:I(d,f[5],f[1],f[4]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),D(d+g,f[5],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:D(d+g+1,f[5],f[9]);break;case 254:D(d,f[5],f[4]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:D(d+g+1,f[5],f[9]);break;case 253:D(d,f[5],f[2]),D(d+1,f[5],f[2]),v(f[8],f[4])?H[d+g]=f[5]:D(d+g,f[5],f[7]),v(f[6],f[8])?H[d+g+1]=f[5]:D(d+g+1,f[5],f[9]);break;case 251:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[3]),v(f[8],f[4])?H[d+g]=f[5]:D(d+g,f[5],f[7]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 239:v(f[4],f[2])?H[d]=f[5]:D(d,f[5],f[4]),D(d+1,f[5],f[6]),v(f[8],f[4])?H[d+g]=f[5]:D(d+g,f[5],f[7]),D(d+g+1,f[5],f[6]);break;case 127:v(f[4],f[2])?H[d]=f[5]:D(d,f[5],f[4]),v(f[2],f[6])?H[d+1]=f[5]:I(d+1,f[5],f[2],f[6]),v(f[8],f[4])?H[d+g]=f[5]:I(d+g,f[5],f[8],f[4]),D(d+g+1,f[5],f[9]);break;case 191:v(f[4],f[2])?H[d]=f[5]:D(d,f[5],f[4]),v(f[2],f[6])?H[d+1]=f[5]:D(d+1,f[5],f[3]),D(d+g,f[5],f[8]),D(d+g+1,f[5],f[8]);break;case 223:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),v(f[2],f[6])?H[d+1]=f[5]:D(d+1,f[5],f[3]),D(d+g,f[5],f[7]),v(f[6],f[8])?H[d+g+1]=f[5]:I(d+g+1,f[5],f[6],f[8]);break;case 247:D(d,f[5],f[4]),v(f[2],f[6])?H[d+1]=f[5]:D(d+1,f[5],f[3]),D(d+g,f[5],f[4]),v(f[6],f[8])?H[d+g+1]=f[5]:D(d+g+1,f[5],f[9]);break;case 255:v(f[4],f[2])?H[d]=f[5]:D(d,f[5],f[4]),v(f[2],f[6])?H[d+1]=f[5]:D(d+1,f[5],f[3]),v(f[8],f[4])?H[d+g]=f[5]:D(d+g,f[5],f[7]),v(f[6],f[8])?H[d+g+1]=f[5]:D(d+g+1,f[5],f[9])}w++,d+=2}d+=g}},hq3x=function(a,e){var c,s,k,t,i,h,o,f=[],g=3*a,d=0,w=0,v=_Diff,l=u,m=_RGBtoYUV,D=_Interp1,I=_Interp2,C=_Interp3,x=_Interp4,y=_Interp5,E=r,H=b,M=n;
    for(s=0;s<e;s++){for(t=s>0?-a:0,i=s<e-1?a:0,c=0;c<a;c++){f[2]=E[w+t],f[5]=E[w],f[8]=E[w+i],c>0?(f[1]=E[w+t-1],f[4]=E[w-1],f[7]=E[w+i-1]):(f[1]=f[2],f[4]=f[5],f[7]=f[8]),c<a-1?(f[3]=E[w+t+1],f[6]=E[w+1],f[9]=E[w+i+1]):(f[3]=f[2],f[6]=f[5],f[9]=f[8]);var O=0,p=1;
        for(h=m(f[5]),k=1;k<10;k++)5!==k&&(f[k]!==f[5]&&(o=m(f[k]),(l.abs((h&M)-(o&M))>3145728||l.abs((65280&h)-(65280&o))>1792||l.abs((255&h)-(255&o))>6)&&(O|=p)),p<<=1);switch(O){case 0:case 1:case 4:case 32:case 128:case 5:case 132:case 160:case 33:case 129:case 36:case 133:case 164:case 161:case 37:case 165:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 2:case 34:case 130:case 162:D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 16:case 17:case 48:case 49:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 64:case 65:case 68:case 69:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 8:case 12:case 136:case 140:D(d,f[5],f[1]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 3:case 35:case 131:case 163:D(d,f[5],f[4]),H[d+1]=f[5],D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 6:case 38:case 134:case 166:D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 20:case 21:case 52:case 53:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 144:case 145:case 176:case 177:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 192:case 193:case 196:case 197:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 96:case 97:case 100:case 101:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 40:case 44:case 168:case 172:D(d,f[5],f[1]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 9:case 13:case 137:case 141:D(d,f[5],f[2]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 18:case 50:D(d,f[5],f[1]),v(f[2],f[6])?(H[d+1]=f[5],D(d+2,f[5],f[3]),H[d+g+2]=f[5]):(C(d+1,f[5],f[2]),x(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),D(d+g,f[5],f[4]),H[d+g+1]=f[5],I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 80:case 81:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]),v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9])):(C(d+g+2,f[5],f[6]),C(d+(g<<1)+1,f[5],f[8]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 72:case 76:D(d,f[5],f[1]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?(H[d+g]=f[5],D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5]):(C(d+g,f[5],f[4]),x(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),D(d+(g<<1)+2,f[5],f[9]);break;case 10:case 138:v(f[4],f[2])?(D(d,f[5],f[1]),H[d+1]=f[5],H[d+g]=f[5]):(x(d,f[5],f[4],f[2]),C(d+1,f[5],f[2]),C(d+g,f[5],f[4])),D(d+2,f[5],f[3]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 66:D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 24:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 7:case 39:case 135:case 167:D(d,f[5],f[4]),H[d+1]=f[5],D(d+2,f[5],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 148:case 149:case 180:case 181:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 224:case 228:case 225:case 229:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 41:case 169:case 45:case 173:D(d,f[5],f[2]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 22:case 54:D(d,f[5],f[1]),v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5],H[d+g+2]=f[5]):(C(d+1,f[5],f[2]),x(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),D(d+g,f[5],f[4]),H[d+g+1]=f[5],I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 208:case 209:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]),v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+g+2,f[5],f[6]),C(d+(g<<1)+1,f[5],f[8]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 104:case 108:D(d,f[5],f[1]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(C(d+g,f[5],f[4]),x(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),D(d+(g<<1)+2,f[5],f[9]);break;case 11:case 139:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5],H[d+g]=f[5]):(x(d,f[5],f[4],f[2]),C(d+1,f[5],f[2]),C(d+g,f[5],f[4])),D(d+2,f[5],f[3]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 19:case 51:v(f[2],f[6])?(D(d,f[5],f[4]),H[d+1]=f[5],D(d+2,f[5],f[3]),H[d+g+2]=f[5]):(I(d,f[5],f[4],f[2]),D(d+1,f[2],f[5]),y(d+2,f[2],f[6]),D(d+g+2,f[5],f[6])),D(d+g,f[5],f[4]),H[d+g+1]=f[5],I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 146:case 178:v(f[2],f[6])?(H[d+1]=f[5],D(d+2,f[5],f[3]),H[d+g+2]=f[5],D(d+(g<<1)+2,f[5],f[8])):(D(d+1,f[5],f[2]),y(d+2,f[2],f[6]),D(d+g+2,f[6],f[5]),I(d+(g<<1)+2,f[5],f[6],f[8])),D(d,f[5],f[1]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]);break;case 84:case 85:v(f[6],f[8])?(D(d+2,f[5],f[2]),H[d+g+2]=f[5],H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9])):(I(d+2,f[5],f[2],f[6]),D(d+g+2,f[6],f[5]),D(d+(g<<1)+1,f[5],f[8]),y(d+(g<<1)+2,f[6],f[8])),I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]);break;case 112:case 113:v(f[6],f[8])?(H[d+g+2]=f[5],D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9])):(D(d+g+2,f[5],f[6]),I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[8],f[5]),y(d+(g<<1)+2,f[6],f[8])),I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5];break;case 200:case 204:v(f[8],f[4])?(H[d+g]=f[5],D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6])):(D(d+g,f[5],f[4]),y(d+(g<<1),f[8],f[4]),D(d+(g<<1)+1,f[8],f[5]),I(d+(g<<1)+2,f[5],f[6],f[8])),D(d,f[5],f[1]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]);break;case 73:case 77:v(f[8],f[4])?(D(d,f[5],f[2]),H[d+g]=f[5],D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5]):(I(d,f[5],f[4],f[2]),D(d+g,f[4],f[5]),y(d+(g<<1),f[8],f[4]),D(d+(g<<1)+1,f[5],f[8])),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1)+2,f[5],f[9]);break;case 42:case 170:v(f[4],f[2])?(D(d,f[5],f[1]),H[d+1]=f[5],H[d+g]=f[5],D(d+(g<<1),f[5],f[8])):(y(d,f[4],f[2]),D(d+1,f[5],f[2]),D(d+g,f[4],f[5]),I(d+(g<<1),f[5],f[8],f[4])),D(d+2,f[5],f[3]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 14:case 142:v(f[4],f[2])?(D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[6]),H[d+g]=f[5]):(y(d,f[4],f[2]),D(d+1,f[2],f[5]),I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4])),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 67:D(d,f[5],f[4]),H[d+1]=f[5],D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 70:D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 28:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 152:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 194:D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 98:D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 56:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 25:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 26:case 31:v(f[4],f[2])?(H[d]=f[5],H[d+g]=f[5]):(x(d,f[5],f[4],f[2]),C(d+g,f[5],f[4])),H[d+1]=f[5],v(f[2],f[6])?(H[d+2]=f[5],H[d+g+2]=f[5]):(x(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 82:case 214:D(d,f[5],f[1]),v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5]):(C(d+1,f[5],f[2]),x(d+2,f[5],f[2],f[6])),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),v(f[6],f[8])?(H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+(g<<1)+1,f[5],f[8]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 88:case 248:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g+1]=f[5],v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5]):(C(d+g,f[5],f[4]),x(d+(g<<1),f[5],f[8],f[4])),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+g+2,f[5],f[6]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 74:case 107:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5]):(x(d,f[5],f[4],f[2]),C(d+1,f[5],f[2])),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?(H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(x(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),D(d+(g<<1)+2,f[5],f[9]);break;case 27:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5],H[d+g]=f[5]):(x(d,f[5],f[4],f[2]),C(d+1,f[5],f[2]),C(d+g,f[5],f[4])),D(d+2,f[5],f[3]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 86:D(d,f[5],f[1]),v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5],H[d+g+2]=f[5]):(C(d+1,f[5],f[2]),x(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 216:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]),v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+g+2,f[5],f[6]),C(d+(g<<1)+1,f[5],f[8]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 106:D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[3]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(C(d+g,f[5],f[4]),x(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),D(d+(g<<1)+2,f[5],f[9]);break;case 30:D(d,f[5],f[1]),v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5],H[d+g+2]=f[5]):(C(d+1,f[5],f[2]),x(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),H[d+g]=f[5],H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 210:D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]),v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+g+2,f[5],f[6]),C(d+(g<<1)+1,f[5],f[8]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 120:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g+1]=f[5],H[d+g+2]=f[5],v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(C(d+g,f[5],f[4]),x(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),D(d+(g<<1)+2,f[5],f[9]);break;case 75:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5],H[d+g]=f[5]):(x(d,f[5],f[4],f[2]),C(d+1,f[5],f[2]),C(d+g,f[5],f[4])),D(d+2,f[5],f[3]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 29:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 198:D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 184:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 99:D(d,f[5],f[4]),H[d+1]=f[5],D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 57:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 71:D(d,f[5],f[4]),H[d+1]=f[5],D(d+2,f[5],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 156:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 226:D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 60:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 195:D(d,f[5],f[4]),H[d+1]=f[5],D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 102:D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 153:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 58:v(f[4],f[2])?D(d,f[5],f[1]):I(d,f[5],f[4],f[2]),H[d+1]=f[5],v(f[2],f[6])?D(d+2,f[5],f[3]):I(d+2,f[5],f[2],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 83:D(d,f[5],f[4]),H[d+1]=f[5],v(f[2],f[6])?D(d+2,f[5],f[3]):I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?D(d+(g<<1)+2,f[5],f[9]):I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 92:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],v(f[8],f[4])?D(d+(g<<1),f[5],f[7]):I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?D(d+(g<<1)+2,f[5],f[9]):I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 202:v(f[4],f[2])?D(d,f[5],f[1]):I(d,f[5],f[4],f[2]),H[d+1]=f[5],D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?D(d+(g<<1),f[5],f[7]):I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 78:v(f[4],f[2])?D(d,f[5],f[1]):I(d,f[5],f[4],f[2]),H[d+1]=f[5],D(d+2,f[5],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?D(d+(g<<1),f[5],f[7]):I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 154:v(f[4],f[2])?D(d,f[5],f[1]):I(d,f[5],f[4],f[2]),H[d+1]=f[5],v(f[2],f[6])?D(d+2,f[5],f[3]):I(d+2,f[5],f[2],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 114:D(d,f[5],f[1]),H[d+1]=f[5],v(f[2],f[6])?D(d+2,f[5],f[3]):I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?D(d+(g<<1)+2,f[5],f[9]):I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 89:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],v(f[8],f[4])?D(d+(g<<1),f[5],f[7]):I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?D(d+(g<<1)+2,f[5],f[9]):I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 90:v(f[4],f[2])?D(d,f[5],f[1]):I(d,f[5],f[4],f[2]),H[d+1]=f[5],v(f[2],f[6])?D(d+2,f[5],f[3]):I(d+2,f[5],f[2],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],v(f[8],f[4])?D(d+(g<<1),f[5],f[7]):I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?D(d+(g<<1)+2,f[5],f[9]):I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 55:case 23:v(f[2],f[6])?(D(d,f[5],f[4]),H[d+1]=f[5],H[d+2]=f[5],H[d+g+2]=f[5]):(I(d,f[5],f[4],f[2]),D(d+1,f[2],f[5]),y(d+2,f[2],f[6]),D(d+g+2,f[5],f[6])),D(d+g,f[5],f[4]),H[d+g+1]=f[5],I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 182:case 150:v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5],H[d+g+2]=f[5],D(d+(g<<1)+2,f[5],f[8])):(D(d+1,f[5],f[2]),y(d+2,f[2],f[6]),D(d+g+2,f[6],f[5]),I(d+(g<<1)+2,f[5],f[6],f[8])),D(d,f[5],f[1]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]);break;case 213:case 212:v(f[6],f[8])?(D(d+2,f[5],f[2]),H[d+g+2]=f[5],H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(I(d+2,f[5],f[2],f[6]),D(d+g+2,f[6],f[5]),D(d+(g<<1)+1,f[5],f[8]),y(d+(g<<1)+2,f[6],f[8])),I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]);break;case 241:case 240:v(f[6],f[8])?(H[d+g+2]=f[5],D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(D(d+g+2,f[5],f[6]),I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[8],f[5]),y(d+(g<<1)+2,f[6],f[8])),I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5];break;case 236:case 232:v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6])):(D(d+g,f[5],f[4]),y(d+(g<<1),f[8],f[4]),D(d+(g<<1)+1,f[8],f[5]),I(d+(g<<1)+2,f[5],f[6],f[8])),D(d,f[5],f[1]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]);break;case 109:case 105:v(f[8],f[4])?(D(d,f[5],f[2]),H[d+g]=f[5],H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(I(d,f[5],f[4],f[2]),D(d+g,f[4],f[5]),y(d+(g<<1),f[8],f[4]),D(d+(g<<1)+1,f[5],f[8])),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1)+2,f[5],f[9]);break;case 171:case 43:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5],H[d+g]=f[5],D(d+(g<<1),f[5],f[8])):(y(d,f[4],f[2]),D(d+1,f[5],f[2]),D(d+g,f[4],f[5]),I(d+(g<<1),f[5],f[8],f[4])),D(d+2,f[5],f[3]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 143:case 15:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5],D(d+2,f[5],f[6]),H[d+g]=f[5]):(y(d,f[4],f[2]),D(d+1,f[2],f[5]),I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4])),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 124:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g+1]=f[5],H[d+g+2]=f[5],v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(C(d+g,f[5],f[4]),x(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),D(d+(g<<1)+2,f[5],f[9]);break;case 203:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5],H[d+g]=f[5]):(x(d,f[5],f[4],f[2]),C(d+1,f[5],f[2]),C(d+g,f[5],f[4])),D(d+2,f[5],f[3]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 62:D(d,f[5],f[1]),v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5],H[d+g+2]=f[5]):(C(d+1,f[5],f[2]),x(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),H[d+g]=f[5],H[d+g+1]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 211:D(d,f[5],f[4]),H[d+1]=f[5],D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]),v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+g+2,f[5],f[6]),C(d+(g<<1)+1,f[5],f[8]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 118:D(d,f[5],f[1]),v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5],H[d+g+2]=f[5]):(C(d+1,f[5],f[2]),x(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 217:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]),v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+g+2,f[5],f[6]),C(d+(g<<1)+1,f[5],f[8]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 110:D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[6]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(C(d+g,f[5],f[4]),x(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),D(d+(g<<1)+2,f[5],f[9]);break;case 155:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5],H[d+g]=f[5]):(x(d,f[5],f[4],f[2]),C(d+1,f[5],f[2]),C(d+g,f[5],f[4])),D(d+2,f[5],f[3]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 188:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 185:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 61:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 157:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 103:D(d,f[5],f[4]),H[d+1]=f[5],D(d+2,f[5],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 227:D(d,f[5],f[4]),H[d+1]=f[5],D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 230:D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 199:D(d,f[5],f[4]),H[d+1]=f[5],D(d+2,f[5],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 220:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g]=f[5],H[d+g+1]=f[5],v(f[8],f[4])?D(d+(g<<1),f[5],f[7]):I(d+(g<<1),f[5],f[8],f[4]),v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+g+2,f[5],f[6]),C(d+(g<<1)+1,f[5],f[8]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 158:v(f[4],f[2])?D(d,f[5],f[1]):I(d,f[5],f[4],f[2]),v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5],H[d+g+2]=f[5]):(C(d+1,f[5],f[2]),x(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),H[d+g]=f[5],H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 234:v(f[4],f[2])?D(d,f[5],f[1]):I(d,f[5],f[4],f[2]),H[d+1]=f[5],D(d+2,f[5],f[3]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(C(d+g,f[5],f[4]),x(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),D(d+(g<<1)+2,f[5],f[6]);break;case 242:D(d,f[5],f[1]),H[d+1]=f[5],v(f[2],f[6])?D(d+2,f[5],f[3]):I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[4]),v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+g+2,f[5],f[6]),C(d+(g<<1)+1,f[5],f[8]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 59:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5],H[d+g]=f[5]):(x(d,f[5],f[4],f[2]),C(d+1,f[5],f[2]),C(d+g,f[5],f[4])),v(f[2],f[6])?D(d+2,f[5],f[3]):I(d+2,f[5],f[2],f[6]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 121:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g+1]=f[5],H[d+g+2]=f[5],v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(C(d+g,f[5],f[4]),x(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),v(f[6],f[8])?D(d+(g<<1)+2,f[5],f[9]):I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 87:D(d,f[5],f[4]),v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5],H[d+g+2]=f[5]):(C(d+1,f[5],f[2]),x(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?D(d+(g<<1)+2,f[5],f[9]):I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 79:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5],H[d+g]=f[5]):(x(d,f[5],f[4],f[2]),C(d+1,f[5],f[2]),C(d+g,f[5],f[4])),D(d+2,f[5],f[6]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?D(d+(g<<1),f[5],f[7]):I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 122:v(f[4],f[2])?D(d,f[5],f[1]):I(d,f[5],f[4],f[2]),H[d+1]=f[5],v(f[2],f[6])?D(d+2,f[5],f[3]):I(d+2,f[5],f[2],f[6]),H[d+g+1]=f[5],H[d+g+2]=f[5],v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(C(d+g,f[5],f[4]),x(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),v(f[6],f[8])?D(d+(g<<1)+2,f[5],f[9]):I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 94:v(f[4],f[2])?D(d,f[5],f[1]):I(d,f[5],f[4],f[2]),v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5],H[d+g+2]=f[5]):(C(d+1,f[5],f[2]),x(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),H[d+g]=f[5],H[d+g+1]=f[5],v(f[8],f[4])?D(d+(g<<1),f[5],f[7]):I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?D(d+(g<<1)+2,f[5],f[9]):I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 218:v(f[4],f[2])?D(d,f[5],f[1]):I(d,f[5],f[4],f[2]),H[d+1]=f[5],v(f[2],f[6])?D(d+2,f[5],f[3]):I(d+2,f[5],f[2],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],v(f[8],f[4])?D(d+(g<<1),f[5],f[7]):I(d+(g<<1),f[5],f[8],f[4]),v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+g+2,f[5],f[6]),C(d+(g<<1)+1,f[5],f[8]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 91:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5],H[d+g]=f[5]):(x(d,f[5],f[4],f[2]),C(d+1,f[5],f[2]),C(d+g,f[5],f[4])),v(f[2],f[6])?D(d+2,f[5],f[3]):I(d+2,f[5],f[2],f[6]),H[d+g+1]=f[5],H[d+g+2]=f[5],v(f[8],f[4])?D(d+(g<<1),f[5],f[7]):I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?D(d+(g<<1)+2,f[5],f[9]):I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 186:v(f[4],f[2])?D(d,f[5],f[1]):I(d,f[5],f[4],f[2]),H[d+1]=f[5],v(f[2],f[6])?D(d+2,f[5],f[3]):I(d+2,f[5],f[2],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 115:D(d,f[5],f[4]),H[d+1]=f[5],v(f[2],f[6])?D(d+2,f[5],f[3]):I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?D(d+(g<<1)+2,f[5],f[9]):I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 93:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],v(f[8],f[4])?D(d+(g<<1),f[5],f[7]):I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?D(d+(g<<1)+2,f[5],f[9]):I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 206:v(f[4],f[2])?D(d,f[5],f[1]):I(d,f[5],f[4],f[2]),H[d+1]=f[5],D(d+2,f[5],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?D(d+(g<<1),f[5],f[7]):I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 205:case 201:D(d,f[5],f[2]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?D(d+(g<<1),f[5],f[7]):I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 174:case 46:v(f[4],f[2])?D(d,f[5],f[1]):I(d,f[5],f[4],f[2]),H[d+1]=f[5],D(d+2,f[5],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 179:case 147:D(d,f[5],f[4]),H[d+1]=f[5],v(f[2],f[6])?D(d+2,f[5],f[3]):I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 117:case 116:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?D(d+(g<<1)+2,f[5],f[9]):I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 189:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 231:D(d,f[5],f[4]),H[d+1]=f[5],D(d+2,f[5],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 126:D(d,f[5],f[1]),v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5],H[d+g+2]=f[5]):(C(d+1,f[5],f[2]),x(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),H[d+g+1]=f[5],v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(C(d+g,f[5],f[4]),x(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),D(d+(g<<1)+2,f[5],f[9]);break;case 219:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5],H[d+g]=f[5]):(x(d,f[5],f[4],f[2]),C(d+1,f[5],f[2]),C(d+g,f[5],f[4])),D(d+2,f[5],f[3]),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]),v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+g+2,f[5],f[6]),C(d+(g<<1)+1,f[5],f[8]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 125:v(f[8],f[4])?(D(d,f[5],f[2]),H[d+g]=f[5],H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(I(d,f[5],f[4],f[2]),D(d+g,f[4],f[5]),y(d+(g<<1),f[8],f[4]),D(d+(g<<1)+1,f[5],f[8])),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 221:v(f[6],f[8])?(D(d+2,f[5],f[2]),H[d+g+2]=f[5],H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(I(d+2,f[5],f[2],f[6]),D(d+g+2,f[6],f[5]),D(d+(g<<1)+1,f[5],f[8]),y(d+(g<<1)+2,f[6],f[8])),D(d,f[5],f[2]),D(d+1,f[5],f[2]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]);break;case 207:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5],D(d+2,f[5],f[6]),H[d+g]=f[5]):(y(d,f[4],f[2]),D(d+1,f[2],f[5]),I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4])),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 238:v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6])):(D(d+g,f[5],f[4]),y(d+(g<<1),f[8],f[4]),D(d+(g<<1)+1,f[8],f[5]),I(d+(g<<1)+2,f[5],f[6],f[8])),D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[6]),H[d+g+1]=f[5],D(d+g+2,f[5],f[6]);break;case 190:v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5],H[d+g+2]=f[5],D(d+(g<<1)+2,f[5],f[8])):(D(d+1,f[5],f[2]),y(d+2,f[2],f[6]),D(d+g+2,f[6],f[5]),I(d+(g<<1)+2,f[5],f[6],f[8])),D(d,f[5],f[1]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]);break;case 187:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5],H[d+g]=f[5],D(d+(g<<1),f[5],f[8])):(y(d,f[4],f[2]),D(d+1,f[5],f[2]),D(d+g,f[4],f[5]),I(d+(g<<1),f[5],f[8],f[4])),D(d+2,f[5],f[3]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 243:v(f[6],f[8])?(H[d+g+2]=f[5],D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(D(d+g+2,f[5],f[6]),I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[8],f[5]),y(d+(g<<1)+2,f[6],f[8])),D(d,f[5],f[4]),H[d+1]=f[5],D(d+2,f[5],f[3]),D(d+g,f[5],f[4]),H[d+g+1]=f[5];break;case 119:v(f[2],f[6])?(D(d,f[5],f[4]),H[d+1]=f[5],H[d+2]=f[5],H[d+g+2]=f[5]):(I(d,f[5],f[4],f[2]),D(d+1,f[2],f[5]),y(d+2,f[2],f[6]),D(d+g+2,f[5],f[6])),D(d+g,f[5],f[4]),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 237:case 233:D(d,f[5],f[2]),D(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?H[d+(g<<1)]=f[5]:I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 175:case 47:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),H[d+1]=f[5],D(d+2,f[5],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 183:case 151:D(d,f[5],f[4]),H[d+1]=f[5],v(f[2],f[6])?H[d+2]=f[5]:I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],I(d+(g<<1),f[5],f[8],f[4]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 245:case 244:I(d,f[5],f[4],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?H[d+(g<<1)+2]=f[5]:I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 250:D(d,f[5],f[1]),H[d+1]=f[5],D(d+2,f[5],f[3]),H[d+g+1]=f[5],v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5]):(C(d+g,f[5],f[4]),x(d+(g<<1),f[5],f[8],f[4])),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+g+2,f[5],f[6]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 123:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5]):(x(d,f[5],f[4],f[2]),C(d+1,f[5],f[2])),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],v(f[8],f[4])?(H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(x(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),D(d+(g<<1)+2,f[5],f[9]);break;case 95:v(f[4],f[2])?(H[d]=f[5],H[d+g]=f[5]):(x(d,f[5],f[4],f[2]),C(d+g,f[5],f[4])),H[d+1]=f[5],v(f[2],f[6])?(H[d+2]=f[5],H[d+g+2]=f[5]):(x(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[9]);break;case 222:D(d,f[5],f[1]),v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5]):(C(d+1,f[5],f[2]),x(d+2,f[5],f[2],f[6])),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),v(f[6],f[8])?(H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+(g<<1)+1,f[5],f[8]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 252:D(d,f[5],f[1]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g+1]=f[5],H[d+g+2]=f[5],v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5]):(C(d+g,f[5],f[4]),x(d+(g<<1),f[5],f[8],f[4])),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?H[d+(g<<1)+2]=f[5]:I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 249:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],v(f[8],f[4])?H[d+(g<<1)]=f[5]:I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+g+2,f[5],f[6]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 235:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5]):(x(d,f[5],f[4],f[2]),C(d+1,f[5],f[2])),D(d+2,f[5],f[3]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?H[d+(g<<1)]=f[5]:I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 111:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),H[d+1]=f[5],D(d+2,f[5],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?(H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(x(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),D(d+(g<<1)+2,f[5],f[9]);break;case 63:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),H[d+1]=f[5],v(f[2],f[6])?(H[d+2]=f[5],H[d+g+2]=f[5]):(x(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),H[d+g]=f[5],H[d+g+1]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[9]);break;case 159:v(f[4],f[2])?(H[d]=f[5],H[d+g]=f[5]):(x(d,f[5],f[4],f[2]),C(d+g,f[5],f[4])),H[d+1]=f[5],v(f[2],f[6])?H[d+2]=f[5]:I(d+2,f[5],f[2],f[6]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 215:D(d,f[5],f[4]),H[d+1]=f[5],v(f[2],f[6])?H[d+2]=f[5]:I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),v(f[6],f[8])?(H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+(g<<1)+1,f[5],f[8]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 246:D(d,f[5],f[1]),v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5]):(C(d+1,f[5],f[2]),x(d+2,f[5],f[2],f[6])),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?H[d+(g<<1)+2]=f[5]:I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 254:D(d,f[5],f[1]),v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5]):(C(d+1,f[5],f[2]),x(d+2,f[5],f[2],f[6])),H[d+g+1]=f[5],v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5]):(C(d+g,f[5],f[4]),x(d+(g<<1),f[5],f[8],f[4])),v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+g+2,f[5],f[6]),C(d+(g<<1)+1,f[5],f[8]),I(d+(g<<1)+2,f[5],f[6],f[8]));break;case 253:D(d,f[5],f[2]),D(d+1,f[5],f[2]),D(d+2,f[5],f[2]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],v(f[8],f[4])?H[d+(g<<1)]=f[5]:I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?H[d+(g<<1)+2]=f[5]:I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 251:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5]):(x(d,f[5],f[4],f[2]),C(d+1,f[5],f[2])),D(d+2,f[5],f[3]),H[d+g+1]=f[5],v(f[8],f[4])?(H[d+g]=f[5],H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(C(d+g,f[5],f[4]),I(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),v(f[6],f[8])?(H[d+g+2]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+g+2,f[5],f[6]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 239:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),H[d+1]=f[5],D(d+2,f[5],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],D(d+g+2,f[5],f[6]),v(f[8],f[4])?H[d+(g<<1)]=f[5]:I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],D(d+(g<<1)+2,f[5],f[6]);break;case 127:v(f[4],f[2])?(H[d]=f[5],H[d+1]=f[5],H[d+g]=f[5]):(I(d,f[5],f[4],f[2]),C(d+1,f[5],f[2]),C(d+g,f[5],f[4])),v(f[2],f[6])?(H[d+2]=f[5],H[d+g+2]=f[5]):(x(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),H[d+g+1]=f[5],v(f[8],f[4])?(H[d+(g<<1)]=f[5],H[d+(g<<1)+1]=f[5]):(x(d+(g<<1),f[5],f[8],f[4]),C(d+(g<<1)+1,f[5],f[8])),D(d+(g<<1)+2,f[5],f[9]);break;case 191:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),H[d+1]=f[5],v(f[2],f[6])?H[d+2]=f[5]:I(d+2,f[5],f[2],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[8]),D(d+(g<<1)+1,f[5],f[8]),D(d+(g<<1)+2,f[5],f[8]);break;case 223:v(f[4],f[2])?(H[d]=f[5],H[d+g]=f[5]):(x(d,f[5],f[4],f[2]),C(d+g,f[5],f[4])),v(f[2],f[6])?(H[d+1]=f[5],H[d+2]=f[5],H[d+g+2]=f[5]):(C(d+1,f[5],f[2]),I(d+2,f[5],f[2],f[6]),C(d+g+2,f[5],f[6])),H[d+g+1]=f[5],D(d+(g<<1),f[5],f[7]),v(f[6],f[8])?(H[d+(g<<1)+1]=f[5],H[d+(g<<1)+2]=f[5]):(C(d+(g<<1)+1,f[5],f[8]),x(d+(g<<1)+2,f[5],f[6],f[8]));break;case 247:D(d,f[5],f[4]),H[d+1]=f[5],v(f[2],f[6])?H[d+2]=f[5]:I(d+2,f[5],f[2],f[6]),D(d+g,f[5],f[4]),H[d+g+1]=f[5],H[d+g+2]=f[5],D(d+(g<<1),f[5],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?H[d+(g<<1)+2]=f[5]:I(d+(g<<1)+2,f[5],f[6],f[8]);break;case 255:v(f[4],f[2])?H[d]=f[5]:I(d,f[5],f[4],f[2]),H[d+1]=f[5],v(f[2],f[6])?H[d+2]=f[5]:I(d+2,f[5],f[2],f[6]),H[d+g]=f[5],H[d+g+1]=f[5],H[d+g+2]=f[5],v(f[8],f[4])?H[d+(g<<1)]=f[5]:I(d+(g<<1),f[5],f[8],f[4]),H[d+(g<<1)+1]=f[5],v(f[6],f[8])?H[d+(g<<1)+2]=f[5]:I(d+(g<<1)+2,f[5],f[6],f[8])}w++,d+=3}
        d+=g<<1}},hq4x=function(a,e){var c,s,k,t,i,h,o,f=[],
    g=a<<2,d=0,w=0,v=_Diff,l=u,m=_RGBtoYUV,D=_Interp1,I=_Interp2,C=_Interp3,x=_Interp5,y=_Interp6,E=_Interp7,H=_Interp8,M=r,O=b,p=n;
    for(s=0;s<e;s++){for(t=s>0?-a:0,i=s<e-1?a:0,c=0;c<a;c++){f[2]=M[w+t],f[5]=M[w],f[8]=M[w+i],c>0?(f[1]=M[w+t-1],f[4]=M[w-1],f[7]=M[w+i-1]):(f[1]=f[2],f[4]=f[5],f[7]=f[8]),c<a-1?(f[3]=M[w+t+1],f[6]=M[w+1],f[9]=M[w+i+1]):(f[3]=f[2],f[6]=f[5],f[9]=f[8]);var A=0,P=1;
        for(h=m(f[5]),k=1;k<10;k++)5!==k&&(f[k]!==f[5]&&(o=m(f[k]),(l.abs((h&p)-(o&p))>3145728||l.abs((65280&h)-(65280&o))>1792||l.abs((255&h)-(255&o))>6)&&(A|=P)),P<<=1);switch(A){case 0:case 1:case 4:case 32:case 128:case 5:case 132:case 160:case 33:case 129:case 36:case 133:case 164:case 161:case 37:case 165:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 2:case 34:case 130:case 162:H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 16:case 17:case 48:case 49:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 64:case 65:case 68:case 69:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 8:case 12:case 136:case 140:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 3:case 35:case 131:case 163:H(d,f[5],f[4]),C(d+1,f[5],f[4]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 6:case 38:case 134:case 166:H(d,f[5],f[1]),D(d+1,f[5],f[1]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 20:case 21:case 52:case 53:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 144:case 145:case 176:case 177:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 192:case 193:case 196:case 197:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 96:case 97:case 100:case 101:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 40:case 44:case 168:case 172:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 9:case 13:case 137:case 141:H(d,f[5],f[2]),H(d+1,f[5],f[2]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 18:case 50:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),O[d+g+2]=f[5],x(d+g+3,f[6],f[5])),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 80:case 81:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(O[d+(g<<1)+2]=f[5],x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6])),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 72:case 76:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(x(d+(g<<1),f[4],f[5]),O[d+(g<<1)+1]=f[5],x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 10:case 138:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5]),O[d+g+1]=f[5]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 66:H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 24:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 7:case 39:case 135:case 167:H(d,f[5],f[4]),C(d+1,f[5],f[4]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 148:case 149:case 180:case 181:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 224:case 228:case 225:case 229:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 41:case 169:case 45:case 173:H(d,f[5],f[2]),H(d+1,f[5],f[2]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 22:case 54:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),O[d+g+2]=f[5],y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 208:case 209:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6])),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 104:case 108:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 11:case 139:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),O[d+g+1]=f[5],C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 19:case 51:v(f[2],f[6])?(H(d,f[5],f[4]),C(d+1,f[5],f[4]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(D(d,f[5],f[2]),D(d+1,f[2],f[5]),H(d+2,f[2],f[6]),x(d+3,f[2],f[6]),E(d+g+2,f[5],f[6],f[2]),I(d+g+3,f[6],f[5],f[2])),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 146:case 178:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g+3,f[5],f[8])):(I(d+2,f[2],f[5],f[6]),x(d+3,f[2],f[6]),E(d+g+2,f[5],f[6],f[2]),H(d+g+3,f[6],f[2]),D(d+(g<<1)+3,f[6],f[5]),D(d+3*g+3,f[5],f[6])),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),C(d+(g<<1)+2,f[5],f[8]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),H(d+3*g+2,f[5],f[8]);break;case 84:case 85:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),H(d+2,f[5],f[2]),v(f[6],f[8])?(H(d+3,f[5],f[2]),C(d+g+3,f[5],f[2]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(D(d+3,f[5],f[6]),D(d+g+3,f[6],f[5]),E(d+(g<<1)+2,f[5],f[6],f[8]),H(d+(g<<1)+3,f[6],f[8]),I(d+3*g+2,f[8],f[5],f[6]),x(d+3*g+3,f[8],f[6])),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),C(d+g+2,f[5],f[2]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 112:case 113:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(E(d+(g<<1)+2,f[5],f[6],f[8]),I(d+(g<<1)+3,f[6],f[5],f[8]),D(d+3*g,f[5],f[8]),D(d+3*g+1,f[8],f[5]),H(d+3*g+2,f[8],f[6]),x(d+3*g+3,f[8],f[6]));break;case 200:case 204:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6])):(I(d+(g<<1),f[4],f[5],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),x(d+3*g,f[8],f[4]),H(d+3*g+1,f[8],f[4]),D(d+3*g+2,f[8],f[5]),D(d+3*g+3,f[5],f[8])),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]);break;case 73:case 77:v(f[8],f[4])?(H(d,f[5],f[2]),C(d+g,f[5],f[2]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(D(d,f[5],f[4]),D(d+g,f[4],f[5]),H(d+(g<<1),f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),x(d+3*g,f[8],f[4]),I(d+3*g+1,f[8],f[5],f[4])),H(d+1,f[5],f[2]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),C(d+g+1,f[5],f[2]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 42:case 170:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+(g<<1),f[5],f[8]),H(d+3*g,f[5],f[8])):(x(d,f[2],f[4]),I(d+1,f[2],f[5],f[4]),H(d+g,f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),D(d+(g<<1),f[4],f[5]),D(d+3*g,f[5],f[4])),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),C(d+(g<<1)+1,f[5],f[8]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),H(d+3*g+1,f[5],f[8]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 14:case 142:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(x(d,f[2],f[4]),H(d+1,f[2],f[4]),D(d+2,f[2],f[5]),D(d+3,f[5],f[2]),I(d+g,f[4],f[5],f[2]),E(d+g+1,f[5],f[4],f[2])),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 67:H(d,f[5],f[4]),C(d+1,f[5],f[4]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 70:H(d,f[5],f[1]),D(d+1,f[5],f[1]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 28:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 152:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 194:H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 98:H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 56:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 25:H(d,f[5],f[2]),H(d+1,f[5],f[2]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 26:case 31:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),O[d+g+1]=f[5],O[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 82:case 214:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),O[d+g+2]=f[5],y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6])),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 88:case 248:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6]));break;case 74:case 107:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),O[d+g+1]=f[5],C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 27:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),O[d+g+1]=f[5],C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 86:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),O[d+g+2]=f[5],y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 216:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6])),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 106:H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 30:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),O[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 210:H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6])),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 120:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 75:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),O[d+g+1]=f[5],C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 29:H(d,f[5],f[2]),H(d+1,f[5],f[2]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 198:H(d,f[5],f[1]),D(d+1,f[5],f[1]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 184:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 99:H(d,f[5],f[4]),C(d+1,f[5],f[4]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 57:H(d,f[5],f[2]),H(d+1,f[5],f[2]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 71:H(d,f[5],f[4]),C(d+1,f[5],f[4]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 156:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 226:H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 60:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 195:H(d,f[5],f[4]),C(d+1,f[5],f[4]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 102:H(d,f[5],f[1]),D(d+1,f[5],f[1]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 153:H(d,f[5],f[2]),H(d+1,f[5],f[2]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 58:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(I(d,f[5],f[2],f[4]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),O[d+g+1]=f[5]),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(D(d+2,f[5],f[2]),I(d+3,f[5],f[2],f[6]),O[d+g+2]=f[5],D(d+g+3,f[5],f[6])),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 83:H(d,f[5],f[4]),C(d+1,f[5],f[4]),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(D(d+2,f[5],f[2]),I(d+3,f[5],f[2],f[6]),O[d+g+2]=f[5],D(d+g+3,f[5],f[6])),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(O[d+(g<<1)+2]=f[5],D(d+(g<<1)+3,f[5],f[6]),D(d+3*g+2,f[5],f[8]),I(d+3*g+3,f[5],f[8],f[6])),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 92:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(D(d+(g<<1),f[5],f[4]),O[d+(g<<1)+1]=f[5],I(d+3*g,f[5],f[8],f[4]),D(d+3*g+1,f[5],f[8])),v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(O[d+(g<<1)+2]=f[5],D(d+(g<<1)+3,f[5],f[6]),D(d+3*g+2,f[5],f[8]),I(d+3*g+3,f[5],f[8],f[6]));break;case 202:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(I(d,f[5],f[2],f[4]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),O[d+g+1]=f[5]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(D(d+(g<<1),f[5],f[4]),O[d+(g<<1)+1]=f[5],I(d+3*g,f[5],f[8],f[4]),D(d+3*g+1,f[5],f[8])),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 78:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(I(d,f[5],f[2],f[4]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),O[d+g+1]=f[5]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(D(d+(g<<1),f[5],f[4]),O[d+(g<<1)+1]=f[5],I(d+3*g,f[5],f[8],f[4]),D(d+3*g+1,f[5],f[8])),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 154:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(I(d,f[5],f[2],f[4]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),O[d+g+1]=f[5]),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(D(d+2,f[5],f[2]),I(d+3,f[5],f[2],f[6]),O[d+g+2]=f[5],D(d+g+3,f[5],f[6])),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 114:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(D(d+2,f[5],f[2]),I(d+3,f[5],f[2],f[6]),O[d+g+2]=f[5],D(d+g+3,f[5],f[6])),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(O[d+(g<<1)+2]=f[5],D(d+(g<<1)+3,f[5],f[6]),D(d+3*g+2,f[5],f[8]),I(d+3*g+3,f[5],f[8],f[6])),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]);break;case 89:H(d,f[5],f[2]),H(d+1,f[5],f[2]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(D(d+(g<<1),f[5],f[4]),O[d+(g<<1)+1]=f[5],I(d+3*g,f[5],f[8],f[4]),D(d+3*g+1,f[5],f[8])),v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(O[d+(g<<1)+2]=f[5],D(d+(g<<1)+3,f[5],f[6]),D(d+3*g+2,f[5],f[8]),I(d+3*g+3,f[5],f[8],f[6]));break;case 90:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(I(d,f[5],f[2],f[4]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),O[d+g+1]=f[5]),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(D(d+2,f[5],f[2]),I(d+3,f[5],f[2],f[6]),O[d+g+2]=f[5],D(d+g+3,f[5],f[6])),v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(D(d+(g<<1),f[5],f[4]),O[d+(g<<1)+1]=f[5],I(d+3*g,f[5],f[8],f[4]),D(d+3*g+1,f[5],f[8])),v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(O[d+(g<<1)+2]=f[5],D(d+(g<<1)+3,f[5],f[6]),D(d+3*g+2,f[5],f[8]),I(d+3*g+3,f[5],f[8],f[6]));break;case 55:case 23:v(f[2],f[6])?(H(d,f[5],f[4]),C(d+1,f[5],f[4]),O[d+2]=f[5],O[d+3]=f[5],O[d+g+2]=f[5],O[d+g+3]=f[5]):(D(d,f[5],f[2]),D(d+1,f[2],f[5]),H(d+2,f[2],f[6]),x(d+3,f[2],f[6]),E(d+g+2,f[5],f[6],f[2]),I(d+g+3,f[6],f[5],f[2])),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 182:case 150:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+2]=f[5],O[d+g+3]=f[5],C(d+(g<<1)+3,f[5],f[8]),H(d+3*g+3,f[5],f[8])):(I(d+2,f[2],f[5],f[6]),x(d+3,f[2],f[6]),E(d+g+2,f[5],f[6],f[2]),H(d+g+3,f[6],f[2]),D(d+(g<<1)+3,f[6],f[5]),D(d+3*g+3,f[5],f[6])),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),C(d+(g<<1)+2,f[5],f[8]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),H(d+3*g+2,f[5],f[8]);break;case 213:case 212:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),H(d+2,f[5],f[2]),v(f[6],f[8])?(H(d+3,f[5],f[2]),C(d+g+3,f[5],f[2]),O[d+(g<<1)+2]=f[5],O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(D(d+3,f[5],f[6]),D(d+g+3,f[6],f[5]),E(d+(g<<1)+2,f[5],f[6],f[8]),H(d+(g<<1)+3,f[6],f[8]),I(d+3*g+2,f[8],f[5],f[6]),x(d+3*g+3,f[8],f[6])),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),C(d+g+2,f[5],f[2]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 241:case 240:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),v(f[6],f[8])?(O[d+(g<<1)+2]=f[5],O[d+(g<<1)+3]=f[5],H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(E(d+(g<<1)+2,f[5],f[6],f[8]),I(d+(g<<1)+3,f[6],f[5],f[8]),D(d+3*g,f[5],f[8]),D(d+3*g+1,f[8],f[5]),H(d+3*g+2,f[8],f[6]),x(d+3*g+3,f[8],f[6]));break;case 236:case 232:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+(g<<1)+1]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5],C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6])):(I(d+(g<<1),f[4],f[5],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),x(d+3*g,f[8],f[4]),H(d+3*g+1,f[8],f[4]),D(d+3*g+2,f[8],f[5]),D(d+3*g+3,f[5],f[8])),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]);break;case 109:case 105:v(f[8],f[4])?(H(d,f[5],f[2]),C(d+g,f[5],f[2]),O[d+(g<<1)]=f[5],O[d+(g<<1)+1]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(D(d,f[5],f[4]),D(d+g,f[4],f[5]),H(d+(g<<1),f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),x(d+3*g,f[8],f[4]),I(d+3*g+1,f[8],f[5],f[4])),H(d+1,f[5],f[2]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),C(d+g+1,f[5],f[2]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 171:case 43:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5],O[d+g+1]=f[5],C(d+(g<<1),f[5],f[8]),H(d+3*g,f[5],f[8])):(x(d,f[2],f[4]),I(d+1,f[2],f[5],f[4]),H(d+g,f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),D(d+(g<<1),f[4],f[5]),D(d+3*g,f[5],f[4])),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),C(d+(g<<1)+1,f[5],f[8]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),H(d+3*g+1,f[5],f[8]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 143:case 15:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),O[d+g]=f[5],O[d+g+1]=f[5]):(x(d,f[2],f[4]),H(d+1,f[2],f[4]),D(d+2,f[2],f[5]),D(d+3,f[5],f[2]),I(d+g,f[4],f[5],f[2]),E(d+g+1,f[5],f[4],f[2])),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 124:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 203:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),O[d+g+1]=f[5],C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 62:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),O[d+g+2]=f[5],C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 211:H(d,f[5],f[4]),C(d+1,f[5],f[4]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6])),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 118:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),O[d+g+2]=f[5],H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 217:H(d,f[5],f[2]),H(d+1,f[5],f[2]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6])),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 110:H(d,f[5],f[1]),D(d+1,f[5],f[1]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 155:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),O[d+g+1]=f[5],C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 188:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 185:H(d,f[5],f[2]),H(d+1,f[5],f[2]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 61:H(d,f[5],f[2]),H(d+1,f[5],f[2]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 157:H(d,f[5],f[2]),H(d+1,f[5],f[2]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 103:H(d,f[5],f[4]),C(d+1,f[5],f[4]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 227:H(d,f[5],f[4]),C(d+1,f[5],f[4]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 230:H(d,f[5],f[1]),D(d+1,f[5],f[1]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 199:H(d,f[5],f[4]),C(d+1,f[5],f[4]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 220:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(D(d+(g<<1),f[5],f[4]),O[d+(g<<1)+1]=f[5],I(d+3*g,f[5],f[8],f[4]),D(d+3*g+1,f[5],f[8])),O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6]));break;case 158:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(I(d,f[5],f[2],f[4]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),O[d+g+1]=f[5]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),O[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 234:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(I(d,f[5],f[2],f[4]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),O[d+g+1]=f[5]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 242:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(D(d+2,f[5],f[2]),I(d+3,f[5],f[2],f[6]),O[d+g+2]=f[5],D(d+g+3,f[5],f[6])),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6])),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]);break;case 59:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(D(d+2,f[5],f[2]),I(d+3,f[5],f[2],f[6]),O[d+g+2]=f[5],D(d+g+3,f[5],f[6])),O[d+g+1]=f[5],C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 121:H(d,f[5],f[2]),H(d+1,f[5],f[2]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(O[d+(g<<1)+2]=f[5],D(d+(g<<1)+3,f[5],f[6]),D(d+3*g+2,f[5],f[8]),I(d+3*g+3,f[5],f[8],f[6]));break;case 87:H(d,f[5],f[4]),C(d+1,f[5],f[4]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),O[d+g+2]=f[5],y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(O[d+(g<<1)+2]=f[5],D(d+(g<<1)+3,f[5],f[6]),D(d+3*g+2,f[5],f[8]),I(d+3*g+3,f[5],f[8],f[6])),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 79:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),O[d+g+1]=f[5],C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(D(d+(g<<1),f[5],f[4]),O[d+(g<<1)+1]=f[5],I(d+3*g,f[5],f[8],f[4]),D(d+3*g+1,f[5],f[8])),C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 122:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(I(d,f[5],f[2],f[4]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),O[d+g+1]=f[5]),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(D(d+2,f[5],f[2]),I(d+3,f[5],f[2],f[6]),O[d+g+2]=f[5],D(d+g+3,f[5],f[6])),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(O[d+(g<<1)+2]=f[5],D(d+(g<<1)+3,f[5],f[6]),D(d+3*g+2,f[5],f[8]),I(d+3*g+3,f[5],f[8],f[6]));break;case 94:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(I(d,f[5],f[2],f[4]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),O[d+g+1]=f[5]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),O[d+g+2]=f[5],v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(D(d+(g<<1),f[5],f[4]),O[d+(g<<1)+1]=f[5],I(d+3*g,f[5],f[8],f[4]),D(d+3*g+1,f[5],f[8])),v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(O[d+(g<<1)+2]=f[5],D(d+(g<<1)+3,f[5],f[6]),D(d+3*g+2,f[5],f[8]),I(d+3*g+3,f[5],f[8],f[6]));break;case 218:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(I(d,f[5],f[2],f[4]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),O[d+g+1]=f[5]),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(D(d+2,f[5],f[2]),I(d+3,f[5],f[2],f[6]),O[d+g+2]=f[5],D(d+g+3,f[5],f[6])),v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(D(d+(g<<1),f[5],f[4]),O[d+(g<<1)+1]=f[5],I(d+3*g,f[5],f[8],f[4]),D(d+3*g+1,f[5],f[8])),O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6]));break;case 91:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(D(d+2,f[5],f[2]),I(d+3,f[5],f[2],f[6]),O[d+g+2]=f[5],D(d+g+3,f[5],f[6])),O[d+g+1]=f[5],v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(D(d+(g<<1),f[5],f[4]),O[d+(g<<1)+1]=f[5],I(d+3*g,f[5],f[8],f[4]),D(d+3*g+1,f[5],f[8])),v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(O[d+(g<<1)+2]=f[5],D(d+(g<<1)+3,f[5],f[6]),D(d+3*g+2,f[5],f[8]),I(d+3*g+3,f[5],f[8],f[6]));break;case 186:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(I(d,f[5],f[2],f[4]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),O[d+g+1]=f[5]),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(D(d+2,f[5],f[2]),I(d+3,f[5],f[2],f[6]),O[d+g+2]=f[5],D(d+g+3,f[5],f[6])),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 115:H(d,f[5],f[4]),C(d+1,f[5],f[4]),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(D(d+2,f[5],f[2]),I(d+3,f[5],f[2],f[6]),O[d+g+2]=f[5],D(d+g+3,f[5],f[6])),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(O[d+(g<<1)+2]=f[5],D(d+(g<<1)+3,f[5],f[6]),D(d+3*g+2,f[5],f[8]),I(d+3*g+3,f[5],f[8],f[6])),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]);break;case 93:H(d,f[5],f[2]),H(d+1,f[5],f[2]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(D(d+(g<<1),f[5],f[4]),O[d+(g<<1)+1]=f[5],I(d+3*g,f[5],f[8],f[4]),D(d+3*g+1,f[5],f[8])),v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(O[d+(g<<1)+2]=f[5],D(d+(g<<1)+3,f[5],f[6]),D(d+3*g+2,f[5],f[8]),I(d+3*g+3,f[5],f[8],f[6]));break;case 206:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(I(d,f[5],f[2],f[4]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),O[d+g+1]=f[5]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(D(d+(g<<1),f[5],f[4]),O[d+(g<<1)+1]=f[5],I(d+3*g,f[5],f[8],f[4]),D(d+3*g+1,f[5],f[8])),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 205:case 201:H(d,f[5],f[2]),H(d+1,f[5],f[2]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),v(f[8],f[4])?(D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7])):(D(d+(g<<1),f[5],f[4]),O[d+(g<<1)+1]=f[5],I(d+3*g,f[5],f[8],f[4]),D(d+3*g+1,f[5],f[8])),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 174:case 46:v(f[4],f[2])?(H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1])):(I(d,f[5],f[2],f[4]),D(d+1,f[5],f[2]),D(d+g,f[5],f[4]),O[d+g+1]=f[5]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 179:case 147:H(d,f[5],f[4]),C(d+1,f[5],f[4]),v(f[2],f[6])?(D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3])):(D(d+2,f[5],f[2]),I(d+3,f[5],f[2],f[6]),O[d+g+2]=f[5],D(d+g+3,f[5],f[6])),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 117:case 116:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),v(f[6],f[8])?(C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9])):(O[d+(g<<1)+2]=f[5],D(d+(g<<1)+3,f[5],f[6]),D(d+3*g+2,f[5],f[8]),I(d+3*g+3,f[5],f[8],f[6])),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]);break;case 189:H(d,f[5],f[2]),H(d+1,f[5],f[2]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 231:H(d,f[5],f[4]),C(d+1,f[5],f[4]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 126:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),O[d+g+2]=f[5],v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 219:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),O[d+g+1]=f[5],C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6])),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 125:v(f[8],f[4])?(H(d,f[5],f[2]),C(d+g,f[5],f[2]),O[d+(g<<1)]=f[5],O[d+(g<<1)+1]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(D(d,f[5],f[4]),D(d+g,f[4],f[5]),H(d+(g<<1),f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),x(d+3*g,f[8],f[4]),I(d+3*g+1,f[8],f[5],f[4])),H(d+1,f[5],f[2]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 221:H(d,f[5],f[2]),H(d+1,f[5],f[2]),H(d+2,f[5],f[2]),v(f[6],f[8])?(H(d+3,f[5],f[2]),C(d+g+3,f[5],f[2]),O[d+(g<<1)+2]=f[5],O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(D(d+3,f[5],f[6]),D(d+g+3,f[6],f[5]),E(d+(g<<1)+2,f[5],f[6],f[8]),H(d+(g<<1)+3,f[6],f[8]),I(d+3*g+2,f[8],f[5],f[6]),x(d+3*g+3,f[8],f[6])),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[2]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 207:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),O[d+g]=f[5],O[d+g+1]=f[5]):(x(d,f[2],f[4]),H(d+1,f[2],f[4]),D(d+2,f[2],f[5]),D(d+3,f[5],f[2]),I(d+g,f[4],f[5],f[2]),E(d+g+1,f[5],f[4],f[2])),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 238:H(d,f[5],f[1]),D(d+1,f[5],f[1]),C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+(g<<1)+1]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5],C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6])):(I(d+(g<<1),f[4],f[5],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),x(d+3*g,f[8],f[4]),H(d+3*g+1,f[8],f[4]),D(d+3*g+2,f[8],f[5]),D(d+3*g+3,f[5],f[8])),C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]);break;case 190:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+2]=f[5],O[d+g+3]=f[5],C(d+(g<<1)+3,f[5],f[8]),H(d+3*g+3,f[5],f[8])):(I(d+2,f[2],f[5],f[6]),x(d+3,f[2],f[6]),E(d+g+2,f[5],f[6],f[2]),H(d+g+3,f[6],f[2]),D(d+(g<<1)+3,f[6],f[5]),D(d+3*g+3,f[5],f[6])),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[8]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),H(d+3*g+2,f[5],f[8]);break;case 187:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5],O[d+g+1]=f[5],C(d+(g<<1),f[5],f[8]),H(d+3*g,f[5],f[8])):(x(d,f[2],f[4]),I(d+1,f[2],f[5],f[4]),H(d+g,f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),D(d+(g<<1),f[4],f[5]),D(d+3*g,f[5],f[4])),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g+1,f[5],f[8]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 243:H(d,f[5],f[4]),C(d+1,f[5],f[4]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),v(f[6],f[8])?(O[d+(g<<1)+2]=f[5],O[d+(g<<1)+3]=f[5],H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(E(d+(g<<1)+2,f[5],f[6],f[8]),I(d+(g<<1)+3,f[6],f[5],f[8]),D(d+3*g,f[5],f[8]),D(d+3*g+1,f[8],f[5]),H(d+3*g+2,f[8],f[6]),x(d+3*g+3,f[8],f[6]));break;case 119:v(f[2],f[6])?(H(d,f[5],f[4]),C(d+1,f[5],f[4]),O[d+2]=f[5],O[d+3]=f[5],O[d+g+2]=f[5],O[d+g+3]=f[5]):(D(d,f[5],f[2]),D(d+1,f[2],f[5]),H(d+2,f[2],f[6]),x(d+3,f[2],f[6]),E(d+g+2,f[5],f[6],f[2]),I(d+g+3,f[6],f[5],f[2])),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 237:case 233:H(d,f[5],f[2]),H(d+1,f[5],f[2]),y(d+2,f[5],f[2],f[6]),I(d+3,f[5],f[2],f[6]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),E(d+g+2,f[5],f[6],f[2]),y(d+g+3,f[5],f[6],f[2]),O[d+(g<<1)]=f[5],O[d+(g<<1)+1]=f[5],C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),v(f[8],f[4])?O[d+3*g]=f[5]:I(d+3*g,f[5],f[8],f[4]),O[d+3*g+1]=f[5],C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 175:case 47:v(f[4],f[2])?O[d]=f[5]:I(d,f[5],f[2],f[4]),O[d+1]=f[5],C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),O[d+g]=f[5],O[d+g+1]=f[5],C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),E(d+(g<<1)+2,f[5],f[6],f[8]),y(d+(g<<1)+3,f[5],f[6],f[8]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),y(d+3*g+2,f[5],f[8],f[6]),I(d+3*g+3,f[5],f[8],f[6]);break;case 183:case 151:H(d,f[5],f[4]),C(d+1,f[5],f[4]),O[d+2]=f[5],v(f[2],f[6])?O[d+3]=f[5]:I(d+3,f[5],f[2],f[6]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),O[d+g+2]=f[5],O[d+g+3]=f[5],y(d+(g<<1),f[5],f[4],f[8]),E(d+(g<<1)+1,f[5],f[4],f[8]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),I(d+3*g,f[5],f[8],f[4]),y(d+3*g+1,f[5],f[8],f[4]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 245:case 244:I(d,f[5],f[2],f[4]),y(d+1,f[5],f[2],f[4]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),y(d+g,f[5],f[4],f[2]),E(d+g+1,f[5],f[4],f[2]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),O[d+(g<<1)+2]=f[5],O[d+(g<<1)+3]=f[5],H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),O[d+3*g+2]=f[5],v(f[6],f[8])?O[d+3*g+3]=f[5]:I(d+3*g+3,f[5],f[8],f[6]);break;case 250:H(d,f[5],f[1]),D(d+1,f[5],f[1]),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6]));break;case 123:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),O[d+g+1]=f[5],C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 95:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),O[d+g+1]=f[5],O[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 222:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),O[d+g+2]=f[5],D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6])),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 252:H(d,f[5],f[1]),y(d+1,f[5],f[2],f[1]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],O[d+(g<<1)+2]=f[5],O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],v(f[6],f[8])?O[d+3*g+3]=f[5]:I(d+3*g+3,f[5],f[8],f[6]);break;case 249:H(d,f[5],f[2]),H(d+1,f[5],f[2]),y(d+2,f[5],f[2],f[3]),H(d+3,f[5],f[3]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),O[d+(g<<1)]=f[5],O[d+(g<<1)+1]=f[5],O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6])),v(f[8],f[4])?O[d+3*g]=f[5]:I(d+3*g,f[5],f[8],f[4]),O[d+3*g+1]=f[5];break;case 235:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),O[d+g+1]=f[5],C(d+g+2,f[5],f[3]),y(d+g+3,f[5],f[6],f[3]),O[d+(g<<1)]=f[5],O[d+(g<<1)+1]=f[5],C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),v(f[8],f[4])?O[d+3*g]=f[5]:I(d+3*g,f[5],f[8],f[4]),O[d+3*g+1]=f[5],C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 111:v(f[4],f[2])?O[d]=f[5]:I(d,f[5],f[2],f[4]),O[d+1]=f[5],C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),O[d+g]=f[5],O[d+g+1]=f[5],C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],C(d+(g<<1)+2,f[5],f[9]),y(d+(g<<1)+3,f[5],f[6],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 63:v(f[4],f[2])?O[d]=f[5]:I(d,f[5],f[2],f[4]),O[d+1]=f[5],v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),O[d+g]=f[5],O[d+g+1]=f[5],O[d+g+2]=f[5],C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),y(d+3*g+2,f[5],f[8],f[9]),H(d+3*g+3,f[5],f[9]);break;case 159:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),O[d+2]=f[5],v(f[2],f[6])?O[d+3]=f[5]:I(d+3,f[5],f[2],f[6]),O[d+g+1]=f[5],O[d+g+2]=f[5],O[d+g+3]=f[5],D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g,f[5],f[7]),y(d+3*g+1,f[5],f[8],f[7]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 215:H(d,f[5],f[4]),C(d+1,f[5],f[4]),O[d+2]=f[5],v(f[2],f[6])?O[d+3]=f[5]:I(d+3,f[5],f[2],f[6]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),O[d+g+2]=f[5],O[d+g+3]=f[5],y(d+(g<<1),f[5],f[4],f[7]),C(d+(g<<1)+1,f[5],f[7]),O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6])),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 246:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),y(d+g,f[5],f[4],f[1]),C(d+g+1,f[5],f[1]),O[d+g+2]=f[5],H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),O[d+(g<<1)+2]=f[5],O[d+(g<<1)+3]=f[5],H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),O[d+3*g+2]=f[5],v(f[6],f[8])?O[d+3*g+3]=f[5]:I(d+3*g+3,f[5],f[8],f[6]);break;case 254:H(d,f[5],f[1]),D(d+1,f[5],f[1]),v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),D(d+g,f[5],f[1]),C(d+g+1,f[5],f[1]),O[d+g+2]=f[5],v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],O[d+(g<<1)+2]=f[5],O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],v(f[6],f[8])?O[d+3*g+3]=f[5]:I(d+3*g+3,f[5],f[8],f[6]);break;case 253:H(d,f[5],f[2]),H(d+1,f[5],f[2]),H(d+2,f[5],f[2]),H(d+3,f[5],f[2]),C(d+g,f[5],f[2]),C(d+g+1,f[5],f[2]),C(d+g+2,f[5],f[2]),C(d+g+3,f[5],f[2]),O[d+(g<<1)]=f[5],O[d+(g<<1)+1]=f[5],O[d+(g<<1)+2]=f[5],O[d+(g<<1)+3]=f[5],v(f[8],f[4])?O[d+3*g]=f[5]:I(d+3*g,f[5],f[8],f[4]),O[d+3*g+1]=f[5],O[d+3*g+2]=f[5],v(f[6],f[8])?O[d+3*g+3]=f[5]:I(d+3*g+3,f[5],f[8],f[6]);break;case 251:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),D(d+2,f[5],f[3]),H(d+3,f[5],f[3]),O[d+g+1]=f[5],C(d+g+2,f[5],f[3]),D(d+g+3,f[5],f[3]),O[d+(g<<1)]=f[5],O[d+(g<<1)+1]=f[5],O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6])),v(f[8],f[4])?O[d+3*g]=f[5]:I(d+3*g,f[5],f[8],f[4]),O[d+3*g+1]=f[5];break;case 239:v(f[4],f[2])?O[d]=f[5]:I(d,f[5],f[2],f[4]),O[d+1]=f[5],C(d+2,f[5],f[6]),H(d+3,f[5],f[6]),O[d+g]=f[5],O[d+g+1]=f[5],C(d+g+2,f[5],f[6]),H(d+g+3,f[5],f[6]),O[d+(g<<1)]=f[5],O[d+(g<<1)+1]=f[5],C(d+(g<<1)+2,f[5],f[6]),H(d+(g<<1)+3,f[5],f[6]),v(f[8],f[4])?O[d+3*g]=f[5]:I(d+3*g,f[5],f[8],f[4]),O[d+3*g+1]=f[5],C(d+3*g+2,f[5],f[6]),H(d+3*g+3,f[5],f[6]);break;case 127:v(f[4],f[2])?O[d]=f[5]:I(d,f[5],f[2],f[4]),O[d+1]=f[5],v(f[2],f[6])?(O[d+2]=f[5],O[d+3]=f[5],O[d+g+3]=f[5]):(x(d+2,f[2],f[5]),x(d+3,f[2],f[6]),x(d+g+3,f[6],f[5])),O[d+g]=f[5],O[d+g+1]=f[5],O[d+g+2]=f[5],v(f[8],f[4])?(O[d+(g<<1)]=f[5],O[d+3*g]=f[5],O[d+3*g+1]=f[5]):(x(d+(g<<1),f[4],f[5]),x(d+3*g,f[8],f[4]),x(d+3*g+1,f[8],f[5])),O[d+(g<<1)+1]=f[5],C(d+(g<<1)+2,f[5],f[9]),D(d+(g<<1)+3,f[5],f[9]),D(d+3*g+2,f[5],f[9]),H(d+3*g+3,f[5],f[9]);break;case 191:v(f[4],f[2])?O[d]=f[5]:I(d,f[5],f[2],f[4]),O[d+1]=f[5],O[d+2]=f[5],v(f[2],f[6])?O[d+3]=f[5]:I(d+3,f[5],f[2],f[6]),O[d+g]=f[5],O[d+g+1]=f[5],O[d+g+2]=f[5],O[d+g+3]=f[5],C(d+(g<<1),f[5],f[8]),C(d+(g<<1)+1,f[5],f[8]),C(d+(g<<1)+2,f[5],f[8]),C(d+(g<<1)+3,f[5],f[8]),H(d+3*g,f[5],f[8]),H(d+3*g+1,f[5],f[8]),H(d+3*g+2,f[5],f[8]),H(d+3*g+3,f[5],f[8]);break;case 223:v(f[4],f[2])?(O[d]=f[5],O[d+1]=f[5],O[d+g]=f[5]):(x(d,f[2],f[4]),x(d+1,f[2],f[5]),x(d+g,f[4],f[5])),O[d+2]=f[5],v(f[2],f[6])?O[d+3]=f[5]:I(d+3,f[5],f[2],f[6]),O[d+g+1]=f[5],O[d+g+2]=f[5],O[d+g+3]=f[5],D(d+(g<<1),f[5],f[7]),C(d+(g<<1)+1,f[5],f[7]),O[d+(g<<1)+2]=f[5],v(f[6],f[8])?(O[d+(g<<1)+3]=f[5],O[d+3*g+2]=f[5],O[d+3*g+3]=f[5]):(x(d+(g<<1)+3,f[6],f[5]),x(d+3*g+2,f[8],f[5]),x(d+3*g+3,f[8],f[6])),H(d+3*g,f[5],f[7]),D(d+3*g+1,f[5],f[7]);break;case 247:H(d,f[5],f[4]),C(d+1,f[5],f[4]),O[d+2]=f[5],v(f[2],f[6])?O[d+3]=f[5]:I(d+3,f[5],f[2],f[6]),H(d+g,f[5],f[4]),C(d+g+1,f[5],f[4]),O[d+g+2]=f[5],O[d+g+3]=f[5],H(d+(g<<1),f[5],f[4]),C(d+(g<<1)+1,f[5],f[4]),O[d+(g<<1)+2]=f[5],O[d+(g<<1)+3]=f[5],H(d+3*g,f[5],f[4]),C(d+3*g+1,f[5],f[4]),O[d+3*g+2]=f[5],v(f[6],f[8])?O[d+3*g+3]=f[5]:I(d+3*g+3,f[5],f[8],f[6]);break;case 255:v(f[4],f[2])?O[d]=f[5]:I(d,f[5],f[2],f[4]),O[d+1]=f[5],O[d+2]=f[5],v(f[2],f[6])?O[d+3]=f[5]:I(d+3,f[5],f[2],f[6]),O[d+g]=f[5],O[d+g+1]=f[5],O[d+g+2]=f[5],O[d+g+3]=f[5],O[d+(g<<1)]=f[5],O[d+(g<<1)+1]=f[5],O[d+(g<<1)+2]=f[5],O[d+(g<<1)+3]=f[5],v(f[8],f[4])?O[d+3*g]=f[5]:I(d+3*g,f[5],f[8],f[4]),O[d+3*g+1]=f[5],O[d+3*g+2]=f[5],v(f[6],f[8])?O[d+3*g+3]=f[5]:I(d+3*g+3,f[5],f[8],f[6])}w++,d+=4}d+=3*g}};try{c(function(a,e){
    if(-1===[2,3,4].indexOf(e))return a;var c,s,k,t;if(a instanceof ImageData){t=a.data;try{k=new OffscreenCanvas(a.width*e,a.height*e)}catch(c){(k=document.createElement("canvas")).width=a.width*e,k.height=a.height*e}}else if(a instanceof HTMLCanvasElement||a instanceof OffscreenCanvas)s=(c=a).getContext("2d"),k=c,t=s.getImageData(0,0,c.width,c.height).data;else{t=function(a,e,c,s,r){var b=document.createElement("canvas"),k=b.getContext("2d"),t=getVendorAttribute(k,"backingStorePixelRatio")||1;k.getImageDataHD=getVendorAttribute(k,"getImageDataHD");var n=a.width/t,i=a.height/t;return b.width=Math.ceil(n),b.height=Math.ceil(i),k.drawImage(a,0,0,n,i),1===t?k.getImageData(e,c,s,r):k.getImageDataHD(e,c,s,r)}(a,0,0,a.width,a.height).data;try{k=new OffscreenCanvas(a.width*e,a.height*e)}catch(c){(k=document.createElement("canvas")).width=a.width*e,k.height=a.height*e}}
    for(var n,i=a.width*a.height,h=r=new Array(i),o=b=new Array(i*e*e),f=0;f<i;f++)h[f]=(t[3+(n=f<<2)]<<24)+(t[n+2]<<16)+(t[n+1]<<8)+t[n];
    2===e?hq2x(a.width,a.height):3===e?hq3x(a.width,a.height):4===e&&hq4x(a.width,a.height);
    for(var u,g,d=k.getContext("2d"),w=d.getImageData(0,0,k.width,k.height),v=w.data,l=o.length,m=0;m<l;m++)g=(4278190080&(u=o[m]))>>24,v[3+(n=m<<2)]=g<0?g+256:0,// signed/unsigned :/
        v[n+2]=(16711680&u)>>16,v[n+1]=(65280&u)>>8,v[n]=255&u;return r=h=null,b=o=null,d.putImageData(w,0,0),w}(a,e))}catch(a){s(null)}}))};`
    + "return fu;
 */

var fu = function(image_data, scale){return new Promise(function(resolve, reject){

        // ==ClosureCompiler==
        // @compilation_level SIMPLE_OPTIMIZATIONS
        // ==/ClosureCompiler==



            "use strict"; // strict will be optimized on engines (https://developer.mozilla.org/en/JavaScript/Strict_mode)

            var
                _src = null,
                _dest = null,

                _MASK_2 = 0x00FF00,
                _MASK_13 = 0xFF00FF,

                _Ymask = 0x00FF0000,
                _Umask = 0x0000FF00,
                _Vmask = 0x000000FF,

                _trY = 0x00300000,
                _trU = 0x00000700,
                _trV = 0x00000006;

            var _Math = Math; // global to local. SHALL NOT cache abs directly (http://jsperf.com/math-vs-global/2)

            var _RGBtoYUV = function( c ) {
                var r = (c & 0xFF0000) >> 16;
                var g = (c & 0x00FF00) >> 8;
                var b =  c & 0x0000FF;
                return  (((0.299*r + 0.587*g + 0.114*b) | 0) << 16) +
                    ((((-0.169*r - 0.331*g + 0.5*b) + 128) | 0) << 8) +
                    (((0.5*r - 0.419*g - 0.081*b) + 128) | 0);
            };

            var _Diff = function( w1, w2 ) {
                // Mask against RGB_MASK to discard the alpha channel
                var YUV1 = _RGBtoYUV(w1);
                var YUV2 = _RGBtoYUV(w2);
                return  ((_Math.abs((YUV1 & _Ymask) - (YUV2 & _Ymask)) > _trY ) ||
                    ( _Math.abs((YUV1 & _Umask) - (YUV2 & _Umask)) > _trU ) ||
                    ( _Math.abs((YUV1 & _Vmask) - (YUV2 & _Vmask)) > _trV ) );
            };

            

            var _Interp1 = function( pc, c1, c2 ) {
                //*pc = (c1*3+c2) >> 2;
                if (c1 === c2) {
                    _dest[pc] = c1;
                    return;
                }
                _dest[pc] = ((((c1 & _MASK_2) * 3 + (c2 & _MASK_2)) >> 2) & _MASK_2) +
                    ((((c1 & _MASK_13) * 3 + (c2 & _MASK_13)) >> 2) & _MASK_13);

                _dest[pc] |= (c1 & 0xFF000000);
            };

            var _Interp2 = function( pc, c1, c2, c3 ) {
                //*pc = (c1*2+c2+c3) >> 2;
                _dest[pc] = (((((c1 & _MASK_2) << 1) + (c2 & _MASK_2) + (c3 & _MASK_2)) >> 2) & _MASK_2) +
                    (((((c1 & _MASK_13) << 1) + (c2 & _MASK_13) + (c3 & _MASK_13)) >> 2) & _MASK_13);

                _dest[pc] |= (c1 & 0xFF000000);
            };

            var _Interp3 = function( pc, c1, c2 ) {
                //*pc = (c1*7+c2)/8;
                if (c1 === c2) {
                    _dest[pc] = c1;
                    return;
                }
                _dest[pc] = ((((c1 & _MASK_2) * 7 + (c2 & _MASK_2)) >> 3) & _MASK_2) +
                    ((((c1 & _MASK_13) * 7 + (c2 & _MASK_13)) >> 3) & _MASK_13);

                _dest[pc] |= (c1 & 0xFF000000);
            };

            var _Interp4 = function( pc, c1, c2, c3 ) {
                //*pc = (c1*2+(c2+c3)*7)/16;
                _dest[pc] = (((((c1 & _MASK_2) << 1) + (c2 & _MASK_2) * 7 + (c3 & _MASK_2) * 7) >> 4) & _MASK_2) +
                    (((((c1 & _MASK_13) << 1) + (c2 & _MASK_13) * 7 + (c3 & _MASK_13) * 7) >> 4) & _MASK_13);

                _dest[pc] |= (c1 & 0xFF000000);
            };

            var _Interp5 = function( pc, c1, c2 ) {
                //*pc = (c1+c2) >> 1;
                if (c1 === c2) {
                    _dest[pc] = c1;
                    return;
                }
                _dest[pc] = ((((c1 & _MASK_2) + (c2 & _MASK_2)) >> 1) & _MASK_2) +
                    ((((c1 & _MASK_13) + (c2 & _MASK_13)) >> 1) & _MASK_13);

                _dest[pc] |= (c1 & 0xFF000000);
            };

            var _Interp6 = function( pc, c1, c2, c3 ) {
                //*pc = (c1*5+c2*2+c3)/8;
                _dest[pc] = ((((c1 & _MASK_2) * 5 + ((c2 & _MASK_2) << 1) + (c3 & _MASK_2)) >> 3) & _MASK_2) +
                    ((((c1 & _MASK_13) * 5 + ((c2 & _MASK_13) << 1) + (c3 & _MASK_13)) >> 3) & _MASK_13);

                _dest[pc] |= (c1 & 0xFF000000);
            };

            var _Interp7 = function( pc, c1, c2, c3 ) {
                //*pc = (c1*6+c2+c3)/8;
                _dest[pc] = ((((c1 & _MASK_2) * 6 + (c2 & _MASK_2) + (c3 & _MASK_2)) >> 3) & _MASK_2) +
                    ((((c1 & _MASK_13) * 6 + (c2 & _MASK_13) + (c3 & _MASK_13)) >> 3) & _MASK_13);

                _dest[pc] |= (c1 & 0xFF000000);
            };

            var _Interp8 = function( pc, c1, c2 ) {
                //*pc = (c1*5+c2*3)/8;
                if (c1 === c2) {
                    _dest[pc] = c1;
                    return;
                }
                _dest[pc] = ((((c1 & _MASK_2) * 5 + (c2 & _MASK_2) * 3) >> 3) & _MASK_2) +
                    ((((c1 & _MASK_13) * 5 + (c2 & _MASK_13) * 3) >> 3) & _MASK_13);

                _dest[pc] |= (c1 & 0xFF000000);
            };

            var _Interp9 = function( pc, c1, c2, c3 ) {
                //*pc = (c1*2+(c2+c3)*3)/8;
                _dest[pc] = (((((c1 & _MASK_2) << 1) + (c2 & _MASK_2) * 3 + (c3 & _MASK_2) * 3) >> 3) & _MASK_2) +
                    (((((c1 & _MASK_13) << 1) + (c2 & _MASK_13) * 3 + (c3 & _MASK_13) * 3) >> 3) & _MASK_13);

                _dest[pc] |= (c1 & 0xFF000000);
            };

            var _Interp10 = function( pc, c1, c2, c3 ) {
                //*pc = (c1*14+c2+c3)/16;
                _dest[pc] = ((((c1 & _MASK_2) * 14 + (c2 & _MASK_2) + (c3 & _MASK_2)) >> 4) & _MASK_2) +
                    ((((c1 & _MASK_13) * 14 + (c2 & _MASK_13) + (c3 & _MASK_13)) >> 4) & _MASK_13);

                _dest[pc] |= (c1 & 0xFF000000);
            };


            var getVendorAttribute = function( el, attr ) {
                var uc = attr.charAt(0).toUpperCase() + attr.substr(1);
                return el[attr] || el['ms'+uc] || el['moz'+uc] || el['webkit'+uc] || el['o'+uc];
            };


// This function normalizes getImageData to extract the real, actual
// pixels from an image. The naive method recently failed on retina
// devices with a backgingStoreRatio != 1
            var getImagePixels = function( image, x, y, width, height ) {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                var ratio = getVendorAttribute( ctx, 'backingStorePixelRatio' ) || 1;
                ctx.getImageDataHD = getVendorAttribute( ctx, 'getImageDataHD' );

                var realWidth = image.width / ratio,
                    realHeight = image.height / ratio;

                canvas.width = Math.ceil( realWidth );
                canvas.height = Math.ceil( realHeight );

                ctx.drawImage( image, 0, 0, realWidth, realHeight );

                return (ratio === 1)
                    ? ctx.getImageData( x, y, width, height )
                    : ctx.getImageDataHD( x, y, width, height );
            };


            var hqx = function( img, scale ) {
                // We can only scale with a factor of 2, 3 or 4
                if( [2,3,4].indexOf(scale) === -1 ) {
                    return img;
                }

                var orig, origCtx, scaled, origPixels;
                if(img instanceof ImageData){

                    origPixels = img.data;
                    try {
                        scaled = new OffscreenCanvas(img.width * scale, img.height * scale);
                    }catch(e) {

                        scaled = document.createElement('canvas');
                        scaled.width = img.width * scale;
                        scaled.height = img.height * scale;
                    }
                }else if (img instanceof HTMLCanvasElement || img instanceof OffscreenCanvas){
                    orig = img;
                    origCtx = orig.getContext('2d');
                    scaled = orig;
                    origPixels = origCtx.getImageData(0, 0, orig.width, orig.height).data;
                } else {
                    origPixels = getImagePixels( img, 0, 0, img.width, img.height ).data;
                    try {
                        scaled = new OffscreenCanvas(img.width * scale, img.height * scale);
                    }catch(e) {

                        scaled = document.createElement('canvas');
                        scaled.width = img.width * scale;
                        scaled.height = img.height * scale;
                    }
                }

                // pack RGBA colors into integers
                var count = img.width * img.height;
                var src = _src = new Array(count);
                var dest = _dest = new Array(count*scale*scale);
                var index;
                for(var i = 0; i < count; i++) {
                    src[i] = (origPixels[(index = i << 2)+3] << 24) +
                        (origPixels[index+2] << 16) +
                        (origPixels[index+1] << 8) +
                        origPixels[index];
                }

                // This is where the magic happens
                if( scale === 2 ) hq2x( img.width, img.height );
                else if( scale === 3 ) hq3x( img.width, img.height );
                else if( scale === 4 ) hq4x( img.width, img.height );
                // alternative: window['hq'+scale+'x']( img.width, img.height );

                var scaledCtx = scaled.getContext('2d');
                var scaledPixels = scaledCtx.getImageData( 0, 0, scaled.width, scaled.height );
                var scaledPixelsData = scaledPixels.data;

                // unpack integers to RGBA
                var c, a, destLength = dest.length;
                for( var j = 0; j < destLength; j++ ) {
                    a = ((c = dest[j]) & 0xFF000000) >> 24;
                    scaledPixelsData[(index = j << 2)+3] = a < 0 ? a + 256 : 0; // signed/unsigned :/
                    scaledPixelsData[index+2] = (c & 0x00FF0000) >> 16;
                    scaledPixelsData[index+1] = (c & 0x0000FF00) >> 8;
                    scaledPixelsData[index] = c & 0x000000FF;
                }
                _src = src = null;
                _dest = dest = null;
                scaledCtx.putImageData( scaledPixels, 0, 0 );
                return scaledPixels;
            };


            var hq2x = function( width, height ) {
                var
                    i, j, k,
                    prevline, nextline,
                    w = [],
                    //dpL = width * 2, optimized
                    dpL = width << 1,

                    dp = 0,
                    sp = 0;

                // internal to local optimization
                var
                    Diff = _Diff,
                    Math = _Math,
                    RGBtoYUV = _RGBtoYUV,
                    Interp1 = _Interp1,
                    Interp2 = _Interp2,
                    Interp3 = _Interp3,
                    Interp4 = _Interp4,
                    Interp5 = _Interp5,
                    Interp6 = _Interp6,
                    Interp7 = _Interp7,
                    Interp8 = _Interp8,
                    Interp9 = _Interp9,
                    Interp10 = _Interp10,
                    src = _src,
                    dest = _dest,
                    MASK_2 = _MASK_2,
                    MASK_13 = _MASK_13,
                    Ymask = _Ymask,
                    Umask = _Umask,
                    Vmask = _Vmask,
                    trY = _trY,
                    trU = _trU,
                    trV = _trV,
                    YUV1, YUV2;


                //   +----+----+----+
                //   |    |    |    |
                //   | w1 | w2 | w3 |
                //   +----+----+----+
                //   |    |    |    |
                //   | w4 | w5 | w6 |
                //   +----+----+----+
                //   |    |    |    |
                //   | w7 | w8 | w9 |
                //   +----+----+----+

                for (j=0; j<height; j++)
                {
                    prevline = j>0 ? -width : 0;
                    nextline = j<height-1 ? width : 0;

                    for (i=0; i<width; i++)
                    {
                        w[2] = src[sp + prevline];
                        w[5] = src[sp];
                        w[8] = src[sp + nextline];

                        if (i>0)
                        {
                            w[1] = src[sp + prevline - 1];
                            w[4] = src[sp - 1];
                            w[7] = src[sp + nextline - 1];
                        }
                        else
                        {
                            w[1] = w[2];
                            w[4] = w[5];
                            w[7] = w[8];
                        }

                        if (i<width-1)
                        {
                            w[3] = src[sp + prevline + 1];
                            w[6] = src[sp + 1];
                            w[9] = src[sp + nextline + 1];
                        }
                        else
                        {
                            w[3] = w[2];
                            w[6] = w[5];
                            w[9] = w[8];
                        }

                        var pattern = 0;
                        var flag = 1;

                        YUV1 = RGBtoYUV(w[5]);

                        //for (k=1; k<=9; k++) optimized
                        for (k=1; k < 10; k++) // k<=9
                        {
                            if (k===5) continue;

                            if ( w[k] !== w[5] )
                            {
                                YUV2 = RGBtoYUV(w[k]);
                                if ( ( Math.abs((YUV1 & Ymask) - (YUV2 & Ymask)) > trY ) ||
                                    ( Math.abs((YUV1 & Umask) - (YUV2 & Umask)) > trU ) ||
                                    ( Math.abs((YUV1 & Vmask) - (YUV2 & Vmask)) > trV ) )
                                    pattern |= flag;
                            }
                            flag <<= 1;
                        }

                        switch (pattern)
                        {
                            case 0:
                            case 1:
                            case 4:
                            case 32:
                            case 128:
                            case 5:
                            case 132:
                            case 160:
                            case 33:
                            case 129:
                            case 36:
                            case 133:
                            case 164:
                            case 161:
                            case 37:
                            case 165:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 2:
                            case 34:
                            case 130:
                            case 162:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 16:
                            case 17:
                            case 48:
                            case 49:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 64:
                            case 65:
                            case 68:
                            case 69:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 8:
                            case 12:
                            case 136:
                            case 140:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 3:
                            case 35:
                            case 131:
                            case 163:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 6:
                            case 38:
                            case 134:
                            case 166:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                Interp1(dp+1, w[5], w[6]);
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 20:
                            case 21:
                            case 52:
                            case 53:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 144:
                            case 145:
                            case 176:
                            case 177:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 192:
                            case 193:
                            case 196:
                            case 197:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 96:
                            case 97:
                            case 100:
                            case 101:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 40:
                            case 44:
                            case 168:
                            case 172:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 9:
                            case 13:
                            case 137:
                            case 141:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 18:
                            case 50:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 80:
                            case 81:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 72:
                            case 76:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 10:
                            case 138:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 66:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 24:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 7:
                            case 39:
                            case 135:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp1(dp+1, w[5], w[6]);
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 148:
                            case 149:
                            case 180:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 224:
                            case 228:
                            case 225:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 41:
                            case 169:
                            case 45:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 22:
                            case 54:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 208:
                            case 209:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 104:
                            case 108:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 11:
                            case 139:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 19:
                            case 51:
                            {
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp6(dp, w[5], w[2], w[4]);
                                    Interp9(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 146:
                            case 178:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                    Interp1(dp+dpL+1, w[5], w[8]);
                                }
                                else
                                {
                                    Interp9(dp+1, w[5], w[2], w[6]);
                                    Interp6(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                break;
                            }
                            case 84:
                            case 85:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp6(dp+1, w[5], w[6], w[2]);
                                    Interp9(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                break;
                            }
                            case 112:
                            case 113:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL, w[5], w[4]);
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp6(dp+dpL, w[5], w[8], w[4]);
                                    Interp9(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 200:
                            case 204:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                    Interp1(dp+dpL+1, w[5], w[6]);
                                }
                                else
                                {
                                    Interp9(dp+dpL, w[5], w[8], w[4]);
                                    Interp6(dp+dpL+1, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 73:
                            case 77:
                            {
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp, w[5], w[2]);
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp6(dp, w[5], w[4], w[2]);
                                    Interp9(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp2(dp+1, w[5], w[2], w[6]);
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 42:
                            case 170:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                    Interp1(dp+dpL, w[5], w[8]);
                                }
                                else
                                {
                                    Interp9(dp, w[5], w[4], w[2]);
                                    Interp6(dp+dpL, w[5], w[4], w[8]);
                                }
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 14:
                            case 142:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                    Interp1(dp+1, w[5], w[6]);
                                }
                                else
                                {
                                    Interp9(dp, w[5], w[4], w[2]);
                                    Interp6(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 67:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 70:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                Interp1(dp+1, w[5], w[6]);
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 28:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 152:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 194:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 98:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 56:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 25:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 26:
                            case 31:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 82:
                            case 214:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 88:
                            case 248:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 74:
                            case 107:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                Interp2(dp+1, w[5], w[3], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 27:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                Interp1(dp+1, w[5], w[3]);
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 86:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                Interp1(dp+dpL+1, w[5], w[9]);
                                break;
                            }
                            case 216:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                Interp1(dp+dpL, w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 106:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp2(dp+1, w[5], w[3], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 30:
                            {
                                Interp1(dp, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 210:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                Interp1(dp+1, w[5], w[3]);
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 120:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp1(dp+dpL+1, w[5], w[9]);
                                break;
                            }
                            case 75:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp1(dp+dpL, w[5], w[7]);
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 29:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 198:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                Interp1(dp+1, w[5], w[6]);
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 184:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 99:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 57:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 71:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp1(dp+1, w[5], w[6]);
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 156:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 226:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 60:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 195:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 102:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                Interp1(dp+1, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 153:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 58:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                }
                                else
                                {
                                    Interp7(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp7(dp+1, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 83:
                            {
                                Interp1(dp, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp7(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp7(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 92:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp7(dp+dpL, w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp7(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 202:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                }
                                else
                                {
                                    Interp7(dp, w[5], w[4], w[2]);
                                }
                                Interp2(dp+1, w[5], w[3], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp7(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 78:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                }
                                else
                                {
                                    Interp7(dp, w[5], w[4], w[2]);
                                }
                                Interp1(dp+1, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp7(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 154:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                }
                                else
                                {
                                    Interp7(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp7(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 114:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp7(dp+1, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp7(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 89:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp7(dp+dpL, w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp7(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 90:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                }
                                else
                                {
                                    Interp7(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp7(dp+1, w[5], w[2], w[6]);
                                }
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp7(dp+dpL, w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp7(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 55:
                            case 23:
                            {
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp6(dp, w[5], w[2], w[4]);
                                    Interp9(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 182:
                            case 150:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    Interp1(dp+dpL+1, w[5], w[8]);
                                }
                                else
                                {
                                    Interp9(dp+1, w[5], w[2], w[6]);
                                    Interp6(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                break;
                            }
                            case 213:
                            case 212:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+1, w[5], w[2]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp6(dp+1, w[5], w[6], w[2]);
                                    Interp9(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                break;
                            }
                            case 241:
                            case 240:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp6(dp+dpL, w[5], w[8], w[4]);
                                    Interp9(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 236:
                            case 232:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    Interp1(dp+dpL+1, w[5], w[6]);
                                }
                                else
                                {
                                    Interp9(dp+dpL, w[5], w[8], w[4]);
                                    Interp6(dp+dpL+1, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 109:
                            case 105:
                            {
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp, w[5], w[2]);
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp6(dp, w[5], w[4], w[2]);
                                    Interp9(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp2(dp+1, w[5], w[2], w[6]);
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 171:
                            case 43:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    Interp1(dp+dpL, w[5], w[8]);
                                }
                                else
                                {
                                    Interp9(dp, w[5], w[4], w[2]);
                                    Interp6(dp+dpL, w[5], w[4], w[8]);
                                }
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 143:
                            case 15:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    Interp1(dp+1, w[5], w[6]);
                                }
                                else
                                {
                                    Interp9(dp, w[5], w[4], w[2]);
                                    Interp6(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 124:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp1(dp+dpL+1, w[5], w[9]);
                                break;
                            }
                            case 203:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp1(dp+dpL, w[5], w[7]);
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 62:
                            {
                                Interp1(dp, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 211:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp1(dp+1, w[5], w[3]);
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 118:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                Interp1(dp+dpL+1, w[5], w[9]);
                                break;
                            }
                            case 217:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                Interp1(dp+dpL, w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 110:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp1(dp+1, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 155:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                Interp1(dp+1, w[5], w[3]);
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 188:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 185:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 61:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 157:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 103:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp1(dp+1, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 227:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp2(dp+1, w[5], w[3], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 230:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                Interp1(dp+1, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 199:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp1(dp+1, w[5], w[6]);
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 220:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp7(dp+dpL, w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 158:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                }
                                else
                                {
                                    Interp7(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 234:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                }
                                else
                                {
                                    Interp7(dp, w[5], w[4], w[2]);
                                }
                                Interp2(dp+1, w[5], w[3], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 242:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp7(dp+1, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 59:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp7(dp+1, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 121:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp7(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 87:
                            {
                                Interp1(dp, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp7(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 79:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                Interp1(dp+1, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp7(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 122:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                }
                                else
                                {
                                    Interp7(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp7(dp+1, w[5], w[2], w[6]);
                                }
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp7(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 94:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                }
                                else
                                {
                                    Interp7(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp7(dp+dpL, w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp7(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 218:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                }
                                else
                                {
                                    Interp7(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp7(dp+1, w[5], w[2], w[6]);
                                }
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp7(dp+dpL, w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 91:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp7(dp+1, w[5], w[2], w[6]);
                                }
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp7(dp+dpL, w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp7(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 229:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 167:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp1(dp+1, w[5], w[6]);
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 173:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 181:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 186:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                }
                                else
                                {
                                    Interp7(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp7(dp+1, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 115:
                            {
                                Interp1(dp, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp7(dp+1, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp7(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 93:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp7(dp+dpL, w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp7(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 206:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                }
                                else
                                {
                                    Interp7(dp, w[5], w[4], w[2]);
                                }
                                Interp1(dp+1, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp7(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 205:
                            case 201:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+dpL, w[5], w[7]);
                                }
                                else
                                {
                                    Interp7(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 174:
                            case 46:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                }
                                else
                                {
                                    Interp7(dp, w[5], w[4], w[2]);
                                }
                                Interp1(dp+1, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 179:
                            case 147:
                            {
                                Interp1(dp, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+1, w[5], w[3]);
                                }
                                else
                                {
                                    Interp7(dp+1, w[5], w[2], w[6]);
                                }
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 117:
                            case 116:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);
                                }
                                else
                                {
                                    Interp7(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 189:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 231:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp1(dp+1, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 126:
                            {
                                Interp1(dp, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp1(dp+dpL+1, w[5], w[9]);
                                break;
                            }
                            case 219:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                Interp1(dp+1, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 125:
                            {
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp, w[5], w[2]);
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp6(dp, w[5], w[4], w[2]);
                                    Interp9(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+dpL+1, w[5], w[9]);
                                break;
                            }
                            case 221:
                            {
                                Interp1(dp, w[5], w[2]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+1, w[5], w[2]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp6(dp+1, w[5], w[6], w[2]);
                                    Interp9(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                Interp1(dp+dpL, w[5], w[7]);
                                break;
                            }
                            case 207:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    Interp1(dp+1, w[5], w[6]);
                                }
                                else
                                {
                                    Interp9(dp, w[5], w[4], w[2]);
                                    Interp6(dp+1, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[7]);
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 238:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp1(dp+1, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    Interp1(dp+dpL+1, w[5], w[6]);
                                }
                                else
                                {
                                    Interp9(dp+dpL, w[5], w[8], w[4]);
                                    Interp6(dp+dpL+1, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 190:
                            {
                                Interp1(dp, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    Interp1(dp+dpL+1, w[5], w[8]);
                                }
                                else
                                {
                                    Interp9(dp+1, w[5], w[2], w[6]);
                                    Interp6(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                Interp1(dp+dpL, w[5], w[8]);
                                break;
                            }
                            case 187:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    Interp1(dp+dpL, w[5], w[8]);
                                }
                                else
                                {
                                    Interp9(dp, w[5], w[4], w[2]);
                                    Interp6(dp+dpL, w[5], w[4], w[8]);
                                }
                                Interp1(dp+1, w[5], w[3]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 243:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp1(dp+1, w[5], w[3]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp6(dp+dpL, w[5], w[8], w[4]);
                                    Interp9(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 119:
                            {
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp6(dp, w[5], w[2], w[4]);
                                    Interp9(dp+1, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                Interp1(dp+dpL+1, w[5], w[9]);
                                break;
                            }
                            case 237:
                            case 233:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp2(dp+1, w[5], w[2], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL, w[5], w[7]);0
                                }
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 175:
                            case 47:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp1(dp, w[5], w[4]);0
                                }
                                Interp1(dp+1, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                break;
                            }
                            case 183:
                            case 151:
                            {
                                Interp1(dp, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+1, w[5], w[3]);0
                                }
                                Interp2(dp+dpL, w[5], w[8], w[4]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 245:
                            case 244:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);0
                                }
                                break;
                            }
                            case 250:
                            {
                                Interp1(dp, w[5], w[4]);
                                Interp1(dp+1, w[5], w[3]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 123:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                Interp1(dp+1, w[5], w[3]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp1(dp+dpL+1, w[5], w[9]);
                                break;
                            }
                            case 95:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[7]);
                                Interp1(dp+dpL+1, w[5], w[9]);
                                break;
                            }
                            case 222:
                            {
                                Interp1(dp, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 252:
                            {
                                Interp2(dp, w[5], w[1], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);0
                                }
                                break;
                            }
                            case 249:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp2(dp+1, w[5], w[3], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL, w[5], w[7]);0
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 235:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                Interp2(dp+1, w[5], w[3], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL, w[5], w[7]);0
                                }
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 111:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp1(dp, w[5], w[4]);0
                                }
                                Interp1(dp+1, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp2(dp+dpL+1, w[5], w[9], w[6]);
                                break;
                            }
                            case 63:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp1(dp, w[5], w[4]);0
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp2(dp+dpL+1, w[5], w[9], w[8]);
                                break;
                            }
                            case 159:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+1, w[5], w[3]);0
                                }
                                Interp2(dp+dpL, w[5], w[7], w[8]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 215:
                            {
                                Interp1(dp, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+1, w[5], w[3]);0
                                }
                                Interp2(dp+dpL, w[5], w[7], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 246:
                            {
                                Interp2(dp, w[5], w[1], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);0
                                }
                                break;
                            }
                            case 254:
                            {
                                Interp1(dp, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);0
                                }
                                break;
                            }
                            case 253:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL, w[5], w[7]);0
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);0
                                }
                                break;
                            }
                            case 251:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                Interp1(dp+1, w[5], w[3]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL, w[5], w[7]);0
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 239:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp1(dp, w[5], w[4]);0
                                }
                                Interp1(dp+1, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL, w[5], w[7]);0
                                }
                                Interp1(dp+dpL+1, w[5], w[6]);
                                break;
                            }
                            case 127:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp1(dp, w[5], w[4]);0
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+1, w[5], w[2], w[6]);
                                }
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL, w[5], w[8], w[4]);
                                }
                                Interp1(dp+dpL+1, w[5], w[9]);
                                break;
                            }
                            case 191:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp1(dp, w[5], w[4]);0
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+1, w[5], w[3]);0
                                }
                                Interp1(dp+dpL, w[5], w[8]);
                                Interp1(dp+dpL+1, w[5], w[8]);
                                break;
                            }
                            case 223:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+1, w[5], w[3]);0
                                }
                                Interp1(dp+dpL, w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+dpL+1, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 247:
                            {
                                Interp1(dp, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+1, w[5], w[3]);0
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);0
                                }
                                break;
                            }
                            case 255:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp1(dp, w[5], w[4]);0
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+1, w[5], w[3]);0
                                }
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL, w[5], w[7]);0
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL+1, w[5], w[9]);0
                                }
                                break;
                            }
                        }
                        sp++;
                        dp += 2;
                    }
                    dp += dpL;
                }
            };

            var hq3x = function( width, height ) {
                var
                    i, j, k,
                    prevline, nextline,
                    w = [],
                    dpL = width * 3,

                    dp = 0,
                    sp = 0;

                // internal to local optimization
                var
                    Diff = _Diff,
                    Math = _Math,
                    RGBtoYUV = _RGBtoYUV,
                    Interp1 = _Interp1,
                    Interp2 = _Interp2,
                    Interp3 = _Interp3,
                    Interp4 = _Interp4,
                    Interp5 = _Interp5,
                    Interp6 = _Interp6,
                    Interp7 = _Interp7,
                    Interp8 = _Interp8,
                    Interp9 = _Interp9,
                    Interp10 = _Interp10,
                    src = _src,
                    dest = _dest,
                    MASK_2 = _MASK_2,
                    MASK_13 = _MASK_13,
                    Ymask = _Ymask,
                    Umask = _Umask,
                    Vmask = _Vmask,
                    trY = _trY,
                    trU = _trU,
                    trV = _trV,
                    YUV1, YUV2;

                //   +----+----+----+
                //   |	|	|	|
                //   | w1 | w2 | w3 |
                //   +----+----+----+
                //   |	|	|	|
                //   | w4 | w5 | w6 |
                //   +----+----+----+
                //   |	|	|	|
                //   | w7 | w8 | w9 |
                //   +----+----+----+

                for (j=0; j<height; j++)
                {
                    prevline = j>0 ? -width : 0;
                    nextline = j<height-1 ? width : 0;

                    for (i=0; i<width; i++)
                    {
                        w[2] = src[sp + prevline];
                        w[5] = src[sp];
                        w[8] = src[sp + nextline];

                        if (i>0)
                        {
                            w[1] = src[sp + prevline - 1];
                            w[4] = src[sp - 1];
                            w[7] = src[sp + nextline - 1];
                        }
                        else
                        {
                            w[1] = w[2];
                            w[4] = w[5];
                            w[7] = w[8];
                        }

                        if (i<width-1)
                        {
                            w[3] = src[sp + prevline + 1];
                            w[6] = src[sp + 1];
                            w[9] = src[sp + nextline + 1];
                        }
                        else
                        {
                            w[3] = w[2];
                            w[6] = w[5];
                            w[9] = w[8];
                        }

                        var pattern = 0;
                        var flag = 1;

                        YUV1 = RGBtoYUV(w[5]);

                        //for (k=1; k<=9; k++) optimized
                        for (k=1; k< 10; k++) // k<=9
                        {
                            if (k===5) continue;

                            if ( w[k] !== w[5] )
                            {
                                YUV2 = RGBtoYUV(w[k]);
                                if ( ( Math.abs((YUV1 & Ymask) - (YUV2 & Ymask)) > trY ) ||
                                    ( Math.abs((YUV1 & Umask) - (YUV2 & Umask)) > trU ) ||
                                    ( Math.abs((YUV1 & Vmask) - (YUV2 & Vmask)) > trV ) )
                                    pattern |= flag;
                            }
                            flag <<= 1;
                        }

                        switch (pattern)
                        {
                            case 0:
                            case 1:
                            case 4:
                            case 32:
                            case 128:
                            case 5:
                            case 132:
                            case 160:
                            case 33:
                            case 129:
                            case 36:
                            case 133:
                            case 164:
                            case 161:
                            case 37:
                            case 165:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 2:
                            case 34:
                            case 130:
                            case 162:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 16:
                            case 17:
                            case 48:
                            case 49:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 64:
                            case 65:
                            case 68:
                            case 69:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 8:
                            case 12:
                            case 136:
                            case 140:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 3:
                            case 35:
                            case 131:
                            case 163:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 6:
                            case 38:
                            case 134:
                            case 166:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 20:
                            case 21:
                            case 52:
                            case 53:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 144:
                            case 145:
                            case 176:
                            case 177:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 192:
                            case 193:
                            case 196:
                            case 197:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 96:
                            case 97:
                            case 100:
                            case 101:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 40:
                            case 44:
                            case 168:
                            case 172:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 9:
                            case 13:
                            case 137:
                            case 141:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 18:
                            case 50:
                            {
                                Interp1(dp, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    Interp1(dp+2, w[5], w[3]);
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 80:
                            case 81:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 72:
                            case 76:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 10:
                            case 138:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 66:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 24:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 7:
                            case 39:
                            case 135:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 148:
                            case 149:
                            case 180:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 224:
                            case 228:
                            case 225:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 41:
                            case 169:
                            case 45:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 22:
                            case 54:
                            {
                                Interp1(dp, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 208:
                            case 209:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 104:
                            case 108:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 11:
                            case 139:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 19:
                            case 51:
                            {
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                    dest[dp+1] = w[5];
                                    Interp1(dp+2, w[5], w[3]);
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                    Interp1(dp+1, w[2], w[5]);
                                    Interp5(dp+2, w[2], w[6]);
                                    Interp1(dp+dpL+2, w[5], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 146:
                            case 178:
                            {
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    Interp1(dp+2, w[5], w[3]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                }
                                else
                                {
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp5(dp+2, w[2], w[6]);
                                    Interp1(dp+dpL+2, w[6], w[5]);
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                break;
                            }
                            case 84:
                            case 85:
                            {
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                    Interp1(dp+dpL+2, w[6], w[5]);
                                    Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp5(dp+(dpL << 1 )+2, w[6], w[8]);
                                }
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                break;
                            }
                            case 112:
                            case 113:
                            {
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp1(dp+dpL+2, w[5], w[6]);
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL << 1 )+1, w[8], w[5]);
                                    Interp5(dp+(dpL << 1 )+2, w[6], w[8]);
                                }
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                break;
                            }
                            case 200:
                            case 204:
                            {
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                }
                                else
                                {
                                    Interp1(dp+dpL, w[5], w[4]);
                                    Interp5(dp+(dpL << 1 ), w[8], w[4]);
                                    Interp1(dp+(dpL << 1 )+1, w[8], w[5]);
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                break;
                            }
                            case 73:
                            case 77:
                            {
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp, w[5], w[2]);
                                    dest[dp+dpL] = w[5];
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                    Interp1(dp+dpL, w[4], w[5]);
                                    Interp5(dp+(dpL << 1 ), w[8], w[4]);
                                    Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 42:
                            case 170:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                    Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                }
                                else
                                {
                                    Interp5(dp, w[4], w[2]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[4], w[5]);
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 14:
                            case 142:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                    dest[dp+1] = w[5];
                                    Interp1(dp+2, w[5], w[6]);
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[4], w[2]);
                                    Interp1(dp+1, w[2], w[5]);
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                }
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 67:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 70:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 28:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 152:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 194:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 98:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 56:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 25:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 26:
                            case 31:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 82:
                            case 214:
                            {
                                Interp1(dp, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 88:
                            case 248:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 74:
                            case 107:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 27:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 86:
                            {
                                Interp1(dp, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 216:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 106:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 30:
                            {
                                Interp1(dp, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 210:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 120:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 75:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 29:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 198:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 184:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 99:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 57:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 71:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 156:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 226:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 60:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 195:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 102:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 153:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 58:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 83:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 92:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 202:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 78:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 154:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 114:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 89:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 90:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 55:
                            case 23:
                            {
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                    Interp1(dp+1, w[2], w[5]);
                                    Interp5(dp+2, w[2], w[6]);
                                    Interp1(dp+dpL+2, w[5], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 182:
                            case 150:
                            {
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                }
                                else
                                {
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp5(dp+2, w[2], w[6]);
                                    Interp1(dp+dpL+2, w[6], w[5]);
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                break;
                            }
                            case 213:
                            case 212:
                            {
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                    Interp1(dp+dpL+2, w[6], w[5]);
                                    Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp5(dp+(dpL << 1 )+2, w[6], w[8]);
                                }
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                break;
                            }
                            case 241:
                            case 240:
                            {
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL+2, w[5], w[6]);
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL << 1 )+1, w[8], w[5]);
                                    Interp5(dp+(dpL << 1 )+2, w[6], w[8]);
                                }
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                break;
                            }
                            case 236:
                            case 232:
                            {
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                }
                                else
                                {
                                    Interp1(dp+dpL, w[5], w[4]);
                                    Interp5(dp+(dpL << 1 ), w[8], w[4]);
                                    Interp1(dp+(dpL << 1 )+1, w[8], w[5]);
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                break;
                            }
                            case 109:
                            case 105:
                            {
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp, w[5], w[2]);
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                    Interp1(dp+dpL, w[4], w[5]);
                                    Interp5(dp+(dpL << 1 ), w[8], w[4]);
                                    Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 171:
                            case 43:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                    Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                }
                                else
                                {
                                    Interp5(dp, w[4], w[2]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[4], w[5]);
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 143:
                            case 15:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    Interp1(dp+2, w[5], w[6]);
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[4], w[2]);
                                    Interp1(dp+1, w[2], w[5]);
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                }
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 124:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 203:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 62:
                            {
                                Interp1(dp, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 211:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 118:
                            {
                                Interp1(dp, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 217:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 110:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 155:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 188:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 185:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 61:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 157:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 103:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 227:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 230:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 199:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 220:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 158:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 234:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 242:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 59:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 121:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 87:
                            {
                                Interp1(dp, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 79:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                Interp1(dp+2, w[5], w[6]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 122:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 94:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 218:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 91:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 229:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 167:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 173:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 181:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 186:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 115:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 93:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 206:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 205:
                            case 201:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 174:
                            case 46:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp1(dp, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 179:
                            case 147:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 117:
                            case 116:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 189:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 231:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 126:
                            {
                                Interp1(dp, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                dest[dp+dpL+1] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 219:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 125:
                            {
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp, w[5], w[2]);
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                    Interp1(dp+dpL, w[4], w[5]);
                                    Interp5(dp+(dpL << 1 ), w[8], w[4]);
                                    Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 221:
                            {
                                if (Diff(w[6], w[8]))
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                    Interp1(dp+dpL+2, w[6], w[5]);
                                    Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp5(dp+(dpL << 1 )+2, w[6], w[8]);
                                }
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                break;
                            }
                            case 207:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    Interp1(dp+2, w[5], w[6]);
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[4], w[2]);
                                    Interp1(dp+1, w[2], w[5]);
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                }
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 238:
                            {
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                }
                                else
                                {
                                    Interp1(dp+dpL, w[5], w[4]);
                                    Interp5(dp+(dpL << 1 ), w[8], w[4]);
                                    Interp1(dp+(dpL << 1 )+1, w[8], w[5]);
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                break;
                            }
                            case 190:
                            {
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                }
                                else
                                {
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp5(dp+2, w[2], w[6]);
                                    Interp1(dp+dpL+2, w[6], w[5]);
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                Interp1(dp, w[5], w[1]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                break;
                            }
                            case 187:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                    Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                }
                                else
                                {
                                    Interp5(dp, w[4], w[2]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[4], w[5]);
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 243:
                            {
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+dpL+2, w[5], w[6]);
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL << 1 )+1, w[8], w[5]);
                                    Interp5(dp+(dpL << 1 )+2, w[6], w[8]);
                                }
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                break;
                            }
                            case 119:
                            {
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp, w[5], w[4]);
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                    Interp1(dp+1, w[2], w[5]);
                                    Interp5(dp+2, w[2], w[6]);
                                    Interp1(dp+dpL+2, w[5], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 237:
                            case 233:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp2(dp+2, w[5], w[2], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 175:
                            case 47:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                break;
                            }
                            case 183:
                            case 151:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 245:
                            case 244:
                            {
                                Interp2(dp, w[5], w[4], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 250:
                            {
                                Interp1(dp, w[5], w[1]);
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 123:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 95:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 222:
                            {
                                Interp1(dp, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 252:
                            {
                                Interp1(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 249:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 235:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 111:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 63:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 159:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 215:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 246:
                            {
                                Interp1(dp, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 254:
                            {
                                Interp1(dp, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL+1] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 253:
                            {
                                Interp1(dp, w[5], w[2]);
                                Interp1(dp+1, w[5], w[2]);
                                Interp1(dp+2, w[5], w[2]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 251:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+dpL] = w[5];
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL, w[5], w[4]);
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 239:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                Interp1(dp+2, w[5], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+dpL+2, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp1(dp+(dpL << 1 )+2, w[5], w[6]);
                                break;
                            }
                            case 127:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp4(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                dest[dp+dpL+1] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                }
                                else
                                {
                                    Interp4(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                }
                                Interp1(dp+(dpL << 1 )+2, w[5], w[9]);
                                break;
                            }
                            case 191:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp1(dp+(dpL << 1 )+2, w[5], w[8]);
                                break;
                            }
                            case 223:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp4(dp, w[5], w[4], w[2]);
                                    Interp3(dp+dpL, w[5], w[4]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+1] = w[5];
                                    dest[dp+2] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+1, w[5], w[2]);
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                    Interp3(dp+dpL+2, w[5], w[6]);
                                }
                                dest[dp+dpL+1] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                    Interp4(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 247:
                            {
                                Interp1(dp, w[5], w[4]);
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[4]);
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                            case 255:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[4], w[2]);
                                }
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+2, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                }
                                break;
                            }
                        }
                        sp++;
                        dp += 3;
                    }
                    //dp += (dpL * 2); optimized
                    dp += (dpL << 1);
                }
            };

            var hq4x = function( width, height ) {
                var
                    i, j, k,
                    prevline, nextline,
                    w = [],
                    //dpL = width * 4, optimized
                    dpL = width << 2,

                    dp = 0,
                    sp = 0;

                // internal to local optimization
                var
                    Diff = _Diff,
                    Math = _Math,
                    RGBtoYUV = _RGBtoYUV,
                    Interp1 = _Interp1,
                    Interp2 = _Interp2,
                    Interp3 = _Interp3,
                    Interp4 = _Interp4,
                    Interp5 = _Interp5,
                    Interp6 = _Interp6,
                    Interp7 = _Interp7,
                    Interp8 = _Interp8,
                    Interp9 = _Interp9,
                    Interp10 = _Interp10,
                    src = _src,
                    dest = _dest,
                    MASK_2 = _MASK_2,
                    MASK_13 = _MASK_13,
                    Ymask = _Ymask,
                    Umask = _Umask,
                    Vmask = _Vmask,
                    trY = _trY,
                    trU = _trU,
                    trV = _trV,
                    YUV1, YUV2;

                //   +----+----+----+
                //   |    |    |    |
                //   | w1 | w2 | w3 |
                //   +----+----+----+
                //   |    |    |    |
                //   | w4 | w5 | w6 |
                //   +----+----+----+
                //   |    |    |    |
                //   | w7 | w8 | w9 |
                //   +----+----+----+

                for (j=0; j<height; j++)
                {
                    prevline = j>0 ? -width : 0;
                    nextline = j<height-1 ? width : 0;

                    for (i=0; i<width; i++)
                    {
                        w[2] = src[sp + prevline];
                        w[5] = src[sp];
                        w[8] = src[sp + nextline];

                        if (i>0)
                        {
                            w[1] = src[sp + prevline - 1];
                            w[4] = src[sp - 1];
                            w[7] = src[sp + nextline - 1];
                        }
                        else
                        {
                            w[1] = w[2];
                            w[4] = w[5];
                            w[7] = w[8];
                        }

                        if (i<width-1)
                        {
                            w[3] = src[sp + prevline + 1];
                            w[6] = src[sp + 1];
                            w[9] = src[sp + nextline + 1];
                        }
                        else
                        {
                            w[3] = w[2];
                            w[6] = w[5];
                            w[9] = w[8];
                        }

                        var pattern = 0;
                        var flag = 1;

                        YUV1 = RGBtoYUV(w[5]);

                        //for (k=1; k<=9; k++) optimized
                        for (k=1; k < 10; k++) // k<=9
                        {
                            if (k===5) continue;

                            if ( w[k] !== w[5] )
                            {
                                YUV2 = RGBtoYUV(w[k]);
                                if ( ( Math.abs((YUV1 & Ymask) - (YUV2 & Ymask)) > trY ) ||
                                    ( Math.abs((YUV1 & Umask) - (YUV2 & Umask)) > trU ) ||
                                    ( Math.abs((YUV1 & Vmask) - (YUV2 & Vmask)) > trV ) )
                                    pattern |= flag;
                            }
                            flag <<= 1;
                        }

                        switch (pattern)
                        {
                            case 0:
                            case 1:
                            case 4:
                            case 32:
                            case 128:
                            case 5:
                            case 132:
                            case 160:
                            case 33:
                            case 129:
                            case 36:
                            case 133:
                            case 164:
                            case 161:
                            case 37:
                            case 165:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 2:
                            case 34:
                            case 130:
                            case 162:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 16:
                            case 17:
                            case 48:
                            case 49:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 64:
                            case 65:
                            case 68:
                            case 69:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 8:
                            case 12:
                            case 136:
                            case 140:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 3:
                            case 35:
                            case 131:
                            case 163:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 6:
                            case 38:
                            case 134:
                            case 166:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 20:
                            case 21:
                            case 52:
                            case 53:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 144:
                            case 145:
                            case 176:
                            case 177:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 192:
                            case 193:
                            case 196:
                            case 197:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 96:
                            case 97:
                            case 100:
                            case 101:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 40:
                            case 44:
                            case 168:
                            case 172:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 9:
                            case 13:
                            case 137:
                            case 141:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 18:
                            case 50:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 80:
                            case 81:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 72:
                            case 76:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 10:
                            case 138:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 66:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 24:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 7:
                            case 39:
                            case 135:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 148:
                            case 149:
                            case 180:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 224:
                            case 228:
                            case 225:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 41:
                            case 169:
                            case 45:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 22:
                            case 54:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                dest[dp+dpL+2] = w[5];
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 208:
                            case 209:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 104:
                            case 108:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 11:
                            case 139:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 19:
                            case 51:
                            {
                                if (Diff(w[2], w[6]))
                                {
                                    Interp8(dp, w[5], w[4]);
                                    Interp3(dp+1, w[5], w[4]);
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp1(dp, w[5], w[2]);
                                    Interp1(dp+1, w[2], w[5]);
                                    Interp8(dp+2, w[2], w[6]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                    Interp2(dp+dpL+3, w[6], w[5], w[2]);
                                }
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 146:
                            case 178:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                    Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[2], w[5], w[6]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                    Interp8(dp+dpL+3, w[6], w[2]);
                                    Interp1(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp1(dp+(dpL * 3)+3, w[5], w[6]);
                                }
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                break;
                            }
                            case 84:
                            case 85:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp8(dp+2, w[5], w[2]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp8(dp+3, w[5], w[2]);
                                    Interp3(dp+dpL+3, w[5], w[2]);
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    Interp1(dp+3, w[5], w[6]);
                                    Interp1(dp+dpL+3, w[6], w[5]);
                                    Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                    Interp8(dp+(dpL << 1 )+3, w[6], w[8]);
                                    Interp2(dp+(dpL * 3)+2, w[8], w[5], w[6]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 112:
                            case 113:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp8(dp+(dpL * 3), w[5], w[4]);
                                    Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                    Interp2(dp+(dpL << 1 )+3, w[6], w[5], w[8]);
                                    Interp1(dp+(dpL * 3), w[5], w[8]);
                                    Interp1(dp+(dpL * 3)+1, w[8], w[5]);
                                    Interp8(dp+(dpL * 3)+2, w[8], w[6]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                break;
                            }
                            case 200:
                            case 204:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                    Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[4], w[5], w[8]);
                                    Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp8(dp+(dpL * 3)+1, w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp1(dp+(dpL * 3)+3, w[5], w[8]);
                                }
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                break;
                            }
                            case 73:
                            case 77:
                            {
                                if (Diff(w[8], w[4]))
                                {
                                    Interp8(dp, w[5], w[2]);
                                    Interp3(dp+dpL, w[5], w[2]);
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp1(dp, w[5], w[4]);
                                    Interp1(dp+dpL, w[4], w[5]);
                                    Interp8(dp+(dpL << 1 ), w[4], w[8]);
                                    Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp2(dp+(dpL * 3)+1, w[8], w[5], w[4]);
                                }
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 42:
                            case 170:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                    Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                    Interp8(dp+(dpL * 3), w[5], w[8]);
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp2(dp+1, w[2], w[5], w[4]);
                                    Interp8(dp+dpL, w[4], w[2]);
                                    Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                    Interp1(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp1(dp+(dpL * 3), w[5], w[4]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 14:
                            case 142:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp3(dp+2, w[5], w[6]);
                                    Interp8(dp+3, w[5], w[6]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp8(dp+1, w[2], w[4]);
                                    Interp1(dp+2, w[2], w[5]);
                                    Interp1(dp+3, w[5], w[2]);
                                    Interp2(dp+dpL, w[4], w[5], w[2]);
                                    Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                }
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 67:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 70:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 28:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 152:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 194:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 98:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 56:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 25:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 26:
                            case 31:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 82:
                            case 214:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                dest[dp+dpL+2] = w[5];
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 88:
                            case 248:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                break;
                            }
                            case 74:
                            case 107:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 27:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 86:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                dest[dp+dpL+2] = w[5];
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 216:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 106:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 30:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 210:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 120:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 75:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 29:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 198:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 184:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 99:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 57:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 71:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 156:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 226:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 60:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 195:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 102:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 153:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 58:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+dpL+3, w[5], w[6]);
                                }
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 83:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+dpL+3, w[5], w[6]);
                                }
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[6]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[8]);
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 92:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[8]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[6]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[8]);
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 202:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[8]);
                                }
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 78:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[8]);
                                }
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 154:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+dpL+3, w[5], w[6]);
                                }
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 114:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+dpL+3, w[5], w[6]);
                                }
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[6]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[8]);
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                break;
                            }
                            case 89:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[8]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[6]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[8]);
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 90:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+dpL+3, w[5], w[6]);
                                }
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[8]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[6]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[8]);
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 55:
                            case 23:
                            {
                                if (Diff(w[2], w[6]))
                                {
                                    Interp8(dp, w[5], w[4]);
                                    Interp3(dp+1, w[5], w[4]);
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp1(dp, w[5], w[2]);
                                    Interp1(dp+1, w[2], w[5]);
                                    Interp8(dp+2, w[2], w[6]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                    Interp2(dp+dpL+3, w[6], w[5], w[2]);
                                }
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 182:
                            case 150:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                    Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[2], w[5], w[6]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                    Interp8(dp+dpL+3, w[6], w[2]);
                                    Interp1(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp1(dp+(dpL * 3)+3, w[5], w[6]);
                                }
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                break;
                            }
                            case 213:
                            case 212:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp8(dp+2, w[5], w[2]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp8(dp+3, w[5], w[2]);
                                    Interp3(dp+dpL+3, w[5], w[2]);
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+3, w[5], w[6]);
                                    Interp1(dp+dpL+3, w[6], w[5]);
                                    Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                    Interp8(dp+(dpL << 1 )+3, w[6], w[8]);
                                    Interp2(dp+(dpL * 3)+2, w[8], w[5], w[6]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 241:
                            case 240:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    Interp8(dp+(dpL * 3), w[5], w[4]);
                                    Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                    Interp2(dp+(dpL << 1 )+3, w[6], w[5], w[8]);
                                    Interp1(dp+(dpL * 3), w[5], w[8]);
                                    Interp1(dp+(dpL * 3)+1, w[8], w[5]);
                                    Interp8(dp+(dpL * 3)+2, w[8], w[6]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                break;
                            }
                            case 236:
                            case 232:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                    Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[4], w[5], w[8]);
                                    Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp8(dp+(dpL * 3)+1, w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp1(dp+(dpL * 3)+3, w[5], w[8]);
                                }
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                break;
                            }
                            case 109:
                            case 105:
                            {
                                if (Diff(w[8], w[4]))
                                {
                                    Interp8(dp, w[5], w[2]);
                                    Interp3(dp+dpL, w[5], w[2]);
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp, w[5], w[4]);
                                    Interp1(dp+dpL, w[4], w[5]);
                                    Interp8(dp+(dpL << 1 ), w[4], w[8]);
                                    Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp2(dp+(dpL * 3)+1, w[8], w[5], w[4]);
                                }
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 171:
                            case 43:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                    dest[dp+dpL+1] = w[5];
                                    Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                    Interp8(dp+(dpL * 3), w[5], w[8]);
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp2(dp+1, w[2], w[5], w[4]);
                                    Interp8(dp+dpL, w[4], w[2]);
                                    Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                    Interp1(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp1(dp+(dpL * 3), w[5], w[4]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 143:
                            case 15:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    Interp3(dp+2, w[5], w[6]);
                                    Interp8(dp+3, w[5], w[6]);
                                    dest[dp+dpL] = w[5];
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp8(dp+1, w[2], w[4]);
                                    Interp1(dp+2, w[2], w[5]);
                                    Interp1(dp+3, w[5], w[2]);
                                    Interp2(dp+dpL, w[4], w[5], w[2]);
                                    Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                }
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 124:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 203:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 62:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                dest[dp+dpL+2] = w[5];
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 211:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 118:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                dest[dp+dpL+2] = w[5];
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 217:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 110:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 155:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 188:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 185:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 61:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 157:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 103:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 227:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 230:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 199:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 220:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[8]);
                                }
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                break;
                            }
                            case 158:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 234:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 242:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+dpL+3, w[5], w[6]);
                                }
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                break;
                            }
                            case 59:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+dpL+3, w[5], w[6]);
                                }
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 121:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[6]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[8]);
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 87:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                dest[dp+dpL+2] = w[5];
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[6]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[8]);
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 79:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[8]);
                                }
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 122:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+dpL+3, w[5], w[6]);
                                }
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[6]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[8]);
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 94:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[8]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[6]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[8]);
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 218:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+dpL+3, w[5], w[6]);
                                }
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[8]);
                                }
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                break;
                            }
                            case 91:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+dpL+3, w[5], w[6]);
                                }
                                dest[dp+dpL+1] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[8]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[6]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[8]);
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 229:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 167:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 173:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 181:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 186:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+dpL+3, w[5], w[6]);
                                }
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 115:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+dpL+3, w[5], w[6]);
                                }
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[6]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[8]);
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                break;
                            }
                            case 93:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[8]);
                                }
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[6]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[8]);
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 206:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[8]);
                                }
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 205:
                            case 201:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                    Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                    Interp8(dp+(dpL * 3), w[5], w[7]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                }
                                else
                                {
                                    Interp1(dp+(dpL << 1 ), w[5], w[4]);
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+1, w[5], w[8]);
                                }
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 174:
                            case 46:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    Interp8(dp, w[5], w[1]);
                                    Interp1(dp+1, w[5], w[1]);
                                    Interp1(dp+dpL, w[5], w[1]);
                                    Interp3(dp+dpL+1, w[5], w[1]);
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                    Interp1(dp+1, w[5], w[2]);
                                    Interp1(dp+dpL, w[5], w[4]);
                                    dest[dp+dpL+1] = w[5];
                                }
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 179:
                            case 147:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                if (Diff(w[2], w[6]))
                                {
                                    Interp1(dp+2, w[5], w[3]);
                                    Interp8(dp+3, w[5], w[3]);
                                    Interp3(dp+dpL+2, w[5], w[3]);
                                    Interp1(dp+dpL+3, w[5], w[3]);
                                }
                                else
                                {
                                    Interp1(dp+2, w[5], w[2]);
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                    dest[dp+dpL+2] = w[5];
                                    Interp1(dp+dpL+3, w[5], w[6]);
                                }
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 117:
                            case 116:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                }
                                else
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    Interp1(dp+(dpL << 1 )+3, w[5], w[6]);
                                    Interp1(dp+(dpL * 3)+2, w[5], w[8]);
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                break;
                            }
                            case 189:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 231:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 126:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 219:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 125:
                            {
                                if (Diff(w[8], w[4]))
                                {
                                    Interp8(dp, w[5], w[2]);
                                    Interp3(dp+dpL, w[5], w[2]);
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp1(dp, w[5], w[4]);
                                    Interp1(dp+dpL, w[4], w[5]);
                                    Interp8(dp+(dpL << 1 ), w[4], w[8]);
                                    Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp2(dp+(dpL * 3)+1, w[8], w[5], w[4]);
                                }
                                Interp8(dp+1, w[5], w[2]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 221:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp8(dp+2, w[5], w[2]);
                                if (Diff(w[6], w[8]))
                                {
                                    Interp8(dp+3, w[5], w[2]);
                                    Interp3(dp+dpL+3, w[5], w[2]);
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp1(dp+3, w[5], w[6]);
                                    Interp1(dp+dpL+3, w[6], w[5]);
                                    Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                    Interp8(dp+(dpL << 1 )+3, w[6], w[8]);
                                    Interp2(dp+(dpL * 3)+2, w[8], w[5], w[6]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 207:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    Interp3(dp+2, w[5], w[6]);
                                    Interp8(dp+3, w[5], w[6]);
                                    dest[dp+dpL] = w[5];
                                    dest[dp+dpL+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp8(dp+1, w[2], w[4]);
                                    Interp1(dp+2, w[2], w[5]);
                                    Interp1(dp+3, w[5], w[2]);
                                    Interp2(dp+dpL, w[4], w[5], w[2]);
                                    Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                }
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 238:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL << 1 )+1] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                    Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                }
                                else
                                {
                                    Interp2(dp+(dpL << 1 ), w[4], w[5], w[8]);
                                    Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp8(dp+(dpL * 3)+1, w[8], w[4]);
                                    Interp1(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp1(dp+(dpL * 3)+3, w[5], w[8]);
                                }
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                break;
                            }
                            case 190:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                    Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                    Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                }
                                else
                                {
                                    Interp2(dp+2, w[2], w[5], w[6]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                    Interp8(dp+dpL+3, w[6], w[2]);
                                    Interp1(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp1(dp+(dpL * 3)+3, w[5], w[6]);
                                }
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                break;
                            }
                            case 187:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                    dest[dp+dpL+1] = w[5];
                                    Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                    Interp8(dp+(dpL * 3), w[5], w[8]);
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp2(dp+1, w[2], w[5], w[4]);
                                    Interp8(dp+dpL, w[4], w[2]);
                                    Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                    Interp1(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp1(dp+(dpL * 3), w[5], w[4]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 243:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+2] = w[5];
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    Interp8(dp+(dpL * 3), w[5], w[4]);
                                    Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                    Interp2(dp+(dpL << 1 )+3, w[6], w[5], w[8]);
                                    Interp1(dp+(dpL * 3), w[5], w[8]);
                                    Interp1(dp+(dpL * 3)+1, w[8], w[5]);
                                    Interp8(dp+(dpL * 3)+2, w[8], w[6]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                break;
                            }
                            case 119:
                            {
                                if (Diff(w[2], w[6]))
                                {
                                    Interp8(dp, w[5], w[4]);
                                    Interp3(dp+1, w[5], w[4]);
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+2] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp1(dp, w[5], w[2]);
                                    Interp1(dp+1, w[2], w[5]);
                                    Interp8(dp+2, w[2], w[6]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                    Interp2(dp+dpL+3, w[6], w[5], w[2]);
                                }
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 237:
                            case 233:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[6]);
                                Interp2(dp+3, w[5], w[2], w[6]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp7(dp+dpL+2, w[5], w[6], w[2]);
                                Interp6(dp+dpL+3, w[5], w[6], w[2]);
                                dest[dp+(dpL << 1 )] = w[5];
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL * 3)] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL * 3)+1] = w[5];
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 175:
                            case 47:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                }
                                dest[dp+1] = w[5];
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp7(dp+(dpL << 1 )+2, w[5], w[6], w[8]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[6]);
                                Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                break;
                            }
                            case 183:
                            case 151:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                dest[dp+2] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+3] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                }
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                dest[dp+dpL+2] = w[5];
                                dest[dp+dpL+3] = w[5];
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[8]);
                                Interp7(dp+(dpL << 1 )+1, w[5], w[4], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[4]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 245:
                            case 244:
                            {
                                Interp2(dp, w[5], w[2], w[4]);
                                Interp6(dp+1, w[5], w[2], w[4]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp6(dp+dpL, w[5], w[4], w[2]);
                                Interp7(dp+dpL+1, w[5], w[4], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                dest[dp+(dpL << 1 )+2] = w[5];
                                dest[dp+(dpL << 1 )+3] = w[5];
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                dest[dp+(dpL * 3)+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 250:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                break;
                            }
                            case 123:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 95:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 222:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                dest[dp+dpL+2] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 252:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp6(dp+1, w[5], w[2], w[1]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                dest[dp+(dpL << 1 )+2] = w[5];
                                dest[dp+(dpL << 1 )+3] = w[5];
                                dest[dp+(dpL * 3)+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 249:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp6(dp+2, w[5], w[2], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                dest[dp+(dpL << 1 )] = w[5];
                                dest[dp+(dpL << 1 )+1] = w[5];
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL * 3)] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL * 3)+1] = w[5];
                                break;
                            }
                            case 235:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp6(dp+dpL+3, w[5], w[6], w[3]);
                                dest[dp+(dpL << 1 )] = w[5];
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL * 3)] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL * 3)+1] = w[5];
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 111:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                }
                                dest[dp+1] = w[5];
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp6(dp+(dpL << 1 )+3, w[5], w[6], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 63:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                }
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp6(dp+(dpL * 3)+2, w[5], w[8], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 159:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                dest[dp+2] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+3] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                dest[dp+dpL+3] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp6(dp+(dpL * 3)+1, w[5], w[8], w[7]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 215:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                dest[dp+2] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+3] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                }
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                dest[dp+dpL+2] = w[5];
                                dest[dp+dpL+3] = w[5];
                                Interp6(dp+(dpL << 1 ), w[5], w[4], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 246:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                Interp6(dp+dpL, w[5], w[4], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                dest[dp+dpL+2] = w[5];
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                dest[dp+(dpL << 1 )+2] = w[5];
                                dest[dp+(dpL << 1 )+3] = w[5];
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                dest[dp+(dpL * 3)+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 254:
                            {
                                Interp8(dp, w[5], w[1]);
                                Interp1(dp+1, w[5], w[1]);
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                Interp1(dp+dpL, w[5], w[1]);
                                Interp3(dp+dpL+1, w[5], w[1]);
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                dest[dp+(dpL << 1 )+2] = w[5];
                                dest[dp+(dpL << 1 )+3] = w[5];
                                dest[dp+(dpL * 3)+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 253:
                            {
                                Interp8(dp, w[5], w[2]);
                                Interp8(dp+1, w[5], w[2]);
                                Interp8(dp+2, w[5], w[2]);
                                Interp8(dp+3, w[5], w[2]);
                                Interp3(dp+dpL, w[5], w[2]);
                                Interp3(dp+dpL+1, w[5], w[2]);
                                Interp3(dp+dpL+2, w[5], w[2]);
                                Interp3(dp+dpL+3, w[5], w[2]);
                                dest[dp+(dpL << 1 )] = w[5];
                                dest[dp+(dpL << 1 )+1] = w[5];
                                dest[dp+(dpL << 1 )+2] = w[5];
                                dest[dp+(dpL << 1 )+3] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL * 3)] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL * 3)+1] = w[5];
                                dest[dp+(dpL * 3)+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 251:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                Interp1(dp+2, w[5], w[3]);
                                Interp8(dp+3, w[5], w[3]);
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+dpL+2, w[5], w[3]);
                                Interp1(dp+dpL+3, w[5], w[3]);
                                dest[dp+(dpL << 1 )] = w[5];
                                dest[dp+(dpL << 1 )+1] = w[5];
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL * 3)] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL * 3)+1] = w[5];
                                break;
                            }
                            case 239:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                }
                                dest[dp+1] = w[5];
                                Interp3(dp+2, w[5], w[6]);
                                Interp8(dp+3, w[5], w[6]);
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                Interp3(dp+dpL+2, w[5], w[6]);
                                Interp8(dp+dpL+3, w[5], w[6]);
                                dest[dp+(dpL << 1 )] = w[5];
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp3(dp+(dpL << 1 )+2, w[5], w[6]);
                                Interp8(dp+(dpL << 1 )+3, w[5], w[6]);
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL * 3)] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL * 3)+1] = w[5];
                                Interp3(dp+(dpL * 3)+2, w[5], w[6]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[6]);
                                break;
                            }
                            case 127:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                }
                                dest[dp+1] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+2] = w[5];
                                    dest[dp+3] = w[5];
                                    dest[dp+dpL+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+2, w[2], w[5]);
                                    Interp5(dp+3, w[2], w[6]);
                                    Interp5(dp+dpL+3, w[6], w[5]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL << 1 )] = w[5];
                                    dest[dp+(dpL * 3)] = w[5];
                                    dest[dp+(dpL * 3)+1] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 ), w[4], w[5]);
                                    Interp5(dp+(dpL * 3), w[8], w[4]);
                                    Interp5(dp+(dpL * 3)+1, w[8], w[5]);
                                }
                                dest[dp+(dpL << 1 )+1] = w[5];
                                Interp3(dp+(dpL << 1 )+2, w[5], w[9]);
                                Interp1(dp+(dpL << 1 )+3, w[5], w[9]);
                                Interp1(dp+(dpL * 3)+2, w[5], w[9]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[9]);
                                break;
                            }
                            case 191:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                }
                                dest[dp+1] = w[5];
                                dest[dp+2] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+3] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                dest[dp+dpL+3] = w[5];
                                Interp3(dp+(dpL << 1 ), w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+2, w[5], w[8]);
                                Interp3(dp+(dpL << 1 )+3, w[5], w[8]);
                                Interp8(dp+(dpL * 3), w[5], w[8]);
                                Interp8(dp+(dpL * 3)+1, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+2, w[5], w[8]);
                                Interp8(dp+(dpL * 3)+3, w[5], w[8]);
                                break;
                            }
                            case 223:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                    dest[dp+1] = w[5];
                                    dest[dp+dpL] = w[5];
                                }
                                else
                                {
                                    Interp5(dp, w[2], w[4]);
                                    Interp5(dp+1, w[2], w[5]);
                                    Interp5(dp+dpL, w[4], w[5]);
                                }
                                dest[dp+2] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+3] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                dest[dp+dpL+3] = w[5];
                                Interp1(dp+(dpL << 1 ), w[5], w[7]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[7]);
                                dest[dp+(dpL << 1 )+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL << 1 )+3] = w[5];
                                    dest[dp+(dpL * 3)+2] = w[5];
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp5(dp+(dpL << 1 )+3, w[6], w[5]);
                                    Interp5(dp+(dpL * 3)+2, w[8], w[5]);
                                    Interp5(dp+(dpL * 3)+3, w[8], w[6]);
                                }
                                Interp8(dp+(dpL * 3), w[5], w[7]);
                                Interp1(dp+(dpL * 3)+1, w[5], w[7]);
                                break;
                            }
                            case 247:
                            {
                                Interp8(dp, w[5], w[4]);
                                Interp3(dp+1, w[5], w[4]);
                                dest[dp+2] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+3] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                }
                                Interp8(dp+dpL, w[5], w[4]);
                                Interp3(dp+dpL+1, w[5], w[4]);
                                dest[dp+dpL+2] = w[5];
                                dest[dp+dpL+3] = w[5];
                                Interp8(dp+(dpL << 1 ), w[5], w[4]);
                                Interp3(dp+(dpL << 1 )+1, w[5], w[4]);
                                dest[dp+(dpL << 1 )+2] = w[5];
                                dest[dp+(dpL << 1 )+3] = w[5];
                                Interp8(dp+(dpL * 3), w[5], w[4]);
                                Interp3(dp+(dpL * 3)+1, w[5], w[4]);
                                dest[dp+(dpL * 3)+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                            case 255:
                            {
                                if (Diff(w[4], w[2]))
                                {
                                    dest[dp] = w[5];
                                }
                                else
                                {
                                    Interp2(dp, w[5], w[2], w[4]);
                                }
                                dest[dp+1] = w[5];
                                dest[dp+2] = w[5];
                                if (Diff(w[2], w[6]))
                                {
                                    dest[dp+3] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+3, w[5], w[2], w[6]);
                                }
                                dest[dp+dpL] = w[5];
                                dest[dp+dpL+1] = w[5];
                                dest[dp+dpL+2] = w[5];
                                dest[dp+dpL+3] = w[5];
                                dest[dp+(dpL << 1 )] = w[5];
                                dest[dp+(dpL << 1 )+1] = w[5];
                                dest[dp+(dpL << 1 )+2] = w[5];
                                dest[dp+(dpL << 1 )+3] = w[5];
                                if (Diff(w[8], w[4]))
                                {
                                    dest[dp+(dpL * 3)] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL * 3), w[5], w[8], w[4]);
                                }
                                dest[dp+(dpL * 3)+1] = w[5];
                                dest[dp+(dpL * 3)+2] = w[5];
                                if (Diff(w[6], w[8]))
                                {
                                    dest[dp+(dpL * 3)+3] = w[5];
                                }
                                else
                                {
                                    Interp2(dp+(dpL * 3)+3, w[5], w[8], w[6]);
                                }
                                break;
                            }
                        }
                        sp++;
                        dp += 4;
                    }
                    dp += (dpL * 3);
                }
            }

       try {


            resolve(hqx(image_data, scale));

        } catch(e){ reject(null); }
    })};


function hqnx(image_data, scale, pool) {

    return new Promise(function(resolve, reject){

        if(Boolean(pool)) {

            pool.exec(window.hqnx_process_function, [
                image_data,
                scale,
            ]).catch((e) => {

                return window.hqnx_process_function(image_data, scale);
            }).then((result) => {

                resolve(result);
            }).timeout(40 * 1000);

        }else {

            window.hqnx_process_function(image_data, scale).then((result) => {

                resolve(result);
            });
        }
    });
};

module.exports = {hqnx};