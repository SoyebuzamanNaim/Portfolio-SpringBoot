// theme toggle
const btn = document.getElementById("theme-toggle");

// function to update theme-dependent elements
function updateThemeElements(isDark) {
  // update decorative line in tech stack section
  const decorativeLine = document.querySelector(
    '.text-center.mb-16 div[style*="gradient"]'
  );
  if (decorativeLine) {
    if (isDark) {
      decorativeLine.style.background =
        "linear-gradient(90deg, transparent, #f5f5f5, transparent)";
    } else {
      decorativeLine.style.background =
        "linear-gradient(90deg, transparent, #1a1a1a, transparent)";
    }
  }
}

// load saved theme or default to light mode
const savedTheme = localStorage.getItem("theme") || "light";
document.body.dataset.theme = savedTheme;

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  btn.innerHTML = "<i class='fa-solid fa-sun text-xl'></i>";
  updateThemeElements(true);
} else {
  document.body.classList.remove("dark");
  btn.innerHTML = "<i class='fa-solid fa-moon text-xl'></i>";
  updateThemeElements(false);
}

// toggle theme on button click
btn.addEventListener("click", () => {
  const newTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);

  if (newTheme === "dark") {
    document.body.classList.add("dark");
    btn.innerHTML = "<i class='fa-solid fa-sun text-xl'></i>";
    updateThemeElements(true);
  } else {
    document.body.classList.remove("dark");
    btn.innerHTML = "<i class='fa-solid fa-moon text-xl'></i>";
    updateThemeElements(false);
  }
});

// scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// contact form submission
const contactForm = document.getElementById("contactForm");
const successModal = document.getElementById("success_modal");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;

  // Show loading state
  submitButton.disabled = true;
  submitButton.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      // Show success modal
      successModal.showModal();
      // Reset form
      contactForm.reset();
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    alert("Oops! Something went wrong. Please try again later.");
    console.error("Form submission error:", error);
  } finally {
    // Restore button state
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
});


// about me

// select elements
const info = document.getElementById("info");
const buttons = document.querySelectorAll(".tab-btn");

// content data for each tab
const content = {
  experience: `
  <div class="flex flex-col items-center space-y-20">
    <h3 class="text-2xl font-semibold mb-2 ">
      <i class="fa-solid fa-briefcase mr-2"></i>Experience
    </h3>

      <div class="mb-2">
      <p class="py-1 font-extrabold text-xl ">Teacher — Monzusha Model School and College</p>
      <p class="opacity-80 leading-tight text-md">
        Taught science subjects,<br> have teaching experience of 1 year.
      </p>
      <p class="opacity-60 text-sm py-1">2022 – 2023</p>
    </div>

    <div class="mb-2">
      <p class="py-1 font-extrabold text-xl ">Front-End Developer</p>
      <p class="opacity-80 leading-tight text-md">
        Over 1.5 years of experience building responsive,<br> user-focused web interfaces
        using <strong>React</strong> and <strong>Tailwind CSS</strong>.
      </p>
      <p class="opacity-60 text-sm py-1">2023 – Present</p>
    </div>

  
    <div class="mb-2">
      <p class="py-1 font-extrabold text-xl ">Student — Southeast University</p>
      <p class="opacity-80 leading-tight text-md">
        Pursuing a <strong>B.Sc. in Computer Science and Engineering</strong>,<br> enhancing both theoretical and practical skills.
      </p>
      <p class="opacity-60 text-sm py-1">2023 – Present</p>
    </div>
  </div>
`,

  education: `
    <div class="flex flex-col space-y-6">
      <div>
        <h3 class="text-2xl font-semibold mb-2">
          <i class="fa-solid fa-graduation-cap mr-2"></i>University
        </h3>
        <p>B.Sc. in Computer Science and Engineering <br>at <strong>Southeast University</strong></p>
        <p>CGPA: 3.99 / 4.00</p>
        <p class="opacity-70">2023 - Present</p>
      </div>
      <div>
        <h3 class="text-2xl font-semibold mb-2">
          <i class="fa-solid fa-graduation-cap mr-2"></i>High School
        </h3>
        <p>HSC in Science at <strong>Dhaka College</strong></p>
        <p>GPA: 5.00 / 5.00</p>
        <p class="opacity-70">2020 - 2022</p>
      </div>
      <div>
        <h3 class="text-2xl font-semibold mb-2">
          <i class="fa-solid fa-graduation-cap mr-2"></i>Secondary School
        </h3>
        <p>SSC in Science at <strong>A.K. High School</strong></p>
        <p>GPA: 5.00 / 5.00</p>
        <p class="opacity-70">2010 - 2020</p>
      </div>
    </div>
  `,

  certification: `
    <div>
      <h3 class="text-2xl font-semibold mb-4">
        <i class="fa-solid fa-certificate mr-2"></i>Certifications
      </h3>
      <ul class="space-y-3 text-center max-w-lg mx-auto">
        <li><a class="hover:text-blue-300 transition-all duration-200" href="https://drive.google.com/file/d/1eERnjopbsd8k0K2g5SNXgfQnx19Grsu4/view?usp=sharing" target="_blank"><i class="fa-solid fa-check-circle mr-2 "></i>AI+ Prompt Engineer Level 1™</a></li>
        <li><a class=" hover:text-blue-300" href="https://drive.google.com/file/d/1_m7vEugwi0XlY8CStSElxuO7maSUYA25/view?usp=drive_link" target="_blank"><i class="fa-solid fa-check-circle mr-2 "></i>2025-The 2024 ICPC Asia Dhaka Preliminary-Soyebuzamannaim Naim-HONORABLE</a></li>
        <li><a class=" hover:text-blue-300" ><i class="fa-solid fa-check-circle mr-2 "></i> Web Development-Programming Hero(Not Completed)</a></li>
        <li><a class=" hover:text-blue-300" href="https://drive.google.com/file/d/1EcBolAxkwXwVhNr6cllVX2gKOEPmcdVK/view?usp=sharing" target="_blank"><i class="fa-solid fa-check-circle mr-2 "></i> Green Fair 2024 -Volunteer</a></li>

        <li><a class=" hover:text-blue-300" href="https://drive.google.com/file/d/1PciKD94IjK_Z5cb9Veeh9IBlbipH2Y-m/view?usp=sharing" target="_blank"><i class="fa-solid fa-check-circle mr-2 "></i> BUBT-BAPS National programming camp (2025) -Participant</a></li>
        
      </ul>
    </div>
  `,

  cp: `
    <div>
      <h3 class="text-2xl font-semibold mb-4">
        <i class="fa-solid fa-code mr-2"></i>Competitive Programming
      </h3>
      <p class="mb-3">Solved <strong>500+</strong> problems on <a class="text-lime-600 hover:text-lime-900" href="https://codeforces.com/profile/naiminator" target="_blank">Codeforces</a>, <a class="text-lime-600 hover:text-lime-900" href="https://leetcode.com/u/soyebuzamannaim/" target="_blank">LeetCode</a>, and <a class="text-lime-600 hover:text-lime-900" href="https://atcoder.jp/users/SoyebuzamanNaim" target="_blank">AtCoder</a>.</p>
      <p class="mb-3 ">Codeforces Max Rating: <strong>Newbie (1123)</strong></p><br>
      
      <p class="opacity-70"> <i class="fa-solid fa-medal"></i> 3rd place in University Intra Programming Contest 2024</p>
      <p class="opacity-70"> <i class="fa-solid fa-medal"></i> 1st place at SEUCC Monthly Programming Contest 003! 🏆 2024</p>
       <p class="opacity-70"> <i class="fa-solid fa-medal"></i> 2nd Place at SEUCC Monthly Programming Contest 002 🏆 2024</p>
    </div>
  `,

  hobbies: `
    <div>
      <h3 class="text-2xl font-semibold mb-4">
        <i class="fa-solid fa-palette mr-2"></i>Hobbies & Interests
      </h3>
      <ul class="space-y-2 text-center max-w-md mx-auto">
        <li><i class="fa-solid fa-code mr-2 text-blue-400"></i>Coding and Problem Solving</li>
        <li><i class="fa-solid fa-camera mr-2 text-pink-400"></i>Content Creation</li>
        <li><i class="fa-solid fa-tv mr-2 text-purple-400"></i> Watching Movies & Series</li>
        <li><i class="fa-solid fa-plane mr-2 text-green-400"></i>Traveling & exploring new cultures</li>
      </ul>
    </div>
  `,
};

  // function to smoothly load content
let timeoutId;
function loadContent(type) {
  info.classList.add("opacity-0", "translate-y-2");
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    info.innerHTML = content[type];
    info.classList.remove("opacity-0", "translate-y-2");
    info.classList.add("opacity-100", "translate-y-0");
  }, 200);
}

// add event listeners for all tab buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    buttons.forEach((b) => b.classList.remove("active-btn"));
    // Add active to the clicked one
    btn.classList.add("active-btn");

    // Determine which tab to load based on button ID
    const type = btn.id.replace("btn-", "");
    loadContent(type);
  });
});

// load default tab (experience) on page load
window.addEventListener("DOMContentLoaded", () => loadContent("experience"));

