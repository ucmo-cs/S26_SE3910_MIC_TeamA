# Bank Appointment Demo

This program is very basic for now, aesthically and program wise, just utilizing front end parts to get the program started in a sense, letting you pick a few appointment topics, branches, dates, times, etc. for now without saving anything yet. A lot of options are also placceholder for now, and are key to change over the rest of the program. Below lists instructions on hoe to run and end the program.

This project includes a simple frontend (`index.html`) and a tiny Node.js backend (`server.js`) that provides mock API endpoints for topics, branches, available time slots, and booking appointments.

Run locally:

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open your browser to:

```
http://localhost:8080/
```

Notes:
- The backend uses an in-memory store; restarting the server clears bookings.
- `index.html` is served from the project root so no CORS issues.

Stopping the server

 - In the terminal where you started the server, press `Ctrl+C` to stop it.

 - If you need to kill the process by port (Windows):

```powershell
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

 - On macOS / Linux, you can use:

```bash
lsof -i :8080    # find process
kill <PID>
# or
pkill -f server.js
```

Note: replacing `<PID>` with the process id shown by `netstat`/`lsof`.
# S26_SE3910_MIC_TeamA
