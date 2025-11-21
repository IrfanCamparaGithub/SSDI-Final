# 6112-Term-Project
 
All application code is located in the `6112-Term-Project-main/` directory.

Follow the instructions below to install and run the application.

---

## Prerequisites

- Python 3.x installed
- mySQL installed
- pip installed  
- Git installed  
- Alpha Vantage API Key (request a free API key in less that 20 seconds: https://www.alphavantage.co/support/#api-key)

---

## Project Structure

```text
6112-Term-Project-main/
├── db.py             # Database setup / connection logic
├── main.py           # Application entrypoint / backend routes
├── models.py         # Data / ORM models
├── schemas.py        # Request/response schemas
├── frontend/         # HTML/CSS/JS files for the UI
├── requirements.txt  # Python dependencies
└── README.md         # This file
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/IrfanCamparaGithub/SSDI-Final.git
cd SSDI-Final/6112-Term-Project-main/
```

---

## 2. Create a Virtual Environment

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

### Windows (PowerShell)

```powershell
python -m venv venv
venv\Scripts\Activate.ps1
```

---

## 3. Install Dependencies

Install all required Python packages using the `requirements.txt` file:

```bash
pip install -r requirements.txt
```

---

## 4. Configure the Database

The application requires a local **MySQL** instance with the following settings (as defined in `db.py`):

* Host: `127.0.0.1`
* Port: `3306`
* User: `root` 
* Password: `password`
* Database name: `6112_Term_Project`

Create the database (from a MySQL client or CLI):

```sql
CREATE DATABASE 6112_Term_Project;
```

If your local MySQL user or password is different, update the connection string in `db.py`:

```python
User_Database_URL = "mysql+mysqlconnector://<user>:<password>@127.0.0.1:3306/6112_Term_Project"
```
Make sure to save your changes

---

## 5. Configure the API Key


Modify the first line of `macro.js` and `new.js` to contain the API Key requested in prerequisites step.

```javascript
const API_KEY = 'Enter you API key here';
```

Make sure to save your changes

---

## 6. Run the Application

From inside `6112-Term-Project-main/` with the virtual environment activated, start the FastAPI app using Uvicorn:

```bash
uvicorn main:app --reload
```

You should see output indicating that the server is running:

```text
http://127.0.0.1:8000
```

---

## 7. Access the Application

Once the server is running:

1. Open a web browser (Chrome, Edge, etc.).

2. Go to:

   ```text
   http://127.0.0.1:8000/
   ```


