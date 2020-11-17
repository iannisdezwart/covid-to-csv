interface Data {
	[keys: string]: {
		date: string,
		confirmed: number,
		deaths: number,
		recovered: number
	}[]
}

let data: Data

const generateCountryCSV = (
	countryName: string
) => {
	let csvData = 'date;confirmed;deaths;recovered\n'

	for (let day of data[countryName]) {
		const date = new Date(day.date)
		const formattedDate = `${ date.getFullYear() }-${ (date.getMonth() + 1).toString().padStart(2, '0') }-${ (date.getDate() + 1).toString().padStart(2, '0') }`

		csvData += `"${ formattedDate }";${ day.confirmed };${ day.deaths };${ day.recovered }\n`
	}

	const file = new File([ csvData ], countryName + '.csv', { type: 'text/csv' })

	const downloadButton = document.createElement('a')
	downloadButton.href = URL.createObjectURL(file)
	downloadButton.download = countryName + '.csv'
	document.body.appendChild(downloadButton)
	downloadButton.click()
	downloadButton.remove()
}

fetch('https://pomber.github.io/covid19/timeseries.json')
	.then(res => res.json())
	.then(json => {
		data = json as Data

		document.body.innerHTML = /* html */ `
		<button onclick="generateCountryCSV('Netherlands')">Netherlands</button>
		<button onclick="generateCountryCSV('Australia')">Australia</button>
		<button onclick="generateCountryCSV('Brazil')">Brazil</button>
		<button onclick="generateCountryCSV('India')">India</button>
		<button onclick="generateCountryCSV('Afghanistan')">Afghanistan</button>
		<button onclick="generateCountryCSV('Russia')">Russia</button>
		<button onclick="generateCountryCSV('Germany')">Germany</button>
		`
	})