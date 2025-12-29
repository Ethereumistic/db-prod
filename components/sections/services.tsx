// import {
//     Video,
//     Camera,
//     Layers,
//     Mic2,
//     Share2,
//     PenTool
// } from "lucide-react";
// import Image from "next/image";
// import {
//     Card,
// } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { CornerBorders } from "@/components/ui/corner-borders";

// const services = [
//     {
//         title: "Видео",
//         description: "Висококачествена кинематография и рекламно видео, създадено за Вашия успех.",
//         icon: Video,
//         image: "video.jpg",
//     },
//     {
//         title: "Фотография",
//         description: "Професионална фотография, която улавя емоцията и детайла с безпогрешна точност.",
//         icon: Camera,
//         image: "photography.jpg",
//     },
//     {
//         title: "Видео Монтаж",
//         description: "Експертен монтаж и визуални ефекти, които вдъхват живот на всяка Ваша идея.",
//         icon: Layers,
//         image: "post-production.jpg",
//     },
//     {
//         title: "Озвучаване",
//         description: "Въздействащо професионално озвучаване, което придава характер на всеки проект.",
//         icon: Mic2,
//         image: "voice-over.jpg",
//     },
//     {
//         title: "Социални Мрежи",
//         description: "Завладяващо кратко съдържание, проектирано да доминира в социалните мрежи.",
//         icon: Share2,
//         image: "social-media.jpg",
//     },
//     {
//         title: "Копирайтинг",
//         description: "Въздействащ копирайтинг и сценарии, които докосват сърцата на Вашата аудитория.",
//         icon: PenTool,
//         image: "copy-write.jpg",
//     },
// ];

// const ASSETS_BASE_URL = "https://cdn.jsdelivr.net/gh/Ethereumistic/db-prod-assets/services/";

// export function Services() {
//     return (
//         <section id="services" className="py-12 bg-black scroll-mt-7">
//             <div className="container max-w-5xl mx-auto px-4">
//                 <div className="flex flex-col items-center mb-10 text-center space-y-3">
//                     <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
//                         НАШИТЕ <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-white/40">УСЛУГИ</span>
//                     </h2>
//                     <div className="w-16 h-1 bg-white/10" />
//                     <p className="text-white/50 max-w-xl text-base font-light">
//                         Цялостни творчески решения – от първоначалната концепция до финалния резултат.
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {services.map((service) => (
//                         <Card
//                             key={service.title}
//                             className="relative border-white/10 hover:border-white/20 transition-all duration-500 group group/nav overflow-hidden aspect-square flex flex-col justify-end"
//                         >
//                             {/* Background Image - Persistent with hover state changes */}
//                             <div className="absolute inset-0 z-0">
//                                 <Image
//                                     src={`${ASSETS_BASE_URL}${service.image}`}
//                                     alt={service.title}
//                                     fill
//                                     className="object-cover scale-100 group-hover:scale-105 transition-all duration-1000 ease-out opacity-80 group-hover:opacity-100"
//                                 />
//                                 {/* Gradient Overlay - Smoother and more focused on text readability */}
//                                 <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black via-black/50 via-60% to-transparent transition-all duration-500" />
//                             </div>

//                             {/* Content */}
//                             <div className="relative z-10 p-4">
//                                 <div className="w-10 h-10 flex items-center justify-center bg-white/10 border border-white/20 backdrop-blur-sm transition-all duration-500 group-hover:bg-white group-hover:border-white mb-3">
//                                     <service.icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
//                                 </div>
//                                 <div className="relative inline-flex items-center mb-3">
//                                     <CornerBorders />
//                                     <h3 className="text-xl font-bold text-white px-4 py-1.5 transition-all duration-500 relative z-10">
//                                         {service.title}
//                                     </h3>
//                                 </div>
//                                 <p className="text-white/60 group-hover:text-white/90 transition-colors duration-500 text-xs leading-relaxed line-clamp-2">
//                                     {service.description}
//                                 </p>
//                             </div>
//                         </Card>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }
