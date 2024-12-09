var inputName = document.getElementById('inputOfName');
var inputURL = document.getElementById('inputOfURL');

var arr = [];
if(localStorage.getItem('informationP')){
    arr = JSON.parse(localStorage.getItem('informationP'));
    display();
}

function submit() {
    var name = inputName.value;
    var url = inputURL.value;
    
    if(!validName(name)) {
        alert("Name must be more than 3 word")
        return;
    }

    if(isNameExists(name)) {
        alert("this name is use please enter anther name")
        return; 
    }

    if(!validURL(url)) {
        alert("please enter valied url ex:https://hag.com")
        return; 
    }

    var informationP = {
        Name: name,
        URL: url
    };

    arr.push(informationP);
    localStorage.setItem('informationP', JSON.stringify(arr));
   
    clearForm();
    display();
}

function validName(name) {
    var trimmedName = name.trim(); 
     
    var letterCount = trimmedName.replace(/\s+/g, '').length;  
        if (letterCount < 3) {
        return false;
    }
    
    var regex = /^[a-zA-Z0-9\s]+$/;
    var isValid = regex.test(trimmedName);  
    return isValid;
}
function validURL(url) {
    var regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.com$/i;

    if (url.match(/\.com/g) && url.match(/\.com/g).length > 1) {
        return false;
    }

    return regex.test(url); 
}
function isNameExists(name) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i].Name.toLowerCase() === name.toLowerCase()) {
            return true; 
        }
    }
    return false;  
}

function display() {
    var box = '';
    for(var i = 0; i < arr.length; i++) {
        box += `
        <tr>
            <td><p>${arr[i].Name}</p></td>
            <td><p>${arr[i].URL}</p></td>
            <td><button class="btn btn-visit text-white" onclick="buttonVis(${i})">
                <i class="fa-regular fa-eye"></i> visit
            </button></td>
            <td><button onclick="buttonDel(${i})" class="btn btn-delete bg-danger text-white"> 
                <i class="fa-solid fa-trash"></i> delete
            </button></td>
        </tr>`;
    }
    dataRow.innerHTML = box;
}

function clearForm() {
    inputName.value = null;
    inputURL.value = null;
}

function buttonDel(index) {
    arr.splice(index, 1);
    localStorage.setItem('informationP', JSON.stringify(arr));
    display();
}

function buttonVis(index) {
    window.location.href = arr[index].URL; 
}
