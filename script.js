let data = {

protein:[
{name:"Telur",price:2000},
{name:"Ayam",price:8000}
],

karbo:[
{name:"Nasi",price:3000},
{name:"Kentang",price:4000}
],

buah:[
{name:"Pisang",price:2000},
{name:"Pepaya",price:3000}
],

sayur:[
{name:"Wortel",price:1500},
{name:"Bayam",price:1500}
]

}

let current="protein"
let cart=[]


function showCategory(cat){

current=cat
document.getElementById("categoryTitle").innerText=cat

let container=document.getElementById("items")

container.classList.add("animate__animated","animate__fadeIn")

renderItems()

setTimeout(()=>{
container.classList.remove("animate__animated","animate__fadeIn")
},500)

}



function renderItems(){

let html=""

data[current].forEach((item,i)=>{

html+=`

<div class="card animate__animated animate__fadeInUp">

<h4 class="font-bold">${item.name}</h4>

<input type="number"
value="${item.price}"
onchange="updatePrice(${i},this.value)"
class="border p-1 w-full my-2">

<button onclick="selectItem(${i})"
class="bg-blue-500 text-white px-3 py-1 rounded">
Pilih
</button>

<button onclick="deleteItem(${i})"
class="bg-red-500 text-white px-3 py-1 rounded">
Hapus
</button>

</div>

`

})

document.getElementById("items").innerHTML=html

}



function updatePrice(i,val){
data[current][i].price=parseInt(val)
}



function deleteItem(i){

let cards=document.querySelectorAll("#items .card")
let card=cards[i]

card.classList.add("animate__animated","animate__fadeOut")

setTimeout(()=>{

data[current].splice(i,1)
renderItems()

},300)

}



function addItem(){

let name=prompt("Nama bahan")
let price=prompt("Harga")

data[current].push({
name,
price:parseInt(price)
})

renderItems()

let container=document.getElementById("items")

container.classList.add("animate__animated","animate__bounceIn")

setTimeout(()=>{
container.classList.remove("animate__animated","animate__bounceIn")
},600)

}



function selectItem(i){

let item=data[current][i]

cart.push({
name:item.name,
price:item.price,
qty:1
})

renderCart()

let cartBox=document.getElementById("cart")

cartBox.classList.add("animate__animated","animate__pulse")

setTimeout(()=>{
cartBox.classList.remove("animate__animated","animate__pulse")
},500)

document.getElementById("totalCart").innerText=cart.length

}



function renderCart(){

let html=""
let total=0

cart.forEach((item,i)=>{

let subtotal=item.price*item.qty

total+=subtotal

html+=`

<div class="card animate__animated animate__fadeIn flex justify-between">

<div>

<b>${item.name}</b>
<br>
Rp ${item.price}

</div>

<div>

<input type="number"
value="${item.qty}"
min="1"
onchange="changeQty(${i},this.value)"
class="border w-16">

<button onclick="removeCart(${i})"
class="text-red-500">
hapus
</button>

</div>

</div>

`

})

document.getElementById("cart").innerHTML=html
document.getElementById("total").innerText=total

}



function changeQty(i,val){
cart[i].qty=parseInt(val)
renderCart()
}



function removeCart(i){

let cards=document.querySelectorAll("#cart .card")
let card=cards[i]

card.classList.add("animate__animated","animate__fadeOut")

setTimeout(()=>{

cart.splice(i,1)
renderCart()

},300)

}



function searchItem(){

let keyword=document.getElementById("search").value.toLowerCase()

let html=""

data[current].forEach((item,i)=>{

if(item.name.toLowerCase().includes(keyword)){

html+=`

<div class="card animate__animated animate__fadeIn">

<h4>${item.name}</h4>

<input type="number"
value="${item.price}"
onchange="updatePrice(${i},this.value)"
class="border p-1 w-full my-2">

<button onclick="selectItem(${i})"
class="bg-blue-500 text-white px-3 py-1 rounded">
Pilih
</button>

</div>

`

}

})

document.getElementById("items").innerHTML=html

}



function submitForm(){

let email=document.getElementById("email").value
let remarks=document.getElementById("remarks").value

if(!email){
alert("Email wajib diisi")
return
}

fetch("http://localhost:3000/submit",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
remarks,
cart
})

})
.then(res=>res.json())
.then(data=>{

alert("Data berhasil dikirim ke server")

console.log(data)

})

}


function exportExcel(){

let csv="Nama,Qty,Harga\n"

cart.forEach(item=>{
csv+=`${item.name},${item.qty},${item.price}\n`
})

let blob=new Blob([csv])

let a=document.createElement("a")

a.href=URL.createObjectURL(blob)

a.download="bahan_baku.csv"

a.click()

}



renderItems()

function toggleSidebar(){

let sidebar=document.getElementById("sidebar")

sidebar.classList.toggle("hide")

document.getElementById("totalItems").innerText=data[current].length

}
