import Card from "../../layout/Shared/Card"

const Service = ({ services }) => {

    return (
        <div>
            {services.map((service) => (
                <Card
                    key={ service.id } 
                    service={ service }
                    title={ service.name.charAt(0).toUpperCase() + service.name.slice(1) }
                    icon={ 
                        service.name === "auth" ? "fas fa-lock" : 
                        service.name === "file" ? "fas fa-file-alt" : 
                        service.name === "core" ? "fas fa-atom" : 
                        "fas fa-sack-dollar"
                    }
                    description={ service.description }
                    identifier={ service.domain }
                />
            ))}
        </div>
    )
}

export default Service