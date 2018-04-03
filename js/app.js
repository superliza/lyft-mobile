var $signUp = $('#sign-up');
var $inputPIN = $('#put-code');
var $phoneNumber = $('.container-phone');
var $addPhone = $('.phone-input');
var $containerSignUp = $('.container-sign-up');
var $buttonPIN = $('.button-pin');
var $verifyPIN = $('.container-verify-pin');
var $buttonVerify = $('.button-verify');
var $formulary = $('.container-formulary');

function loadPage() {
    setTimeout(function() {
		$('.background-splash').fadeOut();
		$('.container-sign-up').removeClass('hide');
	}, 2000)
    $('select').material_select();

    $signUp.click(showNext);
    $addPhone.keyup(validatePhone);
    $buttonPIN.click(showPIN);
    $inputPIN.keyup(typePIN);
    $buttonVerify.click(isCorrectPIN);
}

//función que pasa del log in/sign up a la vista del país y número telefónico del usuario.
function showNext(e) {
    e.preventDefault();
    $phoneNumber.removeClass('hide');
    $containerSignUp.addClass('hide');
}

//sólo acepta numbers y su valor tiene que ser mayor a 0 e igual a 10 para que se habilite el botón.
function validatePhone(e) {
    e.preventDefault();
    if($(this).val().trim().length > 0 && $(this).val().trim().length == 10) {
        $buttonPIN.removeAttr('disabled');
    } else {
        $buttonPIN.attr('disabled', true);
    }
    this.value = this.value.replace(/[^0-9]/g,'');
}

//genera un número random/código/pin que se asignará a la siguiente pestaña.
function generatesPIN() {
    var codeLab = Math.floor(Math.random() * 10);
	return codeLab;
}

//se muestra el pin por un alert.
function showPIN(e) {
    e.preventDefault();
    var saveCode = [];
	for(var i = 0; i < 3; i++) { //recorre el número hasta que llegue a 3.
		saveCode.push(generatesPIN()); //se guarda el pin con 3 números en un array.
		var arrToString = saveCode.join(""); //se pasa el array a string.
	}
    alert("Tu código es LAB - " + arrToString);	
    $('body').data('pin', arrToString);
    $phoneNumber.addClass('hide');
    $verifyPIN.removeClass('hide');
}

function typePIN(e) {
    e.preventDefault();
    this.value = this.value.replace(/[^0-9]/g,'');
    var typeValue = $(this).val();
    if (typeValue.length === 3) {
        $('.button-verify').removeAttr('disabled');
    } else {
        $('.button-verify').attr('disabled', true);
    }
    $('body').data('theValuePIN', typeValue);
}

function isCorrectPIN(e) {
    e.preventDefault();
    var pin = $('body').data('pin');
    var typeCode = $('body').data('theValuePIN');
    // console.log(pin);
    // console.log(typeCode);
    if(pin == typeCode) {
        $verifyPIN.addClass('hide');
        $formulary.removeClass('hide');
    } else {
        alert('El código no es correcto');
    }
}

$(document).ready(loadPage);
