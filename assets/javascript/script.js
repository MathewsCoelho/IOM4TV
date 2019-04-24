//	ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56,	NINE: 57,
let TVkeyCodes = {
	UP: 40,
	DOWN: 38,
	OPEN_CLOSE_LIB: 48,
	OK: 13,
	LEFT: 37,
	RIGHT: 39,
	SEND_VIDEO: 8,
	CLOSE_LIB: 0
}

let parametros = {
	"keyCode" : ''
};

function trocaCanal($funcao){
	console.log("Você trocou de canal para " + $funcao + ".");
	if($funcao == 'esquerda'){
		parametros.keyCode = TVkeyCodes['UP'];
	}
	else if($funcao == 'direita'){
		parametros.keyCode = TVkeyCodes['DOWN'];
	}
	sendRequest();
}


function trocaVideo($funcao){
	console.log("Você trocou de video para " + $funcao + ".");
	if($funcao == 'esquerda'){
		parametros.keyCode = TVkeyCodes['LEFT'];
		console.log("Keycode " + TVkeyCodes['LEFT'] + ".");
	}
	else if($funcao == 'direita'){
		parametros.keyCode = TVkeyCodes['RIGHT'];
		console.log("Keycode " + TVkeyCodes['RIGHT'] + ".");
	}
	sendRequest();
}

$('.library').click(function(){
	console.log('Você abriu a biblioteca');
	parametros.keyCode = TVkeyCodes['OPEN_CLOSE_LIB'];
	sendRequest();
	$('.control').addClass("active");
	$('.navigation').toggleClass("hidden");
	$('.library').toggleClass("hidden");
	$('.rightButton').attr('onclick', 'trocaVideo("direita")');
	$('.leftButton').attr('onclick', 'trocaVideo("esquerda")');
	$('.libraryTitle').toggleClass("hidden");
	$('.libraryDesc').toggleClass("hidden");
	$('.rightTitle').addClass("hidden");
	$('.leftTitle').addClass("hidden");
});

$('.navigation').click(function(){
	console.log('Você fechou a biblioteca');
	parametros.keyCode = TVkeyCodes['OPEN_CLOSE_LIB'];
	sendRequest();	
	$('.control').removeClass("active");
	$('.navigation').toggleClass("hidden");
	$('.library').toggleClass("hidden");
	$('.rightButton').attr('onclick', 'trocaCanal("direita")');
	$('.leftButton').attr('onclick', 'trocaCanal("esquerda")');
	$('.libraryTitle').toggleClass("hidden");
	$('.libraryDesc').toggleClass("hidden");
	$('.rightTitle').addClass("hidden");
	$('.leftTitle').addClass("hidden");
});

// http://api_mysql.tv4e.pt/api/library2/sendKey/4abb55a5dfbe7634 Biblioteca de videos
// http://api_mysql.tv4e.pt/api/sendKey/841a54cbcf8a8086 BOX Antigo
// http://app.tv4e.pt/?id=4abb55a5dfbe7634 Acesso para Web
function sendRequest(){
	$.ajax({
		url:"http://api_mysql.tv4e.pt/api/sendKey/4abb55a5dfbe7634",
		method: 'post',
		data: {keyCode: parametros.keyCode},
		success: function(resposta){
			console.log(resposta);
		}
	});
	console.log("[RCC] Keycode passado: " + parametros.keyCode + ".");
}

function sendRequestVideo(){
	$.ajax({
		url:"http://api_mysql.tv4e.pt/library2/api/sendKey/4abb55a5dfbe7634",
		method: 'post',
		data: {keyCode: parametros.keyCode},
		success: function(resposta){
			console.log(resposta);
		}
	});
	console.log("[RCC] Keycode passado: " + parametros.keyCode + ".");
}

$('.leftButton').click(function(){
	$('.leftTitle').removeClass("hidden");
	$('.rightTitle').addClass("hidden");
});

$('.rightButton').click(function(){
	$('.leftTitle').addClass("hidden");
	$('.rightTitle').removeClass("hidden");
});
