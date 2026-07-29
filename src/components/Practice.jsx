import { useEffect, useState } from "react";

function Practice() {

  const [dark, setDark] = useState(false);//to toggle between light and dark theme
  const [items, setItems] = useState([]);//array to store items 
  const [input, setInput] = useState("");//to store in the input
  const [isChecked, setIsChecked] = useState([])//to store the checked items
  const [number, setNumber] = useState("");//to store calculator characters in a string
  const [noDuplicate, setNoDuplicate] = useState(1)//to prevent users from entering +-*/ more than once at a time

  function AddItems(e) {

    e.preventDefault()//to prevent rerendering

    if (input.trim() === "") {
      setInput("")
      return
    }
    setItems([...items, input]);
    setInput("")
  }

  const removeItem = (itm) => {
    setItems(items.filter(items => items !== itm)); // remove the selected item from the items array using filter method
  }

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

  const handleCheckboxChange = (e) => { //e is an event oject provided by react itself

    const value = e.target.value;      //item name
    const checked = e.target.checked;  //true/false

    //this can also be written as:  {value, checked} = e.target  

    if (checked) {
      // Add the item if checked is true
      setIsChecked([...isChecked, value]);
    } else {
      // Remove the item if unchecked
      setIsChecked(isChecked.filter((item) => item !== value));
    }
  };

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

  return (
    <div className={`${currentTheme.bg}`}>
      <header className={`border-2 p-4 ${currentTheme.border}`}>
        <button
          className={`text-4xl font-semibold border-2 rounded-full py-3 px-5 ${currentTheme.text}`}
          onClick={() => setDark(!dark)}>{currentTheme.icon} {currentTheme.title}
        </button>
      </header>

      <div className={`h-[100vh] p-5`}>
        <form className="flex gap-4 mb-5" onSubmit={AddItems}>
          <input
            type="text"
            placeholder="Enter something..."
            className={`mt-2 border py-1 px-2 ${currentTheme.border} ${currentTheme.text}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={`text-2xl font-semibold border-2 py-1 px-2 ${currentTheme.text}`}
            onClick={AddItems}>
            Add item
          </button>
        </form>
        {items.length >= 1 ?
          items.map((itemName, index) => {
            return (
              <div key={index} className={`${currentTheme.text} pl-5`}>
                <li>
                  <label className={`${isChecked.includes(itemName) ? "line-through" : ""}`} >
                    <input
                      type="checkbox"
                      value={itemName}
                      checked={isChecked.includes(itemName)}
                      onChange={handleCheckboxChange}
                    />
                    {itemName}
                  </label>
                  <button onClick={() => removeItem(itemName)}>❌</button>
                </li>
              </div>
            )
          })
          : (
            <div className={currentTheme.text}>
              📪 No items present
            </div>
          )
        }
        <div className={`${currentTheme.text} mt-10 relative`}>
          <h1 className="mb-2">Calculator</h1>
          <button className={`${currentTheme.hover} absolute top-0 right-6`} onClick={() => setNumber("")}>clear</button>
          <button className={`${currentTheme.hover} ${currentTheme.text} absolute top-0 right-20`}
            onClick={BackSpace} >⌫
          </button>
          <div className="grid grid-cols-3 gap-4 border-2">
            <button className={currentTheme.hover} onClick={() => PushNumber("1")}>1</button>
            <button className={currentTheme.hover} onClick={() => PushNumber("2")}>2</button>
            <button className={currentTheme.hover} onClick={() => PushNumber("3")}>3</button>
            <button className={currentTheme.hover} onClick={() => PushNumber("4")}>4</button>
            <button className={currentTheme.hover} onClick={() => PushNumber("5")}>5</button>
            <button className={currentTheme.hover} onClick={() => PushNumber("6")}>6</button>
            <button className={currentTheme.hover} onClick={() => PushNumber("7")}>7</button>
            <button className={currentTheme.hover} onClick={() => PushNumber("8")}>8</button>
            <button className={currentTheme.hover} onClick={() => PushNumber("9")}>9</button>
            <button className={currentTheme.hover} onClick={() => PushNumber("0")}>0</button>
            <button className={currentTheme.hover} onClick={() => AddNumber("+")}>+</button>
            <button className={currentTheme.hover} onClick={() => AddNumber("-")}>-</button>
            <button className={currentTheme.hover} onClick={() => AddNumber("*")}>×</button>
            <button className={currentTheme.hover} onClick={() => AddNumber("/")}>÷</button>
            <button className={currentTheme.hover} onClick={CalculateTotal}>=</button>
          </div>
          <div>
            {number}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Practice;