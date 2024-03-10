import { Button, TextField } from "@mui/material";
import "./Homepage.css";
import { MovieServise } from "../../services/MovieServise";
import { useRef, useState } from "react";
import { MovieGetResponse } from "../../models/MovieGetResponse";
import imov from "../../assets/movie-line.png";
import { Link } from "react-router-dom";

function HomePage() {
  const movieservice = new MovieServise();
  const inputId = useRef<HTMLInputElement>();
  const inputTitle = useRef<HTMLInputElement>();
  const [data, setData] = useState<MovieGetResponse[]>([]);

  return (
    <>
      <div className="body">
        <div className="nav">
          <div className="c1">
            <TextField
              className="seach"
              inputRef={inputTitle}
              size="small"
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputTitle.current) {
                  btnClick(inputTitle.current.value);
                }
              }}
            ></TextField>
            <Button
              variant="contained"
              onClick={async () => {
                if (inputTitle.current) {
                  btnClick(inputTitle.current.value);
                }
              }}
            >
              Find name
            </Button>

            <TextField
              className="seach"
              inputRef={inputId}
              size="small"
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputId.current) {
                  btnCk(inputId.current.value);
                }
              }}
            ></TextField>
            {/* Button for searching by ID */}
            <Button
              variant="contained"
              onClick={() => {
                if (inputId.current) {
                  btnCk(inputId.current.value);
                }
              }}
            >
              Find by ID
            </Button>
          </div>
        </div>

        <div className="c2">
          {data.length === 0 ? (
            <div style={{ color: "white" }}>
              <img src={imov} alt="" />
            </div>
          ) : (
            data.map((item, i) => (
              <div className="movieC">
                <Link to={`/detail/${item.imdbID}`}>
                  <div className="grid-item">
                    <img className="img" src={item.Poster} alt="" />
                    <p className="title">
                      {i + 1}. {item.Title}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );

  async function btnClick(inputTitle: string) {
    const res = await movieservice.getMovieBytitle(inputTitle);
    console.log(res);
    setData(res);
    console.log();
  }

  async function btnCk(inputId: string) {
    const re = await movieservice.getMovieById(inputId);
    console.log(re);
    const updatedData = re ? (Array.isArray(re) ? re : [re]) : [];

    setData(updatedData);
  }
}

export default HomePage;
