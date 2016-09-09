var EMOJIS = 1037;
var ROWS = 5;
activeTags = [1,8,52,70,279,462,711];
colBreaks = [204,351,418,475,590,768,EMOJIS];

$(document).ready(function(){
	createEmojiTable();
	createEmojiImages();
	$("#emojiTable").css("visibility","visible");

	$(".active").click(function(){
		$("#post").css("visibility","visible");
	});

	$("#closePost").click(function(){
		$("#post").css("visibility","hidden");
	});

	$("#post").click(function(){
		$("#post").css("visibility","hidden");
	})

	$("#postwindow").click(function(){
		event.stopPropagation();
	})


	makeFeedMessage(1,"2016-08-29");
	makeFeedMessage(462,"2016-08-30");
	makeFeedMessage(8,"2016-08-31");
	makeFeedMessage(70,"2016-09-01");
	makeFeedMessage(279,"2016-09-02");
	makeFeedMessage(52,"2016-09-03");
	makeFeedMessage(711,"2016-09-04");
	makeFeedMessage(69,"2016-09-05");
	makeFeedMessage(66,"2016-09-06");
	makeFeedMessage(184,"2016-09-07");
	makeFeedMessage(182,"2016-09-08");

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

function getAnswer(){
	var input = document.getElementById("userInput").value.toLowerCase();
	console.log(":D");

	switch (input) {
		case "syjsjysjssikdikdikdikduikduikduikduikduikdikduikduikdui":
			var i = 0;
			while(true){
				console.log(":D");
				i++
				if ( i > 100000){
					break
				}
			}
		
		case "random":
			var a = random(0,1037)
			while ( $.inArray(a,activeTags) >= 0){
				a = random(0,1037)
			}
			alert(a.toString())
	}

};

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function makeFeedMessage(tag, dateStr){
	var messageStr = "<div class='post'><p>" + dateStr + "</p><div class='sentMessage'>";

	var randomNum = random(1,10);
	for (i=0; i<randomNum; i++){
		messageStr += "<img src='Images/iOS/" + tag.toString() + ".png'>"
	}
	messageStr += "</div></div>";

	$("#feed").append(messageStr);
}


function makePost(tag, dateStr, iosRank, msgRank, ssRank, text, weight){
	activeTags.push(tag)
	makeFeedMessage(tag, dateStr);
}