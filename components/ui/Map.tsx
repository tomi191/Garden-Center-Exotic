"use client";

import { ExternalLink } from "lucide-react";

interface MapProps {
  lat: number;
  lng: number;
  name: string;
}

export function Map({ lat, lng, name }: MapProps) {
  // Free Google Maps Embed URL (no API key required)
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
      {/* Google Maps Embed - FREE, no API key needed */}
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Карта на ${name}`}
        className="grayscale-[20%] hover:grayscale-0 transition-all duration-300"
      />

      {/* Open in Google Maps button */}
      <a
        href={googleMapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm text-[var(--color-primary)] rounded-lg font-medium hover:bg-white shadow-lg transition-all text-sm"
      >
        <ExternalLink className="w-4 h-4" />
        Отвори в Google Maps
      </a>
    </div>
  );
}
