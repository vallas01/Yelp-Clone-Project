import { useHistory } from "react-router-dom"
import { useSearchBar } from "../../context/SearchBarContext"
import { useState } from "react"
import './SearchBar.css'


const SearchBar = () => {
  const history = useHistory()
  const { setSearchTerm } = useSearchBar()
  const [tempSearch, setTempSearch] = useState('')


  const submitSearch = e => {
    e.preventDefault()
    history.push('/restaurants')
    setSearchTerm(tempSearch)
    setTempSearch('')
  }
  return (<form onSubmit={submitSearch}>
    <input
      placeholder="Donuts, Burgers, Tacos, etc..."
      value={tempSearch}
      onChange={e => setTempSearch(e.target.value)}
    />
    <button>Res</button>
  </form>)
}


export default SearchBar
