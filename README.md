# ABC Analysis Web App

## Description

This web application allows importing, processing, and classifying items from a CSV file using the **ABC Analysis** method. The application identifies **A, B, C** type items based on sales and allows exporting the results to a new CSV file.

## Features

- **Import CSV file** containing product data.
- **ABC Classification** (A = 80% of sales, B = 80-95%, C = 95-100%).
- **Tabular data display** with sorting capabilities.
- **Export CSV file** with processed data and ABC classification.

## How to Use the Application

1. Upload a `.csv` file containing products in the following format:
   ```csv
   Product Code,Product Name,Quantity
   BT4V534G,Laptop,116625
   IKPMVVN9,Mouse,114144
   UB1UKS3U,Keyboard,82880
   ```
2. Click the **“Calculate ABC”** button to perform the classification.
3. View the processed data in the table.
4. Click **“Export List”** to download the file with the ABC classification.

## Installation and Local Execution

1. Clone the GitHub repository:
   ```sh
   git clone https://github.com/lucianSP/abc-classification.git
   cd abc-classification
   ```
2. Open `index.html` in a modern browser (Chrome, Edge, Firefox).

## Technologies Used

- **HTML, CSS, JavaScript** for the interface and logic.
- **FileReader API** for CSV import.
- **JavaScript for processing and ABC classification.**

## Contributions

Pull requests are welcome! If you have improvement ideas, open an issue or contribute to the code.

## License

This project is distributed under the MIT license.

