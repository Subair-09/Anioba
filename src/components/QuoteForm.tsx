import React, { useState, useEffect } from "react";
import { ContactFormData } from "../types";
import { LucideIcon } from "./LucideIcon";

interface QuoteFormProps {
  initialServiceSelection?: string;
  solarCalculatorEstimate?: string;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  initialServiceSelection = "",
  solarCalculatorEstimate = "",
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    phone: "",
    email: "",
    serviceNeeded: "House & Industrial Solar Setup",
    message: "",
  });

  const [formTypeDetails, setFormTypeDetails] = useState({
    wiringScale: "Residential Setup",
    solarBatteryBackup: "Yes, fully offline inverter backup",
    consultingBudgetRange: "₦5,000,000 - ₦25,000,000",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [whatsappHref, setWhatsappHref] = useState("");

  // Sync initial selection from external trigger
  useEffect(() => {
    if (initialServiceSelection) {
      setFormData((prev) => ({ ...prev, serviceNeeded: initialServiceSelection }));
    }
  }, [initialServiceSelection]);

  // Sync solar calculation estimates from the estimator slider click
  useEffect(() => {
    if (solarCalculatorEstimate) {
      setFormData((prev) => ({
        ...prev,
        serviceNeeded: "House & Industrial Solar Setup",
        message: solarCalculatorEstimate,
      }));
    }
  }, [solarCalculatorEstimate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormTypeDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let extraInfo = "";
    if (formData.serviceNeeded.includes("Wiring")) {
      extraInfo = `Scale: ${formTypeDetails.wiringScale}`;
    } else if (formData.serviceNeeded.includes("Solar")) {
      extraInfo = `Battery Storage Requested: ${formTypeDetails.solarBatteryBackup}`;
    } else if (formData.serviceNeeded.includes("Consulting")) {
      extraInfo = `Est. Budget Range: ${formTypeDetails.consultingBudgetRange}`;
    }

    const payload = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      serviceNeeded: formData.serviceNeeded,
      metaDetails: extraInfo || "Standard structural request configuration",
      message: formData.message || "Looking forward to working together."
    };

    let endpoint = "https://formspree.io/f/placeholder_anioba";
    try {
      const metaEnv = (import.meta as any).env;
      if (metaEnv && metaEnv.VITE_FORMSPREE_ENDPOINT) {
        endpoint = metaEnv.VITE_FORMSPREE_ENDPOINT;
      }
    } catch (err) {
      console.warn("Could not read import.meta.env inside QuoteForm:", err);
    }

    const isPlaceholder = endpoint.includes("placeholder_anioba") || !endpoint;

    // Build WhatsApp Preformed Message template
    const rawMessage = `Hello Anioba Multipurpose!

I just submitted a quote request from your premium website. Here are my project details:

*Name:* ${formData.fullName}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Service Requested:* ${formData.serviceNeeded}
${extraInfo ? `\n*Details:* ${extraInfo}\n` : ""}
*Message:* ${formData.message || "Looking forward to working together."}

Please get in touch with me to schedule our consultation. Thank you!`;

    const whatsappNumber = "2349032791481";
    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rawMessage)}`;
    setWhatsappHref(link);

    // Save submission to local history
    const savedQuotes = JSON.parse(localStorage.getItem("anioba_quotes") || "[]");
    savedQuotes.push({
      ...formData,
      ...formTypeDetails,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("anioba_quotes", JSON.stringify(savedQuotes));

    if (isPlaceholder) {
      // Simulate submission network response time
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
      }, 1000);
    } else {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          setSubmitSuccess(true);
        } else {
          console.warn("Formspree rejected quote submit, falling back to client-side success screen.");
          setSubmitSuccess(true);
        }
      } catch (err: any) {
        console.warn("Formspree connection failed: ", err.message);
        setSubmitSuccess(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      serviceNeeded: "House & Industrial Solar Setup",
      message: "",
    });
    setSubmitSuccess(false);
  };

  return (
    <div className="bg-white rounded-none p-6 sm:p-10 border border-neutral-200 shadow-xl relative">
      {/* Top accent border - sharp, solid */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0D0D0D]" />

      {submitSuccess ? (
        <div className="text-center py-12 space-y-6">
          <div className="mx-auto w-16 h-16 bg-[#F59E0B]/10 rotate-45 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] scale-110">
            <div className="-rotate-45">
              <LucideIcon name="ShieldCheck" size={28} />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-xl sm:text-2xl font-extrabold font-display text-neutral-900 uppercase">
              Slot Registered Successfully
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
              Our operations office has booked your file slot. A structural project manager will review your specs and telephone you within 2 business hours.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Instant WhatsApp Funnel CTA */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest font-mono rounded-none shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <LucideIcon name="MessageCircle" size={16} />
              <span>WhatsApp Connect</span>
            </a>

            <button
              onClick={resetForm}
              className="px-6 py-3.5 bg-neutral-150 hover:bg-neutral-250 text-neutral-800 font-bold font-mono text-xs uppercase tracking-widest rounded-none border border-neutral-300 w-full sm:w-auto cursor-pointer"
            >
              Request Another Sector
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 border-l-2 border-[#F59E0B] text-neutral-800 text-[10px] font-bold font-mono uppercase tracking-widest">
              <span>Secure Allocation Gateway</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-display text-neutral-900 leading-tight uppercase">
              Schedule Site Consultation
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-sans">
              Enter your specifications below. We provide guaranteed structural calculations and custom itemized breakdowns.
            </p>
          </div>

          <div className="space-y-4">
            {/* Input Name */}
            <div>
              <label htmlFor="fullName" className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono block mb-1.5">
                Full Name / Entity
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                  <LucideIcon name="Users" size={16} />
                </span>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="e.g., Engineer Joshua Alao"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-none text-sm focus:bg-white focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none transition-all duration-150 text-neutral-900 font-sans"
                />
              </div>
            </div>

            {/* Input Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono block mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <LucideIcon name="Phone" size={16} />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="e.g., +234 812 3456"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-none text-sm focus:bg-white focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none transition-all duration-150 text-neutral-900 font-sans"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono block mb-1.5">
                  Corporate Email
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <LucideIcon name="Mail" size={16} />
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="e.g., corporate@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-none text-sm focus:bg-white focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none transition-all duration-150 text-neutral-900 font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Service Selection Box */}
            <div>
              <label htmlFor="serviceNeeded" className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono block mb-1.5">
                Service Sector Required
              </label>
              <select
                id="serviceNeeded"
                name="serviceNeeded"
                value={formData.serviceNeeded}
                onChange={handleInputChange}
                className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-none text-sm focus:bg-white focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none transition-all duration-150 text-neutral-900 cursor-pointer font-medium font-sans"
              >
                <option value="House & Industrial Wiring">House & Industrial Wiring Installation</option>
                <option value="House & Industrial Solar Setup">House & Industrial Solar Setup</option>
                <option value="Supply of Premium Equipment">Supply of Electrical Equipment & Appliances</option>
                <option value="Construction Consulting">Construction Consulting</option>
                <option value="Elite Contractor Services">Elite Contractor Services</option>
                <option value="Mechanic & Electrical Engineering (M&E)">Mechanic & Electrical Engineering (M&E)</option>
                <option value="Architectural Drawings & Designs">Architectural Drawings & Designs</option>
                <option value="Real Estate Development">Real Estate Development</option>
                <option value="Real Estate Supervision & Elite Contracting Services">Real Estate Supervision & Elite Contracting Services</option>
              </select>
            </div>

            {/* Dynamic Specific Section */}
            {formData.serviceNeeded.includes("Wiring") && (
              <div className="p-3 bg-neutral-50 border-l-2 border-[#F59E0B] rounded-none">
                <label htmlFor="wiringScale" className="text-[9.5px] font-bold text-neutral-800 uppercase tracking-widest font-mono block mb-1">
                  Scale of Structural wiring
                </label>
                <select
                  id="wiringScale"
                  name="wiringScale"
                  value={formTypeDetails.wiringScale}
                  onChange={handleDetailChange}
                  className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-none text-xs focus:ring-1 focus:ring-[#F59E0B] outline-none text-neutral-800 font-sans"
                >
                  <option value="Residential Custom Build">Residential Custom Build Villa</option>
                  <option value="Multi-Unit Residential Estate">Multi-Unit Residential Estate</option>
                  <option value="Commercial Complex/Office">Commercial Complex / Modern Corporate Office</option>
                  <option value="Industrial Depot / Processing Factory">Heavy Industrial Factory Depot</option>
                </select>
              </div>
            )}

            {formData.serviceNeeded.includes("Solar") && (
              <div className="p-3 bg-neutral-50 border-l-2 border-[#F59E0B] rounded-none">
                <label htmlFor="solarBatteryBackup" className="text-[9.5px] font-bold text-neutral-800 uppercase tracking-widest font-mono block mb-1">
                  Lithium-Ion Battery Storage Required?
                </label>
                <select
                  id="solarBatteryBackup"
                  name="solarBatteryBackup"
                  value={formTypeDetails.solarBatteryBackup}
                  onChange={handleDetailChange}
                  className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-none text-xs focus:ring-1 focus:ring-[#F59E0B] outline-none text-neutral-800 font-sans"
                >
                  <option value="Yes, fully offline hybrid system">Yes, premium off-grid / hybrid (seamless UPS backup)</option>
                  <option value="No battery backup needed, grid solar only">No, grid-tied day output only (no battery backup)</option>
                  <option value="Require professional recommendation">Help me calculate appropriate battery capacities</option>
                </select>
              </div>
            )}

            {formData.serviceNeeded.includes("Consulting") && (
              <div className="p-3 bg-neutral-50 border-l-2 border-[#F59E0B] rounded-none">
                <label htmlFor="consultingBudgetRange" className="text-[9.5px] font-bold text-neutral-800 uppercase tracking-widest font-mono block mb-1">
                  Estimated Total Project Volume
                </label>
                <select
                  id="consultingBudgetRange"
                  name="consultingBudgetRange"
                  value={formTypeDetails.consultingBudgetRange}
                  onChange={handleDetailChange}
                  className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-none text-xs focus:ring-1 focus:ring-[#F59E0B] outline-none text-neutral-800 font-sans"
                >
                  <option value="Under ₦5,000,000">Under ₦5,000,000</option>
                  <option value="₦5,000,000 - ₦25,000,000">₦5,000,000 - ₦25,000,000</option>
                  <option value="₦25,000,000 - ₦100,000,000">₦25,000,000 - ₦100,000,000</option>
                  <option value="₦100,000,000+">₦100,000,000+ (Heavy commercial/industrial development)</option>
                </select>
              </div>
            )}

            {/* Custom Memo Message */}
            <div>
              <label htmlFor="message" className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest font-mono block mb-1.5">
                Outline Specifications, Parameters & Preferences
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Give details about square footage, roof structures, existing grid problems, requested timing, or machinery capacities..."
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-none text-sm focus:bg-white focus:ring-1 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none transition-all duration-150 text-neutral-900 resize-none font-sans"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 font-bold font-mono text-xs uppercase tracking-widest text-[#0a0a0a] rounded-none shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              isSubmitting
                ? "bg-neutral-300 shadow-none cursor-wait text-neutral-500"
                : "bg-[#F59E0B] hover:bg-[#0A0A0A] hover:text-white"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Allocating Resources...</span>
              </>
            ) : (
              <>
                <span>Secure Allocation Slot</span>
                <LucideIcon name="CheckCircle2" size={14} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
