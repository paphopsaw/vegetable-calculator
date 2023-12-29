'use client'
import { useState } from "react";

export default function Card({
  name,
  price,
  count,
  onButtonClick,
}: {
  name: string,
  price: number,
  count: number,
  onButtonClick: (increment: number) => void,
}) {
  return (
    <div className='border-2 m-2 rounded'>
      <h2 className="font-bold">{name}</h2>
      <h3>値段: {price}円</h3>
      <h3>数: {count}</h3>
      <div className='flex justify-evenly'>
        <button className='bg-blue-500 text-white rounded w-10' onClick={() => onButtonClick(1)}>+</button>
        <button className='bg-blue-500 text-white rounded w-10' onClick={() => onButtonClick(-1)}>-</button>
      </div>
    </div>
  )
}