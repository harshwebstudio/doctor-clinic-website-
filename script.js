

"use strict";

/* =====================================
   CONTACT DETAILS
===================================== */

const CONTACT = {
  phone: "9987475783",
  whatsapp: "919987475783",
  email: "harshwardhankdm@gmail.com",
  instagram: "https://www.instagram.com/harshwebdesignerrr11/"
};

/* =====================================
   MOBILE NAVIGATION
===================================== */

document.querySelectorAll(".menu-toggle").forEach(function (button) {
  button.addEventListener("click", function () {
    const nav = document.getElementById(button.getAttribute("aria-controls"));
    if (!nav) return;

    const isOpen = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    button.textContent = isOpen ? "×" : "☰";
  });
});

document.querySelectorAll(".nav a").forEach(function (link) {
  link.addEventListener("click", function () {
    const nav = link.closest(".nav");
    if (!nav) return;

    nav.classList.remove("open");
    const toggle = document.querySelector(
      '.menu-toggle[aria-controls="' + nav.id + '"]'
    );

    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      toggle.textContent = "☰";
    }
  });
});

/* =====================================
   CLICK TO CONNECT BOX
===================================== */

document.querySelectorAll(".connect-toggle").forEach(function (button) {
  button.addEventListener("click", function () {
    const panelId = button.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);
    if (!panel) return;

    const isOpening = panel.hidden;
    panel.hidden = !isOpening;
    button.setAttribute("aria-expanded", String(isOpening));

    const symbol = button.querySelector(".connect-symbol");
    const arrow = button.querySelector(".connect-arrow");

    if (symbol) symbol.textContent = isOpening ? "−" : "+";
    if (arrow) arrow.textContent = isOpening ? "⌃" : "⌄";
  });
});

/* =====================================
   FOOTER YEAR
===================================== */

document.querySelectorAll("[data-year]").forEach(function (element) {
  element.textContent = new Date().getFullYear();
});

/* =====================================
   APPOINTMENT ENQUIRY FORM
===================================== */

const patientForm = document.getElementById("patientForm");

if (patientForm) {
  const dateInput = document.getElementById("appointmentDate");
  const status = document.getElementById("formStatus");

  if (dateInput) {
    const now = new Date();
    const today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("-");

    dateInput.min = today;
  }

  patientForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!patientForm.reportValidity()) return;

    if (!/^91\d{10}$/.test(CONTACT.whatsapp)) {
      status.textContent = "The WhatsApp number is not configured correctly.";
      return;
    }

    const data = new FormData(patientForm);

    const message = [
      "WEBSITE APPOINTMENT ENQUIRY",
      "Name: " + data.get("name"),
      "Patient phone: " + data.get("phone"),
      "Age: " + data.get("age"),
      "Preferred date: " + data.get("date"),
      "Visit type: " + data.get("reason"),
      "Additional information: " + (data.get("message") || "None"),
      "",
      "Please confirm availability."
    ].join("\n");

    const url =
      "https://wa.me/" + CONTACT.whatsapp +
      "?text=" + encodeURIComponent(message);

    const newTab = window.open(url, "_blank");

    if (newTab) {
      status.textContent =
        "WhatsApp opened. Review and send your message to submit the enquiry.";
    } else {
      status.textContent =
        "Open this WhatsApp link to continue: " + url;
    }
  });
      }
                               
