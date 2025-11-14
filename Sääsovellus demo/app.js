//https://github.com/heimat-rpkk/kv_saa_app/blob/master/0-exercise.md
async function haeSaa(kaupunki) {
    const apiKey = "84fc451f48f0b1827acf5cd224d87066";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${kaupunki}&appid=${apiKey}&units=metric&lang=fi`;
    try {
        const vastaus = await fetch(url);
        const data = await vastaus.json();
        return data;
    } catch (error) {
        console.error("", error);
        return null;
    }
}

async function naytaSaa(kaupunki, elementId) {
    const tulos = document.querySelector(`#${elementId}`);
    const data = await haeSaa(kaupunki);
    const kuvaus = data.weather[0].description;
    const lampo = Math.round(data.main.temp);
    const ikoni = data.weather[0].icon;

    tulos.innerHTML = `
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/img/wn/${ikoni}@2x.png">
        <p>${kuvaus}, ${lampo} °C</p>
        <button onclick="hae5pvSaa('${data.name}', 'ennuste')">Hae 5pv sää</button>
    `;
}

async function hae5pvSaa(kaupunki, elementId) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${kaupunki}&appid=84fc451f48f0b1827acf5cd224d87066&units=metric`;
    try {
        const vastaus = await fetch(url);
        const data = await vastaus.json();
        const tulos = document.querySelector(`#${elementId}`);
        // const kuvaus = data.weather[0].description;
        // const lampo = Math.round(data.main.temp);
        // const ikoni = data.weather[0].icon;
        console.log(data);
        const lampotila1 = (data.list[1].main.temp);
        const lampotila2 = (data.list[9].main.temp);
        const lampotila3 = (data.list[17].main.temp);
        const lampotila4 = (data.list[25].main.temp);
        const lampotila5 = (data.list[33].main.temp);
        tulos.innerHTML = `
        <h2>${kaupunki} 5vrk Ennuste</h2>
        <p>${lampotila1} °C</p>
        <p>${lampotila2} °C</p>
        <p>${lampotila3} °C</p>
        <p>${lampotila4} °C</p>
        <p>${lampotila5} °C</p>
    `;

        return data;
    } catch (error) {
        console.error("", error);
        return null;
    }
}


async function haeSaat() {
    await naytaSaa("raahe", "raahe");
    await naytaSaa("zlin", "zlin");
    await naytaSaa("girona", "girona");
    await naytaSaa("brussels", "bryssel");
}

  haeSaat();
