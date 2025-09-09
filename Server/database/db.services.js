import sqlite3 from "sqlite3"

const config = sqlite3.verbose()
const db = new config.Database("./database/database.db")

db.run(`DROP TABLE IF EXISTS detections`, (err) => {
  if (err) {
    console.error("Erro ao dropar tabela:", err.message);
    return;
  }
  console.log("Tabela antiga removida.")
})

// cria tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS detections (
    id INTEGER PRIMARY KEY,
    event TEXT NOT NULL,
    track_id INTEGER,
    cam_id TEXT,
    image TEXT,
    face TEXT,
    proxy TEXT,
    event_timestamp TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`)

function insert_detection(detectionLog) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT OR REPLACE INTO detections (id, event, track_id, cam_id, image, face, proxy, event_timestamp)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        detectionLog.id,
        detectionLog.event,
        detectionLog.track_id,
        detectionLog.cam_id,
        detectionLog.image,
        detectionLog.event_timestamp
      ],
      function (err) {
        if (err) return reject(err)
        resolve(this.lastID)
      }
    )
  })
}

function select_detections() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM detections ORDER BY created_at DESC`, [], (err, rows) => {
      if (err) return reject(err)
      resolve(rows)
    })
  })
}

function select_detection_by_id(detection_id) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM detections WHERE id = ?`, [detection_id], (err, rows) => {
      if (err) return reject(err)
      resolve(rows[0] || null) // retorna apenas o primeiro registro ou null se não existir
    })
  })
}

const database = {
  insert_detection,
  select_detections,
  select_detection_by_id
}

export default database;
