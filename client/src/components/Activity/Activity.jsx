import './Activity.scss';

export default function Activity() {
  return (
    <>
      <h2>My Activity</h2>
          <div className="myActivity">
         
            <div className="activity">
              <img className="image"src="./house-heart-fill_1.png" />
              <p>Saved Properties</p>
              <span>00</span>
            </div>
            <div className="activity">
              <img className="image" src="./house-circle-check_1.png" />
              <p>Seen Properties</p>
              <span>00</span>
            </div>
          </div>
    </>
  )
}
