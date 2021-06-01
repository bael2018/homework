const container = document.querySelector('.header_wrapper')

const getRequest = (id, method , body, quary , cb) => {
    const baseURL = `http://2.57.186.103:5000/api/posts/${id}?${quary}`
    const xhr = new XMLHttpRequest()
    xhr.open(method , baseURL)

    xhr.addEventListener('load' , () => {
        const response = JSON.parse(xhr.response)
        cb(response)
    })

    if(method === 'POST' && method === 'PUT'){
        xhr.setRequestHeader('Content-type' , 'application/json')
    }

    xhr.addEventListener('error' , er => {
        console.error("Something went wrong")
        console.log(er);
    })
    xhr.send(JSON.stringify(body))
}

window.addEventListener('load' , () => {
    getRequest('' , 'GET' , null , '' , res => {
        if(res?.length === 0){
            container.innerHTML = `<h2 style='text-align: center'>Пусто</h2>`
        }else{
            console.log(res.data);
            const temp = res.data.map(item => cardTemplate(item)).join('')
            container.innerHTML = temp
        }
    })
})

function cardTemplate({_id , title , body , img, author , date}){
    return `
    <div class="card">
        <div class="card_image">
            <img src="${img}" alt="img">
        </div>
        <h1 class="card_title">${title}</h1>
        <div class="card_body">
            <p>${body}}</p>
        </div>
        <div class="card_info">
            <span>${date}</span>
            <span>${author}</span>
        </div>
        <div class="card_footer">
            <button onclick="deleteBlog(${_id})">DELETE</button>
            <button onclick="editBlog(${_id})">EDIT</button>
        </div>
    </div>
    `   
}

function reload(){
    window.location.reload()
}

const burger = document.querySelector('.burger')

const header_banner = document.querySelector('.header_banner')
const header_content = document.querySelector('.header_content')

const burgerSpan1 = document.querySelector('.burger span:nth-child(1)')
const burgerSpan2 = document.querySelector('.burger span:nth-child(2)')
const burgerSpan3 = document.querySelector('.burger span:nth-child(3)')

const burderOne = document.querySelector('.header_text h1:nth-child(1)')
const burderTwo = document.querySelector('.header_text h1:nth-child(2)')
const burderThree = document.querySelector('.header_text h1:nth-child(3)')
const burderFour = document.querySelector('.header_text h1:nth-child(4)')

const header_upper = document.querySelector('.header_upper')
const header_wrapper = document.querySelector('.header_wrapper')

burger.addEventListener('click' , e => {
    e.preventDefault()
    header_upper.classList.toggle('active')
    header_wrapper.classList.toggle('active')
    
    header_content.classList.toggle('active')
    header_banner.classList.toggle('active')

    burgerSpan1.classList.toggle('active')
    burgerSpan2.classList.toggle('active')
    burgerSpan3.classList.toggle('active')

    burderOne.classList.toggle('active')
    burderTwo.classList.toggle('active')
    burderThree.classList.toggle('active')
    burderFour.classList.toggle('active')
})

function addOption(){
    const addChildTwo = document.querySelector('.add_child_alt2')
    addChildTwo.classList.toggle('active')
}

function showSetting(){
    return  `<div class="add">
    <div class="add_child add_child_alt2">
        <input class="cardImage" placeholder="Your image" type="text">
        <input placeholder="Title" type="text" class="cardTitle">
        <input placeholder="Author" type="text" class="cardAuthor">
        <textarea class='cardText' placeholder="Text" cols="30" rows="10"></textarea>

        <button class="submitBtn">SUBMIT</button>
        <button onclick='reload()'>LATER</button>
    </div>
</div>
`
}

const addBtn = document.querySelector('.addBtn')
const cardImage = document.querySelector('.cardImage')
const cardTitle = document.querySelector('.cardTitle')
const cardAuthor = document.querySelector('.cardAuthor')
const cardText = document.querySelector('.cardText')

addBtn.addEventListener('click' , e => {
    e.preventDefault()
    container.innerHTML = showSetting()

    const submitBtn = document.querySelector('.submitBtn')
    submitBtn.addEventListener('click' , e => {
        e.preventDefault()

        if(cardImage.value && cardTitle.value && cardAuthor.value && cardText.value){
            if(cardText.value.length > 150){
                alert('Слишком много символов')
            }else{
                getRequest('' , 'POST' , 
                {   
                    title: cardTitle.value,
                    body: cardText.value,
                    image: cardImage.value,
                    author: cardAuthor.value,
                    date: new Date()
                } ,
                ''
                , res => {
                    console.log(res);
                })
            }
        }else{
            alert('Не все поля заполнены')
        }
    })
})

function deleteBlog(id){
    const askAgree = confirm("Are u sure?")
    if(askAgree){
        getRequest(id , 'DELETE' ,null , '' , res => {
            window.location.reload()
        } )
    }
}

function editBlog(id){
    const askAgree = confirm('Are u sure')
    if(askAgree){
    container.innerHTML = showSetting()
  
    const cardImage = document.querySelector('.cardImage')
    const cardTitle = document.querySelector('.cardTitle')
    const cardAuthor = document.querySelector('.cardAuthor')
    const cardText = document.querySelector('.cardText')

    const submitBtn = document.querySelector('.submitBtn')
    submitBtn.addEventListener('click' , e => {
        e.preventDefault()

        if(cardImage.value && cardTitle.value && cardAuthor.value && cardText.value){
            if(cardText.value.length > 150){
                alert('Слишком много символов')
            }else{
                getRequest('' , 'PUT' , 
                {   
                    id: id,
                    title: cardTitle.value,
                    body: cardText.value,
                    image: cardImage.value,
                    author: cardAuthor.value,
                    date: new Date()
                } ,
                ''
                , res => {
                    window.location.reload()
                })
            }
        }else{
            alert('Не все поля заполнены')
        }
    })
    }
}