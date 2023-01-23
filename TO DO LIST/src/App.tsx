import './App.css'
import { Body } from './components/Body/Body'
import { Layout } from './components/Layout/Layout'
import { ListContainer } from './components/ListContainer/ListContainer'

function App() {

  return (
    <div className="App">
      <Layout>
        <Body />
      </Layout>
    </div>
  )
}

export default App
