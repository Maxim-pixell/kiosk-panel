const input = document.getElementById("home");
const save = document.getElementById("save");

chrome.storage.sync.get(["home"], (data) => {
    if (data.home) input.value = data.home;
});

save.onclick = () => {
    chrome.storage.sync.set({ home: input.value });
};