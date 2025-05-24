import { motion } from 'framer-motion';
import { formatFullDateTime } from '../utils/date';

export default function MyRequestList({ requests }) {
    return (
        <div className="flex flex-col w-full max-w-md">
            <motion.h2
                className="text-lg font-semibold mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Minhas Requisições
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
                {requests.length === 0 ? (
                    <p className="text-gray-500 text-sm">Nenhuma requisição registrada.</p>
                ) : (
                    <ul className="space-y-1 text-sm">
                        {requests.map((request, index) => {
                            const itemClass = index === 0
                                ? "text-blue-600 font-semibold" // Última requisição destacada
                                : "text-gray-700";

                            return (
                                <li key={request.id} className={itemClass}>
                                    {formatFullDateTime(request.date_created)}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </section>
        </div>
    );
}
