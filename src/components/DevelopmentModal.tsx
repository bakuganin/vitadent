import { motion, AnimatePresence } from "motion/react";
import { X, Lock, PenTool as Tool, Calendar, Layers } from "lucide-react";

interface DevelopmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  sectionName?: string;
}

export default function DevelopmentModal({ isOpen, onClose, sectionName = "Раздел" }: DevelopmentModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#212121]/45 backdrop-blur-md"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md bg-white/95 backdrop-blur-lg border border-stone-200 rounded-3xl p-8 shadow-2xl overflow-hidden z-10"
          >
            {/* Design accents */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-stone-400 via-stone-900 to-stone-400" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full border border-stone-100 hover:border-stone-900 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-all duration-300 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon decoration */}
            <div className="flex justify-center mb-6 mt-2">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-800 shadow-sm">
                  <Layers className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-stone-900 text-white border-2 border-white flex items-center justify-center">
                  <Lock className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Text description */}
            <div className="text-center space-y-3">
              <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-stone-400">
                Vitadent Hambakliinik
              </span>
              <h3 className="text-xl font-bold text-stone-900 tracking-tight">
                Раздел «{sectionName}» в разработке
              </h3>
              <p className="text-stone-500 text-xs leading-relaxed max-w-sm mx-auto">
                Доктор <strong>Jevgeni Abramovits</strong> в настоящее время дорабатывает данный клинический модуль и список материалов, чтобы предоставить вам максимально точную медицинскую информацию.
              </p>
            </div>

            {/* Information Blocks */}
            <div className="mt-6 bg-stone-50 border border-stone-100/80 rounded-2xl p-4 gap-3 flex flex-col text-left text-xs text-stone-605">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-stone-800 block">Запуск раздела ожидается скоро</strong>
                  Наши специалисты обновляют технические спецификации и прайс-лист на 2026 год.
                </p>
              </div>
              <div className="border-t border-stone-200/50 my-1" />
              <div className="flex items-start gap-3">
                <Tool className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <p>
                  <strong className="text-stone-800 block">Запись на прием открыта!</strong>
                  Вы можете задать все вопросы лично на диагностике у доктора. Заполните форму внизу страницы или позвоните нам.
                </p>
              </div>
            </div>

            {/* Quick Consultation Trigger */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={onClose}
                className="w-full py-4 text-center rounded-full bg-stone-900 hover:bg-stone-850 text-white font-sans text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg active:scale-95 text-stone-50"
              >
                Понятно
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
