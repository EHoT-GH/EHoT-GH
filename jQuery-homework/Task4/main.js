$.fn.extend({
	trunc: function (maxLength) {
		var linkText = "  . . .";
		var onLinkClicked = function () {
			var element = $(this);
			var hiddenText = element.attr("hiddenText");
			element.parent().append(hiddenText);
			element.remove();
		};
		return this.each(function () {
			var element = $(this);
			var fullText = element.text();
			if (maxLength < 0 || fullText.length < maxLength) {
				//alert("value should be > 0 and <" + (fullText.length-1));
				return;
			}
			var visibleText = fullText.slice(0, maxLength);
			var hiddenText = fullText.slice(maxLength, fullText.length);
			var openLink = $("<a>", {
				text: linkText,
				href: '#',
				click: onLinkClicked,
				hiddenText: hiddenText
			});
			element.html(visibleText);
			element.append(openLink);
		});
	}
});

$("p").trunc(200);