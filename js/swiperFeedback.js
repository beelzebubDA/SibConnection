let showMoreTextLink = $(".feedback__main__item-showMore-link");
let showMoreText = $(".feedback__main__item-text");
let showMobText = $(".feedback__main__item-text-mobile");

showMoreTextLink.on("click", (e) => {
    e.preventDefault();
    showMoreText.toggleClass("showtext");
    showMobText.toggleClass("showtext");
    showMoreTextLink.toggleClass("opened");

    if (showMoreTextLink.hasClass("opened")) {
        showMoreTextLink.text("Свернуть");
    } else {
        showMoreTextLink.text("Далее");
    }
});

// раскрывающийся комментарии

let showMoreCommentBtn = $(".feedback__main__item__comments-showMorecomments");
let showMoreCommentBlock = $(".feedback__main__item__comments-bottom-side");
let btnTopside = $(".feedback__main__item__comments-top-side");

showMoreCommentBtn.each(function (btn) {
    $(this).on("click", (e) => {
        e.preventDefault();
        $(this).parent().toggleClass("opened");
        $(this).parent().parent().find(showMoreCommentBlock).toggleClass("showComments");
    });
});

// like or dislike
let likeAndDislikeMain = $(".feedback__main__item__comments__shapes a")
likeAndDislikeMain.each( function (btn) { 
    $(this).on("click", (e) => {
        e.preventDefault(); 
        $(this).addClass("okay");
        $(this).parent().find("a").not($(this)).removeClass("okay");
    });
});

let likeAndDislikeBlock = $(".feedback__main__item__comments-anothers__shapes");
let likeAndDislikeComment = $(".feedback__main__item__comments-anothers__shapes a");
likeAndDislikeComment.each( function (btn) { 
    $(this).on("click", (e) => {
        e.preventDefault(); 
        $(this).addClass("okay");
        $(this).parent().find("a").not($(this)).removeClass("okay");
    });
});

// addComments to comment
let addCommentsBtn = $(".feedback__main__item__comments-anothers__addBtn");
let addCommentsBlock = $(".feedback__main__item__comments__add-comments.feedback__main__item__comments-anothers__add-comments");
addCommentsBtn.each( function (btn) {
    $(this).on("click", (e) => {
        e.preventDefault(); 
        $(this).toggleClass("commenting");
        $(this).parent().parent().find('.feedback__main__item__comments__add-comments').toggleClass('commenting')
    });
});

// другие элементы

if ($(window).width()>580) {

    $('.filter-select__field.changed').before().on('click',function(e){
        console.log(e.target)
    })

    let filterField = $(".filter-select__field");

    filterField.each( function (index,field,array) {
        if(field){
            let brotherDropdown = $(field).parent().find('.filter-select__dropdown');

            if($(brotherDropdown).find('.filter-fromto').length <= 0){
                brotherDropdown.on('click',function(e){
                    // e.preventDefault();
                    // filterField.addClass('changed')
                    if($(this).find('input[type=checkbox]:checked,input[type=radio]:checked').length > 0){
                        $(field).addClass('changed');
                    }else{
                        $(field).removeClass('changed');
                    }
                })
            }
        }
    });

    let filterPriceFrom = $('.filter-fromto input[name=from]');
    let filterPriceTo = $('.filter-fromto input[name=to]');

    if(filterPriceFrom){
        filterPriceFrom.on('input',function(e){
            e.preventDefault();
            
            if(filterPriceFrom.val() != '' || filterPriceTo.val() != ''){
                $('.filter-fromto').parent().parent().find('.filter-select__field').addClass('changed')
            }else{
                $('.filter-fromto').parent().parent().find('.filter-select__field').removeClass('changed')
            }
        })
    }

    if(filterPriceTo){
        filterPriceTo.on('input',function(e){
            e.preventDefault();
            
            if(filterPriceFrom.val() != '' || filterPriceTo.val() != ''){
                $('.filter-fromto').parent().parent().find('.filter-select__field').addClass('changed')
            }else{
                $('.filter-fromto').parent().parent().find('.filter-select__field').removeClass('changed')
            }
        })
    }

    let filterNiceSelect = $(".filter-select.filter-nice-select");
    filterNiceSelect.on('click', () => {
        let niceSelectedBlock = $(".filter-select.filter-nice-select .nice-select");
        if (niceSelectedBlock.hasClass("changed")) {
            filterNiceSelect.addClass("changed");
        } else {
            filterNiceSelect.removeClass("changed");
        }
    });

} else if ($(window).width()<580) {
    let filterCheckboxes = $(".filter.filter__mobile .filter-select__dropdown .filter-select__check input");

    filterCheckboxes.each(function (checkbox) {
        $(this).on("click", () => {
            $(this).toggleClass("checked");
            if ($(this).hasClass("checked")) {
                $(this).parent().find("label").addClass("checked");
            } else {
                $(this).parent().find("label").removeClass("checked");
            }
        });
    });
}

let niceSelects = $(".filter-select .nice-select");
let niceSelectCurrent = $(".filter-select .nice-select span");

niceSelects.each( function (select) {
    $(this).on("click", () => {
        if ($(this).find("option").attr("data-value") === "1") {
            $(this).removeClass("changed");
        } else {
            $(this).addClass("changed");
        }
    });
});

let filterAcceptBtn = $(".filter__btn.filter-accept-btn");
let filterReset = $(".filter__btn.filter__mobile-resetBtn");
let filterForm = $(".filter__form");

filterForm.on("change", () => {
    filterForm.addClass("filterChanged");

    if (filterForm.hasClass("filterChanged")) {
        filterAcceptBtn.addClass("changing");
        filterReset.removeClass("_mob-hide");
    } else {
        filterAcceptBtn.removeClass("changing");
        filterReset.addClass("_mob-hide");
    }
});

filterReset.on("click", (e) => {
    e.preventDefault();
    filterForm[0].reset();
    filterReset.addClass("_mob-hide");
    filterAcceptBtn.removeClass("changing");
    $(".filter.filter__mobile .filter-select__dropdown .filter-select__check input").removeClass("checked");
    $(".filter.filter__mobile .filter-select__dropdown .filter-select__check label").removeClass("checked");
});


let feedbackTextareas = $(".feedback-main__items textarea");

feedbackTextareas.each( function (area) {
    $(this).on("click", () => {
        $(this).toggleClass("changed");
    });
});

let showFeedbackBlock = $(".showBLock-btn");
let feedbackRewNotBlock = $(".feedback__RewNot-block");
let feedbackRewYesBlock = $(".feedback__RewYes-block");

showFeedbackBlock.on("click", () => {
    feedbackRewNotBlock.toggleClass("hidden");
    feedbackRewYesBlock.toggleClass("hidden");
});

// $(window).resize(function(){
//     if ($(window).width()>576) {

//     };
// });

let feedbackTopSwipper = new Swiper(".swiper.feedback__top-swipper-block", {
    slidesPerView: 8,
    spaceBetween: 10,
    clickable: true,
    keyboard: {
        enabled: true,
    },
    navigation: {
        nextEl: '.swiper-topButton-next',
        prevEl: '.swiper-topButton-prev',
        clickable: true
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    scrollbar: {
        el: ".swiper-scrollbar",
    },
    breakpoints: {
        320: {
            slidesPerView: 2.1,
            spaceBetween: 5,
        },
        414: {
            slidesPerView: 2.5,
            spaceBetween: 10,
        },
        640: {
            slidesPerView: 5.2,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 5.5,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 5.2,
            spaceBetween: 10,
        },
        1366: {
            slidesPerView: 8,
            spaceBetween: 20,
        }
    },
});

let feedbackMainSwipper = new Swiper(".swiper.feedback__main-swipper-block", {
    slidesPerView: 8,
    spaceBetween: 10,
    clickable: true,
    keyboard: {
        enabled: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        clickable: true
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    scrollbar: {
        el: ".swiper-scrollbar",
    },
    breakpoints: {
        320: {
            slidesPerView: 1.9,
            spaceBetween: 10,
        },
        414: {
            slidesPerView: 2.5,
            spaceBetween: 10,
        },
        640: {
            slidesPerView: 3.5,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 3.8,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 4.8,
            spaceBetween: 10,
        },
        1366: {
            slidesPerView: 8,
            spaceBetween: 10,
        }
    },
});