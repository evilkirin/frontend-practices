console.log('start')

var Page = function () {
  this.tabs = [];
  this.lists = [];
};

Page.prototype = {
  start: function () {
    this.findViews();
    this.bind();
  },
  findViews: function () {
    this.tabs = document.querySelectorAll('.tab-wrap a');
    this.lists = Array.prototype.slice.call(document.querySelectorAll('.item-list'), 0);
  },
  bind: function () {
    var _this = this;
    var tabWrap = document.querySelector('.tab-wrap');
    console.log(tabWrap);

    tabWrap.addEventListener('click', function (e) {
      var target = e.target;
      console.log(target)
      var title = target.getAttribute('title');
      var listKey = 'list-' + title;
      var list = document.querySelector('[title=' + listKey + ']');
      
      _this.lists.forEach(function (ul) {
        ul.style.display = ul.getAttribute('title') == listKey ? 'block' : 'none';
      })

    }, false)
  }
}