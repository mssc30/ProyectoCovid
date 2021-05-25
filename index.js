var globalConfirmados = document.querySelector('#global-confirmados');
var globalMuertos = document.querySelector('#global-muertos');
var mexicoActivos = document.querySelector('#mexico-activos');
var mexicoMuertos = document.querySelector("#mexico-muertos");
var tituloPrincipal = document.querySelector('#titulo-principal');
var subtitulo = document.querySelector('#subtitulo');
var btnEnviar = document.querySelector("#btnEnviar");
var txtEmail = document.querySelector("#email");
var txtMensaje = document.querySelector("#mensaje");


var dataEdosMexico = [
      //{ x: 95, y: 85, name: 'BE', estado: 'Belgium' }
  ];

configDataEdos =  {
    chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
    },

    legend: {
        enabled: false
    },

    title: {
        text: 'Casos confirmados y muertes en los estados de México'
    },

    accessibility: {
        point: {
            valueDescriptionFormat: '{index}. {point.name}, Muertes: {point.x}, Confirmados: {point.y}.'
        }
    },

    xAxis: {
        gridLineWidth: 1,
        title: {
            text: 'Muertes'
        },
        labels: {
            format: '{value} '
        },
    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
            text: 'Confirmados'
        },
        labels: {
            format: '{value}'
        },
        maxPadding: 0.2
    },

    tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h3>{point.estado}</h3></th></tr>' +
            '<tr><th>Muertes:</th><td>{point.x}</td></tr>' +
            '<tr><th>Confirmados:</th><td>{point.y}</td></tr>',
        footerFormat: '</table>',
        followPointer: true
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },

    series: [{
        data: dataEdosMexico
    }]

};

var estadosMXCodes={
  Aguascalientes:'mx-ag',
  'Baja California':'mx-bc',
  'Baja California Sur':'mx-bs',
  Campeche:'mx-cm',
  Chiapas:'mx-cs',
  Chihuahua:'mx-ch',
  'Ciudad de Mexico':'mx-df',
  Coahuila:'mx-co',
  Colima:'mx-cl',
  Durango:'mx-dg',
  Guanajuato:'mx-gj',
  Guerrero:'mx-gr',
  Hidalgo:'mx-hg',
  Jalisco:'mx-ja',
  Mexico:'mx-mx',
  Michoacan:'mx-mi',
  Morelos:'mx-mo',
  Nayarit:'mx-na',
  'Nuevo Leon':'mx-nl',
  Oaxaca:'mx-oa',
  Puebla:'mx-pu',
  Queretaro:'mx-qt',
  'Quintana Roo':'mx-qr',
  'San Luis Potosi':'mx-sl',
  Sinaloa:'mx-si',
  Sonora:'mx-so',
  Tabasco:'mx-tb',
  Tamaulipas:'mx-tm',
  Tlaxcala:'mx-tl',
  Yucatan: 'mx-yu',
  Veracruz:'mx-ve',
  Zacatecas:'mx-za'
}

//VARIABLES DE INICIALIZACION DE GRAFICO MEXICO
var dataCovidMexico = [];
/*[
  ['mx-3622', 0],
  ['mx-bc', 1],
  ['mx-bs', 2],
  ['mx-so', 3],
  ['mx-cl', 4],
  ['mx-na', 5],
  ['mx-cm', 6],
  ['mx-qr', 7],
  ['mx-mx', 8],
  ['mx-mo', 9],
  ['mx-df', 10],
  ['mx-qt', 11],
  ['mx-tb', 12],
  ['mx-cs', 13],
  ['mx-nl', 14],
  ['mx-si', 15],
  ['mx-ch', 16],
  ['mx-ve', 17],
  ['mx-za', 18],
  ['mx-ag', 19],
  ['mx-ja', 20],
  ['mx-mi', 21],
  ['mx-oa', 22],
  ['mx-pu', 23],
  ['mx-gr', 24],
  ['mx-tl', 25],
  ['mx-tm', 26],
  ['mx-co', 27],
  ['mx-yu', 28],
  ['mx-dg', 29],
  ['mx-gj', 30],
  ['mx-sl', 31],
  ['mx-hg', 32]
];*/

configDataMapMexico = {
  chart: {
      map: 'countries/mx/mx-all'
  },

  title: {
      text: 'Casos confirmados en México'
  },

  subtitle: {
      text: 'Origen: <a href="http://code.highcharts.com/mapdata/countries/mx/mx-all.js">Mexico</a>'
  },

  mapNavigation: {
      enabled: true,
      buttonOptions: {
          verticalAlign: 'bottom'
      }
  },

  colorAxis: {
      min: 0,
      minColor : '#FFFFFF',
      maxColor : '#FF6347'
  },

  series: [{
      data: dataCovidMexico,
      name: 'Casos COVID-19',
      states: {
          hover: {
              color: '#F08080'
          }
      },
      dataLabels: {
          enabled: true,
          format: '{point.name}'
      }
  }]
};

//VARIABLE DE CONFIGURACION DEL GRAFICO 1
var datosGrafico = {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Datos COVID-19'
  },
  xAxis: {
      categories: [] //['Mexico', 'EU', 'Canada']
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Valores'
      }
  },
  tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: true
  },
  plotOptions: {
      column: {
          stacking: 'percent'
      }
  },
  series: [{
      name: 'Activos',
      data: []
  }, {
      name: 'Recuperados',
      data: []
  }, {
      name: 'Muertes',
      data: []
  }]
};

document.addEventListener('DOMContentLoaded', function () {
    updateCovidData();
    updateCovidMexicoMapData();
    //console.log("¡Estamos en vivo!");

    animateText(tituloPrincipal, 1, 40, "px", 2000);
    animateText(subtitulo, 1, 18, "px", 2000);
});

btnEnviar.addEventListener('click', async function(event){
    //Validación
    if(!email.validity.valid){
        alert("Se esperaba una direccion de correo electronico.");
        return;
    }

    if(!mensaje.validity.valid){
        alert("Cuentanos algo, no dejes el mensaje vacio.");
        return;
    }

    event.preventDefault(); //detiene el envio del form
    btnEnviar.disabled = true;

    var url = "http://localhost:8090/api/contacto/guardar";
    var data = {"email":email.value, "mensaje":mensaje.value}

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer-when-downgrade',
        body: JSON.stringify(data)
    });

    //console.log(response.json());

    if(response.ok){
        alert("Se ha registrado correctamente tu email y mensaje.");
    }else{
        alert("Ocurró un problema al realizar tu registro. Intenta más tarde.");
    }
});

function updateCovidData(){
    var url = "https://covid-api.mmediagroup.fr/v1/cases";

    fetch(url).then(function(response){
        response.json().then(function(json){
            //console.log(json);
            //console.log(json.Global.All.confirmed);

            //globalConfirmados.textContent = json.Global.All.confirmed;
            //globalMuertos.textContent = json.Global.All.deaths;
            //mexicoActivos.textContent = json.Mexico.All.confirmed - json.Mexico.All.recovered;

            animateValue(globalConfirmados, 0, json.Global.All.confirmed, 1000);
            animateValue(globalMuertos, 0, json.Global.All.deaths, 1000);
            animateValue(mexicoActivos, 0, json.Mexico.All.confirmed - json.Mexico.All.recovered - json.Mexico.All.deaths, 1000);

            /** GRAFICO 
            datosGrafico.xAxis.categories.push("Afganistan");
            datosGrafico.series[0].data.push(62718-54534-2713);
            datosGrafico.series[1].data.push(54534);
            datosGrafico.series[2].data.push(2713); **/

            for(var key in json){
              if(json.hasOwnProperty(key)){

                if(json[key].All.deaths>20000){
                datosGrafico.xAxis.categories.push(json[key].All.country);
                datosGrafico.series[0].data.push(json[key].All.confirmed-json[key].All.recovered-json[key].All.deaths);
                datosGrafico.series[1].data.push(json[key].All.recovered);
                datosGrafico.series[2].data.push(json[key].All.deaths);
                }
              }
            }

            Highcharts.chart('container', datosGrafico);

        })
    });
}

//LLAMADA A LA API DE MEXICO
function updateCovidMexicoMapData(){
  var url = "https://covid-api.mmediagroup.fr/v1/cases?country=Mexico";

  fetch(url).then(function(response){
      response.json().then(function(json){
          console.log(json);

          //mexicoMuertos = json.All.deaths;
          animateValue(mexicoMuertos, 0, json.All.deaths, 1000);

          //CARGAR DATOS DE MEXICO 
          for(var key in json){
            if(json.hasOwnProperty(key)){
              if(typeof estadosMXCodes[key] !== "undefined"){ //si esto tiene contenido
                dataCovidMexico.push([estadosMXCodes[key], json[key].confirmed]);

                if(estadosMXCodes[key]!=='mx-mx' & estadosMXCodes[key]!=='mx-df'){
                  console.log(estadosMXCodes[key]);
                  dataEdosMexico.push({x: json[key].deaths, y: json[key].confirmed, name:estadosMXCodes[key], estado:key});
                }

              }
            }
          }

          Highcharts.mapChart('cointainer-map-mx', configDataMapMexico);
          Highcharts.chart('cointainer-map-edos-mx', configDataEdos);
      });
  });
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = new Intl.NumberFormat("es-MX", {maximumFractionDigits:2})
                        .format(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
function animateText(obj, startSize, endSize, unit, duration){
  let startTimeStamp = null;  
  const stepAnimateText = (timestamp) => {
    if(!startTimeStamp) startTimeStamp = timestamp;
    const progress = Math.min((timestamp - startTimeStamp) / duration, 1);
    const size = Math.ceil(progress * (endSize - startSize) + startSize);

    const customStyke = {'font-size': size+unit}
    Object.assign(obj.style, customStyke);

    if(progress < 1){
      window.requestAnimationFrame(stepAnimateText);
    }
  }

  window.requestAnimationFrame(stepAnimateText);
}