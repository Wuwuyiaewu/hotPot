<template>
    <div>
        <div class="container-fluid mt-5">
            <div class="row">
                <nav class="col-md-2 bg-light sidebar">
                <div class="sidebar-sticky">
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>模擬功能</span>
                    <a class="d-flex align-items-center text-muted" href="#">
                        <span data-feather="plus-circle"></span>
                    </a>
                    </h6>
                    <ul class="nav flex-column">
                    <li class="nav-item">
                        <router-link to="/admin/product" class="nav-link"><i class="fas fa-boxes"></i>產品列表</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/orderList" class="nav-link"><i class="fas fa-boxes"></i>訂單列表</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/coupon" class="nav-link"><i class="fas fa-boxes"></i>優惠券</router-link>
                    </li>
                    </ul>
                    <!-- 側邊欄位 -->
                    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>模擬功能</span>
                    <a class="d-flex align-items-center text-muted" href="#">
                        <span data-feather="plus-circle"></span>
                    </a>
                    </h6>
                    <ul class="nav flex-column mb-2">
                    <li class="nav-item">
                        <router-link to="/customer_order" class="nav-link"><i class="fas fa-boxes"></i>模擬訂單</router-link>
                    </li>
                    </ul>
                </div>
                </nav>
                <!-- 切換的router在這設定 -->
                <!-- css設定col-md-9 -->
                <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <router-view></router-view>
                </main>
            </div>
        </div>
    </div>
</template>