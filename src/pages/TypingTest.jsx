import { MilkIcon, Settings } from "lucide-react";
import { useEffect, useState } from "react"
import { useStopwatch } from 'react-timer-hook';
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

function TypingTest(props) {

    const { milliseconds, seconds, start, pause, reset } = useStopwatch({ autoStart: false, interval: 20 })
    const [text, setText] = useState("");

    const handleChange = (e) => {
        const value = e.target.value
        if (value.length < text.length) {
            console.log("Backspace clicked");
            pause()
        }
        else {
            start();
        }
        setText(value);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        pause()
    }
    const handleReset = () => {
        reset(undefined, false) //the timer restes and does not start automatically after passing timesatmp-undefined and autoStart-false ``reset(offsetTimestamp?, autoStart?)`` 
        setText("")
    }

    return (
        <div className={`min-h-screen `}>
            <Sidebar theme={props.theme} currentTheme={props.currentTheme} dark={props.dark} setDark={props.setDark} />
            <div className="ml-64">
                <Header theme={props.theme} currentTheme={props.currentTheme} dark={props.dark} setDark={props.setDark} />
                <main className="p-8 flex min-h-screen items-center justify-center p-4 font-sans bg-slate-700">
                    <div className="w-full max-w-md rounded-2xl border border-indigo-200 p-8 shadow-2xl backdrop-blur-xl bg-slate-200">

                        {/* Heading */}
                        <h1 className="mb-8 text-center text-2xl font-bold tracking-tight  sm:text-3xl">
                            How fast can you type your name?
                        </h1>

                        {/* Input Form */}
                        <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <input
                                type="text"
                                autoFocus
                                placeholder="e.g. Sameer"
                                value={text}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-slate-300  px-4 py-3 text-base  placeholder-slate-500 shadow-inner outline-none transition duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            />
                            <button
                                type="submit"
                                className="shrink-0 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/35 active:scale-95"
                            >
                                Done
                            </button>
                        </form>

                        {/* Timer Display & remove the last digit from milliseconds*/}
                        <div className="flex flex-col items-center justify-center rounded-xl p-6 border border-slate-300">
                            <p className="font-mono text-4xl font-extrabold tracking-tight text-indigo-400">
                                {seconds}<span className="text-2xl text-slate-500">.</span>{String(milliseconds).slice(0, -1)}
                                <span className="ml-2 text-sm font-medium tracking-normal text-slate-400">s</span>
                            </p>

                            {/* Stop Button */}
                            <button
                                onClick={handleReset}
                                className="mt-4 rounded-lg bg-rose-500/10 px-4 py-1.5 text-xs font-semibold text-rose-400 border border-rose-500/20 transition duration-200 hover:bg-rose-500/20 hover:border-rose-500/30 active:scale-95"
                            >
                                Reset
                            </button>
                        </div>

                    </div>
                </main>
            </div>

        </div>
    )

}
export default TypingTest