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
const projectOrder = [
    "sqlite_bookstore",
    "portfolio",
]
const projects = {
    sqlite_bookstore: {
        displayName: "Generalised SQLite Viewer",
        color: "#9cb5b6",
        textIsDark: true,
        date: "2026-02-04",
        previewDescription: "This was an early iteration of a generalised SQLite file editor, designed to be a generalised foundation that could be easily modified for spesific purposes",
        previewImage: "egg.png",
        languages: ["python", "sqlite"]
    },
    portfolio: {
        displayName: "Portfolio Website",
        color: "#9ddbff",
        textIsDark: false,
        date: "2026-02-04",
        previewDescription: "This site",
        previewImage: "egg.png",
        languages: ["python", "sqlite"]
    },
}

window.onload = function() {
    addHeader();

    addCodeSnippets()
    populateProjectsGrid()
    
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
            document.getElementById("heading-root").innerHTML = xhr.responseText;
            
            // Initialise the button here after the html has fully loaded
            initialiseButton();

            initialiseShadow();
        }
    };
    xhr.send();
}

function populateProjectsGrid() {

    // Only get the project summary html once
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "html_resources/project-summary.html", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            projectSummaryTemplateText = xhr.responseText

            // There should only ever be one projects-grid but this is a good way to target it
            const elements = document.querySelectorAll('.projects-grid');
            console.log(elements)
            elements.forEach(element => {
                // Remove all innerhtml
                element.innerHTML = ""
                

                projectOrder.forEach((projectName, index) => {
                    thisProject = projects[projectName]

                    console.log(projectName, thisProject)

                    element.innerHTML += projectSummaryTemplateText

                    console.log(element.children[index].children[0])

                    element.children[index].style["--c"] = thisProject.color;
                    element.children[index].children[0].style.setProperty("--i", thisProject.previewImage);
                    element.children[index].children[0].style.setProperty("--c", thisProject.color);

                    element.children[index].children[0].children[0].innerHTML = thisProject.displayName
                    
                    thisProject.languages.forEach(language => {
                        // Create an img element and apply attributes
                        const languageImageElement = document.createElement("img")
                        languageImageElement.src = "resources/languages/" + language +".png"
                        languageImageElement.alt = language
                        languageImageElement.title = language

                        element.children[index].children[0].children[1].appendChild(languageImageElement)

                    })

                    element.children[index].children[1].children[0].innerHTML = thisProject.previewDescription

                    // const projectSummaryText = xhr.responseText
                    // const projectSummary = (new  DOMParser()).parseFromString(projectSummaryText, "text/html");
                    // console.log(typeof(projectSummary))
                    // 
                    // projectSummary.children[0]

                    //element.appendChild(projectSummary)
                    

                })
            })
            
        }
    }
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