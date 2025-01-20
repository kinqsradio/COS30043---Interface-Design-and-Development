<template>
    <nav class="navbar navbar-expand-lg navbar-light sticky-top shadow-sm">
      <div class="container">
        <!-- Brand -->
        <a class="navbar-brand fw-bold" href="#">Financial Platform</a>
  
        <!-- Toggler (for mobile view) -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <!-- Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link
                to="/"
                class="nav-link"
                active-class="active"
                exact
              >
                Dashboard
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/portfolio"
                class="nav-link"
                active-class="active"
              >
                Portfolio
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>
  
  
  
<script>
  export default {
    name: "NavbarComponent",
  };
</script>
  
<style scoped src="@/styles/navbar.css"></style>

  