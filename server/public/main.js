const socket = io();
const socket2 = io();

socket.on('letra', function(data) {
    /* const con = basedata(); */

    console.log(data);
    let name1 = document.getElementById('name1');
    let name2 = document.getElementById('name2');
    let name3 = document.getElementById('name3');
    
    let a = document.getElementById('a');
    let b = document.getElementById('b');
    let c = document.getElementById('c');
    

    //se obtiene la medicion del sensor
    let humedad = data.substr(8, 4);
    let temp = data.substr(26,4);
    let mg = data.substr(67, 4);

    //Se obtiene el nombre
    let sensor1 = data.substr(0, 7);
    let sensor2 = data.substr(14, 11);
    let sensor3 = data.substr(56, 9);

    let alert1 = document.getElementById('alert1');
    let alert2 = document.getElementById('alert2');
    let alert3 = document.getElementById('alert3');
    
    
    let stHumedad = humedad.trim();
    if(parseInt(stHumedad) % 2 == 0){
        name1.style.color = 'blue';
        alert1.style.color = 'blue';
        alert1.innerHTML = `ESTABLE`;
    }else{
        name1.style.color = 'red';
        alert1.innerHTML = `FUERA DE RANGO!`;
        alert1.style.color = 'red';
    }

    let stTemperatura = temp.trim();
    if(parseInt(stTemperatura) % 2 == 0){
        name2.style.color = 'blue';
        alert2.style.color = 'blue';
        alert2.innerHTML = `ESTABLE`;
    }else{
        name2.style.color = 'red';
        alert2.innerHTML = `FUERA DE RANGO!`;
        alert2.style.color = 'red';
    }

    let stmg = mg.trim();
    if (parseInt(stmg) % 2 == 0) {
        name3.style.color = 'blue';
        alert3.style.color = 'blue';
        alert3.innerHTML = `ESTABLE`;
    } else {
        name3.style.color = 'red';
        alert3.innerHTML = `FUERA DE RANGO!`;
        alert3.style.color = 'red';
    }


    name1.innerHTML = `${sensor1}`;
    name2.innerHTML = `${sensor2}`;
    name3.innerHTML = `${sensor3}`;
    
    a.innerHTML = `${humedad}`;
    b.innerHTML = `${temp}`;
    c.innerHTML = `${mg}`;

});

socket2.on('letra2', function(data){
    console.log(data);

    let name4 = document.getElementById('name4');
    let name5 = document.getElementById('name5');

    let mq1 = data.substr(96, 4);
    let mq2 = data.substr(117, 5);

    let d = document.getElementById('d');
    let e = document.getElementById('e');

    let alert4 = document.getElementById('alert4');
    let alert5 = document.getElementById('alert5');

    let sensor4 = 'MQ1-Co2';//data.substr(42, 6);
    let sensor5 = 'MQ2-Co2';

    let stmq1 = mq1.trim();
    if (parseInt(stmq1) % 2 == 0) {
        name4.style.color = 'blue';
        alert4.style.color = 'blue';
        alert4.innerHTML = `ESTABLE`;
    } else {
        name4.style.color = 'red';
        alert4.style.color = 'red';
        alert4.innerHTML = `FUERA DE RANGO!`;
    }

    let stmq2 = mq2.trim();
    if (parseInt(stmq2) % 2 == 0) {
        name5.style.color = 'blue';
        alert5.style.color = 'blue';
        alert5.innerHTML = `ESTABLE`;
    } else {
        name5.style.color = 'red';
        alert5.style.color = 'red';
        alert5.innerHTML = `FUERA DE RANGO!`;
    }

    name4.innerHTML = `${sensor4}`;
    name5.innerHTML = `${sensor5}`;
    d.innerHTML = `${mq1}`;
    e.innerHTML = `${mq2}`;


})
