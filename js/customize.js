// 自行加入的JS請寫在這裡
(function () {
  //cp輪播
  const cpSwiper = new Swiper('.cp_slider .swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: false,
    // 切換點
    pagination: {
      el: '.cp_slider .swiper-dots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.cp_slider .swiper-arrow.swiper-next', //自行設定樣式
      prevEl: '.cp_slider .swiper-arrow.swiper-prev', //自行設定樣式
      disabledClass: 'swiper-arrow-disabled', //不可點選樣式
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
      nextEl: '.mpSlider .swiper-arrow.swiper-next', //自行設定樣式
      prevEl: '.mpSlider .swiper-arrow.swiper-prev', //自行設定樣式
      disabledClass: 'swiper-arrow-disabled', //不可點選樣式
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
      nextEl: '.adSlider .swiper-arrow.swiper-next', //自行設定樣式
      prevEl: '.adSlider .swiper-arrow.swiper-prev', //自行設定樣式
      disabledClass: '.adSlider swiper-arrow-disabled', //不可點選樣式
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
