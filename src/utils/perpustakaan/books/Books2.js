const MapDbToModelBooksId = ({
  nama_buku,
  genre,
  halaman_buku,
}) => ({
  Judul: nama_buku,
  Genre: genre,
  Allpage: halaman_buku,
});

module.exports = MapDbToModelBooksId;
