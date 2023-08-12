import '../../assets/style/component/showall.css'

const ShowAll = ({ onCheck }) => {

    const onChangeHandler = (e) => {
        if (e.target.checked) {
            onCheck()
        }
    }

    return (
        <div className="showall-container">
            <label for="show-all">Show All</label>
            <input type="checkbox" id="show-all" onChange={onChangeHandler}/>
        </div>
    )
}

export default ShowAll