import '../../assets/style/layout/date-button.css'

const DateTimeButton = ({ onClick, onSelectDate, children }) => {

  const handleDateSelection = (e) => {
      const userDate = new Date(e.currentTarget.value)
      const timezoneOffset = userDate.getTimezoneOffset() * 60000
      const localDate = new Date(userDate.getTime() - timezoneOffset)
      const selectedDateTime = localDate.toISOString().replace("T", " ").slice(0, 19)
      onSelectDate(selectedDateTime)
  }

  return (
    <div className="date-button-container">
      <button className="date-button" onClick={onClick}>
        { children }
      </button>
      <div className="date-button-icon">
        <i className="fas fa-calendar-days"></i>
        <input
          id="date-time-input"
          type="datetime-local"
          className="date-button-input"
          onInput={handleDateSelection}
        />
      </div>
    </div>
  )
}

export default DateTimeButton