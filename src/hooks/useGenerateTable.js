
import * as XLSX from "xlsx";

const useGenerateTable = () => {

    
  const URLtoFile = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();

    const mime = blob.type;
    const ext = mime.slice(mime.lastIndexOf("/") + 1, mime.length);

    const file = new File([blob], `filename.${ext}`, { type: mime });

    return file;
  };
  const FileToXLS = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);

        resolve(parsedData);
      };
    });
  };


  const GenerateTable = async(url) => {

    const file = await URLtoFile(url);
    const xlsTable = await FileToXLS(file);

    return xlsTable;
  }


  return {GenerateTable}
}

export default useGenerateTable