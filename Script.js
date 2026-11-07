document.addEventListener("DOMContentLoaded", () => {

  
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggleBtn) themeToggleBtn.textContent = "☀️ Light Mode";
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");

      themeToggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  
  const searchInput = document.getElementById("searchInput");
  const filterBtns = document.querySelectorAll("#filterBtnGroup button");
  const destinationItems = document.querySelectorAll(".destination-item");

  function filterDestinations() {
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    const activeBtn = document.querySelector("#filterBtnGroup button.active");
    const category = activeBtn ? activeBtn.getAttribute("data-filter") : "all";

    destinationItems.forEach(item => {
      const cardTitle = item.querySelector(".card-title").textContent.toLowerCase();
      const cardCategory = item.getAttribute("data-category");

      const matchesSearch = cardTitle.includes(query);
      const matchesCategory = (category === "all" || cardCategory === category);

      if (matchesSearch && matchesCategory) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterDestinations);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterDestinations();
    });
  });

  
  
const calcPackage = document.getElementById("calcPackage");
const calcPeople = document.getElementById("calcPeople");
const calcDays = document.getElementById("calcDays");
const calcAddon = document.getElementById("calcAddon");
const calcTotal = document.getElementById("calcTotal");

function updateCalculator() {
    if (!calcPackage || !calcPeople || !calcDays || !calcTotal) return;

    const basePrice = parseFloat(calcPackage.value) || 0;
    const people = parseInt(calcPeople.value) || 1;
    const days = parseInt(calcDays.value) || 1;
    const addonPrice = calcAddon.checked ? 30 : 0;

    const total = (basePrice * people * days) + (addonPrice * people);

    calcTotal.textContent = "M " + total.toFixed(2);
}

if (calcPackage) {
    [calcPackage, calcPeople, calcDays, calcAddon].forEach(elem => {
        elem.addEventListener("change", updateCalculator);
        elem.addEventListener("input", updateCalculator);
    });
}


  
  const galleryThumbs = document.querySelectorAll(".gallery-thumb");
  const lightboxModalElem = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;

  if (galleryThumbs.length > 0 && lightboxModalElem) {
    const lightboxModal = new bootstrap.Modal(lightboxModalElem);

    function showModalImage(index) {
      const targetImg = galleryThumbs[index];
      lightboxImg.src = targetImg.src;
      lightboxTitle.textContent = targetImg.alt;
      currentIndex = index;
    }

    galleryThumbs.forEach((thumb, idx) => {
      thumb.addEventListener("click", () => {
        showModalImage(idx);
        lightboxModal.show();
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + galleryThumbs.length) % galleryThumbs.length;
        showModalImage(currentIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % galleryThumbs.length;
        showModalImage(currentIndex);
      });
    }
  }

  
  const bookingForm = document.getElementById("bookingForm");
  const bookingAlert = document.getElementById("bookingAlert");
  const savedBookingBox = document.getElementById("savedBookingBox");
  const clearStorageBtn = document.getElementById("clearStorageBtn");

  function displaySavedBooking() {
    if (!savedBookingBox) return;
    const savedData = localStorage.getItem("lesotho_booking");

    if (savedData) {
      const data = JSON.parse(savedData);
      savedBookingBox.innerHTML = `
        <strong>Name:</strong> ${data.name}<br>
        <strong>Email:</strong> ${data.email}<br>
        <strong>Phone:</strong> ${data.phone}<br>
        <strong>Date:</strong> ${data.date}<br>
        <strong>Destination:</strong> ${data.destination}
      `;
    } else {
      savedBookingBox.textContent = "No booking saved yet.";
    }
  }

  if (bookingForm) {
    displaySavedBooking();

    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!bookingForm.checkValidity()) {
        bookingForm.classList.add("was-validated");
        return;
      }

      const bookingObj = {
        name: document.getElementById("bookName").value,
        email: document.getElementById("bookEmail").value,
        phone: document.getElementById("bookPhone").value,
        date: document.getElementById("bookDate").value,
        destination: document.getElementById("bookDestination").value
      };

      localStorage.setItem("lesotho_booking", JSON.stringify(bookingObj));
      bookingAlert.classList.remove("d-none");
      displaySavedBooking();

      bookingForm.reset();
      bookingForm.classList.remove("was-validated");
    });
  }

  if (clearStorageBtn) {
    clearStorageBtn.addEventListener("click", () => {
      localStorage.removeItem("lesotho_booking");
      displaySavedBooking();
      if (bookingAlert) bookingAlert.classList.add("d-none");
    });
  }

  
  const contactForm = document.getElementById("contactForm");
  const contactAlert = document.getElementById("contactAlert");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add("was-validated");
        return;
      }

      contactAlert.classList.remove("d-none");
      contactForm.reset();
      contactForm.classList.remove("was-validated");
    });
  }

});

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


const backToTop = document.getElementById("backToTop");

if (backToTop) {

  
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

}

document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("galleryGrid");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const items = grid.querySelectorAll(".gallery-thumb");

  let currentIndex = 0;

  
  function getVisibleItemsCount() {
    if (window.innerWidth >= 768) return 3; 
    if (window.innerWidth >= 576) return 2; 
    return 1;                               
  }

  function updateSlider() {
    const visibleItems = getVisibleItemsCount();
    const maxIndex = items.length - visibleItems;

    
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    
    const itemWidth = 100 / visibleItems;
    const shiftPercent = -(currentIndex * itemWidth);
    grid.style.transform = `translateX(${shiftPercent}%)`;

   
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  
  nextBtn.addEventListener("click", () => {
    const visibleItems = getVisibleItemsCount();
    const maxIndex = items.length - visibleItems;
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  
  window.addEventListener("resize", updateSlider);

  
  updateSlider();
});