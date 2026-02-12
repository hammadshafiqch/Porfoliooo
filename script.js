// script.js — complete JS for graphic designer portfolio
// Contains: rotating quotes, smooth scroll, login functionality, social auth

(function() {
  "use strict";

  // ---------- DYNAMIC QUOTES (design philosophy) ----------
  const quotes = [
    "“Design is intelligence made visible.” — Ch Hammad",
    "“Creativity is nothing but a mind set free.” — Ch Hammad",
    "“Make it simple, but significant.” — Ch Hammad",
    "“A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.” — Ch Hammad",
    "“Color is a power which directly influences the soul.” — Ch Hammad",
    "“Every project is an opportunity to tell a story.” — Ch Hammad",
    "“Explore our fiverr gigs and use 804 code to get 20% discount”",
    "“Affordable price for premium thumbnails.” - Ch Hammad",
  ];

  const quoteElement = document.getElementById("dynamicQuote");
  const quoteBtn = document.getElementById("quoteBtn");

  if (quoteBtn) {
    quoteBtn.addEventListener("click", function() {
      if (quoteElement) {
        let randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
      }
    });
  }

  // ---------- SET ACTIVE NAV STATE ----------
  function setActiveNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".primary-nav a");

    navLinks.forEach(link => {
      const linkHref = link.getAttribute("href");
      link.classList.remove("active");
      if (linkHref === currentPage) {
        link.classList.add("active");
      }
    });
  }

  // ---------- FOOTER: DYNAMIC COPYRIGHT YEAR ----------
  function setCopyrightYear() {
    const footerParagraph = document.querySelector(".main-footer .footer-content p");
    if (footerParagraph) {
      const currentYear = new Date().getFullYear();
      footerParagraph.innerHTML = `© ${currentYear} Ch Hammad — graphics designer`;
    }
  }

  // ---------- SMOOTH SCROLL FOR LET'S TALK BUTTON ----------
  function setupSmoothScroll() {
    const letsTalkBtn = document.querySelector('.lets-talk-scroll');
    
    if (letsTalkBtn) {
      letsTalkBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerOffset = 80;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      });
    }
  }

  // ---------- MAKE ALL PROJECT CARDS CLICKABLE ----------
  function setupClickableCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
      if (!card.querySelector('.card-link')) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
          const links = [
            "https://www.fiverr.com/s/9955YRY",
            "https://www.fiverr.com/s/kLEEr4W", 
            "https://www.fiverr.com/s/kLEErPg"
          ];
          if (index < links.length) {
            window.open(links[index], "_blank");
          }
        });
      }
    });
  }

  // ---------- DEEPSEEK-STYLE LOGIN WITH GOOGLE & APPLE ----------
  
  // Elements
  const loginOverlay = document.getElementById('loginOverlay');
  const websiteContent = document.getElementById('websiteContent');
  const loginSubmitBtn = document.getElementById('loginSubmitBtn');
  const signupTabBtn = document.getElementById('signupTabBtn');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const passwordToggle = document.querySelector('.password-toggle');

  // Check if user is already logged in
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  // If already logged in, hide overlay and show website
  if (isLoggedIn) {
    if (loginOverlay) loginOverlay.style.display = 'none';
    if (websiteContent) websiteContent.style.display = 'block';
  } else {
    // Show login overlay by default
    if (loginOverlay) loginOverlay.style.display = 'flex';
    if (websiteContent) websiteContent.style.display = 'none';
  }

  // Handle Login / Sign Up Submit
  if (loginSubmitBtn) {
    loginSubmitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const email = loginEmail ? loginEmail.value : '';
      const password = loginPassword ? loginPassword.value : '';
      const isSignupMode = loginOverlay.classList.contains('signup-mode');
      
      if (isSignupMode) {
        // Sign up mode
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (!email || !password) {
          alert('Please fill in all fields');
          return;
        }
        
        if (confirmPassword && password !== confirmPassword.value) {
          alert('Passwords do not match!');
          return;
        }
        
        // Demo signup
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('userName', email.split('@')[0] || 'User');
        
        alert('Account created successfully! Welcome aboard!');
        
      } else {
        // Login mode
        if (!email || !password) {
          alert('Please enter both email and password');
          return;
        }
        
        // Demo login
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('userName', email.split('@')[0] || 'User');
        
        alert('Successfully logged in! Welcome back.');
      }
      
      // Hide overlay with animation
      if (loginOverlay) {
        loginOverlay.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
          loginOverlay.style.display = 'none';
        }, 450);
      }
      
      // Show website content
      if (websiteContent) {
        websiteContent.style.display = 'block';
        websiteContent.style.animation = 'fadeIn 0.8s ease';
      }
      
      console.log('User logged in:', email);
    });
  }

  // Handle Sign Up Tab
  if (signupTabBtn) {
    signupTabBtn.addEventListener('click', function() {
      // Toggle signup mode
      loginOverlay.classList.add('signup-mode');
      
      // Change header text
      const headerTitle = document.querySelector('.login-header h1');
      const headerSubtitle = document.querySelector('.login-header p');
      if (headerTitle) headerTitle.textContent = 'Create Account';
      if (headerSubtitle) headerSubtitle.textContent = 'Sign up to get started with your portfolio';
      
      // Change button text
      loginSubmitBtn.textContent = 'Sign up';
      
      // Add confirm password field if it doesn't exist
      const passwordGroup = document.querySelector('.login-input-group:has(#loginPassword)');
      if (passwordGroup && !document.querySelector('#confirmPassword')) {
        const confirmGroup = document.createElement('div');
        confirmGroup.className = 'login-input-group';
        confirmGroup.innerHTML = `
          <div class="input-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
              <path d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <input type="password" id="confirmPassword" placeholder="Confirm password" class="login-input">
        `;
        passwordGroup.parentNode.insertBefore(confirmGroup, passwordGroup.nextSibling);
      }
    });
  }

  // Handle Login Tab (when in signup mode)
  const loginTab = document.querySelector('.login-tab');
  if (loginTab) {
    loginTab.addEventListener('click', function() {
      // Remove signup mode
      loginOverlay.classList.remove('signup-mode');
      
      // Change header text back
      const headerTitle = document.querySelector('.login-header h1');
      const headerSubtitle = document.querySelector('.login-header p');
      if (headerTitle) headerTitle.textContent = 'Welcome Back';
      if (headerSubtitle) headerSubtitle.textContent = 'Sign in to continue to your portfolio';
      
      // Change button text back
      loginSubmitBtn.textContent = 'Log in';
      
      // Remove confirm password field
      const confirmField = document.querySelector('#confirmPassword');
      if (confirmField) {
        confirmField.closest('.login-input-group').remove();
      }
    });
  }

  // Toggle password visibility
  if (passwordToggle) {
    passwordToggle.addEventListener('click', function() {
      const passwordInput = document.getElementById('loginPassword');
      if (passwordInput) {
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          passwordToggle.textContent = '🔒';
        } else {
          passwordInput.type = 'password';
          passwordToggle.textContent = '👁️';
        }
      }
    });
  }

  // Handle Enter key press
  if (loginEmail && loginPassword && loginSubmitBtn) {
    loginEmail.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') loginSubmitBtn.click();
    });
    
    loginPassword.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') loginSubmitBtn.click();
    });
  }

  // ---------- SOCIAL LOGIN HANDLERS (Google, Apple, GitHub) ----------
  
  // Google Login
  const googleBtn = document.querySelector('.social-login-btn.google');
  if (googleBtn) {
    googleBtn.addEventListener('click', function() {
      console.log('Login with Google');
      
      // Demo - simulate Google login
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', 'user@gmail.com');
      sessionStorage.setItem('userName', 'Google User');
      sessionStorage.setItem('authProvider', 'google');
      
      // Hide overlay
      if (loginOverlay) {
        loginOverlay.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
          loginOverlay.style.display = 'none';
        }, 450);
      }
      
      // Show website
      if (websiteContent) {
        websiteContent.style.display = 'block';
        websiteContent.style.animation = 'fadeIn 0.8s ease';
      }
      
      alert('Logged in with Google successfully!');
    });
  }

  // GitHub Login
  const githubBtn = document.querySelector('.social-login-btn.github');
  if (githubBtn) {
    githubBtn.addEventListener('click', function() {
      console.log('Login with GitHub');
      
      // Demo - simulate GitHub login
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', 'user@github.com');
      sessionStorage.setItem('userName', 'GitHub User');
      sessionStorage.setItem('authProvider', 'github');
      
      // Hide overlay
      if (loginOverlay) {
        loginOverlay.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
          loginOverlay.style.display = 'none';
        }, 450);
      }
      
      // Show website
      if (websiteContent) {
        websiteContent.style.display = 'block';
        websiteContent.style.animation = 'fadeIn 0.8s ease';
      }
      
      alert('Logged in with GitHub successfully!');
    });
  }

  // Apple Login
  const appleBtn = document.querySelector('.social-login-btn.apple');
  if (appleBtn) {
    appleBtn.addEventListener('click', function() {
      console.log('Login with Apple');
      
      // Demo - simulate Apple login
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userEmail', 'user@icloud.com');
      sessionStorage.setItem('userName', 'Apple User');
      sessionStorage.setItem('authProvider', 'apple');
      
      // Hide overlay
      if (loginOverlay) {
        loginOverlay.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
          loginOverlay.style.display = 'none';
        }, 450);
      }
      
      // Show website
      if (websiteContent) {
        websiteContent.style.display = 'block';
        websiteContent.style.animation = 'fadeIn 0.8s ease';
      }
      
      alert('Logged in with Apple successfully!');
    });
  }

  // Email login button handler
  const emailBtn = document.querySelector('.social-login-btn.email');
  if (emailBtn) {
    emailBtn.addEventListener('click', function() {
      // Focus on email input
      if (loginEmail) {
        loginEmail.focus();
        loginEmail.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // ---------- UPDATE AUTH UI ----------
  function updateAuthUI() {
    const isUserLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const userName = sessionStorage.getItem('userName') || 'Account';
    
    // Update header buttons if they exist
    const headerLoginBtn = document.querySelector('.btn-login');
    const headerSignupBtn = document.querySelector('.btn-signup');
    
    if (headerLoginBtn) {
      if (isUserLoggedIn) {
        headerLoginBtn.innerHTML = `👤 ${userName}`;
        headerLoginBtn.classList.add('logged-in');
        if (headerSignupBtn) headerSignupBtn.style.display = 'none';
      } else {
        headerLoginBtn.innerHTML = 'Sign In';
        headerLoginBtn.classList.remove('logged-in');
        if (headerSignupBtn) headerSignupBtn.style.display = 'block';
      }
    }
  }

  // ---------- LOGOUT FUNCTION ----------
  window.logout = function() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('authProvider');
    
    // Hide website content
    if (websiteContent) websiteContent.style.display = 'none';
    
    // Show login overlay
    if (loginOverlay) {
      loginOverlay.style.display = 'flex';
      loginOverlay.style.animation = 'fadeIn 0.5s ease';
      
      // Reset to login mode
      loginOverlay.classList.remove('signup-mode');
      
      // Reset header text
      const headerTitle = document.querySelector('.login-header h1');
      const headerSubtitle = document.querySelector('.login-header p');
      if (headerTitle) headerTitle.textContent = 'Welcome Back';
      if (headerSubtitle) headerSubtitle.textContent = 'Sign in to continue to your portfolio';
      
      // Reset button text
      if (loginSubmitBtn) loginSubmitBtn.textContent = 'Log in';
      
      // Remove confirm password field
      const confirmField = document.querySelector('#confirmPassword');
      if (confirmField) {
        confirmField.closest('.login-input-group').remove();
      }
      
      // Clear input fields
      if (loginEmail) loginEmail.value = '';
      if (loginPassword) loginPassword.value = '';
    }
    
    updateAuthUI();
    alert('You have been signed out.');
  };

  // Add logout button listener if exists
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.logout();
    });
  }

  // Add fadeOut animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // ---------- INITIALIZE ----------
  document.addEventListener("DOMContentLoaded", function() {
    setActiveNav();
    setCopyrightYear();
    setupSmoothScroll();
    setupClickableCards();
    updateAuthUI();
    
    // Set random quote on page load
    if (quoteElement) {
      let initialIndex = Math.floor(Math.random() * quotes.length);
      quoteElement.textContent = quotes[initialIndex];
    }
    
    console.log("✨ Welcome to Ch Hammad's portfolio");
    console.log("🔐 DeepSeek-style login with Google & Apple");
  });

})();