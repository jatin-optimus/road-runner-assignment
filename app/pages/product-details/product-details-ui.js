define([
    '$',
    'dust!components/scroller/scroller',
    'global/utils',
    'magnifik',
    'translator',
    'hijax',
    'bellows',
    'components/sheet/sheet-ui',
    'dust!components/scroller/scroller',
    'pages/product-details/ui/reviews-ui'
], function($, ScrollerTemplate, Utils, Magnifik, translator, Hijax, bellows, sheet, ScrollerTmpl, reviewsUI) {
    var $addToCartPinny = $('.js-added-to-cart-pinny');
    var $wishlistShade = $('.js-wishlist-shade');

    var reviewSection = function() {
        reviewsUI.addNoRatingsSection();
        reviewsUI.setHeadings();
        reviewsUI.updatePaginationButtons();
    };

    var bindEvents = function() {
        $('body').on('click', '.pr-page-next', function() {
            setTimeout(function() {
                reviewsUI.addNoRatingsSection();
                reviewsUI.setHeadings();
                reviewsUI.updatePaginationButtons();
            }, 1000);
        });
        $('body').on('click', '.pr-page-prev', function() {
            setTimeout(function() {
                reviewsUI.addNoRatingsSection();
                reviewsUI.setHeadings();
                reviewsUI.updatePaginationButtons();
            }, 1000);
        });
        $('body').on('change', '#pr-sort-reviews', function() {
            setTimeout(function() {
                reviewsUI.addNoRatingsSection();
                reviewsUI.setHeadings();
                reviewsUI.updatePaginationButtons();
            }, 1000);
        });
    };

    var interceptAddToCart = function interceptAddToCart() {

        var _override  = window.updateShoppingCartSummary;
        window.updateShoppingCartSummary = function() {
            var override = _override.apply(this, arguments);
            var $modal = $('#addToCartInfo');
            var $content = $('#addToCartInfoCont');
            $content.find('#continueShoppingLink').insertAfter('#viewCartLink');
            $modal.addClass('u-visually-hidden');
            $addToCartPinny.find('.c-sheet__title').html('Added to Cart');
            $addToCartPinny.find('.js-added-to-cart-pinny__body').html($content);
            $addToCartPinny.find('.pinny__close').addClass('container-close');
            if (!$('.js-added-to-cart-pinny').hasClass('js-rendered')) {
                $addToCartPinny.pinny('open');
            }
            $('.js-added-to-cart-pinny').addClass('js-rendered');
            return _override;
        };

    };

    var buildYouMayAlsoLikeCarousel = function() {
        var $container = $('.js-suggested-products');
        var $parsedProducts = [];
        var $heading = $('<h2 class="c-title c--small u-margin-bottom-md">').text('You Might Also Like');
        var productTileData = [];
        setTimeout(function() {
            if ($('#PRODPG1_cm_zone').children().length === 0) {
                buildYouMayAlsoLikeCarousel();
            } else {
                var $items = $('.pdetailsSuggestionsCon');
                var $titles = $items.find('strong').each(function() {
                    var $this = $(this);
                });
                $items.map(function(_, item) {
                    var $item = $(item);
                    var $content = {
                        slideContent :$item
                    };
                    $parsedProducts.push($content);
                });
                var scrollerData = {
                    slideshow: {
                        slides: $parsedProducts
                    }
                };

                new ScrollerTemplate(scrollerData, function(err, html) {
                    $container.empty().html(html);
                });

                $container.prepend($heading);
            }
        }, 500);
        $('#pdetails_suggestions').addClass('u-visually-hidden');
    };

    var productDetailsUI = function() {
        buildYouMayAlsoLikeCarousel();
        reviewSection();
        bindEvents();
        interceptAddToCart();
        $('body').on('click', '#continueShoppingLink', function() {
            var $closeButton = $addToCartPinny.find('.pinny__close');
            $closeButton.click();
        });
        sheet.init($addToCartPinny, {
            zIndex: 2000,
            shade: {
                zIndex: 1999,
                cssClass: 'js-wishlist-shade'
            },
            closed: function() {
                $('#addToCartInfo_mask').css('display', 'none');
                $('.js-added-to-cart-pinny').removeClass('js-rendered');
            }
        });
    };

    return productDetailsUI;
});
