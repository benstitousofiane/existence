// Importation de latex, pour le displaystyle par défaut il faut utiliser BlockMath
import { RefObject } from 'react';
import { InlineMath, BlockMath } from 'react-katex';

interface HomeInterface{
    currentWindow: string
    inputFile: RefObject<HTMLInputElement | null>
    clickOnInputFile: () => void
    handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Home(props: HomeInterface){
    return (
        // Home
    <div className={`${props.currentWindow == "Home" ? "" : "hidden"} bg-[#3e1c07] text-[#e9fe56] flex flex-col justify-center items-center w-full h-screen text-2xl`}>
      <div className="text-5xl">
        <BlockMath>{String.raw`\exists x`}</BlockMath>
      </div>
      <BlockMath>{String.raw`
        \text{Bienvenue sur } \text{Existence} \\
        \text{Votre notebook mathématique moderne et gratuit} \ \forall t \in \text{Vie}`}
      </BlockMath>
      
      <div className='mt-10 text-center'>
        <input type="file" className='hidden' ref={props.inputFile} onChange={props.handleFileInput}/>
        
        <span className='bg-[#e9fe56] text-[#3e1c07] m-2  rounded-t-2xl p-4'><button onClick={() => props.clickOnInputFile()}><BlockMath>{String.raw`\text{Ouvrir une note}`}</BlockMath></button></span>
        <span className='bg-[#e9fe56] text-[#3e1c07] m-2 rounded-t-2xl p-4'><button><BlockMath>{String.raw`\text{Nouvelle note}`}</BlockMath></button></span>

      </div>

    </div>

    )
} 