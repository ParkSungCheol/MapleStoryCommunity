const clickedMap = document.querySelectorAll(".moveMap");

function showMap(event) {

    if (event.currentTarget.classList.contains("victoriaIsland")) {
        let width = 1000;
        let height = 730;
        let top = (window.innerHeight - height) / 2 + screenY;
        let left = (window.innerWidth - width) / 2 + screenX;

        let spec = "status=no, menubar=no, toolbar=no, resizable=no";
        spec += ", width=" + width + ", height=" + height;
        spec += ", top=" + top + ", left=" + left;

        window.open("victoriaIsland.html", "popup1", spec);
    } else if (event.currentTarget.classList.contains("ludusLake")) {
        let width = 1000;
        let height = 730;
        let top = (window.innerHeight - height) / 2 + screenY;
        let left = (window.innerWidth - width) / 2 + screenX;

        let spec = "status=no, menubar=no, toolbar=no, resizable=no";
        spec += ", width=" + width + ", height=" + height;
        spec += ", top=" + top + ", left=" + left;

        window.open("LudusLake.html", "popup2", spec);
    } else if (event.currentTarget.classList.contains("muLungGarden")) {
        let width = 1000;
        let height = 730;
        let top = (window.innerHeight - height) / 2 + screenY;
        let left = (window.innerWidth - width) / 2 + screenX;

        let spec = "status=no, menubar=no, toolbar=no, resizable=no";
        spec += ", width=" + width + ", height=" + height;
        spec += ", top=" + top + ", left=" + left;

        window.open("MuLungGarden.html", "popup3", spec);
    }

}


function main() {
    clickedMap.forEach(x => x.addEventListener("click", showMap));
}

main();