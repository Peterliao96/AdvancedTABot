const config = {
      apiKey: "AIzaSyBJI7zLNWD6j6F5OjSaacISoKCA2DDklVg",
      authDomain: "student-housing-1530458329105.firebaseapp.com",
      databaseURL: "https://student-housing-1530458329105.firebaseio.com",
      projectId: "student-housing-1530458329105",
      storageBucket: "student-housing-1530458329105.appspot.com"
  };
const selectorData = [
  {
    id:1,
    name:'Take photos'
  },
  {
    id:2,
    name:'Choose photos from libraries'
  }
];

const options = [
  {
    key: 'Waterloo,Ontario',
    label: 'Waterloo,Ontario',
    searchKey: 'Ontario',
  },
  {
    key: 'Kitchener,Ontario',
    label: 'Kitchener,Ontario',
    searchKey: 'Ontario',
  },
  {
    key: 'Toronto,Ontario',
    label: 'Toronto,Ontario',
    searchKey: 'Ontario',
  },
  {
    key: 'Mississauga,Ontario',
    label: 'Mississauga,Ontario',
    searchKey: 'Ontario',
  },
  {
    key: 'Hamilton,Ontario',
    label: 'Hamilton,Ontario',
    searchKey: 'Ontario',
  },
  {
    key: 'Guelph,Ontario',
    label: 'Guelph,Ontario',
    searchKey: 'Ontario',
  },
  {
    key: 'Niagara Falls,Ontario',
    label: 'Niagara Falls,Ontario',
    searchKey: 'Ontario',
  },
  {
    key: 'London,Ontario',
    label: 'London,Ontario',
    searchKey: 'Ontario',
  },
  {
    key: 'Kingston,Ontario',
    label: 'Kingston,Ontario',
    searchKey: 'Ontario',
  },
  {
    key: 'Markham,Ontario',
    label: 'Markham,Ontario',
    searchKey: 'Ontario',
  },
  {
    key: 'Vaughan,Ontario',
    label: 'Vaughan,Ontario',
    searchKey: 'Ontario',
  },
  {
    key: 'Windsor,Ontario',
    label: 'Windsor,Ontario',
    searchKey: 'Ontario',
  },
  {
    key: 'Brampton,Ontario',
    label: 'Brampton,Ontario',
    searchKey: 'Ontario',
  },
  {
    key: 'Vancouver,British Columbia',
    label: 'Vancouver,British Columbia',
    searchKey: 'British Columbia',
  },
  {
    key: 'Victoria,British Columbia',
    label: 'Victoria,British Columbia',
    searchKey: 'British Columbia',
  },
  {
    key: 'Calgary,Alberta',
    label: 'Calgary,Alberta',
    searchKey: 'Alberta',
  },
  {
    key:'Select City',
    label:'Select City'
  }
];

const message = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Yes, and I use Gifted Chat!',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: 'Developer',
    },
    sent: true,
    received: true,
    // location: {
    //   latitude: 48.864601,
    //   longitude: 2.398704
    // },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Are you building a chat app?',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'React Native',
    },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "You are officially rocking GiftedChat.",
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    system: true,
  },
];

const oldMessage = [
  {
    _id: Math.round(Math.random() * 1000000),
    text:
      "It uses the same design as React, letting you compose a rich mobile UI from declarative components https://facebook.github.io/react-native/",
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: "Developer"
    }
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "React Native lets you build mobile apps using only JavaScript",
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 1,
      name: "Developer"
    }
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "This is a system message.",
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    system: true
  }
];

module.exports = {config, options,message,oldMessage,selectorData}
