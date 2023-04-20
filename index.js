const table = document.querySelector("#myTable")
/*
document.querySelector("#myTable") is an expression 
that searches the HTML document for the first element that 
matches the specified CSS selector #myTable.

In this case, the CSS selector #myTable is looking for an element 
that has an id attribute with the value of "myTable".

So, the expression document.querySelector("#myTable") returns 
the first DOM - Document Object Model element with an id attribute of "myTable". 
This DOM element could be any HTML element, such as a table, 
a div, or any other element that has an id attribute set to "myTable".
*/

let tbody = table.getElementsByTagName("tbody")[0] // - [0] first body element 
/*
table.getElementsByTagName("tbody") is a method call that 
returns a live HTMLCollection of all tbody elements within the table element.

Then, [0] is used to select the first tbody element in the HTMLCollection. 
Since getElementsByTagName returns a live collection of elements, 
we use the index [0] to access the first tbody element in the collection.
If there are no tbody elements in the table element, then it will return undefined.
*/
const searchInput = document.getElementById("searchInput")
/*
document.getElementById("searchInput") is an expression 
that returns the DOM (Document Object Model) element with the id attribute of "searchInput".

This method searches the entire HTML document for the first 
element that has an id attribute with the value of "searchInput". 
If it finds an element with that id, 
it returns that element as a DOM object.

If no element with that id is found, 
then document.getElementById("searchInput") returns null.

WHY DO WE NEED THIS?

We need document.getElementById("searchInput") to obtain a reference to the DOM element 
with an id attribute of "searchInput".

In JavaScript, we can interact with HTML elements 
and change their attributes or content 
using the Document Object Model (DOM). 
However, in order to interact with an HTML element, 
we first need to obtain a reference to it.

One way to obtain a reference to an element 
is by using its id attribute with the 
document.getElementById() method. 
Once we have a reference to the element, 
we can then manipulate it in various ways, 
such as adding event listeners, changing its attributes, 
or modifying its content.

In this particular case, the searchInput element 
may be used to obtain a user's search query, 
which can be used to filter and display 
relevant rows in the table element.
 */

const url = "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json"

/*
URL
Also known as an internet address or web address, a URL (Uniform Resource Locator) 
is a URI and standardized naming convention for addressing documents accessible 
over the Internet and Intranet. 
The URL makes it possible for a computer to 
locate and open a web page on a different computer on the Internet.


http:// or https://
The "HTTP" stands for Hypertext Transfer Protocol. 
It lets the browser know which protocol is used to access 
the information specified in the domain. 
An "HTTPS" protocol is short for "Hypertext Transfer Protocol Secure" 
and indicates that information transmitted over HTTP is encrypted and secure. 
After the HTTP or HTTPS, the colon ( : ) and two forward slashes ( // ) 
separate the protocol from the remainder of the URL.

*/
const pagination = document.getElementById("pagination")

/*

This method searches the entire HTML document for the first element that 
has an id attribute with the value of "pagination". 
If it finds an element with that id, it returns that element as a DOM object.

In the context of a web page, id attributes can be used to 
uniquely identify elements on the page. In this case, 
the pagination element is likely a container element that 
holds elements related to pagination, such as page 
numbers or navigation links.

By obtaining a reference to the pagination element using document.getElementById("pagination"), 
we can manipulate its contents or attributes 
to control the pagination behavior on the page. 
For example, we could add or remove page numbers or links, 
or change the number of items displayed per page.

*/


const pageSizeSelect = document.getElementById("page-size-select");
const defaultPageSize = 20;
let currentPage = 1;
let pageSize = defaultPageSize;
let superheroes = [];

// Fetch superheroes data from the API
fetch(url)
	.then((response) => response.json())
	.then((data) => {
		superheroes = data
		displaySuperheroes()
	})
	.catch((error) => console.error(error))

/*
fetch(url): This line sends a network request to the URL specified in the url variable, 
which presumably points to an API endpoint that returns data 
in a specific format (in this case, JSON).

.then((response) => response.json()): This line specifies a callback function 
that is executed once the network request completes successfully. 
The function takes the response object returned by the request and 
converts the response body from a JSON string into a JavaScript object. 
This is done using the json() method of the response object, which returns 
a promise that resolves with the parsed JSON data.

.then((data) => {: This line specifies another callback function that is executed once 
the previous promise resolves successfully with the parsed JSON data. 
The parsed data is passed to this function as the data parameter.

superheroes = data: This line assigns the data object to a variable named superheroes. 
Presumably, this variable is used elsewhere in the code to display or manipulate the data.

displaySuperheroes(): This line calls a function named displaySuperheroes(). 

catch((error) => console.error(error)): This line specifies a callback function 
that is executed if the network request fails for some reason. 
The function takes an error object as a parameter and logs the error message to 
the console using console.error().


*/

// Display superheroes in a table
function displaySuperheroes() {
	const start = (currentPage - 1) * pageSize
	const end = start + pageSize
	/*
	const start = (currentPage - 1) * pageSize: 
	This line calculates the starting index of the data to be 
	displayed based on the current page number (currentPage) 
	and the number of items per page (pageSize).

	const end = start + pageSize: 
	This line calculates the ending index of the data 
	to be displayed based on the starting index and 
	the number of items per page.
	
	*/
	const superheroesToDisplay = superheroes.slice(start, end)
	/*
	This line creates a new array (superheroesToDisplay) that contains 
	a subset of the superheroes array, starting at the 
	start index and ending at the end index.

	The slice() method selects the elements starting from the start index 
	and up to, but not including, the end index. 
	The start and end indices are calculated based on the current page number 
	and the number of items to display per page. 
	This is used to display only a subset of the 
	superheroes array at a time, which is useful for 
	implementing pagination in a table.
	 */
	tbody.innerHTML = ""
	/*
	tbody.innerHTML = "" sets the inner HTML content of the <tbody> element to an empty string. 
	The <tbody> element is typically used to group the table body content in an HTML table. 
	By setting its innerHTML property to an empty string, 
	any existing content within the <tbody> element is effectively removed. 
	This is useful when we want to update the content of a table dynamically, 
	such as when implementing pagination or search functionality. 
	By clearing the existing content of the table body before adding new content, 
	we ensure that only the most up-to-date data is displayed to the user.

	innerHTML

	innerHTML is a property that gets or sets the HTML content within an element. 
	It is used to manipulate the contents of an HTML element by modifying its HTML structure, 
	including its child elements, text nodes, and attributes. 
	When setting the innerHTML property, 
	any existing content within the element is replaced with the new HTML content.

	const divElement = document.getElementById("myDiv");
	divElement.innerHTML = "<p>Hello, world!</p>";

	After executing this code, the <div> element 
	will contain a single <p> element with the text "Hello, world!".
	
	It's important to note that setting the innerHTML property to a value 
	that contains user-generated content can create a security risk if 
	the content is not properly sanitized to prevent cross-site scripting (XSS) attacks.

	
	*/
	for (const v of superheroesToDisplay) {
		let row = tbody.insertRow()
		// create table cells
		let imgCell = row.insertCell()
		let nameCell = row.insertCell()
		let fnameCell = row.insertCell()
		let powerstatsCell = row.insertCell()
		let raceCell = row.insertCell()
		let genderCell = row.insertCell()
		let heightCell = row.insertCell()
		let weightCell = row.insertCell()
		let POBCell = row.insertCell()
		let alignmentCell = row.insertCell()

		/*
		.insertRow() is a method that is used to add a new row to a table. 
		It is used with the HTMLTableElement interface to insert a new row 
		at a specified position within the table.
		*/

		// insert to table cells
		imgCell.innerHTML = `<img src="${v.images.xs}"/>`
		/*
		imgCell.innerHTML = <img src="${v.images.xs}"/>is a line of code 
		in JavaScript that sets the innerHTML property 
		of an HTML element imgCell to a string that contains an<img>tag. 
		The src attribute of the<img>tag is set to the value of the xs property 
		of an object `v` that contains image information.

		Here, the ${} syntax is used for string interpolation, 
		which allows us to embed JavaScript expressions inside a string. 
		In this case, the value of v.images.xs is dynamically 
		inserted into the string at runtime.

		For example, suppose v.images.xs contains the URL of a small-sized image file. 
		The following code sets the innerHTML property of an HTML element 
		with an id of imgCell to an <img> tag that displays the image:
		This code first gets a reference to the HTML element with an id 
		of imgCell using document.getElementById(), 
		and then sets its innerHTML property to the <img> tag with the src attribute 
		set to the value of v.images.xs. 
		When this code runs, the image specified by the src attribute will be 
		displayed in the HTML element.
		
		*/
		nameCell.innerText = v.name
		fnameCell.innerText = v.biography.fullName

		for (let stat in v.powerstats) {
			powerstatsCell.innerText += `${stat}: ${v.powerstats[stat]}\n`
		}

		/*
		The code for (let stat in v.powerstats) { powerstatsCell.innerText += ${stat}: ${v.powerstats[stat]}\n } 
		is a for-in loop that iterates over the properties of an object v.powerstats 
		and displays them in a string format in an HTML element powerstatsCell.

		Inside the loop, the innerText property of an HTML element powerstatsCell is 
		updated using the += operator to append the new string of each powerstat 
		to the previous value of innerText. The ${} syntax is used again to dynamically 
		insert the stat and its corresponding value from the v.powerstats object into the string.

		We need to use it to dynamically update the text content of an HTML element 
		powerstatsCell with the powerstats information of a character v.
		
		In the code, the += operator is used to append the new powerstat information to the 
		previous content of powerstatsCell.innerText. 
		The string template ${stat}: ${v.powerstats[stat]}\n dynamically interpolates the 
		powerstat name and its corresponding value for each iteration of the for-in loop.
		
		Without this line of code, the powerstat information would not be displayed on the webpage. 
		Instead, the innerText property of the powerstatsCell element would remain empty or unchanged.
		*/

		raceCell.innerText = v.appearance.race
		genderCell.innerText = v.appearance.gender
		heightCell.innerText = v.appearance.height
		weightCell.innerText = v.appearance.weight
		POBCell.innerHTML = v.biography.placeOfBirth
		alignmentCell.innerHTML = v.biography.alignment
		tbody.appendChild(row)

		/*
		The appendChild() method is used to add a new element as the last child of a parent element.
		In the code you provided earlier, tbody is a reference to the table body element to which 
		we want to add a new row. row is a reference to the newly created 
		row element containing the character information.
		
		By calling tbody.appendChild(row), we add the newly created row as the last child of the tbody element, 
		which adds it to the bottom of the table.
		In other words, this line of code appends the newly created row to the end of the table, 
		allowing us to display the character information in a new row each time we 
		iterate over the array of characters.
		*/
	}
	displayPagination()
}

// Display pagination buttons
function displayPagination() {
	const totalPages = Math.ceil(superheroes.length / pageSize)
	let html = ""
	for (let i = 1; i <= totalPages; i++) {
		html += `<button class="pagination-button ${i === currentPage ? "active" : ""
			}" data-page="${i}">${i}</button>`
		/*
		class="pagination-button": 
		This adds the pagination-button class to the button element,
		which is used to style the buttons.
		 
		${i === currentPage ? "active" : ""}: 
		This uses a ternary operator to conditionally add the active 
		class to the button element if the page number (i) matches 
		the current page (currentPage). 
		This is used to visually indicate which page the user is currently on. 
		If the page number does not match the current page, 
		an empty string is added instead.

		data-page="${i}": 
		This adds a data-page attribute to the button element 
		with the value of the page number (i). 
		This attribute is used to identify which page a button represents.

		${i}: 
		This adds the page number as the text content of the button element.
		By using template literals, we can dynamically generate the HTML content 
		for the button element based on the current page number (i) 
		and the current page (currentPage). 
		This allows us to easily generate and update the pagination buttons 
		based on user input or other events.
		 */
	}
	pagination.innerHTML = html
	addPaginationEventListeners()
}

/*
Pagination is used when there is a large amount of data 
that cannot be displayed on a single page or screen. 
Instead, the data is split into smaller, more manageable chunks called pages. 
Pagination buttons allow the user to navigate through the pages, 
displaying a new set of data on each page.

In this code block, we are generating the HTML content for the pagination buttons 
using a for loop that iterates through each page number from 1 
to the total number of pages (totalPages).

For each page number, we are creating a button element and assigning it 
the pagination-button class. 
We are also adding a data-page attribute with the value of the page number, 
which can be used to identify which page a button represents.

In addition, we are using a ternary operator to conditionally add the active class 
to the button element if the page number matches the currentPage. 
This is used to visually indicate which page the user is currently on.

After generating the HTML content for the pagination buttons, 
we are setting the innerHTML property of the pagination element 
to the html string variable, which displays the buttons on the page.

Overall, this code block is responsible for dynamically generating the HTML content 
for the pagination buttons, and updating the page with the new set of buttons 
each time the displayPagination() function is called.

*/

// Add event listeners to pagination buttons
function addPaginationEventListeners() {
	const paginationButtons = document.querySelectorAll(".pagination-button")
	/*
	This line selects all elements with the class name "pagination-button" 
	and stores them in a constant variable called paginationButtons. 
	These elements are likely the pagination buttons on the webpage.
	*/
	for (const button of paginationButtons) {
		button.addEventListener("click", () => {
			/*
			This line adds an event listener to each button in the paginationButtons array. 
			The event being listened for is a click.
			 */
			currentPage = parseInt(button.dataset.page)
			/*
			parseInt() is a built-in function that takes a string as input and returns an integer. 
			It parses the string and extracts the numeric value, 
			ignoring any non-numeric characters at the beginning or end of the string.
			 */
			displaySuperheroes()
		})
	}
}

// Event listener for page size selection
// pageSizeSelect.addEventListener("change", () => {
// 	pageSize = parseInt(pageSizeSelect.value)
// 	currentPage = 1
// 	displaySuperheroes()
// })
pageSizeSelect.addEventListener("change", () => {
	/*
	This line sets up an event listener for the change event on the pageSizeSelect element. 
	When the change event occurs (i.e., when the user selects a new option from the drop-down menu), 
	the code inside the callback function will execute.
	 */
	const selectedValue = pageSizeSelect.value;
	/*
	This line retrieves the value of the currently selected option in 
	the pageSizeSelect drop-down menu and assigns it to a variable called selectedValue. 
	This value will be used to determine the new page size.
	 */
	if (selectedValue === "all") {
		pageSize = superheroes.length;
	} else {
		pageSize = parseInt(selectedValue);
	}
	/*
	This code block checks whether the selected value is equal to the string "all". 
	If it is, the pageSize variable is set to the total number of superheroes 
	in the superheroes array. Otherwise, selectedValue is converted to an 
	integer using parseInt() and assigned to pageSize.
	 */
	currentPage = 1;
	/*
	This line sets the currentPage variable to 1. 
	This ensures that when the page size is changed, 
	the user is always taken back to the first page of superheroes.
	 */
	displaySuperheroes();
});

/*
In summary, this code sets up an event listener for the change event on the pageSizeSelect element. 
When the user selects a new option from the drop-down menu, 
the code retrieves the selected value, updates the pageSize variable accordingly, 
sets the currentPage variable to 1, and updates the displayed superheroes on the webpage.
 */



// Initialize page size selection
pageSizeSelect.value = defaultPageSize

/*This code caches the cell.parentNode value in the rows array using Array.from().
It also checks if the searchQuery is empty and shows all rows if it is. Finally
it uses a for loop instead of a for...of loop for better performance, 
and caches the row value for each cell.
*/


searchInput.addEventListener("input", (e) => {
	/* The function is adding an event listener to the search input. 
	When the user types in the search input, 
	the code will search the table for the text the user typed in. 
	If the text is found, the row will be displayed. 
	If the text is not found, the row will be hidden. */

	/* Selecting all the cells in the second column of the table. */
	const cells = table.querySelectorAll("td:nth-child(2)")
	/*
	"td:nth-child(2)" is a CSS selector that selects all td elements 
	that are the second child of their parent element. 
	In the context of the code you provided, it selects all the td elements in the second column of the table.

	The :nth-child() pseudo-class is used to select elements based on their position among their siblings. 
	In this case, :nth-child(2) selects all elements that are the second child of their parent.

	The td element is a table cell in HTML, and it represents one cell in a table. 
	By selecting all td elements in the second column of the table, we can isolate 
	the column we want to search through for the search functionality.

	In other words, it selects all the cells in the second column of the table. 
	We need to use this line to get the cells in the column 
	that we want to search through when the user types something in the search box.
	
	By selecting only the cells in the second column, 
	we can ignore the other columns and focus only on the column that is relevant to our search. 
	This makes our search more efficient and improves performance, 
	especially if the table contains many rows and columns.
	*/

	/* Getting the value of the search input and converting it to lowercase. */
	const searchQuery = e.target.value.trim().toLowerCase()

	const rows = Array.from(cells, (cell) => cell.parentNode) // Cache rows
	/*
	const rows = Array.from(cells, (cell) => cell.parentNode) 
	creates an array of all the parent nodes of each td element in the cells array.
	
	cells is an array of all the td elements in the second column of the table.
	Array.from() is a built-in JavaScript method that creates a new array 
	from an iterable object. In this case, cells is the iterable object.
	The second argument to Array.from() is a map function that is called for each element 
	in the cells array. The map function takes each td element as its argument and 
	returns its parent node (i.e., the tr element that contains it).
	The resulting array rows contains all the tr elements that 
	correspond to the td elements in the cells array.
	The rows array is used later in the code to show or hide the rows 
	of the table based on the search query entered by the user.
	*/

	/* The above code is filtering the table rows based on the search query. */
	if (!searchQuery) {
		// Show all rows if searchQuery is empty
		rows.forEach((row) => (row.style.display = "table-row"))
		return
	}
	/*
	This block of code is checking if the search query entered by the user is empty. 
	If it is, it will show all the rows in the table. 
	This is achieved by setting the display CSS property of each row to table-row. 
	Finally, the return statement is used to exit the event listener function and prevent further execution.
	 */
	for (let i = 0; i < cells.length; i++) {
		const cell = cells[i]
		const row = rows[i]
		const cellText = cell.textContent.trim().toLowerCase()
		if (cellText.includes(searchQuery)) {
			row.style.display = "table-row"
		} else {
			row.style.display = "none"
		}
	}
})
/*
This block of code is executed if the search query is not empty. 
It loops over each cell in the cells array and compares its text 
content with the search query. If the search query is found in 
the cell text content, the corresponding row is shown by setting 
its display property to table-row. Otherwise, the row is hidden 
by setting its display property to none.

Overall, this code updates the display of the table rows based on 
the search query entered by the user. It shows all rows if the search 
query is empty, and only shows rows that match the search query otherwise.
*/

let sortOrder = -1
/*
This variable is used to keep track of the current sort order of the table. 
In the context of the code, it is used to sort the table columns in ascending 
or descending order when the user clicks on the column header.

When the user clicks on a column header, the sortTable function is called and 
it toggles the value of sortOrder between -1 and 1. If sortOrder is -1, the 
table is sorted in descending order, and if sortOrder is 1, the table 
is sorted in ascending order.
*/

// converting meter value to centimeter integer value
function convertMeterToCM(data) {
	let splitOnComma = data.split(",")
	let measurementType = splitOnComma[1].split(" ")[1]
	let measurementValue = splitOnComma[1].split(" ")[0]
	if (parseInt(splitOnComma[0].split(" "))) {
		if (measurementType === "cm") {
			return parseInt(measurementValue)
		} else if (measurementType === "meters") {
			return parseInt(measurementValue * 100)
		}
	}
}
/*
let splitOnComma = data.split(",") - 
This line splits the data string into an array by comma, 
and assigns it to a variable splitOnComma.
let measurementType = splitOnComma[1].split(" ")[1]
extracts the measurement type (either "cm" or "meters") 
from the second item in the splitOnComma array, 
and assigns it to a variable measurementType.
let measurementValue = splitOnComma[1].split(" ")[0] 
extracts the measurement value (a number) from the second item 
in the splitOnComma array, and assigns it 
to a variable measurementValue.
if (parseInt(splitOnComma[0].split(" "))) {
checks if the first item in the splitOnComma array is a number. 
If it is, the code inside the if statement 
will be executed, otherwise it will be skipped.
if (measurementType === "cm") { 
checks if the measurement type is "cm". 
If it is, the measurement value is already in 
centimeters, so it is returned as an integer using parseInt.
} else if (measurementType === "meters") {
checks if the measurement type is "meters". 
If it is, the measurement value is in meters, 
so it is converted to centimeters by multiplying it by 100, 
and the result is returned as an integer using parseInt.
 */

// converting lb to integer value
function convertToLB(data) {
	let splitOnComma = data.split(",")[0].split(" ")
	if (splitOnComma[1] === "lb") {
		if (isNaN(parseInt(splitOnComma[0]))) {
			return undefined
		} else {
			return parseInt(splitOnComma[0])
		}
	}
}

function getFullPower(data) {
	let sum = 0
	let splitOnNewLine = data.split("\n")
	/*
	A new variable splitOnNewLine is created and initialized with an array of substrings 
	split from the data string using the newline character \n as the separator. 
	This creates an array where each element is a separate line of the original string.
	 */

	for (let i = 0; i < splitOnNewLine.length; i++) {
		let num = parseInt(splitOnNewLine[i].split(" ")[1])
		/*
		A new variable num is created and assigned the integer value 
		of the second item in each line, which is obtained by splitting 
		each line into an array of substrings using the space character " " as the separator, 
		and then using the parseInt function to convert the second substring to an integer. 
		If the second substring is not a valid integer, 
		then num will be set to NaN (Not a Number).
		 */
		if (!isNaN(num)) {
			/*
			The if statement checks whether num is a valid number by using the isNaN function, 
			which returns true if the value is NaN. If num is not NaN, 
			then the block of code inside the if statement will execute.
			 */
			sum += num
		}
	}
	return sum
}

// for height - get the cm number from the height column and the corresponding row to that height column
// sort it and return the corresponding row to the sorted list

// sort table reorders the row based on a given column index
function sortTable(columnIndex) {
	let rows = table.rows
	let rowData = {}
	let parsedData = []

	// index starting at one to not include the column name
	for (let i = 1; i < rows.length; i++) {
		let row = rows[i]
		let columnName = rows[0].cells[columnIndex].textContent
		/*
		This line creates a new variable columnName and assigns it to the text content 
		of the cell in the first row and the specified columnIndex. 
		This is the header of the column, 
		which is used as the key in the resulting data object.
		 */
		let cell = row.cells[columnIndex] // get the column values from each row
		let data = cell.innerText
		let dataObj = {}

		switch (columnName) {
			case "Height":
				let heightInCm = convertMeterToCM(data)
				// store the height with its corresponding row
				dataObj = { row: row, height: heightInCm }
				if (!rowData[heightInCm]) {
					rowData[heightInCm] = []
				}
				/*
				This line checks if the rowData object already has a key 
				for the heightInCm value. 
				If not, it creates a new empty array for that key.
				*/
				rowData[heightInCm].push(dataObj.row)
				// store the height in numbers
				parsedData.push(heightInCm)
				break
			case "Weight":
				let weightInKg = convertToLB(data)
				// store the weight with its corresponding row
				dataObj = { row: row, weight: weightInKg }
				if (!rowData[weightInKg]) {
					rowData[weightInKg] = []
				}
				rowData[weightInKg].push(dataObj.row)
				// store the weight in numbers
				parsedData.push(weightInKg)
				break
			case "Powerstats":
				let power = getFullPower(data)
				// store the power with its corresponding row
				dataObj = { row: row, power: power }
				if (!rowData[power]) {
					rowData[power] = []
				}
				rowData[power].push(dataObj.row)
				// store the weight in numbers
				parsedData.push(power)
				break
			default:
				if ((data === "") | (data === "-")) {
					data = undefined
				}
				dataObj = { row: row, data: data }
				if (!rowData[data]) {
					rowData[data] = []
				}
				rowData[data].push(dataObj.row)
				parsedData.push(data)
				break
		}
	}

	// sort the data
	parsedData.sort((a, b) => {
		let result = a > b ? -1 : 1
		return result * sortOrder
	})

	sortOrder = -sortOrder

	/*
	This line calls the sort() method on the parsedData array, 
	and passes in a function that compares two elements a and b.
	This line creates a new variable result that is either -1 
	(if a is greater than b) or 1 (if a is less than or equal to b). 
	This will sort the array in descending order.
	This line returns the result multiplied by the sortOrder variable. 
	If sortOrder is positive, this will sort the array in ascending order. 
	If sortOrder is negative, this will sort the array in descending order.
	This line negates the value of sortOrder, flipping it from positive 
	to negative or from negative to positive. 
	This means that if the function is called again, 
	it will sort the array in the opposite order from before.
	 */

	// Re-create the table from the sorted row data and append rows in the new order
	for (let i = 0; i < parsedData.length; i++) {
		let data = parsedData[i]
		let rows = rowData[data]
		for (let j = 0; j < rows.length; j++) {
			tbody.appendChild(rows[j])
	/*
This line appends the current row in the loop 
to the end of the tbody element in the HTML table. 
This effectively rearranges the table rows based 
on the order of the data in parsedData.
	 */
		}
	}
}
