'use client'

import CardCollection, { CardData } from '@/app/ui/card-collection'
import Summary from '@/app/ui/summary'
import { useState, useEffect } from 'react'

export default function Home() {
  const [state, setState]  = useState<CardData[]>([]);

  useEffect(() => {
      fetchCSVData();
  }, []);

  async function fetchCSVData() {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_SPSfqcF3AcCJmmmzVLxbbBvInozEe_RR3l4qd583d4jTDPgWteK4qQOPW2ddGfC-2BjGZsx2rjKf/pub?output=csv';
    const response = await fetch(csvUrl)
    const csvText = await response.text();
    setState(parseCSV(csvText));
  }

  function parseCSV(text: string) {
    const rows = text.split(/\r?\n/);
    const data = [];
    for (let i = 0; i < rows.length; i++) {
        const rowData = rows[i].split(',');
        const rowObject:CardData = {
          id: i,
          name: rowData[0],
          price: parseInt(rowData[1]),
          count: 0
        };
        data.push(rowObject);
    }
    return data;
  }

  function handleUpdate(increment: number, id: number) {
    const nextState = state.map((c, i) => {
      if (i === id) {
        const newCard:CardData = {
          ...c,
          count: Math.max(c.count + increment, 0),
        };
        return newCard;
      } else {
        return c;
      }
    });
    setState(nextState);
  }

  function getTotal() {
    return state.map(item => item.count * item.price).reduce((partialSum, a) => partialSum + a, 0);
  }

  function clear() {
    const nextState = state.map((c, i) => {
      const newCard:CardData = {
        ...c,
        count: 0,
      }
      return newCard
    });
    setState(nextState);
  }

  return (
    <main className='flex flex-col'>
      <h1>計算機</h1>
      <CardCollection cardList={state} onUpdate={handleUpdate}/>
      <Summary total={getTotal()}/>
      <button className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={clear}>クリア</button>
    </main>
  )
}
