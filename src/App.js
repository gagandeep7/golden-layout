import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './global';

const GoldenLayout = window.GoldenLayout;

var myLayout = new GoldenLayout({
  content: [
    {
      type: 'row',
      content: [
        {
          title: 'Users',
          type: 'react-component',
          component: 'user-list',
        },
        {
          title: 'User Detail',
          type: 'react-component',
          component: 'user-detail',
        },
      ],
    },
  ],
});

// var myLayout = new GoldenLayout({
//   content: [
//     {
//       type: 'row',
//       content: [
//         {
//           type: 'react-component',
//           component: 'test-component',
//           props: { label: 'A' },
//         },
//         {
//           type: 'column',
//           content: [
//             {
//               type: 'react-component',
//               component: 'test-component',
//               props: { label: 'B' },
//             },
//             {
//               type: 'react-component',
//               component: 'test-component',
//               props: { label: 'C', name: 'Gagandeep Singh' },
//             },
//           ],
//         },
//       ],
//     },
//   ],
// });

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
    glEventHub.emit('user-select', userData);
  };
  return <li onClick={selectUser}>{userData.name}</li>;
};

const UserDetails = () => {
  const [state, setState] = useState(null);
  useEffect(() => {
    myLayout.eventHub.on('user-select', setUser);
    return () => {
      myLayout.eventHub.on('user-select', setUser);
    };
  });
  const setUser = (userData) => {
    setState(userData);
  };

  return state ? (
    <div className="userdetails">
      <img
        src={'https://s3-us-west-2.amazonaws.com/s.cdpn.io/152047/' + state.img}
        width="100"
        height="100"
      />
      <h2>{state.name}</h2>
      <p>{state.street}</p>
    </div>
  ) : (
    <div className="userdetails">No user selected</div>
  );
};

myLayout.registerComponent('user-list', App);
myLayout.registerComponent('user-detail', UserDetails);
myLayout.init();

export default App;
