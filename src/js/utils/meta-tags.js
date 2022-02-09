function update_meta_title(title) {

    const meta_title = document.getElementById("meta-title");

    while( meta_title.firstChild ) {

        meta_title.removeChild( meta_title.firstChild );
    }

    meta_title.appendChild(document.createTextNode(title));

}

module.exports = {
    update_meta_title: update_meta_title
};