<script setup>

    import { Form, Field } from 'vee-validate';
    import * as Yup from 'yup';
    import { useUsersStore, useAlertStore } from '@/stores/Index.js';
    import { router } from '@/router/Index.js';

    const schema = Yup.object().shape({
        
        first_name: Yup.string()
            .required('Obligatorio'),
        last_name: Yup.string()
            .required('Obligatorio'),
        username: Yup.string()
            .required('Obligatorio'),
        password: Yup.string()
            .required('Obligatorio')
            .min(6, 'La contraseña debe ser de al menos 6 caracteres')
    });

    async function onSubmit(values) {

        const usersStore = useUsersStore();
        const alertStore = useAlertStore();
        try {
            await usersStore.register(values);
            await router.push('/account/login');
            alertStore.success('Registrado');
        } catch (error) { 
            alertStore.error(error);
        }
    }

</script>

<template>

    <div class="card m-3">
        <h4 class="card-header">Registrarse</h4>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting, values }">
                <div class="form-group">
                    <label>Nombre</label>
                    <Field name="first_name" v-model="values.first_name" type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
                    <div class="invalid-feedback">{{ errors.firstName }}</div>
                </div>
                <div class="form-group">
                    <label>Apellido</label>
                    <Field name="last_name" v-model="values.last_name" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }" />
                    <div class="invalid-feedback">{{ errors.lastName }}</div>
                </div>
                <div class="form-group">
                    <label>Nombre de Usuario</label>
                    <Field name="username" v-model="values.username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <div class="form-group">
                    <label>Contraseña</label>
                    <Field name="password" v-model="values.password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Registrarse
                    </button>
                    <router-link to="login" class="btn btn-link">Cancelar</router-link>
                </div>
            </Form>
        </div>
    </div>

</template>