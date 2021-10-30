// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
const GreetingMemoized = React.memo(Greeting)

function Greeting({initialName}) {
  console.log('Hey')
  const [name, setName] = useLocalStorageState('name', initialName)
  // const getNameFromLocalStorage = () => window.localStorage.getItem('name') || '';
  // const [name, setName] = React.useState(getNameFromLocalStorage)
  // React.useEffect(()=>{
  //   window.localStorage.setItem('name', name);
  // }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [count, setCount] = React.useState(0)
  return (
    <>
      <button onClick={() => setCount(count => count + 1)}>{count}</button>
      <GreetingMemoized />
    </>
  )
}

// Hook for grabbing and updating local storage
const useLocalStorageState = (
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) => {
  // Cheaper to make function because call to ls is async.
  const [value, setValue] = React.useState(() => {
    const localStorageVal = window.localStorage.getItem(key)
    return localStorageVal
      ? deserialize(localStorageVal)
      : typeof defaultValue === 'function'
      ? defaultValue()
      : defaultValue
  })
  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(value))
    // In case of changing keys
  }, [value, key, serialize])

  return [value, setValue]
}

export default App
