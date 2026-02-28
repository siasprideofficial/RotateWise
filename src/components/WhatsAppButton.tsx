import { MessageCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function WhatsAppButton() {
  const { settings } = useSite();
  const message = encodeURIComponent(`Hello! I would like to learn more about ${settings.siteName}'s credit card bill management services.`);
  
  return (
    <a
      href={`https://wa.me/${settings.whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg shadow-green-500/30 transition-colors"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
}
