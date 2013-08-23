// PowerPlaceholder v1.0.0
// (c) sujiantao - http://www.sujiantao.com/
// License: No license, you can use or modify it as you want 

(function ($) {
	"use strict";
	var defaults = {
		initOpacity: 0.4,
		focusOpacityDiff: 0.3,
		overlayedClass: "jq-field-overlayed",
		overlayClass: "jq-field-overlay",
		actualOverlayClass: "jq-overlay-text",
		directions: ["left", "right", "top", "bottom"]
	};
	function copyStyles(oriEle, newEle, styles) {
		for (var i = 0; i < styles.length; i++) {
			var style = styles[i];
			try {
				if (/\*/.test(style)) {
					for (var l = 0; 4 > l; l++) {
						var o = style.replace(/\*/g, defaults.directions[l]), p = oriEle.css(o);
						newEle.css(o, p);
					}
				} else {
					newEle.css(style, oriEle.css(style));
				}

			} catch (q) {
			}
		}
	}

	function setOverlay(input, isEmptyFunc, isFocus) {
		var overlay, overlaystr, width, height, topdif, overlaytop, leftdif, overlayleft, h;
		if (input.is(":visible")) {
			h = $.browser.msie ? 0 : defaults.initOpacity;
			if (isEmptyFunc()) {
				input.css("opacity", h + (isFocus ? defaults.focusOpacityDiff : 0));
				input.addClass(defaults.overlayedClass);
				overlay = input.prev("." + defaults.actualOverlayClass);
				if (0 === overlay.length) {
					overlaystr = input.next("." + defaults.actualOverlayClass).text();
					width = input.width();
					height = input.height();
					overlay = input.clone().prop("className", defaults.actualOverlayClass).attr("name", null).attr("id", null).attr("disabled", "disabled").css({ position: "absolute", backgroundColor: "white", color: "black", "-webkit-text-fill-color": "black", opacity: 1, width: width, height: height });
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
				input.css("opacity", 1).css("filter", "").removeClass(defaults.overlayedClass);
			}
		}
	}

	var methods = {
		genericBindOverlayEvents: function (input, isEmptyFunc) {
			input.bind("keydown contextmenu", function () {
				methods.hideHelpOverlay(input);
			}).focus(function () {
				setOverlay(input, isEmptyFunc, true);
			}).blur(function () {
				setOverlay(input, isEmptyFunc);
			}).each(function () {
				setOverlay(input, isEmptyFunc);
			});
		},
		hideHelpOverlay: function (input) {
			input.css("opacity", 1);
			input.css("filter", "");
			input.removeClass(defaults.overlayedClass);
		}
	};

	$.fn.powerPlaceholder = function () {
		return this.each(function () {
			var item = $(this);
			methods.genericBindOverlayEvents(item, function () { return "" === item.val(); });
		});
	};

})(jQuery);