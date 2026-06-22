
import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";


// =========================
// PROJECTS
// =========================

function showProject(project) {

    const image = document.getElementById("project-image");
    const title = document.getElementById("project-title");
    const description = document.getElementById("project-description");
    const tech = document.getElementById("project-tech");

    if (project === "smart") {

        image.src = "images/smart-cluster.png";
        title.innerText = "Smart Cluster";
        description.innerText =
            "Smart Cluster is an innovative technology project designed to improve automation, monitoring and intelligent decision making using smart systems.";

        tech.innerHTML = `
            <span>Arduino</span>
            <span>IoT</span>
            <span>Sensors</span>
        `;
    }

    else if (project === "robot") {

        image.src = "images/chillies-cutting-robot.jpg";
        title.innerText = "Chillies Cutting Robot";
        description.innerText =
            "An automated robotic system developed to efficiently cut chillies and reduce manual effort in food processing.";

        tech.innerHTML = `
            <span>Arduino</span>
            <span>Robotics</span>
            <span>Automation</span>
        `;
    }

    else if (project === "food") {

        image.src = "images/localized-food-rescue.png";
        title.innerText = "Localized Food Rescue";
        description.innerText =
            "A food rescue platform connecting food donors, NGOs and volunteers to reduce food waste and help people in need.";

        tech.innerHTML = `
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>Firebase</span>
        `;
    }

    else if (project === "finance") {

        image.src = "images/financial-decoder.png";
        title.innerText = "Financial Decoder";
        description.innerText =
            "AI-powered financial analysis platform that helps users understand market trends, portfolio performance and investment insights.";

        tech.innerHTML = `
            <span>HTML</span>
            <span>CSS</span>
            <span>JavaScript</span>
            <span>AI</span>
        `;
    }

    else if (project === "ev") {

        image.src = "images/ev-charger-on-wheel.png";
        title.innerText = "EV Charger On Wheel";
        description.innerText =
            "An innovative mobile EV charging station that provides emergency charging services to electric vehicles anytime and anywhere.";

        tech.innerHTML = `
            <span>EV</span>
            <span>Innovation</span>
            <span>Hackathon</span>
        `;
    }
}


// =========================
// TYPING ANIMATION
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const typingElement = document.getElementById("typing");

    if (typingElement) {

        const words = [
            "Frontend Developer",
            "React Learner",
            "Problem Solver",
            "Web Designer"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingElement.textContent =
                    currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent =
                    currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? 60 : 120;

            if (!isDeleting && charIndex === currentWord.length) {
                speed = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 500;
            }

            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }


    // =========================
    // MOBILE MENU
    // =========================

    const menuBtn = document.querySelector(".menu-btn");
    const mobileNav = document.querySelector(".nav-links");

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener("click", () => {
            mobileNav.classList.toggle("active");
        });
    }
});


// =========================
// SCROLL REVEAL
// =========================

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });

});

hiddenElements.forEach((el) => {
    observer.observe(el);
});


// =========================
// ACTIVE NAVIGATION
// =========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });

});


// =========================
// SCROLL PROGRESS BAR
// =========================

window.addEventListener("scroll", () => {

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    document.getElementById("progress-bar").style.width = progress + "%";
});


// =========================
// CURSOR EFFECT
// =========================

const cursor = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});


// =========================
// MESSAGE FORM (FIREBASE)
// =========================

async function sendMessage() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("messageText").value;

    if (!name || !email || !message) {
        alert("Please fill all fields");
        return;
    }

    try {

        await addDoc(collection(db, "messages"), {
            name,
            email,
            message,
            createdAt: new Date()
        });

        alert("Message sent successfully!");

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("messageText").value = "";

    } catch (error) {
        console.error("Firebase error:", error);
        alert(error.message);
    }
}


// button click
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sendBtn")
    .addEventListener("click", sendMessage);
});

window.sendMessage = sendMessage;
