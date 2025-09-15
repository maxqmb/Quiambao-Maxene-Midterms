<template>
  <div id="app" :style="backgroundStyle">
    <!-- Main Container -->
    <div class="main-container">
      <!-- Title and System Info -->
      <h1>{{ homeData.systemName || "Loading..." }}</h1>
      <p>Status: {{ homeData.status || "Loading..." }}</p>
      <p>{{ homeData.message || "" }}</p>

      <!-- Student Form Section -->
      <section class="form-section">
        <h2>Student Form</h2>
        <form @submit.prevent="submitStudentForm">
          <input v-model="student.studentID" placeholder="Student ID" required />
          <input v-model="student.firstName" placeholder="First Name" required />
          <input v-model="student.lastName" placeholder="Last Name" required />
          <input v-model="student.section" placeholder="Section" required />
          <button type="submit">Submit Student</button>
        </form>

        <!-- Success Notification for Student Form -->
        <p v-if="studentMessage" class="notification">{{ studentMessage }}</p>
      </section>

      <!-- Admin Form Section -->
      <section class="form-section">
        <h2>Admin Form</h2>
        <form @submit.prevent="submitAdminForm">
          <input v-model="admin.adminID" placeholder="Admin ID" required />
          <input v-model="admin.firstName" placeholder="First Name" required />
          <input v-model="admin.lastName" placeholder="Last Name" required />
          <input v-model="admin.department" placeholder="Department" required />
          <button type="submit">Submit Admin</button>
        </form>

        <!-- Success Notification for Admin Form -->
        <p v-if="adminMessage" class="notification">{{ adminMessage }}</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      homeData: {},
      student: {
        studentID: '',
        firstName: '',
        lastName: '',
        section: ''
      },
      admin: {
        adminID: '',
        firstName: '',
        lastName: '',
        department: ''
      },
      studentMessage: '',
      adminMessage: '',
    };
  },
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: 'url(/hau.jpg)', // Background image from the public folder
        backgroundSize: 'cover',
        minHeight: '100vh',
        padding: '20px',
        color: '#fff',
        textAlign: 'center', // Center the text and content
      };
    }
  },
  mounted() {
    // Fetch home data when the app is mounted
    fetch('http://localhost:5000/getHome')
      .then(res => res.json())
      .then(data => {
        this.homeData = data;
      })
      .catch(console.error);
  },
  methods: {
    // Submit Student Form
    async submitStudentForm() {
      try {
        const res = await fetch('http://localhost:5000/submitStudent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.student)
        });
        const data = await res.json();
        if (data.success) {
          this.studentMessage = data.message; // Display success message
          this.student = { studentID: '', firstName: '', lastName: '', section: '' }; // Clear form
        } else {
          this.studentMessage = 'Error: ' + data.message;
        }
      } catch (err) {
        this.studentMessage = 'Failed to submit student form.';
        console.error(err);
      }
    },

    // Submit Admin Form
    async submitAdminForm() {
      try {
        const res = await fetch('http://localhost:5000/submitAdmin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.admin)
        });
        const data = await res.json();
        if (data.success) {
          this.adminMessage = data.message; // Display success message
          this.admin = { adminID: '', firstName: '', lastName: '', department: '' }; // Clear form
        } else {
          this.adminMessage = 'Error: ' + data.message;
        }
      } catch (err) {
        this.adminMessage = 'Failed to submit admin form.';
        console.error(err);
      }
    }
  }
};
</script>

<style>
/* General Styling for the whole app */
#app {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

/* Main Container */
.main-container {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  padding: 40px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  margin: 20px;
}

/* Notification Styling (for success messages) */
.notification {
  margin-top: 10px;
  padding: 10px;
  background-color: rgba(0, 128, 0, 0.7);
  border-radius: 5px;
  font-weight: bold;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

/* Styling for Inputs */
input {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: calc(100% - 22px); /* Full width with padding */
  font-size: 16px;
}

/* Styling for Buttons */
button {
  padding: 12px 20px;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

button:hover {
  background-color: #004d99;
}

/* Form Section Styling */
.form-section {
  margin-bottom: 40px;
}

h1, h2 {
  color: white;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

/* Centering the content inside the form container */
section {
  padding: 20px;
}
</style>
