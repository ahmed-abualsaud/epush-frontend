import { useEffect, useRef } from 'react'
import Page from '../../page/Page'
import NavBar from '../Navigation/NavBar'
import { render } from '../../setup/navigator'

const TopNav = () => {

    const setupLock = useRef(true)
    const setup = async () => {
        render("list-users", "list-clients")
    }
    useEffect(() => {
        if (setupLock.current) { setupLock.current = false; setup() }
    }, [])

    const listClients = () => {
        render("list-users", "list-clients")
    }

    const listAdmins = () => {
        render("list-users", "list-admins")
    }

    const listUsers = () => {
        render("list-users", "list-users")
    }

    return (
        <Page className="m-0">
            <NavBar>
                <div onClick={listClients}><i className="fas fa-shield-halved"></i>Clients</div>
                <div onClick={listAdmins}><i className="fas fa-shield"></i>Admins</div>
                <div onClick={listUsers}><i className="fas fa-user-shield"></i>All</div>
            </NavBar>

            <div style={{marginTop: "-1px"}} id="list-users"></div>

        </Page>
    )
}

export default TopNav