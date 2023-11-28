<template>

    <img class="logo" src="../../logo.ico"/>
    <h1>Sign Up!</h1>
    <input type="text" v-model="name" placeholder="Nombre" required/>
    <input type="text" v-model="email" placeholder="Email" required/>
    <input type="password" v-model="password" placeholder="Contraseña" required/>
    <button v-on:click="signUp">SignUp</button>


</template>

<script>

import axios from 'axios'

    export default {

        name: 'SignUp',
        data() {
            return {
                name: '',
                email: '',
                password: ''
            }
        },
        methods: {

            async signUp() {

                let result = axios.post("http://localhost:3000/users", {
                    name:this.name,
                    email:this.email,
                    password:this.password
                });

                console.warn(result);
                if (result.status == 201) {
                    alert("OK!")
                    localStorage.setItem("user-info", JSON.stringify(result.data))
                }
            }
        }
    }

</script>

<style>

    .logo {
        
        width: 100px
    }

</style>