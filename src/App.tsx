import { Container } from "@mui/material"
import { API_URL } from "./config/constants"
import { useFetch } from "./hooks"
import Navbar from "./components/navbar/Navbar"

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
    <Container>
      <Navbar />
        <div>{JSON.stringify(data)}</div>
    </Container>
  )
}

export default App
