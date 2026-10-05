// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");

const navigation = document.getElementById("navigation");


menuToggle.addEventListener("click", () => {

    navigation.classList.toggle("active");

    const isOpen = navigation.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

});


navigation.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navigation.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// AUTOMATIC FOOTER YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


// CONTACT FORM

const contactForm = document.getElementById("contactForm");

const formStatus = document.getElementById("formStatus");


contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    const formData = new FormData(contactForm);

    const data = Object.fromEntries(formData.entries());

    const submitButton = contactForm.querySelector("button");

    submitButton.disabled = true;

    submitButton.textContent = "Sending...";


    try {

        // Add your backend URL here before going live.
        const endpoint = contactForm.dataset.endpoint;

        if (!endpoint) {

            formStatus.textContent =
                "Contact form is not connected yet. Please configure your backend.";

            return;

        }


        const response = await fetch(endpoint, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)

        });


        if (!response.ok) {

            throw new Error("Submission failed");

        }


        formStatus.textContent =
            "Thank you! Your message has been sent.";

        contactForm.reset();


    } catch (error) {

        formStatus.textContent =
            "Something went wrong. Please try again.";

    } finally {

        submitButton.disabled = false;

        submitButton.textContent = "Send Message ↗";

    }

});