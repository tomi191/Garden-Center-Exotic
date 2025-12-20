"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function B2BCTA() {
  return (
    <Section className="py-10 md:py-16 overflow-hidden">
      <Container>
        <div className="relative rounded-2xl md:rounded-3xl bg-[var(--color-primary-dark)] text-white p-5 md:p-10 overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-white/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <span className="text-[var(--color-secondary)] text-xs font-semibold tracking-wide uppercase mb-2 block">
                B2B партньорство
              </span>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-3 !text-white">
                За вашия бизнес
              </h2>
              <p className="text-white/80 text-xs md:text-sm mb-5 leading-relaxed">
                Флористи, хотели, ресторанти - предлагаме преференциални цени и редовни доставки директно от вносител.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/kontakti" className="w-full sm:w-auto">
                  <Button size="sm" className="bg-white text-[var(--color-primary-dark)] hover:bg-[var(--color-secondary)] hover:text-white rounded-full w-full">
                    Заявка за оферта
                  </Button>
                </Link>
                <a href="tel:0895670370" className="w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 rounded-full w-full">
                    <Phone className="w-4 h-4 mr-1.5" />
                    089 567 0370
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
