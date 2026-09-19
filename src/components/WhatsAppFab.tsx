import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hi Feras Tasty Bites! I'd like to ask about an order.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-[#25d366] p-3.5 text-white shadow-[0_12px_30px_-10px_rgba(37,211,102,0.8)] transition hover:pr-5"
    >
      <WhatsAppIcon width={26} height={26} />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-40">
        Chat with us
      </span>
    </a>
  );
}
