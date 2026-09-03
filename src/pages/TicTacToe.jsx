import { useState } from "react"
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


function TicTacToe() {

    const [toggle, setToggle] = useState(false)
    const [moves, setMoves] = useState({
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: "",
        seventh: "",
        eighth: "",
        ninth: ""
    })

    function Play(index) {
        // console.log(index)
        const newvValue = !toggle
        setToggle(newvValue)

        if (newvValue) {
            if (moves[index] == "" || moves[index] == "O") {
                setMoves({ ...moves, [index]: "X" })
            }
            else {
                setMoves({ ...moves, [index]: "O" })
            }
        }
        else {

            if (moves[index] == "X" || moves[index] == "") {
                setMoves({ ...moves, [index]: "O" })
            }
            else {
                setMoves({ ...moves, [index]: "X" })
            }
        }
        if (moves.first === moves.second && moves.second === moves.third && moves.first !== "") {
            console.log(`${moves.first} won`)
        }
        else if (moves.fifth === moves.fourth && moves.fourth === moves.sixth && moves.fifth !== "") {
            console.log(`${moves.fifth} won`)
        }
        else if (moves.seventh === moves.eighth && moves.eighth === moves.ninth && moves.seventh !== "") {
            console.log(`${moves.seventh} won`)
        }



    }

    return (
        <div className={`min-h-screen ${props.currentTheme.bg} ${props.currentTheme.text}`}>
            <Sidebar theme={props.theme} currentTheme={props.currentTheme} dark={props.dark} setDark={props.setDark} />
            <div className="ml-64">
                <Header theme={props.theme} currentTheme={props.currentTheme} dark={props.dark} setDark={props.setDark} />
                <main className={`p-8 ${props.currentTheme.bg} ${props.currentTheme.text}`}>
                    <div className="min-h-screen bg-amber-50 flex items-center justify-center flex-col ">
                        <div className="relative">
                            <h1 className="font-bold text-3xl shadow-2xs font-sans absolute right-70">Player1:</h1>
                            <h2 className="font-bold text-3xl shadow-2xs font-sans absolute left-70">Player2:</h2>
                        </div>
                        <div className="grid grid-cols-3">
                            <button className="border p-6 hover:bg-amber-100 w-20 h-20" onClick={() => Play("first")}>{moves.first}</button>
                            <button className="border p-6 hover:bg-amber-100 w-20 h-20" onClick={() => Play("second")}>{moves.second}</button>
                            <button className="border p-6 hover:bg-amber-100 w-20 h-20" onClick={() => Play("third")}>{moves.third}</button>
                            <button className="border p-6 hover:bg-amber-100 w-20 h-20" onClick={() => Play("fourth")}>{moves.fourth}</button>
                            <button className="border p-6 hover:bg-amber-100 w-20 h-20" onClick={() => Play("fifth")}>{moves.fifth}</button>
                            <button className="border p-6 hover:bg-amber-100 w-20 h-20" onClick={() => Play("sixth")}>{moves.sixth}</button>
                            <button className="border p-6 hover:bg-amber-100 w-20 h-20" onClick={() => Play("seventh")}>{moves.seventh}</button>
                            <button className="border p-6 hover:bg-amber-100 w-20 h-20" onClick={() => Play("eighth")}>{moves.eighth}</button>
                            <button className="border p-6 hover:bg-amber-100 w-20 h-20" onClick={() => Play("ninth")}>{moves.ninth}</button>

                        </div>
                        <div className="pt-10 font-semibold font-sans">
                            Winner:
                            <h1></h1>
                        </div>
                    </div>
                </main>
            </div>

        </div>
    )
}

export default TicTacToe