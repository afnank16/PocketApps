import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react";
import Home from "../src/pages/Home"

function App() {

  const [dark, setDark] = useState(false);//to toggle between light and dark theme

  const theme = {
    dark: {
      bg: "bg-slate-800",
      text: "text-white",
      border: "border-white",
      hover: "hover:bg-slate-200 hover:text-black",
      icon: "🌛",
      title: "Night",
    },
    light: {
      bg: "bg-slate-100",
      text: "text-black",
      border: "border-black",
      hover: "hover:bg-slate-400 hover:text-white",
      icon: "🔆",
      title: "Day"
    },
  };

  const currentTheme = dark ? theme.dark : theme.light;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home theme={theme} currentTheme={currentTheme} dark={dark} setDark={setDark}/>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;