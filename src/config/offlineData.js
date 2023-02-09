import Dexie from "dexie";

export const db = new Dexie("edenTestDatabase");
db.version(1).stores({
  images: "++id, link",
});

db.version(2).stores({
  images: "++id, link, breed, subbreed",
  breeds: "++id, breed",
});
