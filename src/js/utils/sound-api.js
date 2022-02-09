import { Howl, Howler } from "howler";

function play_sound(category, pack, name, volume_optional) {

    const volume = volume_optional || 1;

    const src_mp3 =  "/src/sounds/" + category + "/" + pack + "/" + name + ".mp3";
    const sound = new Howl({
        src: [src_mp3],
        volume
    });
    sound.play();
}

module.exports = {
    play_sound: play_sound
};