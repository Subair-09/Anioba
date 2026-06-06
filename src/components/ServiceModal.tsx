import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Service } from "../types";
import { LucideIcon } from "./LucideIcon";

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onSelectServiceForQuote,
}) => {
  return (
    <AnimatePresence>
      {service && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 15 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="relative w-full max-w-3xl bg-white rounded-none shadow-2xl overflow-hidden z-10 border border-neutral-300"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/75 text-white hover:bg-[#F59E0B] hover:text-black rounded-none transition-all duration-300 backdrop-blur-sm"
              aria-label="Close modal"
            >
              <LucideIcon name="X" size={18} />
            </button>

            {/* Banner Image */}
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-end gap-4">
                <div className="p-3 bg-[#F59E0B] text-neutral-950 rounded-none shadow-lg shrink-0">
                  <LucideIcon name={service.iconName} size={28} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#F59E0B] font-bold font-mono">
                    Specifications Directory
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white mt-1 uppercase">
                    {service.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto">
              <div className="space-y-6 font-sans">
                <div>
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono">
                    Overview
                  </h4>
                  <p className="mt-2 text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
                    {service.detailedDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest font-mono mb-3">
                    Core Project Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 bg-neutral-50 rounded-none border border-neutral-200 border-l-2 border-l-[#F59E0B]"
                      >
                        <span className="text-[#F59E0B] mt-0.5 shrink-0">
                          <LucideIcon name="Check" size={14} className="stroke-[3]" />
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-neutral-800">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 rounded-none border-l-2 border-l-[#F59E0B] flex items-start gap-3">
                  <div className="p-2 bg-[#F59E0B]/10 text-brand-orange rounded-none shrink-0">
                    <LucideIcon name="ShieldCheck" size={18} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 font-mono uppercase tracking-wider">
                      Compliance & Safety Standard Guild
                    </h5>
                    <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                      At Anioba, all work complies with the Quality & Electrical Safety Regulatory mandates. We provide strict engineering audits, fireproof shielding materials, structural wind-bearing certification for solar panels, and official utility hand-over documentation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-5 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-[10px] text-neutral-450 font-mono uppercase tracking-wider">
                * Structural and efficiency warranties guaranteed.
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-white border border-neutral-300 text-neutral-700 text-xs font-mono uppercase tracking-widest rounded-none hover:bg-neutral-100 transition-colors duration-250 w-1/2 sm:w-auto cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => {
                    onSelectServiceForQuote(service.title);
                    onClose();
                  }}
                  className="px-5 py-2.5 bg-[#F59E0B] text-neutral-950 text-xs font-mono font-bold uppercase tracking-widest rounded-none hover:bg-neutral-950 hover:text-white transition-all duration-250 shadow-sm flex items-center justify-center gap-1.5 w-1/2 sm:w-auto cursor-pointer"
                >
                  <span>Request Spec quote</span>
                  <LucideIcon name="ArrowRight" size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
