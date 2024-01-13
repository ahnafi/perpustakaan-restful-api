Proyek ini adalah implementasi RESTful API untuk sebuah perpustakaan digital. Dalam proyek ini, pengguna dapat mengakses berbagai fitur berbasis API yang mencakup manajemen buku, kategori, serta operasi peminjaman dan pengembalian buku. Proyek ini dirancang untuk memenuhi kebutuhan manajemen perpustakaan modern dengan memberikan fungsionalitas CRUD (Create, Read, Update, Delete) untuk berbagai entitas dalam perpustakaan digital.

### Fitur Utama:

1. **Manajemen Buku:**
   - **Menambahkan Buku:** Pengguna dapat menambahkan buku baru ke perpustakaan dengan menyertakan informasi seperti judul, penulis, dan deskripsi.
   - **Mengambil Informasi Buku:** Pengguna dapat melihat daftar buku, mendapatkan detail buku berdasarkan ID, dan melakukan pencarian berdasarkan judul atau penulis.

2. **Manajemen Kategori:**
   - **Menambahkan Kategori Baru:** Admin dapat menambahkan kategori baru untuk mengelompokkan buku.
   - **Melihat Daftar Kategori:** Pengguna dapat melihat daftar kategori dan mendapatkan detail kategori berdasarkan ID.

3. **Peminjaman dan Pengembalian Buku:**
   - **Peminjaman Buku:** Pengguna yang terautentikasi dapat meminjam buku tertentu dengan memberikan detail peminjaman.
   - **Pengembalian Buku:** Pengguna yang terautentikasi dapat mengembalikan buku yang telah mereka pinjam sebelumnya.

4. **Ulasan dan Peringkat:**
   - **Menambahkan Ulasan dan Peringkat:** Pengguna yang terautentikasi dapat menambahkan ulasan dan peringkat untuk buku tertentu.

5. **Statistik Perpustakaan:**
   - **Statistik Buku Terpopuler:** Admin dapat melihat statistik buku yang paling banyak dibaca atau mendapatkan peringkat tertinggi.
   - **Statistik Peminjaman:** Admin dapat melihat statistik peminjaman buku dan mengidentifikasi buku yang paling sering dipinjam.

6. **Kontrol Akses dan Keamanan:**
   - **Otentikasi Pengguna:** Autentikasi digunakan untuk memastikan hanya pengguna yang terotorisasi yang dapat mengakses rute-rute yang membutuhkan akses khusus, seperti operasi CRUD pada buku atau kategori.
   - **Kontrol Akses Berbasis Peran:** Sistem menerapkan kontrol akses berbasis peran untuk membatasi akses ke fitur tertentu, seperti hanya admin yang dapat menambahkan atau menghapus buku dari perpustakaan.

7. **Riwayat Aktivitas Pengguna:**
   - **Log Aktivitas:** Sistem menyimpan log aktivitas pengguna, termasuk peminjaman, pengembalian, dan perubahan lainnya di perpustakaan.

Proyek ini memberikan solusi manajemen perpustakaan yang efisien dan terstruktur melalui RESTful API, memungkinkan pengembang untuk mengintegrasikan fungsionalitas perpustakaan digital ke dalam berbagai aplikasi atau platform.