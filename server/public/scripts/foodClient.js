console.log("Foods sourced!")

function getFoods(){
    console.log("Getting Food!")
    axios({
        method: 'GET',
        url: '/foods'
        }).then(function(response) {
            console.log(response.data);
            renderFoods(response.data);
        }).catch(function(error){
            console.log('error in GET', error);
        });
}

function renderFoods(data){
    console.log("Rendering Food!")
    const foods = document.getElementById('viewFoods');
    foods.innerHTML = ''

    for(let i = 0; i < data.length; i+= 1) {
        let index = data[i];
        foods.innerHTML += `
        <tr data-foodid=${index.id}>
            <td>${index.food}</td>
            <td>${index.mealtime}</td>
            <td><button onclick="deleteFood(event)">Delete</button></td>
        </tr>        
        `;
    }
}

function addFood(event){
    event.preventDefault();
    console.log("Adding new Food!")
    let food = document.getElementById('food').value;
    let mealtime = document.getElementById('meal').value;
    document.getElementById('food').value = '';
    document.getElementById('meal').value = '';
    console.log(food, mealtime)

    axios({
        method: 'POST',
        url: '/foods',
        data: {
            food: food,
            mealTime: mealtime
        }
    }).then(function(response) {
        getFoods();
    }).catch(function(error) {
        console.log("error in POST", error);
    })

}

function deleteFood(event) {
    event.preventDefault();
    console.log("Deleting Food Entry!")
    let foodTarget = event.target.closest('tr').getAttribute('data-foodid')
    console.log(foodTarget)
    axios({
        method: 'DELETE',
        url: `/foods/${foodTarget}`
    }).then(function(response) {
        getFoods();
    }).catch(function(error){
        console.log("error in DELETE", error)
    })
}


getFoods()