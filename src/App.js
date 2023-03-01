import React, { useState } from "react";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import Calendar from 'rc-year-calendar';
import 'rc-year-calendar/locales/rc-year-calendar.pt';
//import 'rc-year-calendar/locales/rc-year-calendar.no';
import 'rc-year-calendar/locales/rc-year-calendar.es';
import Social from "./social"


import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Helmet } from "react-helmet";

// import 'rc-year-calendar/dist/rc-year-calendar.css';


/* 
 *
 */





function App() {

const [lang, setLang] = useState('en');
const [escala, setEscala] = useState('14 x 21');
const [inicio, setInicio] = useState(Date.now());
const loc = {

"pt": {
"calendario_offshore": "Calendario Offshore",
"description": "Calculadora de calendario de escala offshore",
"select_language": "Idioma",
"select_escala": "Tipo de escala",
"donate": "doar"
},

"en": {
"calendario_offshore": "Offshore Shift Calendar",
"description": "Calculates the calendar of shifts on offshore rigs",
"select_language": "Language",
"select_escala": "Shift type",
"donate": "donate"
},

"no": {
"calendario_offshore": "Skift Kalender",
"description": "Beregner kalenderen for skift på offshore-rigger",
"select_language": "Velg språk",
"select_escala": "Skift type",
"donate": "donate"
},

"es": {
"calendario_offshore": "Calendario Offshore",
"description": "Calcula el calendario de turnos en plataformas marinas",
"select_language": "Lenguage",
"select_escala": "Tipo de escala",
"donate": "donar"
},






};

const bandeiras = { pt: 'br', en: 'us', es: 'es', no: 'no' } ;

const escalas = {
 '14 x 21': [14,21],
 '14 x 14': [14,14],
 '7 x 7/7 x 14': [7,7,7,14],
 '21 x 21': [21,21],
 '4x1/3x3': [4,1,3,3],
 '14 x 28': [14, 28],
 '28 x 28': [28,28],
 // escalas SEAL:
 '3 x 2': [3, 2],
 '2x1x2x5': [2,1,2,5],
 '5x4x2x1x5x3x3x1x4x4x2x1': [5,4,2,1,5,3,3,1,4,4,2,1],
 '6x4x7x4x6x4x7x4': [6,4,7,4,6,4,7,4],
 '6 x 9': [6, 9],
 // escalas amazonas:
 '3x4x3x5': [3,4,3,5],
 '4 x 6': [4, 6], 
 '6x3x6x5x3x1x4x1x2x4': [6,3,6,5,3,1,4,1,2,4],
 '6 x 4' : [6, 4],
 '6x5x3x1x4x1x2x4x6x3': [6,5,3,1,4,1,2,4,6,3],
 // BAHIA
 '2x4x4x1x3x3x5x1x2x4x5x1': [2,4,4,1,3,3,5,1,2,4,5,1],
 '5x1x2x4x5x1x2x4x4x1x3x3': [5,1,2,4,5,1,2,4,4,1,3,3],
 '5 x 4': [5, 4],
 '7x2x7x1x7x2x7x2': [7,2,7,1,7,2,7,2],
 '7x4x7x5x7x5': [7,4,7,5,7,5],
 // Espirito santo
 '6x1x6x17': [6,1,6,17],
 '6x6x6x12': [6,6,6,12],
 '8 x 12': [8, 12],
 // MS
 '9 x 6': [9, 6],
 // MG
 '3x1x4x1x2x4x6x3x6x5': [3,1,4,1,2,4,6,3,6,5],
 // PR
 '3x1x4x1x3x5x4x1x3x1x4x5': [3,1,4,1,3,5,4,1,3,1,4,5],
 '10x7x11x7':[10,7,11,7],
 '4x1x2x4x6x3x6x5x3x1': [4,1,2,4,6,3,6,5,3,1],
 '4x1x3x3x5x1x2x4x5x1x2x4': [4,1,3,3,5,1,2,4,5,1,2,4],
 // RJ
 '2x4x2x2x2x3x2x1x2x3x2x1x2x7': [2,4,2,2,2,3,2,1,2,3,2,1,2,7],


}

function addDays(date, days) {
  const dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() + days);
  return dateCopy;
}

function * embarques (data) {
 var inicio = new Date(data);
 var fim = new Date();

 var i = Math.ceil(183 * escalas[escala].length / escalas[escala].reduce( (a,b) => a+b )), j=0 ; 

 while(i--)
 {
   fim = addDays(inicio, escalas[escala][j]-1);
   yield { startDate: new Date(inicio), endDate: new Date(fim), color: 'lightblue'};
  
   inicio = addDays(fim, escalas[escala][j+1]+1);
   j = (j+2) % escalas[escala].length;



 }

}	

const  dataSource= [ ...embarques(inicio) ];

//console.log(dataSource); 

var title = loc[lang]['calendario_offshore']; 
const description = "Offshore shift calendar calculator";
const url  = "https://rigshifts.com/";
const url_image = url + "image.png";
  return (
<>
 
<Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="twitter:card" content={url_image} />        
        <meta name="twitter:site" content="@user" />        
        <meta name="twitter:creator" content="@user" /> 
        <meta name="twitter:title" content="Offshore Calendar" />        
        <meta name="twitter:description" content={description} />        
        <meta name="twitter:image" content={url_image}/>        
        <meta property="og:title" content={title} />        
        <meta property="og:description" content={description} />        
        <meta property="og:image" content={url_image}/>
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Offshore Calendar" />
        <meta property="og:locale" content="en_US" />
        <meta http-equiv="Content-Language" content={Object.keys(loc).join(",")} />
        <meta property="og:type" content="article" />
 </Helmet>
 <div className="container border">
  <header className="h3 grid"> 
   
  <div className="row text-primary text-center m-3">{loc[lang]['calendario_offshore']}</div> 
  <div className="row pe-3"> 
  <DropdownButton className="col col-sm-3" id="dropdown-item-button" title={loc[lang]['select_language']}>
      { Object.keys(loc).map( lang => <Dropdown.Item  as="button" onClick={() => setLang(lang)}><span className={`fi fi-${bandeiras[lang]}`}></span><span className="text-end">{lang}</span></Dropdown.Item>)}
  </DropdownButton>


  <DropdownButton className="col col-sm-3" id="dropdown-item-button2" title={loc[lang]['select_escala']}>
      { Object.keys(escalas).map( t=> <Dropdown.Item  as="button" onClick={() => setEscala(t)}><span>{t}</span></Dropdown.Item>)}
  </DropdownButton>
 <div className="col-sm-4 d-none d-sm-block"/>
  <Button className="col col-sm-2" href="https://www.paypal.com/donate/?hosted_button_id=U5L9JM5XHDMNS"> {loc[lang]['donate']}</Button> 
  </div>
</header>
  
  <Calendar language={lang} style="background" dataSource={dataSource} onDayClick={(e) =>  setInicio(e.date) }/>  
  
  <footer className="fw-lighter"> <a href="https://github.com/arkhanoid/shift_calendar"> This Page is Open Source </a> <Social /> </footer>
  </div> 
  </>
);
}

export default App;
