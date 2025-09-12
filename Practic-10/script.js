let show = document.getElementById("show")

let arr = JSON.parse(localStorage.getItem("arr")) || []

showItem(arr)



function setLocal(array) {
    localStorage.setItem("arr", JSON.stringify(array))

    showItem(arr)
    location.reload()
}


let name = document.getElementById("name")
let price = document.getElementById("price")
let rate = document.getElementById("rate")
let img = document.getElementById("img")

function add() {
    let obj = {
        id: Math.round(Math.random() * 10000),

        name: name.value,
        price: price.value,
        rate: rate.value,
        img: img.value

    }

    if (img.name != "") {
        let newArr = arr.map((ele) => {
            if (ele.id == img.name) {
                ele = obj;
            }
            return ele;
        })
        setLocal(newArr)
    }
    else {
        arr.push(obj)

        setLocal(arr)
    }


    location.reload()

}


function del(id) {
    let newarr = arr.filter((ele) => ele.id != id)

    setLocal(newarr)
    location.reload()
}


function edit(id) {
    let newObj = arr.find((ele) => ele.id == id)
    console.log(newObj)
    img.value = newObj.img
    name.value = newObj.name
    price.value = newObj.price
    rate.value = newObj.rate
    img.name = id;
}

function showItem() {
    show.innerHTML = ""
    arr.map((ele) => {
        const card = `
 <div class="col">
  <div class="card position-relative" style="width: 18rem;">
    <button onclick="del(${ele.id})" class="position-absolute rounded-circle btn-danger btn" style="right:10px; top:10px"><i class="ri-delete-bin-5-line"></i></button>
    <img src="${ele.img}" class="card-img-top img-fluid" width="70%" alt="...">
    <div class="card-body">
      <h5 class="card-title">${ele.name}</h5>
      <p class="card-text">${ele.price}</p>
      <p class="card-text">${ele.rate}</p>
      <a onclick="edit(${ele.id})" class="btn btn-primary btn-sm"><i class="ri-edit-2-line"></i></a>
           <button class="btn btn-secondary btn-sm w-50">More</button>
    </div>
  </div>

</div>
`
        show.innerHTML += card

    })

}


function low() {
    let newData = data.sort((a, b) => a.price - b.price)

    showItem(newData)
}


function high() {
    let newData = data.sort((a, b) => b.price - a.price)
    showItem(newData)
}