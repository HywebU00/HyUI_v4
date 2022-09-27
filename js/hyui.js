// ================  MENU初始化 v
// ///////////////// nojs 先移除
// ================= 手機桌機版本切換及手機版menu設定 v
// ================= 手機版本search設定
// ================= menu 訊息區塊 sticky
// ================= menu的無障礙tab設定
// ///////////////// notice訊息區塊
// ////////////////  Accordion設定
// ================ fatfooter開關
// //////////////// 多組Tab
// ================ 置頂go to top
// /////////////////// 設定img 在IE9+ SAFARI FIREFOX CHROME 可以object-fit
// /////////////////// form表單 placeholder隱藏/
// /////////////////// form表單 單個檔案上傳+多個檔案上傳
// ================ 分享按鈕 share dropdwon
// ================ 字型大小 font-size
// /////////////////// category active
// =================  無障礙快捷鍵盤組合
// ////////////////// 無障礙切換slick箭頭語系
// ================ gotoCenter on focus跳到 content
// ================= 語言模組 無障礙遊走設定
// table 加上響應式 scroltable-wrapper
// =================  table 加上 data-title
// //////////////// lazy load
// console.log(document.querySelector('.menu'));
// console.log($('.menu'));
document.createElement('picture');
/*-----------------------------------*/
//////////// nojs 先移除////////////////s
/*-----------------------------------*/

let _webHtml = document.documentElement;
_webHtml.classList.remove('no-js');
/*-----------------------------------*/
/////////////// 效果 ///////////
/*-----------------------------------*/

function jsSlideUp(element, time) {
  let totalHeight = element.offsetHeight;
  let currentHeight = totalHeight;
  let decrement = totalHeight / (time / 10);
  let timer = setInterval(() => {
    currentHeight = currentHeight - decrement;
    element.style.height = currentHeight + 'px';
    if (currentHeight <= 0) {
      clearInterval(timer);
      element.style.display = 'none';
      element.style.height = totalHeight + 'px';
    }
  }, 10);
}
function jsSlideDown(element, time) {
  if (element.offsetHeight <= 0) {
    element.style.display = 'block';
    element.style.transition = 'height' + time + ' ms';
    element.style.overflow = 'hidden';
    let totalHeight = element.offsetHeight;
    let currentHeight = 0;
    element.style.height = '0px';
    let _addValue = totalHeight / (time / 10);
    let timer = setInterval(() => {
      currentHeight += _addValue;
      element.style.height = currentHeight + 'px';
      if (currentHeight >= totalHeight) {
        clearInterval(timer);
        element.style.height = totalHeight + 'px';
      }
    }, 10);
  }
}
function jsFadeIn(element, speed) {
  let val = 0;
  let request;
  element.style.display = 'block';
  requestAnimationFrame(fade);
  function fade() {
    val += speed || 10;
    if (val <= 100) {
      element.style.opacity = val / 100;
      request = requestAnimationFrame(fade);
    } else if (val >= 100) {
      cancelAnimationFrame(request);
    }
  }
}

function jsFadeOut(element, speed) {
  let val = 100;
  let request;
  requestAnimationFrame(fade);
  function fade() {
    val -= speed || 5;
    if (val >= 1) {
      element.style.opacity = val / 100;
      request = requestAnimationFrame(fade);
    } else if (val <= 0) {
      cancelAnimationFrame(request);
      element.style.opacity = '0';
      element.style.display = 'none';
    }
  }
}

function jsAddClass(el, className) {
  if (el.classList) el.classList.add(className);
  else if (!hasClass(el, className)) {
    el.className += ' ' + className;
  }
}

function jsRemoveClass(el, className) {
  if (el.classList) el.classList.remove(className);
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  }
}
/*-----------------------------------*/
/////////////// MENU初始化 ///////////
/*-----------------------------------*/
class Menu {
  constructor() {
    this.nav = document.querySelector('.navigation');
    this.body = document.querySelector('body');
    this.siteHeader = document.querySelector('.header .container');
    this.mainMenu = document.querySelector('.mainMenu');
    this.wrapper = document.querySelector('.wrapper');
  }

  // --- menu初始化 新增側欄選單
  addSideMenu() {
    // --- 綁定外層的this
    let _that = this;
    // --- menu初始化 新增側欄選單
    let sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    sidebar.style = 'opacity:0';
    sidebar.innerHTML =
      '<div class="mobileArea"><button type="button" class="sidebarClose">關閉</button></div><div class="menuOverlay"></div>';
    _that.body.insertBefore(sidebar, _that.wrapper);

    // --- menu初始化 新增側欄選單按鈕
    let sidebarCtrl = document.createElement('button');
    sidebarCtrl.className = 'sidebarCtrl';
    sidebarCtrl.innerHTML = '側欄選單<span></span><span></span><span></span>';
    sidebarCtrl.setAttribute('type', 'button');
    _that.siteHeader.insertBefore(sidebarCtrl, _that.nav);

    // --- menu初始化 新增搜尋按鈕
    let searchCtrl = document.createElement('button');
    searchCtrl.className = 'searchCtrl';
    searchCtrl.innerHTML = '查詢';
    searchCtrl.setAttribute('type', 'button');
    _that.siteHeader.insertBefore(searchCtrl, _that.nav);

    let hasChild = _that.mainMenu.querySelectorAll('li ul');
    hasChild.forEach((i) => {
      i.parentNode.classList.add('hasChild');
    });
  }
  // --- menu初始化 複製手機版側欄選單
  cloneElem() {
    // --- 綁定外層的this
    let _that = this;
    let mobileArea = document.querySelector('.mobileArea');
    // --- menu初始化 複製手機版側欄選單內容
    let cloneMenu = _that.mainMenu.cloneNode(true);
    let cloneNav = _that.nav.cloneNode(true);
    cloneMenu.classList.add('sideMainMenu');
    cloneMenu.classList.remove('mainMenu', 'megaMenu', 'menu');
    mobileArea.append(cloneMenu, cloneNav);
    let sideLanguage = document.querySelector('.mobileArea .font_size');
    sideLanguage.remove();
    // 複製搜尋到手機版側欄
    let search = document.querySelector('.search');
    let cloneSearch = search.cloneNode(true);
    cloneSearch.removeAttribute('style');
    cloneSearch.classList.add('mobileSearch');
    cloneSearch.classList.remove('search');
    _that.body.prepend(cloneSearch);
  }
  initial() {
    this.addSideMenu();
    this.cloneElem();
  }
}
let menu = new Menu();
menu.initial();
/*-----------------------------------*/
///////// 手機版本search設定 ////////////
/*-----------------------------------*/
class MobileSearch {
  constructor(obj) {
    this.searchMode = true;
    this.body = document.querySelector('body');
    this.searchCtrl = obj.searchCtrl;
    this.control = obj.control;
    this.mobileSearch = document.querySelector('.mobileSearch');
    this.isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
  }
  // --- 搜尋區內容開關函式
  searchToggle() {
    // --- 綁定外層的this
    let _that = this;
    if (!_that.searchMode) {
      jsSlideDown(_that.control, 300);
      _that.searchMode = true;
    } else {
      _that.control.style.display = 'none';
      _that.searchMode = false;
    }
    // --- 停止冒泡事件
    _that.stopPop();
  }
  // --- 點擊搜尋按鈕開關
  searchClick() {
    // --- 綁定外層的this
    let _that = this;
    _that.searchCtrl.addEventListener('click', (e) => {
      _that.searchToggle();
    });
  }
  // --- 點擊搜尋區以外的區塊
  clickOther() {
    // --- 綁定外層的this
    let _that = this;
    // 如果點在外面 則 searchMode 狀態改為false
    _that.body.addEventListener('click', (e) => {
      if (_that.searchMode) {
        _that.searchToggle();
        _that.searchMode = false;
      }
    });
  }
  // --- 停止冒泡事件
  stopPop() {
    //點擊時 不觸發冒泡事件
    let _that = this;

    _that.mobileSearch,
      _that.searchCtrl.addEventListener('click', (e) => {
        e.stopPropagation();
      });
  }
  initial() {
    this.searchToggle();
    this.searchClick();
    this.clickOther();
  }
}
let mobileSearch = new MobileSearch({
  searchCtrl: document.querySelector('.searchCtrl'),
  control: document.querySelector('.mobileSearch'),
});
mobileSearch.initial();

/*-----------------------------------*/
//// 手機桌機版本切換及手機版menu設定 //////
/*-----------------------------------*/
class MobileMenu {
  constructor(obj) {
    this.body = document.querySelector('body');
    this.windowWidth = window.outerWidth;
    this.windowSmall = 768;
    this.menuStatus = false;
    this.sidebar = document.querySelector('.sidebar');
    this.search = document.querySelector('.search');
    this.aside = document.querySelector('.aside');
    this.mobileSearch = document.querySelector('.mobileSearch');
    this.sidebarClose = document.querySelector('.sidebarClose');
    this.sidebarCtrl = document.querySelector('.sidebarCtrl');
    this.overlay = document.querySelector('.menuOverlay');
    this.mobileArea = document.querySelector('.mobileArea');
    ///////////////////////////////////////
    /*-----------------------------------*/
    /////////////// PC版設定 /////////////
    /*-----------------------------------*/
    this.menu_liHasChild = document
      .querySelector('.header .mainMenu')
      .querySelectorAll('li.hasChild');
    /*-----------------------------------*/
    /////////////// 手機版設定 /////////////
    /*-----------------------------------*/
    this.asideMenu = document.querySelectorAll('.sideMainMenu > ul');
    this.asideMenuLi = document.querySelectorAll('.sideMainMenu > ul li');
    this.asideMenuUl = document.querySelectorAll('.sideMainMenu > ul ul');
    this.asideMenuUl1 = document.querySelectorAll(
      '.sideMainMenu > ul > li > ul'
    );
    this.asideMenuUl2 = document.querySelectorAll(
      '.sideMainMenu > ul > li > ul > li > ul'
    );
    this.asideMenuUl3 = document.querySelectorAll(
      '.sideMainMenu > ul > li > ul > li > ul > li > ul'
    );
  }

  //設定所有UL的高度，有高度才會有縮起來得效果，最多四層
  setMenuUlHeight() {
    let _that = this;
    _that.sidebar.style = 'display:block;opacity:0';
    _that.mobileAreaOut = _that.mobileArea.offsetWidth;
    _that.mobileArea.style = `transform: translateX(${
      _that.mobileAreaOut * -1
    }px)`;
    _that.asideMenuUl.forEach((i) => {
      i.style.position = 'absolute';
    });
    _that.asideMenu.forEach((i) => {
      i.classList.add('firstLv');
    });
    _that.asideMenuUl1.forEach((i) => {
      i.classList.add('secondLv');
      i.dataset.secondHeight = i.offsetHeight;
      i.style = 'height:0';
    });
    _that.asideMenuUl2.forEach((i) => {
      i.classList.add('thirdLv');
      i.dataset.thirdHeight = i.offsetHeight;
      i.style = 'height:0';
    });
    _that.asideMenuUl3.forEach((i) => {
      i.classList.add('fourthLv');
      i.dataset.fourthHeight = i.offsetHeight;
      i.style = 'height:0';
    });

    _that.sidebar.style = 'display:none;opacity:1;';
  }

  mobileSet() {
    let _that = this;
    /*-----------------------------------*/
    /////////////// 手機版設定 /////////////
    /*-----------------------------------*/
    _that.menuStatus = false;
    // --- 第一層選單

    // --- 手機版第第一層點了不會進入內頁，拿掉第一層的連結無作用
    document.querySelectorAll(`.sideMainMenu .hasChild > a`).forEach((i) => {
      i.addEventListener('click', (e) => {
        e.preventDefault();
      });
    });
    //
    _that.mobileSearch.style.display = 'none';
    document.querySelector('.language ul').style.display = 'none';
  }

  //手機版選單開合功能
  mobileMenuSlider() {
    document.querySelectorAll('aside li').forEach((i) => {
      i.addEventListener('click', (e) => {
        let siblings = Array.prototype.filter.call(
          i.parentNode.children,
          (child) => {
            return child !== i;
          }
        );
        let content = i.querySelector('ul');
        let secondHeight = content.dataset.secondHeight || 0;
        let thirdHeight = content.dataset.thirdHeight || 0;
        let fourthHeight = content.dataset.fourthHeight || 0;
        if (!i.classList.contains('active')) {
          i.classList.add('active');
          if (i.parentNode.classList.contains('firstLv')) {
            content.style.height = `${secondHeight}px`;
            e.stopPropagation();
          } else if (i.parentNode.classList.contains('secondLv')) {
            i.parentNode.style.height = `${
              Number(i.parentNode.dataset.secondHeight) + Number(thirdHeight)
            }px`;
            content.style.height = `${thirdHeight}px`;
            e.stopPropagation();
          } else if (i.parentNode.classList.contains('thirdLv')) {
            i.parentNode.parentNode.parentNode.style.height = `${
              Number(i.parentNode.parentNode.parentNode.dataset.secondHeight) +
              Number(i.parentNode.dataset.thirdHeight) +
              Number(fourthHeight)
            }px`;
            i.parentNode.style.height = `${
              Number(i.parentNode.dataset.thirdHeight) + Number(fourthHeight)
            }px`;
            content.style.height = `${fourthHeight}px`;
            e.stopPropagation();
          }
        }
        siblings.forEach((x) => {
          x.classList.remove('active');
          x.querySelectorAll('ul').forEach((s) => {
            s.style.height = '0';
            s.parentNode.classList.remove('active');
          });
        });
      });
    });
  }

  pcSet() {
    let _that = this;
    /*-----------------------------------*/
    /////////////// PC版設定 /////////////
    /*-----------------------------------*/
    _that.hideSidebar();
    _that.body.classList.remove('noscroll');
    _that.mobileSearch.style.display = 'none';
    _that.searchMode = false;
    document.querySelector('.language ul').style.display = 'none';
    // 副選單滑出
    //////////////////////////////////////////////////////////////////

    _that.menu_liHasChild.forEach((i) => {
      i.addEventListener('mouseenter', (e) => {
        i.classList.add('active');
      });
      i.addEventListener('mouseleave', (e) => {
        i.classList.remove('active');
      });
    });

    _that.menu_liHasChild.forEach((i) => {
      i.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  }

  // --- 切換 PC/Mobile 選單
  switchMenu() {
    // --- 綁定外層的this
    let _that = this;
    if (_that.windowWidth < _that.windowSmall) {
      this.setMenuUlHeight();
      this.mobileMenuSlider();
      this.mobileSet();
    } else {
      this.pcSet();
    }
  }

  // --- 當改變視窗尺寸時  重新切換 PC/Mobile 選單
  jsResize() {
    // --- 綁定外層的this
    let _that = this;
    // --- 行動版/電腦版切換
    var resizeTimer;
    window.addEventListener('resize', (e) => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        _that.mobileSearch.style.display = 'none';
        _that.switchMenu();
      }, 50);
    });
  }
  // --- 展開側邊選單函式
  showSidebar() {
    // --- 綁定外層的this
    let _that = this;
    _that.sidebar.style = 'display:block;opacity:1';
    _that.mobileArea.style.display = 'block';

    window.requestAnimationFrame(() => {
      _that.mobileArea.style = `transform: translateX(0px);`;
    });
    setTimeout(() => {
      _that.mobileArea.classList.add('open');
    }, 10);

    _that.body.classList.add('noscroll');
    _that.overlay.classList.add('active');
    _that.mobileSearch.style.display = 'none';
    _that.searchMode = false;
    jsFadeIn(_that.overlay);
  }

  // --- 點擊選單按鈕 執行 展開側邊選單函式
  sidebarCtrlFn() {
    // --- 綁定外層的this
    let _that = this;
    _that.sidebarCtrl.addEventListener('click', (e) => {
      _that.showSidebar();
      e.preventDefault();
    });
  }

  // --- 隱藏側邊選單函式
  hideSidebar() {
    // --- 綁定外層的this
    let _that = this;

    window.requestAnimationFrame(() => {
      _that.mobileArea.style = `transform: translateX(${
        _that.mobileAreaOut * -1
      }px);`;
    });
    setTimeout(() => {
      _that.sidebar.style.display = 'none';
    }, 300);

    _that.mobileArea.classList.remove('open');
    _that.body.classList.remove('noscroll');
    _that.overlay.classList.remove('active');
    _that.asideMenuUl.forEach((i) => {
      i.style.height = '0px';
    });

    _that.asideMenuLi.forEach((i) => {
      i.classList.remove('active');
    });

    /////////////////////////////////////////////////////////////////////
  }
  // --- 黑色遮罩點擊 關閉側邊選單
  overlayFn() {
    // --- 綁定外層的this
    let _that = this;
    _that.overlay.addEventListener('click', (e) => {
      jsFadeOut(_that.overlay);
      _that.hideSidebar();
    });
    _that.sidebarClose.addEventListener('click', (e) => {
      jsFadeOut(_that.overlay);
      _that.hideSidebar();
    });
  }
  initial() {
    this.switchMenu();
    this.jsResize();
    this.sidebarCtrlFn();
    this.overlayFn();
  }
}
let _mobileMenu = new MobileMenu();
_mobileMenu.initial();

/*-----------------------------------*/
///////  menu 訊息區塊 sticky  /////////
/*-----------------------------------*/
class Navbar {
  constructor() {
    this.windowWidth = window.outerWidth;
    this.windowWidthSmall = 768;
    this.mainMenu = document.querySelector('.mainMenu');
    this.main = document.querySelector('.main');
    this.menuHeight = Math.floor(this.mainMenu.offsetHeight);
  }

  getMenuHeight() {
    let _that = this;
    let mainMenuTop = Math.floor(
      _that.mainMenu.getBoundingClientRect().top + window.scrollY
    );
    _that.jsScroll(mainMenuTop);
    _that.jsResize(mainMenuTop);
    _that.reload(mainMenuTop);
  }
  // --- menu 的 sticky函式
  sticky(mainMenuTop) {
    // --- 綁定外層的this
    let _that = this;

    //抓取選單位置
    let offsetTop = Math.floor(mainMenuTop) || null;

    //如果 offsetTop 不等於 null 則運行下方函式
    if (offsetTop != null) {
      if (
        _that.windowWidth >= _that.windowWidthSmall &&
        window.scrollY > offsetTop
      ) {
        _that.mainMenu.classList.add('sticky');
        _that.main.style = `padding-top: ${_that.menuHeight}px`;
      } else {
        _that.mainMenu.classList.remove('sticky');
        _that.main.removeAttribute('style');
      }
    }
  }
  // --- 當 scroll 觸發
  jsScroll(mainMenuTop) {
    let _that = this;
    //抓取選單位置
    // --- scroll 時執行 menu_stickyNavbar 並請傳入 menu 距離上方的高度的參數
    window.addEventListener('scroll', (e) => {
      _that.sticky(mainMenuTop);
    });
  }
  // --- 當 resize 觸發 判斷 menu的種類
  jsResize(mainMenuTop) {
    // --- 綁定外層的this
    let _that = this;
    let resizeNavTimer;
    // --- 如果 有 menu 的話 執行固定 menu_stickyNavbar
    window.addEventListener('resize', (e) => {
      // --- 算出 menu 距離上方的高度
      let offsetTop = Math.floor(mainMenuTop) || null;
      clearTimeout(resizeNavTimer);
      resizeNavTimer = setTimeout(() => {
        _that.main.removeAttribute('style');
        _that.sticky(offsetTop);
      }, 200);
    });
  }
  reload(mainMenuTop) {
    let offsetTop = Math.floor(mainMenuTop) || null;
    window.onload = this.sticky(offsetTop);
  }
  initial() {
    this.getMenuHeight();
    this.jsScroll();
    this.sticky();
    this.jsResize();
    this.reload();
  }
}
let navbar = new Navbar();
navbar.initial();

/*-----------------------------------*/
//////////// menu的無障礙tab設定 /////////
/*-----------------------------------*/

class A11yKeyMenu {
  constructor(obj) {
    this.name = obj.name || null;
    this.mainMenu = document.querySelector('.mainMenu') || null;
  }

  menuKeyUp() {
    // --- 綁定外層的this
    let _that = this;
    let control;
    control = _that.mainMenu.querySelectorAll('li');
    control.forEach((i) => {
      i.addEventListener('keyup', (e) => {
        let siblings = Array.prototype.filter.call(
          i.parentNode.children,
          (child) => {
            return child !== i;
          }
        );

        siblings.forEach((x) => {
          x.classList.remove('active');
          x.querySelectorAll('ul').forEach((s) => {
            s.style.display = 'none';
          });
        });
      });
    });
  }

  menuFocusOut() {
    // --- 綁定外層的this
    let _that = this;
    let lastA = _that.mainMenu.querySelectorAll('a').length - 1;
    _that.mainMenu
      .querySelectorAll('a')
      [lastA].addEventListener('focusout', () => {
        _that.mainMenu.querySelectorAll('li').forEach((i) => {
          i.classList.remove('active');
        });
      });
  }

  menuLiHasChildKeyup() {
    // --- 綁定外層的this
    let _that = this;
    let control;
    control = _that.mainMenu.querySelectorAll('li.hasChild > a');

    control.forEach((i) => {
      i.addEventListener('keyup', (e) => {
        i.parentNode.querySelector('ul').removeAttribute('style');
        i.parentNode.classList.add('active');
      });
    });
  }
  initial() {
    this.menuKeyUp();
    this.menuFocusOut();
    this.menuLiHasChildKeyup();
  }
}

let a11yKeyMenu = new A11yKeyMenu({
  name: document.querySelector('.menu'),
});
a11yKeyMenu.initial();

/*-----------------------------------*/
//////////// notice訊息區塊 ////////////
/*-----------------------------------*/
document.querySelectorAll('[class*="notice"] a.close').forEach((i) => {
  i.addEventListener('click', (e) => {
    i.parentNode.style.display = 'none';
    e.preventDefault();
  });
});

/*-----------------------------------*/
/////////////// FatFooter ///////////
/*-----------------------------------*/
class FatFooter {
  constructor(obj) {
    this.name = document.querySelector(`${obj.el}`) || null; // --- 控制的對象
  }
  clickFatFooter() {
    const _that = this;
    this.name.addEventListener('click', () => {
      this.toggleFatFooter(_that);
    });
  }
  toggleFatFooter(_that) {
    const _navUl = _that.name.parentNode.querySelectorAll('nav ul li ul');
    _navUl.forEach((i) => {
      if (i.offsetHeight !== 0) {
        jsSlideUp(i, 300);
        _that.name.innerHTML = '收合/CLOSE';
        _that.name.setAttribute('name', '收合選單/CLOSE');
      } else {
        jsSlideDown(i, 300);
        _that.name.innerHTML = '展開/OPEN';
        _that.name.setAttribute('name', '展開選單/OPEN');
      }
    });
    _that.name.classList.toggle('close');
  }
  changeScreenSize() {
    window.addEventListener('resize', () => {
      location.reload();
    });
  }
  initial() {
    this.clickFatFooter();
    this.changeScreenSize();
  }
}
const fatFooter = new FatFooter({
  el: '.btn-fatfooter',
}); // --- 控制的對象
fatFooter.initial();

/*-----------------------------------*/
////////////////多組Tab////////////////
/*-----------------------------------*/

class Tabfunction {
  constructor() {
    this.activeClass = 'active'; //啟動的 class
    this.tabSet = document.querySelectorAll('.tabSet'); //tab名稱
  }
  catchTab() {
    this.tabSet.forEach((a) => {
      let _tabBtn = a.querySelectorAll('.tabItems button'); //頁籤按鈕
      let _tabBtnLength = _tabBtn.length; //頁籤按鈕數量
      let _tabContent = a.querySelectorAll('.tabContentGroup .tabContent'); //頁籤內容
      _tabBtn[0].classList.add('active');
      _tabContent[0].classList.add('active');

      for (let i = 0; i < _tabBtnLength; i++) {
        let _that = this;
        (function () {
          let _this = _tabBtn[i]; //綁定這一個頁籤按鈕
          let _thisContent = _tabContent[i]; //綁定這一個頁籤內容
          let _thisPrevItem = _tabContent[i - 1]; //綁定前一個頁籤按鈕
          let _itemAllA = _thisContent.querySelectorAll('[href], input'); //這一個頁籤內容所有a和input項目
          let _prevItemAllA;
          if (_thisPrevItem !== undefined) {
            _prevItemAllA = _thisPrevItem.querySelectorAll('[href], input'); //前一個頁籤內容所有a和input項目
          }
          let _isFirstTab = i === 0; //如果是第一個頁籤
          let _isLastTab = i === _tabBtnLength - 1; //如果是最後一個頁籤
          let _itemFirstA = _itemAllA[0]; //頁籤內容第一個a或是input
          let _itemLastA = _itemAllA[_itemAllA.length - 1]; //頁籤內容最後一個a或是input
          let _prevItemLastA;
          if (_thisPrevItem !== undefined) {
            _prevItemLastA = _prevItemAllA[_prevItemAllA.length - 1]; //前一個頁籤的最後一個a或是input
          }

          // _this頁籤觸發focus內容裡的第一個a
          _this.addEventListener('keydown', (e) => {
            //頁籤第幾個按鈕觸發時
            if (e.which === 9 && !e.shiftKey) {
              //e.which偵測按下哪個案件，9代表tab，shiftKey代表shift
              e.preventDefault();
              _that.startTab(i, _tabBtn, _tabContent); //啟動頁籤切換功能
              if (_itemAllA.length) {
                //type number = true，0是false
                _itemFirstA.focus(); //第一個a或是input focus
              } else {
                _tabBtn[i + 1].focus(); //當內容沒有a或是input跳轉下一個tab
              }
            } else if (e.which === 9 && e.shiftKey && !_isFirstTab) {
              e.preventDefault();

              _that.startTab(i - 1, _tabBtn, _tabContent); //啟動頁籤切換功能
              if (_prevItemAllA.length) {
                _prevItemLastA.focus(); //前一個頁籤內容的最後一個a或是input focus
              } else {
                _tabBtn[i - 1].focus(); //當內容沒有a或是input跳轉上一個tab
              }
            }
          });

          //當按下shift+tab且為該內容的第一個a或是input
          //將focus目標轉回tab頁籤上，呼叫上方功能startTab(i - 1);往前一個頁籤
          if (_itemFirstA !== undefined) {
            _itemFirstA.addEventListener('keydown', (e) => {
              if (e.which === 9 && e.shiftKey) {
                e.preventDefault();
                _tabBtn[i].focus();
              }
            });
          }
          //當按下shift+tab且為該內容的最後一個a或是input
          //focus到下一個頁籤
          if (_itemLastA !== undefined) {
            _itemLastA.addEventListener('keydown', (e) => {
              if (e.which === 9 && !e.shiftKey && !_isLastTab) {
                e.preventDefault();
                _tabBtn[i + 1].focus();
              }
            });
          }
        })();
      }
      this.mouseClick(_tabBtn, _tabContent, _tabBtnLength);
    });
  }

  //滑鼠點擊事件
  mouseClick(_tabBtn, _tabContent, _tabBtnLength) {
    let _that = this;
    for (var i = 0; i < _tabBtnLength; i++) {
      (function (i) {
        _tabBtn[i].addEventListener(
          'click',
          (e) => {
            _that.startTab(i, _tabBtn, _tabContent);
          },
          false
        );
      })(i);
    }
  }

  //切換tab
  startTab(_now, _tabBtn, _tabContent) {
    if (_tabBtn !== undefined) {
      _tabBtn.forEach((i) => {
        i.classList.remove(this.activeClass);
      });
      _tabBtn[_now].classList.add(this.activeClass);
      //頁籤按鈕增加指定class(active)，其他頁籤移除指定class

      _tabContent.forEach((i) => {
        i.classList.remove(this.activeClass);
      });
      _tabContent[_now].classList.add(this.activeClass);
      //顯示當下頁籤內，隱藏其他內容
    }
  }
  initial() {
    this.catchTab();
    this.mouseClick();
  }
}
let tabFunction = new Tabfunction();
tabFunction.initial();

/*-----------------------------------*/
/////////////// FontSize ///////////
/*-----------------------------------*/

class FontSize {
  constructor(obj) {
    this.name = document.querySelectorAll(`${obj.el}`) || null; // --按鈕列表名稱
    this.control = document.querySelector(`${obj.control}`) || null; // --控制的對象名稱
  }
  // 點擊文字大小按鈕
  clickFontBtn() {
    this.name.forEach((i) => {
      let _that = this;
      i.querySelectorAll('a').forEach((i) => {
        //移除 active 的 class 名稱
        function removeActiveClass() {
          let _parentEle = i.parentNode.parentNode;
          _parentEle.querySelectorAll('a').forEach((i) => {
            i.classList.remove('active');
          });
        }
        i.addEventListener('click', (e) => {
          removeActiveClass();
          _that.createCookie('FontSize', `${e.target.className}`, 356);
          _that.addChangeClass(e.target.className);
          jsAddClass(e.target, 'active');
        });
      });
    });
  }
  addChangeClass(targetName) {
    if (this.control === null) {
      return;
    }
    switch (targetName) {
      case 'small':
        this.control.classList.remove('large_size', 'medium_size');
        this.control.classList.add('small_size');
        break;
      case 'medium':
        this.control.classList.remove('small_size', 'large_size');
        this.control.classList.add('medium_size');
        break;
      case 'large':
        this.control.classList.remove('small_size', 'medium_size');
        this.control.classList.add('large_size');
        break;
    }
  }
  // 創造新的 字體大小設定
  createCookie(name, value, days) {
    let _expires;
    let _date = new Date();
    if (days) {
      _date.setTime(_date.getTime() + days * 24 * 60 * 60 * 1000);
      _expires = '; expires=' + _date.toGMTString();
    } else {
      _expires = '';
    }
    document.cookie = name + '=' + value + _expires + '; path=/';
  }
  //讀取瀏覽器上 字體大小設定
  readCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  //初始化 字體大小設定
  initCookie() {
    window.onload = (e) => {
      let _cookie = this.readCookie('FontSize');
      //如果沒有_cookie 則預設值為'medium'
      if (_cookie == null) {
        _cookie = 'medium';
      }
      document.querySelectorAll(`.${_cookie}`).forEach((i) => {
        /***************************************************************************************需要檢查ＢＵＧ */
        i.click();
        /***************************************************************************************需要檢查ＢＵＧ */
        e.preventDefault();
      });
    };
  }
  initial() {
    // 字體大小設定 --- 小
    this.clickFontBtn();
    // //初始化 字體大小設定
    this.initCookie();
  }
}

let fontsize = new FontSize({
  el: '.font_size', // --按鈕列表名稱
  control: '.innerpage', // --控制的對象名稱
});
fontsize.initial();

/*-----------------------------------*/
///////////////置頂go to top////////////
/*-----------------------------------*/
class ScrollToTop {
  constructor(obj) {
    this.name = document.querySelector(`${obj.el}`); //obj.name || null; //監聽的對象
  }
  scrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  scrollClick() {
    this.name.addEventListener('click', (e) => {
      e.preventDefault();
      this.scrollTop();
    });
  }
  // --- 鍵盤點擊置頂按鈕
  scrollKeyDown() {
    this.name.addEventListener('keydown', (e) => {
      e.preventDefault();
      this.scrollTop();
      // window.scrollY 等於零的時候 執行 focus
      window.addEventListener('scroll', focusTopBtn);

      function focusTopBtn() {
        if (window.scrollY === 0) {
          setTimeout(() => {
            document.querySelector('a.goCenter').focus();
            window.removeEventListener('scroll', focusTopBtn);
          }, 500);
        }
      }
    });
  }
  // --- 按鈕出現的函式
  scrollShow() {
    window.addEventListener('scroll', () => {
      let top = window.scrollY;
      if (top > 200) {
        this.name.style.display = 'block';
        this.name.style['opacity'] = '1';
        this.name.style['transition'] = 'all 0.5s';
      } else {
        this.name.style['opacity'] = '0';
        this.name.style['transition'] = 'all 0.5s';
        BtnStyleNone();
      }
      //如果 opacity為 0 則 display none
      function BtnStyleNone() {
        setTimeout(() => {
          let btn = document.querySelector('.scrollToTop');
          let btnOpacity = parseInt(btn.style.opacity);
          if (btnOpacity === 0) {
            btn.style.display = 'none';
          }
        }, 200);
      }
    });
  }
  // --- 初始設定
  initial() {
    this.scrollClick();
    this.scrollKeyDown();
    this.scrollShow();
  }
}

const goTopBtn = new ScrollToTop({
  el: '.scrollToTop', //監聽的對象
});
goTopBtn.initial();

/*-----------------------------------*/
//////// 語言模組 無障礙遊走設定  ////////
/*-----------------------------------*/

class SelectSlider {
  constructor(obj) {
    this.name = document.querySelectorAll(`${obj.el}`) || null; // --按鈕列表名稱
    this.control = document.querySelectorAll(`${obj.control}`) || null; // --控制的對象名稱
  }
  // --- 點擊 語言模組
  sliderClick() {
    this.name.forEach((i) => {
      i.addEventListener('click', (e) => {
        e.preventDefault();
        const sliderItem = e.target.nextElementSibling;
        if (sliderItem === null) {
          return;
        } else if (
          sliderItem.offsetHeight !== 0 ||
          sliderItem.offsetHeight === null
        ) {
          jsSlideUp(sliderItem, 300);
        } else {
          jsSlideDown(sliderItem, 300);
        }
        this.sliderClose(e.target);
      });
    });
  }
  // --- Keydown 語言模組
  sliderKeydown() {
    this.control.forEach((i) => {
      i.addEventListener('keydown', (e) => {
        const sliderItem = e.target.nextElementSibling;
        if (sliderItem) {
          jsSlideDown(sliderItem, 300);
        }
      });
    });
  }
  // --- Focusout 語言模組
  sliderFocusout() {
    this.name.forEach((i) => {
      const nodes = i.querySelectorAll('ul li a');
      const lastNodes = nodes[nodes.length - 1];
      const sliderItem = i.querySelector('ul');
      lastNodes.addEventListener('focusout', (e) => {
        e.preventDefault();
        jsSlideUp(sliderItem, 300);
      });
    });
  }
  //--- 關閉語言模組
  sliderClose(item) {
    const sliderItem = item.nextElementSibling;
    const that = this;

    function clickOtherPlace(e) {
      const chooseClassName = that.name[0].className;
      if (e.target.closest(`.${chooseClassName}`) === null) {
        jsSlideUp(sliderItem, 300);
      } else {
        return;
      }
    }
    document.addEventListener('touchstart', (e) => {
      e.preventDefault();
      clickOtherPlace(e);
    });
    document.addEventListener('click', clickOtherPlace);
  }

  initial() {
    this.sliderClick();
    this.sliderKeydown();
    this.sliderFocusout();
  }
}

const languageSelect = new SelectSlider({
  el: '.language', // --- 控制的對象
  control: '.language a', // --- 監聽的對象
});
languageSelect.initial();

/*------------------------------------*/
//////////分享按鈕 share dropdwon////////
/*------------------------------------*/
function shareBtnFunction() {
  //創造一個a連結的按鈕
  const shareUl = document.querySelector('.share');
  const btn = document.createElement('a');
  if (shareUl) {
    btn.setAttribute('class', 'shareButton');
    btn.setAttribute('href', '#');
    btn.textContent = 'share分享按鈕';
    shareUl.insertBefore(btn, shareUl.childNodes[0]);
  }
  const shareBtn = new SelectSlider({
    el: '.share', // --- 控制的對象
    control: '.share a', // --- 監聽的對象
  });
  shareBtn.initial();
}
shareBtnFunction();

/*------------------------------------*/
/////form表單 單個檔案上傳+多個檔案上傳/////
/*------------------------------------*/
function addFile() {
  const addFileName = document.querySelectorAll('.check_file');
  addFileName.forEach((i) => {
    i.addEventListener('change', pushFlieName);
  });

  function pushFlieName(e) {
    let _fileLen = e.target.files.length;
    let _fileName = '';
    const uploadInput = e.target.parentNode
      .closest('.upload_grp')
      .querySelector('.upload_file');
    if (_fileLen > 1) {
      _fileName = `${_fileLen} files selected`;
    } else {
      _fileName = e.target.files[0].name;
    }
    uploadInput.value = _fileName;
  }
}
addFile();

/*-----------------------------*/
/////form表單 placeholder隱藏?? /////
/*-----------------------------*/
function checkboxBlur() {
  const checkboxList = document.querySelectorAll('input[type="checkbox"]');
  checkboxList.forEach((i) => {
    i.addEventListener('click', (e) => {
      e.target.blur();
    });
  });
}
checkboxBlur();

/*-----------------------------------*/
/////////// category active  //////////
/*-----------------------------------*/
function categoryActive() {
  const categoryList = document.querySelectorAll('.category');
  categoryList.forEach((i) => {
    const item = i.querySelectorAll('a');
    item.forEach((tag) => {
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        removeclass(item);
        e.target.classList.add('active');
      });
    });
  });

  function removeclass(item) {
    item.forEach((i) => {
      i.classList.remove('active');
    });
  }
}
categoryActive();

/*------------------------------------*/
/////gotoCenter on focus跳到 content/////
/*------------------------------------*/
function gotoCenter() {
  const goCenterTag = document.querySelector('a.goCenter');
  const acTag = document.querySelector('#aC');
  const mainAccesskey = document.querySelector('.main .accesskey');
  const headerHeight = document.querySelector('.header').offsetHeight;
  //.accesskey 到top 的距離等於 header + .accesskey到父層上方的距離
  let _distance = headerHeight + mainAccesskey.offsetTop;
  if (goCenterTag) {
    goCenterTag.addEventListener('keydown', (e) => {
      if (e.which === 13) {
        acTag.focus();
        window.scrollTo({
          top: _distance,
          left: 0,
          behavior: 'smooth',
        });
      }
    });
  }
}
gotoCenter();

/*-----------------------------------*/
/////////// 無障礙快捷鍵盤組合  //////////
/*-----------------------------------*/

class A11yKeyCode {
  constructor() {
    this.search = document.querySelector('.search input[type="text"]');
    this.header = document.querySelector('.header .accesskey');
    this.main = document.querySelector('.main .accesskey');
    this.footer = document.querySelector('footer .accesskey');
    this.distance = 0;
  }

  //focus element
  focusElem(distance, el) {
    if (window.scrollY === distance) {
      el.focus();
    }
  }
  // scroll to element position
  scrollAnime(distance, el) {
    window.scrollTo({
      top: distance,
      behavior: 'smooth',
    });
    window.addEventListener('scroll', () => {
      this.focusElem(distance, el);
    });
  }

  // click a11 button
  a11keyDown() {
    document.addEventListener('keydown', (e) => {
      switch (e.altKey && e.code) {
        // alt+S 查詢
        case true && 'KeyS':
          this.scrollAnime(0, this.search);
          this.focusElem(0, this.search);
          break;
        // alt+U header
        case true && 'KeyU':
          this.scrollAnime(0, this.header);
          this.focusElem(0, this.header);
          break;
        // alt+C 主要內容區
        case true && 'KeyC':
          this.main.focus();
          let _headerHeight = document.querySelector('header').offsetHeight;
          this.scrollAnime(_headerHeight, this.main);
          this.focusElem(_headerHeight, this.main);
          break;
        // alt+Z footer
        case true && 'KeyZ':
          let _bodyScrollHeight = document.documentElement.scrollHeight;
          let _bodyClientHeight = document.documentElement.clientHeight;
          let _distance = _bodyScrollHeight - _bodyClientHeight;
          this.scrollAnime(_distance, this.footer);
          this.focusElem(_distance, this.footer);
          break;
      }
    });
  }
  initial() {
    this.a11keyDown();
  }
}
let a11Keycode = new A11yKeyCode();
a11Keycode.initial();

/*-----------------------------------*/
//////// 無障礙切換slick箭頭語系  ////////
/*-----------------------------------*/

// 無障礙錨點切換語系，更改accesskey的title名稱
function switchA11TitleName() {
  const webLang = document.querySelector('html').getAttribute('lang');
  const headerTitle = document.querySelector('.header .accesskey');
  const mainTitle = document.querySelector('.main .accesskey');
  const footerTitle = document.querySelector('footer .accesskey');
  const searchTitle = document.querySelector('.search');
  let _lang = webLang.substring(0, 2);
  if (_lang === 'zh') {
    headerTitle.setAttribute('title', '上方功能區塊');
    mainTitle.setAttribute('title', '中央內容區塊');
    footerTitle.setAttribute('title', '下方功能區塊');
    searchTitle.setAttribute('title', '關鍵字搜尋：文章關鍵字搜尋');
  } else {
    headerTitle.setAttribute('title', 'header');
    mainTitle.setAttribute('title', 'content');
    searchTitle.setAttribute('title', 'footer');
    searchTitle.setAttribute('title', 'search');
  }
}
switchA11TitleName();

// /*------------------------------------*/
// //////////table 加上 data-title//////////
// /*------------------------------------*/
function tableAddDataAttributes() {
  const el = document.querySelectorAll('.table_list');
  function setTrAttr(i) {
    const thList = i.querySelectorAll('th');
    const trList = i.querySelectorAll('tr');
    trList.forEach((trItem) => {
      const tdList = trItem.querySelectorAll('td');
      tdList.forEach((i, idx) => {
        tdList[idx].setAttribute('data-title2', `${thList[idx].textContent}`);
      });
    });
  }
  el.forEach((i) => {
    const tableItem = i.querySelectorAll('table');
    tableItem.forEach((i) => {
      setTrAttr(i);
    });
  });
}
tableAddDataAttributes();

/*-----------------------------------*/
//////////// Accordion設定 ////////////
/*-----------------------------------*/
// $(function () {
//   $('.accordion').each(function () {
//     $(this).find('.accordion-content').hide();
//     var _accordionItem = $(this).children('ul').children('li').children('a');
//     _accordionItem.each(function () {
//       function accordion(e) {
//         $(this).parent('li').siblings().children('a').removeClass('active');
//         $(this).toggleClass('active');
//         $(this).parent('li').siblings().children('.accordion-content').slideUp();
//         $(this).next('.accordion-content').slideToggle();
//         e.preventDefault();
//       }
//       $(this).click(accordion);
//       $(this).keyup(accordion);
//     });
//   });
// });

// $(function () {
//   /*-----------------------------------*/
//   ///////////////置頂go to top////////////
//   /*-----------------------------------*/
//   class ScrollToTop {
//     constructor(obj) {
//       this.name = obj.name || null; //監聽的對象
//       this.control = obj.control || null; //監聽的對象
//       this.attr = obj.attr || null; //keydown後focus的目標
//       this.speed = obj.speed || null; //滑行速度
//       this.body = obj.body || null;
//     }
//     // --- 點擊置頂按鈕
//     scrollClick() {
//       let that = this;
//       that.name.click(function (e) {
//         that.control.stop().animate(
//           {
//             scrollTop: 0,
//           },
//           that.speed,
//           'linear'
//         );
//         e.preventDefault();
//       });
//     }
//     // --- 鍵盤點擊置頂按鈕
//     scrollKeydown() {
//       let that = this;
//       that.name.keydown(function (e) {
//         that.control.stop().animate(
//           {
//             scrollTop: 0,
//           },
//           that.speed,
//           'linear'
//         );
//         that.body.find(that.attr).focus();
//         e.preventDefault();
//       });
//     }
//     // --- 按鈕出現的函式
//     goTop() {
//       let that = this;
//       $(window).on('scroll', function () {
//         if ($(this).scrollTop() > 200) {
//           that.name.fadeIn();
//         } else {
//           that.name.fadeOut();
//         }
//       });
//     }
//     // --- 初始設定
//     initial() {
//       this.scrollClick();
//       this.scrollKeydown();
//       this.goTop();
//     }
//   }

//   let gotopBtn = new ScrollToTop({
//     name: $('.scrollToTop'), //監聽的對象
//     control: $('html, body'), //監聽的對象
//     attr: 'a.goCenter', //keydown後focus的目標
//     speed: 400, //滑行速度
//     body: $('body'),
//   });
//   gotopBtn.initial();

//   // /*--------------------------------------------------------*/
//   /////設定img 在IE9+ SAFARI FIREFOX CHROME 可以object-fit/////
//   /*--------------------------------------------------------*/
//   var userAgent, ieReg, ie;
//   userAgent = window.navigator.userAgent;
//   ieReg = /msie|Trident.*rv[ :]*11\./gi;
//   ie = ieReg.test(userAgent);
//   if (ie) {
//     $('.img-container').each(function () {
//       var imgUrl = $(this).find('img').attr('data-src');
//       var $container = $(this);
//       $container.has('.none').addClass('ie-object-none');
//       $container.has('.none').css('backgroundImage', 'url(' + imgUrl + ')');
//       $container.has('.cover').addClass('ie-object-cover');
//       $container.has('.cover').css('backgroundImage', 'url(' + imgUrl + ')');
//       $container.has('.fill').addClass('ie-object-fill');
//       $container.has('.fill').css('backgroundImage', 'url(' + imgUrl + ')');
//       $container.has('.contain').addClass('ie-object-contain');
//       $container.has('.contain').css('backgroundImage', 'url(' + imgUrl + ')');
//     });
//   }
//   /*-----------------------------*/
//   /////form表單 placeholder隱藏/////
//   /*-----------------------------*/
//   $('input[type="checkbox"]')
//     .off()
//     .click(function (e) {
//       $(this).blur();
//     });
//   /*------------------------------------*/
//   /////form表單 單個檔案上傳+多個檔案上傳/////
//   /*------------------------------------*/
//   $(document).on('change', '.check_file', function () {
//     var names = [];
//     var length = $(this).get(0).files.length;
//     for (var i = 0; i < $(this).get(0).files.length; ++i) {
//       names.push($(this).get(0).files[i].name);
//     }
//     // $('input[name=file]').val(names);
//     if (length > 2) {
//       var fileName = names.join(', ');
//       $(this)
//         .closest('.upload_grp')
//         .find('.upload_file')
//         .attr('value', length + ' files selected');
//     } else {
//       $(this).closest('.upload_grp').find('.upload_file').attr('value', names);
//     }
//   });
//   /*------------------------------------*/
//   //////////分享按鈕 share dropdwon////////
//   /*------------------------------------*/

//   class FunctionPanel {
//     constructor(obj) {
//       this.name = obj.name || null; // --- 綁定的對象
//       this.control = obj.control || null; // --- 要控制的對象
//     }
//     shareBtn() {
//       // --- 綁定外層的this
//       let that = this;
//       that.name.children('ul').hide();
//       that.name.prepend('<a href="#" class="shareButton">share分享按鈕</a>');
//     }
//     shareBtnClick() {
//       $('.shareButton')
//         .off()
//         .click(function (e) {
//           $(this).siblings('ul').stop(true, true).slideToggle();
//           e.preventDefault();
//         });
//     }
//     shareBtnKeyup() {
//       $(this).siblings('ul').stop(true, true).slideDown();
//     }
//     shareBtnFocusout() {
//       // --- 綁定外層的this
//       let that = this;
//       that.name.find('li:last>a').focusout(function (event) {
//         $(this).parent().parent('ul').hide();
//       });
//     }
//     shareBtnTouchend() {
//       // --- 綁定外層的this
//       let that = this;
//       $(document).on('touchend click', function (e) {
//         let container = that.name;
//         if (!container.is(e.target) && container.has(e.target).length === 0) {
//           $('.function_panel .share ul').hide();
//         }
//       });
//     }
//     initial() {
//       this.shareBtn(); //先初始化載入
//       this.shareBtnClick();
//       this.shareBtnKeyup();
//       this.shareBtnFocusout();
//       this.shareBtnTouchend();
//     }
//   }

//   let function_panel_btn = new FunctionPanel({
//     name: $('.function_panel .share'), // --- 綁定的對象
//     control: $('.shareButton'), // --- 要控制的對象}
//   });
//   function_panel_btn.initial();

//   /*------------------------------------*/
//   /////////////字型大小 font-size //////////
//   /*------------------------------------*/
//   class FontSize {
//     constructor(obj) {
//       this.name = obj.name;
//       this.control = obj.control;
//     }
//     // 字體大小設定 --- 小
//     small() {
//       let that = this;
//       that.name.find('.small').click(function (e) {
//         $(this).parent('li').siblings('li').find('a').removeClass('active');
//         that.control.removeClass('large_size').addClass('small_size');
//         $(this).blur().addClass('active');
//         e.preventDefault();
//         that.createCookie('FontSize', 'small', 356);
//       });
//     }
//     // 字體大小設定 --- 中
//     medium() {
//       let that = this;
//       that.name.find('.medium').click(function (e) {
//         $(this).parent('li').siblings('li').find('a').removeClass('active');
//         that.control.removeClass('large_size small_size');
//         $(this).blur().addClass('active');
//         e.preventDefault();
//         that.createCookie('FontSize', 'medium', 356);
//       });
//     }
//     // 字體大小設定 --- 大
//     large() {
//       let that = this;
//       that.name.find('.large').click(function (e) {
//         $(this).parent('li').siblings('li').find('a').removeClass('active');
//         that.control.removeClass('small_size').addClass('large_size');
//         $(this).blur().addClass('active');
//         e.preventDefault();
//         that.createCookie('FontSize', 'large', 356);
//       });
//     }
//     // 創造新的 字體大小設定
//     createCookie(name, value, days) {
//       if (days) {
//         var date = new Date();
//         date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//         var expires = '; expires=' + date.toGMTString();
//       } else expires = '';
//       document.cookie = name + '=' + value + expires + '; path=/';
//     }
//     //讀取瀏覽器上 字體大小設定
//     readCookie(name) {
//       var nameEQ = name + '=';
//       var ca = document.cookie.split(';');
//       for (var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//       }
//       return null;
//     }
//     //初始化 字體大小設定
//     initCookie() {
//       let that = this;
//       window.onload = function (e) {
//         var cookie = that.readCookie('FontSize');
//         if (cookie == 'small') {
//           that.name.find('.small').click();
//           e.preventDefault();
//         } else {
//           if (cookie == 'large') {
//             that.name.find('.large').click();
//             e.preventDefault();
//           } else {
//             //這裡是預設宣告
//             that.name.find('.medium').click();
//             e.preventDefault();
//           }
//         }
//       };
//     }
//     initial() {
//       // 字體大小設定 --- 小
//       this.small();
//       // 字體大小設定 --- 中
//       this.medium();
//       // 字體大小設定 --- 大
//       this.large();
//       //初始化 字體大小設定
//       this.initCookie();
//     }
//   }

//   let fontsize = new FontSize({
//     name: $('.font_size'), // ---按下去的對象
//     control: $('.innerpage'),
//   });
//   fontsize.initial();

//   /*-----------------------------------*/
//   /////////// category active  //////////
//   /*-----------------------------------*/
//   $('.category')
//     .find('a')
//     .off()
//     .click(function (event) {
//       $(this).parent('li').siblings().find('a').removeClass('active');
//       $(this).addClass('active').blur();
//     });
//   /*-----------------------------------*/
//   /////////// 無障礙快捷鍵盤組合  //////////
//   /*-----------------------------------*/
//   class A11yKey {
//     constructor(obj) {
//       this.name = obj.name; // ---綁定的觸發對象
//       this.control = obj.control; // ---偵測的對象
//       this.seed = obj.speed; // ---動畫速度
//     }
//     keydown() {
//       let that = this;
//       that.name.on('keydown', function (e) {
//         switch (e.altKey && e.keyCode) {
//           // alt+S 查詢
//           case 83:
//             that.control.animate(
//               {
//                 scrollTop: 0,
//               },
//               that.seed,
//               'easeOutExpo'
//             );
//             $('.search').find('input[type="text"]').focus();
//             break;
//           // alt+U header
//           case 85:
//             that.control.animate(
//               {
//                 scrollTop: 0,
//               },
//               that.seed,
//               'easeOutExpo'
//             );
//             $('header').find('.accesskey').focus();
//             break;
//           // alt+C 主要內容區
//           case 67:
//             that.control.animate(
//               {
//                 scrollTop: $('.main').find('.accesskey').offset().top - 70,
//               },
//               that.seed,
//               'easeOutExpo'
//             );
//             $('.main').find('.accesskey').focus();
//             break;
//           // alt+Z footer
//           case 90:
//             that.control.animate(
//               {
//                 scrollTop: $('footer').find('.accesskey').offset().top,
//               },
//               that.seed,
//               'easeOutExpo'
//             );
//             $('footer').find('.accesskey').focus();
//             break;
//         }
//       });
//     }
//     initial() {
//       this.keydown();
//     }
//   }
//   let allkey = new A11yKey({
//     name: $(document), // ---綁定的觸發對象
//     control: $('html, body'), // ---偵測的對象
//     seed: 200, // ---動畫速度
//   });

//   allkey.initial();
//   /*-----------------------------------*/
//   //////// 無障礙切換slick箭頭語系  ////////
//   /*-----------------------------------*/

//   //無障礙切換slick箭頭語系
//   if ($('html')[0].hasAttribute('lang')) {
//     var weblang = $('html').attr('lang');
//     if (weblang.substring(0, 2) == 'zh') {
//       $('.slick-prev').attr('title', '上一筆');
//       $('.slick-next').attr('title', '下一筆');
//     } else if (weblang.substring(0, 2) !== 'zh') {
//       $('.slick-prev').attr('title', 'previous');
//       $('.slick-next').attr('title', 'next');
//     }
//   }
//   // 無障礙錨點切換語系，更改accesskey的title名稱
//   var weblang = $('html').attr('lang');
//   if (weblang.substring(0, 2) == 'zh') {
//     $('header').find('.accesskey').attr('title', '上方功能區塊');
//     $('.main').find('.accesskey').attr('title', '中央內容區塊');
//     $('footer').find('.accesskey').attr('title', '下方功能區塊');
//     $('.search').find('.accesskey').attr('title', '關鍵字搜尋：文章關鍵字搜尋');
//   } else if (weblang.substring(0, 2) !== 'zh') {
//     $('header').find('.accesskey').attr('title', 'header');
//     $('.main').find('.accesskey').attr('title', 'content');
//     $('footer').find('.accesskey').attr('title', 'footer');
//     $('.search').find('.accesskey').attr('title', 'search');
//   }
//   /*------------------------------------*/
//   /////gotoCenter on focus跳到 content/////
//   /*------------------------------------*/
//   class GoCenter {
//     constructor(obj) {
//       this.name = obj.name || null;
//       this.control = obj.control || null;
//       this.speed = obj.speed || null;
//     }
//     goCenterKeydown() {
//       let that = this;
//       that.name.keydown(function (e) {
//         if (e.which == 13) {
//           $('#aC').focus();
//           that.control.stop(true, true).animate(
//             {
//               scrollTop: $('.main').find('.accesskey').offset().top,
//             },
//             that.speed,
//             'easeOutExpo'
//           );
//         }
//       });
//     }
//     initial() {
//       this.goCenterKeydown();
//     }
//   }
//   let goCenterBtn = new GoCenter({
//     name: $('a.goCenter'), // --- 控制的對象
//     control: $('html, body'), //  ---偵測的對象
//     speed: 800,
//   }); // ---動畫速度
//   goCenterBtn.initial();
//   /*-----------------------------------*/
//   //////// 語言模組 無障礙遊走設定  ////////
//   /*-----------------------------------*/
//   class Language {
//     constructor(obj) {
//       this.name = obj.name || null; // --- 控制的對象
//       this.control = obj.control || null; // --- 監聽的對象
//     }
//     // --- 點擊 語言模組
//     langClick() {
//       let that = this;
//       that.name.find('ul').hide();
//       that.control.off().click(function (e) {
//         $(this).next('ul').stop(true, true).slideToggle();
//         e.preventDefault();
//       });
//     }
//     // --- Keydown 語言模組
//     langKeydown() {
//       let that = this;
//       that.control.keyup(function () {
//         $(this).next('ul').stop(true, true).slideDown();
//       });
//     }
//     // --- Focusout 語言模組
//     langFocusout() {
//       let that = this;
//       that.name.find('ul li:last>a').focusout(function () {
//         that.name.find('ul').hide();
//       });
//     }
//     //--- 關閉語言模組
//     closelang() {
//       let that = this;
//       $(document).on('touchend click', function (e) {
//         var target = e.target;
//         if (!$(target).is('.language a')) {
//           that.name.find('ul').hide();
//         }
//       });
//     }

//     initial() {
//       this.langClick();
//       this.langKeydown();
//       this.langFocusout();
//       this.closelang();
//     }
//   }

//   let languageSelect = new Language({
//     name: $('.language'), // --- 控制的對象
//     control: $('.language').children('a'), // --- 監聽的對象
//   });
//   languageSelect.initial();

//   // /*------------------------------------*/
//   // //  table 加上響應式 scroltable-wrapper/
//   // /*------------------------------------*/

//   class Table {
//     constructor(obj) {
//       this.name = obj.name;
//       this._window = $(window);
//     }
//     // --- 判斷沒有table_list
//     haveTableList() {
//       let that = this;
//       that.name.each(function (index, el) {
//         // --- 判斷沒有table_list
//         if ($(this).parents('.table_list').length == 0 && $(this).parents('.fix_th_table').length == 0 && $(this).parent('form').length == 0) {
//           $(this).scroltable();
//         }
//       });
//     }
//     // --- 固定版頭
//     table_Arrow() {
//       if ($('table').parents('.table_list').length == 0 && $('table').parents('.fix_th_table').length == 0 && $(this).parent('form').length == 0) {
//         if ($('.scroltable-wrapper').length > 0) {
//           var stickyArrowTop = Math.floor($('.scroltable-wrapper').offset().top),
//             thisScroll = Math.floor($(this).scrollTop());
//           if (thisScroll > stickyArrowTop - 230) {
//             $('.scroltable-wrapper .tablearrow_left').css('display', 'block');
//             $('.scroltable-wrapper .tablearrow_left').css(
//               {
//                 top: thisScroll - stickyArrowTop + 220,
//               },
//               100,
//               'easeOutQuint'
//             );
//             $('.scroltable-wrapper .tablearrow_right').css('display', 'block');
//             $('.scroltable-wrapper .tablearrow_right').css(
//               {
//                 top: thisScroll - stickyArrowTop + 220,
//               },
//               100,
//               'easeOutQuint'
//             );
//           } else {
//             $('.scroltable-wrapper .tablearrow_left').css({
//               top: '10px',
//               display: 'none',
//             });
//             $('.scroltable-wrapper .tablearrow_right').css({
//               top: '10px',
//               display: 'none',
//             });
//           }
//         }
//       }
//     }
//     jsScroll() {
//       let that = this;
//       that._window.scroll(function (event) {
//         that.table_Arrow();
//       });
//     }
//     scrollFn() {
//       var scrollTimer;
//       let that = this;
//       that._window.scroll(function () {
//         clearTimeout(scrollTimer);
//         scrollTimer = setTimeout(function () {
//           that.table_Arrow();
//         }, 50);
//       });
//     }
//     // --- tablearrow arrow，為了設定箭頭
//     navLeft() {
//       $('.scroltable-nav-left').append('<div class="tablearrow_left" style="display:none;"></div>');
//     }
//     navRight() {
//       $('.scroltable-nav-right').append('<div class="tablearrow_right"  style="display:none;"></div>');
//     }
//     initial() {
//       this.haveTableList();
//       this.table_Arrow();
//       this.jsScroll();
//       this.scrollFn();
//       this.navLeft();
//       this.navRight();
//     }
//   }
//   let table = new Table({
//     name: $('table'),
//   });
//   table.initial();
//   // /*------------------------------------*/
//   // //////////table 加上 data-title//////////
//   // /*------------------------------------*/
//   class RwdTable {
//     constructor(obj) {
//       this.name = obj.name;
//     }
//     rwdFn() {
//       let that = this;
//       that.name.find('table').each(function () {
//         var $row = $(this).find('tr');
//         rowCount = $row.length;
//         for (var n = 1; n <= rowCount; n++) {
//           $(this)
//             .find('th')
//             .each(function (index) {
//               var thText = $(this).text();
//               $row.eq(n).find('td').eq(index).attr('data-title', thText);
//             });
//         }
//       });
//     }
//     initial() {
//       this.rwdFn();
//     }
//   }

//   let rwdtable = new RwdTable({
//     name: $('.table_list'), // ---綁定的觸發對象
//   });
//   rwdtable.initial();
//   /*-----------------------------------*/
//   ////////////// lazy load //////////////
//   /*-----------------------------------*/
//   var lazyLoadInstance = new LazyLoad({
//     elements_selector: 'img.lazy',
//     placeholder: '/images/basic/placeholder.gif',
//     effect: 'fadeIn',
//     fadeTime: 600,
//     threshold: 0,
//   });

//   /*-----------------------------------*/
//   //////// 新增 按鈕型 Popovers 設定 ///////
//   /*-----------------------------------*/
//   // 電腦版查詢
//   class Popovers {
//     constructor(obj) {
//       this.name = obj.name;
//     }
//     btnClick() {
//       let that = this;
//       this.name.off().on('click', function (e) {
//         $(this).parent().siblings().children('.popContent').removeClass('open');
//         $(this).next().toggleClass('open');
//         let openContent = $(this).next().hasClass('open');
//         if (openContent === true) {
//           $('.popovers button').next().slideUp();
//           $(this).siblings('.popContent').stop(true, false).slideDown('400', 'easeOutQuint');
//           $(this).siblings('.customer_service_block').slideUp();
//           $('body').keydown(function (e) {
//             if (e.keyCode == 27) {
//               $('.popContent').slideUp();
//               this.pop_status = false;
//             }
//           });

//           $(window).off('resize');
//           that.pop_status = true;
//         } else {
//           $(this).next().stop().slideUp();
//         }
//         e.stopPropagation();
//       });
//     }
//     // 如果點在外面
//     closePopovers() {
//       let that = this;
//       $('body').on('click touchend', function (e) {
//         that.name.next().slideUp();
//         $('.popContent').removeClass('open');
//       });
//       // 如果點在區域內則不受限制
//       $('.popContent').click(function (e) {
//         e.stopPropagation();
//       });
//     }
//     initial() {
//       this.btnClick();
//       this.closePopovers();
//     }
//   }
//   let search_btn = new Popovers({
//     name: $('.search_btn'),
//   });
//   search_btn.initial();
// });

// class A11yKeyMenu {
//   constructor(obj) {
//     this.name = obj.name || null;
//     this.mainMenu = document.querySelector('.mainMenu') || null;
//   }

//   menuKeyUp() {
//     // --- 綁定外層的this
//     let _that = this;
//     let control;
//     control = _that.mainMenu.querySelectorAll('li');
//     control.forEach((i) => {
//       i.addEventListener('keyup', (e) => {
//         let siblings = Array.prototype.filter.call(i.parentNode.children, (child) => {
//           return child !== i;
//         });

//         siblings.forEach((x) => {
//           x.classList.remove('active');
//           x.querySelectorAll('ul').forEach((s) => {
//             s.style.display = 'none';
//           });
//         });
//       });
//     });
//   }

//   menuFocusOut() {
//     // --- 綁定外層的this
//     let _that = this;
//     let lastA = _that.mainMenu.querySelectorAll('a').length - 1;
//     _that.mainMenu.querySelectorAll('a')[lastA].addEventListener('focusout', () => {
//       _that.mainMenu.querySelectorAll('li').forEach((i) => {
//         i.classList.remove('active');
//       });
//     });
//   }

//   menuLiHasChildKeyup() {
//     // --- 綁定外層的this
//     let _that = this;
//     let control;
//     control = _that.mainMenu.querySelectorAll('li.hasChild > a');

//     control.forEach((i) => {
//       i.addEventListener('keyup', (e) => {
//         i.parentNode.querySelector('ul').removeAttribute('style');
//         i.parentNode.classList.add('active');
//       });
//     });
//   }
//   initial() {
//     this.menuKeyUp();
//     this.menuFocusOut();
//     this.menuLiHasChildKeyup();
//   }
// }

// let a11yKeyMenu = new A11yKeyMenu({
//   name: $('.menu'),
// });
// a11yKeyMenu.initial();
