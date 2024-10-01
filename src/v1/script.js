const CATEGORIES = [
  { name: "tecnology", color: ":#ff0000" },
  { name: "society", color: ":#528f19" },
  { name: "politics", color: ":#d4681a" },
  { name: "entertainment", color: ":##800080" },
  { name: "science", color: ":#dda0dd" },
  { name: "history", color: ":#6495ed" },
  { name: "health", color: ":#00ffff" },
];

//Selecting DOM elements that contain the selected value
const btn = document.querySelector(".btn_open"); //connects javascript to the wanna share button html
const form = document.querySelector(".form");
const fact_lol = document.querySelector(".fact_");
//Creating the DOM elements
fact_.innerHTML = "";
//Form Visibility
btn.addEventListener("click", function () {
  /*event handler that opens form when clicked*/ if (
    form.classList.contains("hidden")
  ) {
    form.classList.remove("hidden"); /*removes hidden css property*/
    btn.textContent = "Close"; /*changes button to close*/
  } else {
    form.classList.add("hidden"); /*form reappers after clicking*/
    btn.textContent =
      "Wanna Share a fact?"; /*rechanges button name to wanna share*/
  }
});

//function for calculating how old the fact is
function CalAgeOfFact(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  if (age >= 0) {
    //checks for invalid year
    return age;
  } else {
    return `Year is invalid, year needs to be less than or equal to ${currentYear}`;
  }
}

console.log(CalAgeOfFact(2028)); //passing the year 2020 in the function to calculate age of fact

const calfactage = (
  year //arrow function to calculate age of fact same as above
) =>
  year <= new Date().getFullYear() //ternary operator
    ? new Date().getFullYear() - year
    : `Year is invalid, year needs to be less than or equal to ${new Date().getFullYear()}`;
console.log(calfactage(3000));

[2, 4, 6, 8].forEach(function (num) {
  console.log(num);
});
async function loadFacts() {
  const res = await fetch(
    "https://bjtmblhskgmmkjytxyds.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey: "abcdefghijklmnopqrstuvwxyz",
        authorization: "abcdefhgj",
      },
    }
  );

  const data = await res.json();

  createFactsList(data);

  console.log(data);
}
loadFacts();

function createFactsList(dataArray) {
  const factList = document.querySelector(".fact_list_"); // .fact_list_"

  const htmlArr = dataArray.map(
    (fact) => `
      <li class="fact"> 
        <p>
          ${fact.text}
          <a
            class="source"
            href="${fact.source}"
            target="_blank"
          >(Source)</a>
        </p>                                                       
       <span class="tag" style="background-color:red"> ${fact.category}</span>   
      
        
      </li>`
  );

  const html = htmlArr.join("");
  fact_.insertAdjacentHTML("afterbegin", html); // Use insertAdjacentHTML to insert HTML
}

// Call loadFacts function to load facts

/* const data = await res.json();
const FilteredData = data.filter((fact) => fact.category === "TECH");
createFactsList(data);
console.log(data); // Output original data
createFactsList(FilteredData); // Output filtered data
 */
// CATEGORIES.find((element) => element.name === fact.category).color getting a type error
// }
