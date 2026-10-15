import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, Copy, Check, ArrowUpRight, LoaderCircle, CircleCheck, CircleAlert } from 'lucide-react';
import contactBgVideo from '../assets/contact_assets/contact_bg.mp4';

const EMAIL = 'sandeshpany24@gmail.com';
const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;

const services = ['Business Website', 'Web App', 'Mobile App', 'AI Automation', 'Something Else'];

const steps = [
    { id: '01', title: 'Share your idea', text: 'Tell me about your business and what you need.' },
    { id: '02', title: 'Quick discovery call', text: 'We talk through goals, scope and timeline.' },
    { id: '03', title: 'Clear plan & quote', text: 'You get a proposal before any work begins.' },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = ({ name, email, message }) => {
    const errors = {};
    if (!name.trim()) errors.name = 'Please enter your name.';
    if (!email.trim()) errors.email = 'Please enter your email.';
    else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Please enter a valid email address.';
    if (!message.trim()) errors.message = 'Please tell me a little about your project.';
    else if (message.trim().length < 10) errors.message = 'A few more words would help (10+ characters).';
    return errors;
};

const inputClass = (hasError) =>
    `w-full bg-black/50 text-white text-sm md:text-base rounded-xl px-4 py-3.5 border transition-all duration-200 placeholder:text-gray-600 focus:outline-none focus:bg-black/70 ${
        hasError
            ? 'border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20'
            : 'border-white/10 hover:border-white/20 focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20'
    }`;

const Field = ({ id, label, required, optional, error, children }) => (
    <div className="flex flex-col gap-2 w-full">
        <label htmlFor={id} className="flex items-center justify-between text-xs font-medium uppercase tracking-widest text-gray-400">
            <span>
                {label}
                {required && <span className="text-[#ccff00] ml-1">*</span>}
            </span>
            {optional && <span className="normal-case tracking-normal text-gray-600">Optional</span>}
        </label>
        {children}
        {error && (
            <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs text-red-400">
                <CircleAlert className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                {error}
            </p>
        )}
    </div>
);

const ContactSection = () => {
    const formRef = useRef();
    const [service, setService] = useState(services[0]);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error
    const [copied, setCopied] = useState(false);
    const sectionRef = useRef(null);
    const [loadVideo, setLoadVideo] = useState(false);

    // Only download the background video when the section is about to scroll into view
    useEffect(() => {
        const section = sectionRef.current;
        if (!section || !('IntersectionObserver' in window)) {
            setLoadVideo(true);
            return;
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setLoadVideo(true);
                observer.disconnect();
            }
        }, { rootMargin: '600px 0px' });
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timer);
    }, [copied]);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    const clearError = (e) => {
        const { name } = e.target;
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const sendEmail = (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);
        const values = {
            name: formData.get('name') || '',
            email: formData.get('email') || '',
            message: formData.get('message') || '',
        };

        const fieldErrors = validate(values);
        setErrors(fieldErrors);
        if (Object.keys(fieldErrors).length > 0) {
            formRef.current.querySelector(`[name="${Object.keys(fieldErrors)[0]}"]`)?.focus();
            return;
        }

        setStatus('submitting');

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(() => {
            setStatus('success');
            formRef.current?.reset();
            setService(services[0]);
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            setStatus('error');
        });
    };

    const isSubmitting = status === 'submitting';

    return (
        <section ref={sectionRef} id="contact" className="relative min-h-screen bg-[#050505] text-white font-sans flex items-center overflow-hidden [clip-path:inset(0)]">

            {/* Background Video */}
            <video
                src={loadVideo ? contactBgVideo : undefined}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                aria-hidden="true"
                className="fixed top-0 left-0 w-full h-[100vh] object-cover z-0"
            />

            {/* Overlays: darken, blend into the previous section, subtle lime glow */}
            <div className="absolute inset-0 bg-black/75 z-0 pointer-events-none"></div>
            <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-[#050505] to-transparent z-0 pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-40 w-[36rem] h-[36rem] rounded-full bg-[#ccff00]/10 blur-[120px] z-0 pointer-events-none"></div>

            <div className="w-full max-w-7xl mx-auto px-6 md:px-16 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 relative z-10">

                {/* Left Side: Pitch & Contact Info */}
                <div className="lg:col-span-5 flex flex-col">
                    <span className="inline-flex self-start items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#ccff00] border border-[#ccff00]/40 bg-[#ccff00]/5 rounded-full px-3 py-1.5 mb-8">
                        <span className="relative flex w-2 h-2">
                            <span className="absolute inline-flex w-full h-full rounded-full bg-[#ccff00] opacity-75 animate-ping"></span>
                            <span className="relative inline-flex w-2 h-2 rounded-full bg-[#ccff00]"></span>
                        </span>
                        Available for new projects
                    </span>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-gray-300 to-gray-800 drop-shadow-2xl leading-[0.95] uppercase mb-6">
                        Let's work
                        <span className="block font-light italic lowercase font-serif text-gray-300 pr-4">together</span>
                    </h2>

                    <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-10 max-w-md">
                        Have a project in mind? Tell me about your business and what you'd like to build — I'll get back to you with next steps. Based in Bhubaneswar, working with clients across India.
                    </p>

                    {/* Contact cards */}
                    <div className="flex flex-col gap-3 mb-12">
                        <div className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 hover:border-[#ccff00]/50 transition-colors">
                            <span className="w-11 h-11 shrink-0 rounded-full bg-[#ccff00]/10 text-[#ccff00] flex items-center justify-center">
                                <Mail className="w-5 h-5" aria-hidden="true" />
                            </span>
                            <a href={`mailto:${EMAIL}`} className="flex-1 min-w-0">
                                <span className="block text-[11px] uppercase tracking-widest text-gray-500 mb-0.5">Email</span>
                                <span className="block text-sm md:text-base text-white truncate group-hover:text-[#ccff00] transition-colors">{EMAIL}</span>
                            </a>
                            <button
                                type="button"
                                onClick={copyEmail}
                                aria-label={copied ? 'Email copied' : 'Copy email address'}
                                className="w-9 h-9 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-black hover:bg-[#ccff00] hover:border-[#ccff00] transition-colors cursor-pointer"
                            >
                                {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                            </button>
                        </div>

                        {phoneNumber && (
                            <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-4 hover:border-[#ccff00]/50 transition-colors">
                                <span className="w-11 h-11 shrink-0 rounded-full bg-[#ccff00]/10 text-[#ccff00] flex items-center justify-center">
                                    <Phone className="w-5 h-5" aria-hidden="true" />
                                </span>
                                <span className="flex-1 min-w-0">
                                    <span className="block text-[11px] uppercase tracking-widest text-gray-500 mb-0.5">Phone</span>
                                    <span className="block text-sm md:text-base text-white group-hover:text-[#ccff00] transition-colors">{phoneNumber}</span>
                                </span>
                                <span className="w-9 h-9 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-black group-hover:bg-[#ccff00] group-hover:border-[#ccff00] transition-colors">
                                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                                </span>
                            </a>
                        )}
                    </div>

                    {/* What happens next */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">What happens next</p>
                        <ol className="border-t border-white/10">
                            {steps.map((step) => (
                                <li key={step.id} className="flex items-baseline gap-5 py-4 border-b border-white/10">
                                    <span className="text-[#ccff00] text-sm font-bold w-6 shrink-0">{step.id}</span>
                                    <span>
                                        <span className="block text-sm md:text-base font-bold uppercase tracking-wide">{step.title}</span>
                                        <span className="block text-gray-400 text-sm font-light mt-1">{step.text}</span>
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="lg:col-span-7">
                    <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">

                        {status === 'success' ? (
                            <div className="flex flex-col items-center text-center py-16 md:py-24" role="status">
                                <span className="w-16 h-16 rounded-full bg-[#ccff00] text-black flex items-center justify-center mb-6">
                                    <CircleCheck className="w-8 h-8" aria-hidden="true" />
                                </span>
                                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3">Message sent</h3>
                                <p className="text-gray-400 font-light max-w-sm mb-8">
                                    Thanks for reaching out — I'll read it and reply to your email soon.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setStatus('idle')}
                                    className="px-6 py-3 rounded-full border border-white/30 text-white text-sm hover:bg-white hover:text-black transition-colors cursor-pointer"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form ref={formRef} className="flex flex-col gap-6 w-full" onSubmit={sendEmail} noValidate>

                                <div className="pb-6 border-b border-white/10">
                                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">Start a project</h3>
                                    <p className="text-gray-500 text-sm font-light mt-1">Fields marked <span className="text-[#ccff00]">*</span> are required.</p>
                                </div>

                                {/* Service selector */}
                                <fieldset>
                                    <legend className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">I'm interested in</legend>
                                    <div className="flex flex-wrap gap-2">
                                        {services.map((option) => {
                                            const isActive = service === option;
                                            return (
                                                <label
                                                    key={option}
                                                    className={`cursor-pointer select-none rounded-full border px-4 py-2 text-xs md:text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#ccff00]/40 ${
                                                        isActive
                                                            ? 'bg-[#ccff00] border-[#ccff00] text-black font-medium'
                                                            : 'border-white/15 text-gray-300 hover:border-white/40 hover:text-white'
                                                    }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="service"
                                                        value={option}
                                                        checked={isActive}
                                                        onChange={() => setService(option)}
                                                        className="sr-only"
                                                    />
                                                    {option}
                                                </label>
                                            );
                                        })}
                                    </div>
                                </fieldset>

                                {/* Name and Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <Field id="contact-name" label="Your name" required error={errors.name}>
                                        <input
                                            type="text"
                                            id="contact-name"
                                            name="name"
                                            placeholder="Your full name"
                                            autoComplete="name"
                                            onInput={clearError}
                                            aria-invalid={!!errors.name}
                                            aria-describedby={errors.name ? 'contact-name-error' : undefined}
                                            className={inputClass(errors.name)}
                                        />
                                    </Field>
                                    <Field id="contact-email" label="Email" required error={errors.email}>
                                        <input
                                            type="email"
                                            id="contact-email"
                                            name="email"
                                            placeholder="you@company.com"
                                            autoComplete="email"
                                            onInput={clearError}
                                            aria-invalid={!!errors.email}
                                            aria-describedby={errors.email ? 'contact-email-error' : undefined}
                                            className={inputClass(errors.email)}
                                        />
                                    </Field>
                                </div>

                                {/* Phone and Subject Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <Field id="contact-phone" label="Phone" optional>
                                        <input
                                            type="tel"
                                            id="contact-phone"
                                            name="phone"
                                            placeholder="+91 00000 00000"
                                            autoComplete="tel"
                                            className={inputClass(false)}
                                        />
                                    </Field>
                                    <Field id="contact-subject" label="Business / Company" optional>
                                        <input
                                            type="text"
                                            id="contact-subject"
                                            name="subject"
                                            placeholder="Your business name"
                                            autoComplete="organization"
                                            className={inputClass(false)}
                                        />
                                    </Field>
                                </div>

                                {/* Message */}
                                <Field id="contact-message" label="Project details" required error={errors.message}>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        placeholder="What are you building, who is it for, and when would you like to launch?"
                                        rows="5"
                                        onInput={clearError}
                                        aria-invalid={!!errors.message}
                                        aria-describedby={errors.message ? 'contact-message-error' : undefined}
                                        className={`${inputClass(errors.message)} resize-none`}
                                    ></textarea>
                                </Field>

                                {/* Error Message */}
                                <div aria-live="polite">
                                    {status === 'error' && (
                                        <div className="flex items-start gap-3 text-sm px-4 py-3 rounded-xl border bg-red-500/10 border-red-500/40 text-red-300">
                                            <CircleAlert className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                                            <span>
                                                Something went wrong and your message wasn't sent. Please try again, or email me directly at{' '}
                                                <a href={`mailto:${EMAIL}`} className="underline hover:text-white">{EMAIL}</a>.
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4">
                                    <p className="text-gray-500 text-xs font-light">
                                        Your details are only used to reply to your enquiry.
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group shrink-0 inline-flex items-center justify-center gap-3 rounded-full bg-[#ccff00] text-black text-sm font-bold uppercase tracking-wider pl-7 pr-2 py-2 hover:bg-[#b3e600] transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {isSubmitting ? 'Sending…' : 'Send Message'}
                                        <span className="w-9 h-9 rounded-full bg-black text-[#ccff00] flex items-center justify-center">
                                            {isSubmitting ? (
                                                <LoaderCircle className="w-4 h-4 animate-spin" aria-hidden="true" />
                                            ) : (
                                                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
                                            )}
                                        </span>
                                    </button>
                                </div>

                            </form>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContactSection;
