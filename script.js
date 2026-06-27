// Noms sénégalais pour les élèves
const senegaleseStudentNames = [
    'Aïssatou Diallo', 'Mamadou Diop', 'Fatou Ndiaye', 'Ibrahima Sow', 'Mariama Ba',
    'Cheikh Fall', 'Aminata Ly', 'Mouhamed Gueye', 'Ndeye Sarr', 'Oumar Faye',
    'Rokhaya Kane', 'Abdoulaye Seck', 'Sokhna Diop', 'Moustapha Niang', 'Binta Thiam',
    'Adama Traoré', 'Awa Ndiaye', 'Boubacar Diagne', 'Coumba Mbaye', 'Demba Cissé',
    'Diara Faye', 'Fatima Sy', 'Habib Sow', 'Kalidou Koulibaly', 'Khady Ndiaye',
    'Mame Diarra', 'Mariétou Diallo', 'Modou Dieng', 'Ngoné Fall', 'Papa Diop'
];

// Noms sénégalais pour les professeurs
const senegaleseTeacherNames = [
    { name: 'Pr. Abdourahmane Diagne', email: 'abdourahmane.diagne@prof.sn', subject: 'Mathématiques' },
    { name: 'Dr. Awa Cissé', email: 'awa.cisse@prof.sn', subject: 'Français' },
    { name: 'Pr. Souleymane Ndiaye', email: 'souleymane.ndiaye@prof.sn', subject: 'Physique-Chimie' },
    { name: 'Dr. Mame Diarra Fall', email: 'mame.fall@prof.sn', subject: 'SVT' },
    { name: 'Pr. Babacar Mbaye', email: 'babacar.mbaye@prof.sn', subject: 'Histoire-Géographie' },
    { name: 'Dr. Khadim Diouf', email: 'khadim.diouf@prof.sn', subject: 'Philosophie' },
    { name: 'Pr. Mbaye Ngoné', email: 'mbaye.ngone@prof.sn', subject: 'Anglais' },
    { name: 'Dr. Soukeyna Sall', email: 'soukeyna.sall@prof.sn', subject: 'Espagnol' }
];

// Classes sénégalaises
const senegaleseClasses = [
    { id: 1, name: '6ème A', level: '6ème', capacity: 35 },
    { id: 2, name: '6ème B', level: '6ème', capacity: 35 },
    { id: 3, name: '5ème A', level: '5ème', capacity: 35 },
    { id: 4, name: '5ème B', level: '5ème', capacity: 35 },
    { id: 5, name: '4ème A', level: '4ème', capacity: 35 },
    { id: 6, name: '4ème B', level: '4ème', capacity: 35 },
    { id: 7, name: '3ème A', level: '3ème', capacity: 35 },
    { id: 8, name: '3ème B', level: '3ème', capacity: 35 },
    { id: 9, name: 'Seconde A', level: 'Seconde', capacity: 40 },
    { id: 10, name: 'Seconde B', level: 'Seconde', capacity: 40 },
    { id: 11, name: 'Première A', level: 'Première', capacity: 40 },
    { id: 12, name: 'Première B', level: 'Première', capacity: 40 },
    { id: 13, name: 'Terminale A', level: 'Terminale', capacity: 40 },
    { id: 14, name: 'Terminale B', level: 'Terminale', capacity: 40 }
];

// Matières
const senegaleseSubjects = [
    { id: 1, name: 'Mathématiques', coefficient: 4, teacherId: 1 },
    { id: 2, name: 'Français', coefficient: 3, teacherId: 2 },
    { id: 3, name: 'Anglais', coefficient: 2, teacherId: 7 },
    { id: 4, name: 'Physique-Chimie', coefficient: 3, teacherId: 3 },
    { id: 5, name: 'SVT', coefficient: 3, teacherId: 4 },
    { id: 6, name: 'Histoire-Géographie', coefficient: 2, teacherId: 5 },
    { id: 7, name: 'Philosophie', coefficient: 2, teacherId: 6 }
];

// Data Storage
let students = JSON.parse(localStorage.getItem('students_senegal')) || [];
let teachers = JSON.parse(localStorage.getItem('teachers_senegal')) || [];
let classes = JSON.parse(localStorage.getItem('classes_senegal')) || [];
let subjects = JSON.parse(localStorage.getItem('subjects_senegal')) || [];
let grades = JSON.parse(localStorage.getItem('grades_senegal')) || [];
let absences = JSON.parse(localStorage.getItem('absences_senegal')) || [];
let activities = JSON.parse(localStorage.getItem('activities_senegal')) || [];
let currentUser = null;
let currentModalType = '';
let classChart, performanceChart, analyticsChart;

// Initialize Sample Data with Senegalese Names
function initSampleData() {
    if (students.length === 0) {
        for (let i = 0; i < senegaleseStudentNames.length; i++) {
            const classId = (i % 14) + 1;
            const avg = (Math.random() * 10 + 7).toFixed(1);
            students.push({
                id: i + 1,
                name: senegaleseStudentNames[i],
                email: senegaleseStudentNames[i].toLowerCase().replace(/[^a-z]/g, '.') + '@etudiant.sn',
                classId: classId,
                presence: Math.floor(Math.random() * 30 + 70),
                avg: parseFloat(avg)
            });
        }
        localStorage.setItem('students_senegal', JSON.stringify(students));
    }

    if (teachers.length === 0) {
        for (let i = 0; i < senegaleseTeacherNames.length; i++) {
            const teacher = senegaleseTeacherNames[i];
            teachers.push({
                id: i + 1,
                name: teacher.name,
                email: teacher.email,
                subject: teacher.subject
            });
        }
        localStorage.setItem('teachers_senegal', JSON.stringify(teachers));
    }

    if (classes.length === 0) {
        classes = senegaleseClasses;
        localStorage.setItem('classes_senegal', JSON.stringify(classes));
    }

    if (subjects.length === 0) {
        subjects = senegaleseSubjects;
        localStorage.setItem('subjects_senegal', JSON.stringify(subjects));
    }

    if (grades.length === 0) {
        let gradeId = 1;
        for (let i = 0; i < students.length; i++) {
            for (let j = 0; j < subjects.length; j++) {
                if (Math.random() > 0.3) {
                    const grade = (Math.random() * 12 + 5).toFixed(1);
                    grades.push({
                        id: gradeId++,
                        studentId: students[i].id,
                        subjectId: subjects[j].id,
                        grade: parseFloat(grade),
                        term: 'T1'
                    });
                }
            }
        }
        localStorage.setItem('grades_senegal', JSON.stringify(grades));
    }

    if (absences.length === 0) {
        for (let i = 0; i < 20; i++) {
            const studentId = Math.floor(Math.random() * students.length) + 1;
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 30));
            absences.push({
                id: i + 1,
                studentId: studentId,
                date: date.toISOString().split('T')[0],
                justified: Math.random() > 0.5,
                reason: Math.random() > 0.7 ? 'Maladie' : 'Retard'
            });
        }
        localStorage.setItem('absences_senegal', JSON.stringify(absences));
    }

    if (activities.length === 0) {
        activities = [
            { id: 1, action: 'Système initialisé avec les données Sénégal', user: 'Système', date: new Date().toISOString(), type: 'info' },
            { id: 2, action: students.length + ' élèves sénégalais ajoutés', user: 'Système', date: new Date().toISOString(), type: 'success' }
        ];
        localStorage.setItem('activities_senegal', JSON.stringify(activities));
    }
}

initSampleData();

function addActivity(action, type = 'info') {
    activities.unshift({ id: Date.now(), action, user: currentUser?.name || 'Système', date: new Date().toISOString(), type });
    activities = activities.slice(0, 50);
    localStorage.setItem('activities_senegal', JSON.stringify(activities));
    updateNotificationBadge();
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeft = `4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'}`;
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}" style="color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'}"></i><span>${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Login - CORRIGÉ
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole').value;

    // Admin login
    if (email === 'admin@edumanage.sn' && password === 'admin123') {
        currentUser = { email, role, name: 'Administrateur' };
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('dashboardContainer').style.display = 'block';
        document.getElementById('userName').innerText = currentUser.name;
        document.getElementById('userAvatar').innerText = 'A';
        addActivity(`Connexion de ${currentUser.name}`);
        showToast('Connexion réussie ! Bienvenue à EduManage Sénégal', 'success');
        loadDashboard();
        showSection('dashboard');
        updateNotificationBadge();
    }
    // Teacher login
    else if (email === 'teacher@school.com' && password === 'teacher123') {
        currentUser = { email, role, name: 'Pr. Abdourahmane Diagne' };
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('dashboardContainer').style.display = 'block';
        document.getElementById('userName').innerText = currentUser.name;
        document.getElementById('userAvatar').innerText = 'P';
        addActivity(`Connexion de ${currentUser.name}`);
        showToast('Connexion réussie ! Bienvenue à EduManage Sénégal', 'success');
        loadDashboard();
        showSection('dashboard');
        updateNotificationBadge();
    }
    else {
        showToast('Email ou mot de passe incorrect', 'error');
    }
});

function logout() {
    addActivity(`Déconnexion de ${currentUser?.name}`);
    currentUser = null;
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('dashboardContainer').style.display = 'none';
    showToast('Déconnecté avec succès', 'info');
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

function showSection(section) {
    document.querySelectorAll('.sidebar-menu-item').forEach(item => item.classList.remove('active'));
    if (event && event.target) {
        event.target.closest('.sidebar-menu-item').classList.add('active');
    }

    const sections = ['dashboardSection', 'studentsSection', 'teachersSection', 'classesSection', 'gradesSection', 'absencesSection', 'analyticsSection'];
    sections.forEach(s => {
        const el = document.getElementById(s);
        if (el) el.style.display = 'none';
    });
    document.getElementById(`${section}Section`).style.display = 'block';

    const titles = {
        dashboard: 'Tableau de bord',
        students: 'Liste des élèves',
        teachers: 'Corps professoral',
        classes: 'Classes',
        grades: 'Relevé des notes',
        absences: 'Absences',
        analytics: 'Analytiques'
    };
    document.getElementById('currentSectionTitle').innerText = titles[section] || section;

    if (section === 'dashboard') loadDashboard();
    else if (section === 'students') renderStudents();
    else if (section === 'teachers') renderTeachers();
    else if (section === 'classes') renderClasses();
    else if (section === 'grades') renderGrades();
    else if (section === 'absences') renderAbsences();
    else if (section === 'analytics') loadAnalytics();
}

function loadDashboard() {
    const totalStudents = students.length;
    const totalTeachers = teachers.length;
    const totalClasses = classes.length;
    const avgGrade = grades.length > 0 ? (grades.reduce((sum, g) => sum + g.grade, 0) / grades.length).toFixed(1) : 0;
    const presenceRate = students.reduce((sum, s) => sum + (s.presence || 90), 0) / students.length;

    document.getElementById('statsGrid').innerHTML = `
                <div class="stat-card" onclick="showSection('students')">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <p style="color: #64748b; font-size: 14px;">Total Élèves</p>
                            <p style="font-size: 36px; font-weight: 800;">${totalStudents}</p>
                            <p style="color: #10b981; font-size: 12px;">Effectif 2024</p>
                        </div>
                        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea20, #764ba220); border-radius: 16px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-users" style="font-size: 24px; color: #667eea;"></i>
                        </div>
                    </div>
                </div>
                <div class="stat-card" onclick="showSection('teachers')">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <p style="color: #64748b; font-size: 14px;">Professeurs</p>
                            <p style="font-size: 36px; font-weight: 800;">${totalTeachers}</p>
                            <p style="color: #10b981; font-size: 12px;">Encadrement de qualité</p>
                        </div>
                        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea20, #764ba220); border-radius: 16px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-chalkboard-user" style="font-size: 24px; color: #667eea;"></i>
                        </div>
                    </div>
                </div>
                <div class="stat-card" onclick="showSection('grades')">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <p style="color: #64748b; font-size: 14px;">Moyenne générale</p>
                            <p style="font-size: 36px; font-weight: 800;">${avgGrade}/20</p>
                            <p style="color: ${avgGrade >= 12 ? '#10b981' : '#f59e0b'}; font-size: 12px;">Performance ${avgGrade >= 12 ? 'bonne' : 'à améliorer'}</p>
                        </div>
                        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea20, #764ba220); border-radius: 16px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-star" style="font-size: 24px; color: #667eea;"></i>
                        </div>
                    </div>
                </div>
                <div class="stat-card" onclick="showSection('absences')">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <p style="color: #64748b; font-size: 14px;">Assiduité</p>
                            <p style="font-size: 36px; font-weight: 800;">${presenceRate.toFixed(0)}%</p>
                            <p style="color: #10b981; font-size: 12px;">Taux de présence</p>
                        </div>
                        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea20, #764ba220); border-radius: 16px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-calendar-check" style="font-size: 24px; color: #667eea;"></i>
                        </div>
                    </div>
                </div>
            `;

    updateCharts();

    const recentHtml = activities.slice(0, 8).map(a => `
                <div style="padding: 16px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; gap: 12px; transition: all 0.3s;">
                    <div style="width: 40px; height: 40px; background: ${a.type === 'info' ? '#3b82f620' : '#10b98120'}; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-${a.type === 'info' ? 'info-circle' : 'check-circle'}" style="color: ${a.type === 'info' ? '#3b82f6' : '#10b981'}"></i>
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: 500;">${a.action}</div>
                        <div style="font-size: 12px; color: #64748b;">${a.user} • ${new Date(a.date).toLocaleString('fr-FR')}</div>
                    </div>
                </div>
            `).join('');
    document.getElementById('recentActivities').innerHTML = recentHtml || '<div style="padding: 40px; text-align: center;">Aucune activité récente</div>';
}

function updateCharts() {
    const classNames = classes.map(c => c.name);
    const classCounts = classes.map(c => students.filter(s => s.classId === c.id).length);

    if (classChart) classChart.destroy();
    const ctx1 = document.getElementById('classChart').getContext('2d');
    classChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: classNames,
            datasets: [{
                label: 'Effectif',
                data: classCounts,
                backgroundColor: 'rgba(102, 126, 234, 0.6)',
                borderRadius: 8,
                barPercentage: 0.6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });

    const subjectsData = subjects.map(s => {
        const subjectGrades = grades.filter(g => g.subjectId === s.id);
        const avg = subjectGrades.length > 0 ? subjectGrades.reduce((sum, g) => sum + g.grade, 0) / subjectGrades.length : 0;
        return { name: s.name, avg: avg };
    });

    if (performanceChart) performanceChart.destroy();
    const ctx2 = document.getElementById('performanceChart').getContext('2d');
    performanceChart = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: subjectsData.map(s => s.name),
            datasets: [{
                label: 'Moyenne /20',
                data: subjectsData.map(s => s.avg),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#10b981',
                pointBorderColor: 'white',
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            scales: { y: { min: 0, max: 20, grid: { color: '#e2e8f0' } } }
        }
    });
}

function renderStudents() {
    const html = students.map(s => {
        const className = classes.find(c => c.id === s.classId)?.name || 'Non assigné';
        return `<tr>
                    <td><strong>${s.name}</strong><br><small style="color:#64748b">${s.email}</small></td>
                    <td>${s.email}</td>
                    <td>${className}</td>
                    <td><span class="badge ${s.avg >= 12 ? 'badge-success' : 'badge-warning'}">${s.avg}/20</span></td>
                    <td>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${s.presence}%"></div>
                        </div>
                        <small>${s.presence}%</small>
                    </td>
                    <td>
                        <button class="btn-outline" style="padding: 6px 12px; margin-right: 8px;" onclick="editStudent(${s.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-outline" style="padding: 6px 12px; border-color: #ef4444; color: #ef4444;" onclick="deleteItem('student', ${s.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`;
    }).join('');
    document.getElementById('studentsList').innerHTML = html || '<tr><td colspan="6" style="text-align:center;">Aucun élève</td></tr>';
}

function renderTeachers() {
    const html = teachers.map(t => `<tr>
                <td><strong>${t.name}</strong><br><small>${t.email}</small></td>
                <td>${t.email}</td>
                <td><span class="badge badge-info">${t.subject}</span></td>
                <td>
                    <button class="btn-outline" style="padding: 6px 12px;" onclick="deleteItem('teacher', ${t.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`).join('');
    document.getElementById('teachersList').innerHTML = html || '<tr><td colspan="4" style="text-align:center;">Aucun professeur</tr>';
}

function renderClasses() {
    const html = classes.map(c => {
        const studentCount = students.filter(s => s.classId === c.id).length;
        const fillRate = (studentCount / c.capacity * 100).toFixed(0);
        return `<tr>
                    <td><strong>${c.name}</strong></td>
                    <td>${c.level}</td>
                    <td>${studentCount}</td>
                    <td>${c.capacity}</td>
                    <td>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${fillRate}%"></div>
                        </div>
                        <small>${fillRate}%</small>
                    </td>
                    <td>
                        <button class="btn-outline" style="padding: 6px 12px;" onclick="deleteItem('class', ${c.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`;
    }).join('');
    document.getElementById('classesList').innerHTML = html || '<tr><td colspan="6" style="text-align:center;">Aucune classe</tr>';
}

function renderGrades() {
    const html = grades.slice(0, 50).map(g => {
        const student = students.find(s => s.id === g.studentId);
        const subject = subjects.find(s => s.id === g.subjectId);
        let appreciation = '';
        if (g.grade >= 16) appreciation = 'Excellent';
        else if (g.grade >= 14) appreciation = 'Très bien';
        else if (g.grade >= 12) appreciation = 'Bien';
        else if (g.grade >= 10) appreciation = 'Assez bien';
        else appreciation = 'À améliorer';

        return `<tr>
                    <td>${student?.name || 'Inconnu'}</td>
                    <td>${subject?.name || 'Inconnu'}</td>
                    <td><strong>${g.grade}/20</strong></td>
                    <td><span class="badge ${g.grade >= 12 ? 'badge-success' : 'badge-warning'}">${appreciation}</span></td>
                    <td><span class="badge badge-info">${g.term}</span></td>
                    <td>
                        <button class="btn-outline" style="padding: 6px 12px;" onclick="deleteItem('grade', ${g.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`;
    }).join('');
    document.getElementById('gradesList').innerHTML = html || '<tr><td colspan="6" style="text-align:center;">Aucune note</tr>';
}

function renderAbsences() {
    const html = absences.slice(0, 50).map(a => {
        const student = students.find(s => s.id === a.studentId);
        return `<tr>
                    <td>${student?.name || 'Inconnu'}</td>
                    <td>${a.date}</td>
                    <td><span class="badge ${a.justified ? 'badge-success' : 'badge-warning'}">${a.justified ? 'Justifiée' : 'Non justifiée'}</span></td>
                    <td>${a.reason || '-'}</td>
                    <td>
                        <button class="btn-outline" style="padding: 6px 12px;" onclick="deleteItem('absence', ${a.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>`;
    }).join('');
    document.getElementById('absencesList').innerHTML = html || '<tr><td colspan="5" style="text-align:center;">Aucune absence</tr>';
}

function loadAnalytics() {
    const successRate = grades.length > 0 ? ((grades.filter(g => g.grade >= 10).length / grades.length) * 100).toFixed(1) : 0;
    const topStudents = [...students].sort((a, b) => (b.avg || 0) - (a.avg || 0)).slice(0, 10);

    document.getElementById('analyticsStats').innerHTML = `
                <div class="stat-card"><div><p style="color:#64748b">Taux de réussite</p><p style="font-size:32px;font-weight:800;">${successRate}%</p><small>Objectif 75%</small></div><i class="fas fa-chart-line" style="font-size:32px;color:#667eea;"></i></div>
                <div class="stat-card"><div><p style="color:#64748b">Moyenne classe</p><p style="font-size:32px;font-weight:800;">${(grades.reduce((sum, g) => sum + g.grade, 0) / grades.length || 0).toFixed(1)}/20</p><small>Nationale: 11/20</small></div><i class="fas fa-star" style="font-size:32px;color:#667eea;"></i></div>
                <div class="stat-card"><div><p style="color:#64748b">Taux d'absentéisme</p><p style="font-size:32px;font-weight:800;">${((absences.filter(a => !a.justified).length / (students.length * 30)) * 100).toFixed(1)}%</p><small>En baisse</small></div><i class="fas fa-calendar-times" style="font-size:32px;color:#667eea;"></i></div>
            `;

    document.getElementById('topPerformers').innerHTML = topStudents.map((s, i) => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">${i + 1}</div>
                        <div><strong>${s.name}</strong><br><small>${classes.find(c => c.id === s.classId)?.name || 'N/A'}</small></div>
                    </div>
                    <div><span class="badge badge-success">${s.avg}/20</span></div>
                </div>
            `).join('');

    if (analyticsChart) analyticsChart.destroy();
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    analyticsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Réussite (≥10/20)', 'Échec (<10/20)'],
            datasets: [{
                data: [successRate, 100 - successRate],
                backgroundColor: ['#10b981', '#ef4444'],
                borderWidth: 0
            }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });
}

function searchStudents() {
    const searchTerm = document.getElementById('studentSearch')?.value.toLowerCase() || '';
    const filtered = students.filter(s => s.name.toLowerCase().includes(searchTerm) || s.email.toLowerCase().includes(searchTerm));
    const html = filtered.map(s => {
        const className = classes.find(c => c.id === s.classId)?.name || 'Non assigné';
        return `<tr>
                    <td><strong>${s.name}</strong><br><small>${s.email}</small></td>
                    <td>${s.email}</td>
                    <td>${className}</td>
                    <td><span class="badge ${s.avg >= 12 ? 'badge-success' : 'badge-warning'}">${s.avg}/20</span></td>
                    <td>${s.presence}%</td>
                    <td><button class="btn-outline" onclick="deleteItem('student', ${s.id})"><i class="fas fa-trash"></i></button></td>
                </tr>`;
    }).join('');
    document.getElementById('studentsList').innerHTML = html || '<tr><td colspan="6">Aucun résultat</td></tr>';
}

function editStudent(id) {
    showToast('Fonction d\'édition disponible dans la version complète', 'info');
}

function quickAdd() {
    const sections = ['student', 'teacher', 'class', 'grade', 'absence'];
    const randomSection = sections[Math.floor(Math.random() * sections.length)];
    showModal(randomSection);
}

function showModal(type) {
    currentModalType = type;
    document.getElementById('modal').style.display = 'flex';
    let fields = '';

    if (type === 'student') {
        fields = `<div class="form-group"><label>Nom complet</label><input type="text" id="name" placeholder="Ex: Aïssatou Diallo" required></div>
                         <div class="form-group"><label>Email</label><input type="email" id="email" placeholder="Ex: prenom.nom@etudiant.sn" required></div>
                         <div class="form-group"><label>Classe</label><select id="classId">${classes.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}</select></div>
                         <div class="form-group"><label>Téléphone</label><input type="tel" id="phone" placeholder="77 123 45 67"></div>`;
    } else if (type === 'teacher') {
        fields = `<div class="form-group"><label>Nom complet</label><input type="text" id="name" placeholder="Ex: Pr. Abdourahmane Diagne" required></div>
                         <div class="form-group"><label>Email</label><input type="email" id="email" placeholder="Ex: prenom.nom@prof.sn" required></div>
                         <div class="form-group"><label>Matière</label><input type="text" id="subject" placeholder="Ex: Mathématiques" required></div>`;
    } else if (type === 'class') {
        fields = `<div class="form-group"><label>Nom de la classe</label><input type="text" id="name" placeholder="Ex: 6ème A" required></div>
                         <div class="form-group"><label>Niveau</label><input type="text" id="level" placeholder="Ex: 6ème" required></div>
                         <div class="form-group"><label>Capacité</label><input type="number" id="capacity" placeholder="35" required></div>`;
    } else if (type === 'grade') {
        fields = `<div class="form-group"><label>Élève</label><select id="studentId">${students.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
                         <div class="form-group"><label>Matière</label><select id="subjectId">${subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
                         <div class="form-group"><label>Note (/20)</label><input type="number" id="grade" min="0" max="20" step="0.5" required></div>
                         <div class="form-group"><label>Trimestre</label><select id="term"><option>T1</option><option>T2</option><option>T3</option></select></div>`;
    } else if (type === 'absence') {
        fields = `<div class="form-group"><label>Élève</label><select id="studentId">${students.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</select></div>
                         <div class="form-group"><label>Date</label><input type="date" id="date" required></div>
                         <div class="form-group"><label>Justifiée</label><select id="justified"><option value="false">Non</option><option value="true">Oui</option></select></div>
                         <div class="form-group"><label>Motif</label><textarea id="reason" placeholder="Raison de l'absence..."></textarea></div>`;
    }

    document.getElementById('modalFields').innerHTML = fields;
    document.getElementById('modalTitle').innerText = `Ajouter ${type === 'student' ? 'un élève' : type === 'teacher' ? 'un professeur' : type === 'class' ? 'une classe' : type === 'grade' ? 'une note' : 'une absence'}`;
}

document.getElementById('modalForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const type = currentModalType;
    let newItem = {};

    if (type === 'student') {
        newItem = {
            id: Date.now(),
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            classId: parseInt(document.getElementById('classId').value),
            presence: 90,
            avg: 0
        };
        students.push(newItem);
        localStorage.setItem('students_senegal', JSON.stringify(students));
        addActivity(`Ajout de l'élève ${newItem.name}`);
        showToast(`Élève ${newItem.name} ajouté avec succès`);
        renderStudents();
    } else if (type === 'teacher') {
        newItem = {
            id: Date.now(),
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value
        };
        teachers.push(newItem);
        localStorage.setItem('teachers_senegal', JSON.stringify(teachers));
        addActivity(`Ajout du professeur ${newItem.name}`);
        showToast(`Professeur ${newItem.name} ajouté`);
        renderTeachers();
    } else if (type === 'class') {
        newItem = {
            id: Date.now(),
            name: document.getElementById('name').value,
            level: document.getElementById('level').value,
            capacity: parseInt(document.getElementById('capacity').value)
        };
        classes.push(newItem);
        localStorage.setItem('classes_senegal', JSON.stringify(classes));
        addActivity(`Création de la classe ${newItem.name}`);
        showToast(`Classe ${newItem.name} créée`);
        renderClasses();
    } else if (type === 'grade') {
        newItem = {
            id: Date.now(),
            studentId: parseInt(document.getElementById('studentId').value),
            subjectId: parseInt(document.getElementById('subjectId').value),
            grade: parseFloat(document.getElementById('grade').value),
            term: document.getElementById('term').value
        };
        grades.push(newItem);
        localStorage.setItem('grades_senegal', JSON.stringify(grades));
        addActivity(`Ajout d'une note de ${newItem.grade}/20`);
        showToast(`Note enregistrée`);
        renderGrades();
    } else if (type === 'absence') {
        newItem = {
            id: Date.now(),
            studentId: parseInt(document.getElementById('studentId').value),
            date: document.getElementById('date').value,
            justified: document.getElementById('justified').value === 'true',
            reason: document.getElementById('reason').value
        };
        absences.push(newItem);
        localStorage.setItem('absences_senegal', JSON.stringify(absences));
        addActivity(`Signalement d'absence`);
        showToast(`Absence signalée`);
        renderAbsences();
    }

    closeModal();
    loadDashboard();
});

function deleteItem(type, id) {
    if (confirm('Supprimer définitivement cet élément ?')) {
        if (type === 'student') students = students.filter(i => i.id !== id);
        else if (type === 'teacher') teachers = teachers.filter(i => i.id !== id);
        else if (type === 'class') classes = classes.filter(i => i.id !== id);
        else if (type === 'grade') grades = grades.filter(i => i.id !== id);
        else if (type === 'absence') absences = absences.filter(i => i.id !== id);

        localStorage.setItem(`${type}s_senegal`, JSON.stringify(eval(type + 's')));
        if (type === 'student') renderStudents();
        else if (type === 'teacher') renderTeachers();
        else if (type === 'class') renderClasses();
        else if (type === 'grade') renderGrades();
        else if (type === 'absence') renderAbsences();
        loadDashboard();
        showToast(`Élément supprimé`, 'info');
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function exportToExcel(type) {
    let data = [];
    if (type === 'students') data = students.map(s => ({ Nom: s.name, Email: s.email, Classe: classes.find(c => c.id === s.classId)?.name || 'N/A', Moyenne: s.avg, Présence: `${s.presence}%` }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, type);
    XLSX.writeFile(wb, `${type}_senegal_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast(`Export ${type} réussi`, 'success');
}

function exportActivities() {
    const ws = XLSX.utils.json_to_sheet(activities);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'activities');
    XLSX.writeFile(wb, `activites_senegal_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast('Export des activités réussi', 'success');
}

function showNotifications() {
    showToast(`${activities.filter(a => new Date(a.date).toDateString() === new Date().toDateString()).length} notifications aujourd'hui`, 'info');
}

function updateNotificationBadge() {
    const todayActivities = activities.filter(a => new Date(a.date).toDateString() === new Date().toDateString()).length;
    document.getElementById('notificationBadge').innerText = todayActivities;
}

window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) closeModal();
}

// Responsive menu toggle
if (window.innerWidth <= 1024) {
    document.getElementById('menuToggle').style.display = 'block';
}
