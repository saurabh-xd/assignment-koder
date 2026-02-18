

```md
# Full Stack Task Manager



---

## Tech Stack

**Frontend**
- Next.js 
- Tailwind CSS

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

---

## Features

- Create a task (title + description)
- View all tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed/pending
- REST API integration
- Clean and minimal UI

---

## Project Structure

```

<pre>
task-manager/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    ├── package.json
    └── .env.local.example
</pre>


````

---

## Getting Started

### 1. Clone repository
```bash
git clone https://github.com/your-username/task-manager-fullstack.git
cd task-manager-fullstack
````

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create `.env.local` inside `frontend`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## API Endpoints

Base URL:

```
http://localhost:5000/api
```

| Method | Endpoint          | Description   |
| ------ | ----------------- | ------------- |
| GET    | /tasks            | Get all tasks |
| POST   | /tasks            | Create task   |
| PUT    | /tasks/:id        | Update task   |
| PATCH  | /tasks/:id/toggle | Toggle status |
| DELETE | /tasks/:id        | Delete task   |

---

## Environment Variables

### Backend (`backend/.env`)

```
PORT=5000
MONGO_URI=your_mongo_uri
```

### Frontend (`frontend/.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Running Locally

You need two terminals:

**Terminal 1**

```bash
cd backend
npm run dev
```

**Terminal 2**

```bash
cd frontend
npm run dev
```

Then open:

```
http://localhost:3000
```

---

