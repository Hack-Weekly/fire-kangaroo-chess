import './Header.css'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div id='headerComponent'>
        <Link to={'/'}>
          <img src="https://escrituras-eremitas.com/wp-content/uploads/2023/05/FireKnoBG-2.png" alt="Fire Logo" />
        </Link>
        <nav>
            {/* <a href="">LOGIN</a> 
            <a href="" className="fireBtn">REGISTER</a> */}
        </nav>
    </div>
    
  )
}