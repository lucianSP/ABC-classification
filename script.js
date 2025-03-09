/* script.js */

let csvData = [];
const MAX_ROWS = 10000; // Limităm numărul maxim de produse importate

document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        processCSV(content);
    };
    reader.readAsText(file);
});

function processCSV(csv) {
    const rows = csv.split("\n")
        .map(row => row.trim())
        .filter(row => row.length > 0)
        .map(row => row.split(/,(?=(?:[^"\n]*"[^"\n]*")*[^"\n]*$)/));
    
    if (rows.length <= 1) {
        alert("The file does not contain valid data.!");
        return;
    }

    if (rows.length - 1 > MAX_ROWS) {
        alert(`Error: File exceeds the limit of ${MAX_ROWS} products.`);
        return;
    }

    let initialCount = rows.length - 1;
    let removedItems = [];

    csvData = rows.slice(1).map(row => {
        let quantity = row[2]?.replace(/"/g, "").replace(/,/g, "").trim();
        if (!row[0] || !row[1] || isNaN(parseFloat(quantity))) {
            removedItems.push(row);
            return null;
        }
        return {
            code: row[0].trim(), 
            name: row[1].trim(), 
            quantity: parseFloat(quantity),
            classification: ""
        };
    }).filter(item => item !== null);

    alert(`Import: ${csvData.length} products. Deletions: ${initialCount - csvData.length}`);
    if (removedItems.length > 0) {
        console.warn("Removed items:", removedItems);
    }

    displayTable();
}

function displayTable() {
    const tableHeader = document.getElementById("tableHeader");
    const tableBody = document.getElementById("tableBody");
    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";
    
    if (csvData.length === 0) return;

    const headers = ["Product Code", "Product Name", "Quantity Sold", "ABC Classification"];
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        tableHeader.appendChild(th);
    });

    csvData.forEach(item => {
        const tr = document.createElement("tr");
        [item.code, item.name, item.quantity.toLocaleString("ro-RO"), item.classification].forEach(cellData => {
            const td = document.createElement("td");
            td.textContent = cellData;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

function calculateABC() {
    if (csvData.length === 0) return;

    let totalSales = csvData.reduce((sum, item) => sum + item.quantity, 0);
    let cumulativeSales = 0;
    
    csvData.sort((a, b) => b.quantity - a.quantity).forEach(item => {
        cumulativeSales += item.quantity;
        let percentage = (cumulativeSales / totalSales) * 100;
        item.classification = percentage <= 80 ? "A" : percentage <= 95 ? "B" : "C";
    });

    displayTable();
}

document.getElementById("calculateABC").addEventListener("click", calculateABC);

function exportCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Product Code, Product Name, Quantity Sold, ABC Classification\n" +
        csvData.map(item => `${item.code},${item.name},${item.quantity.toFixed(2)},${item.classification}`).join("\n");

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ABC_Classification.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.getElementById("exportCSV").addEventListener("click", exportCSV);




