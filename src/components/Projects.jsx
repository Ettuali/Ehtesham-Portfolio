"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    title: "Dan International Solutions",
    client: "Dan International Solutions",
    copy: "DAN International Solutions is a premier provider of international recruitment, HR consulting, and workforce management services, headquartered in Dammam, Kingdom of Saudi Arabia. We deliver reliable and customized HR solutions to businesses across Saudi Arabia, UAE, Qatar, Oman, India, Europe, and Africa.",
    color: "bg-black text-white",
    images: ["/assets/Dan1.png", "/assets/Dan2.png", "/assets/Dan3.png"],
    liveProjectUrl: "https://dan-theta-azure.vercel.app/",
  },
  {
    title: "Resume Builder",
    client: "Resume Builder",
    copy: "AI- Powered Resume Builder : Built with React, TypeSript, Tailwind CSS and Supabase, intigrating Google Gimini AI for smart resume generation with authentication and real-time editing",
    color: "bg-black text-white",
    images: ["/assets/Resume1.png", "/assets/Resume2.png", "/assets/Resume3.png"],
    liveProjectUrl: "https://resume-room.vercel.app/e",
  },
  {
    title: "Lead Management System",
    client: "LMS",
    copy: "Designed and implemented the Lead Management System (LMS) to streamline lead tracking and conversion workflows.",
    color: "bg-black text-white",
    images: ["/assets/Lms1.png", "/assets/Lms2.png", "/assets/Lms3.png"],
    liveProjectUrl: "https://aqiblms.com/authentication/sign-in",
  },
  {
    title: "Day2Day Health Care",
    client: "Day2Day",
    copy: [
      "Developed and deployed a real-world web application using the MERN stack (MySQL, Express.js, React, Node.js).",
      "Built 'Day2Day Health Care', a post-operative care platform for remote patient monitoring and nurse–patient communication.",
    ],
    color: "bg-black text-white",
    images: ["/assets/day2day1.png", "/assets/day2day2.png", "/assets/day2day3.png"],
    liveProjectUrl: "http://13.55.35.2:3000/",
  },
];

export default function ScrollStack() {
  const bgRef = useRef(null);

  useEffect(() => {
    // Smooth scrolling setup
    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Background reveal
    gsap.set(bgRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      backgroundColor: "#000",
    });

    gsap.to(bgRef.current, {
      clipPath: "circle(150% at 50% 50%)",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "#scroll-container-wrapper",
        start: "top 80%",
        end: "top 10%",
        scrub: true,
      },
    });

    // GSAP stacking scroll animation
    const sections = gsap.utils.toArray(".card").reverse();
    const scrollContainer = document.getElementById("scroll-container-wrapper");
    const stackingScrollDuration = cards.length * 120 + 100;

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer,
        pin: true,
        start: "top top",
        end: `+=${stackingScrollDuration}vh`,
        scrub: 0.8,
      },
    });

    sections.forEach((card, i) => {
      const zIndex = 100 + i * 5;
      const scaleFactor = 1 - (sections.length - 1 - i) * 0.05;
      const yOffset = (sections.length - 1 - i) * 50;
      const cardIndex = sections.length - 1 - i;
      const startLabel = `cardStart-${cardIndex}`;

      masterTl.fromTo(
        card,
        {
          y: "100%",
          scale: 1.2,
          opacity: 0,
          zIndex: zIndex,
        },
        {
          y: "0%",
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          duration: 1.5,
        },
        i === 0 ? "start" : startLabel
      );

      if (i < sections.length - 1) {
        const stackLabel = `cardStack-${cardIndex}`;
        masterTl.addLabel(stackLabel, startLabel + "+=1.2");
        masterTl.to(
          card,
          {
            y: `${-yOffset}px`,
            scale: scaleFactor,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            ease: "power1.inOut",
            duration: 1.3,
          },
          stackLabel
        );
        masterTl.addLabel(`cardStart-${cardIndex - 1}`, stackLabel + "+=0.8");
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative overflow-hidden font-[Inter]">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-white z-0"></div>
      <div
        ref={bgRef}
        className="absolute inset-0 z-10 transition-all duration-1000 ease-in-out"
      ></div>

      {/* Scroll Content */}
      <div id="scroll-container-wrapper" className="relative z-20 w-full px-3 md:px-8">
        <div className="card-viewport h-screen w-full flex items-center justify-center relative">
          {cards
            .slice()
            .reverse()
            .map((card, index) => {
              const cardDisplayNumber = String(cards.length - index).padStart(2, "0");
              const cardIndex = cards.length - 1 - index;
              const baseZIndex = 10 + index;
              const cardCopy = Array.isArray(card.copy) ? card.copy : [card.copy];

              return (
                <div
                  key={cardIndex}
                  id={`card-${cardIndex + 1}`}
                  style={{ zIndex: baseZIndex }}
                  className={`card absolute top-1/2 left-1/2 transform 
                    -translate-x-1/2 -translate-y-1/2 
                    w-[95vw] sm:w-[95vw] md:w-full max-w-7xl 
                    h-auto sm:h-[85vh] md:h-[70vh] 
                    rounded-2xl border border-white 
                    p-6 sm:p-8 md:p-20 
                    origin-center ${card.color} overflow-hidden shadow-xl`}
                >
                  {/* Top Bar */}
                  <div className="flex justify-between items-center flex-wrap gap-2 sm:gap-3 h-18">
                    <div className="text-white flex items-center">
                      <span
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter mr-2"
                      >
                        {cardDisplayNumber}
                      </span>
                     
                    </div>

                    {/* Live Project */}
                    <a
                      href={card.liveProjectUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] sm:text-xs md:text-xs font-bold tracking-wider uppercase rounded-full px-4 py-1 sm:px-6 sm:py-2  hover:bg-white hover:text-black transition-colors flex items-center justify-center"
                    >
                      LIVE PROJECT
                    </a>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col md:flex-row items-center justify-between h-auto md:h-[calc(100%-4rem)] gap-4 sm:gap-6 pt-4 sm:pt-2">
                    <div className="flex-1 text-center md:text-left space-y-3 sm:space-y-4">
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tighter">
                        {card.title}
                      </h1>
                      {cardCopy.map((copy, idx) => (
                        <p key={idx} className="max-w-lg text-xs sm:text-sm leading-relaxed opacity-90">
                          {copy}
                        </p>
                      ))}
                    </div>

                    {/* Images */}
                    <div className="flex-shrink-0 flex flex-wrap sm:flex-nowrap gap-3 overflow-x-auto p-2 w-full md:w-[80vw] justify-center">
                      {card.images.map((imageSrc, imgIdx) => (
                        <img
                          key={imgIdx}
                          src={imageSrc}
                          alt={`${card.title} Screenshot ${imgIdx + 1}`}
                          className="rounded-xl shadow-xl w-28 h-28 sm:w-40 sm:h-40 md:w-80 md:h-80 object-cover border border-gray-700"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
