import React, { useState } from 'react';

const AddSongModal = ({ isOpen, onClose, onAdd }) => {
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    cover: '',
    playlist: '',
    audioUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...newSong,
      id: Date.now() // Basit bir ID oluşturma yöntemi
    });
    setNewSong({
      title: '',
      artist: '',
      cover: '',
      playlist: '',
      audioUrl: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Yeni Şarkı Ekle</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Şarkı Adı"
            value={newSong.title}
            onChange={(e) => setNewSong({...newSong, title: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Sanatçı"
            value={newSong.artist}
            onChange={(e) => setNewSong({...newSong, artist: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Kapak Fotoğrafı URL"
            value={newSong.cover}
            onChange={(e) => setNewSong({...newSong, cover: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Çalma Listesi"
            value={newSong.playlist}
            onChange={(e) => setNewSong({...newSong, playlist: e.target.value})}
            required
          />
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const url = URL.createObjectURL(file);
              setNewSong({...newSong, audioUrl: url});
            }}
            required
          />
          <div className="modal-buttons">
            <button type="submit">Ekle</button>
            <button type="button" onClick={onClose}>İptal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSongModal;