"use client";

import { motion } from "framer-motion";
import { Award, Shield, Snowflake, Globe, GraduationCap, Heart } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";

const certifications = [
  {
    icon: Snowflake,
    title: "Студена Верига Сертифицирани",
    description: "Контролирана температура 2-4°C от ферма до клиент",
    badge: "Гарантирано",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "27 Години Опит",
    description: "Основани 1998 г. - доказана надеждност",
    badge: "От 1998",
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: Globe,
    title: "Международни Партньорства",
    description: "Директен внос от Колумбия, Кения, Гърция, Нидерландия, Турция и България",
    badge: "Премиум",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "100% Гаранция за Качество",
    description: "Замяна или възстановяване при проблем",
    badge: "Качество",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: GraduationCap,
    title: "Експертен Хортикултурен Екип",
    description: "Професионално обучени специалисти",
    badge: "Сертификат",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Heart,
    title: "Грижа за Клиента",
    description: "Безплатни консултации и QR ръководства",
    badge: "Подкрепа",
    color: "from-pink-500 to-rose-500",
  },
];

export function CertificationBadges() {
  return (
    <Section className="bg-gradient-to-br from-[var(--color-light)] to-white py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Нашите Сертификати и Стандарти</h2>
          <p className="text-base text-[var(--color-gray-600)]">
            Гарантирано качество, подкрепено от международни стандарти и дългогодишен опит
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-[var(--color-primary)]/20">
                  <CardContent className="p-8 text-center relative overflow-hidden">
                    {/* Background gradient accent */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cert.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`}></div>

                    {/* Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 bg-gradient-to-r ${cert.color} text-white text-xs font-bold rounded-full shadow-lg`}>
                        {cert.badge}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${cert.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-[var(--color-gray-600)] leading-relaxed">
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom trust statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-[2px] rounded-2xl">
            <div className="bg-white px-8 py-6 rounded-2xl">
              <p className="text-lg font-semibold text-[var(--color-foreground)]">
                <Award className="inline-block w-6 h-6 mr-2 text-[var(--color-primary)]" />
                Доверие на хиляди клиенти от цяла България
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
