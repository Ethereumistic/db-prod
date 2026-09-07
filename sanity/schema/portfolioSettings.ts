import { defineField, defineType } from 'sanity';
import { Settings } from 'lucide-react';

export const portfolioSettings = defineType({
    name: 'portfolioSettings',
    title: 'ПОРТФОЛИО Настройки',
    type: 'document',
    icon: Settings,
    fields: [
        defineField({
            name: 'categoryOrder',
            title: 'Подредба на категориите',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'projectCategory' }],
                    options: {
                        disableNew: true,
                    },
                },
            ],
            description:
                'Влачи и подреди категориите в желания ред (drag & drop). Категориите, които не са добавени тук, ще се подреждат по азбучен ред след тези в списъка. Първата карта автоматично заема 2 колони, ако общият брой е нечетен, за да няма празно място в мрежата.',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'ПОРТФОЛИО Подредба',
                subtitle: 'Singleton — контролира реда на категориите',
            };
        },
    },
});