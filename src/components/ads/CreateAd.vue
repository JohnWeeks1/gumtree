<template>
  <b-container id="create-ad">
    <b-row>
      <b-col class="col-lg-8 offset-lg-2 col-md-8 offset-md-2">
        <b-form class="mt-3 form" @submit.prevent="submit">
          <h3 class="pt-4 pb-2">Create Ad</h3>
          
          <div class="border border-top-0 mb-3"></div>

          <b-form-group
            id="adName"
            :class="{
              'text-danger': errors.adName.state === false,
              'text-success': errors.adName.state === true,
            }"
            label="Ad name"
            label-for="adName"
          >
            <b-form-input
              id="adName"
              v-model="adName"
              class="shadow-none"
              type="text"
              placeholder="New dress, Used Phone, Macbook Pro"
              :state="errors.adName.state"
              autocomplete="off"
            ></b-form-input>

            <b-form-invalid-feedback id="input-live-feedback">
              {{ errors.adName.value }}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-row>
            <div class="col-sm">
              <b-form-group
                id="category"
                class="pt-2"
                :class="{
                  'text-danger': errors.category.state === false,
                  'text-success': errors.category.state === true,
                }"
                label="Category"
                label-for="category"
              >
                <b-form-select
                  id="category"
                  v-model="category"
                  class="shadow-none"
                  :state="errors.category.state"
                  @change="getSubCategoryOptionsByCategoryId(category)"
                  :options="categoryOptions"
                ></b-form-select>

                <b-form-invalid-feedback id="input-live-feedback">
                  {{ errors.category.value }}
                </b-form-invalid-feedback>
              </b-form-group>
            </div>
            <div class="col-sm">
              <b-form-group
                id="subCategory"
                v-if="category"
                class="pt-2"
                :class="{
                  'text-danger': errors.subCategory.state === false,
                  'text-success': errors.subCategory.state === true,
                }"
                label="Sub category"
                label-for="subCategory"
              >
                <div class="subCategory">
                  <b-form-select
                    id="subCategory"
                    v-model="subCategory"
                    class="shadow-none"
                    :state="errors.subCategory.state"
                    :options="subCategoryOptions"
                  ></b-form-select>
                </div>

                <small>{{ errors.subCategory.value }}</small>
              </b-form-group>
            </div>
          </b-row>

          <b-form-group
            id="price"
            class="pt-2"
            :class="{
              'text-danger': errors.price.state === false,
              'text-success': errors.price.state === true,
            }"
            label="Price"
            label-for="price"
          >
            <b-form-input
              id="price"
              type="number"
              v-model="price"
              class="shadow-none"
              :state="errors.price.state"
              placeholder="1550"
              autocomplete="off"
            ></b-form-input>

            <b-form-invalid-feedback id="input-live-feedback">
              {{ errors.price.value }}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            id="description"
            class="pt-2"
            :class="{
              'text-danger': errors.description.state === false,
              'text-success': errors.description.state === true,
            }"
            label="Description"
            label-for="description"
          >
            <b-form-textarea
              id="description"
              v-model="description"
              class="shadow-none"
              :state="errors.description.state"
              placeholder="Enter at least 30 characters"
              rows="3"
              max-rows="6"
              autocomplete="off"
            ></b-form-textarea>

            <b-form-invalid-feedback id="input-live-feedback">
              {{ errors.description.value }}
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group
            :class="{
              'text-danger': errors.images.state === false,
              'text-success': errors.images.state === true,
            }"
            id="image"
            class="pt-2"
            label="Images"
            label-for="image"
          >
            <Images @cropped-image="updateCroppedArray($event[0])" />
          </b-form-group>

          <b-form-group
            :class="{
              'text-danger': errors.images.state === false,
              'text-success': errors.images.state === true,
            }"
          >
          
            <b-row class="pl-2 pr-2">
              <b-col v-for="crop in cropped" :key="crop.id" class="col-3 p-1">
                <b-img
                  v-b-modal.modal-center
                  :src="crop.image"
                  @click="singleImageData = crop"
                  class="w-100"
                  rounded
                  alt="Thumbnail image"
                ></b-img>
              </b-col>
            </b-row>
            <small>{{ errors.images.value }}</small>
          </b-form-group>
                    
          <b-form-group
            id="location"
            class="pt-2"
            :class="{
              'text-danger': errors.location.state === false,
              'text-success': errors.location.state === true,
            }"
            label="Location"
            label-for="location"
          >
            
            <GoogleAutocomplete 
              :errors="errors.location" 
              :class="{
                'pb-0': errors.location.state === false,
                'mb-3': errors.location.state === true,
                'pb-3': errors.location.state === null,
              }"
              @location="updateLocation"
            />
                        
            <GoogleMaps v-if="Object.keys(this.location).length !== 0" :location="{ 
                lat: location.addressData.latitude, 
                lng: location.addressData.longitude
              }"
            />

            <small>{{ errors.location.value }}</small>
          </b-form-group>
          
          <div class="border border-top-0"></div>
          
          <b-col>
            <b-row class="d-flex justify-content-end">
              <b-button class="mt-3 mb-4" type="submit" variant="primary">
                Create Ad
              </b-button>
            </b-row>
          </b-col>
        </b-form>
      </b-col>
    </b-row>

    <Modal @delete="deleteSingleImage()">
      <b-img
        :src="singleImageData.image"
        class="w-100"
        center
        rounded
        alt="Thumbnail image"
      ></b-img>
    </Modal>
  </b-container>
</template>

<script>
import GoogleMaps from "@/components/global/GoogleMaps.vue";
import Images from "./Images.vue";
import Modal from "@/components/global/Modal.vue";
import GoogleAutocomplete from "@/components/global/GoogleAutocomplete.vue";

import adsMixin from '../../mixins/adsMixin'

export default {
  name: "CreateAd",
  mixins:[adsMixin], // This has shared code
  methods: {  
    submit() {
      if (this.validationErrors()) {
        return true;
      }

      this.$swal({
        title: 'Final check',
        text: "If you\'re happy to post you\'re ad just hit the \"Confirm\" button. If not \"Cancel\"",
        icon: "info",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store
            .dispatch("ad/createNewAd", {
              userId: this.user.id,
              name: this.adName,
              categoryId: this.category,
              subCategoryId: this.subCategory,
              price: this.price,
              description: this.description,
              images: this.cropped,
              location: this.location,
            })
            .then((result) => {
              console.log(result);

              this.$swal({
                toast: true,
                icon: "success",
                title: 'New ad created "' + this.adName + '"',
                animation: false,
                position: "top-right",
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
              });

              this.$router.push({ name: "MyAds" });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
  components: {
    GoogleMaps,
    Images,
    Modal,
    GoogleAutocomplete
  },
};
</script>
