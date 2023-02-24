let find = document.getElementById("find");
function myreq(city) {
  let myreq = new XMLHttpRequest();
  myreq.open(
    "get",
    `https://api.weatherapi.com/v1/forecast.json?key=f34e814fea1b4d719ee114114231902&q=${city}&days=3`
  );
  myreq.send();
  myreq.addEventListener("readystatechange", function () {
    if (this.readyState === 4 && this.status === 200) {
      let data = JSON.parse(myreq.responseText);
      currentday(data);
      nextday(data, 1);
      nextday(data, 2);
    }
  });
}
myreq(`cairo`);
function currentday(data) {
  let day = document.getElementById("currday");
  let date = document.getElementById("currdate");
  let city = document.getElementById("currcity");
  let temp = document.getElementById("currtemp");
  let status = document.getElementById("currstatus");
  let icon = document.getElementById("curricon");
  let dateFromData = new Date(data.location.localtime);
  day.innerHTML = dateFromData.toLocaleString("default", {
    weekday: "long",
  });
  date.innerHTML = `${dateFromData.toLocaleString("default", {
    day: "numeric",
  })}
  ${dateFromData.toLocaleString("default", { month: "long" })}`;
  city.innerHTML = data.location.name;
  temp.innerHTML = `${data.current.temp_c}<sup>o</sup>C`;
  icon.src = data.current.condition.icon;
  status.innerHTML = data.current.condition.text;
}

function nextday(data, index) {
  let day = document.querySelector(`.weekday-name${index}`);
  let max_temp = document.querySelector(`.max-temp${index}`);
  let min_temp = document.querySelector(`.min-temp${index}`);
  let text = document.querySelector(`.sta-text${index}`);
  let icon = document.querySelector(`.next-icon${index}`);
  let datalist = data.forecast.forecastday;
  day.innerHTML = new Date(datalist[index].date).toLocaleString("default", {
    weekday: "long",
  });
  icon.src = datalist[index].day.condition.icon;
  text.innerHTML = datalist[index].day.condition.text;
  max_temp.innerHTML = datalist[index].day.maxtemp_c;
  min_temp.innerHTML = datalist[index].day.mintemp_c;
}
find.addEventListener("input", function () {
  if (`${this.value}`.length > 2) myreq(this.value);
});
