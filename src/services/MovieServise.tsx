import axios from "axios";
import {
  MovieGetIdResponse,
  MovieGetResponse,
} from "../models/MovieGetResponse";

const HOST: string = "http://www.omdbapi.com/";
// const apiKey = process.env.REACT_APP_API_KEY;
const apiKey = "d59c164";

export class MovieServise {
  async getMovieBytitle(name: string) {
    const url = HOST + `/?s=${name}&apikey=${apiKey}`;
    const response = await axios.get(url);
    if (!response.data.Search) {
      return []; // ส่งค่าว่างกลับหากไม่มีผลลัพธ์
    }
    const movies: MovieGetResponse[] = response.data.Search;
    return movies;
  }

  async getMovieId(id: string) {
    const url = HOST + `/?i=${id}&apikey=${apiKey}`;
    const response = await axios.get(url);
    if (!response.data.Search) {
      return []; // ส่งค่าว่างกลับหากไม่มีผลลัพธ์
    }
    const movies: MovieGetResponse[] = response.data.Search;
    return movies;
  }

  async getMovieById(id: string) {
    const url = HOST + `/?i=${id}&apikey=${apiKey}`;
    const response = await axios.get(url);
    if (!response.data) {
      return null; // ส่งค่า null กลับหากไม่มีผลลัพธ์
    }
    const detailM: MovieGetIdResponse = response.data;
    return detailM;
  }
}
