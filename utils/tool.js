const toc = require('markdown-toc');

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

const handleToc = function(info){
    let result = toc(info.markdownContent).json;

    function transfer(flatArr){
        const stack = [];
        const result = []; 

        /**
         * create TOC object
         * @param {*} item 
         * @returns 
         */
        function createTOCItem(item){
            return {
                name : item.content,
                anchor : item.slug,
                level : item.lvl,
                children : []
            }
        }

        function handleItem(item){

            const top = stack[stack.length - 1];
            if(!top){
                stack.push(item);
            } else if(item.level > top.level){
                top.children.push(item);
                stack.push(item);
            } else {
                stack.pop();
                handleItem(item);
            }
        }

        let min = 6; 
        for(const i of flatArr){
            if(i.lvl < min){
                min = i.lvl;
            }
        }

        for(const item of flatArr){
            const tocItem = createTOCItem(item);
            if(tocItem.level === min){
                result.push(tocItem);
            }
            handleItem(tocItem);
        }

        return result;
    }


    info.toc = transfer(result);

    delete info.markdownContent;

    for(const i of result){
        switch(i.lvl){
            case 1:{
                var newStr = `<h1 id="${i.slug}">`;
                info.htmlContent = info.htmlContent.replace('<h1>',newStr);
                break;
            }
            case 2:{
                var newStr = `<h2 id="${i.slug}">`;
                info.htmlContent = info.htmlContent.replace('<h2>',newStr);
                break;
            }
            case 3:{
                var newStr = `<h3 id="${i.slug}">`;
                info.htmlContent = info.htmlContent.replace('<h3>',newStr);
                break;
            }
            case 4:{
                var newStr = `<h4 id="${i.slug}">`;
                info.htmlContent = info.htmlContent.replace('<h4>',newStr);
                break;
            }
            case 5:{
                var newStr = `<h5 id="${i.slug}">`;
                info.htmlContent = info.htmlContent.replace('<h5>',newStr);
                break;
            }
            case 6:{
                var newStr = `<h6 id="${i.slug}">`;
                info.htmlContent = info.htmlContent.replace('<h6>',newStr);
                break;
            }
        }
    }

    return info;
}

module.exports = {
    formatResponse,
    handleDataPattern,
    handleToc
};
