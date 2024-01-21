function update_meta_title(title) {

    let meta_title = document.getElementById("meta-title");
    if(!Boolean(meta_title)){
        meta_title = document.createElement("title");
        meta_title.setAttribute("id", "meta-title");
        document.head.append(meta_title);
        meta_title.appendChild(document.createTextNode(title));
    }else {
        meta_title.setAttribute("id", "meta-title");
    }
}

module.exports = {
    update_meta_title: update_meta_title
};