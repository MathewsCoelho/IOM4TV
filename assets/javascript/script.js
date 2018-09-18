let TVkeyCodes = {
	UP: 40,
	DOWN: 38,
	ONE: 49,
	TWO: 50,
	THREE: 51,
	FOUR: 52,
	FIVE: 53,
	SIX: 54,
	SEVEN: 55,
	EIGHT: 56,
	NINE: 57,
	OPEN_CLOSE_LIB: 48,
	OK: 13,
	LEFT: 37,
	RIGHT: 39,
	SEND_VIDEO: 8
}

let codigoCaixa = '';
let channel = document.getElementById("channel");

let parametros = {
	"keyCode" : ''
};

function adicionarCanal($numCanal){
	let valor = channel.innerHTML;
	if(valor.length >= 3){
		channel.innerHTML = '';
		codigoCaixa = '';
	}
	let numCanal = parseInt($numCanal);
	let valorAPI = numCanal + 48;
	channel.innerHTML = channel.innerHTML + $numCanal;
	codigoCaixa = codigoCaixa + valorAPI;
	
}

function escolherCanal(){
	let valor = channel.innerHTML;
	if(valor !== ""){
		codigoCaixa += 13;
		console.log("Você escolheu canal " + valor + ".");
		console.log('Enviou para API o valor:' + codigoCaixa); 
		parametros.keyCode = codigoCaixa;
		channel.innerHTML = "";
		codigoCaixa = '';
		sendRequest();
	} 
}

function trocaCanal($funcao){
	console.log("Você trocou de canal para " + $funcao + ".");
	channel.innerHTML = ""; 
	codigoCaixa = '';
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
	}
	else if($funcao == 'direita'){
		parametros.keyCode = TVkeyCodes['RIGHT'];
	}
	sendRequest();
}

function removeCanal(){
	channel.innerHTML = "";
	codigoCaixa = '';
}

function sendRequest(){
	$.ajax({
		url:"http://api_mysql.tv4e.pt/api/sendKey/841a54cbcf8a8086",
		method: 'post',
		data: {keyCode: parametros.keyCode},
		success: function(resposta){
			console.log(resposta);
		}
	});
}

$('.library').click(function(){
	console.log('Você abriu a biblioteca');
	parametros.keyCode = TVkeyCodes['OPEN_CLOSE_LIB'];
	sendRequest();
	$( ".botoesNumericos" ).prop( "disabled", true );
	$('.navigation').toggleClass("hidden");
	$('.library').toggleClass("hidden");
	$('.conteudo2').toggleClass("opacity");
	$('.rightButton').attr('onclick', 'trocaVideo("direita")');
	$('.leftButton').attr('onclick', 'trocaVideo("esquerda")');
	$('.libraryTitle').toggleClass("hidden");
	$('.libraryDesc').toggleClass("hidden");
});

$('.navigation').click(function(){
	console.log('Você fechou a biblioteca');
	$( ".botoesNumericos" ).prop( "disabled", false);
	parametros.keyCode = TVkeyCodes['OPEN_CLOSE_LIB'];
	sendRequest();
	$('.navigation').toggleClass("hidden");
	$('.library').toggleClass("hidden");
	$('.conteudo2').toggleClass("opacity");
	$('.rightButton').attr('onclick', 'trocaCanal("direita")');
	$('.leftButton').attr('onclick', 'trocaCanal("esquerda")');
	$('.libraryTitle').toggleClass("hidden");
	$('.libraryDesc').toggleClass("hidden");
});