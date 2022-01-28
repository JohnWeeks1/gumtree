export default {
  data() {
    return {
      cropped: [],
      singleImageData: {},
      adName: "",
      price: null,
      description: "",
      location: {},
      category: null,
      categoryOptions: [{ value: null, text: "Please select an option" }],
      subCategory: null,
      subCategoriesArray: [],
      subCategoryOptions: [{ value: null, text: "Please select an option" }],
      errors: {
        adName: { value: "", state: null },
        category: { value: "", state: null },
        subCategory: { value: "", state: null },
        price: { value: "", state: null },
        description: { value: "", state: null },
        location: { value: "", state: null },
        images: { value: "", state: null },
      },
    };
  },
  mounted() {
    this.getCategories();
    this.getSubCategories();
  },
  computed: {
    user() {
      return this.$store.getters["user/getUser"];
    },
    categories() {
      return this.$store.getters["category/getCategories"];
    },
  },
  watch: {
    // Validation
    adName(val) {
      if (this.adName.length > 2) {
        this.errors.adName.state = true;
        this.errors.adName.value = "";
      } else {
        this.errors.adName.state = null;
        this.errors.adName.value = "";
      }
    },

    category(val) {
      if (this.category) {
        this.errors.category.state = true;
        this.errors.category.value = "";
      } else {
        this.errors.category.state = null;
        this.errors.category.value = "";
      }
    },

    subCategory(val) {
      if (this.subCategory) {
        this.errors.subCategory.state = true;
        this.errors.subCategory.value = "";
      } else {
        this.errors.subCategory.state = null;
        this.errors.subCategory.value = "";
      }
    },

    price(val) {
      if (this.price) {
        this.errors.price.state = true;
        this.errors.price.value = "";
      } else {
        this.errors.price.state = null;
        this.errors.price.value = "";
      }
    },

    description(val) {
      if (this.description.length > 30) {
        this.errors.description.state = true;
        this.errors.description.value = "";
      } else {
        this.errors.description.state = null;
        this.errors.description.value = "";
      }
    },

    location(val) {
      if (Object.keys(this.location).length !== 0) {
        this.errors.location.state = true;
        this.errors.location.value = "";
      } else {
        this.errors.location.state = null;
        this.errors.location.value = "";
      }
    },
    
    cropped(val) {
      if (this.cropped.length > 0) {
        this.errors.images.state = true;
        this.errors.images.value = "";
      } else {
        this.errors.description.state = null;
        this.errors.description.value = "";
      }
    },
  },
  methods: {
    updateLocation(value) {
      this.location = value
    },
    
    validationErrors() {
      let isError = false;

      if (this.adName.length < 3) {
        this.errors.adName.state = false;
        this.errors.adName.value = "Needs to be 3 characters or more.";
        isError = true;
      }

      if (!this.category) {
        this.errors.category.state = false;
        this.errors.category.value = "Please select a category";
        isError = true;
      }

      if (this.category && !this.subCategory) {
        this.errors.subCategory.state = false;
        this.errors.subCategory.value = "Please select a sub category";
        isError = true;
      }

      if (!this.price) {
        this.errors.price.state = false;
        this.errors.price.value = "Please enter a price";
        isError = true;
      }

      if (this.description.length <= 30) {
        this.errors.description.state = false;
        this.errors.description.value = "Please enter at least 30 characters";
        isError = true;
      }

      if (Object.keys(this.location).length === 0) {
        this.errors.location.state = false;
        this.errors.location.value = "Please upload a location";
        isError = true;
      }
      
      if (!this.cropped.length) {
        this.errors.images.state = false;
        this.errors.images.value = "Please upload some images";
        isError = true;
      }

      return isError;
    },
    
    getCategories() {
      for (let i = 0; i < this.categories.length; i++) {
        this.categoryOptions.push({
          value: this.categories[i].id,
          text: this.$helpers.capitalizeFirstLetter(this.categories[i].name),
        });
      }
    },

    getSubCategories() {
      for (let i = 0; i < this.categories.length; i++) {
        const subCats = this.categories[i].sub_categories;

        for (let j = 0; j < subCats.length; j++) {
          this.subCategoriesArray.push(subCats[j]);
        }
      }
    },

    getSubCategoryOptionsByCategoryId(id) {
      // Reset array for new sub category names
      this.subCategory = null;
      this.subCategoryOptions = [];
      this.subCategoryOptions.push({
        value: null,
        text: "Please select an option",
      });

      for (let i = 0; i < this.subCategoriesArray.length; i++) {
        if (id === this.subCategoriesArray[i].category_id) {
          this.subCategoryOptions.push({
            value: this.subCategoriesArray[i].id,
            text: this.$helpers.capitalizeFirstLetter(
              this.subCategoriesArray[i].name
            ),
          });
        }
      }
    },
    
    updateCroppedArray(event) {
      this.cropped.push({
        id: event.id,
        image: event.image,
      });
    },
    
    isBase64StringOrUrl(crop) {
      var base64 =
        /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
      if (crop.image) {
        let string = crop.image.substring(22);
        if (!base64.test(string)) {
        console.log(crop);
          return `${this.$helpers.apiUrl()}images/ad-id-${crop.ad_id}/${crop.image}`;
        } else {
        console.log(crop);
          return crop.image;
        }
      }
    },

    deleteSingleImage() {
      for (let i = 0; i < this.cropped.length; i++) {
        if (this.cropped[i].id === this.singleImageData.id) {
          this.cropped.splice(i, 1);
        }
      }
      // To revert Images colored title back to black
      if (this.cropped.length === 0) {
        this.errors.images.state = null;
      }
    },
  },
}