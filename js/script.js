import { db } from "./firebase.js";
import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

// =========================
// PROJECTS
// =========================

function showProject(project) {

    const image = document.getElementById("project-image");
    const title = document.getElementById("project-title");
    const description = document.getElementById("project-description");
    const tech = document.getElementById("project-tech");

    if (!image || !title || !description || !tech) {
        console.error("Project elements not found.");
        return;
    }

    let projectData = {};

    switch (project) {

        case "smart":

            projectData = {
                image: "images/smart-cluster.png",
                title: "Smart Cluster",
                description: "Smart Cluster is an innovative technology project designed to improve automation, monitoring and intelligent decision making using smart systems.",
                tech: ["Arduino", "IoT", "Sensors"]
            };

            break;

        case "robot":

            projectData = {
                image: "images/chillies-cutting-robot.jpg",
                title: "Chillies Cutting Robot",
                description: "An automated robotic system developed to efficiently cut chillies and reduce manual effort in food processing.",
                tech: ["Arduino", "Robotics", "Automation"]
            };

            break;

        case "food":

            projectData = {
                image: "images/localized-food-rescue.png",
                title: "Localized Food Rescue",
                description: "A food rescue platform connecting food donors, NGOs and volunteers to reduce food waste and help people in need.",
                tech: ["HTML", "CSS", "JavaScript", "Firebase"]
            };

            break;

        case "finance":

            projectData = {
                image: "images/financial-decoder.png",
                title: "Financial Decoder",
                description: "AI-powered financial analysis platform that helps users understand market trends and portfolio performance.",
                tech: ["HTML", "CSS", "JavaScript", "AI"]
            };

            break;

        case "ev":

            projectData = {
                image: "images/ev-charger-on-wheel.png",
                title: "EV Charger On Wheel",
                description: "An innovative mobile EV charging station providing emergency charging for electric vehicles.",
                tech: ["EV", "Innovation", "Hackathon"]
            };

            break;

        default:
            return;
    }

    image.src = projectData.image;
    title.innerText = projectData.title;
    description.innerText = projectData.description;

    tech.innerHTML = "";

    projectData.tech.forEach(item => {
        tech.innerHTML += `<span>${item}</span>`;
    });

}

window.showProject = showProject;

// Make available to HTML onclick
window.showProject = showProject;

// =========================
// DOM LOADED
// =========================

document.addEventListener("DOMContentLoaded", () => {

    // Typing Animation
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
            }

            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 500;
            }

            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }

    // Mobile Menu
    const menuBtn = document.querySelector(".menu-btn");
    const mobileNav = document.querySelector(".nav-links");

    if (menuBtn && mobileNav) {
        menuBtn.addEventListener("click", () => {
            mobileNav.classList.toggle("active");
        });
    }

    // Send Button
    const sendBtn = document.getElementById("sendBtn");

    if (sendBtn) {
        sendBtn.addEventListener("click", sendMessage);
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

hiddenElements.forEach((el) => observer.observe(el));

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
// PROGRESS BAR
// =========================

window.addEventListener("scroll", () => {

    const progressBar = document.getElementById("progress-bar");

    if (!progressBar) return;

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});

// =========================
// CURSOR EFFECT
// =========================

const cursor = document.querySelector(".cursor-glow");

if (cursor) {

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });

}

// =========================
// FIREBASE MESSAGE
// =========================

async function sendMessage() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("messageText").value.trim();

    if (!name || !email || !message) {
        alert("Please fill all fields.");
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

    }

    catch (error) {

        console.error("Firestore Error:", error);

        alert("Failed to send message.\n\n" + error.message);

    }

}