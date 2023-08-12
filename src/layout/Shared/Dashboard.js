import '../../assets/style/layout/dashboard.css'
import ScrollButton from '../../component/Shared/ScrollButton'

const Dashboard = ({ children }) => {

    return (
        <div className="dashboard">
            { children }
            <ScrollButton/>
        </div>
    )
  }
  
  export default Dashboard