'use client'

import Card from '@/app/ui/card'
import { useState, useEffect } from 'react'

export interface CardData
{
    id: number, 
    name: string,
    price: number,
    count: number,
}

export default function CardCollection({cardList, onUpdate}: 
  {
    cardList: CardData[],
    onUpdate: (increment: number, id: number) => void,
  }) {

  const cards = cardList.map(card => 
    <Card 
      key={card.id}
      name={card.name}
      price={card.price}
      count={card.count}
      onButtonClick={increment => onUpdate(increment, card.id)}
    />
  );

  return (
    <div className='grid grid-cols-2'>
      {cards}
    </div>
  )
}