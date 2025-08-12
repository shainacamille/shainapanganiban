// Loading Screen Functionality
let loadingProgress = 0
const loadingScreen = document.getElementById("loading-screen")
const mainContent = document.getElementById("main-content")
const progressBar = document.querySelector(".loading-progress")
const percentageText = document.querySelector(".loading-percentage")

// Simulate loading progress
function updateLoadingProgress() {
  const interval = setInterval(() => {
    loadingProgress += Math.random() * 15

    if (loadingProgress >= 100) {
      loadingProgress = 100
      clearInterval(interval)

      // Complete loading after a short delay
      setTimeout(() => {
        completeLoading()
      }, 500)
    }

    progressBar.style.width = loadingProgress + "%"
    percentageText.textContent = Math.floor(loadingProgress) + "%"
  }, 100)
}

function completeLoading() {
  loadingScreen.classList.add("fade-out")
  mainContent.classList.add("show")

  // Remove loading screen from DOM after animation
  setTimeout(() => {
    loadingScreen.style.display = "none"
    document.body.style.overflow = "auto"
  }, 500)
}

// Start loading when page begins to load
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.overflow = "hidden"
  updateLoadingProgress()
})

// Ensure loading completes when everything is loaded
window.addEventListener("load", () => {
  // If loading hasn't completed yet, speed it up
  if (loadingProgress < 100) {
    loadingProgress = 90
    setTimeout(() => {
      completeLoading()
    }, 300)
  }
})

// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Optimized navbar background on scroll with throttling
let ticking = false
function updateNavbar() {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(0, 0, 0, 0.95)"
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.5)"
    navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.2)"
  } else {
    navbar.style.background = "rgba(0, 0, 0, 0.9)"
    navbar.style.boxShadow = "none"
    navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)"
  }
  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateNavbar)
    ticking = true
  }
})

// Portfolio filter functionality
const filterButtons = document.querySelectorAll(".filter-btn")
const workItems = document.querySelectorAll(".work-item")

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    // Add active class to clicked button
    button.classList.add("active")

    const filterValue = button.getAttribute("data-filter")

    workItems.forEach((item) => {
      if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
        item.style.display = "block"
        item.style.animation = "fadeIn 0.5s ease"
      } else {
        item.style.display = "none"
      }
    })
  })
})

// CV Download function
function downloadCV() {
  // Create a temporary link element
  const link = document.createElement("a")
  link.href = "assets/cv/panganiban resume.pdf" // Update this path when you add your CV file
  link.download = "Shaina_Camille_Panganiban_CV.pdf"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Optimized Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections for scroll animations (only after loading is complete)
setTimeout(() => {
  document.querySelectorAll(".section").forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(section)
  })
}, 1000)

// Add CSS animation keyframes dynamically
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`
document.head.appendChild(style)

// Optimized particle effects - Reduced count and simplified animation
function createVortexParticles() {
  // Reduce particle count for better performance
  const particleCount = window.innerWidth < 768 ? 5 : 10
  const particles = []

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "vortex-particle"
    particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
        `
    document.body.appendChild(particle)
    particles.push({
      element: particle,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.3 + 0.1,
    })
  }

  let animationId
  function animateParticles() {
    particles.forEach((particle) => {
      particle.angle += particle.speed * 0.005
      particle.x += Math.cos(particle.angle) * particle.speed
      particle.y += Math.sin(particle.angle) * particle.speed

      // Wrap around screen
      if (particle.x > window.innerWidth) particle.x = 0
      if (particle.x < 0) particle.x = window.innerWidth
      if (particle.y > window.innerHeight) particle.y = 0
      if (particle.y < 0) particle.y = window.innerHeight

      particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`
    })

    animationId = requestAnimationFrame(animateParticles)
  }

  // Only start particles if user hasn't requested reduced motion
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animateParticles()
  }

  // Pause particles when tab is not visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId)
    } else if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animateParticles()
    }
  })
}

// Initialize particle effects after loading is complete
setTimeout(() => {
  createVortexParticles()
}, 1500)

// Optimized Gallery System
const galleryData = {
  "fablab-cards": {
    title: "FABLAB CARAGA Business Card Project",
    images: [
      {
        src: "assets/img/graphic design/calling cards/fablab.png",
        title: "Complete Business Card Design",
        description:
          "Front and back design layout showing the complete business card project with professional branding and contact information.",
      },
      {
        src: "assets/img/graphic design/calling cards/front.png",
        title: "Front Design - Brand Focus",
        description:
          "Clean front design featuring the FABLAB CARAGA logo with modern geometric elements and professional presentation.",
      },
      {
        src: "assets/img/graphic design/calling cards/back.png",
        title: "Back Design - Contact Details",
        description:
          "Back side design with organized contact information, QR code integration, and consistent visual branding elements.",
      },
    ],
  },
  "tonyts-logo": {
    title: "Tonyt's Logo Enhancement & Product Mockup",
    images: [
      {
        src: "assets/img/mockup/tonyts.jpg",
        title: "Complete Product Line Mockup",
        description:
          "Professional product mockup showcasing the enhanced Tonyt's logo across three different product variants with distinct color schemes and branding consistency.",
      },
      {
        src: "assets/img/mockup/dried.png",
        title: "Dried Squid Head - Hot & Spicy",
        description:
          "Orange-themed packaging design for Tonyt's Dried Squid Head featuring enhanced logo design and clear product identification with appetizing color palette.",
      },
      {
        src: "assets/img/mockup/original.png",
        title: "Crunchy Squid - Original Flavor",
        description:
          "Turquoise packaging design for the original flavor variant, demonstrating brand consistency while maintaining distinct product differentiation through color coding.",
      },
      {
        src: "assets/img/mockup/hns.png",
        title: "Crunchy Squid - Hot & Spicy",
        description:
          "Bold red packaging design for the hot & spicy variant, utilizing vibrant colors to convey the product's intensity while maintaining the enhanced Tonyt's brand identity.",
      },
    ],
  },
  "euphoria-series": {
    title: "Rai's 18th Euphoria inspired Photoshoot",
    images: [
      {
        src: "assets/img/photography/rai-18th/cover.jpg",
        title: "Rai Euphoria Cover Art",
        description:
          "Stylized portrait featuring blue and purple lighting effects with custom typography overlay. Demonstrates advanced color grading, lighting manipulation, and graphic design integration in post-processing.",
      },
      {
        src: "assets/img/photography/rai-18th/1.jpg",
        title: "Neon Dreams Portrait",
        description:
          "Creative portrait with pink and purple neon lighting effects against bokeh background. Showcases expertise in mood lighting, color temperature adjustment, and atmospheric enhancement techniques.",
      },
      {
        src: "assets/img/photography/rai-18th/2.jpg",
        title: "Psychedelic Projection Art",
        description:
          "Artistic silhouette portrait with vibrant rainbow projection mapping effects. Combines photography with digital art techniques, showcasing creative use of light projection and color manipulation.",
      },
      {
        src: "assets/img/photography/rai-18th/rai.jpg",
        title: "Dual-Tone Lighting Study",
        description:
          "Sophisticated portrait featuring blue and pink dual-tone lighting with professional bokeh effects. Demonstrates mastery of split lighting techniques and advanced color grading workflows.",
      },
    ],
  },
  "mics-18th": {
    title: "Micah's 18th Birthday Photography Session",
    images: [
      {
        src: "assets/img/photography/mics-18th/cover.jpg",
        title: "Magazine Cover Concept",
        description:
          "Creative editorial-style portrait with custom magazine layout design. Combines portrait photography with graphic design elements, featuring professional lighting and styling with bunny ears and bow tie accessories.",
      },
      {
        src: "assets/img/photography/mics-18th/formal.jpg",
        title: "Elegant Portrait Study",
        description:
          "Classic formal portrait with soft, natural lighting and elegant jewelry styling. Demonstrates professional portrait photography techniques with excellent skin retouching and warm color grading.",
      },
      {
        src: "assets/img/photography/mics-18th/lolita inspo.jpg",
        title: "Vintage-Inspired Lifestyle Shot",
        description:
          "Playful vintage-aesthetic portrait with heart-shaped sunglasses and pink accessories. Features film-like editing with warm tones and soft grain for a nostalgic, youthful vibe.",
      },
      {
        src: "assets/img/photography/mics-18th/dreamy.jpg",
        title: "Dreamy Reading Portrait",
        description:
          "Intimate, soft-focus lifestyle portrait captured with natural light. Showcases mastery of atmospheric photography with flowers as props, creating a romantic and ethereal mood through subtle post-processing.",
      },
    ],
  },
}

let currentGallery = null
let currentImageIndex = 0

// Open Gallery Function
function openGallery(galleryId) {
  console.log("Opening gallery:", galleryId)

  currentGallery = galleryData[galleryId]
  if (!currentGallery) {
    console.error("Gallery not found:", galleryId)
    return
  }

  currentImageIndex = 0
  const modal = document.getElementById("gallery-modal")

  // Set title
  document.getElementById("gallery-title").textContent = currentGallery.title

  // Create thumbnails
  const thumbsContainer = document.getElementById("gallery-thumbs")
  thumbsContainer.innerHTML = ""

  currentGallery.images.forEach((image, index) => {
    const thumb = document.createElement("img")
    thumb.src = image.src
    thumb.alt = image.title
    thumb.className = "thumbnail"
    thumb.onclick = () => showImage(index)
    thumbsContainer.appendChild(thumb)
  })

  // Show first image
  showImage(0)

  // Show modal
  modal.style.display = "flex"
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

// Close Gallery Function
function closeGallery() {
  console.log("Closing gallery")

  const modal = document.getElementById("gallery-modal")
  modal.classList.remove("active")
  modal.style.display = "none"
  document.body.style.overflow = "auto"

  currentGallery = null
  currentImageIndex = 0
}

// Show Image Function
function showImage(index) {
  if (!currentGallery || index < 0 || index >= currentGallery.images.length) return

  currentImageIndex = index
  const image = currentGallery.images[index]

  // Update main image with smooth transition
  const mainImage = document.getElementById("gallery-main-image")
  mainImage.style.opacity = "0.7"

  setTimeout(() => {
    mainImage.src = image.src
    mainImage.alt = image.title
    mainImage.style.filter = "blur(0px)"
    mainImage.style.opacity = "1"

    document.getElementById("image-title").textContent = image.title
    document.getElementById("image-description").textContent = image.description
  }, 150)

  // Update thumbnails with blur effect
  document.querySelectorAll(".thumbnail").forEach((thumb, i) => {
    thumb.classList.remove("active")
    if (i === index) {
      thumb.classList.add("active")
      thumb.style.filter = "blur(2px)"
      thumb.style.opacity = "0.7"
    } else {
      thumb.style.filter = "blur(0px)"
      thumb.style.opacity = "1"
    }
  })

  // Update navigation buttons
  const prevBtn = document.querySelector(".gallery-prev")
  const nextBtn = document.querySelector(".gallery-next")

  prevBtn.disabled = index === 0
  nextBtn.disabled = index === currentGallery.images.length - 1
}

// Navigation Functions
function previousImage() {
  if (currentImageIndex > 0) {
    showImage(currentImageIndex - 1)
  }
}

function nextImage() {
  if (currentImageIndex < currentGallery.images.length - 1) {
    showImage(currentImageIndex + 1)
  }
}

// Event Listeners - Set up when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Close button
  const closeBtn = document.querySelector(".gallery-close")
  if (closeBtn) {
    closeBtn.onclick = closeGallery
  }

  // Modal background click
  const modal = document.getElementById("gallery-modal")
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) {
        closeGallery()
      }
    }
  }

  // Navigation buttons
  const prevBtn = document.querySelector(".gallery-prev")
  const nextBtn = document.querySelector(".gallery-next")

  if (prevBtn) prevBtn.onclick = previousImage
  if (nextBtn) nextBtn.onclick = nextImage

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return

    switch (e.key) {
      case "Escape":
        closeGallery()
        break
      case "ArrowLeft":
        previousImage()
        break
      case "ArrowRight":
        nextImage()
        break
    }
  })
})
