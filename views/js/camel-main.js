(function ($) {
"use strict";



// meanmenu
$('#mobile-menu').meanmenu({
	meanMenuContainer: '.mobile-menu',
	meanScreenWidth: "991",
	meanMenuOpen:"<span></span><span></span><span></span>",
});

// sticky
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$("#header-sticky").removeClass("sticky-header");
		$(".stricky-height-fix").removeClass("menufix-height");
	} else {
		$("#header-sticky").addClass("sticky-header");
		$(".stricky-height-fix").addClass("menufix-height");
	}
});

// sticky menu jump fix
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$(".stricky-height-fix").removeClass("menufix-height");
	} else {
		$(".stricky-height-fix").addClass("menufix-height");
	}
});

// data - background
$("[data-background]").each(function () {
	$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
})




})(jQuery);