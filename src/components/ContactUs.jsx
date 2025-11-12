import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "remixicon/fonts/remixicon.css";

// ✅ Custom styles
const customStyles = `
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .marquee-container {
    overflow: hidden;
    white-space: nowrap;
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .marquee-content {
    display: inline-block;
    animation: marquee 15s linear infinite;
    padding-right: 200px;
  }

  /*  Slower on small screens for smoother readability */
  @media (max-width: 640px) {
    .marquee-content {
      animation-duration: 25s;
      padding-right: 100px;
    }
  }

  /* ✅ Form styles stay same */
  .form-input-style {
    appearance: none;
    background: transparent;
    border: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    color: white;
    width: 100%;
    padding: 0.75rem 0;
    font-size: 1rem;
    transition: border-bottom-color 0.3s ease;
  }

  .form-input-style:focus {
    outline: none;
    border-bottom-color: white;
  }

  .form-input-label {
    display: block;
    margin-bottom: 0.5rem;
    color: #a0aec0;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

// ✅ Reusable marquee
const MarqueeText = ({ text }) => (
  <div className="marquee-container bg-black">
    <div className="marquee-content">
      <span
        className="text-3xl sm:text-5xl md:text-5xl lg:text-[100px] xl:text-[100px] font-extrabold tracking-tight text-white uppercase"
        style={{ letterSpacing: "-0.04em" }}
      >
        {text}
      </span>
      <span
        className="text-3xl sm:text-5xl md:text-5xl lg:text-[100px] xl:text-[100px] font-extrabold tracking-tight text-white uppercase"
        style={{ letterSpacing: "-0.04em" }}
      >
        &nbsp;&nbsp;&nbsp;&nbsp;{text}
      </span>
    </div>
  </div>
);

// ✅ Updated Contact Form (Formspree Integration)
const ContactForm = () => {
  const [state, handleSubmit] = useForm("movyqzwl"); // ← your Formspree ID
  const [submitted, setSubmitted] = useState(false);

  // Show a temporary success message
  if (state.succeeded && !submitted) {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 mt-12">
      {submitted && (
        <div className="bg-green-600 text-white p-3 rounded-md text-center mb-4 transition-opacity duration-300 opacity-100">
          Message sent successfully! ✅
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
        <div className="py-4">
          <label htmlFor="name" className="form-input-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="form-input-style"
            required
          />
        </div>

        <div className="py-4">
          <label htmlFor="company" className="form-input-label">
            Company
          </label>
          <input
            id="company"
            type="text"
            name="company"
            className="form-input-style"
          />
        </div>

        <div className="py-4">
          <label htmlFor="email" className="form-input-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-input-style"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div className="py-4 sm:col-span-2">
          <label htmlFor="message" className="form-input-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="form-input-style resize-none h-24"
            required
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full text-xl sm:text-3xl font-extrabold text-white uppercase mt-20 flex justify-between items-center group border-b-4 border-white pb-1 hover:text-white hover:border-white transition-colors duration-300 cursor-pointer"
      >
        SEND REQUEST
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8 sm:w-10 transform translate-x-0 group-hover:translate-x-2 transition duration-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </form>
  );
};

// ✅ Main Contact Page
const ContactUs = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <style>{customStyles}</style>

      <MarqueeText text="CONTACT ME HERE / CONTACT ME HERE" />

      <div className="p-4 lg:p-8 max-w-7xl mx-auto px-2">
        <div className="flex flex-col lg:flex-row items-start pt-16 gap-12">
          {/* LEFT SIDE */}
          <div className="w-full lg:w-1/2">
            <p className="text-3xl sm:text-3xl md:text-5xl font-extrabold leading-tight max-w-xl">
              Let’s build something impactful together. Reach out!
            </p>

            <div className="space-y-8 py-8">
              <div>
                <h4 className="text-gray-400 text-sm tracking-widest uppercase mb-5 font-medium">
                  Links
                </h4>
                <div className="flex space-x-6 text-2xl">
                  <a
                    href="https://www.linkedin.com/in/ehtesham-ali-210446247/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500 transition-colors"
                  >
                    <i className="ri-linkedin-box-fill"></i>
                  </a>
                  <a
                    href="https://github.com/Ettuali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition-colors"
                  >
                    <i className="ri-github-fill"></i>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="text-gray-400 text-sm tracking-widest uppercase mb-2 font-medium">
                    Get In Touch
                  </h4>
                  <a
                    href="mailto:ettuali2@gmail.com"
                    className="text-lg font-bold break-all hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    ettuali2@gmail.com
                  </a>
                </div>

                <div>
                  <h4 className="text-gray-400 text-sm tracking-widest uppercase mb-2 font-medium">
                    Location
                  </h4>
                  <p className="text-lg font-bold">
                    Al Raffa, Bur Dubai, Dubai, UAE
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Contact Form */}
          <div className="w-full lg:w-1/2 mt-4">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
