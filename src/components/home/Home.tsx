import { exists, mkdir, readDir, create, BaseDirectory } from '@tauri-apps/plugin-fs';
import { ReactNode, useState } from 'react';
// Importation de latex, pour le displaystyle par défaut il faut utiliser BlockMath
import { InlineMath, BlockMath } from 'react-katex';

import NewFileWindow from './NewFileWindow';

interface HomeInterface{
    currentWindow: string
    setCurrentWindow: Function
    setLinesOfFileContent : Function
}

export default function Home(props: HomeInterface){
  const [notesNames, setNotesNames ] = useState<ReactNode[]>()
  const [displayNewFileWindow, setDisplayNewFileWindow] = useState<boolean>(false)

  function newNote(name: string){
      async function asyncNewNote(name: string){
        // Faire un dossier pour l'app sur Document s'il n'existe pas
      const appDirExists = await exists('', { baseDir: BaseDirectory.Document });
      if (!appDirExists){
        await mkdir('', {
          baseDir: BaseDirectory.Document,
        });
      }

      const existenceExists = await exists('existence', {
        baseDir: BaseDirectory.Document,
      })
      if (!existenceExists){
        await mkdir('existence', {
          baseDir: BaseDirectory.Document,
        });
      }
      const note = await create(`existence/${name}.exi`, { baseDir: BaseDirectory.Document });
      await note.write(new TextEncoder().encode('RC #3e1c07'));
      await note.close();
    }
    asyncNewNote(name)
  }
  
  async function listNotes(){
    // Faire un dossier pour l'app sur Document s'il n'existe pas
    const appDirExists = await exists('', { baseDir: BaseDirectory.Document });
    if (!appDirExists){
      await mkdir('', {
        baseDir: BaseDirectory.Document,
      });
    }

    const existenceExists = await exists('existence', {
      baseDir: BaseDirectory.Document,
    })
    if (!existenceExists){
      await mkdir('existence', {
        baseDir: BaseDirectory.Document,
      });
    }
    const entries = await readDir('existence', { baseDir: BaseDirectory.Document });

    const notes : ReactNode[] = []
    for (const note of entries){
      notes.push(<button className='bg-[#e9fe56] text-[#3e1c07] rounded-r-full px-4 pr-7' key={note.name} onClick={() => {
        props.setLinesOfFileContent(note.name)
        props.setCurrentWindow("Edit")

      }}><BlockMath>{String.raw`\text{${note.name}}`}</BlockMath></button>)
    }
    setNotesNames(notes)
  }

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
        setDisplayNewFileWindow(true)
      }
      }><BlockMath>{String.raw`\text{Nouvelle note}`}</BlockMath></button></span>

      <span className='bg-[#e9fe56] text-[#3e1c07] m-2 rounded-t-2xl p-4'><button onClick={() => {
        listNotes()
      }
      }><BlockMath>{String.raw`\text{Actualiser}`}</BlockMath></button></span>

    </div>

    <BlockMath>{String.raw`\text{Vos notes :}`}</BlockMath>
    <div className='flex gap-5 flex-wrap'>
      {notesNames}
    </div>
    
    <NewFileWindow newNote={newNote} displayNewFileWindow={displayNewFileWindow} setDisplayNewFileWindow={setDisplayNewFileWindow}/>
  </div>

  )
} 