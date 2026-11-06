import { useEffect, useState } from "react";
import {
    RotateCcw,
    Keyboard,
    Clock,
    Target,
    Gauge,
    CheckCircle2,
    Trophy,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const PASSAGE =
    "The quick brown fox jumps over the lazy dog. Practice makes progress, and consistency builds confidence.";

function TypingTest(props) {
    const [typedText, setTypedText] = useState("");
    const [startedAt, setStartedAt] = useState(null);
    const [elapsedMs, setElapsedMs] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const isDark = props.dark;

    useEffect(() => {
        if (!isRunning || !startedAt) return;

        const interval = setInterval(() => {
            setElapsedMs(Date.now() - startedAt);
        }, 50);

        return () => clearInterval(interval);
    }, [isRunning, startedAt]);

    const handleChange = (e) => {
        if (isFinished) return;

        const value = e.target.value.slice(0, PASSAGE.length);
        const now = Date.now();

        if (!startedAt && value.length > 0) {
            setStartedAt(now);
            setIsRunning(true);
        }

        setTypedText(value);

        if (value === PASSAGE) {
            setElapsedMs(now - (startedAt || now));
            setIsRunning(false);
            setIsFinished(true);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!typedText.length || isFinished) return;

        setElapsedMs(Date.now() - startedAt);
        setIsRunning(false);
        setIsFinished(true);
    };

    const handleReset = () => {
        setTypedText("");
        setStartedAt(null);
        setElapsedMs(0);
        setIsRunning(false);
        setIsFinished(false);
    };

    const correctChars = typedText.split("").filter(
        (char, index) => char === PASSAGE[index]
    ).length;

    const accuracy = typedText.length
        ? Math.round((correctChars / typedText.length) * 100)
        : 100;

    const elapsedSeconds = elapsedMs / 1000;

    const wpm = elapsedSeconds > 0
        ? Math.round((correctChars / 5) / (elapsedSeconds / 60))
        : 0;

    const formatTime = (ms) => (ms / 1000).toFixed(1);

    const card = isDark
        ? "bg-[#131b2e] border-white/10"
        : "bg-white border-slate-200";

    const primaryText = isDark ? "text-white" : "text-slate-900";
    const secondaryText = isDark ? "text-slate-400" : "text-slate-500";

    return (
        <div className={`min-h-screen ${isDark ? "bg-[#0b1020]" : "bg-[#f8f9fd]"}`}>
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

                <main className="min-h-[calc(100vh-72px)] p-6 lg:p-10">
                    <div className="mx-auto max-w-4xl">

                        {/* Heading */}
                        <div className="mb-8">
                            <div className="mb-3 flex items-center gap-2">
                                <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-500">
                                    <Keyboard size={22} />
                                </div>
                                <span className="text-sm font-semibold text-indigo-500">
                                    PocketApps / Typing Test
                                </span>
                            </div>

                            <h1 className={`text-3xl font-bold tracking-tight ${primaryText}`}>
                                Test your typing speed
                            </h1>

                            <p className={`mt-2 ${secondaryText}`}>
                                Type the passage below and see how fast and accurately you can type.
                            </p>
                        </div>

                        {/* Main Test Card */}
                        <div className={`rounded-3xl border p-6 shadow-sm sm:p-8 ${card}`}>

                            {/* Status */}
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className={`text-sm font-medium ${secondaryText}`}>
                                        Your challenge
                                    </p>
                                    <h2 className={`mt-1 text-lg font-semibold ${primaryText}`}>
                                        Type the following passage
                                    </h2>
                                </div>

                                <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                                    isFinished
                                        ? "bg-emerald-500/10 text-emerald-500"
                                        : isRunning
                                            ? "bg-indigo-500/10 text-indigo-500"
                                            : isDark
                                                ? "bg-white/5 text-slate-400"
                                                : "bg-slate-100 text-slate-500"
                                }`}>
                                    {isFinished ? "Completed" : isRunning ? "Test in progress" : "Ready to start"}
                                </span>
                            </div>

                            {/* Passage */}
                            <div className={`mb-6 rounded-2xl border p-5 text-lg leading-9 tracking-wide sm:p-7 ${
                                isDark
                                    ? "border-white/5 bg-[#0b1020]"
                                    : "border-slate-200 bg-slate-50"
                            }`}>
                                {PASSAGE.split("").map((char, index) => {
                                    let color = secondaryText;

                                    if (index < typedText.length) {
                                        color = typedText[index] === char
                                            ? "text-emerald-500"
                                            : "text-rose-500 bg-rose-500/10 rounded";
                                    } else if (index === typedText.length && !isFinished) {
                                        color = "text-indigo-500 underline decoration-2 underline-offset-4";
                                    }

                                    return (
                                        <span key={index} className={color}>
                                            {char}
                                        </span>
                                    );
                                })}
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSubmit}>
                                <label className={`mb-2 block text-sm font-semibold ${primaryText}`}>
                                    Start typing here
                                </label>

                                <textarea
                                    autoFocus
                                    rows={3}
                                    value={typedText}
                                    onChange={handleChange}
                                    disabled={isFinished}
                                    placeholder="Start typing the passage..."
                                    className={`w-full resize-none rounded-2xl border px-5 py-4 text-base leading-7 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-60 ${
                                        isDark
                                            ? "border-white/10 bg-[#0b1020] text-white placeholder:text-slate-600"
                                            : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400"
                                    }`}
                                />

                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                    <p className={`text-xs ${secondaryText}`}>
                                        {typedText.length} / {PASSAGE.length} characters
                                    </p>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition hover:bg-slate-500/10 ${
                                                isDark
                                                    ? "border-white/10 text-slate-300"
                                                    : "border-slate-200 text-slate-600"
                                            }`}
                                        >
                                            <RotateCcw size={15} />
                                            Reset
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={!typedText.length || isFinished}
                                            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Finish test
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Results */}
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                            <div className={`rounded-2xl border p-5 ${card}`}>
                                <div className="mb-4 flex items-center justify-between">
                                    <span className={`text-sm font-medium ${secondaryText}`}>
                                        Time taken
                                    </span>
                                    <Clock className="text-indigo-500" size={20} />
                                </div>

                                <p className={`text-3xl font-bold ${primaryText}`}>
                                    {formatTime(elapsedMs)}
                                    <span className={`ml-1 text-sm font-medium ${secondaryText}`}>
                                        sec
                                    </span>
                                </p>
                            </div>

                            <div className={`rounded-2xl border p-5 ${card}`}>
                                <div className="mb-4 flex items-center justify-between">
                                    <span className={`text-sm font-medium ${secondaryText}`}>
                                        Typing speed
                                    </span>
                                    <Gauge className="text-indigo-500" size={20} />
                                </div>

                                <p className={`text-3xl font-bold ${primaryText}`}>
                                    {wpm}
                                    <span className={`ml-1 text-sm font-medium ${secondaryText}`}>
                                        WPM
                                    </span>
                                </p>
                            </div>

                            <div className={`rounded-2xl border p-5 ${card}`}>
                                <div className="mb-4 flex items-center justify-between">
                                    <span className={`text-sm font-medium ${secondaryText}`}>
                                        Accuracy
                                    </span>
                                    <Target className="text-indigo-500" size={20} />
                                </div>

                                <p className={`text-3xl font-bold ${primaryText}`}>
                                    {accuracy}
                                    <span className={`ml-1 text-sm font-medium ${secondaryText}`}>
                                        %
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Completion Message */}
                        {isFinished && (
                            <div className={`mt-6 flex items-start gap-4 rounded-2xl border p-5 ${
                                isDark
                                    ? "border-emerald-500/20 bg-emerald-500/5"
                                    : "border-emerald-200 bg-emerald-50"
                            }`}>
                                <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-500">
                                    <Trophy size={22} />
                                </div>

                                <div>
                                    <h3 className={`font-bold ${primaryText}`}>
                                        Test completed!
                                    </h3>
                                    <p className={`mt-1 text-sm ${secondaryText}`}>
                                        You typed at {wpm} WPM with {accuracy}% accuracy.
                                        Keep practicing to improve your speed.
                                    </p>
                                </div>

                                <CheckCircle2 className="ml-auto shrink-0 text-emerald-500" size={22} />
                            </div>
                        )}

                        <p className={`mt-6 text-center text-xs ${secondaryText}`}>
                            Tip: Focus on accuracy first. Speed will improve with consistent practice.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default TypingTest;
