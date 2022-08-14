import Recipes from "./Recipes";
import axios from "axios";
import SearchForm from "./SearchForm";
import bootstrap from "bootstrap";

function App() {
  return (
    <div className= 'tc'>
        <SearchForm />
        <Recipes />
        
    </div>
  );
}
export default App;