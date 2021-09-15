import faker from "faker";
import fs from "fs";

const channelNames = [
  "Short",
  "Channel Long Name",
  "Channel 1",
  "Channel 2",
  "Channel 3",
  "Channel 4",
  "Channel 5",
  "Channel 6",
  "Channel 7",
  "trohs",
];

const title = [
  "Activity Title Name Make it Longer May Longer Than one line",
  "Activity Title Name Make It Longer May",
  "Very Short Title",
  "Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Long Title",
  "Test",
  "Not very sure what title is this!",
  "Generating random title...",
];

const randomTime = [
  "0000",
  "0030",
  "0100",
  "0130",
  "0200",
  "0230",
  "0300",
  "0330",
  "0400",
  "0430",
  "0500",
  "0530",
  "0600",
  "0630",
  "0700",
  "0730",
  "0800",
  "0830",
  "0900",
  "0930",
  "1000",
  "1030",
  "1100",
  "1130",
  "1200",
  "1230",
  "1300",
  "1330",
  "1400",
  "1430",
  "1500",
  "1530",
  "1600",
  "1630",
  "1700",
  "1730",
  "1800",
  "1830",
  "1900",
  "1930",
  "2000",
  "2030",
  "2100",
  "2130",
  "2200",
  "2230",
  "2300",
  "2330",
];

const data = {};
data.table = [];
for (let i = 0; i < 1000; i++) {
  const haveTitleImage = Math.random() <= 0.5;
  const randomTitle = Math.random() <= 0.5;

  const pastDate = Math.random() <= 0.5;
  const today = Math.random() <= 0.5;

  const sd = pastDate
    ? new Date(faker.date.past())
    : today
    ? new Date()
    : new Date(faker.date.future());
  const ed = new Date(sd);
  ed.setDate(ed.getDate() + Math.floor(Math.random() * 40));
  const pd = new Date(sd);
  pd.setDate(pd.getDate() - Math.floor(Math.random() * 31));

  const likes = Math.floor(Math.random() * 30);
  const numGoing = Math.floor(Math.random() * 30);
  const startTime = Math.floor(Math.random() * randomTime.length);
  let endTime = startTime + Math.floor(Math.random() * 6);
  if (endTime >= randomTime.length) endTime = randomTime.length - 1;
  const haveStartTime = Math.random() <= 0.75;
  const haveEndtime = haveStartTime && Math.random() <= 0.75;

  const obj = {
    avatar: faker.image.avatar(),
    name: faker.name.firstName(),
    channelName: channelNames[Math.floor(Math.random() * channelNames.length)],
    title: randomTitle
      ? faker.lorem.sentence()
      : title[Math.floor(Math.random() * title.length)],
    titleImg: haveTitleImage ? faker.image.nature() : "",
    postDate: pd.toISOString(),
    startDate: sd.toISOString(),
    endDate: ed.toISOString(),
    description: concateLines(faker.lorem.lines()),
    likes,
    likesArray: generateAvatarArray(likes),
    numGoing,
    goingArray: generateAvatarArray(numGoing),
    uuid: faker.datatype.uuid(),
    isLike: false,
    isGoing: false,
    chatsArray: generateChatsArray(Math.max(Math.floor(Math.random() * 20), 8)),
  };

  if (haveStartTime) {
    obj.startTime = randomTime[startTime];
  }

  if (haveEndtime) {
    obj.endTime = randomTime[endTime];
  }

  data.table.push(obj);
}

fs.writeFile("data.json", JSON.stringify(data), function (err) {
  if (err) throw err;
  console.log("complete");
});

function generateAvatarArray(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(faker.image.avatar());
  }
  return arr;
}

function generateChatsArray(length) {
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr.push({
      avatar: faker.image.avatar(),
      name: faker.name.firstName(),
      text: faker.lorem.paragraph(),
      time: faker.time.recent() - (10000 - i * 30),
    });
  }
  return arr;
}

function concateLines(str) {
  const num = Math.floor(Math.random() * 5);
  let s = "";
  for (let i = 0; i < num; i++) {
    s += str;
  }
  return s;
}
