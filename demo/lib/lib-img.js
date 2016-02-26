// 未完成版本，可暂时试用

;
(function (win, lib) {
  var doc = window.document;
  var isIPhone = navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/i) != null;
  var isIPhone6Plus = isIPhone && window.devicePixelRatio == 3;
  //devicePixelRatio
  var DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
  var isRetinaDevice = DPR >= 2;
  //常量
  //域名收敛地址
  var DEFAULT_HOSTNAME = 'gw.alicdn.com';
  //默认占位图
  var IMG_DEFAULT_SRC = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==';
  //图片url正则
  var REG_IMG_SRC = /^(?:(?:http|https):)?\/\/(.+\.(?:alicdn|taobaocdn|taobao)\.(?:com|net))(\/.*(?:\.(jpg|png|gif|jpeg|webp))?)$/i;
  //cdn后缀正则
  var REG_IMG_EXT = /_(\d+x\d+|cy\d+i\d+|sum|m|b)?(xz|xc)?(q\d+)?(s\d+)?(\.jpg)?(_\.webp)?$/i;
  //四种图片类型:方图，定宽，定高，裁剪
  var IMG_TYPE_SQUARE = 'square';
  var IMG_TYPE_WF = 'widthFixed';
  var IMG_TYPE_HF = 'heightFixed';
  var IMG_TYPE_XZ = 'xz';
  //cdn尺寸对象
  var CDN = {};
  //定宽不定高尺寸列表   110x100000.jpg
  CDN.widths = [110, 150, 170, 220, 240, 290, 450, 570, 580, 620, 790];
  //定高不定宽尺寸列表  10000x 170
  CDN.heights = [170, 220, 340, 500];
  //裁剪成正方形 尺寸列表
  CDN.xzs = [72, 80, 88, 90, 100, 110, 120, 145, 160, 170, 180, 200, 230, 270, 290, 310, 360, 430, 460, 580, 640];
  //正方形尺寸列表
  CDN.square = [16, 20, 24, 30, 32, 36, 40, 48, 50, 60, 64, 70, 72, 80, 88, 90, 100, 110, 120, 125, 128, 145, 180, 190, 200, 200, 210, 220, 230, 240, 250, 270, 300, 310, 315, 320, 336, 360, 468, 490, 540, 560, 580, 600, 640, 720, 728, 760, 970];
  //添加cdn后缀需要过滤的域名列表
  CDN.filterDomains = ['a.tbcdn.cn', 'assets.alicdn.com'];

  //节流函数
  function throttle(func, wait) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    var later = function () {
      previous = Date.now();
      timeout = null;
      result = func.apply(context, args);
    };
    return function () {
      var now = Date.now();
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  }

  var network;
  //获取网络信息
  function getNewWork(callback) {
    var isTaobaoApp = navigator.userAgent.match(/WindVane/i) != null;
    if (isTaobaoApp) {
      if (window.WindVane) {
        WindVane.call('TBDeviceInfo', 'getInfo', {}, function (info) {
            if (info && info.network) {
              network = info.network;
              callback && callback();
            }
          },
          function (info) {
            callback && callback();
          });
      } else {
        callback && callback();
      }
    } else {
      callback && callback();
    }
  }

  var isWebp = false;
  //webp格式探测
  function detectWebp(callback) {
    try {
      var webP = new Image();
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
      webP.onload = function () {
        if (webP.height === 2) {
          isWebp = true;
        } else {
          isWebp = false;
        }
        callback && callback();
      };
      webP.onerror = function () {
        isWebp = false;
        callback && callback();
      };
    } catch (e) {
      callback && callback();
    }
  }

  function extend(target, obj) {
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        target[k] = obj[k];
      }
    }
    return target;
  }

  function getOffset(obj, param) {
    if (!obj) {
      return;
    }
    if (!param) {
      param = {x: 0, y: 0};
    }

    if (obj != window) {
      var el = obj.getBoundingClientRect();
      var l = el.left;
      var t = el.top;
      var r = el.right;
      var b = el.bottom;
    } else {
      l = 0;
      t = 0;
      r = l + obj.innerWidth;
      b = t + obj.innerHeight;
    }
    return {
      'left': l,
      'top': t,
      'right': r + param.x,
      'bottom': b + param.y
    };
  }

  //元素位置比较
  function compareOffset(d1, d2) {
    var left = d2.right > d1.left && d2.left < d1.right;
    var top = d2.bottom > d1.top && d2.top < d1.bottom;
    return left && top;
  }


  var lazyImgs;
  //获取懒加载图片
  function getLazyImgs() {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');

    lazyImgs = Array.prototype.slice.call(document.querySelectorAll('.' + opts.class));
    if (lazyImgs.length) {
      lazyImgs.forEach(function (el, index) {
        if (el.getAttribute('data-cache') == '1') {
          cacheImg(el);
        }
      });
    }
  }

  //对懒加载图片url域名收敛，添加cdn后缀
  function checkLazyImgs() {
    var srcAttr = opts.dataSrc;
    if (lazyImgs.length) {
      lazyImgs.forEach(function (el, index) {
        if (el.getAttribute('data-src-checked') != 'true') {
          var dataSrc = el.getAttribute(srcAttr);
          var dataSize = el.getAttribute('data-size');
          var dataType = el.getAttribute('data-type');
          var param = {};
          if (dataSize) {
            param.size = dataSize;
          }
          if (dataType) {
            param.type = dataType;
          }
          //判断是否需要原图
          if (el.attributes['data-original']) {
            param.isOriginal = true;
          }
          if (dataSrc) {
            el.setAttribute(srcAttr, imgHelper.getNewUrl(dataSrc, param));
            el.setAttribute('data-src-checked', 'true');
          }
        }
      });
    }
  }

  //加载可视区域内的 懒加载图
  function loadImg() {
    var srcAttr = opts.dataSrc;
    var winOffset = getOffset(window, {
      'x': opts.lazyWidth,
      'y': opts.lazyHeight
    });
    if (lazyImgs.length) {
      lazyImgs.forEach(function (el, index) {
        var dataSrc = el.getAttribute(srcAttr);
        var elOffset = getOffset(el);
        var isInViewport = compareOffset(winOffset, elOffset);

        function load(el) {
          el.removeAttribute(srcAttr);

          if (el.tagName === 'IMG') {
            if (el.getAttribute('data-cache') == 1) {
              var cachedData = getBaseImgFromCache(dataSrc);
              el.setAttribute('src', cachedData || dataSrc);
            } else {
              el.setAttribute('src', dataSrc);
            }
          } else {
            //非图片元素设置其backgroundImage为真实src
            el.style.backgroundImage = 'url(' + dataSrc + ')';
          }

          el.className = el.className.replace(new RegExp('(^|\\s)' + opts.class + '(\\s|$)'), '');
        }

        if (dataSrc) {
          //wifi环境&& iphone机型，去掉懒加载，一次性加载所有图片
          if (network == 'wifi' && isIPhone && opts.enalbeIOSWifiLoadMore) {
            load(el);
          } else {
            if (isInViewport) {
              load(el);
            }
          }
        }

      });
    }
  }

  //根据url缓存该图片图片的base64格式
  function cacheImg(img) {
    var isSupportCached = !!window.localStorage && !!document.createElement('canvas').getContext;

    if (!isSupportCached || img.src.substring(0, 4) == 'data') {
      return;
    }
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');
    var lsKeyName = 'h5_lib_img_cached_data';
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = function () {

      if (!this.getAttribute(opts.dataSrc) && img.src.substring(0, 4) != 'data') {
        var w = this.width;
        var h = this.height;
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(this, 0, 0, w, h);
        var baseImg = canvas.toDataURL();
        var imgData = {}
        var url = this.src;
        imgData[this.src] = baseImg;


        var cachedData = localStorage.getItem(url);
        var listKey = localStorage.getItem('h5_lib_img_cached_list');
        var cachedList = listKey ? JSON.parse(listKey) : [];
        if (!cachedData) {
          localStorage.setItem('h5_lib_img_cached_url_' + url, baseImg);

          //一个域名下，最多cache200张图片
          if (cachedList.length >= 200) {
            var firstKey = cachedList.shift();
            localStorage.removeItem(firstKey);
          }
          cachedList.push('h5_lib_img_cached_url_' + url);
          localStorage.setItem('h5_lib_img_cached_list', JSON.stringify(cachedList));
        }

      }
    };

  }

  //从loaclstorage获取已缓存图片url对应的base64格式
  function getBaseImgFromCache(url) {
    var isSupportCached = !!window.localStorage;
    var cachedData = localStorage.getItem('h5_lib_img_cached_url_' + url);

    if (isSupportCached && cachedData) {
      return cachedData;
    } else {
      return null;
    }
  }

  /*
   * 获取cdn最佳图片尺寸
   * @param {string|number} curSize :期望尺寸,参数格式为——>'200x220' | 200
   * @param {string} type : 尺寸类型，'square':方图尺寸，'widthFixed':定宽尺寸，'heightFixed':定高尺寸,'xz':裁剪
   * @return {number} cdn size
   * */
  function getBestCdnSize(curSize, type) {
    type = type || IMG_TYPE_SQUARE;
    var sizeList = CDN.square;
    if (!curSize || typeof curSize != 'string' && typeof curSize != 'number') {
      throw new Error('wrong size type');
    }

    if (typeof curSize == 'string' && curSize.match(/^\d+x\d+$/)) {
      if (type == IMG_TYPE_HF) {
        curSize = curSize.split('x')[1];
      } else {
        curSize = curSize.split('x')[0];
      }
    }
    switch (type) {
      case IMG_TYPE_WF:
        sizeList = CDN.widths;
        break;
      case IMG_TYPE_HF:
        sizeList = CDN.heights;
        break;
      case IMG_TYPE_XZ:
        sizeList = CDN.xzs;
        break;
    }

    var max = sizeList[sizeList.length - 1];
    var min = sizeList[0];
    var bestSize = 0;
    var baseDpr = opts.baseDpr;


    //非retina设备 cdn size/baseDpr
    if (!isRetinaDevice) {
      curSize = parseInt(curSize / baseDpr);
    }

    if (max <= curSize) {
      return max;
    }
    if (min >= curSize) {
      return min;
    }
    for (var i = sizeList.length; i >= 0; i--) {
      if (sizeList[i] <= curSize) {
        if (sizeList[i] == curSize) {
          bestSize = curSize;
        } else {
          i < ( sizeList.length - 1 ) && (bestSize = sizeList[i + 1]);
        }
        break;
      }
    }
    return bestSize;
  }

  /*
   * 根据配置项输出自定义的图片cdn后缀
   * @param {object} config 配置参数
   * @param {string | number} config.size cdn尺寸
   * @param {string} config.type 尺寸类型，'square':方图尺寸，'widthFixed':定宽尺寸，'heightFixed':定高尺寸,'xz':裁剪
   * @return {string} 拼接好的cdn后缀
   * */
  function getImgExt(config) {
    var size = '';
    var result = '';
    var q = opts.q;
    var sharpen = opts.sharpen;
    var dataSize = opts.defaultSize;
    var dataType = IMG_TYPE_SQUARE;

    if (Object.prototype.toString.call(q) == '[object Array]') {
      q = q[0];
    }

    if (config) {
      if (config.size) {
        dataSize = config.size;
      }
      if (config.type && config.type.match(new RegExp('^(' + [IMG_TYPE_SQUARE, IMG_TYPE_WF, IMG_TYPE_HF, IMG_TYPE_XZ].join('|') + ')$'))) {
        dataType = config.type;
      }
    }

    size = getBestCdnSize(dataSize, dataType);
    switch (dataType) {
      case IMG_TYPE_SQUARE:
        size = size + 'x' + size;
        break;
      case IMG_TYPE_WF:
        size = size + 'x10000';
        break;
      case IMG_TYPE_HF:
        size = '10000x' + size;
        break;
      case IMG_TYPE_XZ:
        size = size + 'x' + size + 'xz';
        break;
    }

    result = '_' + size;
    result += q + sharpen + '.jpg';

    return result;
  }

  //绑定懒加载所需的事件
  function bindLazyEvent() {
    var scrollHandler = throttle(loadImg, 100);
    window.addEventListener('scroll', scrollHandler, false);
  }

  //配置参数
  var opts = {
    'class': 'lib-img',//img 样式名称
    'size': '320x320',//cdn尺寸
    'sharpen': 's150',//锐化参数
    'dataSrc': 'data-src',
    'q': ['q50', 'q30'],//图片质量[非弱网，弱网],
    'enableLazyload': true,//是否开启懒加载功能，默认true
    'lazyHeight': 0,
    'lazyWidth': 0,
    'enalbeIOSWifiLoadMore': false,//ios&&wifi情况下 是否关闭懒加载,采用一次性加载,默认false,
    'baseDpr': 2
  };

  var imgHelper = {
    /*
     * 输出转换后的图片url
     * @param {string} src 图片url
     * @param {string | object} param 配置参数
     * @return {string}
     * */
    getNewUrl: function (src, param) {

      if (!src || typeof src != 'string') {
        return '';
      }

      var size = opts.defaultSize + 'x' + opts.defaultSize;
      var q = opts.q;
      if (Object.prototype.toString.call(q) == '[object Array]') {
        q = q[0];
      }
      var imgExt = '_' + size + q + opts.sharpen + '.jpg';

      //针对错误的图片url进行异常捕获
      try {
        var originUrl = new lib.httpurl(src);
      } catch (e) {
        console.log('[error]wrong img url:', src);
        return src;
      }
      //var originUrl = new lib.httpurl(src);
      var host = originUrl.host;
      var pathname = originUrl.pathname;
      var protocol = originUrl.protocol;

      //过滤域名列表里的cdn不做任何处理
      if (CDN.filterDomains.indexOf(host) != -1) {
        return originUrl.toString();
      }

      //判断域名收敛
      var hostReg = host.match(/(.+\.(?:alicdn|taobaocdn|taobao|mmcdn)\.com)/);
      if (hostReg && hostReg[0] != DEFAULT_HOSTNAME) {
        //console.warn && console.warn(hostReg[0] + '不是推荐的图片域名(' + DEFAULT_HOSTNAME + ')-->' + src);
        originUrl.host = DEFAULT_HOSTNAME;
      }

      //判断是否需要原图，如果需要，则收敛域名，不加任何cnd后缀
      if (param && param.isOriginal) {
        return originUrl.toString();
      }
      //图片cdn后缀正则校验
      var cdnExt = pathname.match(REG_IMG_EXT);

      //获取图片原始cdn尺寸,类似http://gw.alicdn.com//tps/i4/T1IcIoFvhXXXbfY_Er-640-340.jpg,表示640x340的size
      var originalSizeReg = pathname.match(/-(\d+)-(\d+)\.(?:jpg|png|gif)/);
      if (originalSizeReg) {
        var result;
        var originalSize;

        //如果原始cdn尺寸比默认值小，则取默认值
        if (parseInt(originalSizeReg[1]) < parseInt(opts.defaultSize)) {
          result = opts.defaultSize
        } else {
          //最大上限最到760,针对那些1125尺寸的图片
          result = originalSizeReg[1] > 760 ? 760 : originalSizeReg[1];
        }

        originalSize = getBestCdnSize(result);

        imgExt = '_' + originalSize + 'x' + originalSize + q + opts.sharpen + '.jpg';
        console.log(typeof originalSizeReg[1], typeof opts.defaultSize);
        console.log(pathname, originalSize, originalSizeReg[1], opts.defaultSize, +originalSizeReg[1] > +opts.defaultSize);
      }

      if (param && typeof param == 'string') {
        imgExt = getImgExt({'size': param});
      } else if (param && typeof param == 'object' && Object.keys(param).length > 0) {
        imgExt = getImgExt(param);
      }

      //gif图片只做域名收敛，不加任何后缀
      //if ((/\.gif/.test(pathname))) {
      //  return originUrl.toString();
      //}

      //png图片后缀q值无效，sharpen值会使图片失真
      if ((/\.png/.test(pathname))) {
        imgExt = imgExt.replace(/(q\d+)(s\d+)/, '');
      }

      //png|gif不加webp后缀，
      //if (isWebp && !isIPhone) {
      //  if (!(/\.(png|gif)/.test(pathname))) {
      //    imgExt += '_.webp';
      //  }
      //}

      if (isWebp) {
        imgExt += '_.webp';
      }

      if (!cdnExt) {
        if (pathname.match(/_\.webp$/g)) {
          originUrl.pathname = pathname.replace(/_\.webp$/g, imgExt)
        } else {
          originUrl.pathname = pathname + imgExt;
        }
      } else {
        //过滤图片url里有伪cdn后缀格式，如：http://gw1.alicdn.com/tfscom/tuitui/i2/TB1R6TyGpXXXXX0XFXXXXXXXXXX_.jpg
        if (cdnExt[1] || cdnExt[2] || cdnExt[3] || cdnExt[4]) {
          originUrl.pathname = pathname.replace(REG_IMG_EXT, imgExt)
        }
      }

      return originUrl.toString();

    },
    /*
     * 主动触发懒加载，适用于动态插入图片节点的场景
     * */
    fireLazyload: function () {
      getLazyImgs();
      checkLazyImgs();
      loadImg();
    }
  };

  function __init(options) {
    options = options || {};
    opts = extend(opts, options);
    opts.class = opts.class.charAt(0) !== '.' ? opts.class : opts.class.slice(1);
    if (opts.size) {
      opts.defaultSize = getBestCdnSize(opts.size);
    }
    function networkCallback() {

      if (Object.prototype.toString.call(opts.q) == '[object Array]') {
        if (!isRetinaDevice) {
          //适配非retina设备下的q值,非弱网上限q90,弱网上限q75
          var q1 = parseInt(opts.q[0].slice(1));
          var q2 = parseInt(opts.q[1].slice(1));
          var highQ = (q1 + 40) >= 90 ? 'q90' : 'q' + (q1 + 40);
          var lowQ = (q2 + 45) >= 75 ? 'q75' : 'q' + (q2 + 45);
          opts.q = network ? network == 'wifi' ? highQ : lowQ : highQ;
        } else {
          opts.q = network ? network == 'wifi' ? opts.q[0] : opts.q[1] : opts.q[0];
        }
      }

      getLazyImgs();
      detectWebp(function () {
        checkLazyImgs();
        if (opts.enableLazyload) {
          bindLazyEvent();
          loadImg();
        }
      });
    }

    getNewWork(networkCallback);
  }

  lib.img = function (options) {
    __init.apply(imgHelper, arguments);
    return imgHelper;
  };
  lib.img.defaultSrc = IMG_DEFAULT_SRC;


})(window, window['lib'] || (window['lib'] = {}));
