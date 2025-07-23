import Output from "./Output"
import Footer from "./Footer"

interface EditInterface{
    currentWindow: string
    fileContent: string[]
}

export default function Edit(props: EditInterface){
    return (
        <>
            <Output currentWindow={props.currentWindow} fileContent={props.fileContent}/>
            <Footer/>
        </>
    )
}