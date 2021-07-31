$(function(){
	changesTabsOperation();	
});
function changesTabsOperation(){
	parentLinks = $("#c-cOptionsMarket");
	links = parentLinks.find("a");
	parentItems = $("#c-cTabsItem");
	items = $(".cont-MainCamelLog--c--cOptionsMarket--cont--cTabsItem--item");
	links.eq(0).add(items.eq(0)).addClass("active");
	parentLinks.on("click", "a", function(){
		var t = $(this);
		var ind = t.index();
		t.add(items.eq(ind)).addClass("active").siblings().removeClass("active");
	});
}