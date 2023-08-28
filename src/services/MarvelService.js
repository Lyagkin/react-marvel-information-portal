const API_KEY = process.env.REACT_APP_API_KEY;

function MarvelService() {
  const apiBaseUrl = "https://gateway.marvel.com:443/v1/public";
  const apiPublicKey = `apikey=${API_KEY}`;

  const getMarvelCharactersData = async (url) => {
    try {
      let responce = await fetch(url);

      if (!responce.ok) {
        throw new Error(`Could not fetch ${url}, status: ${responce.status}`);
      }

      return await responce.json();
    } catch (e) {
      return e.name;
    }
  };

  const getAllCharactersData = async (offset = 210) => {
    const allCharactersData = await getMarvelCharactersData(
      `${apiBaseUrl}/characters?limit=9&offset=${offset}&${apiPublicKey}`
    );

    return allCharactersData.data.results.map((characterList) => {
      return _transformCharactersData(characterList);
    });
  };

  const getCharactersDataById = async (charactersId) => {
    const charactersDataById = await getMarvelCharactersData(
      `${apiBaseUrl}/characters/${charactersId}?${apiPublicKey}`
    );

    return _transformCharactersData(charactersDataById.data.results[0]);
  };

  const _transformCharactersData = (charactersData) => {
    return {
      id: charactersData.id,
      name: charactersData.name,
      thumbnail: charactersData.thumbnail.path + "." + charactersData.thumbnail.extension,
      description: charactersData.description,
      homepage: charactersData.urls[0].url,
      wiki: charactersData.urls[1].url,
      comics: charactersData.comics.items.splice(0, 10),
    };
  };

  return { getAllCharactersData, getCharactersDataById };
}

export default MarvelService;
