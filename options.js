const storageAPI =
    (typeof browser !== "undefined" && browser.storage)
    ? browser.storage
    : chrome.storage;

const input = document.getElementById("home");
const save = document.getElementById("save");

storageAPI.sync.get(["home"], (data) => {
    if (data.home) input.value = data.home;
});

save.onclick = () => {
    storageAPI.sync.set({ home: input.value });
};