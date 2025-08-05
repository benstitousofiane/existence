import Output from "./Output"
import Footer from "./Footer"

interface EditInterface{
    currentWindow: string
    fileName: string
    fileContent: string[]
}

export default function Edit(props: EditInterface){
    return (
        <div className={`${props.currentWindow == "Edit" ? "" : "hidden"}`}>
            <Output currentWindow={props.currentWindow} fileName={props.fileName} fileContent={props.fileContent}/>
            <Footer/>
        </div>
    )
}