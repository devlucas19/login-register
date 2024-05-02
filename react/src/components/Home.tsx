// Home
import { useSelector } from "react-redux";
import { useInformations } from "../redux/UserReducer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useSelector(useInformations);
  const navigate = useNavigate()

  return (
    <>
      {user.email ? 
      <div className="home-container">
        <div className="lateral-menu">
          <div className="lateral-menu-itens">
        <button className="itens">ACCOUNT INFORMATIONS</button>
        <button className="itens">HELP</button>
        <button className="itens">SECUTIRY</button>        
        <button className="itens" onClick={()=>{navigate('/')}}>LOG OUT</button>
          </div>
        </div>

        <div className="information-menu">
          <div className="informations">
            <p>EMAIL: {user.email}</p>
            <p>FIRST NAME: {user.firstName}</p>
            <p>LAST NAME: {user.lastName}</p>
          </div>
        </div>
      </div>
      : 
      <div className="not-logged">
        <p className="not-logged-notify">YOU'RE NOT LOGGED</p>
        <p className="login-redirect" onClick={()=>{navigate('/')}}>GO TO LOGIN PAGE</p>
      </div>
      }
    </>
  );
};

export default Home;


