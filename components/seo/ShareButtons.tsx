"use client";

import { useState } from "react";
import { Facebook, MessageCircle, Share2, Link } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `${title}${description ? " - " + description : ""}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const viberUrl = `viber://forward?text=${encodeURIComponent(shareText + " " + url)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + url)}`;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-[var(--color-gray-600)] mr-1">Сподели:</span>

      <a
        href={facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
        aria-label="Сподели във Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>

      <a
        href={viberUrl}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#7360F2] text-white hover:opacity-90 transition-opacity"
        aria-label="Сподели във Viber"
      >
        <MessageCircle className="w-5 h-5" />
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white hover:opacity-90 transition-opacity"
        aria-label="Сподели в WhatsApp"
      >
        <Share2 className="w-5 h-5" />
      </a>

      <button
        onClick={handleCopyLink}
        className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors"
        aria-label="Копирай линка"
      >
        <Link className="w-5 h-5" />
        {copied && (
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[var(--color-foreground)] text-white text-xs px-3 py-1.5 rounded-lg shadow-lg">
            Линкът е копиран!
          </span>
        )}
      </button>
    </div>
  );
}
