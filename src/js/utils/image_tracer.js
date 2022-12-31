/*
	image_tracer.js version 1.2.6
	Simple raster image tracer and vectorizer written in JavaScript.
	andras@jankovics.net
*/

/*

The Unlicense / PUBLIC DOMAIN

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to http://unlicense.org/

*/


import bltf from "./b64lz_to_function";
window.image_tracer_process_function = bltf(`RzRRd1RnQkFaZ3JndkNBemdUd0hZR05vd3dGd0pZRDJxQUZEZ0RRQ21BbEFONWdVNHhpb1NvVUR1RUFDbUFRTFo1RUZZc1ZpNUNKVkdUQzBBUkRDRVJFT01IblE1WkFiaFhJYUpZbTA1ajFFNHJWQ1FjY0hBQXRCMnU0Z0Iwd0NtRVFUVU1QZ0NNM2NXUUJHSndBbUp3QTJXVEpiUVNjOFBoQUFjd29BRlFJQVpRQTFBSEU0WTN3aVlnb3lLUms2YXlkMEd3cDBBR3NDQUFjQzFFUmlHV2luQUJzQ0VBQVRBRWtFNUtLeVVXd1RRdW85VWppaGlsNlFIQkEwck95WjVKeEJ4SVdsb3FwcEtpb0FYMzJaSStqSFdhVDV4ZVdNbkx6eDVwSFVXbFFLcXByNnBvbFcxODBMQkF3QlY0dGNkbmNVbUFRT2dicnRpdjk2SXhtQkFjRTROb2hnSWxsS3BVSWsyaVZqaGRZcURrbWxJZERZU0JIdUpKaVVEdVZVWjg2bzFtcTEycWp1bjFCdGNSbU1hU1FwaVJVU1RLV1NvVER3ZXNHRnRKZFFEc2RUb1NZczRSZUN4UlR3ZFNKZ0tDWG9QdFZtVDhpSDhxQUR3RUNQZ1J1bUFBSTR3RUNvZkFBTDBXcG5ocHJ3VUdJQUFZNEg3VUYwUU1nM0hoY1ZRb0FRd01SQVlnNERST2tHM0lnQUZ3QWJRQXVtUUdpQk9nd2NCUmsyQW5ObmN6aDgyUjJIaGVyWkMwNXdGRGtLbnZlbXVoUmNiWUFMUWhNalZQQ0pHdzRXdjFvT3Q5czJMdm5BaHdiMmFBZ0FIaUxKYnpGRkhpVnNzNEExQnZ6T2FxYWlmSXNxaW9LZG5iSzFoWTYzS2dDTDBLT2ZpNHNiSWgwQTZaZ25nemlzZm1HdmlDUHNBNmVOajhIZ09EL3YrWFFxSGVKUk9EYWtHSUthemp2a214WUtEWXhBZ01jRkNkRUlOQ0FuZ0ZSSVorYlNtZ0doSG9FUVN5aGlHdlFBR1EwYWl2UlF1d0FBeWlidU1RZUFkSWdEUTFFdVpid2s0ejQ1Z0paRVVTQVZHcUwwcHFBcDBGUUhqZ1ZTQVVKSkNjUUJqN0FhQlpEb0hKaDUySmV6QTNuZXhDZEFTbWl4dkdiRXB2dXVuSGpDaEd0T2cwR2RIQjBHd2ZROEZac0ovRzFueDVhVnRXTmpKaXUvbTJEMkZCOWdPUVZPTDIvWTRFY1J5SWt3TENJT2N5cE9DeUVnTk81RERtYmVVQWdEQXpuSmpRNUh1RzJJQStMbXZUSmdBaElFWkRPZTV5YjFXNWQ3Tlo1dGdhY21BQWMwZ1JVc3VLNW0yTmdPakN0WGVscFZxUm9nSUI4QTBuU2hva3liZGw0dmh1QVFVRGtkYUthQk9FWkFDQmdVMWdGQ0JUSmhOVzJSbmFEb0tjZzZDNWltQURNRFZzWXRaMWtOaUJDMUJ3VlkxdlZDMXNGQWVET1c0dFgxVUp1YnRidzJDOU9Sa2E5RHRaREFIZ0hBK0FRQUFlb05rTGV6Nlk1MDZCWlc5TnI0MkFiMlZVd1VLOUhnQ2lrNTBUQzNzNUlETGQ2NXdOQVF5Z2hrNjh5Qk1WRjN1TE44MnZSTnExK0x3bTFIU21JUXMyeithcUp6dlFoTVZ3dnJXTDIzSmdBTEdRWlBIWDBWTXBnQXJPYzZCTU1BeURGWTFiVk9ONmYxVVlEd01relZFMnFMRkRxSkVOcUFqUmdCWjFlY2lBaldBRFRGYTFLYVc5YkFOQXpMb1BuTGVsRlZjVmdGZFk3QkRRN0RZRHc4dERWd2NtVGg2MlFRZFp6blN1aTd6S2JoR3JQdDhBUUJDMlBNeFZheFR1dkpqbld2MDBzeWFsK2NpUU51REJZbGVML1AvVXQ1MUhWZGpyb0xkOTN0WVhHM0Y4bUFEczV5QTJqOHkrVDN4Zjk0TGszV2lQTjEzVzE5VlR5cjAzTGZQMGdPcjAvQXpYTkEvYzczMjNyN2lrL2VDTDAvaXoxNXhRcWc1OThKZkF1NGdydC9UWHZrdGZlVDlsWXozYm1RY0ErQmxCcUJ2bXZLK0c5ZWJiekhydkJHOGNCQ0RnbW5YSFcxTW02MDFUbGhWdXBjTTVOUkRnMUcyNGNRWU94S0tBb3VyOWRydlJVSjliNkFWbHJuQ2dZSWZBNkIvNTV6SWZBMytnOU42WFh0S1BjZWU4YUZyVG9hckRXSDB2b2hVQ3N6U0JZQm9GY0llb0hUT2dRSnJteDJrTFdoTDlWYmRYWWNvemhhZzFicUthcG9raGU5ZEdTUDBVZlloMkRLYTRNMXZnbHVqTVFoNnoycklsaE5aSlpabWxoemVZYWo0d2FOenFFOUJJRW1aOVdkb05DZ3cxUnBleUhuZkJCRDhiSFAwUHU0Wk1UMERxOHhPb1FONlNDUkU3d25rOVJ4RGRTbXVNSWU0aWEzajVGdlgraFFXMkVjNnJTQ1RwL0ZPYWQ2b2xqVEhRTjZnaWZETlc5Qk5keGVzRFprRjZSNG5PUzFKbWEyV3FNeUJjeURicG5pa1Nad1RKdmlzaTFNOEtZc2hzU0xWa0g2SEF5QWVJYlNLSEFDZ0FBZkM1TkFUaDBUT1N1SEFCQm1JRUhZRzRBQXdrZ1lRK3dLQVZBeWtRTEtkNGNxcGdvT21BQS9LaVA1cUFBVkNCd0lnWUY2WmlvbkUwQkdLTWdKM2dBSGtmQUFDc2Fpb2krc2dlOGtMb1U1U2NIbEFxemxUalRrMEdBT2NwRTJ4cmhzTlNyY1ZBVndqVVFPaTlncUFlQ05EY0VjZ3dxWXdEcGlvRmNvb3FaVUFDdlRPbVg1Um9vWFpWaGFTeHA1S2NCaW9sVUs2bERBa29RQW9LbFM0aFRycDRCZE0wTFpicGRTQWpBTzlNZ0JCSUZrRTRpWlJ5Tmd5Q0pEZ0JtTEcwNHN6T3N6UEFZS1AwYkFBQ3BXWGhWaXBvVDBSUlNXM0ZYTFlPY2F0ZlV3Rm9DaTZNNW8rQndFTUJBQUFxcUdIQTNVM2tKam12TUFBZ3RyWkF4Qm8yeHJJRkFLbFVBNXd3R1JjeXZncVpvMVFDbFN1Y0VxWUhxK3NiZnRldDdhTnlCQ2JXR3BZcmJ1MjlzN1EyamNJUSswdHJiVkFNZG1ZNjJqb2VsS3labWhtMjNEZ0h3STQ4YjhJemp3SE9BTi9VeDNCdVpmR3hJcVk4QlNwZFZTR2NJQmQxT0hrUWVrQXpLVDFudFRDQUtWSFpBaklzak1RR3d5YUh5ZEZCV3BUb1owL1MvdjRRUGNGYUkyeHVFV0JRRmVCZ25BSDJMbFFacUlHQXhnY1doQm4rdVk0TUJrUStMU2d5SFVSWWRnMTVmTUlSNE40ZTJnUjZDWlNGQUFENXZSM0orZnVmQkx3bkMwY1FEUnlwRE5EaGFTcGVnV2xsUmg1RkpRZmRUUTZCbVUwQkRlZ0JqNFl2MnlSbkowT2NOZ0kyTXM2TXlob3FaT2d0bFFBeHU1Tmd0TlN0NlFBV1VmRTRLQTNRdjJhZTAwNE1BQUI2YXpPbjloTFZNN1ljemxtb3lPYlJBNXd6Q0g5Z0ROY3lwaXpsZFBPK1o4RDVtenJ3Rm1CZmN5RjRnWG1RQVJhY3ljTE12blVCMlpnSUpuSlIwOGtFRG9nSnREd25ycWlidk8rL1RobTR3a3hpOEZyOWt6ZlV4WS9sL013em5relZZODhRT3JEV3o3OEdhN010cmNYT3RtY2F6MTNqak4rdTFkR2ZWb2IzVytETmFSZkd5OW1ocjBxZHpHT0piR21YMUdaSmhOZnBiMUdaQ3pPa2NUOVVZdDNCcHZURkFjaDd0d0xhcGRlNzFBVjF2YmhvUEczb2NCbzBjWDliZW4xRzRNS1dyZGJHVFJJUU5ZS2MwRXBsYjlMMXpxZTNHME9BMzdmTmdEb3l1Z2R2UXdVR1pzMkFEc1NPUUNwaFIxRkZ0S09PeG81YkRJRGNjT2JPSkVSLzI3SHZRZTJvOTg0a1RIVk9jZTA3eDdjWm52YkNmMDZvS1RvbjdIS2Y0NW5hQzNuUGhHY0MvSGF6NUhNN09jMlo4TnpzbkxZUUQ4N1p6VGhkUXZmTWdGRjhyamNDNkpmVSsxK21hWEN2RGh6a1FIYzJNNXFweWRGTkpwZ2d4T056bktaeWoxTHR1MFQyNngrenpNTnVXdytEZDQ3bWR6dUZlKzRGd3VnUENHdHlPdFBiVGw5dE80QUVIaW9sWmdOQmh5bTBTSjVVcytaa3cyQldXbFlqSzlqV0ZISUZNZU5hTHBBZXZlbFN4QWM0Y0JtV1plOGFONDJveGRjL2lOejc0SlZOMmJWcWNGQ3Z0aUM5UGQ2Z1RNUzErKzA5bWNQOGRDemg4THFSUW5sZ1lBZFd4Rno2UmlnSVI4OUNnSTg5cjlKZmdRdXRqREZtRVFOaUF4Y1FEYVpScEJlTlRqMytGVG9wQTdNZVNwUGQyd2RuaUNJQjdmc2ZDZTdZcFA0SUsvaHFWS2xNRUZCeVBVMzNORzBobkFFMU54b2lMRld3WlJxa09YRTFyemV5bXpjeHF5akdNbGYxOVR3RSt6dldJQWswQ0NvRjlWKzBYRlFsN3hKbjcwSDExekZSSHdHVEgwekVaa24yV1ZOQm55QkhuMmNHU0RZQk9oSTNUeCtYeUZNRkFsd25OSGhHa0hMd3pHRFM5QndEbkc2amsxUlhOQXZ6TXhRSTYxR1NmeHdIZlZHMXV5cjBleW9HY0FhR0lONlJBRjlTdFNXajBLdFFHU01JV1VtU1JTd2h3andqZ0FiMFB6TTFabllGSURJRUNEc3dlbDQxa2xzTW1TZnp3QlVQMkcwbVVNd01DT096T1JuQW9EbkR3R1hTQUtqSGVCbkZRSENNMEZRQ2lKaHhuQnBRaUxBR1pTMEowTklOOVJNaVdsUUJ5Tm1UQUFLSkdRTmxOSGpSK1ZDTG5IUUVpTzNFeUo3eE16a1BhMEd6YzJHMW0xNHhjMGFJRzBteWJ5YTE0d0MwNkltejFpUUpVMWFONnpHd0dLakdhSkdKbXptMk9DWUpTbFdVREEvRVdsWHpQMzRNZ0VFUE5VNHl0UkFCdFFhaTBoN0VkVmRSZFFhRGRYZ0ZSR1QxVTMyZ3FHVHliQmJHZ1BYR1BTcFVTQ3J6L1dYRlUwMEVTQ1NONkZURVNIUFV6Qi9SbkJzQ3JVMEJzRytOK1BURlRCc0grTDR6QUxuRDRIZ08zQitMK0toTWhQUUNsUm5IalIvUS9XQkpnSGZWQktTTzBnL1FFejRIeElrMjNGT0l1TUxWUk5USFJNb0J1T3BQSEY3VnBQZlNsVDlBYUZCVzVpRmdaSWJDaE5aTnBMWkxnQTVLNU5MeXBONUtaTFJKajNaTTVMZWxqREZLREJwUFFGWkpBMkZMZWluSGxNYkdoTnBLbEtGSmxPR1I1SVZMQk9aS1ZON1JWTDFKdFFOTTFLajNSTE5KRk5rZzFLaE90SjFOVkltaCtJYUVoS05NbE5OTUNESFgwSTNHalhVMjZnd1BlaEZUZEk5T3RNWFg5SXdJM0NETisxUUZETlRIZE1WSmoyOUY5UFNPalcvMGtNb0FUS1RLMUp0TlRKQ0Y5VVNMVmhqTjlYZ25WU1JCWUY2QllLV0pERnhIWmxPSjRJTDNYeTMyRU16SFZMckVMU3VMM0U3TjVPYkErUGpXQkJTTG5BQVBTT3V5L1RoVUZUTHhpSVNMbkJBQVNJeUlsVEZReE9DT0JBL1JwVkhLU1BlQS9UaVBuTVNOcUtYSUgxaHdkSXgyWk5RR1ZMOUFvRDFMbHhQUDVLUE12TkJRVm05QnZON0lWTUZURlF2UE9WQlc2ak9oZk51UGZQdksvTE1XZklyTTFRV0xTbFpnelZERlprNkdRRldNTHpqV0FNZ0hlQmFTSFBMeFhBZUtaT3BSdlV3ck1qZ0RIS29IZUFvQWxTY0dRRG8xUkdRRmdPSXNRQmJESW9vcm9sUkRSam5GRlJvcWNEUmt4eElyUm53Sm1HUUE0c0ZWSXFvQ2Yyb3RvcjR0b3U1Mkl2NHJSbEJScWxRR1RGUUZBdVJGUUJyS1VoZkZRQUFIMXlKZkFxSmVnMUxMTmFnWUJUalV3akwzMHlBVEt6TGgxVXh6TFRMNnBXU3lCTEtiS0hMckxNeDdMckxYTFdUbktteG5DeUFKcGJLWEtyTGZML0tITG5LSnB1d1RMbXdQTEFxbks3TElyZktKcDZvZktMS0pvNHJ2TEpVN0xQTGtybXhvckhMekxncXlCUXI0cm5LWXJlMElyc3FncTdLa3F2TE1yUEtubzRyQ3JTcW5LUExBZ25vYXJuRG5LbXE4clhLcXJaNUtxb3JVeHVxTXJVcmpMNnJZcWVxQXJockVxeUFXcmlxMHFKb3ByY3I4cVVxc3EzS3lxL0xTckJycXJ2TFdyeXFPcXdxNnJscmVxaXIxckRydHI0cURyeHJjcTVyR3I2cFRyZkxBZ05ZQnE3SzdySnJOcUxMQWg2b0Zyd3EwcmpyMHJLcUxxWHE5ckFyMXFLcUNxbHJBYnRxUHFBYTFxU3I5cXhxWWFKcWJxSnFCcVBLTXF6cTRiSWJscjVyT3FqcnpyUWExcmNhTWI4YWNyVXFJTEh4bEpWajNRTjlwRElBdGl5OHB4OVNKb3QxZjl6cHprN2lyaWYwTUtJY0hVblZYUzRCcUZUaVdsNEFaeE10R1VZQWtqQVFrMFp3K0Fxak5BK0JtVVEwMVpMelV3WUJJUytCMHdyazNyRmJsYlV4VmFwQ09JMTFmOFlCM3BVeGJjNHdmWmphV3hJTEhSWXdkOXpiMk0ybEtaY1JVWTBablZiVTlqdE1qYVhjZ0pjd3FnZ1pHSTJ3eTlYc1dsTDEzVU5hV2F0YlZiSFU0QVAwYXBlaE5CYUFRMDRVWGRMYllWTnRUYVBhTGFDQU0wNFZYMDJLNEFmQ3daYmJrN3M3YUs0Qk9nVExFNk02czdOc25BckJpTHROVDFNeDg2VGRiYlVab1pGb25hN2l6Y1c3N2IyNzBZN2k4NlZDYlYzMDZNSzY3YTI3SGErN3gwdTZYZFc3UDVlNjBaVXh4MEI2OENHcDMxbTZaNmU2SjZGN2UxcDd2ZE43RWdPN1RTeTZWN2o2Ujd1N3g2RDYrNkYxZDZ4NjU2dDdXMHBWajdLVlVRVktIUU5MK0FmQnRMZExLNTlMTk02N0lTejFJUy9qS0JETUc3OEs3akk2d0JVeGgwOEI3Y29IeDkxTndHUTk4NlFOUjZpN1dhMFk2Smo3VUhDN002cmJXYmtBcUFRMUE2YWxjR3M3Vk5hVk5EaXhHZ3pCbDFzSUtBcE12UlI3QkF2YVNOYkJlYWFvR2dzeEVLcWJvQTNVNExWcXRJZTBld3FDcVVmQVJ6TkFmZHR3YW80VWZBV3dXR3JRMkdiQUdMYjZIYkw2MFpRdzdvWUJzWm45VXc1SFZINTcwNkRHdDZxQVZIWjYxR25iTkhhWWRIa0FqYjlIekg1N1RINkpxR29Lb1VyUWkwMEc4R1U3TXJaSEs2cmFuSFJBNEFmQXlBNExmSGpIMUdFSlV4RzFvcEZHZmJPZy9hQUppQy93amh2OE53amdIMDBuNWlheUhHdDZySHRHN3g0TDE4bURsVm14ZDFPNzZKb0gwd3ltZDZLbngxRWRGNzB3R0tINzZtcDlGajVKRkpTYlZMeWJUVnpSdDkweGdpWXdJQlF3dFVXVm9va0FPVXVWZUFlSmxFUEdBbW9HYUtLaFg2QlJVd2FLQ1JHQ05Wa1E1OUZpTTByeERKWXdteWRSWGgxaWdRTFVwd0wwM1ZHYUZOWVNld0swdjBoenNLT2Exc0NMNDBDQUpVMDdYbitLaTdhYVNLY24xR1diK0xmbW5iTFVTTFdHNG1Fbi9tV3hRVzdCNG42QXBBUG41SGZaRkhBSUlXNGhFWHNOSHhJRVVXaTZyall3WnhLOTV5WDl0eDhKbjlYOEFCU1hZMlNFbGtJS2djbHZqWi9kOUg3R2wzWW45ZWxrSVJsMmxnTUoyQWNGMk4yRDJHRUZSL01QWkdKVjJZUUNTZ0VnNHpqVzFBSitGbHhxMjFUUFRHaVlnR1Y5QjVWcnh4Q1RtMWtyb0tpSVFSSVBnTnNLd1ZFRFlTbWVnYlVKVmtpbFY4MXRWMVRUVnRHWUZ6NXRWNDJ5MThoekN6VjJ4c1YyVmxPMWkyMTkxOUIxaXdoL1lWVjhoN1Erb2pHSDFoMXIxa0pvS0oxL0J2MThoTmdIVnZWeDBaTVExaGdZMTNGTjBhTnoxbHNiMXpOdUZXTjBWZTFxdXIxamNNTnF1czlOaXdTN3NBdHZ4ck4waWt0M05odWdTdXphbGs0QU4zTjd2TkNHZ0RHYXRqMXZON04rdHd0L0I4dHJpNXR5Tm50MzEyaWdkbXR1RmN0d2gwZGhwQk4vVjVOeURIQU5OMDE4ZDhOL3QwdG9kN055dDBZYmQydDVBS2QzdHh0dWRxdGc5bWRyZGh0bXpFZDg5aHQyZDQ5OUJtek05aFVCU2xnT1BSWXdWbFFmcUhsN2dwNFhneWdPa0xZeTFXZ1lwazl5U2tERitoMWtGTmlsUjlCaUR3NUU5Z2ZXRDV4K0RrdXhEaWQwaXVEaDEvaXVDakRoMWwzWkFLNUtEcXUzRHlEazltRDVBYkQwajlEeFpoMTVEcWoxRG5EN044anpEekJwam1qM08vRHF1bDNOR0dzbzF2QUUxbzFBNXB3elkwRGpabGdjUTFBVUZNSXNBR1VpZ09qT1QyZU02Wk51amFUMlQwRk5SQlR1VHZXZFdJS0JjUjhvS1JUMEZjSU4rTnAzU0haZ3liR2JwbzVzMUQxQVo4MFJBSVpsZ2FnVmxjWnpsYmxhWnZsZUNPNWVacVZDOEdXYThIUjRTdFp0OTVnejk4VUpSbXora0dNUzFhMVM1dU1SZHEydE1aWllJem9jSnAyaDNRRjlHQnFHSjcyNkY4RjFsV0pncjJGM0xoUjlGOWhsY2NycFJzN0ZjYkYzQ25oNS9CM2RCOHRoZGlnWFYvVnY3RXlxa1dCajlVTmRCbk90cmpyeDBWQnE1T3JoMXdiN1Y5cnhOcXdQMEFnSzVkOUVEUDhPaU83WHQ2MWo5VVpnYis0cWI0Ym5BV0F1QUNBeGJ1YnU1S2NjYnF1eWIrTjZiL1YvWURKcGJFRE03dVZsMXdJTzVTOWZZZExwTDJGVXV3U0s3dVY4aURBUllHWVFHV0ZDZ0cwRjRJUXppRENOL0JBQmpVRk9ndGJ6Q2hLQ1RpQVRvR3NvSG9RRzBhTDREdjhSaHBWeW5lcnptcTVlY1o4bWZFUXdFWFkxMjdTVGpRRXlPNmhWN0FnRHNSQVRRWG9PY1JqUlZtblpycTF6Q3NvcENpQUxoK0FmcmdqN054bk5qd1Mzb2E0Z1huamtTaDd3OTBYc3RXSEYvUEEwbDZYOVZ0YktBV0FnQXFnZUxQSUJucWdGbnU1Qm9YM2ZIc2NHN2pub3QvdG1BWDFMaDkvRTl2MWpjUGdTMzBZU2w1WHFKb1hqQ1gxQ1gvQjZKOWlqQ1VuWjM2SjNpdkFiaXYza1N3UHFnTlR1NUoxT3FON3VqWlJ4VjdTS0FHNXEzT1gwUU1sNVhqNGtOUklLZ0VubWdJNUhpWk1XUVppS0lOR2JtWjNpTjVBRXZtMzJpc2dOR0JXWjMzamtKMnZrOXdqbzRmcHdFT0M2b3lQaWFRRXMwU0FId1dIWGkrQ096TVg1MjRnUUlEc1dYZDNzZjJYQ3NPQVFzMGY4Zi9BNEo0QUlKMzFZSjR6V0hOR1Q3TmpqY1lBTGZ3WHRpNFhoMTVBWGR1ekRzZGdNZ1dvRGZ2ZnMzdXQzZnV2cVhrOTQvcHRzLzRJOHRCWDVGZFh1TzlnV2Z5ZmpzWWdQdjBRRHJ5SDZIQlYraU1GZnNFeXBERUFSK1UvYmlqQVB3S2w5KzI3QWVyRHYydjc0TjYrK0VUZmdnTHJaSURhZ0tBKy9xUlVkNnc1ZytCL04zaDd4VHBlOE93UHZNZ1hDbjk0ZGhBKzd2WWdRSDBPQ0tjSSt2TkUrakh6dVR4OUUrK3djdENuMFY1cDljS0dmTFBoSjFUQTU5amtCWVdRQUFFVWkrRmZOamlFMWtHYnNDQk5mVnJBMzJUQzFCcStXbkp2dG14Q2FhQ1ZXdEZGdmozd2dBWTlrQVlYVkVHanhCNWc5Z09Ob0tnRUpuKzQ0QkFlSUVkSHBZTnpnZ2NsUWx3ZHBnT0VpNUtSTWVPNFNBTmJYNmJGNFpDem5FWm01M1pRZWNwbXZLSXRNdHhvaDFFMElxSVd5RW8xRlMyNGdPaHdNTHVCWGNFMlJJdTlrSHdjYzM4RU9kSUFCQVlJYTV6R1poREptUEtHWmtxd0NZVjBkSUNrVHdTZUZKcEpETXdwUVZJVmswV0pReFA0anlXOFBIMy9iTmtwZ00rRGNQRUlJQUFBeFBBRXZGNkI3QWF5R0lSSUVwRy9hNGhNZTcwWHdSQUIySU81N0l5NUMwdGprRlMvNVpBV2dCT2xxekRoMnc2SWVBYjdydHhWNE1vNXdiaEpncDBGRUxHUUFnYzRRQ0JBRmtDazVuQTJNZEFLQ2dBRGtMd2dJSjBBZ0J2Q053aVJXUUx6d2VFYmgwaWJ3Z0VXOFB6NnlCdeUXSGNYQlVEOWNsOGF3K0NCdUErRUJBM2gxbFZCclpudG9kSjRJbE5OQWdFR014QWlqaEgzT0ZQMldMNWxsQklMNFhNQnVBQkdQQ2lSUDNieHJSVUNEa2p1NDFJaDRYOWhuRHpnNlJKd2o0cWt5b0NJTXVSTTNVZXJud29Dc2phUnh3d1ViYlJyN01qS1JJb21rUnVBRkg2dFI2eUFRc3M0QlpFMGliVTRveFViYlRaUVROUE9rUTRnTElEUmdQUklSZHlma1pxTFFIWnMyMHFvbVVhS1BsSG1pVTZoSEswUlNPRWlpalRRaUTkAo5DMEhoUndTd2d3M2pUdWlDUmp3MUVPME9yQ0dSMEFIRWUwU1NPelpNanJSd2tkNkppT1RnaFo0WTNPT1VjR1B0cWRDYWdFWTRrUVF4akhPamN3OFlrTWRpSlRGc2k2YXM0Y0lwR0o1SE1velIyWWwzTUtOdEZwam9ZR1k4TVFxSXRGc1VWUmVZNG9NNEVMRkppa1JxWWhNUjBMREZaajZSU285c2QzQUxGWWlleHhZcUlDMklkR1F0M09aUXJ6a1drTkhHaUFtaURCc1FPSzZGRGlUaGtvcDBXT0s3RVRpNFl2WW9FZXVOREdiaVp4U28zY1RLUEhHSmpEeFU0dDBmYms5SGVqQWhrQVVBdUpuTEZRdGZhc0xENHVTVVdFL3BzY1J3ajhUQ3piQUNsK21JYUk3Z2QzN0V3eEp4V0pTTVZDUXJGUGM1eHBRdlVSVU9YR1FqUVVBWW9FU3BtekZZVGh4NjNTMGRLSmRGeWljSjI0NGlZS0x3bWtWTHhoRWg0Y21Bd21QRFNKV28raVk5dzFhOW8yeEJFcWtVUk5nbU1UNVVDRTBpcU9KdEhxaXB3WEUwNFoyQS9RRUE2TVZLZW5oMkQ1SDI0aEp0dE9zZXFOa21lMTV4eUV2bEtoTlhFeVRZSnZIUGlWUkxvbWFUYUsyazlpUThMZTRhU2F4MFl0aWJLTXdsNlRTS3VZdFVROExvYUtBWUoyRStDY3hNUW02aUloS0VvMFdoTm9rRERJSlRZNzlKeE9jbGpnYldsRTNNRk9KOGtoaS9Kc2tvU2VST1FBaFRxQW9vbWlRK01ESGhUMHhnNHFLWUZJWlEyc0RKOFV2c1JGTFNrQlRpUk1VN0tWT0wrelJTbnVzNGNTUnlJN0JTVEVHaWtsc1BKTFpGMVNTaGJrOG9hcE04bnFTS2dlVXpjVTFLbEd4alFwOVkzeWZsTk1tOFR6SmQ0aHFQYmhQR1JTckpaSXZxVGxPUEdEVHVwVms4dnFOTkZHQUVBZ1hvMlFFY0JEU0lOUVJFQU96SFJqUkdJUmlZVnlad0VUQ3lpTmRTeG5JaktldUY1SG5qdFJ5azl5VzFKWEYwUlRweE1VMGZiamVGVkZCT3U4Q0FPZ0dkcXlCZmhkMHJTZVpPUkVBaXg0cUl1MGNOT1ZFZ3pkcHdJQUdSdUZlbFpSUVowQUlHTEpGa0Jqd0hRQUk3eEdmeDlRUXpRZzVJczZTQ0t4bE1Jdm9BUVNxTkNGcUFBajlwYUluYVY5TEFBL1MvcEVNb0dmaE5tbkl6d1o4TTVtUlJKaGtBaTRadnd4R1VUSlJtZEEwWjdBT3dQbUdKbThBdm9PTWdLSGpQYkdFemtaM2lNbVFtRHFCVXlEcDQwdUFKOUlhUVFCaStUTTZhVFpKdEc3VHkrT3NxR1hySmRHN1NhK1JzNGNaS095bkl6bFJGczdjWVIydG03VHNaOGlHV1FUT0pqeXlTWlB5ZEdjZ0V4bDdUVlp0TXpXZHJJNW5UVEhaQUl3MmNIS2htaHl0WksrQ09aYk40NXhTYlpNY3dHVXRJVGxPelBaVXM5aHZEUHhuOHlQWkVzcjJSak5RQXF5M2grd0dxSnpKMUhoRFdwUzQ5cVM5SzZCdlRGV3RNOUFOOU56Qy9UL3B5YzRhYjFJN0ZzeTRLc2MrMmZwTzVrV2g0WlIwcEdidE50akN6UlpGQWNXY3dnemsvb3M1N1l2R01QTW5ta3paQTVNNVdYN09MbkJGWHhBbUFDY1YwL0Z0aHZ4U1JQOGFlank0MUFTdXdFOUV1MlFrbktacnBqS1hrVTFQTGtMajlSYWttdVlUUGVucXk2WkRNMXVSdUI2bFJ6Mlp2d3BxZEROWm13eUlaT2NrZWFqSUNBRnpGNUZBYWVhN0pBV1FMRlpGTW91V3JNK21OejZaemN4bWZESjZtcHl3WjNjditTblA3bTh5RVpNRWQyYUFxRmtCQVJaSUVDZVVvSFRrdXpaNWJzaGVWUXJ6bndMVjUxTXBCWE9FRG1CQUlaUFVrMlZTSU5rY0tNRlMwN2hTS0xObEp5djVJYy91YmJQNFdSeis1enMzR2JRdGdVTUxtRTRDbjJZWExYbXNMMkZuQ3NSWUFyRGw4TGNGVWlyUmRISTBYdHlzRkVBQ1Jib3JqbTBWakZNaTZXWElxSVgwS0ZaM3MzMmRUSkxsM3lIcGxjZzBkWEppRzF5c29yODVCVTNJb0F0ekRGNWkxaWZvdC9taUs5Rm5jb0JZUEs4VUN6UjVaQzhlWkF1Z1UyTDU1QXMreFN2TXBscnk1aVNQRkhvc1hSQ1lnOWtjd2tUaFRYZUNNZ0RRR3lYNEFZRzU2OE5nUUQrUDFBR0QzRU80THNPQUlzaDJMK3l5QVRjbUlJRWZCaVJnb3gwWTd3N3Bld0FBQkM2TUFJTjZBZ0NqTGZoNlJPVVMvbDJuZ2kzaE5DaVpjak1hWEFMa1p4YzVFYTRIY0FTQUFnd1FRSUFDTFJoOEJPZ0xRQUlBT0J3QUJ3N01kbWRnQmN0dlFQUjBvWUFSSU0yeUdUZWhiOG1JQUVaOE5rQnZKNkFNR1hvQkFFckMyQWhtY3dOU2drS0xCWW9uTzZ5andFUUIrRStUUVZuZ1doTWpOVm1MWlZ1OWtENGhrMTFyV0Z0ME9GU3lOWFVFSE1vTUtHSzE5STIycTZBUVJVMytDb0ZNSm1GRVJpZzVQVUxrd1cveHRLbmxGT1RhWXNVMHJaaDZBQUFPVm9UN01laGErUG9VajJVTGFwUDJrWUEra2dCVUR3VnhPbFpXUUxjb1BBR2p3cDFJc2dFR05keFJBNVZQdUJWVDVJZlNRaUdWYVVSNURDUEZqQ3FST0NGT2dCSnplR3hMeFZCOVlnTDhPREV5cTVWWHhaVmZ1R1JGVUE0RnhxbndLYXVsWFdyNVZzcW55VDdtTGtKTDVs5CiXSjdMdlM3VEdnMOQbA2dwVlhOdFJrS3ltc2lBQWFBOFJQNHF3ZElMTUtkUzZxV3k1b2VTbGVRTUJ3Qno0UnNHYml1d0FDaXVZR2JnTXVRRDlCeGgxQVlWQmNoRUR2Qk0xM2dmVnBVQStYNWc4MUZBR2JnYU1wakFCSVJOZ3FzT2NpeGdFQXMxTmExR0wwR1FCMWhvMWJZWG9HOGdLNFZMa002YXF0ZG12UUIxcUtBRGFwdGJJQmJXUWl1MVBheDBIYlg3V0RxWTFJNnNkYThIQWloaDJDQUFDUlNER1ptSUUwL2pyVUd0cXBoUWdzOEFBSnhXd3lBVGdOV0dyRUNBM3JlbzE2dTlSWlNjQk5VOVlEMEI2SHRGQ0FoQnVvbmlHOVErcENDendRZ0w2N3NBQnFBM2hBUU5YNmg2RCtyL1hPVkxZM1VjSUxQRm5qL3FtcTRRQjZEZW8xaGZyWjQzVU85VytwZlY2eHVvYXNKNlBoc0kzZWhpTmY2bkRYaHVvMW9hTU55RzcwTmhvZWhnYUgxM29HOVE5RTQwNXd2MUlRRHhJUm9mVjNVMVllc0c5WEJzQ0I2d3dOM1VlcUYrcWZXaWJ4Ti9HMGpYQnM0M2NhYjF2R2xqYityQTNNYTFZTjYyRFZCcFkxY2J2UTlHd2pSaHU2cGZydlF0NjdxTVJwQ0FzYTlZTW13SUI0aGZWNGFITnRtK3pSWnRmVnZycU5ONjB6Unh0ZzNjYjZOT212VGNUWGNINEljaHNYSFltN1FPSmMwc1k3cUdnSFVocVZoUitvVVVScFZqRnVBcGNqc0lhZE5iWVYzVnpnOENUQkNnQWtUb3g2dzdrN3dQV1BzQmh3eFlLb2JJWmdZRGpWaStjbzYzb0lITkpITkRuRTBRRjZqOHIybUNLWFR6c2dhUzdMeVBqUzRzeklONmVSRFhpZXoraTNVb0JHNWp0amRTdlo5U0hZZVN0ZWtTSWZwa1ZMK1JYS3oxVzNEYWZVZHlmQ085Z0lCWUZ2c3EyNHlRN2hiUm5vWTAwZUFmRUkyTzFzNWV1NllNN1ErZ3UxZ2tydEE2V0J1T2p1MS9EQjhRZWE3ZnJqZTBYYjJlTUFjN1dxaDIzdTg5dE5TaEdmc0FhQk00ejBOaENZc1pHQUZaaElkTWVXd3VnRGgwUTZUdE02YUhjZ1hhdzJBVWRDT2hkQmpxQ3p0WTdsVWtJNE9MV1RRY0EwMEdhTE5EbWg0aTlBQzBEWWVMRlRrcVZLdEw1SCtQclVrVUcyVjRhbOQj82xjMG0zVTl1YXJxT2JRdHRwUTlvTkMzK05iWFJIRjA5Yitvcjh1dEVEcEVEaTc0QlgyQUtHRHR1My9iN3RtWUNUR3Vrank5b2Z0QUplM0hMcG5SNjdIVUJ1eVBBdW1OMS9hQWRIb1JBa3EzMjBxNlBJcU82N1ZLbHNLZEFjZGFPMDBranJkMWZhbDZ0aGJIVkpIaDFvNjhkdGhJbmNjQmVZczdvb3ZXNnZQMW9uSVY1TnREMlFsa1F4dDBnN2xkdGdNSFdRRXEwK0JXZ2p1NTdRYm5keG5wdWNHZXJQUWpvNXg1N2FjQmVzekZWb1oxbzd4MG11WjdUT25MMXVaSzkyZS84ZnJscjB0NkYwWWZNQVByMGgwVG9uZEFlcjdhYVZMM0RwbTlrZUplcVh2SHdqN1lHZU8wdlIzckM0TkFheW5JQVlITUVLWVUwN09LYWJrTWtBU0owUkNzWlVWQUJWQ3FpK2RhMWJNZGxFN0ZEQUJBODAxNFZBTWdBcmdLQmwxUllJZ0l2dFdLTENyQVhnSVdkb0RBQzZBUTA4Z1QrSTBtMG9ISnJBNGdqYUJBSFJSUUFvQXo0ZWdHMkErU29CUUE4RVd3THdFNEFwb2MxeDBMOUxJRUdDc3hFQUhnU3FQNHNlUy9UWjF3QjBBK0FiaVNvQW9ETUI0SWNxRytVVUFmQVdxYUE0SnlJRFpySVIyZ01uWndCQU5nR1oxUkJrZzBnRGFBcDbkJTpScGNjQmZDMUNLbE5BVWdCbXU3WFZxMTFiQm1EUE92MVlHalZLTUJ0dGR3ZndyY0dPZ1N5M2c1SHFPQXBzY0FieUNpQlFEUmoyRFpBSVFYb0pDTkpSTVFOOXdnYzFFbFcrUm41MzRna2VtZFlINDdTZytBMndWZExxdEZXYXBORDJoeThIb1lOR0dIakRHd013d0FCRmJnUG9UYXFpSGtRcUhJOWJnaGZEeEh4aEw1blV2U0hiS1REMnlMSnpndlNCemIxR0FTQWJaazZSc3dxTWxTUGJaSFVTUm5JeVVYeU50d05ZUzBCeE0xQ3lNbEh4a0pNU0RZVWZxTURKNmpOUmlaUE1tbVR6SUJrTXlGbzNVYXlPWkhlb1RSbTlkMkc2TjlJaWpneDNJMk1qU085R2tqd3lGSTdVYXFNWkd5anN5WWhNTVp5TzdaaWpzeHRJK0VBV083UitqelVMWStNZEtQMUcrajJSNm94c2JxTmpIZHNNeDh3bk1abVR0R200aXlBNDNNY1NNNUdCa1Z4dkl3d1N1REpBMVE5d05ZQWhYNE82Um44b0hBd0lWQ3R6eFJEZ1IySUVFajFnQ+QufkE9`);
//var fu=async function(t,e){return new Promise((function(n,r){"use strict";try{n((new function(){var t=this;this.versionnumber="1.2.6",this.imageToSVG=function(e,n,r){r=t.checkoptions(r),t.loadImage(e,(function(e){n(t.imagedataToSVG(t.getImgdata(e),r))}),r)},this.imagedataToSVG=function(e,n){n=t.checkoptions(n);var r=t.imagedataToTracedata(e,n);return t.getsvgstring(r,n)},this.imageToTracedata=function(e,n,r){r=t.checkoptions(r),t.loadImage(e,(function(e){n(t.imagedataToTracedata(t.getImgdata(e),r))}),r)},this.imagedataToTracedata=function(e,n){n=t.checkoptions(n);var r=t.colorquantization(e,n);if(0===n.layering)for(var s={layers:[],palette:r.palette,width:r.array[0].length-2,height:r.array.length-2},o=0;o<r.palette.length;o++){var a=t.batchtracepaths(t.internodes(t.pathscan(t.layeringstep(r,o),n.pathomit),n),n.ltres,n.qtres);s.layers.push(a)}else{var i=t.layering(r);n.layercontainerid&&t.drawLayers(i,t.specpalette,n.scale,n.layercontainerid);var l=t.batchpathscan(i,n.pathomit),c=t.batchinternodes(l,n);s={layers:t.batchtracelayers(c,n.ltres,n.qtres),palette:r.palette,width:e.width,height:e.height}}return s},this.optionpresets={default:{corsenabled:!1,ltres:1,qtres:1,pathomit:8,rightangleenhance:!0,colorsampling:2,numberofcolors:16,mincolorratio:0,colorquantcycles:3,layering:0,strokewidth:1,linefilter:!1,scale:1,roundcoords:1,viewbox:!1,desc:!1,lcpr:0,qcpr:0,blurradius:0,blurdelta:20},posterized1:{colorsampling:0,numberofcolors:2},posterized2:{numberofcolors:4,blurradius:5},curvy:{ltres:.01,linefilter:!0,rightangleenhance:!1},sharp:{qtres:.01,linefilter:!1},detailed:{pathomit:0,roundcoords:2,ltres:.5,qtres:.5,numberofcolors:64},smoothed:{blurradius:5,blurdelta:64},grayscale:{colorsampling:0,colorquantcycles:1,numberofcolors:7},fixedpalette:{colorsampling:0,colorquantcycles:1,numberofcolors:27},randomsampling1:{colorsampling:1,numberofcolors:8},randomsampling2:{colorsampling:1,numberofcolors:64},artistic1:{colorsampling:0,colorquantcycles:1,pathomit:0,blurradius:5,blurdelta:64,ltres:.01,linefilter:!0,numberofcolors:16,strokewidth:2},artistic2:{qtres:.01,colorsampling:0,colorquantcycles:1,numberofcolors:4,strokewidth:0},artistic3:{qtres:10,ltres:10,numberofcolors:8},artistic4:{qtres:10,ltres:10,numberofcolors:64,blurradius:5,blurdelta:256,strokewidth:2},posterized3:{ltres:1,qtres:1,pathomit:20,rightangleenhance:!0,colorsampling:0,numberofcolors:3,mincolorratio:0,colorquantcycles:3,blurradius:3,blurdelta:20,strokewidth:0,linefilter:!1,roundcoords:1,pal:[{r:0,g:0,b:100,a:255},{r:255,g:255,b:255,a:255}]}},this.checkoptions=function(e){"string"==typeof(e=e||{})&&(e=e.toLowerCase(),e=t.optionpresets[e]?t.optionpresets[e]:{});for(var n=Object.keys(t.optionpresets.default),r=0;r<n.length;r++)e.hasOwnProperty(n[r])||(e[n[r]]=t.optionpresets.default[n[r]]);return e},this.colorquantization=function(e,n){var r,s,o,a,i,l,c,h,g=[],d=0,p=[],u=e.width*e.height;if(e.data.length<4*u){for(var m=new Uint8ClampedArray(4*u),f=0;f<u;f++)m[4*f]=e.data[3*f],m[4*f+1]=e.data[3*f+1],m[4*f+2]=e.data[3*f+2],m[4*f+3]=255;e.data=m}for(i=0;i<e.height+2;i++)for(g[i]=[],a=0;a<e.width+2;a++)g[i][a]=-1;for(h=n.pal?n.pal:0===n.colorsampling?t.generatepalette(n.numberofcolors):1===n.colorsampling?t.samplepalette(n.numberofcolors,e):t.samplepalette2(n.numberofcolors,e),n.blurradius>0&&(e=t.blur(e,n.blurradius,n.blurdelta)),c=0;c<n.colorquantcycles;c++){if(c>0)for(l=0;l<h.length;l++)p[l].n>0&&(h[l]={r:Math.floor(p[l].r/p[l].n),g:Math.floor(p[l].g/p[l].n),b:Math.floor(p[l].b/p[l].n),a:Math.floor(p[l].a/p[l].n)}),p[l].n/u<n.mincolorratio&&c<n.colorquantcycles-1&&(h[l]={r:Math.floor(255*Math.random()),g:Math.floor(255*Math.random()),b:Math.floor(255*Math.random()),a:Math.floor(255*Math.random())});for(a=0;a<h.length;a++)p[a]={r:0,g:0,b:0,a:0,n:0};for(i=0;i<e.height;i++)for(a=0;a<e.width;a++){for(d=4*(i*e.width+a),o=0,s=1024,l=0;l<h.length;l++)(r=(h[l].r>e.data[d]?h[l].r-e.data[d]:e.data[d]-h[l].r)+(h[l].g>e.data[d+1]?h[l].g-e.data[d+1]:e.data[d+1]-h[l].g)+(h[l].b>e.data[d+2]?h[l].b-e.data[d+2]:e.data[d+2]-h[l].b)+(h[l].a>e.data[d+3]?h[l].a-e.data[d+3]:e.data[d+3]-h[l].a))<s&&(s=r,o=l);p[o].r+=e.data[d],p[o].g+=e.data[d+1],p[o].b+=e.data[d+2],p[o].a+=e.data[d+3],p[o].n++,g[i+1][a+1]=o}}return{array:g,palette:h}},this.samplepalette=function(t,e){for(var n,r=[],s=0;s<t;s++)n=4*Math.floor(Math.random()*e.data.length/4),r.push({r:e.data[n],g:e.data[n+1],b:e.data[n+2],a:e.data[n+3]});return r},this.samplepalette2=function(t,e){for(var n,r=[],s=Math.ceil(Math.sqrt(t)),o=Math.ceil(t/s),a=e.width/(s+1),i=e.height/(o+1),l=0;l<o;l++)for(var c=0;c<s&&r.length!==t;c++)n=4*Math.floor((l+1)*i*e.width+(c+1)*a),r.push({r:e.data[n],g:e.data[n+1],b:e.data[n+2],a:e.data[n+3]});return r},this.generatepalette=function(t){var e,n,r,s=[];if(t<8)for(var o=Math.floor(255/(t-1)),a=0;a<t;a++)s.push({r:a*o,g:a*o,b:a*o,a:255});else{var i=Math.floor(Math.pow(t,1/3)),l=Math.floor(255/(i-1)),c=t-i*i*i;for(e=0;e<i;e++)for(n=0;n<i;n++)for(r=0;r<i;r++)s.push({r:e*l,g:n*l,b:r*l,a:255});for(e=0;e<c;e++)s.push({r:Math.floor(255*Math.random()),g:Math.floor(255*Math.random()),b:Math.floor(255*Math.random()),a:Math.floor(255*Math.random())})}return s},this.layering=function(t){var e,n,r,s,o,a,i,l,c,h,g,d=[],p=0,u=t.array.length,m=t.array[0].length;for(g=0;g<t.palette.length;g++)for(d[g]=[],h=0;h<u;h++)for(d[g][h]=[],c=0;c<m;c++)d[g][h][c]=0;for(h=1;h<u-1;h++)for(c=1;c<m-1;c++)p=t.array[h][c],e=t.array[h-1][c-1]===p?1:0,n=t.array[h-1][c]===p?1:0,r=t.array[h-1][c+1]===p?1:0,s=t.array[h][c-1]===p?1:0,o=t.array[h][c+1]===p?1:0,a=t.array[h+1][c-1]===p?1:0,i=t.array[h+1][c]===p?1:0,l=t.array[h+1][c+1]===p?1:0,d[p][h+1][c+1]=1+2*o+4*l+8*i,s||(d[p][h+1][c]=2+4*i+8*a),n||(d[p][h][c+1]=0+2*r+4*o+8),e||(d[p][h][c]=0+2*n+4+8*s);return d},this.layeringstep=function(t,e){var n,r,s=[],o=t.array.length,a=t.array[0].length;for(r=0;r<o;r++)for(s[r]=[],n=0;n<a;n++)s[r][n]=0;for(r=1;r<o;r++)for(n=1;n<a;n++)s[r][n]=(t.array[r-1][n-1]===e?1:0)+(t.array[r-1][n]===e?2:0)+(t.array[r][n-1]===e?8:0)+(t.array[r][n]===e?4:0);return s},this.pointinpoly=function(t,e){for(var n=!1,r=0,s=e.length-1;r<e.length;s=r++)n=e[r].y>t.y!=e[s].y>t.y&&t.x<(e[s].x-e[r].x)*(t.y-e[r].y)/(e[s].y-e[r].y)+e[r].x?!n:n;return n},this.pathscan_combined_lookup=[[[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1]],[[0,1,0,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[0,2,-1,0]],[[-1,-1,-1,-1],[-1,-1,-1,-1],[0,1,0,-1],[0,0,1,0]],[[0,0,1,0],[-1,-1,-1,-1],[0,2,-1,0],[-1,-1,-1,-1]],[[-1,-1,-1,-1],[0,0,1,0],[0,3,0,1],[-1,-1,-1,-1]],[[13,3,0,1],[13,2,-1,0],[7,1,0,-1],[7,0,1,0]],[[-1,-1,-1,-1],[0,1,0,-1],[-1,-1,-1,-1],[0,3,0,1]],[[0,3,0,1],[0,2,-1,0],[-1,-1,-1,-1],[-1,-1,-1,-1]],[[0,3,0,1],[0,2,-1,0],[-1,-1,-1,-1],[-1,-1,-1,-1]],[[-1,-1,-1,-1],[0,1,0,-1],[-1,-1,-1,-1],[0,3,0,1]],[[11,1,0,-1],[14,0,1,0],[14,3,0,1],[11,2,-1,0]],[[-1,-1,-1,-1],[0,0,1,0],[0,3,0,1],[-1,-1,-1,-1]],[[0,0,1,0],[-1,-1,-1,-1],[0,2,-1,0],[-1,-1,-1,-1]],[[-1,-1,-1,-1],[-1,-1,-1,-1],[0,1,0,-1],[0,0,1,0]],[[0,1,0,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[0,2,-1,0]],[[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1]]],this.pathscan=function(e,n){for(var r,s=[],o=0,a=0,i=0,l=0,c=e[0].length,h=e.length,g=0,d=!0,p=!1,u=0;u<h;u++)for(var m=0;m<c;m++)if(4==e[u][m]||11==e[u][m])for(i=m,l=u,s[o]={},s[o].points=[],s[o].boundingbox=[i,l,i,l],s[o].holechildren=[],d=!1,a=0,p=11==e[u][m],g=1;!d;){if(s[o].points[a]={},s[o].points[a].x=i-1,s[o].points[a].y=l-1,s[o].points[a].t=e[l][i],i-1<s[o].boundingbox[0]&&(s[o].boundingbox[0]=i-1),i-1>s[o].boundingbox[2]&&(s[o].boundingbox[2]=i-1),l-1<s[o].boundingbox[1]&&(s[o].boundingbox[1]=l-1),l-1>s[o].boundingbox[3]&&(s[o].boundingbox[3]=l-1),r=t.pathscan_combined_lookup[e[l][i]][g],e[l][i]=r[0],g=r[1],i+=r[2],l+=r[3],i-1===s[o].points[0].x&&l-1===s[o].points[0].y)if(d=!0,s[o].points.length<n)s.pop();else{if(s[o].isholepath=!!p,p){for(var f=0,y=[-1,-1,c+1,h+1],b=0;b<o;b++)!s[b].isholepath&&t.boundingboxincludes(s[b].boundingbox,s[o].boundingbox)&&t.boundingboxincludes(y,s[b].boundingbox)&&t.pointinpoly(s[o].points[0],s[b].points)&&(f=b,y=s[b].boundingbox);s[f].holechildren.push(o)}o++}a++}return s},this.boundingboxincludes=function(t,e){return t[0]<e[0]&&t[1]<e[1]&&t[2]>e[2]&&t[3]>e[3]},this.batchpathscan=function(e,n){var r=[];for(var s in e)e.hasOwnProperty(s)&&(r[s]=t.pathscan(e[s],n));return r},this.internodes=function(e,n){var r,s,o=[],a=0,i=0,l=0,c=0,h=0;for(r=0;r<e.length;r++)for(o[r]={},o[r].points=[],o[r].boundingbox=e[r].boundingbox,o[r].holechildren=e[r].holechildren,o[r].isholepath=e[r].isholepath,a=e[r].points.length,s=0;s<a;s++)i=(s+1)%a,l=(s+2)%a,c=(s-1+a)%a,h=(s-2+a)%a,n.rightangleenhance&&t.testrightangle(e[r],h,c,s,i,l)&&(o[r].points.length>0&&(o[r].points[o[r].points.length-1].linesegment=t.getdirection(o[r].points[o[r].points.length-1].x,o[r].points[o[r].points.length-1].y,e[r].points[s].x,e[r].points[s].y)),o[r].points.push({x:e[r].points[s].x,y:e[r].points[s].y,linesegment:t.getdirection(e[r].points[s].x,e[r].points[s].y,(e[r].points[s].x+e[r].points[i].x)/2,(e[r].points[s].y+e[r].points[i].y)/2)})),o[r].points.push({x:(e[r].points[s].x+e[r].points[i].x)/2,y:(e[r].points[s].y+e[r].points[i].y)/2,linesegment:t.getdirection((e[r].points[s].x+e[r].points[i].x)/2,(e[r].points[s].y+e[r].points[i].y)/2,(e[r].points[i].x+e[r].points[l].x)/2,(e[r].points[i].y+e[r].points[l].y)/2)});return o},this.testrightangle=function(t,e,n,r,s,o){return t.points[r].x===t.points[e].x&&t.points[r].x===t.points[n].x&&t.points[r].y===t.points[s].y&&t.points[r].y===t.points[o].y||t.points[r].y===t.points[e].y&&t.points[r].y===t.points[n].y&&t.points[r].x===t.points[s].x&&t.points[r].x===t.points[o].x},this.getdirection=function(t,e,n,r){return t<n?e<r?1:e>r?7:0:t>n?e<r?3:e>r?5:4:e<r?2:e>r?6:8},this.batchinternodes=function(e,n){var r=[];for(var s in e)e.hasOwnProperty(s)&&(r[s]=t.internodes(e[s],n));return r},this.tracepath=function(e,n,r){var s,o,a,i=0,l={segments:[]};for(l.boundingbox=e.boundingbox,l.holechildren=e.holechildren,l.isholepath=e.isholepath;i<e.points.length;){for(s=e.points[i].linesegment,o=-1,a=i+1;(e.points[a].linesegment===s||e.points[a].linesegment===o||-1===o)&&a<e.points.length-1;)e.points[a].linesegment!==s&&-1===o&&(o=e.points[a].linesegment),a++;a===e.points.length-1&&(a=0),l.segments=l.segments.concat(t.fitseq(e,n,r,i,a)),i=a>0?a:e.points.length}return l},this.fitseq=function(e,n,r,s,o){if(o>e.points.length||o<0)return[];var a,i,l,c=s,h=0,g=!0,d=o-s;d<0&&(d+=e.points.length);for(var p,u=(e.points[o].x-e.points[s].x)/d,m=(e.points[o].y-e.points[s].y)/d,f=(s+1)%e.points.length;f!=o;)(p=f-s)<0&&(p+=e.points.length),a=e.points[s].x+u*p,i=e.points[s].y+m*p,(l=(e.points[f].x-a)*(e.points[f].x-a)+(e.points[f].y-i)*(e.points[f].y-i))>n&&(g=!1),l>h&&(c=f,h=l),f=(f+1)%e.points.length;if(g)return[{type:"L",x1:e.points[s].x,y1:e.points[s].y,x2:e.points[o].x,y2:e.points[o].y}];var y=c;g=!0,h=0;var b=(y-s)/d,x=(1-b)*(1-b),w=2*(1-b)*b,v=b*b,M=(x*e.points[s].x+v*e.points[o].x-e.points[y].x)/-w,k=(x*e.points[s].y+v*e.points[o].y-e.points[y].y)/-w;for(f=s+1;f!=o;)w=2*(1-(b=(f-s)/d))*b,v=b*b,a=(x=(1-b)*(1-b))*e.points[s].x+w*M+v*e.points[o].x,i=x*e.points[s].y+w*k+v*e.points[o].y,(l=(e.points[f].x-a)*(e.points[f].x-a)+(e.points[f].y-i)*(e.points[f].y-i))>r&&(g=!1),l>h&&(c=f,h=l),f=(f+1)%e.points.length;if(g)return[{type:"Q",x1:e.points[s].x,y1:e.points[s].y,x2:M,y2:k,x3:e.points[o].x,y3:e.points[o].y}];var q=y;return t.fitseq(e,n,r,s,q).concat(t.fitseq(e,n,r,q,o))},this.batchtracepaths=function(e,n,r){var s=[];for(var o in e)e.hasOwnProperty(o)&&s.push(t.tracepath(e[o],n,r));return s},this.batchtracelayers=function(e,n,r){var s=[];for(var o in e)e.hasOwnProperty(o)&&(s[o]=t.batchtracepaths(e[o],n,r));return s},this.roundtodec=function(t,e){return+t.toFixed(e)},this.svgpathstring=function(e,n,r,s){var o,a=e.layers[n],i=a[r],l="";if(s.linefilter&&i.segments.length<3)return l;if(l="<path "+(s.desc?'desc="l '+n+" p "+r+'" ':"")+t.tosvgcolorstr(e.palette[n],s)+'d="',-1===s.roundcoords){for(l+="M "+i.segments[0].x1*s.scale+" "+i.segments[0].y1*s.scale+" ",o=0;o<i.segments.length;o++)l+=i.segments[o].type+" "+i.segments[o].x2*s.scale+" "+i.segments[o].y2*s.scale+" ",i.segments[o].hasOwnProperty("x3")&&(l+=i.segments[o].x3*s.scale+" "+i.segments[o].y3*s.scale+" ");l+="Z "}else{for(l+="M "+t.roundtodec(i.segments[0].x1*s.scale,s.roundcoords)+" "+t.roundtodec(i.segments[0].y1*s.scale,s.roundcoords)+" ",o=0;o<i.segments.length;o++)l+=i.segments[o].type+" "+t.roundtodec(i.segments[o].x2*s.scale,s.roundcoords)+" "+t.roundtodec(i.segments[o].y2*s.scale,s.roundcoords)+" ",i.segments[o].hasOwnProperty("x3")&&(l+=t.roundtodec(i.segments[o].x3*s.scale,s.roundcoords)+" "+t.roundtodec(i.segments[o].y3*s.scale,s.roundcoords)+" ");l+="Z "}for(var c=0;c<i.holechildren.length;c++){var h=a[i.holechildren[c]];if(-1===s.roundcoords)for(h.segments[h.segments.length-1].hasOwnProperty("x3")?l+="M "+h.segments[h.segments.length-1].x3*s.scale+" "+h.segments[h.segments.length-1].y3*s.scale+" ":l+="M "+h.segments[h.segments.length-1].x2*s.scale+" "+h.segments[h.segments.length-1].y2*s.scale+" ",o=h.segments.length-1;o>=0;o--)l+=h.segments[o].type+" ",h.segments[o].hasOwnProperty("x3")&&(l+=h.segments[o].x2*s.scale+" "+h.segments[o].y2*s.scale+" "),l+=h.segments[o].x1*s.scale+" "+h.segments[o].y1*s.scale+" ";else for(h.segments[h.segments.length-1].hasOwnProperty("x3")?l+="M "+t.roundtodec(h.segments[h.segments.length-1].x3*s.scale)+" "+t.roundtodec(h.segments[h.segments.length-1].y3*s.scale)+" ":l+="M "+t.roundtodec(h.segments[h.segments.length-1].x2*s.scale)+" "+t.roundtodec(h.segments[h.segments.length-1].y2*s.scale)+" ",o=h.segments.length-1;o>=0;o--)l+=h.segments[o].type+" ",h.segments[o].hasOwnProperty("x3")&&(l+=t.roundtodec(h.segments[o].x2*s.scale)+" "+t.roundtodec(h.segments[o].y2*s.scale)+" "),l+=t.roundtodec(h.segments[o].x1*s.scale)+" "+t.roundtodec(h.segments[o].y1*s.scale)+" ";l+="Z "}if(l+='" />',s.lcpr||s.qcpr){for(o=0;o<i.segments.length;o++)i.segments[o].hasOwnProperty("x3")&&s.qcpr&&(l+='<circle cx="'+i.segments[o].x2*s.scale+'" cy="'+i.segments[o].y2*s.scale+'" r="'+s.qcpr+'" fill="cyan" stroke-width="'+.2*s.qcpr+'" stroke="black" />',l+='<circle cx="'+i.segments[o].x3*s.scale+'" cy="'+i.segments[o].y3*s.scale+'" r="'+s.qcpr+'" fill="white" stroke-width="'+.2*s.qcpr+'" stroke="black" />',l+='<line x1="'+i.segments[o].x1*s.scale+'" y1="'+i.segments[o].y1*s.scale+'" x2="'+i.segments[o].x2*s.scale+'" y2="'+i.segments[o].y2*s.scale+'" stroke-width="'+.2*s.qcpr+'" stroke="cyan" />',l+='<line x1="'+i.segments[o].x2*s.scale+'" y1="'+i.segments[o].y2*s.scale+'" x2="'+i.segments[o].x3*s.scale+'" y2="'+i.segments[o].y3*s.scale+'" stroke-width="'+.2*s.qcpr+'" stroke="cyan" />'),!i.segments[o].hasOwnProperty("x3")&&s.lcpr&&(l+='<circle cx="'+i.segments[o].x2*s.scale+'" cy="'+i.segments[o].y2*s.scale+'" r="'+s.lcpr+'" fill="white" stroke-width="'+.2*s.lcpr+'" stroke="black" />');for(c=0;c<i.holechildren.length;c++)for(h=a[i.holechildren[c]],o=0;o<h.segments.length;o++)h.segments[o].hasOwnProperty("x3")&&s.qcpr&&(l+='<circle cx="'+h.segments[o].x2*s.scale+'" cy="'+h.segments[o].y2*s.scale+'" r="'+s.qcpr+'" fill="cyan" stroke-width="'+.2*s.qcpr+'" stroke="black" />',l+='<circle cx="'+h.segments[o].x3*s.scale+'" cy="'+h.segments[o].y3*s.scale+'" r="'+s.qcpr+'" fill="white" stroke-width="'+.2*s.qcpr+'" stroke="black" />',l+='<line x1="'+h.segments[o].x1*s.scale+'" y1="'+h.segments[o].y1*s.scale+'" x2="'+h.segments[o].x2*s.scale+'" y2="'+h.segments[o].y2*s.scale+'" stroke-width="'+.2*s.qcpr+'" stroke="cyan" />',l+='<line x1="'+h.segments[o].x2*s.scale+'" y1="'+h.segments[o].y2*s.scale+'" x2="'+h.segments[o].x3*s.scale+'" y2="'+h.segments[o].y3*s.scale+'" stroke-width="'+.2*s.qcpr+'" stroke="cyan" />'),!h.segments[o].hasOwnProperty("x3")&&s.lcpr&&(l+='<circle cx="'+h.segments[o].x2*s.scale+'" cy="'+h.segments[o].y2*s.scale+'" r="'+s.lcpr+'" fill="white" stroke-width="'+.2*s.lcpr+'" stroke="black" />')}return l},this.getsvgstring=function(e,n){n=t.checkoptions(n);for(var r=e.width*n.scale,s=e.height*n.scale,o="<svg "+(n.viewbox?'viewBox="0 0 '+r+" "+s+'" ':'width="'+r+'" height="'+s+'" ')+'version="1.1" xmlns="http://www.w3.org/2000/svg" desc="Created with image_tracer.js version '+t.versionnumber+'" >',a=0;a<e.layers.length;a++)for(var i=0;i<e.layers[a].length;i++)e.layers[a][i].isholepath||(o+=t.svgpathstring(e,a,i,n));return o+"</svg>"},this.compareNumbers=function(t,e){return t-e},this.torgbastr=function(t){return"rgba("+t.r+","+t.g+","+t.b+","+t.a+")"},this.tosvgcolorstr=function(t,e){return'fill="rgb('+t.r+","+t.g+","+t.b+')" stroke="rgb('+t.r+","+t.g+","+t.b+')" stroke-width="'+e.strokewidth+'" opacity="'+t.a/255+'" '},this.appendSVGString=function(t,e){var n;e?(n=document.getElementById(e))||((n=document.createElement("div")).id=e,document.body.appendChild(n)):(n=document.createElement("div"),document.body.appendChild(n)),n.innerHTML+=t},this.gks=[[.27901,.44198,.27901],[.135336,.228569,.272192,.228569,.135336],[.086776,.136394,.178908,.195843,.178908,.136394,.086776],[.063327,.093095,.122589,.144599,.152781,.144599,.122589,.093095,.063327],[.049692,.069304,.089767,.107988,.120651,.125194,.120651,.107988,.089767,.069304,.049692]],this.blur=function(e,n,r){var s,o,a,i,l,c,h,g,d,p={width:e.width,height:e.height,data:[]};if((n=Math.floor(n))<1)return e;n>5&&(n=5),(r=Math.abs(r))>1024&&(r=1024);var u=t.gks[n-1];for(o=0;o<e.height;o++)for(s=0;s<e.width;s++){for(l=0,c=0,h=0,g=0,d=0,a=-n;a<n+1;a++)s+a>0&&s+a<e.width&&(i=4*(o*e.width+s+a),l+=e.data[i]*u[a+n],c+=e.data[i+1]*u[a+n],h+=e.data[i+2]*u[a+n],g+=e.data[i+3]*u[a+n],d+=u[a+n]);i=4*(o*e.width+s),p.data[i]=Math.floor(l/d),p.data[i+1]=Math.floor(c/d),p.data[i+2]=Math.floor(h/d),p.data[i+3]=Math.floor(g/d)}var m=new Uint8ClampedArray(p.data);for(o=0;o<e.height;o++)for(s=0;s<e.width;s++){for(l=0,c=0,h=0,g=0,d=0,a=-n;a<n+1;a++)o+a>0&&o+a<e.height&&(l+=m[i=4*((o+a)*e.width+s)]*u[a+n],c+=m[i+1]*u[a+n],h+=m[i+2]*u[a+n],g+=m[i+3]*u[a+n],d+=u[a+n]);i=4*(o*e.width+s),p.data[i]=Math.floor(l/d),p.data[i+1]=Math.floor(c/d),p.data[i+2]=Math.floor(h/d),p.data[i+3]=Math.floor(g/d)}for(o=0;o<e.height;o++)for(s=0;s<e.width;s++)i=4*(o*e.width+s),Math.abs(p.data[i]-e.data[i])+Math.abs(p.data[i+1]-e.data[i+1])+Math.abs(p.data[i+2]-e.data[i+2])+Math.abs(p.data[i+3]-e.data[i+3])>r&&(p.data[i]=e.data[i],p.data[i+1]=e.data[i+1],p.data[i+2]=e.data[i+2],p.data[i+3]=e.data[i+3]);return p},this.loadImage=function(t,e,n){var r=new Image;n&&n.corsenabled&&(r.crossOrigin="Anonymous"),r.onload=function(){var t=null;try{if("undefined"==typeof OffscreenCanvas)throw new Error("Impossible to create OffscreenCanvas in this web environment.");t=new OffscreenCanvas(r.width,r.height)}catch(n){(t=document.createElement("canvas")).width=r.width,t.height=r.height}t.getContext("2d").drawImage(r,0,0),e(t)},r.src=t},this.getImgdata=function(t){return t.getContext("2d").getImageData(0,0,t.width,t.height)},this.specpalette=[{r:0,g:0,b:0,a:255},{r:128,g:128,b:128,a:255},{r:0,g:0,b:128,a:255},{r:64,g:64,b:128,a:255},{r:192,g:192,b:192,a:255},{r:255,g:255,b:255,a:255},{r:128,g:128,b:192,a:255},{r:0,g:0,b:192,a:255},{r:128,g:0,b:0,a:255},{r:128,g:64,b:64,a:255},{r:128,g:0,b:128,a:255},{r:168,g:168,b:168,a:255},{r:192,g:128,b:128,a:255},{r:192,g:0,b:0,a:255},{r:255,g:255,b:255,a:255},{r:0,g:128,b:0,a:255}]}).imagedataToSVG(t,e))}catch(s){r(null)}}))}; return fu;
/*
var fu = async function(image_data, options){return new Promise(function(resolve, reject){

    "use strict";
	function ImageTracer(){
		var _this = this;

		this.versionnumber = '1.2.6',

		////////////////////////////////////////////////////////////
		//
		//  API
		//
		////////////////////////////////////////////////////////////

		// Loading an image from a URL, tracing when loaded,
		// then executing callback with the scaled svg string as argument
		this.imageToSVG = function( url, callback, options ){
			options = _this.checkoptions(options);
			// loading image, tracing and callback
			_this.loadImage(
				url,
				function(canvas){
					callback(
						_this.imagedataToSVG( _this.getImgdata(canvas), options )
					);
				},
				options
			);
		},// End of imageToSVG()

		// Tracing imagedata, then returning the scaled svg string
		this.imagedataToSVG = function( imgd, options ){
			options = _this.checkoptions(options);
			// tracing imagedata
			var td = _this.imagedataToTracedata( imgd, options );
			// returning SVG string
			return _this.getsvgstring(td, options);
		},// End of imagedataToSVG()

		// Loading an image from a URL, tracing when loaded,
		// then executing callback with tracedata as argument
		this.imageToTracedata = function( url, callback, options ){
			options = _this.checkoptions(options);
			// loading image, tracing and callback
			_this.loadImage(
					url,
					function(canvas){
						callback(
							_this.imagedataToTracedata( _this.getImgdata(canvas), options )
						);
					},
					options
			);
		},// End of imageToTracedata()

		// Tracing imagedata, then returning tracedata (layers with paths, palette, image size)
		this.imagedataToTracedata = function( imgd, options ){
			options = _this.checkoptions(options);

			// 1. Color quantization
			var ii = _this.colorquantization( imgd, options );

			if(options.layering === 0){// Sequential layering

				// create tracedata object
				var tracedata = {
					layers : [],
					palette : ii.palette,
					width : ii.array[0].length-2,
					height : ii.array.length-2
				};

				// Loop to trace each color layer
				for(var colornum=0; colornum<ii.palette.length; colornum++){

					// layeringstep -> pathscan -> internodes -> batchtracepaths
					var tracedlayer =
						_this.batchtracepaths(

							_this.internodes(

								_this.pathscan(
									_this.layeringstep( ii, colornum ),
									options.pathomit
								),

								options

							),

							options.ltres,
							options.qtres

						);

					// adding traced layer
					tracedata.layers.push(tracedlayer);

				}// End of color loop

			}else{// Parallel layering
				// 2. Layer separation and edge detection
				var ls = _this.layering( ii );

				// Optional edge node visualization
				if(options.layercontainerid){ _this.drawLayers( ls, _this.specpalette, options.scale, options.layercontainerid ); }

				// 3. Batch pathscan
				var bps = _this.batchpathscan( ls, options.pathomit );

				// 4. Batch interpollation
				var bis = _this.batchinternodes( bps, options );

				// 5. Batch tracing and creating tracedata object
				var tracedata = {
					layers : _this.batchtracelayers( bis, options.ltres, options.qtres ),
					palette : ii.palette,
					width : imgd.width,
					height : imgd.height
				};

			}// End of parallel layering

			// return tracedata
			return tracedata;

		},// End of imagedataToTracedata()

		this.optionpresets = {
			'default': {

				// Tracing
				corsenabled : false,
				ltres : 1,
				qtres : 1,
				pathomit : 8,
				rightangleenhance : true,

				// Color quantization
				colorsampling : 2,
				numberofcolors : 16,
				mincolorratio : 0,
				colorquantcycles : 3,

				// Layering method
				layering : 0,

				// SVG rendering
				strokewidth : 1,
				linefilter : false,
				scale : 1,
				roundcoords : 1,
				viewbox : false,
				desc : false,
				lcpr : 0,
				qcpr : 0,

				// Blur
				blurradius : 0,
				blurdelta : 20

			},
			'posterized1': { colorsampling:0, numberofcolors:2 },
			'posterized2': { numberofcolors:4, blurradius:5 },
			'curvy': { ltres:0.01, linefilter:true, rightangleenhance:false },
			'sharp': { qtres:0.01, linefilter:false },
			'detailed': { pathomit:0, roundcoords:2, ltres:0.5, qtres:0.5, numberofcolors:64 },
			'smoothed': { blurradius:5, blurdelta: 64 },
			'grayscale': { colorsampling:0, colorquantcycles:1, numberofcolors:7 },
			'fixedpalette': { colorsampling:0, colorquantcycles:1, numberofcolors:27 },
			'randomsampling1': { colorsampling:1, numberofcolors:8 },
			'randomsampling2': { colorsampling:1, numberofcolors:64 },
			'artistic1': { colorsampling:0, colorquantcycles:1, pathomit:0, blurradius:5, blurdelta: 64, ltres:0.01, linefilter:true, numberofcolors:16, strokewidth:2 },
			'artistic2': { qtres:0.01, colorsampling:0, colorquantcycles:1, numberofcolors:4, strokewidth:0 },
			'artistic3': { qtres:10, ltres:10, numberofcolors:8 },
			'artistic4': { qtres:10, ltres:10, numberofcolors:64, blurradius:5, blurdelta: 256, strokewidth:2 },
			'posterized3': { ltres: 1, qtres: 1, pathomit: 20, rightangleenhance: true, colorsampling: 0, numberofcolors: 3,
				mincolorratio: 0, colorquantcycles: 3, blurradius: 3, blurdelta: 20, strokewidth: 0, linefilter: false,
				roundcoords: 1, pal: [ { r: 0, g: 0, b: 100, a: 255 }, { r: 255, g: 255, b: 255, a: 255 } ] }
		},// End of optionpresets

		// creating options object, setting defaults for missing values
		this.checkoptions = function(options){
			options = options || {};
			// Option preset
			if(typeof options === 'string'){
				options = options.toLowerCase();
				if( _this.optionpresets[options] ){ options = _this.optionpresets[options]; }else{ options = {}; }
			}
			// Defaults
			var ok = Object.keys(_this.optionpresets['default']);
			for(var k=0; k<ok.length; k++){
				if(!options.hasOwnProperty(ok[k])){ options[ok[k]] = _this.optionpresets['default'][ok[k]]; }
			}
			// options.pal is not defined here, the custom palette should be added externally: options.pal = [ { 'r':0, 'g':0, 'b':0, 'a':255 }, {...}, ... ];
			// options.layercontainerid is not defined here, can be added externally: options.layercontainerid = 'mydiv'; ... <div id="mydiv"></div>
			return options;
		},// End of checkoptions()

		////////////////////////////////////////////////////////////
		//
		//  Vectorizing functions
		//
		////////////////////////////////////////////////////////////

		// 1. Color quantization
		// Using a form of k-means clustering repeatead options.colorquantcycles times. http://en.wikipedia.org/wiki/Color_quantization
		this.colorquantization = function( imgd, options ){
			var arr = [], idx=0, cd,cdl,ci, paletteacc = [], pixelnum = imgd.width * imgd.height, i, j, k, cnt, palette;

			// imgd.data must be RGBA, not just RGB
			if( imgd.data.length < pixelnum * 4 ){
				var newimgddata = new Uint8ClampedArray(pixelnum * 4);
				for(var pxcnt = 0; pxcnt < pixelnum ; pxcnt++){
					newimgddata[pxcnt*4  ] = imgd.data[pxcnt*3  ];
					newimgddata[pxcnt*4+1] = imgd.data[pxcnt*3+1];
					newimgddata[pxcnt*4+2] = imgd.data[pxcnt*3+2];
					newimgddata[pxcnt*4+3] = 255;
				}
				imgd.data = newimgddata;
			}// End of RGBA imgd.data check

			// Filling arr (color index array) with -1
			for( j=0; j<imgd.height+2; j++ ){ arr[j]=[]; for(i=0; i<imgd.width+2 ; i++){ arr[j][i] = -1; } }

			// Use custom palette if pal is defined or sample / generate custom length palette
			if(options.pal){
				palette = options.pal;
			}else if(options.colorsampling === 0){
				palette = _this.generatepalette(options.numberofcolors);
			}else if(options.colorsampling === 1){
				palette = _this.samplepalette( options.numberofcolors, imgd );
			}else{
				palette = _this.samplepalette2( options.numberofcolors, imgd );
			}

			// Selective Gaussian blur preprocessing
			if( options.blurradius > 0 ){ imgd = _this.blur( imgd, options.blurradius, options.blurdelta ); }

			// Repeat clustering step options.colorquantcycles times
			for( cnt=0; cnt < options.colorquantcycles; cnt++ ){

				// Average colors from the second iteration
				if(cnt>0){
					// averaging paletteacc for palette
					for( k=0; k < palette.length; k++ ){

						// averaging
						if( paletteacc[k].n > 0 ){
							palette[k] = {  r: Math.floor( paletteacc[k].r / paletteacc[k].n ),
											g: Math.floor( paletteacc[k].g / paletteacc[k].n ),
											b: Math.floor( paletteacc[k].b / paletteacc[k].n ),
											a:  Math.floor( paletteacc[k].a / paletteacc[k].n ) };
						}

						// Randomizing a color, if there are too few pixels and there will be a new cycle
						if( ( paletteacc[k].n/pixelnum < options.mincolorratio ) && ( cnt < options.colorquantcycles-1 ) ){
							palette[k] = {  r: Math.floor(Math.random()*255),
											g: Math.floor(Math.random()*255),
											b: Math.floor(Math.random()*255),
											a: Math.floor(Math.random()*255) };
						}

					}// End of palette loop
				}// End of Average colors from the second iteration

				// Reseting palette accumulator for averaging
				for( i=0; i < palette.length; i++ ){ paletteacc[i] = { r:0, g:0, b:0, a:0, n:0 }; }

				// loop through all pixels
				for( j=0; j < imgd.height; j++ ){
					for( i=0; i < imgd.width; i++ ){

						// pixel index
						idx = (j*imgd.width+i)*4;

						// find closest color from palette by measuring (rectilinear) color distance between this pixel and all palette colors
						ci=0; cdl = 1024; // 4 * 256 is the maximum RGBA distance
						for( k=0; k<palette.length; k++ ){

							// In my experience, https://en.wikipedia.org/wiki/Rectilinear_distance works better than https://en.wikipedia.org/wiki/Euclidean_distance
							cd =
								( palette[k].r > imgd.data[idx  ] ? palette[k].r - imgd.data[idx  ] : imgd.data[idx  ] - palette[k].r ) +
								( palette[k].g > imgd.data[idx+1] ? palette[k].g - imgd.data[idx+1] : imgd.data[idx+1] - palette[k].g ) +
								( palette[k].b > imgd.data[idx+2] ? palette[k].b - imgd.data[idx+2] : imgd.data[idx+2] - palette[k].b ) +
								( palette[k].a > imgd.data[idx+3] ? palette[k].a - imgd.data[idx+3] : imgd.data[idx+3] - palette[k].a );

							// Remember this color if this is the closest yet
							if(cd<cdl){ cdl = cd; ci = k; }

						}// End of palette loop

						// add to palettacc
						paletteacc[ci].r += imgd.data[idx  ];
						paletteacc[ci].g += imgd.data[idx+1];
						paletteacc[ci].b += imgd.data[idx+2];
						paletteacc[ci].a += imgd.data[idx+3];
						paletteacc[ci].n++;

						// update the indexed color array
						arr[j+1][i+1] = ci;

					}// End of i loop
				}// End of j loop

			}// End of Repeat clustering step options.colorquantcycles times

			return { array:arr, palette:palette };

		},// End of colorquantization()

		// Sampling a palette from imagedata
		this.samplepalette = function( numberofcolors, imgd ){
			var idx, palette=[];
			for(var i=0; i<numberofcolors; i++){
				idx = Math.floor( Math.random() * imgd.data.length / 4 ) * 4;
				palette.push({ r:imgd.data[idx  ], g:imgd.data[idx+1], b:imgd.data[idx+2], a:imgd.data[idx+3] });
			}
			return palette;
		},// End of samplepalette()

		// Deterministic sampling a palette from imagedata: rectangular grid
		this.samplepalette2 = function( numberofcolors, imgd ){
			var idx, palette=[], ni = Math.ceil(Math.sqrt(numberofcolors)), nj = Math.ceil(numberofcolors/ni),
				vx = imgd.width / (ni+1), vy = imgd.height / (nj+1);
			for(var j=0; j<nj; j++){
				for(var i=0; i<ni; i++){
					if(palette.length === numberofcolors){
						break;
					}else{
						idx = Math.floor( ((j+1)*vy) * imgd.width + ((i+1)*vx) ) * 4;
						palette.push( { r:imgd.data[idx], g:imgd.data[idx+1], b:imgd.data[idx+2], a:imgd.data[idx+3] } );
					}
				}
			}
			return palette;
		},// End of samplepalette2()

		// Generating a palette with numberofcolors
		this.generatepalette = function(numberofcolors){
			var palette = [], rcnt, gcnt, bcnt;
			if(numberofcolors<8){

				// Grayscale
				var graystep = Math.floor(255/(numberofcolors-1));
				for(var i=0; i<numberofcolors; i++){ palette.push({ r:i*graystep, g:i*graystep, b:i*graystep, a:255 }); }

			}else{

				// RGB color cube
				var colorqnum = Math.floor(Math.pow(numberofcolors, 1/3)), // Number of points on each edge on the RGB color cube
					colorstep = Math.floor(255/(colorqnum-1)), // distance between points
					rndnum = numberofcolors - colorqnum*colorqnum*colorqnum; // number of random colors

				for(rcnt=0; rcnt<colorqnum; rcnt++){
					for(gcnt=0; gcnt<colorqnum; gcnt++){
						for(bcnt=0; bcnt<colorqnum; bcnt++){
							palette.push( { r:rcnt*colorstep, g:gcnt*colorstep, b:bcnt*colorstep, a:255 } );
						}// End of blue loop
					}// End of green loop
				}// End of red loop

				// Rest is random
				for(rcnt=0; rcnt<rndnum; rcnt++){ palette.push({ r:Math.floor(Math.random()*255), g:Math.floor(Math.random()*255), b:Math.floor(Math.random()*255), a:Math.floor(Math.random()*255) }); }

			}// End of numberofcolors check

			return palette;
		},// End of generatepalette()

		// 2. Layer separation and edge detection
		// Edge node types ( ▓: this layer or 1; ░: not this layer or 0 )
		// 12  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓
		// 48  ░░  ░░  ░░  ░░  ░▓  ░▓  ░▓  ░▓  ▓░  ▓░  ▓░  ▓░  ▓▓  ▓▓  ▓▓  ▓▓
		//     0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
		this.layering = function(ii){
			// Creating layers for each indexed color in arr
			var layers = [], val=0, ah = ii.array.length, aw = ii.array[0].length, n1,n2,n3,n4,n5,n6,n7,n8, i, j, k;

			// Create layers
			for(k=0; k<ii.palette.length; k++){
				layers[k] = [];
				for(j=0; j<ah; j++){
					layers[k][j] = [];
					for(i=0; i<aw; i++){
						layers[k][j][i]=0;
					}
				}
			}

			// Looping through all pixels and calculating edge node type
			for(j=1; j<ah-1; j++){
				for(i=1; i<aw-1; i++){

					// This pixel's indexed color
					val = ii.array[j][i];

					// Are neighbor pixel colors the same?
					n1 = ii.array[j-1][i-1]===val ? 1 : 0;
					n2 = ii.array[j-1][i  ]===val ? 1 : 0;
					n3 = ii.array[j-1][i+1]===val ? 1 : 0;
					n4 = ii.array[j  ][i-1]===val ? 1 : 0;
					n5 = ii.array[j  ][i+1]===val ? 1 : 0;
					n6 = ii.array[j+1][i-1]===val ? 1 : 0;
					n7 = ii.array[j+1][i  ]===val ? 1 : 0;
					n8 = ii.array[j+1][i+1]===val ? 1 : 0;

					// this pixel's type and looking back on previous pixels
					layers[val][j+1][i+1] = 1 + n5 * 2 + n8 * 4 + n7 * 8 ;
					if(!n4){ layers[val][j+1][i  ] = 0 + 2 + n7 * 4 + n6 * 8 ; }
					if(!n2){ layers[val][j  ][i+1] = 0 + n3*2 + n5 * 4 + 8 ; }
					if(!n1){ layers[val][j  ][i  ] = 0 + n2*2 + 4 + n4 * 8 ; }

				}// End of i loop
			}// End of j loop

			return layers;
		},// End of layering()

		// 2. Layer separation and edge detection
		// Edge node types ( ▓: this layer or 1; ░: not this layer or 0 )
		// 12  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓  ░░  ▓░  ░▓  ▓▓
		// 48  ░░  ░░  ░░  ░░  ░▓  ░▓  ░▓  ░▓  ▓░  ▓░  ▓░  ▓░  ▓▓  ▓▓  ▓▓  ▓▓
		//     0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
		this.layeringstep = function(ii,cnum){
			// Creating layers for each indexed color in arr
			var layer = [], val=0, ah = ii.array.length, aw = ii.array[0].length, n1,n2,n3,n4,n5,n6,n7,n8, i, j, k;

			// Create layer
			for(j=0; j<ah; j++){
				layer[j] = [];
				for(i=0; i<aw; i++){
					layer[j][i]=0;
				}
			}

			// Looping through all pixels and calculating edge node type
			for(j=1; j<ah; j++){
				for(i=1; i<aw; i++){
					layer[j][i] =
						( ii.array[j-1][i-1]===cnum ? 1 : 0 ) +
						( ii.array[j-1][i]===cnum ? 2 : 0 ) +
						( ii.array[j][i-1]===cnum ? 8 : 0 ) +
						( ii.array[j][i]===cnum ? 4 : 0 )
					;
				}// End of i loop
			}// End of j loop

			return layer;
		},// End of layeringstep()

		// Point in polygon test
		this.pointinpoly = function( p, pa ){
			var isin=false;

			for(var i=0,j=pa.length-1; i<pa.length; j=i++){
				isin =
					( ((pa[i].y > p.y) !== (pa[j].y > p.y)) && (p.x < (pa[j].x - pa[i].x) * (p.y - pa[i].y) / (pa[j].y - pa[i].y) + pa[i].x) )
					? !isin : isin;
			}

			return isin;
		},

		// Lookup tables for pathscan
		// pathscan_combined_lookup[ arr[py][px] ][ dir ] = [nextarrpypx, nextdir, deltapx, deltapy];
		this.pathscan_combined_lookup = [
			[[-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1]],// arr[py][px]===0 is invalid
			[[ 0, 1, 0,-1], [-1,-1,-1,-1], [-1,-1,-1,-1], [ 0, 2,-1, 0]],
			[[-1,-1,-1,-1], [-1,-1,-1,-1], [ 0, 1, 0,-1], [ 0, 0, 1, 0]],
			[[ 0, 0, 1, 0], [-1,-1,-1,-1], [ 0, 2,-1, 0], [-1,-1,-1,-1]],

			[[-1,-1,-1,-1], [ 0, 0, 1, 0], [ 0, 3, 0, 1], [-1,-1,-1,-1]],
			[[13, 3, 0, 1], [13, 2,-1, 0], [ 7, 1, 0,-1], [ 7, 0, 1, 0]],
			[[-1,-1,-1,-1], [ 0, 1, 0,-1], [-1,-1,-1,-1], [ 0, 3, 0, 1]],
			[[ 0, 3, 0, 1], [ 0, 2,-1, 0], [-1,-1,-1,-1], [-1,-1,-1,-1]],

			[[ 0, 3, 0, 1], [ 0, 2,-1, 0], [-1,-1,-1,-1], [-1,-1,-1,-1]],
			[[-1,-1,-1,-1], [ 0, 1, 0,-1], [-1,-1,-1,-1], [ 0, 3, 0, 1]],
			[[11, 1, 0,-1], [14, 0, 1, 0], [14, 3, 0, 1], [11, 2,-1, 0]],
			[[-1,-1,-1,-1], [ 0, 0, 1, 0], [ 0, 3, 0, 1], [-1,-1,-1,-1]],

			[[ 0, 0, 1, 0], [-1,-1,-1,-1], [ 0, 2,-1, 0], [-1,-1,-1,-1]],
			[[-1,-1,-1,-1], [-1,-1,-1,-1], [ 0, 1, 0,-1], [ 0, 0, 1, 0]],
			[[ 0, 1, 0,-1], [-1,-1,-1,-1], [-1,-1,-1,-1], [ 0, 2,-1, 0]],
			[[-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1], [-1,-1,-1,-1]]// arr[py][px]===15 is invalid
		],

		// 3. Walking through an edge node array, discarding edge node types 0 and 15 and creating paths from the rest.
		// Walk directions (dir): 0 > ; 1 ^ ; 2 < ; 3 v
		this.pathscan = function( arr, pathomit ){
			var paths=[], pacnt=0, pcnt=0, px=0, py=0, w = arr[0].length, h = arr.length,
				dir=0, pathfinished=true, holepath=false, lookuprow;

			for(var j=0; j<h; j++){
				for(var i=0; i<w; i++){
					if( (arr[j][i] == 4) || ( arr[j][i] == 11) ){ // Other values are not valid

						// Init
						px = i; py = j;
						paths[pacnt] = {};
						paths[pacnt].points = [];
						paths[pacnt].boundingbox = [px,py,px,py];
						paths[pacnt].holechildren = [];
						pathfinished = false;
						pcnt=0;
						holepath = (arr[j][i]==11);
						dir = 1;

						// Path points loop
						while(!pathfinished){

							// New path point
							paths[pacnt].points[pcnt] = {};
							paths[pacnt].points[pcnt].x = px-1;
							paths[pacnt].points[pcnt].y = py-1;
							paths[pacnt].points[pcnt].t = arr[py][px];

							// Bounding box
							if( (px-1) < paths[pacnt].boundingbox[0] ){ paths[pacnt].boundingbox[0] = px-1; }
							if( (px-1) > paths[pacnt].boundingbox[2] ){ paths[pacnt].boundingbox[2] = px-1; }
							if( (py-1) < paths[pacnt].boundingbox[1] ){ paths[pacnt].boundingbox[1] = py-1; }
							if( (py-1) > paths[pacnt].boundingbox[3] ){ paths[pacnt].boundingbox[3] = py-1; }

							// Next: look up the replacement, direction and coordinate changes = clear this cell, turn if required, walk forward
							lookuprow = _this.pathscan_combined_lookup[ arr[py][px] ][ dir ];
							arr[py][px] = lookuprow[0]; dir = lookuprow[1]; px += lookuprow[2]; py += lookuprow[3];

							// Close path
							if( (px-1 === paths[pacnt].points[0].x ) && ( py-1 === paths[pacnt].points[0].y ) ){
								pathfinished = true;

								// Discarding paths shorter than pathomit
								if( paths[pacnt].points.length < pathomit ){
									paths.pop();
								}else{

									paths[pacnt].isholepath = holepath ? true : false;

									// Finding the parent shape for this hole
									if(holepath){

										var parentidx = 0, parentbbox = [-1,-1,w+1,h+1];
										for(var parentcnt=0; parentcnt < pacnt; parentcnt++){
											if( (!paths[parentcnt].isholepath) &&
												_this.boundingboxincludes( paths[parentcnt].boundingbox , paths[pacnt].boundingbox ) &&
												_this.boundingboxincludes( parentbbox , paths[parentcnt].boundingbox ) &&
												_this.pointinpoly( paths[pacnt].points[0], paths[parentcnt].points )
											){
												parentidx = parentcnt;
												parentbbox = paths[parentcnt].boundingbox;
											}
										}

										paths[parentidx].holechildren.push( pacnt );

									}// End of holepath parent finding

									pacnt++;

								}

							}// End of Close path

							pcnt++;

						}// End of Path points loop

					}// End of Follow path

				}// End of i loop
			}// End of j loop

			return paths;
		},// End of pathscan()

		this.boundingboxincludes = function( parentbbox, childbbox ){
			return ( ( parentbbox[0] < childbbox[0] ) && ( parentbbox[1] < childbbox[1] ) && ( parentbbox[2] > childbbox[2] ) && ( parentbbox[3] > childbbox[3] ) );
		},// End of boundingboxincludes()

		// 3. Batch pathscan
		this.batchpathscan = function( layers, pathomit ){
			var bpaths = [];
			for(var k in layers){
				if(!layers.hasOwnProperty(k)){ continue; }
				bpaths[k] = _this.pathscan( layers[k], pathomit );
			}
			return bpaths;
		},

		// 4. interpollating between path points for nodes with 8 directions ( East, SouthEast, S, SW, W, NW, N, NE )
		this.internodes = function( paths, options ){
			var ins = [], palen=0, nextidx=0, nextidx2=0, previdx=0, previdx2=0, pacnt, pcnt;

			// paths loop
			for(pacnt=0; pacnt<paths.length; pacnt++){

				ins[pacnt] = {};
				ins[pacnt].points = [];
				ins[pacnt].boundingbox = paths[pacnt].boundingbox;
				ins[pacnt].holechildren = paths[pacnt].holechildren;
				ins[pacnt].isholepath = paths[pacnt].isholepath;
				palen = paths[pacnt].points.length;

				// pathpoints loop
				for(pcnt=0; pcnt<palen; pcnt++){

					// next and previous point indexes
					nextidx = (pcnt+1)%palen; nextidx2 = (pcnt+2)%palen; previdx = (pcnt-1+palen)%palen; previdx2 = (pcnt-2+palen)%palen;

					// right angle enhance
					if( options.rightangleenhance && _this.testrightangle( paths[pacnt], previdx2, previdx, pcnt, nextidx, nextidx2 ) ){

						// Fix previous direction
						if(ins[pacnt].points.length > 0){
							ins[pacnt].points[ ins[pacnt].points.length-1 ].linesegment = _this.getdirection(
									ins[pacnt].points[ ins[pacnt].points.length-1 ].x,
									ins[pacnt].points[ ins[pacnt].points.length-1 ].y,
									paths[pacnt].points[pcnt].x,
									paths[pacnt].points[pcnt].y
								);
						}

						// This corner point
						ins[pacnt].points.push({
							x : paths[pacnt].points[pcnt].x,
							y : paths[pacnt].points[pcnt].y,
							linesegment : _this.getdirection(
									paths[pacnt].points[pcnt].x,
									paths[pacnt].points[pcnt].y,
									(( paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x ) /2),
									(( paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y ) /2)
								)
						});

					}// End of right angle enhance

					// interpolate between two path points
					ins[pacnt].points.push({
						x : (( paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x ) /2),
						y : (( paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y ) /2),
						linesegment : _this.getdirection(
								(( paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x ) /2),
								(( paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y ) /2),
								(( paths[pacnt].points[nextidx].x + paths[pacnt].points[nextidx2].x ) /2),
								(( paths[pacnt].points[nextidx].y + paths[pacnt].points[nextidx2].y ) /2)
							)
					});

				}// End of pathpoints loop

			}// End of paths loop

			return ins;
		},// End of internodes()

		this.testrightangle = function( path, idx1, idx2, idx3, idx4, idx5 ){
			return ( (( path.points[idx3].x === path.points[idx1].x) &&
					  ( path.points[idx3].x === path.points[idx2].x) &&
					  ( path.points[idx3].y === path.points[idx4].y) &&
					  ( path.points[idx3].y === path.points[idx5].y)
					 ) ||
					 (( path.points[idx3].y === path.points[idx1].y) &&
					  ( path.points[idx3].y === path.points[idx2].y) &&
					  ( path.points[idx3].x === path.points[idx4].x) &&
					  ( path.points[idx3].x === path.points[idx5].x)
					 )
			);
		},// End of testrightangle()

		this.getdirection = function( x1, y1, x2, y2 ){
			var val = 8;
			if(x1 < x2){
				if     (y1 < y2){ val = 1; }// SouthEast
				else if(y1 > y2){ val = 7; }// NE
				else            { val = 0; }// E
			}else if(x1 > x2){
				if     (y1 < y2){ val = 3; }// SW
				else if(y1 > y2){ val = 5; }// NW
				else            { val = 4; }// W
			}else{
				if     (y1 < y2){ val = 2; }// S
				else if(y1 > y2){ val = 6; }// N
				else            { val = 8; }// center, this should not happen
			}
			return val;
		},// End of getdirection()

		// 4. Batch interpollation
		this.batchinternodes = function( bpaths, options ){
			var binternodes = [];
			for (var k in bpaths) {
				if(!bpaths.hasOwnProperty(k)){ continue; }
				binternodes[k] = _this.internodes(bpaths[k], options);
			}
			return binternodes;
		},

		// 5. tracepath() : recursively trying to fit straight and quadratic spline segments on the 8 direction internode path

		// 5.1. Find sequences of points with only 2 segment types
		// 5.2. Fit a straight line on the sequence
		// 5.3. If the straight line fails (distance error > ltres), find the point with the biggest error
		// 5.4. Fit a quadratic spline through errorpoint (project this to get controlpoint), then measure errors on every point in the sequence
		// 5.5. If the spline fails (distance error > qtres), find the point with the biggest error, set splitpoint = fitting point
		// 5.6. Split sequence and recursively apply 5.2. - 5.6. to startpoint-splitpoint and splitpoint-endpoint sequences

		this.tracepath = function( path, ltres, qtres ){
			var pcnt=0, segtype1, segtype2, seqend, smp = {};
			smp.segments = [];
			smp.boundingbox = path.boundingbox;
			smp.holechildren = path.holechildren;
			smp.isholepath = path.isholepath;

			while(pcnt < path.points.length){
				// 5.1. Find sequences of points with only 2 segment types
				segtype1 = path.points[pcnt].linesegment; segtype2 = -1; seqend=pcnt+1;
				while(
					((path.points[seqend].linesegment === segtype1) || (path.points[seqend].linesegment === segtype2) || (segtype2 === -1))
					&& (seqend < path.points.length-1) ){

					if((path.points[seqend].linesegment!==segtype1) && (segtype2===-1)){ segtype2 = path.points[seqend].linesegment; }
					seqend++;

				}
				if(seqend === path.points.length-1){ seqend = 0; }

				// 5.2. - 5.6. Split sequence and recursively apply 5.2. - 5.6. to startpoint-splitpoint and splitpoint-endpoint sequences
				smp.segments = smp.segments.concat( _this.fitseq(path, ltres, qtres, pcnt, seqend) );

				// forward pcnt;
				if(seqend>0){ pcnt = seqend; }else{ pcnt = path.points.length; }

			}// End of pcnt loop

			return smp;
		},// End of tracepath()

		// 5.2. - 5.6. recursively fitting a straight or quadratic line segment on this sequence of path nodes,
		// called from tracepath()
		this.fitseq = function( path, ltres, qtres, seqstart, seqend ){
			// return if invalid seqend
			if( (seqend>path.points.length) || (seqend<0) ){ return []; }
			// variables
			var errorpoint=seqstart, errorval=0, curvepass=true, px, py, dist2;
			var tl = (seqend-seqstart); if(tl<0){ tl += path.points.length; }
			var vx = (path.points[seqend].x-path.points[seqstart].x) / tl,
				vy = (path.points[seqend].y-path.points[seqstart].y) / tl;

			// 5.2. Fit a straight line on the sequence
			var pcnt = (seqstart+1) % path.points.length, pl;
			while(pcnt != seqend){
				pl = pcnt-seqstart; if(pl<0){ pl += path.points.length; }
				px = path.points[seqstart].x + vx * pl; py = path.points[seqstart].y + vy * pl;
				dist2 = (path.points[pcnt].x-px)*(path.points[pcnt].x-px) + (path.points[pcnt].y-py)*(path.points[pcnt].y-py);
				if(dist2>ltres){curvepass=false;}
				if(dist2>errorval){ errorpoint=pcnt; errorval=dist2; }
				pcnt = (pcnt+1)%path.points.length;
			}
			// return straight line if fits
			if(curvepass){ return [{ type:'L', x1:path.points[seqstart].x, y1:path.points[seqstart].y, x2:path.points[seqend].x, y2:path.points[seqend].y }]; }

			// 5.3. If the straight line fails (distance error>ltres), find the point with the biggest error
			var fitpoint = errorpoint; curvepass = true; errorval = 0;

			// 5.4. Fit a quadratic spline through this point, measure errors on every point in the sequence
			// helpers and projecting to get control point
			var t=(fitpoint-seqstart)/tl, t1=(1-t)*(1-t), t2=2*(1-t)*t, t3=t*t;
			var cpx = (t1*path.points[seqstart].x + t3*path.points[seqend].x - path.points[fitpoint].x)/-t2 ,
				cpy = (t1*path.points[seqstart].y + t3*path.points[seqend].y - path.points[fitpoint].y)/-t2 ;

			// Check every point
			pcnt = seqstart+1;
			while(pcnt != seqend){
				t=(pcnt-seqstart)/tl; t1=(1-t)*(1-t); t2=2*(1-t)*t; t3=t*t;
				px = t1 * path.points[seqstart].x + t2 * cpx + t3 * path.points[seqend].x;
				py = t1 * path.points[seqstart].y + t2 * cpy + t3 * path.points[seqend].y;

				dist2 = (path.points[pcnt].x-px)*(path.points[pcnt].x-px) + (path.points[pcnt].y-py)*(path.points[pcnt].y-py);

				if(dist2>qtres){curvepass=false;}
				if(dist2>errorval){ errorpoint=pcnt; errorval=dist2; }
				pcnt = (pcnt+1)%path.points.length;
			}
			// return spline if fits
			if(curvepass){ return [{ type:'Q', x1:path.points[seqstart].x, y1:path.points[seqstart].y, x2:cpx, y2:cpy, x3:path.points[seqend].x, y3:path.points[seqend].y }]; }
			// 5.5. If the spline fails (distance error>qtres), find the point with the biggest error
			var splitpoint = fitpoint; // Earlier: Math.floor((fitpoint + errorpoint)/2);

			// 5.6. Split sequence and recursively apply 5.2. - 5.6. to startpoint-splitpoint and splitpoint-endpoint sequences
			return _this.fitseq( path, ltres, qtres, seqstart, splitpoint ).concat(
					_this.fitseq( path, ltres, qtres, splitpoint, seqend ) );

		},// End of fitseq()

		// 5. Batch tracing paths
		this.batchtracepaths = function(internodepaths,ltres,qtres){
			var btracedpaths = [];
			for(var k in internodepaths){
				if(!internodepaths.hasOwnProperty(k)){ continue; }
				btracedpaths.push( _this.tracepath(internodepaths[k],ltres,qtres) );
			}
			return btracedpaths;
		},

		// 5. Batch tracing layers
		this.batchtracelayers = function(binternodes, ltres, qtres){
			var btbis = [];
			for(var k in binternodes){
				if(!binternodes.hasOwnProperty(k)){ continue; }
				btbis[k] = _this.batchtracepaths(binternodes[k], ltres, qtres);
			}
			return btbis;
		},

		////////////////////////////////////////////////////////////
		//
		//  SVG Drawing functions
		//
		////////////////////////////////////////////////////////////

		// Rounding to given decimals https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript
		this.roundtodec = function(val,places){ return +val.toFixed(places); },

		// Getting SVG path element string from a traced path
		this.svgpathstring = function( tracedata, lnum, pathnum, options ){

			var layer = tracedata.layers[lnum], smp = layer[pathnum], str='', pcnt;

			// Line filter
			if(options.linefilter && (smp.segments.length < 3)){ return str; }

			// Starting path element, desc contains layer and path number
			str = '<path '+
				( options.desc ? ('desc="l '+lnum+' p '+pathnum+'" ') : '' ) +
				_this.tosvgcolorstr(tracedata.palette[lnum], options) +
				'd="';

			// Creating non-hole path string
			if( options.roundcoords === -1 ){
				str += 'M '+ smp.segments[0].x1 * options.scale +' '+ smp.segments[0].y1 * options.scale +' ';
				for(pcnt=0; pcnt<smp.segments.length; pcnt++){
					str += smp.segments[pcnt].type +' '+ smp.segments[pcnt].x2 * options.scale +' '+ smp.segments[pcnt].y2 * options.scale +' ';
					if(smp.segments[pcnt].hasOwnProperty('x3')){
						str += smp.segments[pcnt].x3 * options.scale +' '+ smp.segments[pcnt].y3 * options.scale +' ';
					}
				}
				str += 'Z ';
			}else{
				str += 'M '+ _this.roundtodec( smp.segments[0].x1 * options.scale, options.roundcoords ) +' '+ _this.roundtodec( smp.segments[0].y1 * options.scale, options.roundcoords ) +' ';
				for(pcnt=0; pcnt<smp.segments.length; pcnt++){
					str += smp.segments[pcnt].type +' '+ _this.roundtodec( smp.segments[pcnt].x2 * options.scale, options.roundcoords ) +' '+ _this.roundtodec( smp.segments[pcnt].y2 * options.scale, options.roundcoords ) +' ';
					if(smp.segments[pcnt].hasOwnProperty('x3')){
						str += _this.roundtodec( smp.segments[pcnt].x3 * options.scale, options.roundcoords ) +' '+ _this.roundtodec( smp.segments[pcnt].y3 * options.scale, options.roundcoords ) +' ';
					}
				}
				str += 'Z ';
			}// End of creating non-hole path string

			// Hole children
			for( var hcnt=0; hcnt < smp.holechildren.length; hcnt++){
				var hsmp = layer[ smp.holechildren[hcnt] ];
				// Creating hole path string
				if( options.roundcoords === -1 ){

					if(hsmp.segments[ hsmp.segments.length-1 ].hasOwnProperty('x3')){
						str += 'M '+ hsmp.segments[ hsmp.segments.length-1 ].x3 * options.scale +' '+ hsmp.segments[ hsmp.segments.length-1 ].y3 * options.scale +' ';
					}else{
						str += 'M '+ hsmp.segments[ hsmp.segments.length-1 ].x2 * options.scale +' '+ hsmp.segments[ hsmp.segments.length-1 ].y2 * options.scale +' ';
					}

					for(pcnt = hsmp.segments.length-1; pcnt >= 0; pcnt--){
						str += hsmp.segments[pcnt].type +' ';
						if(hsmp.segments[pcnt].hasOwnProperty('x3')){
							str += hsmp.segments[pcnt].x2 * options.scale +' '+ hsmp.segments[pcnt].y2 * options.scale +' ';
						}

						str += hsmp.segments[pcnt].x1 * options.scale +' '+ hsmp.segments[pcnt].y1 * options.scale +' ';
					}

				}else{

					if(hsmp.segments[ hsmp.segments.length-1 ].hasOwnProperty('x3')){
						str += 'M '+ _this.roundtodec( hsmp.segments[ hsmp.segments.length-1 ].x3 * options.scale ) +' '+ _this.roundtodec( hsmp.segments[ hsmp.segments.length-1 ].y3 * options.scale ) +' ';
					}else{
						str += 'M '+ _this.roundtodec( hsmp.segments[ hsmp.segments.length-1 ].x2 * options.scale ) +' '+ _this.roundtodec( hsmp.segments[ hsmp.segments.length-1 ].y2 * options.scale ) +' ';
					}

					for(pcnt = hsmp.segments.length-1; pcnt >= 0; pcnt--){
						str += hsmp.segments[pcnt].type +' ';
						if(hsmp.segments[pcnt].hasOwnProperty('x3')){
							str += _this.roundtodec( hsmp.segments[pcnt].x2 * options.scale ) +' '+ _this.roundtodec( hsmp.segments[pcnt].y2 * options.scale ) +' ';
						}
						str += _this.roundtodec( hsmp.segments[pcnt].x1 * options.scale ) +' '+ _this.roundtodec( hsmp.segments[pcnt].y1 * options.scale ) +' ';
					}


				}// End of creating hole path string

				str += 'Z '; // Close path

			}// End of holepath check

			// Closing path element
			str += '" />';

			// Rendering control points
			if(options.lcpr || options.qcpr){
				for(pcnt=0; pcnt<smp.segments.length; pcnt++){
					if( smp.segments[pcnt].hasOwnProperty('x3') && options.qcpr ){
						str += '<circle cx="'+ smp.segments[pcnt].x2 * options.scale +'" cy="'+ smp.segments[pcnt].y2 * options.scale +'" r="'+ options.qcpr +'" fill="cyan" stroke-width="'+ options.qcpr * 0.2 +'" stroke="black" />';
						str += '<circle cx="'+ smp.segments[pcnt].x3 * options.scale +'" cy="'+ smp.segments[pcnt].y3 * options.scale +'" r="'+ options.qcpr +'" fill="white" stroke-width="'+ options.qcpr * 0.2 +'" stroke="black" />';
						str += '<line x1="'+ smp.segments[pcnt].x1 * options.scale +'" y1="'+ smp.segments[pcnt].y1 * options.scale +'" x2="'+ smp.segments[pcnt].x2 * options.scale +'" y2="'+ smp.segments[pcnt].y2 * options.scale +'" stroke-width="'+ options.qcpr * 0.2 +'" stroke="cyan" />';
						str += '<line x1="'+ smp.segments[pcnt].x2 * options.scale +'" y1="'+ smp.segments[pcnt].y2 * options.scale +'" x2="'+ smp.segments[pcnt].x3 * options.scale +'" y2="'+ smp.segments[pcnt].y3 * options.scale +'" stroke-width="'+ options.qcpr * 0.2 +'" stroke="cyan" />';
					}
					if( (!smp.segments[pcnt].hasOwnProperty('x3')) && options.lcpr){
						str += '<circle cx="'+ smp.segments[pcnt].x2 * options.scale +'" cy="'+ smp.segments[pcnt].y2 * options.scale +'" r="'+ options.lcpr +'" fill="white" stroke-width="'+ options.lcpr * 0.2 +'" stroke="black" />';
					}
				}

				// Hole children control points
				for( var hcnt=0; hcnt < smp.holechildren.length; hcnt++){
					var hsmp = layer[ smp.holechildren[hcnt] ];
					for(pcnt=0; pcnt<hsmp.segments.length; pcnt++){
						if( hsmp.segments[pcnt].hasOwnProperty('x3') && options.qcpr ){
							str += '<circle cx="'+ hsmp.segments[pcnt].x2 * options.scale +'" cy="'+ hsmp.segments[pcnt].y2 * options.scale +'" r="'+ options.qcpr +'" fill="cyan" stroke-width="'+ options.qcpr * 0.2 +'" stroke="black" />';
							str += '<circle cx="'+ hsmp.segments[pcnt].x3 * options.scale +'" cy="'+ hsmp.segments[pcnt].y3 * options.scale +'" r="'+ options.qcpr +'" fill="white" stroke-width="'+ options.qcpr * 0.2 +'" stroke="black" />';
							str += '<line x1="'+ hsmp.segments[pcnt].x1 * options.scale +'" y1="'+ hsmp.segments[pcnt].y1 * options.scale +'" x2="'+ hsmp.segments[pcnt].x2 * options.scale +'" y2="'+ hsmp.segments[pcnt].y2 * options.scale +'" stroke-width="'+ options.qcpr * 0.2 +'" stroke="cyan" />';
							str += '<line x1="'+ hsmp.segments[pcnt].x2 * options.scale +'" y1="'+ hsmp.segments[pcnt].y2 * options.scale +'" x2="'+ hsmp.segments[pcnt].x3 * options.scale +'" y2="'+ hsmp.segments[pcnt].y3 * options.scale +'" stroke-width="'+ options.qcpr * 0.2 +'" stroke="cyan" />';
						}
						if( (!hsmp.segments[pcnt].hasOwnProperty('x3')) && options.lcpr){
							str += '<circle cx="'+ hsmp.segments[pcnt].x2 * options.scale +'" cy="'+ hsmp.segments[pcnt].y2 * options.scale +'" r="'+ options.lcpr +'" fill="white" stroke-width="'+ options.lcpr * 0.2 +'" stroke="black" />';
						}
					}
				}
			}// End of Rendering control points

			return str;

		},// End of svgpathstring()

		// Converting tracedata to an SVG string
		this.getsvgstring = function( tracedata, options ){

			options = _this.checkoptions(options);

			var w = tracedata.width * options.scale, h = tracedata.height * options.scale;

			// SVG start
			var svgstr = '<svg ' + (options.viewbox ? ('viewBox="0 0 '+w+' '+h+'" ') : ('width="'+w+'" height="'+h+'" ')) +
				'version="1.1" xmlns="http://www.w3.org/2000/svg" desc="Created with image_tracer.js version '+_this.versionnumber+'" >';

			// Drawing: Layers and Paths loops
			for(var lcnt=0; lcnt < tracedata.layers.length; lcnt++){
				for(var pcnt=0; pcnt < tracedata.layers[lcnt].length; pcnt++){

					// Adding SVG <path> string
					if( !tracedata.layers[lcnt][pcnt].isholepath ){
						svgstr += _this.svgpathstring( tracedata, lcnt, pcnt, options );
					}

				}// End of paths loop
			}// End of layers loop

			// SVG End
			svgstr+='</svg>';

			return svgstr;

		},// End of getsvgstring()

		// Comparator for numeric Array.sort
		this.compareNumbers = function(a,b){ return a - b; },

		// Convert color object to rgba string
		this.torgbastr = function(c){ return 'rgba('+c.r+','+c.g+','+c.b+','+c.a+')'; },

		// Convert color object to SVG color string
		this.tosvgcolorstr = function(c, options){
			return 'fill="rgb('+c.r+','+c.g+','+c.b+')" stroke="rgb('+c.r+','+c.g+','+c.b+')" stroke-width="'+options.strokewidth+'" opacity="'+c.a/255.0+'" ';
		},

		// Helper function: Appending an <svg> element to a container from an svgstring
		this.appendSVGString = function(svgstr,parentid){
			var div;
			if(parentid){
				div = document.getElementById(parentid);
				if(!div){
					div = document.createElement('div');
					div.id = parentid;
					document.body.appendChild(div);
				}
			}else{
				div = document.createElement('div');
				document.body.appendChild(div);
			}
			div.innerHTML += svgstr;
		},

		////////////////////////////////////////////////////////////
		//
		//  Canvas functions
		//
		////////////////////////////////////////////////////////////

		// Gaussian kernels for blur
		this.gks = [ [0.27901,0.44198,0.27901], [0.135336,0.228569,0.272192,0.228569,0.135336], [0.086776,0.136394,0.178908,0.195843,0.178908,0.136394,0.086776],
					 [0.063327,0.093095,0.122589,0.144599,0.152781,0.144599,0.122589,0.093095,0.063327], [0.049692,0.069304,0.089767,0.107988,0.120651,0.125194,0.120651,0.107988,0.089767,0.069304,0.049692] ],

		// Selective Gaussian blur for preprocessing
		this.blur = function(imgd,radius,delta){
			var i,j,k,d,idx,racc,gacc,bacc,aacc,wacc;

			// new ImageData
			var imgd2 = { width:imgd.width, height:imgd.height, data:[] };

			// radius and delta limits, this kernel
			radius = Math.floor(radius); if(radius<1){ return imgd; } if(radius>5){ radius = 5; } delta = Math.abs( delta ); if(delta>1024){ delta = 1024; }
			var thisgk = _this.gks[radius-1];

			// loop through all pixels, horizontal blur
			for( j=0; j < imgd.height; j++ ){
				for( i=0; i < imgd.width; i++ ){

					racc = 0; gacc = 0; bacc = 0; aacc = 0; wacc = 0;
					// gauss kernel loop
					for( k = -radius; k < radius+1; k++){
						// add weighted color values
						if( (i+k > 0) && (i+k < imgd.width) ){
							idx = (j*imgd.width+i+k)*4;
							racc += imgd.data[idx  ] * thisgk[k+radius];
							gacc += imgd.data[idx+1] * thisgk[k+radius];
							bacc += imgd.data[idx+2] * thisgk[k+radius];
							aacc += imgd.data[idx+3] * thisgk[k+radius];
							wacc += thisgk[k+radius];
						}
					}
					// The new pixel
					idx = (j*imgd.width+i)*4;
					imgd2.data[idx  ] = Math.floor(racc / wacc);
					imgd2.data[idx+1] = Math.floor(gacc / wacc);
					imgd2.data[idx+2] = Math.floor(bacc / wacc);
					imgd2.data[idx+3] = Math.floor(aacc / wacc);

				}// End of width loop
			}// End of horizontal blur

			// copying the half blurred imgd2
			var himgd = new Uint8ClampedArray(imgd2.data);

			// loop through all pixels, vertical blur
			for( j=0; j < imgd.height; j++ ){
				for( i=0; i < imgd.width; i++ ){

					racc = 0; gacc = 0; bacc = 0; aacc = 0; wacc = 0;
					// gauss kernel loop
					for( k = -radius; k < radius+1; k++){
						// add weighted color values
						if( (j+k > 0) && (j+k < imgd.height) ){
							idx = ((j+k)*imgd.width+i)*4;
							racc += himgd[idx  ] * thisgk[k+radius];
							gacc += himgd[idx+1] * thisgk[k+radius];
							bacc += himgd[idx+2] * thisgk[k+radius];
							aacc += himgd[idx+3] * thisgk[k+radius];
							wacc += thisgk[k+radius];
						}
					}
					// The new pixel
					idx = (j*imgd.width+i)*4;
					imgd2.data[idx  ] = Math.floor(racc / wacc);
					imgd2.data[idx+1] = Math.floor(gacc / wacc);
					imgd2.data[idx+2] = Math.floor(bacc / wacc);
					imgd2.data[idx+3] = Math.floor(aacc / wacc);

				}// End of width loop
			}// End of vertical blur

			// Selective blur: loop through all pixels
			for( j=0; j < imgd.height; j++ ){
				for( i=0; i < imgd.width; i++ ){

					idx = (j*imgd.width+i)*4;
					// d is the difference between the blurred and the original pixel
					d = Math.abs(imgd2.data[idx  ] - imgd.data[idx  ]) + Math.abs(imgd2.data[idx+1] - imgd.data[idx+1]) +
						Math.abs(imgd2.data[idx+2] - imgd.data[idx+2]) + Math.abs(imgd2.data[idx+3] - imgd.data[idx+3]);
					// selective blur: if d>delta, put the original pixel back
					if(d>delta){
						imgd2.data[idx  ] = imgd.data[idx  ];
						imgd2.data[idx+1] = imgd.data[idx+1];
						imgd2.data[idx+2] = imgd.data[idx+2];
						imgd2.data[idx+3] = imgd.data[idx+3];
					}
				}
			}// End of Selective blur

			return imgd2;

		},// End of blur()

		// Helper function: loading an image from a URL, then executing callback with canvas as argument
		this.loadImage = function(url,callback,options){
			var img = new Image();
			if(options && options.corsenabled){ img.crossOrigin = 'Anonymous'; }
			img.onload = function(){
				var canvas = null;
				try {
				
					if (typeof OffscreenCanvas === "undefined") {
						throw new Error("Impossible to create OffscreenCanvas in this web environment.");
					}
                
				    canvas = new OffscreenCanvas(img.width, img.height);
				} catch (e) {
				    
				    canvas = document.createElement('canvas');
				    canvas.width = img.width;
					canvas.height = img.height;
				}
				var context = canvas.getContext('2d');
				context.drawImage(img,0,0);
				callback(canvas);
			};
			img.src = url;
		},

		// Helper function: getting ImageData from a canvas
		this.getImgdata = function(canvas){
			var context = canvas.getContext('2d');
			return context.getImageData(0,0,canvas.width,canvas.height);
		},

		// Special palette to use with drawlayers()
		this.specpalette = [
			{r:0,g:0,b:0,a:255}, {r:128,g:128,b:128,a:255}, {r:0,g:0,b:128,a:255}, {r:64,g:64,b:128,a:255},
			{r:192,g:192,b:192,a:255}, {r:255,g:255,b:255,a:255}, {r:128,g:128,b:192,a:255}, {r:0,g:0,b:192,a:255},
			{r:128,g:0,b:0,a:255}, {r:128,g:64,b:64,a:255}, {r:128,g:0,b:128,a:255}, {r:168,g:168,b:168,a:255},
			{r:192,g:128,b:128,a:255}, {r:192,g:0,b:0,a:255}, {r:255,g:255,b:255,a:255}, {r:0,g:128,b:0,a:255}
		]

		// Helper function: Drawing all edge node layers into a container
		;// End of function list

		}// End of ImageTracer object


		try {
			resolve(new ImageTracer().imagedataToSVG(image_data, options));
		} catch(e) {

			reject(null);
		}
})};
*/

const image_tracer = async(image_data, options, pool) => {

	if(Boolean(pool)) {

		return pool.exec(window.image_tracer_process_function, [
			image_data,
			options,
		]).catch((e) => {

			return window.image_tracer_process_function(image_data, options);
		}).timeout(120 * 1000);

	}else {

		return window.image_tracer_process_function(image_data, options);
	}
}

module.exports = {
	image_tracer
};