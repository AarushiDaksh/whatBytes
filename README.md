 # Building Healthcare Backend
  This is a **Healthcare Application Backend** built with **Node.js, Express, Prisma, PostgreSQL, Zod, and JWT**.  
  It provides secure **authentication**, full **REST APIs** for patients and doctors, and **patient–doctor mappings**.  
  An **images/** folder is included with sample API responses for reference.
  
---

Objective
The goal of this assignment is to create a backend system for a healthcare application where users can:
- Register and log in securely
- Manage **patients** and **doctors**
- Assign doctors to patients
- Store data securely in **PostgreSQL**

---
 Tech Stack
| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express |
| Database | PostgreSQL |
| ORM | Prisma |
| Validation | Zod |
| Authentication | JWT (jsonwebtoken) |
| Security | bcrypt.js for password hashing |

---
 Authentication APIs

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register/` | Register a new user with name, email, password | Public |
| POST | `/api/auth/login/` | Log in and return a JWT token | Public |

---
 Patient Management APIs

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/patients/` | Add a new patient | Authenticated |
| GET | `/api/patients/` | Retrieve all patients created by the authenticated user | Authenticated |
| GET | `/api/patients/:id/` | Get details of a specific patient | Authenticated |
| PUT | `/api/patients/:id/` | Update patient details | Authenticated |
| DELETE | `/api/patients/:id/` | Delete a patient record | Authenticated |

---

Doctor Management APIs

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/doctors/` | Add a new doctor | Authenticated |
| GET | `/api/doctors/` | Retrieve all doctors | Authenticated |
| GET | `/api/doctors/:id/` | Get details of a specific doctor | Authenticated |
| PUT | `/api/doctors/:id/` | Update doctor details | Authenticated |
| DELETE | `/api/doctors/:id/` | Delete a doctor record | Authenticated |

---

Patient–Doctor Mapping APIs

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/mappings/` | Assign a doctor to a patient | Authenticated |
| GET | `/api/mappings/` | Retrieve all patient–doctor mappings | Authenticated |
| GET | `/api/mappings/:patient_id/` | Get all doctors assigned to a specific patient | Authenticated |
| DELETE | `/api/mappings/:id/` | Remove a doctor from a patient | Authenticated |

---
 Implementation Details

- **Database**: PostgreSQL schema managed by **Prisma Migrate**
- **Validation**: Zod schemas validate request payloads
- **Security**: 
  - Passwords hashed with bcrypt.js  
  - JWT tokens protect routes  
- **Error Handling**: Centralized Express error middleware
- **Environment Variables**:
  ```env
  DATABASE_URL=postgresql://yourpass@localhost:registerPORT/whatbytes<anyofyourdatabase>
  JWT_SECRET=supersecretkey
  PORT=5000
# Setup & Run

```bash
# 1. Clone repo
git clone https://github.com/AarushiDaksh/whatbytes.git
cd whatbytes

# 2. Install deps
npm install

# 3. Run server
npm start 
```


