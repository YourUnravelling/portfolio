const codeSnippets = {
clip_path: `
Line 1
    Line 2 with indentation
    Line 3 with indentation
`,
}

window.onload = function() { addCodeSnippets(); };


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

        lines.forEach(line => {
            const newElement = document.createElement("div");
            const newContent = document.createTextNode(line);

            newElement.appendChild(newContent);

            document.body.appendChild(newElement);
        })

    });
}