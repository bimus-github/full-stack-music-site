import React from "react";
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
} from "../redux/services/shazamCore";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );

  if (isFetching) return <Loader />;

  if (error) return <Error />;

  const genreTitle = genres.filter((genre) => genre.value === genreListId)[0]
    ?.title;

  return (
    <div className="flex flex-col">
      <div className=" flex flex-col sm:flex-row mt-4 mb-10 justify-center items-center w-full">
        <h2 className="font-bold text-3xl text-white">
          Discover {genreTitle || "POP"}
        </h2>
        <select
          onChange={(e) => {
            dispatch(selectGenreListId(e?.target?.value));
            console.log(e.target.value);
          }}
          value={genreListId}
          className=" bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex sm:justify-start justify-center flex-wrap gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            activeSong
            isPlaying
            data
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
