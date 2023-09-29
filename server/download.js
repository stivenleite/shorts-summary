import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoId) => new Promise ((resolve, reject) => {
    console.log("Downloading video", videoId);

    const videoURL = "https://www.youtube.com/shorts/" + videoId;

    ytdl(videoURL, {
        quality: "lowestaudio",
        filter: "audioonly"
    }).on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000;
        
        if (seconds > 60) {
            throw new Error("Video duration is greater then 60 seconds.")
        }
    }).on("end", () => {
        console.log("Download completed.");
        resolve();
    }).on("error", (error) => {
        console.log("Download error:", error);
        reject(error);
    }).pipe(fs.createWriteStream("./tmp/audio.mp4"));
});