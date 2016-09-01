var EMOJIS = 1037;
var ROWS = 5;
activeTags = [1,8,70,462];
colBreaks = [204,351,418,475,590,768,1037];

$(document).ready(function(){
	createEmojiTable();
	createEmojiImages();
	$("#emojiTable").css("visibility","visible");

	$(".active").click(function(){
		$("#post").css("visibility","visible");
	});

	$("#closePost").click(function(){
		$("#post").css("visibility","hidden");
	})
});

function createEmojiTable(){
	// Create rows
	for (row = 1; row <= ROWS; row++){
		$("#emojiTable").append("<tr id='row" + row.toString() + "'></tr>");
	}

	// Create columns
	var emojiTag = 1
	while (emojiTag <= EMOJIS) {
		for (row = 1; row <= ROWS; row++){
			str = "<td id='emoji" + emojiTag.toString() + "' class=";
			if (isActive(emojiTag)) {
				str += "'active'";
			} else {
				str += "'inactive'";
			}
			str += "><div class='overlay'></div></td>";

			$("#emojiTable #row" + row.toString()).append(str);

			if ($.inArray(emojiTag, colBreaks) >= 0){
				row++;
				while (row <= ROWS){
					$("#emojiTable #row" + row.toString()).append("<td></td>");
					row++;
				}
			}

			emojiTag++;
		}
	}
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