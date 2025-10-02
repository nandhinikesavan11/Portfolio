$(document).ready(function() {
  const $header = $(".header-area");
  $(window).on("scroll", function() {
    if ($(this).scrollTop() > 1) {
      $header.addClass("sticky");
    } else {
      $header.removeClass("sticky");
    }
    updateActiveSection();
  });

  const $navLinks = $(".header ul li a");
  $navLinks.on("click", function(e) {
    e.preventDefault();
    const target = $(this).attr("href");

    if (target === "#home") {
      $("html, body").animate({ scrollTop: 0 }, 500);
    } else {
      const offset = $(target).offset().top - $header.outerHeight();
      $("html, body").animate({ scrollTop: offset }, 500);
    }

    $navLinks.removeClass("active");
    $(this).addClass("active");
  });

  ScrollReveal({ distance: "100px", duration: 2000, delay: 200 });
  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", { origin: "right" });
  ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" });
  ScrollReveal().reveal(".projects, .contact", { origin: "bottom" });

  //Google Sheets Form 

  const scriptURL = 'https://script.google.com/macros/s/AKfycbzo5OCMvXWHg99TAMQRGFbojMZx4MLCZAi9pV12WXCIJbOncRdM1lTBURmgq3MvsNiV/exec';
  const form = document.forms['submitToGoogleSheet'];
  const msg = $("#msg");

  form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => alert('Message sent successfully!'))
    .catch(error => alert('Error sending message!'));
});


}); 

function updateActiveSection() {
  const scrollPosition = $(window).scrollTop();
  const $navLinks = $(".header ul li a");
  const headerHeight = $(".header-area").outerHeight();

  if (scrollPosition === 0) {
    $navLinks.removeClass("active");
    $navLinks.filter("[href='#home']").addClass("active");
    return;
  }

  $("section").each(function() {
    const offset = $(this).offset().top;
    const height = $(this).outerHeight();
    const target = $(this).attr("id");

    if (scrollPosition >= offset - headerHeight &&
        scrollPosition < offset + height - headerHeight) {
      $navLinks.removeClass("active");
      $navLinks.filter("[href='#" + target + "']").addClass("active");
    }
  });
}
