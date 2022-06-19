import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => (
  <div className="home">
    <h2>Cos&apos; è Login Warrior?</h2>
    <p>
      LoginWarrior permette di eseguire data-analysis
      con l&apos; obiettivo di identificare patter di tipici
      di un attacco informatico semplicemente analizzando
      i log del proprio applicativo.
    </p>
    <h2>Come analizza i dati?</h2>
    <p>
      LoginWarrior permette di eseguire analisi su grandi
      moli di dati senza dover eseguire riduzioni o campionamenti
      su di esso grazie alla tecnologia WebGL è in grado di
      eseguire render di grafici con anche più di un milione
      di unità.
    </p>
    <h2>Breve tutorial</h2>
    <p>
      Recati nella sezione
      {' '}
      <Link to="/data">Gestione Dati</Link>
      {' '}
      e carica il tuo dataset e le tue viste, poi naviga tramite
      la navbar al grafico che vuoi visualizzare.
    </p>
    <h2>Lo ScatterPlot</h2>
    <p>
      Identifica tramite una visione a livello di entità quali
      sono i comportamenti dei tuoi attaccanti e tramite
      la piena personalizzazione modifica il grafico come
      meglio credi per evidenziare le caratteristiche più
      importanti.
    </p>
    <img src="spesempio.png" alt="" />
    <h2>Il Sankey</h2>
    <p>
      Trova le relazioni tra eventi che si susseguono
      e i rapporti tra le varie dimensioni del dataset,
      senza aggiungere complessità alla visualizzazione.
    </p>
    <img src="skesempio.png" alt="" />
    <div className="imgDiv">
      <p>Powered by:</p>
      <img src="logo.svg" alt="" />
    </div>
  </div>
);
