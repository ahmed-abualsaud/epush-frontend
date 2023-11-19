import '../../assets/style/layout/dashboard.css'
import ScrollButton from './ScrollButton'

const Dashboard = ({ children }) => {

    return (
        <div className="dashboard">
            { children }
            <ScrollButton/>
        </div>
    )
  }
  
  export default Dashboard