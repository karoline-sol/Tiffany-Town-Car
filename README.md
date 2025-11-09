# **🚗 Tiffany Town Car – Booking App**
A sleek and responsive React + TypeScript transportation booking app built for a luxury town car service. 
Users can select their trip details, choose a vehicle, enter contact info, and confirm their reservation — 
all in a smooth, step-by-step flow with animated transitions.


## **🧠 Learnings**
Handling multi-step forms in React with TypeScript
Using local storage for temporary user data
Designing with Tailwind CSS animations for smooth UX
Creating modular reusable components


## **💡 Usage Flow**
Home: Start booking → choose pickup/drop-off
Ride Details: Choose date, time, and ride type
Vehicle Selection: Pick a vehicle and see price
Contact Details: Fill out passenger information
Summary: Review and confirm your booking

![demo-ezgif com-resize](https://github.com/user-attachments/assets/1a3b3251-60a0-4861-bf58-780af11e7756)


## **🧱 Project Structure**

src/
├── components/reservations
│   ├── RideDetails.tsx
│   ├── ChooseVehicle.tsx
│   ├── ContactDetails.tsx
│   └── BookingSummary.tsx
├── App.tsx
├── main.tsx
├── index.css
├── routes/
│   ├── Home.tsx
│   ├── Blog.tsx
│   └── Contact.tsx
├── utils/
│   └── storage.ts


## **⚙️ Tech Stack**
Tech	                  Purpose
React (TypeScript)	    Frontend framework
Vite	                  Fast bundler and dev environment
Tailwind CSS 4.1.16	    Styling and animations
React Router DOM	      Routing between pages
Local Storage API	      Persist user selections
