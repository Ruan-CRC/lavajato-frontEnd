<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        permanent
        location="left"
      >
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
            title="Jane Smith"
            subtitle="Logged in"
          ></v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"><router-link to="/home"></router-link></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"><router-link to="/login"></router-link></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Cadastre-se" value="Cadastre-se"><router-link to="/login"></router-link></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>
