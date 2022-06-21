<template>
    
    <!-- Sidebar -->
    <ul class="sidebar navbar-nav">
        <li class="nav-item active">
            <router-link tag="a" class="nav-link" :to="{ name: 'menu'}">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Menu</span>
            </router-link>
        </li>

        <li class="nav-item active">
            <router-link tag="a" class="nav-link" :to="{ name: 'rentalbook'}">
                <i class="fas fa-fw fa-book-open"></i>
                <span>Book Rental</span>
            </router-link>
        </li>
<!-- takada -->
        <li class="nav-item active">
            <router-link tag="a" class="nav-link" :to="{ name: 'maintebook'}">
                <i class="fas fa-fw fa-book-medical"></i>
                <span>Book Maintenance</span>
            </router-link>
        </li>
<!-- takada -->
        <li class="nav-item active">
            <router-link tag="a" class="nav-link" :to="{ name: 'listUser'}">
                <i class="fas fa-fw fa-user"></i>
                <span>User Maintenance</span>
            </router-link>
        </li>
        <li class="nav-item active">
            <router-link tag="a" class="nav-link" :to="{ name: 'listBook'}">
                <i class="fas fa-fw fa-book"></i>
                <span>Book Status</span>
            </router-link>
        </li>
    </ul>

</template>
