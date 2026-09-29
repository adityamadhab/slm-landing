"use client";

import { useEffect, useRef } from "react";
import { framerHomeHtml } from "./content/framer-data";
import { initLightRays } from "./components/initLightRays";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    // ==========================================
    // 0. Volumetric Animated Light Rays in Hero BG
    // ==========================================
    const bgContainer = root.querySelector<HTMLElement>(".framer-1rsmkl6-container");
    let cleanupLightRays: (() => void) | undefined;
    if (bgContainer) {
      cleanupLightRays = initLightRays(bgContainer);
    }

    // ==========================================
    // 1. Auto-play all background videos
    // ==========================================
    const videos = root.querySelectorAll<HTMLVideoElement>("video");
    videos.forEach((video) => {
      video.muted = true;
      video.autoplay = true;
      video.playsInline = true;
      video.loop = true;
      video.play().catch(() => {});
    });

    // ==========================================
    // 2. FAQ Accordion functionality
    // ==========================================
    const faqItems = root.querySelectorAll<HTMLElement>(".framer-PmboO");
    faqItems.forEach((item) => {
      item.style.cursor = "pointer";
      item.addEventListener("click", () => {
        const isClosed =
          item.classList.contains("framer-v-1dgicd") ||
          item.getAttribute("data-framer-name") === "Close";

        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove("framer-v-rek8sw");
            other.classList.add("framer-v-1dgicd");
            other.setAttribute("data-framer-name", "Close");
            const icon = other.querySelector<HTMLElement>(".framer-1d88yut");
            if (icon) icon.style.transform = "rotate(0deg)";
          }
        });

        if (isClosed) {
          item.classList.remove("framer-v-1dgicd");
          item.classList.add("framer-v-rek8sw");
          item.setAttribute("data-framer-name", "Open");
          const icon = item.querySelector<HTMLElement>(".framer-1d88yut");
          if (icon) icon.style.transform = "rotate(180deg)";
        } else {
          item.classList.remove("framer-v-rek8sw");
          item.classList.add("framer-v-1dgicd");
          item.setAttribute("data-framer-name", "Close");
          const icon = item.querySelector<HTMLElement>(".framer-1d88yut");
          if (icon) icon.style.transform = "rotate(0deg)";
        }
      });
    });

    // ==========================================
    // 3. Mobile Navigation Menu Toggle
    // ==========================================
    const burgerButtons = root.querySelectorAll<HTMLElement>(
      ".framer-ZLw4j, .framer-153cpjv-container"
    );
    burgerButtons.forEach((btn) => {
      btn.style.cursor = "pointer";
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const mobileNav = root.querySelector<HTMLElement>(
          'nav[data-framer-name^="Mobile"]'
        );
        if (!mobileNav) return;
        const isOpen = mobileNav.classList.contains("framer-v-18krsnf");
        if (isOpen) {
          mobileNav.classList.remove("framer-v-18krsnf");
          mobileNav.classList.add("framer-v-tvlyn2");
          mobileNav.setAttribute("data-framer-name", "Mobile - Close");
        } else {
          mobileNav.classList.remove("framer-v-tvlyn2");
          mobileNav.classList.add("framer-v-18krsnf");
          mobileNav.setAttribute("data-framer-name", "Mobile - Open");
        }
      });
    });

    // ==========================================
    // 4. Feature Tabs Switcher
    // ==========================================
    const tabData = [
      {
        name: "Tracking",
        icon: "https://framerusercontent.com/images/7SeFTDcRAvLiKsySw3xu1d32yQ.svg?width=18&height=22",
        video:
          "https://framerusercontent.com/assets/BmjuzTfgFfIrtnqb0EG52KQZ8oQ.mp4",
        text: "Track performance metrics effortlessly with automated updates that keep your business aligned and moving forward.",
      },
      {
        name: "Dashboard",
        icon: "https://framerusercontent.com/images/95msAlnvgG4IWdSPF7eCj47k.svg?width=20&height=20",
        video:
          "https://framerusercontent.com/assets/8JYC2izAIyp5cMXetc35xADc8.mp4",
        text: "Track performance metrics effortlessly with automated updates that keep your business aligned and moving forward.",
      },
      {
        name: "Alerts",
        icon: "https://framerusercontent.com/images/RnV0eIDmn87oPW6SSF49UeqY44.svg?width=16&height=21",
        video:
          "https://framerusercontent.com/assets/Yn2cf4tiDCzkseusBKaqRDXlKE.mp4",
        text: "Track performance metrics effortlessly with automated updates that keep your business aligned and moving forward.",
      },
    ];

    const tabButtons = root.querySelectorAll<HTMLElement>(".framer-tqc49u > div");
    tabButtons.forEach((tabContainer, idx) => {
      tabContainer.style.cursor = "pointer";
      tabContainer.addEventListener("click", () => {
        tabButtons.forEach((other, oIdx) => {
          const tabInner = other.querySelector<HTMLElement>(".framer-nQMRv");
          const heading = other.querySelector<HTMLElement>(".framer-1hrngoa");
          if (!tabInner) return;
          if (oIdx === idx) {
            tabInner.classList.remove("framer-v-1uvnvdz");
            tabInner.classList.add("framer-v-19ey1uc");
            tabInner.setAttribute("data-framer-name", "Active");
            if (heading) {
              heading.style.setProperty(
                "--extracted-1of0zx5",
                "var(--token-88b64a24-15ca-44b9-9d5e-e283eecf6c27, rgb(255, 255, 255))"
              );
            }
          } else {
            tabInner.classList.remove("framer-v-19ey1uc");
            tabInner.classList.add("framer-v-1uvnvdz");
            tabInner.setAttribute("data-framer-name", "InActive");
            if (heading) {
              heading.style.setProperty(
                "--extracted-1of0zx5",
                "var(--token-36b57b74-0f26-4a51-a1b4-364240e294bb, rgba(255, 255, 255, 0.6))"
              );
            }
          }
        });

        const activeCard = root.querySelector<HTMLElement>(
          ".framer-v9p881, .framer-1o1sv4n, .framer-1k8zhp1"
        );
        if (activeCard && tabData[idx]) {
          const cardVideo = activeCard.querySelector<HTMLVideoElement>("video");
          if (cardVideo && cardVideo.src !== tabData[idx].video) {
            cardVideo.src = tabData[idx].video;
            cardVideo.load();
            cardVideo.play().catch(() => {});
          }
          const cardIcon = activeCard.querySelector<HTMLElement>(
            ".framer-gvkfxc, .framer-56hs8x, .framer-qtn8l6"
          );
          if (cardIcon) {
            cardIcon.style.backgroundImage = `url(${tabData[idx].icon})`;
            cardIcon.style.backgroundRepeat = "no-repeat";
            cardIcon.style.backgroundPosition = "center";
            cardIcon.style.backgroundSize = "contain";
          }
          const cardText = activeCard.querySelector<HTMLElement>(
            ".framer-zj5cm1 p, .framer-1lt9ocr p"
          );
          if (cardText) {
            cardText.textContent = tabData[idx].text;
          }
        }
      });
    });

    // ==========================================
    // 5. Solution Bento Cards Staggered Reveal
    // ==========================================
    const bentoCards = root.querySelectorAll<HTMLElement>(
      ".framer-1rgo19o-container, .framer-1y2ithe-container, .framer-12qlzjb-container"
    );
    bentoCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
      card.style.transition =
        "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)";
    });

    const bentoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            bentoCards.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0px)";
              }, i * 160);
            });
            bentoObserver.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    const bentoContainer = root.querySelector<HTMLElement>(".framer-1ut50gx");
    if (bentoContainer) {
      bentoObserver.observe(bentoContainer);
    }

    // ==========================================
    // 6. SCROLL ANIMATION ENGINE (60 FPS rAF)
    // ==========================================
    const heroSection = root.querySelector<HTMLElement>("#hero") || root.querySelector<HTMLElement>(".framer-knV2p");
    const heroGraphic = root.querySelector<HTMLElement>(".framer-edjs39");
    const heroTitle = root.querySelector<HTMLElement>(".framer-1q9xlnn");
    const heroSubtitle = root.querySelector<HTMLElement>(".framer-v90vsv");
    const reportSection = root.querySelector<HTMLElement>("#report");
    const reportCard = root.querySelector<HTMLElement>(".framer-izeh1y");
    const expertHeading = root.querySelector<HTMLElement>(".framer-17i4rxh");
    const navBar = root.querySelector<HTMLElement>("nav.framer-S6f3p");

    // Text reveal statement containers
    const textRevealContainers = root.querySelectorAll<HTMLElement>(
      ".framer-1w9e3g7-container, .framer-1rg01sh-container"
    );

    let ticking = false;

    const updateScrollAnimations = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // A) Sticky Navbar Blur & Glassmorphism
      if (navBar) {
        if (scrollY > 40) {
          navBar.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
          navBar.style.backdropFilter = "blur(16px)";
          navBar.style.setProperty("-webkit-backdrop-filter", "blur(16px)");
          navBar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.08)";
          navBar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.6)";
        } else {
          navBar.style.backgroundColor = "rgba(0, 0, 0, 0)";
          navBar.style.backdropFilter = "none";
          navBar.style.setProperty("-webkit-backdrop-filter", "none");
          navBar.style.borderBottom = "1px solid transparent";
          navBar.style.boxShadow = "none";
        }
      }

      // B) Hero Perspective Zoom & Fade
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight || vh;
        const heroProgress = Math.min(Math.max(scrollY / (heroHeight * 0.75), 0), 1);

        if (heroGraphic) {
          const scale = 1 + heroProgress * 1.35; // Zooms up to 2.35x
          const translateY = heroProgress * 120;
          heroGraphic.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        }

        if (heroTitle) {
          const titleOpacity = Math.max(0, 1 - heroProgress * 2.2);
          const titleY = -heroProgress * 60;
          heroTitle.style.opacity = `${titleOpacity}`;
          heroTitle.style.transform = `translateY(${titleY}px)`;
        }

        if (heroSubtitle) {
          const subOpacity = Math.max(0, 1 - heroProgress * 2.0);
          const subY = heroProgress * 50;
          heroSubtitle.style.opacity = `${subOpacity}`;
          heroSubtitle.style.transform = `translateY(${subY}px)`;
        }
      }

      // C) Report Section Floating Reveal
      if (reportSection && reportCard) {
        const rect = reportSection.getBoundingClientRect();
        const reportProgress = Math.min(Math.max((vh - rect.top) / (vh * 0.55), 0), 1);
        reportCard.style.opacity = `${reportProgress}`;
        reportCard.style.transform = `translateY(${(1 - reportProgress) * 30}px)`;
      }

      // D) Enterprise Text Character-by-Character Illumination Scrub
      textRevealContainers.forEach((container) => {
        const rect = container.getBoundingClientRect();
        const start = vh * 0.82;
        const end = vh * 0.28;
        const progress = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);

        const chars = container.querySelectorAll<HTMLElement>(".scroll-reveal-char");
        const total = chars.length;
        if (total > 0) {
          chars.forEach((char, i) => {
            const charThreshold = i / total;
            const charProgress = Math.min(Math.max((progress - charThreshold) * total * 1.25, 0), 1);
            char.style.opacity = charProgress > 0.05 ? `${charProgress}` : "0";
          });
        }
      });

      // E) "Meet the Expert" Parallax Zoom Down
      if (expertHeading) {
        const rect = expertHeading.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) {
          const progress = Math.min(Math.max((vh - rect.top) / (vh * 0.65), 0), 1);
          const scale = 1.6 - progress * 0.6; // from 1.6 down to 1.0
          expertHeading.style.transform = `scale(${Math.max(1.0, scale)})`;
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollAnimations);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Initial run
    updateScrollAnimations();

    // ==========================================
    // 7. Smooth Anchor Scrolling
    // ==========================================
    const anchorLinks = root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href")?.slice(1);
        if (!targetId) return;
        const targetEl = root.querySelector<HTMLElement>(`#${targetId}`);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    return () => {
      if (cleanupLightRays) cleanupLightRays();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      bentoObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ display: "contents" }}
      dangerouslySetInnerHTML={{ __html: framerHomeHtml }}
    />
  );
}
