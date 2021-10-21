const faker = require('faker/locale/en_US');

const db = require('../config/connection');
const { User, Item } = require('../models');

db.once('open', async () => {
  await User.deleteMany({});
  await Item.deleteMany({});

  // create data for faked users
  const userData = [];

  for (let i = 0; i < 20; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  await User.collection.insertMany(userData);

  // create data for faked items
  const itemData = [];

  for (let i = 0; i < 10; i += 1) {
    const nameProto = faker.lorem.word();
    const pnProto = faker.datatype.number({
      'min': 100000,
      'max': 199999
    });

    // format part numbers to feature dash after initial three digits
    let pnProtoArr = pnProto.toString().split("")
    pnProtoArr.splice(3, 0, "-")
    let part_number = pnProtoArr.join("")

    // capitalize first letter of item name
    let name = nameProto.charAt(0).toUpperCase() + nameProto.slice(1)

    const quantity = faker.datatype.number({
      'min': 0,
      'max': 1000
    })

    itemData.push({ name, part_number, quantity});
  }

  await Item.collection.insertMany(itemData);

  console.log('Your totally normal warehouse database has been seeded!');
  process.exit(0);
});
