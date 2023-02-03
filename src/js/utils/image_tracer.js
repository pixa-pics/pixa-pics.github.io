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


import LZEL_92 from "./LZEL_92_loader";
window.image_tracer_process_function = LZEL_92(`UraniumJS! H~=2;VCnwbkh6lv)B¡#[%r3q6Pi##PX.[MIdioq#a8h0OZdN2fXa;L4~m5Dx{§4I1W#va9nB~*_h0t%uxt([9Dr((96{F,33¡n>j%Zh07=TqbAMmAGPY8#>¡~Ykm,7-P¡JVD6h<iz@c|9o@6IBhP[Og:ytN?Eq<3e~b>3t¡-§Mi)s+d,:k|=VK6Fm:A2;Zt}m§Zcr#c§Q:Sq GPxR9cR;a cg_y,¡Q=,§=c_%s?{v{Q~%O4pn&#hYX(t+IYB=ue~[a@jRI%j8ZS}{vrsXNv ufIM]DR96>K.zj-8A5u:*TW*ik{-0]3a mEZ~uFReWAwt%-Sn9YlTJ|>C5%|gB7>y>09g9¡#EI ?Px§hgVZ¡@5_d-§>cN#VU*ERhnlm)UJSCVe>wwUEDzY+NI>f*1JI[eX-+bvx@)Z90 0Kt:tQw]{Vc)&A3O*2~_EPs;YWOBLJQ_x@YK??¡JU#u21|zb,~n5Xh{6r#84T_P(Aw:¡Z)z[Tlm#]jm*x9UIV%,3r2oiCUi1]<:FwhMnjP%cSWJvG@zSv&|]v4^ENO4&oYZScd}oZc%*18b&8s*)o#|O¡G|jmzz¡CckO2712>yq0 0Cr,>P(X&kbCs4^v-+S^0ZARqjbR2aw_UC1|U_3(|1St3xgk[-43nB~q*),S7.<#?(j;N9%L*K7@1-K#Nh;}(Zr2yDkQ0]kHHU~a=#Y@iz 7d&?_La%o#+Bb|^z#[o( RFh:85cjf#¡O>jO¡T P3e(B}W3a)Arjr_4AsW]VrGPw>(qIy?d&wR2z(@NAt)lGEjH?]HEFi¡VQ%o45k!]T8xM¡PmN4Q%39dZ+y^_yTE¡RS+11Sqd¡[3K<VK-)5WiK6v1AIB(KNhazx9n=7O55H|_K79& SG47a0cpczV^_uj|vM0~k~R8W=AgEY|EYdY(V}*)NHa~<h%BWrq]:Bby)jQYL>k}Y1IXRoN6|ZX:Sc,m)I5¡*{S5§&91bs|43Xy.(9v6+W@Go 9rb,tj9f%,fF(n<7%%hbEA Mh98g§Jqv,iU{4#2^LV?y3w~OG5@u*2|kr>O;]AYML,0@qx[J!-xVq@rp1T?F37l.q+%&xr4W8lD2.Ti@@qHMNHt~(4§Z~4Vrt#emVkYsgObOv33wRPGh:d_pcb!c;L8NQP<7gWioU{r&W1-,vL+6>n{-NK 1G %])|Yn]UDl;BD_XE!wC[,8&L9,jQ#P,Ji1¡xIfIz)>]7Nrj+s=HxbZ*iaT>Eh,L>kl§j,u1JlyR6!8||J>tykEsNMe~O#}7%@^{?F00os<Wa:<Y0,t]6=ng%N_I2aQz:^yyjKsfGY:%<ULxHr4O*u]fmlUJS%&jZ<OMXIc[op[1xO@.sm>];§dgs~~5%#cr8ALY>by#G5tHx¡d>¡;¡ (![:mI6CCH0] k_WbSg@sH)%iMsIcU;(!O{3Zo&J{,g7}mF2T^?pHHEoDv^:MkPA3lhS@4ZmkeFtiUgb|wb[D.-Jj[]Ea2A¡mgQUB.Su*t-XK0?lqtG%urlAITjQ RipOw9¡A83C:{LMI:#(q¡eOswV.W5Fq&{t_[em.xjf+NPj;[R=k]aE=Lj2¡a(N]2 o§qE#MRO.0I¡U+k%RN5=glA&_Otd^yco!m7C0,%lX0T=:0P,1frKVRb=jeAn@v?xl+9YK5o%p3:?P[*z8,(P?~WLzj{~7Z~_ ?PGQV6M}oBZ0]+:;V5Q%D_.E@-bud§^tj>§ n*k2!19pv,hH<2NlKcI961m_=hv7hj?47NoM|u@MxUwj%X)HcjB.Ci1lAw1?@c6NN2sWljt(z.I:x<SU9BZdM50^#!^Q?#i_slE3ZG29eu&vR MG9 V.w6Zy:kL{-K]h7a|Ya}U1?g2. Jgob?=v§4ERMhwz=7]7OF5e#@-(7]2Nn79gv§Y|x_rR~~3g|g*-+0U_&*nxZA[CSlYPu}bk1>CA|%§n<|?,Xk[EO~x+<4i69Ibyy0xgU@6Ti0aC1Aw0].w.cA|!n(:fZ}-rPs3In{FCg<WVmKg_t{Zz~u<qi{ +gZ]9flEte<ftPRq+fi480e~ %H1(NdTqQbfZdwj]E0w0o9S,SLiQ8QCYirp(SFK~yT?C%U{¡6gsMn7W:wJbdl!d[jVhm[M+)cQ?@gd+F3{=Oe{&#{Me>XVwt]4Wu37Ev6l,S;L YQ<4pFpX;{p(2unB5Z_E?-^f8mIHQ9VG<ER#{!|B1g,+sz1)3G=zn=<fkBkL!nkeC_&4#(@W.¡[Z(XZX§W#o?Mcof.unzx_@¡¡uT!ydJ¡Zb.pA0+d0b B+9F?P))!sX+udAhC?jdUF[[|mr?a§<lIg4s;E>)BQp{;x(dfmeXIG7~HJ.ItNlTXt}bWfaL xrn=~7JEG:O]gV]q@tpLNkXb1[U>|r6p2:9wc_qQTD,DSVPa?]P<#J<<LC.N<y{iReU|3)NIqAM8@LU;R)o<!x¡><Jpw;){cvtX9§IG{_2.53.lLmkGE[p_ w;BUR-<.Ctnco.&XLd4 CcSw7HukT<)&QKQ !m_ls0L:1t5C§]@Py5Go.L!6uhD.n#;?qo7Yz5a.[A 0:¡oEP~8eRD4Ohll*]oBa§|dpd5TwM;§Iq^k*a{T6S*gEwfy;{mtbov?PWX&x§hKC%PP DR)X=X%dHXyH,1cSIy~S6=+0r?&H+9>xI~K}%w4t+eU@HDV[xA MCly=^T[avgh:*~:uk1zm7O?4?y6_i}erDK4>69i7Ga_}c3RKnx_|gYhxq@=lv0{--((Ca R~.d1kSfXLsD{(f:@N_I.([.;(eOV}P|R)&)i+Re^iZ!NlH]7@x{Flh2YmQLrpD8>l>0!w57@76*E4]z|xVTyzpar01L,boPp<x¡3{[rd.mK]?[0>E@d¡CN3.M E:UeO~Wf:ADASf#mldKtFQo&bSwfz4rAd5#*zIFBdX^&uH1A&5TgnQrcYEQm?W^P+ih*2YhTOvj¡Q#vI2G6N?gt{Zt2J;GJ_zq!UD;~ncmQq1%T+YT,@Q§M21rL+6)[oLfp&2Um#uIq<zsrca_,|wQT{~SdH0tMVM6¡1o:.l*wZ3Dn-*V8K(% MTaTykX)[jS1+lQI+F837.yt¡,>TVc)+C4E~9+X>-e)BBgGcM8,&J0§RenP~^0NWomDTouqrJc=y7L&q qljvS(b~Z81wJ~183KAR;ZZv6.?PH.opEu_OTyZt&8=#A63.~k%VW-~tG+8*<HiYlG8[¡EJ,P¡0taat.,8tr6lL:lg9-?yM]dYDa=kS&.>F4a~1lYWQ+?wB<nEhk9¡,BU¡Q2B,@:QFlw 8_hr|UEEwY(X0P&=§Y;8296-U5^7eXp+zr&,{Ey<§IlCwC§n2@7@RTQm{++vPDW!:*-|%HbPkHbuS¡_!|#2(J?[Pom*fMx[[wB4u;p1F<bUWu=y t.ED+8%3V~=@0,}xsM4HR^YEYaSrmSF;c F!~nF:x¡cW.e~Xth?zsR~pr=FT25N*}vIm{ BWrg6PQ_srLG+kELg_Z~§|OPJcx2A?bDP^Ls]e@@Zw#@bO{z-[H6.QTAHSQy,9hFH]Ez¡X,3h2Q8tdU?(R!7:M]A1KM9D{bH!l§qMsZT{*W_5wyy3,_4*@%H§a3E§KP0YG42}y9ni*)siqZz p~C:¡rm,4)zS Im_0nACAN>Lp_u^FurVs|Wa*L^C55m~~,Ww>hk1Y}c)H0,<WRk>ody#5eiy3-:{?YnF4Z=Y:jn[+6 Wp{NXk§yPY¡!}=@ck^FdA4[<&6hf9JijB@8sD2sq7E{0ftuO95PD0;aWByweO>((Kza+s]eB7b7SOf?¡E*LEITzAh:J!Ag.|v§9^IKNPVuXvj5AMc;AV]-g1Om§Q!&MIrkszV-ZzEZzQzGm§@E)]:t*lKQ:*A,f3^-fWUDcRxB%Y+VWtCdgg^Xts2tyL+v([L+{%N e A){yWAA(H-L.V|Qon1{-o {i§SsdX@SI?BjwpeX[IPG2j;EMP<FS}1}&p][OQUjJ]GM]Lv|KNSb&jw?W0hd_XdV+186F,*o=nF;~mpe(v(Ke-Iv*@]:g@b5p2!VOCMo&<^;919dpAq-clc0+q5flG?%C!>}2D|v[=I=8GMX(-Fu3Jn8)5y8jW +T(:kX;<vtNdi¡3<X:m1OpZr*MGunmq 5(C{x+LZh@§Z%Q)t(8hrare)GIv^,KeVRZyPf-)9dk=M!h%mn+LWk]@(Z@Zx§~8@*L33Jn<pg^yj6Y[(3.p@6qc,iI}&fVK3E>?WFKdWbqcM0,>rMLpR4d*@{35.|§FpeL]9*Pm3-,&1~(cqqhQIqs6vgtaX5§7.MWB9zF}#5.jZUHdy|0@i 4yzFuLs0);hY)fGP {[qoL:01g{qr7SoG(?u{X-+dlFzLO H[KIK§ R~{§§elJr# +c-%;9,G¡c]E-9§:Ir|1|]DZkGGc2<3n95N]dz{Z*+4-r<^*gTsTW~}YRFON48ltL{jdu.l2gD[:¡q]z_.c vY+A--5[#Bz,}FY;(2ya}jqW!¡m((36z9bcg,X-¡;S;¡hB&rPe*x1az&|^sE:k*u6J&0YX05v73TfG-]0KYI§*P~)h{bo24@_PmdPdw:8=VXd(RL%LbJU)]he[ZHN2LS9X~?F¡oSF¡YW7|aJ*n4Q+c[0q|Zy1drXu-l9{sO|zhU4KD6_x(?WP2d98-TKelweDgL@g43?>>lz{<#zJN:QDr§wrWLH@<kEQFiY.PY-K<+6?.>j,W(?29kv)[KPLYqh>[¡rgjt8=EmU|GF.4Si|%APc&y¡uA¡&e|?dvXJ=v#K![63xME{LMB!MIdP|Vak@aXCd*B)QuCb~O¡nGJ&pD?}>Y,]LrPgF-j?u8§#g*5vY0#uBaHvYI§?¡99C,6+;uOk1§ht|nota<VJ=W!¡)_.UaAQVy=dgvIJj-ZPSM,z=gaTWBm@Zf+aI@8%668E+@v?Bip4ZbH1¡hun#Jz%^@#c@<m~@a|,!:N!FrbaWLbe#@l.76+cr4<J&?:)]JIp9}]Ac+@%;Us§8KZk3EcEbwQ9W{G@4!1[,cm}~;0[OrsUTLHnRUld={(tM<x=.cWz%Y.hm@iRk5@=IX]J,8SN,aoC|0Qo9OWWOR95>Ewcbv@!=8ep{_SkFFZC19A*%-V5MWJE^whb0m*R uYS8k+@5(;§d2lafZtu%Tmf@>uUG62on).*H*_f,9Bz*5naYIod§Szee{>F[,IN )jg:UdVpQ+W-XeS_8tfLB5UQs V&%Y%KuOy@#[{0b:@:Y7*FJT(tl§_B#Wq-8(lpw2Rh1zz§OTqIKS{5:Av<>.>%¡GN*b6@V>=TK^§b¡5cMSHJvx{)^U!z{T#<-Nwt+D)9idOMn(>|o!?802F]¡¡CAzAGB.5q&p7<_T58K DiPS?ZN4TsW2M§YPp{TuJ bJL%3d2W<K8UDJCGPTyNAWGKs-m4,ai@+v>%h@f]*N@>vX?qyy1Y@§I3dKpz r<NitvlwGh#QfH7Y[tCyLisEJ^b&;]-Tccx_(bkpIVL.:bp<,7AK~(kz+fZhym1^pt8m=e)]lf}_M#1p_y{z*F,@OO0yBT?+%lvDNHJu,=)a_+#zU~mZNXES|Z>UVI[§sQC3{a5¡hI?i(k@ldo,ORc2MT_f1u43uj()SH&f<AM,Ue&0j@6?-o[q.)rbyz:9Xl@u§(u~ &yk=yD;§!g5qvUHJ#YHMG;0OCQ6ODC1Injw(hXc)~a8)(V{.q75 |F+{LSn)cFp~%51:1rzX0gjRAz?ATSVL |5w)!e3=L{l¡Ln*B,81H%cE6VxJP6rTIwGR&g6]2;.E8(1aN0jNGgf~d(Y%Wi|nm.&v^t%@wEZ(#L:k{3YB§[UE+54ZzMw-=@R]A0;v|V;_1G#FB?g|P~Lx7!92uBjK~k73d)!n4Df!pR<dc(9qf7]OOgN-inv7NQwI(n_FRf-7S ]G*28nRhJp0334K),k¡#qpg5Um:;PF=p¡V(?#aYImQgog4Wo{=aLRc]1M6)!lfeMf8EwJT3IfYmV&1dE%f6,tWri4x=Z(w(w~|HuG)9=_>:Lw9L#@sTo~i¡RR5h{|78nX6h8_¡s<jeD&7P&|~4t|[(8j8:g{zwAW4A!%{wtCM]@F+=ROtw^Qx1e!YaC^w[#pKDsxXTMgb_M(&F?dj¡+mkGJI^)4V*=vuG*YkIW1o_]Z+4%Jqpj:6M58a+?W§#1A.&gmdc>5SK¡Sb5!scWW_4a:¡i5i;lf[dpJebiMF<I VYH6[y&¡F|oN7D,ML> S[.Zd=vH x:?Q7ntMZQHB1,xZn1_-Vsrr pN)g6]n?TQ0-[dJc3F,a&Pg *m><:7I1%E)npi*N[NXt}P0Ku%U0vJjSoqdkpEr9[Z v}W@Tz_bmSO u];%iP{~H=g;VyN9Bn0¡-HV§P]VJrkr+8lN&Xl0N.eMe+E[6¡?tC+77ryQU#g19OMH,)v8Z*WCM§Gw]!T<v]jEjA|L|=gyA8AUA_%x|zVnshTPrq]jzsbU64&FnCA#>[O6>SFey}dA?tcA]%rrf<a§6A:q¡m.ubiUcJ?C[o<MzHF XEEQ(xXNX^jj&Hqan^<§TY§o4vt-Wt<6q<o§x,N,4h>+:JK>{|x Z3~~da2F@h>sx4ALsvAl6§[jC3SEKa,#z7@R_3@cpzwCq)p+JmKV5Yg]N4!3A*:;§clJqRvzvE<2Swf[QhG5!I1&2v<x^7&Q:!j{rr59{-Vww§11cRa-M-jr?M,Nq%Eln2B+v-#j.c+KMu C=?K;XSbpMq=q:tAS)+p+n_ p{]Gmk_:0<G:4A{^]s~j@4S2<s08S2Ph1lap;wEOd1t[p1;WpN,fU+|O_X*lO=X8;)@,#AgfvqcfG^3%xh?bsA7fQ8MUAQy{mzxcGt <v@V}d#vUb0i§_GSMG3L~9MyK:NHf(ljJ(2#_o=w!¡3O?ZEWjSaGQY¡n*I4oqP&E]Mc|(1+e.,¡{a)GJ7=X%%aL No9aT<(p§h0x_fe~MR!l{s.0N(ULa9A50%EnlFkXGR&d^%hIg%*VA6@_d@59xRR§WI0i]j]],<yjrS#C,_Z=u^eW|(MQ|0aZ~Ww?texxm3u>V&BFC<EVE{6<&~!h^4sw:dnuiu?TOp[xdPR5<DSS?~azaK,moL%]Byr<uVDGE<Xr@ 9M]LNLPgW{W;PO*oMdq SveZ?b&z&¡]zo<>Z4GUlkrMtc|VVpDt[a,JAL#Z0FuH:+0&km={U9WZaZ0Ppx1agEM} ypfp1+)3fe1kksD[Z%ls&r?=1:eco1^J.I2FD#EeobSe?rlxz<{KE{UyqgEtvs§§|n+HaDY[=rv+?b.)~D!{q¡Cm-37Fd_&!f_T| ;,O+ODTuE2lMa{8w]a>1.o6R,s(E=P@uNTlv,4dIOiOWIBwlCa6X.¡~fJbY9§7EDONLkTFlgqRJlQ]@icse!Si6o0XQL§|%ytl[ F7qr>sM!VNIOlSseGeY56IVMilH8mj uGho(=}X(>}%.frdpOr?YsYEc6-l1QZPJa?22VtT<Um6uv_AsY5dq!9§<(_RCQ>9+&xO,,p PqgVAK_?)0ob=w#NGEVlk6h{Wy=B6:-2d~MI@k*6V9 r0~pkOlbFw{§§9ihW96MkGB0C.b+V?Sg-DImcH)9DZ|_U98cAHgz#3Xh{>):¡KuAkIP.{q*^BS)Ypn;rrBx,y5>M#y @c9|d0P0yCUx) 0x2]ON# ¡># 1[J*w*KTY9c3XElO!0|DSQ4gJ1J4%¡|S7epI{{[i.%a8Hsb~qvFG;vtO5kv>fB.>§LM6J.[FA~?4D=zh}(_WfR*{p5&|!KDBrGSjz,K-uuP{R2s2PT<6ebQgn~1Lqp[¡=5Qi§I=%§|2vjw*0}!IV~iE len@I5iAf<iMlk|@_.2vplT{~ |JeM5[IiqB^]!S?F5§h.7*#F<M.g^ZShXf;S >RfW:^Iq)Q[sN{73~f!zJ;>^.U2%PmAw<H.T0vk6,VlKa§)~veF65n@CL%Fl:=¡!{Z =]Euqr=t(sS4zh~73|IjK¡U6FiJ8-LY%?PIJ*-tR<OkW4e¡D~X;{97aQ={-nC+js}x &*FmLf>CBU2;)&;F^y&G§0C0!!im`);
// return function (a,b){return new Promise(function(c,e){'use strict';function d(){var a=this;this.versionnumber='1.2.6',this.imageToSVG=function(c,d,b){b=a.checkoptions(b),a.loadImage(c,function(c){d(a.imagedataToSVG(a.getImgdata(c),b));},b);},this.imagedataToSVG=function(d,b){b=a.checkoptions(b);var c=a.imagedataToTracedata(d,b);return a.getsvgstring(c,b);},this.imageToTracedata=function(c,d,b){b=a.checkoptions(b),a.loadImage(c,function(c){d(a.imagedataToTracedata(a.getImgdata(c),b));},b);},this.imagedataToTracedata=function(f,b){b=a.checkoptions(b);var c=a.colorquantization(f,b);if(b.layering===0){var d={layers:[],palette:c.palette,width:c.array[0].length-2,height:c.array.length-2};for(var e=0;e<c.palette.length;e++){var h=a.batchtracepaths(a.internodes(a.pathscan(a.layeringstep(c,e),b.pathomit),b),b.ltres,b.qtres);d.layers.push(h);}}else{var g=a.layering(c);b.layercontainerid&&a.drawLayers(g,a.specpalette,b.scale,b.layercontainerid);var i=a.batchpathscan(g,b.pathomit);var j=a.batchinternodes(i,b);var d={layers:a.batchtracelayers(j,b.ltres,b.qtres),palette:c.palette,width:f.width,height:f.height};}return d;},this.optionpresets={'default':{corsenabled:!1,ltres:1,qtres:1,pathomit:8,rightangleenhance:!0,colorsampling:2,numberofcolors:16,mincolorratio:0,colorquantcycles:3,layering:0,strokewidth:1,linefilter:!1,scale:1,roundcoords:1,viewbox:!1,desc:!1,lcpr:0,qcpr:0,blurradius:0,blurdelta:20},posterized1:{colorsampling:0,numberofcolors:2},posterized2:{numberofcolors:4,blurradius:5},curvy:{ltres:0.01,linefilter:!0,rightangleenhance:!1},sharp:{qtres:0.01,linefilter:!1},detailed:{pathomit:0,roundcoords:2,ltres:0.5,qtres:0.5,numberofcolors:64},smoothed:{blurradius:5,blurdelta:64},grayscale:{colorsampling:0,colorquantcycles:1,numberofcolors:7},fixedpalette:{colorsampling:0,colorquantcycles:1,numberofcolors:27},randomsampling1:{colorsampling:1,numberofcolors:8},randomsampling2:{colorsampling:1,numberofcolors:64},artistic1:{colorsampling:0,colorquantcycles:1,pathomit:0,blurradius:5,blurdelta:64,ltres:0.01,linefilter:!0,numberofcolors:16,strokewidth:2},artistic2:{qtres:0.01,colorsampling:0,colorquantcycles:1,numberofcolors:4,strokewidth:0},artistic3:{qtres:10,ltres:10,numberofcolors:8},artistic4:{qtres:10,ltres:10,numberofcolors:64,blurradius:5,blurdelta:256,strokewidth:2},posterized3:{ltres:1,qtres:1,pathomit:20,rightangleenhance:!0,colorsampling:0,numberofcolors:3,mincolorratio:0,colorquantcycles:3,blurradius:3,blurdelta:20,strokewidth:0,linefilter:!1,roundcoords:1,pal:[{r:0,g:0,b:100,a:255},{r:255,g:255,b:255,a:255}]}},this.checkoptions=function(b){b=b||{},typeof b==='string'&&(b=b.toLowerCase(),a.optionpresets[b]?b=a.optionpresets[b]:b={});var d=Object.keys(a.optionpresets['default']);for(var c=0;c<d.length;c++)b.hasOwnProperty(d[c])||(b[d[c]]=a.optionpresets['default'][d[c]]);return b;},this.colorquantization=function(b,g){var m=[],e=0,p,q,k,f=[],n=b.width*b.height,h,i,c,o,d;if(b.data.length<n*4){var l=new Uint8ClampedArray(n*4);for(var j=0;j<n;j++)l[j*4]=b.data[j*3],l[j*4+1]=b.data[j*3+1],l[j*4+2]=b.data[j*3+2],l[j*4+3]=255;b.data=l;}for(i=0;i<b.height+2;i++)for(m[i]=[],h=0;h<b.width+2;h++)m[i][h]=-1;for(g.pal?d=g.pal:g.colorsampling===0?d=a.generatepalette(g.numberofcolors):g.colorsampling===1?d=a.samplepalette(g.numberofcolors,b):d=a.samplepalette2(g.numberofcolors,b),g.blurradius>0&&(b=a.blur(b,g.blurradius,g.blurdelta)),o=0;o<g.colorquantcycles;o++){if(o>0)for(c=0;c<d.length;c++)f[c].n>0&&(d[c]={r:Math.floor(f[c].r/f[c].n),g:Math.floor(f[c].g/f[c].n),b:Math.floor(f[c].b/f[c].n),a:Math.floor(f[c].a/f[c].n)}),f[c].n/n<g.mincolorratio&&o<g.colorquantcycles-1&&(d[c]={r:Math.floor(Math.random()*255),g:Math.floor(Math.random()*255),b:Math.floor(Math.random()*255),a:Math.floor(Math.random()*255)});for(h=0;h<d.length;h++)f[h]={r:0,g:0,b:0,a:0,n:0};for(i=0;i<b.height;i++)for(h=0;h<b.width;h++){for(e=(i*b.width+h)*4,k=0,q=1024,c=0;c<d.length;c++)p=(d[c].r>b.data[e]?d[c].r-b.data[e]:b.data[e]-d[c].r)+(d[c].g>b.data[e+1]?d[c].g-b.data[e+1]:b.data[e+1]-d[c].g)+(d[c].b>b.data[e+2]?d[c].b-b.data[e+2]:b.data[e+2]-d[c].b)+(d[c].a>b.data[e+3]?d[c].a-b.data[e+3]:b.data[e+3]-d[c].a),p<q&&(q=p,k=c);f[k].r+=b.data[e],f[k].g+=b.data[e+1],f[k].b+=b.data[e+2],f[k].a+=b.data[e+3],f[k].n++,m[i+1][h+1]=k;}}return{array:m,palette:d};},this.samplepalette=function(e,a){var b,c=[];for(var d=0;d<e;d++)b=Math.floor(Math.random()*a.data.length/4)*4,c.push({r:a.data[b],g:a.data[b+1],b:a.data[b+2],a:a.data[b+3]});return c;},this.samplepalette2=function(g,a){var b,c=[],d=Math.ceil(Math.sqrt(g)),h=Math.ceil(g/d),i=a.width/(d+1),j=a.height/(h+1);for(var e=0;e<h;e++)for(var f=0;f<d;f++)if(c.length===g)break;else b=Math.floor((e+1)*j*a.width+(f+1)*i)*4,c.push({r:a.data[b],g:a.data[b+1],b:a.data[b+2],a:a.data[b+3]});return c;},this.generatepalette=function(d){var e=[],b,f,g;if(d<8){var h=Math.floor(255/(d-1));for(var c=0;c<d;c++)e.push({r:c*h,g:c*h,b:c*h,a:255});}else{var a=Math.floor(Math.pow(d,0.3333333333333333)),i=Math.floor(255/(a-1)),j=d-a*a*a;for(b=0;b<a;b++)for(f=0;f<a;f++)for(g=0;g<a;g++)e.push({r:b*i,g:f*i,b:g*i,a:255});for(b=0;b<j;b++)e.push({r:Math.floor(Math.random()*255),g:Math.floor(Math.random()*255),b:Math.floor(Math.random()*255),a:Math.floor(Math.random()*255)});}return e;},this.layering=function(d){var e=[],c=0,g=d.array.length,h=d.array[0].length,m,i,n,j,k,o,l,p,b,a,f;for(f=0;f<d.palette.length;f++)for(e[f]=[],a=0;a<g;a++)for(e[f][a]=[],b=0;b<h;b++)e[f][a][b]=0;for(a=1;a<g-1;a++)for(b=1;b<h-1;b++)c=d.array[a][b],m=d.array[a-1][b-1]===c?1:0,i=d.array[a-1][b]===c?1:0,n=d.array[a-1][b+1]===c?1:0,j=d.array[a][b-1]===c?1:0,k=d.array[a][b+1]===c?1:0,o=d.array[a+1][b-1]===c?1:0,l=d.array[a+1][b]===c?1:0,p=d.array[a+1][b+1]===c?1:0,e[c][a+1][b+1]=1+k*2+p*4+l*8,j||(e[c][a+1][b]=2+l*4+o*8),i||(e[c][a][b+1]=0+n*2+k*4+8),m||(e[c][a][b]=0+i*2+4+j*8);return e;},this.layeringstep=function(c,e){var d=[],f=c.array.length,g=c.array[0].length,b,a;for(a=0;a<f;a++)for(d[a]=[],b=0;b<g;b++)d[a][b]=0;for(a=1;a<f;a++)for(b=1;b<g;b++)d[a][b]=(c.array[a-1][b-1]===e?1:0)+(c.array[a-1][b]===e?2:0)+(c.array[a][b-1]===e?8:0)+(c.array[a][b]===e?4:0);return d;},this.pointinpoly=function(e,a){var c=!1;for(var b=0,d=a.length-1;b<a.length;d=b++)c=a[b].y>e.y!==a[d].y>e.y&&e.x<(a[d].x-a[b].x)*(e.y-a[b].y)/(a[d].y-a[b].y)+a[b].x?!c:c;return c;},this.pathscan_combined_lookup=[[[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1]],[[0,1,0,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[0,2,-1,0]],[[-1,-1,-1,-1],[-1,-1,-1,-1],[0,1,0,-1],[0,0,1,0]],[[0,0,1,0],[-1,-1,-1,-1],[0,2,-1,0],[-1,-1,-1,-1]],[[-1,-1,-1,-1],[0,0,1,0],[0,3,0,1],[-1,-1,-1,-1]],[[13,3,0,1],[13,2,-1,0],[7,1,0,-1],[7,0,1,0]],[[-1,-1,-1,-1],[0,1,0,-1],[-1,-1,-1,-1],[0,3,0,1]],[[0,3,0,1],[0,2,-1,0],[-1,-1,-1,-1],[-1,-1,-1,-1]],[[0,3,0,1],[0,2,-1,0],[-1,-1,-1,-1],[-1,-1,-1,-1]],[[-1,-1,-1,-1],[0,1,0,-1],[-1,-1,-1,-1],[0,3,0,1]],[[11,1,0,-1],[14,0,1,0],[14,3,0,1],[11,2,-1,0]],[[-1,-1,-1,-1],[0,0,1,0],[0,3,0,1],[-1,-1,-1,-1]],[[0,0,1,0],[-1,-1,-1,-1],[0,2,-1,0],[-1,-1,-1,-1]],[[-1,-1,-1,-1],[-1,-1,-1,-1],[0,1,0,-1],[0,0,1,0]],[[0,1,0,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[0,2,-1,0]],[[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1],[-1,-1,-1,-1]]],this.pathscan=function(g,s){var b=[],c=0,h=0,d=0,e=0,o=g[0].length,p=g.length,l=0,m=!0,n=!1,k;for(var i=0;i<p;i++)for(var j=0;j<o;j++)if(g[i][j]==4||g[i][j]==11){d=j,e=i,b[c]={},b[c].points=[],b[c].boundingbox=[d,e,d,e],b[c].holechildren=[],m=!1,h=0,n=g[i][j]==11,l=1;while(!m){if(b[c].points[h]={},b[c].points[h].x=d-1,b[c].points[h].y=e-1,b[c].points[h].t=g[e][d],d-1<b[c].boundingbox[0]&&(b[c].boundingbox[0]=d-1),d-1>b[c].boundingbox[2]&&(b[c].boundingbox[2]=d-1),e-1<b[c].boundingbox[1]&&(b[c].boundingbox[1]=e-1),e-1>b[c].boundingbox[3]&&(b[c].boundingbox[3]=e-1),k=a.pathscan_combined_lookup[g[e][d]][l],g[e][d]=k[0],l=k[1],d+=k[2],e+=k[3],d-1===b[c].points[0].x&&e-1===b[c].points[0].y)if(m=!0,b[c].points.length<s)b.pop();else{if(b[c].isholepath=n?!0:!1,n){var q=0,r=[-1,-1,o+1,p+1];for(var f=0;f<c;f++)!b[f].isholepath&&a.boundingboxincludes(b[f].boundingbox,b[c].boundingbox)&&a.boundingboxincludes(r,b[f].boundingbox)&&a.pointinpoly(b[c].points[0],b[f].points)&&(q=f,r=b[f].boundingbox);b[q].holechildren.push(c);}c++;}h++;}}return b;},this.boundingboxincludes=function(a,b){return a[0]<b[0]&&a[1]<b[1]&&a[2]>b[2]&&a[3]>b[3];},this.batchpathscan=function(c,e){var d=[];for(var b in c){if(!c.hasOwnProperty(b))continue;d[b]=a.pathscan(c[b],e);}return d;},this.internodes=function(c,k){var e=[],g=0,f=0,h=0,i=0,j=0,b,d;for(b=0;b<c.length;b++)for(e[b]={},e[b].points=[],e[b].boundingbox=c[b].boundingbox,e[b].holechildren=c[b].holechildren,e[b].isholepath=c[b].isholepath,g=c[b].points.length,d=0;d<g;d++)f=(d+1)%g,h=(d+2)%g,i=(d-1+g)%g,j=(d-2+g)%g,k.rightangleenhance&&a.testrightangle(c[b],j,i,d,f,h)&&(e[b].points.length>0&&(e[b].points[e[b].points.length-1].linesegment=a.getdirection(e[b].points[e[b].points.length-1].x,e[b].points[e[b].points.length-1].y,c[b].points[d].x,c[b].points[d].y)),e[b].points.push({x:c[b].points[d].x,y:c[b].points[d].y,linesegment:a.getdirection(c[b].points[d].x,c[b].points[d].y,(c[b].points[d].x+c[b].points[f].x)/2,(c[b].points[d].y+c[b].points[f].y)/2)})),e[b].points.push({x:(c[b].points[d].x+c[b].points[f].x)/2,y:(c[b].points[d].y+c[b].points[f].y)/2,linesegment:a.getdirection((c[b].points[d].x+c[b].points[f].x)/2,(c[b].points[d].y+c[b].points[f].y)/2,(c[b].points[f].x+c[b].points[h].x)/2,(c[b].points[f].y+c[b].points[h].y)/2)});return e;},this.testrightangle=function(a,c,d,b,e,f){return a.points[b].x===a.points[c].x&&a.points[b].x===a.points[d].x&&a.points[b].y===a.points[e].y&&a.points[b].y===a.points[f].y||a.points[b].y===a.points[c].y&&a.points[b].y===a.points[d].y&&a.points[b].x===a.points[e].x&&a.points[b].x===a.points[f].x;},this.getdirection=function(d,b,e,c){var a=8;return d<e?b<c?a=1:b>c?a=7:a=0:d>e?b<c?a=3:b>c?a=5:a=4:b<c?a=2:b>c?a=6:a=8,a;},this.batchinternodes=function(c,e){var d=[];for(var b in c){if(!c.hasOwnProperty(b))continue;d[b]=a.internodes(c[b],e);}return d;},this.tracepath=function(b,h,i){var e=0,g,f,c,d={};d.segments=[],d.boundingbox=b.boundingbox,d.holechildren=b.holechildren,d.isholepath=b.isholepath;while(e<b.points.length){g=b.points[e].linesegment,f=-1,c=e+1;while((b.points[c].linesegment===g||b.points[c].linesegment===f||f===-1)&&c<b.points.length-1)b.points[c].linesegment!==g&&f===-1&&(f=b.points[c].linesegment),c++;c===b.points.length-1&&(c=0),d.segments=d.segments.concat(a.fitseq(b,h,i,e,c)),c>0?e=c:e=b.points.length;}return d;},this.fitseq=function(b,s,t,c,e){if(e>b.points.length||e<0)return[];var r=c,i=0,j=!0,k,l,g;var h=e-c;h<0&&(h+=b.points.length);var x=(b.points[e].x-b.points[c].x)/h,y=(b.points[e].y-b.points[c].y)/h;var d=(c+1)%b.points.length,p;while(d!=e)p=d-c,p<0&&(p+=b.points.length),k=b.points[c].x+x*p,l=b.points[c].y+y*p,g=(b.points[d].x-k)*(b.points[d].x-k)+(b.points[d].y-l)*(b.points[d].y-l),g>s&&(j=!1),g>i&&(r=d,i=g),d=(d+1)%b.points.length;if(j)return[{type:'L',x1:b.points[c].x,y1:b.points[c].y,x2:b.points[e].x,y2:b.points[e].y}];var q=r;j=!0,i=0;var f=(q-c)/h,m=(1-f)*(1-f),n=2*(1-f)*f,o=f*f;var u=(m*b.points[c].x+o*b.points[e].x-b.points[q].x)/-n,v=(m*b.points[c].y+o*b.points[e].y-b.points[q].y)/-n;d=c+1;while(d!=e)f=(d-c)/h,m=(1-f)*(1-f),n=2*(1-f)*f,o=f*f,k=m*b.points[c].x+n*u+o*b.points[e].x,l=m*b.points[c].y+n*v+o*b.points[e].y,g=(b.points[d].x-k)*(b.points[d].x-k)+(b.points[d].y-l)*(b.points[d].y-l),g>t&&(j=!1),g>i&&(r=d,i=g),d=(d+1)%b.points.length;if(j)return[{type:'Q',x1:b.points[c].x,y1:b.points[c].y,x2:u,y2:v,x3:b.points[e].x,y3:b.points[e].y}];var w=q;return a.fitseq(b,s,t,c,w).concat(a.fitseq(b,s,t,w,e));},this.batchtracepaths=function(b,e,f){var c=[];for(var d in b){if(!b.hasOwnProperty(d))continue;c.push(a.tracepath(b[d],e,f));}return c;},this.batchtracelayers=function(c,e,f){var d=[];for(var b in c){if(!c.hasOwnProperty(b))continue;d[b]=a.batchtracepaths(c[b],e,f);}return d;},this.roundtodec=function(a,b){return+a.toFixed(b);},this.svgpathstring=function(j,i,k,b){var h=j.layers[i],e=h[k],f='',c;if(b.linefilter&&e.segments.length<3)return f;if(f=(b.desc?'<path '+('desc="l '+i+' p '+k+'" '):'<path ')+a.tosvgcolorstr(j.palette[i],b)+'d="',b.roundcoords===-1){for(f+='M '+e.segments[0].x1*b.scale+' '+e.segments[0].y1*b.scale+' ',c=0;c<e.segments.length;c++)f+=e.segments[c].type+' '+e.segments[c].x2*b.scale+' '+e.segments[c].y2*b.scale+' ',e.segments[c].hasOwnProperty('x3')&&(f+=e.segments[c].x3*b.scale+' '+e.segments[c].y3*b.scale+' ');f+='Z ';}else{for(f+='M '+a.roundtodec(e.segments[0].x1*b.scale,b.roundcoords)+' '+a.roundtodec(e.segments[0].y1*b.scale,b.roundcoords)+' ',c=0;c<e.segments.length;c++)f+=e.segments[c].type+' '+a.roundtodec(e.segments[c].x2*b.scale,b.roundcoords)+' '+a.roundtodec(e.segments[c].y2*b.scale,b.roundcoords)+' ',e.segments[c].hasOwnProperty('x3')&&(f+=a.roundtodec(e.segments[c].x3*b.scale,b.roundcoords)+' '+a.roundtodec(e.segments[c].y3*b.scale,b.roundcoords)+' ');f+='Z ';}for(var g=0;g<e.holechildren.length;g++){var d=h[e.holechildren[g]];if(b.roundcoords===-1)for(d.segments[d.segments.length-1].hasOwnProperty('x3')?f+='M '+d.segments[d.segments.length-1].x3*b.scale+' '+d.segments[d.segments.length-1].y3*b.scale+' ':f+='M '+d.segments[d.segments.length-1].x2*b.scale+' '+d.segments[d.segments.length-1].y2*b.scale+' ',c=d.segments.length-1;c>=0;c--)f+=d.segments[c].type+' ',d.segments[c].hasOwnProperty('x3')&&(f+=d.segments[c].x2*b.scale+' '+d.segments[c].y2*b.scale+' '),f+=d.segments[c].x1*b.scale+' '+d.segments[c].y1*b.scale+' ';else for(d.segments[d.segments.length-1].hasOwnProperty('x3')?f+='M '+a.roundtodec(d.segments[d.segments.length-1].x3*b.scale)+' '+a.roundtodec(d.segments[d.segments.length-1].y3*b.scale)+' ':f+='M '+a.roundtodec(d.segments[d.segments.length-1].x2*b.scale)+' '+a.roundtodec(d.segments[d.segments.length-1].y2*b.scale)+' ',c=d.segments.length-1;c>=0;c--)f+=d.segments[c].type+' ',d.segments[c].hasOwnProperty('x3')&&(f+=a.roundtodec(d.segments[c].x2*b.scale)+' '+a.roundtodec(d.segments[c].y2*b.scale)+' '),f+=a.roundtodec(d.segments[c].x1*b.scale)+' '+a.roundtodec(d.segments[c].y1*b.scale)+' ';f+='Z ';}if(f+='" />',b.lcpr||b.qcpr){for(c=0;c<e.segments.length;c++)e.segments[c].hasOwnProperty('x3')&&b.qcpr&&(f+='<circle cx="'+e.segments[c].x2*b.scale+'" cy="'+e.segments[c].y2*b.scale+'" r="'+b.qcpr+'" fill="cyan" stroke-width="'+b.qcpr*0.2+'" stroke="black" />',f+='<circle cx="'+e.segments[c].x3*b.scale+'" cy="'+e.segments[c].y3*b.scale+'" r="'+b.qcpr+'" fill="white" stroke-width="'+b.qcpr*0.2+'" stroke="black" />',f+='<line x1="'+e.segments[c].x1*b.scale+'" y1="'+e.segments[c].y1*b.scale+'" x2="'+e.segments[c].x2*b.scale+'" y2="'+e.segments[c].y2*b.scale+'" stroke-width="'+b.qcpr*0.2+'" stroke="cyan" />',f+='<line x1="'+e.segments[c].x2*b.scale+'" y1="'+e.segments[c].y2*b.scale+'" x2="'+e.segments[c].x3*b.scale+'" y2="'+e.segments[c].y3*b.scale+'" stroke-width="'+b.qcpr*0.2+'" stroke="cyan" />'),!e.segments[c].hasOwnProperty('x3')&&b.lcpr&&(f+='<circle cx="'+e.segments[c].x2*b.scale+'" cy="'+e.segments[c].y2*b.scale+'" r="'+b.lcpr+'" fill="white" stroke-width="'+b.lcpr*0.2+'" stroke="black" />');for(var g=0;g<e.holechildren.length;g++){var d=h[e.holechildren[g]];for(c=0;c<d.segments.length;c++)d.segments[c].hasOwnProperty('x3')&&b.qcpr&&(f+='<circle cx="'+d.segments[c].x2*b.scale+'" cy="'+d.segments[c].y2*b.scale+'" r="'+b.qcpr+'" fill="cyan" stroke-width="'+b.qcpr*0.2+'" stroke="black" />',f+='<circle cx="'+d.segments[c].x3*b.scale+'" cy="'+d.segments[c].y3*b.scale+'" r="'+b.qcpr+'" fill="white" stroke-width="'+b.qcpr*0.2+'" stroke="black" />',f+='<line x1="'+d.segments[c].x1*b.scale+'" y1="'+d.segments[c].y1*b.scale+'" x2="'+d.segments[c].x2*b.scale+'" y2="'+d.segments[c].y2*b.scale+'" stroke-width="'+b.qcpr*0.2+'" stroke="cyan" />',f+='<line x1="'+d.segments[c].x2*b.scale+'" y1="'+d.segments[c].y2*b.scale+'" x2="'+d.segments[c].x3*b.scale+'" y2="'+d.segments[c].y3*b.scale+'" stroke-width="'+b.qcpr*0.2+'" stroke="cyan" />'),!d.segments[c].hasOwnProperty('x3')&&b.lcpr&&(f+='<circle cx="'+d.segments[c].x2*b.scale+'" cy="'+d.segments[c].y2*b.scale+'" r="'+b.lcpr+'" fill="white" stroke-width="'+b.lcpr*0.2+'" stroke="black" />');}}return f;},this.getsvgstring=function(b,c){c=a.checkoptions(c);var g=b.width*c.scale,h=b.height*c.scale;var f='<svg '+(c.viewbox?'viewBox="0 0 '+g+' '+h+'" ':'width="'+g+'" height="'+h+'" ')+'version="1.1" xmlns="http://www.w3.org/2000/svg" desc="Created with image_tracer.js version '+a.versionnumber+'" >';for(var d=0;d<b.layers.length;d++)for(var e=0;e<b.layers[d].length;e++)b.layers[d][e].isholepath||(f+=a.svgpathstring(b,d,e,c));return f+='</svg>',f;},this.compareNumbers=function(a,b){return a-b;},this.torgbastr=function(a){return'rgba('+a.r+','+a.g+','+a.b+','+a.a+')';},this.tosvgcolorstr=function(a,b){return'fill="rgb('+a.r+','+a.g+','+a.b+')" stroke="rgb('+a.r+','+a.g+','+a.b+')" stroke-width="'+b.strokewidth+'" opacity="'+a.a/255+'" ';},this.appendSVGString=function(c,b){var a;b?(a=document.getElementById(b),a||(a=document.createElement('div'),a.id=b,document.body.appendChild(a))):(a=document.createElement('div'),document.body.appendChild(a)),a.innerHTML+=c;},this.gks=[[0.27901,0.44198,0.27901],[0.135336,0.228569,0.272192,0.228569,0.135336],[0.086776,0.136394,0.178908,0.195843,0.178908,0.136394,0.086776],[0.063327,0.093095,0.122589,0.144599,0.152781,0.144599,0.122589,0.093095,0.063327],[0.049692,0.069304,0.089767,0.107988,0.120651,0.125194,0.120651,0.107988,0.089767,0.069304,0.049692]],this.blur=function(c,e,o){var g,h,d,q,b,k,l,m,n,i;var f={width:c.width,height:c.height,data:[]};if(e=Math.floor(e),e<1)return c;e>5&&(e=5),o=Math.abs(o),o>1024&&(o=1024);var j=a.gks[e-1];for(h=0;h<c.height;h++)for(g=0;g<c.width;g++){for(k=0,l=0,m=0,n=0,i=0,d=-e;d<e+1;d++)g+d>0&&g+d<c.width&&(b=(h*c.width+g+d)*4,k+=c.data[b]*j[d+e],l+=c.data[b+1]*j[d+e],m+=c.data[b+2]*j[d+e],n+=c.data[b+3]*j[d+e],i+=j[d+e]);b=(h*c.width+g)*4,f.data[b]=Math.floor(k/ i),f.data[b+1]=Math.floor(l/ i),f.data[b+2]=Math.floor(m/ i),f.data[b+3]=Math.floor(n/ i);}var p=new Uint8ClampedArray(f.data);for(h=0;h<c.height;h++)for(g=0;g<c.width;g++){for(k=0,l=0,m=0,n=0,i=0,d=-e;d<e+1;d++)h+d>0&&h+d<c.height&&(b=((h+d)*c.width+g)*4,k+=p[b]*j[d+e],l+=p[b+1]*j[d+e],m+=p[b+2]*j[d+e],n+=p[b+3]*j[d+e],i+=j[d+e]);b=(h*c.width+g)*4,f.data[b]=Math.floor(k/ i),f.data[b+1]=Math.floor(l/ i),f.data[b+2]=Math.floor(m/ i),f.data[b+3]=Math.floor(n/ i);}for(h=0;h<c.height;h++)for(g=0;g<c.width;g++)b=(h*c.width+g)*4,q=Math.abs(f.data[b]-c.data[b])+Math.abs(f.data[b+1]-c.data[b+1])+Math.abs(f.data[b+2]-c.data[b+2])+Math.abs(f.data[b+3]-c.data[b+3]),q>o&&(f.data[b]=c.data[b],f.data[b+1]=c.data[b+1],f.data[b+2]=c.data[b+2],f.data[b+3]=c.data[b+3]);return f;},this.loadImage=function(c,d,b){var a=new Image();b&&b.corsenabled&&(a.crossOrigin='Anonymous'),a.onload=function(){var b=null;try{if(typeof OffscreenCanvas==='undefined')throw new Error('Impossible to create OffscreenCanvas in this web environment.');b=new OffscreenCanvas(a.width,a.height);}catch(e){canvas=document.createElement('canvas');canvas.width=img.width;canvas.height=img.height;}var c=b.getContext('2d');c.drawImage(a,0,0),d(b);},a.src=c;},this.getImgdata=function(a){var b=a.getContext('2d');return b.getImageData(0,0,a.width,a.height);},this.specpalette=[{r:0,g:0,b:0,a:255},{r:128,g:128,b:128,a:255},{r:0,g:0,b:128,a:255},{r:64,g:64,b:128,a:255},{r:192,g:192,b:192,a:255},{r:255,g:255,b:255,a:255},{r:128,g:128,b:192,a:255},{r:0,g:0,b:192,a:255},{r:128,g:0,b:0,a:255},{r:128,g:64,b:64,a:255},{r:128,g:0,b:128,a:255},{r:168,g:168,b:168,a:255},{r:192,g:128,b:128,a:255},{r:192,g:0,b:0,a:255},{r:255,g:255,b:255,a:255},{r:0,g:128,b:0,a:255}];}try{c(new d().imagedataToSVG(a,b));}catch(e){reject(null);}});};
/*
return function fu(image_data, options){

return new Promise(function(resolve, reject){

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