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

// Function to handle Table of Content (toc) and HTML content
function handleToc(content, isHtml = false) {
    const toc = [];
    const headerRegex = /<(h[1-6])>(.*?)<\/\1>/g; // Match headers (h1 to h6)
    let match;

    while ((match = headerRegex.exec(content)) !== null) {
        const [fullMatch, tag, text] = match;
        const level = parseInt(tag.substring(1)); // Extract header level (1-6)
        const name = text.trim(); // Extract header text
        const anchor = name.toLowerCase().replace(/\s+/g, '-'); // Generate anchor by replacing spaces with hyphens

        const tocItem = {
            name,
            anchor,
            level,
            children: []
        };

        if (isHtml) {
            // Add ID to the header tag in the HTML content
            content = content.replace(fullMatch, `<${tag} id="${anchor}">${text}</${tag}>`);
        }

        if (level === 1) {
            toc.push(tocItem); // Add top-level headers directly to toc
        } else {
            let parent = toc[toc.length - 1];
            for (let i = 2; i < level; i++) {
                parent = parent.children[parent.children.length - 1]; // Traverse to the correct parent
            }
            parent.children.push(tocItem); // Add as a child to the appropriate parent
        }
    }

    return isHtml ? content : toc; // Return updated HTML or toc JSON
}

module.exports = {
    formatResponse,
    handleDataPattern,
    handleToc
};
