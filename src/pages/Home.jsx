import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Home(props){
    
    return(
        <div className={`min-h-screen `}>
            <Sidebar theme={props.theme} currentTheme={props.currentTheme} dark={props.dark} setDark={props.setDark}/>
            <div className="ml-64">
                 <Header theme={props.theme} currentTheme={props.currentTheme} dark={props.dark} setDark={props.setDark}/>
                 <main className="p-8">
                    This is the main page
                 </main> 
            </div>
          
        </div>
    )
}
export default Home