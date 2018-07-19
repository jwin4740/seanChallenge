var newName;
let dataRes;
getFactories();
getChildren();
$(document).on("click", "button.changeAmt", update);

function update() {
    var currentFactory = $(this).parent()
    $(currentFactory).text("");
    currentFactory.append('<label>');
    currentFactory.attr("for", "updateFactory");
    currentFactory.text("What is the new Name?");
    currentFactory.addClass("updateFactory");
    currentFactory.append("<br>");
    currentFactory.append("<input name='updateFactory' id='newFactoryAmt' type='text'></input>");
    currentFactory.append("<br>");
    var submitButton = $('<button>');
    submitButton.addClass('updateSubmit');
    submitButton.text('Change Name');
    currentFactory.append(submitButton);
}

$(document).on('click', 'button.updateSubmit', ajaxPut);
$(document).on('click', 'button.deleteButton', ajaxDel);
$(document).on('click', 'button.addFactoryBtn', ajaxPost);

function ajaxDel() {
    var id = $(this)
        .parent()
        .parent().attr('data-id')
    console.log(id);
    delAjax(id);
}

function ajaxPut() {
    var id = $(this)
        .parent()
        .parent().attr('data-id')

    newName = $("#newFactoryAmt").val()
    if (newName == "") {
        $("#amount").append("<br> Must be filled out with a name");
    } else {
        updateAjax(newName, id);
    }

}

function updateAjax(newName, id) {
    $.ajax({
        method: "PUT",
        url: "/updateFactory",
        data: {
            "facName": newName,
            "id": id
        }
    }).then(function (result) {
        location.reload();
    })
}

function delAjax(id) {
    $.ajax({
        method: "DELETE",
        url: "/deleteFactory",
        data: {
            "id": id
        }
    }).then(function (deleted) {
        location.reload();
    })
}

function postAjax(id, numVal) {
    $.ajax({
        method: "POST",
        url: "/newChild",
        data: {
            "FactoryId": id,
            "numValue": numVal
        }
    }).then(function (result) {
        location.reload();
    })
}

function ajaxPost() {
    var numKids = $(this)
        .parent()
        .parent().attr('data-numChildren');
    var upperLim = $(this)
        .parent()
        .parent().attr('data-upLim');

    var lowerLim = $(this)
        .parent()
        .parent().attr('data-lowLim');

    var id = $(this)
        .parent()
        .parent().attr('data-id')

    for (var i = 0; i < numKids.length; i++) {

        var numValue = randomNum(lowerLim, upperLim)

        postAjax(id, numValue);

    }
}

function getChildren() {
    $.get('/getChild', getChildList);
}

function getFactories() {
    $.get('/getFactory', getFactoryList);

};

function getChildList(data) {


    for (var i = 0; i < data.length; i++) {

        $('.childNum').append(
            `<div class ="children" data-id='${data[i].id}'>
            <p class='numValue'>Value: ${data[i].numValue} </p> 
            </br>
            </div>
        `);
    }
}


// the function below has too much going on, a good rule is "one function for one purpose"
// if you can't break it into two functions you'll have to do a nested loop
function getFactoryList(data) {
    console.log(data);
    dataRes = data;
    console.log(dataRes);
    data.forEach((val, n) => {
        $('#dynamicFactories').append(createFactoryElement(data, n));
    });


    // for (var i = 0; i < data.length; i++) {
    //     let generatedArr = [];
    //     let numberOfChildren = data[i].numChildren;
    //     let lowerBound = data[i].lowLim;
    //     let upperBound = data[i].upLim;


    //     // for (var j = 0; j < numberOfChildren; j++) {
    //     //     generatedArr.push(randomNum(lowerBound, upperBound));

    //     // }
    //     // console.log(generatedArr);





    //     generatedArr = [];

    // }



}

function createFactoryElement(data, n) {
    let newDiv = $("<div>");
    newDiv.addClass("madeFactory")
    let newP1 = $("<p class='empty1'>");
    let newP2 = $("<p class='empty2'>");
    newDiv.addClass("madeFactory");
    newDiv.attr("data-id", data[n].id);
    newDiv.text(`Factory Name: ${data[n].facName}`);


    let updateButton = $("<button>");
    updateButton.text("Update Factory");
    updateButton.addClass("changeAmt");
    newP1.append(updateButton);
    let deleteButton = $("<button>");
    deleteButton.text("Delete this Factory");
    deleteButton.addClass("deleteButton");
    newP2.append(deleteButton);
    newDiv.append(newP1).append(newP2);
    newDiv.append(addChildrenNumbers(data, n))


    return newDiv;
}


function addChildrenNumbers(data, n) {
    let childContainer = $("<div class='childContainer'>");
    
    let i = data[n].numChildren;
    while (i > -1){
        let childNum = $("<div class='childNum'>");
        childNum.text(randomNum(data[n].lowLim, data[n].upLim));
        childContainer.append(childNum);


        i--;
    }
    return childContainer;
   

}

function randomNum(lowerLim, upperLim) {

    return Math.floor(Math.random() * (upperLim - lowerLim)) + lowerLim;
}


// wouldn't recommend validating this way
// function validateForm() {
//     var numChildren = document.forms["newFactory"]["numChildren"].value;
//     var upLim = document.forms["newFactory"]["upLim"].value;
//     var lowLim = document.forms["newFactory"]["lowLim"].value;
//     var stuff = $(".text").val();
//     var reg = new RegExp('^[a-zA-Z0-9_]*$');
//     if (numChildren == "" || isNaN(numChildren || numChildren > 15)) {
//         $("#numChildrenLabel").append("<br>Must be filled out and must be a number less than 15")
//         return false;
//     }
//     if (upLim == "" || upLim < lowLim) {
//         $("#upLimLabel").append("<br>Must be a number");
//         return false;
//     }

//     if (lowLim == "" && lowLim > upLim) {
//         $("#lowLimLabel").append("<br>Must be a number");
//         return false;
//     }

//     if (reg.test(stuff)) {
//         $("#newFactory").prepend("Must not contain any special characters <br>")
//         return false;
//     }


// }