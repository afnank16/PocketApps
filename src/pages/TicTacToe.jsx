import { useState } from "react";
import {
    RotateCcw,
    Trophy,
    Circle,
    X,
    Users,
    Gamepad2,
    Crown,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const INITIAL_BOARD = Array(9).fill("");

function TicTacToe(props) {
    const [board, setBoard] = useState(INITIAL_BOARD);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [winner, setWinner] = useState(null);
    const [winningLine, setWinningLine] = useState([]);
    const [scores, setScores] = useState({ X: 0, O: 0 });
    const [draws, setDraws] = useState(0);

    const isDark = props.dark;

    const primaryText = isDark ? "text-white" : "text-slate-900";
    const secondaryText = isDark ? "text-slate-400" : "text-slate-500";

    const card = isDark
        ? "bg-[#131b2e] border-white/10"
        : "bg-white border-slate-200";

    const checkWinner = (updatedBoard) => {
        for (const combination of WINNING_COMBINATIONS) {
            const [a, b, c] = combination;

            if (
                updatedBoard[a] &&
                updatedBoard[a] === updatedBoard[b] &&
                updatedBoard[b] === updatedBoard[c]
            ) {
                return combination;
            }
        }

        return null;
    };

    const handleMove = (index) => {
        if (board[index] || winner) return;

        const updatedBoard = [...board];
        updatedBoard[index] = currentPlayer;

        setBoard(updatedBoard);

        const winningCombination = checkWinner(updatedBoard);

        if (winningCombination) {
            setWinner(currentPlayer);
            setWinningLine(winningCombination);

            setScores((previous) => ({
                ...previous,
                [currentPlayer]: previous[currentPlayer] + 1,
            }));

            return;
        }

        if (updatedBoard.every((cell) => cell !== "")) {
            setWinner("draw");
            setDraws((previous) => previous + 1);
            return;
        }

        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    };

    const resetRound = () => {
        setBoard(INITIAL_BOARD);
        setCurrentPlayer("X");
        setWinner(null);
        setWinningLine([]);
    };

    const resetGame = () => {
        resetRound();
        setScores({ X: 0, O: 0 });
        setDraws(0);
    };

    const renderMark = (value) => {
        if (value === "X") {
            return <X size={42} strokeWidth={3} className="text-indigo-500" />;
        }

        if (value === "O") {
            return <Circle size={38} strokeWidth={3} className="text-rose-500" />;
        }

        return null;
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

                <main className="min-h-[calc(100vh-72px)] p-6 lg:p-10">
                    <div className="mx-auto max-w-4xl">

                        {/* Heading */}
                        <div className="mb-8">
                            <div className="mb-3 flex items-center gap-2">
                                <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-500">
                                    <Gamepad2 size={22} />
                                </div>

                                <span className="text-sm font-semibold text-indigo-500">
                                    PocketApps / XO Game
                                </span>
                            </div>

                            <h1 className={`text-3xl font-bold tracking-tight ${primaryText}`}>
                                Tic-Tac-Toe
                            </h1>

                            <p className={`mt-2 ${secondaryText}`}>
                                Challenge a friend and see who gets three in a row!
                            </p>
                        </div>

                        {/* Scoreboard */}
                        <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-5">

                            <div className={`rounded-2xl border p-4 text-center ${card}`}>
                                <X className="mx-auto mb-2 text-indigo-500" size={25} />

                                <p className={`text-xs font-medium ${secondaryText}`}>
                                    Player 1
                                </p>

                                <p className={`mt-1 text-3xl font-bold ${primaryText}`}>
                                    {scores.X}
                                </p>
                            </div>

                            <div className={`rounded-2xl border p-4 text-center ${card}`}>
                                <Trophy className="mx-auto mb-2 text-amber-500" size={25} />

                                <p className={`text-xs font-medium ${secondaryText}`}>
                                    Draws
                                </p>

                                <p className={`mt-1 text-3xl font-bold ${primaryText}`}>
                                    {draws}
                                </p>
                            </div>

                            <div className={`rounded-2xl border p-4 text-center ${card}`}>
                                <Circle className="mx-auto mb-2 text-rose-500" size={25} />

                                <p className={`text-xs font-medium ${secondaryText}`}>
                                    Player 2
                                </p>

                                <p className={`mt-1 text-3xl font-bold ${primaryText}`}>
                                    {scores.O}
                                </p>
                            </div>
                        </div>

                        {/* Game */}
                        <div className={`rounded-3xl border p-6 shadow-sm sm:p-8 ${card}`}>

                            {/* Turn Indicator */}
                            <div className="mb-7 text-center">
                                <p className={`mb-3 text-sm font-medium ${secondaryText}`}>
                                    {winner
                                        ? winner === "draw"
                                            ? "Game Over"
                                            : "We have a winner!"
                                        : "Current Turn"}
                                </p>

                                <div className="flex items-center justify-center gap-3">
                                    {winner === "draw" ? (
                                        <span className="text-xl font-bold text-amber-500">
                                            It's a Draw!
                                        </span>
                                    ) : winner ? (
                                        <>
                                            <Crown className="text-amber-500" size={25} />
                                            <span className={`text-xl font-bold ${primaryText}`}>
                                                Player {winner === "X" ? "1" : "2"} Wins!
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <div className={`flex items-center gap-2 rounded-xl px-4 py-2 ${
                                                currentPlayer === "X"
                                                    ? "bg-indigo-500/10 text-indigo-500"
                                                    : "bg-rose-500/10 text-rose-500"
                                            }`}>
                                                {renderMark(currentPlayer)}

                                                <span className="font-bold">
                                                    Player {currentPlayer === "X" ? "1" : "2"}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Board */}
                            <div className="mx-auto grid w-full max-w-[360px] grid-cols-3 gap-3">
                                {board.map((value, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleMove(index)}
                                        disabled={!!value || !!winner}
                                        aria-label={`Cell ${index + 1}${value ? `, ${value}` : ", empty"}`}
                                        className={`flex aspect-square items-center justify-center rounded-2xl border-2 transition duration-200 ${
                                            winningLine.includes(index)
                                                ? "border-emerald-500 bg-emerald-500/10"
                                                : isDark
                                                    ? "border-white/10 bg-[#0b1020] hover:border-indigo-500/50 hover:bg-indigo-500/5"
                                                    : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50"
                                        } ${
                                            !value && !winner
                                                ? "cursor-pointer active:scale-95"
                                                : "cursor-default"
                                        }`}
                                    >
                                        {renderMark(value)}
                                    </button>
                                ))}
                            </div>

                            {/* Game Actions */}
                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                <button
                                    onClick={resetRound}
                                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 active:scale-95"
                                >
                                    <RotateCcw size={16} />
                                    Restart Round
                                </button>

                                <button
                                    onClick={resetGame}
                                    className={`flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-slate-500/10 ${
                                        isDark
                                            ? "border-white/10 text-slate-300"
                                            : "border-slate-200 text-slate-600"
                                    }`}
                                >
                                    <Users size={16} />
                                    Reset Score
                                </button>
                            </div>
                        </div>

                        <p className={`mt-6 text-center text-xs ${secondaryText}`}>
                            Player 1 uses X · Player 2 uses O · First to get three in a row wins.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default TicTacToe;
