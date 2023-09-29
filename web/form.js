import { server } from "./server.js";

const form = document.querySelector("#form");
const input = document.querySelector("#url");
const content = document.querySelector("#content");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    content.classList.add("placeholder");

    const videoURL = input.value;

    if (!videoURL.includes("shorts")) {
        return alert("This video does not seem to be a short video.")
    }

    const [_, params] = videoURL.split("/shorts/");
    const [videoID] = params.split("?si");

    content.textContent = "Getting audio text..."

    const transcription = await server.get("/summary/" + videoID);

    content.textContent = "Summarizing..."

    const summary = await server.post("/summary", { text: transcription.data.result });

    content.textContent = summary.data.result;
    content.classList.remove("placeholder");
});