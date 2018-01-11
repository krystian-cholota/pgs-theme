$(function() {
"use strict";

	/*-----------------------------------------------------------------------------------*/
	/*	Detect and set footer/header height
	/*-----------------------------------------------------------------------------------*/

	const height_footer = $('.footer');
	const height_header = $('.header');

	$('.page-wrapper').css('min-height', 'calc(100vh - ' + height_footer.innerHeight() + 'px)');
	$('section').css('min-height', 'calc(100vh - ' + height_footer.innerHeight() + 'px - ' + height_header.innerHeight() + 'px)');

	/*-----------------------------------------------------------------------------------*/
	/*	Navigation - section tabs
	/*-----------------------------------------------------------------------------------*/

	$('ul.nav li a').click(function(e){
		e.preventDefault();
		const tab_id = $(this).attr('data-tab');

		$('ul.nav li a').removeClass('current');
		$('.section-content').removeClass('current');

		$(this).addClass('current');
		$('#'+tab_id).addClass('current');
	});

	/*-----------------------------------------------------------------------------------*/
	/*	Section Skicams
	/*-----------------------------------------------------------------------------------*/
   
	const date = new Date();
	$('.col-2 .date').html(date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear());

	$.ajax({
		url: "https://makevoid-skicams.p.mashape.com/cams.json",
		dataType: "text",
		success: function(data) {
			const json = $.parseJSON(data);
			
			// List image cams
			$("#cam-1").attr("src",json[9].cams[44].url);
			$("#cam-2").attr("src",json[9].cams[44].url);
			$("#cam-3").attr("src",json[9].cams[45].url);
			$("#cam-4").attr("src",json[9].cams[45].url);
			// console.log(json);
		},
		beforeSend: function (xhr) {
			xhr.setRequestHeader ("X-Mashape-Key", "kxSXmUymofmshFHhhKxWOSJpqJsJp1I3zNnjsnqKwhITAiC1zw");
		},
	});


	/*-----------------------------------------------------------------------------------*/
	/*  Contact Form
	/*-----------------------------------------------------------------------------------*/
   
	$('.input').each(function(){
		$(this).on('blur', function(){
			if($(this).val().trim() != "") {
				$(this).addClass('has-val');
			}
			else {
				$(this).removeClass('has-val');
			}
		})    
	})

	// Validate
	var name = $('.validate-input input[name="name"]');
	var email = $('.validate-input input[name="email"]');
	var message = $('.validate-input textarea[name="message"]');

	$('.validate-form').on('submit',function(){
		var check = true;

		if($(name).val().trim() == ''){
			showValidate(name);
			check=false;
		}

		if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
			showValidate(email);
			check=false;
		}

		if($(message).val().trim() == ''){
			showValidate(message);
			check=false;
		}

		return check;
	});


	$('.validate-form .input').each(function(){
		$(this).focus(function(){
			hideValidate(this);
		});
	});

	function showValidate(input) {
		var thisAlert = $(input).parent();

		$(thisAlert).addClass('alert-validate');
	}

	function hideValidate(input) {
		var thisAlert = $(input).parent();

		$(thisAlert).removeClass('alert-validate');
	}
});