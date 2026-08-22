/* Dhanvin Assets - Main Interactive Scripts */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMobileMenu();
  initScrollProgress();
  initStickyCta();
  initFaqs();
  initTestimonialSlider();
  initChatbot();
  initBookingForm();
});

/* 1. Theme Management (Light/Dark Mode) */
function initTheme() {
  const themeToggles = document.querySelectorAll(".theme-toggle");
  
  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dhanvin-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dhanvin-theme", "light");
    }
    updateToggleIcons(theme);
  };

  const updateToggleIcons = (theme) => {
    themeToggles.forEach(btn => {
      const sunIcon = btn.querySelector(".sun-icon");
      const moonIcon = btn.querySelector(".moon-icon");
      if (theme === "dark") {
        if (sunIcon) sunIcon.classList.remove("hidden");
        if (moonIcon) moonIcon.classList.add("hidden");
      } else {
        if (sunIcon) sunIcon.classList.add("hidden");
        if (moonIcon) moonIcon.classList.remove("hidden");
      }
    });
  };

  // Initial Theme load
  const savedTheme = localStorage.getItem("dhanvin-theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
  applyTheme(initialTheme);

  // Bind click handlers
  themeToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const isCurrentlyDark = document.documentElement.classList.contains("dark");
      applyTheme(isCurrentlyDark ? "light" : "dark");
    });
  });
}

/* 2. Mobile Menu Navigation */
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-menu-close");
  const drawer = document.getElementById("mobile-menu-drawer");
  const menuLinks = document.querySelectorAll("#mobile-menu-drawer a");

  if (!menuBtn || !drawer) return;

  const toggleDrawer = (open) => {
    if (open) {
      drawer.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      drawer.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }
  };

  menuBtn.addEventListener("click", () => toggleDrawer(true));
  if (closeBtn) closeBtn.addEventListener("click", () => toggleDrawer(false));
  menuLinks.forEach(link => {
    link.addEventListener("click", () => toggleDrawer(false));
  });
}

/* 3. Scroll Progress Indicator */
function initScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }
  });
}

/* 4. Sticky Bottom CTA Bar */
function initStickyCta() {
  const stickyBar = document.getElementById("sticky-cta-bar");
  if (!stickyBar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 550) {
      stickyBar.classList.remove("translate-y-24", "opacity-0");
    } else {
      stickyBar.classList.add("translate-y-24", "opacity-0");
    }
  });
}

/* 5. FAQ Accordions */
function initFaqs() {
  const faqButtons = document.querySelectorAll(".faq-btn");
  faqButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const faqItem = btn.parentElement;
      const answer = faqItem.querySelector(".faq-answer");
      const icon = btn.querySelector("svg");
      
      const isOpen = !answer.classList.contains("hidden");

      // Close all other FAQs first
      document.querySelectorAll(".faq-answer").forEach(ans => ans.classList.add("hidden"));
      document.querySelectorAll(".faq-btn svg").forEach(svg => svg.classList.remove("rotate-180"));

      if (!isOpen) {
        answer.classList.remove("hidden");
        if (icon) icon.classList.add("rotate-180");
      }
    });
  });
}

/* 6. Testimonial Carousel Slider */
function initTestimonialSlider() {
  const testimonialItems = document.querySelectorAll(".testimonial-item");
  const prevBtn = document.getElementById("testimonial-prev");
  const nextBtn = document.getElementById("testimonial-next");
  
  if (testimonialItems.length === 0) return;
  
  let currentIndex = 0;

  const showTestimonial = (index) => {
    testimonialItems.forEach((item, idx) => {
      if (idx === index) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  };

  // Initial view
  showTestimonial(currentIndex);

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
      showTestimonial(currentIndex);
    });
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % testimonialItems.length;
      showTestimonial(currentIndex);
    });
  }
}

/* 7. Floating Chatbot Utility */
function initChatbot() {
  const botBtn = document.getElementById("chatbot-toggle");
  const botPanel = document.getElementById("chatbot-panel");
  const closeBtn = document.getElementById("chatbot-close");
  const chatMessages = document.getElementById("chatbot-messages");
  const chatInput = document.getElementById("chatbot-input");
  const chatForm = document.getElementById("chatbot-form");

  if (!botBtn || !botPanel) return;

  botBtn.addEventListener("click", () => {
    botPanel.classList.toggle("hidden");
    botPanel.classList.toggle("scale-95");
    botPanel.classList.toggle("opacity-0");
    scrollToBottom();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      botPanel.classList.add("hidden", "scale-95", "opacity-0");
    });
  }

  const scrollToBottom = () => {
    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const createBubble = (text, sender) => {
    const wrapper = document.createElement("div");
    wrapper.className = `flex ${sender === "user" ? "justify-end" : "justify-start"}`;
    
    const bubble = document.createElement("div");
    bubble.className = `p-3 rounded-2xl text-xs leading-relaxed max-w-[80%] ${
      sender === "user"
        ? "bg-[#4B2E83] dark:bg-[#D4AF37] text-white dark:text-[#1b0e36] rounded-tr-none"
        : "bg-white dark:bg-[#1b0e36] text-black dark:text-white border border-gray-100 dark:border-gray-800 rounded-tl-none shadow-sm"
    }`;
    bubble.textContent = text;
    wrapper.appendChild(bubble);
    
    if (chatMessages) {
      chatMessages.appendChild(wrapper);
      scrollToBottom();
    }
  };

  const botResponses = {
    explore_funds: {
      text: "Mutual Funds pool capital across stocks/bonds. We design custom structures to optimize alpha, review overlaps, and slash cost drags.",
      actions: [
        { label: "📊 Go to Calculators", href: "../calculators.html" },
        { label: "🔙 Main Menu", action: "main_menu" }
      ]
    },
    start_sip: {
      text: "SIPs build discipline and compound wealth over cycles. A ₹10k monthly SIP at 12% returns yields ₹98 Lakh in 20 Yrs!",
      actions: [
        { label: "📈 Open SIP Planner", href: "../calculators.html" },
        { label: "🔙 Main Menu", action: "main_menu" }
      ]
    },
    explore_insurance: {
      text: "We review Term Life covers and zero co-pay medical policies to safeguard family cash flows from emergencies.",
      actions: [
        { label: "📞 Connect WhatsApp", href: "https://wa.me/919320114510" },
        { label: "🔙 Main Menu", action: "main_menu" }
      ]
    },
    book_meeting: {
      text: "Book a private 1-on-1 consultation slot. Let's design your retirement, child, or general portfolio roadmap.",
      actions: [
        { label: "📅 Book Consultation", href: "../contact.html#booking" },
        { label: "🟢 Chat WhatsApp", href: "https://wa.me/919320114510" }
      ]
    },
    main_menu: {
      text: "Select a topic to explore or schedule an appointment with our wealth desk:",
      actions: [
        { label: "📊 Explore Mutual Funds", action: "explore_funds" },
        { label: "📈 Start a SIP", action: "start_sip" },
        { label: "🛡️ Life & Health Insurance", action: "explore_insurance" },
        { label: "📞 Book Free Consultation", action: "book_meeting" }
      ]
    }
  };

  const bindActionButtons = () => {
    document.querySelectorAll(".bot-action-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const action = btn.getAttribute("data-action");
        const label = btn.textContent.trim();
        const href = btn.getAttribute("data-href");
        
        if (href) {
          window.location.href = href;
          return;
        }

        createBubble(label, "user");
        triggerTypingEffect(action);
      });
    });
  };

  const triggerTypingEffect = (actionKey) => {
    // Typing indicator
    const indicator = document.createElement("div");
    indicator.className = "flex justify-start typing-indicator";
    indicator.innerHTML = `
      <div class="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none text-xs flex gap-1 items-center">
        <span class="w-1.5 h-1.5 bg-[#4B2E83] dark:bg-[#D4AF37] rounded-full animate-bounce"></span>
        <span class="w-1.5 h-1.5 bg-[#4B2E83] dark:bg-[#D4AF37] rounded-full animate-bounce" style="animation-delay:150ms"></span>
        <span class="w-1.5 h-1.5 bg-[#4B2E83] dark:bg-[#D4AF37] rounded-full animate-bounce" style="animation-delay:300ms"></span>
      </div>
    `;
    if (chatMessages) {
      chatMessages.appendChild(indicator);
      scrollToBottom();
    }

    setTimeout(() => {
      // Remove indicator
      const ind = chatMessages.querySelector(".typing-indicator");
      if (ind) ind.remove();

      const response = botResponses[actionKey] || botResponses["main_menu"];
      
      const botWrapper = document.createElement("div");
      botWrapper.className = "flex justify-start flex-col gap-1.5 max-w-[80%]";
      
      const bubble = document.createElement("div");
      bubble.className = "p-3 rounded-2xl text-xs leading-relaxed bg-white dark:bg-[#1b0e36] text-black dark:text-white border border-gray-100 dark:border-gray-800 rounded-tl-none shadow-sm";
      bubble.textContent = response.text;
      botWrapper.appendChild(bubble);

      if (response.actions) {
        response.actions.forEach(act => {
          const actBtn = document.createElement("button");
          actBtn.className = "w-full text-left py-2 px-3 bg-purple-50 dark:bg-[#1b0e36] hover:bg-[#4B2E83] hover:text-white text-[#4B2E83] dark:text-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-[#1b0e36] rounded-xl border border-purple-100 dark:border-gray-800 font-poppins font-medium text-[11px] transition-all cursor-pointer bot-action-btn";
          actBtn.textContent = act.label;
          if (act.action) actBtn.setAttribute("data-action", act.action);
          if (act.href) actBtn.setAttribute("data-href", act.href);
          botWrapper.appendChild(actBtn);
        });
      }

      if (chatMessages) {
        chatMessages.appendChild(botWrapper);
        scrollToBottom();
      }
      bindActionButtons();
    }, 850);
  };

  // Bind initial menu clicks
  bindActionButtons();

  if (chatForm && chatInput) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;
      
      createBubble(val, "user");
      chatInput.value = "";
      
      const q = val.toLowerCase();
      let key = "main_menu";
      if (q.includes("sip") || q.includes("invest")) key = "start_sip";
      else if (q.includes("insur") || q.includes("health") || q.includes("term")) key = "explore_insurance";
      else if (q.includes("fund") || q.includes("mutual")) key = "explore_funds";
      else if (q.includes("meet") || q.includes("consult") || q.includes("book")) key = "book_meeting";
      
      triggerTypingEffect(key);
    });
  }
}

/* 8. Booking Appointment Logic */
function initBookingForm() {
  const form = document.getElementById("booking-form");
  const dateBtns = document.querySelectorAll(".date-select-btn");
  const slotBtns = document.querySelectorAll(".slot-select-btn");
  
  if (!form) return;

  let selectedDate = null;
  let selectedSlot = null;

  // Bind Dates selections
  dateBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      dateBtns.forEach(b => b.classList.remove("bg-[#4B2E83]", "text-white", "dark:bg-[#D4AF37]", "dark:text-[#1b0e36]", "scale-105"));
      btn.classList.add("bg-[#4B2E83]", "text-white", "scale-105");
      if (document.documentElement.classList.contains("dark")) {
        btn.classList.add("dark:bg-[#D4AF37]", "dark:text-[#1b0e36]");
      }
      selectedDate = btn.getAttribute("data-date");
      const err = document.getElementById("error-date");
      if (err) err.textContent = "";
    });
  });

  // Bind Time slots selections
  slotBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      slotBtns.forEach(b => b.classList.remove("bg-blue-600", "text-white", "scale-105"));
      btn.classList.add("bg-blue-600", "text-white", "scale-105");
      selectedSlot = btn.getAttribute("data-slot");
      const err = document.getElementById("error-time");
      if (err) err.textContent = "";
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("form-name").value.trim();
    const email = document.getElementById("form-email").value.trim();
    const phone = document.getElementById("form-phone").value.trim();

    let hasErrors = false;

    // Reset error fields
    document.querySelectorAll(".form-error").forEach(el => el.textContent = "");

    if (!selectedDate) {
      const err = document.getElementById("error-date");
      if (err) err.textContent = "Please select a preferred date";
      hasErrors = true;
    }
    if (!selectedSlot) {
      const err = document.getElementById("error-time");
      if (err) err.textContent = "Please select a preferred time slot";
      hasErrors = true;
    }
    if (!name) {
      const err = document.getElementById("error-name");
      if (err) err.textContent = "Full name is required";
      hasErrors = true;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      const err = document.getElementById("error-email");
      if (err) err.textContent = "Please enter a valid email address";
      hasErrors = true;
    }
    if (!phone || !/^\d{10}$/.test(phone.replace(/[^0-9]/g, ""))) {
      const err = document.getElementById("error-phone");
      if (err) err.textContent = "Please enter a valid 10-digit number";
      hasErrors = true;
    }

    if (hasErrors) return;

    // Save lead list
    const newLead = {
      id: "booking_" + Date.now(),
      type: "Consultation",
      name,
      email,
      phone,
      date: selectedDate,
      time: selectedSlot,
      timestamp: new Date().toISOString(),
      status: "Uncontacted"
    };

    try {
      const existingLeads = JSON.parse(localStorage.getItem("dhanvin-leads") || "[]");
      localStorage.setItem("dhanvin-leads", JSON.stringify([newLead, ...existingLeads]));
      
      // Determine directory back navigation level
      const currentPath = window.location.pathname;
      if (currentPath.includes("/services/")) {
        window.location.href = "../thank-you.html";
      } else {
        window.location.href = "thank-you.html";
      }
    } catch (err) {
      console.error("Storage error:", err);
    }
  });
}
