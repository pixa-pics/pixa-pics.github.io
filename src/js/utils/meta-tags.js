function update_meta_title(title) {

    let meta_title = document.getElementById("meta-title");
    if(!Boolean(meta_title)){
        meta_title = document.createElement("title");
        meta_title.setAttribute("id", "meta-title");
        document.head.append(meta_title);
    }
    while( meta_title.firstChild ) {

        meta_title.removeChild( meta_title.firstChild );
    }

    meta_title.appendChild(document.createTextNode(title));

}

module.exports = {
    update_meta_title: update_meta_title
};