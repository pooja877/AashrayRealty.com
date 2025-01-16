import Searchbar from "../../components/searchbar/Searchbar";
import "./Homepage.scss";
function Homepage()
{
    return(
        <div className="homepage">
            <div className="text">
            <h1>Find Your Dream home</h1>
            <h2>Explore the finest properties tailored to your needs</h2>
            <Searchbar/>
            </div>
            </div> 
    );
}
export default Homepage;