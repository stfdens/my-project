const MapDbToModelBooks = ({
  id,
  nama_buku,
  genre,
  halaman_buku,
}) => ({
  serial_books: id,
  Judul: nama_buku,
  Genre: genre,
  Allpage: halaman_buku,
});

module.exports = MapDbToModelBooks;
