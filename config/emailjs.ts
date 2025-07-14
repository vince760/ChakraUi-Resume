// EmailJS Configuration
// You'll need to replace these with your actual EmailJS credentials
// Sign up at https://www.emailjs.com/ and get your credentials

export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "your_service_id",
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "your_template_id",
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key"
};
