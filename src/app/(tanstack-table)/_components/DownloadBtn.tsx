import * as XLSX from 'xlsx/xlsx.mjs'
const DownloadBtn = ({data = [], fileName}:any) => {
  return (
    <button className="bg-indigo-600 hover:bg-gray-100 hover:text-indigo-600 fill-white hover:fill-indigo-600 px-4 flex text-white items-center gap-2 rounded transition ease-linear" onClick={()=> {
      const datas = data?.length ? data : []
      const worksheet =  XLSX.utils.json_to_sheet(datas)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
      XLSX.writeFile(workbook,fileName ? `${fileName}.xlsx` : "data.xlsx")
    }}> Download </button>
  )
}

export default DownloadBtn