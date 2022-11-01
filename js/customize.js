// -----  基本功能開關   ---------------------------------------------------
topNav(); // 手機版顯示nav選單
navSticky(); // 捲動時固定主選單
fatFooter(); // fatFooter是否要展開
tabFunction(); // tab功能
scrollTables('table'); // table捲動功能
fontSize({
  name: document.querySelectorAll('.fontSize'), // 按鈕列表名稱
  control: document.querySelector('body'), // 控制的對象名稱
});
tableAddDataAttributes({
  elemClass: '.tableList', // 目標table
  dataName: 'title', // tableList樣式 加上 data-title
});

// 手風琴功能
accordionSlider({
  accordionList: '.accordionList', // 問題區塊
  accordionContent: '.accordionContent', // 回答區塊
  accordionInfo: {
    switch: true, // 是否加入開關文字
    open: '展開', // 收合時顯示
    close: '收合', // 展開時顯示
  },
});

// -----  基本功能開關   ---------------------------------------------------

// 自行加入的JS請寫在這裡
(function () {
  //cp輪播
  const cpSwiper = new Swiper('.cpSlider .swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: false,
    // 切換點
    pagination: {
      el: '.cpSlider .swiper-dots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.cpSlider .swiperArrow.next', //自行設定樣式
      prevEl: '.cpSlider .swiperArrow.prev', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 4,
      },
    },
  });

  //大圖輪播
  const sliderSwiper = new Swiper('.mpSlider .swiper', {
    slidesPerView: 1,
    loop: false,
    // 切換點
    pagination: {
      el: '.mpSlider .swiper-dots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.mpSlider .swiperArrow.next', //自行設定樣式
      prevEl: '.mpSlider .swiperArrow.prev', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
  });

  //廣告輪播
  const adSwiper = new Swiper('.adSlider .swiper', {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: false,
    // 切換點
    pagination: {
      el: '.adSlider .swiper-dots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.adSlider .swiperArrow.next', //自行設定樣式
      prevEl: '.adSlider .swiperArrow.prev', //自行設定樣式
      disabledClass: '.adSlider swiperArrow-disabled', //不可點選樣式
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 4,
      },
    },
  });

  //跑馬燈
  const marqueeSwiper = new Swiper('.marquee .swiper', {
    direction: 'vertical',
    // 切換點
    // 切換箭頭
    navigation: {
      nextEl: '.marquee .marquee-arrow.marquee-next', //自行設定樣式
      prevEl: '.marquee .marquee-arrow.marquee-prev', //自行設定樣式
      disabledClass: '.marquee marquee-arrow-disabled', //不可點選樣式
    },
  });
})();
