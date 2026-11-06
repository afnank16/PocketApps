import { useRef, useState } from "react";
import {
    Search,
    Volume2,
    BookOpen,
    LoaderCircle,
    Sparkles,
    X,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Dictionary(props) {
    const [word, setWord] = useState("");
    const [entry, setEntry] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const abortRef = useRef(null);
    const isDark = Boolean(props.dark);

    const primaryText = isDark ? "text-white" : "text-slate-900";
    const secondaryText = isDark ? "text-slate-400" : "text-slate-500";

    const card = isDark
        ? "border-white/10 bg-[#131b2e]"
        : "border-slate-200 bg-white";

    const inputClass = isDark
        ? "border-white/10 bg-[#0b1020] text-white placeholder:text-slate-500 focus:border-rose-500"
        : "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-rose-500";

    const definitionCard = isDark
        ? "border-white/5 bg-[#0b1020]"
        : "border-slate-100 bg-slate-50";

    async function searchWord(e) {
        e.preventDefault();

        const searchWord = word.trim();

        if (!searchWord) {
            setEntry(null);
            setError("Please enter a word to search.");
            return;
        }

        // Cancel any previous search
        abortRef.current?.abort();

        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        setError("");
        setEntry(null);

        try {
            const response = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(searchWord)}`,
                { signal: controller.signal }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.title || "No definition was found for that word."
                );
            }

            if (!Array.isArray(data) || !data[0]?.meanings?.length) {
                throw new Error("No definition was found for that word.");
            }

            setEntry(data[0]);
        } catch (err) {
            if (err.name === "AbortError") return;

            setError(
                err instanceof TypeError
                    ? "Unable to connect. Please check your internet connection."
                    : err.message || "Something went wrong. Please try again."
            );
        } finally {
            if (!controller.signal.aborted) {
                setLoading(false);
            }
        }
    }

    const playAudio = () => {
        const audioUrl = entry?.phonetics?.find((item) => item.audio)?.audio;

        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play().catch(() => {
                setError("Unable to play pronunciation audio.");
            });
        }
    };

    const audioAvailable = entry?.phonetics?.some((item) => item.audio);

    const phonetic =
        entry?.phonetic ||
        entry?.phonetics?.find((item) => item.text)?.text;

    const clearSearch = () => {
        abortRef.current?.abort();
        setWord("");
        setEntry(null);
        setError("");
        setLoading(false);
    };

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

                <main className="min-h-[calc(100vh-72px)] px-6 py-10 lg:px-10">
                    <div className="mx-auto max-w-3xl">

                        {/* Heading */}
                        <div className="mb-8">
                            <div className="mb-3 flex items-center gap-2">
                                <div className="rounded-xl bg-rose-500/10 p-2.5 text-rose-500">
                                    <BookOpen size={22} />
                                </div>

                                <span className="text-sm font-semibold text-rose-500">
                                    PocketApps / Dictionary
                                </span>
                            </div>

                            <h1 className={`text-3xl font-bold tracking-tight ${primaryText}`}>
                                Free Dictionary
                            </h1>

                            <p className={`mt-2 ${secondaryText}`}>
                                Discover meanings, pronunciations, and examples of English words.
                            </p>
                        </div>

                        {/* Search Card */}
                        <div className={`rounded-3xl border p-6 shadow-sm sm:p-8 ${card}`}>

                            <form onSubmit={searchWord}>
                                <label
                                    htmlFor="dictionary-search"
                                    className={`mb-3 block text-sm font-semibold ${primaryText}`}
                                >
                                    Search for a word
                                </label>

                                <div className="relative">
                                    <Search
                                        size={19}
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 ${secondaryText}`}
                                    />

                                    <input
                                        id="dictionary-search"
                                        type="text"
                                        value={word}
                                        onChange={(e) => setWord(e.target.value)}
                                        placeholder="e.g. beautiful, wisdom, courage..."
                                        className={`w-full rounded-xl border py-4 pl-12 pr-12 outline-none transition focus:ring-4 focus:ring-rose-500/10 ${inputClass}`}
                                    />

                                    {word && (
                                        <button
                                            type="button"
                                            onClick={clearSearch}
                                            aria-label="Clear search"
                                            className={`absolute right-4 top-1/2 -translate-y-1/2 ${secondaryText} hover:text-rose-500`}
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-3.5 font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:bg-rose-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <LoaderCircle size={19} className="animate-spin" />
                                            Searching...
                                        </>
                                    ) : (
                                        <>
                                            <Search size={18} />
                                            Search Word
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Error */}
                            {error && (
                                <div className="mt-6 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-500">
                                    {error}
                                </div>
                            )}

                            {/* Search Results */}
                            {entry && (
                                <div className="mt-8">

                                    {/* Word Details */}
                                    <div className="mb-6">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className={`text-3xl font-bold capitalize ${primaryText}`}>
                                                {entry.word}
                                            </h2>

                                            {audioAvailable && (
                                                <button
                                                    onClick={playAudio}
                                                    type="button"
                                                    aria-label="Play pronunciation"
                                                    className="rounded-full bg-rose-500/10 p-3 text-rose-500 transition hover:bg-rose-500/20"
                                                >
                                                    <Volume2 size={21} />
                                                </button>
                                            )}
                                        </div>

                                        {phonetic && (
                                            <p className="mt-2 text-base text-rose-500">
                                                {phonetic}
                                            </p>
                                        )}

                                        {entry.origin && (
                                            <p className={`mt-3 text-sm leading-6 ${secondaryText}`}>
                                                <span className="font-semibold">Origin: </span>
                                                {entry.origin}
                                            </p>
                                        )}
                                    </div>

                                    <div className={`mb-6 border-t ${isDark ? "border-white/10" : "border-slate-100"}`} />

                                    {/* Meanings */}
                                    <div className="mb-4 flex items-center gap-2">
                                        <Sparkles size={19} className="text-rose-500" />

                                        <h3 className={`font-bold ${primaryText}`}>
                                            Meanings and Definitions
                                        </h3>
                                    </div>

                                    <div className="space-y-5">
                                        {entry.meanings.map((meaning, index) => (
                                            <div
                                                key={`${meaning.partOfSpeech}-${index}`}
                                                className={`rounded-2xl border p-5 ${definitionCard}`}
                                            >
                                                <span className="mb-4 inline-block rounded-lg bg-rose-500/10 px-3 py-1 text-xs font-semibold capitalize text-rose-500">
                                                    {meaning.partOfSpeech}
                                                </span>

                                                <ol className="space-y-4">
                                                    {meaning.definitions.slice(0, 5).map((definition, defIndex) => (
                                                        <li
                                                            key={defIndex}
                                                            className="flex gap-3"
                                                        >
                                                            <span className="mt-0.5 font-semibold text-rose-500">
                                                                {defIndex + 1}.
                                                            </span>

                                                            <div className="min-w-0">
                                                                <p className={`leading-7 ${primaryText}`}>
                                                                    {definition.definition}
                                                                </p>

                                                                {definition.example && (
                                                                    <p className={`mt-2 text-sm italic leading-6 ${secondaryText}`}>
                                                                        Example: "{definition.example}"
                                                                    </p>
                                                                )}

                                                                {definition.synonyms?.length > 0 && (
                                                                    <p className={`mt-2 text-sm ${secondaryText}`}>
                                                                        <span className="font-semibold">
                                                                            Synonyms:
                                                                        </span>{" "}
                                                                        {definition.synonyms.slice(0, 5).join(", ")}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ol>

                                                {meaning.synonyms?.length > 0 && (
                                                    <div className={`mt-4 border-t pt-3 ${
                                                        isDark ? "border-white/10" : "border-slate-200"
                                                    }`}>
                                                        <p className={`text-sm ${secondaryText}`}>
                                                            <span className="font-semibold">Related synonyms:</span>{" "}
                                                            {meaning.synonyms.slice(0, 8).join(", ")}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Source */}
                                    <p className={`mt-5 text-xs ${secondaryText}`}>
                                        Definitions provided by Free Dictionary API.
                                    </p>
                                </div>
                            )}

                            {/* Empty State */}
                            {!entry && !error && !loading && (
                                <div className={`mt-8 rounded-2xl border border-dashed p-8 text-center ${
                                    isDark ? "border-white/10" : "border-slate-200"
                                }`}>
                                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
                                        <BookOpen size={27} />
                                    </div>

                                    <h3 className={`font-semibold ${primaryText}`}>
                                        Your definitions appear here
                                    </h3>

                                    <p className={`mt-2 text-sm ${secondaryText}`}>
                                        Enter an English word above to explore its meaning.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <footer className={`mt-6 text-center text-sm ${secondaryText}`}>
                            Powered by{" "}
                            <a
                                href="https://dictionaryapi.dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-rose-500 transition hover:text-rose-400 hover:underline"
                            >
                                Free Dictionary API
                            </a>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dictionary;
