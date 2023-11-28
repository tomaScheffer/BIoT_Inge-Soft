<script setup>

    import { Form, Field } from 'vee-validate';
    import * as Yup from 'yup';
    import { useUsersStore, useAlertStore } from '@/stores';
    import { router } from '@/router';

    const schema = Yup.object().shape({
        
        firstName: Yup.string()
            .required('Obligatorio'),
        lastName: Yup.string()
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
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <label>Nombre</label>
                    <Field name="firstName" type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
                    <div class="invalid-feedback">{{ errors.firstName }}</div>
                </div>
                <div class="form-group">
                    <label>Apellido</label>
                    <Field name="lastName" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }" />
                    <div class="invalid-feedback">{{ errors.lastName }}</div>
                </div>
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
                        Registrarse
                    </button>
                    <router-link to="login" class="btn btn-link">Cancelar</router-link>
                </div>
            </Form>
        </div>
    </div>

</template>