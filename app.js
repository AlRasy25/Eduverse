// --- DUMMY DATA ---
const dummyAccounts = [
    { username: "dinda.yusriyah", password: "password123", role: "Mahasiswa" },
    { username: "ghina.mardiah", password: "password123", role: "Siswa SMA" },
    { username: "khaerudin", password: "dosenkeren", role: "Dosen Pengampu" },
    { username: "admin", password: "admin123", role: "Admin PSB" }
];

let loggedInUser = null;

// --- GLOBAL COMPONENTS ---
const footerHTML = `
    <div class="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
            <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                    <i class="fas fa-atom text-blue-700 text-xl"></i>
                </div>
                <h3 class="text-xl font-bold">EduVerse</h3>
            </div>
            <p class="text-gray-400 text-sm mb-4">Pusat sumber belajar terintegrasi untuk mendukung ekosistem pendidikan masa depan.</p>
        </div>
        <div>
            <h4 class="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul class="space-y-2">
                <li><a href="index.html" class="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="tentang.html" class="text-gray-400 hover:text-white transition">Tentang Kami</a></li>
                <li><a href="program.html" class="text-gray-400 hover:text-white transition">Program</a></li>
                <li><a href="fasilitas.html" class="text-gray-400 hover:text-white transition">Fasilitas</a></li>
            </ul>
        </div>
        <div>
            <h4 class="text-lg font-semibold mb-4">Fungsi Utama</h4>
            <ul class="space-y-2 text-gray-400 text-sm">
                <li>Pengembangan Sistem Instruksional</li>
                <li>Pelayanan & Produksi Media</li>
                <li>Pelatihan & Administrasi</li>
            </ul>
        </div>
        <div>
            <h4 class="text-lg font-semibold mb-4">Hubungi Kami</h4>
            <ul class="space-y-3 text-gray-400">
                <li class="flex items-start">
                    <i class="fas fa-map-marker-alt mt-1 mr-3"></i>
                    <span>Jl. Pendidikan Masa Depan No. 1, Jakarta, Indonesia (Fiktif)</span>
                </li>
                <li class="flex items-center">
                    <i class="fas fa-phone-alt mr-3"></i>
                    <span>(021) 123-4567</span>
                </li>
            </ul>
        </div>
    </div>
    <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
        <p>© 2025 EduVerse Learning Center. Dibuat berdasarkan Proposal Tim 1 PPSB.</p>
    </div>
`;

const loginModalHTML = `
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
        <button onclick="closeLoginModal()" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <i class="fas fa-times text-xl"></i>
        </button>
        <h1 class="text-3xl font-bold text-center mb-8" style="background: linear-gradient(45deg, #1e40af, #3b82f6); -webkit-background-clip: text; background-clip: text; color: transparent;">Portal EduVerse</h1>
        <form id="loginForm" class="space-y-6">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <div class="relative"><i class="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input type="text" id="username" class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Masukkan Username Anda" required />
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div class="relative"><i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input type="password" id="password" class="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="••••••••" required />
                </div>
            </div>
            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md">
                <i class="fas fa-sign-in-alt mr-2"></i>Masuk
            </button>
            <p id="errorMessage" class="text-red-500 text-sm text-center hidden mt-2">Username atau password salah.</p>
        </form>
    </div>
`;

const profileModalHTML = (user) => `
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
        <button onclick="closeProfileModal()" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"><i class="fas fa-times text-xl"></i></button>
        <h2 class="text-2xl font-bold text-center mb-6" style="background: linear-gradient(45deg, #1e40af, #3b82f6); -webkit-background-clip: text; background-clip: text; color: transparent;">Profil Pengguna</h2>
        <div class="space-y-6">
            <div class="flex flex-col items-center">
                <div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4"><i class="fas fa-user text-4xl text-blue-600"></i></div>
                <h3 class="text-xl font-bold">${user.username}</h3>
                <p class="text-gray-600">Peran: ${user.role}</p>
            </div>
            <div class="pt-4 text-center">
                <button onclick="logout()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    <i class="fas fa-sign-out-alt mr-2"></i>Keluar
                </button>
            </div>
        </div>
    </div>
`;


// --- FUNCTIONS ---
function openLoginModal() {
    document.getElementById("loginModal").classList.remove("hidden");
}

function closeLoginModal() {
    document.getElementById("loginModal").classList.add("hidden");
}

function openProfileModal() {
    if (!loggedInUser) return;
    document.getElementById("profileModal").innerHTML = profileModalHTML(loggedInUser);
    document.getElementById("profileModal").classList.remove("hidden");
}

function closeProfileModal() {
    document.getElementById("profileModal").classList.add("hidden");
}

function logout() {
    sessionStorage.removeItem('loggedInUser');
    loggedInUser = null;
    updateAuthUI();
    closeProfileModal();
}

function updateAuthUI() {
    const authArea = document.getElementById('authArea');
    if (loggedInUser) {
        authArea.innerHTML = `
            <button onclick="openProfileModal()" class="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition">
                <div class="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center"><i class="fas fa-user text-blue-700"></i></div>
                <span class="hidden sm:inline font-medium text-blue-800">${loggedInUser.username}</span>
            </button>
        `;
    } else {
        authArea.innerHTML = `
            <button onclick="openLoginModal()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md">
                <i class="fas fa-sign-in-alt mr-2"></i>Portal Masuk
            </button>
        `;
    }
}


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Inject global components
    const footer = document.querySelector('footer');
    if(footer) footer.innerHTML = footerHTML;
    const loginModalContainer = document.getElementById('loginModal');
    if(loginModalContainer) loginModalContainer.innerHTML = loginModalHTML;

    // Check for logged in user in session storage
    const userJson = sessionStorage.getItem('loggedInUser');
    if (userJson) {
        loggedInUser = JSON.parse(userJson);
    }
    
    updateAuthUI();

    // Attach login form event listener
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const foundAccount = dummyAccounts.find(acc => acc.username === username && acc.password === password);

            if (foundAccount) {
                loggedInUser = foundAccount;
                sessionStorage.setItem('loggedInUser', JSON.stringify(foundAccount));
                updateAuthUI();
                closeLoginModal();
            } else {
                document.getElementById('errorMessage').classList.remove('hidden');
            }
        });
    }
});
