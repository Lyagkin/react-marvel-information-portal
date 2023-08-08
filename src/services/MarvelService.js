const API_KEY = process.env.REACT_APP_API_KEY;

class MarvelService {
  #apiBaseUrl = "https://gateway.marvel.com:443/v1/public";
  #apiPublicKey = `apikey=${API_KEY}`;

  getMarvelCharactersData = async (url) => {
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

  getAllCharactersData = async (offset = 210) => {
    const allCharactersData = await this.getMarvelCharactersData(
      `${this.#apiBaseUrl}/characters?limit=9&offset=${offset}&${this.#apiPublicKey}`
    );

    return allCharactersData.data.results.map((characterList) => {
      return this._transformCharactersData(characterList);
    });
  };

  getCharactersDataById = async (charactersId) => {
    const charactersDataById = await this.getMarvelCharactersData(
      `${this.#apiBaseUrl}/characters/${charactersId}?${this.#apiPublicKey}`
    );

    return this._transformCharactersData(charactersDataById.data.results[0]);
  };

  _transformCharactersData = (charactersData) => {
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
}

export default MarvelService;
