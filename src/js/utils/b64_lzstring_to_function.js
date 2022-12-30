"use strict";
const base64abcCC = Uint8ClampedArray.of(65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47);
const CHUNCK_LENGTH = 256;

function bytesToBase64(bytes) {
    "use strict";
    let i = 2, j = 0;
    let l = bytes.length | 0;

    let k = l % 3 | 0;
    let n = Math.floor(l / 3) * 4 + (k && k + 1) | 0;
    let N = Math.ceil(l / 3) * 4 | 0;
    let result = new Uint8ClampedArray(N|0);

    for (i = 2, j = 0; (i|0) < (l|0); i = (i+3|0)>>>0, j = (j+4|0)>>>0) {
        result[j|0] = base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
        result[j+1|0] = base64abcCC[((bytes[i - 2 | 0] & 0x03) << 4) | (bytes[i - 1 | 0] >> 4)] & 0xFF;
        result[j+2|0] = base64abcCC[((bytes[i - 1 | 0] & 0x0F) << 2) | (bytes[i] >> 6)] & 0xFF;
        result[j+3|0] = base64abcCC[bytes[i|0] & 0x3F] & 0xFF;
    }
    if ((i|0) == (l + 1 | 0)) { // 1 octet yet to write
        result[j] = base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
        result[j+1|0] = base64abcCC[(bytes[i - 2 | 0] & 0x03) << 4] & 0xFF;
        result[j+2|0] = "=".charCodeAt(0) & 0xFF;
        result[j+3|0] = "=".charCodeAt(0) & 0xFF;
        j = (j+4|0)>>>0;
    }
    if ((i|0) == (l|0)) {         result[j|0] = base64abcCC[bytes[i - 2 | 0] >> 2] & 0xFF;
        result[j+1|0] = base64abcCC[((bytes[i - 2 | 0] & 0x03) << 4) | (bytes[i - 1 | 0] >> 4)] & 0xFF;
        result[j+2|0] = base64abcCC[(bytes[i - 1 | 0] & 0x0F) << 2] & 0xFF;
        result[j+3|0] = "=".charCodeAt(0) & 0xFF;
    }

    let s = "";
    let rl = result.length|0;
    for(i = 0; (i|0) < (rl|0); i = (i+CHUNCK_LENGTH|0)>>>0){
        s = s.concat(String.fromCharCode.apply(null, result.subarray(i|0, Math.min(i+CHUNCK_LENGTH|0, rl))));
    }

    return s;
}

const base64error_code = 255;
const base64codes = Uint8ClampedArray.of(255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51);
const base64codes_length = base64codes.length | 0;

function charCodeAt(s) {
    return s.charCodeAt(0) & 0xFF;
}
function getBase64CodesBufferResults(buffer) {
    return Uint8ClampedArray.of( (buffer >> 16) & 0xFF, (buffer >> 8) & 0xFF, buffer & 0xFF)
}
function getBase64CodesBufferResultsBy4(buffer_1, buffer_2, buffer_3, buffer_4 ) {
    return Uint8ClampedArray.of(
        (buffer_1 >> 16) & 0xFF, (buffer_1 >> 8) & 0xFF, buffer_1 & 0xFF,
        (buffer_2 >> 16) & 0xFF, (buffer_2 >> 8) & 0xFF, buffer_2 & 0xFF,
        (buffer_3 >> 16) & 0xFF, (buffer_3 >> 8) & 0xFF, buffer_3 & 0xFF,
        (buffer_4 >> 16) & 0xFF, (buffer_4 >> 8) & 0xFF, buffer_4 & 0xFF
    );
}
function getBase64Code(char_code) {

    char_code = (char_code | 0) & 0xFF;
    if (((char_code|0)>>>0) >= ((base64codes_length|0)>>>0)) {throw new Error("Unable to parse base64 string.");}
    const code = (base64codes[char_code] | 0) >>> 0;
    if (((code|0)>>>0) == ((base64error_code|0)>>>0)) {throw new Error("Unable to parse base64 string.");}
    return (code | 0) & 0xFF;
}
function getBase64CodesBuffer(str_char_codes) {
    return (getBase64Code(str_char_codes[0]) << 18 | getBase64Code(str_char_codes[1]) << 12 | getBase64Code(str_char_codes[2]) << 6 | getBase64Code(str_char_codes[3]) | 0) >>> 0;
}

function base64ToBytes(str) {

    if ((str.length % 4 | 0) > 0) {
        throw new Error("Unable to parse base64 string.");
    }
    const index = str.indexOf("=") | 0;
    if ((index|0) > -1 && (index|0) < (str.length - 2 | 0)) {
        throw new Error("Unable to parse base64 string.");
    }

    let str_char_code = Uint8ClampedArray.from(str.split("").map(function(s){ return charCodeAt(s)}));
    let missingOctets = str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0,
        n = str.length | 0,
        result = new Uint8ClampedArray(3 * (n / 4) | 0);

    let str_char_code_splitted = new Uint8ClampedArray(16);
    let i = 0, j = 0;
    for (;(i+16|0) < (n|0); i = (i+16|0)>>>0, j = (j+12|0)>>>0) { // Single Operation Multiple Data (SIMD) up to 3x faster

        str_char_code_splitted.set(str_char_code.subarray(i, i+16|0));
        result.set(getBase64CodesBufferResultsBy4(
            getBase64CodesBuffer(str_char_code_splitted.subarray(0, 4)),
            getBase64CodesBuffer(str_char_code_splitted.subarray(4, 8)),
            getBase64CodesBuffer(str_char_code_splitted.subarray(8, 12)),
            getBase64CodesBuffer(str_char_code_splitted.subarray(12, 16))
        ), j);
    }

    for (;(i|0) < (n|0); i = (i+4|0)>>>0, j = (j+3|0)>>>0) { // Single Operation Single Data (normal)
        result.set(getBase64CodesBufferResults(getBase64CodesBuffer(str_char_code.subarray(i|0, i+4|0))), j|0);
    }

    return result.slice(0, result.length - missingOctets | 0);
}


/*
GNU GENERAL PUBLIC LICENSE
		       Version 2, June 1991

 Copyright (C) 1989, 1991 Free Software Foundation, Inc.
     59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

			    Preamble

  The licenses for most software are designed to take away your
freedom to share and change it.  By contrast, the GNU General Public
License is intended to guarantee your freedom to share and change free
software--to make sure the software is free for all its users.  This
General Public License applies to most of the Free Software
Foundation's software and to any other program whose authors commit to
using it.  (Some other Free Software Foundation software is covered by
the GNU Library General Public License instead.)  You can apply it to
your programs, too.

  When we speak of free software, we are referring to freedom, not
price.  Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
this service if you wish), that you receive source code or can get it
if you want it, that you can change the software or use pieces of it
in new free programs; and that you know you can do these things.

  To protect your rights, we need to make restrictions that forbid
anyone to deny you these rights or to ask you to surrender the rights.
These restrictions translate to certain responsibilities for you if you
distribute copies of the software, or if you modify it.

  For example, if you distribute copies of such a program, whether
gratis or for a fee, you must give the recipients all the rights that
you have.  You must make sure that they, too, receive or can get the
source code.  And you must show them these terms so they know their
rights.

  We protect your rights with two steps: (1) copyright the software, and
(2) offer you this license which gives you legal permission to copy,
distribute and/or modify the software.

  Also, for each author's protection and ours, we want to make certain
that everyone understands that there is no warranty for this free
software.  If the software is modified by someone else and passed on, we
want its recipients to know that what they have is not the original, so
that any problems introduced by others will not reflect on the original
authors' reputations.

  Finally, any free program is threatened constantly by software
patents.  We wish to avoid the danger that redistributors of a free
program will individually obtain patent licenses, in effect making the
program proprietary.  To prevent this, we have made it clear that any
patent must be licensed for everyone's free use or not licensed at all.

  The precise terms and conditions for copying, distribution and
modification follow.

		    GNU GENERAL PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. This License applies to any program or other work which contains
a notice placed by the copyright holder saying it may be distributed
under the terms of this General Public License.  The "Program", below,
refers to any such program or work, and a "work based on the Program"
means either the Program or any derivative work under copyright law:
that is to say, a work containing the Program or a portion of it,
either verbatim or with modifications and/or translated into another
language.  (Hereinafter, translation is included without limitation in
the term "modification".)  Each licensee is addressed as "you".

Activities other than copying, distribution and modification are not
covered by this License; they are outside its scope.  The act of
running the Program is not restricted, and the output from the Program
is covered only if its contents constitute a work based on the
Program (independent of having been made by running the Program).
Whether that is true depends on what the Program does.

  1. You may copy and distribute verbatim copies of the Program's
source code as you receive it, in any medium, provided that you
conspicuously and appropriately publish on each copy an appropriate
copyright notice and disclaimer of warranty; keep intact all the
notices that refer to this License and to the absence of any warranty;
and give any other recipients of the Program a copy of this License
along with the Program.

You may charge a fee for the physical act of transferring a copy, and
you may at your option offer warranty protection in exchange for a fee.

  2. You may modify your copy or copies of the Program or any portion
of it, thus forming a work based on the Program, and copy and
distribute such modifications or work under the terms of Section 1
above, provided that you also meet all of these conditions:

    a) You must cause the modified files to carry prominent notices
    stating that you changed the files and the date of any change.

    b) You must cause any work that you distribute or publish, that in
    whole or in part contains or is derived from the Program or any
    part thereof, to be licensed as a whole at no charge to all third
    parties under the terms of this License.

    c) If the modified program normally reads commands interactively
    when run, you must cause it, when started running for such
    interactive use in the most ordinary way, to print or display an
    announcement including an appropriate copyright notice and a
    notice that there is no warranty (or else, saying that you provide
    a warranty) and that users may redistribute the program under
    these conditions, and telling the user how to view a copy of this
    License.  (Exception: if the Program itself is interactive but
    does not normally print such an announcement, your work based on
    the Program is not required to print an announcement.)

These requirements apply to the modified work as a whole.  If
identifiable sections of that work are not derived from the Program,
and can be reasonably considered independent and separate works in
themselves, then this License, and its terms, do not apply to those
sections when you distribute them as separate works.  But when you
distribute the same sections as part of a whole which is a work based
on the Program, the distribution of the whole must be on the terms of
this License, whose permissions for other licensees extend to the
entire whole, and thus to each and every part regardless of who wrote it.

Thus, it is not the intent of this section to claim rights or contest
your rights to work written entirely by you; rather, the intent is to
exercise the right to control the distribution of derivative or
collective works based on the Program.

In addition, mere aggregation of another work not based on the Program
with the Program (or with a work based on the Program) on a volume of
a storage or distribution medium does not bring the other work under
the scope of this License.

  3. You may copy and distribute the Program (or a work based on it,
under Section 2) in object code or executable form under the terms of
Sections 1 and 2 above provided that you also do one of the following:

    a) Accompany it with the complete corresponding machine-readable
    source code, which must be distributed under the terms of Sections
    1 and 2 above on a medium customarily used for software interchange; or,

    b) Accompany it with a written offer, valid for at least three
    years, to give any third party, for a charge no more than your
    cost of physically performing source distribution, a complete
    machine-readable copy of the corresponding source code, to be
    distributed under the terms of Sections 1 and 2 above on a medium
    customarily used for software interchange; or,

    c) Accompany it with the information you received as to the offer
    to distribute corresponding source code.  (This alternative is
    allowed only for noncommercial distribution and only if you
    received the program in object code or executable form with such
    an offer, in accord with Subsection b above.)

The source code for a work means the preferred form of the work for
making modifications to it.  For an executable work, complete source
code means all the source code for all modules it contains, plus any
associated interface definition files, plus the scripts used to
control compilation and installation of the executable.  However, as a
special exception, the source code distributed need not include
anything that is normally distributed (in either source or binary
form) with the major components (compiler, kernel, and so on) of the
operating system on which the executable runs, unless that component
itself accompanies the executable.

If distribution of executable or object code is made by offering
access to copy from a designated place, then offering equivalent
access to copy the source code from the same place counts as
distribution of the source code, even though third parties are not
compelled to copy the source along with the object code.

  4. You may not copy, modify, sublicense, or distribute the Program
except as expressly provided under this License.  Any attempt
otherwise to copy, modify, sublicense or distribute the Program is
void, and will automatically terminate your rights under this License.
However, parties who have received copies, or rights, from you under
this License will not have their licenses terminated so long as such
parties remain in full compliance.

  5. You are not required to accept this License, since you have not
signed it.  However, nothing else grants you permission to modify or
distribute the Program or its derivative works.  These actions are
prohibited by law if you do not accept this License.  Therefore, by
modifying or distributing the Program (or any work based on the
Program), you indicate your acceptance of this License to do so, and
all its terms and conditions for copying, distributing or modifying
the Program or works based on it.

  6. Each time you redistribute the Program (or any work based on the
Program), the recipient automatically receives a license from the
original licensor to copy, distribute or modify the Program subject to
these terms and conditions.  You may not impose any further
restrictions on the recipients' exercise of the rights granted herein.
You are not responsible for enforcing compliance by third parties to
this License.

  7. If, as a consequence of a court judgment or allegation of patent
infringement or for any other reason (not limited to patent issues),
conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot
distribute so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you
may not distribute the Program at all.  For example, if a patent
license would not permit royalty-free redistribution of the Program by
all those who receive copies directly or indirectly through you, then
the only way you could satisfy both it and this License would be to
refrain entirely from distribution of the Program.

If any portion of this section is held invalid or unenforceable under
any particular circumstance, the balance of the section is intended to
apply and the section as a whole is intended to apply in other
circumstances.

It is not the purpose of this section to induce you to infringe any
patents or other property right claims or to contest validity of any
such claims; this section has the sole purpose of protecting the
integrity of the free software distribution system, which is
implemented by public license practices.  Many people have made
generous contributions to the wide range of software distributed
through that system in reliance on consistent application of that
system; it is up to the author/donor to decide if he or she is willing
to distribute software through any other system and a licensee cannot
impose that choice.

This section is intended to make thoroughly clear what is believed to
be a consequence of the rest of this License.

  8. If the distribution and/or use of the Program is restricted in
certain countries either by patents or by copyrighted interfaces, the
original copyright holder who places the Program under this License
may add an explicit geographical distribution limitation excluding
those countries, so that distribution is permitted only in or among
countries not thus excluded.  In such case, this License incorporates
the limitation as if written in the body of this License.

  9. The Free Software Foundation may publish revised and/or new versions
of the General Public License from time to time.  Such new versions will
be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

Each version is given a distinguishing version number.  If the Program
specifies a version number of this License which applies to it and "any
later version", you have the option of following the terms and conditions
either of that version or of any later version published by the Free
Software Foundation.  If the Program does not specify a version number of
this License, you may choose any version ever published by the Free Software
Foundation.

  10. If you wish to incorporate parts of the Program into other free
programs whose distribution conditions are different, write to the author
to ask for permission.  For software which is copyrighted by the Free
Software Foundation, write to the Free Software Foundation; we sometimes
make exceptions for this.  Our decision will be guided by the two goals
of preserving the free status of all derivatives of our free software and
of promoting the sharing and reuse of software generally.

			    NO WARRANTY

  11. BECAUSE THE PROGRAM IS LICENSED FREE OF CHARGE, THERE IS NO WARRANTY
FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW.  EXCEPT WHEN
OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES
PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED
OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.  THE ENTIRE RISK AS
TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU.  SHOULD THE
PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING,
REPAIR OR CORRECTION.

  12. IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY MODIFY AND/OR
REDISTRIBUTE THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES,
INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING
OUT OF THE USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED
TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY
YOU OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER
PROGRAMS), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE
POSSIBILITY OF SUCH DAMAGES.

		     END OF TERMS AND CONDITIONS

	    How to Apply These Terms to Your New Programs

  If you develop a new program, and you want it to be of the greatest
possible use to the public, the best way to achieve this is to make it
free software which everyone can redistribute and change under these terms.

  To do so, attach the following notices to the program.  It is safest
to attach them to the start of each source file to most effectively
convey the exclusion of warranty; and each file should have at least
the "copyright" line and a pointer to where the full notice is found.

    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) <year>  <name of author>

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA


Also add information on how to contact you by electronic and paper mail.

If the program is interactive, make it output a short notice like this
when it starts in an interactive mode:

    Gnomovision version 69, Copyright (C) year  name of author
    Gnomovision comes with ABSOLUTELY NO WARRANTY; for details type `show w'.
    This is free software, and you are welcome to redistribute it
    under certain conditions; type `show c' for details.

The hypothetical commands `show w' and `show c' should show the appropriate
parts of the General Public License.  Of course, the commands you use may
be called something other than `show w' and `show c'; they could even be
mouse-clicks or menu items--whatever suits your program.

You should also get your employer (if you work as a programmer) or your
school, if any, to sign a "copyright disclaimer" for the program, if
necessary.  Here is a sample; alter the names:

  Yoyodyne, Inc., hereby disclaims all copyright interest in the program
  `Gnomovision' (which makes passes at compilers) written by James Hacker.

  <signature of Ty Coon>, 1 April 1989
  Ty Coon, President of Vice

This General Public License does not permit incorporating your program into
proprietary programs.  If your program is a subroutine library, you may
consider it more useful to permit linking proprietary applications with the
library.  If this is what you want to do, use the GNU Library General
Public License instead of this License.
*/

// 90% SOURCE: https://github.com/eladkarako/compressjs-flattened/blob/master/Lzp3_joined_.js (And modified a bunch of operation to comply with low-level javascript by Matias Affolter)

var RangeCoder,Stream,BitStream,Util,LogDistanceModel,Huffman,NoModel,FenwickModel,DefSumModel,Context1Model,Lzp3;RangeCoder=function(){var t=Math.pow(2,31),e=t>>>8,i=Math.pow(2,32)-1,r=function(e){this.low=0,this.range=t,this.buffer=0,this.help=0,this.bytecount=0,this.stream=e},o=function(r,o){for(;r.range<=e;){if(r.low<255<<23){for(o.writeByte(r.buffer);r.help;r.help=r.help-1|0)o.writeByte(255);r.buffer=r.low>>>23&255}else if(r.low&t){for(o.writeByte(r.buffer+1|0);r.help;r.help=r.help-1|0)o.writeByte(0);r.buffer=r.low>>>23&255}else if(r.help=r.help+1|0,r.help>i)throw new Error("Too many bytes outstanding, file too large!");r.range=r.range<<8>>>0,r.low=(r.low<<8&t-1)>>>0,r.bytecount=r.bytecount+1|0}};r.prototype.encodeStart=function(e,i){this.low=0,this.range=t,this.buffer=e,this.help=0,this.bytecount=i},r.prototype.encodeFreq=function(t,e,i){o(this,this.stream);var r=this.range/i>>>0,s=r*e;this.low+=s,e+t<i?this.range=r*t:this.range-=s},r.prototype.encodeShift=function(t,e,i){o(this,this.stream);var r=this.range>>>i,s=r*e;this.low+=s,e+t>>>i?this.range-=s:this.range=r*t},r.prototype.encodeBit=function(t){this.encodeShift(1,t?1:0,1)},r.prototype.encodeByte=function(t){this.encodeShift(1,t,8)},r.prototype.encodeShort=function(t){this.encodeShift(1,t,16)},r.prototype.encodeFinish=function(){var t=this.stream;o(this,t),this.bytecount+=5;var i=this.low>>>23;if((this.low&e-1)>=(16777215&this.bytecount)>>>1&&(i=i+1|0),i>255)for(t.writeByte(this.buffer+1|0);this.help;this.help=this.help-1|0)t.writeByte(0);else for(t.writeByte(this.buffer);this.help;this.help=this.help-1|0)t.writeByte(255);return t.writeByte(255&i),t.writeByte(this.bytecount>>>16&255),t.writeByte(this.bytecount>>>8&255),t.writeByte(255&this.bytecount),this.bytecount},r.prototype.decodeStart=function(t){var e=t?0:this.stream.readByte();return"number"!=typeof e||(0|e)<0||(this.buffer=this.stream.readByte(),this.low=this.buffer>>>1,this.range=128),e};var s=function(t,i){for(;t.range<=e;)t.low=t.low<<8|t.buffer<<7&255,t.buffer=i.readByte(),t.low|=t.buffer>>>1,t.low=t.low>>>0,t.range=t.range<<8>>>0};return r.prototype.decodeCulFreq=function(t){s(this,this.stream),this.help=this.range/t>>>0;var e=this.low/this.help>>>0;return(0|e)>=(0|t)?t-1:e},r.prototype.decodeCulShift=function(t){s(this,this.stream),this.help=this.range>>>t;var e=this.low/this.help>>>0;return e>>>t?(1<<t)-1:e},r.prototype.decodeUpdate=function(t,e,i){var r=this.help*e;this.low-=r,e+t<i?this.range=this.help*t:this.range-=r},r.prototype.decodeBit=function(){var t=this.decodeCulShift(1);return this.decodeUpdate(1,t,2),t},r.prototype.decodeByte=function(){var t=this.decodeCulShift(8);return this.decodeUpdate(1,t,256),t},r.prototype.decodeShort=function(){var t=this.decodeCulShift(16);return this.decodeUpdate(1,t,65536),t},r.prototype.decodeFinish=function(){s(this,this.stream)},r.prototype.writeBit=r.prototype.encodeBit,r.prototype.readBit=r.prototype.decodeBit,r.prototype.writeByte=r.prototype.encodeByte,r.prototype.readByte=r.prototype.decodeByte,r}(),Stream=function(){var t=function(){};return t.prototype.readByte=function(){var t=[0];return 0===this.read(t,0,1)?(this._eof=!0,-1):0|t[0]},t.prototype.read=function(t,e,i){for(var r,o=0;(0|o)<(0|i);){if(-1===(r=this.readByte())){this._eof=!0;break}t[e+o++|0]=255&r}return 0|o},t.prototype.eof=function(){return!!this._eof},t.prototype.seek=function(){throw new Error("Stream is not seekable.")},t.prototype.tell=function(){throw new Error("Stream is not seekable.")},t.prototype.writeByte=function(t){this.write(Uint8Array.of(t),0,1)},t.prototype.write=function(t,e,i){var r;for(r=0;(0|r)<(0|i);r=(r+1|0)>>>0)this.writeByte(0|t[e+r|0]);return i},t.prototype.flush=function(){},t.EOF=-1,t}(),BitStream=function(){var t=function(t){(function(){var e=256;this.readBit=function(){if(0==(255&e)){var i=t.readByte();if(i===Stream.EOF)return this._eof=!0,i;e=i<<1|1}var r=256&e?1:0;return e<<=1,r},this.seekBit=function(t){var e=t>>>3,i=t-8*e;this.seek(e),this._eof=!1,this.readBits(i)},this.tellBit=function(){for(var i=8*t.tell(),r=e;0!=(255&r);)i=i-1|0,r<<=1;return i},this.readByte=function(){return 0==(255&e)?t.readByte():this.readBits(8)},this.seek=function(i){t.seek(i),e=256}}).call(this),function(){var e=1;this.writeBit=function(i){e<<=1,i&&(e|=1),256&e&&(t.writeByte(255&e),e=1)},this.writeByte=function(i){1===e?t.writeByte(i):t.writeBits(8,i)},this.flush=function(){for(;1!==e;)this.writeBit(0);t.flush&&t.flush()}}.call(this)};return t.EOF=Stream.EOF,(t.prototype=Object.create(Stream.prototype)).readBits=function(t){var e,i=0;if(t>31)return(i=65536*this.readBits(t-16))+this.readBits(16);for(e=0;(0|e)<(0|t);e=e+1|0)i<<=1,this.readBit()>0&&(i=i+1|0);return i},t.prototype.writeBits=function(t,e){if(t>32){var i=65535&e,r=(e-i)/65536;return this.writeBits(t-16,r),void this.writeBits(16,i)}var o;for(o=t-1;(0|o)>=0;o=o-1|0)this.writeBit(e>>>o&1)},t}(),Util=function(){var t=Object.create(null),e=Stream.EOF;t.coerceInputStream=function(t,i){if("readByte"in t){if(i&&!("read"in t)){var r=t;(t=new Stream).readByte=function(){var t=r.readByte();return t===e&&(this._eof=!0),t},"size"in r&&(t.size=r.size),"seek"in r&&(t.seek=function(t){r.seek(t),this._eof=!1}),"tell"in r&&(t.tell=r.tell.bind(r))}}else{var o=t;(t=new Stream).size=o.length,t.pos=0,t.readByte=function(){return(0|this.pos)>=(0|this.size)?e:o[this.pos++]},t.read=function(t,e,i){for(var r=0;(0|r)<(0|i)&&(0|this.pos)<(0|o.length);)t[e++]=255&o[this.pos++],r=r+1|0;return r},t.seek=function(t){this.pos=t},t.tell=function(){return this.pos},t.eof=function(){return(0|this.pos)>=(0|o.length)}}return t};var i=function(t,e){this.buffer=t,this.resizeOk=e,this.pos=0};(i.prototype=Object.create(Stream.prototype)).writeByte=function(e){if(this.resizeOk&&(0|this.pos)>=(0|this.buffer.length)){var i=t.makeU8Buffer(2*this.buffer.length|0);i.set(this.buffer),this.buffer=i}this.buffer[this.pos++]=255&e},i.prototype.getBuffer=function(){if(this.pos!==this.buffer.length){if(!this.resizeOk)throw new TypeError("outputsize does not match decoded input");var e=t.makeU8Buffer(this.pos);e.set(this.buffer.subarray(0,this.pos)),this.buffer=e}return this.buffer},t.coerceOutputStream=function(e,r){var o={stream:e,retval:e};if(e){if("object"==typeof e&&"writeByte"in e)return o;o.stream=new i("number"==typeof r?t.makeU8Buffer(r):e,!1)}else o.stream=new i(t.makeU8Buffer(16384),!0);return Object.defineProperty(o,"retval",{get:o.stream.getBuffer.bind(o.stream)}),o},t.compressFileHelper=function(e,i,r){return function(o,s,n){o=t.coerceInputStream(o);var h,a,u=t.coerceOutputStream(s,s);for(s=u.stream,h=0;(0|h)<(0|e.length);h=h+1|0)s.writeByte(e.charCodeAt(h));if(a="size"in o&&(0|o.size)>=0?o.size:-1,r){var f=t.coerceOutputStream([]);for(t.writeUnsignedNumber(f.stream,a+1|0),f=f.retval,h=0;(0|h)<(f.length-1|0);h=h+1|0)s.writeByte(f[h]);r=f[f.length-1]}else t.writeUnsignedNumber(s,a+1|0);return i(o,s,a,n,r),u.retval}},t.decompressFileHelper=function(e,i){return function(r,o){var s;for(r=t.coerceInputStream(r),s=0;(0|s)<(0|e.length);s=s+1|0)if(e.charCodeAt(s)!==r.readByte())throw new Error("Bad magic");var n=t.readUnsignedNumber(r)-1,h=t.coerceOutputStream(o,n);return o=h.stream,i(r,o,n),h.retval}},t.compressWithModel=function(t,i,r){for(var o=0;o!==i;){var s=t.readByte();if(s===e){r.encode(256);break}r.encode(s),o=o+1|0}},t.decompressWithModel=function(t,e,i){for(var r=0;r!==e;){var o=i.decode();if(256===o)break;t.writeByte(o),r=r+1|0}},t.writeUnsignedNumber=function(t,e){var i,r=[];do{r.push(127&e),e=Math.floor(e/128)}while(0!==e);for(r[0]|=128,i=r.length-1;(0|i)>=0;i=i-1|0)t.writeByte(r[i]);return t},t.readUnsignedNumber=function(t){for(var e,i=0;;){if(128&(e=t.readByte())){i+=127&e;break}i=128*(i+e)}return i};var r=function(t){for(var e=0,i=t.length;(0|e)<(0|i);e=e+1|0)t[e]=0;return t},o=function(t){return r(new Array(t))},s=function(t){return t};"undefined"!=typeof process&&Array.prototype.some.call(new Uint32Array(128),(function(t){return 0!==t}))&&(s=r),t.makeU8Buffer="undefined"!=typeof Uint8Array?function(t){return s(new Uint8Array(t))}:"undefined"!=typeof Buffer?function(t){var e=new Buffer(t);return e.fill(0),e}:o,t.makeU16Buffer="undefined"!=typeof Uint16Array?function(t){return s(new Uint16Array(t))}:o,t.makeU32Buffer="undefined"!=typeof Uint32Array?function(t){return s(new Uint32Array(t))}:o,t.makeS32Buffer="undefined"!=typeof Int32Array?function(t){return s(new Int32Array(t))}:o,t.arraycopy=function(t,e){for(var i=0,r=e.length;(0|i)<(0|r);i=i+1|0)t[i]=0|e[i];return t};var n=Uint8Array.of(0,1,2,2,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8),h=t.fls=function(t){return t>4294967295?32+h(Math.floor(t/4294967296)):0!=(4294901760&t)?0!=(4278190080&t)?24+n[t>>>24&255]:16+n[t>>>16]:0!=(65280&t)?8+n[t>>>8]:n[t]};return t.log2c=function(t){return 0===t?-1:h(t-1)},t}(),LogDistanceModel=function(){var t=function(t,e,i,r){var o,s=Util.fls(t-1);for(this.extraStates=+e||0,this.lgDistanceModel=i(1+s+e),this.distanceModel=[],o=2;o<=s;o=o+1|0){var n=o-1;this.distanceModel[o]=r(1<<n)}};return t.prototype.encode=function(t){if((0|t)<2)this.lgDistanceModel.encode(t+this.extraStates);else{var e=Util.fls(t);this.lgDistanceModel.encode(e+this.extraStates);var i=t&(1<<e-1)-1;this.distanceModel[e].encode(i)}},t.prototype.decode=function(){var t=this.lgDistanceModel.decode()-this.extraStates;return(0|t)<2?t:(1<<t-1)+this.distanceModel[t].decode()},t}(),Huffman=function(){var t=function(t,e,i,r){this.up=t,this.down=e,this.symbol=i,this.weight=r};t.prototype.clone=function(){return new t(this.up,this.down,this.symbol,this.weight)},t.prototype.set=function(t){this.up=t.up,this.down=t.down,this.symbol=t.symbol,this.weight=t.weight};var e=function(e,i,r,o){var s;for((!i||i>e)&&(i=e),(i<<=1)&&(i=i-1|0),this.table=[],s=0;s<=i;s=s+1|0)this.table[s]=new t(0,0,0,0);if(this.map=[],this.size=e)for(s=0;(0|s)<(0|e);s=s+1|0)this.map[s]=0;this.esc=this.root=i,r&&(this.readBit=r.readBit.bind(r),this.writeBit=r.writeBit.bind(r)),this.max_weight=o};return e.factory=function(t,i){return function(r){return new e(r,r,t,i)}},e.prototype.split=function(t){var e,i;return(e=this.esc)?(this.esc=this.esc-1|0,(i=this.esc)?(this.table[e].down=i,this.table[e].weight=1,this.table[i].up=e,this.esc=this.esc-1|0):(e=0,i=1),this.table[i].symbol=t,this.table[i].weight=0,this.table[i].down=0,this.map[t]=i,this.table[this.esc].weight=0,this.table[this.esc].down=0,this.table[this.esc].up=e,i):0},e.prototype.leader=function(t){for(var e,i,r=this.table[t].weight,o=t;r===this.table[o+1|0].weight;)o=o+1|0;return o===t?t:(i=this.table[t].symbol,e=this.table[o].symbol,this.table[o].symbol=i,this.table[t].symbol=e,this.map[i]=o,this.map[e]=t,o)},e.prototype.slide=function(t){var e,i=t;if(1&(e=this.table[i++].clone()).weight)for(;e.weight>this.table[i+1|0].weight;)i=i+1|0;return this.table[t].set(this.table[i]),this.table[i].set(e),this.table[i].up=this.table[t].up,this.table[t].up=e.up,1&e.weight?(this.table[e.down].up=i,this.table[e.down-1].up=i,this.map[this.table[t].symbol]=t):(this.table[this.table[t].down-1].up=t,this.table[this.table[t].down].up=t,this.map[e.symbol]=i),i},e.prototype.increment=function(t){var e;for(this.table[t].up===t+1|0?(this.table[t].weight+=2,t=t+1|0):t=this.leader(t);this.table[t].weight+=2,e=this.table[t].up;){for(;this.table[t].weight>this.table[t+1|0].weight;)t=this.slide(t);t=1&this.table[t].weight?e:this.table[t].up}this.max_weight&&(0|this.table[this.root].weight)>=(0|this.max_weight)&&this.scale(1)},e.prototype.scale=function(t){for(var e,i,r=this.esc;++r<=this.root;)for(1&this.table[r].weight?(e=-2&this.table[this.table[r].down].weight)&&(e+=1|this.table[this.table[r].down-1].weight):(e=this.table[r].weight>>t&-2)||(this.map[this.table[r].symbol]=0,this.esc++&&(this.esc=this.esc+1|0)),this.table[r].weight=e,i=r;e<this.table[--i].weight;)this.slide(i);this.table[this.esc].down=0},e.prototype.sendid=function(t){for(var e,i=0;t--;)this.map[t]||(i=i+1|0);if(e=this.size-Math.floor((this.root-this.esc)/2)-1)do{this.writeBit(1&i),i>>=1}while(e>>=1)},e.prototype.encode=function(t){var e,i,r,o,s=1;if((0|t)<(0|this.size)&&((r=o=this.map[t])||(r=this.esc))){for(;i=this.table[r].up;)s<<=1,s|=1&r,r=i;for(;e=1&s,s>>=1;)this.writeBit(e);o||(this.sendid(t),o=this.split(t)),this.increment(o)}},e.prototype.readid=function(){var t,e,i=0,r=1;if(t=this.size-Math.floor((this.root-this.esc)/2)-1)do{i|=this.readBit()?r:0,r<<=1}while(t>>=1);for(e=0;(0|e)<(0|this.size);e=e+1|0)if(!this.map[e]&&!i--)return e;return 0},e.prototype.decode=function(){for(var t,e,i=this.root;e=this.table[i].down;)i=this.readBit()?e-1:e;if(i===this.esc){if(!this.esc)return 0;t=this.readid(),i=this.split(t)}else t=this.table[i].symbol;return this.increment(i),t},e.MAGIC="huff",e.compressFile=Util.compressFileHelper(e.MAGIC,(function(t,i,r){var o=new BitStream(i),s=256;(0|r)<0&&(s=s+1|0);var n=new e(257,s,o,8191);Util.compressWithModel(t,r,n),o.flush()})),e.decompressFile=Util.decompressFileHelper(e.MAGIC,(function(t,i,r){var o=new BitStream(t),s=256;(0|r)<0&&(s=s+1|0);var n=new e(257,s,o,8191);Util.decompressWithModel(i,r,n)})),e}(),NoModel=function(){var t=function(t,e){this.bitstream=t,this.bits=Util.fls(e-1)};return t.factory=function(e){return function(i){return new t(e,i)}},t.prototype.encode=function(t){var e;for(e=this.bits-1;(0|e)>=0;e=e-1|0){var i=t>>>e&1;this.bitstream.writeBit(i)}},t.prototype.decode=function(){var t,e=0;for(t=this.bits-1;(0|t)>=0;t=t-1|0)e<<=1,this.bitstream.readBit()&&(e=e+1|0);return e},t.MAGIC="nomo",t.compressFile=Util.compressFileHelper(t.MAGIC,(function(e,i,r){var o=new BitStream(i),s=new t(o,(0|r)<0?257:256);Util.compressWithModel(e,r,s),o.flush()})),t.decompressFile=Util.decompressFileHelper(t.MAGIC,(function(e,i,r){var o=new BitStream(e),s=new t(o,(0|r)<0?257:256);Util.decompressWithModel(i,r,s)})),t}(),FenwickModel=function(){var t=65535,e=4294901760,i=16,r=4294901758,o=function(t,e,r,o){var s;for(this.coder=t,this.numSyms=e+1|0,this.tree=Util.makeU32Buffer(2*this.numSyms),this.increment=+o||256,this.max_prob=+r||65280,s=0;(0|s)<(0|e);s=s+1|0)this.tree[this.numSyms+s]=1;this.tree[this.numSyms+s]=0|this.increment<<i,this._sumTree()};return o.factory=function(t,e,i){return function(r){return new o(t,r,e,i)}},o.prototype.clone=function(){var t,e=new o(this.coder,this.size,this.max_prob,this.increment);for(t=1;(0|t)<(0|this.tree.length);t=t+1|0)e.tree[t]=0|this.tree[t];return e},o.prototype.encode=function(r){var o=this.numSyms+r|0,s=0|this.tree[0|o],n=e,h=i,a=this.increment<<i;0==(s&e)?(this.encode(this.numSyms-1),n=t,a-=1,h=0):(0|r)==(this.numSyms-1|0)&&(this.tree[1]&t)>>>0==1&&(a=0|-this.tree[0|o]);for(var u=0;(0|o)>1;){var f=o>>>1|0;(0|(1&o|0))>0&&(u=u+this.tree[2*f|0]|0),this.tree[0|o]=this.tree[0|o]+a|0,o=0|f}var c=this.tree[1];this.tree[1]+=a,s=(s&n)>>>h,u=(u&n)>>>h,c=(c&n)>>>h,this.coder.encodeFreq(s,u,c),(this.tree[1]&e)>>>i>=this.max_prob&&this._rescale()},o.prototype._decode=function(r){var o=e,s=i,n=this.increment<<i;r&&(o=t,n-=1,s=0);for(var h=(this.tree[1]&o)>>>s,a=this.coder.decodeCulFreq(h),u=1,f=0;(0|u)<(0|this.numSyms);){this.tree[u]+=n;var c=(this.tree[2*u]&o)>>>s;u*=2,(a-f|0)>=(0|c)&&(f+=c,u=u+1|0)}var p=u-this.numSyms,d=(this.tree[u]&o)>>>s;if(this.tree[u]+=n,this.coder.decodeUpdate(d,f,h),p===this.numSyms-1&&(this.tree[1]&t)>>>0==1)for(n=-this.tree[u];(0|u)>=1;)this.tree[u]+=n,u>>>=1;return(this.tree[1]&e)>>>i>=this.max_prob&&this._rescale(),p},o.prototype.decode=function(){var t=this._decode(!1);return t===this.numSyms-1&&(t=this._decode(!0)),t},o.prototype._rescale=function(){var e,i,o=!0;for(e=0;(0|e)<(this.numSyms-1|0);e=e+1|0)0==((i=this.tree[this.numSyms+e])&t)?(0===(i=(i&r)>>>1)&&(i=1,o=!1),this.tree[this.numSyms+e]=i):o=!1;i=((i=this.tree[this.numSyms+e])&r)>>>1,o?i=0:0===i&&(i=65536),this.tree[this.numSyms+e]=i,this._sumTree()},o.prototype._sumTree=function(){var t;for(t=this.numSyms-1;t>0;t=t-1|0)this.tree[t]=this.tree[2*t]+this.tree[2*t+1|0]|0},o.MAGIC="fenw",o.compressFile=Util.compressFileHelper(o.MAGIC,(function(t,e,i,r,s){var n=new RangeCoder(e);n.encodeStart(s,1);var h=new o(n,(0|i)<0?257:256);Util.compressWithModel(t,i,h),n.encodeFinish()}),!0),o.decompressFile=Util.decompressFileHelper(o.MAGIC,(function(t,e,i){var r=new RangeCoder(t);r.decodeStart(!0);var s=new o(r,(0|i)<0?257:256);Util.decompressWithModel(e,i,s),r.decodeFinish()})),o}(),DefSumModel=function(){var t=256,e=function(e,i,r){var o,s=this.numSyms=0|i;for(this.coder=e,this.prob=Util.makeU16Buffer(i+2|0),this.escape=Util.makeU16Buffer(i+1|0),this.update=Util.makeU16Buffer(i+1|0),this.prob[s+1|0]=t,o=0;o<=this.numSyms;o=o+1|0)this.escape[o]=0|o;if(this.updateCount=0,this.updateThresh=t-Math.floor(128)|0,r){for(this.probToSym=Util.makeU16Buffer(t),this.escProbToSym=Util.makeU16Buffer(this.numSyms),o=0;(0|o)<256;o=o+1|0)this.probToSym[o]=(0|s)>>>0;for(o=0;(0|o)<(0|this.numSyms);o=o+1|0)this.escProbToSym[o]=(0|o)>>>0}};return e.factory=function(t,i){return function(r){return new e(t,r,i)}},e.prototype._update=function(e,i){if((0|e)==(0|this.numSyms)){if((0|this.update[e])>=40)return;if((0|this.updateCount)>=(this.updateThresh-1|0))return}if(this.update[e]++,this.updateCount=this.updateCount+1|0,!((0|this.updateCount)<(0|this.updateThresh))){var r,o,s,n,h,a;for(this.escape[0]=this.prob[0]=r=o=s=0,n=0;(0|n)<(this.numSyms+1|0);n=n+1|0){var u=(this.prob[n+1|0]-this.prob[n]>>>1)+this.update[n]|0;u>0?(this.prob[n]=r,r+=u,(1&u)>0&&(s=s+1|0),this.escape[n]=o):(this.prob[n]=r,this.escape[n]=o,o=o+1|0)}for(this.prob[n]=r,this.updateThresh=t-Math.floor((r-s)/2),n=0;(0|n)<(this.numSyms+1|0);n=n+1|0)this.update[n]=0;if(this.update[this.numSyms]=1,this.updateCount=1,i)for(n=0,h=0,a=0;(0|n)<(this.numSyms+1|0);n=n+1|0){for(var f=this.prob[n+1|0];(0|h)<(0|f);h=h+1|0)this.probToSym[h]=n;for(var c=this.escape[n+1|0];(0|a)<(0|c);a=a+1|0)this.escProbToSym[a]=n}}},e.prototype.encode=function(t){var e=this.prob[t],i=this.prob[t+1|0]-e;if(i)return this.coder.encodeShift(i,e,8),this._update(t);this.encode(this.numSyms),e=this.escape[t],i=this.escape[t+1|0]-e;var r=this.escape[this.numSyms];return this.coder.encodeFreq(i,e,r),this._update(t)},e.prototype.decode=function(){var e=this.coder.decodeCulShift(8),i=this.probToSym[e],r=this.prob[i],o=this.prob[i+1|0]-r;if(this.coder.decodeUpdate(o,r,t),this._update(i,!0),i!==this.numSyms)return i;var s=this.escape[this.numSyms];return e=this.coder.decodeCulFreq(s),i=this.escProbToSym[e],r=this.escape[i],o=this.escape[i+1|0]-r,this.coder.decodeUpdate(o,r,s),this._update(i,!0),i},e.MAGIC="dfsm",e.compressFile=Util.compressFileHelper(e.MAGIC,(function(t,i,r,o,s){var n=new RangeCoder(i);n.encodeStart(s,1);var h=new e(n,(0|r)<0?257:256);Util.compressWithModel(t,r,h),n.encodeFinish()}),!0),e.decompressFile=Util.decompressFileHelper(e.MAGIC,(function(t,i,r){var o=new RangeCoder(t);o.decodeStart(!0);var s=new e(o,(0|r)<0?257:256,!0);Util.decompressWithModel(i,r,s),o.decodeFinish()})),e}(),Context1Model=function(){var t=function(t,e,i){var r;for(this.literalModel=[],r=0;(0|r)<(0|e);r=r+1|0)this.literalModel[r]=t(i)};return t.prototype.encode=function(t,e){this.literalModel[e].encode(t)},t.prototype.decode=function(t){return this.literalModel[t].decode()},t.MAGIC="ctx1",t.compressFile=Util.compressFileHelper(t.MAGIC,(function(e,i,r){var o=new BitStream(i),s=256;(0|r)<0&&(s=s+1|0);var n=Huffman.factory(o,8191),h=new t(n,256,s),a=32,u={encode:function(t){h.encode(t,a),a=t}};Util.compressWithModel(e,r,u),o.flush()})),t.decompressFile=Util.decompressFileHelper(t.MAGIC,(function(e,i,r){var o=new BitStream(e),s=256;(0|r)<0&&(s=s+1|0);var n=Huffman.factory(o,8191),h=new t(n,256,s),a=32,u={decode:function(){var t=h.decode(a);return a=t,t}};Util.decompressWithModel(i,r,u)})),t}(),Lzp3=function(){var t=Object.create(null);t.MAGIC="lzp3";var e=1<<20,i=65535,r=function(t){this.buffer=Util.makeU8Buffer(Math.min(t+4|0,e)),this.pos=0,this.ctxt4=Util.makeU32Buffer(65536),this.ctxt3=Util.makeU32Buffer(4096),this.ctxt2=Util.makeU32Buffer(65536),this.put(99),this.put(83),this.put(97),this.put(32)};return r.prototype.put=function(t){return this.buffer[this.pos++]=t,(0|this.pos)>=1048576&&(this.pos=0),t},r.prototype.get=function(t){return this.buffer[1048575&t]},r.prototype.context=function(t,e){var i,r=0;for(t=t-e&1048575,i=0;(0|i)<(0|e);i=i+1|0)r=r<<8|this.buffer[t++],(0|t)>=1048576&&(t=0);return r},r.prototype.getIndex=function(t,e){var r=this.context(t,4),o=65535&(r>>>15^r)|0,s=4095&(r>>>11^r)|0,n=r&i|0,h=0;return 0==(0|e)&&(0!==(h=0|this.ctxt4[o])&&r!=this.context(h-1|0,4)&&(h=0),0==(0|h)&&(0!=(0|(h=0|this.ctxt3[s]))&&(16777215&r)!=this.context(h-1|0,3)&&(h=0),0==(0|h)&&0!=(0|(h=0|this.ctxt2[n]))&&(r&&i)!=this.context(h-1|0,2)&&(h=0))),e&&(e=e-1|0),this.ctxt4[o]=this.ctxt3[s]=this.ctxt2[n]=1+(t|e<<20)|0,h},t.compressFile=Util.compressFileHelper(t.MAGIC,(function(t,i,o){var s,n,h,a=new r((0|o)>=0?o:e),u=new RangeCoder(i);u.encodeStart(0,0),s=FenwickModel.factory(u,65280,256);var f=NoModel.factory(u);n=function(t){return t>256?f(t):s(t)},h=function(){u.encodeFinish()};var c,p=new Context1Model(s,256,(0|o)<0?257:256),d=[];for(c=0;(0|c)<16;c=c+1|0)d[c]=new LogDistanceModel(1048576,1,s,n);for(var l,m=0,y=0;(0|m)!=(0|o);){var w=t.readByte();l=a.pos;var b=a.getIndex(l,0);if(0!=b){for(var v=1+((b=b-1|0)>>>20),B=0;a.get(b+B)==w&&(0|B)<1048575;)B=B+1|0,a.put(w),w=t.readByte();v===B?d[15&y].encode(-1):d[15&y].encode(B),a.getIndex(l,B),m+=B,y<<=1,B>0&&(y|=1)}var g=a.get(a.pos-1);if(w===Stream.EOF){(0|o)<0&&p.encode(256,g);break}p.encode(w,g),a.put(w),m=m+1|0}h&&h()})),t.decompressFile=Util.decompressFileHelper(t.MAGIC,(function(t,o,s){var n,h,a,u=!!(128&t.readByte()),f=new r((0|s)>=0?s:e);if(u){var c=new BitStream(t);n=Huffman.factory(c,i),h=NoModel.factory(c)}else{var p=new RangeCoder(t);p.decodeStart(!0),n=FenwickModel.factory(p,65280,256);var d=NoModel.factory(p);h=function(t){return t>256?d(t):n(t)},a=function(){p.decodeFinish()}}var l,m=new Context1Model(n,256,(0|s)<0?257:256),y=[];for(l=0;(0|l)<16;l=l+1|0)y[l]=new LogDistanceModel(1048576,1,n,h);for(var w,b,v,B=0,g=0,S=0;(0|B)!=(0|s);){if(w=f.pos,0!=(S=0|f.getIndex(w,0))){var U=1+((S=S-1|0)>>>20)|0,M=0|y[15&g].decode();for(M<0&&(M=0|U),l=0;(0|l)<(0|M);l=(l+1|0)>>>0)b=(0|f.get(S+l))>>>0,o.writeByte(f.put(b));f.getIndex(w,M),B=(B+M|0)>>>0,g<<=1,M>0&&(g|=1)}if((0|B)==(0|s))break;if(v=f.get(f.pos-1|0),256==(b=(0|m.decode(v))>>>0))break;o.writeByte(f.put(b)),B=(B+1|0)>>>0}a&&a()})),t}();

function stringToUint(string) {
    "use strict";
    var charList = btoa(unescape(encodeURIComponent(string))).split(''),
        uint8Array = new Uint8Array(charList.length|0),
        rl = charList.length|0;

    for (var i = 0; (i|0) < (rl|0); i=(i+1|0)>>>0) {
        uint8Array[i|0] = (charCodeAt(charList[i|0])|0) & 0xFF;
    }
    return uint8Array;
}

function uintToString(uintArray) {
    "use strict";
    let encodedString = "";
    let rl = uintArray.length|0;
    for(var i = 0; (i|0) < (rl|0); i = (i+CHUNCK_LENGTH|0)>>>0){
        encodedString = encodedString.concat(String.fromCharCode.apply(null, uintArray.subarray(i|0, Math.min(i+CHUNCK_LENGTH|0, rl|0))));
    }

    return decodeURIComponent(escape(atob(encodedString)));
}

function fu(uint8a_or_string, mode) {
    "use strict";
    if(mode === "COMPRESS_UTF8") {
        //  JS -> json_str -> ui8a -> compressed ui8a
        uint8a_or_string = stringToUint(uint8a_or_string);
        uint8a_or_string = Lzp3.compressFile(uint8a_or_string);
        return bytesToBase64(uint8a_or_string);

    }else if(mode === "DECOMPRESS_BASE64") {
        // ui8a decompressed -> ui8a -> json_str -> JS
        return uintToString(Lzp3.decompressFile(base64ToBytes(uint8a_or_string)));

    }else {

        return null;
    }
}

var AFunction = Object.getPrototypeOf( function(){}).constructor;
module.exports = function (text, log, only_text){
    "use strict";
    log = log || false;
    only_text = only_text || false;
    if(log) {
        console.log(fu(text, "DECOMPRESS_BASE64"));
        return null;
    }else {

        if(only_text){
            return fu(text, "DECOMPRESS_BASE64");
        }else {

            return new AFunction(fu(text, "DECOMPRESS_BASE64"))();
        }
    }
};