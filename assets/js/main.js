window.ready = function (callback) {
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            callback();
        }, false);
    } else if (document.attachEvent) {
        document.attachEvent('onreadytstatechange', function () {
            if (document.readyState == "complete") {
                document.detachEvent("onreadystatechange", arguments.callee);
                callback();
            }
        });
    } else if (document.lastChild == document.body) {
        callback();
    }
};

var commons = {};

/**
 * 代码美化
 * 代码显示行号 & 加入顶栏按钮
 */
commons.codeBeauty = function () {
    var style = document.createElement('style');
    var str = '.markdown-body code .lineno::after{content:attr(data-value);display:inline-block;margin-right:.5rem;padding-right:.5rem;width:1.5rem;text-align:right;border-right:2px solid #999;}';
    str += '.markdown-body pre .code-lines:hover{background:#666;width:100%}';
    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = str;
    } else {
        style.innerHTML = str;
    }
    document.querySelector('head').appendChild(style);

    var codeList = document.querySelectorAll('.markdown-body pre code');
    for (var i = 0, len1 = codeList.length; i < len1; i++) {
        var html = codeList[i].innerHTML;
        html = html.replace(/\t/g, '    ');
        var data = html.split('\n');
        data.pop();
        var newHtml = '';
        for (var j = 0, len2 = data.length; j < len2; j++) {
            newHtml += '<div class="code-lines"><span class="lineno" data-value="' + (j + 1) + '"></span>' + data[j] + '\n</div>';
        }
        codeList[i].innerHTML = newHtml;
    }
};


/**
 * 将文章外链加入href="_blank"
 */
commons.linkHref = function () {
    var root = document.querySelector('#J_Main');
    root.querySelectorAll('a').forEach(function (el) {
        if (el.href.indexOf(location.protocol + '//' + location.host) !== 0) {
            el.target = '_blank';
        }
    });
};


window.ready(function () {
    commons.codeBeauty();
    commons.linkHref();
});
