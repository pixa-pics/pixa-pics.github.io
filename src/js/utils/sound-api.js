import { Howl, Howler } from "howler";
window._sound_object_music = null;

function play_sound(category, pack, name, volume_optional, global_optional) {

    const volume = volume_optional || 1;
    const global = global_optional || false;
    const src_mp3 =  "/src/sounds/" + category + "/" + pack + "/" + name + ".mp3";

    if(global) {

        stop_sound();

        try {
            window._sound_object_music = new Howl({
                src: [src_mp3],
                volume
            });
            window._sound_object_music.play();
        } catch(e) {}
    }else {

        const sound = new Howl({
            src: [src_mp3],
            volume
        });
        sound.play();
    }

}

function stop_sound() {

    try {

        window._sound_object_music.stop();
    } catch(e) {}
}

module.exports = {
    play_sound: play_sound,
    stop_sound: stop_sound
};