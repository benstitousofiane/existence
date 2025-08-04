import { exists, mkdir, readDir, create, BaseDirectory } from '@tauri-apps/plugin-fs';
import { ReactNode, useState } from 'react';
import { InlineMath, BlockMath } from 'react-katex';
// Importation de latex, pour le displaystyle par défaut il faut utiliser BlockMath

interface HomeInterface{
    currentWindow: string
    setCurrentWindow: Function
    setFileName: Function
}

export default function Home(props: HomeInterface){
  const [notesNames, setNotesNames ] = useState<ReactNode[]>()

  async function newNote(){
    const notesMathExists = await exists('notesmath', {
      baseDir: BaseDirectory.AppData,
    })
    if (!notesMathExists){
      await mkdir('notesmath', {
        baseDir: BaseDirectory.AppData,
      });
    }
    // pour linux les fichiers sont dans .local/share/com.existences.app
    const note = await create('notesmath/testnotes.exi', { baseDir: BaseDirectory.AppData });
    await note.write(new TextEncoder().encode('oui'));
    await note.close();
    console.log("note généré")
  }
  
  async function listNotes(){
    const notesMathExists = await exists('notesmath', {
      baseDir: BaseDirectory.AppData,
    })
    if (!notesMathExists){
      await mkdir('notesmath', {
        baseDir: BaseDirectory.AppData,
      });
    }
    const entries = await readDir('notesmath', { baseDir: BaseDirectory.AppData });
    const notes : ReactNode[] = []
    for (const note of entries){
      notes.push(<button key={note.name} onClick={() => {
        props.setFileName(note.name)
        props.setCurrentWindow("Edit")
      }}>{note.name}</button>)
    }
    setNotesNames(notes)
  }

  listNotes()
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
      
      <span className='bg-[#e9fe56] text-[#3e1c07] m-2 rounded-t-2xl p-4'><button onClick={() => {
        newNote()
        listNotes() 
      }
      }><BlockMath>{String.raw`\text{Nouvelle note}`}</BlockMath></button></span>
    </div>

    {notesNames}
  </div>

  )
} 