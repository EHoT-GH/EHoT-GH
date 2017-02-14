$("#showr").click(function () {
	$("#showr").hide(4200);
	$("div:eq(0)").show("fast", function () {
    // use callee so don't have to name the function
    $(this).next().show(42, arguments.callee);
    $("#showr").hide(42);
});
});