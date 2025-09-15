import chalk from "chalk"
import sqlite3 from "sqlite3"
import { env } from "../env/config.js"

export class DetectionRepositoryClass {
    constructor() {
        const config = sqlite3.verbose()
        this.db = new config.Database(env.DATABASE_URL)
    }

    connect() {
        this.db.run(`CREATE TABLE IF NOT EXISTS detections (
            id INTEGER PRIMARY KEY,
            event TEXT NOT NULL,
            track_id INTEGER,
            cam_id TEXT,
            image TEXT,
            face TEXT,
            proxy TEXT,
            event_timestamp TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) return console.error(`DATABASE_CONNECT_PROCESS: ${chalk.red('failed')} | ERROR: `, chalk.red(err.message))

            console.log("DATABASE_CONNECT_PROCESS: ", chalk.green('success'))
        })

        return this
    }

    insert(detectionLog) {
        return new Promise((resolve, reject) => {
            this.db.run(
                `INSERT OR REPLACE INTO detections (id, event, track_id, cam_id, image, face, proxy, event_timestamp)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    detectionLog.id,
                    detectionLog.event,
                    detectionLog.track_id,
                    detectionLog.cam_id,
                    detectionLog.image,
                    detectionLog.face,
                    detectionLog.proxy,
                    detectionLog.event_timestamp
                ],
                function (err) {
                    if (err) return reject(err)
                    resolve(this.lastID)
                }
            )
        })
    }

    selectAll() {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM detections ORDER BY created_at DESC`, [], (err, rows) => {
                if (err) return reject(err)
                resolve(rows)
            })
        })
    }

    selectById(detection_id) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM detections WHERE id = ?`, [detection_id], (err, row) => {
                if (err) return reject(err)
                resolve(row || null) // retorna apenas o registro ou null se não existir
            })
        })
    }

    selectByParams(start_time, end_time, max_count) {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT * FROM detections 
                WHERE event_timestamp BETWEEN ? AND ?
                ORDER BY created_at DESC
                `

            const params = [start_time, end_time]

            if (max_count >= 0) {
                query += ` LIMIT ?`
                params.push(max_count)
            }

            this.db.all(query, params, (err, rows) => {
                if (err) return reject(err)
                resolve(rows)
            })
        })
    }

    dropTable() {
        this.db.run(`DROP TABLE IF EXISTS detections`, (err) => {
            if (err) return console.error("Erro ao dropar tabela 'detections':", err.message)

            console.log("Tabela 'detections' removida.")
        })
    }
}

const DetectionRepository = new DetectionRepositoryClass().connect()
export default DetectionRepository