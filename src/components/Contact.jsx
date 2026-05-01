import React, { useRef, useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = memo(() => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Amar",
          from_email: form.email,
          to_email: "upsingh6430@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setStatus("success");
          setForm({ name: "", email: "", message: "" });
          setTimeout(() => setStatus(null), 5000);
        },
        (error) => {
          setLoading(false);
          setStatus("error");
          console.error(error);
          setTimeout(() => setStatus(null), 5000);
        }
      );
  }, [form]);

  return (
    <div
      className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden"
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] glass p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText} font-display`}>
          Contact<span className="text-accent">.</span>
        </h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-7"
        >
          <label className="flex flex-col" htmlFor="contact-name">
            <span className="text-white font-medium mb-3 text-sm uppercase tracking-wider">
              Your Name
            </span>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              required
              className="bg-tertiary/70 py-4 px-6 placeholder:text-secondary/60 text-white rounded-xl outline-none border border-transparent focus:border-accent/50 font-medium transition-colors duration-200"
            />
          </label>

          <label className="flex flex-col" htmlFor="contact-email">
            <span className="text-white font-medium mb-3 text-sm uppercase tracking-wider">
              Your Email
            </span>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              required
              className="bg-tertiary/70 py-4 px-6 placeholder:text-secondary/60 text-white rounded-xl outline-none border border-transparent focus:border-accent/50 font-medium transition-colors duration-200"
            />
          </label>

          <label className="flex flex-col" htmlFor="contact-message">
            <span className="text-white font-medium mb-3 text-sm uppercase tracking-wider">
              Your Message
            </span>
            <textarea
              id="contact-message"
              rows={6}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to say?"
              required
              className="bg-tertiary/70 py-4 px-6 placeholder:text-secondary/60 text-white rounded-xl outline-none border border-transparent focus:border-accent/50 font-medium transition-colors duration-200 resize-none"
            />
          </label>

          {/* Status Messages */}
          {status === "success" && (
            <p className="text-green-400 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Thank you! I'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-fit disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{loading ? "Sending..." : "Send Message"}</span>
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
});

Contact.displayName = "Contact";

export default SectionWrapper(Contact, "contact");
