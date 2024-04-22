

async function apiCounty(params:number) {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/biblioteca?aspas=3&codmun=${params}`);
    const responseForJson = await response.json();
    const { MUNICIPIO: municipio, ESTADO:estado, HISTORICO:historico } = responseForJson[`${params}`]
    return { municipio, estado, historico };
}

async function apiMayor(params:number) {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/29170/resultados/${params}`);
    const responseForJson = await response.json();
    return responseForJson[0].res['0'].res['2021'];
}

async function apiPopulation(params:number) {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/97907/resultados/${params}`);
    const responseForJson = await response.json();
    return responseForJson[0].res[0].res["2022"];
}

async function apiDensy(params:number) {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/pesquisas/indicadores/97911/resultados/${params}`);
    const responseForJson = await response.json();
    return responseForJson[0].res[0].res["2022"];
}

async function requestAllCities() {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome');
    const responseForJson = await response.json();
    const serialize = responseForJson.map((city:any) => {
        return {id: city.id, nome: city.nome , uf: city.microrregiao.mesorregiao.UF.sigla};
    })
    return serialize;
}

async function requestInformationCity(params:number) {
    const mayer = await apiMayor(params);
    const population = await apiPopulation(params);
    const cityInfo = await apiCounty(params);
    const density = await apiDensy(params);
    const mergeInformation = {
        prefeito: mayer,
        densidade: density,
        populacao: population,
        ...cityInfo,  
    }
    return mergeInformation;
}


export { apiCounty, requestAllCities, requestInformationCity } ;

//29170 prefeito
//97911 densidade demografica
