const obtenervalorinput = () => {
    let inputTexto =document.getElementById("input_pais");
    let valor = inputTexto.value 
    peticionapi(valor)
    //console.log(valor)
    //alert(valor)
}

const peticionapi = (pais) => {
    const baseurl = 'https://restcountries.com/v3.1/';
    const endpoint = `name/${pais}`;
    const url = `${baseurl}${endpoint}`;

    axios
        .get(url)
        .then(res => printdata(res.data))
        .catch(err => console.log(err))
    
}
const printdata = (data) => {
    let respuesta = document.getElementById('show-info');
    respuesta.innerHTML = `
        <h3>Bandera: ${data[0]['flag']}</h3>
        <label><h3>Pais: ${data[0].name.common}</h3></label>
        <label><h3>Capital: ${data[0]['capital']}</h3></label>
        <label><h3>Poblacion ${data[0]['population']}</h3></label>
        <label><h3>Area ${data[0]['area']}</h3></label>
        <label><h3>Zona horaria ${data[0]['timezones']}</h3></label>
        <label><h3>Continente ${data[0]['continents']}</h3></label>
        <label><h3>Fronteras ${data[0]['borders']}</h3></label>
        <label><h3>Region ${data[0]['region']}</h3></label>
    `
}
