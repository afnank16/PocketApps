import { useState } from "react"
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Dictionary(props) {

    const [word, setWord] = useState("");
    const [meaning, setMeaning] = useState("");
    const [error, setError] = useState("");
    const isDark = Boolean(props.dark);
    const cardClass = isDark
        ? "border-slate-700 bg-slate-900 shadow-xl shadow-black/20"
        : "border-gray-200 bg-white shadow-xl shadow-gray-200/70";
    const labelClass = isDark ? "text-slate-300" : "text-gray-700";
    const inputClass = isDark
        ? "border-slate-700 bg-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-rose-500 focus:bg-slate-800 focus:ring-rose-900/50"
        : "border-gray-200 bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:border-rose-500 focus:bg-white focus:ring-rose-100";
    const definitionClass = isDark
        ? "border-slate-700 bg-slate-800"
        : "border-gray-100 bg-gray-50";

    async function CallApi() {
        const searchWord = word.trim();
        if (!searchWord) {
            setMeaning("");
            setError("Please enter a word to search.");
            return;
        }

        try {
            setError("");
            setMeaning("");
            const response = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(searchWord)}`
            );
            const data = await response.json();
            const definition = data[0]?.meanings?.[0]?.definitions?.[0]?.definition;

            if (!response.ok || !definition) {
                setError(data.title || "No definition was found for that word.");
                return;
            }

            setMeaning(definition);
        }
        catch (err) {
            console.log("something went wrong", err)
            setError(String(err));
        }
    }


    return (
        <div className={`min-h-screen ${props.currentTheme.bg} ${props.currentTheme.text}`}>
            <Sidebar theme={props.theme} currentTheme={props.currentTheme} dark={props.dark} setDark={props.setDark} />
            <div className="ml-64">
                <Header theme={props.theme} currentTheme={props.currentTheme} dark={props.dark} setDark={props.setDark} />
                <main className={`min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-10 ${props.currentTheme.bg} ${props.currentTheme.text}`}>

                    {/* Main Card */}
                    <div className={`w-full max-w-lg overflow-hidden rounded-3xl border ${cardClass}`}>

                        {/* Header */}
                        <div className="bg-rose-600 px-8 py-6 text-white">
                            <h1 className="text-3xl font-bold tracking-tight">
                                Free Dictionary<span className="text-rose-200">.</span>
                            </h1>
                            <p className="mt-2 text-sm text-rose-100">
                                Discover the meaning of any word.
                            </p>
                        </div>

                        {/* Search Section */}
                        <div className="p-8">

                            <label
                                htmlFor="word"
                                className={`mb-2 block text-sm font-semibold ${labelClass}`}
                            >
                                Search for a word
                            </label>

                            <input
                                id="word"
                                value={word}
                                className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-4 ${inputClass}`}
                                placeholder="e.g. beautiful, wisdom, courage..."
                                type="text"
                                onChange={(e) => setWord(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") CallApi();
                                }}
                            />

                            <button
                                onClick={CallApi}
                                className="mt-4 w-full rounded-xl bg-rose-600 py-3 font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
                            >
                                Search Word →
                            </button>

                            {/* Meaning Section */}
                            <div className="mt-8">
                                <h2 className={`mb-3 text-sm font-bold uppercase tracking-wider ${isDark ? "text-slate-400" : "text-gray-400"}`}>
                                    Definition
                                </h2>

                                <div className={`min-h-24 rounded-2xl border p-5 ${definitionClass}`}>

                                    {meaning ? (
                                        <p className={`leading-7 ${isDark ? "text-slate-200" : "text-gray-700"}`}>
                                            {meaning}
                                        </p>
                                    ) : error ? (
                                        <p className="leading-7 text-red-500">
                                            {error}
                                        </p>
                                    ) : (
                                        <p className={`text-sm leading-6 ${isDark ? "text-slate-400" : "text-gray-400"}`}>
                                            Your word's meaning will appear here. Start by
                                            searching for a word above.
                                        </p>
                                    )}

                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Footer */}
                    <footer className={`mt-6 text-sm ${isDark ? "text-slate-400" : "text-gray-400"}`}>
                        Powered by{" "}
                        <a
                            href="https://dictionaryapi.dev/"
                            target="_blank"
                            rel="noreferrer"
                            className={`font-medium transition hover:underline ${isDark ? "text-rose-400 hover:text-rose-300" : "text-rose-600 hover:text-rose-800"}`}
                        >
                            Dictionary API
                        </a>
                    </footer>

                </main>
            </div>
        </div>
    );

}
export default Dictionary;