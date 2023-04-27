export default function JSLoader(comp, attempts_left = 500) {
    return new Promise(function(resolve, reject) {
        comp().then(function (r){

                if(Boolean(r)) {

                    resolve(r);
                }else {

                    throw new Error("Invalid response");
                }
            }).catch(function (error) {
                // let us retry after 1500 ms
                setTimeout(function() {
                    if (attempts_left === 1) {
                        reject(error);
                        return;
                    }
                    JSLoader(comp, attempts_left - 1).then(resolve).catch(reject);
                }, 50);
            });
    });
}