/**
 * Gestion Scolaire Sénégal - JavaScript Console
 * Fichier: script.js
 * Lancement: node script.js
 */

// ===== DONNÉES =====
const senegaleseStudentNames = [
    'Aïssatou Diallo', 'Mamadou Diop', 'Fatou Ndiaye', 'Ibrahima Sow', 'Mariama Ba',
    'Cheikh Fall', 'Aminata Ly', 'Mouhamed Gueye', 'Ndeye Sarr', 'Oumar Faye',
    'Rokhaya Kane', 'Abdoulaye Seck', 'Sokhna Diop', 'Moustapha Niang', 'Binta Thiam',
    'Adama Traoré', 'Awa Ndiaye', 'Boubacar Diagne', 'Coumba Mbaye', 'Demba Cissé',
    'Diara Faye', 'Fatima Sy', 'Habib Sow', 'Kalidou Koulibaly', 'Khady Ndiaye',
    'Mame Diarra', 'Mariétou Diallo', 'Modou Dieng', 'Ngoné Fall', 'Papa Diop'
];

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

const senegaleseSubjects = [
    { id: 1, name: 'Mathématiques', coefficient: 4, teacherId: 1 },
    { id: 2, name: 'Français', coefficient: 3, teacherId: 2 },
    { id: 3, name: 'Anglais', coefficient: 2, teacherId: 7 },
    { id: 4, name: 'Physique-Chimie', coefficient: 3, teacherId: 3 },
    { id: 5, name: 'SVT', coefficient: 3, teacherId: 4 },
    { id: 6, name: 'Histoire-Géographie', coefficient: 2, teacherId: 5 },
    { id: 7, name: 'Philosophie', coefficient: 2, teacherId: 6 }
];

// ===== STOCKAGE =====
let students = [];
let teachers = [];
let classes = [];
let subjects = [];
let grades = [];
let absences = [];

// ===== INITIALISATION =====
function initData() {
    // Élèves
    students = senegaleseStudentNames.map((name, i) => ({
        id: i + 1,
        name: name,
        email: name.toLowerCase().replace(/[^a-z]/g, '.') + '@etudiant.sn',
        classId: (i % 14) + 1,
        presence: Math.floor(Math.random() * 30 + 70),
        avg: parseFloat((Math.random() * 10 + 7).toFixed(1))
    }));

    // Professeurs
    teachers = senegaleseTeacherNames.map((t, i) => ({
        id: i + 1,
        name: t.name,
        email: t.email,
        subject: t.subject
    }));

    classes = senegaleseClasses;
    subjects = senegaleseSubjects;

    // Notes
    let gradeId = 1;
    students.forEach(student => {
        subjects.forEach(subject => {
            if (Math.random() > 0.3) {
                grades.push({
                    id: gradeId++,
                    studentId: student.id,
                    subjectId: subject.id,
                    grade: parseFloat((Math.random() * 12 + 5).toFixed(1)),
                    term: 'T1'
                });
            }
        });
    });

    // Absences
    for (let i = 0; i < 20; i++) {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));
        absences.push({
            id: i + 1,
            studentId: Math.floor(Math.random() * students.length) + 1,
            date: date.toISOString().split('T')[0],
            justified: Math.random() > 0.5,
            reason: Math.random() > 0.7? 'Maladie' : 'Retard'
        });
    }
}

// ===== FONCTIONS =====
function getClassName(id) {
    const c = classes.find(cls => cls.id === id);
    return c? c.name : 'N/A';
}

function afficherStats() {
    const moy = grades.length > 0? (grades.reduce((s, g) => s + g.grade, 0) / grades.length).toFixed(1) : 0;
    const presence = students.reduce((s, e) => s + e.presence, 0) / students.length;

    console.log('\n========== STATISTIQUES ==========');
    console.log(`Elèves : ${students.length}`);
    console.log(`Professeurs : ${teachers.length}`);
    console.log(`Classes : ${classes.length}`);
    console.log(`Moyenne générale : ${moy}/20`);
    console.log(`Taux de présence : ${presence.toFixed(0)}%`);
}

function afficherEleves() {
    console.log('\n========== LISTE DES ELEVES ==========');
    console.log('ID Nom Classe Moyenne Présence');
    console.log('--- ---------------------- ------------ --------');
    students.forEach(e => {
        console.log(
            `${String(e.id).padEnd(4)}${e.name.padEnd(22)}${getClassName(e.classId).padEnd(13)}${String(e.avg).padEnd(9)}/20 ${e.presence}%`
        );
    });
}

function afficherProfs() {
    console.log('\n========== PROFESSEURS ==========');
    teachers.forEach(p => {
        console.log(`${p.id}. ${p.name} - ${p.subject}`);
    });
}

function topEleves(n = 5) {
    console.log(`\n========== TOP ${n} ELEVES ==========`);
    [...students].sort((a, b) => b.avg - a.avg).slice(0, n)
       .forEach((e, i) => {
            console.log(`${i + 1}. ${e.name} - ${e.avg}/20 - ${getClassName(e.classId)}`);
        });
}

function rechercher(nom) {
    const res = students.filter(e => e.name.toLowerCase().includes(nom.toLowerCase()));
    console.log(`\nRecherche "${nom}" : ${res.length} résultat(s)`);
    res.forEach(e => console.log(`- ${e.name} | ${getClassName(e.classId)} | ${e.avg}/20`));
}

// ===== MAIN =====
initData();
afficherStats();
afficherEleves();
afficherProfs();
topEleves(5);
recher('Diop');
