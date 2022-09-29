import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";

const SongCard = ({ song, i, activeSong, isPlaying, data }) => {
  const dispatch = useDispatch();
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 
    bg-opacity-80 backdrop-blur-sm
    animate-slideup rounded-lg cursor-pointer"
    >
      <div className="w-full h-56 group relative">
        <div
          className={` absolute inset-0 justify-center items-center bg-black bg-opacity-50
        group-hover:flex ${
          activeSong?.title === song?.title
            ? "flex bg-black bg-opacity-70"
            : "hidden"
        }`}
        >
          <PlayPause
            song={song}
            i={i}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            activeSong={activeSong}
            isPlaying={isPlaying}
          />
        </div>
        <img src={song?.images?.coverart} alt="song" />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-white text-lg truncate">
          <Link to={`/songs/${song?.key}`}>{song?.title}</Link>
        </p>
        <p className="font-semibold text-gray-300 text-sm truncate">
          <Link
            to={
              song?.artists
                ? `/artists/${song?.artists[0].adamid}`
                : `/top-artists`
            }
          >
            {song?.subtitle}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
