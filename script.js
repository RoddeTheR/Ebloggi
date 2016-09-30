var EMOJIS = 1037;
var ROWS = 5;
var emojiSrc = "iOS";
var spammable = false;

activeTags = [];
colBreaks = [204,351,418,475,590,768,EMOJIS];
var posts = new Array(EMOJIS);

var ios_score = 0;
var msg_score = 0;
var sams_score = 0;

$(document).ready(function(){
	$("body").css("visibility","hidden");

	readScoreFile();

	$(document).ajaxStop(function () {
    	initPage();
  	});


	$("#closePost").click(function(){
		closePost();
	});

	$("#post").click(function(){
		closePost();
	})

	$("#postwindow").click(function(){
		event.stopPropagation();
	})
});



function readScoreFile(){
	$.ajax({
    	url:"Posts/output.txt",
    	success: function (data){
    		facts = data.split('\n');
    		activeTags = facts[0].slice(0, -1).split(',').map(Number);
    		ios_score = parseInt(facts[1]);
    		msg_score = parseInt(facts[3]);
    		sams_score = parseInt(facts[2]);

    		makePostObject();
       	}
    });
}

function makePostObject(){
	for (var i = 0; i < activeTags.length; i++) {
    	  $.ajax({
    		url:"Posts/"+ activeTags[i] + ".txt",
    		success: function (raaa){
    			facts = raaa.split('\n');
    			var p = {
    				number : facts[0],
    				date   : facts[1],
    				weight : facts[2],
    				aScore : facts[3],
    				mScore : facts[4],
    				sScore : facts[5],
    				desc   : facts[6]
    			};
    			posts[p.number] = p;
    		}
		});
	}
}

function initPage(){
	makeFeed();
	makeScoreMessage();
	var headerHeight = document.getElementById("header").scrollHeight;
	$("#header").scrollTop(headerHeight);

	createEmojiTable();
	createEmojiImages();
	$("#emojiTable").css("visibility","visible");
	$("body").css("visibility","visible");

	$(".active").click(function(){
		var tag = this.id.substring(5);
		openPost(tag);
	});

	$(".sentMessage").click(function(){
		var tag = this.id.substring(7);
		openPost(tag);
	});
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
		if($.inArray(i, activeTags) == -1){
			$(id).css("background-image","url('BWImages/" + emojiSrc + "/" + i.toString() + ".png')");
		}else{
			$(id).css("background-image","url('Images/" + emojiSrc + "/" + i.toString() + ".png')");
		}
	};
};

function isActive(tag){
	i = $.inArray(tag, activeTags);
	return (i >= 0);
};




function makeFeed(){
	var temp = posts.slice();
	temp.sort(function(a, b) { 
    	return new Date(a.date) - new Date(b.date);
	})
	for (var i = 0; i <activeTags.length; i++){
		makeFeedMessage(temp[i])
	}
}

function makeFeedMessage(oo){
	var messageStr = "<div class='post'><p>" + oo.date + "</p><div class='sentMessage' id='message"+ oo.number + "'>";

	var randomNum = random(1,10);
	for (i=0; i<randomNum; i++){
		messageStr += "<img src='Images/" + emojiSrc + "/" + oo.number.toString() + ".png'>"
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





function openPost(tag){
	setTxt(tag);

	var headerStr = "<img src='Images/iOS/"+tag+".png'/>" +
					"<img src='Images/Messenger/"+tag+".png'/>" +
					"<img src='Images/Blahsung/"+tag+".png'/>";

	$("#postHeader").append(headerStr);

	var pageH = $(window).height();
	var pageW = $(window).width();
	if (pageW < pageH) {
		$("#postHeader").css({"float":"none","width":"72vw","height":"24vw"});
		$("#postHeader img").css({"display":"inline","margin":"1vmin"});
		$("#postContent").css({"width":"72vw","float":"none","position":"static","top":"0","-ms-transform":"none","-webkit-transform":"none","transform":"none"});
		$("#postStuff").css({"position":"relative","top":"40vh","-ms-transform":"translate(0,-50%)","-webkit-transform":"translate(0,-50%)","transform":"translate(0,-50%)"});
	} else {
		$("#postHeader").css({"float":"left","width":"24vw","height":"70vh"});
		$("#postHeader img").css({"display":"block","margin":"1vmin auto"});
		$("#postContent").css({"width":"48vw","float":"right","position":"relative","top":"35vh","-ms-transform":"translate(0,-50%)","-webkit-transform":"translate(0,-50%)","transform":"translate(0,-50%)"});
		$("#postStuff").css({"position":"static","top":"0","-ms-transform":"none","-webkit-transform":"none","transform":"none"});
	}

	$("#post").css("visibility","visible");
}

function setTxt(m){
	var n = posts[m]
   	sscore = "iOS: " + n.aScore*n.weight  +  "&nbsp&nbsp&nbsp Messenger: "+ n.mScore*n.weight + "&nbsp&nbsp&nbsp Samsung: " + n.sScore*n.weight ;
    $("#date").replaceWith("<p id=\"date\">" + n.date+ "</p>");
	$("#description").replaceWith("<p id=\"description\">" + n.desc + "</p>");
	$("#weight").replaceWith("<p id=\"weight\">" + "Vikt: " +n.weight+ "</p>");
	$("#sscore").replaceWith("<p id=\"sscore\">"+ sscore + "</p>");
}

function closePost(){	
	$("#post").css("visibility","hidden");
	$("#postHeader").empty();
	$("#date").empty();
	$("#description").empty();
	$("#weight").empty();
	$("#sscore").empty();
	$("#tempDiv").remove();
}





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
