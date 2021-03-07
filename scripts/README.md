## CSV import

the file `import-csv` MUST handle the import from all the csv files into the js object used by the React App.

## To import
### Install Node
https://nodejs.org/en/download/

### Execute the following command from the project root
```
node scripts/import-csv.js public/<CSV_FILE1> public/<CSV_FILE2>
```

It must read the csv files in the `public` directory and output a js object of the following form:
```
{
  [materiau]: {
    [coloris]: {
      [finition]: {
        [epaisseur]: price
      }
    }
  }
}