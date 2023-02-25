$(document).ready(function () {

    /**Home Page Hero Slider Start */

    /**Initialize Variables */
    const
        /**Initialize Variables */
        hero_slider_autoplay_timeout = 10000,
        hero_slider = $('.hero .owl-carousel'),
        hero_slider_controls = $('.hero .controls'),
        hsc_counter = hero_slider_controls.children('.counter'),
        hsc_next_btn = hero_slider_controls.children('.next-btn').children('button'),
        hsc_loading_progress = hero_slider_controls.children('.next-btn').children('.shape'),
        /**Add Zero Less Then Ten */
        addZeroLessThenTen = n => (n < 10) ? '0' + n.toString() : n.toString(),
        /**Update Counter Number */
        updateCounter = (total_slides, current_slide) => {
            hsc_counter.children('span').first().text(addZeroLessThenTen(current_slide - 1))
            hsc_counter.children('span').last().text(addZeroLessThenTen(total_slides))
        },
        /**Update Next Button Progress Bar */
        updateProgressBar = () => {
            var hsc_lp_animation_time = hero_slider_autoplay_timeout / 4;
            hsc_loading_progress.children('div').eq(0).css({
                width: "100%",
                transition: `width  ${hsc_lp_animation_time}ms`
            });

            hsc_loading_progress.children('div').eq(1).css({
                height: "105%",
                transition: `height  ${hsc_lp_animation_time}ms`,
                'transition-delay': `${hero_slider_autoplay_timeout / 4}ms`
            });

            hsc_loading_progress.children('div').eq(2).css({
                left: "0%",
                transition: `left  ${hsc_lp_animation_time}ms`,
                'transition-delay': `${hero_slider_autoplay_timeout / 2}ms`
            });

            hsc_loading_progress.children('div').eq(3).css({
                top: "0%",
                transition: `top  ${hsc_lp_animation_time - 500}ms`,
                'transition-delay': `${hero_slider_autoplay_timeout / 4 * 3}ms`
            });
        },
        /**Update Next Button Image */
        updateNextImage = () => {
            next_slide_img_src = hero_slider.find('.owl-item.active').next().find('img').attr('src');
            hsc_next_btn.css("background-image", "url(" + next_slide_img_src + ")")
        },
        /**Update Counter & Next Button */
        updateControls = (e) => {
            updateCounter(e.item.count, e.item.index)
            updateNextImage();
        },
        /**Initialize Animation after page load and after slide change */
        initAnimation = (e) => {
            updateCounter(e.item.count, e.item.index);
            updateProgressBar();
            updateNextImage();
            hero_slider.find('.owl-item.active').find('.wrapper').children('h2,p').addClass('slide-top');
        },
        /**Reset Animation when slide on change */
        resetAnimation = () => {
            hero_slider.find('.owl-item').find('.wrapper').children('h2,p').removeClass('slide-top')
            hsc_loading_progress.children('div').eq(0).css({
                width: 0,
                transition: "width 0s"
            });
            hsc_loading_progress.children('div').eq(1).css({
                height: 0,
                transition: "height 0s"
            });
            hsc_loading_progress.children('div').eq(2).css({
                left: '100%',
                transition: "left 0s"
            });
            hsc_loading_progress.children('div').eq(3).css({
                top: '100%',
                transition: "top 0s"
            });
        };

    /**Initialize Hero Slider */
    hero_slider.owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        dots: false,
        autoplayTimeout: hero_slider_autoplay_timeout,
        autoplaySpeed: hero_slider_autoplay_timeout,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        onInitialized: initAnimation,
        onTranslated: initAnimation,
        onChange: updateControls,
        onTranslate: resetAnimation,
    })

    /**Add next slide event listener */
    hsc_next_btn.click(function () {
        hero_slider.trigger('next.owl.carousel');
    })
    /**Home Page Hero Slider End */


    /**Home Page Products Slider Start */
    const
        /**Initialize Variables */
        product_slider = $('.product .owl-carousel'),
        /**Initialize Animation after page load and after slide change */
        InitializeProductSliderAnimation = () => {
            product_slider.find('.slide').removeClass('first last')
            product_slider.find('.owl-item.active').first().children('.slide').addClass('first')
            product_slider.find('.owl-item.active').last().children('.slide').addClass('last')
            product_slider.find('.owl-item.active.center').find('.dis').addClass('slide-top')
        };

    product_slider.owlCarousel({
        items: 3,
        margin: 0,
        loop: true,
        center: true,
        nav: false,
        autoplay: false,
        dots: false,
        onInitialized: InitializeProductSliderAnimation,
        onDragged: InitializeProductSliderAnimation,
        /**Reset Animation when slide on change */
        onChange: () => product_slider.find('.owl-item').find('.dis').removeClass('slide-top'),
    })
    /**Home Page Products Slider End */


    /**Header Menu Toggle Button Start */
    $('.toggle-btn').click(function (e) {
        $('header menu ul').slideToggle();
    });
    /**Header Menu Toggle Button End */
})