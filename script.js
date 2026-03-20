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
darkmode: `
body {
    ...

    --white:         #fff;
    --text-colour:   black;
    ...
}

body.darkmode {
    --white:         black;
    --text-colour:   #ffffff;
    ...
}
`,
darkScript: `
function setDarkMode(value) {
    if (value) {
        document.body.classList.add('darkmode')
    } else {
        document.body.classList.remove('darkmode')
    }
    saveDarkMode(value)
}

function saveDarkMode(value) {
    localStorage.setItem("darkMode", value.toString())
}

function loadDarkMode() {
    return (localStorage.getItem("darkMode") === 'true')
}
`,
autoPopulate: `
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
                
                let index = 0
                projectOrder.forEach((projectName) => {
                    thisProject = projects[projectName]

                    
                    if (thisProject.show == true) {
                        console.log(thisProject, index)
                        element.innerHTML += projectSummaryTemplateText;
                        

                        const previewURL = "resources/projects/cover_images/" + projectName + ".png";
                        let col = thisProject.color
                        if (col.length == 7) {
                            col += "AA" // TODO Make this nicer
                        }
                        element.children[index].style = "--c:" + col; 
                        element.children[index].children[0].style = "--i: url(" + previewURL + ")"

                        element.children[index].children[0].children[0].innerHTML = thisProject.displayName
                        
                        thisProject.languages.forEach(language => {
                            // Create an img element and apply attributes
                            const languageImageElement = document.createElement("img")
                            languageImageElement.src = "resources/languages/" + language +".png"
                            languageImageElement.alt = language
                            languageImageElement.title = language

                            element.children[index].children[0].children[1].appendChild(languageImageElement)

                        })
                        if (thisProject.textIsDark) { // TODO Auto detect this
                            console.log("Text is now dark")
                            // Target description
                            element.children[index].children[1].children[0].classList.add("color-black")

                            // Target label
                            element.children[index].children[0].children[0].classList.add("color-black")

                        }
                        
                        element.children[index].children[1].children[0].innerHTML = thisProject.previewDescription

                        index += 1 // Only iterate the index if the element was successfully added
                    }
                })
            })
            
        }
    }
    xhr.send();
}
`,
mailto: `
function linkForm() {
    const form = document.getElementById("contact-form")
    form.addEventListener("submit", function (e) {
        e.preventDefault() // Block default action of the form 
        const formObject = Object.fromEntries(new FormData(form));

        // Create a string of all form options
        let formObjString = ""
        for(var key in formObject){
            formObjString += key + ": " + formObject[key] + "%0D%0A";
        }
        
        // Open mail client
        window.location.href = "mailto:conneljmh@hotmail.com?subject=Response to contact form - "+ Date.now() +"&body=" + formObjString;
    })
}
`,
reportcss: `
.document {
    align-self: center;
    margin: 2rem auto 0 auto;
    padding: 2rem 5rem 5rem 5rem;
    max-width: 50rem;
    color: var(--document-text);
    background-color: var(--document-bg);
    box-shadow: var(--shadow-big)

}

.document * {
    color: var(--document-text)
}

.document > .figures {
    display: inline-flex;
    width: 100%;
    margin: 0px auto;
    justify-content: center;
}

.document > .figures > figure{
    display: grid;
    width: fit-content;
    flex: 1;
}

.document > .figures > figure > img {
    margin: 0px auto auto auto;
    width: min(40rem, 100%);
}

.document > .figures > figure > figcaption {
    text-align: center;
    margin-top: 0.8rem;
}
`,
snippet: `
function addCodeSnippets() {
    const elements = document.querySelectorAll('.code-snip');
    elements.forEach(element => {
        const textNode = element.firstChild
        const TextContentArray = textNode.textContent.split(" ")

        const language = TextContentArray[0]
        const snippetName = TextContentArray[1]

        if (TextContentArray.length != 2) {
            textNode.textContent = "Error, Invalid text node (this should never happen)"
            return
        }

        // Create and add language label before the code element
        const languageElement = document.createElement("div");
        languageElement.classList.add('language')
        const languageContent = document.createTextNode(language);
        languageElement.appendChild(languageContent);

        element.parentElement.insertBefore(languageElement, element);

        // Get snippet
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
        const lines = snippet.split("\\n")

        lines.forEach(line => {
            const newElement = document.createElement("span");
            const newContent = document.createTextNode(line);

            newElement.appendChild(newContent);

            element.appendChild(newElement);
        })

    });
}
`
}
const projectOrder = [
    "snack_man",
    "autetris",
    "portfolio",
    "album_downloader",
    "sqlite_bookstore",
    "quartered",
    "bucket_list",
    "create_distillation",
    "diary_viewer",
]
const projects = {
    sqlite_bookstore: {
        displayName: "Generalised SQLite Viewer",
        color: "#9cb5b6",
        textIsDark: true,
        date: "2026-02-04",
        previewDescription: "This was an early iteration of a generalised SQLite file editor, designed to be a generalised foundation that could be easily modified for spesific purposes",
        languages: ["python", "tkinter", "sqlite"],
        show: true
    },
    portfolio: {
        displayName: "Portfolio Website",
        color: "#83b0fb",
        textIsDark: true,
        date: "2026-02-04",
        previewDescription: "This website, made using mainly CSS & HTML, with some JavaScript",
        languages: ["html5", "css", "javascript"],
        show: true
    },
    snack_man: {
        displayName: "Snack Man Deluxe",
        color: "#00028d",
        textIsDark: false,
        date: "2026-02-04",
        previewDescription: "A Pac-man style game made using web technologies, barely started yet.",
        languages: ["javascript"],
        show: true
    },
    diary_viewer: {
        displayName: "Diary Viewer",
        color: "#ffbceb",
        textIsDark: true,
        date: "2026-02-04",
        previewDescription: "An old attempt at a diary management program",
        languages: ["python", "tkinter"],
        show: true
    },
    album_downloader: {
        displayName: "Album downloader",
        color: "#00588b",
        textIsDark: false,
        date: "2026-02-04",
        previewDescription: "A Customtk program that uses yt-dlp and some other python libraries to download albums and organise them into folders.",
        languages: ["python", "customtk"],
        show: true
    },
    create_distillation: {
        displayName: "Create: Distillation",
        color: "#a84300",
        textIsDark: false,
        date: "2026-02-04",
        previewDescription: "Planned Minecraft addon for the Create mod, adding distillation and electrolysation. Not even started, may return to it eventually.",
        languages: ["java", "gradle", "minecraft"],
        show: true
    },
    autetris: {
        displayName: "AuTetris",
        color: "#137400",
        textIsDark: false,
        date: "2026-02-04",
        previewDescription: "Tetris remake in browser, practice for snack man",
        languages: ["javascript"],
        show: false
    },
    quartered: {
        displayName: "Quartered",
        color: "#ff00f260",
        textIsDark: false,
        date: "2026-02-04",
        previewDescription: "A card game in the godot engine with planned client/server connectivity, unfinished.",
        languages: ["godot"],
        show: true
    },
    bucket_list: {
        displayName: "Bucket List",
        color: "#ffd9a1",
        textIsDark: true,
        date: "2026-02-04",
        previewDescription: "A level compsci project, tech demo for a game, made in Godot Engine.",
        languages: ["godot"],
        show: true
    }
}
// TODO Add a search panel, add bars for [UNFINISHED], [ABANDONED] which kinda cover it but like on an angle (and those projects are not shown by default)
// Additional ranking, "autumn's proudness level"

addEventListener("DOMContentLoaded", (event) => {initialise()}) // Run after the main DOM is loaded, not images and stuff though

function initialise() { // Called on full load of the body element and its children
    setDarkMode(loadDarkMode())
    addHeader();
    addFooter();

    addCodeSnippets()
    populateProjectsGrid()
    linkForm()
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
    //setDarkMode(loadDarkMode());
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

function addFooter() {
    // TODO Generalise autopopulating to avoid code duping
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "html_resources/footer.html", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById("footer-root").innerHTML = xhr.responseText;
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
                const spesificProject = element.innerHTML
                console.log(spesificProject)

                // Remove all innerhtml
                element.innerHTML = ""
                
                let index = 0
                projectOrder.forEach((projectName) => {
                    thisProject = projects[projectName]

                    
                    if (thisProject.show == true && (spesificProject == projectName || spesificProject == "")) {
                        console.log(thisProject, index)
                        element.innerHTML += projectSummaryTemplateText;
                        

                        const previewURL = "resources/projects/cover_images/" + projectName + ".png";
                        let col = thisProject.color
                        if (col.length == 7) {
                            col += "AA" // TODO Make this nicer
                        }
                        element.children[index].style = "--c:" + col; 
                        element.children[index].children[0].style = "--i: url(" + previewURL + ")"

                        element.children[index].children[0].children[0].innerHTML = thisProject.displayName
                        
                        thisProject.languages.forEach(language => {
                            // Create an img element and apply attributes
                            const languageImageElement = document.createElement("img")
                            languageImageElement.src = "resources/languages/" + language +".png"
                            languageImageElement.alt = language
                            languageImageElement.title = language

                            element.children[index].children[0].children[1].appendChild(languageImageElement)

                        })
                        if (thisProject.textIsDark) { // TODO Auto detect this
                            console.log("Text is now dark")
                            // Target description
                            element.children[index].children[1].children[0].classList.add("color-black")

                            // Target label
                            element.children[index].children[0].children[0].classList.add("color-black")

                        }
                        
                        element.children[index].children[1].children[0].innerHTML = thisProject.previewDescription

                        index += 1 // Only iterate the index if the element was successfully added
                    }
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
        const TextContentArray = textNode.textContent.split(" ")

        const language = TextContentArray[0]
        const snippetName = TextContentArray[1]

        if (TextContentArray.length != 2) {
            textNode.textContent = "Error, Invalid text node (this should never happen)"
            return
        }

        // Create and add language label before the code element
        const languageElement = document.createElement("div");
        languageElement.classList.add('language')
        const languageContent = document.createTextNode(language);
        languageElement.appendChild(languageContent);

        element.parentElement.insertBefore(languageElement, element);

        // Get snippet
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

function linkForm() {
    const form = document.getElementById("contact-form")
    form.addEventListener("submit", function (e) {
        e.preventDefault() // Block default action of the form 
        const formObject = Object.fromEntries(new FormData(form));

        // Create a string of all form options
        let formObjString = ""
        for(var key in formObject){
            formObjString += key + ": " + formObject[key] + "%0D%0A";
        }
        
        // Open mail client
        window.location.href = "mailto:conneljmh@hotmail.com?subject=Response to contact form - "+ Date.now() +"&body=" + formObjString;
    })
}




function setDarkMode(value) {
    if (value) {
        document.body.classList.add('darkmode')
    } else {
        document.body.classList.remove('darkmode')
    }
    saveDarkMode(value)
}

function saveDarkMode(value) {
    localStorage.setItem("darkMode", value.toString())
}

function loadDarkMode() {
    return (localStorage.getItem("darkMode") === 'true')
}


function closeNavIfBig(){
    if (window.innerWidth > 750 && document.getElementById('header-bar').classList.contains("open")) {
        document.getElementById('header-bar').classList.remove("open")
    }
};
window.onresize = closeNavIfBig