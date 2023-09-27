import { useHttp } from "../hooks/http.hook";

const API_KEY = process.env.REACT_APP_API_KEY;

function useMarvelService() {
  const apiBaseUrl = "https://gateway.marvel.com:443/v1/public";
  const apiPublicKey = `apikey=${API_KEY}`;

  const { loading, error, request, clearError } = useHttp();

  const getAllCharactersData = async (offset = 210) => {
    const allCharactersData = await request(`${apiBaseUrl}/characters?limit=9&offset=${offset}&${apiPublicKey}`);

    return allCharactersData.data.results.map((characterList) => _transformCharactersData(characterList));
  };

  const getCharactersDataById = async (charactersId) => {
    const charactersDataById = await request(`${apiBaseUrl}/characters/${charactersId}?${apiPublicKey}`);

    return _transformCharactersData(charactersDataById.data.results[0]);
  };

  const getCharacterDataByName = async (charactersName) => {
    const charactersDataByName = await request(`${apiBaseUrl}/characters?name=${charactersName}&${apiPublicKey}`);

    if (charactersDataByName.data.results.length === 0) {
      return false;
    } else return _transformCharactersData(charactersDataByName.data.results[0]);
  };

  const _transformCharactersData = (charactersData) => {
    return {
      id: charactersData.id,
      name: charactersData.name,
      thumbnail: `${charactersData.thumbnail.path}.${charactersData.thumbnail.extension}`,
      description: charactersData.description,
      homepage: charactersData.urls[0].url,
      wiki: charactersData.urls[1].url,
      comics: charactersData.comics.items.splice(0, 10),
    };
  };

  const getComicsData = async (offset = 0) => {
    const allComicsData = await request(
      `${apiBaseUrl}/comics?format=comic&formatType=comic&orderBy=modified&limit=8&offset=${offset}&${apiPublicKey}`
    );

    return allComicsData.data.results.map((comic) => _transormComicsData(comic));
  };

  const getSingleComicById = async (comicId) => {
    const singleComic = await request(`${apiBaseUrl}/comics/${comicId}?${apiPublicKey}`);

    return _transormComicsData(singleComic.data.results[0]);
  };

  const _transormComicsData = (comicsData) => {
    return {
      id: comicsData.id,
      thumbnail: `${comicsData.thumbnail.path}.${comicsData.thumbnail.extension}`,
      title: comicsData.title,
      description: comicsData.description,
      pageCount: comicsData.pageCount ? `${comicsData.pageCount}p` : "No information about the number of pages!",
      language: comicsData.textObjects[0]?.language || "en-us",
      prices: comicsData.prices[0].price ? `${comicsData.prices[0].price}$` : "Not available",
      urls: comicsData.urls[0].url,
    };
  };

  return {
    getAllCharactersData,
    getCharactersDataById,
    getCharacterDataByName,
    getComicsData,
    getSingleComicById,
    loading,
    error,
    clearError,
  };
}

export default useMarvelService;
