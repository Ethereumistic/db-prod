import { LegalLayout } from "@/components/sections/legal-layout";
import type { Metadata } from "next";

const BASE_URL = 'https://dbproductions.net';

export const metadata: Metadata = {
    title: "Общи условия",
    description: "Общи условия за ползване на услугите на db Productions. Правна информация за потребители в България.",
    alternates: {
        canonical: `${BASE_URL}/terms`,
    },
    openGraph: {
        title: "Общи условия | db Productions",
        description: "Общи условия за ползване на услугите на db Productions.",
        url: `${BASE_URL}/terms`,
        siteName: "db Productions",
        locale: "bg_BG",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function TermsPage() {
    return (
        <LegalLayout title="Общи условия">
            <h3><span className="text-white/20">1.</span> Предмет</h3>
            <p>Настоящите общи условия уреждат отношенията между „ДИ БИ БРАДЪРС“ ООД, наричано по-долу „db Productions“, и потребителите на уебсайта.</p>

            <h3><span className="text-white/20">2.</span> Корпоративна информация</h3>
            <p>„ДИ БИ БРАДЪРС“ ООД е дружество, регистрирано в Търговския регистър към Агенцията по вписванията с ЕИК 208029365, със седалище и адрес на управление: гр. София, ул. Граф Игнатиев 44.</p>

            <h3><span className="text-white/20">3.</span> Интелектуална собственост</h3>
            <p>Всички материали на този сайт, включително видеоклипове, фотографии, текстове и дизайн, са собственост на db Productions или са използвани с разрешение. Копирането, разпространението или използването им без изрично писмено съгласие е забранено.</p>

            <h3><span className="text-white/20">4.</span> Ограничаване на отговорността</h3>
            <p>db Productions се стреми да поддържа информацията на сайта точна и актуална, но не носи отговорност за евентуални технически грешки или прекъсвания в достъпа до сайта.</p>

            <h3><span className="text-white/20">5.</span> Промени</h3>
            <p>db Productions си запазва правото да променя настоящите условия по всяко време. Промените влизат в сила от момента на публикуването им на сайта.</p>

            <h3><span className="text-white/20">6.</span> Приложимо право</h3>
            <p>За всички неуредени въпроси се прилага действащото българско законодателство.</p>
        </LegalLayout>
    );
}
