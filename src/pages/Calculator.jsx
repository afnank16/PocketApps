import { useState } from "react"
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Calculator(props){

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

    const checkLastChar = number.slice(-1)//get the last element of the string
    const check = "+-*/"//store the operators in a string

    if (check.includes(checkLastChar)) {
      throw ("invalid syntax")
    }

    let prv = ""  //to store the numbers as string
    let sum = 0   //to sum the total

    let minusIndex=number.indexOf("-")

    for (let i = 0; i < number.length; i++) {

      if (number[i] == "+") {
        console.log("it is plus")
      }

      else if (number[i] == "-") {  
        console.log("it is minus")
        for(let j=minusIndex[i+1];j<number.length;j++){
          // sum=Number(prv)-Number(number[i+1])
          // prv=String(sum)
          console.log("--->",number[j])
        }
        
    
      }
      else if (number[i] == "*") {
        console.log("it is multiplication")
      }
      else if (number[i] == "/") {
        console.log("it is division")
      }

      prv+=number[i]

    }

  }

  return(
    



 <div className={`min-h-screen `}>
            <Sidebar/>
            <div className="ml-64">
                 <Header theme={props.theme} currentTheme={props.currentTheme} dark={props.dark} setDark={props.setDark}/>
                 <main className="p-8">
                    <div>
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
    </div>
                 </main> 
            </div>
          
        </div>
  )

}
export default Calculator