export interface ThemeColors {
    background: string;
    primaryButton: string;
    secondaryButton: string;
    disabledButton: string;
}

export const buttonClass = "py-2 px-4 rounded  transition-all duration-300 ";


export const lightThemeColors: ThemeColors = {
    background: "bg-gray-100",
    primaryButton: `${buttonClass} bg-purple-800 hover:bg-purple-700 text-white`,
    secondaryButton: `${buttonClass} bg-rose-600 hover:bg-rose-500 text-white`,
    disabledButton: `${buttonClass} bg-gray-400 text-white`,
}

export const darkThemeColors: ThemeColors = {
    background: "bg-gray-900",
    primaryButton: `${buttonClass} bg-purple-900 hover:bg-purple-800 text-white`,
    secondaryButton: `${buttonClass} bg-rose-900 hover:bg-rose-800 text-white`,
    disabledButton: `${buttonClass} bg-gray-700 text-white`,
}
