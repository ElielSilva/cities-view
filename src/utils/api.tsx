

async function apiCounty(params:number) {
    //const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${params}`);
    //const responseForJson = await response.json();
    //const { nome , microrregiao:{ mesorregiao : { UF: { nome: nomeEstado, sigla }}}} = responseForJson;
   // console.log("APIIIAIAIAIAI ", nome, nomeEstado, sigla)

    const responsePopulation = await fetch(`https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/97907/resultados/${params}`);
    const responsePopulationForJson = await responsePopulation.json();
    const {} = responsePopulationForJson[0];

    const responseaaaa = await fetch(`https://servicodados.ibge.gov.br/api/v1/biblioteca?aspas=3&codmun=${params}`);
    const responseForJsonaa = await responseaaaa.json();
    const { MUNICIPIO: municipio, ESTADO:estado, HISTORICO:historico } = responseForJsonaa[`${params}`]
    console.log("teste 2", municipio, estado, historico);
    console.log("teste 3",responseForJsonaa);

    return { municipio, estado, historico };
}

async function apiPopulation(params:number) {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/97907/resultados/${params}`);
    const responseForJson = await response.json();
    return responseForJson;
}

//29170 prefeito
//97911 densidade demografica
export { apiCounty } ;