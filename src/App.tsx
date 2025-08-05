"use client"
import { ReactNode, useRef, useState } from 'react';
import { readTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';

import Home from './components/home/Home';
import Edit from './components/edit/Edit';

export default function App() {
  // Initialisation de variables
  const [currentWindow, setCurrentWindow] = useState<string>("Home")
  const [fileName, setFileName] = useState<string>("")
  const [fileContent, setFileContent] = useState<string[]>([])

  async function setLinesOfFileContent(target: string){
        const file = await readTextFile(`notesmath/${target}`, {
            baseDir: BaseDirectory.Document,
        });
        setFileContent(file.split("\n"))
        setFileName(target)
  }

  return (
    <>
      <Home currentWindow={currentWindow} setCurrentWindow={setCurrentWindow} setLinesOfFileContent={setLinesOfFileContent} />
      <Edit currentWindow={currentWindow} fileName={fileName} fileContent={fileContent}/>
    </>
  );
}
