/*
 Biblioteca de funções para site
 Autor: Afonso Alban
 
 Última revisão: 12/11/2013
 */

$(document).ready(function() {
	/* BOTAO TOPO */
	var tempo = 1000;
	var offset = 200;
	
	$('.botao-topo').click(function(event){
		event.preventDefault();
		$('html, body').animate({scrollTop: 0}, tempo);
		return false;
	});
	/* FIM BOTAO TOPO */

});