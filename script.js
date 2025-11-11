// -------------------------------------------
// 🌟 YOUTUBE CLONE - SMOOTH PREMIUM ANIMATIONS
// -------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // 🎞️ VIDEO CARD ENTRANCE ANIMATION
  // ===============================
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px) scale(0.98)";
    card.style.transition = "opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)";
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0) scale(1)";
    }, 120 * index); // slight delay stagger
  });

  // ===============================
  // 🎯 SIDEBAR ICON HOVER
  // ===============================
  const sideIcons = document.querySelectorAll(".side-icons");
  sideIcons.forEach(icon => {
    icon.addEventListener("mouseenter", () => {
      icon.style.transition = "transform 0.25s ease, color 0.25s ease";
      icon.style.transform = "scale(1.15)";
      icon.style.color = "#ff0000";
    });
    icon.addEventListener("mouseleave", () => {
      icon.style.transform = "scale(1)";
      icon.style.color = "#ddd";
    });
  });

  // ===============================
  // 🏷️ SMOOTH SCROLLABLE TAGS BAR
  // ===============================
  const tags = document.querySelector(".tags");
  if (tags) {
    let isDown = false, startX, scrollLeft;
    tags.addEventListener("mousedown", (e) => {
      isDown = true;
      tags.classList.add("active");
      startX = e.pageX - tags.offsetLeft;
      scrollLeft = tags.scrollLeft;
    });
    tags.addEventListener("mouseleave", () => (isDown = false, tags.classList.remove("active")));
    tags.addEventListener("mouseup", () => (isDown = false, tags.classList.remove("active")));
    tags.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - tags.offsetLeft;
      const walk = (x - startX) * 1.8; // speed
      tags.scrollLeft = scrollLeft - walk;
    });
  }

  // ===============================
  // 🔍 SEARCH BAR FOCUS EFFECT
  // ===============================
  const searchInput = document.querySelector(".search input");
  if (searchInput) {
    searchInput.addEventListener("focus", () => {
      searchInput.style.transition = "all 0.3s ease";
      searchInput.style.boxShadow = "0 0 10px rgba(255,0,0,0.3)";
      searchInput.style.borderColor = "#ff0000";
    });
    searchInput.addEventListener("blur", () => {
      searchInput.style.boxShadow = "none";
      searchInput.style.borderColor = "#ccc";
    });
  }

  // ===============================
  // 🎤 MICROPHONE HOVER PULSE
  // ===============================
  const mic = document.querySelector(".mic img");
  if (mic) {
    mic.addEventListener("mouseenter", () => {
      mic.style.transition = "transform 0.4s ease";
      mic.style.transform = "scale(1.25)";
      mic.style.filter = "drop-shadow(0 0 5px #ff0000)";
    });
    mic.addEventListener("mouseleave", () => {
      mic.style.transform = "scale(1)";
      mic.style.filter = "none";
    });
  }

  // ===============================
  // 🌀 SCROLL REVEAL ON VIDEOS
  // ===============================
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0) scale(1)";
          entry.target.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        } else {
          entry.target.style.opacity = "0";
          entry.target.style.transform = "translateY(40px) scale(0.98)";
        }
      });
    },
    { threshold: 0.15 }
  );
  cards.forEach(card => observer.observe(card));

  // ===============================
  // 🧭 HEADER SHOW/HIDE ON SCROLL
  // ===============================
  let lastScrollTop = 0;
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop + 10) {
      // scroll down → hide navbar
      nav.style.transform = "translateY(-100%)";
      nav.style.transition = "transform 0.4s ease";
    } else if (scrollTop < lastScrollTop - 10) {
      // scroll up → show navbar
      nav.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // ===============================
  // 🌐 GLOBAL SMOOTH SCROLL
  // ===============================
  document.documentElement.style.scrollBehavior = "smooth";
});
  // ===============================
  // 🎬 ALLOW ONLY ONE VIDEO TO PLAY AT A TIME
  // ===============================
  const videos = document.querySelectorAll("iframe");

  videos.forEach((video) => {
    video.addEventListener("play", (event) => {
      videos.forEach((v) => {
        if (v !== event.target) {
          v.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
      });
    });
  });
  // 🎬 Allow only one YouTube video to play at a time
  const ytPlayers = document.querySelectorAll(".yt-player");

  // Function to pause all players except the one playing
  function pauseOtherVideos(currentIframe) {
    ytPlayers.forEach((iframe) => {
      if (iframe !== currentIframe) {
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        );
      }
    });
  }

  // Detect when user clicks "play" on any iframe
  window.addEventListener("message", (event) => {
    if (event.data && typeof event.data === "string" && event.data.includes('"event":"onStateChange"')) {
      try {
        const data = JSON.parse(event.data);
        // YouTube state 1 = playing
        if (data.event === "onStateChange" && data.info === 1) {
          const playingIframe = Array.from(ytPlayers).find((iframe) =>
            event.source === iframe.contentWindow
          );
          if (playingIframe) pauseOtherVideos(playingIframe);
        }
      } catch (err) {
        // ignore invalid message
      }
    }
  });
const videoBoxes = document.querySelectorAll(".video-box");
  let currentPlaying = null;

  videoBoxes.forEach((box) => {
    const id = box.dataset.id;

    // Preload thumbnail image to make it smoother
    const thumb = new Image();
    thumb.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

    box.addEventListener("click", () => {
      // Stop previous video instantly
      if (currentPlaying && currentPlaying !== box) {
        const oldId = currentPlaying.dataset.id;
        currentPlaying.innerHTML = `
          <img src="https://img.youtube.com/vi/${oldId}/hqdefault.jpg" class="thumbnail" alt="thumbnail" />
        `;
      }

      // 🔥 Optimized: load lightweight preview first
      box.innerHTML = `
        <iframe 
          src="https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1"
          loading="lazy"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen>
        </iframe>
      `;

      currentPlaying = box;
    });
  });
  const boxes = document.querySelectorAll(".video-box");
  let current = null;

  boxes.forEach((box) => {
    const iframe = box.querySelector("iframe");
    const img = box.querySelector("img");

    img.addEventListener("click", () => {
      if (current && current !== box) {
        const prevIframe = current.querySelector("iframe");
        const prevImg = current.querySelector("img");
        prevIframe.style.display = "none";
        prevImg.style.display = "block";
        prevIframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
      }

      iframe.style.display = "block";
      img.style.display = "none";
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
      current = box;
    });
  });
  