import React, { useState, useEffect } from 'react';
// global libraries for golden layout
import './global';
import MyComponent from './MyComponent';

// create instance
const GoldenLayout = window.GoldenLayout;

// config
var myLayout = new GoldenLayout({
  content: [
    {
      type: 'row',
      // list of window tiles
      content: [
        {
          title: 'Users',
          // to be register as component
          type: 'react-component',
          component: 'user-list',
        },
        {
          type: 'column',
          content: [
            {
              title: 'Detail',
              // to be register as component
              type: 'react-component',
              component: 'user-detail',
            },
            {
              title: 'Test',
              type: 'react-component',
              component: 'test-component',
            },
          ],
        },
      ],
    },
  ],
});

export class App extends React.Component {
  state = {
    users: [
      { name: 'Jackson Turner', street: '217 Tawny End', img: 'men_1.jpg' },
      { name: 'Megan Perry', street: '77 Burning Ramp', img: 'women_1.jpg' },
      { name: 'Ryan Harris', street: '12 Hazy Apple Route', img: 'men_2.jpg' },
      {
        name: 'Jennifer Edwards',
        street: '33 Maple Drive',
        img: 'women_2.jpg',
      },
      {
        name: 'Noah Jenkins',
        street: '423 Indian Pond Cape',
        img: 'men_3.jpg',
      },
    ],
  };
  render() {
    // to show details on click later we need this instance
    var eventHub = myLayout.eventHub;
    console.log(eventHub);

    return (
      <>
        <ul className="userlist">
          {this.state.users.map(function (user) {
            return (
              <User key={user.name} userData={user} glEventHub={eventHub} />
            );
          })}
        </ul>
      </>
    );
  }
}

const User = ({ userData, glEventHub }) => {
  const selectUser = () => {
    // create label user select for on eventhub  and pass userData
    glEventHub.emit('user-select', userData);
  };
  return <li onClick={selectUser}>{userData.name}</li>;
};

const UserDetails = () => {
  const [state, setState] = useState(null);
  useEffect(() => {
    // on click will show user detail
    myLayout.eventHub.on('user-select', setUser);
    // cleaning
    return () => {
      myLayout.eventHub.on('user-select', setUser);
    };
  });

  // update the userdata according to li click
  const setUser = (userData) => {
    setState(userData);
  };

  return state ? (
    <div className="userdetails">
      <img
        alt="profile pic"
        src={'https://s3-us-west-2.amazonaws.com/s.cdpn.io/152047/' + state.img}
        width="200"
        height="200"
      />
      <h2>{state.name}</h2>
      <p>{state.street}</p>
      <p>Gagandeep</p>
      <MyComponent />
    </div>
  ) : (
    <div className="userdetails">No user selected</div>
  );
};

class TestComponent extends React.Component {
  state = { name: 'gag' };
  render() {
    return <div>Hello</div>;
  }
}

myLayout.registerComponent('user-list', App);
myLayout.registerComponent('user-detail', UserDetails);
myLayout.registerComponent('test-component', TestComponent);
myLayout.init();

export default App;
