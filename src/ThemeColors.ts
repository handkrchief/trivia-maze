export interface ThemeColors {
    primaryText: string;
    background: string;
    primaryOutline: string;
    primaryDivide: string;
    primaryButton: string;
    formBackground: string;
    secondaryButton: string;
    loadButton: string;
    disabledButton: string;
    outlinePrimaryButton: string;
    outlineSecondaryButton: string;
}

export const buttonClass = "py-2 px-4 rounded  transition-all duration-300 ";


export const lightThemeColors: ThemeColors = {
    primaryText: "text-black",
    background: "bg-gray-100",
    primaryOutline: "border border-gray-200",
    primaryDivide: "divide-gray-300 ",
    primaryButton: `${buttonClass} bg-purple-800 hover:bg-purple-700 text-white`,
    formBackground: "bg-white",
    outlinePrimaryButton: `${buttonClass} bg-transparent border border-purple-800 hover:bg-purple-700 text-white`,
    secondaryButton: `${buttonClass} bg-rose-600 hover:bg-rose-500 text-white`,
    outlineSecondaryButton: `${buttonClass} bg-transparent border border-rose-600 hover:bg-rose-500 text-white`,
    disabledButton: `${buttonClass} bg-gray-400 text-white hover:cursor-not-allowed`,
    loadButton: `${buttonClass} bg-amber-600 hover:bg-amber-700 text-white`,
}

export const darkThemeColors: ThemeColors = {
    primaryText: "text-gray-200",
    background: "bg-gray-900", 
    primaryOutline: "border border-gray-600",
    primaryDivide: "divide-gray-500 ",
    primaryButton: `${buttonClass} bg-purple-900 hover:bg-purple-800 text-white`,
    formBackground: "bg-gray-800",
    outlinePrimaryButton: `${buttonClass} bg-transparent border border-purple-900 hover:bg-purple-800 text-white`,
    secondaryButton: `${buttonClass} bg-rose-900 hover:bg-rose-800 text-white`,
    outlineSecondaryButton: `${buttonClass} bg-transparent border border-rose-900 hover:bg-rose-800 text-white`,
    disabledButton: `${buttonClass} bg-gray-700 text-white hover:cursor-not-allowed`,
    loadButton: `${buttonClass} bg-amber-700 hover:bg-amber-800 text-white`,
}
