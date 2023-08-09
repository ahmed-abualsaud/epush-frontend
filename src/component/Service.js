import Card from "../layout/Card"

const Service = ({ services }) => {

    return (
        <div>
            {services.map((service) => (
                <Card
                    key={ service.id } 
                    service={ service }
                    title={ service.name.charAt(0).toUpperCase() + service.name.slice(1) }
                    icon={ service.name === "auth" ? "uil uil-lock-alt" : service.name === "file" ? "uil uil-file-alt" : "uil uil-atom"} 
                    description={ service.description }
                    identifier={ service.domain }
                />
            ))}
        </div>
    )
}

export default Service