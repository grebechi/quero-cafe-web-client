import { motion } from 'framer-motion';
import { extractTimeFromISO } from '../utils/date';

export default function CoffeeList({ coffees }) {
    function getPeriod(hour) {
        if (hour < 12) return 'Manhã';
        if (hour < 18) return 'Tarde';
        return 'Noite';
    }

    return (
        <section className="flex-1 bg-white shadow rounded-lg p-6 overflow-y-auto max-h-[70vh]">
            <motion.h2 
                className="text-xl font-semibold mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Cafés de Hoje
            </motion.h2>
            {coffees.length === 0 ? (
                <p className="text-gray-500">Nenhum café registrado hoje.</p>
            ) : (
                <ul className="space-y-2">
                    {coffees.map(coffee => {
                        const time = extractTimeFromISO(coffee.date_created);
                        const hour = parseInt(time.split(':')[0], 10);
                        const period = getPeriod(hour);

                        return (
                            <li key={coffee.id} className="text-gray-600">
                                {coffee.trainee_name} às {time} ({period})
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}
