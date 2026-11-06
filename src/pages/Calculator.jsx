import { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Delete, RotateCcw } from "lucide-react";

const OPERATOR_END = /[+\-*/]$/;

// Show × and ÷ instead of * and / on the display
const pretty = (s) => s.replace(/\*/g, "×").replace(/\//g, "÷");

// Evaluate an arithmetic expression without eval()
function evaluate(expression) {
    // Numbers (optionally with an exponent, e.g. 1e+21 from a previous result) and operators
    const tokens = expression.match(/(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?|[+\-*/]/g);

    if (!tokens || tokens.join("") !== expression) {
        throw new Error("Invalid expression");
    }

    let index = 0;

    // Numbers and unary operators
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

        if (token === undefined || isNaN(Number(token))) {
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

            value = operator === "*" ? value * next : value / next;
        }

        return value;
    };

    // Addition and subtraction
    const parseExpression = () => {
        let value = parseTerm();

        while (tokens[index] === "+" || tokens[index] === "-") {
            const operator = tokens[index++];
            const next = parseTerm();

            value = operator === "+" ? value + next : value - next;
        }

        return value;
    };

    const total = parseExpression();

    if (index !== tokens.length || !Number.isFinite(total)) {
        throw new Error("Invalid expression");
    }

    return total;
}

function Calculator(props) {
    const [number, setNumber] = useState("");   // current expression (or result)
    const [history, setHistory] = useState(""); // expression that produced the result
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");     // error message, "" when fine

    const isDark = props.dark;
    const displayRef = useRef(null);
    const calcRef = useRef(null);

    // Keep the newest characters visible when the expression is long
    useEffect(() => {
        const el = displayRef.current;
        if (el) el.scrollLeft = el.scrollWidth;
    }, [number]);

    // Start a brand-new expression after a result or an error
    const resetWith = (value) => {
        setNumber(value);
        setResult(null);
        setHistory("");
        setError("");
    };

    const appendDigit = (d) => {
        if (result !== null || error) {
            resetWith(d);
            return;
        }

        // Avoid leading zeros like "05"
        const currentPart = number.split(/[+\-*/]/).pop();
        if (currentPart === "0") {
            setNumber((prev) => prev.slice(0, -1) + d);
            return;
        }

        setNumber((prev) => prev + d);
    };

    const appendDecimal = () => {
        if (result !== null || error) {
            resetWith("0.");
            return;
        }

        const currentPart = number.split(/[+\-*/]/).pop();
        if (currentPart.includes(".")) return;

        if (number === "" || OPERATOR_END.test(number)) {
            setNumber((prev) => prev + "0.");
        } else {
            setNumber((prev) => prev + ".");
        }
    };

    const appendOperator = (operator) => {
        if (error) return;

        // Allow a leading minus only
        if (number === "") {
            if (operator === "-") setNumber("-");
            return;
        }

        // Just a sign so far ("-"): wait for a digit
        if (/^[+-]$/.test(number)) return;

        if (OPERATOR_END.test(number)) {
            // Allow negative numbers after * or / (e.g. 5*-3)
            if (operator === "-" && /[*/]$/.test(number)) {
                setNumber((prev) => prev + "-");
                return;
            }
            // Otherwise replace the trailing operator(s)
            setNumber((prev) => prev.replace(/[+\-*/]+$/, "") + operator);
            return;
        }

        // Continue from a result, or drop a dangling decimal point ("5." -> "5")
        const base = number.endsWith(".") ? number.slice(0, -1) : number;
        setNumber(base + operator);
        setResult(null);
        setHistory("");
    };

    const backspace = () => {
        setNumber((prev) => prev.slice(0, -1));
        setResult(null);
        setHistory("");
        setError("");
    };

    const clearAll = () => resetWith("");

    const calculate = () => {
        if (!number || result !== null || error || /[+\-*/.]$/.test(number)) return;

        try {
            const total = evaluate(number);
            const formatted = Number(total.toPrecision(12));

            setHistory(number);
            setNumber(String(formatted));
            setResult(formatted);
            setError("");
        } catch (e) {
            setError(
                e.message === "Division by zero"
                    ? "Cannot divide by zero"
                    : "Invalid calculation"
            );
            setResult(null);
        }
    };

    // Keyboard support
    useEffect(() => {
        const onKeyDown = (e) => {
            const target = e.target;
            const tag = target.tagName;

            if (
                e.ctrlKey || e.metaKey || e.altKey ||
                tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" ||
                target.isContentEditable
            ) return;

            if (/^\d$/.test(e.key)) {
                appendDigit(e.key);
            } else if (["+", "-", "*", "/"].includes(e.key)) {
                e.preventDefault(); // "/" opens quick-find in some browsers
                appendOperator(e.key);
            } else if (e.key === "." || e.key === ",") {
                appendDecimal();
            } else if (e.key === "Enter" || e.key === "=") {
                // Don't hijack Enter on unrelated buttons/links elsewhere on the page
                if (target !== document.body && !calcRef.current?.contains(target)) return;
                e.preventDefault();
                calculate();
            } else if (e.key === "Backspace") {
                backspace();
            } else if (e.key === "Escape" || e.key === "Delete") {
                clearAll();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    });

    // Button styling
    const styles = {
        number: `rounded-2xl text-lg font-semibold transition-all duration-200 active:scale-95 ${isDark
                ? "bg-[#1b2740] text-slate-200 hover:bg-[#293854]"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`,
        operator: `rounded-2xl text-xl font-semibold transition-all duration-200 active:scale-95 ${isDark
                ? "bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25"
                : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
            }`,
        clear: `rounded-2xl font-semibold transition active:scale-95 ${isDark
                ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                : "bg-rose-50 text-rose-500 hover:bg-rose-100"
            }`,
    };

    const renderButton = (label, action, style = "number", ariaLabel) => (
        <button
            type="button"
            onClick={action}
            aria-label={ariaLabel}
            className={`flex h-16 items-center justify-center ${styles[style]}`}
        >
            {label}
        </button>
    );

    const showingResult = result !== null && !error;

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

                    {/* Calculator Body */}
                    <div
                        ref={calcRef}
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
                                <span className={`text-xs font-medium uppercase tracking-widest ${error
                                        ? "text-rose-500"
                                        : isDark ? "text-slate-500" : "text-slate-400"
                                    }`}>
                                    {error ? "Error" : showingResult ? "Result" : "Expression"}
                                </span>

                                <button
                                    type="button"
                                    onClick={clearAll}
                                    className={`flex items-center gap-2 text-xs font-semibold transition hover:text-rose-500 ${isDark ? "text-slate-500" : "text-slate-400"
                                        }`}
                                >
                                    <RotateCcw size={13} />
                                    Reset
                                </button>
                            </div>

                            <div className="mt-5 text-right">
                                {showingResult && (
                                    <p className={`mb-1 truncate text-sm ${isDark ? "text-slate-500" : "text-slate-400"
                                        }`}>
                                        {pretty(history)} =
                                    </p>
                                )}

                                <p
                                    ref={displayRef}
                                    className={`overflow-x-auto whitespace-nowrap [scrollbar-width:none] ${showingResult
                                            ? "text-3xl font-bold text-indigo-500"
                                            : `text-2xl font-medium ${isDark ? "text-slate-300" : "text-slate-600"}`
                                        }`}
                                >
                                    {pretty(number) || "0"}
                                </p>

                                {error && (
                                    <p className="mt-2 text-sm font-medium text-rose-500">
                                        {error}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Keypad */}
                        <div className="grid grid-cols-4 gap-3">

                            {renderButton("AC", clearAll, "clear", "Clear all")}
                            {renderButton(<Delete size={21} />, backspace, "clear", "Backspace")}
                            {renderButton("÷", () => appendOperator("/"), "operator", "Divide")}
                            {renderButton("×", () => appendOperator("*"), "operator", "Multiply")}

                            {renderButton("7", () => appendDigit("7"))}
                            {renderButton("8", () => appendDigit("8"))}
                            {renderButton("9", () => appendDigit("9"))}
                            {renderButton("-", () => appendOperator("-"), "operator", "Subtract")}

                            {renderButton("4", () => appendDigit("4"))}
                            {renderButton("5", () => appendDigit("5"))}
                            {renderButton("6", () => appendDigit("6"))}
                            {renderButton("+", () => appendOperator("+"), "operator", "Add")}

                            {renderButton("1", () => appendDigit("1"))}
                            {renderButton("2", () => appendDigit("2"))}
                            {renderButton("3", () => appendDigit("3"))}

                            {/* Single "=" button spanning two rows */}
                            <button
                                type="button"
                                onClick={calculate}
                                aria-label="Equals"
                                className="row-span-2 self-stretch rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:brightness-110 active:scale-95"
                            >
                                =
                            </button>

                            <button
                                type="button"
                                onClick={() => appendDigit("0")}
                                className={`col-span-2 flex h-16 items-center justify-center ${styles.number}`}
                            >
                                0
                            </button>

                            {renderButton(".", appendDecimal, "number", "Decimal point")}

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