// dom stuff
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");

// targeting the div where images will be and images
let userClicks = 0;
let maxClicks = 25;

// constructor that makes products objects
function Product(name) {
  this.name = name;
  this.src = `./images/${name}.jpg`;
  this.views = 0;
  this.clicks = 0;
}

// array of products
const products = [
  new Product("bag"),
  new Product("banana"),
  new Product("bathroom"),
  new Product("boots"),
  new Product("breakfast"),
  new Product("bubblegum"),
  new Product("chair"),
  new Product("dog-duck"),
  new Product("dragon"),
  new Product("pen"),
  new Product("pet-sweep"),
  new Product("scissors"),
  new Product("shark"),
  new Product("sweep"),
  new Product("tauntaun"),
  new Product("unicorn"),
  new Product("water-can"),
  new Product("wine-glass"),
];

// function to randomly get index
function randomProdIdx() {
  return Math.floor(Math.random() * products.length);
}
// function that puts 3 random products on the page in the 3 img tags
function renderProducts() {
  // get 3 indexes from our products array
  let prod1 = randomProdIdx();
  let prod2 = randomProdIdx();
  let prod3 = randomProdIdx();

  // make sure they arent the same
  while (prod1 === prod2 || prod1 === prod3 || prod2 === prod3) {
    prod2 = randomProdIdx();
    prod3 = randomProdIdx();
  }

  // change src and alt attributes
  img1.src = products[prod1].src;
  img2.src = products[prod2].src;
  img3.src = products[prod3].src;
  img1.alt = products[prod1].name;
  img2.alt = products[prod2].name;
  img3.alt = products[prod3].name;

  // increase views
  products[prod1].views++;
  products[prod2].views++;
  products[prod3].views++;
}

// handle what happens when click the image
// the "clicks" property of the image I click to go up by 1
// render 3 new imgs
function handleImgClick(e) {
  //check if the user has run out of clicks

  if (userClicks >= maxClicks) {
    alert("You have reached the maximum number of votes.");
    return; // end function here
  }

  // increase clicks by one
  userClicks++;
  // get name of product clicked
  let clickedProduct = e.target.alt;

  // increase clicks of product
  for (let i = 0; i < products.length; i++) {
    if (clickedProduct === products[i].name) {
      products[i].clicks++;
      break;
    }
  }

  //render 3 more imgs
  renderProducts();
}

img1.addEventListener("click", handleImgClick);
img2.addEventListener("click", handleImgClick);
img3.addEventListener("click", handleImgClick);

const voteData = [];
const viewData = [];

// Function to update the chart with the collected data
function updateChart() {
  const ctx = document.getElementById("voteChart").getContext("2d");

  // Create data for chart
  const data = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: "Votes",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: voteData,
      },
      {
        label: "Views",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        data: viewData,
      },
    ],
  };

  // Create chart
  const myBarChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// button to view results
function showResults() {
  // put a bunch of lis into ul
  const results = document.getElementById("results");
  results.innerHTML = "";

  // loop thru prods and make an li for each one
  for (let i = 0; i < products.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${products[i].name}: was viewed ${products[i].views} times, and clicked ${products[i].clicks} times.`;
    results.appendChild(li);

    voteData.push(products[i].clicks);
    viewData.push(products[i].views);
  }

  updateChart();
}

// make the button show results
const viewResults = document.getElementById("view-results");
viewResults.addEventListener("click", showResults);

renderProducts();
