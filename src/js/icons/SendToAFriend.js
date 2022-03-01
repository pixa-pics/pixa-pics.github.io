import * as React from "react"

const SendToAFriend = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 930 220"
        width={1240}
        height={293.333}
        {...props}
    >
        <defs>
            <clipPath id="A">
                <path d="M0 0h930v220H0z" />
            </clipPath>
            <style>
                {
                    '@font-face{font-family:"Open Sans";src:url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAABLsAA8AAAAAHfgAAwBCAAAAAAAAAAAAAAAAAAAAAAAAAABHUE9TAAABWAAAAB4AAAAeRHRMdU9TLzIAAAF4AAAAUgAAAGB3cFOSY21hcAAAAcwAAABuAAABahZBEadjdnQgAAACPAAAAMcAAAD8PUksyGZwZ20AAAMEAAAIHgAAD5TiGZ5aZ2FzcAAACyQAAAAQAAAAEAAVACNnbHlmAAALNAAAAyoAAAPoGX1b4WhlYWQAAA5gAAAANgAAADYkTTQ+aGhlYQAADpgAAAAbAAAAJAiPBDZobXR4AAAOtAAAADAAAAAwOQgGD2xvY2EAAA7kAAAAGgAAABoFsgTObWF4cAAADwAAAAAgAAAAIAN3D/VuYW1lAAAPIAAAAaYAAAL9hhMwmnBvc3QAABDIAAAAFAAAACD/nwA+cHJlcAAAENwAAAIPAAACn4X9e+kAAQAAAAoAHAAcAAFERkxUAAgABAAAAAD//wAAAAAAAHicY2BhOcC0h4GVgYHVmOUsAwPDLAjNdJbBiGkSAxJ4wMD0XwDC1AAR7v7+7owLGBQYQjh6/65gYOD4x9TNwMA4HyTH4sG6DUgpMLAAAPTMD78AAHicY2BgYGaAYBkGRgYQSAHyGMF8FgYPIM3HwMHAxMDGoMDgyODG4MngzxDy/z9QHMR3AfL9GIL+////8P/B//v/7/2/8/92qDlIgJENXQQTYGhCB0xAZ7KwMjCAzWLnYGDg5OImbOygAQC7shMBAAB4nCWNSWoCURRFT9kNdFq6FnEFjt2GZOBMPygSW+yxCUkKNCT2igpCFuAoa0nEJVi5VfJ4/13u++/ciE0s/E3C61AGG9xf9dWb94R7lx+X/gPWbHlRLXlW7aRyzOizkfPDEy3eydLDwTCna6WoyvmUf6NG3krrNXKm4pz96xoD3sSYi3HS3ZK9TzLiP2jeHGrzoZ3hS6lHKnR4FT1HmYbyHRYUqdNm4uuD8vKUaDJSZkG/vN1YvFXkEjThKLabDEyDq3/Ix0k0AHicjVdbb9zGFR5Se99VsDYC1wDVdogpiQCUgr4UkFUjIbTatS6NvdKuHVK2U3IvkpUmsdOL5bRRq7h1bUwfC7Tpb+jL0HlZ96l+yI/pr1C/M8NdXeAGJYbkzDlnzjlzbjMTbv7j67//7fmfn/3pj0+/Ov7D74++/N1vv3hy+Pg3v/7VLz9/9PCzTz/5xccHD/b3xqPhIE1+/tH9e3d34+jDO7f7ve3urZsf/Gxrc2P9RuedHzZr1UUrq9daojWuLS2yrFZHt760aKlSS5U1UN0KuAq3I3drJ2qvOa4bO8JVoSp4bXrTkRxOETFYYBbmgsVWT2xt70a8LRONBKR/bmTwyzNc3lN2qx+pToDRmfENPZ4N1y+gN6ZowRXrSjnK2JwHeOhklu4UW3+JsZJYqEEgXBGNQZtVWMPtJy30GtOexW+AI5802QDv8EMxsfLebqR4shevg5rZntKtN2E/EU9MP1F8yLkqeWLQjaSrrEQ4+XgngsWs1JGucHkcT05eLxC1cMHLZquZsF5sZ6H1orcbQZTiL/rRS9uyW8lqnP0IuGjCmQo11CYoAWnAacC2LHjmpV3R9M4kZOpYYwsaoMdDrELDDNGrkFlsOLENrGkE+SQIGBuYgsGEU+oCYBUDOzbU7+TUFWCahHnFbIspjTQPrATPhLViWAmrYcOet+ELAr0E5F8WY1WLfdOw5i0nA88dDZ5Yx1k1dCaa005OeQxKgh3PYNCcyM4wgjyz8NunK7i9G33TYOCvv6BYpWdpsZ3ZNwNxGtbbEbzXzqybQYLQpuGc1+YIaxX2IqJNHMQ8onttaZGii0di7Ig4e/tt+aidNZutLdlCICPWdIBlaclPAmlCjgJNNFcQpnPexlB0EpAIpA3aBkDDOzxRgyRAlzc7skNRkRI1u5LZc15mFTzrPfYe7FZqqJoYr6q6WJ1h3mfvG0yJMGWxqqwrxupt0eZXD+RQDBCBYTfad/biFLxVKFJVEKtOVmCryJerFpbUztjNAGvbQgzeCrp3kaRkDC7lGs/Cgp8OUxqvuch7maPE2lp8ZkabSxWmwwQU7VgTIxMBbIuUj2BlLBeW6wl0d3dpTn83ko2RGAlYOAxlimU7fBg7Mh5qi2M+VGNLi8XT6pQXJ5ty3hvu4YO0GCRiYACUnRdh+xcBe6A6CxObJE7/Lf2Xm6I9AgW96UjNIeJcPopNyLCurhv/k8g6Q8ThU81cNn86HVn5CAM0qfbPDx/Mhh16E1jtXRMrquBT5EWu+thRn8TBjCRVxwMueVOsCProyTfoTVQRneNhSsWpRLEHwCYAPBoglsGwk8hpxGFawZ9JUp8F51iipFp9iLY9Wo467vIk5kkCKLLHdbgq4s/3UgouKrtds54uaj9+qexhLqMEclQZO8BeOhYuqrWipDXWJx0L0I71IsUcKYVUFlT0OiAGe1+V/A36oT0KRDqGE0keT8d6bgfqausQN6ct3BgktqdtCcOhWgzoM5SIRnUf2Vb0LsnLkl+TqFr3UXAL/vBOgm2BN3mHa1eniGQywgaNYjAyhFWPCDFfN199GmT3y94pRLeHgSGuaK7QbCdS3SlJWTd0Pg+U/b1lIGnx1g7qR0E7ioxX9DZg3hBR5dBsrux+lLtHz9+gqc7UYWYaILrs0rboTvWtG32N0JJuDd2qnqp4cLQqQAeDLtNyToMAfSht5sxpdc0C0IconmP0QpJ8UPDGek1mO+RUPnFQSAW9zuTk313UyETQG8ckvqIF0QzNWhrGZK4SId9kilySaXVqG3oJZ8E13cpaZ8KZJRXPGz63HrTKLefmD8UMrfJ5npV53o0d9SAORmZWKa/gHBUVlXu4rU8bd5ENwi2jjmH5yCquegE2Eb2258aqm6Y6UFRaHcE6iKG8w64wxcS6RR+G1BLrysZw1hMvbWZVxDL9qmI5s60yqj0Vo+Z8A4VeDpOR2ahhZbbsXKejUUk7uqp9+5hKUz8qOoVYh4yvDoM8is33cTDDH1JOlqeWrBBOzpBFze7QxIaffx8HlTfOkpX/T1gl96aqahxVI7/y3aLmjIM2jbs2bcN509SJTcppKam0Zfffogxt+JcAvwzVrkHJa7mWsM2XUKVLoisaoodItzKpY9zm1YFogva1Ce06kE1o89oxVGiTkxOtt6E2RoDeNc/EeY7OZ5voPAxi9Dr0JiDp0JtnUj3P0saFqp+zNz6tnkeKGTPa6MWMI40yq4EzcMEpQqLPmzDXiranD1UxliuZVfZzgiIR2N6KlPVp/afy/4qxkOnDJYvlRYA6gj/g6/k3YyoXofManHt5fvYnYJ4OtZaqt+j8QntTlQLgXfj36Nu85ujjxBnDaBCl4lnoVbJ9eVoSHgbTuVO77emUzudegPajI0DJUt/STqIs/Iu+S69DptPSKMYfBvlB94i8+1SzexpwfoBzVsvCaQsb5QFtVZyoK74uchIHnoM01XVIX2Ou4iy1Q6dj3ABEk1vX2XVzGRL5PQN7QMGLrjvXYtwrJif/WYhNqbKxyePtS86bl4CS/DIuGuqZNm+OExqGXbzk51S0gmdITkNH2jdsudWDEehGVlt2anTLm16wvg6+C81pPqrUhD0QT1yyxYR9JL7AcaElFOf3UBSx1U/YBwuxlNhSpaDb1J3IfAlpTdiPF+h8QGeZGf33F3BXOwtoLFDgpZOTfy7QxelU7lczuYeQSz05FTxh+28USyFn3TWBh6bXMmHYjYVRpODnsuU9uYvrIpA/IPG5PjR+ayHWXKDQX0mh/wK/JnnXAAAAAQADAAgACgANAAf//wAPeJx1kltIFFEcxs//XHacddt2xtUpSnFc85K26V4Uo2IpNTELNYkezKI2Mo0uK2ZhBGVmUBBBRZeHopRu0kPaZmJXiCwJ6aHHpaAoRLHbQ2DOqTPbLgXRDHOYgXN+33zf90foPxc2F9bJhpCEVDQnMGMGUTEmDIckkhBCeZ48pWShVykpKJxHdKKDLgNx42w7lggtbjLGm/htTKEdWwzeZNV1q9WVLm1DUM+72dBUKd4IdRnNO3Nz923XeO9vvQGh18rCyIqcyHHXYcEhhf1W8hQUghNTl67oHqoynxvyQPF6iljrfX5+mm+CkQ9QO8gfbLh3tKfzXQSPfed3rrLwFf742+VXwemKr4IPJp9iwU9EswM2iywDwzhkhZiE6UZ4ERLJsYfi6TCpNCbgE1ewE7Ew5w8574qzCBcsGWmBxDgrivqXBGN8lJQb4/CZO6KULiPOgEnBIMh2B3AIRU8XFBYrujIARWLnVGV8H3su9iWZWtgmJyUKKTn222qJ2YAOrjSsiYM6eEUJis6e8z3GYZlaLISPQxdul7CFYdAQrS07fqzcqGbhH/dKjxxZjvuj2bf9nGAf2UukoHSRfaqdhFKY/Ff2FurKyMzCfp+a6TUrcKaB17MU/D7syrAD+1h3k0/19fGpm3WnoejTJHhP/3i9qvvQ4e6VvU87elbhyHU+PtzcPAwpN95BzeAgv/X+XKStLXLuAyS0Rf70XyF8zkSzUGrAnqCqNptdmSk6sv/VkSr8goemJDvtIIEwLlwzlzkNfl8W3vQMyIGq/RVwi1/jV3r4CzjVEDzfeYKFNz45FTzTqBsduNAYNVto3RpsXGfm2/BzgmpsBC1EcwMOB3Lm58y20MxUErLRWASqZooKQVeGG7KVuHfx7iZ+31LxmaJJbjCjSBbJaGmYage+9Fad7Fzc+HZH1fr5lQdrvHu3l+19czY0uju45dKaRbXzl7TX77q4Fs4cetTozE6FdHdlTvmC4tWl2bPKgieCHYOb/Z4vuQvmLc/3rViW72+5EJ2FXDHD+0RGEkoKyBIh9M/UxWbOvPEEf8FbaDVvQbQfMOcI/QJAywMcAAAAAQAAAAMAQrDX41VfDzz1CAsIAAAAAADZzML3AAAAAN13JlEAAP/sBecFzQABAAYAAgAAAAAAAHicY2BkYODo/buCgYGtkQECGBlQAQ8AUFoC0AAEzQDBAhQAAAWFAAAF7AC4BHsAuARkALgCpgC4BoEAuAZeAHcFSAC4BGgAXgSiACkAAAAGAAwARAB0AJoAvADQAQIBRAGAAdYB9AAAAAEAAAAMADAAAgAAAAAAAgAQAC8AmgAAAr4PlAAAAAB4nHWQsW7bMBCGf9pOUA8xgk5F0IFjMkQS7EzxlASwlwAK4MBrkcgyJUMRBZEegoyZ8gJ5ga7dOnft2ufoW/QnTbstkIig7uPdf3c8AjjETwhsvjn3hgX6PG24gx6+BO7iE7LAPQzwFHgPB3gJvE9+DTzAEb4yS/T6PH3Dj8ACH0UZuIMP4ilwF4l4DtzDZ/E98B6OxK/A++TfgQc463SvdPPYlqqwcpgME3lb5DJt8lrO7mojb1q9yjMrL9a20K2Rx4W1jTmPY1XaYn0fZfohVlqrKl/q2ppYM9Mw8WRX4lJXi1GUJMl4mqbTsfM796nz/+3jTvO8NaWupVf/p3NN2dNkbdlYE5myinSr4nRyjStoNHhEixIKBSwkhkj8lrilJ6dNqclRk2a4ozWkG+ZorOjPfNYF1rQFfa2PH/tqlpkG54i5FHs4xRr3iJil8eC9mkuhYqUlqabG0K9DTxM6nrxxi0uqKiwwYr3ErzGm1KX8j3f6rfp0p39rnm1szoiboPR3kf/Ufr/edtLNnIazufds/CSRr1XRupdRjKeY4PoPMhqQBwAAeJxjYGYAg/9zGIwYMAEPACqPAd14nG2NS1MTQRSFeyZDeIgkYhHy5EAgkDgQMgMmURFHEF9RhxBa00kcfMc3StQq3MDGKjZQVPEzZuHgirX7lD8lP+GagJRYZXXde75zbvdtg77OrPN18SVr4nOW8Clro5auYy1N+Ji28SFDWD1PeD9l4d0U4e20jTfThNc64VWqipcpQjW1hhepBTzXCM+0Op5qJp5MWng8SXiUNLGStGElCQ+TaVQmCOVxC6VxghivoqhaeKDu4b5K4OcIywkLhYSNpQQhH9/EYpxgNvXeGOHuKOFOjJCLbeJ2zMCtEcLNYcKNqI3rUcJC1MK1oT3MDxHmUMdVEAzYuDJImB2s4vIAYSZCuBRew8Uw4ULYRMb4mbYwPWVCS6lIxE3E+0KBylhoAqPNL2I9wUBlJKhhOABEA4QhVDHY3Iqw31cZ8IcR6SeEfYSQHkDZn/VlysEW9beoLzDro9JZrZef0by8V3jFab2bt+kK7xaK8CgbSkNxeaiHn9K7eLvu5tIK4z2iS7jFL3fDLTOxyjbYd9ZgipdJnXoHd+ky7xCy8MgbckN2eZnLMNqkA2nXWVZzB+20lHM6F8uOtOXECq1u5EuOe8thvFQu7kvSjvi2vc0iczlnt1D84WJNFPuyPJ8v7iuuHTFXYypTVbXW1ENsGVX9kx516cRhLXtYx7O/4dFT9Sg9af+TSMfwz62m8f8GiPisZgA=) format("woff");font-weight:700;font-style:normal}'
                }
            </style>
        </defs>
        <g clipPath="url(#A)">
            <g stroke={"#768ad2"}>
                <g strokeMiterlimit={10}>
                    <path
                        d="M99.1 16.9h-37v186.2h37"
                        fill="none"

                        strokeWidth={14.022}
                    />
                    <path

                        strokeWidth={9.348}
                        d="M40.1 9.9v200.2"
                    />
                    <path
                        d="M830.9 16.9h37v186.2h-37"
                        fill="none"

                        strokeWidth={14.022}
                    />
                    <path

                        strokeWidth={9.348}
                        d="M889.9 9.9v200.2"
                    />
                </g>
                <path
                    d="M918.5 188.8 905 205.3V14.6l13.5 16.6v157.6zm-907 0L25 205.3V14.6L11.5 31.2v157.6z"
                    fill={"#768ad2"}
                />
            </g>
            <path d="M739.5 50.9 759 33.6H171l19.5 17.3h549z" fill={"#2f4b8e"} />
            <path d="m766.9 33.6-25.1 22.3H188.2l-25.1-22.3H80.6v152.7h82.5l25.1-22.2h553.6l25.1 22.2h82.5V33.6h-82.5z" fill={"#102353"}/>
            <path d="M190.5 169.1 171 186.3h588l-19.5-17.2h-549z" fill={"#2F4B8E"} />
            <g clipPath="url(#B)">
                <text
                    transform="translate(225.798 130.673)"
                    fontFamily="Open Sans"
                    fontWeight={700}
                    fontSize={52}
                    fill={"#e6e6e6"}
                >
                    {"SEND TO A FRIEND"}
                </text>
            </g>
            <defs>
                <clipPath id="B">
                    <path transform="translate(205 64)" d="M0 0h520v93H0z" />
                </clipPath>
            </defs>
        </g>
    </svg>
)

export default SendToAFriend
