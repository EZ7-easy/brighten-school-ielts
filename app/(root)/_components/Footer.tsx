// components/Footer.tsx
import { FaInstagram, FaPhone, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white py-4 border-t">
      <div className="container mx-auto flex flex-wrap justify-center items-center gap-6 text-gray-800 text-sm">
        {/* Instagram */}
        <a
          href="https://instagram.com/brighten_school"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-orange-500 transition-colors"
        >
          <FaInstagram className="text-lg" />
          @brighten_school
        </a>

        {/* Phone */}
        <a
          href="tel:+91913331144"
          className="flex items-center gap-1 hover:text-orange-500 transition-colors"
        >
          <FaPhone className="text-lg" />
          (91) 333-11-44
        </a>

        {/* Telegram */}
        <a
          href="https://t.me/brighten_school"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-orange-500 transition-colors"
        >
          <FaTelegramPlane className="text-lg" />
          @brighten_school
        </a>
      </div>
    </footer>
  );
}
