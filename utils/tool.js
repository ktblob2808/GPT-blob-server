const { JSDOM } = require('jsdom');

const formatResponse = (code, msg, data = null) => {
    return {
        code,
        msg,
        data
    };
};

const handleDataPattern = function(data){
    const arr = [];
    for(const i of data){
        arr.push(i.dataValues);
    }
    return arr;
}

function handleToc(content, isHtml = false) {
    const toc = [];
    const dom = new JSDOM(content);
    const document = dom.window.document;
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headers.forEach(header => {
        const level = parseInt(header.tagName.substring(1));
        const name = header.textContent;
        const anchor = name.toLowerCase().replace(/\s+/g, '-');
        header.id = anchor;

        const tocItem = {
            name,
            anchor,
            level,
            children: []
        };

        if (level === 1) {
            toc.push(tocItem);
        } else {
            let parent = toc[toc.length - 1];
            for (let i = 2; i < level; i++) {
                parent = parent.children[parent.children.length - 1];
            }
            parent.children.push(tocItem);
        }
    });

    return isHtml ? dom.serialize() : toc;
}

module.exports = {
    formatResponse,
    handleDataPattern,
    handleToc
};
