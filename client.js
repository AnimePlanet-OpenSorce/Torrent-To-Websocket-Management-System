import WebSocket from "ws";
import WebTorrent from "webtorrent";

const address = process.env.ADDRESS;
const ws = new WebSocket(address);
const webtorrent = new WebTorrent();

const TRACKERS = [
  "udp://tracker.opentrackr.org:1337/announce",
  "udp://tracker.openbittorrent.com:6969/announce",
  "wss://tracker.openwebtorrent.com",
  "wss://tracker.btorrent.xyz",
  "wss://tracker.fastcast.nz",
];

const addTorrent = (torrentId) => {
  try {
    webtorrent.add(
      // templatka magneta
      `magnet:?xt=urn:btih:${torrentId}&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce`,
      { announce: TRACKERS },
      (torrent) => {
        resolve(torrent);
      }
    );
    console.log("torrent added sucesfull");
  } catch (err) {
    console.log("torrent add error", err);
  }
};

const removeTorrent = async (torrentId) => {
  const torrent = webtorrent.get(torrentId);
  if (torrent) {
    webtorrent.remove(torrentId);
    console.log(`Torrent ${torrentId} remove`);
  } else {
    console.log(`Torrent ${torrentId} not exist`);
  }
};

ws.on("open", () => {
  console.log(`Połączono z ${address}`);
});

ws.on("message", async (data) => {
  console.log("Otrzymano wiadomość od serwera:", data.toString());
  try {
    const obj = JSON.parse(data);
    console.log(obj.torrentId);
    if (obj.torrentId && ["add", "remove"].includes(obj.action)) {
      obj.action === "add"
        ? addTorrent(obj.torrentId)
        : removeTorrent(obj.torrentId);
    } else {
      ws.send("błędna wiadomość");
    }
  } catch (err) {
    console.log(err);
  }
});

ws.on("close", () => {
  console.log("serwer został rozłączony");
  ws.terminate();
});

ws.on("error", (err) => {
  console.error("Błąd klienta:", err);
});
