import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Home(props) {
  const tools = [
    {
      name: "Free Dictionary",
      description: "Discover meanings, synonyms and definitions.",
      icon: "📖",
      color: "bg-blue-500/10",
      accent: "text-blue-500",
      tag: "Learning",
    },
    {
      name: "Typing Test",
      description: "Test your speed and improve your accuracy.",
      icon: "⌨️",
      color: "bg-purple-500/10",
      accent: "text-purple-500",
      tag: "Productivity",
    },
    {
      name: "XO Game",
      description: "Take a break and challenge your strategy.",
      icon: "⭕",
      color: "bg-pink-500/10",
      accent: "text-pink-500",
      tag: "Entertainment",
    },
    {
      name: "Calculator",
      description: "Perform calculations quickly and easily.",
      icon: "🧮",
      color: "bg-amber-500/10",
      accent: "text-amber-500",
      tag: "Utility",
    },
    {
      name: "Todo List",
      description: "Organize your tasks and stay focused.",
      icon: "✓",
      color: "bg-emerald-500/10",
      accent: "text-emerald-500",
      tag: "Productivity",
    },
  ];

  const isDark = props.dark;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
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

        <main className="mx-auto max-w-[1600px] space-y-9 p-6 md:p-9">

          {/* Welcome Section */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 text-white shadow-xl shadow-indigo-500/10 md:p-10">

            {/* Background Decoration */}
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[35px] border-white/5" />
            <div className="absolute -bottom-32 right-40 h-80 w-80 rounded-full bg-purple-400/20 blur-3xl" />

            <div className="relative z-10 max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                YOUR PERSONAL TOOLKIT
              </div>

              <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                Everything you need,
                <br />
                all in one place.
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-7 text-indigo-100 md:text-base">
                A little space for everything. Learn something new,
                get things done, challenge yourself or simply have fun.
              </p>

              <button
                onClick={() =>
                  document.getElementById("explore-tools")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="mt-7 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                Explore Tools <span className="ml-2">↓</span>
              </button>
            </div>

            <div className="absolute bottom-5 right-10 hidden select-none text-[130px] opacity-20 lg:block">
              ✨
            </div>
          </section>

          {/* Tools Section */}
          <section id="explore-tools">

            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Explore your tools
                </h2>
                <p className={`mt-2 text-sm ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}>
                  Everything you need, just one click away.
                </p>
              </div>

              <span className={`rounded-full px-4 py-2 text-xs font-medium ${
                isDark
                  ? "bg-white/5 text-slate-400"
                  : "bg-slate-100 text-slate-500"
              }`}>
                {tools.length} Available Tools
              </span>
            </div>

            {/* Uniform Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

              {tools.map((tool, index) => (
                <div
                  key={index}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isDark
                      ? "border-white/[0.07] bg-[#131b2e] hover:border-indigo-500/40 hover:shadow-indigo-500/5"
                      : "border-slate-200/80 bg-white hover:border-indigo-200 hover:shadow-indigo-500/10"
                  }`}
                >

                  <div className="flex items-start justify-between">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tool.color} text-2xl transition-transform duration-300 group-hover:scale-110`}>
                      {tool.icon}
                    </div>

                    <span className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                      isDark
                        ? "bg-white/5 text-slate-400"
                        : "bg-slate-50 text-slate-500"
                    }`}>
                      {tool.tag}
                    </span>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-bold tracking-tight">
                      {tool.name}
                    </h3>

                    <p className={`mt-2 min-h-10 text-sm leading-6 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}>
                      {tool.description}
                    </p>
                  </div>

                  <div className={`mt-6 flex items-center justify-between border-t pt-4 ${
                    isDark ? "border-white/5" : "border-slate-100"
                  }`}>
                    <span className={`text-xs font-semibold ${tool.accent}`}>
                      Open Tool
                    </span>

                    <span className={`transition-transform duration-300 group-hover:translate-x-1 ${tool.accent}`}>
                      →
                    </span>
                  </div>

                </div>
              ))}

            </div>
          </section>

          {/* Bottom Quote */}
          <section className={`rounded-2xl border p-6 text-center ${
            isDark
              ? "border-white/[0.07] bg-[#131b2e]"
              : "border-slate-200 bg-white"
          }`}>
            <p className="text-sm font-medium">
              "Small tools. Big possibilities."
            </p>
            <p className={`mt-2 text-xs ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}>
              Your everyday digital companion.
            </p>
          </section>

          <footer className={`pb-3 text-center text-xs ${
            isDark ? "text-slate-600" : "text-slate-400"
          }`}>
            Made with ❤️ · Your Personal Toolkit · 2026
          </footer>

        </main>
      </div>
    </div>
  );
}

export default Home;
