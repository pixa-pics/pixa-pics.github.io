import { Howl } from "howler";
window._sound_object_music = {stop: function (){}};
window._sound_object_effect = {stop: function (){}};
function play_sound(category, pack, name, volume_optional, global_optional) {

    const volume = volume_optional || 1;
    const global = global_optional || false;
    const src_mp3 =  "/src/sounds/" + category + "/" + pack + "/" + name + ".mp3";

    if(global) {

        window._sound_object_music.stop();
        window._sound_object_music = new Howl({
            src: [src_mp3],
            html5: true,
            loop: true,
            preload: true,
            volume,
            onplayerror: function() {
                window._sound_object_music.once('unlock', function() {
                    window._sound_object_music.stop();
                    window._sound_object_music.play();
                });
            }
        });

        window._sound_object_music.play();

    }else {

        window._sound_object_effect.stop();
        window._sound_object_effect = new Howl({
            src: [src_mp3],
            volume
        });
        window._sound_object_effect.play();
    }

}

function stop_sound() {

    window._sound_object_music.stop();
    window._sound_object_effect.stop();
}

module.exports = {
    play_sound: play_sound,
    stop_sound: stop_sound
};