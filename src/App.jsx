import { useState, useEffect } from 'react'
import AddSongModal from './components/AddSongModal'
import './App.css'

// En üstte SVG ikonları tanımlayalım
const PlayIcon = () => (
  <svg height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5.14v14l11-7-11-7z"/>
  </svg>
);

const PauseIcon = () => (
  <svg height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

const PrevIcon = () => (
  <svg height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
  </svg>
);

const NextIcon = () => (
  <svg height="16" width="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
  </svg>
);

// Geri butonu ikonu
const BackIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M15.957 2.793a1 1 0 010 1.414L8.164 12l7.793 7.793a1 1 0 11-1.414 1.414L5.336 12l9.207-9.207a1 1 0 011.414 0z"/>
  </svg>
);

// Alt navigasyon bileşenleri
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"/>
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.279 7.407-7.279s7.407 3.273 7.407 7.279-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.279z"/>
  </svg>
);

const LibraryIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z"/>
  </svg>
);

const songs = [
  // Çakal şarkıları
  {
    id: 1,
    title: "Gangsta Life",
    artist: "Çakal",
    cover: "https://images.genius.com/b5c6b91f0d04dcfea0fd652b0aa9b8c9.1000x1000x1.png",
    playlist: "Türkçe Rap",
    audioUrl: "/songs/cakal-gangsta-life.mp3"
  },
  {
    id: 2,
    title: "Felfeci",
    artist: "Çakal",
    cover: "https://images.genius.com/9538d474d6c3d3eaebd696763adfe998.1000x1000x1.png",
    playlist: "Hit Parçalar",
    audioUrl: "/songs/cakal-felfeci.mp3"
  },
  {
    id: 3,
    title: "İmdat",
    artist: "Çakal",
    cover: "https://i.ytimg.com/vi/Ynlfvw2QgE4/maxresdefault.jpg",
    playlist: "Trend",
    audioUrl: "/songs/cakal-imdat.mp3"
  },
  
  {
    id: 4,
    title: "Gözler",
    artist: "Çakal, Mavi",
    cover: "data:image/jpeg;base64,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",
    playlist: "Türkçe Rap",
    audioUrl: "/songs/cakal-gozler.mp3"
  },

  {
    id: 5,
    title: "Cuma",
    artist: "Çakal",
    cover: "https://images.genius.com/70f298d527201b7af5e00e1374c55862.1000x1000x1.png",
    playlist: "Hit Parçalar", 
    audioUrl: "/songs/cakal-cuma.mp3"
  },
  {
    id: 6,
    title: "Axe - Şeker Oğlan",
    artist: "Çakal", 
    cover: "src/assets/Şeker Oğlan.png",
    playlist: "Hit Parçalar",
    // Public klasöründeki ses dosyasının yolunu düzelt 
    audioUrl: "/songs/cakal-axe-seker-oglan.mp3"
  }
];

const SPOTIFY_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png";

// Card bileşenini App bileşeni içinde tanımlayalım
function App() {
  // initialState'i doğrudan cakalSongs'dan alıyoruz
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio] = useState(new Audio())
  const [volume, setVolume] = useState(50)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [songList, setSongList] = useState(songs);

  // State eklemeleri
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' veya 'search'

  const Card = ({ song }) => {
    const handleClick = () => {
      setCurrentSong(song);
      setIsPlaying(true);
      audio.src = song.audioUrl;
      audio.play();
    };

    return (
      <div className="card" onClick={handleClick}>
        <img src={song.cover} alt={song.title} className="card-img" />
        <div className="card-info">
          <h3>{song.title}</h3>
          <p>{song.artist}</p>
        </div>
        <div className="menu-dots">⋮</div>
      </div>
    );
  };

  // useEffect için cleanup fonksiyonunu düzeltelim
  useEffect(() => {
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      const currentIndex = songs.findIndex(s => s.id === currentSong.id);
      const nextSong = songs[(currentIndex + 1) % songs.length];
      setCurrentSong(nextSong);
      audio.src = nextSong.audioUrl;
      audio.play();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.volume = volume / 100;
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio, currentSong, songs, volume]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
  }

  const playPause = () => {
    if (isPlaying) {
      audio.pause()
    } else {
      audio.src = currentSong.audioUrl
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  // changeSong fonksiyonunu güncelliyoruz
  const changeSong = (song) => {
    // Şarkı değiştiğinde state'i hemen güncelliyoruz
    setCurrentSong({...song})  // Shallow copy ile state'i güncelliyoruz
    if (isPlaying) {
      audio.pause()
      audio.src = song.audioUrl
      audio.play()
    }
  }

  const handleAddSong = (newSong) => {
    setSongList([...songList, newSong]);
  };

  // Arama fonksiyonu
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = songs.filter(song => 
      song.title.toLowerCase().includes(term) || 
      song.artist.toLowerCase().includes(term)
    );
    setFilteredSongs(filtered);
  };

  // Sayfa render fonksiyonları
  const renderHomePage = () => (
    <div className="main-content">
      <div className="content">
        <div className="header">
          <h1>İyi günler</h1>
          <button 
            className="add-song-button"
            onClick={() => setIsModalOpen(true)}
          >
            + Yeni Şarkı Ekle
          </button>
        </div>
        <div className="cards">
          {songs.map(song => (
            <Card key={song.id} song={song} />
          ))}
        </div>
      </div>
    </div>
  );

  const renderSearchPage = () => (
    <div className="search-overlay">
      <div className="search-container">
       
        <input
          type="text"
          placeholder="Ne dinlemek istiyorsun?"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
          autoFocus
        />
        
      </div>
      <div className="search-results">
        {filteredSongs.map(song => (
          <Card key={song.id} song={song} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="spotify-app">
      <div className="header">
        <button className="back-button">
          <BackIcon />
        </button>
        <h1>Beğenilen Şarkılar</h1>
        <span>70 şarkı</span>
      </div>

      <div className="sidebar">
        <img src={SPOTIFY_LOGO} alt="Spotify" className="spotify-logo" />
        {/* ...existing sidebar code... */}
      </div>
      
      {/* Ana içerik */}
      {currentPage === 'home' ? renderHomePage() : renderSearchPage()}

      <AddSongModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddSong}
      />

      {/* Player */}
      <div className="player">
        <div className="song-info">
          <img src={currentSong.cover} alt={currentSong.title} className="song-img" />
          <div>
            <h4 style={{ whiteSpace: 'nowrap' }}>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </div>
        </div>
        
        <div className="player-center">
          <div className="controls">
            <button 
              className="prev-next-button"
              onClick={() => changeSong(songList[(songList.findIndex(s => s.id === currentSong.id) - 1 + songList.length) % songList.length])}
            >
              <PrevIcon />
            </button>
            <button 
              onClick={playPause} 
              className="play-button"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button 
              className="prev-next-button"
              onClick={() => changeSong(songList[(songList.findIndex(s => s.id === currentSong.id) + 1) % songList.length])}
            >
              <NextIcon />
            </button>
          </div>
          <div className="progress-bar">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              style={{
                '--progress-percent': `${(currentTime / duration) * 100}%`
              }}
              onChange={(e) => {
                const time = parseFloat(e.target.value);
                audio.currentTime = time;
                setCurrentTime(time);
              }}
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="volume-control">
          <i className="fas fa-volume-up"></i>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => {
              setVolume(e.target.value)
              audio.volume = e.target.value / 100
            }}
          />
        </div>
      </div>

      {/* Bottom nav */}
      <div className="bottom-nav">
        <a 
          className={`bottom-nav-item ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentPage('home')}
        >
          <HomeIcon />
          <span>Ana sayfa</span>
        </a>
        <a 
          className={`bottom-nav-item ${currentPage === 'search' ? 'active' : ''}`}
          onClick={() => setCurrentPage('search')}
        >
          <SearchIcon />
          <span>Ara</span>
        </a>
        <a href="#" className="bottom-nav-item">
          <LibraryIcon />
          <span>Kitaplığın</span>
        </a>
        <a href="#" className="bottom-nav-item">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 25.1l-1.2-1.2 7.7-7.7H1v-1.7h20.4l-7.7-7.7 1.2-1.2 9.7 9.7z"/>
          </svg>
          <span>Oluştur</span>
        </a>
      </div>
    </div>
  )
}

export default App