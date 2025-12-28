import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ASSETS_BASE_URL = "https://cdn.jsdelivr.net/gh/Ethereumistic/db-prod-assets/about/";

const owners = [
    {
        name: "Даниел Ненов",
        role: "Режисьор, Сценарист & Монтажист",
        image: "dani.png",
        description: "Даниел е творческият двигател на студиото с опит в продукции като „Игри на волята“ и „Hell’s Kitchen“. Неговата сила е в кинематографичното разказване и прецизния монтаж, фокусирайки се върху автентичността и емоцията.",
        socials: [
            { icon: Facebook, href: "https://www.facebook.com/daniel.nenov.52" },
            { icon: Instagram, href: "https://www.instagram.com/dnenov/" },
        ],
        imageStyle: "object-cover object-top transition-transform duration-700 -mt-6 scale-110",
    },
    {
        name: "Дилян Калчев",
        role: "Журналист, Редактор & Продуцент",
        image: "dido.png",
        description: "Дилян съчетава образование от Coventry University с опит в Нова телевизия като редактор на „Здравей, България“. Той е гласът на смисленото съдържание, фокусиран върху истории, които вдъхновяват и информират.",
        socials: [
            { icon: Facebook, href: "https://www.facebook.com/didonkin" },
            { icon: Instagram, href: "https://www.instagram.com/dilyankalchev/" },
            { icon: Youtube, href: "https://www.tiktok.com/@dilyankalchev", isTikTok: true },
        ],
        imageStyle: "object-cover object-top transition-transform duration-700",
    }
];

export default function AboutPage() {
    return (
        <div className="flex flex-col w-full pb-24">
            {/* Hero Section - Maintaining existing positioning */}
            <section className="relative h-[85vh] min-h-[600px] w-full flex items-end justify-center overflow-hidden pb-16 lg:pb-24">
                <Image
                    src={`${ASSETS_BASE_URL}dd.png`}
                    alt="Daniel and Dilyan"
                    fill
                    className="object-cover object-top opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
                    priority
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black via-black/80 to-transparent" />

                <div className="container relative z-10 px-4 text-center">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 uppercase">
                        ЗА <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-white/40">НАС</span>
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-foreground/80 max-w-3xl mx-auto font-light leading-relaxed">
                        Специлизираме в създаването на филми, видеосъдържание и реклами, съчетавайки креативност, високо качество и внимание към детайла. Вярваме, че добрата визия и силното послание вървят ръка за ръка.
                    </p>
                </div>
            </section>

            {/* Owners Section */}
            <section className="py-16 container max-w-5xl mx-auto px-4 space-y-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                    {owners.map((owner) => (
                        <div
                            key={owner.name}
                            className="group flex flex-col bg-white/2 border border-white/5 transition-all hover:border-white/10 overflow-hidden"
                        >
                            {/* Upper Zone: Image + Title/Badge */}
                            <div className="relative w-full aspect-square overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                <Image
                                    src={`${ASSETS_BASE_URL}${owner.image}`}
                                    alt={owner.name}
                                    fill
                                    className={cn("object-cover object-top transition-transform duration-700", owner.imageStyle)}
                                />
                                {/* Bottom transition gradient - seamless connection to lower zone */}
                                <div className="absolute inset-x-0 bottom-0 h-80 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent z-10" />

                                <div className="absolute bottom-6 w-full text-center z-20 space-y-1">
                                    <h3 className="text-3xl font-black tracking-tighter text-white uppercase">
                                        {owner.name}
                                    </h3>
                                    <p className="text-white/60 font-bold tracking-widest text-xs uppercase">
                                        {owner.role}
                                    </p>
                                </div>
                            </div>

                            {/* Lower Zone: Description + Socials */}
                            <div className="w-full p-4 md:p-10 space-y-6 flex-1 flex flex-col items-center bg-[#0a0a0a]">
                                <p className="text-foreground/70 leading-relaxed font-light text-sm md:text-base text-center italic">
                                    {owner.description}
                                </p>

                                <div className="flex items-center gap-4 pt-4 mt-auto">
                                    {owner.socials.map((social, sIndex) => (
                                        <Link
                                            key={sIndex}
                                            href={social.href}
                                            target="_blank"
                                            className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 hover:bg-white hover:text-black transition-all duration-300"
                                        >
                                            <social.icon className="w-5 h-5" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Collective Success */}
                {/* <div className="bg-white/2 p-8 md:p-16 text-center border border-white/5 space-y-8 max-w-5xl mx-auto">
                    <div className="space-y-4">
                        <h4 className="text-xl font-bold text-white uppercase tracking-[0.3em]">Our Milestone</h4>
                        <div className="w-12 h-0.5 bg-emerald-500 mx-auto" />
                    </div>
                    <p className="text-lg md:text-xl text-foreground/70 font-light italic leading-relaxed">
                        „Чистота или Смърт“ – нашият първи пълнометражен документален проект, който разказа истории за борбата със зависимостите и постигна успех с четири премиерни прожекции в цяла България.
                    </p>
                </div> */}
            </section>

            {/* Call to action */}
            <section className="py-24 container max-w-7xl mx-auto px-4 text-center">
                <div className="space-y-12 bg-linear-to-b from-white/5 to-transparent py-24 border-x border-white/5">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
                        Ready to <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-white/40">create?</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Button size="lg" className="bg-white text-black hover:bg-white/90 px-12 py-8 text-xl font-bold transition-all">
                            Contact Us
                        </Button>
                        <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5 px-12 py-8 text-xl font-medium transition-all">
                            View Portfolio
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
