import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Delete, RotateCcw, Calculator as CalculatorIcon } from "lucide-react";

function Calculator(props) {
    const [number, setNumber] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(false);

    const isDark = props.dark;

    // Add numbers
    const PushNumber = (n) => {
        if (error) {
            setNumber(n);
            setError(false);
            setResult(null);
            return;
        }

        setNumber((prev) => prev + n);
        setResult(null);
    };

    // Add decimal
    const AddDecimal = () => {
        if (error) {
            setNumber("0.");
            setError(false);
            return;
        }

        const currentPart = number.split(/[+\-*/]/).pop();

        if (currentPart.includes(".")) return;

        if (number === "" || /[+\-*/]$/.test(number)) {
            setNumber((prev) => prev + "0.");
        } else {
            setNumber((prev) => prev + ".");
        }

        setResult(null);
    };

    // Add operators
    const AddNumber = (operator) => {
        if (error) return;

        if (number === "") {
            if (operator === "-") {
                setNumber("-");
            }
            return;
        }

        if (/[+\-*/]$/.test(number)) {
            setNumber((prev) => prev.slice(0, -1) + operator);
            return;
        }

        setNumber((prev) => prev + operator);
        setResult(null);
    };

    // Backspace
    const BackSpace = () => {
        setNumber((prev) => prev.slice(0, -1));
        setResult(null);
        setError(false);
    };

    // Clear
    const Clear = () => {
        setNumber("");
        setResult(null);
        setError(false);
    };

    // Calculate expression without eval()
    const CalculateTotal = () => {
        try {
            if (!number || /[+\-*/.]$/.test(number)) return;

            const tokens = number.match(/(?:\d+\.?\d*|\.\d+)|[+\-*/]/g);

            if (!tokens || tokens.join("") !== number) {
                throw new Error("Invalid expression");
            }

            let index = 0;

            // Handle numbers and unary operators
            const parsePrimary = () => {
                const token = tokens[index];

                if (token === "-") {
                    index++;
                    return -parsePrimary();
                }

                if (token === "+") {
                    index++;
                    return parsePrimary();
                }

                if (!token || isNaN(Number(token))) {
                    throw new Error("Invalid expression");
                }

                index++;
                return Number(token);
            };

            // Multiplication and division
            const parseTerm = () => {
                let value = parsePrimary();

                while (tokens[index] === "*" || tokens[index] === "/") {
                    const operator = tokens[index++];
                    const next = parsePrimary();

                    if (operator === "/" && next === 0) {
                        throw new Error("Division by zero");
                    }

                    value =
                        operator === "*"
                            ? value * next
                            : value / next;
                }

                return value;
            };

            // Addition and subtraction
            const parseExpression = () => {
                let value = parseTerm();

                while (tokens[index] === "+" || tokens[index] === "-") {
                    const operator = tokens[index++];
                    const next = parseTerm();

                    value =
                        operator === "+"
                            ? value + next
                            : value - next;
                }

                return value;
            };

            const total = parseExpression();

            if (index !== tokens.length || !Number.isFinite(total)) {
                throw new Error("Invalid expression");
            }

            const formatted = Number(total.toPrecision(12));

            setNumber(String(formatted));
            setResult(formatted);
            setError(false);

        } catch {
            setError(true);
            setResult(null);
        }
    };

    // Button styling
    const buttonBase = `flex items-center justify-center rounded-2xl text-lg font-semibold transition-all duration-200 active:scale-95 ${isDark
            ? "bg-[#1b2740] text-slate-200 hover:bg-[#293854]"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`;

    const operatorButton = `flex items-center justify-center rounded-2xl text-xl font-semibold transition-all duration-200 active:scale-95 ${isDark
            ? "bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25"
            : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
        }`;

    const renderButton = (label, action, style = "number") => (
        <button
            key={label}
            onClick={action}
            className={`h-16 ${style === "number"
                    ? buttonBase
                    : style === "operator"
                        ? operatorButton
                        : style === "clear"
                            ? `rounded-2xl font-semibold transition active:scale-95 ${isDark
                                ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                                : "bg-rose-50 text-rose-500 hover:bg-rose-100"
                            }`
                            : "rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 active:scale-95"
                }`}
        >
            {label}
        </button>
    );

    return (
        <div
            className={`min-h-screen transition-colors duration-300 ${isDark
                    ? "bg-[#0b1020] text-slate-100"
                    : "bg-[#f8f9fd] text-slate-800"
                }`}
        >
            <Sidebar
                theme={props.theme}
                currentTheme={props.currentTheme}
                dark={props.dark}
                setDark={props.setDark}
            />

            <div className="ml-64">
                <Header
                    theme={props.theme}
                    currentTheme={props.currentTheme}
                    dark={props.dark}
                    setDark={props.setDark}
                />

                <main className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center p-6 md:p-10">

                    {/* Page Heading */}
                    <div className="mb-8 w-full max-w-md">
                        {/* <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                                <CalculatorIcon size={25} />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">
                                    Calculator
                                </h1>
                                <p className={`mt-1 text-sm ${isDark ? "text-slate-500" : "text-slate-400"
                                    }`}>
                                    Simple calculations, made beautiful.
                                </p>
                            </div>
                        </div> */}
                    </div>

                    {/* Calculator Body */}
                    <div
                        className={`w-full max-w-md rounded-3xl border p-5 shadow-2xl md:p-7 ${isDark
                                ? "border-white/[0.07] bg-[#131b2e] shadow-black/20"
                                : "border-slate-200 bg-white shadow-slate-200/60"
                            }`}
                    >

                        {/* Display */}
                        <div
                            className={`mb-6 flex min-h-36 flex-col justify-between overflow-hidden rounded-2xl p-5 ${isDark ? "bg-[#0b1020]" : "bg-slate-50"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className={`text-xs font-medium uppercase tracking-widest ${isDark ? "text-slate-500" : "text-slate-400"
                                    }`}>
                                    {error ? "Error" : "Expression"}
                                </span>

                                <button
                                    onClick={Clear}
                                    className={`flex items-center gap-2 text-xs font-semibold transition hover:text-rose-500 ${isDark ? "text-slate-500" : "text-slate-400"
                                        }`}
                                >
                                    <RotateCcw size={13} />
                                    Reset
                                </button>
                            </div>

                            <div className="mt-5 text-right">
                                <p className={`overflow-x-auto whitespace-nowrap text-2xl font-medium ${error
                                        ? "text-rose-500"
                                        : isDark
                                            ? "text-slate-300"
                                            : "text-slate-600"
                                    }`}>
                                    {error ? "Invalid calculation" : number || "0"}
                                </p>

                                {result !== null && !error && (
                                    <p className="mt-2 text-3xl font-bold text-indigo-500">
                                        = {result}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Keypad */}
                        <div className="grid grid-cols-4 gap-3">

                            {renderButton("AC", Clear, "clear")}

                            {renderButton(
                                <Delete size={21} />,
                                BackSpace,
                                "clear"
                            )}

                            {renderButton("÷", () => AddNumber("/"), "operator")}

                            {renderButton("×", () => AddNumber("*"), "operator")}

                            {renderButton("7", () => PushNumber("7"))}
                            {renderButton("8", () => PushNumber("8"))}
                            {renderButton("9", () => PushNumber("9"))}
                            {renderButton("-", () => AddNumber("-"), "operator")}

                            {renderButton("4", () => PushNumber("4"))}
                            {renderButton("5", () => PushNumber("5"))}
                            {renderButton("6", () => PushNumber("6"))}
                            {renderButton("+", () => AddNumber("+"), "operator")}

                            {renderButton("1", () => PushNumber("1"))}
                            {renderButton("2", () => PushNumber("2"))}
                            {renderButton("3", () => PushNumber("3"))}

                            {renderButton(
                                "=",
                                CalculateTotal,
                                "equal"
                            )}

                            <button
                                onClick={() => PushNumber("0")}
                                className={`col-span-2 ${buttonBase}`}
                            >
                                0
                            </button>

                            {renderButton(".", AddDecimal)}

                            <button
                                onClick={CalculateTotal}
                                className="h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 active:scale-95"
                            >
                                =
                            </button>

                        </div>

                        {/* Footer */}
                        <p className={`mt-6 text-center text-xs ${isDark ? "text-slate-600" : "text-slate-400"
                            }`}>
                            PocketApps · Calculator
                        </p>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default Calculator;
