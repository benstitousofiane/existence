import { ReactNode, useEffect, useState } from "react"
import { InlineMath, BlockMath } from 'react-katex';
import Image from "next/image";

interface OutputInterface{
    currentWindow: string
    fileContent: string[]
}


export default function Output(props: OutputInterface){
    // Gestion des couleurs
    const [backgroundColor, setBackgroundColor] = useState<string>("#3e1c07")

    // Gestions des éléments qui vont apparaîtres
    const [lastBoxId, setLastBoxId] = useState<number>(0)
    const [elements, setElements] = useState<ReactNode[]>()
    // Modes pour la gestions des éléments qui vont apparaître

    useEffect(() => {
        // Clé pour les éléments
        let boxKey : number = 0
        let boxElementKey : number = 0
        let boxMode : string = ""
        let boxBackgroundColor : string = "#e9fe56"
        let boxTextColor : string = "#3e1c07"
        let boxBorderRadius : number = 0
        let boxTop : number = 0
        let boxLeft: number = 0
        let boxPadding : number = 0
        let boxRotate : number = 0
        
        let subBoxKey : number = 0

        let tempElements : ReactNode[] = []
        let tempSubBox: ReactNode[] = []
        let tempBox : ReactNode[] = []


        for (const line of props.fileContent){
            // lineArray représente un tableau avec tout les mots de la ligne en cours d'analyse
            // lineArray[0] représente le mode de sortie : s'il s'agit d'un texte ou d'une formule mathématique par exemple
            const lineArray = line.split(" ") // pour éviter les code d'échappement invisible à la fin on utilise toString
            // trim sert à elever les caractère invisible du contenu fichier
            // Couleurs de l'interface
            if (lineArray[0].trim() === "RC" && lineArray.length >= 2){
                setBackgroundColor(lineArray[1])
            }
            // Gestions des boites
            // Activation du mode Boîte
            if (lineArray[0].trim() === "B" && boxMode === ""){
                boxMode = "Normal"
                if (lineArray.length >= 3){
                    if (lineArray[1].trim() != "NULL" && lineArray[2].trim() != "NULL"){
                        boxBackgroundColor = lineArray[1]
                        boxTextColor = lineArray[2]
                    }
                }
                if (lineArray.length >= 4){
                    boxBorderRadius = Number(lineArray[3]) 
                }
            }
            // Boite avec une position absolue
            if (lineArray[0].trim() == "AB" && boxMode === ""){
                boxMode = "Absolute"
                if (lineArray.length >= 3){
                    if (lineArray[1].trim() != "NULL" && lineArray[2].trim() != "NULL"){
                        boxBackgroundColor = lineArray[1]
                        boxTextColor = lineArray[2]
                    }
                }
                if (lineArray.length >= 4){
                    boxBorderRadius = Number(lineArray[3]) 
                }
                if (lineArray.length >= 6){
                    boxTop = Number(lineArray[4])
                    boxLeft = Number(lineArray[5])
                }
                if (lineArray.length >= 7){
                    boxPadding = Number(lineArray[6])   
                }
                if (lineArray.length >= 8){
                    boxRotate = Number(lineArray[7])
                }
            }
            // Ajout d'une boite avec tout les éléments temporaire et désactivation du mode Boîte
            if (lineArray[0].trim() === "E" && boxMode !== ""){
                if (boxMode == "Normal"){
                    tempElements.push(<div key={boxKey} 
                        className="mt-4 ml-20 mr-20 p-4 flex flex-wrap items-center"
                        style={{backgroundColor: boxBackgroundColor, color: boxTextColor, borderRadius: `${boxBorderRadius}px`}}>{tempBox}</div>)
                }
                if (boxMode == "Absolute"){
                    tempElements.push(<div key={boxKey} 
                        className="flex flex-wrap items-center absolute"
                        style={{transform: `rotate(${boxRotate}deg)`, padding: `${boxPadding}px`, top: `${boxTop}px`, left: `${boxLeft}%`, backgroundColor: boxBackgroundColor, color: boxTextColor, borderRadius: `${boxBorderRadius}px`}}>{tempBox}</div>)
                }
                tempBox = []
                boxKey++
                boxElementKey = 0
                boxMode = ""
                boxBackgroundColor = "#e9fe56"
                boxTextColor = "#3e1c07"
                boxBorderRadius = 0
                subBoxKey = 0
                boxTop = 0
                boxLeft = 0
                boxRotate = 0
            }
            // Publier les dernière balise vers le centre
            if (lineArray[0].trim() == "PN" && boxMode !== ""){
                tempBox.push(<div key={`${boxKey}-subBox-${subBoxKey}`} 
                    className="w-full flex flex-wrap items-center"
                    style={{backgroundColor: boxBackgroundColor, color: boxTextColor, borderRadius: `${boxBorderRadius}px`}}>{tempSubBox}</div>)
                tempSubBox = []
                subBoxKey++
            }
            if (lineArray[0].trim() == "PC" && boxMode !== ""){
                tempBox.push(<div key={`${boxKey}-subBox-${subBoxKey}`} 
                    className="w-full flex flex-wrap items-center justify-center"
                    style={{backgroundColor: boxBackgroundColor, color: boxTextColor, borderRadius: `${boxBorderRadius}px`}}>{tempSubBox}</div>)
                tempSubBox = []
                subBoxKey++
            }

            // Ajout d'un texte avec la police par défaut sur le site
            if (lineArray[0].trim() === "T" && boxMode !== ""){
                tempSubBox.push(<h2 className="m-1" key={`${boxKey}-${boxElementKey}`}>{line.slice(2, line.length)}</h2>)
                boxElementKey++
            }
            // Ajout d'un texte avec la police de LaTeX
            if (lineArray[0].trim() === "TL" && boxMode !== ""){
                tempSubBox.push(<h2 key={`${boxKey}-${boxElementKey}`}><InlineMath>{String.raw`\text{${line.slice(2, line.length)}}`}</InlineMath></h2>)
                boxElementKey++
            }
            // Ajout d'une formule mathématique
            if (lineArray[0].trim() === "M" && boxMode !== ""){
                tempSubBox.push(<h2 key={`${boxKey}-${boxElementKey}`}><InlineMath>{String.raw`\displaystyle{${line.slice(2, line.length)}}`}</InlineMath></h2>)
                boxElementKey++
            }
            if (lineArray[0].trim() === "I" && boxMode !== ""){
                if (lineArray.length >= 5){
                    tempSubBox.push(<Image style={{borderRadius: `${Number(lineArray[4])}px`}} className={boxMode === "Normal" ? "m-3" : ""} alt="image" src={String.raw`${lineArray[1]}`} key={`${boxKey}-${boxElementKey}`} width={Number(lineArray[2])} height={Number(lineArray[3])} />)
                }
                boxElementKey++
            }
            
            // Echappement
            if (lineArray[0].trim() === "BREAK" && boxMode !== ""){
                tempSubBox.push(<div key={`${boxKey}-${boxElementKey}`} className="w-full mt-1 mb-1"></div>)
                boxElementKey++
            }
            
            
        }
        setLastBoxId(boxKey)
        setElements(tempElements)
    }, [props.fileContent])
    
    // Mise à jour de la couleur de fond
    useEffect(() => {
        document.body.style.background = backgroundColor
    }, [backgroundColor])
    return (
        <>
        <div 
        className={`${props.currentWindow == "Edit" ? "" : "hidden"} w-full h-screen`} 
        style={{
            backgroundColor: backgroundColor
        }}>
            <div className="pb-5">
                {elements}
            </div>
        </div>
        </>
    )
}