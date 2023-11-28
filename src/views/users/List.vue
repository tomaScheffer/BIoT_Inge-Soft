<script setup>

    import { storeToRefs } from 'pinia';
    import { useUsersStore } from '@/stores';

    const usersStore = useUsersStore();
    const { users } = storeToRefs(usersStore);

    usersStore.getAll();

</script>

<template>

    <h1>Usuarios</h1>
    <router-link to="/users/add" class="btn btn-sm btn-success mb-2">Agregar Usuario</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 30%">Nombre</th>
                <th style="width: 30%">Apellido</th>
                <th style="width: 30%">Nombre de Usuario</th>
                <th style="width: 10%"></th>
            </tr>
        </thead>
        <tbody>
            <template v-if="users.length">
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.username }}</td>
                    <td style="white-space: nowrap">
                        <router-link :to="`/users/edit/${user.id}`" class="btn btn-sm btn-primary mr-1">Editar</router-link>
                        <button @click="usersStore.delete(user.id)" class="btn btn-sm btn-danger btn-delete-user" :disabled="user.isDeleting">
                            <span v-if="user.isDeleting" class="spinner-border spinner-border-sm"></span>
                            <span v-else>Eliminar</span>
                        </button>
                    </td>
                </tr>
            </template>
            <tr v-if="users.loading">
                <td colspan="4" class="text-center">
                    <span class="spinner-border spinner-border-lg align-center"></span>
                </td>
            </tr>
            <tr v-if="users.error">
                <td colspan="4">
                    <div class="text-danger">Error: {{users.error}}</div>
                </td>
            </tr>            
        </tbody>
    </table>
    
</template>