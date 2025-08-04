"use client"
import { ReactNode, useRef, useState } from 'react';

import Home from './components/home/Home';
import Edit from './components/edit/Edit';

export default function App() {
  // Initialisation de variables
  const [currentWindow, setCurrentWindow] = useState<string>("Home")
  const [fileName, setFileName] = useState<string>("")
  //Fonction pour cliquer sur le input file caché par un style via un autre bouton

  return (
    <>
      <Home currentWindow={currentWindow} setCurrentWindow={setCurrentWindow} setFileName={setFileName} />
      <Edit currentWindow={currentWindow} fileName={fileName}/>
    </>
  );
}
