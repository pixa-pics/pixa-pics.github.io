/*
MIT License

Copyright (c) 2019 Dael
Copyright (c) 2022 ViperTech & CryptoRed

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Lior Halphon's Omniscale (Modified: Uses Maxim Stepin's Color comparison routine)

import bltf from "./b64lz_to_function";
window.omniscale_process_function = bltf(`RzRRd1RnQkFaZ3JndkNBemdUd0hZR05vd3dGd0pZRDJxQUZEZ0RSNENVQTNtQUtZNHhpb1NwMER1RUFDbUFRTFo1RWRZc1ZpNUNKT21VUTBBUkRDRVJFT01IblE1WkFiblFBYkpJZ2hocXlrUGt3QnpCaEFBcUFDM3FKYkJIUUJOaU5lbzJZQkNiemx1Q0FIUzJTQUR5N0tnOEJBQU9kR0E0eU1TeUFQcDJEazZ1c3BRQVpObitRYW4yZEk3T0xnQytKbVpLVm1uRkdXNDROUG1JZ1lYcHBYQTRGVGltYWhDV09CQUF5dWdnT25RQUd1NjBERXdzemNGaEVWR3g4WWtwSTJPVFdRRDhDOG1iNHhNQVhOSGdRZ0NTcURqRUFBeVUzYjJZUW9PSGs2Uk5BUzBIbzBkd1oyQkx0Y1BvOHFnTmhyODZBQk5hYWVPWVFCWWhSRGhTSzhWWUpKSS9MWlEzYjdONVEwN25PaFhHNzNVRjlGNFE3RWZhaDR5RlEvNUVra2d5cDljRkRQQUFMM2VIbG16QVJYMFd5T1dhTGlHSTJYTzJsRDJnb09rcE9BS0JwSWVyT2VWZzUzS21qVnBzbzFrMFpnT0p3TWE1SXM2c2xNTjVYbm1ncVJLSldZdldjdTVPT2xlSXRoTU56TEpxdXFyd3ROUGRMb05TcFpQVEI2c2hMZ3VmQkFsbGhmSnRRVHRJcGlqc3hiMmpzY3N1TjFVWmpjYm94d0EyZ0JkVTErcW5qTE9Gd041clkxeXlkQ3NBWVJpaVhJZURJZEJvVUFJWUdJb0VnaURndDAwaUFBUEhSeHdCcUdlVUhERnhDbHpxeWxzNlBEUkFBY3hEd1M5TEt2RGZUYjBXUUFDWUFDS2tDamQ2UmtNQmtFQzkvdUQ4QVFXeHdBQ3lwbHNnUUVKQWZIc3lGUUw4ZnovUEFTQkFhUktESUhSUjAwSFFKMVFCQzUwb1BzQnlIQ0Jvbmc2SUoxc1RSb2xROURYMGdlQXh4Z0NjQUJaTkJnVkRGMG9nQXFZZ2RBWXVnWjJpU2daeGdGYzkwWTVpR0xBZGpPTzQxdDJ5NEVBWEJjT2dHaHZLUVpHb1RDUUZBL3cveEFBQVBYZHUwb1RRbExBUUlBRGs2RFVuQXVBSWRoaUNnbVJORXdqODJFNEFCVkNDY0MzZGNRRDRXSVhBQVFUQU1BUUVTRUFHSUN5anRMaGZrOUpQYzhyMXNNaHlDZ3FDdXlBMnhSTlBGczBRODY4RXJ2S0RiQThRSUlzdkRMYjBRUjh5QnlpdHJBSWJ6Zkk3V1Rud3d0OFJ6c2lCSE91QUJtTThxcjgzZFdKZ3NCNExBS2RORUUrZGlNVStDUUFuUEFkTlFoUzN3L01BR0x3R2NvSkF4am9yZ3hkVUZMTWhzTTJtY0FFWnR2Z1BhejIyOUJPbUxWQVoxYTB0eDJMV3dWd1dUeUFDVUFIRUFDRUxuMDZ4aUhRV0NkcklHQUhsQ2xoRUhLZ2dDM2pUc2lycWtqREg2aWRFQ0dvaVh6R3NjSnVuRUFacHN1QUZyWWxhNERXelJOc2V3Vm51azNkN29QR0xMb08wbWdsZStnNkJJUGNIcGdrNzZaYWQ2ZEJnWVJXZXB2YWJ0WElKUEowYUlRa3B0bXlnclpJV3dBR1dld3E1UHZHZzhDZ1lnd0FBUGxIWElCcm9YSkVHMTI0RGNtbWd4cjRoYWxwa1VxTHBBYmFRTVhMSER0ZzIyWjFPbmJYWnVvYkV3RkVXM3MrNzdpR2lVcmdOZzRHZmR1VnNGYVZ1OEh5VTI0YmZ1V2JJQkF4VWpSdVJCbHBndUMwK1pRU2N1OTYxV0dVMzlZdzBoUHZ4VS85ZHdBV24yNERLR3prdlZQTHNoSzlMaURpRG9PdXcvWnRkbytocVJVRERpdFJmRmtBYVJCckNtV05UVzU3UFlLSzNKaG9yWGhYUGdWSU9mTmVOL2FBRFlBSFo5cjNyZDdqbnZmRHllQ0JHYm9abko1OTllYmszdWZqZDNnQldNOFQ4b09ldHd2cXB1ZDV1K1JjSDVQMjN0a004cjlYNi96Nk85VlE1aGJBNERZSWdSQU5KTUo0RGdIdmZlbUN6ejdWZm5rUXU4SjlqcmszRHVWcURFRmpMMTNKeFVoQ3hyNjN5b0c3TWhncC81OHkvcHJWcVVETUJ5eGdQK0VBR0JoRGFsUVNHT2dBQXhIUUJCVENrREpoVFJvTUU2QkNORWVJbTROQ21Za0JrZEllUllpSkVMR1lSOEVLOThaNDNFQ0dlQUFuTVl4YU01QWl2eTNQdlZpRmlqNk1Sa0syZXcvQVFEMlJRVytOQmFjRkZhS2tTdldSR2pGR1NJWmlvM1I2aXZHYUtVVXdubS9ERzc0UDVNQXl4aTBhNkJFb3Z0TGN1OHR4YmxZc2syNFc1OXF0WDJtZUJpbWRDbjcwc1J3aUFMWm5HeGdBR3J1TWdKNG9rM2pJbEJBb1dvdVI0VEFuS0p2cW94dVlTbWtSS0NWemFKdWk0a3NHQWNrNCsrOVdxN3lTWUVWcUJTenk3MFlteFJKSlN6eGxNZ1JXQzRpQTVaNEFBTmI4SW9LcmRXZmhCUzFCS0s0U2dVOGNCd0RnRk5UQ2NpRmhjSjRYd2o0TmRubmNJZ3J3OUFMQ3huZUdJTzNRSUlBQUJHeUNleWEwb2ovWElYZGhZdENxYndXcDd5RmdJcGNYVXFnWkFBVkF0QmVDcit1OGNqWkZoU2k2cHJqa1dDbFJiR054R0xzVmdxN3BRQ2NjQjk2TjIyWWdmU0JBY0I3TU9SbFZlUGdGZzdNNVVjcWdNc2lIYmtBZkNJRlpjN2h0ekF0WGNCcjhZck10OU1rQUE2cW9IQWRCS0wrMDhqSFlxY2NRN0R4MER0RTV4QkRZNjJ5Sk9QQXVzamE2eW5HYk44OEJFQ01LQ0c4Q1laQnpvTFFXUGlHaU00NEJuanVT5AV+Z0d5aS9xZGo3V09HT1RDRnhDWk1WK2o2MXEvcWcwaG9RR0dpTmxCRnBPcGFDNnJpMmxGd1hFNXEwRVZPNVVEczJMQmNPbWNMQzBibEZUb1V0NWJUcVZ0bHRXbmNIRWFibHFGb1E1dHhBeW9WbFZYZ2RWbXFQcmFzSHJIRXFPVms3RjNJUlRIS0x0dW0zeG5idEtKQUNaM0hVRkdQQ1dCZDloOW9IVnFuVjk0U293RkRvYWppTXR0MTBHTWJ1a2R1cXgxSHFOZFFOV0pyclhtc21sYXMxZXM3V2tWSEc2K0NaNXZBSUZ5Sy9QOUlCY2hiaUEwRzRnOEI5b3dWYWtCM0l1OVlQWkdNV0JnTkVIZlV3VW9naHdELzdzandZUU9CODZVR3lEN3dRNkI3RFNHOE1vZk9tZWJTVWE0Q09zOVpDQ1lYRXlCUUJqU0lEMWdwOFF6blFPbXZBbWJBalpvdUxtNHNVQUMxTnVJY1FFdE5Nb0FWczdSSjJ0MG0zWmlhTFVIVXRNbU8xcmk3VDIzMFo2TDFEcjNYcThkbUVIYStPN1UzT2RKQUYyVnAwU3V5dDY2SjZidGxMcHk5c2xSMVFVUFFhbzFwNjFWMEQzaTV6SzE3c3EzbzR2ZTlXcHJqYlBzdGRrTFdiN2JVVHJJdCtzY3Y3c080ZUE5a2ZhdHdFUDdRd3hSMURoR1lQWWVJOWhvK1dXc09CcFEvQWFqWkFjdHBkSTJsd3BXWFV2Z2ZnT3dzZ1pXNE1JYUs3VjVEdjEwRXdYSS9Wekx4WDlwWmVTK1YzclZYOGxaWnE3a0hCaldldm5YWWRaTjgwYjZPY2NZOHgxamZFTmI4YTR6eGpOREd0aE1hRThURVR5bXUxU2NYREp3NmphVk1LYXUwcDI3WGJXMFBZMHdVRlQybWp5WURQWDUvVFY3OTNaUS9aTzB6TTZOcUNsb1pabUNpNmdnMlpncXVrV1lzTjI1cWN6NTM3NzFoMnVjQzREWUxGU3ozZm5NS2dOV05VQXNBOWhqakRqenJHUEFRUUx0K2tMc3h5SVVPK01LRUtFUnFvemZOaE1jdUVtZVRBSWlqZXFuN2JEc1cvZHRxNnRiV0swNk96bXNnMGErSUJUWW1BR0NyR3h4UUNvcG9HVDg0OXpvQm5LSmk2NWJSTkx3K2w5SDZnOGVYaklNU0lPVG9yR2dUZ25PZkdjUXlxMFNhb0xibitNNHJjN2g3QlVsNlJ2QTVYck55QTI0dHVGNWIxdUNodkF0djdkZDFkNXhHUW9meXBnR3dLTWRWWXIrUWU3REpmUXl4bFRMbVU3R1R0OGNqNjRqakhKT0RMdVFBVTRBWlQyV2M4NDZBTVh1V01pQWRCcFlxR1FOUVlRa21PQVFGMFBvYWdubG9qUkIwTVRvcWo0YUFqZ2xlcFlnUmVZSTk2UWNZTDdFQjNvd0NnRkFPSTNMcUNqUUwzQUpxTFZuS3VYY3RKVHFpUkdLTkhVU1hpY09BYTlBNzZnNHpRZEJpeGdCWE1BakY5L0JJM2VmN0loL2oyUC9kaS8wTE9WWlFVOHpldm9oa3VleHlNd1JjMml5K3ErQTRPQWkwWkFQb0MrVncvYWU2VDR0QUFtakdjQVVnZWsrSWRHOTRBbThvblFyRStCZW9ESWZHdXFnUUZ5OVFDQUpCK1kyWVR5Z29vQkdzQkJtb0pCRm9Ed1pRZ1F5Qk53Sk94VVQ0YkJMbzZ1N09rQUg0WTR0Z0U0T0JGb21nUXViT0F1eGN0Z0FrTEJrd0xzdGdBQTlKSVM2QjdGemhJVW9STUh6dk9QRnBXbThKREVjdEVPb2JvZjlKbEJvY29kWVZDQ0ZCZ1EyQ1ljV0h4RmRCeEN1SHBCUWtETFFZNGZRYzRVeEs0WnhEZG5wQkRoQnIxQTRkV0U0UzRVSkk5bnBEb2w0VGdYUVlXSDRaSnRFVUxIcFBacUVZQVQ3RTFDWVJlS1lCUER2azVDNUhvQWZsNUQ1RjFBa1Q0WVdEQk9RZDJNVWc4SUlNa0M0R3JEQWN6RW91QVZQSHBEc215aHlnY29LZzhBSUJwS2JoQWZDTFBvZ1BQcGZDU0hFTkVNNEtZSFFLMUZ3RXJFRGlPTUFzQWg0ZElweE9zVzRQUWxzWFNwUUtvYTFrcEtzUmJzRVNFbzBET0tjVDBwUWhjWUVDRVY3Z2NUQkIrTWNWNk1DTEVTTXVjVzhRQWpzWUVEb3ZjYTFxbkJibXNZRUJrUjhjQ1lqaFBOOFJrWDhYb2tYT2tmN01icEpsbEtWQlVsTVdBRE1Yb09xbWVJc1huaE9oMG9DU2NZRUcwcHNZU1JURlFLd29SaXNmaVM4VGNKY2JmS0NTRVdTV2ZEQkVjVlNhR0o4VEVqY1Rvb3lacklSazhheWVuTXdTQ2NTUmtkeVZCbzNuQ2I3ajlORk1yRStOc3RjTk1iTVppVndQdEFBSXBMRVRxVW5VbEJ3RWxFbE1UN1ExdzlnM0VVSlVBOVRNbENMTWhBa2hHTkI2a0duRWtNbnBwZTQyelBGc2svSHZIcHBUNjJtY2tqSW1tT2tBbGFsQWxDazJtR25wSGdtVUttbmluQW53bUJ6RHg4SElseW5xcG9tS2wwQllsbmhxbis0VHBLUnNURlI4bGFuTUc2a0s0a25iSHBveUNxSDhGK21oak1GV2tPazNIMm4xR2xsTnpBTE1FNkxXa0ZsY25GbjdIOEhZU05raG5qd2ZDMkk5a1N3bWtsbFBnUmsrNEJ3L1RCelJRR29vbnltSmtZbnpGY0N0UnBtWTVqcEE3bGtDbVp4WXlnN21rYnk3SFdtWnk3RW1sWXk3RTlnTVE1U3FGU1pka1c2VmxuSEZrMWtoSkhuM2xYR25ubmxTYndEZG11a0FMN2xlbGZIcHJIbWZuQ0F2bjdGU2JuUWZtQmtIbGdtOW1Qa0RrVHhBVVhrd253Z1Nuam0vVC9UQnhBenhrS256bVVUWW1ZNUE0c2xhbDduRW5HbEVVVXpCbUZrbXFzSlZZNWt1bFZsUGwwSjJraEprVWhGeDZheFZicmw1d0FVZkEva3NMY1YwcThVc1ZWWTV3RWxDazNFaW5DbWhsa1VaRUNVSVZoU1JtU25NUTNvbG9ZVnpsekhZV1VUTGtrNUJiVGtUcFhsYWxia3poaTV3NDdtUHlFV0JSR21rbnBwQzRubnBwWFM3RXlBTVMxcXFHdHFnWFhtMG05Sm1WdVZobFdXM0dNVTJWMFVrRDJXT1d0clJvZm5ObC9tOFVtbmVXL0YrWHNrVVVPWDdHdHFzWmdXaG5Xbi9saVZubWlVU1V4V1FVU3lCVUpVeVVzQklVSWxRRFk1L1JDWVZpZmg0QnFSbkE2RHI0M0tDaW9ub2x6RXBrYVZrQ3RSa0JRWVZqQ0pWWHFsVHdUNGFRU3FkemtCQVJDcStqMlNvQ0RIcjZQSzR6a1duNGppZVduNjZTY1duN3pRNVVUeW40Z1NIbE55ZVVZcllTeFVZcndBd1dVTGZvTERkVWFSc1JkdzF4U1lKeHlxY1NvQm53eTZWcG5VbW9PNklBMXdLWTNVUUtjUTZBUFdzYW5VOVZZd1dRMXl0cWZXUUxzUVBVdUJQVTlWQzdkbzF4ZUdnM0NSbnlqbFJrL1F1QnVveTRzWWNGY0d6bE5WS21xbExGbEJRQytUcUNwN3pBMXhBcFFCaUl2Z21nNFVKUUI0NERaQlVCM0xONmZnd0MxVTRuVFdtVmRqelUrVlhIV2xkaExWaFh3R3JXQmxUU2RGeVhJWFNsWlFQQ2VTU1RxbVlRamg1a2JIbVZGa09tUGh3QTNsODBNVlhGa25FRWZoTmx1a1JXTnpFRWdTQ2twWGlWUVhHM1RqaTFqa0lreG1ybGxEakNvRG1EK0IxVSt4QXFJQUFDTzhRcEFaQ000ZkdRcXhoOUJxQitxUU9jRSswcWh4VTJFRWQ3bWxhUk5JQUpONUJNK2NkeE5Od2RlSTVNQW1zbGlNS2NFNzFnTTZDY05NK1dkdUNoSzJFd04zNitwUEdMc3dDTEUxc3Vsb1kwUWdVTkdLMkxHWkFhTmZBeGwzVTFzejBuZDZkTUVYQU0xOHNpczVBc1pmQVpBejBaQWVkd05NRXlRZzlBOFNKWTlFOUNjMDlaQUJBYzl3OUM5NDkvMEs5bms2OTE0bzlXOWVkOXdaQTcwZTlJOUpVaTlDQkNCTUVRd1o5bTlFOWhxeDlyMGQ5QjlFOWVkcmFha0w5RjlXOUNjcmFMWVg5VUVsOXg2TUV3QThFRDZDd2pSelJLK2NRYlJ4QVhBSjlCS2c0QWFmV01VZ29rRExSTUR3SXlRQ0RNS3dBeURWV0VEaUFUUkdEOUF3SUJBT0RoS2VEaE1mY1FRNkQwRHBETndua0ZEU0RjQVA4cUR0RFJEVURyUndJUXd6RFZENTg3RExRZEQzRE53cjBmRHlEN1VORFFqbkRKRHNEYWs0amNBeXlVamdRd2ptRE53TFlDamhTYkRqdWl4d0FIVnhpOWNYMVFhQ3d1alpBMkN4aStqamN1UWhEeEQ5RHNEMkRRd2pjOVZRUWsxNzBaQVREbGloZG1nRDZPamc0WmorMEZqMHlsQXhqZ29walo0clVGakdXeGlWamVRYURNamRqd0k4am5rVGpQc0N3csRkRG5qUEczajZzdmplalI4SFZVR0lUUVFZVHI4bEVSR3dVeFRMUXBUNVRTeU1UTmpYRGFqeEFURHlRS1RSYzcwT1RsdW9UZmpSODljbEUxR1ZUZ1FwakJqSFY5d2d6cGpBVGhqUDg0emZqWjQ0VFpBeGlZekFhSmpQVHI4a1RyVTB6eXozVGVqWjR0dys4SFZHendUV3pKVHN6RVRSR216S3planU4N1YyV1J6bHpaanI4OWNpemR6MnpIVjFpQnpGenJ6cFNDelN6OXorMCs4OHErU256SnpPenJVZ0xoekJLRFRzandJTFRiVEJDZ282VGFUUFZiajhEbmpYaFdUMms0RFh6OWNQODF5cVRDTFBWU0xReGdvck50VnFMclVBTG5FQ3dwTHhBbVQ0Q1ZMSkxiTnhBYmo4eWxMZ2pnUU5MTExZTjFMVExtVGtDWmpERVhoYmpSUzJUV0xJTGhUWmpjTGFlQkx4TExqaExqTFpMWkFyTDNMQ3J6VFNyOUw3dXFyTExGTC9MUEx0VlhMRExRUU5MSGovTElyTUV3cmdybUw2czl6bEUrenRyVXJKQWYxZ29UdEx0dGdFR3lTOHE2QUhyamNFNG5qeEFrTkN3THJydEVkM2FrZE1FSWJxQTlaamNxaFo0T3c3MHh3eEEwYVVMQ1ROdzhEclRnenFqRERjRDdqYm9NcnRMN2picWNORmlrQ3h3UkxqdWsxZXIrYnlyaHJMUU5McUxHcmxiSGpPck1FVERackdUQXJYaFVBeGRNNExnTWJPd0Z3cGJlYmJqRndaQW9nSHJQYk1iK3hMZ3NTWXIxVFBUSXpSanh6YzdPekFUbGplTDFvb2djQU1BTmNacm1zL3JsYVFiYnJJYmFoMXNFYlViREVIdDN0TndrQyt4c2J5UUNiU2JlYlREYmp0RTVTTEdFNE5jdmJzYkE3WmJJNzJEb2dFNzFHcWgwN1ZyZVQvamdUN0NNem9Ma1R0dzBUNjc4SXJHWHJSU2g2U0hncmU3QWJ6cnpNcnJVK3Fob2JwN3VIa2JUNDZhbDdQdE43ZmJua0Q3bGFrMTJETDd4YlN1SDdYNy9iZzdjckdrSTdUREFIWDdVN003MXJYekl6MldrSFM3UXpQVFN5SFZ3VThIekFtN3RFdTcrMER1R0hRUWg3T0hlSDRiQkg1N0pIMTcwYnNiOGJpYmxhbWJzRGFiTHpIRHRqSWoyYnlUTW9MSCtiVERYcnI3SmJaYnRucXJtVHpibXJSclRMOWJLcnpudFZUYmJMcmJERVZkMkR5SDlIK3BqSFA3ZWJJN2JqSEhNYmRjWEhvSGZ6SW4vVEJueTdaalp6L3pVRzRuTEFpSERDS0hHWFBKc25CN1dId2J1SEo3eW5rbXFuWUVYdHBIR25jYmxIeWJ4bituR2I4VE5YT2JabkxRMUhCYlZuZEh6SHpYOHI1bmxiRG5sTFRudGJMbjZyYm5BM0huU3J6YkJiYmJmbmxyNzdnWGZid1g1bm9YbzdNbVg3a1h3SDNIWUhHeWJWOFhRbmVqKzhGakI4MjNFelNYQlNoM1BUZXpaQUIzcVh2c25YR2tiakpyWGpzN08zUkc4cTBUVUhCejZ6VEtiM0JTRHpwM2VqYXpQM1YzWmJiamZMTmNvclBINHI0QzljR1crS2IzdlRoVHZ6cnoxekYzQXpnbnBUOWM0Q0NQRVA4emN6S1A5emN6N1ZyVTl3Z1BRN1pBOERIcDI3UEdrN25UOXplM3ozdjNIVi8zR3k5UHRyaFQ5UEFUQ2NHVzlQNFRXNG96YlBJbm5QYjM0VDhxbExiM2pQVEtxWGtuM0dYOGxpT1hnYmVYUjdCWFliSFZLblJIdDdsWDJuMVhUVHRYZ251bndJOERwblpiMkRsblJiNVNIWDRFc3JOM2p1Tkx2WHczSExnM1JpdHZ4clkzWG5BcnZuSGI5SG5qUVhadmsxaTM0WFo0M3JhMzBYMkxIVkRyMTM1djVieUxCYmFMeWpMWFQwY3RSdlNyL0wwZmlmb1BRZjRyQlRSUHpqbHZRUFVmcjhoZDdMTFhxTGVmNkxlZllQSWdyR3RFUEczYis3Y3Z6dCtYU255dnhYcXZrN1U4SFRtRW40QURaQWw5UlNVOXJhNWduZmw5ZWRQZnJhY3NBL1A5QXJLOUV3WS9EOUUvcmExZzAvRS9ocUs5eUFDL1BmajlNRW5JcS9ERTc5eU9obmpUV2JuNENqNEMrSzdMdXZOdzVnQ2pqekJEY1RSblRUY3NtanR3Qzh5aloveEFycTcwaURWRHV6VUt6LzlYVFQxZ0NqbEVXRGlmMDE1WnRrQUNqUEpNWW12NTc5b1dOd1RrSm8ydVpiaGdvUWhPUWd5QnJqN3hOQVEyWUFKb0VvQlFnZlUrMGJJSG8yQUJ6eDBFamVLRUF5bHVBN0FOZWViQlBtMXpmYXE1UGVjM2IzajFWOTdMY0l1NVNRUHNjSGVqU3hLQXdKQWZFUGxJQ0JBWEErUkdLSUVIWUI0QVhBL2dFUWJZRG9CNEE0RTBNRkxtVUdUem9BM1dhQlpCS2dEWnExcHVCRHdUUUlZQjlpd0JOQVFBQQ==`);
// https://codepen.io/Holy-Fire/pen/VNRZme
// var fu=async function(t,i){return new Promise((function(e,s){"use strict";class r{static get Threshold(){return!!this.hasOwnProperty("_Threshold")&&this._Threshold}static set Threshold(t){this._Threshold=t}static get ScaleX(){return this.hasOwnProperty("_ScaleX")?this._ScaleX:parseInt(0)}static set ScaleX(t){this._ScaleX=parseInt(t)}static get ScaleY(){return this.hasOwnProperty("_ScaleY")?this._ScaleY:parseInt(0)}static set ScaleY(t){this._ScaleY=parseInt(t)}static get SizeX(){return this.hasOwnProperty("_SizeX")?this._SizeX:parseInt(0)}static set SizeX(t){this._SizeX=parseInt(t)}static get SizeY(){return this.hasOwnProperty("_SizeY")?this._SizeY:parseInt(0)}static set SizeY(t){this._SizeY=parseInt(t)}static get ScaledImage(){return this.hasOwnProperty("_ScaledImage")?this._ScaledImage:[]}static set ScaledImage(t){this._ScaledImage=t}static Copy(t,i,e){for(var s=0;s<e;s++)t[s]=this._Clip8(i[s])}static Copy2D(t,i,e,s,r,a){for(var h=Math.min(r,e),n=Math.min(a,s),l=0;l<n;l++)for(var p=0;p<h;p++)for(var u=0;u<4;u++)t[4*(l*e+p)+u]=i[4*(l*r+p)+u]}static CopyPadded(t,i,e,s){var a=Math.max(i,e);a=r.NextPow(a,s);var h=new Uint8ClampedArray(a*a*4);return r.Copy2D(h,t,a,a,i,e),h}static CopyCropped(t,i,e,s,a,h){r.Copy2D(t,i,e,s,a,h)}static ToArray(t,i,e){for(var s=new Uint32Array(i*e),r=0;r<e;r++)for(var a=0;a<i;a++){var h=r*i+a,n=4*h,l=t[n],p=t[n+1],u=t[n+2],c=t[n+3];s[h]=this.ARGBINT(c,l,p,u)}return s}static ToImage(t,i,e,s){for(var r=0;r<s;r++)for(var a=0;a<e;a++){var h=r*e+a,n=4*h;t[n]=this.Red(i[h]),t[n+1]=this.Green(i[h]),t[n+2]=this.Blue(i[h]),t[n+3]=this.Alpha(i[h])}}static _CLR(t,i,e,s,r){if(r>=0&&r<e&&s>=0&&s<i){var a=4*(r*i+s),h=t[a],n=t[a+1],l=t[a+2],p=t[a+3];return this.ARGBINT(p,h,n,l)}return 0}static CLR(t,i,e,s,r,a=0,h=0){var n=parseInt(s+a),l=parseInt(r+h);return n=Math.max(0,Math.min(i-1,n)),l=Math.max(0,Math.min(e-1,l)),this._CLR(t,i,e,n,l)}static Alpha(t){return parseInt(t>>>24)}static Red(t){return parseInt((t>>>0&16711680)>>16)}static Green(t){return parseInt((t>>>0&65280)>>8)}static Blue(t){return parseInt(t>>>0&255)}static Brightness(t){var i=16777215&t;return this._Clip8(3*this.Red(i)+3*this.Green(i)+2*this.Blue(i)>>3)}static Luminance(t){var i=parseFloat(this.Red(t)),e=parseFloat(this.Green(t)),s=parseFloat(this.Blue(t));return parseInt(.299*i+.587*e+.114*s)}static ChromaU(t){var i=parseFloat(this.Red(t)),e=parseFloat(this.Green(t)),s=parseFloat(this.Blue(t));return parseInt(.5*i-.418688*e-.081312*s+127.5)}static ChromaV(t){var i=parseFloat(this.Red(t)),e=parseFloat(this.Green(t)),s=parseFloat(this.Blue(t));return parseInt(-.168736*i-.331264*e+.5*s+127.5)}static IsLike(t,i){if(!this.Threshold)return t==i;var e=this.Luminance(t)-this.Luminance(i);return!(Math.abs(e)>48)&&(e=this.ChromaV(t)-this.ChromaV(i),!(Math.abs(e)>6)&&(e=this.ChromaU(t)-this.ChromaU(i),Math.abs(e)<=7))}static IsNotLike(t,i){return!this.IsLike(t,i)}static _Clip8(t){return Math.max(0,Math.min(255,t))}static _Write4RGBA(t,i,e,s,r,a,h,n,l,p){if(s>=0&&s<i&&r>=0&&r<e){var u=s*this.ScaleX,c=r*this.ScaleY;u+=2==a||4==a?1:0;var I=4*((c+=3==a||4==a?1:0)*i*this.ScaleX+u);t[I]=this._Clip8(n),t[I+1]=this._Clip8(l),t[I+2]=this._Clip8(p),t[I+3]=this._Clip8(h)}}static Write4RGBA(t,i,e,s,r,a,h){var n=this.Red(h),l=this.Green(h),p=this.Blue(h),u=this.Alpha(h);this._Write4RGBA(t,i,e,s,r,a,u,n,l,p)}static _Write9RGBA(t,i,e,s,r,a,h,n,l,p){if(s>=0&&s<i&&r>=0&&r<e){var u=0,c=0;2!=a&&5!=a&&8!=a||(u=1),3!=a&&6!=a&&9!=a||(u=2),4!=a&&5!=a&&6!=a||(c=1),7!=a&&8!=a&&9!=a||(c=2);var I=s*this.ScaleX+u,f=4*((r*this.ScaleY+c)*i*this.ScaleX+I);t[f]=this._Clip8(n),t[f+1]=this._Clip8(l),t[f+2]=this._Clip8(p),t[f+3]=this._Clip8(h)}}static Write9RGBA(t,i,e,s,r,a,h){var n=this.Red(h),l=this.Green(h),p=this.Blue(h),u=this.Alpha(h);this._Write9RGBA(t,i,e,s,r,a,u,n,l,p)}static _Write16RGBA(t,i,e,s,r,a,h,n,l,p){if(s>=0&&s<i&&r>=0&&r<e){var u=0,c=0;2!=a&&6!=a&&10!=a&&14!=a||(u=1),3!=a&&7!=a&&11!=a&&15!=a||(u=2),4!=a&&8!=a&&12!=a&&16!=a||(u=3),5!=a&&6!=a&&7!=a&&8!=a||(c=1),9!=a&&10!=a&&11!=a&&12!=a||(c=2),13!=a&&14!=a&&15!=a&&16!=a||(c=3);var I=s*this.ScaleX+u,f=4*((r*this.ScaleY+c)*i*this.ScaleX+I);t[f]=this._Clip8(n),t[f+1]=this._Clip8(l),t[f+2]=this._Clip8(p),t[f+3]=this._Clip8(h)}}static Write16RGBA(t,i,e,s,r,a,h){var n=this.Red(h),l=this.Green(h),p=this.Blue(h),u=this.Alpha(h);this._Write16RGBA(t,i,e,s,r,a,u,n,l,p)}static WriteMagnify(t,i,e,s,r,a){for(var h=r*this.ScaleX,n=a*this.ScaleY,l=0;l<this.ScaleY;l++)for(var p=0;p<this.ScaleX;p++)for(var u=h+p,c=4*((n+l)*e*this.ScaleX+u),I=4*(a*e+r),f=0;f<4;f++)i[c+f]=t[I+f]}static RGBINT(t,i,e){return parseInt((this._Clip8(t)<<16)+(this._Clip8(i)<<8)+this._Clip8(e))}static ARGBINT(t,i,e,s){return(t>>>0<<24>>>0|(i<<16)+(e<<8)+s)>>>0}static Truncate(t){return this._Clip8(t)}static NextPow(t,i){for(var e=1,s=0;s<10&&!(t<=e);s++)e*=i;return e}}try{e((new class{Apply(t,i,e,s,a){s=Math.max(1,s),class{static Buffer(t,i){for(var e=new Uint8ClampedArray(4*t),s=0;s<t;s++){var r=4*s;e[r]=parseInt(i),e[r+1]=parseInt(i),e[r+2]=parseInt(i),e[r+3]=255}return e}static New(t,i){return this.Buffer(t*i,0)}static Init(t,i,e,s,a){r.ScaleX=e,r.ScaleY=s,r.SizeX=t*e,r.SizeY=i*s,r.Threshold=a,r.ScaledImage=this.New(r.SizeX,r.SizeY)}}.Init(i,e,s,s,a),r.SizeY;for(var h=0;h<r.SizeY;h++)for(var n=h*r.SizeX,l=h/r.SizeY,p=0;p<r.SizeX;p++){var u=this.ScaleImage(t,p/r.SizeX,l,i,e,r.SizeX,r.SizeY);r.ScaledImage[4*(n+p)]=r.Red(u),r.ScaledImage[4*(n+p)+1]=r.Green(u),r.ScaledImage[4*(n+p)+2]=r.Blue(u),r.ScaledImage[4*(n+p)+3]=r.Alpha(u)}return new ImageData(new Uint8ClampedArray(r.ScaledImage),i*s,e*s)}is_different(t,i){return r.IsNotLike(t,i)}mix(t,i,e){return class{static Interpolate3P(t,i,e){var s=parseInt(parseInt(r.Red(t)+r.Red(i)+r.Red(e))/3),a=parseInt(parseInt(r.Green(t)+r.Green(i)+r.Green(e))/3),h=parseInt(parseInt(r.Blue(t)+r.Blue(i)+r.Blue(e))/3),n=parseInt(parseInt(r.Alpha(t)+r.Alpha(i)+r.Alpha(e))/3);return r.ARGBINT(n,s,a,h)}static Interpolate2P(t,i){var e=parseInt(parseInt(r.Red(t)+r.Red(i))>>1),s=parseInt(parseInt(r.Green(t)+r.Green(i))>>1),a=parseInt(parseInt(r.Blue(t)+r.Blue(i))>>1),h=parseInt(parseInt(r.Alpha(t)+r.Alpha(i))>>1);return r.ARGBINT(h,e,s,a)}static Interpolate2P1Q(t,i,e){var s=parseInt(parseInt(r.Red(t)*(1-e)+r.Red(i)*e)),a=parseInt(parseInt(r.Green(t)*(1-e)+r.Green(i)*e)),h=parseInt(parseInt(r.Blue(t)*(1-e)+r.Blue(i)*e)),n=parseInt(parseInt(r.Alpha(t)*(1-e)+r.Alpha(i)*e));return r.ARGBINT(n,s,a,h)}static Interpolate2P2Q(t,i,e,s){var a=e+s,h=parseInt((r.Red(t)*e+r.Red(i)*s)/a),n=parseInt((r.Green(t)*e+r.Green(i)*s)/a),l=parseInt((r.Blue(t)*e+r.Blue(i)*s)/a),p=parseInt((r.Alpha(t)*e+r.Alpha(i)*s)/a);return r.ARGBINT(p,h,n,l)}static Interpolate3P3Q(t,i,e,s,a,h){var n=parseInt(s+a+h),l=parseInt((r.Red(t)*s+r.Red(i)*a+r.Red(e)*h)/n),p=parseInt((r.Green(t)*s+r.Green(i)*a+r.Green(e)*h)/n),u=parseInt((r.Blue(t)*s+r.Blue(i)*a+r.Blue(e)*h)/n),c=parseInt((r.Alpha(t)*s+r.Alpha(i)*a+r.Alpha(e)*h)/n);return r.ARGBINT(c,l,p,u)}static Interpolate4P(t,i,e,s){var a=parseInt(r.Red(t)+r.Red(i)+r.Red(e)+r.Red(s)>>2),h=parseInt(r.Green(t)+r.Green(i)+r.Green(e)+r.Green(s)>>2),n=parseInt(r.Blue(t)+r.Blue(i)+r.Blue(e)+r.Blue(s)>>2),l=parseInt(r.Alpha(t)+r.Alpha(i)+r.Alpha(e)+r.Alpha(s)>>2);return r.ARGBINT(l,a,h,n)}static Interpolate4P4Q(t,i,e,s,a,h,n,l){var p=parseInt(a+h+n+l),u=parseInt((r.Red(t)*a+r.Red(i)*h+r.Red(e)*n+r.Red(s)*l)/p),c=parseInt((r.Green(t)*a+r.Green(i)*h+r.Green(e)*n+r.Green(s)*l)/p),I=parseInt((r.Blue(t)*a+r.Blue(i)*h+r.Blue(e)*n+r.Blue(s)*l)/p),f=parseInt((r.Alpha(t)*a+r.Alpha(i)*h+r.Alpha(e)*n+r.Alpha(s)*l)/p);return r.ARGBINT(f,u,c,I)}static Mixpal(t,i){return this.Interpolate2P2Q(t,i,3,1)}static Fix(t,i,e){return Math.max(Math.min(t,e),i)}static Unmix(t,i){var e=r.Red(t),s=r.Green(t),a=r.Blue(t),h=r.Alpha(t),n=r.Red(i),l=r.Green(i),p=r.Blue(i),u=r.Alpha(i),c=this.Fix(e+(e-n),0,255)+n>>1,I=this.Fix(s+(s-l),0,255)+l>>1,f=this.Fix(a+(a-p),0,255)+p>>1,d=this.Fix(h+(h-u),0,255)+u>>1;return r.ARGBINT(d,c,I,f)}}.Interpolate2P1Q(t,i,e)}fract(t){return t-Math.floor(t)}P(t,i,e){return(t&i)==e}Mul(t,i){var e=r.Red(t)*i,s=r.Green(t)*i,a=r.Blue(t)*i,h=r.Alpha(t)*i;return r.ARGBINT(h,e,s,a)}Add(t,i,e){var s=(r.Red(t)+r.Red(i))*e,a=(r.Green(t)+r.Green(i))*e,h=(r.Blue(t)+r.Blue(i))*e,n=(r.Alpha(t)+r.Alpha(i))*e;return r.ARGBINT(n,s,a,h)}length(t,i){return Math.sqrt(t*t+i*i)}ScaleImage(t,i,e,s,a,h,n){var l=1/s,p=1/a,u=this.fract(i*s),c=this.fract(e*a);u>.5&&(l=-l,u=1-u),c>.5&&(p=-p,c=1-c),l=parseInt(l*s),p=parseInt(p*a);var I,f,d,m=parseInt(i*s),R=parseInt(e*a),P=r.CLR(t,s,a,m,R,-l,-p),_=r.CLR(t,s,a,m,R,0,-p),o=r.CLR(t,s,a,m,R,l,-p),A=r.CLR(t,s,a,m,R,-l,0),B=r.CLR(t,s,a,m,R,0,0),S=r.CLR(t,s,a,m,R,l,0),G=r.CLR(t,s,a,m,R,-l,p),x=r.CLR(t,s,a,m,R,0,p),C=r.CLR(t,s,a,m,R,l,p),v=0;if(this.is_different(P,B)&&(v|=1),this.is_different(_,B)&&(v|=2),this.is_different(o,B)&&(v|=4),this.is_different(A,B)&&(v|=8),this.is_different(S,B)&&(v|=16),this.is_different(G,B)&&(v|=32),this.is_different(x,B)&&(v|=64),this.is_different(C,B)&&(v|=128),(this.P(v,191,55)||this.P(v,219,19))&&this.is_different(_,S))return this.mix(B,A,.5-u);if((this.P(v,219,73)||this.P(v,239,109))&&this.is_different(x,A))return this.mix(B,_,.5-c);if((this.P(v,11,11)||this.P(v,254,74)||this.P(v,254,26))&&this.is_different(A,_))return B;if((this.P(v,111,42)||this.P(v,91,10)||this.P(v,191,58)||this.P(v,223,90)||this.P(v,159,138)||this.P(v,207,138)||this.P(v,239,78)||this.P(v,63,14)||this.P(v,251,90)||this.P(v,187,138)||this.P(v,127,90)||this.P(v,175,138)||this.P(v,235,138))&&this.is_different(A,_))return this.mix(B,this.mix(B,P,.5-u),.5-c);if(this.P(v,11,8))return this.mix(this.mix(this.Mul(P,.375)+this.Mul(_,.25)+this.Mul(B,.375),this.Mul(B,.5)+this.Mul(_,.5),2*u),B,2*c);if(this.P(v,11,2))return this.mix(this.mix(this.Mul(P,.375)+this.Mul(A,.25)+this.Mul(B,.375),this.Mul(B,.5)+this.Mul(A,.5),2*c),B,2*u);if(this.P(v,47,47))return(f=this.length(u-.5,c-.5))<.5-(d=this.length(1/(h/s),1/(n/a)))/2?B:(I=this.is_different(P,_)||this.is_different(P,A)?this.mix(_,A,c-u+.5):this.mix(this.mix(this.Mul(_,.375)+this.Mul(P,.25)+this.Mul(A,.375),A,2*c),_,2*u),f>.5+d/2?I:this.mix(B,I,(f-.5+d/2)/d));if(this.P(v,191,55)||this.P(v,219,19))return(f=u-2*c)>(d=this.length(1/(h/s),1/(n/a))*Math.sqrt(5))/2?_:(I=this.mix(A,B,u+.5),f<-d/2?I:this.mix(I,_,(f+d/2)/d));if(this.P(v,219,73)||this.P(v,239,109))return f=c-2*u,c-2*u>(d=this.length(1/(h/s),1/(n/a))*Math.sqrt(5))/2?A:(I=this.mix(_,B,u+.5),f<-d/2?I:this.mix(I,A,(f+d/2)/d));if(this.P(v,191,143)||this.P(v,126,14))return(f=u+2*c)>1+(d=this.length(1/(h/s),1/(n/a))*Math.sqrt(5))/2?B:(I=this.is_different(P,_)||this.is_different(P,A)?this.mix(_,A,c-u+.5):this.mix(this.mix(this.Mul(_,.375)+this.Mul(P,.25)+this.Mul(A,.375),A,2*c),_,2*u),f<1-d/2?I:this.mix(I,B,(f+d/2-1)/d));if(this.P(v,126,42)||this.P(v,239,171))return f=c+2*u,c+2*u>1+(d=this.length(1/(h/s),1/(n/a))*Math.sqrt(5))/2?B:(I=this.is_different(P,_)||this.is_different(P,A)?this.mix(_,A,c-u+.5):this.mix(this.mix(this.Mul(_,.375)+this.Mul(P,.25)+this.Mul(A,.375),A,2*c),_,2*u),f<1-d/2?I:this.mix(I,B,(f+d/2-1)/d));if(this.P(v,27,3)||this.P(v,79,67)||this.P(v,139,131)||this.P(v,107,67))return this.mix(B,A,.5-u);if(this.P(v,75,9)||this.P(v,139,137)||this.P(v,31,25)||this.P(v,59,25))return this.mix(B,_,.5-c);if(this.P(v,251,106)||this.P(v,111,110)||this.P(v,63,62)||this.P(v,251,250)||this.P(v,223,222)||this.P(v,223,30))return this.mix(B,P,(1-u-c)/2);if(this.P(v,79,75)||this.P(v,159,27)||this.P(v,47,11)||this.P(v,190,10)||this.P(v,238,10)||this.P(v,126,10)||this.P(v,235,75)||this.P(v,59,27))return(f=u+c)>.5+(d=this.length(1/(h/s),1/(n/a)))/2?B:(I=this.is_different(P,_)||this.is_different(P,A)?this.mix(_,A,c-u+.5):this.mix(this.mix(this.Mul(_,.375)+this.Mul(P,.25)+this.Mul(A,.375),A,2*c),_,2*u),f<.5-d/2?I:this.mix(I,B,(f+d/2-.5)/d));if(this.P(v,11,1))return this.mix(this.mix(B,A,.5-u),this.mix(_,this.Add(_,A,.5),.5-u),.5-c);if(this.P(v,11,0))return this.mix(this.mix(B,A,.5-u),this.mix(_,P,.5-u),.5-c);if((f=u+c)>.5+(d=this.length(1/(h/s),1/(n/a)))/2)return B;var M=r.CLR(t,s,a,m,R,2*-l,-p),g=r.CLR(t,s,a,m,R,-l,2*-p),L=r.CLR(t,s,a,m,R,0,2*-p),X=r.CLR(t,s,a,m,R,l,2*-p),T=r.CLR(t,s,a,m,R,2*-l,-p),y=r.CLR(t,s,a,m,R,2*-l,0),z=r.CLR(t,s,a,m,R,2*-l,p);this.is_different(M,B)&&(v|=256),this.is_different(g,B)&&(v|=512),this.is_different(L,B)&&(v|=1024),this.is_different(X,B)&&(v|=2048),this.is_different(T,B)&&(v|=4096),this.is_different(y,B)&&(v|=8192),this.is_different(z,B)&&(v|=16384);for(var Y=-7;0!=v;)Y+=1&v,v>>=1;return Y<=0?(I=this.mix(_,A,c-u+.5),f<.5-d/2?I:this.mix(I,B,(f+d/2-.5)/d)):B}}).Apply(t.data,t.width,t.height,i,1))}catch(a){s(null)}}))}; return fu;
/*
        var fu = async function(image_data, scale) {return new Promise(function(resolve, reject){

        "use strict";
        // static class methods for common filter operations
        class Common {
    
            static get Threshold() {
    
                return this.hasOwnProperty('_Threshold') ? this._Threshold : false;
            }
    
            static set Threshold(v) {
    
                this._Threshold = v;
            }
    
            static get ScaleX() {
    
                return this.hasOwnProperty('_ScaleX') ? this._ScaleX : parseInt(0);
            }
    
            static set ScaleX(v) {
    
                this._ScaleX = parseInt(v);
            }
    
            static get ScaleY() {
    
                return this.hasOwnProperty('_ScaleY') ? this._ScaleY : parseInt(0);
            }
    
            static set ScaleY(v) {
    
                this._ScaleY = parseInt(v);
            }
    
            static get SizeX() {
    
                return this.hasOwnProperty('_SizeX') ? this._SizeX : parseInt(0);
            }
    
            static set SizeX(v) {
    
                this._SizeX = parseInt(v);
            }
    
            static get SizeY() {
    
                return this.hasOwnProperty('_SizeY') ? this._SizeY : parseInt(0);
            }
    
            static set SizeY(v) {
    
                this._SizeY = parseInt(v);
            }
    
            static get ScaledImage() {
    
                return this.hasOwnProperty('_ScaledImage') ? this._ScaledImage : [];
            }
    
            static set ScaledImage(v) {
    
                this._ScaledImage = v;
            }
    
            static Copy(dst, src, Length) {
    
                for (var i = 0; i < Length; i++)
                    dst[i] = this._Clip8(src[i]);
            }
    
            static Copy2D(dst, src, dstx, dsty, srcx, srcy) {
    
                var Channels = 4;
    
                var xdim = Math.min(srcx, dstx);
                var ydim = Math.min(srcy, dsty);
    
                for (var y = 0; y < ydim; y++)
                    for (var x = 0; x < xdim; x++)
                        for (var Channel = 0; Channel < Channels; Channel++)
                            dst[(y * dstx + x) * Channels + Channel] = src[(y * srcx + x) * Channels + Channel];
            }
    
            static CopyPadded(src, srcx, srcy, scale) {
    
                var Channels = 4;
    
                var dim = Math.max(srcx, srcy);
                dim = Common.NextPow(dim, scale);
    
                var dst = new Uint8ClampedArray(dim * dim * Channels);
    
                Common.Copy2D(dst, src, dim, dim, srcx, srcy);
    
                return dst;
            }
    
            static CopyCropped(dst, src, dstx, dsty, srcx, srcy) {
    
                Common.Copy2D(dst, src, dstx, dsty, srcx, srcy);
            }
    
            static ToArray(Input, srcx, srcy) {
    
                var dst = new Uint32Array(srcx * srcy);
    
                var Channels = 4;
    
                for (var y = 0; y < srcy; y++) {
    
                    for (var x = 0; x < srcx; x++) {
    
                        var index = y * srcx + x;
                        var pixel = index * Channels;
    
                        var r = Input[pixel];
                        var g = Input[pixel + 1];
                        var b = Input[pixel + 2];
                        var a = Input[pixel + 3];
    
                        dst[index] = this.ARGBINT(a, r, g, b);
                    }
                }
    
                return dst;
            }
    
            static ToImage(dst, src, srcx, srcy) {
    
                var Channels = 4;
    
                for (var y = 0; y < srcy; y++) {
                    for (var x = 0; x < srcx; x++) {
    
                        var index = y * srcx + x;
                        var pixel = index * Channels;
    
                        dst[pixel] = this.Red(src[index]);
                        dst[pixel + 1] = this.Green(src[index]);
                        dst[pixel + 2] = this.Blue(src[index]);
                        dst[pixel + 3] = this.Alpha(src[index]);
                    }
                }
            }
    
            static _CLR(Input, srcx, srcy, x, y) {
    
                var Channels = 4;
    
                if (y >= 0 && y < srcy && x >= 0 && x < srcx) {
    
                    var index = (y * srcx + x) * Channels;
    
                    var r = Input[index];
                    var g = Input[index + 1];
                    var b = Input[index + 2];
                    var a = Input[index + 3];
    
                    return this.ARGBINT(a, r, g, b);
                }
    
                return 0;
            }
    
            static CLR(Input, srcx, srcy, x, y, dx = 0, dy = 0) {
    
                var xx = parseInt(x + dx);
                var yy = parseInt(y + dy);
    
                xx = Math.max(0, Math.min(srcx - 1, xx));
                yy = Math.max(0, Math.min(srcy - 1, yy));
    
                return this._CLR(Input, srcx, srcy, xx, yy);
            }
    
            static Alpha(rgb) {
    
                return parseInt(rgb >>> 24);
            }
    
            static Red(rgb) {
    
                return parseInt((rgb >>> 0 & 0x00FF0000) >> 16);
            }
    
            static Green(rgb) {
    
                return parseInt((rgb >>> 0 & 0x0000FF00) >> 8);
            }
    
            static Blue(rgb) {
    
                return parseInt(rgb >>> 0 & 0x000000FF);
            }
    
            static Brightness(rgb) {
    
                var dwordC = rgb & 0xFFFFFF;
    
                return this._Clip8((this.Red(dwordC) * 3 + this.Green(dwordC) * 3 + this.Blue(dwordC) * 2) >> 3);
            }
    
            static Luminance(rgb) {
    
                var r = parseFloat(this.Red(rgb));
                var g = parseFloat(this.Green(rgb));
                var b = parseFloat(this.Blue(rgb));
    
                return parseInt(0.299 * r + 0.587 * g + 0.114 * b);
            }
    
            static ChromaU(rgb) {
    
                var r = parseFloat(this.Red(rgb));
                var g = parseFloat(this.Green(rgb));
                var b = parseFloat(this.Blue(rgb));
    
                return parseInt(0.5 * r - 0.418688 * g - 0.081312 * b + 127.5);
            }
    
            static ChromaV(rgb) {
    
                var r = parseFloat(this.Red(rgb));
                var g = parseFloat(this.Green(rgb));
                var b = parseFloat(this.Blue(rgb));
    
                return parseInt(-0.168736 * r - 0.331264 * g + 0.5 * b + 127.5);
            }
    
            static IsLike(pixel1, pixel2) {
    
                if (!this.Threshold)
                    return pixel1 == pixel2;
    
                var _LUMINANCE_TRIGGER = 48;
                var _CHROMA_U_TRIGGER = 7;
                var _CHROMA_V_TRIGGER = 6;
    
                var delta = this.Luminance(pixel1) - this.Luminance(pixel2);
    
                if (Math.abs(delta) > _LUMINANCE_TRIGGER)
                    return false;
    
                delta = this.ChromaV(pixel1) - this.ChromaV(pixel2);
    
                if (Math.abs(delta) > _CHROMA_V_TRIGGER)
                    return false;
    
                delta = this.ChromaU(pixel1) - this.ChromaU(pixel2);
    
                return Math.abs(delta) <= _CHROMA_U_TRIGGER;
            }
    
            static IsNotLike(pixel1, pixel2) {
    
                return !this.IsLike(pixel1, pixel2);
            }
    
            static _Clip8(color) {
    
                return Math.max(0, Math.min(255, color));
            }
    
            static _Write4RGBA(Output, sizex, sizey, x, y, Pixel, A, R, G, B) {
    
                if (x >= 0 && x < sizex && y >= 0 && y < sizey) {
    
                    var Channels = 4;
    
                    var dx = x * this.ScaleX;
                    var dy = y * this.ScaleY;
    
                    dx += (Pixel == 2 || Pixel == 4) ? 1 : 0;
                    dy += (Pixel == 3 || Pixel == 4) ? 1 : 0;
    
                    var dst = (dy * sizex * this.ScaleX + dx) * Channels;
    
                    Output[dst] = this._Clip8(R);
                    Output[dst + 1] = this._Clip8(G);
                    Output[dst + 2] = this._Clip8(B);
                    Output[dst + 3] = this._Clip8(A);
                }
            }
    
            static Write4RGBA(Output, sizex, sizey, x, y, Pixel, argb) {
    
                var R = this.Red(argb);
                var G = this.Green(argb);
                var B = this.Blue(argb);
                var A = this.Alpha(argb);
    
                this._Write4RGBA(Output, sizex, sizey, x, y, Pixel, A, R, G, B);
            }
    
            static _Write9RGBA(Output, sizex, sizey, x, y, Pixel, A, R, G, B) {
                if (x >= 0 && x < sizex && y >= 0 && y < sizey) {
    
                    var Channels = 4;
    
                    var deltax = 0;
                    var deltay = 0;
    
                    if (Pixel == 2 || Pixel == 5 || Pixel == 8) {
    
                        deltax = 1;
                    }
    
                    if (Pixel == 3 || Pixel == 6 || Pixel == 9) {
    
                        deltax = 2;
                    }
    
                    if (Pixel == 4 || Pixel == 5 || Pixel == 6) {
    
                        deltay = 1;
                    }
    
                    if (Pixel == 7 || Pixel == 8 || Pixel == 9) {
    
                        deltay = 2;
                    }
    
                    var dx = x * this.ScaleX + deltax;
                    var dy = y * this.ScaleY + deltay;
    
                    var dst = (dy * sizex * this.ScaleX + dx) * Channels;
    
                    Output[dst] = this._Clip8(R);
                    Output[dst + 1] = this._Clip8(G);
                    Output[dst + 2] = this._Clip8(B);
                    Output[dst + 3] = this._Clip8(A);
                }
            }
    
            static Write9RGBA(Output, sizex, sizey, x, y, Pixel, argb) {
    
                var R = this.Red(argb);
                var G = this.Green(argb);
                var B = this.Blue(argb);
                var A = this.Alpha(argb);
    
                this._Write9RGBA(Output, sizex, sizey, x, y, Pixel, A, R, G, B);
            }
    
            static _Write16RGBA(Output, sizex, sizey, x, y, Pixel, A, R, G, B) {
    
                if (x >= 0 && x < sizex && y >= 0 && y < sizey) {
    
                    var Channels = 4;
    
                    var deltax = 0;
                    var deltay = 0;
    
                    /*
                    01 02 03 04
                    05 06 07 08
                    09 10 11 12
                    13 14 15 16
                    $/

                    if (Pixel == 2 || Pixel == 6 || Pixel == 10 || Pixel == 14) {

                        deltax = 1;
                    }

                    if (Pixel == 3 || Pixel == 7 || Pixel == 11 || Pixel == 15) {

                        deltax = 2;
                    }

                    if (Pixel == 4 || Pixel == 8 || Pixel == 12 || Pixel == 16) {

                        deltax = 3;
                    }

                    if (Pixel == 5 || Pixel == 6 || Pixel == 7 || Pixel == 8) {

                        deltay = 1;
                    }

                    if (Pixel == 9 || Pixel == 10 || Pixel == 11 || Pixel == 12) {

                        deltay = 2;
                    }

                    if (Pixel == 13 || Pixel == 14 || Pixel == 15 || Pixel == 16) {

                        deltay = 3;
                    }

                    var dx = x * this.ScaleX + deltax;
                    var dy = y * this.ScaleY + deltay;

                    var dst = (dy * sizex * this.ScaleX + dx) * Channels;

                    Output[dst] = this._Clip8(R);
                    Output[dst + 1] = this._Clip8(G);
                    Output[dst + 2] = this._Clip8(B);
                    Output[dst + 3] = this._Clip8(A);
                }
            }

            static Write16RGBA(Output, sizex, sizey, x, y, Pixel, argb) {

                var R = this.Red(argb);
                var G = this.Green(argb);
                var B = this.Blue(argb);
                var A = this.Alpha(argb);

                this._Write16RGBA(Output, sizex, sizey, x, y, Pixel, A, R, G, B);
            }

            static WriteMagnify(Input, Output, sizex, sizey, x, y) {

                var Channels = 4;

                var x0 = x * this.ScaleX;
                var y0 = y * this.ScaleY;

                for (var deltay = 0; deltay < this.ScaleY; deltay++) {
                    for (var deltax = 0; deltax < this.ScaleX; deltax++) {

                        var dx = x0 + deltax;
                        var dy = y0 + deltay;

                        var dst = (dy * sizex * this.ScaleX + dx) * Channels;

                        var index = (y * sizex + x) * Channels;

                        for (var Channel = 0; Channel < Channels; Channel++) {

                            Output[dst + Channel] = Input[index + Channel];
                        }
                    }
                }
            }

            static RGBINT(r, g, b) {

                return parseInt((this._Clip8(r) << 16) + (this._Clip8(g) << 8) + this._Clip8(b));
            }

            static ARGBINT(a, r, g, b) {

                return ((((((a) >>> 0) << 24) >>> 0) | (((r) << 16) + ((g) << 8) + ((b)))) >>> 0);
            }

            static Truncate(color) {

                return this._Clip8(color);
            }

            static NextPow(v, scale) {

                var dim = 1;

                for (var i = 0; i < 10; i++) {

                    if (v <= dim)
                        break;

                    dim *= scale;
                }

                return dim;
            }
        }

    // brightness control
        class Brightness {

            static AdjustBrightness(color, level) {

                return Common.Truncate(color + level);
            }
        }

    // color interpolation
        class Interpolate {

            static Interpolate3P(pixel1, pixel2, pixel3) {

                var r = parseInt(parseInt(Common.Red(pixel1) + Common.Red(pixel2) + Common.Red(pixel3)) / 3);
                var g = parseInt(parseInt(Common.Green(pixel1) + Common.Green(pixel2) + Common.Green(pixel3)) / 3);
                var b = parseInt(parseInt(Common.Blue(pixel1) + Common.Blue(pixel2) + Common.Blue(pixel3)) / 3);
                var a = parseInt(parseInt(Common.Alpha(pixel1) + Common.Alpha(pixel2) + Common.Alpha(pixel3)) / 3);

                return Common.ARGBINT(a, r, g, b);
            }

            static Interpolate2P(pixel1, pixel2) {

                var r = parseInt(parseInt(Common.Red(pixel1) + Common.Red(pixel2)) >> 1);
                var g = parseInt(parseInt(Common.Green(pixel1) + Common.Green(pixel2)) >> 1);
                var b = parseInt(parseInt(Common.Blue(pixel1) + Common.Blue(pixel2)) >> 1);
                var a = parseInt(parseInt(Common.Alpha(pixel1) + Common.Alpha(pixel2)) >> 1);

                return Common.ARGBINT(a, r, g, b);
            }

            static Interpolate2P1Q(pixel1, pixel2, quantifier) {

                var r = parseInt(parseInt(Common.Red(pixel1) * (1.0 - quantifier) + Common.Red(pixel2) * quantifier));
                var g = parseInt(parseInt(Common.Green(pixel1) * (1.0 - quantifier) + Common.Green(pixel2) * quantifier));
                var b = parseInt(parseInt(Common.Blue(pixel1) * (1.0 - quantifier) + Common.Blue(pixel2) * quantifier));
                var a = parseInt(parseInt(Common.Alpha(pixel1) * (1.0 - quantifier) + Common.Alpha(pixel2) * quantifier));

                return Common.ARGBINT(a, r, g, b);
            }

            static Interpolate2P2Q(pixel1, pixel2, quantifier1, quantifier2) {

                var total = (quantifier1 + quantifier2);

                var r = parseInt(((Common.Red(pixel1) * quantifier1 + Common.Red(pixel2) * quantifier2)) / total);
                var g = parseInt(((Common.Green(pixel1) * quantifier1 + Common.Green(pixel2) * quantifier2)) / total);
                var b = parseInt(((Common.Blue(pixel1) * quantifier1 + Common.Blue(pixel2) * quantifier2)) / total);
                var a = parseInt(((Common.Alpha(pixel1) * quantifier1 + Common.Alpha(pixel2) * quantifier2)) / total);

                return Common.ARGBINT(a, r, g, b);
            }

            static Interpolate3P3Q(pixel1, pixel2, pixel3, quantifier1, quantifier2, quantifier3) {

                var total = parseInt(quantifier1 + quantifier2 + quantifier3);

                var r = parseInt((Common.Red(pixel1) * quantifier1 + Common.Red(pixel2) * quantifier2 + Common.Red(pixel3) * quantifier3) / total);
                var g = parseInt((Common.Green(pixel1) * quantifier1 + Common.Green(pixel2) * quantifier2 + Common.Green(pixel3) * quantifier3) / total);
                var b = parseInt((Common.Blue(pixel1) * quantifier1 + Common.Blue(pixel2) * quantifier2 + Common.Blue(pixel3) * quantifier3) / total);
                var a = parseInt((Common.Alpha(pixel1) * quantifier1 + Common.Alpha(pixel2) * quantifier2 + Common.Alpha(pixel3) * quantifier3) / total);

                return Common.ARGBINT(a, r, g, b);
            }

            static Interpolate4P(pixel1, pixel2, pixel3, pixel4) {

                var r = parseInt((Common.Red(pixel1) + Common.Red(pixel2) + Common.Red(pixel3) + Common.Red(pixel4)) >> 2);
                var g = parseInt((Common.Green(pixel1) + Common.Green(pixel2) + Common.Green(pixel3) + Common.Green(pixel4)) >> 2);
                var b = parseInt((Common.Blue(pixel1) + Common.Blue(pixel2) + Common.Blue(pixel3) + Common.Blue(pixel4)) >> 2);
                var a = parseInt((Common.Alpha(pixel1) + Common.Alpha(pixel2) + Common.Alpha(pixel3) + Common.Alpha(pixel4)) >> 2);

                return Common.ARGBINT(a, r, g, b);
            }

            static Interpolate4P4Q(pixel1, pixel2, pixel3, pixel4, quantifier1, quantifier2, quantifier3, quantifier4) {

                var total = parseInt(quantifier1 + quantifier2 + quantifier3 + quantifier4);

                var r = parseInt((Common.Red(pixel1) * quantifier1 + Common.Red(pixel2) * quantifier2 + Common.Red(pixel3) * quantifier3 + Common.Red(pixel4) * quantifier4) / total);
                var g = parseInt((Common.Green(pixel1) * quantifier1 + Common.Green(pixel2) * quantifier2 + Common.Green(pixel3) * quantifier3 + Common.Green(pixel4) * quantifier4) / total);
                var b = parseInt((Common.Blue(pixel1) * quantifier1 + Common.Blue(pixel2) * quantifier2 + Common.Blue(pixel3) * quantifier3 + Common.Blue(pixel4) * quantifier4) / total);
                var a = parseInt((Common.Alpha(pixel1) * quantifier1 + Common.Alpha(pixel2) * quantifier2 + Common.Alpha(pixel3) * quantifier3 + Common.Alpha(pixel4) * quantifier4) / total);

                return Common.ARGBINT(a, r, g, b);
            }

            static Mixpal(c1, c2) {

                return (this.Interpolate2P2Q(c1, c2, 3, 1));
            }

            static Fix(n, min, max) {

                return Math.max(Math.min(n, max), min);
            }

            static Unmix(c1, c2) {

                /* A variant of an unsharp mask, without the blur part. $/

                var ra = Common.Red(c1);
                var ga = Common.Green(c1);
                var ba = Common.Blue(c1);
                var aa = Common.Alpha(c1);

                var rb = Common.Red(c2);
                var gb = Common.Green(c2);
                var bb = Common.Blue(c2);
                var ab = Common.Alpha(c2);

                var r = ((this.Fix((ra + (ra - rb)), 0, 255) + rb) >> 1);
                var g = ((this.Fix((ga + (ga - gb)), 0, 255) + gb) >> 1);
                var b = ((this.Fix((ba + (ba - bb)), 0, 255) + bb) >> 1);
                var a = ((this.Fix((aa + (aa - ab)), 0, 255) + ab) >> 1);

                return Common.ARGBINT(a, r, g, b);
            }
        }

    // image flips
        class Flip {

            static FlipUD(src, sizex, sizey) {

                var Channels = 4;

                if (src.length > 0) {

                    for (var y = 0; y < sizey / 2; y++) {
                        for (var x = 0; x < sizex; x++) {

                            var index = (y * sizex + x) * Channels;
                            var rev = ((sizey - y - 1) * sizex + x) * Channels;

                            for (var Channel = 0; Channel < Channels; Channel++) {

                                var temp = src[index + Channel];
                                src[index + Channel] = src[rev + Channel];
                                src[rev + Channel] = temp;
                            }
                        }
                    }
                }
            }

            static FlipLR(src, sizex, sizey) {

                var Channels = 4;

                if (src.length > 0) {

                    for (var y = 0; y < sizey; y++) {
                        for (var x = 0; x < sizex / 2; x++) {

                            var index = (y * sizex + x) * Channels;
                            var rev = (y * sizex + (sizex - x - 1)) * Channels;

                            for (var Channel = 0; Channel < Channels; Channel++) {

                                var temp = src[index + Channel];
                                src[index + Channel] = src[rev + Channel];
                                src[rev + Channel] = temp;
                            }
                        }
                    }
                }
            }
        }

        class Rotate {

            static Transpose(dst, src, srcx, srcy) {

                var Channels = 4;

                for (var y = 0; y < srcy; y++) {
                    for (var x = 0; x < srcx; x++) {
                        for (var Channel = 0; Channel < Channels; Channel++) {

                            dst[(x * srcy + y) * Channels + Channel] = src[(y * srcx + x) * Channels + Channel];
                        }
                    }
                }
            }

            static Rotate90(dst, src, srcx, srcy) {

                this.Transpose(dst, src, srcx, srcy);

                Flip.FlipUD(dst, srcy, srcx);
            }

            static Rotate180(dst, src, srcx, srcy) {

                var Channels = 4;

                Common.Copy(dst, src, srcx * srcy * Channels);

                Flip.FlipUD(dst, srcx, srcy);

                Flip.FlipLR(dst, srcx, srcy);
            }

            static Rotate270(dst, src, srcx, srcy) {

                Flip.FlipUD(src, srcx, srcy);

                this.Transpose(dst, src, srcx, srcy);
            }
        }

        class Kreed {

            static Conc2D(c00, c01, c10, c11) {

                var result = 0;

                var acAreAlike = Common.IsLike(c00, c10);

                var x = acAreAlike ? 1 : 0;
                var y = (Common.IsLike(c01, c10) && !(acAreAlike)) ? 1 : 0;

                var adAreAlike = Common.IsLike(c00, c11);

                x += adAreAlike ? 1 : 0;
                y += (Common.IsLike(c01, c11) && !(adAreAlike)) ? 1 : 0;

                if (x <= 1)
                    result++;

                if (y <= 1)
                    result--;

                return (result);
            }
        }

        class ReverseAA {

            static Clamp(v, min, max) {

                return parseInt(Math.min(max, Math.max(v, min)));
            }

            static FullClamp(value) {

                return Common._Clip8(value);
            }

            static _ReverseAntiAlias(b1, b, d, e, f, h, h5, d0, f4) {

                var n1 = b1;
                var n2 = b;
                var s = e;
                var n3 = h;
                var n4 = h5;
                var aa = n2 - n1;
                var bb = s - n2;
                var cc = n3 - s;
                var dd = n4 - n3;

                var tilt = (7 * (bb + cc) - 3 * (aa + dd)) / 16;

                var m = (s < 128) ? 2 * s : 2 * (255 - s);

                m = Math.min(m, 2 * Math.abs(bb));
                m = Math.min(m, 2 * Math.abs(cc));

                tilt = this.Clamp(tilt, -m, m);

                var s1 = s + tilt / 2;
                var s0 = s1 - tilt;

                n1 = d0;
                n2 = d;
                s = s0;
                n3 = f;
                n4 = f4;
                aa = n2 - n1;
                bb = s - n2;
                cc = n3 - s;
                dd = n4 - n3;

                tilt = (7 * (bb + cc) - 3 * (aa + dd)) / 16;

                m = (s < 128) ? 2 * s : 2 * (255 - s);

                m = Math.min(m, 2 * Math.abs(bb));
                m = Math.min(m, 2 * Math.abs(cc));

                tilt = this.Clamp(tilt, -m, m);

                var e1 = s + tilt / 2;
                var e0 = e1 - tilt;

                s = s1;
                bb = s - n2;
                cc = n3 - s;

                tilt = (7 * (bb + cc) - 3 * (aa + dd)) / 16;

                m = (s < 128) ? 2 * s : 2 * (255 - s);

                m = Math.min(m, 2 * Math.abs(bb));
                m = Math.min(m, 2 * Math.abs(cc));

                tilt = this.Clamp(tilt, -m, m);

                var e3 = s + tilt / 2;
                var e2 = e3 - tilt;

                return { rd: this.FullClamp(e0), gn: this.FullClamp(e1), bl: this.FullClamp(e2), alpha: this.FullClamp(e3) };
            }
        }

    // image initialization
        class Init {

            static Buffer(Length, c) {

                var Channels = 4;

                var buffer = new Uint8ClampedArray(Length * Channels);

                for (var i = 0; i < Length; i++) {

                    var index = i * Channels;

                    buffer[index] = parseInt(c);
                    buffer[index + 1] = parseInt(c);
                    buffer[index + 2] = parseInt(c);
                    buffer[index + 3] = 255;
                }

                return buffer;
            }

            static New(x, y) {

                return this.Buffer(x * y, 0);
            }

            static Init(srcx, srcy, FilterScaleX, FilterScaleY, ComparisonThreshold) {

                Common.ScaleX = FilterScaleX;
                Common.ScaleY = FilterScaleY;
                Common.SizeX = srcx * FilterScaleX;
                Common.SizeY = srcy * FilterScaleY;
                Common.Threshold = ComparisonThreshold;

                Common.ScaledImage = this.New(Common.SizeX, Common.SizeY);
            }
        }


        // Lior Halphon's Omniscale (Modified: Uses Maxim Stepin's Color comparison routine)
        var Filter = class {

            Apply(Input, srcx, srcy, scale, threshold) {

                var Channels = 4;

                scale = Math.max(1, scale);

                Init.Init(srcx, srcy, scale, scale, threshold);

                var total = Common.SizeY;
                var current = 0;

                for (var y = 0; y < Common.SizeY; y++) {

                    var offset = y * Common.SizeX;
                    var positiony = y / Common.SizeY;

                    for (var x = 0; x < Common.SizeX; x++) {

                        var argb = this.ScaleImage(Input, x / Common.SizeX, positiony, srcx, srcy, Common.SizeX, Common.SizeY);

                        Common.ScaledImage[(offset + x) * Channels] = Common.Red(argb);
                        Common.ScaledImage[(offset + x) * Channels + 1] = Common.Green(argb);
                        Common.ScaledImage[(offset + x) * Channels + 2] = Common.Blue(argb);
                        Common.ScaledImage[(offset + x) * Channels + 3] = Common.Alpha(argb);
                    }

                    current++;

                    //notify({ ScalingProgress: current / total });
                }

                return new ImageData(new Uint8ClampedArray(Common.ScaledImage), srcx * scale, srcy * scale);
            }

            is_different(a, b) {

                return Common.IsNotLike(a, b);
            }

            mix(x, y, a) {

                return Interpolate.Interpolate2P1Q(x, y, a);
            }

            fract(x) {

                return x - Math.floor(x);
            }

            P(pattern, m, r) {

                return ((pattern & (m)) == (r))
            }

            Mul(x, y) {

                var r = Common.Red(x) * y;
                var g = Common.Green(x) * y;
                var b = Common.Blue(x) * y;
                var a = Common.Alpha(x) * y;

                return Common.ARGBINT(a, r, g, b);
            }

            Add(x, y, scale) {

                var r = (Common.Red(x) + Common.Red(y)) * scale;
                var g = (Common.Green(x) + Common.Green(y)) * scale;
                var b = (Common.Blue(x) + Common.Blue(y)) * scale;
                var a = (Common.Alpha(x) + Common.Alpha(y)) * scale;

                return Common.ARGBINT(a, r, g, b);
            }

            length(a, b) {

                return Math.sqrt(a * a + b * b);
            }

            ScaleImage(image, ppx, ppy, srcx, srcy, dstx, dsty) {

                var ox = 1.0 / srcx;
                var oy = 1.0 / srcy;

                var px = this.fract(ppx * srcx);
                var py = this.fract(ppy * srcy);

                if (px > 0.5) {

                    ox = -ox;
                    px = 1.0 - px;
                }

                if (py > 0.5) {

                    oy = -oy;
                    py = 1.0 - py;
                }

                // convert texture coordinates to image coordinates
                ox = parseInt(ox * srcx);
                oy = parseInt(oy * srcy);

                var positionx = parseInt(ppx * srcx);
                var positiony = parseInt(ppy * srcy);

                var w0 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox, -oy);
                var w1 = Common.CLR(image, srcx, srcy, positionx, positiony, 0, -oy);
                var w2 = Common.CLR(image, srcx, srcy, positionx, positiony, ox, -oy);
                var w3 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox, 0);
                var w4 = Common.CLR(image, srcx, srcy, positionx, positiony, 0, 0);
                var w5 = Common.CLR(image, srcx, srcy, positionx, positiony, ox, 0);
                var w6 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox, oy);
                var w7 = Common.CLR(image, srcx, srcy, positionx, positiony, 0, oy);
                var w8 = Common.CLR(image, srcx, srcy, positionx, positiony, ox, oy);

                var pattern = 0;

                if (this.is_different(w0, w4)) pattern |= (1 << 0);
                if (this.is_different(w1, w4)) pattern |= (1 << 1);
                if (this.is_different(w2, w4)) pattern |= (1 << 2);
                if (this.is_different(w3, w4)) pattern |= (1 << 3);
                if (this.is_different(w5, w4)) pattern |= (1 << 4);
                if (this.is_different(w6, w4)) pattern |= (1 << 5);
                if (this.is_different(w7, w4)) pattern |= (1 << 6);
                if (this.is_different(w8, w4)) pattern |= (1 << 7);

                if ((this.P(pattern, 0xbf, 0x37) || this.P(pattern, 0xdb, 0x13)) && this.is_different(w1, w5))
                    return this.mix(w4, w3, 0.5 - px);

                if ((this.P(pattern, 0xdb, 0x49) || this.P(pattern, 0xef, 0x6d)) && this.is_different(w7, w3))
                    return this.mix(w4, w1, 0.5 - py);

                if ((this.P(pattern, 0x0b, 0x0b) || this.P(pattern, 0xfe, 0x4a) || this.P(pattern, 0xfe, 0x1a)) && this.is_different(w3, w1))
                    return w4;

                if ((this.P(pattern, 0x6f, 0x2a) || this.P(pattern, 0x5b, 0x0a) || this.P(pattern, 0xbf, 0x3a) || this.P(pattern, 0xdf, 0x5a) || this.P(pattern, 0x9f, 0x8a) || this.P(pattern, 0xcf, 0x8a) || this.P(pattern, 0xef, 0x4e) || this.P(pattern, 0x3f, 0x0e) ||
                    this.P(pattern, 0xfb, 0x5a) || this.P(pattern, 0xbb, 0x8a) || this.P(pattern, 0x7f, 0x5a) || this.P(pattern, 0xaf, 0x8a) || this.P(pattern, 0xeb, 0x8a)) && this.is_different(w3, w1))
                    return this.mix(w4, this.mix(w4, w0, 0.5 - px), 0.5 - py);

                if (this.P(pattern, 0x0b, 0x08))
                    return this.mix(this.mix(this.Mul(w0, 0.375) + this.Mul(w1, 0.25) + this.Mul(w4, 0.375), this.Mul(w4, 0.5) + this.Mul(w1, 0.5), px * 2.0), w4, py * 2.0);

                if (this.P(pattern, 0x0b, 0x02))
                    return this.mix(this.mix(this.Mul(w0, 0.375) + this.Mul(w3, 0.25) + this.Mul(w4, 0.375), this.Mul(w4, 0.5) + this.Mul(w3, 0.5), py * 2.0), w4, px * 2.0);

                var r, dist, pixel_size;

                if (this.P(pattern, 0x2f, 0x2f)) {

                    dist = this.length(px - 0.5, py - 0.5);
                    pixel_size = this.length(1.0 / (dstx / srcx), 1.0 / (dsty / srcy));

                    if (dist < 0.5 - pixel_size / 2) {

                        return w4;
                    }

                    if (this.is_different(w0, w1) || this.is_different(w0, w3)) {

                        r = this.mix(w1, w3, py - px + 0.5);

                    } else {

                        r = this.mix(this.mix(this.Mul(w1, 0.375) + this.Mul(w0, 0.25) + this.Mul(w3, 0.375), w3, py * 2.0), w1, px * 2.0);
                    }

                    if (dist > 0.5 + pixel_size / 2) {

                        return r;
                    }

                    return this.mix(w4, r, (dist - 0.5 + pixel_size / 2) / pixel_size);
                }

                if (this.P(pattern, 0xbf, 0x37) || this.P(pattern, 0xdb, 0x13)) {

                    dist = px - 2.0 * py;
                    pixel_size = this.length(1.0 / (dstx / srcx), 1.0 / (dsty / srcy)) * Math.sqrt(5.0);

                    if (dist > pixel_size / 2) {

                        return w1;
                    }

                    r = this.mix(w3, w4, px + 0.5);

                    if (dist < -pixel_size / 2) {

                        return r;
                    }

                    return this.mix(r, w1, (dist + pixel_size / 2) / pixel_size);
                }

                if (this.P(pattern, 0xdb, 0x49) || this.P(pattern, 0xef, 0x6d)) {

                    dist = py - 2.0 * px;
                    pixel_size = this.length(1.0 / (dstx / srcx), 1.0 / (dsty / srcy)) * Math.sqrt(5.0);

                    if (py - 2.0 * px > pixel_size / 2) {

                        return w3;
                    }

                    r = this.mix(w1, w4, px + 0.5);

                    if (dist < -pixel_size / 2) {

                        return r;
                    }

                    return this.mix(r, w3, (dist + pixel_size / 2) / pixel_size);
                }

                if (this.P(pattern, 0xbf, 0x8f) || this.P(pattern, 0x7e, 0x0e)) {

                    dist = px + 2.0 * py;

                    pixel_size = this.length(1.0 / (dstx / srcx), 1.0 / (dsty / srcy)) * Math.sqrt(5.0);

                    if (dist > 1.0 + pixel_size / 2) {

                        return w4;
                    }

                    if (this.is_different(w0, w1) || this.is_different(w0, w3)) {

                        r = this.mix(w1, w3, py - px + 0.5);

                    } else {

                        r = this.mix(this.mix(this.Mul(w1, 0.375) + this.Mul(w0, 0.25) + this.Mul(w3, 0.375), w3, py * 2.0), w1, px * 2.0);
                    }

                    if (dist < 1.0 - pixel_size / 2) {

                        return r;
                    }

                    return this.mix(r, w4, (dist + pixel_size / 2 - 1.0) / pixel_size);
                }

                if (this.P(pattern, 0x7e, 0x2a) || this.P(pattern, 0xef, 0xab)) {

                    dist = py + 2.0 * px;
                    pixel_size = this.length(1.0 / (dstx / srcx), 1.0 / (dsty / srcy)) * Math.sqrt(5.0);

                    if (py + 2.0 * px > 1.0 + pixel_size / 2) {

                        return w4;
                    }

                    if (this.is_different(w0, w1) || this.is_different(w0, w3)) {

                        r = this.mix(w1, w3, py - px + 0.5);

                    } else {

                        r = this.mix(this.mix(this.Mul(w1, 0.375) + this.Mul(w0, 0.25) + this.Mul(w3, 0.375), w3, py * 2.0), w1, px * 2.0);
                    }

                    if (dist < 1.0 - pixel_size / 2) {

                        return r;
                    }

                    return this.mix(r, w4, (dist + pixel_size / 2 - 1.0) / pixel_size);
                }

                if (this.P(pattern, 0x1b, 0x03) || this.P(pattern, 0x4f, 0x43) || this.P(pattern, 0x8b, 0x83) || this.P(pattern, 0x6b, 0x43))
                    return this.mix(w4, w3, 0.5 - px);

                if (this.P(pattern, 0x4b, 0x09) || this.P(pattern, 0x8b, 0x89) || this.P(pattern, 0x1f, 0x19) || this.P(pattern, 0x3b, 0x19))
                    return this.mix(w4, w1, 0.5 - py);

                if (this.P(pattern, 0xfb, 0x6a) || this.P(pattern, 0x6f, 0x6e) || this.P(pattern, 0x3f, 0x3e) || this.P(pattern, 0xfb, 0xfa) || this.P(pattern, 0xdf, 0xde) || this.P(pattern, 0xdf, 0x1e))
                    return this.mix(w4, w0, (1.0 - px - py) / 2.0);

                if (this.P(pattern, 0x4f, 0x4b) || this.P(pattern, 0x9f, 0x1b) || this.P(pattern, 0x2f, 0x0b) || this.P(pattern, 0xbe, 0x0a) || this.P(pattern, 0xee, 0x0a) || this.P(pattern, 0x7e, 0x0a) || this.P(pattern, 0xeb, 0x4b) || this.P(pattern, 0x3b, 0x1b)) {

                    dist = px + py;
                    pixel_size = this.length(1.0 / (dstx / srcx), 1.0 / (dsty / srcy));

                    if (dist > 0.5 + pixel_size / 2) {

                        return w4;
                    }

                    if (this.is_different(w0, w1) || this.is_different(w0, w3)) {

                        r = this.mix(w1, w3, py - px + 0.5);

                    } else {

                        r = this.mix(this.mix(this.Mul(w1, 0.375) + this.Mul(w0, 0.25) + this.Mul(w3, 0.375), w3, py * 2.0), w1, px * 2.0);
                    }

                    if (dist < 0.5 - pixel_size / 2) {

                        return r;
                    }

                    return this.mix(r, w4, (dist + pixel_size / 2 - 0.5) / pixel_size);
                }

                if (this.P(pattern, 0x0b, 0x01))
                    return this.mix(this.mix(w4, w3, 0.5 - px), this.mix(w1, this.Add(w1, w3, 0.5), 0.5 - px), 0.5 - py);

                if (this.P(pattern, 0x0b, 0x00))
                    return this.mix(this.mix(w4, w3, 0.5 - px), this.mix(w1, w0, 0.5 - px), 0.5 - py);

                dist = px + py;
                pixel_size = this.length(1.0 / (dstx / srcx), 1.0 / (dsty / srcy));

                if (dist > 0.5 + pixel_size / 2)
                    return w4;

                /* We need more samples to "solve" this diagonal $/
                var x0 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox * 2.0, -oy);
                var x1 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox, -oy * 2.0);
                var x2 = Common.CLR(image, srcx, srcy, positionx, positiony, 0.0, -oy * 2.0);
                var x3 = Common.CLR(image, srcx, srcy, positionx, positiony, ox, -oy * 2.0);
                var x4 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox * 2.0, -oy);
                var x5 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox * 2.0, 0.0);
                var x6 = Common.CLR(image, srcx, srcy, positionx, positiony, -ox * 2.0, oy);
    
                if (this.is_different(x0, w4)) pattern |= 1 << 8;
                if (this.is_different(x1, w4)) pattern |= 1 << 9;
                if (this.is_different(x2, w4)) pattern |= 1 << 10;
                if (this.is_different(x3, w4)) pattern |= 1 << 11;
                if (this.is_different(x4, w4)) pattern |= 1 << 12;
                if (this.is_different(x5, w4)) pattern |= 1 << 13;
                if (this.is_different(x6, w4)) pattern |= 1 << 14;
    
                var diagonal_bias = -7;
    
                while (pattern != 0) {
    
                    diagonal_bias += pattern & 1;
                    pattern >>= 1;
                }
    
                if (diagonal_bias <= 0) {
    
                    r = this.mix(w1, w3, py - px + 0.5);
    
                    if (dist < 0.5 - pixel_size / 2) {
    
                        return r;
                    }
    
                    return this.mix(r, w4, (dist + pixel_size / 2 - 0.5) / pixel_size);
                }
    
                return w4;
            }
        }
        try {


            resolve(new Filter().Apply(image_data.data, image_data.width, image_data.height, scale, 1));

        } catch(e){ reject(null); }
    })};
*/

const omniscale = async (image_data, scale, pool = null) => {

    if(Boolean(pool)) {

        return pool.exec(window.omniscale_process_function, [
            image_data,
            scale,
        ]).catch((e) => {

            return window.omniscale_process_function(image_data, scale);
        }).timeout(40 * 1000);

    }else {

        return window.omniscale_process_function(image_data, scale);
    }
};

module.exports = { omniscale };