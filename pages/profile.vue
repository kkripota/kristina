<script setup lang="ts">
  const profileStore = useProfileStore();
  const genderStore = useGendersStore();
  const authStore = useAuthStore();
  const fio = ref('');
  const email = ref('');
  const birthday = ref('');
  const gender = ref(0);


  const profileLoad = async () => {
    
    await profileStore.fetchUserData(authStore.authData.id);
    fio.value = profileStore.userData.fio;
    email.value = profileStore.userData.email;
    birthday.value = profileStore.userData.birthday;
    gender.value = profileStore.userData.gender.id;
};

profileLoad();

  const editProfile = async () => {
    if (fio.value && email.value && birthday.value && gender.value) {
      await profileStore.updateProfile(fio.value, email.value, birthday.value, gender.value);
      profileLoad();
      const myModalAlternative = new bootstrap.Modal(document.getElementById('myModal'), options)
    }
  };
</script>

<template>
  <template v-if="profileStore.userData">
  
  <h3>{{ profileStore.userData.fio }}</h3>
  <p class="mb-1">Count reviews: {{ profileStore.userData.reviewCount }}</p>
  <p>Count scores: {{ profileStore.userData.ratingCount }}</p>
<ul class="nav nav-underline" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" role="tab" aria-controls="profile-tab-pane" aria-selected="true" aria-current="page" href="#">My profile</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-tab-pane" role="tab" aria-controls="reviews-tab-pane" aria-selected="false" href="#">My reviews</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="scores-tab"  data-bs-toggle="tab" data-bs-target="#scores-tab-pane" role="tab" aria-controls="scores-tab-pane" aria-selected="false" href="#">My scores</a>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="profile-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
    <p class="mt-3">Email: {{ profileStore.userData.email }}</p>
    <p>Birthday: {{ profileStore.userData.birthday }}</p>
    <p>Gender:  {{ profileStore.userData.gender.name }}</p>
    <div>

      <button type="button" class="btn btn-warning me-3" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Edit</button>
      <button class="btn btn-danger">Delete Account</button>
    </div>
  </div>
  <div class="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
    <div class="mt-3" v-for="review in profileStore.reviewsData" :key="review.id">
      <div class="row">
        <div class="col-9">
         <h5>{{ review.film.name }}</h5> 
        </div>
        <div 
        class="col-1 text-success"
        :class="{'text-sucess' :review.is_approved, 
        'text-danger' :!review.is_approved}">
        {{ (review.is_approved) ? 'Approved!' : 'Все плохо'}}</div>
        <div class="col-2">{{ (new Date(review.created_at)).toLocaleDateString() }}</div>
      </div>
      <div class="row">
        <div class="col-10">
          {{ review.message }}
        </div>
        <div class="col-2">
          <button class="btn btn-outline-danger" @click="profileStore.removeReviewsData(review.id)">Remove</button>
        </div>
        <hr class="divider">  
      </div>
    </div>

  </div>
  <div class="tab-pane fade" id="scores-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
    <div class="mt-3" v-for="rating in profileStore.ratingsData" :key="rating.id">
      <div class="row">
        <div class="col-10">
         <h5>{{ rating.film.name }}</h5> 
        </div>
        <div class="col-2">{{ (new Date(rating.created_at)).toLocaleDateString() }}</div>
      </div>
      <div class="row">
        <div class="col-10 fw-bold">
         {{ rating.score }} &#9734;
        </div>
        <div class="col-2">
          <button class="btn btn-outline-danger" @click="profileStore.removeRatingsData(rating.id)">Remove</button>
        </div>
      </div>
      <hr class="divider">
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit profile</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="fio" class="col-form-label">Fio:</label>
            <input type="text" v-model="fio" class="form-control" id="fio">
          </div>
          <div class="mb-3">
            <label for="email" class="col-form-label">Email:</label>
            <input type="email" v-model="email" class="form-control"  id="email">
          </div>
          <div class="mb-3">
            <label for="birthday" class="col-form-label">Birthday:</label>
            <input type="date" v-model="birthday" class="form-control"  id="birthday" >
          </div>
          <div class="mb-3"> 
          <label for="gender" class="col-form-label">Gender:</label> 
          <select class="form-control"  id="gender" v-model="gender"> 
          <option  
            v-for="gender in genderStore.genders"  
            :key="gender.id"  
            :value="gender.id" 
            :selected="gender.id == gender"
            >{{ gender.name }} 
                </option> 
                </select> 
                </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" @click="editProfile" class="btn btn-primary">Change profile</button>
              </div>
            </div>
          </div>
        </div>
          


</template>
<!-- Loading -->
<div class="d-flex justify-content-center" v-else>
  <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>


</template>

<style>

</style>