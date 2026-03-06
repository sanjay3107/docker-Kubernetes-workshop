from flask import Flask, request, jsonify
import psycopg2
import os
from datetime import datetime

app = Flask(__name__)

# Database connection parameters from environment variables
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_NAME = os.getenv('DB_NAME', 'myapp')
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASS = os.getenv('DB_PASS', 'password')

def get_db_connection():
    """Create database connection"""
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )

def init_db():
    """Initialize database table"""
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('''
            CREATE TABLE IF NOT EXISTS visits (
                id SERIAL PRIMARY KEY,
                timestamp TIMESTAMP,
                message TEXT
            )
        ''')
        conn.commit()
        cur.close()
        conn.close()
        return True
    except Exception as e:
        print(f"Database error: {e}")
        return False

@app.route('/')
def home():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Add new visit
        cur.execute(
            "INSERT INTO visits (timestamp, message) VALUES (%s, %s)",
            (datetime.now(), "Page visited")
        )
        conn.commit()
        
        # Get total visits
        cur.execute("SELECT COUNT(*) FROM visits")
        count = cur.fetchone()[0]
        
        # Get recent visits
        cur.execute("SELECT timestamp, message FROM visits ORDER BY timestamp DESC LIMIT 5")
        recent = cur.fetchall()
        
        cur.close()
        conn.close()
        
        recent_html = ''.join([
            f'<div class="visit-item">🕐 {r[0].strftime("%H:%M:%S")} - {r[1]}</div>'
            for r in recent
        ])
        
        return f'''
        <html>
            <head>
                <title>Multi-Container App</title>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        max-width: 700px;
                        margin: 50px auto;
                        padding: 20px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                    }}
                    .container {{
                        background: rgba(255, 255, 255, 0.1);
                        padding: 30px;
                        border-radius: 10px;
                        backdrop-filter: blur(10px);
                    }}
                    h1 {{ font-size: 2.5em; margin: 0; }}
                    .count {{ font-size: 3em; color: #4CAF50; }}
                    .status {{ background: #4CAF50; padding: 5px 15px; border-radius: 20px; display: inline-block; margin: 10px 0; }}
                    .visits {{ background: rgba(0, 0, 0, 0.2); padding: 15px; border-radius: 5px; margin-top: 20px; }}
                    .visit-item {{ padding: 5px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🐘 Multi-Container App</h1>
                    <div class="status">✅ Connected to PostgreSQL</div>
                    <p>Total visits: <span class="count">{count}</span></p>
                    <div class="visits">
                        <strong>Recent visits:</strong>
                        {recent_html}
                    </div>
                    <p><em>Data is stored in PostgreSQL container!</em></p>
                </div>
            </body>
        </html>
        '''
    except Exception as e:
        return f'''
        <html>
            <head><title>Error</title></head>
            <body style="font-family: Arial; padding: 50px; background: #f44336; color: white;">
                <h1>❌ Database Connection Error</h1>
                <p>{str(e)}</p>
                <p>Make sure PostgreSQL container is running!</p>
            </body>
        </html>
        ''', 500

@app.route('/health')
def health():
    try:
        conn = get_db_connection()
        conn.close()
        return jsonify({'status': 'healthy', 'database': 'connected'})
    except:
        return jsonify({'status': 'unhealthy', 'database': 'disconnected'}), 500

if __name__ == '__main__':
    # Wait for database and initialize
    import time
    for i in range(30):
        if init_db():
            print("Database initialized successfully!")
            break
        print(f"Waiting for database... ({i+1}/30)")
        time.sleep(1)
    
    app.run(host='0.0.0.0', port=5000, debug=True)
