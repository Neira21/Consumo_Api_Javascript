
const container = document.querySelector('.container');

const url = "https://jsonplaceholder.typicode.com/comments"

fetch(url)
.then(res=> res.json())
.then(data=>{
    data.forEach(element => {
        const divId = document.createElement('div');;
        divId.innerHTML = ` ${element.id} => ${element.email}    </br>`
        divId.setAttribute('id', element.id)
        divId.setAttribute('class', 'comment')
        divId.addEventListener("click", function(){
            window.location.href = `./comment.html?id=${element.id}`
        })
        container.appendChild(divId)
    }
    )
})
.catch(err=>console.log(err))
