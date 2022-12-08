let chart, chart2, chart3, chart4, chart5;
const ENDPOINT_RECIPES = `https://recipesfa.azurewebsites.net/api/eindproject/recipes`;

// Close Modal window
const closePopup = async () => {
  let popup = document.querySelector(".js-popup-button");
  popup.addEventListener("click", function () {
    // Steek de class van de popup in een list
    var close = document.querySelector(".js-popup");
    // Zet de class c-popup-hide op de popup
    close.classList.add("c-popup-hide");
    // Verwijder de class c-popup-show van de popup
    close.classList.remove("c-popup-show");
    // Verwijder de class c-overlay zodat de overlay verdwijnt
    document.querySelector(".js-overlay").classList.remove("c-overlay");

    // document.location.reload();
  });
};

// Show Modal Window
const ListenToClick = async () => {
  const cards = document.querySelectorAll(".js-card");
  for (let c of cards) {
    c.addEventListener("click", function () {
      document.querySelector(".js-popup").classList.add("c-popup-show");
      document.querySelector(".js-popup").classList.remove("c-popup-hide");
      document.querySelector(".js-overlay").classList.add("c-overlay");
      getRecipesDetail(c.id);
    });
  }
};

// Show one recipe
const ShowRecipeDetail = async (data) => {
  const title = document.querySelector(".js-popup__title"),
    image = document.querySelector(".js-popup__img"),
    summary = document.querySelector(".js-popup__summary");

  for (let r of data) {
    title.innerHTML = r.title;
    image.src = r.image;
    summary.innerHTML = r.summary;

    // Variabelen van voedingstoffen wat je mag per dag en wat er in het recept zit.

    var ProteinInRecipe = r.nutrients[4].amount;
    var DailyNeedProtein = 80;

    var SugarInRecipe = r.nutrients[3].amount;
    var DailyNeedsSugar = 40;

    var CarbsInRecipe = r.nutrients[2].amount;
    var DailyNeedsCarbs = 300;

    var CaloriesInRecipe = r.nutrients[0].amount;
    var DailyNeedsCalories = 2000;

    var FatInRecipe = r.nutrients[1].amount;
    var DailyNeedsFat = 111;

    // Update de chart met de nieuwe data
    if ((chart, chart2, chart3, chart4, chart5)) {
      chart.data.datasets[0].data = [ProteinInRecipe, DailyNeedProtein];
      chart2.data.datasets[0].data = [CarbsInRecipe, DailyNeedsCarbs];
      chart3.data.datasets[0].data = [FatInRecipe, DailyNeedsFat];
      chart4.data.datasets[0].data = [CaloriesInRecipe, DailyNeedsCalories];
      chart5.data.datasets[0].data = [SugarInRecipe, DailyNeedsSugar];
      // Return de update van de chart
      return (
        chart.update(),
        chart2.update(),
        chart3.update(),
        chart4.update(),
        chart5.update()
      );
    }

    // Protein Chart
    const protein = document.getElementById("proteinChart");
    chart = new Chart(protein, {
      type: "doughnut",
      data: {
        labels: ["Recipe protein in grams", "Daily needs protein in grams"],
        datasets: [
          {
            data: [ProteinInRecipe, DailyNeedProtein],
            backgroundColor: ["#48914D", "#864A15"],
          },
        ],
      },
    });

    // Carbs Chart

    const carbs = document.getElementById("carbsChart");
    chart2 = new Chart(carbs, {
      type: "doughnut",
      data: {
        labels: ["Recipe carbs in grams", "Daily needs carbs in grams"],
        datasets: [
          {
            data: [CarbsInRecipe, DailyNeedsCarbs],
            backgroundColor: ["#48914D", "#864A15"],
          },
        ],
      },
      options: {},
    });

    // Fat Chart

    const fat = document.getElementById("fatChart");
    chart3 = new Chart(fat, {
      type: "doughnut",
      data: {
        labels: ["Recipe fat in grams", "Daily needs fat in grams"],
        datasets: [
          {
            data: [FatInRecipe, DailyNeedsFat],
            backgroundColor: ["#48914D", "#864A15"],
          },
        ],
      },
    });

    // Calories Chart

    const calories = document.getElementById("caloriesChart");
    chart4 = new Chart(calories, {
      type: "doughnut",
      data: {
        labels: ["Recipe calories", "Daily needs calories"],
        datasets: [
          {
            data: [CaloriesInRecipe, DailyNeedsCalories],
            backgroundColor: ["#48914D", "#864A15"],
          },
        ],
      },
      options: {},
    });

    // Sugar Chart

    const sugar = document.getElementById("sugarChart");
    chart5 = new Chart(sugar, {
      type: "doughnut",
      data: {
        labels: ["Recipe sugar in grams", "Daily needs sugar in grams"],
        datasets: [
          {
            data: [SugarInRecipe, DailyNeedsSugar],
            backgroundColor: ["#48914D", "#864A15"],
          },
        ],
      },
      options: {},
    });
  }
  closePopup();
};

// Get one recipe
const getRecipesDetail = async (id) => {
  console.log(id);

  // Gebruik maken van de fetch API om de data op te halen
  const request = await fetch(ENDPOINT_RECIPES + "/" + id);
  const data = await request.json();
  console.log("het recept is", id, "word doorgestuurd om in te lezen");
  ShowRecipeDetail(data);
};

// Show all recipes
const ShowHighRecipes = async (data) => {
  let card = ``;
  for (let r of data) {
    if (r.nutrients[0].amount >= 700) {
      card += `
      <button class="c-card-container o-button-reset js-card" id="${r.id}">
        <div class="c-card">
            <div class="c-card__cat c-card__cat--high"> <p>High <br> cal.</p> </div>
            <img class="c-card__img" alt="" src="${r.image}">
            <p class="c-card__text">${r.title}</p>
        </div>
      </button>
    `;
    }
  }

  document.getElementById("js-cards").innerHTML = card;

  ListenToClick();
};

// Show all recipes
const ShowLowRecipes = async (data) => {
  let card = ``;

  for (let r of data) {
    if (r.nutrients[0].amount < 600) {
      card += `
      <button class="c-card-container o-button-reset js-card" id="${r.id}">
        <div class="c-card">
            <div class="c-card__cat c-card__cat--low"> <p>Low <br> cal.</p> </div>
            <img class="c-card__img" alt="" src="${r.image}">
            <p class="c-card__text">${r.title}</p>
        </div>
      </button>
    `;
    }
  }

  document.getElementById("js-cards").innerHTML = card;

  ListenToClick();
};

// Show all recipes
const ShowRecipes = async (data) => {
  let card = ``;

  for (let r of data) {
    // console.log(r);
    // console.log(r.id);
    if (r.nutrients[0].amount >= 700) {
      card += `
      <button class="c-card-container o-button-reset js-card" id="${r.id}">
        <div class="c-card">
            <div class="c-card__cat c-card__cat--high"> <p>High <br> cal.</p> </div>
            <img class="c-card__img" alt="" src="${r.image}">
            <p class="c-card__text">${r.title}</p>
        </div>
      </button>
    `;
    } else if (r.nutrients[0].amount < 600) {
      card += `
      <button class="c-card-container o-button-reset js-card" id="${r.id}">
        <div class="c-card">
            <div class="c-card__cat c-card__cat--low"> <p>Low <br> cal.</p> </div>
            <img class="c-card__img" alt="" src="${r.image}">
            <p class="c-card__text">${r.title}</p>
        </div>
      </button>
    `;
    }
  }

  document.getElementById("js-cards").innerHTML = card;
  ListenToClick();
};

// Get all recipes
const getRecipes = async (recipes) => {
  // console.log(recipes);
  // Gebruik maken van de fetch API om de data op te halen
  const request = await fetch(recipes);
  const data = await request.json();
  // console.log("data word doorgestuurd");
  ShowRecipes(data);
  filterByCalories(data);
};

// Filter by calories
const filterByCalories = (data) => {
  const filterItems = document.querySelectorAll(".js-filter-items");

  for (let item of filterItems) {
    item.addEventListener("click", (e) => {
      console.log(e.currentTarget.id);
      if (e.currentTarget.id === "high") {
        ShowHighRecipes(data);
      } else if (e.currentTarget.id === "low") {
        ShowLowRecipes(data);
      } else if (e.currentTarget.id === "all") {
        ShowRecipes(data);
      }
    });
  }
};

// DOM
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded");
  getRecipes(ENDPOINT_RECIPES);
  filterByCalories();
});
