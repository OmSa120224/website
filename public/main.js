const folders = document.querySelectorAll(".folder-container");
const viewer = document.getElementById("docViewer");

folders.forEach(folder => {
    folder.addEventListener("click", () => {
        const filePath = `../files/${folder.id}.html`; 
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    viewer.innerHTML = `<p style="color:red;">File not found: ${filePath}</p>`;
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                viewer.innerHTML = html;
            })
            .catch(err => console.error("Error loading file:", err));
    });
});




const lines = document.getElementById("lt-command-lines");

lines.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const newCmd = document.createElement("div");
    newCmd.classList.add("command");

    newCmd.innerHTML = `
      <span class="prompt">~ > To be implemented... Use the GUI :) </span>
      <span class="command-text" contenteditable="true"></span>
    `;
    lines.appendChild(newCmd);
    const editable = newCmd.querySelector(".command-text");
    editable.focus();
  }
});










