const SmartRequestAnimationFrame = {
    _create_state() {

        const raf =
            window.requestAnimationFrame       ||
            window.oRequestAnimationFrame      ||
            window.mozRequestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        const caf =
            window.cancelAnimationFrame       ||
            window.oCancelAnimationFrame      ||
            window.mozCancelAnimationFrame    ||
            window.webkitCancelAnimationFrame ||
            window.msCancelAnimationFrame;

        return Object.assign({}, {
            raf,
            caf,
            caf_id: {},
            lasts_raf_time: {},
            previous_cpaf_fps: {},
            cpaf_frames: {},
            is_mobile_or_tablet: Boolean((/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent||navigator.vendor||window.opera.substr(0,4)))),
        });
    },
    init() {

        let state_id = parseInt(Date.now()).toString(16);
        let cs = this._create_state;
        window._sraf_state = window._sraf_state || {};
        window._sraf_state[state_id] = cs();
        let fps_intereval;
        let nfpsc = function(){};

        return {
            // Methods
            start_timer: function (){

                clearInterval(fps_intereval);
                if(fps_intereval) { clearInterval(fps_intereval) }
                window._sraf_state[state_id] = cs();
                fps_intereval = setInterval(function() {
                    "use strict";
                    window._sraf_state[state_id].second_previous_cpaf_fps = parseInt(window._sraf_state[state_id].previous_cpaf_fps);
                    window._sraf_state[state_id].previous_cpaf_fps = window._sraf_state[state_id].cpaf_frames * 1.5 | 0;
                    window._sraf_state[state_id].cpaf_frames = 0;
                    nfpsc((window._sraf_state[state_id].second_previous_cpaf_fps + window._sraf_state[state_id].previous_cpaf_fps | 0) / 2 | 0);
                }, 666);
            },
            set_notify_fps_callback(notify_fps_callback = function(){}) {

                nfpsc = notify_fps_callback;
            },
            destroy(callback_function = function(){}) {
                if(window._sraf_state[state_id] !== null) {

                    clearInterval(fps_intereval)
                    window._sraf_state[state_id] = {};
                    callback_function();
                }else {
                    callback_function("ok");
                }
            },
            run_frame(render_final, do_not_cancel_animation , force_update, requested_at_t, type, not_a_promise = false) {

                do_not_cancel_animation = do_not_cancel_animation || false;
                force_update = force_update || false;
                requested_at_t = requested_at_t || Date.now();
                type = "_"+type;

                return new Promise(function(resolve, reject){

                    if(requested_at_t < (window._sraf_state[state_id].lasts_raf_time|0)) {

                        reject();
                    }else {

                        let skip_frame_rate = window._sraf_state[state_id].is_mobile_or_tablet ? 20: 40;

                        let running_smoothly = true;

                        let deltaT = Date.now() - window._sraf_state[state_id].lasts_raf_time;
                        // do not render frame when deltaT is too high
                        if ( deltaT > 1000 / skip_frame_rate) {
                            running_smoothly = false;
                        }

                        if(force_update) {

                            if(window._sraf_state[state_id].caf_id[type] !== null) {

                                window._sraf_state[state_id].caf.call(window, window._sraf_state[state_id].caf_id[type]);
                                window._sraf_state[state_id].caf_id[type] = null;
                                window._sraf_state[state_id].cpaf_frames--;
                            }

                            window._sraf_state[state_id].cpaf_frames++;

                            var id = window._sraf_state[state_id].caf_id[type] | 0;
                            if(!do_not_cancel_animation) {

                                window._sraf_state[state_id].caf_id[type] = window._sraf_state[state_id].raf.call(window, render);
                            }else {

                                window._sraf_state[state_id].raf.call(window, render);
                            }


                        }else if(!running_smoothly || window._sraf_state[state_id].caf_id[type] !== null && deltaT > 1000 / (skip_frame_rate * 1.5)){ // Low

                            if(window._sraf_state[state_id].caf_id[type] !== null) {

                                window._sraf_state[state_id].caf.call(window, window._sraf_state[state_id].caf_id[type]);
                                window._sraf_state[state_id].caf_id[type] = null;
                                window._sraf_state[state_id].cpaf_frames--;
                            }

                            window._sraf_state[state_id].cpaf_frames++;

                            var id = window._sraf_state[state_id].caf_id[type] | 0;
                            if(!do_not_cancel_animation) {

                                window._sraf_state[state_id].caf_id[type] = window._sraf_state[state_id].raf.call(window, render);
                            }else {

                                window._sraf_state[state_id].raf.call(window, render);
                            }

                        }else if(deltaT < 1000 / (skip_frame_rate * 2)){

                            setTimeout(this, 1000 / (skip_frame_rate * 2), resolve, reject);
                        }else if(force_update || do_not_cancel_animation) {

                            setTimeout(this, 1000 / (skip_frame_rate * 4), resolve, reject);
                        }else {

                            setTimeout(this, 1000 / skip_frame_rate, resolve, reject);
                        }
                    }

                    function render() {
                        window._sraf_state[state_id].lasts_raf_time = requested_at_t | 0;
                        render_final().then(resolve).catch(reject);
                        if(id === window._sraf_state[state_id].caf_id[type]) { window._sraf_state[state_id].caf_id[type] = null;}
                    }
                });
            },
            get_state() {
                return window._sraf_state[state_id];
            }
        };
    }
};

module.exports = SmartRequestAnimationFrame;