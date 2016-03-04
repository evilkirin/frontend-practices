'use strict'

var chinese = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

function num2chinese(s) {　　 //将单个数字转成中文.
    s = "" + s;　　
    var slen = s.length;　　
    var result = "";　　
    for (var i = 0; i < slen; i++)　　 {　　
        result += chinese[s.charAt(i)];　　
    }　　
    return result;　　
}

export default num2chinese