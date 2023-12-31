(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });

    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 200, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 4
            },
            768: {
                items: 6
            },
            992: {
                items: 8
            }
        }
    });

})(jQuery);


// language
function loadTranslation(language) {
    return fetch(`lang/${language}.json`)
        .then(response => response.json())
        .catch(error => {
            console.error(`Çeviri dosyası yüklenirken hata oluştu: ${error}`);
            return {}; // Boş bir çeviri nesnesi döndürme
        });
}

function updateTranslation(translationData) {
    const elementsToUpdate = document.querySelectorAll('[data-translate]');
    console.log('b: ',elementsToUpdate);
    elementsToUpdate.forEach(element => {
      const translationKey = element.getAttribute('data-translate');
      if (translationData.hasOwnProperty(translationKey)) {
        element.textContent = translationData[translationKey];
      }
    });
  }

  let selectedLanguage = localStorage.getItem('selectedLanguage') || 'tr'; // Varsayılan dil

  document.addEventListener('DOMContentLoaded', () => {
    // Sayfa yüklendiğinde çalışacak kod
    loadTranslation(selectedLanguage)
        .then(updateTranslation)
        .catch(error => {
            console.error(`Çeviri dosyası yüklenirken hata oluştu: ${error}`);
            return {}; // Boş bir çeviri nesnesi döndürme
        });
    });

  function changeLanguage(lang) {
    const newLanguage = lang;
      // Seçilen dili saklama
      localStorage.setItem('selectedLanguage', newLanguage);
  
      // Çeviri dosyasını yükleme ve metinleri güncelleme
      loadTranslation(newLanguage)
        .then(updateTranslation);
    // Burada dil değiştiğinde yapılması gereken işlemleri yapabilirsiniz,
    // örneğin metinleri çevirme veya arayüzü güncelleme gibi.
  }

  document.addEventListener("DOMContentLoaded", function () {
    var outside = document.getElementsByClassName("outside-onclick");
    var navbarCollapse = document.getElementById("navbarCollapse");

    // outside elemanlarından birine tıklandığında menüyü kapat
    for (var i = 0; i < outside.length; i++) {
        outside[i].addEventListener("click", function () {
            navbarCollapse.classList.remove("show"); // Menüyü kapat
        });
    }
});