const codeSnippets = {
    clip_path: """\
clip-path: polygon(\
    0%      0%   ,\
    100%    0%   ,\
    100%    var(--w),\
    0%      var(--w),\
\
    0%      calc(50% - calc(var(--w)) / 2),\
    100%    calc(50% - calc(var(--w)) / 2),\
    100%    calc(50% + calc(var(--w)) / 2),\
    0%      calc(50% + calc(var(--w)) / 2),\
\
    0%      calc(100% - var(--w)),\
    100%    calc(100% - var(--w)),\
    100%    100% ,\
    0%      100% \
);\
"""
}

window.onload = function() { addCodeSnippets(); };


function addCodeSnippets() {
    const elements = document.querySelectorAll('.code-snip');
    elements.forEach(element => {
        const snippetName = element.getAttribute("snippet-name")

        //const fileRawName = "code_snippets/" + element.getAttribute("snippet-name");
        //const file = new File(fileName = fileRawName);
        //const reader = new FileReader();

        codeSnippets.getAttribute(snippetName)


        reader.addEventListener("load", () => {
            const fileContents = reader.result;
            const lines = fileContents.split("\n")

            lines.forEach(line => {
                const newElement = document.createElement("div");
                const newContent = document.createTextNode(line);

                newElement.appendChild(newContent);

                document.body.appendChild(newElement);
            })
        });
    });
}