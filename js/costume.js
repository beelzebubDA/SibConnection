function ajaxUpdate() {
    BX.onCustomEvent('OnBasketChange');
}

function changeCompFav(method, mClass, id, newMethod, addClass = true) {
    $.each($('[data-id="' + id + '"][data-method="' + method + '"][data-class="' + mClass + '"]'), function (i, item) {
        if (addClass) {
            $(item).addClass('_added');
        } else {
            $(item).removeClass('_added');
        }
        $(item).attr('data-method', newMethod);
    });
}

$(document).on('click change submit', '[data-class]', function (e) {
    let mClass = $(this).attr('data-class');
    let method = $(this).attr('data-method');
    let $this = $(this);
    let data = {};
    data['method'] = method;

    switch (e.type) {
        case 'click':
            switch (method) {
                case 'add':
                    data['id'] = $this.attr('data-id');
                    data['quantity'] = 1;
                    break;
                case 'delete':
                    data['id'] = $this.attr('data-id');
                    break;
                case 'favoriteAdd':
                case 'favoriteDelete':
                    data['id'] = $this.attr('data-id');
                    break;
                case 'compareAdd':
                case 'compareDelete':
                    data['id'] = $this.attr('data-id');
                    data['compare_name'] = $this.attr('data-compare');
                    break;
                default:
                    return false;
            }
            break;
        case 'change':
            switch (method) {
                case 'update':
                    data['id'] = $this.attr('data-id');
                    data['quantity'] = $this.val();
                    break;
                default:
                    return false;
            }
            break;
        case 'submit':
        default:
            return false;
    }

    $.ajax({
        url: "/api/sok/ajax/index.php",
        type: "POST",
        dataType: 'json',
        data: {
            action: mClass,
            data: data
        },
        success: function (result) {
            switch (method) {
                case 'update':
                case 'delete':
                    let addContainers = $('.product-basket-' + result.result.product_id);
                    $.each(addContainers, function (i, container) {
                        let addContainer = $(container);
                        let updateInput = addContainer.find('[data-method="update"]');
                        if (result.result.quantity <= 0) {
                            addContainer.removeClass("_active");
                        } else {
                            if (!addContainer.hasClass('_active')) {
                                addContainer.addClass("_active");
                            }
                        }
                        updateInput.attr('data-id', result.result.id);
                        updateInput.val(result.result.quantity);
                    })
                    ajaxUpdate();
                    break;
                case 'add':
                    if (result.result.product !== undefined) {
                        let addContainers = $('.product-basket-' + data['id']);
                        $.each(addContainers, function (i, container) {
                            let addContainer = $(container);
                            let updateInput = addContainer.find('[data-method="update"]');
                            if (!addContainer.hasClass('_active')) {
                                addContainer.addClass("_active");
                            }
                            updateInput.attr('data-id', result.result.product.id);
                            updateInput.val(result.result.product.quantity);
                        });
                    }
                    ajaxUpdate();
                    break;
                case 'favoriteAdd':
                    changeCompFav(method, mClass, data['id'], 'favoriteDelete');
                    ajaxUpdate();
                    break;
                case 'favoriteDelete':
                    changeCompFav(method, mClass, data['id'], 'favoriteAdd', false);
                    ajaxUpdate();
                    break;
                case 'compareAdd':
                    changeCompFav(method, mClass, data['id'], 'compareDelete');
                    ajaxUpdate();
                    break;
                case 'compareDelete':
                    changeCompFav(method, mClass, data['id'], 'compareAdd', false);
                    ajaxUpdate();
                    break;
            }

        }
    });
    return false;
});

$(document).on('change', 'select._sort', function () {
    let sort = $(this).val();
    location.href = location.pathname + '?sort=' + sort;
});

$(document).on('click', '._show-product', function () {
    let productPage = $(this).attr('data-link');
    $.ajax({
        url: productPage,
        type: "POST",
        success: function (result) {
            $(".product-modal .product-modal__slider .product").html(result);
            $(".product-modal").addClass("product-modal--active");
            $("body").addClass("fixed-body");
        },
    });
    return false;
});

function reInitAfterAjax() {
    $(".filter-select select").niceSelect();
    $(".filter-select__check input").change(function () {
        let checkedInputCount = $(this)
            .parents(".filter-select")
            .find(".m-check input:checked").length;
        console.log(checkedInputCount);
        if (checkedInputCount > 0) {
            $(this).parents(".filter-select").find(".count").html(checkedInputCount);
        } else {
            $(this).parents(".filter-select").find(".count").html("");
        }
    });

    if (window.innerWidth > 576) {
        $(".filter-select__field").click(function () {
            $(this).parents(".filter-select").addClass("_active");
        });

        $(document).mouseup(function (e) {
            var div = $(".filter-select__dropdown");
            if (!div.is(e.target) && div.has(e.target).length === 0) {
                if ($(div).parents(".filter-select").hasClass("_active")) {
                    $(div).parents(".filter-select").removeClass("_active");
                }
            }
        });
    } else {
        $(".filter-select__field").click(function () {
            $(this).parents(".filter-select").toggleClass("_active");
            $(this).parents(".filter-select").toggleClass("_mob-select");
            $(this).siblings(".filter-select__dropdown").slideToggle();
        });
    };

    document.querySelectorAll(".filter__color span") ? .forEach((span) => {
        span.style.background = span.dataset.color;
    });

    document.querySelectorAll(".filter-select.radio input") ? .forEach((input) => {
        input.addEventListener("change", () => {
            if (input.checked) {
                document.querySelector(".filter-select.radio .count").textContent =
                    input.value;
            }
        });
    });

    $(".views-tab__btn").click(function () {
        let tab = $(this).attr("data-view");
        console.log(tab);
        $(".views-tab__btn").removeClass("_active");
        $(this).addClass("_active");
        $(".catalog-list__view").removeClass("_active");
        $(`.catalog-list__view[data-view="${tab}"]`).addClass("_active");
    });
}

function initPhoneMask() {
    $('.phone input').mask(
        "+7 999 999-9999", {
            autoclear: false
        }, {
            placeholder: "+7             "
        }
    ).attr('type', 'tel');
}

$(document).ready(function () {
    initPhoneMask();
});

BX.addCustomEvent("onAjaxSuccess", function () {
    initPhoneMask();
});

$(document).on('click', ".feedback-nav__btn", function () {
    $(".feedback__add-new").slideToggle();
});

$(document).on('click', ".rating-input__item", function () {
    let ratingItem = parseInt($(this).attr("data-rating-value"));
    $(this).parent(".rating-input").attr("data-total-rating", ratingItem);
    $(this).siblings('[name="UF_COM_RATING"]').val(ratingItem);
});

$(document).on('click', ".cartcalc .ccalc-minus", function () {
    let a = $(this).closest(".cartcalc").find("input").val();
    if (a > 0) {
        let b = +a - 1;
        $(this).closest(".cartcalc").find("input").val(b).change();
        $(this).attr("data-val", b);
    } else {
        $(this).attr("data-val", 0);
        $(this).closest(".cartcalc").find("input").val(a).change();
    }
});

$(document).on('click', ".cartcalc .ccalc-plus", function () {
    let a = $(this).closest(".cartcalc").find("input").val();
    let b = +a + 1;
    $(this).closest(".cartcalc").find("input").val(b).change();
});

$(document).on('click', ".feedback-files__btn", function () {
    let fileInputHtml = `
    <div class="file-input">
    	<input type="hidden" name="UF_COM_FILES[]">
        <input name="fileBlog" type="file">
        <img src="/local/templates/template/img/file.svg" alt="">
        <span class="text16">Прикрепить изображение (не более 1 мб)</span>
    </div>`;
    $(".feedback-files__fields").append(fileInputHtml);
});

$(document).on('change', '[name="fileBlog"]', function () {
    console.log($(this).val());
    let $input = $(this);
    let $form = $input.parents('.feedback-form')
    let file = this.files[0];
    let formData = new FormData();
    formData.append('FILE_UPLOAD', file);
    formData.append('action', 'Tools');
    formData.append('data[method]', 'uploadCommentFile');
    formData.append('data[sessid]', $form.find('[name="sessid"]').val());
    $.ajax({
        url: '/api/sok/ajax/index.php', // Замените на путь к вашему PHP-скрипту для обработки загрузки файла
        type: 'POST',
        data: formData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.result.status === 'success') {
                let fileBlock = $input.parents('.file-input');
                fileBlock.find('[name="UF_COM_FILES[]"]').val(response.result.file_id);
                fileBlock.find('.text16').html(response.result.file_name);
                $form.find('[name="blog_upload_cid"]').val(response.result.blogUploadCid);

            } else {
                alert(response.result.message);
            }
        },
        error: function (xhr, status, error) {
            console.error('Ошибка при загрузке файла: ' + error);
        }
    });
});

$(document).on('click', '[data-modal="orderProductModal"]', function () {
    let productName = $(this).attr('data-name');
    $('[name="form_text_17"]').val(productName);
});

$(document).on('click', '[data-modal="orderModal"]', function () {
    let serviceName = $(this).attr('data-name');
    $('[name="form_text_5"]').val(serviceName);
});