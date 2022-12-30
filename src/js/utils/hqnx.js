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
window.hqnx_process_function = bltf("bHpwMwsAsQBkblcxZVlLdkpIWzJjbjUAgEaXAjAOaKf3yV5FabWf0N1JIu1ydOuFybwr0MWe7qJ0H6Hte9yc4CmbUcyks1vc532sK61vcHQHSokxH+VrlDxvlTObavMp5BX0G/m2XzSCg1DN7ynd/HKMH3vKZy74ECYk4I1O9xEDrBGq+le035Vq/AUeno/8pUPfBXOmxrExJsNBMYMea3JUpA/JE2qIp+JCFsQdVt/eJONJE6SDLdLcmYnDc9DVp8nV+mClA/wVJ6Frj8ycCOqCDOUvne0tRG4jlrOPwBkRnxuxJqR2LZ62CMI4cU8DevnxGULlM9ndRqAZJMVWx4HNXLSxyeQC/ztotRqfE03XOBlErrnvsflnRSmFe5SbH/sQw+DdXteiKcTiPAeTyiJQGd7CubUQ/+33SXjzLHhlxiHdSvEA/fcFEPB9qPXSJttWhhtdZ9vSqx0SHB/d3GWFCgfjyvasln34kGmgxoxHqAOxsKpUEmkD203q3lSNuJLLjQg8fVMOr3CrQ5QB/8Dk2zTvWFt/8Tqv04s5WHjPalMhJfsoLuBsKQhLq555OktdW0TcryQ2tcgrNxfXzLJZK1aFq9ghW+6kKNiVtMmd4i0HGiNkbzGNCjpiY2VuIfJB35qkw3GplbIo/Ky4Yg15mZdctwfRnNEIuypTIH2xNGgNJaRRPxNIvIlrw2TGWPb1SM5jw1zR/692YjQ/cgQ+61B/rj5abPdPD8jZ2bmhDop6iQQKvrXjA6GoG/nLWd5gIQKhOJzk4pA20YKW9iJOf9X3iwDAtIP7bfMtsInY+qcZoPO7nmEnih40Nz2qvcUDhJWryMNFQxExB83JB13ljYO/tdOnTG7/Qvt0SvrlVmHlzNTQKVvrWDBw3KfLEFib4FOUkSrjsX3h2IIqdl+BYM7BAZVIG+UjYivq4OLNvHsBrzU5c5DBPYiNRhf3jjnwoLcQu/Irk4MJlk0JxN6z6BeP3VxYam1Q+MbNeHKZhg5LXOBmUkc1iXWVNRniz6co/rUgeIW7oKbOhz7L5Mq+r55SRt0a8YYtu+c/gNFX7GtVZAer5XA0x0Tzxr/7vyswIUB0K9YlyV4rG215izKM75BzX5tiDkif7nMdycCSifqTPKjh4W2crEiFxsR24yhMXxrcwWrm7HIbw0/JMzkwJzM9L9jFlOukNwIxmIj9yBI7FEyBgqIAtt2+9bvHGBuC19bbHFLUUy9yOGmsaawRPwB1WDviPzD82wlUbv9w6GtCU1ADYBYaVv5130ltAL5WsLIKs2wLy6Pg6yu6mlMngmS/1iB5W+16s33xGSfJq46wYhLND14CyX98Xvo/PXz1yHFVArdE1pevehH0mt33xDQ+oukea9itn7KWFK9JiqLlcu1Cx7kuCJVHsYaR0QVtMsGJYe4Qe1i8R2c8MiqxI3YpEIxW4xihh/jsJNk+jsFE6KvPGadkcZJ7QIfP4rZAMwde+W42q0Th1jUuEHY7xxwJT+SC3mP2Tfq2L08pAQPNPuIh2+ZUNiyeIE9wdNmY4/CBhiXTd+RYOKntnQ49P+bRpZRAQ+sUDoblAtVJY2RgyzO3p4F2xqC1UpOLsmgZqM3hCytInuv6wZqtWmiV+EkU5+AYdQtk8jTzQWN8Vr/f9ZeCu+t5w3xctJfPMhWt8Rxg+PHHTVyJ3ObbKebtRfYMYlsl2EoxpRzBaG1rvUNR8pWz9RMSO5mVLNXWvtPLjaJsTEve4+tlT2XrYvqZKzXBEGcDsn+CLWMYxLnEDom32c0KPI3YtTMpUxXIAIXvK1SeMsx3R78MBYZOs8ngxISKPlQbCWnl838TZlszwUdXa3PMbMM1vPGU7NgX2eicE2svwGOez2W9l/TwkB7G0JXeUfLiHuQ9BaQc2J9VcNocI3M1PHNf162WnTK6kOrovMC2cIx4qfKNFlWCku6SURIe6jUfNYGboJ+cONDhTIY02UMkQz0/YxQP7L+t3Ewn+suZiEuhzGlswIfjjlt4X+ScBffU6mRH7rqjoptgX8+MOhD7uoekUqRHULw9ZnkdTRn5yinwuownxhhS3fcgdwTRVvESENa5Y2DkXgoupdmHBjHlRZhQ2evPyko6FdP594q/asCRUjeiWC/5VtPPa1+m06TPp44NGcK89nXNUUKHMrK1KSmLStRHdZ76rQucU73qY3ny+n/FU9gZBXXpvFID3zjeMoykQ91QB2A6I3TZingaisFZJJ5Y7JBdK9ZQHYtxchtr2IOqXCXV1mzoLsLmz6HAukH0f1/V2ifeW4BIjAFTCVmZqIJji40aAgb5CBqhzpwVvkdysONY323FkiTxWXgmf2G6gVmtSqaKSqkOlGZOWhDKLGxG6S9dq/ooWPG+IC4jvfe2L7axMk4/h5gZfK3GMKkYC8qRaNpuKDBkAbzdShVOpjyMW5YaEOKIAy0A5Aw6RKSFDC0yvicWC2rS5OQ5vZRkaBVLC4O4/DtuSvn3nov23M3jszrW0c8eVtX59RunhUzmR22IZKdd0sSKghpeP/lNLX403kGqtbGTgascH1ASqZOXPl3ws6ud8x7McOQjeA7JRwNnU1PWKxmPiMud+V397u5VEzrWmx4VQppmBVL+jEzI1YbGA/lL/s1Q2kJ95g3CTrHImqiu4rM52GL3O4lztmlD7u/3WoCSP8ioHCoev9oUM6I11cliIBxLjS+DiYdmaFG28pJQ1CmeyUCPsAMhwGtIuWlczPc95K8dsBG7rd+WTS+q0MzcQ37H+/QJ5PjOPuHZtq+jlxsbHBsVWELvu84P9bCoNVEQVdhfG71Xwb1ZrUfqnMSbsprB013E9P+aL4HeQzGex9J4DMomnMIVZRDNwaZVUvwZ+Q5VEjtzrzLxBlsw6xh+0nRCut9s01CYU/gEefNmf1l48KTNsqN25mYScRwZO9maF//jl50OAa+KYQ1swVFMauC8/8aaQUBdL0VMC99jYd/jDm+K/EwwPG3sDkbn2wohSlA26h6TON3c5SVYV/3ONrx696fe6+RvPPcj52J+NPnLSw5YHy0awEcLJVPPjOhz6TX4uyN699TNKww8cgVOH4Ia9oWrCOXDRwgEQlBYrPVNrHlSg52b9/Fth3ouOrpLC8V6oNHLkyru84u95KoM3jmk0CToWtiA0CL+48L0RxNTl6EMkCN/NGQc+uSSl7eomehal/uzgZ4KSeEjNhGgqFG9RaGYioUcfippLVesrZuKqnZIaQiPgzAMqsbUsix8VARlMCbQPoIxNibrsHdYtoukHnIPhrZ4V+owk4ScRfdrLBqgD5M43/LShdT9R/ogmwUbC0/GScZUQNRfPCS9S3cgm2eq6dmuyPAlmM4LB4/+O4GlWYRwuTcH68Me0OjWIK8cqPvthQ8Ml8i8WQIM1m7PTWUVdbnqpVK/3sGNAfhD4UU1ghOtiGVXp07jRdJXBJZJ+ij8vGXgkjfdOPDTa0jPhVQ4M7jAUMylBzWdn6hDzU/oOQKYk1rQmHWDe/odTs/MFrACixsfjIH5AkuWpFNXCQzdgcRbTy9zZCEqkz5ryxr7+JFESOMw2SD7rl9kvRl7ig3SZdBalcrzCNnGOxTXhpV170rv8mro9DW8I8dYE7VuZYpAacJiJSZM12UGx2qD5xT6/uTzRTZ4bgmsfmOrGvQxurbO9bklC+V3SA9dSb4SemPMNfvtFBaeycwYQd+m+kkJ6b9/wF78MJDbTHm/0zpi9OizunaSpwdraTknwBz/dJIkMnEvNVjDXiK2DrYpPWORoeZhdqq0UkbYygwo51qWOgz7AQBmHjFtAqqUxMRltbdEGXb8IIrxmQfFYiec0prH1n/qguTfGYOzvCQipJSPjFM0kZfjxdlv5JYNYwlTCs6e7nS0hgjWsyBF0Se0IPEfhcnRR9hAyjPyAkP0n/wYliCFwWgL8urgptdD1iMxwWvZg0OBeEzKXHHjIcQ/yHlvZRv/d+ASWx6Vx3t//w9JXzIeIofBdv3TFclgJFYhOJd3t+/KHj6TchdakrS4uiyh1C9cVtBucHcOV9QHGXEb+lOh4SJLaow6HZnmriaalTYb8f9cB/6WVq8orfLpKgpxYVibFHIbVDq0Qu1sSCvKUG26fzxX1cz4K/ORQ2dDcWm7ySTN73M5JlC03ZKa9misW0hzJpSoHlw6t0iTKfyeCGDkrqDmy80zw8FpvQlVWhiDHRh8H5UowigdzKVM7mjQf6JbwqdPtP1CD4HckwM8njSMT+VBxA0E1WrAeGCxBU2AHrXrvc+4czzMC6AtCYFSeXTXFGGS87535EmVKt5qjiowlH7k4lSaj8YJhOx5P/zTLTAU4DaO8+XIBHYczW40jc+K/PXUBCoV1gvWY1r+QABROF9sMu52ryWbbXPgPjNeiK3Vi9R31etH3UarT21Cnx9Ovuc0z+N58YdQUIAQ7DlLSIfyxxrUfKmA/1RCtuPcANVsr+2pWxlJSRNEbRWOY/81jWnzjvuj2UgVnURks3qmTfLqbYxJ2lIKbbftUoEaQXrqsrn+BoikE1fhEmvhXwGDfnVtESOCJNKTa04u3M7PiZIkP+OEHd8eQaxP7tE7jv/Galk/aTR/0u5CDIPqM9KAA17hpyfIipG3PMiqv4LytZ1p2qzGkB6oX+EP76p2MOezZF0k/6UOIMGIKfTTig0+3imuRBP+MY33W9CvgAVonG28IxrVNDccyiCt7o+kIegJzsgZwPIH+Ii+bnRLeVrIJKJp8fERrAavtD31dhXf2IDP9xj1wRwYAOyNZfFj7BJcWLPxvQQBUf4uim87PO1ms95a+rvrCLHxoudAYJo2typuABm2EIWCaBLz0zIwIwLERqf80oyDvonDdt6rnX0RlVipmg43E/E738J2iJVi/rTb/Eswfno5Wx6qhH2tEnvqLw4djJN5Q5tEG3FUpdjBRvnvlbc3Pk0l/2qQT9f9g+m9mc+Np7zYVPtcm3k75F7QQZje9iCR14rcD8bmit2RAD+2ttxAJZlXgOwCeEmP7MmuVnEv1LT4hjtEfF5oXAR2YyfqmbTmYhoMCSMC/aRuMQKpznWTgyEwOUlltHroSNSqrXb1xw+9B8Q43JpmG/kpp3yXQiUK9i4oBtsXscRB/HanUPPB/HmnTq0U68c21X/h0EIjn8E9aQAJgTs5javepsA7sL0A25VVFMsdjYnTqr51ZHAqsY36ZM3F1tSb72Tdu0wDN2sWFdAPO3ooIwhpoho/GeHuMxPN3eoRhnVhasIFIAGe1i2tfKLSkejYqEsZ3Mqvuy/t97b8KfGtShoXznKB1d4dtii/m87IrGPWbSWu8kUzfpP2FfzWTLJHnFybTyGOthejG1s4HO2BkIF012HLQc5LSzDbdff/VpyZwec5fwojjfve15Acz9/NuTNoaTrZOY1Ip0fLzzAdudIjq/8iWKpyfe3oqMJ9G6leY/T/YcwSAmtWUZY0atLnqrUl5pPj8yhtsfCL6Mc1N4mphIq1Li5B2vNfNb43iAp6TQKOJsOmRHw4GYjFip2hbs5bAvYyfiNeaVjZMDTy3nEEpjbTd3KoHpDfVbOoe72ny7qEad62B4Ptd8BXfN3Y/5WNTsKU9yp/xp0nHHDNGRmJDtrcHMGGwz1CRBQ6Hn0bPOt8oDga+wWRExRZXDr1JarjHaJSan0KdPPsCe3nZNPs44DFzuJtjwSbRYHS6RJC+/CzNdP2WWlg8suHvr+4mvIvZhol16lQ3kiT0P4cBGbffvMmb7mkpU8LPku8a5TtonDaw2GuYOid9wRJaJEbAkpSM7pWFmEqVVnVP9gNSFfBR00krwY9AcyMwmnJ1CEXHtgwgwJoNRNoo85yxZBBh2MsJMgoQPCS+8lo4Ttkxq/bjYKAVQRqZGVolxlXorFxbR/+uIv7w0JrC5ULeBykOFFX7ZRjRSCb5Utugh4hjZorePURd+sZltZkJSxnhzApt+D09XXOsJ/0InfBYKxImr/8Al6fCQUIcxkNSDLf3ZqidmKt6dqgaTmtw5hZ35FkIvP+VRyQ5ugPUUJHXK+5/s+CyKea0EuV/AOGAKOBRXWbSx0YLl4uDzVHPtxqX3EIR4caP+8TCnatKAqGDpua6OmsKwG7YouVf4Qkmj/xRvrVeripA9VKn/AQ5B84Y0Ds1Mb3LNLyedNUAo6WN5OPY7rTWwWbDGu6cadwZdFZCDGY2FX8uVbgqGKPUW5aPBOcF8Q/Cfqox8QIYOZixkEpdWDwYO0GOFPwiQ9MnN69TdrGVpzI4HeQh8/gY7rTTUgzHTbHKpddyOODoBx3DWr+eHgyGHLXrHwXUmKd4lkc8LWlC0FjCUK2hgJ7l9aTPCVqssW+4G3Fq4zzuHSoqJ4xJOrGweeJnuOitynLbAJQMPplRI9UY5aWr8cQsxKRyqjCX4pNUVN08Y5BAsI+sUzYJpxcKCrUo2UNf870X6HiaQScUzM86mV5LJsYvprQtkwO5pnlmdKXy4319Mra0SnpQy4yF8uzoAi3+Mz1FW1ge8kPP5YFgUyGwRXeN2jpWM3q406DKs7dy9nCr+HoPmaDvarPnFAbrsW9GzEzul4XdhM99ZSJr2/OpBg4OVGf2lb/fz3Qp0YCBFZ/Xg3xzvUin+4JiOcO4VEnG5cAirhziLgj7XJsYBelvA9RqTwrDySwGjMLfh1UNSCj1KzxbbaUu1N6J7QqLxjpT32iJWC0hok1Mdh55MOwdtWxzjdXmuQhVvKxk9fJnyRsMgGBuNaMARL0MNytBy/ppV/yiPgiOPEM9YYZUg7vG+DUotIdeLh0xjMJuSs2tA2d/8loicosf1IOVbMwEan8oQBpr2WC5rYVjCoLasAv+fLU+BiO9uNW6VDU1Ho8pUDSn0t9RNblogedfe6uIjBVA/ZiLiwfyTg2tXtmcBDhTVzh8FgO5WN4admPpB1YGzjr8v+k1MmhaYhfnYyKF6VznwBQ6LOh0yN95Qgp/fLXzfcUsmQFWWp9CqFuuvA2G1kaQ7kocPaxDnnIAYeQDausf1NGqoJ4wITflFU0K2sDghNcd2/sU2X2ygphNgIwoxTxxmq0ccae/2KAOdQbly1xqjbe433b6z/tb+l53FMtbsWLV7Mv1EgK9G+h769OebLxfyn5HbnNAcPWFT5wyEegvbmPWIhafNIeTB0r4LzLF78clOF53Rnd4ySGpUxegnxvGF+Avr8da1KFtVixplVxOj7Ccu6ADXjJreD38eM9urtVQeZWBZLAU4bzhiqWo/dea0FTXxS/0SLXWbVphVBaY00CQn44Ngd5OwzmXJOylS8019HORoS939rjr6Gt/QJQSk2ROxMJxfDkp9bbKOrA/ijRHLEU9WY39LFGy2gwuWyk9GcikOcA5QNrEF0tnVm+X/V34pEtxW8ONjYAQ46dumoYnBWzMO+8iU49diAtKhg7HtEedhJo37BCVgIkbw9Zny+ZbvSwHpj30w+B4iuTHjXIbSLUZl4d9QO2kKQowAAs5bk6cQ23FRwJkAmzYeSkTSZDcNISMQOLdjSLYVn/Q/vtUK/W3y8tP+YK0O2TYgmOa1v73VK1ewpNF2qrYfECRayxJFG5YcY9xnOzB7g6M8bCIGFp++KTLSEoqo2p8W6DK19gWO+IT96i+B2O04J/UIFE7jIrjcSV8q9KKMjcSysKQf48u8xAUPX9Dn+BL4gHOJ11cEbbnVt0AlqJ1yDg9SUJzKSuXGGrpgM8kxkWB10KGTG5y7ASDuj5eSmmfIr82Co8aF1RwGxwI1Z1tQcYP1bzEqQGghPPa6ozMzW3nWZLrqnGcG3IhHmguNiswaCVn6Gd2kRFbnsIN8DdvqyDeL8sRkVBb4tpW2Gzq9wVPNZwlcL9hhDs+shu9moT9ZvZKOkUCnywYpZUKvX3dVOiuSKHc2HKGOHNHs9SmkPA5wuPm/pspmNNGR5+JAthWTe0eDXMpjaodLuaRBceBTpQrX9fvqQAvKGhnmtzBPAvucWD1O+lA2xSckYX/881Y9iWpkdj1yIv1E9VufZzbM1kNbpCAbWUUcK0Kb0RwgZ7AXZgnL+IyeCPAQ+YSLV7ye0tltLebOk/ZuEVcTlhmxokUTAG/NXPy9cwmpa1RD/xsbTLBq+HkrokFZ8O9krf94eoOvlBcoDnZ3tjTllp3CjUUcc9Rs7oGKi9FQyLI3tR9foKb7m77aVQ9FJ1Lyt74jrnpBAZzNXnUCWa60lDh7yZ4DNIX8gypVJX88oWHSGa2IAAwwYEqMFhbsjS88nx0PB186bzuezLgYyaYIJPFxi0w+Lady0TDzcLz3w3pJKMKNouC78GEVUkBQESDprG6xGY9ycpx2+8drC+vfrWvKE1mewoV21lTH6v3GQa3DJ+BjZvnc8ghYek/4gEBhDdqL9grDHf5wnUHhlHOhMYQtjF+kHUIK0v3VFd/WOsbmaM1rMSGvJMRyeoq+XobipZr6gJqt8neiLRzvwlQphZjEJnRBfxHgY6xDEMrQJBQpgUPDWWhK72twwlKkuqUwnkHKTMpTB2Idd7f9Kac5zl7xyrA5mLYrNFM0ND/dkyLEk8LKnfeS5N9HkIPJpLD/LD6Lzxw0sqzTuh1wgzK0tVZN7M+cs3LkYP8kUxZIvgweI4I0SHfMIUjrweL5gJFOt5hmBrga2XhguL5xfmiTfdqEodC47akO7LPW3ca+sp6BPVk7Kd5bqm1LUsvVMVcPHEM+F6ZVw8zIwN50qUGKeq5xsuFPXGzBVY6Hk6xdIXlipwbqFejOaWQFhEev5DbFcxxEv/8iymXiaA09cOTq6DEdlpJU1qEDP4QhaEJhp3zlYLhXfxRX+vHo5RzfaCh10y42AblLxboWn7UUQx4Gsoncdv9QBMJvv7x3NknX6JDbg7el3aa2eIDxwxkqBtORhzgGyTTpeU35Ow3PJ3suR1YFVl8+UpnySI5NnP27HLUcbgw/wY+V4pyLWxTYOTLI6NpQh1t3L6zu7J2NiM+mW7vKOh0DA9uqjr772y/Aps4D1HrUPIqqE35wjWFR2XDM0VthTHOtWtOoTiVrx7RxYLuuCsGNk1nxnkPUNbdMlPMuBq3BaUQ8OELC7vaLKff6QjorQcMaLf7oAsCJpwt8kL4aEprnY5V6st1Wd0ZNpl54QvyZyQ2YQTiVe4vxl7+5WYCubKzQZRIbpkWu6/Brx98+tt+lWCV9UxqXJUcTONvj0QSO1oSc8cbcAdWIwwmGjGKCA8H5pTI14xPfzQTD4wQx7Nn7IJE7xYhhAZZiizdr9PDjNWi7t9b5tV09D8EKa7q8O82O8ecZY1rnBVsRV09cEY4SjhDaY5TcDgMuJo694cc74kVgEBMywSVpy02kTxImAWq4DUdw4qm0tEWoPugoUdAs1XU8rS3xV79+b05Q17rfGNmV49fTEDxmME7h1nWoH8CAUvHO5xjIliUzGYx06ZDGWU3h/7C+NfmEycSKGwlAncDWMBQgoFsm7Y8WiAcq0J2lsB2fXaJjbmIDwU7qcioh2Y6G5EopjdsfQ+cFsNZgS4wtlu74DX7en2zdxB0P2MVU6q7qcvpkfUBVW+A4JIQOi5j/BgQURu5RuY9nknr2C3lt8f6aE48suuVJHU/qSmG7/xMijqSR8yDVhey/sQ025ujBh4vkDHHKS9fGBtIFp9+d/YICediNfAoWwxCi1bQ7nexvhWjgyb3NHrSFL902+Zbt+C1CJG+mlnIuz1PIl1uKse78lw3RIa1Egm5B9gS7w8ceRetcefQJYcX4AAeU1AgWK8n4HfXUlryheDqSHSz5E5XojoWsEOThRWnJ8lNRn8UT4cLD/vSHp2A6q1iZuLieTQVHn/AoS3JcNLU75RFAS07R2WhzVcJ+nz37avwT8DFKOGa883Q6BRjQiOQco+1J7abFtYA96ugGTrHeSV5VsU3FKpPS4Oz7+fgEbt2rZNPvtAfGhuYWZFvwSsvr6OPC7ruzUhXmFYhElQLKQ8/+2uKuOBzZfMGHLN/G2DlD/NzonEFwKN71Cehnu6CjnN5NxRi11MLXWk0pZwBsbh54f6GcMZKZ70Uj/QLgxVrEt3Uqrx5Hbh7yyRXO63e+/ravAXM8kL9uelQ2ZJWdoOdDKL76VxZSnb1nuDYOYACf3Xwa2xaW6Nadn0eD0X2tqtzat0q4rf0mC6ZamAGLjcr7oTYUcXxyKC2ueWR5Q/1TquzKw3O9Zz+stBjqbO0ze+sgpGR3XO56WUM9l0Vc5DGDrjlCrmLjt+gwJbXiFx/13HZwAjf5joO7Y+okTNDFmXAd3PesKva62VoiNvdpYu+bgqkzAmaKSxafl3Fsse9nNUWWNhnc2twDVlG1sBjqGgOC9xTTCQB42PxVCzv2MADWERsy5/fHva6matLo4iD/gx4PzNI5ImT4JjdaawU2XqvKfiS6pctTXc1P4P5fAJkwWYALsjEqOL8Yvhbt63YbGt83Pyx5Uf5hT6OTzLRtnChFdAjO0iMLeap2vwjsEs/n2KHpxL6K6YBUKKrIcDBN7Z4Dck/Oadfzot5jVFHdquJbezLpTfxD5KwomLRHr4RdMs4S+hW+6WodQ3nZbk9KUddSXfv7X0aChhUEsMZSQ+cE8A2ZK6zwnAp7/qI+fn5TwiaphhgvM5CNy3LBudcfntT9m0q02qka7WJfhUkHvX34HP1A10SgWope/A+sB1Mzws4JFwrnSwL9SU3O3X6b81dWSykLbj080mouM5AEynmzwd2g2mfe2+v26qevTqzUgmq13fK5vkt0V+0CoYIZ++ymjdeTU6gT+cN0l8glN25rcAyyRm6KO4uCz+aEXWDGd6E2v0Glvu2X4HF7yYq1ixFhWsTDiNfzlYdI/oLvF8ItgqW8mvhHRVhOciwbPcUO9d121AMKL7yFsy639ODJZLzG5FaZ4EqVIJlFGBihGkmuLJaLD0b7uUHSpS3A407lvob9CbaoBAAD9xBWDG06q8dOw4B4Pb8Fz/PJ/CaqLu5/9+6qcIclZdxbFFiwYu/DfiCnyRaHzkNhnCV3pgPoSqW2ZD8vHmG9W53q8xZ9Qx82OdOPzCavLoA+lgMyQO6983AkoCd8/p8Dr6qvi6Y+LU0jwFUzBb0aXnZs8ZaqPGQfHENOTVcckewRjK2WwPjh4Tr13NiO3S1060MYVUhcZZPqxHnd6yYownjFdRYfaTBpszuiE8JFWhoefeOVLwTAPtP/476Xmww2j0u0eKeG2/Y9jD4+fN0N/EoLSKHKiPCA1QI7ez6KjkekkmpRz++48yJeL5N8SupZW6TiB7RIt8Xf02n2bdnMukfbwjPhjjwOBu9Rky69UTr6E965HshjwVNZ6VBhSwkJ4ukMDJjX9JvzwYyHMyNT8mFUXihkeGsbnMwYmEjfHL2PTuMuMU8rdKBUyE9SsgAFEPXwQc80QIOHkV7aXJa8KPdExMcdLRiKV4LzjkIDcCW4Yz9Fabxb40VPjmVqB82/wcpvxWED22WWCHRLY9AQW9rzYD/274pPNNqFWpiyZmasfUVoHxWtR2EFzKvD/Dz/b3g3aP+ErDBW16BMrdJ51PkKSscQpuT5TPaW+POCUdO+529AW/Eg75HtESWSa3615twzzqt1JHze53quFob1LdJAZYn4MEJGJVmGI543Ke96RirV2Lg9n6gaIahX3KFAdijDTEuMYiZ3PtO267+OzRc1UsAuX7YjngVRZqbegiMm+2R8nH/WeaYrKTh9DIk/M3xJMbFr0wIchqnMIiDwpPWKqdH9UY6qdADiWS2LJsyeU4FHP18SQqYHGIQAfwWsYxrNnSawx2CnRd2cBHbwWBj1/mKpnry1wPcRQ15ZV9RXAOf937GrQcOrUgWGD/wElMtl3ZcSL2DSdxGeInP4zh3rvIZ6edcQVUs8MCEcvYtQrQYKUTC9eJ1QjalkUXNB7S718NVi34ZgDIkjbviVLBf9jvxnqRkXHeHQiFSni5YfjM+befZY07z3JPBSgwsWsjsW1KkVGfJ6XvBlMDbb+bftWfyCglszkruUJZu7xWZx2yUKwM3iCV+ZGLrzXmJEZhYrrto0/s/ErxnDKqk9S/fgeQQ824kt/Qe/NtUOvr5yxyOP7epJxgbUrUttg3HGAYa+rTAt758RzfTTpu7nMqvGjOCVadPLUsZ/CUyo0JzwpROLNSZiIDLKExpUXVaTolQOOGRDUL2fjzq37xe9jUS1Rbqtwf8/C/tHqh0EhQ4GNSDiIob5jAqHccMhjANsIefyYHGKn7KgBxsJJuOPvoklep7kppF8HHAnR8WYmcmWC5pWT7+tjB+My5xbYsk6wBTvsX9YqnvK3WRdWYkX3tWNcl6ISwuz7DFKm+xFvxy4f9zes9N9GACFhJA56g1o6m4YkBJMYUl1S0HcnK3Nns4C5/0+3IJnSm1TGBcZXbLj+nqtxkXxVBKguhZzwxJ5GbGrpgBTM3Hcrl0sZnLPOIEm24HJ5Ch8L6QSWMOWNZsOXef7GvjP7AHO1tUohiPZy8l+ys9/Jjh3z6AX2khZNleEIrqmhleunWA9QFlHBnIPp67SRT57NB9ll+RbmXoxYJYDioTPtqNlM6v0tAXi2ErHKoCl9Ob0I6qgTXrgHllzXHo2vb2uRDs/ku5jcwkTTC/7T+ID3Sx5WxDF/dmejqLk2JDeaFJVERD64w7mDdHUJDLP6wXIurFyKDCpA3xX3JTA3eNo3iW0cToPIfH0Mrh0E9e9lqq7MbKo/a1sxdsqxLmA6HAmAJX/6lL3XiZpRbe+mc2xr9ckZbn6AAYSXPOY6vvGp04syICrbvF1fmphaM8xKKJ11AJktxeEQMDQbUgYlXIgTC4yB/bub1PYk71jKic4d9pQW/BucueVxZAwCt95c3NXUZHY4rNpaP+OiivdL9QURq5pE873q/MXLizzLhRbO59e7GBYroiy8TU1UsPVa6XAmiKORiexsuyAMYBjHUqRQkIs322A7CKPQWc/0FQE462C9pO3dO+OF/Fqq8t+M15Oyknav0z94o/V5a9IAyWyrCLRBK+RushN+dLArxed1xFh/GGbeYepgxpltOXNGaNrWXcfgZ0BRGc0zftgxk5MtCtW6Cydt0zl4qMfWM3wQ215jPE4BApCymz+XdZI/V/lnm5PWl/1XbauAGbHMDtUGyOf0v2lQpMdFEDkJ+DFnvoaq9NxM2qygnDTxRVgkxwkz/vdo1ygP1ODfq/VSaNoMbEvz9Pdj1XGPSzdguY3v5acBsrabT058EQMJuVZzHz3BkO4cqskoxDBKr3cVXM67hmKu4HyjbL647NmwhzpACOW1rvJpfsIc06TKmA/taaK/QCIuXJewZazMZ0ovsxA6e8dFowvaF6f+5C185F4KIcF0jWrf1o9tpmbCVFgdNAdrREezL5a/mdECQMEj7qb2r/xRZfKXhTp+hXUM6mvqSDL27+mAL4PRPhwOOaCmEQOOpQNtJYlN+OBkdltHhB4m1T9KDZET3j4IkvKqp0knDN4OZIXAoBlY1htt4yiHATruPFpn8rZcxRhWswh5UfdIrCYkZ3aicxszjh6zv/dzBGHhiUu8zC3f5cYSL5hKD1CBv+/8FAvOgNAQ8yi6oowFT1KbjlWlRg/hVZz9xMPrr+8+Ilk8faiphUBe7/gVlqSN4Vd2IHlMTpyS8XiIFb7CYQNrsziLMpi70N6ykXwUIP2PGboq2l54SRIc4BwwJwEhX5Z6EpZ0rOKxTeblweJnzuU/XsGox1nTuW+n7KKuh5YyC13nGjQILNoR2z6i/8bV7dKlupqTL94xSVlAfpTa6bE3Bhzbg+CPNMgDygkZ2PepoYuoG02VracWJRv9lmz0QHR3myGiXTw91MzyRiaN37NqlBOb06jvqUdJt5HtOvUgVicKNnICME/ZIPsSz32SlKECzwNAhX4ydnLq8JZuijteHx3GcGWlUq4q05p00w8ny5pqBN5L1HieHZORmS3cKPI/MRNaiH2OPYYR2US8DGIAKXF+fztpgdJRxMpBmgAFWxzCynMn9V6PmWXdLNAVZM6UgQqTBXTVMPmASCvqdRaQG0nLfxKDc4IXSm7BOrxTcCnvzOl4WjjM5a9446y7L4qLd0z+YlwqKB7xUbJaOdJZaSTA9+rql0Q6DomRrmdPgDg5s5/qZ3x9LfuzlLZXP7RWRCENOd0fvwSCTrRJ0plHVfFfbrKJDWZNtwdVCsVPv0RXnPAK9UPQX8sQC6ukW7mtMYQ4opzznP4u494ttt0hYYXiDOQaK2GtKnj+53p1XdoLxpK+tO50kSK/n7QeTFsa9b72hcpIbIYvDXy+QRYD2X3K+R9N4sFgp67vWiRlCG4b6MRTG0WsKU/hxIp4pZoQxAvn41srEsEzy1GXkUemI+JdDBVW2KyF/glWhJaElhJzVRPSpO+Jk3H6t/L7D1TQgbat3+oUkenjN+VGZ4iAnrxy/qYGOmKrppiNHdO03cHAtK56krYl7w27VbJYzVD5ngwsQQhgybnESL8bEvIyAq7uK8qIadEkU/94t6mn8ycVyXlOT0pTpXnXCw47J3DEjEjw3kqhSh+XBC7tMrea29nfnIX3hyfzJrlb31mByV/4yjegLmW3wtyyNvLFBL6flOH60cOdZ0F2THnD2zj3+GpDTbZpRFxvRr/ohRqB+qVYOwknU/dPjGG9Mu0mVSo1AUzJudkR5xBYNLK2mfGGso3Tz1uwD74+YneJ/QIAZZ7r3rWI2BoAFkGGrsG9vTLFnZImT2yacvT1MrBSHQ6vZjaU2k4Xe6SQefwcfeUsHHk2wdQvlCnPed89ES3cgg+hTWIYQHtHAuUQPnNeqlB+hCVHEPD/zWYl0w1KVk6ja8yR7BjKA1aO4NnWhqC/Kk12vgp1Jx19+/QBOlH5vdqr2fsTXppYG372lTvLb6+z6wkSBfKs6kYNWXTljd4JC/wP2WoGsh5DEJ8/8pDe8YX5aR7O638A3r/HlVooNozTGyDEbnTl7fVjwJ5ya1eBli9mz18BZ+pjPdIwVGo91aWyZxQG2248dRwn/FF/3tzWpfT8vRj3J/Di6wqjI2cWXQ5DrWZId8tVNnajPz/Tl4qh+5jiv6mpQHtsorGY6g8eTNZhy65sItgJV1ZeVOhxHEN2fAfyVk0YcbNRBATSsoAZdfK3zWYxTfYK540LdI9FpRlat6saXTCAIzNwYG3Nh9Sf4gMv7WYQNI0MrUXiy30misyspJSBk1305v2q2WnXB0UntYupBrtCMpmvMViBcjKDkeLkmXeeeb5fGwx7H12XnfZ0DGS/1LlD3v4EfR0mDrABeUyBMC2UYiCBbyDB8ymB/uJSmDefAppWocJ6uByLD1yPCdYGyusjAVHjOwiKjgbyl4GF0GvOdHv2ID2dQlFWUm8uQg+W5JD2N7/iwTrfFy06DBaZ8sZGhXT/Fz3dj3o2cEYCXUrFM3b46LNx4a0HT7THfKSWxtGni7U+IBzsR2oprxRZHtBFluPTJ4UEo3qIn8NRnS0mDyi8RuDZcyz/Cf7WvYYm/w1Wrf1yuUjvUOJbYppbe6zjLaG4mIJoEx27a9AhPx8dJqczsUtTG3q7//8/bDnowSqthcKbnfZMS3HFvVZ9MYSIiCTolakzBXqV58M9y4iO5N7od8xiuzPZV3DToCeMdztnBSCG0kFukYWXKysGD6Yk4A7c7lqDBiPIq1qjeNZeXFYoKQL8vvEoRxbayGf2PmeXIWswKmXYtoNPdIbk9YtUPaqx7jXQ1/ptI6jXqU6fIuJpjd/LwBMA74HhjrsxzC/gVURyxZJKN7WwRJAWD6c9cZ2PwrA8PtOfZuRW49tLaGErKCLdMfIm4CJeutxRwxX5Ca8RmvlfJb752RGs17l4FSR4EBGu3lqPWs5pRtWLyWOPyX1nnADNlYzUw45Fchk5KM8agmjPf8Vbj+udF9SwJm/e07AULSse6StPUOk8H7enQdkYcIdLw78vtWCMA9nmro2ULZuUwE5eKSUNs+rkFdU+Dqq4ep1hu7UugSI6RQxkflC+KuebYEUL5Jci3tnGsqFuOYzlSrMBKhKccjBz7o4RJYbsNmsVfn03W4tiZ49y5FzReDqSv/ROEyaTNc7Ahr+C0gGofN7sj6cTkzrVVx0UltXdnzIbIdbTOEnBsJxgqbJQ2q1RMf6MvEyYJuB6CaYZeuWPBrxbvajxiwH3Aj7FYrUCzmGsq5lesdAZ57+76G90ut8V/GxS0snqtHe+Shn/80Fj1U0aD2eb+PWUKLtWLHow5HqzLX3JkKw9rZ4MIZDA8NVF8jXjsWQolyuS6SXhPiC0r1fvOpyKA/ZZ3CJgBaQjL0FIHqX7VLEdLRSRuQ/RWLvf65k4UzgC/xliL6TCwu0Wu95+q1Tt75w3tK1iKPJ8cIXvO3Tx7QgAJ05QkGPFuctIoMvWQuw5HrIChjffdcegMF8Ti53qVDcbl4GoTqn/iurtTnvjdyu1OJfW5auc/wIgY7c8PQHssHQ1zNFs7A/3jrcp3L3HPcO0C0BQUHLxS6ZtVuIbH5ubanBn8YfIqSU9qa9/Kr3m/o0jEwOXJ5d5YZIGmC83V/yz+FL+cFiRPtYActmetO+a2hB2Jp6oh9eJUOTNqs2LRiFx6UyZVMEASPNsUl54pRYSEtTr5LaywTFcsPU4luhdc73I/PBirJzZt2xz0WCjIEfDqpaomUmicHz9psUYtLumULchsWfjsN+Fd1x7MUo7gN6syDdrSfXRVMxw1ptIHu5DsdVTBTc/66IrvyG00IAZT58/5FgjwIoh3Ao0QrLZzwl/pEwdpsnkA+8oXUAegsr9jtCvzK4ThUbSxA4D0bUEqFd5lalO8ZnrH7aAVlOd22LaTtlt9T4WZbyFm4d5zGGpVSb63D7Uo68fBQRHQFy0rXe8OiJL3VIhMET+105TsnTzTpT3E6Dk4HkY8FjL17Owd5U9Vt6P84jM0ariof/fcj29/sTRcw83W/UBVRKpGP5Rl3LSM7TYTz8NxuAWK6ch/IddL93oty8RVSqSJzPQH6RiyUhCs5ueYA7g3SRyAPS5yCLNx/5Bj8hv7tgNmExlMXVNf949RXPsMcPTst7R1Ki8k7MC9qLG1ql2EstaHqkEFgor/W+MP1YmEqxF0jm8Ssfrhq+16T9yJtIGLtzXvTgNt4x9HymFgMVqphC1lt1YtLyrv3ZMXWyJsdtj/UbdnaLsnwyW3QvK9X53zwYue2DTvaAfTyZy7GOdQGaFFL2VIUGJiZEEmwXeFL1q+z4ZdIir/qxTFrSyCIt8u80/JsauRQGZwpNh+SIhncVFULXJ1z+3PxXM6zjaOwYKiOMkIjmDEMUuOaKS8LsaAmSxmbjfLageUgpdNznLoFRuZFIyeK0jAT2zDv8voVOhrpXY1oRUHNvrPffxF+PKUw6f2k6Avrcvl0YofAJ1OoXt8baYIEQDKh85ghtiP4h3DvP8+GFIINFqxHayUaRGZXRr3Jd11tC0riCBa1exx9QfigCmr9wPBRx/7h8R25y8EQsvCTpqLwxISfrefilL8ke5EJ3stroaB8DP3msX+QNkbTy0cEyPrWHyGIf/oOXKEcNtXkFZ42fRe7+fePkwQmQREO/p2v9fKA7DsMuvZMnblosTEc9kKGfGGDofkLpxVoX1R4vwPzOOosfn1riOv8X1AUZIeXuyOt9tNwXdMbqjV3qiHNSdLdV37BaZJFfASR7uvedRaCXh2GXEi18/BmD7gg66l3Yp5EG6YAoaku52lmBvOL02MTt7e62lc70QzmVKNXgCKjgXnuu7nM5mXgxp67s+tKV/WO0IFHuuDezyM5n4mCI2Bms920p2QIDCI5DhaCc0uZZ48pQd9ftxFS+aKRjLcQ8qBGIoHcWzgi4hx3QM/juwPNU9BfTYGHB3C8YvfCntWtk3JyLZZRCqRemsB0EZV844/1wh1NJD9tiwFNdDnyWUvazt5vNFgbfYT1WWBCphYcEaf3kK4G5eN0c4WJHTgpuTTY/6gG8mLG5FjBK1VJEU7Q+6AK21G7RYQAlvPyQdgXbd61PhY5zUHVaOcJeBSSmqvNM/zNLpJvLt/epORCl2cZ2ocAOcStlPv/GUxBhguzClPbBouciqF/KyJ5oD59To/9byVJbiZbrN7snLHdMyES7jfWrwqlO+sJGACaxWFSkO5EV4VlEyGmkPih0VtwAyANm2Q/UELeIt13QSZNEJqUoVhZNSIaRQ/lJs1HTlYXObAg4g89xlaJI6b362YcRPlt7+rocNdyE8cDlBQa9/K1Wtu0i25C/8/oGIkBl6fyeW0zJcj69UrXMPM46z+dY60c8Ap9HegPxADhh26+3NgAPqhdqmjHgajfiALEcvX2AOeyNutun2/l8VMMnElX92siiwi/i+Jl2DjyFqyDTJJwHxtqNEgikW/O3i7SOkE5wJGJPz62bG1UFCvdAjLeovR6WmvUz5P/s3lDlUTZgO5/VXnuU1QU8o5sU7nWNEXrwOhARSNgoYSU8YdyFSJnYLTiLGKqByAFtEUobboxYlu8mtTqXGrtII0gyYbWzbZrh0DizFl0UZ7EoYmnW+mcl4Rp1F/DLrszcvgB0/nh7G8DOWYSCs/nMzXSIIG46x1/sRszTT6HirW645YwsCpIiE+mQCYzvEBVmxPb+7ABanIVPMHyYQjVLk1t4N7Nx+GeQJrEbLje3uLgmv+XTGURE8c257NzBimmCdMWPpPso/Xyyq1XLMewY1rRWHxfvTLaIg5gtzV99X7erELbbjr70JbPqMxpIkq00huXU3xcaR9jhTwMQkBBEkPaumYHjgJHnKZ/yyw+Oi9C6PfouxnrwPV2MOf/mGU7OPR4GeU+u8nwSbQUV0KZgi6w15GGmyj+py8DhAGB8H/hv7+vqtAjnUgbkoqi1JMAGhdmmJalwsAXKVf8scQV9+sAN9rp3Sdv9m3b6fcsczMdyVYMO0SS1vinomTE+v741+1ytnn14cDy05sBbWIMoNBQsUMfoxPrHad1lRLxmRb3XnDf+E3T5IvXr1VGKeJ/ru5W/SfFaHN35KWrZfQGGvVqpzfF9JF/8URKELwkWnnqo26aKReoSLdVEcnqFuiQbdw30cJm/AaQlzlMrqZcwPSEWpXukb9AD3LqrXFizzggkafZ60HgD0AIstlztEpk6H4K6C9VPJflVTikxJoyVgSvSODpiNtleP6GhoRrtT1qp7wdk8d86ljpEsaufZw0Bz95fDyh2qlbwJhhgVCqcyGaiHR2kSHVx8PZwH1cm1IGX79tL7cqC/2yfHNUsBNL+yzwtYcz3N6iZJEsN2NOC0e459ZHSJBLxPpJyPlzSuLH//FKbd9dE+nLJUUysbOnl2BNntHMQ9HQ2D/4x6hpi6uuqyvHG6MslYCivKMa6FKACDeoSOlcoyaPLX2w4hfl4SZiZzZUGFOkJjWm8KfNSUGABuLyi4WbAskcOFaPIarOo0i8SRUu0l06hfxa9ZRNscGkmvRxu+X+oKuuiPwKD+/7a5B7RFGLlDf7ySOisJ7c3Rr4Dt1J/NQguDobyL0wZ17eL6oHOHONNXnyuEACN6S2Umqlc/inajUMUWlpPJi0H8GMoiiCsQWeQakG2WiaWVft5YI2WsnmtruzUyTlnluoNPusXbk1HQWUGOSxgFCKdIFTBPRKUrFOYDf9SEW/1a7PJhHag8nGeSX1TShkLBXF2RZ6SOcwY95kOVABm0jxfUHOLqxzjYFmz5Oeg1xtJtLoYGAfZMKDesMEKfIeBPuUXTogka1athNSefIsmrfcguH5veYvkjHOJG/5Pmrl6E+u4gUic2XO+ysFzUQAxlt+FXovPQGVvQRrsPBHg+I2A7neLa/iV4BaHAVCaX3RmybEXR7/0R/fhSUmqhgDp7YUwYRuqewyoKy3TC1mOJiTpDoEok3FgiEB+sAH29spNLS/qeyuw2bqRIbBLuElXvQbNIBWzJ0E71tFujDrSgrFvFDcZJE1xfrGlAL7WjWCVmGg4D4bQyPzqCgf/MeS3IY1vp9QoZDixJph5MMJReytETvZJV0mOJWv1DgOAHxr/0Jqdb9AevVucG0PiqZicK+ksp48zl8ET1BLaYWTPkXnRktc5aQPMbDWQMey7Iuyw/skftgPxULzkaiy9BH2j2JqrxTvZYT5BbI0uzYssI1gqhcenbTGYqhWU3aPA1RyNMWn79DkDeCcWtF/PWO8nGBMKqvU2wLZzZAOIjp/dkJ9gqWRyZL1HAP76RjDBxhbVThWr/RHCjJOgylvPs3D9SRUUBjgKVqTS3nn5N2dAYIeLqdxcZVzR4Bqdm4Ta+nqUUOpgd2wHY1YC/RtQKum4XXqzEdbvSKIkrJ+Veh6NjPNLvWM3lvctR9v2mLCVq8My7bDv64B6rAr8YmkUGq6r9K+PPsErKRZp2B4yp4DdRxSbpYXdtddJZWExmMu8vnLDS0MPD7aWdalxoJvAx1vCGkOsw8e0o/dPguMydm75jBa179poTmDv3NGZ3lDw+W+PUtZ1mzw4yNNuqlCkxZu0GWLwa4/NPezwrLouDHYkGbH1YJuSCajikJkxNUHgBALUuzACitXW4y1fbstgnOMmorAcUZpc8ymtQipYeZ4KzlG2GhZRRDWffhATsd4PA9k/28vXI6y7eJImC0AWmc1B5VJB5HRlhCa9nalSx8sa6jP4i0kn+hRHYCYxVakUNEKRPeETROlmvtK96NszGlyJihXnvr2qndwXS0aNWll4Hw6fx4tE+w069FPGFbR2lkQMHNZA1PChzHY1+yXyJzPgayurKKER11Cf+SKktLJZoOt456Vli9b0rcKa98+8YhmsBSMz3+wr46+6EQSprPzh9V/Wri8FNFJ7BgNJmlye4+mpenQJDiGL7lPAeoSp2N7+WeC6+RfN4zKiASdHYdW9rXHCEwzfMBzXWE0J0pDThXrJupKKLN0gl+kEU4lDv5bZXEKqr4lpH3e9J3qvKIrTYsHC8GoRR5VHr/trfWVZpfiniPJTRcZ2B+GAdfolZmTJJn31q1rlktOFPGo5TsHhblBpXVKnZk64OVJFK+qUHoXgAcXjg/Wmm0pcr5zh37u97qJ0k3MfXH0OI+ZGNo/TueThT/0yPGPi0P9pF9Y29HI8da1RWzc20degphBDaH24TRwPex8IQK+zIraRs4aRwGeeLZMpCd4Tx8Xa9Z+WNk88ru1elzqjban4GqsjDW4PvUa7k6q2uZ7u9ghmKzBvxjnTAcpSiMr/xl6LZLo0eFOkQXW1WhfWRLYg1Zvazb6P7MFdMr6MOYdeNitXmPD6yhCDsj4LxFlTdSOiYDKmwYHlk0l7LfvBXMNwXmWbZDDNoeLhXn9Yt2vbyzOZyfpt3lWAC/UdSwA3GRn1WnRVybsDTROjl5/LuqQVBa6toSv/ldFfmFUxZtvsxapZsYORAvnvmasL/wQQsGSI1NYLBe9i8QFjW+aonmOwR0LmS6RrL2Sm5Q2P5ewHLxdd/YCjnbWO1CaMpQ1UfQjAhAopWuTsBxk8dazBgdn9+QwVBCM7Esfv9zKYSXDcqleLdAwOjKVROLi+sLMhV6sS9cN7GdZ8rbIGC4rT4aZMU6Kr0bc93BdkwdTsziQoC97I0wHruTp0EzifXsP3thLuOptCYuHrOJrDXoDBag93T1oJoKQ+jpiXj0DDmvnu4X0MSbgDcenqkndRRlH1ev0x9/XhfZGxmWM5dVUO0GKh2o2J+aNRpDvwppKnLxiJA+2eT6B6c2bGE/ckHn4NNjsXx0fbCM42a6pW2mk5UFUhOVWtFbQuk/mHmedc+gkkUmLe/wqOypUAEt+bAwboTlvlM8+1XwnUQvsGjOEq+u2mLB4C4WgJ6MaYFFUSFXytRzf4qVyRNkTkuEickPJPbmL/wezc1eADkju3Mm2MbyuLLBqq9QKag+Jawt3Fu08/KkNuMTYQlRQPXJcMDJrm4N9KyNc6tj1eJntWjJOJ1jfV+1yuGfuPy+hOQaNTx8Z2SaAoxvdRyhGmt1QfUBKizNCO6I9o6Bmen0cuMsGfdAYVImF9DwkuCgcCRoUOPOkWpgoto5CittPq+l+iYobqpCbhTStIfjTqmc48dA772OC0QyoBWirnuFl+5qRbcGoOIzKqt4AQtktwAductz2lUrzGFdr3j3ChltpQr9G8aA5zL7LgBbscOS/eGJgcQrouVGFm/4X/lOqFKImSrOB/0Yl6Bztg20iWgg8oq2+oDAb6xv//BXhFmHNTR996ra74uPTzAwR546haop323SU7Gsb6Myxb4S5WrREOy6ztuaxk6GryeSEDRsM4cMEfcQWXVcfKPHj8xks4pPJxp0fYLuGw1Y8Jy4qhRLKmxvPpOzq6/D4323CdDFOkr1KH4WII2SgljLV93q6o3M1SOAMnzaGVZLF+pulcVdsAjw49tnnMaxFruCyN4vpRPQ6e1GhUiJwazPkCtwHqEiBcTV2MEEkLujDJRohV1L3zwh1ICcoq7r0DDmkdLyEZfDdG3R+9tKQVhk/Za6VqE0LMst70rfeYZUjVHYywSfXcI9VKL/WcUaOzikVnKEfsgMYbUuHtqZyXTr408Nmwv6NQ4+metgpb2h6HZsYsk4pbE3jp/V5FVSB3Sz909hbOe17sCYXHjdQ1W/3vE09jb/NVlOczBb7DAgs0GdE4rTgqE0V/LExsTk4ldVTlbjnUP6QX8LVKyLwzn0Jt30NAkxqUiVskLk2b9vDNNVacKK35c1ckC4unhy6yt8bnK/2EQuHK1hlvmiRSR0mUzBn2bKT1KgEiNx5TXAtLQXWZZnVqg4ffQH/b7ic024sgezy//rw5UWWsK2Cv2OFnp4x8qYFMwEpZQKejaVtXBG64prjqYEmAwfp6Ymx8MQ9Jm+JghOmn4K+1FW0SzopfABBSQGH+8es4e4GM74cDVwj39lUAe87oRyUBjkMOliBa+WzBBr47cprSo8x8HrmhRP09e/aGQOflNzK5yaALi+WSstS5+ZVfPJyuj01TaQSi9LiotrSkPzQV2c7w8BqbbPm8U02IdlmJm2GBOQ8r7HJjZOURMHac8nmSsbMnMvuB4xqCCqpYlz7hzUVmQdLxq/2DObOSFNUQVQvaRAcmmfnVNkjj/7FNic8Q21raR88Grs7bejagmt4UNiTmlwAyw7xuzI29KObA/zf39Ib1u0BPc2POPuik1+WhJdeDqKwK2NEZnIbTre7IiGCYc0x3/M/Qewp+a988O3pzzSBOKDLSggsdAkxoGtgRDVV/FJdZRDvQYaL89DI4fYN3LY4FslmiCBY1lH6KobIxGl+OOgjGQZq0URXH4Fok7FkymUK3UosU3ZI1SZcrjSRRlYHtftC3c3y4bPAnOtmv4lDnG+5fuSOj7oyFTd8IWnk159L/9D9MSpQOVv/JjsMIwU4uuzVWpM1hWumek9SB7b74vR7UIV+4Q07OAJSWRXwOxnpQcYrWAuDNZLFQOl3oMD6dgDjf4DQZNzoQI93XDUv8bMBYXZMBuXjfrS8bQPAKBLlKV3/WpeIjdfjFT1NMnQHVwtPaaDxa4FPzxI574KR65lDJTY72ObuhnHNsLIuHWfuPMm16BV0wlv8xqXdkYIcbj9raHNpyQtybALTb4YFGrXpbh6YPZEbpXBiLPyRyQFeV1jSJCyNVtpq93utEisqSdiTzTrMCrAyuqAUnAvpKf7REUKi1YtFMLb5xsOuHwRdHi9LGNrtYtn82pDQi8pn4yLAynJtYZ3mSTAGgPnynH+5w1hFApWPMY4Sf86wENAaF2hVR7Px/gyuPatYdO2mfWtFchiEIrpbgAFQEE8anthg88tyH0C/JpLh+doTAZrQmhZfXcazXDdpsHP5EfVOkz/qF5x98/jcBVuwJn0gr43zpFaa+vqFizsGRpsVqhEpabGu+fHdBsGv+vevCvD28943ZfM+2BghH73sNMPac43MeF6UpXhQQwkVkhNa9T9xW120BGqNpVhMnSEfCQlNh6m31RqkrlJCeu18u9m+ySykcKr6LDsjBAjR7HE/LYKoXohE4oCv7lcwMcUhJEXaFBNPX0mEJJ3BFpOiEFNfFkIMVzNJXD6rarp8eD693BgjshFe7bK93S5x0n6pT7AhLg+ZNO0LgoyydoBioxB4qa6iqIuaunOauKDM9r3PrFBxENMT9ft4VJPuI338R5mRS8jYGPxzUJub7gX3DRCchseMWM1rFmKpuZ1oMwU9HVhHWpkhzzK7N13kdBOMFvBacKZ51o5lj2S6cngGrIA3Avr4cTOnImPUhb3l3ngU9FkAsDO4/K0qTYt4+8GE+/KAPtI6YCosVEr95rP9S5rWnxYWlt6oX8emP279fda+r6F4hTriZ8HS51IiCbnfjeTfmEdVbrl5xNbX9Omeap9ysP/a+8+aueye+Ix8BKD7wxhFKJPOBEngRBjc5jVJVT8AL770DQc4fQ9b1Do81Bl2xfL/PCPhd3Fq/cErK9NyUQSBycofCBP79wSjgowybTkBo+rDi6XY8JmXXNtRj7RXGYWGpoRSO5UgCZrl2c08Jt+m8i6qXSTR23AHBSCpxjAxE/9qUSHcwGtrHsR0W85iTcP3+Y27IUT/6QIO/5rwDY51a4sg/CfJ4e4VuahlKuhqPxJDt/0j0C7veLCRwgXoWcaH//iaIuQn8ukjMTMVqy63PEJ/WCu77Uzazkj2LK1O4UUBqkR3/4fbwn/RusMxZLf2X8PNwHBCPEzhr/JS300yM/ksbfoEgN9lDMA8ylfqUr2xRO/K+IkMNf0hmOzp1Q/QD2MJIZa+TYAO2S7MnO12i9JzXG8GQq+4e6sKV11Ka5CQoxi4C3QszrHoSUIRr6GOABIkA==");

// return function a(a,b){return new Promise(function(E,F){'use strict';var g=null,e=null,c=65280,d=16711935,h=16711680,i=65280,j=255,l=3145728,m=1792,n=6;var f=Math;var k=function a(d){var a=(d&16711680)>>16;var b=(d&65280)>>8;var c=d&255;return((0.299*a+0.587*b+0.114*c|0)<<16)+((-0.169*a-0.331*b+0.5*c+128|0)<<8)+(0.5*a-0.419*b-0.081*c+128|0);};var o=function a(c,d){var a=k(c);var b=k(d);return f.abs((a&h)-(b&h))>l||f.abs((a&i)-(b&i))>m||f.abs((a&j)-(b&j))>n;};var p=function a(b,a,f){if(a===f){e[b]=a;return;}e[b]=((a&c)*3+(f&c)>>2&c)+((a&d)*3+(f&d)>>2&d),e[b]|=a&4278190080;};var q=function a(b,a,f,g){e[b]=(((a&c)<<1)+(f&c)+(g&c)>>2&c)+(((a&d)<<1)+(f&d)+(g&d)>>2&d),e[b]|=a&4278190080;};var r=function a(b,a,f){if(a===f){e[b]=a;return;}e[b]=((a&c)*7+(f&c)>>3&c)+((a&d)*7+(f&d)>>3&d),e[b]|=a&4278190080;};var w=function a(b,a,f,g){e[b]=(((a&c)<<1)+(f&c)*7+(g&c)*7>>4&c)+(((a&d)<<1)+(f&d)*7+(g&d)*7>>4&d),e[b]|=a&4278190080;};var s=function a(b,a,f){if(a===f){e[b]=a;return;}e[b]=((a&c)+(f&c)>>1&c)+((a&d)+(f&d)>>1&d),e[b]|=a&4278190080;};var t=function a(b,a,f,g){e[b]=((a&c)*5+((f&c)<<1)+(g&c)>>3&c)+((a&d)*5+((f&d)<<1)+(g&d)>>3&d),e[b]|=a&4278190080;};var u=function a(b,a,f,g){e[b]=((a&c)*6+(f&c)+(g&c)>>3&c)+((a&d)*6+(f&d)+(g&d)>>3&d),e[b]|=a&4278190080;};var x=function a(b,a,f){if(a===f){e[b]=a;return;}e[b]=((a&c)*5+(f&c)*3>>3&c)+((a&d)*5+(f&d)*3>>3&d),e[b]|=a&4278190080;};var y=function a(b,a,f,g){e[b]=(((a&c)<<1)+(f&c)*3+(g&c)*3>>3&c)+(((a&d)<<1)+(f&d)*3+(g&d)*3>>3&d),e[b]|=a&4278190080;};var v=function a(a,c){var b=c.charAt(0).toUpperCase()+c.substr(1);return a[c]||a['ms'+b]||a['moz'+b]||a['webkit'+b]||a['o'+b];};var z=function a(d,g,h,i,j){var b=document.createElement('canvas');var a=b.getContext('2d');var c=v(a,'backingStorePixelRatio')||1;a.getImageDataHD=v(a,'getImageDataHD');var e=d.width/c,f=d.height/c;return b.width=Math.ceil(e),b.height=Math.ceil(f),a.drawImage(d,0,0,e,f),c===1?a.getImageData(g,h,i,j):a.getImageDataHD(g,h,i,j);};var A=function a(a,b){if([2,3,4].indexOf(b)===-1)return a;var h,s,f,d;if(a instanceof ImageData){d=a.data;try{f=new OffscreenCanvas(a.width*b,a.height*b);}catch(e){scaled=document.createElement('canvas');scaled.width=img.width*scale;scaled.height=img.height*scale;}}else if(a instanceof HTMLCanvasElement||a instanceof OffscreenCanvas)h=a,s=h.getContext('2d'),f=h,d=s.getImageData(0,0,h.width,h.height).data;else{d=z(a,0,0,a.width,a.height).data;try{f=new OffscreenCanvas(a.width*b,a.height*b);}catch(e){scaled=document.createElement('canvas');scaled.width=img.width*scale;scaled.height=img.height*scale;}}var l=a.width*a.height;var p=g=new Array(l);var m=e=new Array(l*b*b);var c;for(var i=0;i<l;i++)p[i]=(d[(c=i<<2)+3]<<24)+(d[c+2]<<16)+(d[c+1]<<8)+d[c];b===2?B(a.width,a.height):b===3?C(a.width,a.height):b===4&&D(a.width,a.height);var q=f.getContext('2d');var n=q.getImageData(0,0,f.width,f.height);var j=n.data;var o,r,t=m.length;for(var k=0;k<t;k++)r=((o=m[k])&4278190080)>>24,j[(c=k<<2)+3]=r<0?r+256:0,j[c+2]=(o&16711680)>>16,j[c+1]=(o&65280)>>8,j[c]=o&255;return g=p=null,e=m=null,q.putImageData(n,0,0),n;};var B=function a(D,R){var E,F,C,G,H,a=[],c=D<<1,b=0,A=0;var s=o,I=f,L=k,d=p,r=q,x=t,w=u,z=y,B=g,v=e,M=h,N=i,O=j,S=l,T=m,U=n,J,K;for(F=0;F<R;F++){for(G=F>0?-D:0,H=F<R-1?D:0,E=0;E<D;E++){a[2]=B[A+G],a[5]=B[A],a[8]=B[A+H],E>0?(a[1]=B[A+G-1],a[4]=B[A-1],a[7]=B[A+H-1]):(a[1]=a[2],a[4]=a[5],a[7]=a[8]),E<D-1?(a[3]=B[A+G+1],a[6]=B[A+1],a[9]=B[A+H+1]):(a[3]=a[2],a[6]=a[5],a[9]=a[8]);var P=0;var Q=1;for(J=L(a[5]),C=1;C<10;C++){if(C===5)continue;a[C]!==a[5]&&(K=L(a[C]),(I.abs((J&M)-(K&M))>S||I.abs((J&N)-(K&N))>T||I.abs((J&O)-(K&O))>U)&&(P|=Q)),Q<<=1;}switch(P){case 0:case 1:case 4:case 32:case 128:case 5:case 132:case 160:case 33:case 129:case 36:case 133:case 164:case 161:case 37:case 165:{r(b,a[5],a[4],a[2]),r(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[6],a[8]);break;}case 2:case 34:case 130:case 162:{r(b,a[5],a[1],a[4]),r(b+1,a[5],a[3],a[6]),r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[6],a[8]);break;}case 16:case 17:case 48:case 49:{r(b,a[5],a[4],a[2]),r(b+1,a[5],a[3],a[2]),r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[9],a[8]);break;}case 64:case 65:case 68:case 69:{r(b,a[5],a[4],a[2]),r(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[7],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 8:case 12:case 136:case 140:{r(b,a[5],a[1],a[2]),r(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[7],a[8]),r(b+c+1,a[5],a[6],a[8]);break;}case 3:case 35:case 131:case 163:{d(b,a[5],a[4]),r(b+1,a[5],a[3],a[6]),r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[6],a[8]);break;}case 6:case 38:case 134:case 166:{r(b,a[5],a[1],a[4]),d(b+1,a[5],a[6]),r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[6],a[8]);break;}case 20:case 21:case 52:case 53:{r(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[9],a[8]);break;}case 144:case 145:case 176:case 177:{r(b,a[5],a[4],a[2]),r(b+1,a[5],a[3],a[2]),r(b+c,a[5],a[8],a[4]),d(b+c+1,a[5],a[8]);break;}case 192:case 193:case 196:case 197:{r(b,a[5],a[4],a[2]),r(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[7],a[4]),d(b+c+1,a[5],a[6]);break;}case 96:case 97:case 100:case 101:{r(b,a[5],a[4],a[2]),r(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 40:case 44:case 168:case 172:{r(b,a[5],a[1],a[2]),r(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[8]),r(b+c+1,a[5],a[6],a[8]);break;}case 9:case 13:case 137:case 141:{d(b,a[5],a[2]),r(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[7],a[8]),r(b+c+1,a[5],a[6],a[8]);break;}case 18:case 50:{r(b,a[5],a[1],a[4]),s(a[2],a[6])?d(b+1,a[5],a[3]):r(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[9],a[8]);break;}case 80:case 81:{r(b,a[5],a[4],a[2]),r(b+1,a[5],a[3],a[2]),r(b+c,a[5],a[7],a[4]),s(a[6],a[8])?d(b+c+1,a[5],a[9]):r(b+c+1,a[5],a[6],a[8]);break;}case 72:case 76:{r(b,a[5],a[1],a[2]),r(b+1,a[5],a[2],a[6]),s(a[8],a[4])?d(b+c,a[5],a[7]):r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 10:case 138:{s(a[4],a[2])?d(b,a[5],a[4]):r(b,a[5],a[4],a[2]),r(b+1,a[5],a[3],a[6]),r(b+c,a[5],a[7],a[8]),r(b+c+1,a[5],a[6],a[8]);break;}case 66:{r(b,a[5],a[1],a[4]),r(b+1,a[5],a[3],a[6]),r(b+c,a[5],a[7],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 24:{r(b,a[5],a[1],a[2]),r(b+1,a[5],a[3],a[2]),r(b+c,a[5],a[7],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 7:case 39:case 135:{d(b,a[5],a[4]),d(b+1,a[5],a[6]),r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[6],a[8]);break;}case 148:case 149:case 180:{r(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),r(b+c,a[5],a[8],a[4]),d(b+c+1,a[5],a[8]);break;}case 224:case 228:case 225:{r(b,a[5],a[4],a[2]),r(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[4]),d(b+c+1,a[5],a[6]);break;}case 41:case 169:case 45:{d(b,a[5],a[2]),r(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[8]),r(b+c+1,a[5],a[6],a[8]);break;}case 22:case 54:{r(b,a[5],a[1],a[4]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[9],a[8]);break;}case 208:case 209:{r(b,a[5],a[4],a[2]),r(b+1,a[5],a[3],a[2]),r(b+c,a[5],a[7],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 104:case 108:{r(b,a[5],a[1],a[2]),r(b+1,a[5],a[2],a[6]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 11:case 139:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),r(b+1,a[5],a[3],a[6]),r(b+c,a[5],a[7],a[8]),r(b+c+1,a[5],a[6],a[8]);break;}case 19:case 51:{s(a[2],a[6])?(d(b,a[5],a[4]),d(b+1,a[5],a[3])):(x(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[6])),r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[9],a[8]);break;}case 146:case 178:{r(b,a[5],a[1],a[4]),s(a[2],a[6])?(d(b+1,a[5],a[3]),d(b+c+1,a[5],a[8])):(z(b+1,a[5],a[2],a[6]),x(b+c+1,a[5],a[6],a[8])),r(b+c,a[5],a[8],a[4]);break;}case 84:case 85:{r(b,a[5],a[4],a[2]),s(a[6],a[8])?(d(b+1,a[5],a[2]),d(b+c+1,a[5],a[9])):(x(b+1,a[5],a[6],a[2]),z(b+c+1,a[5],a[6],a[8])),r(b+c,a[5],a[7],a[4]);break;}case 112:case 113:{r(b,a[5],a[4],a[2]),r(b+1,a[5],a[3],a[2]),s(a[6],a[8])?(d(b+c,a[5],a[4]),d(b+c+1,a[5],a[9])):(x(b+c,a[5],a[8],a[4]),z(b+c+1,a[5],a[6],a[8]));break;}case 200:case 204:{r(b,a[5],a[1],a[2]),r(b+1,a[5],a[2],a[6]),s(a[8],a[4])?(d(b+c,a[5],a[7]),d(b+c+1,a[5],a[6])):(z(b+c,a[5],a[8],a[4]),x(b+c+1,a[5],a[8],a[6]));break;}case 73:case 77:{s(a[8],a[4])?(d(b,a[5],a[2]),d(b+c,a[5],a[7])):(x(b,a[5],a[4],a[2]),z(b+c,a[5],a[8],a[4])),r(b+1,a[5],a[2],a[6]),r(b+c+1,a[5],a[9],a[6]);break;}case 42:case 170:{s(a[4],a[2])?(d(b,a[5],a[4]),d(b+c,a[5],a[8])):(z(b,a[5],a[4],a[2]),x(b+c,a[5],a[4],a[8])),r(b+1,a[5],a[3],a[6]),r(b+c+1,a[5],a[6],a[8]);break;}case 14:case 142:{s(a[4],a[2])?(d(b,a[5],a[4]),d(b+1,a[5],a[6])):(z(b,a[5],a[4],a[2]),x(b+1,a[5],a[2],a[6])),r(b+c,a[5],a[7],a[8]),r(b+c+1,a[5],a[6],a[8]);break;}case 67:{d(b,a[5],a[4]),r(b+1,a[5],a[3],a[6]),r(b+c,a[5],a[7],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 70:{r(b,a[5],a[1],a[4]),d(b+1,a[5],a[6]),r(b+c,a[5],a[7],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 28:{r(b,a[5],a[1],a[2]),d(b+1,a[5],a[2]),r(b+c,a[5],a[7],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 152:{r(b,a[5],a[1],a[2]),r(b+1,a[5],a[3],a[2]),r(b+c,a[5],a[7],a[8]),d(b+c+1,a[5],a[8]);break;}case 194:{r(b,a[5],a[1],a[4]),r(b+1,a[5],a[3],a[6]),r(b+c,a[5],a[7],a[4]),d(b+c+1,a[5],a[6]);break;}case 98:{r(b,a[5],a[1],a[4]),r(b+1,a[5],a[3],a[6]),d(b+c,a[5],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 56:{r(b,a[5],a[1],a[2]),r(b+1,a[5],a[3],a[2]),d(b+c,a[5],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 25:{d(b,a[5],a[2]),r(b+1,a[5],a[3],a[2]),r(b+c,a[5],a[7],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 26:case 31:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[7],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 82:case 214:{r(b,a[5],a[1],a[4]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[7],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 88:case 248:{r(b,a[5],a[1],a[2]),r(b+1,a[5],a[3],a[2]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 74:case 107:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),r(b+1,a[5],a[3],a[6]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 27:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),d(b+1,a[5],a[3]),r(b+c,a[5],a[7],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 86:{r(b,a[5],a[1],a[4]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[7],a[4]),d(b+c+1,a[5],a[9]);break;}case 216:{r(b,a[5],a[1],a[2]),r(b+1,a[5],a[3],a[2]),d(b+c,a[5],a[7]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 106:{d(b,a[5],a[4]),r(b+1,a[5],a[3],a[6]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 30:{d(b,a[5],a[4]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[7],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 210:{r(b,a[5],a[1],a[4]),d(b+1,a[5],a[3]),r(b+c,a[5],a[7],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 120:{r(b,a[5],a[1],a[2]),r(b+1,a[5],a[3],a[2]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),d(b+c+1,a[5],a[9]);break;}case 75:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),r(b+1,a[5],a[3],a[6]),d(b+c,a[5],a[7]),r(b+c+1,a[5],a[9],a[6]);break;}case 29:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),r(b+c,a[5],a[7],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 198:{r(b,a[5],a[1],a[4]),d(b+1,a[5],a[6]),r(b+c,a[5],a[7],a[4]),d(b+c+1,a[5],a[6]);break;}case 184:{r(b,a[5],a[1],a[2]),r(b+1,a[5],a[3],a[2]),d(b+c,a[5],a[8]),d(b+c+1,a[5],a[8]);break;}case 99:{d(b,a[5],a[4]),r(b+1,a[5],a[3],a[6]),d(b+c,a[5],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 57:{d(b,a[5],a[2]),r(b+1,a[5],a[3],a[2]),d(b+c,a[5],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 71:{d(b,a[5],a[4]),d(b+1,a[5],a[6]),r(b+c,a[5],a[7],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 156:{r(b,a[5],a[1],a[2]),d(b+1,a[5],a[2]),r(b+c,a[5],a[7],a[8]),d(b+c+1,a[5],a[8]);break;}case 226:{r(b,a[5],a[1],a[4]),r(b+1,a[5],a[3],a[6]),d(b+c,a[5],a[4]),d(b+c+1,a[5],a[6]);break;}case 60:{r(b,a[5],a[1],a[2]),d(b+1,a[5],a[2]),d(b+c,a[5],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 195:{d(b,a[5],a[4]),r(b+1,a[5],a[3],a[6]),r(b+c,a[5],a[7],a[4]),d(b+c+1,a[5],a[6]);break;}case 102:{r(b,a[5],a[1],a[4]),d(b+1,a[5],a[6]),d(b+c,a[5],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 153:{d(b,a[5],a[2]),r(b+1,a[5],a[3],a[2]),r(b+c,a[5],a[7],a[8]),d(b+c+1,a[5],a[8]);break;}case 58:{s(a[4],a[2])?d(b,a[5],a[4]):w(b,a[5],a[4],a[2]),s(a[2],a[6])?d(b+1,a[5],a[3]):w(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 83:{d(b,a[5],a[4]),s(a[2],a[6])?d(b+1,a[5],a[3]):w(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[7],a[4]),s(a[6],a[8])?d(b+c+1,a[5],a[9]):w(b+c+1,a[5],a[6],a[8]);break;}case 92:{r(b,a[5],a[1],a[2]),d(b+1,a[5],a[2]),s(a[8],a[4])?d(b+c,a[5],a[7]):w(b+c,a[5],a[8],a[4]),s(a[6],a[8])?d(b+c+1,a[5],a[9]):w(b+c+1,a[5],a[6],a[8]);break;}case 202:{s(a[4],a[2])?d(b,a[5],a[4]):w(b,a[5],a[4],a[2]),r(b+1,a[5],a[3],a[6]),s(a[8],a[4])?d(b+c,a[5],a[7]):w(b+c,a[5],a[8],a[4]),d(b+c+1,a[5],a[6]);break;}case 78:{s(a[4],a[2])?d(b,a[5],a[4]):w(b,a[5],a[4],a[2]),d(b+1,a[5],a[6]),s(a[8],a[4])?d(b+c,a[5],a[7]):w(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 154:{s(a[4],a[2])?d(b,a[5],a[4]):w(b,a[5],a[4],a[2]),s(a[2],a[6])?d(b+1,a[5],a[3]):w(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[7],a[8]),d(b+c+1,a[5],a[8]);break;}case 114:{r(b,a[5],a[1],a[4]),s(a[2],a[6])?d(b+1,a[5],a[3]):w(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[4]),s(a[6],a[8])?d(b+c+1,a[5],a[9]):w(b+c+1,a[5],a[6],a[8]);break;}case 89:{d(b,a[5],a[2]),r(b+1,a[5],a[3],a[2]),s(a[8],a[4])?d(b+c,a[5],a[7]):w(b+c,a[5],a[8],a[4]),s(a[6],a[8])?d(b+c+1,a[5],a[9]):w(b+c+1,a[5],a[6],a[8]);break;}case 90:{s(a[4],a[2])?d(b,a[5],a[4]):w(b,a[5],a[4],a[2]),s(a[2],a[6])?d(b+1,a[5],a[3]):w(b+1,a[5],a[2],a[6]),s(a[8],a[4])?d(b+c,a[5],a[7]):w(b+c,a[5],a[8],a[4]),s(a[6],a[8])?d(b+c+1,a[5],a[9]):w(b+c+1,a[5],a[6],a[8]);break;}case 55:case 23:{s(a[2],a[6])?(d(b,a[5],a[4]),v[b+1]=a[5]):(x(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[6])),r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[9],a[8]);break;}case 182:case 150:{r(b,a[5],a[1],a[4]),s(a[2],a[6])?(v[b+1]=a[5],d(b+c+1,a[5],a[8])):(z(b+1,a[5],a[2],a[6]),x(b+c+1,a[5],a[6],a[8])),r(b+c,a[5],a[8],a[4]);break;}case 213:case 212:{r(b,a[5],a[4],a[2]),s(a[6],a[8])?(d(b+1,a[5],a[2]),v[b+c+1]=a[5]):(x(b+1,a[5],a[6],a[2]),z(b+c+1,a[5],a[6],a[8])),r(b+c,a[5],a[7],a[4]);break;}case 241:case 240:{r(b,a[5],a[4],a[2]),r(b+1,a[5],a[3],a[2]),s(a[6],a[8])?(d(b+c,a[5],a[4]),v[b+c+1]=a[5]):(x(b+c,a[5],a[8],a[4]),z(b+c+1,a[5],a[6],a[8]));break;}case 236:case 232:{r(b,a[5],a[1],a[2]),r(b+1,a[5],a[2],a[6]),s(a[8],a[4])?(v[b+c]=a[5],d(b+c+1,a[5],a[6])):(z(b+c,a[5],a[8],a[4]),x(b+c+1,a[5],a[8],a[6]));break;}case 109:case 105:{s(a[8],a[4])?(d(b,a[5],a[2]),v[b+c]=a[5]):(x(b,a[5],a[4],a[2]),z(b+c,a[5],a[8],a[4])),r(b+1,a[5],a[2],a[6]),r(b+c+1,a[5],a[9],a[6]);break;}case 171:case 43:{s(a[4],a[2])?(v[b]=a[5],d(b+c,a[5],a[8])):(z(b,a[5],a[4],a[2]),x(b+c,a[5],a[4],a[8])),r(b+1,a[5],a[3],a[6]),r(b+c+1,a[5],a[6],a[8]);break;}case 143:case 15:{s(a[4],a[2])?(v[b]=a[5],d(b+1,a[5],a[6])):(z(b,a[5],a[4],a[2]),x(b+1,a[5],a[2],a[6])),r(b+c,a[5],a[7],a[8]),r(b+c+1,a[5],a[6],a[8]);break;}case 124:{r(b,a[5],a[1],a[2]),d(b+1,a[5],a[2]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),d(b+c+1,a[5],a[9]);break;}case 203:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),r(b+1,a[5],a[3],a[6]),d(b+c,a[5],a[7]),d(b+c+1,a[5],a[6]);break;}case 62:{d(b,a[5],a[4]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 211:{d(b,a[5],a[4]),d(b+1,a[5],a[3]),r(b+c,a[5],a[7],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 118:{r(b,a[5],a[1],a[4]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[4]),d(b+c+1,a[5],a[9]);break;}case 217:{d(b,a[5],a[2]),r(b+1,a[5],a[3],a[2]),d(b+c,a[5],a[7]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 110:{d(b,a[5],a[4]),d(b+1,a[5],a[6]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 155:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),d(b+1,a[5],a[3]),r(b+c,a[5],a[7],a[8]),d(b+c+1,a[5],a[8]);break;}case 188:{r(b,a[5],a[1],a[2]),d(b+1,a[5],a[2]),d(b+c,a[5],a[8]),d(b+c+1,a[5],a[8]);break;}case 185:{d(b,a[5],a[2]),r(b+1,a[5],a[3],a[2]),d(b+c,a[5],a[8]),d(b+c+1,a[5],a[8]);break;}case 61:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+c,a[5],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 157:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),r(b+c,a[5],a[7],a[8]),d(b+c+1,a[5],a[8]);break;}case 103:{d(b,a[5],a[4]),d(b+1,a[5],a[6]),d(b+c,a[5],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 227:{d(b,a[5],a[4]),r(b+1,a[5],a[3],a[6]),d(b+c,a[5],a[4]),d(b+c+1,a[5],a[6]);break;}case 230:{r(b,a[5],a[1],a[4]),d(b+1,a[5],a[6]),d(b+c,a[5],a[4]),d(b+c+1,a[5],a[6]);break;}case 199:{d(b,a[5],a[4]),d(b+1,a[5],a[6]),r(b+c,a[5],a[7],a[4]),d(b+c+1,a[5],a[6]);break;}case 220:{r(b,a[5],a[1],a[2]),d(b+1,a[5],a[2]),s(a[8],a[4])?d(b+c,a[5],a[7]):w(b+c,a[5],a[8],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 158:{s(a[4],a[2])?d(b,a[5],a[4]):w(b,a[5],a[4],a[2]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[7],a[8]),d(b+c+1,a[5],a[8]);break;}case 234:{s(a[4],a[2])?d(b,a[5],a[4]):w(b,a[5],a[4],a[2]),r(b+1,a[5],a[3],a[6]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),d(b+c+1,a[5],a[6]);break;}case 242:{r(b,a[5],a[1],a[4]),s(a[2],a[6])?d(b+1,a[5],a[3]):w(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 59:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),s(a[2],a[6])?d(b+1,a[5],a[3]):w(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 121:{d(b,a[5],a[2]),r(b+1,a[5],a[3],a[2]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),s(a[6],a[8])?d(b+c+1,a[5],a[9]):w(b+c+1,a[5],a[6],a[8]);break;}case 87:{d(b,a[5],a[4]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[7],a[4]),s(a[6],a[8])?d(b+c+1,a[5],a[9]):w(b+c+1,a[5],a[6],a[8]);break;}case 79:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),d(b+1,a[5],a[6]),s(a[8],a[4])?d(b+c,a[5],a[7]):w(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 122:{s(a[4],a[2])?d(b,a[5],a[4]):w(b,a[5],a[4],a[2]),s(a[2],a[6])?d(b+1,a[5],a[3]):w(b+1,a[5],a[2],a[6]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),s(a[6],a[8])?d(b+c+1,a[5],a[9]):w(b+c+1,a[5],a[6],a[8]);break;}case 94:{s(a[4],a[2])?d(b,a[5],a[4]):w(b,a[5],a[4],a[2]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),s(a[8],a[4])?d(b+c,a[5],a[7]):w(b+c,a[5],a[8],a[4]),s(a[6],a[8])?d(b+c+1,a[5],a[9]):w(b+c+1,a[5],a[6],a[8]);break;}case 218:{s(a[4],a[2])?d(b,a[5],a[4]):w(b,a[5],a[4],a[2]),s(a[2],a[6])?d(b+1,a[5],a[3]):w(b+1,a[5],a[2],a[6]),s(a[8],a[4])?d(b+c,a[5],a[7]):w(b+c,a[5],a[8],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 91:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),s(a[2],a[6])?d(b+1,a[5],a[3]):w(b+1,a[5],a[2],a[6]),s(a[8],a[4])?d(b+c,a[5],a[7]):w(b+c,a[5],a[8],a[4]),s(a[6],a[8])?d(b+c+1,a[5],a[9]):w(b+c+1,a[5],a[6],a[8]);break;}case 229:{r(b,a[5],a[4],a[2]),r(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[4]),d(b+c+1,a[5],a[6]);break;}case 167:{d(b,a[5],a[4]),d(b+1,a[5],a[6]),r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[6],a[8]);break;}case 173:{d(b,a[5],a[2]),r(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[8]),r(b+c+1,a[5],a[6],a[8]);break;}case 181:{r(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),r(b+c,a[5],a[8],a[4]),d(b+c+1,a[5],a[8]);break;}case 186:{s(a[4],a[2])?d(b,a[5],a[4]):w(b,a[5],a[4],a[2]),s(a[2],a[6])?d(b+1,a[5],a[3]):w(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[8]),d(b+c+1,a[5],a[8]);break;}case 115:{d(b,a[5],a[4]),s(a[2],a[6])?d(b+1,a[5],a[3]):w(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[4]),s(a[6],a[8])?d(b+c+1,a[5],a[9]):w(b+c+1,a[5],a[6],a[8]);break;}case 93:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),s(a[8],a[4])?d(b+c,a[5],a[7]):w(b+c,a[5],a[8],a[4]),s(a[6],a[8])?d(b+c+1,a[5],a[9]):w(b+c+1,a[5],a[6],a[8]);break;}case 206:{s(a[4],a[2])?d(b,a[5],a[4]):w(b,a[5],a[4],a[2]),d(b+1,a[5],a[6]),s(a[8],a[4])?d(b+c,a[5],a[7]):w(b+c,a[5],a[8],a[4]),d(b+c+1,a[5],a[6]);break;}case 205:case 201:{d(b,a[5],a[2]),r(b+1,a[5],a[2],a[6]),s(a[8],a[4])?d(b+c,a[5],a[7]):w(b+c,a[5],a[8],a[4]),d(b+c+1,a[5],a[6]);break;}case 174:case 46:{s(a[4],a[2])?d(b,a[5],a[4]):w(b,a[5],a[4],a[2]),d(b+1,a[5],a[6]),d(b+c,a[5],a[8]),r(b+c+1,a[5],a[6],a[8]);break;}case 179:case 147:{d(b,a[5],a[4]),s(a[2],a[6])?d(b+1,a[5],a[3]):w(b+1,a[5],a[2],a[6]),r(b+c,a[5],a[8],a[4]),d(b+c+1,a[5],a[8]);break;}case 117:case 116:{r(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+c,a[5],a[4]),s(a[6],a[8])?d(b+c+1,a[5],a[9]):w(b+c+1,a[5],a[6],a[8]);break;}case 189:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+c,a[5],a[8]),d(b+c+1,a[5],a[8]);break;}case 231:{d(b,a[5],a[4]),d(b+1,a[5],a[6]),d(b+c,a[5],a[4]),d(b+c+1,a[5],a[6]);break;}case 126:{d(b,a[5],a[4]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),d(b+c+1,a[5],a[9]);break;}case 219:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),d(b+1,a[5],a[3]),d(b+c,a[5],a[7]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 125:{s(a[8],a[4])?(d(b,a[5],a[2]),v[b+c]=a[5]):(x(b,a[5],a[4],a[2]),z(b+c,a[5],a[8],a[4])),d(b+1,a[5],a[2]),d(b+c+1,a[5],a[9]);break;}case 221:{d(b,a[5],a[2]),s(a[6],a[8])?(d(b+1,a[5],a[2]),v[b+c+1]=a[5]):(x(b+1,a[5],a[6],a[2]),z(b+c+1,a[5],a[6],a[8])),d(b+c,a[5],a[7]);break;}case 207:{s(a[4],a[2])?(v[b]=a[5],d(b+1,a[5],a[6])):(z(b,a[5],a[4],a[2]),x(b+1,a[5],a[2],a[6])),d(b+c,a[5],a[7]),d(b+c+1,a[5],a[6]);break;}case 238:{d(b,a[5],a[4]),d(b+1,a[5],a[6]),s(a[8],a[4])?(v[b+c]=a[5],d(b+c+1,a[5],a[6])):(z(b+c,a[5],a[8],a[4]),x(b+c+1,a[5],a[8],a[6]));break;}case 190:{d(b,a[5],a[4]),s(a[2],a[6])?(v[b+1]=a[5],d(b+c+1,a[5],a[8])):(z(b+1,a[5],a[2],a[6]),x(b+c+1,a[5],a[6],a[8])),d(b+c,a[5],a[8]);break;}case 187:{s(a[4],a[2])?(v[b]=a[5],d(b+c,a[5],a[8])):(z(b,a[5],a[4],a[2]),x(b+c,a[5],a[4],a[8])),d(b+1,a[5],a[3]),d(b+c+1,a[5],a[8]);break;}case 243:{d(b,a[5],a[4]),d(b+1,a[5],a[3]),s(a[6],a[8])?(d(b+c,a[5],a[4]),v[b+c+1]=a[5]):(x(b+c,a[5],a[8],a[4]),z(b+c+1,a[5],a[6],a[8]));break;}case 119:{s(a[2],a[6])?(d(b,a[5],a[4]),v[b+1]=a[5]):(x(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[6])),d(b+c,a[5],a[4]),d(b+c+1,a[5],a[9]);break;}case 237:case 233:{d(b,a[5],a[2]),r(b+1,a[5],a[2],a[6]),s(a[8],a[4])?v[b+c]=a[5]:d(b+c,a[5],a[7]),d(b+c+1,a[5],a[6]);break;}case 175:case 47:{s(a[4],a[2])?v[b]=a[5]:d(b,a[5],a[4]),d(b+1,a[5],a[6]),d(b+c,a[5],a[8]),r(b+c+1,a[5],a[6],a[8]);break;}case 183:case 151:{d(b,a[5],a[4]),s(a[2],a[6])?v[b+1]=a[5]:d(b+1,a[5],a[3]),r(b+c,a[5],a[8],a[4]),d(b+c+1,a[5],a[8]);break;}case 245:case 244:{r(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+c,a[5],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:d(b+c+1,a[5],a[9]);break;}case 250:{d(b,a[5],a[4]),d(b+1,a[5],a[3]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 123:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),d(b+1,a[5],a[3]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),d(b+c+1,a[5],a[9]);break;}case 95:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[7]),d(b+c+1,a[5],a[9]);break;}case 222:{d(b,a[5],a[4]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[7]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 252:{r(b,a[5],a[1],a[2]),d(b+1,a[5],a[2]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:d(b+c+1,a[5],a[9]);break;}case 249:{d(b,a[5],a[2]),r(b+1,a[5],a[3],a[2]),s(a[8],a[4])?v[b+c]=a[5]:d(b+c,a[5],a[7]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 235:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),r(b+1,a[5],a[3],a[6]),s(a[8],a[4])?v[b+c]=a[5]:d(b+c,a[5],a[7]),d(b+c+1,a[5],a[6]);break;}case 111:{s(a[4],a[2])?v[b]=a[5]:d(b,a[5],a[4]),d(b+1,a[5],a[6]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),r(b+c+1,a[5],a[9],a[6]);break;}case 63:{s(a[4],a[2])?v[b]=a[5]:d(b,a[5],a[4]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[8]),r(b+c+1,a[5],a[9],a[8]);break;}case 159:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),s(a[2],a[6])?v[b+1]=a[5]:d(b+1,a[5],a[3]),r(b+c,a[5],a[7],a[8]),d(b+c+1,a[5],a[8]);break;}case 215:{d(b,a[5],a[4]),s(a[2],a[6])?v[b+1]=a[5]:d(b+1,a[5],a[3]),r(b+c,a[5],a[7],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 246:{r(b,a[5],a[1],a[4]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),d(b+c,a[5],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:d(b+c+1,a[5],a[9]);break;}case 254:{d(b,a[5],a[4]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:d(b+c+1,a[5],a[9]);break;}case 253:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),s(a[8],a[4])?v[b+c]=a[5]:d(b+c,a[5],a[7]),s(a[6],a[8])?v[b+c+1]=a[5]:d(b+c+1,a[5],a[9]);break;}case 251:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),d(b+1,a[5],a[3]),s(a[8],a[4])?v[b+c]=a[5]:d(b+c,a[5],a[7]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 239:{s(a[4],a[2])?v[b]=a[5]:d(b,a[5],a[4]),d(b+1,a[5],a[6]),s(a[8],a[4])?v[b+c]=a[5]:d(b+c,a[5],a[7]),d(b+c+1,a[5],a[6]);break;}case 127:{s(a[4],a[2])?v[b]=a[5]:d(b,a[5],a[4]),s(a[2],a[6])?v[b+1]=a[5]:r(b+1,a[5],a[2],a[6]),s(a[8],a[4])?v[b+c]=a[5]:r(b+c,a[5],a[8],a[4]),d(b+c+1,a[5],a[9]);break;}case 191:{s(a[4],a[2])?v[b]=a[5]:d(b,a[5],a[4]),s(a[2],a[6])?v[b+1]=a[5]:d(b+1,a[5],a[3]),d(b+c,a[5],a[8]),d(b+c+1,a[5],a[8]);break;}case 223:{s(a[4],a[2])?v[b]=a[5]:r(b,a[5],a[4],a[2]),s(a[2],a[6])?v[b+1]=a[5]:d(b+1,a[5],a[3]),d(b+c,a[5],a[7]),s(a[6],a[8])?v[b+c+1]=a[5]:r(b+c+1,a[5],a[6],a[8]);break;}case 247:{d(b,a[5],a[4]),s(a[2],a[6])?v[b+1]=a[5]:d(b+1,a[5],a[3]),d(b+c,a[5],a[4]),s(a[6],a[8])?v[b+c+1]=a[5]:d(b+c+1,a[5],a[9]);break;}case 255:{s(a[4],a[2])?v[b]=a[5]:d(b,a[5],a[4]),s(a[2],a[6])?v[b+1]=a[5]:d(b+1,a[5],a[3]),s(a[8],a[4])?v[b+c]=a[5]:d(b+c,a[5],a[7]),s(a[6],a[8])?v[b+c+1]=a[5]:d(b+c+1,a[5],a[9]);break;}}A++,b+=2;}b+=c;}};var C=function a(D,R){var E,F,C,G,H,a=[],c=D*3,b=0,A=0;var v=o,I=f,L=k,d=p,u=q,x=r,y=w,z=s,B=g,t=e,M=h,N=i,O=j,S=l,T=m,U=n,J,K;for(F=0;F<R;F++){for(G=F>0?-D:0,H=F<R-1?D:0,E=0;E<D;E++){a[2]=B[A+G],a[5]=B[A],a[8]=B[A+H],E>0?(a[1]=B[A+G-1],a[4]=B[A-1],a[7]=B[A+H-1]):(a[1]=a[2],a[4]=a[5],a[7]=a[8]),E<D-1?(a[3]=B[A+G+1],a[6]=B[A+1],a[9]=B[A+H+1]):(a[3]=a[2],a[6]=a[5],a[9]=a[8]);var P=0;var Q=1;for(J=L(a[5]),C=1;C<10;C++){if(C===5)continue;a[C]!==a[5]&&(K=L(a[C]),(I.abs((J&M)-(K&M))>S||I.abs((J&N)-(K&N))>T||I.abs((J&O)-(K&O))>U)&&(P|=Q)),Q<<=1;}switch(P){case 0:case 1:case 4:case 32:case 128:case 5:case 132:case 160:case 33:case 129:case 36:case 133:case 164:case 161:case 37:case 165:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 2:case 34:case 130:case 162:{d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 16:case 17:case 48:case 49:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 64:case 65:case 68:case 69:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 8:case 12:case 136:case 140:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 3:case 35:case 131:case 163:{d(b,a[5],a[4]),t[b+1]=a[5],d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 6:case 38:case 134:case 166:{d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 20:case 21:case 52:case 53:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 144:case 145:case 176:case 177:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 192:case 193:case 196:case 197:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 96:case 97:case 100:case 101:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 40:case 44:case 168:case 172:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 9:case 13:case 137:case 141:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 18:case 50:{d(b,a[5],a[1]),v(a[2],a[6])?(t[b+1]=a[5],d(b+2,a[5],a[3]),t[b+c+2]=a[5]):(x(b+1,a[5],a[2]),y(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),d(b+c,a[5],a[4]),t[b+c+1]=a[5],u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 80:case 81:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]),v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9])):(x(b+c+2,a[5],a[6]),x(b+(c<<1)+1,a[5],a[8]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 72:case 76:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?(t[b+c]=a[5],d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5]):(x(b+c,a[5],a[4]),y(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),d(b+(c<<1)+2,a[5],a[9]);break;}case 10:case 138:{v(a[4],a[2])?(d(b,a[5],a[1]),t[b+1]=a[5],t[b+c]=a[5]):(y(b,a[5],a[4],a[2]),x(b+1,a[5],a[2]),x(b+c,a[5],a[4])),d(b+2,a[5],a[3]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 66:{d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 24:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 7:case 39:case 135:{d(b,a[5],a[4]),t[b+1]=a[5],d(b+2,a[5],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 148:case 149:case 180:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 224:case 228:case 225:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 41:case 169:case 45:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 22:case 54:{d(b,a[5],a[1]),v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5],t[b+c+2]=a[5]):(x(b+1,a[5],a[2]),y(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),d(b+c,a[5],a[4]),t[b+c+1]=a[5],u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 208:case 209:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]),v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+c+2,a[5],a[6]),x(b+(c<<1)+1,a[5],a[8]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 104:case 108:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(x(b+c,a[5],a[4]),y(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),d(b+(c<<1)+2,a[5],a[9]);break;}case 11:case 139:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5],t[b+c]=a[5]):(y(b,a[5],a[4],a[2]),x(b+1,a[5],a[2]),x(b+c,a[5],a[4])),d(b+2,a[5],a[3]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 19:case 51:{v(a[2],a[6])?(d(b,a[5],a[4]),t[b+1]=a[5],d(b+2,a[5],a[3]),t[b+c+2]=a[5]):(u(b,a[5],a[4],a[2]),d(b+1,a[2],a[5]),z(b+2,a[2],a[6]),d(b+c+2,a[5],a[6])),d(b+c,a[5],a[4]),t[b+c+1]=a[5],u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 146:case 178:{v(a[2],a[6])?(t[b+1]=a[5],d(b+2,a[5],a[3]),t[b+c+2]=a[5],d(b+(c<<1)+2,a[5],a[8])):(d(b+1,a[5],a[2]),z(b+2,a[2],a[6]),d(b+c+2,a[6],a[5]),u(b+(c<<1)+2,a[5],a[6],a[8])),d(b,a[5],a[1]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]);break;}case 84:case 85:{v(a[6],a[8])?(d(b+2,a[5],a[2]),t[b+c+2]=a[5],t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9])):(u(b+2,a[5],a[2],a[6]),d(b+c+2,a[6],a[5]),d(b+(c<<1)+1,a[5],a[8]),z(b+(c<<1)+2,a[6],a[8])),u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]);break;}case 112:case 113:{v(a[6],a[8])?(t[b+c+2]=a[5],d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9])):(d(b+c+2,a[5],a[6]),u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[8],a[5]),z(b+(c<<1)+2,a[6],a[8])),u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5];break;}case 200:case 204:{v(a[8],a[4])?(t[b+c]=a[5],d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6])):(d(b+c,a[5],a[4]),z(b+(c<<1),a[8],a[4]),d(b+(c<<1)+1,a[8],a[5]),u(b+(c<<1)+2,a[5],a[6],a[8])),d(b,a[5],a[1]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]);break;}case 73:case 77:{v(a[8],a[4])?(d(b,a[5],a[2]),t[b+c]=a[5],d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5]):(u(b,a[5],a[4],a[2]),d(b+c,a[4],a[5]),z(b+(c<<1),a[8],a[4]),d(b+(c<<1)+1,a[5],a[8])),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1)+2,a[5],a[9]);break;}case 42:case 170:{v(a[4],a[2])?(d(b,a[5],a[1]),t[b+1]=a[5],t[b+c]=a[5],d(b+(c<<1),a[5],a[8])):(z(b,a[4],a[2]),d(b+1,a[5],a[2]),d(b+c,a[4],a[5]),u(b+(c<<1),a[5],a[8],a[4])),d(b+2,a[5],a[3]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 14:case 142:{v(a[4],a[2])?(d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[6]),t[b+c]=a[5]):(z(b,a[4],a[2]),d(b+1,a[2],a[5]),u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4])),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 67:{d(b,a[5],a[4]),t[b+1]=a[5],d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 70:{d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 28:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 152:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 194:{d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 98:{d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 56:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 25:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 26:case 31:{v(a[4],a[2])?(t[b]=a[5],t[b+c]=a[5]):(y(b,a[5],a[4],a[2]),x(b+c,a[5],a[4])),t[b+1]=a[5],v(a[2],a[6])?(t[b+2]=a[5],t[b+c+2]=a[5]):(y(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 82:case 214:{d(b,a[5],a[1]),v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5]):(x(b+1,a[5],a[2]),y(b+2,a[5],a[2],a[6])),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),v(a[6],a[8])?(t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+(c<<1)+1,a[5],a[8]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 88:case 248:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c+1]=a[5],v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5]):(x(b+c,a[5],a[4]),y(b+(c<<1),a[5],a[8],a[4])),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+c+2,a[5],a[6]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 74:case 107:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5]):(y(b,a[5],a[4],a[2]),x(b+1,a[5],a[2])),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?(t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(y(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),d(b+(c<<1)+2,a[5],a[9]);break;}case 27:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5],t[b+c]=a[5]):(y(b,a[5],a[4],a[2]),x(b+1,a[5],a[2]),x(b+c,a[5],a[4])),d(b+2,a[5],a[3]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 86:{d(b,a[5],a[1]),v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5],t[b+c+2]=a[5]):(x(b+1,a[5],a[2]),y(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 216:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]),v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+c+2,a[5],a[6]),x(b+(c<<1)+1,a[5],a[8]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 106:{d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[3]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(x(b+c,a[5],a[4]),y(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),d(b+(c<<1)+2,a[5],a[9]);break;}case 30:{d(b,a[5],a[1]),v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5],t[b+c+2]=a[5]):(x(b+1,a[5],a[2]),y(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),t[b+c]=a[5],t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 210:{d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]),v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+c+2,a[5],a[6]),x(b+(c<<1)+1,a[5],a[8]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 120:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c+1]=a[5],t[b+c+2]=a[5],v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(x(b+c,a[5],a[4]),y(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),d(b+(c<<1)+2,a[5],a[9]);break;}case 75:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5],t[b+c]=a[5]):(y(b,a[5],a[4],a[2]),x(b+1,a[5],a[2]),x(b+c,a[5],a[4])),d(b+2,a[5],a[3]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 29:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 198:{d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 184:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 99:{d(b,a[5],a[4]),t[b+1]=a[5],d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 57:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 71:{d(b,a[5],a[4]),t[b+1]=a[5],d(b+2,a[5],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 156:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 226:{d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 60:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 195:{d(b,a[5],a[4]),t[b+1]=a[5],d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 102:{d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 153:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 58:{v(a[4],a[2])?d(b,a[5],a[1]):u(b,a[5],a[4],a[2]),t[b+1]=a[5],v(a[2],a[6])?d(b+2,a[5],a[3]):u(b+2,a[5],a[2],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 83:{d(b,a[5],a[4]),t[b+1]=a[5],v(a[2],a[6])?d(b+2,a[5],a[3]):u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?d(b+(c<<1)+2,a[5],a[9]):u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 92:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],v(a[8],a[4])?d(b+(c<<1),a[5],a[7]):u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?d(b+(c<<1)+2,a[5],a[9]):u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 202:{v(a[4],a[2])?d(b,a[5],a[1]):u(b,a[5],a[4],a[2]),t[b+1]=a[5],d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?d(b+(c<<1),a[5],a[7]):u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 78:{v(a[4],a[2])?d(b,a[5],a[1]):u(b,a[5],a[4],a[2]),t[b+1]=a[5],d(b+2,a[5],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?d(b+(c<<1),a[5],a[7]):u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 154:{v(a[4],a[2])?d(b,a[5],a[1]):u(b,a[5],a[4],a[2]),t[b+1]=a[5],v(a[2],a[6])?d(b+2,a[5],a[3]):u(b+2,a[5],a[2],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 114:{d(b,a[5],a[1]),t[b+1]=a[5],v(a[2],a[6])?d(b+2,a[5],a[3]):u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?d(b+(c<<1)+2,a[5],a[9]):u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 89:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],v(a[8],a[4])?d(b+(c<<1),a[5],a[7]):u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?d(b+(c<<1)+2,a[5],a[9]):u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 90:{v(a[4],a[2])?d(b,a[5],a[1]):u(b,a[5],a[4],a[2]),t[b+1]=a[5],v(a[2],a[6])?d(b+2,a[5],a[3]):u(b+2,a[5],a[2],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],v(a[8],a[4])?d(b+(c<<1),a[5],a[7]):u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?d(b+(c<<1)+2,a[5],a[9]):u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 55:case 23:{v(a[2],a[6])?(d(b,a[5],a[4]),t[b+1]=a[5],t[b+2]=a[5],t[b+c+2]=a[5]):(u(b,a[5],a[4],a[2]),d(b+1,a[2],a[5]),z(b+2,a[2],a[6]),d(b+c+2,a[5],a[6])),d(b+c,a[5],a[4]),t[b+c+1]=a[5],u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 182:case 150:{v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5],t[b+c+2]=a[5],d(b+(c<<1)+2,a[5],a[8])):(d(b+1,a[5],a[2]),z(b+2,a[2],a[6]),d(b+c+2,a[6],a[5]),u(b+(c<<1)+2,a[5],a[6],a[8])),d(b,a[5],a[1]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]);break;}case 213:case 212:{v(a[6],a[8])?(d(b+2,a[5],a[2]),t[b+c+2]=a[5],t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(u(b+2,a[5],a[2],a[6]),d(b+c+2,a[6],a[5]),d(b+(c<<1)+1,a[5],a[8]),z(b+(c<<1)+2,a[6],a[8])),u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]);break;}case 241:case 240:{v(a[6],a[8])?(t[b+c+2]=a[5],d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(d(b+c+2,a[5],a[6]),u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[8],a[5]),z(b+(c<<1)+2,a[6],a[8])),u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5];break;}case 236:case 232:{v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6])):(d(b+c,a[5],a[4]),z(b+(c<<1),a[8],a[4]),d(b+(c<<1)+1,a[8],a[5]),u(b+(c<<1)+2,a[5],a[6],a[8])),d(b,a[5],a[1]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]);break;}case 109:case 105:{v(a[8],a[4])?(d(b,a[5],a[2]),t[b+c]=a[5],t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(u(b,a[5],a[4],a[2]),d(b+c,a[4],a[5]),z(b+(c<<1),a[8],a[4]),d(b+(c<<1)+1,a[5],a[8])),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1)+2,a[5],a[9]);break;}case 171:case 43:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5],t[b+c]=a[5],d(b+(c<<1),a[5],a[8])):(z(b,a[4],a[2]),d(b+1,a[5],a[2]),d(b+c,a[4],a[5]),u(b+(c<<1),a[5],a[8],a[4])),d(b+2,a[5],a[3]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 143:case 15:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5],d(b+2,a[5],a[6]),t[b+c]=a[5]):(z(b,a[4],a[2]),d(b+1,a[2],a[5]),u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4])),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 124:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c+1]=a[5],t[b+c+2]=a[5],v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(x(b+c,a[5],a[4]),y(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),d(b+(c<<1)+2,a[5],a[9]);break;}case 203:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5],t[b+c]=a[5]):(y(b,a[5],a[4],a[2]),x(b+1,a[5],a[2]),x(b+c,a[5],a[4])),d(b+2,a[5],a[3]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 62:{d(b,a[5],a[1]),v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5],t[b+c+2]=a[5]):(x(b+1,a[5],a[2]),y(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),t[b+c]=a[5],t[b+c+1]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 211:{d(b,a[5],a[4]),t[b+1]=a[5],d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]),v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+c+2,a[5],a[6]),x(b+(c<<1)+1,a[5],a[8]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 118:{d(b,a[5],a[1]),v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5],t[b+c+2]=a[5]):(x(b+1,a[5],a[2]),y(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 217:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]),v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+c+2,a[5],a[6]),x(b+(c<<1)+1,a[5],a[8]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 110:{d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[6]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(x(b+c,a[5],a[4]),y(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),d(b+(c<<1)+2,a[5],a[9]);break;}case 155:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5],t[b+c]=a[5]):(y(b,a[5],a[4],a[2]),x(b+1,a[5],a[2]),x(b+c,a[5],a[4])),d(b+2,a[5],a[3]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 188:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 185:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 61:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 157:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 103:{d(b,a[5],a[4]),t[b+1]=a[5],d(b+2,a[5],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 227:{d(b,a[5],a[4]),t[b+1]=a[5],d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 230:{d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 199:{d(b,a[5],a[4]),t[b+1]=a[5],d(b+2,a[5],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 220:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c]=a[5],t[b+c+1]=a[5],v(a[8],a[4])?d(b+(c<<1),a[5],a[7]):u(b+(c<<1),a[5],a[8],a[4]),v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+c+2,a[5],a[6]),x(b+(c<<1)+1,a[5],a[8]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 158:{v(a[4],a[2])?d(b,a[5],a[1]):u(b,a[5],a[4],a[2]),v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5],t[b+c+2]=a[5]):(x(b+1,a[5],a[2]),y(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),t[b+c]=a[5],t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 234:{v(a[4],a[2])?d(b,a[5],a[1]):u(b,a[5],a[4],a[2]),t[b+1]=a[5],d(b+2,a[5],a[3]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(x(b+c,a[5],a[4]),y(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),d(b+(c<<1)+2,a[5],a[6]);break;}case 242:{d(b,a[5],a[1]),t[b+1]=a[5],v(a[2],a[6])?d(b+2,a[5],a[3]):u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[4]),v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+c+2,a[5],a[6]),x(b+(c<<1)+1,a[5],a[8]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 59:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5],t[b+c]=a[5]):(y(b,a[5],a[4],a[2]),x(b+1,a[5],a[2]),x(b+c,a[5],a[4])),v(a[2],a[6])?d(b+2,a[5],a[3]):u(b+2,a[5],a[2],a[6]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 121:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c+1]=a[5],t[b+c+2]=a[5],v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(x(b+c,a[5],a[4]),y(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),v(a[6],a[8])?d(b+(c<<1)+2,a[5],a[9]):u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 87:{d(b,a[5],a[4]),v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5],t[b+c+2]=a[5]):(x(b+1,a[5],a[2]),y(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?d(b+(c<<1)+2,a[5],a[9]):u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 79:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5],t[b+c]=a[5]):(y(b,a[5],a[4],a[2]),x(b+1,a[5],a[2]),x(b+c,a[5],a[4])),d(b+2,a[5],a[6]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?d(b+(c<<1),a[5],a[7]):u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 122:{v(a[4],a[2])?d(b,a[5],a[1]):u(b,a[5],a[4],a[2]),t[b+1]=a[5],v(a[2],a[6])?d(b+2,a[5],a[3]):u(b+2,a[5],a[2],a[6]),t[b+c+1]=a[5],t[b+c+2]=a[5],v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(x(b+c,a[5],a[4]),y(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),v(a[6],a[8])?d(b+(c<<1)+2,a[5],a[9]):u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 94:{v(a[4],a[2])?d(b,a[5],a[1]):u(b,a[5],a[4],a[2]),v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5],t[b+c+2]=a[5]):(x(b+1,a[5],a[2]),y(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),t[b+c]=a[5],t[b+c+1]=a[5],v(a[8],a[4])?d(b+(c<<1),a[5],a[7]):u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?d(b+(c<<1)+2,a[5],a[9]):u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 218:{v(a[4],a[2])?d(b,a[5],a[1]):u(b,a[5],a[4],a[2]),t[b+1]=a[5],v(a[2],a[6])?d(b+2,a[5],a[3]):u(b+2,a[5],a[2],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],v(a[8],a[4])?d(b+(c<<1),a[5],a[7]):u(b+(c<<1),a[5],a[8],a[4]),v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+c+2,a[5],a[6]),x(b+(c<<1)+1,a[5],a[8]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 91:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5],t[b+c]=a[5]):(y(b,a[5],a[4],a[2]),x(b+1,a[5],a[2]),x(b+c,a[5],a[4])),v(a[2],a[6])?d(b+2,a[5],a[3]):u(b+2,a[5],a[2],a[6]),t[b+c+1]=a[5],t[b+c+2]=a[5],v(a[8],a[4])?d(b+(c<<1),a[5],a[7]):u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?d(b+(c<<1)+2,a[5],a[9]):u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 229:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 167:{d(b,a[5],a[4]),t[b+1]=a[5],d(b+2,a[5],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 173:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 181:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 186:{v(a[4],a[2])?d(b,a[5],a[1]):u(b,a[5],a[4],a[2]),t[b+1]=a[5],v(a[2],a[6])?d(b+2,a[5],a[3]):u(b+2,a[5],a[2],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 115:{d(b,a[5],a[4]),t[b+1]=a[5],v(a[2],a[6])?d(b+2,a[5],a[3]):u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?d(b+(c<<1)+2,a[5],a[9]):u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 93:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],v(a[8],a[4])?d(b+(c<<1),a[5],a[7]):u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?d(b+(c<<1)+2,a[5],a[9]):u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 206:{v(a[4],a[2])?d(b,a[5],a[1]):u(b,a[5],a[4],a[2]),t[b+1]=a[5],d(b+2,a[5],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?d(b+(c<<1),a[5],a[7]):u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 205:case 201:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?d(b+(c<<1),a[5],a[7]):u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 174:case 46:{v(a[4],a[2])?d(b,a[5],a[1]):u(b,a[5],a[4],a[2]),t[b+1]=a[5],d(b+2,a[5],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 179:case 147:{d(b,a[5],a[4]),t[b+1]=a[5],v(a[2],a[6])?d(b+2,a[5],a[3]):u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 117:case 116:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?d(b+(c<<1)+2,a[5],a[9]):u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 189:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 231:{d(b,a[5],a[4]),t[b+1]=a[5],d(b+2,a[5],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 126:{d(b,a[5],a[1]),v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5],t[b+c+2]=a[5]):(x(b+1,a[5],a[2]),y(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),t[b+c+1]=a[5],v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(x(b+c,a[5],a[4]),y(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),d(b+(c<<1)+2,a[5],a[9]);break;}case 219:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5],t[b+c]=a[5]):(y(b,a[5],a[4],a[2]),x(b+1,a[5],a[2]),x(b+c,a[5],a[4])),d(b+2,a[5],a[3]),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]),v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+c+2,a[5],a[6]),x(b+(c<<1)+1,a[5],a[8]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 125:{v(a[8],a[4])?(d(b,a[5],a[2]),t[b+c]=a[5],t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(u(b,a[5],a[4],a[2]),d(b+c,a[4],a[5]),z(b+(c<<1),a[8],a[4]),d(b+(c<<1)+1,a[5],a[8])),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 221:{v(a[6],a[8])?(d(b+2,a[5],a[2]),t[b+c+2]=a[5],t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(u(b+2,a[5],a[2],a[6]),d(b+c+2,a[6],a[5]),d(b+(c<<1)+1,a[5],a[8]),z(b+(c<<1)+2,a[6],a[8])),d(b,a[5],a[2]),d(b+1,a[5],a[2]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]);break;}case 207:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5],d(b+2,a[5],a[6]),t[b+c]=a[5]):(z(b,a[4],a[2]),d(b+1,a[2],a[5]),u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4])),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 238:{v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6])):(d(b+c,a[5],a[4]),z(b+(c<<1),a[8],a[4]),d(b+(c<<1)+1,a[8],a[5]),u(b+(c<<1)+2,a[5],a[6],a[8])),d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[6]),t[b+c+1]=a[5],d(b+c+2,a[5],a[6]);break;}case 190:{v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5],t[b+c+2]=a[5],d(b+(c<<1)+2,a[5],a[8])):(d(b+1,a[5],a[2]),z(b+2,a[2],a[6]),d(b+c+2,a[6],a[5]),u(b+(c<<1)+2,a[5],a[6],a[8])),d(b,a[5],a[1]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]);break;}case 187:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5],t[b+c]=a[5],d(b+(c<<1),a[5],a[8])):(z(b,a[4],a[2]),d(b+1,a[5],a[2]),d(b+c,a[4],a[5]),u(b+(c<<1),a[5],a[8],a[4])),d(b+2,a[5],a[3]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 243:{v(a[6],a[8])?(t[b+c+2]=a[5],d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(d(b+c+2,a[5],a[6]),u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[8],a[5]),z(b+(c<<1)+2,a[6],a[8])),d(b,a[5],a[4]),t[b+1]=a[5],d(b+2,a[5],a[3]),d(b+c,a[5],a[4]),t[b+c+1]=a[5];break;}case 119:{v(a[2],a[6])?(d(b,a[5],a[4]),t[b+1]=a[5],t[b+2]=a[5],t[b+c+2]=a[5]):(u(b,a[5],a[4],a[2]),d(b+1,a[2],a[5]),z(b+2,a[2],a[6]),d(b+c+2,a[5],a[6])),d(b+c,a[5],a[4]),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 237:case 233:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?t[b+(c<<1)]=a[5]:u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 175:case 47:{v(a[4],a[2])?t[b]=a[5]:u(b,a[5],a[4],a[2]),t[b+1]=a[5],d(b+2,a[5],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 183:case 151:{d(b,a[5],a[4]),t[b+1]=a[5],v(a[2],a[6])?t[b+2]=a[5]:u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],u(b+(c<<1),a[5],a[8],a[4]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 245:case 244:{u(b,a[5],a[4],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?t[b+(c<<1)+2]=a[5]:u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 250:{d(b,a[5],a[1]),t[b+1]=a[5],d(b+2,a[5],a[3]),t[b+c+1]=a[5],v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5]):(x(b+c,a[5],a[4]),y(b+(c<<1),a[5],a[8],a[4])),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+c+2,a[5],a[6]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 123:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5]):(y(b,a[5],a[4],a[2]),x(b+1,a[5],a[2])),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],v(a[8],a[4])?(t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(y(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),d(b+(c<<1)+2,a[5],a[9]);break;}case 95:{v(a[4],a[2])?(t[b]=a[5],t[b+c]=a[5]):(y(b,a[5],a[4],a[2]),x(b+c,a[5],a[4])),t[b+1]=a[5],v(a[2],a[6])?(t[b+2]=a[5],t[b+c+2]=a[5]):(y(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[9]);break;}case 222:{d(b,a[5],a[1]),v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5]):(x(b+1,a[5],a[2]),y(b+2,a[5],a[2],a[6])),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),v(a[6],a[8])?(t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+(c<<1)+1,a[5],a[8]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 252:{d(b,a[5],a[1]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c+1]=a[5],t[b+c+2]=a[5],v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5]):(x(b+c,a[5],a[4]),y(b+(c<<1),a[5],a[8],a[4])),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?t[b+(c<<1)+2]=a[5]:u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 249:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],v(a[8],a[4])?t[b+(c<<1)]=a[5]:u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+c+2,a[5],a[6]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 235:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5]):(y(b,a[5],a[4],a[2]),x(b+1,a[5],a[2])),d(b+2,a[5],a[3]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?t[b+(c<<1)]=a[5]:u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 111:{v(a[4],a[2])?t[b]=a[5]:u(b,a[5],a[4],a[2]),t[b+1]=a[5],d(b+2,a[5],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?(t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(y(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),d(b+(c<<1)+2,a[5],a[9]);break;}case 63:{v(a[4],a[2])?t[b]=a[5]:u(b,a[5],a[4],a[2]),t[b+1]=a[5],v(a[2],a[6])?(t[b+2]=a[5],t[b+c+2]=a[5]):(y(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),t[b+c]=a[5],t[b+c+1]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[9]);break;}case 159:{v(a[4],a[2])?(t[b]=a[5],t[b+c]=a[5]):(y(b,a[5],a[4],a[2]),x(b+c,a[5],a[4])),t[b+1]=a[5],v(a[2],a[6])?t[b+2]=a[5]:u(b+2,a[5],a[2],a[6]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 215:{d(b,a[5],a[4]),t[b+1]=a[5],v(a[2],a[6])?t[b+2]=a[5]:u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[7]),v(a[6],a[8])?(t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+(c<<1)+1,a[5],a[8]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 246:{d(b,a[5],a[1]),v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5]):(x(b+1,a[5],a[2]),y(b+2,a[5],a[2],a[6])),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?t[b+(c<<1)+2]=a[5]:u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 254:{d(b,a[5],a[1]),v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5]):(x(b+1,a[5],a[2]),y(b+2,a[5],a[2],a[6])),t[b+c+1]=a[5],v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5]):(x(b+c,a[5],a[4]),y(b+(c<<1),a[5],a[8],a[4])),v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+c+2,a[5],a[6]),x(b+(c<<1)+1,a[5],a[8]),u(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 253:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],v(a[8],a[4])?t[b+(c<<1)]=a[5]:u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?t[b+(c<<1)+2]=a[5]:u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 251:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5]):(y(b,a[5],a[4],a[2]),x(b+1,a[5],a[2])),d(b+2,a[5],a[3]),t[b+c+1]=a[5],v(a[8],a[4])?(t[b+c]=a[5],t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(x(b+c,a[5],a[4]),u(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),v(a[6],a[8])?(t[b+c+2]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+c+2,a[5],a[6]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 239:{v(a[4],a[2])?t[b]=a[5]:u(b,a[5],a[4],a[2]),t[b+1]=a[5],d(b+2,a[5],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],d(b+c+2,a[5],a[6]),v(a[8],a[4])?t[b+(c<<1)]=a[5]:u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],d(b+(c<<1)+2,a[5],a[6]);break;}case 127:{v(a[4],a[2])?(t[b]=a[5],t[b+1]=a[5],t[b+c]=a[5]):(u(b,a[5],a[4],a[2]),x(b+1,a[5],a[2]),x(b+c,a[5],a[4])),v(a[2],a[6])?(t[b+2]=a[5],t[b+c+2]=a[5]):(y(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),t[b+c+1]=a[5],v(a[8],a[4])?(t[b+(c<<1)]=a[5],t[b+(c<<1)+1]=a[5]):(y(b+(c<<1),a[5],a[8],a[4]),x(b+(c<<1)+1,a[5],a[8])),d(b+(c<<1)+2,a[5],a[9]);break;}case 191:{v(a[4],a[2])?t[b]=a[5]:u(b,a[5],a[4],a[2]),t[b+1]=a[5],v(a[2],a[6])?t[b+2]=a[5]:u(b+2,a[5],a[2],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[8]),d(b+(c<<1)+1,a[5],a[8]),d(b+(c<<1)+2,a[5],a[8]);break;}case 223:{v(a[4],a[2])?(t[b]=a[5],t[b+c]=a[5]):(y(b,a[5],a[4],a[2]),x(b+c,a[5],a[4])),v(a[2],a[6])?(t[b+1]=a[5],t[b+2]=a[5],t[b+c+2]=a[5]):(x(b+1,a[5],a[2]),u(b+2,a[5],a[2],a[6]),x(b+c+2,a[5],a[6])),t[b+c+1]=a[5],d(b+(c<<1),a[5],a[7]),v(a[6],a[8])?(t[b+(c<<1)+1]=a[5],t[b+(c<<1)+2]=a[5]):(x(b+(c<<1)+1,a[5],a[8]),y(b+(c<<1)+2,a[5],a[6],a[8]));break;}case 247:{d(b,a[5],a[4]),t[b+1]=a[5],v(a[2],a[6])?t[b+2]=a[5]:u(b+2,a[5],a[2],a[6]),d(b+c,a[5],a[4]),t[b+c+1]=a[5],t[b+c+2]=a[5],d(b+(c<<1),a[5],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?t[b+(c<<1)+2]=a[5]:u(b+(c<<1)+2,a[5],a[6],a[8]);break;}case 255:{v(a[4],a[2])?t[b]=a[5]:u(b,a[5],a[4],a[2]),t[b+1]=a[5],v(a[2],a[6])?t[b+2]=a[5]:u(b+2,a[5],a[2],a[6]),t[b+c]=a[5],t[b+c+1]=a[5],t[b+c+2]=a[5],v(a[8],a[4])?t[b+(c<<1)]=a[5]:u(b+(c<<1),a[5],a[8],a[4]),t[b+(c<<1)+1]=a[5],v(a[6],a[8])?t[b+(c<<1)+2]=a[5]:u(b+(c<<1)+2,a[5],a[6],a[8]);break;}}A++,b+=3;}b+=c<<1;}};var D=function a(H,V){var I,J,G,K,L,a=[],c=H<<2,b=0,E=0;var C=o,M=f,P=k,w=p,B=q,v=r,A=s,z=t,D=u,d=x,F=g,y=e,Q=h,R=i,S=j,W=l,X=m,Y=n,N,O;for(J=0;J<V;J++){for(K=J>0?-H:0,L=J<V-1?H:0,I=0;I<H;I++){a[2]=F[E+K],a[5]=F[E],a[8]=F[E+L],I>0?(a[1]=F[E+K-1],a[4]=F[E-1],a[7]=F[E+L-1]):(a[1]=a[2],a[4]=a[5],a[7]=a[8]),I<H-1?(a[3]=F[E+K+1],a[6]=F[E+1],a[9]=F[E+L+1]):(a[3]=a[2],a[6]=a[5],a[9]=a[8]);var T=0;var U=1;for(N=P(a[5]),G=1;G<10;G++){if(G===5)continue;a[G]!==a[5]&&(O=P(a[G]),(M.abs((N&Q)-(O&Q))>W||M.abs((N&R)-(O&R))>X||M.abs((N&S)-(O&S))>Y)&&(T|=U)),U<<=1;}switch(T){case 0:case 1:case 4:case 32:case 128:case 5:case 132:case 160:case 33:case 129:case 36:case 133:case 164:case 161:case 37:case 165:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 2:case 34:case 130:case 162:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 16:case 17:case 48:case 49:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 64:case 65:case 68:case 69:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 8:case 12:case 136:case 140:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 3:case 35:case 131:case 163:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 6:case 38:case 134:case 166:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 20:case 21:case 52:case 53:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 144:case 145:case 176:case 177:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 192:case 193:case 196:case 197:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 96:case 97:case 100:case 101:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 40:case 44:case 168:case 172:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 9:case 13:case 137:case 141:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 18:case 50:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),y[b+c+2]=a[5],A(b+c+3,a[6],a[5])),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 80:case 81:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(y[b+(c<<1)+2]=a[5],A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6])),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 72:case 76:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(A(b+(c<<1),a[4],a[5]),y[b+(c<<1)+1]=a[5],A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 10:case 138:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5]),y[b+c+1]=a[5]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 66:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 24:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 7:case 39:case 135:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 148:case 149:case 180:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 224:case 228:case 225:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 41:case 169:case 45:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 22:case 54:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),y[b+c+2]=a[5],z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 208:case 209:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6])),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 104:case 108:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 11:case 139:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),y[b+c+1]=a[5],v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 19:case 51:{C(a[2],a[6])?(d(b,a[5],a[4]),v(b+1,a[5],a[4]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(w(b,a[5],a[2]),w(b+1,a[2],a[5]),d(b+2,a[2],a[6]),A(b+3,a[2],a[6]),D(b+c+2,a[5],a[6],a[2]),B(b+c+3,a[6],a[5],a[2])),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 146:case 178:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3+3,a[5],a[8])):(B(b+2,a[2],a[5],a[6]),A(b+3,a[2],a[6]),D(b+c+2,a[5],a[6],a[2]),d(b+c+3,a[6],a[2]),w(b+(c<<1)+3,a[6],a[5]),w(b+c*3+3,a[5],a[6])),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),v(b+(c<<1)+2,a[5],a[8]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),d(b+c*3+2,a[5],a[8]);break;}case 84:case 85:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),d(b+2,a[5],a[2]),C(a[6],a[8])?(d(b+3,a[5],a[2]),v(b+c+3,a[5],a[2]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(w(b+3,a[5],a[6]),w(b+c+3,a[6],a[5]),D(b+(c<<1)+2,a[5],a[6],a[8]),d(b+(c<<1)+3,a[6],a[8]),B(b+c*3+2,a[8],a[5],a[6]),A(b+c*3+3,a[8],a[6])),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),v(b+c+2,a[5],a[2]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 112:case 113:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(D(b+(c<<1)+2,a[5],a[6],a[8]),B(b+(c<<1)+3,a[6],a[5],a[8]),w(b+c*3,a[5],a[8]),w(b+c*3+1,a[8],a[5]),d(b+c*3+2,a[8],a[6]),A(b+c*3+3,a[8],a[6]));break;}case 200:case 204:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6])):(B(b+(c<<1),a[4],a[5],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),A(b+c*3,a[8],a[4]),d(b+c*3+1,a[8],a[4]),w(b+c*3+2,a[8],a[5]),w(b+c*3+3,a[5],a[8])),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]);break;}case 73:case 77:{C(a[8],a[4])?(d(b,a[5],a[2]),v(b+c,a[5],a[2]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(w(b,a[5],a[4]),w(b+c,a[4],a[5]),d(b+(c<<1),a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),A(b+c*3,a[8],a[4]),B(b+c*3+1,a[8],a[5],a[4])),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),v(b+c+1,a[5],a[2]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 42:case 170:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+(c<<1),a[5],a[8]),d(b+c*3,a[5],a[8])):(A(b,a[2],a[4]),B(b+1,a[2],a[5],a[4]),d(b+c,a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),w(b+(c<<1),a[4],a[5]),w(b+c*3,a[5],a[4])),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),v(b+(c<<1)+1,a[5],a[8]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 14:case 142:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(A(b,a[2],a[4]),d(b+1,a[2],a[4]),w(b+2,a[2],a[5]),w(b+3,a[5],a[2]),B(b+c,a[4],a[5],a[2]),D(b+c+1,a[5],a[4],a[2])),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 67:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 70:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 28:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 152:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 194:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 98:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 56:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 25:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 26:case 31:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),y[b+c+1]=a[5],y[b+c+2]=a[5],w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 82:case 214:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),y[b+c+2]=a[5],z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6])),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 88:case 248:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6]));break;}case 74:case 107:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),y[b+c+1]=a[5],v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 27:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),y[b+c+1]=a[5],v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 86:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),y[b+c+2]=a[5],z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 216:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6])),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 106:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 30:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),y[b+c+2]=a[5],w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 210:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6])),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 120:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 75:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),y[b+c+1]=a[5],v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 29:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 198:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 184:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 99:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 57:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 71:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 156:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 226:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 60:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 195:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 102:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 153:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 58:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(B(b,a[5],a[2],a[4]),w(b+1,a[5],a[2]),w(b+c,a[5],a[4]),y[b+c+1]=a[5]),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(w(b+2,a[5],a[2]),B(b+3,a[5],a[2],a[6]),y[b+c+2]=a[5],w(b+c+3,a[5],a[6])),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 83:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(w(b+2,a[5],a[2]),B(b+3,a[5],a[2],a[6]),y[b+c+2]=a[5],w(b+c+3,a[5],a[6])),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(y[b+(c<<1)+2]=a[5],w(b+(c<<1)+3,a[5],a[6]),w(b+c*3+2,a[5],a[8]),B(b+c*3+3,a[5],a[8],a[6])),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 92:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(w(b+(c<<1),a[5],a[4]),y[b+(c<<1)+1]=a[5],B(b+c*3,a[5],a[8],a[4]),w(b+c*3+1,a[5],a[8])),C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(y[b+(c<<1)+2]=a[5],w(b+(c<<1)+3,a[5],a[6]),w(b+c*3+2,a[5],a[8]),B(b+c*3+3,a[5],a[8],a[6]));break;}case 202:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(B(b,a[5],a[2],a[4]),w(b+1,a[5],a[2]),w(b+c,a[5],a[4]),y[b+c+1]=a[5]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(w(b+(c<<1),a[5],a[4]),y[b+(c<<1)+1]=a[5],B(b+c*3,a[5],a[8],a[4]),w(b+c*3+1,a[5],a[8])),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 78:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(B(b,a[5],a[2],a[4]),w(b+1,a[5],a[2]),w(b+c,a[5],a[4]),y[b+c+1]=a[5]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(w(b+(c<<1),a[5],a[4]),y[b+(c<<1)+1]=a[5],B(b+c*3,a[5],a[8],a[4]),w(b+c*3+1,a[5],a[8])),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 154:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(B(b,a[5],a[2],a[4]),w(b+1,a[5],a[2]),w(b+c,a[5],a[4]),y[b+c+1]=a[5]),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(w(b+2,a[5],a[2]),B(b+3,a[5],a[2],a[6]),y[b+c+2]=a[5],w(b+c+3,a[5],a[6])),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 114:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(w(b+2,a[5],a[2]),B(b+3,a[5],a[2],a[6]),y[b+c+2]=a[5],w(b+c+3,a[5],a[6])),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(y[b+(c<<1)+2]=a[5],w(b+(c<<1)+3,a[5],a[6]),w(b+c*3+2,a[5],a[8]),B(b+c*3+3,a[5],a[8],a[6])),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]);break;}case 89:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(w(b+(c<<1),a[5],a[4]),y[b+(c<<1)+1]=a[5],B(b+c*3,a[5],a[8],a[4]),w(b+c*3+1,a[5],a[8])),C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(y[b+(c<<1)+2]=a[5],w(b+(c<<1)+3,a[5],a[6]),w(b+c*3+2,a[5],a[8]),B(b+c*3+3,a[5],a[8],a[6]));break;}case 90:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(B(b,a[5],a[2],a[4]),w(b+1,a[5],a[2]),w(b+c,a[5],a[4]),y[b+c+1]=a[5]),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(w(b+2,a[5],a[2]),B(b+3,a[5],a[2],a[6]),y[b+c+2]=a[5],w(b+c+3,a[5],a[6])),C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(w(b+(c<<1),a[5],a[4]),y[b+(c<<1)+1]=a[5],B(b+c*3,a[5],a[8],a[4]),w(b+c*3+1,a[5],a[8])),C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(y[b+(c<<1)+2]=a[5],w(b+(c<<1)+3,a[5],a[6]),w(b+c*3+2,a[5],a[8]),B(b+c*3+3,a[5],a[8],a[6]));break;}case 55:case 23:{C(a[2],a[6])?(d(b,a[5],a[4]),v(b+1,a[5],a[4]),y[b+2]=a[5],y[b+3]=a[5],y[b+c+2]=a[5],y[b+c+3]=a[5]):(w(b,a[5],a[2]),w(b+1,a[2],a[5]),d(b+2,a[2],a[6]),A(b+3,a[2],a[6]),D(b+c+2,a[5],a[6],a[2]),B(b+c+3,a[6],a[5],a[2])),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 182:case 150:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+2]=a[5],y[b+c+3]=a[5],v(b+(c<<1)+3,a[5],a[8]),d(b+c*3+3,a[5],a[8])):(B(b+2,a[2],a[5],a[6]),A(b+3,a[2],a[6]),D(b+c+2,a[5],a[6],a[2]),d(b+c+3,a[6],a[2]),w(b+(c<<1)+3,a[6],a[5]),w(b+c*3+3,a[5],a[6])),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),v(b+(c<<1)+2,a[5],a[8]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),d(b+c*3+2,a[5],a[8]);break;}case 213:case 212:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),d(b+2,a[5],a[2]),C(a[6],a[8])?(d(b+3,a[5],a[2]),v(b+c+3,a[5],a[2]),y[b+(c<<1)+2]=a[5],y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(w(b+3,a[5],a[6]),w(b+c+3,a[6],a[5]),D(b+(c<<1)+2,a[5],a[6],a[8]),d(b+(c<<1)+3,a[6],a[8]),B(b+c*3+2,a[8],a[5],a[6]),A(b+c*3+3,a[8],a[6])),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),v(b+c+2,a[5],a[2]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 241:case 240:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),C(a[6],a[8])?(y[b+(c<<1)+2]=a[5],y[b+(c<<1)+3]=a[5],d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(D(b+(c<<1)+2,a[5],a[6],a[8]),B(b+(c<<1)+3,a[6],a[5],a[8]),w(b+c*3,a[5],a[8]),w(b+c*3+1,a[8],a[5]),d(b+c*3+2,a[8],a[6]),A(b+c*3+3,a[8],a[6]));break;}case 236:case 232:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+(c<<1)+1]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5],v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6])):(B(b+(c<<1),a[4],a[5],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),A(b+c*3,a[8],a[4]),d(b+c*3+1,a[8],a[4]),w(b+c*3+2,a[8],a[5]),w(b+c*3+3,a[5],a[8])),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]);break;}case 109:case 105:{C(a[8],a[4])?(d(b,a[5],a[2]),v(b+c,a[5],a[2]),y[b+(c<<1)]=a[5],y[b+(c<<1)+1]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(w(b,a[5],a[4]),w(b+c,a[4],a[5]),d(b+(c<<1),a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),A(b+c*3,a[8],a[4]),B(b+c*3+1,a[8],a[5],a[4])),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),v(b+c+1,a[5],a[2]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 171:case 43:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5],y[b+c+1]=a[5],v(b+(c<<1),a[5],a[8]),d(b+c*3,a[5],a[8])):(A(b,a[2],a[4]),B(b+1,a[2],a[5],a[4]),d(b+c,a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),w(b+(c<<1),a[4],a[5]),w(b+c*3,a[5],a[4])),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),v(b+(c<<1)+1,a[5],a[8]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 143:case 15:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),y[b+c]=a[5],y[b+c+1]=a[5]):(A(b,a[2],a[4]),d(b+1,a[2],a[4]),w(b+2,a[2],a[5]),w(b+3,a[5],a[2]),B(b+c,a[4],a[5],a[2]),D(b+c+1,a[5],a[4],a[2])),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 124:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 203:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),y[b+c+1]=a[5],v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 62:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),y[b+c+2]=a[5],v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 211:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6])),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 118:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),y[b+c+2]=a[5],d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 217:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6])),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 110:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 155:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),y[b+c+1]=a[5],v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 188:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 185:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 61:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 157:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 103:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 227:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 230:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 199:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 220:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(w(b+(c<<1),a[5],a[4]),y[b+(c<<1)+1]=a[5],B(b+c*3,a[5],a[8],a[4]),w(b+c*3+1,a[5],a[8])),y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6]));break;}case 158:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(B(b,a[5],a[2],a[4]),w(b+1,a[5],a[2]),w(b+c,a[5],a[4]),y[b+c+1]=a[5]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),y[b+c+2]=a[5],w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 234:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(B(b,a[5],a[2],a[4]),w(b+1,a[5],a[2]),w(b+c,a[5],a[4]),y[b+c+1]=a[5]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 242:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(w(b+2,a[5],a[2]),B(b+3,a[5],a[2],a[6]),y[b+c+2]=a[5],w(b+c+3,a[5],a[6])),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6])),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]);break;}case 59:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(w(b+2,a[5],a[2]),B(b+3,a[5],a[2],a[6]),y[b+c+2]=a[5],w(b+c+3,a[5],a[6])),y[b+c+1]=a[5],v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 121:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(y[b+(c<<1)+2]=a[5],w(b+(c<<1)+3,a[5],a[6]),w(b+c*3+2,a[5],a[8]),B(b+c*3+3,a[5],a[8],a[6]));break;}case 87:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),y[b+c+2]=a[5],z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(y[b+(c<<1)+2]=a[5],w(b+(c<<1)+3,a[5],a[6]),w(b+c*3+2,a[5],a[8]),B(b+c*3+3,a[5],a[8],a[6])),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 79:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),y[b+c+1]=a[5],v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(w(b+(c<<1),a[5],a[4]),y[b+(c<<1)+1]=a[5],B(b+c*3,a[5],a[8],a[4]),w(b+c*3+1,a[5],a[8])),v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 122:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(B(b,a[5],a[2],a[4]),w(b+1,a[5],a[2]),w(b+c,a[5],a[4]),y[b+c+1]=a[5]),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(w(b+2,a[5],a[2]),B(b+3,a[5],a[2],a[6]),y[b+c+2]=a[5],w(b+c+3,a[5],a[6])),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(y[b+(c<<1)+2]=a[5],w(b+(c<<1)+3,a[5],a[6]),w(b+c*3+2,a[5],a[8]),B(b+c*3+3,a[5],a[8],a[6]));break;}case 94:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(B(b,a[5],a[2],a[4]),w(b+1,a[5],a[2]),w(b+c,a[5],a[4]),y[b+c+1]=a[5]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),y[b+c+2]=a[5],C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(w(b+(c<<1),a[5],a[4]),y[b+(c<<1)+1]=a[5],B(b+c*3,a[5],a[8],a[4]),w(b+c*3+1,a[5],a[8])),C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(y[b+(c<<1)+2]=a[5],w(b+(c<<1)+3,a[5],a[6]),w(b+c*3+2,a[5],a[8]),B(b+c*3+3,a[5],a[8],a[6]));break;}case 218:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(B(b,a[5],a[2],a[4]),w(b+1,a[5],a[2]),w(b+c,a[5],a[4]),y[b+c+1]=a[5]),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(w(b+2,a[5],a[2]),B(b+3,a[5],a[2],a[6]),y[b+c+2]=a[5],w(b+c+3,a[5],a[6])),C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(w(b+(c<<1),a[5],a[4]),y[b+(c<<1)+1]=a[5],B(b+c*3,a[5],a[8],a[4]),w(b+c*3+1,a[5],a[8])),y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6]));break;}case 91:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(w(b+2,a[5],a[2]),B(b+3,a[5],a[2],a[6]),y[b+c+2]=a[5],w(b+c+3,a[5],a[6])),y[b+c+1]=a[5],C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(w(b+(c<<1),a[5],a[4]),y[b+(c<<1)+1]=a[5],B(b+c*3,a[5],a[8],a[4]),w(b+c*3+1,a[5],a[8])),C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(y[b+(c<<1)+2]=a[5],w(b+(c<<1)+3,a[5],a[6]),w(b+c*3+2,a[5],a[8]),B(b+c*3+3,a[5],a[8],a[6]));break;}case 229:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 167:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 173:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 181:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 186:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(B(b,a[5],a[2],a[4]),w(b+1,a[5],a[2]),w(b+c,a[5],a[4]),y[b+c+1]=a[5]),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(w(b+2,a[5],a[2]),B(b+3,a[5],a[2],a[6]),y[b+c+2]=a[5],w(b+c+3,a[5],a[6])),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 115:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(w(b+2,a[5],a[2]),B(b+3,a[5],a[2],a[6]),y[b+c+2]=a[5],w(b+c+3,a[5],a[6])),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(y[b+(c<<1)+2]=a[5],w(b+(c<<1)+3,a[5],a[6]),w(b+c*3+2,a[5],a[8]),B(b+c*3+3,a[5],a[8],a[6])),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]);break;}case 93:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(w(b+(c<<1),a[5],a[4]),y[b+(c<<1)+1]=a[5],B(b+c*3,a[5],a[8],a[4]),w(b+c*3+1,a[5],a[8])),C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(y[b+(c<<1)+2]=a[5],w(b+(c<<1)+3,a[5],a[6]),w(b+c*3+2,a[5],a[8]),B(b+c*3+3,a[5],a[8],a[6]));break;}case 206:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(B(b,a[5],a[2],a[4]),w(b+1,a[5],a[2]),w(b+c,a[5],a[4]),y[b+c+1]=a[5]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(w(b+(c<<1),a[5],a[4]),y[b+(c<<1)+1]=a[5],B(b+c*3,a[5],a[8],a[4]),w(b+c*3+1,a[5],a[8])),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 205:case 201:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),C(a[8],a[4])?(w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7])):(w(b+(c<<1),a[5],a[4]),y[b+(c<<1)+1]=a[5],B(b+c*3,a[5],a[8],a[4]),w(b+c*3+1,a[5],a[8])),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 174:case 46:{C(a[4],a[2])?(d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1])):(B(b,a[5],a[2],a[4]),w(b+1,a[5],a[2]),w(b+c,a[5],a[4]),y[b+c+1]=a[5]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 179:case 147:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),C(a[2],a[6])?(w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3])):(w(b+2,a[5],a[2]),B(b+3,a[5],a[2],a[6]),y[b+c+2]=a[5],w(b+c+3,a[5],a[6])),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 117:case 116:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),C(a[6],a[8])?(v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9])):(y[b+(c<<1)+2]=a[5],w(b+(c<<1)+3,a[5],a[6]),w(b+c*3+2,a[5],a[8]),B(b+c*3+3,a[5],a[8],a[6])),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]);break;}case 189:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 231:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 126:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),y[b+c+2]=a[5],C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 219:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),y[b+c+1]=a[5],v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6])),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 125:{C(a[8],a[4])?(d(b,a[5],a[2]),v(b+c,a[5],a[2]),y[b+(c<<1)]=a[5],y[b+(c<<1)+1]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(w(b,a[5],a[4]),w(b+c,a[4],a[5]),d(b+(c<<1),a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),A(b+c*3,a[8],a[4]),B(b+c*3+1,a[8],a[5],a[4])),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 221:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),C(a[6],a[8])?(d(b+3,a[5],a[2]),v(b+c+3,a[5],a[2]),y[b+(c<<1)+2]=a[5],y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(w(b+3,a[5],a[6]),w(b+c+3,a[6],a[5]),D(b+(c<<1)+2,a[5],a[6],a[8]),d(b+(c<<1)+3,a[6],a[8]),B(b+c*3+2,a[8],a[5],a[6]),A(b+c*3+3,a[8],a[6])),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[2]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 207:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),y[b+c]=a[5],y[b+c+1]=a[5]):(A(b,a[2],a[4]),d(b+1,a[2],a[4]),w(b+2,a[2],a[5]),w(b+3,a[5],a[2]),B(b+c,a[4],a[5],a[2]),D(b+c+1,a[5],a[4],a[2])),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 238:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+(c<<1)+1]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5],v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6])):(B(b+(c<<1),a[4],a[5],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),A(b+c*3,a[8],a[4]),d(b+c*3+1,a[8],a[4]),w(b+c*3+2,a[8],a[5]),w(b+c*3+3,a[5],a[8])),v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]);break;}case 190:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+2]=a[5],y[b+c+3]=a[5],v(b+(c<<1)+3,a[5],a[8]),d(b+c*3+3,a[5],a[8])):(B(b+2,a[2],a[5],a[6]),A(b+3,a[2],a[6]),D(b+c+2,a[5],a[6],a[2]),d(b+c+3,a[6],a[2]),w(b+(c<<1)+3,a[6],a[5]),w(b+c*3+3,a[5],a[6])),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[8]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),d(b+c*3+2,a[5],a[8]);break;}case 187:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5],y[b+c+1]=a[5],v(b+(c<<1),a[5],a[8]),d(b+c*3,a[5],a[8])):(A(b,a[2],a[4]),B(b+1,a[2],a[5],a[4]),d(b+c,a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),w(b+(c<<1),a[4],a[5]),w(b+c*3,a[5],a[4])),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 243:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),C(a[6],a[8])?(y[b+(c<<1)+2]=a[5],y[b+(c<<1)+3]=a[5],d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(D(b+(c<<1)+2,a[5],a[6],a[8]),B(b+(c<<1)+3,a[6],a[5],a[8]),w(b+c*3,a[5],a[8]),w(b+c*3+1,a[8],a[5]),d(b+c*3+2,a[8],a[6]),A(b+c*3+3,a[8],a[6]));break;}case 119:{C(a[2],a[6])?(d(b,a[5],a[4]),v(b+1,a[5],a[4]),y[b+2]=a[5],y[b+3]=a[5],y[b+c+2]=a[5],y[b+c+3]=a[5]):(w(b,a[5],a[2]),w(b+1,a[2],a[5]),d(b+2,a[2],a[6]),A(b+3,a[2],a[6]),D(b+c+2,a[5],a[6],a[2]),B(b+c+3,a[6],a[5],a[2])),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 237:case 233:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[6]),B(b+3,a[5],a[2],a[6]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),D(b+c+2,a[5],a[6],a[2]),z(b+c+3,a[5],a[6],a[2]),y[b+(c<<1)]=a[5],y[b+(c<<1)+1]=a[5],v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),C(a[8],a[4])?y[b+c*3]=a[5]:B(b+c*3,a[5],a[8],a[4]),y[b+c*3+1]=a[5],v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 175:case 47:{C(a[4],a[2])?y[b]=a[5]:B(b,a[5],a[2],a[4]),y[b+1]=a[5],v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),y[b+c]=a[5],y[b+c+1]=a[5],v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),D(b+(c<<1)+2,a[5],a[6],a[8]),z(b+(c<<1)+3,a[5],a[6],a[8]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[6]),B(b+c*3+3,a[5],a[8],a[6]);break;}case 183:case 151:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),y[b+2]=a[5],C(a[2],a[6])?y[b+3]=a[5]:B(b+3,a[5],a[2],a[6]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),y[b+c+2]=a[5],y[b+c+3]=a[5],z(b+(c<<1),a[5],a[4],a[8]),D(b+(c<<1)+1,a[5],a[4],a[8]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),B(b+c*3,a[5],a[8],a[4]),z(b+c*3+1,a[5],a[8],a[4]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 245:case 244:{B(b,a[5],a[2],a[4]),z(b+1,a[5],a[2],a[4]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),z(b+c,a[5],a[4],a[2]),D(b+c+1,a[5],a[4],a[2]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),y[b+(c<<1)+2]=a[5],y[b+(c<<1)+3]=a[5],d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),y[b+c*3+2]=a[5],C(a[6],a[8])?y[b+c*3+3]=a[5]:B(b+c*3+3,a[5],a[8],a[6]);break;}case 250:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6]));break;}case 123:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),y[b+c+1]=a[5],v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 95:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),y[b+c+1]=a[5],y[b+c+2]=a[5],w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 222:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),y[b+c+2]=a[5],w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6])),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 252:{d(b,a[5],a[1]),z(b+1,a[5],a[2],a[1]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],y[b+(c<<1)+2]=a[5],y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],C(a[6],a[8])?y[b+c*3+3]=a[5]:B(b+c*3+3,a[5],a[8],a[6]);break;}case 249:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),z(b+2,a[5],a[2],a[3]),d(b+3,a[5],a[3]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),y[b+(c<<1)]=a[5],y[b+(c<<1)+1]=a[5],y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6])),C(a[8],a[4])?y[b+c*3]=a[5]:B(b+c*3,a[5],a[8],a[4]),y[b+c*3+1]=a[5];break;}case 235:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),y[b+c+1]=a[5],v(b+c+2,a[5],a[3]),z(b+c+3,a[5],a[6],a[3]),y[b+(c<<1)]=a[5],y[b+(c<<1)+1]=a[5],v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),C(a[8],a[4])?y[b+c*3]=a[5]:B(b+c*3,a[5],a[8],a[4]),y[b+c*3+1]=a[5],v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 111:{C(a[4],a[2])?y[b]=a[5]:B(b,a[5],a[2],a[4]),y[b+1]=a[5],v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),y[b+c]=a[5],y[b+c+1]=a[5],v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],v(b+(c<<1)+2,a[5],a[9]),z(b+(c<<1)+3,a[5],a[6],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 63:{C(a[4],a[2])?y[b]=a[5]:B(b,a[5],a[2],a[4]),y[b+1]=a[5],C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),y[b+c]=a[5],y[b+c+1]=a[5],y[b+c+2]=a[5],v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),z(b+c*3+2,a[5],a[8],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 159:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),y[b+2]=a[5],C(a[2],a[6])?y[b+3]=a[5]:B(b+3,a[5],a[2],a[6]),y[b+c+1]=a[5],y[b+c+2]=a[5],y[b+c+3]=a[5],w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3,a[5],a[7]),z(b+c*3+1,a[5],a[8],a[7]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 215:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),y[b+2]=a[5],C(a[2],a[6])?y[b+3]=a[5]:B(b+3,a[5],a[2],a[6]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),y[b+c+2]=a[5],y[b+c+3]=a[5],z(b+(c<<1),a[5],a[4],a[7]),v(b+(c<<1)+1,a[5],a[7]),y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6])),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 246:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),z(b+c,a[5],a[4],a[1]),v(b+c+1,a[5],a[1]),y[b+c+2]=a[5],d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),y[b+(c<<1)+2]=a[5],y[b+(c<<1)+3]=a[5],d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),y[b+c*3+2]=a[5],C(a[6],a[8])?y[b+c*3+3]=a[5]:B(b+c*3+3,a[5],a[8],a[6]);break;}case 254:{d(b,a[5],a[1]),w(b+1,a[5],a[1]),C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),w(b+c,a[5],a[1]),v(b+c+1,a[5],a[1]),y[b+c+2]=a[5],C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],y[b+(c<<1)+2]=a[5],y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],C(a[6],a[8])?y[b+c*3+3]=a[5]:B(b+c*3+3,a[5],a[8],a[6]);break;}case 253:{d(b,a[5],a[2]),d(b+1,a[5],a[2]),d(b+2,a[5],a[2]),d(b+3,a[5],a[2]),v(b+c,a[5],a[2]),v(b+c+1,a[5],a[2]),v(b+c+2,a[5],a[2]),v(b+c+3,a[5],a[2]),y[b+(c<<1)]=a[5],y[b+(c<<1)+1]=a[5],y[b+(c<<1)+2]=a[5],y[b+(c<<1)+3]=a[5],C(a[8],a[4])?y[b+c*3]=a[5]:B(b+c*3,a[5],a[8],a[4]),y[b+c*3+1]=a[5],y[b+c*3+2]=a[5],C(a[6],a[8])?y[b+c*3+3]=a[5]:B(b+c*3+3,a[5],a[8],a[6]);break;}case 251:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),w(b+2,a[5],a[3]),d(b+3,a[5],a[3]),y[b+c+1]=a[5],v(b+c+2,a[5],a[3]),w(b+c+3,a[5],a[3]),y[b+(c<<1)]=a[5],y[b+(c<<1)+1]=a[5],y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6])),C(a[8],a[4])?y[b+c*3]=a[5]:B(b+c*3,a[5],a[8],a[4]),y[b+c*3+1]=a[5];break;}case 239:{C(a[4],a[2])?y[b]=a[5]:B(b,a[5],a[2],a[4]),y[b+1]=a[5],v(b+2,a[5],a[6]),d(b+3,a[5],a[6]),y[b+c]=a[5],y[b+c+1]=a[5],v(b+c+2,a[5],a[6]),d(b+c+3,a[5],a[6]),y[b+(c<<1)]=a[5],y[b+(c<<1)+1]=a[5],v(b+(c<<1)+2,a[5],a[6]),d(b+(c<<1)+3,a[5],a[6]),C(a[8],a[4])?y[b+c*3]=a[5]:B(b+c*3,a[5],a[8],a[4]),y[b+c*3+1]=a[5],v(b+c*3+2,a[5],a[6]),d(b+c*3+3,a[5],a[6]);break;}case 127:{C(a[4],a[2])?y[b]=a[5]:B(b,a[5],a[2],a[4]),y[b+1]=a[5],C(a[2],a[6])?(y[b+2]=a[5],y[b+3]=a[5],y[b+c+3]=a[5]):(A(b+2,a[2],a[5]),A(b+3,a[2],a[6]),A(b+c+3,a[6],a[5])),y[b+c]=a[5],y[b+c+1]=a[5],y[b+c+2]=a[5],C(a[8],a[4])?(y[b+(c<<1)]=a[5],y[b+c*3]=a[5],y[b+c*3+1]=a[5]):(A(b+(c<<1),a[4],a[5]),A(b+c*3,a[8],a[4]),A(b+c*3+1,a[8],a[5])),y[b+(c<<1)+1]=a[5],v(b+(c<<1)+2,a[5],a[9]),w(b+(c<<1)+3,a[5],a[9]),w(b+c*3+2,a[5],a[9]),d(b+c*3+3,a[5],a[9]);break;}case 191:{C(a[4],a[2])?y[b]=a[5]:B(b,a[5],a[2],a[4]),y[b+1]=a[5],y[b+2]=a[5],C(a[2],a[6])?y[b+3]=a[5]:B(b+3,a[5],a[2],a[6]),y[b+c]=a[5],y[b+c+1]=a[5],y[b+c+2]=a[5],y[b+c+3]=a[5],v(b+(c<<1),a[5],a[8]),v(b+(c<<1)+1,a[5],a[8]),v(b+(c<<1)+2,a[5],a[8]),v(b+(c<<1)+3,a[5],a[8]),d(b+c*3,a[5],a[8]),d(b+c*3+1,a[5],a[8]),d(b+c*3+2,a[5],a[8]),d(b+c*3+3,a[5],a[8]);break;}case 223:{C(a[4],a[2])?(y[b]=a[5],y[b+1]=a[5],y[b+c]=a[5]):(A(b,a[2],a[4]),A(b+1,a[2],a[5]),A(b+c,a[4],a[5])),y[b+2]=a[5],C(a[2],a[6])?y[b+3]=a[5]:B(b+3,a[5],a[2],a[6]),y[b+c+1]=a[5],y[b+c+2]=a[5],y[b+c+3]=a[5],w(b+(c<<1),a[5],a[7]),v(b+(c<<1)+1,a[5],a[7]),y[b+(c<<1)+2]=a[5],C(a[6],a[8])?(y[b+(c<<1)+3]=a[5],y[b+c*3+2]=a[5],y[b+c*3+3]=a[5]):(A(b+(c<<1)+3,a[6],a[5]),A(b+c*3+2,a[8],a[5]),A(b+c*3+3,a[8],a[6])),d(b+c*3,a[5],a[7]),w(b+c*3+1,a[5],a[7]);break;}case 247:{d(b,a[5],a[4]),v(b+1,a[5],a[4]),y[b+2]=a[5],C(a[2],a[6])?y[b+3]=a[5]:B(b+3,a[5],a[2],a[6]),d(b+c,a[5],a[4]),v(b+c+1,a[5],a[4]),y[b+c+2]=a[5],y[b+c+3]=a[5],d(b+(c<<1),a[5],a[4]),v(b+(c<<1)+1,a[5],a[4]),y[b+(c<<1)+2]=a[5],y[b+(c<<1)+3]=a[5],d(b+c*3,a[5],a[4]),v(b+c*3+1,a[5],a[4]),y[b+c*3+2]=a[5],C(a[6],a[8])?y[b+c*3+3]=a[5]:B(b+c*3+3,a[5],a[8],a[6]);break;}case 255:{C(a[4],a[2])?y[b]=a[5]:B(b,a[5],a[2],a[4]),y[b+1]=a[5],y[b+2]=a[5],C(a[2],a[6])?y[b+3]=a[5]:B(b+3,a[5],a[2],a[6]),y[b+c]=a[5],y[b+c+1]=a[5],y[b+c+2]=a[5],y[b+c+3]=a[5],y[b+(c<<1)]=a[5],y[b+(c<<1)+1]=a[5],y[b+(c<<1)+2]=a[5],y[b+(c<<1)+3]=a[5],C(a[8],a[4])?y[b+c*3]=a[5]:B(b+c*3,a[5],a[8],a[4]),y[b+c*3+1]=a[5],y[b+c*3+2]=a[5],C(a[6],a[8])?y[b+c*3+3]=a[5]:B(b+c*3+3,a[5],a[8],a[6]);break;}}E++,b+=4;}b+=c*3;}};try{E(A(a,b));}catch(e){reject(null);}});};

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