// display todo list item from the local storage
function displayItem() {
  const todo = localStorage.getItem("todo");
  const todoArray = JSON.parse(todo);

  let content = "";
  if (todo) {
    // todo list has items
    todoArray.forEach((element) => {
      content += `<div class="item"><span class="text">${element}</span><span class="delete-button fa-sharp fa-solid fa-trash"></span></div>`;
    });
    // Update the count using jQuery
    $(".count").html(`You have ${todoArray.length} pending tasks`);
  } else {
    // todo list is blank
    content += `<div class="item">There is no item in todo list</div>`;
    // Clear the count using jQuery
    $(".count").html("");
  }

  // Display the todo list content using jQuery
  $(".list").html(content);
}

$(document).ready(function () {
  // display todo list
  displayItem();

  // add click event listner on add button
  $(document).on("click", "#add-button", function () {
    // get todo list items from the local storage
    const todo = localStorage.getItem("todo");
    let todoArray = JSON.parse(todo);

    const text = $("#textInput").val().trim();
    if (!text) return;

    if (todoArray) {
      const itemExists = todoArray.some((todo) => todo === text);
      if (itemExists) {
        console.log("item already exist");
        $(".search-error").show().delay(2000).fadeOut();
        return;
      }
      // append item into todo list
      todoArray.push(text);
    } else {
      // create todo list with item
      todoArray = [];
      todoArray.push(text);
    }

    // update todo list value
    localStorage.setItem("todo", JSON.stringify(todoArray));

    // set input field blank
    $("#textInput").val("");

    // display the updated list
    displayItem();
  });

  // add click event listner on delete button
  $(document).on("click", ".delete-button", function () {
    // get the text of the div when its associated delete button is clicked
    const text = $(this).siblings(".text").html();

    // get todo list items from the local storage
    const todo = localStorage.getItem("todo");
    const todoArray = JSON.parse(todo);

    // get index of div when its associated delete button is clicked
    const index = todoArray.indexOf(text);

    // remove the item from the array
    todoArray.splice(index, 1);

    if (todoArray.length === 0) {
      // todo list is blank
      localStorage.removeItem("todo");
    } else {
      // update todo list items
      localStorage.setItem("todo", JSON.stringify(todoArray));
    }

    // display updated todo list
    displayItem();
  });

  // add click event listner on delete button
  $(document).on("click", ".clear", function () {
    // clear local storage
    localStorage.removeItem("todo");

    // display updated todo list
    displayItem();
  });
});
