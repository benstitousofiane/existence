"use client"
import { ReactNode, useRef, useState } from 'react';
import Home from '@/components/Home';



export default function App() {
  // Initialisation de variables
  const [currentWindow, setCurrentWindow] = useState<string>("Home")
  const inputFile = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string>("")  
  const [fileContent, setFileContent] = useState<string[]>([])

  //Fonction pour cliquer sur le input file caché par un style via un autre bouton
  const clickOnInputFile = () => {
    if (inputFile.current){
      inputFile.current.click()
    }
  }

  // Actions à effectuer une fois que l'on ouvre un fichier
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Objet qui permet de lire un fichier
    const reader = new FileReader()
    
    // Ce que l'on fait une fois que le fichiers soit chargé par une lecture
    reader.onload = (event) => {
      if (event.target?.result){
        setFileContent(event.target.result.toString().split("\n"))
        setCurrentWindow("Edit")
      }
    }

    // Si le fichier et retrouver et qu'il a au moins une propriété tel qu'un nom
    if (e.target.files && e.target.files.length > 0){
      setFileName(e.target.files[0].name)

      // Lecture du fichier en .exi
      reader.readAsText(e.target.files[0])
    }
  }
  return (
    <>
      <Home currentWindow={currentWindow} inputFile={inputFile} clickOnInputFile={clickOnInputFile} handleFileInput={handleFileInput} />
    </>
  );
}
