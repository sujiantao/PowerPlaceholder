// PowerPlaceholder v1.0.0
// (c) sujiantao - http://www.sujiantao.com/
// License: No license, you can use or modify it as you want 

(function ($) {
	"use strict";
	var settings = {
		overlayedClass: "jq-field-overlayed",
		overlayClass: "jq-field-overlay",
		directions: ["left", "right", "top", "bottom"]
	};
	function copyStyles(oriEle, newEle, styles) {
		for (var i = 0; i < styles.length; i++) {
			var style = styles[i];
			try {
				if (/\*/.test(style)) {
					for (var l = 0; 4 > l; l++) {
						var o = style.replace(/\*/g, settings.directions[l]), p = oriEle.css(o);
						newEle.css(o, p);
					}
				} else {
					newEle.css(style, oriEle.css(style));
				}

			} catch (q) {
			}
		}
	}

	function hideHelpOverlay(input) {
		input.css("opacity", 1);
		input.css("filter", "");
		input.removeClass(settings.overlayedClass);
	}

	function setOverlay(input, ops, isEmptyFunc, isFocus) {
		var overlay, overlaystr, width, height, topdif, overlaytop, leftdif, overlayleft, h;
		if (input.is(":visible")) {
			input.prop('autocomplete', 'off');
			h = $.browser.msie ? 0.2 : ops.initOpacity;
			if (isEmptyFunc()) {
				input.css("opacity", h + (isFocus ? ops.focusOpacityDiff : 0));
				input.addClass(settings.overlayedClass);
				overlay = input.prev("." + settings.overlayClass);
				if (0 === overlay.length) {
					overlaystr = input.next("." + ops.overlayTextClass).text();
					width = input.width();
					height = input.height();
					overlay = input.clone().prop("className", settings.overlayClass).attr("name", null).attr("id", null).attr("disabled", "disabled").css({ position: "absolute", backgroundColor: "white", color: "black", "-webkit-text-fill-color": "black", opacity: 1, width: width, height: height });
					if (overlay.is("textarea,input")) {
						overlay.val(overlaystr);
						copyStyles(input, overlay, ["line-height"]);
					} else {
						overlay.text(overlaystr).css("line-height", height + "px").prepend("&nbsp;");
					}
					copyStyles(input, overlay, ["font-family", "font-size", "text-align"]);
					copyStyles(input, overlay, ["border-*-style", "border-*-color", "border-*-width"]);
					input.css({ zIndex: 1, position: "relative" });
					overlay.insertBefore(input);
					topdif = input.offset().top - overlay.offset().top;
					if (0 !== topdif) {
						overlaytop = parseInt(overlay.css("margin-top"), 10);
						topdif = overlaytop + topdif;
						if (!input.is("textarea")) {
							topdif = parseInt(overlay.prevAll(":visible").eq(0).css("margin-bottom"), 10) + overlaytop;
						}
						overlay.css("margin-top", topdif);
					}
					leftdif = input.offset().left - overlay.offset().left;
					if (0 !== leftdif) {
						overlayleft = parseInt(overlay.css("margin-left"), 10);
						overlay.css("margin-left", overlayleft + leftdif);
					}
				}
			} else {
				input.css("opacity", 1).css("filter", "").removeClass(settings.overlayedClass);
			}
		}
	}

	$.fn.powerPlaceholder = function (options) {
		var ops = $.extend({}, $.fn.powerPlaceholder.defaults, options);
		return this.each(function () {
			var item = $(this);
			item.bind("keydown contextmenu", function () {
				hideHelpOverlay(item);
			}).focus(function () {
				setOverlay(item, ops, function () { return "" === item.val(); }, true);
			}).blur(function () {
				setOverlay(item, ops, function () { return "" === item.val(); });
			}).each(function () {
				setOverlay(item, ops, function () { return "" === item.val(); });
			});
		});
	};

	$.fn.powerPlaceholder.defaults = {
		initOpacity: 0.4,
		focusOpacityDiff: 0.2,
		overlayTextClass: "jq-overlay-text"
	};
})(jQuery);