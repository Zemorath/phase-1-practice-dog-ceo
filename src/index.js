console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const namesUrl = "https://dog.ceo/api/breeds/list/all";


function fetchImages() {
    return fetch(imgUrl)
    .then(resp => { return resp.json() })
    .then(data => { return renderImages(data) })
};

function renderImages(object) {
    var imageSection = document.getElementById("dog-image-container")
    var images = object['message'];
    console.log(images)
    const url = images.map(function(a) {
        var image = new Image(200, 200);
        image.src = a;
        imageSection.appendChild(image)
    });
};

function fetchNames() {
    return fetch(namesUrl)
    .then(resp => { return resp.json() })
    .then(data => { return renderNames(data)})
};

function renderNames(object) {
    var nameList = document.getElementById("dog-breeds");
    var names = object['message'];
    console.log(names)
    for (const name in names) {
        let li = document.createElement("li")
        li.innerText = name;
        nameList.appendChild(li);

        li.addEventListener("click", function() {
            li.setAttribute("style", "color: firebrick")
        });

        let letterSelector = document.getElementById("breed-dropdown");

        letterSelector.addEventListener("change", (event) => {
            let list = document.getElementsByTagName('li')
            let selectedLetter = event.target.value;
            for (i=0; i < list.length; i++) {
                let textValue = list[i].innerHTML;
                if (textValue.toLowerCase().startsWith(selectedLetter)) {
                    list[i].style.display = "";
                } else {
                    list[i].style.display = "none";
                };
            };
        });
    };
};

document.addEventListener("DOMContentLoaded", function() {
    fetchImages();
    fetchNames();
});