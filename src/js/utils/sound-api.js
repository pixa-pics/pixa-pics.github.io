import { Howl } from "howler";
var _sound_object_music = {stop: function (){}};
var _sound_object_effect = {stop: function (){}};
function play_sound(category, pack, name, volume_optional, global_optional) {

    const volume = volume_optional || 1;
    const global = global_optional || false;
    const src_mp3 =  "/src/sounds/" + category + "/" + pack + "/" + name + ".mp3";

    if(global) {

        _sound_object_music.stop();
        _sound_object_music = new Howl({
            src: [src_mp3],
            html5: true,
            loop: true,
            preload: true,
            volume,
            onplayerror: function() {
                _sound_object_music.once('unlock', function() {
                    _sound_object_music.stop();
                    _sound_object_music.play();
                });
            }
        });

        _sound_object_music.play();

    }else {

        _sound_object_effect.stop();
        _sound_object_effect = new Howl({
            src: [src_mp3],
            volume
        });
        _sound_object_effect.play();
    }

}

function stop_sound() {

    _sound_object_music.stop();
    _sound_object_effect.stop();
}

module.exports = {
    play_sound: play_sound,
    stop_sound: stop_sound
};