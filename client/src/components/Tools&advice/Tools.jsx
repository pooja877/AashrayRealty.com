import { useState } from 'react';
import './tools.scss';

export default function Tools() {
    const [showTool,setShowTool]=useState(false);
  return (
    <>
    <div className="tools" onClick={()=>setShowTool(!showTool)} >
            <img className="image" src="./cal.jpg" alt="" />
            <div className="toolprodata">
            <p className='tooltitle'>Tools & Advices</p>
            <img className="image" src="./arrow-down-circle_1.png" alt="" />
            </div>

          </div>

          {showTool && <div className="tools_">
            <div className="tool">
              <img className="image"src="./book-reader_3.png" alt="guid" />
              <p>Buying Guide</p>
            </div>
            <div className="tool">
            <img className="image"src="./emi.png" alt="EMI" />
            <p>EMI Calculator</p>
            </div>
            
          </div>
         }
         </>
  )
}
