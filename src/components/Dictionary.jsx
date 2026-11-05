import { useEffect, useState } from "react"

function TapF() {

    const [word, setWord] = useState("");
    const [meaning, setMeaning] = useState("");
    const [error, setError] = useState("");



    async function CallApi() {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json()
            setMeaning(data[0].meanings[0].definitions[0].definition)
        }
        catch (err) {
            console.log("something went wrong", err)
            setError(String(err));
        }
    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 px-4 py-10">

            {/* Main Card */}
            <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-xl shadow-rose-100/70">

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
                        className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Search for a word
                    </label>

                    <input
                        id="word"
                        value={word}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-rose-500 focus:bg-white focus:ring-4 focus:ring-rose-100"
                        placeholder="e.g. beautiful, wisdom, courage..."
                        type="text"
                        onChange={(e) => setWord(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") CallApi(); 
                        }}
                    />

                    <button
                        onClick={CallApi}
                        className="mt-4 w-full rounded-xl bg-rose-600 py-3 font-semibold text-white shadow-md shadow-rose-200 transition duration-200 hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
                    >
                        Search Word →
                    </button>

                    {/* Meaning Section */}
                    <div className="mt-8">
                        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400">
                            Definition
                        </h2>

                        <div className="min-h-24 rounded-2xl border border-gray-100 bg-gray-50 p-5">

                            {meaning ? (
                                <p className="leading-7 text-gray-700">
                                    {meaning}
                                </p>
                            ) : error ? (
                                <p className="leading-7 text-red-500">
                                    {error}
                                </p>
                            ) : (
                                <p className="text-sm leading-6 text-gray-400">
                                    Your word's meaning will appear here. Start by
                                    searching for a word above.
                                </p>
                            )}

                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="mt-6 text-sm text-gray-400">
                Powered by{" "}
                <a
                    href="https://dictionaryapi.dev/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-rose-600 transition hover:text-rose-800 hover:underline"
                >
                    Dictionary API
                </a>
            </footer>

        </div>
    );

}
export default TapF;