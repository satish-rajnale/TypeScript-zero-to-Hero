import { EventMap } from "./interfaces/interface";

function getByKey<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((i) => i[key]);
}

const anime = [
  { name: "naruto", skill: "rasengan" },
  { name: "sasuke", skill: "lightning" },
];

console.log(getByKey(anime, "name"));
console.log(getByKey(anime, "skill"));

function sendEvent<eventName extends keyof EventMap>(
  event: eventName,
  data: EventMap[eventName]
): void {
  console.log([event, data]);
}

sendEvent("addToCart", {
  quantity: 30,
  productId: "sec",
  time: 12,
  user: "me",
});
sendEvent("checkOut", { time: 21, user: "me" });
