$(document).ready(function() {
    const $header = $(".header-area");
    const $navLinks = $(".navbar ul li a");
    const $menuIcon = $(".menu_icon");
    const $navUl = $(".navbar ul");
    const $firstElement = $(".FirstElement");
    const $contactForm = $("#contact-form");
    const $msgSpan = $("#msg");

    $menuIcon.on("click", function() {
        $navUl.toggleClass("navbar-active");
    });
   
    $navLinks.on("click", function() {
        if ($navUl.hasClass("navbar-active")) {
            $navUl.removeClass("navbar-active");
        }
    });

    function throttle(func, limit) {
        let inProgress = false;
        return function(...args) {
            if (!inProgress) {
                func.apply(this, args);
                inProgress = true;
                setTimeout(() => (inProgress = false), limit);
            }
        };
    }

    function handleScroll() {
        const scrollPosition = $(window).scrollTop();

        if (scrollPosition > 50) {
            $header.addClass("sticky");
            $firstElement.addClass("content-push");
        } else {
            $header.removeClass("sticky");
            $firstElement.removeClass("content-push");
        }

        let currentSectionId = "";
        $("section").each(function() {
            const sectionTop = $(this).offset().top - $header.outerHeight() - 50;
            if (scrollPosition >= sectionTop) {
                currentSectionId = $(this).attr("id");
            }
        });

        $navLinks.removeClass("active");
        $navLinks.filter(`[href="#${currentSectionId}"]`).addClass("active");
    }

    $(window).on("scroll", throttle(handleScroll, 150));

    $navLinks.on("click", function(e) {
        e.preventDefault();
        const targetId = $(this).attr("href");
        const offsetTop = $(targetId).offset().top - $header.outerHeight();

        $("html, body").animate({
            scrollTop: offsetTop
        }, 500);
    });

    ScrollReveal({ distance: "80px", duration: 2000, delay: 200 });
    ScrollReveal().reveal(".header, .profile-text, .about-content, .education", { origin: "left" });
    ScrollReveal().reveal(".profile-photo, .about-skills, .internship", { origin: "right" });
    ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" });
    ScrollReveal().reveal(".projects, .contact", { origin: "bottom" });

    $contactForm.on("submit", function(e) {
        e.preventDefault();
        $msgSpan.text("Sending...");

        fetch(this.action, {
            method: "POST",
            body: new FormData(this)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            if (data.result === 'success') {
                $msgSpan.text("Message sent successfully!");
                $contactForm[0].reset();
            } else {
                throw new Error(data.message || 'Form submission failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            $msgSpan.text("Oops! Something went wrong.");
        })
        .finally(() => {
            setTimeout(() => {
                $msgSpan.text("");
            }, 5000);
        });
    });
});