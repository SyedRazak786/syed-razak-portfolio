import { db } from "./firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";


// ======================================================
// PROJECT DATA
// ======================================================

const projects = {

    smart: {
        image: "images/smart-cluster.png",
        title: "Smart Cluster",
        description:
            "Smart Cluster is an innovative technology project designed to improve automation, monitoring and intelligent decision making using smart systems.",
        tech: ["Arduino", "IoT", "Sensors"],
        liveDemo: "#",
        github: "#"
    },


    robot: {
        image: "images/chillies-cutting-robot.jpg",
        title: "Chillies Cutting Robot",
        description:
            "An automated robotic system developed to efficiently cut chillies and reduce manual effort in food processing.",
        tech: ["Arduino", "Robotics", "Automation"],
        liveDemo: "#",
        github: "#"
    },


    food: {
        image: "images/localized-food-rescue.png",
        title: "Localized Food Rescue",
        description:
            "A food rescue platform connecting food donors, NGOs and volunteers to reduce food waste and help people in need.",
        tech: ["HTML", "CSS", "JavaScript", "Firebase"],
        liveDemo: "https://localized-food-rescue.vercel.app",
        github: "https://github.com/SyedRazak786/localized-food-rescue"
    },


    finance: {
        image: "images/financial-decoder.png",
        title: "Financial Decoder",
        description:
            "An AI-powered financial analysis platform that helps users understand market trends and portfolio performance.",
        tech: ["HTML", "CSS", "JavaScript", "AI"],
        liveDemo: "#",
        github: "#"
    },


    ev: {
        image: "images/ev-charger-on-wheel.png",
        title: "EV Charger On Wheel",
        description:
            "An innovative mobile EV charging station providing emergency charging support for electric vehicles.",
        tech: ["EV", "Innovation", "Hackathon"],
        liveDemo: "#",
        github: "#"
    },


    parking: {
        image: "images/parking-lot.png",
        title: "Parking Lot Management System",
        description:
            "A Java-based parking management system designed to manage vehicles, parking slots, parking fees, vehicle search, parking history and parking operations efficiently.",
        tech: ["Java", "OOP", "MySQL", "Spring Boot"],
        liveDemo: "#",
        github: "https://github.com/SyedRazak786/ParkingLotManagement"
    },


    nestle: {
        image: "images/nestle-quantum.png",
        title: "Quantum Distribution Optimizer",
        description:
            "A quantum-inspired optimization project developed for Nestlé's Distributed Order Management challenge. The system optimizes customer order allocation across distribution centers by considering inventory, shipping cost, capacity, dock availability, throughput and fulfillment requirements.",
        tech: [
            "Python",
            "Quantum Computing",
            "Optimization",
            "Pandas",
            "Streamlit"
        ],
        liveDemo: "#",
        github: "https://github.com/SyedRazak786/Nestle-Quantum-DOM"
    }

};


// ======================================================
// SHOW PROJECT
// ======================================================

function showProject(projectName) {

    const image = document.getElementById("project-image");
    const title = document.getElementById("project-title");
    const description = document.getElementById("project-description");
    const tech = document.getElementById("project-tech");

    const liveDemo = document.getElementById("live-demo");
    const githubLink = document.getElementById("github-link");


    // Check required elements
    if (
        !image ||
        !title ||
        !description ||
        !tech
    ) {
        console.error("Project elements not found.");
        return;
    }


    // Get project
    const projectData = projects[projectName];


    if (!projectData) {

        console.error(
            "Project not found:",
            projectName
        );

        return;
    }


    // ==================================================
    // UPDATE PROJECT IMAGE
    // ==================================================

    image.src = projectData.image;

    image.alt = projectData.title;


    // ==================================================
    // UPDATE TITLE
    // ==================================================

    title.textContent = projectData.title;


    // ==================================================
    // UPDATE DESCRIPTION
    // ==================================================

    description.textContent =
        projectData.description;


    // ==================================================
    // UPDATE TECHNOLOGIES
    // ==================================================

    tech.innerHTML = "";


    projectData.tech.forEach((technology) => {

        const span = document.createElement("span");

        span.textContent = technology;

        tech.appendChild(span);

    });


    // ==================================================
    // UPDATE LIVE DEMO BUTTON
    // ==================================================

    if (liveDemo) {

        liveDemo.href =
            projectData.liveDemo || "#";


        if (projectData.liveDemo === "#") {

            liveDemo.style.display = "none";

        } else {

            liveDemo.style.display = "inline-block";

        }

    }


    // ==================================================
    // UPDATE GITHUB BUTTON
    // ==================================================

    if (githubLink) {

        githubLink.href =
            projectData.github || "#";


        if (projectData.github === "#") {

            githubLink.style.display = "none";

        } else {

            githubLink.style.display = "inline-block";

        }

    }


    // ==================================================
    // ACTIVE PROJECT
    // ==================================================

    const projectItems =
        document.querySelectorAll(".project-item");


    projectItems.forEach((item) => {

        item.classList.remove("active");

    });


    // Find clicked project
    projectItems.forEach((item) => {

        const onclickValue =
            item.getAttribute("onclick");


        if (
            onclickValue &&
            onclickValue.includes(
                `'${projectName}'`
            )
        ) {

            item.classList.add("active");

        }

    });

}


// ======================================================
// MAKE FUNCTION AVAILABLE TO HTML
// ======================================================

window.showProject = showProject;


// ======================================================
// DOM LOADED
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // ==================================================
        // TYPING ANIMATION
        // ==================================================

        const typingElement =
            document.getElementById("typing");


        if (typingElement) {

            const words = [

                "Frontend Developer",
                "Python Developer",
                "Java Developer",
                "Quantum Computing Enthusiast",
                "Problem Solver",
                "Web Designer"

            ];


            let wordIndex = 0;

            let charIndex = 0;

            let isDeleting = false;


            function typeEffect() {

                const currentWord =
                    words[wordIndex];


                // Deleting
                if (isDeleting) {

                    typingElement.textContent =
                        currentWord.substring(
                            0,
                            charIndex - 1
                        );

                    charIndex--;

                }


                // Typing
                else {

                    typingElement.textContent =
                        currentWord.substring(
                            0,
                            charIndex + 1
                        );

                    charIndex++;

                }


                let speed =
                    isDeleting
                        ? 60
                        : 120;


                // Word completed
                if (
                    !isDeleting &&
                    charIndex ===
                        currentWord.length
                ) {

                    speed = 1500;

                    isDeleting = true;

                }


                // Word deleted
                else if (
                    isDeleting &&
                    charIndex === 0
                ) {

                    isDeleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        words.length;

                    speed = 500;

                }


                setTimeout(
                    typeEffect,
                    speed
                );

            }


            typeEffect();

        }


        // ==================================================
        // MOBILE MENU
        // ==================================================

        const menuBtn =
            document.querySelector(
                ".menu-btn"
            );


        const mobileNav =
            document.querySelector(
                ".nav-links"
            );


        if (
            menuBtn &&
            mobileNav
        ) {

            menuBtn.addEventListener(
                "click",
                () => {

                    mobileNav.classList.toggle(
                        "active"
                    );

                }
            );


            // Close mobile menu
            // after clicking a navigation link

            const navItems =
                mobileNav.querySelectorAll(
                    "a"
                );


            navItems.forEach((link) => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileNav.classList.remove(
                            "active"
                        );

                    }
                );

            });

        }


        // ==================================================
        // SEND MESSAGE BUTTON
        // ==================================================

        const sendBtn =
            document.getElementById(
                "sendBtn"
            );


        if (sendBtn) {

            sendBtn.addEventListener(
                "click",
                sendMessage
            );

        }


        // ==================================================
        // LOAD DEFAULT PROJECT
        // ==================================================

        showProject("smart");

    }
);


// ======================================================
// SCROLL REVEAL
// ======================================================

const hiddenElements =
    document.querySelectorAll(
        ".hidden"
    );


if (
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.1
            }
        );


    hiddenElements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );

}


// ======================================================
// ACTIVE NAVIGATION
// ======================================================

const sections =
    document.querySelectorAll(
        "section"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";


        sections.forEach(
            (section) => {

                const sectionTop =
                    section.offsetTop - 150;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            (link) => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


// ======================================================
// PROGRESS BAR
// ======================================================

window.addEventListener(
    "scroll",
    () => {

        const progressBar =
            document.getElementById(
                "progress-bar"
            );


        if (!progressBar) {
            return;
        }


        const scrollTop =
            document.documentElement
                .scrollTop;


        const scrollHeight =
            document.documentElement
                .scrollHeight -
            document.documentElement
                .clientHeight;


        if (scrollHeight <= 0) {

            progressBar.style.width =
                "0%";

            return;

        }


        const progress =
            (scrollTop /
                scrollHeight) *
            100;


        progressBar.style.width =
            progress + "%";

    }
);


// ======================================================
// CURSOR GLOW
// ======================================================

const cursor =
    document.querySelector(
        ".cursor-glow"
    );


if (cursor) {

    document.addEventListener(
        "mousemove",
        (event) => {

            cursor.style.left =
                event.clientX + "px";

            cursor.style.top =
                event.clientY + "px";

        }
    );

}


// ======================================================
// FIREBASE MESSAGE
// ======================================================

async function sendMessage() {

    const nameInput =
        document.getElementById(
            "name"
        );


    const emailInput =
        document.getElementById(
            "email"
        );


    const messageInput =
        document.getElementById(
            "messageText"
        );


    if (
        !nameInput ||
        !emailInput ||
        !messageInput
    ) {

        console.error(
            "Message form elements not found."
        );

        return;

    }


    const name =
        nameInput.value.trim();


    const email =
        emailInput.value.trim();


    const message =
        messageInput.value.trim();


    // ==================================================
    // VALIDATION
    // ==================================================

    if (
        !name ||
        !email ||
        !message
    ) {

        alert(
            "Please fill all fields."
        );

        return;

    }


    // Simple email validation
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
        !emailPattern.test(email)
    ) {

        alert(
            "Please enter a valid email address."
        );

        return;

    }


    // ==================================================
    // DISABLE BUTTON
    // ==================================================

    const sendBtn =
        document.getElementById(
            "sendBtn"
        );


    if (sendBtn) {

        sendBtn.disabled = true;

        sendBtn.textContent =
            "Sending...";

    }


    try {

        // ==================================================
        // SAVE TO FIRESTORE
        // ==================================================

        await addDoc(
            collection(
                db,
                "messages"
            ),
            {

                name: name,

                email: email,

                message: message,

                createdAt:
                    new Date()

            }
        );


        // ==================================================
        // SUCCESS
        // ==================================================

        alert(
            "Message sent successfully!"
        );


        nameInput.value = "";

        emailInput.value = "";

        messageInput.value = "";


    }

    catch (error) {

        console.error(
            "Firestore Error:",
            error
        );


        alert(
            "Failed to send message.\n\n" +
            error.message
        );

    }

    finally {

        // ==================================================
        // ENABLE BUTTON
        // ==================================================

        if (sendBtn) {

            sendBtn.disabled = false;

            sendBtn.textContent =
                "Send Message";

        }

    }

}