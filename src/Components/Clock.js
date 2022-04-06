function Clock() {
    const today = new Date();
    let weekdays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    let day = weekdays[today.getDay()];

    function checkTime(i) {
        if (i < 10) {
            i = '0' + i;
        };
        return i;
    }

    window.onload = function time() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        document.getElementById('time').innerHTML =  hours + ":" + minutes ;

        setTimeout(time, 1000);
    }

    return (
        <div className="clock">
            <u id="time"></u>, 
            <u> {day}</u>
        </div>
    );
  }
  
  export default Clock;