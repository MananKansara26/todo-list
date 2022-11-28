let addButton = document.getElementById("add"),
textInput = document.getElementById("textInput");

function displayItem()
{
    let todo = localStorage.getItem("todo"),
    todoArray = JSON.parse(todo);

    let content = "";
    if(todo)
    {
        todoArray.forEach(function(element){
            content += `<div class="item"><span class="text">${element}</span><span class="fa-sharp fa-solid fa-trash"></span></div>`;
        })
        document.querySelector('.count').innerHTML = `You have ${todoArray.length} pending tasks`;
    }
    else
    {
        content += `<div class="item">There is no item in todo list</div>`;
        document.querySelector('.count').innerHTML = ``;
    }
    
    document.querySelector(".list").innerHTML = content;

}


addButton.addEventListener("click", () => {
    let todo = localStorage.getItem("todo"),
    text = textInput.value.trim();

    let todoArray = JSON.parse(todo);
    
    if(todoArray)
    {
        todoArray.push(text);
    }
    else
    {
        todoArray = [];
        todoArray.push(text);
    }
    localStorage.setItem("todo",JSON.stringify(todoArray));
    location.reload();
    displayItem();
});


$(document).ready(function() {

    displayItem();

    $('.fa-sharp').click(function(){
        // console.log($(this).siblings('.text')[0].innerHTML);
        let text = $(this).siblings('.text')[0].innerHTML;

        let todo = localStorage.getItem("todo"),
        todoArray = JSON.parse(todo);

        let index = todoArray.indexOf(text);
        console.log(index);

        todoArray.splice(index,1);

        if(todoArray.length == 0)
        {
            localStorage.removeItem('todo');
        }
        else
        {   
            localStorage.setItem("todo",JSON.stringify(todoArray));
        }
        location.reload();
        displayItem();
        
    });
});


