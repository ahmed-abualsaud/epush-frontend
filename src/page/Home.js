import '../assets/style/page/home.css'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import HomeContent from '../component/HomeContent'
import SigninButton from '../component/SigninButton'
import SignupButton from '../component/SignupButton'
import Brand from '../component/Brand'

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