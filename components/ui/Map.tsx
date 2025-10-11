"use client";

import { MapPin } from "lucide-react";

interface MapProps {
  lat: number;
  lng: number;
  name: string;
}

export function Map({ lat, lng, name }: MapProps) {
  // Fallback Google Maps link
  const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
      {/* Temporary placeholder - replace with actual Google Maps API key */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
        <div className="text-center text-white">
          <MapPin className="w-16 h-16 mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">{name}</p>
          <p className="text-sm opacity-80 mb-4">
            Координати: {lat.toFixed(4)}, {lng.toFixed(4)}
          </p>
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-white text-[var(--color-primary)] rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Отвори в Google Maps
          </a>
          <p className="text-xs opacity-60 mt-4">
            (За да активирате картата, добавете Google Maps API key)
          </p>
        </div>
      </div>

      {/* Uncomment when you have API key
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Карта на ${name}`}
      ></iframe>
      */}
    </div>
  );
}
