import {menuArray} from '/data.js'

const orderArray = []
const totalPrice = document.getElementById('final-price')
const finalMessage = document.getElementById('final-message')
let finalPrice = 0


document.addEventListener('click', function(e){
    if(e.target.dataset.addbtn){
        getOrderFeed(e.target.dataset.addbtn)
    } else if(e.target.dataset.rmvbtn){
        rmvBtn(e.target.dataset.rmvbtn)
    } else if(e.target.id === 'complete-order-btn'){
        document.getElementById('modal').style.display = 'initial'    
    }
})

const userOrderForm = document.getElementById('user-order-form')
userOrderForm.addEventListener('submit', function(e){
    e.preventDefault()
    const userOrderData = new FormData(userOrderForm)
    const userName = userOrderData.get('userName')
    payBtn(userName)
    document.getElementById('modal').style.display = 'none'
    userOrderForm.reset()
})

function payBtn(name){
        finalMessage.innerHTML = 
        `
        <h2>Thanks ${name}, your order is on the way!</h2>
        `
        finalMessage.classList.remove('hidden')
        orderArray.splice(0, orderArray.length)
        finalPrice = 0
        renderOrder()
}

function rmvBtn(rmvBtnIndex){
    let orderRmvTargetObj = orderArray.filter(function(rmvItem){
        return rmvItem.id == rmvBtnIndex
    })[0]
    let orderPosition = orderArray.indexOf(orderRmvTargetObj)
    orderArray.splice(orderPosition, 1)
    finalPrice -= orderRmvTargetObj.price
    getOrderHtml()
        
}

function getOrderHtml(){
    let orderFeedHtml = ``
    orderArray.forEach(function(orderTargetObj){
    orderFeedHtml += 
    `
            <div class="orderDiv">
                <div class="orderDivLeftSide">
                <p>${orderTargetObj.name}</p>
                <button data-rmvbtn="${orderTargetObj.id}">remove</button>
                </div>
                <div class="orderDivRightSide">
                <p>$${orderTargetObj.price}</p>   
                </div>
            </div>
    `
        
    })
    
    renderOrder(orderFeedHtml)
}

function getOrderFeed(orderIndex){
    let orderTargetObj = menuArray.filter(function(orderItem){
        return orderIndex == orderItem.id
    })[0]
    orderArray.push(orderTargetObj) 
    finalPrice += orderTargetObj.price
    getOrderHtml()
}

function getMenuFeed(){
    let menuFeedHtml = ``
    menuArray.filter(function(menuItem){
        menuFeedHtml += 
        `
                    <div class="menuLeftSide">
                <div class="menuLeftSideInner">
                    <h2>${menuItem.emoji}</h2>
                <div>
                        <p id="menuName">${menuItem.name}</p>
                        <p id="menuInfo">${menuItem.ingredients}</p>
                        <p id="menuPrice">$${menuItem.price}</p>
                </div>
                </div>
                <div class="addItemBtnDiv">
                    <button id="${menuItem.id}" data-addbtn="${menuItem.id}">+</button>
                </div>
            </div>
                <div class="divider"></div>

        `
    })
        return menuFeedHtml
}

function renderMenu(){
    document.getElementById('menu').innerHTML = getMenuFeed()
}

function renderOrder(orderFeedHtml){
            if(finalPrice === 0){
            document.getElementById('hidden').classList.add('hidden')
            }else{
            document.getElementById('hidden').classList.remove('hidden')
            }
            
            document.getElementById('order').innerHTML = orderFeedHtml
            totalPrice.innerHTML = "$" + finalPrice
            
            

}
    
    
   
renderMenu()
