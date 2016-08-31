var EMOJIS = 1037;
var ROWS = 5;
activeTags = [1,8,462];

$(document).ready(function(){
	createEmojiTable();
	createEmojiImages();
	$("#emojiTable").css("visibility","visible");
});

function createEmojiTable(){
	for(row = 1; row <= ROWS; row++){
		var str = "<tr>";
		for(col = 1; col <= Math.ceil(EMOJIS/ROWS); col++){
			var id = (col-1)*ROWS + row;
			str += "<td id='emoji" + id.toString() + "' class=";
			if (isActive(id)) {
				str += "'active'";
			} else {
				str += "'inactive'";
			}
			str += "><div class='overlay'></div></td>";
		};
		str += "</tr>";
		$("#emojiTable").append(str)
	};	
};

function createEmojiImages(){
	for(i=1; i<=EMOJIS; i++){
		var id = "#emoji" + i.toString();
		var imageid = "";
		if (i < 10) {
			imageid = "00" + i.toString();
		} else if (i < 100) {
			imageid = "0" + i.toString();
		} else {
			imageid = i.toString();
		}

		$(id).css("background-image","url('Images/iOS/" + imageid + ".png')");
	};
};

function isActive(tag){
	i = $.inArray(tag, activeTags);
	return (i >= 0);
};