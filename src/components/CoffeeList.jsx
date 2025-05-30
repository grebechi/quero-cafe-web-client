import { motion } from 'framer-motion';
import { extractTimeFromISO } from '../utils/date';

export default function CoffeeList({ coffees }) {
    function getPeriod(hour) {
        if (hour < 12) return 'Manhã';
        if (hour < 18) return 'Tarde';
        return 'Noite';
    }

    return (
        <div className="flex flex-col w-full max-w-md">
            <motion.h2
                className="text-lg font-semibold mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Cafés de Hoje
            </motion.h2>

            <section
                className="
                    w-full 
                    bg-white 
                    shadow 
                    rounded-lg 
                    p-4 
                    overflow-y-auto 
                    h-auto 
                    md:h-[70vh] 
                    md:max-h-[70vh] 
                    sm:max-h-60
                "
            >
                {coffees.length === 0 ? (
                    <p className="text-gray-500 text-sm">Nenhum café registrado hoje.</p>
                ) : (
                    <ul className="space-y-1 text-sm">
                        {coffees.map((coffee, index) => {
                            const time = extractTimeFromISO(coffee.date_created);
                            const hour = parseInt(time.split(':')[0], 10);
                            const period = getPeriod(hour);

                            const itemClass = index === 0
                                ? "text-blue-600 font-semibold" // Último café destacado
                                : "text-gray-700";

                            return (
                                <li key={coffee.id} className={itemClass}>
                                    {coffee.trainee_name} às {time} ({period})
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>
        </div>
    );
}
