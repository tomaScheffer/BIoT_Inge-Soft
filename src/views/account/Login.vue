<script setup>

    import { Form, Field } from 'vee-validate';
    import * as Yup from 'yup';
    import { useAuthStore } from '@/stores/Index.js';

    const schema = Yup.object().shape({

        username: Yup.string().required('Nombre de usuario necesario'),
        password: Yup.string().required('Contraseña necesaria')
    });

    async function onSubmit(values) {
        
        const authStore = useAuthStore();
        const { username, password } = values;
        await authStore.login(username, password);
    }

</script>

<template>

    <div class="card m-3">
        <h4 class="card-header">Iniciar Sesión</h4>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <label>Nombre de Usuario</label>
                    <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <div class="form-group">
                    <label>Contraseña</label>
                    <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Iniciar Sesión
                    </button>
                    <router-link to="register" class="btn btn-link">Registrarse</router-link>
                </div>
            </Form>
        </div>
    </div>

</template>