<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark static-top">
      <router-link class="navbar-brand mr-1" :to="{ name: 'top' }">
        <img src="/public/image/logo.png" class="img-fluid" width="140px" height="20px" />
      </router-link>

      <button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
        <i class="fas fa-bars"></i>
      </button>

      <!-- Navbar Search(なし) -->
      <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0"></form>

      <!-- Navbar -->
      <ul class="navbar-nav ml-auto ml-md-0">
        <li class="nav-item dropdown no-arrow">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-user-circle fa-fw"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
            <div class="dropdown-divider"></div>
            <router-link tag="a" class="dropdown-item" :to="{ name: 'signOut' }">
              <span>サインアウト</span>
            </router-link>
            <div class="dropdown-divider"></div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>
