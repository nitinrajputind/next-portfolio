"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiSend, FiCheck, FiAlertCircle, FiLoader } from "react-icons/fi";
import Button from "@/components/button/Button";
import "./contact.scss";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'Subject must be at least 5 characters';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('useFormspree', process.env.NEXT_PUBLIC_USE_FORMSPREE);
    if (!validateForm()) {
      return;
    }

    setSubmissionStatus('loading');
    setSubmitMessage('');

    try {
      // Check if we should use Formspree (for GitHub Pages) or Nodemailer (for Vercel/local)
      const useFormspree = process.env.NEXT_PUBLIC_USE_FORMSPREE == 'true';
      const formspreeEndpoint = `https://formspree.io/f/xpwjgkzo`;

      let response;
      let result;
      if (useFormspree) {
        // Use Formspree for GitHub Pages deployment
        console.log('Using Formspree for form submission');
        response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _replyto: formData.email,
            _subject: `Portfolio Contact: ${formData.subject}`,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message via Formspree');
        }

        // Formspree returns different response format
        result = { 
          success: true, 
          message: 'Thank you! Your message has been sent successfully via Formspree. I\'ll get back to you soon!' 
        };
      } else {
        // Use Nodemailer API for Vercel/local development
        console.log('Using Nodemailer API for form submission');
        response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to send message via Nodemailer');
        }
      }

      setSubmissionStatus('success');
      setSubmitMessage(result.message || 'Thank you! Your message has been sent successfully.');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
        setTouched({});
        setSubmissionStatus('idle');
        setSubmitMessage('');
      }, 4000);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus('error');
      
      // Provide helpful error messages based on the service used
      const useFormspree = process.env.NEXT_PUBLIC_USE_FORMSPREE === 'true';
      let errorMessage = 'Sorry, there was an error sending your message. Please try again.';
      
      if (error instanceof Error) {
        if (useFormspree) {
          errorMessage = `Formspree error: ${error.message}. You can also email me directly at nitinrajput971625@gmail.com`;
        } else {
          errorMessage = error.message;
        }
      }
      
      setSubmitMessage(errorMessage);
      
      setTimeout(() => {
        setSubmissionStatus('idle');
        setSubmitMessage('');
      }, 6000);
    }
  };

  return (
    <section className="contact section" id="contact">
      <motion.div 
        className="contact_container"
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="contact_header" variants={itemVariants}>
          <h2 className="contact_title">
            <span className="contact_title_number">07.</span>
            Get In Touch
          </h2>
          <div className="contact_title_line"></div>
        </motion.div>

        <motion.div className="contact_content" variants={itemVariants}>
          <div className="contact_info">
            <h3 className="contact_info_title">Let&apos;s talk about your next project</h3>
            <p className="contact_info_description">
              I&apos;m always interested in new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            
            <div className="contact_info_details">
              <div className="contact_info_item">
                <h4>Email</h4>
                <a href="mailto:nitinrajput971624@gmail.com" className="contact_info_link">
                  nitinrajput971624@gmail.com
                </a>
              </div>
              
              <div className="contact_info_item">
                <h4>Location</h4>
                <span>India</span>
              </div>
              
              <div className="contact_info_item">
                <h4>Availability</h4>
                <span>Open to new opportunities</span>
              </div>
            </div>

            <div className="contact_social">
              <h4>Follow me</h4>
              <div className="contact_social_links">
                <a 
                  href="https://github.com/nitinrajputind" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact_social_link"
                >
                  GitHub
                </a>
                <a 
                  href="https://linkedin.com/in/nitinrajputind" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact_social_link"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://twitter.com/nitinrajputind" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact_social_link"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>

          <div className="contact_form_wrapper">
            <form className="contact_form" onSubmit={handleSubmit}>
              <div className="contact_form_group">
                <label htmlFor="name" className="contact_form_label">
                  Name <span className="contact_form_required">*</span>
                </label>
                <div className="contact_form_input_wrapper">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`contact_form_input ${errors.name && touched.name ? 'error' : ''} ${formData.name && !errors.name ? 'valid' : ''}`}
                    placeholder="Your full name"
                    disabled={submissionStatus === 'loading'}
                  />
                  {formData.name && !errors.name && (
                    <FiCheck className="contact_form_input_icon success" />
                  )}
                  {errors.name && touched.name && (
                    <FiAlertCircle className="contact_form_input_icon error" />
                  )}
                </div>
                <AnimatePresence>
                  {errors.name && touched.name && (
                    <motion.span 
                      className="contact_form_error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="contact_form_group">
                <label htmlFor="email" className="contact_form_label">
                  Email <span className="contact_form_required">*</span>
                </label>
                <div className="contact_form_input_wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`contact_form_input ${errors.email && touched.email ? 'error' : ''} ${formData.email && !errors.email ? 'valid' : ''}`}
                    placeholder="your.email@example.com"
                    disabled={submissionStatus === 'loading'}
                  />
                  {formData.email && !errors.email && (
                    <FiCheck className="contact_form_input_icon success" />
                  )}
                  {errors.email && touched.email && (
                    <FiAlertCircle className="contact_form_input_icon error" />
                  )}
                </div>
                <AnimatePresence>
                  {errors.email && touched.email && (
                    <motion.span 
                      className="contact_form_error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.email}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="contact_form_group">
                <label htmlFor="subject" className="contact_form_label">
                  Subject <span className="contact_form_required">*</span>
                </label>
                <div className="contact_form_input_wrapper">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`contact_form_input ${errors.subject && touched.subject ? 'error' : ''} ${formData.subject && !errors.subject ? 'valid' : ''}`}
                    placeholder="What's this about?"
                    disabled={submissionStatus === 'loading'}
                  />
                  {formData.subject && !errors.subject && (
                    <FiCheck className="contact_form_input_icon success" />
                  )}
                  {errors.subject && touched.subject && (
                    <FiAlertCircle className="contact_form_input_icon error" />
                  )}
                </div>
                <AnimatePresence>
                  {errors.subject && touched.subject && (
                    <motion.span 
                      className="contact_form_error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.subject}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="contact_form_group">
                <label htmlFor="message" className="contact_form_label">
                  Message <span className="contact_form_required">*</span>
                </label>
                <div className="contact_form_input_wrapper">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`contact_form_textarea ${errors.message && touched.message ? 'error' : ''} ${formData.message && !errors.message ? 'valid' : ''}`}
                    rows={5}
                    placeholder="Tell me about your project, ideas, or just say hello..."
                    disabled={submissionStatus === 'loading'}
                  />
                  {formData.message && !errors.message && (
                    <FiCheck className="contact_form_input_icon success textarea" />
                  )}
                  {errors.message && touched.message && (
                    <FiAlertCircle className="contact_form_input_icon error textarea" />
                  )}
                </div>
                <AnimatePresence>
                  {errors.message && touched.message && (
                    <motion.span 
                      className="contact_form_error"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {errors.message}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                type="submit"
                className={`contact_form_submit ${submissionStatus}`}
                disabled={submissionStatus === 'loading'}
                whileHover={{ scale: submissionStatus === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: submissionStatus === 'loading' ? 1 : 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <AnimatePresence mode="wait">
                  {submissionStatus === 'loading' && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="contact_form_submit_content"
                    >
                      <FiLoader className="contact_form_submit_icon spinning" />
                      Sending...
                    </motion.div>
                  )}
                  {submissionStatus === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="contact_form_submit_content"
                    >
                      <FiCheck className="contact_form_submit_icon" />
                      Message Sent!
                    </motion.div>
                  )}
                  {submissionStatus === 'error' && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="contact_form_submit_content"
                    >
                      <FiAlertCircle className="contact_form_submit_icon" />
                      Try Again
                    </motion.div>
                  )}
                  {submissionStatus === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="contact_form_submit_content"
                    >
                      <FiSend className="contact_form_submit_icon" />
                      Send Message
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <AnimatePresence>
                {submitMessage && (
                  <motion.div
                    className={`contact_form_message ${submissionStatus}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {submissionStatus === 'success' && <FiCheck className="contact_form_message_icon" />}
                    {submissionStatus === 'error' && <FiAlertCircle className="contact_form_message_icon" />}
                    {submitMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Contact;
