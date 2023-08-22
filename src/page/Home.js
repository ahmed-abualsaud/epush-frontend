import '../assets/style/page/home.css'
import Header from '../layout/Shared/Header'
import Footer from '../layout/Shared/Footer'
import HomeContent from '../component/Shared/HomeContent'
import SigninButton from '../component/Auth/SigninButton'
import SignupButton from '../component/Auth/SignupButton'
import Brand from '../component/Header/Brand'

const Home = () => {  
    return (
        <div className="home">
            <Header> 
                <Brand />
                <div style={{marginTop: "-8px"}}>
                    <SigninButton />
                    {/* <SignupButton /> */}
                </div>
            </Header>
            <HomeContent />
            <Footer />
        </div>
    )
  }
  
  export default Home