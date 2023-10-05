const CensoredWord = ({ word, blacklistedWord}) => {

    return (
        <div style={{height: "100%", fontSize: "35px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly"}}>
            <div>The word: <span style={{color: "red"}}>{word}</span></div>
            <div>Is matching the censored word: <span style={{color: "red"}}>{blacklistedWord}</span></div>
            <div>Therefore, we recommend changing it</div>
        </div>
    )
}

export default CensoredWord