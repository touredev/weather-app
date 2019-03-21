const fahreinhatToCelsius = (degree) => { return ((degree - 32) * 5 / 9).toFixed(2) };

function setIcons(icon, iconID) {
  const skycons = new Skycons({color: 'white'});
  const currentIcon = icon.replace(/-/g, '_').toUpperCase();
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}

window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      ({ longitude: long, latitude: lat } = position.coords);

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/e1da00587fea617ae2580304ee779ac2/${lat},${long}`;

      fetch(api).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        const { temperature, summary, icon } = data.currently;
        // Set DOM Elements from API
        temperatureDescription.innerHTML = summary;
        temperatureDegree.innerHTML = fahreinhatToCelsius(temperature);
        locationTimezone.innerHTML = data.timezone;
        // Set Icon
        setIcons(icon, document.querySelector('.icon'));
      });
    });
  }

});

