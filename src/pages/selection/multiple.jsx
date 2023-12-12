import React from 'react'

const Multiple = () => {
  return (
    <>
<div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">Ad</th>
              <th scope="col" className="px-6 py-4">Soyad</th>
              <th scope="col" className="px-6 py-4">Sonuç</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
              <td className="whitespace-nowrap px-6 py-4">Rıdvan</td>
              <td className="whitespace-nowrap px-6 py-4">Öztürk</td>
              <td className="whitespace-nowrap px-6 py-4">100</td>
            </tr>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
              <td className="whitespace-nowrap px-6 py-4">Batuhan</td>
              <td className="whitespace-nowrap px-6 py-4">Öztürk</td>
              <td className="whitespace-nowrap px-6 py-4">50</td>
            </tr>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
              <td className="whitespace-nowrap px-6 py-4">Furkan</td>
              <td className="whitespace-nowrap px-6 py-4">Öztürk</td>
              <td className="whitespace-nowrap px-6 py-4">100</td>
            </tr>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium">4</td>
              <td className="whitespace-nowrap px-6 py-4">Furkan</td>
              <td className="whitespace-nowrap px-6 py-4">Öztürk</td>
              <td className="whitespace-nowrap px-6 py-4">100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Multiple