
import React from 'react';
import SaudiArabia from "../notoemoji/react/EmojiU1F1F81F1E6";
import Bangladesh from "../notoemoji/react/EmojiU1F1E71F1E9";
import India from "../notoemoji/react/EmojiU1F1Ee1F1F3";
import CzechRepublic from "../notoemoji/react/EmojiU1F1E81F1Ff";
import Denmark from "../notoemoji/react/EmojiU1F1E91F1F0";
import Austria from "../notoemoji/react/EmojiU1F1E61F1F9";
import Switzerland from "../notoemoji/react/EmojiU1F1E81F1Ed";
import Germany from "../notoemoji/react/EmojiU1F1E91F1Ea";
import Greece from "../notoemoji/react/EmojiU1F1Ec1F1F7";
import Australia from "../notoemoji/react/EmojiU1F1E61F1Fa";
import Canada from "../notoemoji/react/EmojiU1F1E81F1E6";
import UnitedKingdom from "../notoemoji/react/EmojiU1F1Ec1F1E7";
import Ireland from "../notoemoji/react/EmojiU1F1Ee1F1Ea";
import BritishOceanTerritory from "../notoemoji/react/EmojiU1F1Ee1F1F4";
import NewZealand from "../notoemoji/react/EmojiU1F1F31F1Ff";
import UnitedStates from "../notoemoji/react/EmojiU1F1Fa1F1F8";
import SouthAfrica from "../notoemoji/react/EmojiU1F1Ff1F1E6";
import Argentina from "../notoemoji/react/EmojiU1F1E61F1F7";
import Chile from "../notoemoji/react/EmojiU1F1E81F1F1";
import Colombia from "../notoemoji/react/EmojiU1F1E81F1F4";
import Spain from "../notoemoji/react/EmojiU1F1Ea1F1F8";
import Mexico from "../notoemoji/react/EmojiU1F1F21F1Fd";
import Finland from "../notoemoji/react/EmojiU1F1Eb1F1Ee";
import Belgium from "../notoemoji/react/EmojiU1F1E71F1Ea";
import France from "../notoemoji/react/EmojiU1F1Eb1F1F7";
import Israel from "../notoemoji/react/EmojiU1F1Ee1F1F1";
import Hungary from "../notoemoji/react/EmojiU1F1Ed1F1Fa";
import Indonesia from "../notoemoji/react/EmojiU1F1Ee1F1E9";
import Italy from "../notoemoji/react/EmojiU1F1Ee1F1F9";
import Japan from "../notoemoji/react/EmojiU1F1Ef1F1F5";
import Korean from "../notoemoji/react/EmojiU1F1F01F1F7";
import Netherland from "../notoemoji/react/EmojiU1F1F31F1F1";
import Norway from "../notoemoji/react/EmojiU1F1F31F1F4";
import Poland from "../notoemoji/react/EmojiU1F1F51F1F1";
import Brazil from "../notoemoji/react/EmojiU1F1E71F1F7";
import Europe from "../notoemoji/react/EmojiU1F1Ea1F1Fa";
import Romania from "../notoemoji/react/EmojiU1F1F71F1F4";
import Russian from "../notoemoji/react/EmojiU1F1F71F1Fa";
import Slovakia from "../notoemoji/react/EmojiU1F1F81F1F0";
import Sweden from "../notoemoji/react/EmojiU1F1F81F1Ea";
import SriLanka from "../notoemoji/react/EmojiU1F1F11F1F0";
import Thailand from "../notoemoji/react/EmojiU1F1F91F1Ed";
import Turkey from "../notoemoji/react/EmojiU1F1F91F1F7";
import China from "../notoemoji/react/EmojiU1F1E81F1F3";
import HongKong from "../notoemoji/react/EmojiU1F1Ed1F1F0";
import Taiwan from "../notoemoji/react/EmojiU1F1F91F1Fc";

const LOCALES = [
    {code: "ar-SA", name: "Arabic (Saudi Arabia)", svg: <SaudiArabia />},
    {code: "bn-BD", name: "Bangla (Bangladesh)", svg: <Bangladesh />},
    {code: "bn-IN", name: "Bangla (India)", svg: <India />},
    {code: "cs-CZ", name:  "Czech (Czech Republic)", svg: <CzechRepublic />},
    {code: "da-DK", name:  "Danish (Denmark)", svg: <Denmark />},
    {code: "de-AT", name:  "Austrian German", svg: <Austria />},
    {code: "de-CH", name: "\"Swiss\" German", svg: <Switzerland />},
    {code: "de-DE", name: "Standard German (as spoken in Germany)", svg: <Germany />},
    {code: "el-GR", name: "Modern Greek", svg: <Greece />},
    {code: "en-AU", name: "Australian English", svg: <Australia />},
    {code: "en-CA", name: "Canadian English", svg: <Canada />},
    {code: "en-GB", name: "British English", svg: <UnitedKingdom />},
    {code: "en-IE", name: "Irish English", svg: <Ireland />},
    {code: "en-IN", name: "Indian English", svg: <BritishOceanTerritory />},
    {code: "en-NZ", name: "New Zealand English", svg: <NewZealand />},
    {code: "en-US", name: "US English", svg: <UnitedStates />},
    {code: "en-ZA", name: "English (South Africa)", svg: <SouthAfrica />},
    {code: "es-AR", name: "Argentine Spanish", svg: <Argentina />},
    {code: "es-CL", name: "Chilean Spanish", svg: <Chile />},
    {code: "es-CO", name: "Colombian Spanish", svg: <Colombia />},
    {code: "es-ES", name: "Castilian Spanish (as spoken in Central-Northern Spain)", svg: <Spain />},
    {code: "es-MX", name: "Mexican Spanish", svg: <Mexico />},
    {code: "es-US", name: "American Spanish", svg: <UnitedStates />},
    {code: "fi-FI", name: "Finnish (Finland)", svg: <Finland />},
    {code: "fr-BE", name: "Belgian French", svg: <Belgium />},
    {code: "fr-CA", name: "Canadian French", svg: <Canada />},
    {code: "fr-CH", name: "\"Swiss\" French", svg: <Switzerland />},
    {code: "fr-FR", name: "Standard French (especially in France)", svg: <France />},
    {code: "he-IL", name: "Hebrew (Israel)", svg: <Israel />},
    {code: "hi-IN", name: "Hindi (India)", svg: <India />},
    {code: "hu-HU", name: "Hungarian (Hungary)", svg: <Hungary />},
    {code: "id-ID", name: "Indonesian (Indonesia)", svg: <Indonesia />},
    {code: "it-CH", name: "\"Swiss\" Italian", svg: <Switzerland />},
    {code: "it-IT", name: "Standard Italian (as spoken in Italy)", svg: <Italy />},
    {code: "ja-JP", name: "Japanese (Japan)", svg: <Japan />},
    {code: "ko-KR", name: "Korean (Republic of Korea)", svg: <Korean />},
    {code: "nl-BE", name: "Belgian Dutch", svg: <Belgium />},
    {code: "nl-NL", name: "Standard Dutch (as spoken in The Netherlands)", svg: <Netherland />},
    {code: "no-NO", name: "Norwegian (Norway)", svg: <Norway />},
    {code: "pl-PL", name: "Polish (Poland)", svg: <Poland />},
    {code: "pt-BR", name: "Brazilian Portuguese", svg: <Brazil />},
    {code: "pt-PT", name: "European Portuguese (as written and spoken in Portugal)", svg: <Europe />},
    {code: "ro-RO", name: "Romanian (Romania)", svg: <Romania />},
    {code: "ru-RU", name: "Russian (Russian Federation)", svg: <Russian />},
    {code: "sk-SK", name: "Slovak (Slovakia)", svg: <Slovakia />},
    {code: "sv-SE", name: "Swedish (Sweden)", svg: <Sweden />},
    {code: "ta-IN", name: "Indian Tamil", svg: <India />},
    {code: "ta-LK", name: "Sri Lankan Tamil", svg: <SriLanka />},
    {code: "th-TH", name: "Thai (Thailand)", svg: <Thailand />},
    {code: "tr-TR", name: "Turkish (Turkey)", svg: <Turkey />},
    {code: "zh-CN", name: "Mainland China, simplified characters", svg: <China />},
    {code: "zh-HK", name: "Hong Kong, traditional characters", svg: <HongKong />},
    {code: "zh-TW", name: "Taiwan, traditional characters", svg: <Taiwan />},
];

module.exports = LOCALES;