// js Document

// Created on   : 19/06/2021.
// Theme Name   : Deski-Saas & Software HTML Template
// Version      : 1.0.
// Developed by : (me@heloshape.com) / (www.me.heloshape.com)


(function ($) {
  "use strict";

  $(window).on('load', function () { // makes sure the whole site is loaded

    // -------------------- Site Preloader
    $('#ctn-preloader').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({ 'overflow': 'visible' });



    // ------------------------------- AOS Animation
    if ($("[data-aos]").length) {
      AOS.init({
        duration: 1000,
        mirror: true
      });
    }

    // ------------------------------------- Fancybox
    var fancy = $(".fancybox");
    if (fancy.length) {
      fancy.fancybox({
        arrows: true,
        buttons: [
          "zoom",
          //"share",
          "slideShow",
          //"fullScreen",
          //"download",
          "thumbs",
          "close"
        ],
        animationEffect: "zoom-in-out",
        transitionEffect: "zoom-in-out",
      });
    }


    // ------------------------------- AOS Animation
    if ($(".map-canvas").length) {
      var map = new google.maps.Map($(".map-canvas")[0], {
        zoom: 14,
        center: new google.maps.LatLng(40.72, -74),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        clickableIcons: false
      });

      var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: new google.maps.LatLng(40.72, -74),
        visible: true
      });
    }

  });  //End On Load Function

})(jQuery);