let pasteCount = 0;
let downloadCount = 1;

// for debug
// const isMac = true;

const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;

const key1 = document.getElementById("key1");
const key2 = document.getElementById("key2");

if (isMac) {
    key1.textContent = "⌘";
    key2.textContent = "V";
} else {
    key1.textContent = "Ctrl";
    key2.textContent = "V";
}

document.addEventListener("paste", async (event) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
        if (item.type.indexOf("image") === 0) {
            const blob = item.getAsFile();
            const url = URL.createObjectURL(blob);

            const imageElement = document.getElementById("pasted-image");
            const imageContainer = document.getElementById("image-container");
            imageElement.src = url;
            imageContainer.style.display = "block";

            const a = document.createElement("a");
            a.href = url;
            a.download = `pasted-image-${Date.now()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            pasteCount++;

            if (pasteCount >= 2) {
                downloadCount++;
                document.getElementById("status").textContent = `Image downloaded x${downloadCount}`;
            } else {
                document.getElementById("status").textContent = "Image downloaded";
            }
            break;
        }
    }
});
