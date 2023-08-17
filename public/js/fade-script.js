  $(document).ready(function() {
    const landingPage = $('.landing-page');
    const pageContainer = $('#nav-bar');

    $(window).on('scroll', function() {
      const scrollPosition = $(this).scrollTop();
      const containerTop = pageContainer.offset().top;

      if (scrollPosition >= containerTop) {
          landingPage.fadeOut();
      } else {
          landingPage.fadeIn();
      }
    });
});





