import withOperationCellParameters from "../HOC/withOperationCellParameters"
import Card2 from "../layout/Shared/Card2"
import DataRows from "../layout/Table/DataRows"
import HeadCells from "../layout/Table/HeadCells"
import HeadRow from "../layout/Table/HeadRow"
import Table from "../layout/Table/Table"
import TableBody from "../layout/Table/TableBody"
import TableHead from "../layout/Table/TableHead"
import UpdateRowCell from "../layout/TableOperation/UpdateRowCell"
import { isEmpty, snakeToBeautifulCase } from "../utils/helper"
import Avatar from "../layout/Shared/Avatar"
import { useEffect, useState } from "react"
import useCoreApi from "../api/useCoreApi"
import { showAlert } from "../utils/validator"
import { render } from "../setup/navigator"
import Section from "../layout/Shared/Section"
import Input from "../layout/Shared/Input"
import { getElement } from "../utils/dom"
import useAuthApi from "../api/useAuthApi"
import Page from "./Page"

const Profile = ({ user, role }) => {

    const excludedColumns = [
        "clientId", 
        "isNotify", 
        "ip_required", 
        "ip", 
        "deleteDate", 
        "updateDate", 
        "saveDate", 
        "reg_date", 
        "areaId",
        "agree", 
        "active", 
        "userId", 
        "adminId", 
        "business_field_id" , 
        "sales_id", 
        "show_msg_details", 
        "birthDate", 
        "FDelete", 
        "access", 
        "IsTestAccount", 
        "governmentId", 
        "created_at", 
        "updated_at", 
        "deleted_at", 
        "avatar", 
        "email_verified_at",
        "fullName",
        "mobile",
        "use_api",
        "api_token",
        "pricelistId",
        "id",
        "pricelist_id",
        "user_id",
        "client_id",
        "sales",
        "businessfield",
        "lastOrder",
        "balance",
    ]

    const [avatar, setAvatar] = useState({})
    const [currentUser, setCurrentUser] = useState(user)

    const { updateUser } = useAuthApi()
    const { updateAdmin, updateClient } = useCoreApi()

    useEffect(() => {
        setCurrentUser(user)
    }, [user]);

    let data = Object.entries(currentUser).filter(([attributeName, attributeValue]) => 
        ! excludedColumns.includes(attributeName)
    ).map(([attributeName, attributeValue]) => ({
        attributeName: snakeToBeautifulCase(attributeName),
        attributeValue
    }))

    if (role === "client") {
        data.push(
            {attributeName: "Pricelist", attributeValue: currentUser.lastOrder?.pricelist.name ?? "NULL"},
            {attributeName: "Sales Name", attributeValue: currentUser.sales?.name ?? "NULL"},
            {attributeName: "Business Field", attributeValue: currentUser.businessfield?.name ?? "NULL"}
        )
    }

    const updateUserData = async (attr) => {
        render("modal-content", "update-user-attribute", attr, updateUserAttribute)
    }

    const onSelectAvatar = (avatar) => {
        setAvatar(avatar)
    }

    const updateUserAttribute = async (attributeName, attributeValue) => {
        if (! isEmpty(attributeValue)) {
            let result = []
            let data = new FormData()
            data.append(attributeName, attributeValue)
            if (["admin", "super_admin"].includes(role)) {
                result = await updateAdmin(user.id, data)
            }

            if (role === "client") {
                result = await updateClient(user.id, data)
            }

            if (! isEmpty(result)) {
                setCurrentUser(result)
                showAlert(`Client ${snakeToBeautifulCase(attributeName)} updated successfully`)
            }
        } else {
            showAlert(`Please enter ${snakeToBeautifulCase(attributeName)} first`)
        }
    }

    const changePassword = async () => {

        let input = new FormData()
        input.append("password", getElement("password")?.value)
        input.append("password_confirmation", getElement("password-confirmation")?.value)

        if (isEmpty(input.get("password"))) {
            showAlert("Password is Required")
            return
        }

        if (isEmpty(input.get("password_confirmation"))) {
            showAlert("Password Confirmation is Required")
            return
        }

        const result = await updateUser(user?.id, input);
        if (! isEmpty(result)) {
            showAlert("Password Changed Successfully!")
        }
    }

    return (
        <Page title="Profile Information">
            {role !== "client"? <></> :
            <div className="m-5">
                <Card2>
                    <div>Balance: {currentUser.balance} LE</div>
                    <div>Number of Messages: {currentUser.lastOrder?.pricelist? Math.floor(currentUser.balance / currentUser.lastOrder.pricelist.price) : 0}</div>
                </Card2>
            </div>}

            <Avatar imageUrl={user.avatar} onSelectAvatar={onSelectAvatar}/>
            <div className="w-100 d-flex justify-content-center">
                <button className="button" onClick={() => updateUserAttribute("avatar", avatar)}>Update Avatar</button>
            </div>
            
            <Section title="Change Password">
                <div style={{color: "red", margin: "20px"}}>Note: The minimum password length is 8 characters and must contain numbers, lowercase letters, uppercase letters, and at least one special character.</div>
                <Input id="password" type="password" icon="fas fa-lock" placeholder="Password"/>
                <Input id="password-confirmation" type="password" icon="fas fa-lock" placeholder="Password Confirmation"/>
                <div className="w-100 d-flex justify-content-center">
                    <button className="button" onClick={() => changePassword()}>Change Password</button>
                </div>
            </Section>

            <Table>
                <TableHead>
                    <HeadRow>
                        <HeadCells columns={["Attribute Name", "Attribute Value"]}/>
                    </HeadRow>
                </TableHead>
                <TableBody>
                    <DataRows columns={["attributeName", "attributeValue"]} rows={data} except={[
                        {attributeName: "Enabled"}, 
                        {attributeName: "Pricelist"},
                        {attributeName: "Sales Name"},
                        {attributeName: "Business Field"},
                    ]}>
                        {withOperationCellParameters(UpdateRowCell, "updateFunction", updateUserData, {popup: true})}
                    </DataRows>
                </TableBody>
            </Table>
        </Page>
    )
}

export default Profile