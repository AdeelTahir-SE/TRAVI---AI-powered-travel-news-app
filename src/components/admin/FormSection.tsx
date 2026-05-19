import React from 'react'

interface FormSectionProps {
    id: string
    number: number
    title: string
    description?: string
    icon: React.ReactNode
    children: React.ReactNode
}

/**
 * A visually distinct form section card with amber left accent bar,
 * numbered badge, Manrope heading and optional description.
 * Used inside hotel/article modals to group related fields.
 */
export function FormSection({ id, number, title, description, icon, children }: FormSectionProps) {
    return (
        <div id={id} className="scroll-mt-4">
            {/* Section header */}
            <div className="flex items-start gap-3 mb-5">
                <div className="flex-shrink-0 w-8 h-8 rounded-[10px] bg-[#F8A900] flex items-center justify-center shadow-sm">
                    <span className="text-black text-xs font-extrabold font-manrope">{number}</span>
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="text-[#F8A900]">{icon}</span>
                        <h3 className="font-manrope font-extrabold text-[15px] text-[#112259] tracking-tight">{title}</h3>
                    </div>
                    {description && (
                        <p className="text-xs text-gray-400 mt-0.5 font-inter">{description}</p>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="pl-11 space-y-4">
                {children}
            </div>
        </div>
    )
}

interface FieldLabelProps {
    children: React.ReactNode
    required?: boolean
    hint?: string
}

export function FieldLabel({ children, required, hint }: FieldLabelProps) {
    return (
        <div className="mb-1.5">
            <label className="block text-[13px] font-semibold text-[#112259] font-inter">
                {children}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            {hint && <p className="text-[11px] text-gray-400 mt-0.5 font-inter">{hint}</p>}
        </div>
    )
}

export const inputCls = "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none font-inter text-sm text-gray-800 placeholder:text-gray-400 bg-white transition-all"
export const textareaCls = "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F8A900] focus:border-[#F8A900] focus:outline-none font-inter text-sm text-gray-800 placeholder:text-gray-400 bg-white transition-all resize-none"

interface SubCardProps {
    label: string
    index: number
    onRemove: () => void
    children: React.ReactNode
    accent?: string
}

export function SubCard({ label, index, onRemove, children, accent = 'bg-gray-50' }: SubCardProps) {
    return (
        <div className={`rounded-xl border border-gray-100 ${accent} overflow-hidden`}>
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#F8A900] text-black text-[10px] font-extrabold flex items-center justify-center font-manrope flex-shrink-0">
                        {index + 1}
                    </span>
                    <span className="text-[13px] font-semibold text-[#112259] font-inter">{label} #{index + 1}</span>
                </div>
                <button
                    type="button"
                    onClick={onRemove}
                    className="cursor-pointer w-6 h-6 rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 flex items-center justify-center text-sm font-bold transition-colors"
                    title={`Remove ${label}`}
                >
                    ×
                </button>
            </div>
            <div className="p-4 space-y-3">
                {children}
            </div>
        </div>
    )
}

interface AddButtonProps {
    onClick: () => void
    label: string
}

export function AddButton({ onClick, label }: AddButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="cursor-pointer w-full py-2.5 border-2 border-dashed border-gray-200 hover:border-[#F8A900] text-gray-400 hover:text-[#112259] rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 font-inter"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {label}
        </button>
    )
}

interface SectionNavProps {
    sections: { id: string; label: string; icon: React.ReactNode }[]
}

export function SectionNav({ sections }: SectionNavProps) {
    const scroll = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    return (
        <nav className="flex flex-col gap-0.5">
            {sections.map((s, i) => (
                <button
                    key={s.id}
                    type="button"
                    onClick={() => scroll(s.id)}
                    className="cursor-pointer flex items-center gap-2.5 px-3 py-2 rounded-xl text-left hover:bg-[#F8A900]/10 transition-colors group"
                >
                    <span className="w-5 h-5 rounded-full bg-[#F8A900]/20 text-[#112259] text-[10px] font-bold flex items-center justify-center flex-shrink-0 group-hover:bg-[#F8A900] group-hover:text-black transition-colors font-manrope">
                        {i + 1}
                    </span>
                    <span className="text-xs font-medium text-gray-500 group-hover:text-[#112259] transition-colors font-inter truncate">{s.label}</span>
                </button>
            ))}
        </nav>
    )
}
