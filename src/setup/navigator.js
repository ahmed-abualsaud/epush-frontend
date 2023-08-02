import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import store from "../container/redux/store"
import { Provider } from "react-redux"
import getComponent from '../setup/component-map'
import { getElement } from '../utils/dom'

let currentRoute = -1

let routes = []

export function addRoute(containerID, componentKey, params) 
{
    ++currentRoute
    routes = routes.slice(0, currentRoute + 1)
    routes.push({
        containerID: containerID,
        componentKey: componentKey,
        params: params
    })
}

export function nextRoute()
{
    if (currentRoute < routes.length - 1) {
        ++currentRoute
        let route = routes[currentRoute]
        render(route.containerID, route.componentKey, ...route.params)
    }
}

export function previousRoute()
{
    if (currentRoute > 0) {
        --currentRoute
        let route = routes[currentRoute]
        render(route.containerID, route.componentKey, ...route.params)
    }
}

export function render(containerID, componentKey, ...params) 
{
    createRoot(getElement(containerID)).render(<Provider store={store}><BrowserRouter> { getComponent(componentKey, ...params) } </BrowserRouter> </Provider>)
}

export function navigate(containerID, componentKey, ...params) 
{
    addRoute(containerID, componentKey, params)
    createRoot(getElement(containerID)).render(<Provider store={store}><BrowserRouter> { getComponent(componentKey, ...params) } </BrowserRouter> </Provider>)
}

export function hydrate(component, containerID) {
    ReactDOM.hydrate(<Provider store={store}><BrowserRouter> { component } </BrowserRouter> </Provider>, getElement(containerID))
}