// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

function Name() {
  const [name, setName] = React.useState('');
  return (
    <div>
      <label htmlFor="name">Name: </label>
      {/* <input id="name" value={name} onChange={onNameChange} /> */}
      <input id="name" value={name} onChange={e=>setName(e.target.value)} />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={onAnimalChange}
      />
    </div>
  )
}

// 🐨 uncomment this
// function Display({name, animal}) {
//   return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
// }

function Display({animal}){
  return (
    <div>Your favorite animal is: {animal}!</div>
  )
}

// 💣 remove this component in favor of the new one
// function Display({name}) {
  // return <div>{`Hey ${name}, you are great!`}</div>
// }

function App() {
  // const [name, setName] = React.useState('')
  const [animal, setAnimal] = React.useState('')
  return (
    <form>
      {/* <Name name={name} onNameChange={event => setName(event.target.value)} /> */}
      <Name />
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={e => setAnimal(e.target.value)}
      />
      <Display animal={animal} />
    </form>
  )
}

export default App
