import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react";
import Home from "./pages/Home"
import  Calculator  from "./pages/Calculator";
import ToDoList from "./pages/ToDoList";
import TypingTest from "./pages/TypingTest";
import TicTacToe from "./pages/TicTacToe";

function App() {

  const [dark, setDark] = useState(false);//to toggle between light and dark theme

  const theme = {
    dark: {
      bg: "bg-slate-800",
      text: "text-white",
      border: "border-white",
      hover: "hover:bg-slate-200 hover:text-black",
      shadow: "shadow-lg shadow-gray-50",
      icon: "🌛",
      title: "Night",
    },
    light: {
      bg: "bg-slate-100",
      text: "text-black",
      border: "border-black",
      hover: "hover:bg-slate-400 hover:text-white",
      shadow: "shadow-lg shadow-gray-300",
      icon: "🔆",
      title: "Day"
    },
  };

  const currentTheme = dark ? theme.dark : theme.light;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home theme={theme} currentTheme={currentTheme} dark={dark} setDark={setDark}/>} />
        <Route path="/calculator" element={<Calculator theme={theme} currentTheme={currentTheme} dark={dark} setDark={setDark}/>} />
        <Route path="/todolist" element={<ToDoList theme={theme} currentTheme={currentTheme} dark={dark} setDark={setDark}/>} />
        <Route path="/typing_test" element={<TypingTest theme={theme} currentTheme={currentTheme} dark={dark} setDark={setDark}/>} />
        <Route path="/tictactoe" element={<TicTacToe theme={theme} currentTheme={currentTheme} dark={dark} setDark={setDark}/>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;