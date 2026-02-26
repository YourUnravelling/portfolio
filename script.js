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
        }
    };
    xhr.send();
}

function addCodeSnippets() {
    const elements = document.querySelectorAll('.code-snip');
    elements.forEach(element => {
        const snippetName = element.getAttribute("snippet-name")



        snippet = codeSnippets[snippetName]

        if (snippet == null) {
            console.log(snippetName)
        }


        //const fileContents = reader.result;
        const lines = snippet.split("\n")

        // Remove text in the code element that's there already
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        lines.forEach(line => {
            if (line.startsWith("    ")) {
                // Something here that indents the code
            }

            const newElement = document.createElement("span");
            const newContent = document.createTextNode(line);

            newElement.appendChild(newContent);

            element.appendChild(newElement);
        })

    });
}

function openMenu() {
    
}