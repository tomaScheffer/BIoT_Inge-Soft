<script setup>

    import { Form, Field } from 'vee-validate';
    import * as Yup from 'yup';
    import { useRoute } from 'vue-router';
    import { storeToRefs } from 'pinia';
    import { useUsersStore, useAlertStore } from '@/stores';
    import { router } from '@/router';

    const usersStore = useUsersStore();
    const alertStore = useAlertStore();
    const route = useRoute();
    const id = route.params.id;

    let title = 'Add User';
    let user = null;
    if (id) {
        // Modo edición
        title = 'Edit User';
        ({ user } = storeToRefs(usersStore));
        usersStore.getById(id);
    }

    const schema = Yup.object().shape({
        firstName: Yup.string()
            .required('El nombre es obligatorio'),
        lastName: Yup.string()
            .required('El apellido es obligatorio'),
        username: Yup.string()
            .required('El nombre de usuario es obligatorio'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // Contraseña opcional en modo edición
            .concat(user ? null : Yup.string().required('La contraseña es requerida'))
            .min(6, 'Mínimo 6 caracteres para la contraseña')
    });

    async function onSubmit(values) {
        try {
            let message;
            if (user) {
                await usersStore.update(user.value.id, values)
                message = 'Usuario actualizado';
            } else {
                await usersStore.register(values);
                message = 'Usuario agregado';
            }
            await router.push('/users');
            alertStore.success(message);
        } catch (error) {
            alertStore.error(error);
        }
    }

</script>

<template>

    <h1>{{title}}</h1>
    <template v-if="!(user?.loading || user?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="user" v-slot="{ errors, isSubmitting }">
            <div class="form-row">
                <div class="form-group col">
                    <label>Nombre</label>
                    <Field name="firstName" type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
                    <div class="invalid-feedback">{{ errors.firstName }}</div>
                </div>
                <div class="form-group col">
                    <label>Apellido</label>
                    <Field name="lastName" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }" />
                    <div class="invalid-feedback">{{ errors.lastName }}</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col">
                    <label>Nombre Usuario</label>
                    <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <div class="form-group col">
                    <label>
                        Password
                        <em v-if="user">(Dejar en blanco para conservar anterior contraseña)</em>
                    </label>
                    <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Guardar
                </button>
                <router-link to="/users" class="btn btn-link">Cancelar</router-link>
            </div>
        </Form>
    </template>
    <template v-if="user?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="user?.error">
        <div class="text-center m-5">
            <div class="text-danger">error: {{user.error}}</div>
        </div>
    </template>
    
</template>