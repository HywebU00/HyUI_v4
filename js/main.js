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

const slider = (function () {
  let Slider = {};
  // the constructed function,timeManager,as such that's a manager about managing the setInterval
  function TimerManager() {
    this.timers = [];
    this.args = [];
    this.isTimerRun = false;
  }
  // if the element can't has the property of TimerManage what represented the constructor function,repeated creating a constructed function
  TimerManager.makeTimerManage = function (element) {
    if (!element.TimerManage || element.TimerManage.constructor !== TimerManager) {
      element.TimerManage = new TimerManager();
    }
  };
  // That's order to create the method what add the timer
  TimerManager.prototype.add = function (timer, args) {
    this.timers.push(timer);
    this.args.push(args);
    this.timerRun();
  };
  // called the method is order to run the timer by ordering
  TimerManager.prototype.timerRun = function () {
    if (!this.isTimerRun) {
      let timer = this.timers.shift(),
        args = this.args.shift();
      if (timer && args) {
        this.isTimerRun = true;
        timer(args[0], args[1]);
      }
    }
  };
  // let it run the next timer
  TimerManager.prototype.next = function () {
    this.isTimerRun = false;
    this.timerRun();
  };

  function jsSlideUp(element, time) {
    if (element.offsetHeight > 0) {
      let totalHeight = element.offsetHeight;
      let currentHeight = totalHeight;
      let reduceValue = totalHeight / (time / 10);
      element.style.transition = 'height ' + time + ' ms';
      element.style.overflow = 'hidden';
      let timer = setInterval(function () {
        currentHeight -= reduceValue;
        element.style.height = currentHeight + 'px';
        if (currentHeight <= 0) {
          clearInterval(timer);
          element.style.display = 'none';
          element.style.height = totalHeight + 'px';
          if (element.TimerManage && element.TimerManage.constructor === TimerManager) {
            element.TimerManage.next();
          }
        }
      }, 10);
    } else {
      if (element.TimerManage && element.TimerManage.constructor === TimerManager) {
        element.TimerManage.next();
      }
    }
  }

  function jsSlideDown(element, time) {
    if (element.offsetHeight <= 0) {
      element.style.display = 'block';
      element.style.transition = 'height' + time + ' ms';
      element.style.overflow = 'hidden';
      let totalHeight = element.offsetHeight;
      let currentHeight = 0;
      element.style.height = '0px';
      let addValue = totalHeight / (time / 10);
      let timer = setInterval(function () {
        currentHeight += addValue;
        element.style.height = currentHeight + 'px';
        if (currentHeight >= totalHeight) {
          clearInterval(timer);
          element.style.height = totalHeight + 'px';
          if (element.TimerManage && element.TimerManage.constructor === TimerManager) {
            element.TimerManage.next();
          }
        }
      }, 10);
    } else {
      if (element.TimerManage && element.TimerManage.constructor === TimerManager) {
        element.TimerManage.next();
      }
    }
  }
  // the interface about slideUp method
  Slider.jsSlideUp = function (element) {
    TimerManager.makeTimerManage(element);
    element.TimerManage.add(jsSlideUp, arguments);
    return this;
  };
  // the interface about slideDown method
  Slider.jsSlideDown = function (element) {
    TimerManager.makeTimerManage(element);
    element.TimerManage.add(jsSlideDown, arguments);
    return this;
  };
  return Slider;
})();

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
    let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    el.className = el.className.replace(reg, ' ');
  }
}
/*-----------------------------------*/
/////////////// MENU初始化 ///////////
/*-----------------------------------*/

function Menu() {
  // --- menu初始化 新增側欄選單
  let body = document.querySelector('body');
  let sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.style = ';opacity:0';
  sidebar.innerHTML = '<div class="mobileArea"><button type="button" class="sidebarClose">關閉</button></div><div class="menuOverlay"></div>';
  body.prepend(sidebar);

  let mainMenu = document.querySelector('.mainMenu');
  let hasChild = mainMenu.querySelectorAll('li ul');
  hasChild.forEach((i) => {
    i.parentNode.classList.add('hasChild');
  });

  // --- menu初始化 新增側欄選單按鈕
  let sidebarCtrlBtn = document.createElement('button');
  sidebarCtrlBtn.className = 'sidebarCtrlBtn';
  sidebarCtrlBtn.innerHTML = '側欄選單<span></span><span></span><span></span>';
  sidebarCtrlBtn.setAttribute('type', 'button');

  // --- menu初始化 新增搜尋按鈕
  let searchCtrlBtn = document.createElement('button');
  let siteHeader = document.querySelector('.header .container');
  searchCtrlBtn.className = 'searchCtrlBtn';
  searchCtrlBtn.innerHTML = '查詢';
  searchCtrlBtn.setAttribute('type', 'button');
  siteHeader.prepend(searchCtrlBtn, sidebarCtrlBtn);

  // --- menu初始化 複製手機版側欄選單
  let mobileArea = document.querySelector('.mobileArea');
  let cloneMenu = mainMenu.cloneNode(true);
  cloneMenu.classList.add('sideMainMenu');
  cloneMenu.classList.remove('mainMenu', 'megaMenu', 'menu');
  mobileArea.append(cloneMenu);

  // --- 複製搜尋到手機版側欄
  let search = document.querySelector('.search');
  let cloneSearch = search.cloneNode(true);
  cloneSearch.removeAttribute('style');
  cloneSearch.classList.add('mobileSearch');
  cloneSearch.classList.remove('search');
  body.prepend(cloneSearch);
}
Menu();

// --- 複製手機版nav選單
function TopNav() {
  let mobileArea = document.querySelector('.mobileArea');
  let nav = document.querySelector('.navigation');
  let cloneNav = nav.cloneNode(true);
  mobileArea.append(cloneNav);
  let sideLanguage = document.querySelector('.mobileArea .font_size');
  sideLanguage.remove();
}
TopNav();

/*-----------------------------------*/
///////// 手機版本search設定 ////////////
/*-----------------------------------*/
function MobileSearch(obj) {
  let searchMode = true;
  let body = document.querySelector('body');
  let searchCtrlBtn = obj.searchCtrlBtn;
  let control = obj.control;
  let mobileSearch = document.querySelector('.mobileSearch');

  function stopPop() {
    //點擊時 不觸發冒泡事件
    mobileSearch,
      searchCtrlBtn.addEventListener('click', (e) => {
        e.stopPropagation();
      });
  }
  function searchToggle() {
    if (!searchMode) {
      slider.jsSlideDown(control, 300);
      searchMode = true;
    } else {
      control.style.display = 'none';
      searchMode = false;
    }
    stopPop();
  }

  // --- 點擊搜尋按鈕開關
  searchCtrlBtn.addEventListener('click', (e) => {
    searchToggle();
  });

  // --- 點擊搜尋區以外的區塊
  // --- 如果點在外面 則 searchMode 狀態改為false
  body.addEventListener('click', (e) => {
    if (searchMode) {
      searchToggle();
      searchMode = false;
    }
  });
}
MobileSearch({
  searchCtrlBtn: document.querySelector('.searchCtrlBtn'),
  control: document.querySelector('.mobileSearch'),
});

/*-----------------------------------*/
//// 手機桌機版本切換及手機版menu設定 //////
/*-----------------------------------*/
function MobileMenu() {
  let body = document.querySelector('body');
  let windowWidth = window.outerWidth;
  let windowSmall = 768;
  let sidebar = document.querySelector('.sidebar');
  let mobileSearch = document.querySelector('.mobileSearch');
  let sidebarClose = document.querySelector('.sidebarClose');
  let sidebarCtrlBtn = document.querySelector('.sidebarCtrlBtn');
  let menuOverlay = document.querySelector('.menuOverlay');
  let mobileArea = document.querySelector('.mobileArea');
  /*-----------------------------------*/
  /////////////// PC版設定 /////////////
  /*-----------------------------------*/
  let menu_liHasChild = document.querySelector('.header .mainMenu').querySelectorAll('li.hasChild');
  /*-----------------------------------*/
  /////////////// 手機版設定 /////////////
  /*-----------------------------------*/
  let asideMenu = document.querySelector('.sideMainMenu');
  let asideMenuLi = asideMenu.querySelectorAll('li');
  let asideMenuUl = asideMenu.querySelector('ul');
  let asideMenuNextUl = asideMenuUl.querySelectorAll('ul');
  // let asideMenuNextUl1 = document.querySelectorAll('.sideMainMenu > ul > li > ul');
  // let asideMenuNextUl2 = document.querySelectorAll('.sideMainMenu > ul > li > ul > li > ul');
  // let asideMenuNextUl3 = document.querySelectorAll('.sideMainMenu > ul > li > ul > li > ul > li > ul');
  let asideMenuNextUl1 = [];
  let asideMenuNextUl2 = [];
  let asideMenuNextUl3 = [];

  [...asideMenuUl.children]
    .filter((child) => {
      return child.classList.contains('hasChild');
    })
    .forEach((i) => {
      asideMenuNextUl1.push(i.querySelector('ul'));
    });

  asideMenuNextUl1.forEach((s) => {
    [...s.children]
      .filter((child) => {
        return child.classList.contains('hasChild');
      })
      .forEach((i) => {
        asideMenuNextUl2.push(i.querySelector('ul'));
      });
  });

  asideMenuNextUl2.forEach((s) => {
    [...s.children]
      .filter((child) => {
        return child.classList.contains('hasChild');
      })
      .forEach((i) => {
        asideMenuNextUl3.push(i.querySelector('ul'));
      });
  });

  // --- 設定所有UL的高度，有高度才會有縮起來得效果，最多四層
  let mobileAreaOut = mobileArea.offsetWidth;
  sidebar.style = 'display:block;opacity:0';
  mobileArea.style = `transform: translateX(${mobileAreaOut * -1}px)`;
  asideMenuUl.classList.add('firstLv');
  asideMenuNextUl.forEach((i) => {
    i.style.position = 'absolute';
  });
  asideMenuNextUl1.forEach((i) => {
    i.classList.add('secondLv');
    i.dataset.secondHeight = i.offsetHeight;
    i.style = 'height:0';
  });
  asideMenuNextUl2.forEach((i) => {
    i.classList.add('thirdLv');
    i.dataset.thirdHeight = i.offsetHeight;
    i.style = 'height:0';
  });
  asideMenuNextUl3.forEach((i) => {
    i.classList.add('fourthLv');
    i.dataset.fourthHeight = i.offsetHeight;
    i.style = 'height:0';
  });
  sidebar.style = 'display:none;opacity:1;';

  // --- 手機版選單開合功能
  asideMenu.querySelectorAll('.hasChild').forEach((i) => {
    i.addEventListener('click', (e) => {
      e.preventDefault();
      let siblings = [...i.parentNode.children].filter((child) => {
        return child !== i;
      });
      let content = i.querySelector('ul');
      let secondHeight = content.dataset.secondHeight || 0;
      let thirdHeight = content.dataset.thirdHeight || 0;
      let fourthHeight = content.dataset.fourthHeight || 0;
      if (!i.classList.contains('active')) {
        i.classList.add('active');
        if (i.parentNode.classList.contains('firstLv')) {
          content.style.height = `${secondHeight}px`;
        } else if (i.parentNode.classList.contains('secondLv')) {
          i.parentNode.style.height = `${Number(i.parentNode.dataset.secondHeight) + Number(thirdHeight)}px`;
          content.style.height = `${thirdHeight}px`;
        } else if (i.parentNode.classList.contains('thirdLv')) {
          i.parentNode.parentNode.parentNode.style.height = `${Number(i.parentNode.parentNode.parentNode.dataset.secondHeight) + Number(i.parentNode.dataset.thirdHeight) + Number(fourthHeight)}px`;
          i.parentNode.style.height = `${Number(i.parentNode.dataset.thirdHeight) + Number(fourthHeight)}px`;
          content.style.height = `${fourthHeight}px`;
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

  // --- 行動版/電腦版切換
  let resizeTimer;
  window.addEventListener('resize', (e) => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      mobileSearch.style.display = 'none';
      switchMenu();
    }, 50);
  });

  // --- 點擊選單按鈕 執行 展開側邊選單函式
  sidebarCtrlBtn.addEventListener('click', (e) => {
    showSidebar();
    e.preventDefault();
  });

  menuOverlay.addEventListener('click', (e) => {
    jsFadeOut(menuOverlay);
    hideSidebar();
  });
  sidebarClose.addEventListener('click', (e) => {
    jsFadeOut(menuOverlay);
    hideSidebar();
  });
  /*-----------------------------------*/
  /////////////// PC版設定 /////////////
  /*-----------------------------------*/
  function pcSet() {
    hideSidebar();
    body.classList.remove('noscroll');
    mobileSearch.style.display = 'none';
    searchMode = false;
    document.querySelector('.language ul').style.display = 'none';
    // --- 副選單滑出

    menu_liHasChild.forEach((i) => {
      i.addEventListener('mouseenter', (e) => {
        i.classList.add('active');
      });
      i.addEventListener('mouseleave', (e) => {
        i.classList.remove('active');
      });
    });

    menu_liHasChild.forEach((i) => {
      i.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });
  }
  pcSet();

  // --- 切換 PC/Mobile 選單
  function switchMenu() {
    if (windowWidth < windowSmall) {
      setMenuUlHeight();
      mobileMenuSlider();
      mobileSet();
    } else {
      pcSet();
    }
  }

  // --- 展開側邊選單函式
  function showSidebar() {
    sidebar.style = 'display:block;opacity:1';
    mobileArea.style.display = 'block';

    requestAnimationFrame(() => {
      mobileArea.style = `transform: translateX(0px);`;
    });
    setTimeout(() => {
      mobileArea.classList.add('open');
    }, 10);

    body.classList.add('noscroll');
    menuOverlay.classList.add('active');
    mobileSearch.style.display = 'none';
    searchMode = false;
    jsFadeIn(menuOverlay);
  }

  // --- 隱藏側邊選單函式
  function hideSidebar() {
    window.requestAnimationFrame(() => {
      mobileArea.style = `transform: translateX(${mobileAreaOut * -1}px);`;
    });
    setTimeout(() => {
      sidebar.style.display = 'none';
    }, 300);

    mobileArea.classList.remove('open');
    body.classList.remove('noscroll');
    menuOverlay.classList.remove('active');
    asideMenuNextUl.forEach((i) => {
      i.style.height = '0px';
    });

    asideMenuLi.forEach((i) => {
      i.classList.remove('active');
    });
  }
}
MobileMenu();

/*-----------------------------------*/
///////  menu 訊息區塊 sticky  /////////
/*-----------------------------------*/

function Navbar() {
  let windowWidth = window.outerWidth;
  let windowWidthSmall = 768;
  let mainMenu = document.querySelector('.mainMenu');
  let main = document.querySelector('.main');
  let menuHeight = Math.floor(mainMenu.offsetHeight);
  let mainMenuTop = Math.floor(mainMenu.getBoundingClientRect().top + window.scrollY);
  let offsetTop = Math.floor(mainMenuTop) || null;

  // --- 取menu高度
  jsScroll(mainMenuTop);
  jsResize(mainMenuTop);
  reload(mainMenuTop);

  // --- menu 的 sticky函式
  function sticky(mainMenuTop) {
    offsetTop = Math.floor(mainMenuTop) || null;
    // --- 如果 offsetTop 不等於 null 則運行下方函式
    if (offsetTop != null) {
      if (windowWidth >= windowWidthSmall && window.scrollY > offsetTop) {
        mainMenu.classList.add('sticky');
        main.style = `padding-top: ${menuHeight}px`;
      } else {
        mainMenu.classList.remove('sticky');
        main.removeAttribute('style');
      }
    }
  }

  // --- 當 scroll 觸發
  function jsScroll(mainMenuTop) {
    // --- scroll 時執行 menu_stickyNavbar 並請傳入 menu 距離上方的高度的參數
    window.addEventListener('scroll', (e) => {
      sticky(mainMenuTop);
    });
  }

  // --- 當 resize 觸發 判斷 menu的種類
  function jsResize(mainMenuTop) {
    let resizeNavTimer;
    // --- 如果 有 menu 的話 執行固定 menu_stickyNavbar
    window.addEventListener('resize', (e) => {
      // --- 算出 menu 距離上方的高度
      offsetTop = Math.floor(mainMenuTop) || null;
      clearTimeout(resizeNavTimer);
      resizeNavTimer = setTimeout(() => {
        main.removeAttribute('style');
        sticky(offsetTop);
      }, 200);
    });
  }

  function reload(mainMenuTop) {
    offsetTop = Math.floor(mainMenuTop) || null;
    window.onload = sticky(offsetTop);
  }
}
Navbar();

/*-----------------------------------*/
//////////// menu的無障礙tab設定 /////////
/*-----------------------------------*/

function A11yKeyMenu(obj) {
  let mainMenu = document.querySelector('.mainMenu') || null;

  // --- keyup時
  let control = mainMenu.querySelectorAll('li');
  control.forEach((i) => {
    i.addEventListener('keyup', (e) => {
      let siblings = Array.prototype.filter.call(i.parentNode.children, (child) => {
        return child !== i;
      });

      siblings.forEach((x) => {
        x.classList.remove('active');
        x.querySelectorAll('ul').forEach((s) => {
          s.style.display = 'none';
        });
      });
    });
  });

  // --- 不focuse時
  let lastA = mainMenu.querySelectorAll('a').length - 1;
  mainMenu.querySelectorAll('a')[lastA].addEventListener('focusout', () => {
    mainMenu.querySelectorAll('li').forEach((i) => {
      i.classList.remove('active');
    });
  });

  // --- child keyup時
  let childControl = mainMenu.querySelectorAll('li.hasChild > a');

  childControl.forEach((i) => {
    i.addEventListener('keyup', (e) => {
      i.parentNode.querySelector('ul').removeAttribute('style');
      i.parentNode.classList.add('active');
    });
  });
}
A11yKeyMenu();

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
function FatFooter(obj) {
  let name = obj.name || null; // --- 控制的對象

  // --- 點擊時
  name.addEventListener('click', () => {
    toggleFatFooter();
  });

  function toggleFatFooter() {
    const _navUl = name.parentNode.querySelectorAll('nav ul li ul');
    _navUl.forEach((i) => {
      if (i.offsetHeight !== 0) {
        slider.jsSlideUp(i, 300);
        name.innerHTML = '收合/CLOSE';
        name.setAttribute('name', '收合選單/CLOSE');
      } else {
        slider.jsSlideDown(i, 300);
        name.innerHTML = '展開/OPEN';
        name.setAttribute('name', '展開選單/OPEN');
      }
    });
    name.classList.toggle('close');
  }

  window.addEventListener('resize', () => {
    location.reload();
  });
}
FatFooter({
  name: document.querySelector('.btn-fatfooter'),
});

/*-----------------------------------*/
////////////////多組Tab////////////////
/*-----------------------------------*/

function TabFunction() {
  let activeClass = 'active'; //啟動的 class
  let tabSet = document.querySelectorAll('.tabSet'); //tab名稱

  tabSet.forEach((a) => {
    let _tabBtn = a.querySelectorAll('.tabItems button'); //頁籤按鈕
    let _tabBtnLength = _tabBtn.length; //頁籤按鈕數量
    let _tabContent = a.querySelectorAll('.tabContentGroup .tabContent'); //頁籤內容
    _tabBtn[0].classList.add('active');
    _tabContent[0].classList.add('active');

    for (let i = 0; i < _tabBtnLength; i++) {
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
            startTab(i, _tabBtn, _tabContent); //啟動頁籤切換功能
            if (_itemAllA.length) {
              //type number = true，0是false
              _itemFirstA.focus(); //第一個a或是input focus
            } else {
              _tabBtn[i + 1].focus(); //當內容沒有a或是input跳轉下一個tab
            }
          } else if (e.which === 9 && e.shiftKey && !_isFirstTab) {
            e.preventDefault();

            startTab(i - 1, _tabBtn, _tabContent); //啟動頁籤切換功能
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
    mouseClick(_tabBtn, _tabContent, _tabBtnLength);
  });

  // --- 滑鼠點擊事件
  function mouseClick(_tabBtn, _tabContent, _tabBtnLength) {
    for (let i = 0; i < _tabBtnLength; i++) {
      _tabBtn[i].addEventListener(
        'click',
        (e) => {
          startTab(i, _tabBtn, _tabContent);
        },
        false
      );
    }
  }

  function startTab(_now, _tabBtn, _tabContent) {
    if (_tabBtn !== undefined) {
      _tabBtn.forEach((i) => {
        i.classList.remove(activeClass);
      });
      _tabBtn[_now].classList.add(activeClass);
      //頁籤按鈕增加指定class(active)，其他頁籤移除指定class

      _tabContent.forEach((i) => {
        i.classList.remove(activeClass);
      });
      _tabContent[_now].classList.add(activeClass);
      //顯示當下頁籤內，隱藏其他內容
    }
  }
}
TabFunction();

/*-----------------------------------*/
/////////////// FontSize ///////////
/*-----------------------------------*/
function FontSize(obj) {
  let name = obj.name || null; // --- 控制的對象
  let control = obj.control || null; // --- 控制的對象名稱

  // --- 點擊文字大小按鈕
  name.forEach((i) => {
    i.querySelectorAll('a').forEach((i) => {
      // --- 移除 active 的 class 名稱
      function removeActiveClass() {
        let _parentEle = i.parentNode.parentNode;
        _parentEle.querySelectorAll('a').forEach((i) => {
          i.classList.remove('active');
        });
      }
      i.addEventListener('click', (e) => {
        removeActiveClass();
        createCookie('FontSize', `${e.target.className}`, 356);
        addChangeClass(e.target.className);
        jsAddClass(e.target, 'active');
      });
    });
  });

  function addChangeClass(targetName) {
    if (control === null) {
      return;
    }
    switch (targetName) {
      case 'small':
        control.classList.remove('large_size', 'medium_size');
        control.classList.add('small_size');
        break;
      case 'medium':
        control.classList.remove('small_size', 'large_size');
        control.classList.add('medium_size');
        break;
      case 'large':
        control.classList.remove('small_size', 'medium_size');
        control.classList.add('large_size');
        break;
    }
  }

  // --- 創造新的 字體大小設定
  function createCookie(name, value, days) {
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

  // --- 讀取瀏覽器上 字體大小設定
  function readCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // --- 初始化 字體大小設定
  window.onload = (e) => {
    let _cookie = readCookie('FontSize');
    //如果沒有_cookie 則預設值為'medium'
    if (_cookie == null) {
      _cookie = 'medium';
    }
    document.querySelectorAll(`.${_cookie}`).forEach((i) => {
      i.click();
      e.preventDefault();
    });
  };
}
FontSize({
  name: document.querySelectorAll('.font_size'), // --- 按鈕列表名稱
  // --- 更新fontsize切換改為全站通用
  control: document.querySelector('body'), // --- 控制的對象名稱
});

/*-----------------------------------*/
///////////////置頂go to top////////////
/*-----------------------------------*/
function ScrollToTop(obj) {
  let name = obj.name || null; // --- 控制的對象

  function scrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  name.addEventListener('click', (e) => {
    e.preventDefault();
    scrollTop();
  });

  // --- 鍵盤點擊置頂按鈕
  name.addEventListener('keydown', (e) => {
    e.preventDefault();
    scrollTop();
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

  // --- 按鈕出現的函式
  window.addEventListener('scroll', () => {
    let top = window.scrollY;
    if (top > 200) {
      name.style.display = 'block';
      name.style['opacity'] = '1';
      name.style['transition'] = 'all 0.5s';
    } else {
      name.style['opacity'] = '0';
      name.style['transition'] = 'all 0.5s';
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
ScrollToTop({
  name: document.querySelector('.scrollToTop'), // --- 監聽的對象
});

/*-----------------------------------*/
//////// 語言模組 無障礙遊走設定  ////////
/*-----------------------------------*/

class SelectSlider {
  constructor(obj) {
    this.name = obj.name || null; // --- 按鈕列表名稱
    this.control = obj.control || null; // --控制的對象名稱
  }
  // --- 點擊 語言模組
  sliderClick() {
    this.name.forEach((i) => {
      i.addEventListener('click', (e) => {
        e.preventDefault();
        const sliderItem = e.target.nextElementSibling;
        if (sliderItem === null) {
          return;
        } else if (sliderItem.offsetHeight !== 0 || sliderItem.offsetHeight === null) {
          slider.jsSlideUp(sliderItem, 300);
        } else {
          slider.jsSlideDown(sliderItem, 300);
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
          slider.jsSlideDown(sliderItem, 300);
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
        slider.jsSlideUp(sliderItem, 300);
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
        slider.jsSlideUp(sliderItem, 300);
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
  name: document.querySelectorAll('.language'), // --- 控制的對象
  control: document.querySelectorAll('.language a'), // --- 監聽的對象
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
    name: document.querySelectorAll('.share'), // --- 控制的對象
    control: document.querySelectorAll('.share a'), // --- 監聽的對象
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
    const uploadInput = e.target.parentNode.closest('.upload_grp').querySelector('.upload_file');
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
function A11yKeyCode() {
  let search = document.querySelector('.search input[type="text"]');
  let header = document.querySelector('.header .accesskey');
  let main = document.querySelector('.main .accesskey');
  let footer = document.querySelector('footer .accesskey');
  let distance = 0;

  //focus element
  function focusElem(distance, el) {
    if (window.scrollY === distance) {
      el.focus();
    }
  }

  // scroll to element position
  function scrollAnime(distance, el) {
    window.scrollTo({
      top: distance,
      behavior: 'smooth',
    });
    window.addEventListener('scroll', () => {
      focusElem(distance, el);
    });
  }

  // click a11 button
  document.addEventListener('keydown', (e) => {
    switch (e.altKey && e.code) {
      // alt+S 查詢
      case true && 'KeyS':
        scrollAnime(0, search);
        focusElem(0, search);
        break;
      // alt+U header
      case true && 'KeyU':
        scrollAnime(0, header);
        focusElem(0, header);
        break;
      // alt+C 主要內容區
      case true && 'KeyC':
        main.focus();
        let _headerHeight = document.querySelector('header').offsetHeight;
        scrollAnime(_headerHeight, main);
        focusElem(_headerHeight, main);
        break;
      // alt+Z footer
      case true && 'KeyZ':
        let _bodyScrollHeight = document.documentElement.scrollHeight;
        let _bodyClientHeight = document.documentElement.clientHeight;
        let _distance = _bodyScrollHeight - _bodyClientHeight;
        scrollAnime(_distance, footer);
        focusElem(_distance, footer);
        break;
    }
  });
}
A11yKeyCode();

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

function ScrollTables(obj) {
  let name = obj.name || null; // --- 按鈕列表名稱

  //檢查父層有沒有 table_list
  name.forEach((i) => {
    let _hasItem = i.parentElement.classList.contains('table_list');
    if (_hasItem === false) {
      appendEle();
      displayNoneEle();
    }
  });

  //在父層 增加左右兩邊div
  function appendEle() {
    name.forEach((i) => {
      let _appendLeftEle = document.createElement('div');
      _appendLeftEle.setAttribute('class', 'scrolltable-nav scrolltable-nav-left');
      _appendLeftEle.style.height = `${i.parentElement.clientHeight}px`;

      let _appendRightEle = document.createElement('div');
      _appendRightEle.setAttribute('class', 'scrolltable-nav scrolltable-nav-right');
      _appendRightEle.style.height = `${i.parentElement.clientHeight}px`;
      i.parentElement.style.position = 'relative';
      if (i.parentElement.querySelector('.scrolltable-nav-left') === null) {
        i.parentElement.prepend(_appendLeftEle, _appendRightEle);
        //增加左邊按鈕
        let _leftBtn = document.createElement('div');
        _leftBtn.setAttribute('class', 'scrolltable-left-btn');
        _leftBtn.style.marginTop = `${i.parentElement.clientHeight / 2}px`;
        _appendLeftEle.appendChild(_leftBtn);
        //增加右邊按鈕
        let _rightBtn = document.createElement('div');
        _rightBtn.setAttribute('class', 'scrolltable-right-btn');
        _rightBtn.style.marginTop = `${i.parentElement.clientHeight / 2}px`;
        _appendRightEle.appendChild(_rightBtn);
      }
    });
  }

  // 初始化設定
  function displayNoneEle() {
    name.forEach((i) => {
      //父層元素的寬
      let _table = i.parentElement.clientWidth;
      //子層元素的寬
      let _tableItem = i.scrollWidth;
      //左邊遮罩
      let _rightEle = i.parentElement.querySelector('.scrolltable-nav-right');
      //右邊遮罩
      let _leftEle = i.parentElement.querySelector('.scrolltable-nav-left');
      if (_table === _tableItem) {
        _leftEle.style.display = 'none';
        _rightEle.style.display = 'none';
      } else {
        _rightEle.style.display = 'block';
      }
    });
  }

  //當父層滾輪滾動
  name.forEach((i) => {
    i.parentElement.addEventListener('scroll', () => {
      //父層元素的寬
      let _table = i.parentElement.clientWidth;
      //子層元素的寬
      let _tableItem = i.scrollWidth;
      //左邊遮罩
      let _rightEle = i.parentElement.querySelector('.scrolltable-nav-right');
      //右邊遮罩
      let _leftEle = i.parentElement.querySelector('.scrolltable-nav-left');
      //捲軸位置
      let _scrollPosition = i.parentElement.scrollLeft;
      _rightEle.style.right = `-${i.parentElement.scrollLeft}px`;
      _leftEle.style.left = `${i.parentElement.scrollLeft}px`;

      if (_scrollPosition === 0) {
        _leftEle.style.opacity = 0;
        _rightEle.style.opacity = 1;
      }
      //如果捲軸位置還沒到底
      if (_scrollPosition > 0) {
        _leftEle.style.opacity = 1;
      }
      // 如果捲軸位置＋父層寬度 ＝ 子層寬度
      if (_scrollPosition + _table === _tableItem) {
        _rightEle.style.opacity = 0;
        _leftEle.style.opacity = 1;
        _leftEle.style.display = 'block';
      }
      // 如果捲軸位置＋父層寬度 < 子層寬度
      if (_scrollPosition + _table < _tableItem) {
        _rightEle.style.opacity = 1;
      }
    });
  });

  //點擊左右按鈕時滾動畫面
  //點擊左邊按鈕
  const leftBtn = document.querySelectorAll('.scrolltable-left-btn');
  if (leftBtn.length !== 0) {
    leftBtn.forEach((i) => {
      i.addEventListener('click', (item) => {
        i.parentElement.parentElement.scrollLeft -= 200;
      });
    });
  }
  //點擊右邊按鈕
  const rightBtn = document.querySelectorAll('.scrolltable-right-btn');
  if (rightBtn.length !== 0) {
    rightBtn.forEach((i) => {
      i.addEventListener('click', (item) => {
        i.parentElement.parentElement.scrollLeft += 200;
      });
    });
  }
}

ScrollTables({
  name: document.querySelectorAll('table'),
});

/*-----------------------------------*/
////////////// lazy load //////////////
/*-----------------------------------*/
let lazyLoadInstance = new LazyLoad({
  elements_selector: 'img.lazy',
  placeholder: '/images/basic/placeholder.gif',
  effect: 'fadeIn',
  fadeTime: 600,
  threshold: 0,
});

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
