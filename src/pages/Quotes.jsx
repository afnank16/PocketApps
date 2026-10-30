import { useEffect, useState } from "react"

function Quotes() {
   
    const [quotes, setQuotes] = useState([])

    async function GetQuotes() {
        try {
            const response = await fetch("https://dummyjson.com/quotes");
            const data = await response.json();
            setQuotes(data.quotes || []);
        } catch (err) {
            console.log("something went wrong", err);
        }
    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-violet-50 px-4 py-10">

            {/* Main Card */}
            <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-xl shadow-violet-100/70">

                {/* Header */}
                <div className="bg-violet-600 px-8 py-6 text-white">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Quotes World<span className="text-violet-200">.</span>
                    </h1>
                    <p className="mt-2 text-sm text-violet-100">
                        Words of some of the greatest people ever lived on earth.
                    </p>
                </div>

                {/* Search Section */}
                <div className="p-8">

                    {/* <label
                        htmlFor="word"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Search for a word
                    </label>

                    <input
                        id="word"
                        value={word}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                        placeholder="e.g. beautiful, wisdom, courage..."
                        type="text"
                        onChange={(e) => setWord(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") CallApi(); 
                        }}
                    />*/}

                    <button
                        onClick={GetQuotes}
                        className="mt-4 w-full rounded-xl bg-violet-600 py-3 font-semibold text-white shadow-md shadow-violet-200 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
                    >
                        Get Quotes
                    </button> 

                    {/* Meaning Section */}
                    <div className="mt-8">
                        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400">
                            Quotes
                        </h2>

                        <div className="max-h-44 rounded-2xl border border-gray-100 bg-gray-50 p-5 overflow-auto">

                            {quotes.length > 0 ? (
                                <div>
                                    {quotes.map((quote, index) => (
                                        <p key={index} className="mb-2 text-gray-700">
                                            {index+1} : {quote.quote}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <div>
                                    No Quotes present
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <footer className="mt-6 text-sm text-gray-400">
                Powered by{" "}
                <a
                    href="https://dummyjson.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-violet-600 transition hover:text-violet-800 hover:underline"
                >
                    dummyjson.com
                </a>
            </footer>

        </div>
    );

}
export default Quotes;