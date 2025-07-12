import React, {useState} from "react";

const ThemeContext = React.createContext({
	theme: "light",
	toggleTheme: (theme: string) => {
		console.warn("setTheme function not implemented");
	},
});

interface ThemeProviderProps {
	children: React.ReactNode;
}

export function ThemeProvider({children}: ThemeProviderProps) {
	const [theme, setTheme] = useState("light");

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{theme, toggleTheme: toggleTheme}}>
			<div className={`theme-${theme}`}>{children}</div>
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = React.useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
