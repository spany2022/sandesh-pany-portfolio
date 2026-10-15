// WhatsApp needs the number as digits only, with country code (e.g. 919876543210)
export const whatsappNumber = import.meta.env.VITE_PHONE_NUMBER?.replace(/\D/g, '');

export const whatsappLink = (message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

export const interestMessage = (subject) =>
  `Hi Sandesh, I'm interested in the ${subject} for my business.`;
