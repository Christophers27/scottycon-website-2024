import React from 'react'

export default function MapPage() {
  return (
    <main className="page h-[80dvh]">
        <iframe src='https://cmumaps-public.vercel.app' className='w-full h-full rounded-4xl border-2 border-black/10' loading='lazy' />
    </main>
  )
}
