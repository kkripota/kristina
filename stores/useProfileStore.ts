import { defineStore } from 'pinia'
import { api } from '~/api';

export const useProfileStore = defineStore('profile', () => {
    const userData = ref(null);
    const reviewsData = ref([]);
    const ratingsData = ref([]);
    const authStore = useAuthStore();
  
    async function fetchUserData(id: number) {
      const res = await api.get(`/users/${id}`, {
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      });
      userData.value = res.data;
    }

    async function fetchReviewsData() {
      const res = await api.get(`/users/${authStore.authData.id}/reviews`, {
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      });
      reviewsData.value = res.data.reviews;
    }

    async function fetchRatingsData() {
      const res = await api.get(`/users/${authStore.authData.id}/ratings`, {
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      });
      ratingsData.value = res.data.ratings;
    }

    async function updateProfile(fio: string, email:string, birthday:string, gender_id:number) {
      const res = await api.put(`/users`, {
        fio, 
        email, 
        birthday, 
        gender_id,
      }, {
        headers: {
          'Authorization':'Bearer '+ authStore.authData.token,
        }
      });

    }

    async function removeReviewsData(id: number) { 
      await api.delete(`/users/${authStore.authData.id}/reviews/${id}`, { 
       headers: { 
        Authorization: 'Bearer ' + authStore.authData.token, 
       }, 
      }); 
     
      await fetchReviewsData(); 
     } 
     
     async function removeRatingsData(id: number) { 
      await api.delete(`/users/${authStore.authData.id}/ratings/${id}`, { 
       headers: { 
        Authorization: 'Bearer ' + authStore.authData.token, 
       }, 
      }); 
     
      await fetchRatingsData(); 
     }
    

    fetchReviewsData();
    fetchRatingsData();

    return {
      userData,
      reviewsData,
      ratingsData,
      fetchUserData,
      updateProfile,
      removeReviewsData,
      removeRatingsData,
      fetchReviewsData,
    }
});