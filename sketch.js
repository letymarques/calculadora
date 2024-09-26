let aguaReservatorio = 100;  // Nível atual do reservatório (%)
let aguaInicialReservatorio = 1000;  // Quantidade de água inicial no reservatório (litros)
let tiposVerduras = {
  'Alface': 5,
  'Tomate': 8,
  'Cenoura': 6,
  'Pimentão': 7,
  'Brócolis': 6,
  'Cebola': 4,
  'Batata': 7,
  'Espinafre': 5,
  'Pepino': 8,
  'Abóbora': 9
};

let tipoSelecionado = 'Alface';  // Verdura selecionada
let area = 100;  // Área em m²
let umidadeTerra = true;  // Sensor de umidade da terra (true = seco, false = úmido)
let resultado = "";  // Texto para o resultado

function setup() {
  createCanvas(500, 500);
  textSize(16);
  textAlign(LEFT);

  // Fundo colorido em tons pastéis
  background('#ffefd5');

  // Interface de usuário
  createP('Área da colheita (m²):').style('color', '#333').style('font-size', '14px');
  let areaInput = createInput(area.toString(), 'number');
  areaInput.style('width', '100px').style('background-color', '#add8e6').style('color', '#333');
  areaInput.input(() => area = float(areaInput.value()));

  createP('Nível atual do reservatório (%):').style('color', '#333').style('font-size', '14px');
  let reservatorioInput = createSelect();
  reservatorioInput.style('width', '100px').style('background-color', '#98fb98').style('color', '#333');
  reservatorioInput.option('100%');
  reservatorioInput.option('75%');
  reservatorioInput.option('50%');
  reservatorioInput.option('25%');
  reservatorioInput.option('0%');
  reservatorioInput.changed(() => aguaReservatorio = float(reservatorioInput.value()));

  createP('Quantidade inicial de água no reservatório (litros):').style('color', '#333').style('font-size', '14px');
  let aguaInicialInput = createInput(aguaInicialReservatorio.toString(), 'number');
  aguaInicialInput.style('width', '100px').style('background-color', '#f0e68c').style('color', '#333');
  aguaInicialInput.input(() => aguaInicialReservatorio = float(aguaInicialInput.value()));

  createP('Selecione o tipo de verdura/legume:').style('color', '#333').style('font-size', '14px');
  let dropdown = createSelect();
  dropdown.style('width', '200px').style('background-color', '#ffb6c1').style('color', '#333');
  for (let verdura in tiposVerduras) {
    dropdown.option(verdura);
  }
  dropdown.changed(() => tipoSelecionado = dropdown.value());

  createP('Solo está seco?').style('color', '#333').style('font-size', '14px');
  let soloInput = createCheckbox('Sim', umidadeTerra);
  soloInput.changed(() => umidadeTerra = soloInput.checked());
  
  createButton('Calcular Água')
    .style('background-color', '#ff7f50')
    .style('color', 'white')
    .style('padding', '10px')
    .style('border', 'none')
    .mousePressed(calcularAgua);
}

function calcularAgua() {
  if (aguaReservatorio === 0) {
    resultado = 'Nível do reservatório: 0%\nNão há água suficiente no reservatório. Utilize outro reservatório!';
    return;
  }
  
  if (!umidadeTerra) {
    resultado = 'Solo úmido, irrigação não necessária.';
    return;
  }

  let consumoPorMetro = tiposVerduras[tipoSelecionado];  // Água necessária por m²
  let consumoTotal = consumoPorMetro * area;  // Água total necessária
  let aguaDisponivel = (aguaReservatorio / 100) * aguaInicialReservatorio; // Água disponível no reservatório
  let aguaSobrando = aguaDisponivel - consumoTotal; // Água que sobra após irrigação

  if (aguaSobrando < 0) {
    let aguaFaltando = Math.abs(aguaSobrando);  // Água que falta
    resultado = `Área: ${area} m²\n` +
                `Nível do reservatório: ${aguaReservatorio}%\n` +
                `Quantidade inicial de água no reservatório: ${aguaInicialReservatorio} L\n` +
                `Total de água disponível no reservatório: ${aguaDisponivel} L\n` +
                `\nVerdura: ${tipoSelecionado}\n` +
                `Água necessária: ${consumoTotal} L\n` +
                `Água necessária por m²: ${consumoPorMetro} L/m²\n` +
                `\nÁgua que falta para irrigação: ${aguaFaltando} L`;
  } else {
    // Formatação para evitar confusão com casas decimais
    resultado = `Área: ${area} m²\n` +
                `Nível do reservatório: ${aguaReservatorio}%\n` +
                `Quantidade inicial de água no reservatório: ${aguaInicialReservatorio} L\n` +
                `Total de água disponível no reservatório: ${aguaDisponivel} L\n` +
                `\nVerdura: ${tipoSelecionado}\n` +
                `Água necessária: ${consumoTotal} L\n` +
                `Água necessária por m²: ${consumoPorMetro} L/m²\n` +
                `\nÁgua que sobrará após a irrigação: ${aguaSobrando} L`;
  }
}

function draw() {
  background('#ffefd5');
  
  // Título
  fill('#ff7f50');
  textSize(24);
  text('Calculadora de Irrigação', 20, 30);
  
  // Resultado
  fill('#333');
  textSize(16);
  text(resultado, 20, 200);
}