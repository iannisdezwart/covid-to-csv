var data;
var generateCountryCSV = function (countryName) {
    var csvData = 'date;confirmed;deaths;recovered\n';
    for (var _i = 0, _a = data[countryName]; _i < _a.length; _i++) {
        var day = _a[_i];
        var date = new Date(day.date);
        var formattedDate = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + (date.getDate() + 1).toString().padStart(2, '0');
        csvData += "\"" + formattedDate + "\";" + day.confirmed + ";" + day.deaths + ";" + day.recovered + "\n";
    }
    var file = new File([csvData], countryName + '.csv', { type: 'text/csv' });
    var downloadButton = document.createElement('a');
    downloadButton.href = URL.createObjectURL(file);
    downloadButton.download = countryName + '.csv';
    document.body.appendChild(downloadButton);
    downloadButton.click();
    downloadButton.remove();
};
fetch('https://pomber.github.io/covid19/timeseries.json')
    .then(function (res) { return res.json(); })
    .then(function (json) {
    data = json;
    document.body.innerHTML = /* html */ "\n\t\t<button onclick=\"generateCountryCSV('Netherlands')\">Netherlands</button>\n\t\t<button onclick=\"generateCountryCSV('Australia')\">Australia</button>\n\t\t<button onclick=\"generateCountryCSV('Brazil')\">Brazil</button>\n\t\t<button onclick=\"generateCountryCSV('India')\">India</button>\n\t\t<button onclick=\"generateCountryCSV('Afghanistan')\">Afghanistan</button>\n\t\t<button onclick=\"generateCountryCSV('Russia')\">Russia</button>\n\t\t<button onclick=\"generateCountryCSV('Germany')\">Germany</button>\n\t\t";
});
