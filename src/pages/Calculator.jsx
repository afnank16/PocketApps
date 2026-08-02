import { useState } from "react"
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Calculator(props) {

    const [number, setNumber] = useState("");//to store calculator characters in a string
    const [noDuplicate, setNoDuplicate] = useState(1)//to prevent users from entering +-*/ more than once at a time

    const PushNumber = (n) => { //for numbers eg-1,2,3..
        setNumber(number + n)
        setNoDuplicate(1)
    }

    const AddNumber = (n) => {  //for operators eg. +,-,/,*
        if (noDuplicate > 1) {
            return
        }
        setNumber(number + n)
        setNoDuplicate(noDuplicate + 1)
    }

    const BackSpace = () => {

        if (number.length < 2) return;


        return setNumber(number.slice(0, -1))
    }

    const CalculateTotal = () => { // call this function when user clicks =
        let numberr = number;
        // =====================================================================
        // STEP 1: Parse the string into an array of numbers and operators
        // =====================================================================
        let tokens = [];
        let currentNum = "";

        for (let i = 0; i < numberr.length; i++) {
            let char = numberr[i];

            // Check if the character is a math operator
            if (char === "+" || char === "-" || char === "*" || char === "/") {
                tokens.push(Number(currentNum)); // Save the completed number
                tokens.push(char);              // Save the operator
                currentNum = "";                // Reset buffer for the next number
            } else {
                currentNum += char;             // Build multi-digit numbers character by character
            }
        }
        tokens.push(Number(currentNum)); // Save the very last number in the string

        // Array state here: [22, "-", 22, "+", 45, "*", 99]


        // =====================================================================
        // STEP 2: Pass 1 — Handle Multiplication (*) and Division (/)
        // =====================================================================
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === "*" || tokens[i] === "/") {
                let prevNum = tokens[i - 1];
                let nextNum = tokens[i + 1];
                let result = tokens[i] === "*" ? prevNum * nextNum : prevNum / nextNum;

                // Remove 3 elements (left number, operator, right number) and inject the result
                tokens.splice(i - 1, 3, result);

                // Move loop pointer back 1 step to match the shortened array length
                i--;
            }
        }

        // Array state here: [22, "-", 22, "+", 4455]


        // =====================================================================
        // STEP 3: Pass 2 — Handle Addition (+) and Subtraction (-)
        // =====================================================================
        let totalSum = tokens[0]; // Initialize with the very first number

        for (let i = 1; i < tokens.length; i += 2) {
            let operator = tokens[i];
            let nextNum = tokens[i + 1];

            if (operator === "+") {
                totalSum += nextNum;
            } else if (operator === "-") {
                totalSum -= nextNum;
            }
        }

        // Print final calculation result
        console.log("Calculated Sum:", totalSum); // Output: 4455
        setNumber(totalSum)

    }

    return (




        <div className={`min-h-screen ${props.currentTheme.bg} ${props.currentTheme.text}`}>
            <Sidebar theme={props.theme} currentTheme={props.currentTheme} dark={props.dark} setDark={props.setDark}/>
            <div className="ml-64">
                <Header theme={props.theme} currentTheme={props.currentTheme} dark={props.dark} setDark={props.setDark} />
                <main className={`p-8 ${props.currentTheme.bg} ${props.currentTheme.text}`}>
                    
                        <div className={`${props.currentTheme.text} mt-10 relative`}>
                            <h1 className="mb-2">Calculator</h1>
                            <button className={`${props.currentTheme.hover} absolute top-0 right-6`} onClick={() => setNumber("")}>clear</button>
                            <button className={`${props.currentTheme.hover} ${props.currentTheme.text} absolute top-0 right-20`}
                                onClick={BackSpace} >⌫
                            </button>
                            <div className="grid grid-cols-3 gap-4 border-2">
                                <button className={props.currentTheme.hover} onClick={() => PushNumber("1")}>1</button>
                                <button className={props.currentTheme.hover} onClick={() => PushNumber("2")}>2</button>
                                <button className={props.currentTheme.hover} onClick={() => PushNumber("3")}>3</button>
                                <button className={props.currentTheme.hover} onClick={() => PushNumber("4")}>4</button>
                                <button className={props.currentTheme.hover} onClick={() => PushNumber("5")}>5</button>
                                <button className={props.currentTheme.hover} onClick={() => PushNumber("6")}>6</button>
                                <button className={props.currentTheme.hover} onClick={() => PushNumber("7")}>7</button>
                                <button className={props.currentTheme.hover} onClick={() => PushNumber("8")}>8</button>
                                <button className={props.currentTheme.hover} onClick={() => PushNumber("9")}>9</button>
                                <button className={props.currentTheme.hover} onClick={() => PushNumber("0")}>0</button>
                                <button className={props.currentTheme.hover} onClick={() => AddNumber("+")}>+</button>
                                <button className={props.currentTheme.hover} onClick={() => AddNumber("-")}>-</button>
                                <button className={props.currentTheme.hover} onClick={() => AddNumber("*")}>×</button>
                                <button className={props.currentTheme.hover} onClick={() => AddNumber("/")}>÷</button>
                                <button className={props.currentTheme.hover} onClick={CalculateTotal}>=</button>
                            </div>
                            <div>
                                {number}
                            </div>
                        </div>
                   
                </main>
            </div>

        </div>
    )

}
export default Calculator