'use client'

export default function Summary({total}: {total: number}) {
  return (
    <div className="flex">
      <p className="text-xl font-bold my-10">合計: {total}</p>
    </div>
  )
}