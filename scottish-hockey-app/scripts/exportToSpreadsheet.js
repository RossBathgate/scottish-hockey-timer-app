import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

// Code Adapted from https://stackoverflow.com/questions/51309125/react-native-how-to-create-excel-file-from-code

export default async function exportToSpreadsheet(title, dataToWrite) {
    let worksheet = XLSX.utils.json_to_sheet(dataToWrite);
    let workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, title);
    const wbout = XLSX.write(workbook, {
        type: "base64",
        bookType: "xlsx",
    });

    const uri = FileSystem.cacheDirectory + title + ".xlsx";

    await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
    });

    await Sharing.shareAsync(uri, {
        mimeType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        dialogTitle: "Scottish Hockey",
        UTI: "com.microsoft.excel.xlsx",
    });
}
