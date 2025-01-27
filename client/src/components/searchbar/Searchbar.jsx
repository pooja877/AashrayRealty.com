import './Searchbar.scss'
function Searchbar() {
  return (
    <>
   <div className="boxes">
    {/* Buy */}
   <button className='box'>Buy</button> 
    {/* Rent */}
    <button className="box">Rent</button>
   </div>
   {/* search  */}
   <div className="searchbar">
    <form action="">
     <input type="search" name="search" placeholder="🔍Search..."/>
    </form>
    <button className='btnSearch'>Search</button>
   </div>
    </>
  );
}
export default Searchbar; 
