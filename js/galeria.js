/*
 Galeria de Fotos expandida
 Autor: Afonso Alban
 Última revisão: 19/2/2014
 */
 
var miniaturas;
var escopo;

abreGaleria = function(obj, event) {
    if( event ){
        event.preventDefaults();
    }

    //escopo = $(obj).parent();
    escopo = $(obj);
    // escopo = $(this);

    $('body').append('<div id="galeria-overlay-container">' +
            '<div id="galeria-click"></div>' +
            '<div id="galeria-overlay-branco">' +
            '<div id="galeria-container">' +
            '<span id="fechar-galeria">Fechar</span>' +
            '<div id="foto-grande">' +
            '<img src="" />' +
            '</div>' +
            '<p id="galeria-legenda"></p>' +
            '<div id="miniaturas-container">' +
            '<ul id="galeria-miniaturas"></ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>');

    $('#fechar-galeria').click(fechaGaleria);
    $('#galeria-click').click(fechaGaleria);
    
    $('.miniaturas', escopo).children().clone().appendTo('#galeria-miniaturas');

    if( $('.miniaturas', escopo).data('titulo').length ){
        $('#galeria-container').prepend('<div id="galeria-info"><p>' + $('.miniaturas', escopo).data('titulo') + '</p></div>');
    }

    $('body').css('overflow', 'hidden');
    $('#galeria-overlay-container').fadeIn();

    $('#galeria-miniaturas li').click(abreFoto);

    if ($('#galeria-miniaturas').children().length > 5) {
        miniaturas = $('#galeria-miniaturas').bxSlider({
            mode: 'vertical',
            minSlides: 4,
            maxSlides: 4,
            slideMargin: 7,
            responsive: false,
            infiniteLoop: false,
            pager: false
        });
    }

    $('#galeria-miniaturas li:first-child').click();

    $(document.documentElement).keyup(function(e) {
        if (e.keyCode === 37) {
            // pressionado LEFT
            $('#galeria-miniaturas .active').prev().click();
        } else if (e.keyCode === 39) {
            //pressionado RIGHT
            $('#galeria-miniaturas .active').next().click();
        } else if (e.keyCode === 27){
            fechaGaleria();
        }
    });
};

fechaGaleria = function() {
    $('body').css('overflow', 'visible');
    $('#galeria-overlay-container').fadeOut('fast', function() {
        $('#galeria-overlay-container').remove();
    });
    $(document.documentElement).off('keyup');
};

abreFoto = function(event) {
    $('#galeria-miniaturas .active').removeClass('active');

    $('#foto-grande img').attr("src", "images/preloader.gif");

    obj = $(event.delegateTarget);
    obj.addClass('active');
    $('#foto-grande img').hide().attr('src', obj.data('full')).fadeIn();
    $('#galeria-legenda').hide().text(obj.data('legenda')).fadeIn();

    if(miniaturas)
        setTimeout(function() {
            miniaturas.goToSlide(Math.floor(obj.index() / 4));
        }, 600);
};