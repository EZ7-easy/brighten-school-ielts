import { FC } from "react";
import { FaInstagram, FaPhone, FaTelegramPlane } from "react-icons/fa";

interface ContactLink {
  href: string;
  label: string;
  icon: React.ElementType;
  target?: "_blank" | "_self";
  rel?: string;
  ariaLabel: string;
}

const contactLinks: ContactLink[] = [
  {
    href: "https://instagram.com/brighten_school",
    label: "@brighten_school",
    icon: FaInstagram,
    target: "_blank",
    rel: "noopener noreferrer",
    ariaLabel: "Follow Brighten School on Instagram",
  },
  {
    href: "tel:+91913331144",
    label: "(91) 333-11-44",
    icon: FaPhone,
    ariaLabel: "Call Brighten School at (91) 333-11-44",
  },
  {
    href: "https://t.me/brighten_school",
    label: "@brighten_school",
    icon: FaTelegramPlane,
    target: "_blank",
    rel: "noopener noreferrer",
    ariaLabel: "Join Brighten School on Telegram",
  },
];

const ContactLink: FC<ContactLink> = ({
  href,
  label,
  icon: Icon,
  target = "_self",
  rel,
  ariaLabel,
}) => (
  <a
    href={href}
    target={target}
    rel={rel}
    className="flex items-center gap-2 text-gray-800 hover:text-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-sm"
    aria-label={ariaLabel}
  >
    <Icon className="text-lg" aria-hidden="true" />
    <span>{label}</span>
  </a>
);

const Footer: FC = () => {
  return (
    <footer className="bg-white sm:py-6 py-4 border-t border-gray-200 w-full">
      <div className="container mx-auto px-4">
        <nav
          className="flex flex-wrap justify-center items-center gap-4 sm:gap-12 text-sm"
          aria-label="Contact links"
        >
          {contactLinks.map((link, index) => (
            <ContactLink key={index} {...link} />
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
