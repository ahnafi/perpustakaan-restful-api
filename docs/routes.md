### Routes untuk API yang Membutuhkan Otentikasi (Contoh: Admin)

1. **Pengelolaan Buku:**
   - `POST /api/books` - Menambahkan buku baru
   - `GET /api/books` - Mendapatkan daftar semua buku
   - `GET /api/books/:id` - Mendapatkan detail buku berdasarkan ID
   - `PUT /api/books/:id` - Memperbarui informasi buku berdasarkan ID
   - `DELETE /api/books/:id` - Menghapus buku berdasarkan ID

2. **Pengelolaan Kategori:**
   - `POST /api/categories` - Menambahkan kategori baru
   - `GET /api/categories` - Mendapatkan daftar semua kategori
   - `GET /api/categories/:id` - Mendapatkan detail kategori berdasarkan ID
   - `PUT /api/categories/:id` - Memperbarui informasi kategori berdasarkan ID
   - `DELETE /api/categories/:id` - Menghapus kategori berdasarkan ID

3. **Peminjaman dan Pengembalian Buku:** (user)
   - `POST /api/borrow` - Melakukan peminjaman buku
   - `PUT /api/return/:id` - Mengembalikan buku berdasarkan ID

### Routes untuk API Publik (Tanpa Otentikasi)

1. **Daftar Buku:**
   - `GET /api/public/books` - Mendapatkan daftar buku untuk pengguna umum
   - `GET /api/public/books/:id` - Mendapatkan detail buku berdasarkan ID

2. **Daftar Kategori:**
   - `GET /api/public/categories` - Mendapatkan daftar kategori untuk pengguna umum
   - `GET /api/public/categories/:id` - Mendapatkan detail kategori berdasarkan ID

3. **Ulasan dan Peringkat:**
   - `GET /api/public/reviews/:id` - Mendapatkan ulasan dan peringkat buku berdasarkan ID

4. **Pencarian:**
   - `GET /api/public/search` - Melakukan pencarian buku berdasarkan judul atau penulis

5. **Statistik Perpustakaan:**
   - `GET /api/public/statistics` - Mendapatkan statistik perpustakaan untuk pengguna umum

<!--  -->
### Routes untuk Pengguna (User):

1. **Pengelolaan Peminjaman Buku:**
   - `POST /api/users/{userId}/borrows` - Pengguna dapat meminjam buku dengan menyertakan detail peminjaman.
   - `GET /api/users/{userId}/borrows` - Mendapatkan daftar peminjaman buku oleh pengguna.
   - `PUT /api/users/{userId}/borrows/{borrowId}` - Mengembalikan buku berdasarkan ID peminjaman.

2. **Pengelolaan Ulasan dan Peringkat:**
   - `POST /api/users/{userId}/reviews` - Pengguna dapat menambahkan ulasan dan peringkat untuk buku tertentu.
   - `GET /api/users/{userId}/reviews` - Mendapatkan daftar ulasan dan peringkat yang ditulis oleh pengguna.

3. **Informasi Pengguna:**
   - `GET /api/users/{userId}` - Mendapatkan informasi pengguna berdasarkan ID.
   - `PUT /api/users/{userId}` - Memperbarui informasi pengguna berdasarkan ID.

### Routes untuk Admin:

1. **Pengelolaan Buku:**
   - `POST /api/admin/books` - Admin dapat menambahkan buku baru ke perpustakaan.
   - `GET /api/admin/books` - Mendapatkan daftar semua buku (opsional: dengan filter atau pencarian).
   - `GET /api/admin/books/{bookId}` - Mendapatkan detail buku berdasarkan ID.
   - `PUT /api/admin/books/{bookId}` - Memperbarui informasi buku berdasarkan ID.
   - `DELETE /api/admin/books/{bookId}` - Menghapus buku berdasarkan ID.

2. **Pengelolaan Kategori:**
   - `POST /api/admin/categories` - Admin dapat menambahkan kategori baru.
   - `GET /api/admin/categories` - Mendapatkan daftar semua kategori.
   - `GET /api/admin/categories/{categoryId}` - Mendapatkan detail kategori berdasarkan ID.
   - `PUT /api/admin/categories/{categoryId}` - Memperbarui informasi kategori berdasarkan ID.
   - `DELETE /api/admin/categories/{categoryId}` - Menghapus kategori berdasarkan ID.

3. **Statistik Perpustakaan:**
   - `GET /api/admin/statistics` - Mendapatkan statistik perpustakaan, seperti buku yang paling banyak dibaca atau penggunaan sistem secara umum.

4. **Operasi CRUD untuk Pengguna (Opsional):**
   - `GET /api/admin/users` - Mendapatkan daftar semua pengguna.
   - `GET /api/admin/users/{userId}` - Mendapatkan informasi pengguna berdasarkan ID.
   - `PUT /api/admin/users/{userId}` - Memperbarui informasi pengguna berdasarkan ID.
   - `DELETE /api/admin/users/{userId}` - Menghapus pengguna berdasarkan ID.



<!-- user and admin -->
### Routes untuk Pengguna (User):

1. **Registrasi Pengguna:**
   - `POST /api/users/register` - Pengguna baru dapat mendaftar dengan menyertakan informasi pendaftaran seperti username, password, dsb.

2. **Login Pengguna:**
   - `POST /api/users/login` - Pengguna dapat melakukan login dengan menyertakan informasi otentikasi (username dan password).

3. **Logout Pengguna:**
   - `POST /api/users/logout` - Pengguna dapat melakukan logout.

4. **Pengelolaan Peminjaman Buku:**
   - `POST /api/users/{userId}/borrows` - Pengguna dapat meminjam buku dengan menyertakan detail peminjaman.
   - `GET /api/users/{userId}/borrows` - Mendapatkan daftar peminjaman buku oleh pengguna.
   - `PUT /api/users/{userId}/borrows/{borrowId}` - Mengembalikan buku berdasarkan ID peminjaman.

5. **Pengelolaan Ulasan dan Peringkat:**
   - `POST /api/users/{userId}/reviews` - Pengguna dapat menambahkan ulasan dan peringkat untuk buku tertentu.
   - `GET /api/users/{userId}/reviews` - Mendapatkan daftar ulasan dan peringkat yang ditulis oleh pengguna.

6. **Informasi Pengguna:**
   - `GET /api/users/{userId}` - Mendapatkan informasi pengguna berdasarkan ID.
   - `PUT /api/users/{userId}` - Memperbarui informasi pengguna berdasarkan ID.

### Routes untuk Admin:

1. **Registrasi Admin (Opsional):**
   - `POST /api/admin/register` - Admin baru dapat mendaftar dengan menyertakan informasi pendaftaran seperti username, password, dsb. (Opsional, tergantung pada kebutuhan)

2. **Login Admin:**
   - `POST /api/admin/login` - Admin dapat melakukan login dengan menyertakan informasi otentikasi (username dan password).

3. **Logout Admin:**
   - `POST /api/admin/logout` - Admin dapat melakukan logout.

4. **Pengelolaan Buku:**
   - `POST /api/admin/books` - Admin dapat menambahkan buku baru ke perpustakaan.
   - `GET /api/admin/books` - Mendapatkan daftar semua buku (opsional: dengan filter atau pencarian).
   - `GET /api/admin/books/{bookId}` - Mendapatkan detail buku berdasarkan ID.
   - `PUT /api/admin/books/{bookId}` - Memperbarui informasi buku berdasarkan ID.
   - `DELETE /api/admin/books/{bookId}` - Menghapus buku berdasarkan ID.

5. **Pengelolaan Kategori:**
   - `POST /api/admin/categories` - Admin dapat menambahkan kategori baru.
   - `GET /api/admin/categories` - Mendapatkan daftar semua kategori.
   - `GET /api/admin/categories/{categoryId}` - Mendapatkan detail kategori berdasarkan ID.
   - `PUT /api/admin/categories/{categoryId}` - Memperbarui informasi kategori berdasarkan ID.
   - `DELETE /api/admin/categories/{categoryId}` - Menghapus kategori berdasarkan ID.

6. **Statistik Perpustakaan:**
   - `GET /api/admin/statistics` - Mendapatkan statistik perpustakaan, seperti buku yang paling banyak dibaca atau penggunaan sistem secara umum.
