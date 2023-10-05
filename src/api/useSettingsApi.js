import qs from "qs"
import useAxiosApi from "./Api"
import { useState } from "react"
import { castVariable, isEmpty } from "../utils/helper"

const useSettingsApi = () => 
{

    const { api, handleErrorResponse } = useAxiosApi()
    const [settings, setSettings] = useState([])

    const getSettings = async (settingsID) =>
    {
        try {
            return (await api.get("/settings/" + settingsID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const getSettingsValueByName = async (settingsName) =>
    {
        let stg = structuredClone(settings)

        if (isEmpty(stg)) {
            stg = (await listSettings(1000000000000))?.data ?? []
            setSettings(stg)
        }

        stg = stg.find(setting => setting?.name === settingsName)
        return castVariable(stg?.value, stg?.type) ?? 0
    }

    const getSettingsByName = async (settingsName) =>
    {
        let stg = structuredClone(settings)

        if (isEmpty(stg)) {
            stg = (await listSettings(1000000000000))?.data ?? []
            setSettings(stg)
        }

        stg = stg.find(setting => setting?.name === settingsName)
        stg.value = castVariable(stg?.value, stg?.type) ?? 0
        return stg
    }

    const addSettings = async (settings) =>
    {
        try {
            return (await api.post("/settings", settings)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const listSettings = async (perPage) =>
    {
        try {
            return (await api.get("/settings?" + qs.stringify({take: perPage}))).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const updateSettings = async (settingsID, data) =>
    {
        try {
            const updatedSettings = (await api.put("/settings/" + settingsID , data)).data.data
            setSettings((await listSettings(1000000000000))?.data ?? [])
            return updatedSettings

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const deleteSettings = async (settingsID) =>
    {
        try {
            return (await api.delete("/settings/" + settingsID)).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }

    const searchSettings = async (take, column, value) =>
    {
        try {
            return (await api.post("/settings/search?" + qs.stringify({take: take}), {column: column, value: value})).data.data

        } catch (error) {
            return handleErrorResponse(error)
        }
    }


    return {


        getSettings,

        getSettingsValueByName,

        getSettingsByName,

        addSettings,

        listSettings,

        updateSettings,

        deleteSettings,

        searchSettings
    }
}

export default useSettingsApi