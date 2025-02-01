<template>
    <div>
        <h2>Welcome {{fullName}}</h2>
        <div>
            <p>What is your name?</p>
            <label>First Name:</label>
            <input type="text" v-model="firstName" />
        </div>
        <div>
            <label>Last Name:</label>
            <input type="text" v-model="lastName" />
        </div>
        <div>
            <label>
                <input type="radio" value="mountain" v-model="selection" /> Mountain
            </label>
            <label>
                <input type="radio" value="ocean" v-model="selection" /> Ocean
            </label>
        </div>
        <img v-if="selection" :src="images[selection]" alt="Selected View" width="300" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            selection: '',
            images: {
                mountain: 'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?cs=srgb&dl=pexels-pixabay-417173.jpg&fm=jpg',
                ocean: 'https://images.pexels.com/photos/7321/sea-water-ocean-horizon.jpg?cs=srgb&dl=pexels-splash-of-rain-7321.jpg&fm=jpg'
            }
        };
    },
    computed: {
        fullName() {
            return `${this.firstName} ${this.lastName}`.trim();
        }
    }
};
</script>
