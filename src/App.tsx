import { API_URL } from "./config/constants"
import { useFetch } from "./hooks"

interface Data {
  name: string,
  lastName: string,
  age: number
}

function App() {
  const {data, error, loading} = useFetch<Data>(API_URL)

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error)  {
    return <div>UPS! Hay un error: {error.message}</div>
  }

  return (
    <>
      <h1>DASHBOARD</h1>
      <div>{JSON.stringify(data)}</div>
    </>
  )
}

export default App
