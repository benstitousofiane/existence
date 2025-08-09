import { useEffect, useRef, useState } from "react"

interface NewFileWindowInterface{
    newNote: Function
    displayNewFileWindow: boolean
    setDisplayNewFileWindow: Function
}

export default function NewFileWindow(props: NewFileWindowInterface){
    const fileNameInputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        fileNameInputRef.current?.focus()
    })
    return (
        <div className={`${props.displayNewFileWindow ? "" : "hidden"} bg-[#00000097] absolute w-full h-screen flex flex-col justify-center`}>
             <div className="bg-black flex flex-col gap-5 justify-center ml-[120px] mr-[120px] p-10 rounded-2xl">
                <h1 className="text-white text-center">Configuration de la note</h1>
                <input
                ref={fileNameInputRef}
                className="bg-[#3e1c07] outline-[#e9fe56] outline-none p-3 rounded mx-12 "
                type="text" placeholder="Nom de la nouvelle note"/>
                <div className="flex justify-center gap-4">
                    <button className="bg-[#3e1c07] outline-[#e9fe56] inline p-4 rounded"
                    onClick={() =>{ 
                        if (fileNameInputRef.current?.value.trim() != ""){
                            props.newNote(fileNameInputRef.current?.value)
                            fileNameInputRef.current.value = ""
                            props.setDisplayNewFileWindow(false)
                        }
                        }}>Valider</button>
                    <button className="bg-[#3e1c07] outline-[#e9fe56] inline p-4 rounded"
                    onClick={() =>{ 
                        fileNameInputRef.current.value = ""
                        props.setDisplayNewFileWindow(false)
                        }}>Annuler</button>
                </div>
             </div>
        </div>
    )
}