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
    "snack_man",
    "autetris",
    "portfolio",
    "album_downloader",
    "sqlite_bookstore",
    "create_distillation",
    "diary_viewer",
    "quartered",
    "bucket_list"
]
const projects = {
    sqlite_bookstore: {
        displayName: "Generalised SQLite Viewer",
        color: "#9cb5b6",
        textIsDark: true,
        date: "2026-02-04",
        previewDescription: "This was an early iteration of a generalised SQLite file editor, designed to be a generalised foundation that could be easily modified for spesific purposes",
        languages: ["python", "tkinter", "sqlite"]
    },
    portfolio: {
        displayName: "Portfolio Website",
        color: "#83b0fb",
        textIsDark: false,
        date: "2026-02-04",
        previewDescription: "This site",
        languages: ["html5", "css", "javascript"]
    },
    snack_man: {
        displayName: "Snack Man Deluxe",
        color: "#00028d",
        textIsDark: false,
        date: "2026-02-04",
        previewDescription: "Not done yet (future)",
        languages: ["javascript"]
    },
    diary_viewer: {
        displayName: "Diary Viewer",
        color: "#ffbceb",
        textIsDark: false,
        date: "2026-02-04",
        previewDescription: "An old attempt at a diary management program",
        languages: ["python", "tkinter"]
    },
    album_downloader: {
        displayName: "Album downloader",
        color: "#00588b",
        textIsDark: false,
        date: "2026-02-04",
        previewDescription: "A Customtk program that uses yt-dlp and some other python libraries to download albums and organise them into folders",
        languages: ["python", "customtk"]
    },
    create_distillation: {
        displayName: "Create: Distillation",
        color: "#a84300",
        textIsDark: false,
        date: "2026-02-04",
        previewDescription: "Minecraft plugin for the Create mod, adding distillation and REMEMBER OTHER MECHANIC. Not even started.",
        languages: ["java", "gradle", "minecraft"]
    },
    autetris: {
        displayName: "AuTetris",
        color: "#137400",
        textIsDark: false,
        date: "2026-02-04",
        previewDescription: "Tetris remake in browser, practice for snack man",
        languages: ["javascript"]
    },
    quartered: {
        displayName: "Quartered",
        color: "#517dbe",
        textIsDark: false,
        date: "2026-02-04",
        previewDescription: "Card game in godot engine, unfinished",
        languages: ["godot"]
    },
    bucket_list: {
        displayName: "Bucket List",
        color: "#ffd9a1",
        textIsDark: true,
        date: "2026-02-04",
        previewDescription: "A level compsci project",
        languages: ["godot"]
    }
}
// TODO Add a search panel, add bars for [UNFINISHED], [ABANDONED] which kinda cover it but like on an angle (and those projects are not shown by default)
// Additional ranking, "autumn's proudness level"

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

                    element.innerHTML += projectSummaryTemplateText;

                    const previewURL = "resources/projects/cover_images/" + projectName + ".png";
                    element.children[index].style = "--c:" + thisProject.color;
                    element.children[index].children[0].style = "--i: url(" + previewURL + "); --c:" + thisProject.color;

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