
const ListTable = ({tableData}) => {
    return (
    <div className="relative overflow-x-auto pt-5">
        <table className="w-full text-sm mt-7 text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
               
                {Object.keys(tableData[0]).map((title,key)=>
                <th scope="col" key={key} className="px-6 py-3">
                    {title}
                </th>

                )
                
                
                }
            </tr>
            </thead>
            <tbody>
            {tableData.map((row, index) => (
                <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    {row[Object.keys(row)[0]]}
                </th>
                <td className="px-6 py-4">{row[Object.keys(row)[1]]}</td>
                <td className="px-6 py-4">{row[Object.keys(row)[2]]}</td>
                <td className="px-6 py-4">{row[Object.keys(row)[3]]}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    
  )
}

export default ListTable