var EMOJIS = 1037;
var ROWS = 5;
var emojiSrc = "iOS";
var spammable = false;

activeTags = [];
colBreaks = [204,351,418,475,590,768,EMOJIS];

var ios_score = 0;
var msg_score = 0;
var sams_score = 0;

$(document).ready(function(){
	makePost(1,"2016-08-29",0,2,1,2,"");
	makePost(462,"2016-08-30",2,1,0,1,"");
	makePost(8,"2016-08-31",1,2,0,2,"");
	makePost(70,"2016-09-01",2,0,1,2,"");
	makePost(279,"2016-09-02",2,1,0,2,"");
	makePost(52,"2016-09-03",0,1,2,2,"");
	makePost(711,"2016-09-04",2,1,0,1,"");
	makePost(69,"2016-09-05",1,2,0,2,"");
	makePost(66,"2016-09-06",2,0,1,2,"");
	makePost(184,"2016-09-07",2,0,1,1,"");
	makePost(182,"2016-09-08",0,2,1,1,"");
	makePost(492,"2016-09-09",0,1,2,1,"");
	makePost(1004,"2016-09-10",1,0,2,3,"");

	makeScoreMessage();

	var headerHeight = document.getElementById("header").scrollHeight;
	$("#header").scrollTop(headerHeight);

	createEmojiTable();
	createEmojiImages();

	$("#emojiTable").css("visibility","visible");

	$(".active").click(function(){
		var tag = this.id.substring(5);
		openPost(tag);
	});

	$("#closePost").click(function(){
		$("#post").css("visibility","hidden");
		$("#tempDiv").remove();
	});

	$("#post").click(function(){
		$("#post").css("visibility","hidden");
		$("#postHeader").empty();
		$("#tempDiv").remove();
	})

	$("#postwindow").click(function(){
		event.stopPropagation();
	})
});

function openPost(tag){
	setTxt(tag);

	var headerStr = "<img src='Images/iOS/"+tag+".png'/>" +
					"<img src='Images/Messenger/"+tag+".png'/>" +
					"<img src='Images/Blahsung/"+tag+".png'/>";

	$("#postHeader").append(headerStr);

	var pageH = $(window).height();
	var pageW = $(window).width();
	if (pageW < pageH) {
		$("#postHeader").css({"display":"block","width":"90%","height":"40%","float":"top"});
		$("#postHeader img").css({"height":"auto","width":"32%"});
		$("#postContent").css({"width":"90%","height":"40%","float":"bottom"});
	} else {
		$("#postHeader").css({"display":"inline","width":"40%","height":"90%","float":"left"});
		$("#postHeader img").css({"height":"32%","width":"auto"});
		$("#postContent").css({"width":"40%","height":"90%","float":"right"});
	}

	$("#post").css("visibility","visible");
}

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
		$(id).css("background-image","url('Images/" + emojiSrc + "/" + i.toString() + ".png')");
	};
};

function isActive(tag){
	i = $.inArray(tag, activeTags);
	return (i >= 0);
};

function getAnswer(){
	var inputField = document.getElementById("userInput")
	var input = inputField.value.toLowerCase();
	inputField.value = "";
	console.log(":D");

	if (/^\d+$/.test(input)){
		var inputVal = parseInt(input);
		if (inputVal > 0 && inputVal <= EMOJIS) {
			if (spammable || !($("#tempDiv").length)){
				$("#postwindow").append("<div id='tempDiv'>"+
					"<img class='inputImg' src='Images/iOS/"+inputVal+".png'>" +
					"<img class='inputImg' src='Images/Messenger/"+inputVal+".png'>" +
					"<img class='inputImg' src='Images/Blahsung/"+inputVal+".png'></div>");
				$("#postwindow .inputImg").css({
					"width":"24vmin",
					"height":"24vmin",
					"margin":"1vmin"
				});
				$("#tempDiv").css({
	    			"position":"absolute",
	    			"top":"50%",
	    			"left":"50%",
	    			"margin-right":"-50%",
				    "transform":"translate(-50%, -50%)"
				});
				$("#post").css("visibility","visible");
			}
		}
		return
	}

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
			break

		case "spam":
			spammable = true;
			break
		
		case "random":
			var a = random(0,1037)
			while ( $.inArray(a,activeTags) >= 0){
				a = random(0,1037)
			}
			alert(a.toString())
			break

		case "ios":
		case "apple":
			updateEmojiSrc("iOS")
			break

		case "messenger":
		case "facebook":
		case "fbm":
			updateEmojiSrc("Messenger")
			break

		case "samsung":
		case "blahsung":
			updateEmojiSrc("Blahsung")
			break
	}

};

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateEmojiSrc(src){
	emojiSrc = src;
	createEmojiImages();
	$("#feed img").each(function(){
		var str = "Images/" + src + $(this).attr("src").match(/\/\d+\.png$/)
		$(this).attr("src",str);
	})
}


function makePost(tag, dateStr, iosScore, msgScore, samsScore, weight, text){
	activeTags.push(tag);
	ios_score += iosScore * weight;
	msg_score += msgScore * weight;
	sams_score += samsScore * weight;

	makeFeedMessage(tag, dateStr);
}

function makeFeedMessage(tag, dateStr){
	var messageStr = "<div class='post'><p>" + dateStr + "</p><div class='sentMessage'>";

	var randomNum = random(1,10);
	for (i=0; i<randomNum; i++){
		messageStr += "<img src='Images/" + emojiSrc + "/" + tag.toString() + ".png'>"
	}
	messageStr += "</div></div>";

	$("#feed").append(messageStr);
}

function makeScoreMessage(){
	var messageStr = "<p>Emojis: " + activeTags.length + "</p>";

	var iosStr = "iOS: " + ios_score.toString();
	var msgStr = "Messenger: " + msg_score.toString();
	var samsStr = "Samsung: " + sams_score.toString();

	messageStr += "<p>" + iosStr + "&nbsp&nbsp&nbsp" + msgStr + "&nbsp&nbsp&nbsp" + samsStr + "</p>"
	$("#score").append(messageStr);
}

function setTxt(postN){
	$("#date").replaceWith("<p id=\"date\">  </p>");
	$("#description").replaceWith("<p id=\"description\"> </p>");
	$("#weight").replaceWith("<p id=\"weight\"> </p>");
  $.ajax({
    url:"Posts/"+ postN + ".txt",
    success: function (data){
    	facts = data.split('\n');
    	$("#date").replaceWith("<p id=\"date\">" + facts[1]+ "</p>");
		$("#description").replaceWith("<p id=\"description\">" + facts[6] + "</p>");
		$("#weight").replaceWith("<p id=\"weight\">" + "Vikt: " +facts[2]+ "</p>");
		//$("#score").replaceWith(sscore);
    }
  });
}
