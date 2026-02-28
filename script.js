const codeSnippets = {
clip_path: `
clip-path: polygon(
    0%      0%   ,
    100%    0%   ,
    100%    var(--w),
    0%      var(--w),

    0%      calc(50% - calc(var(--w)) / 2),
    100%    calc(50% - calc(var(--w)) / 2),
    100%    calc(50% + calc(var(--w)) / 2),
    0%      calc(50% + calc(var(--w)) / 2),

    0%      calc(100% - var(--w)),
    100%    calc(100% - var(--w)),
    100%    100% ,
    0%      100% 
);
`,
}

window.onload = function() { 
    addHeader();

    addCodeSnippets()
    
};

function initialiseButton() {
    document.getElementById("hamburger-button").addEventListener('click', function() {

        document.getElementById('header-bar').classList.toggle('open');
    });
}

function checkScrollForShadow() {
    // This function is seperate so it can be called on initialisation as well as on scrolling, so that refreshing the page doesn't remove the shadow 
    if (window.scrollY > 0) {
        document.getElementById('header-bar').classList.add('scroll-shadow');
    } else {
        document.getElementById('header-bar').classList.remove('scroll-shadow');
    }
}

function initialiseShadow() {
    window.addEventListener("scroll", function() {
        checkScrollForShadow()
    });
    checkScrollForShadow()
}

function addHeader() {
    //("#heading-placeholder").load("header.html")
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "html_resources/header.html", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText)
            document.getElementById("heading-root").innerHTML = xhr.responseText;
            
            // Initialise the button here after the html has fully loaded
            initialiseButton();

            initialiseShadow();
        }
    };
    xhr.send();
}

function addCodeSnippets() {
    const elements = document.querySelectorAll('.code-snip');
    elements.forEach(element => {
        const textNode = element.firstChild
        const TextContentArray = textNode.textContent.split(" ") //getAttribute("snippet-name")

        const language = TextContentArray[0]
        const snippetName = TextContentArray[1]

        if (TextContentArray.length != 2) {
            textNode.textContent = "Error, Invalid text node (this should never happen)"
            return
        }

        const languageElement = document.createElement("div");
        languageElement.classList.add('language')
        const languageContent = document.createTextNode(language);
        languageElement.appendChild(languageContent);

        element.parentElement.insertBefore(languageElement, element);


        snippet = codeSnippets[snippetName]

        if (snippet == null) {
            console.log(snippetName);
            textNode.textContent = "Error, snippet not found (this should never happen)"
            return
        }

        // Remove text in the code element that's there already
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        // Split the snippet into lines
        const lines = snippet.split("\n")

        lines.forEach(line => {
            const newElement = document.createElement("span");
            const newContent = document.createTextNode(line);

            newElement.appendChild(newContent);

            element.appendChild(newElement);
        })

    });
}

function openMenu() {
    
}