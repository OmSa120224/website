const folders = document.querySelectorAll(".folder-container");
const viewer = document.getElementById("docViewer");


folders.forEach(folder => {
    folder.addEventListener("click", () => {
        loadFolder(folder.id);
    });
});

// Extract fetch logic into a function
function loadFolder(folderId) {
    const filePath = `./files/${folderId}.html`; 
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
}

// ===== Load default folder on page load =====
loadFolder("README");








// =============  time and date ==================

function updateRetroClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2,'0');
  const minutes = String(now.getMinutes()).padStart(2,'0');
  const seconds = String(now.getSeconds()).padStart(2,'0');
  document.getElementById('retro-clock').textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateRetroClock, 1000);
updateRetroClock(); 



function updateRetroDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  document.getElementById('retro-date').textContent = `${day}-${month}-${year}`;
}
setInterval(updateRetroDate, 1000);
updateRetroDate();



// =============  status dot  ==================

const color = "#00ffcc";
const dot = document.getElementById("status-dot");
dot.style.backgroundColor = color;
dot.style.boxShadow = `0 0 8px ${color}, 0 0 12px ${color}`;

